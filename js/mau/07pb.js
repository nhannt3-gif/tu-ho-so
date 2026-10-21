/* ===== 3.289 P3 (anh Nhân 21/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 6): BIỂU 07 PHÂN BỔ KH — mẫu in dựng theo file gốc tests/mau_goc/07pb.docx =====
   A4 dọc · lề 20 / 20 / 20 / 30 mm · Times New Roman 14 (đầu trang 13, tiêu đề 16) · 2 trang mỗi xã: ① Thông báo của UBND xã ② Danh mục (bảng ấp → CT: Giao tăng/giảm · Chỉ tiêu KH năm).
   Dùng chung khối dựng của các mẫu (hsoBang, hsoQH, hsoKe, hsoTrang, hsoDocx) → xem trước / In / PDF / Word như mọi mẫu.
   3.301 (anh 21/10 "khai báo riêng cho Biểu 07 như các mẫu khác, không phụ thuộc mẫu khác — dạng chấm, riêng của mẫu, lấy từ khai báo chung"; "nơi lập là xã, phường mặc định"):
     KHAI BÁO RIÊNG kiểu nền ô — mỗi ô chọn ✍ ghi tay · 🤖 tự động · ⚙ khai báo chung (⚙ Khai báo đơn vị › PGD) · ⌨ tự gõ riêng mẫu · ✏ gõ trong lần làm; cỡ chữ thân 13 / 13,5 / 14.
     Lưu riêng ở KHO1 'pb' → ch.b07 = {cach:{ô: cách}, gt:{ô: chữ tự gõ}, co} — không mẫu nào khác đọc / ghi. KHÔNG đăng ký OM_MAU (khung khai báo của nền ô gắn tab Hồ sơ).
   Số liệu: pbBieu07DL (js/47) — chỉ dựng khi khớp QĐ (QT-16); ấp không có tăng / giảm không in. */
var PB07_M = {k:'07pb', ma:'07/PB', ten:'Biểu 07 Phân bổ KH', mg:typeof omMg==='function' ? omMg([20, 20, 20, 30]) : [20, 19.6, 20, 29.6], ngang:false};
var PB07_CACH = {cham:['✍', 'Ghi tay — để chấm'], tu:['🤖', 'Tự động'], chung:['⚙', 'Khai báo chung (⚙ Khai báo đơn vị › PGD)'], kb:['⌨', 'Tự gõ — nhớ riêng mẫu này'], go:['✏', 'Gõ trong lần làm (không nhớ)']};
/* ô khai báo: ds = các cách được chọn (cách đầu là ✍ nếu có) · md mặc định · mau = chữ sẵn của ⌨ (như file gốc) · nhieu = nhiều dòng (mỗi dòng 1 dòng in) */
var PB07_O = [
  {k:'noi', n:'Nơi lập ("…, ngày")', ds:['cham', 'tu', 'chung', 'kb'], md:'tu', tu:'tên xã / phường của Biểu 07 (bỏ chữ "xã", "phường")', chung:'noi'},
  {k:'tinh', n:'Tỉnh (câu căn cứ QĐ)', ds:['cham', 'chung', 'kb'], md:'chung', chung:'tinh'},
  {k:'soTB', n:'Số thông báo (…/TB-UBND)', ds:['cham', 'go'], md:'cham'},
  {k:'ngayTB', n:'Ngày thông báo', ds:['cham', 'tu', 'go'], md:'tu', tu:'ngày QĐ + 1, né thứ 7 / CN', ngay:1},
  {k:'chucDanh', n:'Chức danh ký', ds:['kb'], md:'kb', mau:'TM. ỦY BAN NHÂN DÂN\nCHỦ TỊCH', nhieu:1},
  {k:'nguoiKy', n:'Người ký (dưới chữ ký)', ds:['cham', 'kb'], md:'cham'},
  {k:'noiNhan', n:'Nơi nhận', ds:['kb'], md:'kb', mau:'- Như trên;\n- Lưu VT, VP.', nhieu:1}];
