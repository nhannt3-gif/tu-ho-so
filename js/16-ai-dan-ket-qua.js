/* ==========================================================
   16. DÁN KẾT QUẢ TỪ AI
   Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày,
   trích yếu rồi so với kết quả app tự đọc để anh chọn bên nào đúng.
   ========================================================== */
var SS = [];   /* bảng so sánh */

/* 3.31: sau khi nhận dữ liệu từ AI — đồng bộ Tên văn bản (tenVB) với trích yếu, đặt lại tên file,
   và đánh dấu chờ cập nhật Drive để tên trên Drive đổi theo */
function apDoiTuAI(m){
  m.tenVB = m.trichYeu || m.tenVB || '';
  m.tenMoi = tenVanBan({ngay:m.ngay, soHieu:m.soHieu, loai:m.loai, trichYeu:m.tenVB}, m.duoi);
  m.chac = true;
  m.suaLuc = new Date().toISOString();
  if(m.driveId && !laFileHeThong(m) && D.cho.indexOf(m)<0) m.choDB = true;
}
function moDanAI(){
  moHop('<div class="hop-tit">Dán kết quả từ AI</div>'+
    '<div class="hop-phu">Chép nguyên đoạn Gemini (hay AI khác) trả về rồi dán vào đây. '+
    'App tự tách ra số hiệu, ngày, trích yếu và so với phần app tự đọc.</div>'+
    '<div class="o"><label>Dán vào đây</label>'+
    '<textarea id="dan-ai" style="min-height:190px" placeholder="Ví dụ:&#10;'+
    '2026-09-07 4079/NHCS-TDNN: Hướng dẫn quy trình và tiêu chí rà soát...&#10;'+
    '2026-09-11 958/KH-NHCS: Kế hoạch củng cố, sắp xếp Tổ TK&amp;VV...&#10;&#10;'+
    'Hoặc dạng: Tên file cũ: ... Tên file mới: ..."></textarea>'+
    '<div class="huong-dan">Nhận nhiều dạng: danh sách gạch đầu dòng, bảng, '+
    'hay đoạn “Tên file cũ / Tên file mới”. Không cần sửa gì trước khi dán.</div></div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="docDanAI()">Đọc và so sánh</button></div>', true);
  setTimeout(function(){
    var e = document.getElementById('dan-ai'); if(e) e.focus();
  }, 200);
}

/* tách một đoạn văn bản tự do thành danh sách mục */
function tachDoanAI(t){
  if(!t) return [];
  var ra = [];

  /* dạng 1: có cặp "Tên file cũ ... Tên file mới ..." */
  var re1 = /T[êe]n\s*file\s*c[ũu]\s*:?\s*([^\n]+?)\s*T[êe]n\s*file\s*m[ớo]i\s*:?\s*([^\n]+)/gi;
  var m;
  while((m = re1.exec(t))){
    ra.push({tenCu: m[1].trim().replace(/[.\s]+$/,''), thoAI: m[2].trim()});
  }
  if(ra.length) return ra.map(chiaThanhPhan);

  /* dạng 2: mỗi dòng một mục */
  t.split(/\n+/).forEach(function(d){
    d = d.replace(/^\s*[-•*\u2022]\s*/,'').replace(/^\s*\d+[.)]\s*/,'').trim();
    if(d.length < 12) return;
    /* phải có ít nhất ngày hoặc số hiệu mới coi là một mục */
    if(!/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,6}\s*\/\s*[A-ZĐ]/.test(d)) return;
    ra.push({thoAI: d});
  });
  return ra.map(chiaThanhPhan);
}

function chiaThanhPhan(x){
  var t = (x.thoAI||'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
  var o = {tenCu:x.tenCu||'', tho:t};

  var m = t.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if(m) o.ngay = m[0];
  else {
    m = t.match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](20\d{2})\b/);
    if(m) o.ngay = m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  }

  m = t.match(/\b(\d{1,6})\s*[\/-]\s*([A-ZĐ]{2,10}(?:[\s-]+[A-ZĐ0-9]{2,10}){0,2})(?![a-zà-ỹ])/);
  if(m) o.soHieu = m[1]+'/'+m[2].replace(/[\s-]+/g,'-');

  /* trích yếu: phần sau số hiệu, bỏ dấu hai chấm dẫn */
  var con = t;
  if(o.ngay) con = con.replace(/\b20\d{2}-\d{2}-\d{2}\b|\b\d{1,2}[\/.-]\d{1,2}[\/.-]20\d{2}\b/,' ');
  if(m) con = con.replace(m[0], ' ');
  con = con.replace(/^[\s:.\-–—]+/,'').replace(/\s{2,}/g,' ').trim();
  /* nếu có dấu hai chấm thì phần sau thường là mô tả dài, lấy cả */
  con = con.replace(/^:\s*/,'');
  if(con.length>=6) o.trichYeu = con;
  return o;
}

