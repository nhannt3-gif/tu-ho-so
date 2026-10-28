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
  if(khoi && the){ the.classList.add('kt-con'); khoi.children[0].insertAdjacentElement('afterend', the);   /* D1: dời nguyên khối; phần " · Mẫu …" bọc <small> ẩn bằng CSS (chữ đủ giữ nguyên) */
    [].forEach.call(the.querySelectorAll('.gd-chip'), function(c){ if(c.querySelector('.kt-con-phu')) return; c.title = ktGonChu(c); c.innerHTML = c.innerHTML.replace(/( · [^<]*)$/, '<small class="kt-con-phu">$1</small>'); }); }
  if(typeof ktCH==='function' && (ktCH().che==='kh' || ktCH().che==='hdt')) return ktGonGhi(T);   /* Kế hoạch năm: bảng lịch + nút PDF dưới bảng; ⚙ Khai báo: dòng đầu bảng Hội – xã (3.398 sửa: 3.397 dời xuống cuối) — giữ nguyên */
  var la = function(sel, dk){ return [].filter.call(T.querySelectorAll(sel), function(e){ return !e.closest('.kt-thao') && (!dk || dk(e)); })[0]; };
  var thang = la(':scope > .kt-a-thang'), sl = la(':scope > .to-the-so', function(e){ return /^📌 Số liệu in/.test(ktGonChu(e)); }),
    chon = la('.to-the-so', function(e){ return /đã chọn/i.test(ktGonChu(e)); }),
    pv = la('.kt-gn-dau', function(e){ return e.querySelector('.sl-phu') && /^Phạm vi:/.test(ktGonChu(e.querySelector('.sl-phu'))); }),
    xem = la('.hang-nut.kt-in');
  if(!thang && !sl && !chon && !pv && !xem) return ktGonGhi(T);
  var h = T.querySelector('.kt-thao'); if(!h){ h = document.createElement('div'); h.className = 'kt-thao'; h.innerHTML = '<span class="kt-thao-trai"></span><span class="kt-thao-gian"></span><span class="kt-thao-phai"></span>'; }
  var tr = h.children[0], ph = h.children[2], dat = function(cho, k, el){ var cu = cho.querySelector(':scope > [data-kt-k="'+k+'"]'); if(cu && cu!==el) cu.remove(); el.setAttribute('data-kt-k', k); cho.appendChild(el); };
  if(thang) dat(tr, 'thang', thang);   /* D2: dời nguyên khối (chữ phụ ẩn bằng CSS) */
  if(sl) dat(tr, 'sl', sl);
  if(pv){ var p0 = pv.querySelector(':scope > .sl-phu'); if(p0 && /^Phạm vi:/.test(ktGonChu(p0))) pv.classList.add('kt-pv-gon'); dat(tr, 'pv', pv); }   /* chữ "Phạm vi: …" ẩn bằng CSS (đã có trên dải LỌC ĐỊA BÀN), giữ ô / nút */
  if(chon) dat(ph, 'chon', chon);
  if(xem) dat(ph, 'xem', xem);   /* D3 */
  if(!h.parentNode){ var moc = T.querySelector(':scope > .to-bang-cuon, :scope > #kt-gn, :scope > .rong, :scope > .sl-bao'); if(moc) T.insertBefore(h, moc); else T.appendChild(h); }
  ktGonGhi(T);
}
function ktGonGhi(T){   /* D4 */
  [].forEach.call(T.querySelectorAll('p.ghi'), function(p){ if(p.closest('details.kt-ghi') || ktGonChu(p).length<160) return;
    var d = document.createElement('details'); d.className = 'kt-ghi'; d.innerHTML = '<summary>ⓘ Ghi chú cách chọn hộ / số liệu</summary>'; p.parentNode.insertBefore(d, p); d.appendChild(p); });
}
(function(){ var o = document.getElementById('tr7'); if(!o || typeof MutationObserver==='undefined') return; var hen = 0;
  new MutationObserver(function(){ if(hen || !document.getElementById('kt-the')) return; hen = 1; setTimeout(function(){ hen = 0; ktGon(); }, 0); }).observe(o, {childList:true, subtree:true}); })();
