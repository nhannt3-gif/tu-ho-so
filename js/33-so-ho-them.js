/* ===== 3.223 M2 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON mục 0.8): SỔ HỘ VAY ĐỦ CỘT =====
   - Rà ngược các ô của mẫu gốc (01/TD, 01/UQ, 01/TGTV, 01/GQVL, 07b, 09A, 01/TĐCK) → mỗi người trong hộ có thêm các trường dưới đây (KHÔNG bắt buộc).
   - Form hộ: mỗi người 1 dòng lưới như cũ + "➕ Thông tin thêm" (thu gọn, nhóm theo phần trên mẫu). Hộ cũ: nhân thân vẫn đọc Mẫu 31; các trường Mẫu 31 không có thì khai ở đây.
   - Sổ hộ vay: cột "Cần bổ sung" ghi thêm thiếu THEO MẪU (vd "01/TGTV: nghề nghiệp"); lọc "thiếu cho mẫu …".
   - Dữ liệu: thêm khóa vào người (D.cauHinh.hoMoi[].tv[]) — sổ cũ đọc được ngay; hmDongBo chép sang phiếu làm hồ sơ (B.nv / B.ho) cho mẫu dùng (mốc M4–M7). */
var HM_NGHE = ['Nông dân', 'Công nhân', 'Lao động tự do', 'Tự kinh doanh', 'Nội trợ', 'Học sinh, sinh viên', 'Nhân viên văn phòng', 'Công chức, viên chức', 'Giáo viên, giảng viên', 'Lực lượng vũ trang', 'Đã nghỉ hưu', 'Khác'];
var HM_NGUON = ['Thừa kế tài sản', 'Lương', 'Lợi nhuận đầu tư, lãi tiền gửi', 'Lợi nhuận sản xuất, kinh doanh', 'Cho thuê tài sản', 'Trợ cấp', 'Khác'];
/* [mã nhóm, tên nhóm, chỉ người đứng tên?, [[khóa, nhãn, loại (chu · chon · nhieu · ngay), lựa chọn, gợi ý]]] */
var HM_THEM = [
  ['nt', 'Nhân thân thêm (01/TGTV, GQVL)', 0, [['gt', 'Giới tính', 'chon', ['', 'Nam', 'Nữ'], 'trống = suy theo CCCD'], ['danToc', 'Dân tộc', 'chu', null, 'trống = Mẫu 31 / Kinh'], ['quocTich', 'Quốc tịch', 'chu', null, 'trống = Việt Nam'],
    ['mst', 'Mã số thuế cá nhân', 'chu', null, 'nếu có'], ['email', 'Email', 'chu', null, 'nếu có'], ['honNhan', 'Tình trạng hôn nhân', 'chon', ['', 'Độc thân', 'Đã kết hôn', 'Khác']], ['honNhanKhac', 'Hôn nhân — ghi rõ', 'chu', null, 'khi chọn Khác']]],
  ['nn', 'Nghề nghiệp · thu nhập (01/TGTV)', 0, [['ngheNghiep', 'Nghề nghiệp hiện tại', 'chon', [''].concat(HM_NGHE)], ['ngheKhac', 'Nghề nghiệp — ghi rõ', 'chu', null, 'khi chọn Khác'], ['chucVu', 'Chức vụ', 'chu', null, 'vd: Không'],
    ['thuNhap', 'Thu nhập BQ tháng (triệu)', 'chon', ['', 'Dưới 10', 'Từ 10-50', 'Trên 50', 'Khác']], ['thuNhapKhac', 'Thu nhập — ghi rõ', 'chu', null, 'khi chọn Khác'], ['nguonThu', 'Nguồn thu nhập', 'nhieu', HM_NGUON], ['nguonKhac', 'Nguồn thu — ghi rõ', 'chu', null, 'khi chọn Khác']]],
  ['dc', 'Địa chỉ', 0, [['soNha', 'Số nhà (thường trú)', 'chu', null, 'nông thôn thường để trống'], ['duong', 'Đường (thường trú)', 'chu'], ['noiO', 'Nơi ở hiện tại khác', 'chu', null, 'trống = như thường trú'], ['noiCu', 'Nơi cư trú (giấy UQ)', 'chu', null, 'trống = như hộ']]],
  ['lv', 'Nơi làm việc (01/TGTV)', 0, [['noiLam', 'Nơi làm việc', 'chu'], ['dtNoiLam', 'Điện thoại nơi làm việc', 'chu'], ['dcNoiLam', 'Địa chỉ nơi làm việc', 'chu']]],
  ['kd', 'Hộ kinh doanh (01/GQVL, 07b — nếu có)', 1, [['dkkd', 'Giấy CN đăng ký hộ KD số', 'chu'], ['dkkdNgay', 'Đăng ký lần đầu ngày', 'ngay'], ['dkkdLan', 'Đăng ký thay đổi lần thứ', 'chu'], ['dkkdLanNgay', 'Đăng ký thay đổi ngày', 'ngay'],
    ['gpkd', 'Giấy phép KD có điều kiện', 'chu'], ['gpkdHan', 'Giấy phép — thời hạn hiệu lực', 'chu'], ['mstKD', 'Mã số thuế kinh doanh', 'chu']]]];