/* ghép mục AI với mục đang có trong app */
function ghepMuc(x, kho){
  /* 1. khớp theo tên file cũ */
  if(x.tenCu){
    var a = boDau(x.tenCu).replace(/\.[^.]+$/,'').replace(/[^a-z0-9]/g,'');
    var t1 = kho.find(function(m){
      return boDau(m.tenCu||'').replace(/\.[^.]+$/,'').replace(/[^a-z0-9]/g,'') === a; });
    if(t1) return t1;
    var t2 = kho.find(function(m){
      var b = boDau(m.tenCu||'').replace(/[^a-z0-9]/g,'');
      return a.length>8 && (b.indexOf(a.slice(0,14))>=0 || a.indexOf(b.slice(0,14))>=0); });
    if(t2) return t2;
  }
  /* 2. khớp theo số hiệu */
  if(x.soHieu){
    /* 3.31: khớp ĐỦ số + ký hiệu trước; chỉ khớp phần số (958) thì chỉ nhận khi duy nhất, và đánh dấu khớp yếu */
    var chuan = function(v){ return String(v||'').toUpperCase().replace(/\s+/g,'').replace(/Đ/g,'D'); };
    var t3 = kho.find(function(m){ return m.soHieu && chuan(m.soHieu)===chuan(x.soHieu); });
    if(t3) return t3;
    var so = x.soHieu.split('/')[0];
    var ts = kho.filter(function(m){ return (m.soHieu||'').split('/')[0] === so; });
    if(ts.length===1){ x._yeu = true; return ts[0]; }
    if(ts.length>1) return null;
    var t4 = kho.find(function(m){
      return boDau(m.tenCu||'').indexOf(so) >= 0; });
    if(t4){ x._yeu = true; return t4; }
  }
  /* 3. khớp theo ngày + vài chữ đầu trích yếu */
  if(x.ngay && x.trichYeu){
    var d = boDau(x.trichYeu).slice(0,16);
    var t5 = kho.find(function(m){
      return m.ngay===x.ngay &&
        (boDau(m.trichYeu||'').indexOf(d)>=0 || boDau(m.tenCu||'').indexOf(d)>=0); });
    if(t5) return t5;
  }
  return null;
}

function docDanAI(){
  var t = gt('dan-ai');
  if(!t) return baoLoi('Chưa dán nội dung nào.');
  var ds = tachDoanAI(t);
  if(!ds.length) return baoLoi('Không nhận ra mục nào. Cần ít nhất có ngày hoặc số hiệu.');

  var kho = D.cho.concat(D.vanBan);
  SS = ds.map(function(x){
    var m = ghepMuc(x, kho);
    return {ai:x, m:m, chon: m ? (x._yeu ? 'app' : 'ai') : 'bo'};
  });
  veSoSanh();
}

