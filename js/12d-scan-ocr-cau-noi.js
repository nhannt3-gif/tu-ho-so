/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — đọc chữ PDF ảnh (OCR) · đọc lại theo bố cục · cầu nối máy tính Windows.
   Chép nguyên từ js/12-scan.js (không đổi tên hàm); nạp ngay sau phần trước. ===== */
/* ==========================================================
   3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
   · Công văn: dòng "Số: …" cột trái + dòng "V/v …" (in nghiêng) ngay dưới số hiệu = trích yếu
   · Quyết định / Kế hoạch / Báo cáo / Thông báo…: tiêu đề in hoa giữa trang + dòng ngay dưới ("Về việc…", nội dung)
   · Ngày: dòng "…, ngày … tháng … năm …"
   Nguồn chữ: lớp chữ của PDF (nhanh, đúng); PDF chụp / ảnh thì OCR tiếng Việt trong máy.
   Kết quả hiện BẢNG SO SÁNH với thông tin hiện tại, tích chọn mục muốn đổi, tên file mới tính lại ngay.
   ========================================================== */
function docLaiGoiY(id, cheSua, epOCR){
  var m = timMucCaCho(id) || timMuc(id); if(!m) return;
  if(cheSua) GOI_Y_SUA = {id:id, form:nhoFormSua(), cu:{so:gt('s-so'), ngay:ngayISOTuVN(gt('s-ngay')), ty:gt('s-ty'), loai:gt('s-loai')}};
  else GOI_Y_SUA = null;
  QUET.dung = false;
  var laPDF = /pdf$/i.test(m.duoi||m.tenCu||'');
  batChay(true, 'Đang đọc văn bản…', true);
  docFile(m.id).then(function(b){
    if(!b) throw new Error('Không còn file trong máy');
    if(!laPDF) return anhTuBlob(b).then(function(im){ return docDongOCR(quaKhung(im)); });
    if(!window.pdfjsLib) throw new Error('Chưa tải được bộ đọc PDF');
    return b.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; })
      .then(function(pdf){ return pdf.getPage(1); }).then(function(pg){
        return (epOCR ? Promise.resolve(null) : dongTuPDF(pg)).then(function(r){
          if(r && r.chu.replace(/\s+/g,'').length >= 40) return r;
          /* PDF chụp không có chữ → vẽ trang 1 ra ảnh rồi OCR */
          dangLamChu('Đang dựng ảnh trang 1…');
          var vp0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(3, 2200/Math.max(vp0.width, vp0.height))});
          var c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
          return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return docDongOCR(c); });
        });
      });
  }).then(function(r){
    tatChay();
    var kq = phanTichBoCuc(r.dong, r.W, r.H, r.chu);
    kq.nguon = r.nguon; kq.chu = r.chu;
    moSoSanhGoiY(m, kq, cheSua);
  }).catch(function(e){
    tatChay();
    if(QUET.dung) return bao('Đã dừng đọc chữ.', 3);
    baoLoi('Chưa đọc được: '+(e&&e.message||e)+'. Có thể dùng "Chép sang AI" để đọc giúp.');
  });
}
function ngayISOTuVN(v){ var m = String(v||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]) : (/^\d{4}-\d{2}-\d{2}$/.test(v||'') ? v : ''); }
/* lớp chữ PDF → các dòng có vị trí (y tính từ trên xuống) */
function dongTuPDF(pg){
  var vp = pg.getViewport({scale:1});
  return pg.getTextContent().then(function(tc){
    var it = tc.items.filter(function(x){ return x.str && x.str.trim(); }).map(function(x){
      var t = x.transform, h = Math.abs(t[3]) || x.height || 10;
      return {s:x.str, x0:t[4], x1:t[4]+(x.width||0), y:vp.height-t[5], h:h};
    }).sort(function(a,b){ return a.y-b.y || a.x0-b.x0; });
    var dong = [];
    it.forEach(function(x){
      var d = dong[dong.length-1];
      /* cùng độ cao nhưng cách xa (cột trái cơ quan | cột phải quốc hiệu, ngày tháng) → 2 dòng riêng */
      if(d && Math.abs(d.y-x.y) < Math.max(d.h, x.h)*0.45 && x.x0 >= d.x1 - 2 && x.x0 - d.x1 < Math.max(x.h*3, vp.width*0.06)){
        d.t += (x.x0 - d.x1 > x.h*0.25 && !/\s$/.test(d.t) ? ' ' : '') + x.s; d.x1 = Math.max(d.x1, x.x1); d.h = Math.max(d.h, x.h);
      } else dong.push({t:x.s, x0:x.x0, x1:x.x1, y:x.y, h:x.h});
    });
    /* một dòng có thể là 2 cột (cơ quan | quốc hiệu) nằm cùng độ cao — tách ở khoảng trống lớn */
    var ra = [];
    dong.forEach(function(d){ ra.push({t:d.t.replace(/\s+/g,' ').trim(), x0:d.x0, x1:d.x1, y:d.y, h:d.h}); });
    return {dong:ra, W:vp.width, H:vp.height, chu:ra.map(function(d){ return d.t; }).join('\n'), nguon:'chu'};
  });
}
/* OCR (Tesseract tiếng Việt, trong máy) → dòng có vị trí */
function docDongOCR(c){
  var worker = null;
  return napOCR().then(function(){
    return Tesseract.createWorker('vie', 1, {logger:function(l){
      if(QUET.dung && worker){ worker.terminate(); worker = null; }
      var pt = Math.round((l.progress||0)*100);
      dangLamChu((/load|download|initializ/i.test(l.status||'') ? 'Đang tải bộ đọc chữ tiếng Việt' : 'Đang đọc chữ (OCR)')+'… '+pt+'%');
      tienChay(pt);
    }});
  }).then(function(w){
    worker = w; if(QUET.dung){ w.terminate(); throw new Error('Đã dừng'); }
    return w.recognize(c);
  }).then(function(r){
    if(worker){ worker.terminate(); worker = null; }
    var d = (r && r.data) || {}, dong = [];
    (d.lines || []).forEach(function(l){
      var b = l.bbox||{}, h = Math.max(8, (b.y1||0)-(b.y0||0)), y = ((b.y0||0)+(b.y1||0))/2;
      /* OCR hay gộp 2 cột cùng độ cao vào 1 dòng → tách ở khoảng trống lớn giữa các chữ */
      var ws = (l.words||[]).filter(function(w){ return w && w.text && w.text.trim(); });
      if(ws.length){
        var cum = null;
        ws.forEach(function(w){ var wb = w.bbox||{};
          if(cum && (wb.x0||0) - cum.x1 < Math.max(h*2.5, c.width*0.05)){ cum.t += ' '+w.text.trim(); cum.x1 = wb.x1||cum.x1; }
          else { if(cum) dong.push(cum); cum = {t:w.text.trim(), x0:wb.x0||0, x1:wb.x1||0, y:y, h:h}; } });
        if(cum) dong.push(cum);
        return;
      }
      var t = String(l.text||'').replace(/\s+/g,' ').trim();
      if(t) dong.push({t:t, x0:b.x0||0, x1:b.x1||0, y:y, h:h}); });
    var chu = String(d.text||'').trim();
    if(!dong.length) chu.split(/\n/).forEach(function(t, i){ t = t.trim(); if(t) dong.push({t:t, x0:0, x1:c.width, y:i*20, h:18}); });
    return {dong:dong, W:c.width, H:c.height, chu:chu || dong.map(function(x){ return x.t; }).join('\n'), nguon:'ocr'};
  }).catch(function(e){ if(worker) try{ worker.terminate(); }catch(_){} throw e; });
}
/* đọc bố cục: số hiệu · ngày · trích yếu (dòng V/v dưới số hiệu, hoặc tiêu đề + dòng dưới) · loại */
var KHONG_TIEU_DE = /CỘNG\s*HÒA|ĐỘC\s*LẬP|TỰ\s*DO|HẠNH\s*PHÚC|NGÂN\s*HÀNG|CHI\s*NHÁNH|PHÒNG\s*GIAO\s*DỊCH|PGD|HỘI\s*SỞ|UBND|ỦY\s*BAN|KÍNH\s*GỬI|NƠI\s*NHẬN|^SỐ\b/i;
function phanTichBoCuc(dong, W, H, chu){
  dong = (dong||[]).slice().sort(function(a,b){ return a.y-b.y; });
  var kq = {so:'', ngay:'', ty:'', loai:'', tu:{}};
  var hTB = dong.length ? dong.map(function(d){ return d.h; }).sort(function(a,b){ return a-b; })[Math.floor(dong.length/2)] : 12;
  var giua = function(d){ return Math.abs((d.x0+d.x1)/2 - W/2) < W*0.14; };
  var hoa = function(t){ var c = t.replace(/[^A-Za-zÀ-ỹĐđ]/g,''); return c.length>=4 && c===c.toUpperCase(); };
  var trai = function(d){ return d.x1 < W*0.6 || d.x0 < W*0.35 && (d.x0+d.x1)/2 < W*0.5; };
  /* 3.53: phần đầu = các dòng trên tiêu đề / "Căn cứ" — số hiệu, ngày chỉ lấy ở đây */
  var yThan = H*0.45;
  for(var z=0;z<dong.length;z++){ if(RE_THAN_VB.test(dong[z].t) || (laTieuDeVB(dong[z].t) && giua(dong[z]))){ yThan = Math.min(yThan, dong[z].y); break; } }
  /* 1. số hiệu: dòng "Số: …" (ưu tiên nửa trên, cột trái) */
  var iSo = -1;
  for(var i=0;i<dong.length;i++){
    var t = dong[i].t;
    if(dong[i].y >= yThan) break;
    if(/^\s*S[ốỐoO]\s*[:.]?\s*\d/i.test(t) || (/\bS[ốỐ]\s*:/i.test(t) && dong[i].y < H*0.4)){
      var so = rutSoHieu(t.replace(/^.*?S[ốỐoO]\s*[:.]?\s*/i,'')) || rutSoHieu(t);
      if(so){ kq.so = so; iSo = i; kq.tu.so = 'dòng "Số:" '+(trai(dong[i])?'cột trái':'đầu trang'); break; }
    }
  }
  /* 2. ngày: dòng "…, ngày … tháng … năm …" */
  for(var j=0;j<dong.length && dong[j].y < yThan;j++) if(/ngày\s*\d{1,2}\s*tháng\s*\d{1,2}\s*năm\s*\d{4}/i.test(dong[j].t)){
    kq.ngay = rutNgay(dong[j].t) || ''; if(kq.ngay){ kq.tu.ngay = 'dòng "ngày … tháng … năm …"'; break; } }
  /* 3a. công văn: dòng V/v ngay dưới số hiệu (cột trái), nối các dòng tiếp theo cùng cột */
  if(iSo>=0){
    for(var k=iSo+1;k<dong.length && dong[k].y - dong[iSo].y < hTB*5;k++){
      var d = dong[k];
      if(/^\s*(V\/v|V\/V|Về\s*việc)\b/i.test(d.t) || (k===iSo+1 && trai(d) && !/ngày|tháng|năm/i.test(d.t) && d.t.length>6)){
        var ty = [d.t], y0 = d.y;
        for(var q=k+1, them=0;q<dong.length && them<3;q++){
          var e = dong[q];
          if(e.y - y0 > hTB*2.2) break;
          if(!trai(e)) continue;   /* dòng cột phải (quốc hiệu, ngày tháng) nằm xen cùng độ cao → bỏ qua, đọc tiếp cột trái */
          if(/^(Kính\s*gửi|Căn\s*cứ|Thực\s*hiện|Để|Nơi\s*nhận)/i.test(e.t) || /ngày\s*\d+\s*tháng/i.test(e.t)) break;
          ty.push(e.t); y0 = e.y; them++;
        }
        kq.ty = ty.join(' ').replace(/^\s*(V\/v\.?|Về\s*việc)\s*:?\s*/i,'').trim();
        kq.tu.ty = 'dòng "V/v" ngay dưới số hiệu'; kq.loai = kq.loai || 'Công văn';
        break;
      }
    }
  }
  /* 3b. tiêu đề in hoa giữa trang + dòng ngay dưới */
  if(!kq.ty){
    for(var a=0;a<dong.length;a++){
      var d2 = dong[a];
      if(d2.y > H*0.6) break;
      if(!giua(d2) || !hoa(d2.t) || d2.t.length<5 || KHONG_TIEU_DE.test(d2.t)) continue;
      var tieuDe = [d2.t], duoi = [], y1 = d2.y;
      for(var b=a+1;b<dong.length && b<a+5;b++){
        var e2 = dong[b];
        if(e2.y - y1 > hTB*2.4 || !giua(e2) || /^(Căn\s*cứ|Kính\s*gửi)/i.test(e2.t) || /^[-–_ .]+$/.test(e2.t)) break;
        if(hoa(e2.t) && !duoi.length && tieuDe.length<2) tieuDe.push(e2.t); else duoi.push(e2.t);
        y1 = e2.y;
      }
      var td = tieuDe.join(' '), loai = doanLoai(td, kq.so);
      var sau = duoi.join(' ').replace(/^\s*(V\/v\.?|Về\s*việc|Về)\s*:?\s*/i,'').trim();
      var laLoai = new RegExp('^\\s*'+boDau(loai||'@@').replace(/\s+/g,'\\s*')+'\\s*$','i').test(boDau(td));
      kq.loai = loai || kq.loai;
      kq.ty = sau ? (laLoai ? sau : chuDau(td)+' '+sau) : (laLoai ? '' : chuDau(td));
      kq.tu.ty = sau ? 'tiêu đề giữa trang + dòng ngay dưới' : 'tiêu đề giữa trang';
      if(kq.ty) break;
    }
  }
  /* 4. thiếu thì lấy theo cách cũ trên cả trang */
  chu = chu || dong.map(function(d){ return d.t; }).join('\n');
  /* 3.53: không tìm cả trang nữa (dính số, ngày của văn bản căn cứ) — chỉ phần đầu */
  var dauC = docDauVB(dong.filter(function(d){ return d.y < yThan; }).map(function(d){ return d.t; }).join('\n'));
  if(!kq.so){ kq.so = dauC.so || ''; if(kq.so) kq.tu.so = 'phần đầu văn bản'; }
  if(!kq.ngay){ kq.ngay = dauC.ngay || ''; if(kq.ngay) kq.tu.ngay = 'phần đầu văn bản'; }
  if(!kq.ty){ kq.ty = rutTrichYeu(chu) || rutTieuDe(chu) || ''; if(kq.ty) kq.tu.ty = 'tìm trong cả trang'; }
  if(!kq.loai) kq.loai = doanLoai(chu, kq.so) || '';
  kq.ty = chuDau(String(kq.ty||'').replace(/\s+/g,' ').replace(/[.;,:\s]+$/,''));
  if(kq.ty && chuLoiFont(kq.ty)){ kq.loiFont = true; kq.ty = ''; kq.tu.ty = 'chữ PDF lỗi font — gõ tay theo khung xem'; }   /* 3.61 */
  return kq;
}
function chuDau(t){ t = String(t||'').trim(); if(!t) return t;
  if(t===t.toUpperCase()) t = t.toLowerCase();
  return t.charAt(0).toUpperCase()+t.slice(1); }
