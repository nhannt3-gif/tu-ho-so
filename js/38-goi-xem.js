/* ===== 3.231 (anh duyệt 17/10/2026 — KE_HOACH_CHUAN_HOA mục 8–9): 📱 GÓI SỐ LIỆU XEM cho bản điện thoại =====
   Máy tính nạp Mẫu 31 xong → tự lập gói (tổ + tổng từng tổ + khách + món vay, theo Mẫu 31 mới nhất) → nén gzip → Drive `<thư mục>/_Hệ thống/xem/xem.json.gz`.
   Điện thoại (dt.html) chỉ tải gói này về xem — không nạp Excel, không tính lại → nhẹ, khớp số máy tính.
   Bật / tắt + đẩy tay: ⚙ Khai báo đơn vị › 💾 Sao lưu › 📱 Bản điện thoại (D.cauHinh.gxBat). Số liệu gói chỉ ở Drive của anh, không vào repo. */
var GX_TM = '_Hệ thống/xem', GX_TEN = 'xem.json.gz', GX_MINI = 'gdx.html.gz', GX_HEN = null;
if(typeof CH_RIENG!=='undefined') CH_RIENG.push('gxBat', 'gxLuc', 'gxKy', 'gxSo', 'gxCho');   /* riêng máy nạp số liệu, không đồng bộ */
function gxTong(ds){   /* tổng 1 nhóm tổ viên: dư nợ, quá hạn, khoanh, số hộ còn nợ, số món còn dư nợ */
  var r = {dn:0, qh:0, kn:0, ho:0, mon:0};
  ds.forEach(function(k){ r.dn += k.dn||0; r.qh += k.qh||0; r.kn += k.kn||0; if(k.conNo) r.ho++; (k.mon||[]).forEach(function(m){ if((m.dn||0)>0) r.mon++; }); });
  return r;
}
function gxTT(t){ if(toLaTT(t)) return ''; var k = KHO.toTruongKH(t) || {}, c = k.kh ? KHO.danhBa(k.kh) : null; return (c && c.ten) || t.ten || ''; }   /* tên tổ trưởng: Mã CIF TT → danh bạ; chưa có thì tên tổ (app đặt tên tổ = tên tổ trưởng) */
function gxMon(m){ return [m.ct||'', String(m.ku||''), m.nv||m.ngn||'', m.gn||0, m.dn||0, m.qh||0, m.kn||0, m.dhgh||m.dhg||'', m.ttMon||'', typeof laiTon==='function' ? Math.round(laiTon(m)||0) : 0, m.dhgh ? 1 : 0]; }   /* [CT, khế ước, ngày vay, giải ngân, dư nợ, quá hạn, khoanh, đến hạn, trạng thái] · 3.343 (TK 3, điện thoại Đ1): + [9] lãi tồn, [10] 1 = hạn gia hạn — nối cuối, bản cũ vẫn đọc */
function gxLapTu(K){   /* K = kỳ đã dựng (TO_K) → gói */
  var g = {v:1, ban:APP_BAN, ky:K.ky, ngay:K.ngay, luc:new Date().toISOString(), pgd:typeof hsoPGD==='function' ? hsoPGD('ngan') : '', to:{}, kh:[]};
  KHO.voiKy(K, function(){
    Object.keys(K.to||{}).forEach(function(ma){ var t = K.to[ma], tv;
      if(toLaTT(t)){ var gom = {}; (K.kh[ma]||[]).forEach(function(o){ var x = gom[o.kh] = gom[o.kh] || {kh:o.kh, ten:o.ten, mon:[], dn:0, qh:0, kn:0, t105:0, conNo:false};
          x.mon.push(o); x.dn += o.dn||0; x.qh += o.qh||0; x.kn += o.kn||0; if((o.dn||0)>0) x.conNo = true; }); tv = Object.keys(gom).map(function(k){ return gom[k]; }); }
      else tv = KHO.toVien(t);
      if(!tv.length) return;
      var s = gxTong(tv);
      g.to[ma] = {ten:t.ten||'', xa:t.xa||'', tenXa:t.tenXa||'', diem:t.khoaDiem||'', tenDiem:t.tenDiem||'', hoi:String(t.dv||''), tenHoi:t.dv ? (String(t.dv)==='99' ? 'Vay trực tiếp' : tdnHoi(t.dv)) : '',
        ap:t.tenThon||'', tt:gxTT(t), ttKH:toLaTT(t) ? '' : ((KHO.toTruongKH(t) || {}).kh || ''), sdt:t.sdt||'',   /* 3.343: + mã KH tổ trưởng (thẻ tổ điện thoại) */ tt1:toLaTT(t) ? 1 : 0, dn:s.dn, qh:s.qh, kn:s.kn, ho:s.ho, mon:s.mon};
      tv.forEach(function(k){ var c = KHO.danhBa(k.kh) || {}, m0 = (k.mon||[])[0] || {};
        g.kh.push([k.kh, k.ten||c.ten||'', c.ns||m0.ns||'', c.cccd||m0.cccd||'', c.ncap||m0.ncap||'', c.sdt||m0.sdt||'', c.tenThon||m0.tenThon||'', ma, c.voChong||m0.voChong||'', k.t105||0, (k.mon||[]).map(gxMon)]); });
    });
  });
  g.ct = {}; g.kh.forEach(function(k){ k[10].forEach(function(m){ if(m[0] && !g.ct[m[0]]){ var c = (typeof TDN_CT!=='undefined' && TDN_CT[m[0]]) || null; g.ct[m[0]] = c ? c[0] : m[0]; } }); });   /* tên chương trình cho điện thoại */
  return g;
}
function gxMini(K){   /* 3.233: bản mini Giao dịch xã (04/TD, 12/GDX, Giấy lĩnh — js/27, mẫu chép từ chính hàm app) theo kỳ K, hạn 90 ngày — điện thoại mở trong app */
  if(typeof gdxMiniHTML!=='function') return '';
  try { return KHO.voiKy(K, function(){ var G = gdxMiniGoi(); return G.diem.length ? gdxMiniHTML(90, G).html : ''; }); } catch(e){ console.warn('Chưa lập được bản mini GDX', e); return ''; }
}
function gxNen(obj){   /* JSON → gzip (Blob) */
  var s = new Blob([JSON.stringify(obj)]).stream().pipeThrough(new CompressionStream('gzip'));
  return new Response(s).blob();
}
function gxKyMoi(){ var ds = toDsKy().filter(function(x){ return x.ky.length===7; }); return ds.length ? ds[0].ky : ''; }   /* Mẫu 31 chốt tháng mới nhất */
function gxDay(tay){   /* lập + đẩy gói lên Drive */
  var ky = gxKyMoi(); if(!ky){ if(tay) baoLoi('Chưa có Mẫu 31 để đẩy cho điện thoại.'); return Promise.resolve(false); }
  if(!coTheNoiDrive() || !DR.sanSang){ D.cauHinh.gxCho = 1; luu(); if(tay) baoLoi('Chưa nối Drive — nối Drive rồi bấm lại (hoặc app tự đẩy khi nối).'); return Promise.resolve(false); }
  var g, mini = '';
  return KHO.nap(ky).then(function(K){ g = gxLapTu(K); mini = gxMini(K); return gxNen(g); }).then(function(bl){
    return baoDamDuong(D.cauHinh.thumuc+'/'+GX_TM).then(function(idTM){ return timFileTrong(GX_TEN, idTM).then(function(cu){ return gxGhi(bl, idTM, cu, GX_TEN); })
      .then(function(){ if(!mini) return; return new Response(new Blob([mini]).stream().pipeThrough(new CompressionStream('gzip'))).blob().then(function(b2){
        return timFileTrong(GX_MINI, idTM).then(function(cu){ return gxGhi(b2, idTM, cu, GX_MINI); }); }); }); });
  }).then(function(){ D.cauHinh.gxLuc = g.luc; D.cauHinh.gxKy = g.ky; D.cauHinh.gxSo = g.kh.length; delete D.cauHinh.gxCho; luu();
    if(tay) bao('📱 Đã đẩy số liệu '+slKyChu(g.ky)+' ('+g.kh.length+' khách) cho điện thoại.', 5); return true; })
    .catch(function(e){ if(tay) baoLoi('Chưa đẩy được: '+(e && e.message || e)); return false; });
}
function gxGhi(bl, idTM, cu, ten){   /* tải tệp nhị phân lên Drive (tạo mới / ghi đè) */
  var bien = '----tuhoso'+Date.now(), meta = cu ? {} : {name:ten || GX_TEN, parents:[idTM], mimeType:'application/gzip'};
  var body = new Blob(['--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(meta)+'\r\n--'+bien+'\r\nContent-Type: application/gzip\r\n\r\n', bl, '\r\n--'+bien+'--'], {type:'multipart/related; boundary='+bien});
  return goiDrive(cu ? 'https://www.googleapis.com/upload/drive/v3/files/'+cu.id+'?uploadType=multipart&fields=id,modifiedTime' : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime',
    {method:cu ? 'PATCH' : 'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
}
function gxHen(){ if(!D.cauHinh.gxBat) return; clearTimeout(GX_HEN); D.cauHinh.gxCho = 1; GX_HEN = setTimeout(function(){ gxDay(false); }, 20000); }   /* sau khi nạp Mẫu 31: chờ nạp xong cả lô */
var GX_SLGHI = slGhi;
slGhi = function(kq){ return GX_SLGHI(kq).then(function(r){ if(kq && kq.loai==='hstd') gxHen(); return r; }); };
setInterval(function(){ if(D.cauHinh && D.cauHinh.gxBat && D.cauHinh.gxCho && typeof DR!=='undefined' && DR.sanSang) gxDay(false); }, 60000);   /* chưa nối Drive lúc nạp → nối là đẩy */
function gxKBHTML(){   /* ⚙ Khai báo đơn vị › 💾 Sao lưu › 📱 Bản điện thoại — 3.234: nút theo chuẩn data-lenh */
  if(!gxKBHTML.dk){ gxKBHTML.dk = 1; GD.dangKy('gx', {bat:function(el){ D.cauHinh.gxBat = el.checked ? 1 : 0; luu(); (el.checked ? gxDay(true) : Promise.resolve()).then(function(){ hsoKBHop('sl'); }); },
    day:function(){ gxDay(true).then(function(){ hsoKBHop('sl'); }); }}); }
  var C = D.cauHinh;
  return '<div class="hso-kb-nhom"><b>📱 Bản điện thoại</b> <small>(mở cùng đường dẫn trên điện thoại → tự chuyển giao diện điện thoại; số liệu lấy từ Drive)</small>'+
    '<label class="hso-o2"><input type="checkbox" data-lenh="gx.bat" data-su="change"'+(C.gxBat ? ' checked' : '')+'> Tự đẩy số liệu xem cho điện thoại mỗi lần nạp Mẫu 31 mới</label>'+
    '<div class="sl-phu">'+(C.gxLuc ? 'Lần đẩy gần nhất: '+kbGioVN(C.gxLuc)+' · '+slKyChu(C.gxKy)+' · '+(C.gxSo||0)+' khách' : 'Chưa đẩy lần nào.')+(C.gxCho ? ' · ⏳ đang chờ nối Drive' : '')+'</div>'+
    GD.hang([GD.nut({chu:'📤 Đẩy ngay', lenh:'gx.day'})])+'</div>';
}
