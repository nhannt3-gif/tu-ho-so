/* ===== 3.289 P3 (anh Nhân 21/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 6): BIỂU 07 PHÂN BỔ KH — mẫu in dựng theo file gốc tests/mau_goc/07pb.docx =====
   A4 dọc · lề 20 / 20 / 20 / 30 mm · Times New Roman 14 (đầu trang 13, tiêu đề 16) · 2 trang mỗi xã: ① Thông báo của UBND xã ② Danh mục (bảng ấp → CT: Giao tăng/giảm · Chỉ tiêu KH năm).
   Dùng chung khối dựng của các mẫu (hsoBang, hsoQH, hsoKe, hsoTrang, hsoDocx) → xem trước / In / PDF / Word như mọi mẫu. KHÔNG đăng ký vào OM_MAU: khai báo riêng
   của nền ô gắn với tab Hồ sơ; ô của mẫu này chọn ngay trong hộp Biểu 07 (ngày thông báo: tự tính / để chấm / gõ) và ⚙ Khai báo đơn vị › PGD (nơi lập, tỉnh).
   Số liệu: pbBieu07DL (js/47) — chỉ dựng khi khớp QĐ (QT-16); ấp không có tăng / giảm không in. */
var PB07_M = {k:'07pb', ma:'07/PB', ten:'Biểu 07 Phân bổ KH', mg:typeof omMg==='function' ? omMg([20, 20, 20, 30]) : [20, 19.6, 20, 29.6], ngang:false};
function pb07O(v, cham){ v = v==null ? '' : String(v); return v ? '<span class="o-sl">'+coChuHTML(v)+'</span>' : cham; }   /* ô: có số liệu → nền xanh (chỉ trên màn hình) · trống → chấm như giấy gốc */
function pb07NgayDai(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+' tháng '+m[2]+' năm '+m[1] : ''; }
function pb07SoQD(d){ return d.so.indexOf('/')>=0 || !d.kyHieu ? d.so : d.so+(d.kyHieu.charAt(0)==='/' ? '' : '/')+d.kyHieu; }   /* "123" + "/QĐ-BĐDHĐQT" → "123/QĐ-BĐDHĐQT"; số đã có ký hiệu thì giữ */
/* d = pbBieu07DL(...) · o = {ngayTB 'yyyy-mm-dd' | '' (để chấm), noi, tinh} → [{M, h}] 2 trang */
function pb07Lap(d, o){
  o = o || {}; var dv = d.dv, loai = d.laDC ? 'ĐIỀU CHỈNH' : 'GIAO', loaiT = d.laDC ? 'điều chỉnh' : 'giao', ap = dv.apKp, nam = d.nam;
  var ngTB = pb07O(pb07NgayDai(o.ngayTB), '...... tháng ...... năm ......'), donVi = pb07O(dv.hoa, '...........................'), dvT = pb07O(dv.thuong, '..................');
  var P = function(noi, lop, st){ return '<p'+(lop ? ' class="'+lop+'"' : '')+' style="margin:0 0 10pt;line-height:1.15;'+(st || '')+'">'+noi+'</p>'; };
  var t1 = hsoBang('khung0', [56.4, 103.6],
      '<tr><td class="c"><p class="c b s13">ỦY BAN NHÂN DÂN</p><p class="c b s13">'+donVi+'</p>'+hsoKe(22)+'</td><td class="c">'+hsoQH('-', 13).replace(/class="c b"/g, 'class="c b s13"')+'</td></tr>'+
      '<tr><td class="c"><p class="c s13">Số:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/TB-UBND</p></td><td class="c"><p class="c i">'+pb07O(o.noi, '..............')+', ngày '+ngTB+'</p></td></tr>')+
    '<p class="c b s16" style="font-size:16pt;margin:0">&nbsp;</p><p class="c b s16" style="font-size:16pt;margin:0">THÔNG BÁO '+loai+' KẾ HOẠCH DƯ NỢ</p><p class="c b s16" style="font-size:16pt;margin:0 0 10pt">NĂM '+pb07O(nam, '.......')+'</p>'+
    P('Kính gửi: Trưởng các '+ap+' trên địa bàn '+dv.cap+'.')+
    P('Căn cứ Quyết định số '+pb07O(pb07SoQD(d), '..........')+' ngày '+pb07O(pbNgayVN(d.ngayQD), '...../...../........')+' của Trưởng Ban đại diện HĐQT NHCSXH tỉnh '+pb07O(o.tinh, '..........')+' về việc '+loaiT+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các '+dv.cap+';')+
    P('Căn cứ tổng hợp nhu cầu vốn tín dụng chính sách tại các '+ap+'.')+
    P('Ủy ban nhân dân '+dv.cap+' thông báo '+loaiT+' kế hoạch dư nợ năm '+nam+' của các '+ap+' theo danh mục đính kèm.', 'j', 'text-indent:12.7mm')+
    P('Đề nghị Trưởng các '+ap+' căn cứ Thông báo này để chỉ đạo các Tổ TK&amp;VV trong '+ap+' tổ chức bình xét cho vay và lập hồ sơ vay vốn theo quy định của NHCSXH. Việc bình xét cho vay phải đảm bảo công khai, dân chủ, đúng đối tượng và có sự tham gia giám sát của Trưởng '+ap+', đại diện lãnh đạo của tổ chức chính trị - xã hội nhận ủy thác.', 'j', 'text-indent:12.7mm')+
    P('Trên đây là chỉ tiêu kế hoạch dư nợ năm '+nam+' được Ủy ban nhân dân '+dvT+' phê duyệt, đề nghị các Trưởng '+ap+' và các đơn vị có liên quan nghiêm túc thực hiện./.', 'j', 'text-indent:12.7mm')+
    hsoBang('khung0', [80, 80], '<tr><td><p class="b i s12">Nơi nhận:</p><p class="s11">- Như trên;</p><p class="s11">- Lưu VT, VP.</p></td><td class="c"><p class="c b">TM. ỦY BAN NHÂN DÂN</p><p class="c b">CHỦ TỊCH</p></td></tr>');
  var hang = '<thead><tr style="height:13.9mm"><td class="c b">STT</td><td class="c b">Chỉ tiêu</td><td class="c b">Giao tăng/giảm</td><td class="c b">Chỉ tiêu kế hoạch năm '+nam+'</td></tr></thead><tbody>';
  d.ap.forEach(function(a, i){
    hang += '<tr style="height:9.8mm"><td class="c b">'+(i+1)+'</td><td class="b">'+pb07O(a.ten, '')+'</td><td></td><td></td></tr>';
    a.ds.forEach(function(c, j){ hang += '<tr style="height:9.8mm"><td class="c">'+(i+1)+'.'+(j+1)+'</td><td>'+pb07O(c.ten, '')+'</td><td class="c">'+pb07O(pbSoVN(c.dc), '')+'</td><td class="c">'+pb07O(pbSoVN(c.nam), '')+'</td></tr>'; }); });
  if(!d.ap.length) hang += '<tr style="height:9.8mm"><td></td><td></td><td></td><td></td></tr>';
  var t2 = hsoBang('khung0', [56.9], '<tr><td class="c"><p class="c b s13">ỦY BAN NHÂN DÂN</p><p class="c b s13">'+donVi+'</p>'+hsoKe(22)+'</td></tr>')+
    '<p class="c b" style="margin:6pt 0 0">DANH MỤC '+loai+'</p><p class="c b" style="margin:0">CHỈ TIÊU KẾ HOẠCH DƯ NỢ NGUỒN VỐN '+(d.nguon===2 ? 'ĐỊA PHƯƠNG' : 'TRUNG ƯƠNG')+'</p><p class="c b" style="margin:0 0 10pt">NĂM '+nam+'</p>'+
    P('(Kèm theo Thông báo số ......./TB-UBND ngày '+ngTB+' của Chủ tịch UBND '+dvT+')', 'c i s13')+P('Đơn vị: triệu đồng', 'r i')+
    hsoBang('luoi', [35, 36.7, 42.6, 49.5], hang+'</tbody>');
  var boc = function(h){   /* cỡ 14: gắn lớp s14 cho từng đoạn / bảng chưa có cỡ riêng — bộ xuất Word chung (hsoDocx) đọc cỡ theo đoạn / bảng, không theo khung bọc */
    h = h.replace(/<(p|table)( class="([^"]*)")?/g, function(m, the, x, lop){ lop = lop || ''; return /(^| )s\d+( |$)/.test(lop) ? m : '<'+the+' class="'+(lop ? lop+' ' : '')+'s14"'; });
    return '<div class="om-co pb07" style="font-size:14pt">'+h+'</div>'; };
  return [{M:PB07_M, h:boc(t1)}, {M:PB07_M, h:boc(t2)}];
}
function pbNgayVN(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+'/'+m[2]+'/'+m[1] : ''; }
/* nhiều xã → 1 bản in / 1 file Word (mỗi xã 2 trang) */
function pb07Trang(dsDL, o, ten){ var ds = []; dsDL.forEach(function(d){ ds = ds.concat(pb07Lap(d, o)); });   /* mỗi xã đúng 2 trang (chẵn) → tắt chèn trang trắng in 2 mặt giữa Thông báo và Danh mục */
  return {ds:ds, trang:hsoTrang(ds, null, ten).replace('<head>', '<head><meta name="kt-hai-mat" content="0">')}; }
function pb07Ten(dsDL){ var d = dsDL[0] || {}; return xuatTen('Bieu 07 PB', 'QD '+String(d.so || '').replace(/\//g, ' ')+' '+(dsDL.length>1 ? dsDL.length+' xa' : (d.dv || {}).thuong || ''), d.ngayQD || ''); }