/* BẢNG SO SÁNH: hiện tại | đọc được (sửa được) | chọn — tên file mới tính lại ngay */
var SS = null;
function moSoSanhGoiY(m, kq, cheSua){
  var cu = cheSua && GOI_Y_SUA ? GOI_Y_SUA.cu : {so:m.soHieu||'', ngay:m.ngay||'', ty:m.tenVB||m.trichYeu||'', loai:m.loai||''};
  var tenGocKhong = boDau((m.tenCu||'').replace(/\.[^.]+$/,''));
  var yeu = function(v){ v = String(v||'').trim(); return !v || boDau(v)===tenGocKhong || /^scan\b/i.test(v); };
  var hom = ngayISO(nay());
  SS = {m:m, kq:kq, cu:cu, cheSua:cheSua};
  var hang = [
    ['so','Số hiệu', cu.so, kq.so, yeu(cu.so)],
    ['ngay','Ngày ban hành', cu.ngay, kq.ngay, !cu.ngay || (cu.ngay===hom && kq.ngay && kq.ngay!==hom)],
    ['loai','Loại', cu.loai, kq.loai, !cu.loai],
    ['ty','Trích yếu / tên văn bản', cu.ty, kq.ty, yeu(cu.ty)]
  ];
  moHop('<div class="hop-tit">🔍 So sánh — đọc từ '+(kq.nguon==='ocr'?'ảnh (OCR)':'chữ trong PDF')+'</div>'+
    '<div class="hop-phu">Cột giữa là thông tin đọc được (sửa được). Tích mục muốn đổi — tên file mới tính lại ngay bên dưới. Chưa lưu gì cho tới khi anh bấm.</div>'+
    '<table class="ss-bang"><thead><tr><th></th><th>Hiện tại</th><th>Đọc được</th><th>Đổi</th></tr></thead><tbody>'+
    hang.map(function(h){
      var khac = String(h[2]||'')!==String(h[3]||'') && !!h[3];
      var hien = h[0]==='ngay' ? ngayVN(h[2]||'') : (h[2]||'');
      return '<tr class="'+(khac?'ss-khac':'ss-giong')+'"><th>'+h[1]+(kq.tu[h[0]]?'<small>'+coChuHTML(kq.tu[h[0]])+'</small>':'')+'</th>'+
        '<td class="ss-cu">'+(hien ? coChuHTML(hien) : '<i>trống</i>')+'</td>'+
        '<td>'+(h[0]==='ngay' ? '<input type="date" id="ss-'+h[0]+'" value="'+coChuHTML(h[3]||'')+'" oninput="tinhTenSS()">'
              : h[0]==='ty' ? '<textarea id="ss-'+h[0]+'" rows="2" oninput="tinhTenSS()">'+coChuHTML(h[3]||'')+'</textarea>'
              : '<input id="ss-'+h[0]+'" value="'+coChuHTML(h[3]||'')+'" oninput="tinhTenSS()">')+'</td>'+
        '<td class="ss-chon"><input type="checkbox" id="ssc-'+h[0]+'"'+(khac && h[4] ? ' checked' : '')+(h[3]?'':' disabled')+' onchange="tinhTenSS()">'+
          '<small>'+(khac ? (h[4] ? 'đổi' : 'khác') : (h[3] ? 'giống' : '—'))+'</small></td></tr>';
    }).join('')+
    '<tr class="ss-ten"><th>Tên file</th><td class="ss-cu">'+coChuHTML(m.tenMoi||m.tenCu||'')+'</td><td colspan="2"><b id="ss-tenmoi"></b></td></tr>'+
    '</tbody></table>'+
    '<details class="ss-chu"><summary>Xem chữ đọc được</summary><textarea readonly rows="10">'+coChuHTML(kq.chu||'')+'</textarea></details>'+
    '<div class="hang-nut"><button class="nho" onclick="'+(cheSua ? 'GOI_Y_SUA=null;suaCho(\''+m.id+'\')' : 'dongHop()')+'">Giữ nguyên</button>'+
      '<button class="nho chinh" onclick="apDungSS()">Áp dụng mục đã chọn</button></div>', true);
  ganXemBen(m);   /* 3.61 */
  tinhTenSS();
}
function giaTriSS(){
  var r = {}; ['so','ngay','loai','ty'].forEach(function(k){ var c = document.getElementById('ssc-'+k); if(c && c.checked) r[k] = gt('ss-'+k); }); return r;
}
function tinhTenSS(){
  if(!SS) return; var g = giaTriSS(), m = SS.m, x = {};
  for(var k in m) x[k] = m[k];
  x.soHieu = 'so' in g ? g.so : SS.cu.so; x.ngay = 'ngay' in g ? g.ngay : SS.cu.ngay; x.loai = 'loai' in g ? g.loai : SS.cu.loai;
  x.trichYeu = x.tenVB = 'ty' in g ? g.ty : SS.cu.ty;
  var e = document.getElementById('ss-tenmoi'); if(e) e.textContent = tenVanBan(x, m.duoi);
}
function apDungSS(){
  if(!SS) return; var g = giaTriSS(), m = SS.m;
  if(SS.cheSua){ if(GOI_Y_SUA) GOI_Y_SUA.moi = g; return suaCho(m.id); }
  if('so' in g) m.soHieu = g.so;
  if('ngay' in g) m.ngay = g.ngay;
  if('loai' in g && g.loai) m.loai = g.loai;
  if('ty' in g){ m.trichYeu = g.ty; if(m.tenVB) m.tenVB = g.ty; }
  m.chac = !!(m.soHieu && m.ngay && (m.trichYeu||m.tenVB));
  m.canCu = 'Đọc lại '+(SS.kq.nguon==='ocr'?'(OCR)':'(chữ PDF)')+' — anh đã chọn mục đổi';
  var tenCu = m.tenMoi; m.tenMoi = tenVanBan(m, m.duoi);
  if(m.driveId && tenCu!==m.tenMoi) m.choDB = true;
  m.suaLuc = new Date().toISOString();
  luu(); dongHop(); ve();
  bao(Object.keys(g).length ? 'Đã đổi '+Object.keys(g).length+' mục · tên file: '+m.tenMoi : 'Không đổi gì.', 6);
}

