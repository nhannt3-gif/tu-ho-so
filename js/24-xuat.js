/* ==========================================================
   3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG
   Mọi mẫu / báo cáo: 👁 Xem → hàng nút cố định, cùng thứ tự: 🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi
   (không có định dạng nào thì ẩn nút đó, các nút còn lại giữ thứ tự). Đóng luôn bên trái.
   📤 Gửi (gộp Copy): Gửi file PDF / Word / Excel (điện thoại: bảng chia sẻ; máy tính: tải về) · 📋 Copy ảnh · 📋 Copy chữ.
   📄 PDF: hộp in chọn "Lưu dưới dạng PDF", tên file điền sẵn theo quy tắc Loại_Phạm vi_Kỳ (inPDF).
   ========================================================== */
var XUAT = null;
/* tên file chung: Loại_Phạm vi_Kỳ — không dấu, mỗi phần viết liền hoa đầu chữ; kỳ 2026-10 → T10-26 */
function xuatTen(loai, pv, ky){
  var k = String(ky||''), kc = /^\d{4}-\d{2}$/.test(k) ? 'T'+k.slice(5, 7)+'-'+k.slice(2, 4)
    : /^\d{4}-\d{2}-\d{2}/.test(k) ? k.slice(8, 10)+'-'+k.slice(5, 7)+'-'+k.slice(2, 4) : ktFChu(k);
  return [ktFChu(loai), ktFChu(pv), kc].filter(Boolean).join('_') || 'Bao cao';
}
/* o = {ten, html: function → trang in (HTML đủ <html>), in: 'js', word: 'js', excel: 'js', dong: 'js' (mặc định dongHop()), truoc: html thêm bên trái}
   html có thì In / PDF / Copy dùng chung; in riêng (vd hỏi trước) thì truyền o.in */