var HM_THEM_KHOA = [].concat.apply([], HM_THEM.map(function(g){ return g[3].map(function(x){ return x[0]; }); }));
/* trường mỗi mẫu cần (người đứng tên) — '*' trên mẫu gốc; 'diaChi' = có tổ / ấp */
var HM_CAN = {'01td':['ten', 'ns', 'cccd', 'ncap', 'diaChi'], '09a':['ten', 'ns', 'cccd', 'ncap'], '01tdck':['ten', 'ns', 'cccd', 'ncap'],
  '01tgtv':['ten', 'ns', 'gt', 'danToc', 'cccd', 'ncap', 'ngheNghiep', 'sdt', 'diaChi'], '01gqvl':['ten', 'ns', 'danToc', 'gt', 'cccd', 'ncap', 'sdt', 'diaChi'], '07b':['ten', 'ns', 'cccd', 'ncap', 'sdt', 'diaChi']};
var HM_CAN_TEN = {ten:'họ tên', ns:'ngày sinh', cccd:'CCCD', ncap:'ngày cấp', diaChi:'địa chỉ / tổ', gt:'giới tính', danToc:'dân tộc', ngheNghiep:'nghề nghiệp', sdt:'điện thoại'};
var HM_MAU_TEN = {'01td':'01/TD', '01uq':'01/UQ', '01tgtv':'01/TGTV', '01gqvl':'01/GQVL', '07b':'07b', '09a':'09A', '01tdck':'01/TĐCK'};
function hmGT(n){ if(n.gt) return n.gt; var d = typeof hsoCCCDDoc==='function' ? hsoCCCDDoc(n.cccd) : null; return d && d.gt || ''; }
function hmThemDem(n){ return HM_THEM_KHOA.filter(function(k){ var v = n[k]; return Array.isArray(v) ? v.length : v; }).length; }
function hmThemHTML(i, n){   /* khối "➕ Thông tin thêm" dưới dòng người i (form hộ) */
  var dung = i===(HM.dung||0), mo = HM_THEM_MO[i], dem = hmThemDem(n);
  return '<details class="hm-them"'+(mo ? ' open' : '')+' ontoggle="HM_THEM_MO['+i+']=this.open"><summary>➕ Thông tin thêm'+(dem ? ' <b>('+dem+' mục đã khai)</b>' : '')+' <small>— giới tính, dân tộc, nghề nghiệp, thu nhập, địa chỉ, nơi làm việc'+(dung ? ', hộ kinh doanh' : '')+'</small></summary>'+
    HM_THEM.filter(function(g){ return !g[2] || dung; }).map(function(g){
      return '<div class="hm-them-nhom"><i>'+coChuHTML(g[1])+'</i><div class="hm-them-luoi">'+g[3].map(function(x){ var k = x[0], v = n[k], id = 'data-hm="'+i+':'+k+'"';
        var o = x[2]==='chon' ? '<select '+id+' onchange="hmDatThem('+i+',\''+k+'\',this.value)">'+x[3].map(function(c){ return '<option value="'+coChuHTML(c)+'"'+(c===(v||'') ? ' selected' : '')+'>'+(c ? coChuHTML(c) : '—')+'</option>'; }).join('')+'</select>'
          : x[2]==='nhieu' ? '<span class="hm-them-nhieu">'+x[3].map(function(c){ return '<label><input type="checkbox"'+((v||[]).indexOf(c)>=0 ? ' checked' : '')+' onchange="hmDatNhieu('+i+',\''+k+'\',\''+c.replace(/'/g, "\\'")+'\',this.checked)"> '+coChuHTML(c)+'</label>'; }).join('')+'</span>'
          : '<input '+id+' value="'+coChuHTML(x[2]==='ngay' ? (v ? ngayVNsl(v) : '') : (v||''))+'" placeholder="'+coChuHTML(x[4] || (x[2]==='ngay' ? 'dd/mm/yyyy' : ''))+'" onchange="hmDatThem('+i+',\''+k+'\',this.value)">';
        return '<label class="hm-them-o'+(x[2]==='nhieu' ? ' rong' : '')+'"><span>'+coChuHTML(x[1])+(k==='gt' && !v && hmGT(n) ? ' <small>(CCCD: '+hmGT(n)+')</small>' : '')+'</span>'+o+'</label>'; }).join('')+'</div></div>'; }).join('')+'</details>';
}
var HM_THEM_MO = {};
function hmDatThem(i, k, v){ var n = HM && HM.tv[i]; if(!n) return; var d = (HM_THEM.map(function(g){ return g[3]; }).reduce(function(a, b){ return a.concat(b); }, [])).find(function(x){ return x[0]===k; }) || [];
  v = String(v||'').trim(); if(d[2]==='ngay'){ var iso = typeof gdxDocNgay==='function' ? gdxDocNgay(v) : hsoNgayTu(v); if(v && !iso) bao('Ngày chưa đọc được: '+v); v = iso || ''; }
  if(v) n[k] = v; else delete n[k]; }
function hmDatNhieu(i, k, c, bat){ var n = HM && HM.tv[i]; if(!n) return; var a = Array.isArray(n[k]) ? n[k] : []; var j = a.indexOf(c); if(bat && j<0) a.push(c); if(!bat && j>=0) a.splice(j, 1); if(a.length) n[k] = a; else delete n[k]; }
/* thiếu theo mẫu (người đứng tên đã đọc Mẫu 31 — hmNguoiDung) → {mẫu: [tên trường]} */
function hmThieuMau(o, n){
  var r = {}, n0 = o.tv[o.dung||0] || {}, c = o.kh && KHO.danhBa(o.kh) || {};
  var co = function(f){ if(f==='diaChi') return !!(o.to || o.tenThon); if(f==='gt') return !!(n0.gt || hmGT(n)); if(f==='danToc') return true;   /* trống = Mẫu 31 / Kinh (như bản in) */ return !!(n[f] || n0[f]); };
  Object.keys(HM_CAN).forEach(function(m){ var t = HM_CAN[m].filter(function(f){ return !co(f); }); if(t.length) r[m] = t.map(function(f){ return HM_CAN_TEN[f] || f; }); });
  if(typeof hsoUQThieu==='function'){ var tv = o.tv.filter(function(x, i){ return i!==(o.dung||0) && x.ten; }); var th = tv.filter(function(x){ return !x.ns || !x.cccd; }).map(function(x){ return x.ten; }); if(!tv.length) r['01uq'] = ['chưa có thành viên / thừa kế']; else if(th.length) r['01uq'] = ['ngày sinh, CCCD của '+th.join(', ')]; }
  return r; }
function hmThieuMauChu(o, n, chi){ var r = hmThieuMau(o, n); return Object.keys(r).filter(function(m){ return !chi || m===chi; }).map(function(m){ return HM_MAU_TEN[m]+': '+r[m].join(', '); }).join(' · '); }