function veSoSanh(){
  var khop = SS.filter(function(r){ return r.m; }).length;
  var h = '<div class="hop-tit">So sánh kết quả</div>'+
    '<div class="hop-phu">Đọc được <b>'+SS.length+'</b> mục từ đoạn anh dán, ghép được <b>'+
    khop+'</b> mục với file trong app. Chọn bên nào đúng cho từng mục.</div>';

  if(!khop){
    h += '<div class="rong">Không ghép được mục nào với file đang có.<br>'+
      'Thường do tên file trong app khác hẳn tên AI nhắc tới.<br>'+
      'Anh thử thêm file (nút Thêm file) trước rồi dán lại.</div>';
  }

  SS.forEach(function(r, i){
    if(!r.m){
      h += '<div class="hang-file hoi">'+
        '<div class="moi">'+coChuHTML(r.ai.trichYeu||r.ai.tho)+'</div>'+
        '<div class="can-cu">Không tìm thấy file tương ứng trong app — bỏ qua mục này</div>'+
        '</div>';
      return;
    }
    var m = r.m, a = r.ai;
    function hangSS(nhan, cuaApp, cuaAI){
      var khac = (cuaApp||'') !== (cuaAI||'');
      return '<tr><td class="nh">'+nhan+'</td>'+
        '<td'+(khac?' class="khac"':'')+'>'+coChuHTML(cuaApp||'—')+'</td>'+
        '<td'+(khac?' class="khac"':'')+'>'+coChuHTML(cuaAI||'—')+'</td></tr>';
    }
    h += '<div class="hang-file">'+
      '<div class="cu">'+coChuHTML(m.tenCu||'')+'</div>'+
      '<table class="ss"><thead><tr><th></th><th>App tự đọc</th><th>AI đưa ra</th></tr></thead><tbody>'+
      hangSS('Số hiệu', m.soHieu, a.soHieu)+
      hangSS('Ngày', ngayVN(m.ngay), ngayVN(a.ngay))+
      hangSS('Trích yếu', m.trichYeu, a.trichYeu)+
      '</tbody></table>'+
      '<div class="hang-nut">'+
        '<button class="nho'+(r.chon==='app'?' chinh':'')+'" onclick="chonBen('+i+',\'app\')">Giữ app</button>'+
        '<button class="nho'+(r.chon==='ai'?' chinh':'')+'" onclick="chonBen('+i+',\'ai\')">Lấy AI</button>'+
        '<button class="nho'+(r.chon==='tron'?' chinh':'')+'" onclick="chonBen('+i+',\'tron\')">Trộn</button>'+
        '<button class="nho'+(r.chon==='bo'?' xau':'')+'" onclick="chonBen('+i+',\'bo\')">Bỏ qua</button>'+
      '</div>'+
      (a._yeu?'<div class="cb-lech">⚠ Chỉ khớp phần số “'+coChuHTML((a.soHieu||'').split('/')[0])+'” — ký hiệu khác nhau, kiểm lại có đúng văn bản không rồi mới chọn Lấy AI.</div>':'')+
      '<div class="huong-dan">Trộn: lấy của AI những chỗ app còn trống, giữ phần app đã đọc được.</div>'+
      '</div>';
  });

  if(khop) h += '<div class="hang-nut" style="margin-top:12px">'+
    '<button class="nho" onclick="chonHetBen(\'app\')">Giữ app hết</button>'+
    '<button class="nho" onclick="chonHetBen(\'ai\')">Lấy AI hết</button>'+
    '<button class="nho" onclick="chonHetBen(\'tron\')">Trộn hết</button></div>';

  h += '<div class="hang-nut" style="margin-top:14px">'+
    '<button class="nho" onclick="moDanAI()">Dán lại</button>'+
    (khop?'<button class="nho chinh" onclick="apSoSanh()">Áp dụng</button>':'')+
    '</div>';
  moHop(h, true);
}
function chonBen(i, b){ SS[i].chon = b; veSoSanh(); }
function chonHetBen(b){
  SS.forEach(function(r){ if(r.m) r.chon = b; });
  veSoSanh();
}

function apSoSanh(){
  var xong = 0;
  SS.forEach(function(r){
    if(!r.m || r.chon==='bo' || r.chon==='app') return;
    var m = r.m, a = r.ai;
    if(r.chon==='ai'){
      if(a.soHieu) m.soHieu = a.soHieu;
      if(a.ngay) m.ngay = a.ngay;
      if(a.trichYeu) m.trichYeu = a.trichYeu;
    }else{ /* trộn */
      if(!m.soHieu && a.soHieu) m.soHieu = a.soHieu;
      if(!m.ngay && a.ngay) m.ngay = a.ngay;
      if(a.trichYeu && (!m.trichYeu ||
         m.trichYeu === (m.tenCu||'').replace(/\.[^.]+$/,'') ||
         a.trichYeu.length > m.trichYeu.length + 8)) m.trichYeu = a.trichYeu;
    }
    m.loai = doanLoai(m.trichYeu+' '+(m.tenCu||''), m.soHieu);
    apDoiTuAI(m);
    m.canCu = (r.chon==='ai' ? 'Lấy từ AI anh dán vào' : 'Trộn giữa app đọc và AI');
    xong++;
  });
  luu(); dongHop(); ve(); if(DR.sanSang && DR.online) chayDongBoCho();
  bao('Đã cập nhật '+xong+' mục theo lựa chọn của anh.', 6);
}
