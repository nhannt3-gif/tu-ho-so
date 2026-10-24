/* ---------- 6. VẼ GIAO DIỆN ---------- */
var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', locThang = '';

function doiNgan(i, el){
  if(i===2){ i = 7; D.cauHinh.slTab = 'nap'; }
  document.body.classList.toggle('ngan7', i===7);   /* 3.168: tab Số liệu — lọc cố định, khung vừa cửa sổ */   /* 3.144: bỏ tab Tháng (anh chốt Q5, Q12) — lối cũ sang tab 📥 Nạp & KT */
  if(!window.__giuCK) CHO_KHAI = false;
  if(BOT.tab){ BOT = {tab:'', chon:{}}; document.body.classList.remove('dang-bot'); }   /* 3.49: đổi tab là thôi chọn xóa */
  if(!window.__giuDK && typeof DK!=='undefined') DK.mo = false;   /* 3.50: đổi tab là rời Dọn kho */
  Array.prototype.forEach.call(document.querySelectorAll('.thanh-bot'), function(e){ e.remove(); });   /* 3.49b: bỏ thanh chọn còn sót ở tab cũ */
  THEM_TU = null;   /* 3.40: đổi tab là bỏ cờ "vừa bấm Thêm file ở tab…" (bấm Thêm rồi bỏ không chọn file) */
  nganHienTai = i;
  /* lớp ẩn cột phải ở tab Hôm nay do apAnPV() quyết định (còn phụ thuộc anh đã bật ▣ chưa) */
  for(var k=0;k<8;k++){
    var t = document.getElementById('tr'+k);
    if(t) t.classList.toggle('hien', k===i);
  }
  var b = document.getElementById('hangngan').children;
  /* 3.31: thứ tự nút tab (Hôm nay·Văn bản·Tháng·Biểu mẫu·Scan·Ghi chú) khác số tab — so theo lệnh của nút,
     trước đây mở Biểu mẫu lại tô sáng nút Ghi chú */
  for(var k=0;k<b.length;k++) b[k].classList.toggle('chon', b[k].getAttribute('data-lenh')==='khung.ngan' ? b[k].getAttribute('data-n')===String(i) : (b[k].getAttribute('onclick')||'').indexOf('doiNgan('+i+',')===0);   /* 3.239: nút theo data-lenh */
  toNutSL();   /* 3.144 */
  var ph = ['Gõ số văn bản, từ khóa, tháng…','Gõ số văn bản, trích yếu, ghi chú…',
            'Tìm báo cáo…','Tìm trong ghi chú…','Tìm tên khách, ấp, tổ…',
            'Tìm biểu mẫu, chương trình…','Tìm file chờ duyệt…','Tìm văn bản, scan, biểu mẫu… ở các tab khác (tra khách hàng: tab con 👤 Tra cứu KH)'];
  document.getElementById('otim').placeholder = ph[i];
  var tct = (D.cauHinh.tabCD||{})[tenTab()];
  if(tct){
    if(tct.kieu && tenTab()==='vanBan') kieuXem = tct.kieu;   /* 3.39: kiểu xem chỉ tab Văn bản dùng */
    if(tct.sap) SAP.cot = tct.sap;
  }
  /* 3.31: tab Biểu mẫu mặc định sắp theo số lần dùng (như trước); 2 cột riêng của biểu mẫu không mang sang tab khác */
  if(!(tct && tct.sap)){
    if(i===5){ SAP.cot = 'dung'; SAP.xuoi = false; }
    else if(SAP.cot==='dung' || SAP.cot==='namvb'){ SAP.cot = 'ngay'; SAP.xuoi = false; }
  }
  THE_LOC = []; dongGoiY();
  xoaPreview();
  apAnPV();          /* 3.12: mỗi tab nhớ riêng bật/tắt khung xem nhanh */
  ve();
  window.scrollTo(0,0);
}

function xoaTim(){ document.getElementById('otim').value=''; tuKhoa=''; dongGoiY(); ve(); }