function xuatHang(o){
  XUAT = o || {};
  /* 3.234 (R2 — KE_HOACH_CHUAN_HOA mục 5): bộ nút chuẩn, thứ tự cố định: Đóng … 🖨 In · [💾 Lưu vào app] · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi
     — loại không có thì nút MỜ (không ẩn → bố cục không nhảy); Lưu vào app chỉ hiện ở chỗ có lưu kho (XUAT.vaoApp). Ctrl+P In · Ctrl+S Lưu vào app (js/39). */
  var b = function(lop, js, chu, tit){ return '<button class="nho'+(lop ? ' '+lop : '')+'"'+(js ? ' onclick="'+js+'"' : ' disabled')+(tit ? ' title="'+tit+'"' : '')+'>'+chu+'</button>'; };
  var coHTML = typeof XUAT.html==='function', khong = function(ten){ return 'Mẫu này không xuất '+ten; };
  return '<div class="hang-nut xuat-hang">'+
    b('', XUAT.dong || 'dongHop()', XUAT.dongChu || 'Đóng (Esc)')+(XUAT.truoc || '')+
    b('xuat-in', XUAT.in || (coHTML ? 'xuatIn()' : ''), '🖨 In', 'In (Ctrl+P)')+
    (XUAT.vaoApp ? b('xuat-app', XUAT.vaoApp, '💾 Lưu vào app', 'Lưu vào kho app, đồng bộ Drive (Ctrl+S)') : '')+
    b('xuat-pdf', XUAT.pdf || (coHTML ? 'xuatPDF()' : ''), '📄 PDF', XUAT.pdf || coHTML ? 'Mở hộp in — chọn “Lưu dưới dạng PDF”, tên file điền sẵn' : khong('PDF'))+
    b('xuat-word', XUAT.word || '', '📝 Word', XUAT.word ? 'Tải file Word (.docx)' : khong('Word'))+
    b('xuat-excel', XUAT.excel || '', '📊 Excel', XUAT.excel ? 'Tải file Excel (.xlsx)' : khong('Excel — chỉ bảng số liệu chuẩn mới có Excel'))+
    b('chinh xuat-gui', 'xuatGui(event)', '📤 Gửi', 'Gửi file (Zalo…) hoặc chép ảnh / chữ để dán')+
  '</div>';
}
function xuatHTML(){ return XUAT && typeof XUAT.html==='function' ? XUAT.html() : ''; }
function xuatIn(){ var h = xuatHTML(); if(h) inBlob(new Blob([h], {type:'text/html'}), (XUAT.ten||'Bao cao')+'.html'); }
function xuatPDF(){ var h = xuatHTML(); if(h) inPDF(h, XUAT.ten || 'Bao cao'); }
/* 📤 Gửi: menu nhỏ ngay dưới nút */
function xuatGui(ev){
  var o = XUAT || {}, coHTML = typeof o.html==='function', h = '<div class="menu-nhan">Gửi file</div>';
  if(o.pdf || coHTML) h += '<button onclick="'+(o.pdf || 'xuatPDF()')+'">📄 PDF'+(laMayBan() ? ' — lưu rồi kéo vào Zalo' : '')+'</button>';
  if(o.word) h += '<button onclick="'+o.word+'">📝 Word (.docx)</button>';
  if(o.excel) h += '<button onclick="'+o.excel+'">📊 Excel (.xlsx)</button>';
  if(o.file) h += '<button onclick="'+o.file+'">📎 File gốc</button>';
  if(coHTML || o.anh || o.chu){
    h += '<div class="vach"></div><div class="menu-nhan">Chép để dán (Zalo, email…)</div>';
    if(coHTML || o.anh) h += '<button onclick="'+(o.anh || 'xuatChepAnh()')+'">📋 Copy ảnh</button>';
    if(coHTML || o.chu) h += '<button onclick="'+(o.chu || 'xuatChepChu()')+'">📋 Copy chữ</button>';
  }
  h += '<div class="menu-ghi">'+(laMayBan() ? 'Máy tính: file tải về thư mục Tải xuống — kéo vào Zalo.' : 'Điện thoại: chọn Zalo trong bảng chia sẻ.')+' Trình duyệt không cho chép nguyên file nên Copy chép ảnh / chữ.</div>';
  if(ev) moMenuTL(ev, h);
}
/* 📋 Copy chữ: bảng → dán Excel ra bảng, dán Zalo ra chữ (tab giữa ô) */
function xuatChuTuHTML(h){
  var d = new DOMParser().parseFromString(String(h||''), 'text/html');
  Array.prototype.forEach.call(d.querySelectorAll('script,style,title'), function(x){ x.remove(); });
  var dong = [];
  var duyet = function(n){
    Array.prototype.forEach.call(n.children, function(c){
      if(c.tagName==='TABLE'){ Array.prototype.forEach.call(c.querySelectorAll('tr'), function(r){
          dong.push(Array.prototype.map.call(r.children, function(o){ return o.textContent.replace(/\s+/g, ' ').trim(); }).join('\t')); }); dong.push(''); }
      else if(c.querySelector && c.querySelector('table,div,p,h1,h2,h3,li')) duyet(c);
      else { var t = c.textContent.replace(/\s+/g, ' ').trim(); if(t) dong.push(t); }
    });
  };
  if(d.body) duyet(d.body);
  return {chu:dong.join('\n').replace(/\n{3,}/g, '\n\n').trim(), html:d.body ? d.body.innerHTML : ''};
}
function xuatChepChu(h){
  var x = xuatChuTuHTML(h || xuatHTML()); if(!x.chu) return baoLoi('Không có chữ để chép.');
  var xong = function(){ bao('Đã chép chữ ('+x.chu.split('\n').length+' dòng) — dán vào Zalo / Excel.', 5); };
  try {
    if(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write)
      return navigator.clipboard.write([new ClipboardItem({'text/plain':new Blob([x.chu], {type:'text/plain'}), 'text/html':new Blob([x.html], {type:'text/html'})})]).then(xong)
        .catch(function(){ chepChu(x.chu, 'Đã chép chữ — dán vào Zalo / Excel.'); });
  } catch(e){}
  chepChu(x.chu, 'Đã chép chữ — dán vào Zalo / Excel.');
}
/* 📋 Copy ảnh: vẽ trang báo cáo thành ảnh (SVG foreignObject → canvas, không thêm thư viện) rồi chép.
   Trình duyệt không cho (Safari iPhone…) → chép chữ thay. */
