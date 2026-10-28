/* ===== 3.397 (anh 28/10 duyệt demo D1–D4 "em làm luôn"): KTGS gọn — CHỈ SẮP XẾP LẠI phần đã vẽ trong #kt-the (CẮM RÚT: bỏ dòng <script> là về như cũ).
   Không đổi hàm dựng màn / chỗ lưu / hàm dựng mẫu (luật BAN_GIAO_KTGS, t179). Chạy sau mỗi lần KTGS vẽ (MutationObserver trên #tr7), làm lại được nhiều lần (idempotent).
   D1: thẻ con khối Bắt buộc (Định kỳ · Sau giải ngân · Báo cáo tổng hợp · Lịch năm) vào chung hàng 3 khối, nhãn ngắn (đủ chữ ở title)
   D2: Tháng kiểm tra + "Số liệu in …" + "Đã chọn n tổ …" + nút chức năng (📅 Tích tổ có lịch…) gom 1 hàng thao tác; bỏ dòng "Phạm vi: …" (đã có trên dải LỌC ĐỊA BÀN)
   D3: nút 👁 Xem … / 📋 Tóm tắt từ cuối trang lên hàng thao tác (trên bảng); bảng tổ dòng thấp hơn (CSS)
   D4: đoạn ghi chú dài cuối màn → ⓘ bấm mở ===== */
function ktGonChu(e){ return (e && e.textContent || '').replace(/\s+/g, ' ').trim(); }
function ktGon(){
  var T = document.getElementById('kt-the'); if(!T) return;
  var khoi = T.querySelector(':scope > .kt-khoi'), the = T.querySelector(':scope > .kt-a-the');
  if(khoi && the){ the.classList.remove('kt-che'); the.classList.add('kt-con'); khoi.children[0].insertAdjacentElement('afterend', the);   /* D1 */
    [].forEach.call(the.querySelectorAll('.gd-chip'), function(c){ if(c.getAttribute('data-kt-gon')) return; var du = ktGonChu(c); c.setAttribute('data-kt-gon', 1); c.title = du; c.innerHTML = c.innerHTML.replace(/ · [^<]*$/, ''); }); }
  var thang = T.querySelector(':scope > .kt-a-thang'), sl = [].filter.call(T.querySelectorAll(':scope > .to-the-so'), function(e){ return /^📌 Số liệu in/.test(ktGonChu(e)); })[0],
    chon = [].filter.call(T.querySelectorAll('.to-the-so'), function(e){ return /đã chọn/i.test(ktGonChu(e)) && !e.closest('.kt-thao'); })[0],
    pv = [].filter.call(T.querySelectorAll('.kt-gn-dau'), function(e){ return !e.closest('.kt-thao') && e.querySelector('.sl-phu') && /^Phạm vi:/.test(ktGonChu(e.querySelector('.sl-phu'))); })[0],
    xem = [].filter.call(T.querySelectorAll('.hang-nut.kt-in'), function(e){ return !e.closest('.kt-thao'); })[0];
  if(!thang && !sl && !chon && !pv && !xem) return ktGonGhi(T);
  var h = T.querySelector('.kt-thao'); if(!h){ h = document.createElement('div'); h.className = 'kt-thao'; h.innerHTML = '<span class="kt-thao-trai"></span><span class="kt-thao-gian"></span><span class="kt-thao-phai"></span>'; }
  var tr = h.children[0], ph = h.children[2], dat = function(cho, k, el){ var cu = cho.querySelector('[data-kt-k="'+k+'"]'); if(cu) cu.remove(); el.setAttribute('data-kt-k', k); cho.appendChild(el); };
  if(thang){ var lb = thang.querySelector('label'), ph1 = thang.querySelector('.sl-phu'); if(lb){ lb.title = ph1 ? ktGonChu(ph1) : ''; dat(tr, 'thang', lb); } thang.remove(); }   /* D2 */
  if(sl){ var s = document.createElement('span'); s.className = 'kt-thao-sl'; s.innerHTML = sl.innerHTML.replace(/^📌 Số liệu in T\d+:\s*/, 'số liệu ').replace(/ · tự lấy[\s\S]*$/, ''); s.title = ktGonChu(sl); dat(tr, 'sl', s); sl.remove(); }
  if(pv){ var nut = document.createElement('span'); nut.className = 'kt-thao-pv'; [].slice.call(pv.childNodes).forEach(function(n){ if(n.nodeType===1 && n.classList.contains('sl-phu') && /^Phạm vi:/.test(ktGonChu(n))) return; nut.appendChild(n); });
    if(nut.childNodes.length) dat(tr, 'pv', nut); else { var c0 = tr.querySelector('[data-kt-k="pv"]'); if(c0) c0.remove(); } pv.remove(); }
  if(chon){ var c = document.createElement('span'); c.className = 'kt-thao-chon'; c.innerHTML = chon.innerHTML.replace(/^Chọn tự do \(không theo Kế hoạch\) · đã chọn/, 'Đã chọn'); c.title = ktGonChu(chon); dat(ph, 'chon', c); chon.remove(); }
  if(xem){ var x = document.createElement('span'); x.className = 'kt-thao-nut'; [].slice.call(xem.childNodes).forEach(function(n){ x.appendChild(n); }); dat(ph, 'xem', x); xem.remove(); }   /* D3 */
  if(!h.parentNode){ var moc = T.querySelector(':scope > .to-bang-cuon, :scope > #kt-gn, :scope > .rong, :scope > .sl-bao') ; if(moc) T.insertBefore(h, moc); else T.appendChild(h); }
  ktGonGhi(T);
}
function ktGonGhi(T){   /* D4 */
  [].forEach.call(T.querySelectorAll('p.ghi'), function(p){ if(p.closest('details.kt-ghi') || ktGonChu(p).length<160) return;
    var d = document.createElement('details'); d.className = 'kt-ghi'; d.innerHTML = '<summary>ⓘ Ghi chú cách chọn hộ / số liệu</summary>'; p.parentNode.insertBefore(d, p); d.appendChild(p); });
}
(function(){ var o = document.getElementById('tr7'); if(!o || typeof MutationObserver==='undefined') return; var hen = 0;
  new MutationObserver(function(){ if(hen || !document.getElementById('kt-the')) return; hen = 1; setTimeout(function(){ hen = 0; ktGon(); }, 0); }).observe(o, {childList:true, subtree:true}); })();