/* tìm kiếm: bỏ dấu, khớp khúc giữa, có chấm điểm */
function diemNho(m){   /* 3.239: chữ đã bỏ dấu của từng trường, tính 1 lần — gõ tìm không bỏ dấu lại từng mục mỗi phím (thuộc tính ẩn: không lưu vào kho) */
  var ct = (m.ctrinh||[]).map(function(c){ return c+' '+ctTenDay(c); }), nh = (m.the||[]).concat(m.tag||[], m.mang?[m.mang]:[], ct).join(' ');
  var goc = [m.soHieu, m.trichYeu||m.moTa, m.tomTat, m.ghiChu, m.tenMoi, m.tenVB, nh].join('\u0001'), x = m.__tim;
  if(x && x.goc===goc) return x;
  var mr = moVietTat([m.tenVB||m.trichYeu||'', m.tomTat||''].join(' '));
  x = {goc:goc, so:boDau(m.soHieu||''), ti:boDau(m.trichYeu||m.moTa||''), to:boDau(m.tomTat||''), gh:boDau(m.ghiChu||''), te:boDau(m.tenMoi||''), mr:mr ? boDau(mr) : '', nh:boDau(nh)};
  try { Object.defineProperty(m, '__tim', {value:x, writable:true, configurable:true, enumerable:false}); } catch(e){}
  return x;
}
function diem(m, q){
  if(!q) return 1;
  var d = 0, x = diemNho(m), ky = (m.ky||'')+' '+(m.ngay||'');
  if(x.so.indexOf(q)>=0) d += 100;
  if(x.ti.indexOf(q)>=0) d += 50;
  if(x.te.indexOf(q)>=0) d += 30;
  if(x.to.indexOf(q)>=0) d += 20;
  if(x.gh.indexOf(q)>=0) d += 20;
  if(ky.indexOf(q)>=0) d += 15;
  if(d<50 && x.mr && x.mr.indexOf(q)>=0) d += 45;   /* 3.69 */
  if(x.nh.indexOf(q)>=0) d += 25;
  return d;
}
function loc(ds, q){
  if(!q) return ds.slice();
  return ds.map(function(m){ return {m:m, d:diem(m,q)}; })
           .filter(function(x){ return x.d>0; })
           .sort(function(a,b){ return b.d-a.d; })
           .map(function(x){ return x.m; });
}
function toSang(s, q){
  var h = coChuHTML(s||'');
  if(!q) return h;
  var b = boDau(h), i = b.indexOf(q);
  if(i<0) return h;
  return h.slice(0,i)+'<mark>'+h.slice(i,i+q.length)+'</mark>'+h.slice(i+q.length);
}

function khoTab(){
  return [D.vanBan, D.vanBan, D.duLieu, D.ghiChu, (D.scan||[]), (D.bieuMau||[]), D.cho, []][nganHienTai] || [];
}
/* 3.144 (anh chốt Q15): tab 📥 Nạp & KT tách khỏi Số liệu, đặt vào chỗ tab Tháng — nơi duy nhất nạp + kiểm tra dữ liệu.
   Bên trong vẫn dùng khung tab 7 (D.cauHinh.slTab = 'nap'); nút Số liệu mở tab con báo cáo gần nhất (slTabBC). */
function moNapSL(){ D.cauHinh.slTab = 'nap'; luu(); doiNgan(7); }
function moBCSL(){ if(!D.cauHinh.slTab || D.cauHinh.slTab==='nap') D.cauHinh.slTab = D.cauHinh.slTabBC || 'th'; luu(); doiNgan(7); }
function toNutSL(){
  var nap = nganHienTai===7 && (D.cauHinh.slTab||'nap')==='nap';
  Array.prototype.forEach.call(document.querySelectorAll('#hangngan [data-sl]'), function(b){
    b.classList.toggle('chon', nganHienTai===7 && (b.getAttribute('data-sl')==='nap')===nap); });
  if(typeof dhTo==='function') dhTo();   /* 3.147: tô mục thanh bên */
}
function tenTab(){
  return ['vanBan','vanBan','duLieu','ghiChu','scan','bieuMau','vanBan','duLieu'][nganHienTai];
}
function ve(){
  tuKhoa = boDau(document.getElementById('otim').value.trim());
  var th = document.getElementById('the-loc-hang');
  if(th) th.innerHTML = veTheLoc();
  setTimeout(ganVuot, 0);
  if(nganHienTai===0) veHomNay();
  if(nganHienTai===1) veVanBan();
  if(nganHienTai===2) veThang();
  if(nganHienTai===3) veGhiChu();
  if(nganHienTai===4) veScan();
  if(nganHienTai===5) veBieuMau();
  if(nganHienTai===6) veThem();
  if(nganHienTai===7) veSoLieu();   /* 3.85 */
  if(typeof capNhatDau==='function') capNhatDau();   /* 3.39: số mục trên đầu luôn khớp (trước chỉ cập nhật lúc mở app) */
  veDay();
}
