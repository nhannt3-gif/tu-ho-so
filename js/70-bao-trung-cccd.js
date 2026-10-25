/* ===== 3.377 (anh 26/10 "kiểm tra 1 số cccd scan rồi lưu nữa hay đọc có báo trùng hay ko" → "code báo trùng") — BÁO TRÙNG CCCD NGAY LÚC ĐỌC =====
   Trước: tab Scan vẫn lưu bản mới "(2)" rồi mới báo nổi 9 giây; Quét CCCD ở form (Sổ hộ vay, 01/TD) không báo; hộ chưa có mã KH không so số CCCD.
   Nay: đọc được số CCCD (tab Scan · 🪪 Quét ở form) → so tủ theo SỐ CCCD hoặc MÃ KH → "⚠ Đã có CCCD này trong tủ (lưu ngày …)" + chọn:
     ◉ Thay bản cũ (bản cũ vào 🗑 Thùng rác, lấy lại được — mặc định)   ○ Lưu thêm (bản mới đánh số (2) như cũ).
   Lưu: chọn Thay → chuyển bản cũ vào 🗑 TRƯỚC rồi lưu bản mới (tên không còn "(2)").
   CẮM RÚT: file riêng + 1 dòng <script>; bọc sxVeDoc / scanLuuTu (js/41) · qcVeKQ / qcLuuTu (js/44), không sửa thân các hàm đó. */
var BTC = {scan:{}, qc:'thay'};   /* scan: lựa chọn theo người i trong lượt quét; qc: lựa chọn ở hộp Quét CCCD form */
function btcSo(v){ return String(v || '').replace(/\D/g, ''); }
function btcTim(cccd, ma){   /* bản CCCD (thẻ) đã có trong tủ: cùng số CCCD hoặc cùng mã KH */
  var so = btcSo(cccd);
  return (D.scan || []).filter(function(k){ if(k.che!=='the') return false; var ks = btcSo(k.cccd || k.khoaCCCD);
    return (so.length>=9 && ks===so) || (!!ma && k.maKH===ma); }); }
function btcHTML(ds, ten, chon){
  var ngay = ds.map(function(k){ return k.ngay ? ngayVNsl(k.ngay) : ''; }).filter(Boolean);
  return '<div class="btc vang">⚠ Đã có CCCD này trong tủ: <b>'+ds.length+' bản</b>'+(ngay.length ? ' (lưu '+coChuHTML(ngay.join(', '))+')' : '')+' — '+
    '<label class="sx-r"><input type="radio" name="'+ten+'" value="thay" data-lenh="btc.chon" data-su="change" data-k="'+ten+'"'+(chon!=='them' ? ' checked' : '')+'> Thay bản cũ (bản cũ vào 🗑, lấy lại được)</label> '+
    '<label class="sx-r"><input type="radio" name="'+ten+'" value="them" data-lenh="btc.chon" data-su="change" data-k="'+ten+'"'+(chon==='them' ? ' checked' : '')+'> Lưu thêm (đánh số (2))</label></div>'; }
function btcRac(ds, lyDo){ var ids = ds.map(function(k){ return k.id; }); if(!ids.length) return 0; chuyenVaoRac(ids, lyDo); if(typeof HS!=='undefined') HS.ds = D.scan; luu(); return ids.length; }
/* tab Scan: danh sách bản cũ sẽ bị thay cho lượt lưu này (người i đã chọn khách) */
function btcScanThay(){
  if(typeof SC==='undefined' || SC.che!=='the' || typeof scanNhom!=='function') return [];
  var ra = []; scanNhom().forEach(function(_, i){ var c = (typeof SXK!=='undefined' && SXK[i]) || null, r = (typeof SX_DOC!=='undefined' && SX_DOC[i]) || {};
    if(!c || (BTC.scan[i] || 'thay')!=='thay') return; btcTim(c.cccd || r.cccd, c.ma).forEach(function(k){ if(ra.indexOf(k)<0) ra.push(k); }); });
  return ra; }
(function(){
  var st = document.createElement('style');
  st.textContent = '.btc{margin:4px 0 6px;padding:6px 9px;border-radius:9px;background:var(--vang-nen);border:1px solid #E8D29A;font-size:calc(12.5px*var(--co));line-height:1.6}.btc .sx-r{display:inline-flex;gap:4px;align-items:center;margin-right:10px;white-space:nowrap}';
  document.head.appendChild(st);
  if(typeof GD!=='undefined') GD.dangKy('btc', {chon:function(el){ var k = el.getAttribute('data-k'), v = el.value;
    if(k==='btc-qc') BTC.qc = v; else { var i = +String(k).replace('btc-s', ''); BTC.scan[i] = v; } }});
  function boc(ten, truoc, sau){ var f = window[ten]; if(typeof f!=='function' || f.btc) return false;
    window[ten] = function(){ if(truoc) try { truoc.apply(this, arguments); } catch(e){ console.warn(e); } var r = f.apply(this, arguments); if(sau) try { sau(r); } catch(e){ console.warn(e); } return r; };
    window[ten].btc = 1; return true; }
  function gan(){
    /* tab Scan — kết quả đọc */
    boc('sxVeDoc', null, function(){ var e = document.getElementById('sx-doc'); if(!e || typeof SX_DOC==='undefined') return;
      SX_DOC.forEach(function(x, i){ if(!x || !x.cccd) return; var ds = btcTim(x.cccd, x.tim && x.tim.ma), o = e.children[i]; if(!ds.length || !o) return;
        o.insertAdjacentHTML('beforeend', btcHTML(ds, 'btc-s'+i, BTC.scan[i])); }); });
    /* tab Scan — lưu: chọn Thay → bản cũ vào 🗑 trước */
    boc('scanLuuTu', function(){ var nh = typeof scanNhom==='function' ? scanNhom() : []; if(nh.some(function(_, i){ return typeof SXK==='undefined' || !SXK[i]; })) return;
      var n = btcRac(btcScanThay(), 'Quét lại CCCD — thay bản cũ'); BTC.scan = {}; if(n) bao('Đã chuyển '+n+' bản CCCD cũ vào 🗑 Thùng rác (thay bằng bản mới).', 5); });
    /* Quét CCCD ở form — kết quả đọc */
    boc('qcVeKQ', null, function(){ var e = document.getElementById('qc-kq'); if(!e || typeof QC==='undefined' || !QC.r || !QC.r.cccd || QC.tu==='tu') return;
      var ds = btcTim(QC.r.cccd, QC.G && QC.G.ma); if(!ds.length) return; BTC.qc = BTC.qc || 'thay';
      var lb = e.querySelector('[data-lenh="qc.luuTu"]'), h = btcHTML(ds, 'btc-qc', BTC.qc);
      if(lb && lb.closest('label')) lb.closest('label').insertAdjacentHTML('afterend', h); else e.insertAdjacentHTML('beforeend', h); });
    /* Quét CCCD ở form — lưu vào tủ */
    boc('qcLuuTu', function(){ if(typeof QC==='undefined' || !QC.r || !QC.r.cccd || (BTC.qc || 'thay')!=='thay') return;
      btcRac(btcTim(QC.r.cccd, QC.G && QC.G.ma), 'Quét lại CCCD (form) — thay bản cũ'); BTC.qc = 'thay'; });
  }
  if(document.readyState==='complete') gan(); else window.addEventListener('load', gan);
})();
