/* ==========================================================
   3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2 — anh 24/10 "cứ theo KH làm"): 🩺 SỨC KHỎE SAO LƯU
   Thẻ ở ⚙ Khai báo đơn vị › 💾 Sao lưu: mỗi đường lưu 1 dòng — lần gần nhất + màu theo tuổi:
   ≤ 2 ngày lục · 3–7 ngày vàng · quá 7 ngày / chưa có lần nào đỏ. CHỈ ĐỌC trạng thái có sẵn (không đổi luồng lưu):
   LN.tt() (IndexedDB theo ngăn) · D.cauHinh.saoLuuNgay (bản tự lưu đầu ngày) · KHO1.dsChup() (chụp cài đặt) ·
   D.cauHinh.chGhiLuc / chKeoLuc (cauhinh.json) · D.cauHinh.chiMucDriveTG (chimuc.json) · mục chưa có driveId. ES5.
   ========================================================== */
var SK_NGAY = 864e5;
function skTuoi(t){ var ms = typeof t==='number' ? t : Date.parse(t || ''); return isNaN(ms) || !ms ? null : Math.max(0, Math.floor((Date.now()-ms)/SK_NGAY)); }
function skMuc(tuoi){ return tuoi==null ? 'do' : tuoi<=2 ? 'luc' : tuoi<=7 ? 'vang' : 'do'; }
function skLuc(t){ var ms = typeof t==='number' ? t : Date.parse(t || ''); if(isNaN(ms) || !ms) return ''; var d = new Date(ms), p = function(x){ return (x<10 ? '0' : '')+x; };
  return p(d.getHours())+':'+p(d.getMinutes())+' '+p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear(); }
function skTuoiChu(tuoi){ return tuoi==null ? 'chưa có lần nào' : tuoi===0 ? 'hôm nay' : tuoi+' ngày trước'; }
/* → [{ten, muc (luc|vang|do|xam), chu, ghi}] */
function skDs(){
  var C = D.cauHinh || {}, r = [], tt = typeof LN!=='undefined' && LN.tt ? LN.tt() : null, drive = typeof coTheNoiDrive==='function' && coTheNoiDrive();
  var dong = function(ten, t, ghi, chiNgay){ var a = skTuoi(t), l = skLuc(t); r.push({ten:ten, muc:skMuc(a), chu:skTuoiChu(a)+(a!=null ? ' · '+(chiNgay ? l.slice(6) : l) : ''), ghi:ghi}); };
  if(tt && tt.hong) r.push({ten:'💾 Lưu trên máy này', muc:'do', chu:'IndexedDB hỏng / bị chặn — đang chỉ lưu localStorage', ghi:'Trình duyệt riêng tư hoặc bị chặn bộ nhớ: dữ liệu dễ mất, sao lưu ra Drive / file ngay'});
  else dong('💾 Lưu trên máy này', tt && tt.meta ? tt.meta.luc : 0, tt && tt.cach==='cu' ? 'cách cũ (localStorage)' : 'IndexedDB theo ngăn — lưu mỗi lần sửa');
  dong('📅 Bản tự lưu đầu ngày (trong máy, giữ 7 ngày)', C.saoLuuNgay ? C.saoLuuNgay+'T00:00:00' : 0, '↩ Lấy lại mục bị thiếu ở 🧰 Dọn kho', 1);
  var ch = typeof KHO1!=='undefined' ? KHO1.dsChup() : []; dong('📸 Bản chụp cài đặt (10 bản gần nhất)', ch.length ? ch[0].luc : 0, 'Khôi phục ở bảng 📸 bên dưới');
  if(!drive){ r.push({ten:'☁ Drive', muc:'vang', chu:'chưa nối Drive', ghi:'Chưa có bản ngoài máy — 2 máy không đồng bộ được'}); }
  else { dong('☁ Cài đặt lên Drive (cauhinh.json)', C.chGhiLuc || C.chKeoLuc || 0, 'tự đẩy khi đổi cài đặt');
    dong('☁ Danh sách hồ sơ lên Drive (chimuc.json)', C.chiMucDriveTG || 0, 'tự đẩy 5 giây sau mỗi thay đổi + bản dự phòng đầu ngày trên Drive'); }
  var chua = [].concat(D.vanBan||[], D.duLieu||[], D.ghiChu||[], D.bieuMau||[], D.scan||[], D.kyAnh||[]).filter(function(m){ return m && !m.driveId; }).length;
  r.push({ten:'📎 File chưa lên Drive', muc:!chua ? 'luc' : chua<=20 ? 'vang' : 'do', chu:chua ? chua+' file' : 'đủ', ghi:chua ? 'Mở 🧰 Dọn kho hoặc bấm ☁ đồng bộ để đẩy lên' : ''});
  return r;
}
function skXau(ds){ var t = {luc:0, xam:0, vang:1, do:2}, x = 'luc'; (ds || skDs()).forEach(function(d){ if(t[d.muc]>t[x]) x = d.muc; }); return x; }
function skSaoLuuHTML(){
  var ds = skDs(), x = skXau(ds), nh = {luc:'nh-luc', vang:'nh-vang', do:'nh-do', xam:'nh-xam'};
  return '<div class="hso-kb-nhom sk-the"><b>🩺 Sức khỏe sao lưu</b> <span class="nh '+nh[x]+'">'+(x==='luc' ? 'tốt' : x==='vang' ? 'cần để ý' : 'cần xử lý')+'</span> <small>(≤ 2 ngày lục · 3–7 ngày vàng · quá 7 ngày / chưa có đỏ)</small>'+
    '<div class="sk-ds">'+ds.map(function(d){ return '<div class="sk-dong"><span class="sk-ten">'+coChuHTML(d.ten)+'</span><span class="nh '+nh[d.muc]+'">'+coChuHTML(d.chu)+'</span>'+(d.ghi ? '<small>'+coChuHTML(d.ghi)+'</small>' : '')+'</div>'; }).join('')+'</div></div>';
}