/* ==========================================================
   3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi").
   Cài một lần bằng file .reg (không cần quyền quản trị): đăng ký lối mở "tuhoso:" → PowerShell ẩn chạy script nhúng sẵn.
   Lệnh: mo (mở bằng Word/Excel/PDF), xem (chép ra thư mục tạm của Windows rồi mở — bản tạm tự xóa sau 12 giờ),
         chep (chép FILE vào bộ nhớ tạm → Zalo / email bấm Ctrl+V), thumuc (mở thư mục, chọn sẵn file), thu (thử).
   An toàn: chỉ file nằm trong thư mục Tủ hồ sơ, chỉ PDF / Word / Excel / ảnh; không chạy .exe, không nhận ".." hay ký tự lạ.
   ========================================================== */
var CN_KHOA = 'tuhoso_caunoi';   /* cài theo TỪNG MÁY — không đồng bộ qua cài đặt chung */
function coCauNoi(){ try{ return !laDT() && localStorage.getItem(CN_KHOA)==='1'; }catch(e){ return false; } }
function datCauNoi(v){ try{ localStorage.setItem(CN_KHOA, v?'1':'0'); }catch(e){} veLaiCDNeuCan(); }
function scriptCauNoi(){
  var goc = String(D.cauHinh.thumuc||'Tủ hồ sơ').replace(/'/g, "''");
  return [
"$ErrorActionPreference='Stop'",
"function Bao($t){ if($env:TUHOSO_THU){ Write-Output $t; return }; Add-Type -AssemblyName System.Windows.Forms; [void][System.Windows.Forms.MessageBox]::Show($t,'Tu ho so') }",
"try{",
" $s = $u -replace '^tuhoso:(//)?',''",
" $i = $s.IndexOf('/'); if($i -lt 0){ $hanh = $s; $rel = '' } else { $hanh = $s.Substring(0,$i); $rel = [Uri]::UnescapeDataString($s.Substring($i+1)) }",
" $goc = '"+goc+"'",
" $root = $null",
" foreach($d in [IO.DriveInfo]::GetDrives()){ if(-not $d.IsReady){ continue }",
"  foreach($n in @('My Drive',('Drive c'+[char]0x1EE7+'a t'+[char]0xF4+'i'))){ $p = Join-Path $d.RootDirectory.FullName $n",
"   if(Test-Path -LiteralPath (Join-Path $p $goc)){ $root = $p; break } }",
"  if($root){ break } }",
" if(-not $root){ Bao (\"Chưa thấy thư mục '\"+$goc+\"' trong ổ Google Drive (My Drive). Mở Google Drive cho máy tính rồi thử lại.\"); exit }",
" if($hanh -eq 'thu'){ Bao (\"Cầu nối đã chạy (bản 2).`nThư mục Drive: \"+$root); exit }",
" if($hanh -eq 'chepn'){",
"  $b = $rel.Replace('-','+').Replace('_','/'); while($b.Length % 4){ $b += '=' }",
"  $ds = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b)) -split \"`n\"",
"  $c = New-Object System.Collections.Specialized.StringCollection; $thieu = @()",
"  foreach($r in $ds){ $pp = @($r -split '/' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })",
"   if($pp.Count -lt 2 -or $pp[0].Normalize() -ne $goc.Normalize() -or @($pp | Where-Object { $_ -eq '..' -or $_ -eq '.' -or $_ -match '[\\\\:*?\"<>|]' }).Count -gt 0){ continue }",
"   $f = Join-Path $root ($pp -join [IO.Path]::DirectorySeparatorChar); if(Test-Path -LiteralPath $f){ [void]$c.Add($f) } else { $thieu += $pp[-1] } }",
"  if($env:TUHOSO_THU){ Write-Output ('chepn|'+$c.Count+'|'+$thieu.Count); exit }",
"  if($c.Count){ Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetFileDropList($c) }",
"  if($thieu.Count){ Bao (\"Đã chép \"+$c.Count+\" file.`nChưa thấy \"+$thieu.Count+\" file trên máy (Google Drive có thể đang chép về):`n\"+($thieu -join \"`n\")) }",
"  exit }",
" $parts = @($rel -split '/' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })",
" if($parts.Count -lt 2 -or $parts[0].Normalize() -ne $goc.Normalize() -or @($parts | Where-Object { $_ -eq '..' -or $_ -eq '.' -or $_ -match '[\\\\:*?\"<>|]' }).Count -gt 0){ Bao (\"Đường dẫn không hợp lệ:`n\"+$rel+\"`n(thư mục gốc: \"+$goc+\")\"); exit }",
" $path = Join-Path $root ($parts -join [IO.Path]::DirectorySeparatorChar)",
" $ext = [IO.Path]::GetExtension($path).ToLower()",
" if(@('.pdf','.doc','.docx','.xls','.xlsx','.xlsm','.csv','.jpg','.jpeg','.png','.rtf','.odt','.ods') -notcontains $ext){ Bao 'Loại file này không mở qua cầu nối.'; exit }",
" if(-not (Test-Path -LiteralPath $path)){ Bao (\"Chưa thấy file trên máy:`n\"+$path+\"`n`nGoogle Drive có thể đang chép về — chờ ít phút rồi thử lại.\"); exit }",
" if($env:TUHOSO_THU){ Write-Output ($hanh+'|'+$path); exit }",
" switch($hanh){",
"  'mo'     { Start-Process -FilePath $path }",
"  'xem'    { $t = Join-Path $env:TEMP 'TuHoSo'; New-Item -ItemType Directory -Force -Path $t | Out-Null",
"             Get-ChildItem -LiteralPath $t -File | Where-Object { $_.LastWriteTime -lt (Get-Date).AddHours(-12) } | Remove-Item -Force -ErrorAction SilentlyContinue",
"             $dst = Join-Path $t ([IO.Path]::GetFileName($path)); if(Test-Path -LiteralPath $dst){ Remove-Item -LiteralPath $dst -Force }",
"             Copy-Item -LiteralPath $path -Destination $dst -Force; (Get-Item -LiteralPath $dst).IsReadOnly = $true; Start-Process -FilePath $dst }",
"  'chep'   { Add-Type -AssemblyName System.Windows.Forms; $c = New-Object System.Collections.Specialized.StringCollection; [void]$c.Add($path); [System.Windows.Forms.Clipboard]::SetFileDropList($c) }",
"  'thumuc' { Start-Process -FilePath 'explorer.exe' -ArgumentList ('/select,\"'+$path+'\"') }",
"  default  { Bao 'Lệnh không hợp lệ.' }",
" }",
"}catch{ Bao ('Cầu nối gặp lỗi: '+$_.Exception.Message) }"].join('\r\n');
}
function b64Unicode(t){ var u = ''; for(var i=0;i<t.length;i++){ var c = t.charCodeAt(i); u += String.fromCharCode(c & 255, c >> 8); } return btoa(u); }
function taiBoCaiCauNoi(go){
  var noi;
  if(go) noi = 'Windows Registry Editor Version 5.00\r\n\r\n[-HKEY_CURRENT_USER\\Software\\Classes\\tuhoso]\r\n';
  else {
    var lenh = 'powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -Command "$u=\'%1\'; iex ([Text.Encoding]::Unicode.GetString([Convert]::FromBase64String(\''+
      b64Unicode(scriptCauNoi())+'\')))"';
    noi = 'Windows Registry Editor Version 5.00\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso]\r\n@="URL:Tu ho so"\r\n"URL Protocol"=""\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell]\r\n\r\n[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell\\open]\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell\\open\\command]\r\n@="'+lenh.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"\r\n';
  }
  /* .reg chuẩn là UTF-16 LE có BOM */
  var buf = new Uint8Array(2 + noi.length*2); buf[0] = 0xFF; buf[1] = 0xFE;
  for(var i=0;i<noi.length;i++){ var c = noi.charCodeAt(i); buf[2+i*2] = c & 255; buf[3+i*2] = c >> 8; }
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([buf], {type:'application/octet-stream'}));
  a.download = go ? 'go-cau-noi-tu-ho-so.reg' : 'cai-cau-noi-tu-ho-so.reg'; document.body.appendChild(a); a.click(); thuHoiSau(a.href); setTimeout(function(){ a.remove(); }, 1000);
  bao(go ? 'Đã tải file gỡ — bấm đúp để gỡ cầu nối.' : 'Đã tải bộ cài — mở thư mục Tải về, bấm đúp file .reg → Yes → OK. Rồi bấm "Mở thử".', 9);
}
/* gọi cầu nối: rel = đường dẫn trong Drive "Tủ hồ sơ/…/tên file" */
function goiCauNoi(hanh, rel){
  /* 3.389.1 (anh 27/10: cầu nối báo "Đường dẫn không hợp lệ"): đường dẫn phải bắt đầu bằng thư mục gốc — sai thì báo rõ đường dẫn ngay ở app */
  var nf = function(t){ t = String(t||'').trim(); return t.normalize ? t.normalize('NFC') : t; };
  if(hanh!=='thu' && hanh!=='chepn' && nf(String(rel||'').split('/')[0])!==nf(D.cauHinh.thumuc||'Tủ hồ sơ'))
    return baoLoi('File này không nằm trong thư mục gốc "'+(D.cauHinh.thumuc||'Tủ hồ sơ')+'" nên cầu nối không chép được. Đường dẫn: '+rel);
  var u = 'tuhoso:'+hanh+'/'+encodeURIComponent(String(rel||'')).replace(/'/g,'%27').replace(/%2F/g,'/');
  var f = document.createElement('iframe'); f.style.display = 'none'; f.src = u; document.body.appendChild(f);
  setTimeout(function(){ f.remove(); }, 3000);
  if(hanh==='chep') bao('📋 Đã chép file — mở Zalo (hoặc email, thư mục), bấm vào ô chat rồi Ctrl+V.', 7);
}
/* 3.106 (anh chốt): 📋 chép 1 file từ dòng danh sách · chép nhiều file một lần (cầu nối bản 2, lệnh chepn — danh sách gói base64url UTF-8 cho gọn đường dẫn) */
var CN_CHEP_CON = [];
function cnBan2(){ try{ return localStorage.getItem('tuhoso_cn_ban')==='2'; }catch(e){ return false; } }
function chepMot(id){
  var x = timMuc(id) || (D.bieuMau||[]).find(function(z){ return z.id===id; }) || timScan(id);
  if(!x) return;
  if(!coCauNoi()) return hoiCaiCauNoi(function(){ bao('Chưa cài cầu nối: dùng Gửi cả file để tải file.', 5); });
  var rel = relCua(x); if(!rel) return baoLoi('File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  goiCauNoi('chep', rel);
}
function b64url(t){ var u = unescape(encodeURIComponent(t)); return btoa(u).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function chepNhieu(ds){   /* ds = [mục] → chép tối đa 20 file / lần (ít hơn nếu tên dài — giới hạn độ dài lệnh Windows); còn lại → "Chép tiếp" */
  if(!coCauNoi()) return hoiCaiCauNoi(function(){ bao('Chưa cài cầu nối: chép nhiều file cần cầu nối.', 5); });
  if(!cnBan2()) return hoiCauNoiBan2(function(){ chepNhieu(ds); });
  var co = [], chua = [];
  ds.forEach(function(x){ var r = relCua(x); if(r) co.push(r); else chua.push(x.tenMoi||x.tenCu||x.ten||'file'); });
  if(!co.length) return baoLoi('Các file đã chọn chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  var lo = [];
  while(co.length && lo.length<20 && b64url(lo.concat([co[0]]).join('\n')).length<=1800) lo.push(co.shift());
  if(!lo.length) lo.push(co.shift());
  CN_CHEP_CON = co;
  goiCauNoi('chepn', b64url(lo.join('\n')));
  bao('📋 Đã chép '+lo.length+' file — mở Zalo / email / thư mục, bấm Ctrl+V một lần là dán hết.'+(chua.length ? ' · '+chua.length+' file chưa lên Drive nên bỏ qua.' : '')+(co.length ? ' · Còn '+co.length+' file: dán xong bấm "📋 Chép tiếp".' : ''), 9);
  capNhatBot();
}
function chepTiep(){ if(!CN_CHEP_CON.length) return; var con = CN_CHEP_CON; CN_CHEP_CON = []; chepNhieuRel(con); }
function chepNhieuRel(co){ var lo = []; while(co.length && lo.length<20 && b64url(lo.concat([co[0]]).join('\n')).length<=1800) lo.push(co.shift()); if(!lo.length) lo.push(co.shift());
  CN_CHEP_CON = co; goiCauNoi('chepn', b64url(lo.join('\n'))); bao('📋 Đã chép thêm '+lo.length+' file — Ctrl+V để dán.'+(co.length ? ' Còn '+co.length+' file.' : ''), 8); capNhatBot(); }
function hoiCauNoiBan2(sau){
  window.__cnSau = sau;
  moHop('<h3>📋 Chép nhiều file cần cầu nối bản mới</h3>'+
    '<div class="huong-dan">Cầu nối đang cài trên máy chỉ chép được <b>1 file</b>. Cài lại <b>1 lần</b> để chép nhiều file: bấm <b>⬇ Tải bộ cài mới</b> → mở file .reg → Yes → OK, rồi bấm <b>Mở thử</b> — hộp hiện chữ <b>“bản 2”</b> là xong.</div>'+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho chinh" onclick="taiBoCaiCauNoi()">⬇ Tải bộ cài mới</button>'+
    '<button class="nho" onclick="dongHop();moThuCauNoi()">Mở thử</button>'+
    '<button class="nho" onclick="try{localStorage.setItem(\'tuhoso_cn_ban\',\'2\')}catch(e){};dongHop();(window.__cnSau||function(){})()">Đã cài bản mới — chép luôn</button>'+
    '<button class="nho" data-lenh="hop.dong">Đóng (Esc)</button></div>');
}
function relDrive(duong, ten){ return String(duong||'').split('/').map(function(x){ return x.trim(); }).filter(Boolean).concat([ten]).join('/'); }
/* đường dẫn trong Drive của một mục bất kỳ (văn bản, biểu mẫu, bản scan, chữ ký · CCCD) — '' nếu chưa lên Drive */
function relCua(x){
  if(!x || !x.driveId) return '';
  if(x.che) return relDrive(duongScan(x), tenScanDrive(x));
  if(/^ka/.test(x.id||'') && x.loai) return relDrive(duongKA((x.ngay||'').slice(0,7)), x.ten);
  return relDrive(thuMucCua(x), x.tenMoi||x.tenCu||'');
}
function cnHanh(hanh, loai, id){
  var x = loai==='scan' ? timScan(id) : (loai==='ka' ? (D.kyAnh||[]).find(function(k){ return k.id===id; }) : timMucMo(id));
  var rel = relCua(x);
  if(!rel) return baoLoi('File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  goiCauNoi(hanh, rel);
}
/* 3.49: Mở thử → hỏi "có thấy hộp Cầu nối đã chạy?" → Có thì tự bật "Máy này đã cài cầu nối" (khỏi phải tìm ô tích) */
function moThuCauNoi(){
  goiCauNoi('thu', '');
  setTimeout(function(){
    hoi('Có thấy hộp “Cầu nối đã chạy”?', 'Có hộp đó hiện lên là máy này đã cài xong — app bật các nút 🖥 Mở trên máy · 📋 Chép file · 📂 Thư mục ở khung xem. '+
      'Không thấy gì thì tải lại bộ cài, bấm đúp file .reg → Yes → OK rồi Mở thử lại.', 'Có, đã thấy', function(){
      datCauNoi(true); try{ localStorage.removeItem('tuhoso_cn_an'); localStorage.setItem('tuhoso_cn_ban', '2'); }catch(e){}   /* 3.106: bộ cài hiện tại là bản 2 (chép nhiều file) */
      if(mucDangXem) veNutCN(mucDangXem);
      bao('Đã bật cầu nối cho máy này.', 4);
    });
  }, 2500);
}
/* 3.49: nút cầu nối ngay ở khung xem (cạnh Gửi cả file / In / Sửa) — trước chỉ nằm trong menu ⋯ */
function veNutCN(m){
  var h = '', meo = '';
  if(m && !laDT()){
    if(coCauNoi()){
      var co = !!m.driveId, nhat = co ? '' : ' class="mo-nhat"',
          goi = function(hanh){ return co ? 'cnHanh(\''+hanh+'\',\'muc\',\''+m.id+'\')'
            : 'baoLoi(\'File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay, chờ ít phút rồi bấm lại.\')'; },
          tip = co ? '' : ' (chưa lên Drive)';
      h = '<button'+nhat+' onclick="'+goi('mo')+'" title="Mở thẳng bằng Word / Excel / trình đọc PDF trên máy'+tip+'">🖥 Mở máy</button>'+
          '<button'+nhat+' onclick="'+goi('chep')+'" title="Chép file — Ctrl+V vào Zalo'+tip+'">📋 Chép</button>'+
          '<button'+nhat+' onclick="'+goi('thumuc')+'" title="Mở thư mục chứa file'+tip+'">📂</button>';
    } else {
      /* 3.62 (việc U, anh chốt): bỏ dòng nhắc dưới khung xem — chỉ một nút nhỏ; bấm lần đầu mới hỏi cài, "Để sau" thì thôi hẳn */
      if(!cnDaBoQua()) h = '<button onclick="hoiCaiCauNoi(function(){ bao(\'Chưa cài cầu nối: dùng Gửi cả file để mở / tải file.\', 5); })" title="Mở thẳng file trên máy (cần cầu nối — cài 1 lần)">🖥 Mở máy</button>';
    }
  }
  ['cp-cn','x-cn'].forEach(function(id){ var e = document.getElementById(id); if(e) e.innerHTML = h; });
  var e2 = document.getElementById('cp-cnmeo'); if(e2) e2.innerHTML = meo;
}
/* 3.62 (việc U): máy tính chưa xác nhận cài cầu nối → chỉ hỏi khi anh bấm việc cần cầu nối; cài rồi / "Để sau" thì không nhắc nữa */
function cnDaBoQua(){ try{ return localStorage.getItem('tuhoso_cn_an')==='1'; }catch(e){ return false; } }
function hoiCaiCauNoi(duPhong){
  duPhong = duPhong || function(){};
  if(laDT() || coCauNoi() || cnDaBoQua()) return duPhong();
  window.__cnDuPhong = duPhong;
  moHop('<h3>🖥 Máy này chưa cài cầu nối</h3>'+
    '<div class="huong-dan">Cầu nối giúp <b>mở thẳng file trên máy</b> (Word / Excel / PDF), <b>chép đúng file</b> để Ctrl+V vào Zalo và <b>mở thư mục</b> chứa file. Chỉ cài <b>1 lần</b> cho mỗi máy tính.</div>'+
    '<ol class="huong-dan" style="margin:6px 0 0 18px;padding:0"><li>Bấm <b>⬇ Tải bộ cài</b> → mở file .reg vừa tải → Yes → OK.</li><li>Bấm <b>Mở thử</b> — thấy hộp "Cầu nối đã chạy" là xong, app nhớ cho máy này.</li></ol>'+
    '<div class="hang-nut" style="margin-top:12px">'+
      '<button class="nho chinh" onclick="taiBoCaiCauNoi()">⬇ Tải bộ cài</button>'+
      '<button class="nho" onclick="dongHop();moThuCauNoi()">Mở thử</button>'+
      '<button class="nho" onclick="try{localStorage.setItem(\'tuhoso_cn_an\',\'1\')}catch(e){};dongHop();if(mucDangXem)veNutCN(mucDangXem);(window.__cnDuPhong||function(){})()">Để sau (không nhắc nữa)</button>'+
      '<button class="nho" data-lenh="hop.dong">Đóng (Esc)</button>'+
    '</div>');
}
/* các nút cầu nối (chỉ máy tính đã cài) */
/* máy chưa cài cầu nối: PDF / ảnh mở ngay trong tab trình duyệt (không lưu file); Word / Excel thì tải về */
function xemTrongTab(bl, ten){
  if(/pdf|image/.test(bl.type||'') || /\.(pdf|jpe?g|png)$/i.test(ten||'')){ var u = URL.createObjectURL(bl); window.open(u, '_blank'); setTimeout(function(){ URL.revokeObjectURL(u); }, 60000); return; }
  var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = ten||'file'; document.body.appendChild(a); a.click(); thuHoiSau(a.href); a.remove();
}

/* lưu tạm: tên tự đặt theo ngày giờ quét, khai sau */
/* 3.41 (anh chốt): lưu tạm đặt tên "Scan ngày-tháng-năm giờ" để biết mà sửa tên lại; trùng thì thêm (2), (3)… */
function tenLuuTam(d, hau){
  var goc = 'Scan '+hai(d.getDate())+'-'+hai(d.getMonth()+1)+'-'+d.getFullYear()+' '+
    hai(d.getHours())+'h'+hai(d.getMinutes())+'m'+hai(d.getSeconds())+(hau ? ' '+hau : '');
  var co = {}; (D.scan||[]).forEach(function(k){ co[k.ten] = 1; });
  var ten = goc, n = 2;
  while(co[ten]){ ten = goc+' ('+n+')'; n++; }
  return ten;
}
function luuSauHang(){
  var d = nay();
  var k = {id:idMoi(), che:SC.che, chuaKhai:true,
    ten:tenLuuTam(d),
    ngay:ngayISO(d), gioQuet:d.toISOString(),
    xa:'', diem:'', ap:'', to:'', ghi:'', tag:[], ctrinh:[],
    taoLuc:d.toISOString()};
  if(SC.che==='the'){
    var anh = HANG.filter(function(x){ return x.kieu==='anh'; });
    if(anh.length>2){
      /* nhiều hơn 2 ảnh thì tách thành nhiều bản, mỗi bản 2 mặt */
      luuNhieuThe(anh); return;
    }
    k.matTruoc = !!anh[0]; k.matSau = !!anh[1];
    /* 3.33: chờ chép ảnh sang tên mới XONG rồi mới lưu và báo (trước đây báo xong trong khi ảnh còn đang chép) */
    var ch = Promise.resolve();
    if(anh[0]) ch = ch.then(function(){ return doiTenAnh(anh[0].id, k.id+'_matTruoc'); });
    if(anh[1]) ch = ch.then(function(){ return doiTenAnh(anh[1].id, k.id+'_matSau'); });
    return ch.then(function(){ ghiLuuTam([k], 'Đã lưu tạm. Vào tab Scan khai và lưu hàng loạt khi rảnh.'); })
      .catch(function(e){ baoLoi('Chưa lưu được ảnh: '+(e&&e.message||e)); });
  }else{
    /* 3.35: gồm cả trang PDF (trước đây PDF chọn từ nguồn File bị bỏ mất khi lưu) */
    k.trang = HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).map(hangRaTrang);
  }
  ghiLuuTam([k], 'Đã lưu tạm. Vào tab Scan khai và lưu hàng loạt khi rảnh.');
}
function ghiLuuTam(ds, loiBao){
  var bay = new Date().toISOString();
  D.scan = D.scan || []; ds.forEach(function(k){ k.may = maMayCua(); k.suaLuc = bay; D.scan.push(k); }); HS.ds = D.scan;
  donGocHang(); HANG = []; luu(); dongHop(); veScan();
  if(D.cauHinh.dbSauLuu!==false) henDongBoScan();   /* 3.46: lưu tạm xong đưa lên Drive liền (có mạng) */
  if(SAU_LUU_TAM){ var f = SAU_LUU_TAM; SAU_LUU_TAM = null; return f(ds); }
  bao(loiBao, 7);
}
function luuNhieuThe(anh){
  var d = nay(), ds = [], ch = Promise.resolve();
  for(var i=0;i<anh.length;i+=2){
    var k = {id:idMoi(), che:'the', chuaKhai:true,
      ten:tenLuuTam(d, '- người '+(i/2+1)),
      ngay:ngayISO(d), gioQuet:d.toISOString(),
      xa:'', diem:'', ap:'', to:'', ghi:'', tag:[], ctrinh:[],
      taoLuc:d.toISOString()};
    (function(k, a, b){
      ch = ch.then(function(){ return doiTenAnh(a.id, k.id+'_matTruoc'); })
        .then(function(){ return b ? doiTenAnh(b.id, k.id+'_matSau') : null; });
    })(k, anh[i], anh[i+1]);
    k.matTruoc = true; k.matSau = !!anh[i+1];
    ds.push(k);
  }
  return ch.then(function(){ ghiLuuTam(ds, 'Đã lưu tạm '+ds.length+' bản. Khai sau khi rảnh.'); })
    .catch(function(e){ baoLoi('Chưa lưu được ảnh: '+(e&&e.message||e)); });
}
function doiTenAnh(idCu, idMoiT){
  return docFile('hs_'+idCu).then(function(b){
    if(!b) return;
    return luuFile('hs_'+idMoiT, b).then(function(){ return xoaFile('hs_'+idCu); });
  });
}

/* khai đầy đủ rồi lưu */

/* ---- CHẾ ĐỘ TÀI LIỆU: chụp nhiều trang rồi ghép ---- */
function scanTaiLieu(id){
  var k = id ? D.scan.find(function(x){ return x.id===id; })
             : {id:idMoi(), che:'tailieu', ten:'', ngay:ngayISO(nay()),
                xa:D.cauHinh.hsXaCuoi||'', diem:'', ap:D.cauHinh.hsApCuoi||'',
                to:D.cauHinh.hsToCuoi||'', ghi:'', trang:[], tag:[], ctrinh:[],
                taoLuc:new Date().toISOString()};
  window.__k = k;
  /* 3.75 (AP): gọn 1 màn hình — trái ô nhập, phải xem các trang */
  moHop('<div class="sua-trai">'+
    '<div class="hop-tit" title="Chụp lần lượt từng trang. App tự tìm tờ giấy, nắn thẳng và làm trắng nền, xong ghép thành một file PDF.">'+(id?'Sửa bản quét tài liệu':'Quét tài liệu')+'</div>'+
    '<div class="sg-hd" id="sg-hd"><span class="sg-goi">💡 Bấm vào ô để xem hướng dẫn và ví dụ</span></div>'+
    '<div class="sg-khoi">'+
      '<div class="o"><label>Tên tài liệu</label><input id="k-ten" value="'+coChuHTML(k.ten||'')+'" placeholder="Ví dụ: Đơn vay NS&VSMT hộ Nguyễn Văn A" autocomplete="off"></div>'+
      '<div id="k-diaban" class="q-db">'+veDiaBan(k)+'</div>'+
      '<div class="o"><label>Ghi chú <small>(không bắt buộc)</small></label><input id="k-ghi" value="'+coChuHTML(k.ghi||'')+'" placeholder="Không bắt buộc" autocomplete="off"></div>'+
    '</div>'+
    '<div class="sg-khoi q-chip">'+oChonCT(k.ctrinh||[], 'k-ct')+
      oChonTag('scan', k.tag||[], 'k-tag').replace('<label>Tag thuộc tính — chọn được nhiều</label>',
        '<label>Tag <small>(chọn được nhiều)</small> <a class="lk" onclick="suaTagTab(\'scan\')">✎ sửa danh sách</a></label>')+'</div>'+
    '<div class="sg-khoi q-chup"><div>'+
      '<button class="nho sg-ico" onclick="themTrang(1)">📷 Chụp trang</button>'+
      '<button class="nho sg-ico" onclick="themTrang(0)">🖼 Chọn ảnh</button>'+
      '<button class="nho sg-ico" onclick="themTrangPDF()">＋ Chọn PDF</button></div></div>'+
    '<div class="day-form">'+(id?'<span class="xoa-nho" onclick="xoaKhach(\''+id+'\')">🗑 Xóa</span>':'')+
      '<button class="nho" data-lenh="hop.dong">Đóng (Esc)</button>'+
      '<button class="nho chinh" onclick="luuScanTL()">Lưu bản quét <small>Ctrl+Enter</small></button></div>'+
    '</div>'+
    '<div class="sua-xem q-xem"><div class="q-xem-tit" id="nn-trang">Các trang ('+(k.trang||[]).length+')</div><div id="k-xem"></div></div>',
    true);
  quetGon('tl');
  veTrangScan();
}
function themTrang(chup){
  var k0 = window.__k;
  if(k0 && document.getElementById('k-ten')){
    k0.ten = gt('k-ten'); k0.ghi = gt('k-ghi');
    k0.xa = gt('k-xa'); k0.diem = gt('k-diem'); k0.ap = gt('k-ap'); k0.to = gt('k-to');
    k0.ctrinh = layThe('k-ct'); k0.tag = layThe('k-tag');
  }
  var i = document.createElement('input');
  i.type='file'; i.accept='image/*';
  if(chup) i.capture='environment'; else i.multiple = true;
  i.onchange = function(){
    var fs = Array.prototype.slice.call(i.files);
    if(!fs.length) return;
    var k = window.__k;
    bao('Đang cắt, nắn và làm trắng nền '+fs.length+' trang…', 4);
    batChay(true);
    fs.reduce(function(p, f){
      return p.then(function(){
        return chuanAnh(f, 'a4').then(function(b){
          var idT = k.id+'_t'+((k.trang||[]).length+1)+'_'+idMoi();
          return luuAnhHS(idT, b).then(function(){
            k.trang = k.trang || [];
            k.trang.push(idT);
          });
        });
      });
    }, Promise.resolve()).then(function(){
      tatChay(); window.__k = k;
      var n = document.getElementById('nn-trang');
      if(n) n.textContent = 'Các trang ('+k.trang.length+')';
      veTrangScan();
      bao('Đã thêm '+fs.length+' trang.', 3);
    }).catch(function(e){
      tatChay(); baoLoi('Không xử lý được ảnh: '+(e&&e.message||e));
    });
  };
  i.click();
}
function veTrangScan(){
  var k = window.__k, e = document.getElementById('k-xem');
  if(!e) return;
  e.innerHTML = (k.trang||[]).length ? '' : (k.driveId ? '<div class="rong">Trang đang nằm trong file PDF trên Drive — máy này chưa tải về.<br>Chỉ sửa tên / khách / địa bàn thì bấm <b>Lưu</b> được ngay.<br><button class="nho" data-lenh="tl.taiTrang">☁ Tải trang từ Drive</button> để xem / thêm trang.</div>'
    : '<div class="rong">Chưa có trang nào.<br>Bấm <b>📷 Chụp trang</b>, <b>🖼 Chọn ảnh</b> hoặc <b>＋ Chọn PDF</b> ở bên trái.</div>');   /* 3.279 */
  var n = (k.trang||[]).length;
  (k.trang||[]).forEach(function(idT, i){
    var d = document.createElement('div');
    d.style.cssText = 'margin-bottom:8px;position:relative';
    /* 3.35: dời thứ tự trang, trang PDF xoay được */
    d.innerHTML = '<div class="huong-dan" style="margin:0 0 4px">Trang '+(i+1)+(laTrangPDF(idT)?' · PDF':'')+
      ' <b style="cursor:pointer;color:var(--do)" onclick="boTrang('+i+')">bỏ</b>'+
      ' · <b style="cursor:pointer" onclick="xoayTrang('+i+')">xoay</b>'+
      (i>0?' · <b style="cursor:pointer" onclick="dichTrang('+i+',-1)">◀ lên</b>':'')+
      (i<n-1?' · <b style="cursor:pointer" onclick="dichTrang('+i+',1)">xuống ▶</b>':'')+'</div>';
    var im = document.createElement('img');
    im.style.cssText = 'width:100%;border-radius:9px;border:1px solid var(--vien)';
    d.appendChild(im); e.appendChild(d);
    anhTrangHS(idT, im);
  });
}
/* 3.35: hiện một trang của bản tài liệu — ảnh, hoặc trang PDF gốc (vẽ bằng pdf.js) */
function anhTrangHS(idT, im){
  if(laTrangPDF(idT)) return anhTrangPDF(idT, 700).then(function(u){ im.src = u; }).catch(function(){ im.alt = 'Không xem trước được trang PDF'; });
  return docAnhHS(idT).then(function(b){ if(b) anhTam(im, b); });
}
function capNhatSoTrang(){
  var k = window.__k, n = document.getElementById('nn-trang');
  if(n) n.textContent = 'Các trang ('+(k.trang||[]).length+')';
}
function boTrang(i){
  var k = window.__k;
  var idT = k.trang.splice(i,1)[0];
  if(laTrangPDF(idT)){
    var ng = tachTrangPDF(idT).nguon;
    if(!k.trang.some(function(t){ return laTrangPDF(t) && tachTrangPDF(t).nguon===ng; })) xoaFile('hs_'+ng);
  } else xoaFile('hs_'+idT);
  capNhatSoTrang();
  veTrangScan();
}
function dichTrang(i, d){
  var k = window.__k, j = i+d; if(!k.trang || j<0 || j>=k.trang.length) return;
  var t = k.trang[i]; k.trang[i] = k.trang[j]; k.trang[j] = t; veTrangScan();
}
function xoayTrang(i){
  var k = window.__k, idT = k.trang[i];
  if(laTrangPDF(idT)){ var o = tachTrangPDF(idT); o.xoay = (o.xoay+90)%360; k.trang[i] = ghepTrangPDF(o); return veTrangScan(); }
  batChay(true);
  docAnhHS(idT).then(function(b){
    if(!b) throw new Error('không đọc được');
    return xoayAnh(b).then(function(b2){ return luuAnhHS(idT, b2); });
  }).then(function(){ tatChay(); veTrangScan(); })
  .catch(function(e){ tatChay(); baoLoi('Không xoay được: '+(e&&e.message||e)); });
}
/* 3.35: chèn trang từ file PDF có sẵn vào bản tài liệu đang sửa (thêm vào cuối, dời ◀ ▶ tới chỗ cần) */
function themTrangPDF(){
  var k0 = window.__k;
  if(k0 && document.getElementById('k-ten')){
    k0.ten = gt('k-ten'); k0.ghi = gt('k-ghi');
    k0.xa = gt('k-xa'); k0.diem = gt('k-diem'); k0.ap = gt('k-ap'); k0.to = gt('k-to');
    k0.ctrinh = layThe('k-ct'); k0.tag = layThe('k-tag');
  }
  chonTepPDF(function(fs){
    var k = window.__k; batChay(true);
    fs.reduce(function(p, f){
      return p.then(function(){ return catPDFNguon(f).then(function(ds){
        k.trang = k.trang || []; ds.forEach(function(o){ k.trang.push(ghepTrangPDF(o)); }); }); });
    }, Promise.resolve()).then(function(){
      tatChay(); capNhatSoTrang(); veTrangScan(); bao('Đã thêm các trang PDF vào cuối.', 4);
    }).catch(function(e){ tatChay(); baoLoi('Không đọc được PDF: '+(e&&e.message||e)); });
  });
}
function luuScanTL(){
  var k = window.__k;
  k.ten = gt('k-ten'); k.ghi = gt('k-ghi');
  k.xa = gt('k-xa'); k.diem = gt('k-diem'); k.ap = gt('k-ap'); k.to = gt('k-to');
  k.ctrinh = layThe('k-ct'); k.tag = layThe('k-tag');
  if(!k.ten) return baoLoi('Chưa đặt tên tài liệu.');
  if(!(k.trang||[]).length && !k.driveId) return baoLoi('Chưa có trang nào.');   /* 3.279: bản chỉ có PDF trên Drive (máy này chưa có trang) — vẫn lưu tên / khách / địa bàn */
  if(!k.diem && k.xa && k.ap) k.diem = diemCuaAp(k.xa, k.ap) || '';   /* 3.33: không tự điền địa bàn lần trước */
  delete k.chuaKhai; k.suaLuc = new Date().toISOString(); if(k.driveId) k.canDay = true;
  D.cauHinh.hsXaCuoi = k.xa; D.cauHinh.hsApCuoi = k.ap; D.cauHinh.hsToCuoi = k.to;
  ghiTagGanDay('scan', k.tag);
  D.scan = D.scan || [];
  var i = D.scan.findIndex(function(x){ return x.id===k.id; });
  if(i>=0) D.scan[i] = k; else D.scan.push(k);
  luu(); dongHop(); ve();
  bao((k.trang||[]).length ? 'Đã lưu bản quét '+(k.trang||[]).length+' trang.' : 'Đã lưu tên / khách / địa bàn — PDF trên Drive đổi tên, dời đúng thư mục (nội dung giữ nguyên).', 5);
  if(D.cauHinh.hsTuDrive!==false && coTheNoiDrive()) dayScanNhieu([k.id]);   /* 3.33: tài liệu cũng tự lên Drive */
}

/* ---- xoay ảnh 90° ---- */
function xoayAnh(blob){
  return new Promise(function(ok, loi){
    var img = new Image(), u = URL.createObjectURL(blob);   /* 3.239: trả bộ nhớ sau khi đọc (trước không trả → Safari đầy khi xoay nhiều thẻ) */
    img.onload = function(){
      thuHoiSau(u, 0);
      var c = document.createElement('canvas');
      c.width = img.height; c.height = img.width;
      var x = c.getContext('2d');
      x.translate(c.width/2, c.height/2);
      x.rotate(Math.PI/2);
      x.drawImage(img, -img.width/2, -img.height/2);
      c.toBlob(function(b){ ok(b); }, 'image/jpeg', 0.9);
    };
    img.onerror = function(){ thuHoiSau(u, 0); loi(new Error('không đọc được ảnh')); };
    img.src = u;
  });
}
