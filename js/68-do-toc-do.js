/* ===== 3.372 (KE_HOACH_DIEN_THOAI_MAY — Đ6 mục 5, anh duyệt 25/10: "drive nạp rất lâu"): ⏱ ĐO TỐC ĐỘ TRÊN MÁY THẬT =====
   - Bọc (không sửa thân) các bước nặng: mở trang, nối Drive, kéo chỉ mục văn bản, đồng bộ scan, kéo cài đặt, kéo chỉ mục số liệu,
     tải bảng số liệu, dựng kỳ; mọi lần gọi Drive gộp thành số lần · tổng · chậm nhất.
   - Chỉ lưu trên máy (localStorage 'tuhoso_do': phiên này + phiên trước). Xem: ☰ Thêm › ⏱ Đo tốc độ (điện thoại) / hộp ⚠ nhật ký lỗi; 📋 Chép gửi em.
   - Cắm rút: file riêng + 1 dòng <script>; bỏ ra app chạy như cũ. ES5. */
var DTD = {bd:new Date().toISOString(), ban:typeof APP_BAN!=='undefined' ? APP_BAN : '', ds:[], dr:{n:0, ms:0, max:0, cham:''}, mo:{}};
function dtdLay(){ try { return JSON.parse(localStorage.getItem('tuhoso_do') || '[]') || []; } catch(e){ return []; } }
function dtdLuu(){ try { var a = dtdLay().filter(function(x){ return x.bd!==DTD.bd; }); a.push({bd:DTD.bd, ban:DTD.ban, ds:DTD.ds.slice(0, 80), dr:DTD.dr, mo:DTD.mo}); localStorage.setItem('tuhoso_do', JSON.stringify(a.slice(-2))); } catch(e){} }
function dtdGhi(ten, ms, them, luon){ if(ms<30 && !luon) return; DTD.ds.push({t:ten, ms:Math.round(ms), luc:Math.round(performance.now()), x:them || ''}); clearTimeout(dtdGhi.h); dtdGhi.h = setTimeout(dtdLuu, 800); }
function dtdBoc(ten, chu, k){   /* bọc hàm chu[k] (toàn cục hoặc trong đối tượng) — đo tới khi lời hứa xong */
  var f = chu && chu[k]; if(typeof f!=='function' || f.dtd) return;
  var g = function(){ var t0 = performance.now(), a = arguments, r;
    try { r = f.apply(this, a); } catch(e){ dtdGhi(ten+' (lỗi)', performance.now()-t0); throw e; }
    var nhan = a.length && typeof a[0]==='string' && a[0].length<20 ? a[0] : '';
    var noi = ten==='Nối Drive';   /* 3.373: ghi rõ nối được hay không + lý do; dùng lại quyền cũ */
    if(r && typeof r.then==='function') r.then(function(v){ var ms = performance.now()-t0;
      if(noi) dtdGhi(v===false ? ten+' — CHƯA được'+(window.DR && DR.lyDo ? ': '+DR.lyDo : '') : ten+(window.DR && DR.quyenCu ? ' (dùng lại quyền cũ)' : ''), ms, nhan, true);
      else dtdGhi(ten, ms, nhan); }, function(){ dtdGhi(ten+' (lỗi)', performance.now()-t0, nhan, noi); });
    else dtdGhi(ten, performance.now()-t0, nhan);
    return r; };
  g.dtd = 1; chu[k] = g;
}
function dtdGan(){
  [['Nối Drive', 'noiDrive'], ['Kéo chỉ mục văn bản', 'taiChiMucTuDrive'], ['Đẩy chỉ mục văn bản', 'dayChiMucLenDrive'], ['Đồng bộ scan', 'dongBoScan'],
   ['Đồng bộ cài đặt', 'dongBoCauHinh'], ['Kéo chỉ mục số liệu', 'slTaiTuDrive'], ['Tải 1 file số liệu từ Drive', 'slTaiBlob']].forEach(function(x){ dtdBoc(x[0], window, x[1]); });
  if(typeof KHO!=='undefined'){ var nap = KHO.nap; if(typeof nap==='function' && !nap.dtd){
    KHO.nap = function(ky){ var co = typeof TO_KS!=='undefined' && TO_KS[ky], t0 = performance.now(), r = nap.apply(this, arguments);
      if(!co && r && r.then) r.then(function(){ dtdGhi('Dựng kỳ', performance.now()-t0, ky); }, function(){});
      return r; }; KHO.nap.dtd = 1; } }
  var gd = window.goiDrive; if(typeof gd==='function' && !gd.dtd){
    window.goiDrive = function(duong){ var t0 = performance.now(), r = gd.apply(this, arguments);
      var xong = function(){ var ms = performance.now()-t0; DTD.dr.n++; DTD.dr.ms += ms; if(ms>DTD.dr.max){ DTD.dr.max = Math.round(ms); DTD.dr.cham = String(duong||'').replace(/^https:\/\/www\.googleapis\.com\//, '').replace(/[?].*$/, '').slice(0, 60); } };
      if(r && r.then) r.then(xong, xong); return r; }; window.goiDrive.dtd = 1; }
}
function dtdChu(p){ if(!p) return '';
  var dr = p.dr || {}, mo = p.mo || {};
  return '⏱ Tốc độ phiên '+String(p.bd).replace('T', ' ').slice(0, 16)+' · bản '+p.ban+'\n'+
    '   Mở trang: DOM '+(mo.dom||'?')+' ms · xong '+(mo.load||'?')+' ms · màn '+(mo.man||'')+'\n'+
    '   Drive: '+(dr.n||0)+' lần gọi · tổng '+Math.round((dr.ms||0)/1000*10)/10+' s · chậm nhất '+(dr.max||0)+' ms'+(dr.cham ? ' ('+dr.cham+')' : '')+'\n'+
    (p.ds||[]).map(function(x){ return '   '+(Math.round(x.luc/100)/10)+' s · '+x.t+(x.x ? ' ['+x.x+']' : '')+': '+x.ms+' ms'; }).join('\n'); }
function dtdHop(){
  var a = dtdLay().filter(function(x){ return x.bd!==DTD.bd; }), t = dtdChu({bd:DTD.bd, ban:DTD.ban, ds:DTD.ds, dr:DTD.dr, mo:DTD.mo})+(a.length ? '\n\n(phiên trước)\n'+dtdChu(a[a.length-1]) : '');
  moHop('<div class="hop-tit">⏱ Đo tốc độ trên máy này</div><div class="hop-phu">Thời gian từng bước (nối Drive, tải, dựng kỳ) của phiên này — bấm 📋 Chép rồi dán Zalo gửi em để em sửa đúng chỗ chậm. Không có dữ liệu khách.</div>'+
    '<pre class="dtd-pre" style="white-space:pre-wrap;font-size:12px;max-height:55vh;overflow:auto;background:var(--nen);padding:8px;border-radius:8px">'+coChuHTML(t)+'</pre>'+
    GD.hang([GD.nut({chu:'📋 Chép để gửi em', lenh:'dtd.chep', chinh:true}), GD.nut({chu:'Đóng (Esc)', lenh:'hop.dong'})]), true);
  dtdHop.t = t;
}
(function(){
  try { window.addEventListener('DOMContentLoaded', function(){ DTD.mo.dom = Math.round(performance.now()); });
    window.addEventListener('load', function(){ DTD.mo.load = Math.round(performance.now()); DTD.mo.man = innerWidth+'×'+innerHeight; dtdGan(); dtdLuu(); }); } catch(e){}
  if(document.readyState==='complete'){ DTD.mo.load = Math.round(performance.now()); dtdGan(); }
  if(typeof GD!=='undefined') GD.dangKy('dtd', {mo:function(){ dtdHop(); },
    chep:function(){ var t = dtdHop.t || '';
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){ bao('Đã chép số đo tốc độ — dán vào Zalo gửi em.', 4); }, function(){ bao('Máy không cho chép — chụp màn hình gửi em.', 5); });
      else bao('Máy không cho chép — chụp màn hình gửi em.', 5); }});
  if(typeof nklChu==='function'){ var c0 = nklChu; nklChu = function(a){ return c0.apply(this, arguments)+'\n\n'+dtdChu({bd:DTD.bd, ban:DTD.ban, ds:DTD.ds, dr:DTD.dr, mo:DTD.mo}); }; }   /* chép nhật ký lỗi kèm số đo */
})();