var PB07_CO = [13, 13.5, 14];
function pb07OK(k){ for(var i=0;i<PB07_O.length;i++) if(PB07_O[i].k===k) return PB07_O[i]; return null; }
/* K = {cach, gt, go, co} (khai báo đang dùng — bản nháp của hộp Biểu 07) → cách hiệu lực của ô */
function pb07Cach(K, k){ var x = pb07OK(k), c = ((K || {}).cach || {})[k]; return x && x.ds.indexOf(c)>=0 ? c : x ? x.md : 'cham'; }
function pb07Ten0(dv){ return String((dv || {}).thuong || '').replace(/^(xã|phường|thị trấn)\s+/i, ''); }
/* giá trị in của ô ('' = chấm / trống) — d = dữ liệu 1 xã (ô 🤖 theo xã) */
function pb07GT(K, k, d){
  K = K || {}; var x = pb07OK(k), c = pb07Cach(K, k); if(!x) return '';
  var chung = function(){ return x.chung && typeof hsoPGD==='function' ? String(hsoPGD(x.chung) || '') : ''; };
  var tu = function(){ return k==='noi' ? pb07Ten0(d && d.dv) : k==='ngayTB' ? pbNgayTB(d && d.ngayQD, (typeof pbDL==='function' ? pbDL().ch : {})) : ''; };
  if(c==='cham') return '';
  if(c==='tu') return tu();
  if(c==='chung') return chung();
  if(c==='go') return String((K.go || {})[k] || '');
  var v = String((K.gt || {})[k] || '').trim(); if(v) return v;   /* ⌨ chưa gõ → chữ sẵn của mẫu / in như nguồn chung / tự động (như nền ô) */
  return x.mau || (x.ds.indexOf('chung')>=0 ? chung() : x.ds.indexOf('tu')>=0 ? tu() : '');
}
function pb07CoChu(K){ var v = +((K || {}).co); return PB07_CO.indexOf(v)>=0 ? v : 14; }
function pb07O(v, cham){ v = v==null ? '' : String(v); return v ? '<span class="o-sl">'+coChuHTML(v)+'</span>' : cham; }   /* ô: có số liệu → nền xanh (chỉ trên màn hình) · trống → chấm như giấy gốc */
function pb07NgayDai(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+' tháng '+m[2]+' năm '+m[1] : ''; }
function pb07SoQD(d){ return d.so.indexOf('/')>=0 || !d.kyHieu ? d.so : d.so+(d.kyHieu.charAt(0)==='/' ? '' : '/')+d.kyHieu; }   /* "123" + "/QĐ-BĐDHĐQT" → "123/QĐ-BĐDHĐQT"; số đã có ký hiệu thì giữ */
/* d = pbBieu07DL(...) · K = khai báo {cach, gt, go, co} → [{M, h}] 2 trang */
function pb07Lap(d, K){
  K = K || {}; var dv = d.dv, loai = d.laDC ? 'ĐIỀU CHỈNH' : 'GIAO', loaiT = d.laDC ? 'điều chỉnh' : 'giao', ap = dv.apKp, nam = d.nam, gt = function(k){ return pb07GT(K, k, d); };
  var ngTB = pb07O(pb07NgayDai(gt('ngayTB')), '...... tháng ...... năm ......'), donVi = pb07O(dv.hoa, '...........................'), dvT = pb07O(dv.thuong, '..................');
  var soTB = gt('soTB'), soT1 = soTB ? pb07O(soTB, '') : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', soT2 = pb07O(soTB, '.......');
  var dong = function(v, lop){ return String(v || '').split(/\n/).map(function(s){ return s.trim(); }).filter(Boolean).map(function(s){ return '<p class="'+lop+'">'+pb07O(s, '')+'</p>'; }).join(''); };
  /* 3.303 (anh 21/10 "chuẩn hành chính"): đoạn canh đều, thụt đầu dòng 1 cm, cách đoạn trước 6 pt, giãn dòng 1,15 (lớp j thut tr → Word cùng thông số); Kính gửi canh giữa */
  var P = function(noi, lop){ return '<p class="'+(lop || 'j thut tr')+'" style="line-height:1.15">'+noi+'</p>'; };
  var ky = dong(gt('chucDanh'), 'c b'), nguoi = gt('nguoiKy');
  var donViKhoi = '<p class="c b s13">ỦY BAN NHÂN DÂN</p><p class="c b s13">'+donVi+'</p>'+hsoKe(22);   /* tên cơ quan: góc trên bên trái, chữ canh giữa khối, gạch dưới 1/3 */
  var t1 = hsoBang('khung0', [62, 98],
      '<tr><td class="c">'+donViKhoi+'</td><td class="c">'+hsoQH('-', 13).replace(/class="c b"/g, 'class="c b s13"')+'</td></tr>'+
      '<tr><td class="c"><p class="c s13">Số:'+(soTB ? ' ' : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')+soT1+'/TB-UBND</p></td><td class="c"><p class="c i">'+pb07O(gt('noi'), '..............')+', ngày '+ngTB+'</p></td></tr>')+
    '<p class="c b tr" style="margin-top:18pt">THÔNG BÁO '+loai+' KẾ HOẠCH DƯ NỢ</p><p class="c b">NĂM '+pb07O(nam, '.......')+'</p>'+   /* tên loại + trích yếu: 14 đậm (NĐ 30) */
    P('Kính gửi: Trưởng các '+ap+' trên địa bàn '+dv.cap+'.', 'c tr')+
    P('Căn cứ Quyết định số '+pb07O(pb07SoQD(d), '..........')+' ngày '+pb07O(pbNgayVN(d.ngayQD), '...../...../........')+' của Trưởng Ban đại diện HĐQT NHCSXH tỉnh '+pb07O(gt('tinh'), '..........')+' về việc '+loaiT+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các '+dv.cap+';')+
    P('Căn cứ tổng hợp nhu cầu vốn tín dụng chính sách tại các '+ap+'.')+
    P('Ủy ban nhân dân '+dv.cap+' thông báo '+loaiT+' kế hoạch dư nợ năm '+nam+' của các '+ap+' theo danh mục đính kèm.')+
    P('Đề nghị Trưởng các '+ap+' căn cứ Thông báo này để chỉ đạo các Tổ TK&amp;VV trong '+ap+' tổ chức bình xét cho vay và lập hồ sơ vay vốn theo quy định của NHCSXH. Việc bình xét cho vay phải đảm bảo công khai, dân chủ, đúng đối tượng và có sự tham gia giám sát của Trưởng '+ap+', đại diện lãnh đạo của tổ chức chính trị - xã hội nhận ủy thác.')+
    P('Trên đây là chỉ tiêu kế hoạch dư nợ năm '+nam+' được Ủy ban nhân dân '+dvT+' phê duyệt, đề nghị các Trưởng '+ap+' và các đơn vị có liên quan nghiêm túc thực hiện./.')+
    '<p class="tr">&nbsp;</p>'+hsoBang('khung0', [80, 80], '<tr><td><p class="b i s12">Nơi nhận:</p>'+dong(gt('noiNhan'), 's11')+'</td><td class="c">'+ky+
      '<p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p>'+(nguoi ? '<p class="c b">'+pb07O(nguoi, '')+'</p>' : '')+'</td></tr>');   /* chừa chỗ ký tay */
  /* bảng: STT gọn · Chỉ tiêu rộng (tên CT canh trái) · số canh phải · ô canh giữa dọc — tổng 160 mm = bề rộng chữ (lề trái 3, phải 2 cm) */
  var hang = '<thead><tr style="height:11mm"><td class="c b">STT</td><td class="c b">Chỉ tiêu</td><td class="c b">Giao tăng/giảm</td><td class="c b">Chỉ tiêu kế hoạch năm '+nam+'</td></tr></thead><tbody>';
  d.ap.forEach(function(a, i){
    hang += '<tr style="height:8mm"><td class="c b">'+(i+1)+'</td><td class="b">'+pb07O(a.ten, '')+'</td><td></td><td></td></tr>';
    a.ds.forEach(function(c, j){ hang += '<tr style="height:8mm"><td class="c">'+(i+1)+'.'+(j+1)+'</td><td>'+pb07O(c.ten, '')+'</td><td class="r" style="padding-right:5pt">'+pb07O(pbSoVN(c.dc), '')+'</td><td class="r" style="padding-right:5pt">'+pb07O(pbSoVN(c.nam), '')+'</td></tr>'; }); });
  if(!d.ap.length) hang += '<tr style="height:8mm"><td></td><td></td><td></td><td></td></tr>';
  var t2 = hsoBang('khung0', [62, 98], '<tr><td class="c">'+donViKhoi+'</td><td></td></tr>')+   /* góc trên bên trái như trang Thông báo (trước nằm giữa trang) */
    '<p class="c b tr" style="margin-top:12pt">DANH MỤC '+loai+'</p><p class="c b">CHỈ TIÊU KẾ HOẠCH DƯ NỢ NGUỒN VỐN '+(d.nguon===2 ? 'ĐỊA PHƯƠNG' : 'TRUNG ƯƠNG')+'</p><p class="c b">NĂM '+nam+'</p>'+
    P('(Kèm theo Thông báo số '+soT2+'/TB-UBND ngày '+ngTB+' của Chủ tịch UBND '+dvT+')', 'c i s13 tr')+P('Đơn vị: triệu đồng', 'r i tr')+
    hsoBang('luoi pb07-bang', [13, 83, 32, 32], hang+'</tbody>');
  var co = pb07CoChu(K);
  var boc = function(h){   /* cỡ chữ thân: gắn cho từng đoạn / bảng chưa có cỡ riêng (lớp om-co + font-size) — bộ xuất Word chung (hsoDocx) đọc cỡ theo đoạn / bảng, không theo khung bọc */
    h = h.replace(/<(p|table)(\s[^>]*)?>/g, function(m, the, at){ at = at || ''; var lop = (at.match(/class="([^"]*)"/) || [])[1] || '';
      if(/(^| )s\d+( |$)/.test(lop)) return m;
      var st = (at.match(/style="([^"]*)"/) || [])[1] || ''; at = at.replace(/\s*class="[^"]*"/, '').replace(/\s*style="[^"]*"/, '');
      return '<'+the+' class="'+(lop ? lop+' ' : '')+'om-co" style="font-size:'+co+'pt;'+st+'"'+at+'>'; });
    if(typeof omChamMin==='function') h = omChamMin(h);   /* 3.303: dòng chấm nhỏ mịn như các mẫu đã chốt (Word cỡ nhỏ theo tỉ lệ) */
    return '<div class="om-co pb07" style="font-size:'+co+'pt">'+h+'</div>'; };
  return [{M:PB07_M, h:boc(t1)}, {M:PB07_M, h:boc(t2)}];
}
function pbNgayVN(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+'/'+m[2]+'/'+m[1] : ''; }
/* nhiều xã → 1 bản in / 1 file Word (mỗi xã 2 trang) */
function pb07Trang(dsDL, K, ten){ var ds = []; dsDL.forEach(function(d){ ds = ds.concat(pb07Lap(d, K)); });   /* mỗi xã đúng 2 trang (chẵn) → tắt chèn trang trắng in 2 mặt giữa Thông báo và Danh mục */
  return {ds:ds, trang:hsoTrang(ds, null, ten).replace('<head>', '<head><meta name="kt-hai-mat" content="0">')}; }
function pb07Ten(dsDL){ var d = dsDL[0] || {}; return xuatTen('Bieu 07 PB', 'QD '+String(d.so || '').replace(/\//g, ' ')+' '+(dsDL.length>1 ? dsDL.length+' xa' : (d.dv || {}).thuong || ''), d.ngayQD || ''); }