function xuatAnhBlob(h, rong){
  rong = rong || 794;
  return new Promise(function(ok, hong){
    var f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;left:-10000px;top:0;width:'+rong+'px;height:600px;border:0;visibility:hidden';
    f.onload = function(){
      try {
        var d = f.contentDocument; d.body.style.margin = '16px'; d.body.style.background = '#fff';
        Array.prototype.forEach.call(d.querySelectorAll('script'), function(x){ x.remove(); });
        var cao = Math.min(6000, Math.max(200, d.documentElement.scrollHeight)), w = Math.max(rong, d.documentElement.scrollWidth);
        var xml = new XMLSerializer().serializeToString(d.documentElement);
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+cao+'"><foreignObject width="100%" height="100%">'+xml+'</foreignObject></svg>';
        var img = new Image();
        img.onload = function(){
          try {
            var c = document.createElement('canvas'), k = 2; c.width = w*k; c.height = cao*k;
            var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.scale(k, k); x.drawImage(img, 0, 0);
            c.toBlob(function(bl){ f.remove(); bl ? ok(bl) : hong(new Error('Không vẽ được ảnh')); }, 'image/png');
          } catch(e){ f.remove(); hong(e); }
        };
        img.onerror = function(){ f.remove(); hong(new Error('Không vẽ được ảnh')); };
        img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
      } catch(e){ f.remove(); hong(e); }
    };
    document.body.appendChild(f);
    f.srcdoc = String(h||'');
  });
}
function xuatChepAnh(h){
  h = h || xuatHTML(); if(!h) return;
  if(!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write)){ bao('Máy này không cho chép ảnh — đã chép chữ thay.', 5); return xuatChepChu(h); }
  var p = xuatAnhBlob(h);
  /* Safari đòi gọi write ngay trong lần bấm → đưa promise vào ClipboardItem */
  navigator.clipboard.write([new ClipboardItem({'image/png':p})]).then(function(){ bao('Đã chép ảnh báo cáo — dán (Ctrl+V) vào Zalo.', 5); })
    .catch(function(){ bao('Không chép được ảnh trên máy này — đã chép chữ thay.', 5); xuatChepChu(h); });
}
/* file có sẵn (Văn bản, Biểu mẫu, Ghi chú, Scan) — khung xem: 🖨 In · ✎ Sửa · 📤 Gửi; Gửi = menu cùng kiểu báo cáo */
function guiFileMenu(ev){
  var m = mucDangXem; if(!m) return bao('Chọn một file trước.', 3);
  var anh = /\.(jpe?g|png|webp)$/i.test(m.tenMoi||m.tenCu||'') || m.nhom==='ghiChu';
  var h = '<div class="menu-nhan">Gửi file</div><button onclick="taiFile()">📤 '+(laMayBan() ? 'Tải file về (kéo vào Zalo)' : 'Gửi file (Zalo…)')+'</button>';
  if(coCauNoi() && m.driveId && !laDT()) h += '<button onclick="cnHanh(\'chep\',\'muc\',\''+m.id+'\')">📋 Chép nguyên file — Ctrl+V vào Zalo</button>';
  if(laMayBan() && navigator.canShare) h += '<button onclick="guiChiaSeFile()" title="Windows 11 (Chrome / Edge): hộp chia sẻ có nút Sao chép">🪟 Hộp chia sẻ Windows (Sao chép)</button>';   /* 3.166 (anh chốt) */
  h += '<div class="vach"></div><div class="menu-nhan">Chép để dán</div>';
  if(anh) h += '<button onclick="guiChepAnhFile()">📋 Copy ảnh</button>';
  h += '<button onclick="guiChepTenFile()">📋 Copy '+(m.soHieu ? 'số hiệu + trích yếu' : 'tên file')+'</button>';
  h += '<div class="menu-ghi">'+(laMayBan() ? 'Máy tính: file tải về thư mục Tải xuống.' : 'Điện thoại: chọn Zalo trong bảng chia sẻ.')+'</div>';
  moMenuTL(ev, h);
}
function guiChiaSeFile(){ var m = mucDangXem; if(!m) return;
  docFile(m.id).then(function(b){ if(!b) return baoLoi('File chưa có trên máy này — mở xem một lần (tải từ Drive) rồi thử lại.'); var f = new File([b], m.tenMoi||m.tenCu||'file', {type:b.type||'application/octet-stream'});
    if(navigator.canShare({files:[f]})) return navigator.share({files:[f], title:f.name}).catch(function(){}); taiFile(); }); }
function guiChepTenFile(){
  var m = mucDangXem; if(!m) return;
  var t = m.soHieu ? [m.soHieu, m.ngay ? ngayVN(m.ngay) : '', m.trichYeu || m.tenVB || ''].filter(Boolean).join(' · ') : (m.tenMoi || m.tenCu || m.ten || '');
  chepChu(t, 'Đã chép: '+t);
}
function guiChepAnhFile(){
  var m = mucDangXem; if(!m) return;
  if(!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write)) return bao('Máy này không cho chép ảnh — dùng 📤 Gửi file.', 5);
  var p = layNoiDung(m).then(function(b){
    if(!b) throw new Error('Không có nội dung');
    if(b.type==='image/png') return b;
    return createImageBitmap(b).then(function(bm){ var c = document.createElement('canvas'); c.width = bm.width; c.height = bm.height; c.getContext('2d').drawImage(bm, 0, 0);
      return new Promise(function(ok){ c.toBlob(ok, 'image/png'); }); });
  });
  navigator.clipboard.write([new ClipboardItem({'image/png':p})]).then(function(){ bao('Đã chép ảnh — dán (Ctrl+V) vào Zalo.', 5); })
    .catch(function(){ baoLoi('Không chép được ảnh — dùng 📤 Gửi file.'); });
}
