// 3.312 (anh 22/10, gửi bản scan Giấy nộp tiền): tab Giao dịch xã — 🏦 Giấy nộp tiền (nộp để ghi vào tài khoản) + 🧾 Bảng kê các loại tiền nộp,
// cùng cách Giấy lĩnh: chung ô người · TK · số tiền; in Nộp / Bảng kê / Nộp+Bảng kê; mẫu trắng; tóm tắt cảnh báo. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1500,height:950}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
   ok('danh mục mẫu Giao dịch xã có 🏦 Giấy nộp (nhóm Tiết kiệm, cấp tổ)', !!GDX_MAU.find(m=>m.k==='gn' && m.nhom==='Tiết kiệm' && m.cap==='to'));
   const C = gdxC(); C.form = 'gn'; C.glLoai = '105'; C.gnCN = 'Tây Ninh'; C.gnKho = 'a5'; C.gnIn = 'gn'; delete C.gnND; delete C.gnNhan;
   const g = {ten:'Nguyễn Văn Giả', diaChi:'Ấp Giả, xã Giả', tk:'7000000001', tien:'2500000', ngay:'2026-10-22'};
   const dung = (gnIn, gl, trang) => { const X = {mau:'gn', C:JSON.parse(JSON.stringify(Object.assign({}, C, {gnIn}))), gl:gl, bk:gnIn==='bk', kh:gnIn==='kh'}; if(trang) X.C.glTrang = true; return gdxDung(X); };
   const chu = h => h.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
   let B = dung('gn', g), t = chu(B.than);
   ok('Giấy nộp: tiêu đề, ngân hàng, chi nhánh, ngày, loại tiền VND', /GIẤY NỘP TIỀN/.test(t) && /NỘP ĐỂ GHI VÀO TÀI KHOẢN/.test(t) && /CHÍNH SÁCH XÃ HỘI/.test(t) && /Chi nhánh: Tây Ninh/.test(t) && /Ngày 22 tháng 10 năm 2026/.test(t) && /Loại tiền tệ: VND/.test(t), t.slice(0, 260));
   ok('Người nộp = người nhận (gửi vào TK của mình), tài khoản Có 105, nội dung mặc định "Gửi tiết kiệm", số tiền + bằng chữ + Cộng', (t.match(/Nguyễn Văn Giả/g)||[]).length===2 && /CÓ 7000000001/.test(t) && /Gửi tiết kiệm 2\.500\.000/.test(t) && /Hai triệu năm trăm nghìn đồng/.test(t) && /Cộng: 2\.500\.000/.test(t), t.slice(260, 700));
   ok('5 chữ ký: Người nộp tiền · Thủ quỹ · Sổ phụ · Kiểm soát · Giám đốc Ngân hàng; khổ A5 ngang', /Người nộp tiền Thủ quỹ Sổ phụ Kiểm soát Giám đốc Ngân hàng/.test(t) && /size:A5 landscape/.test(B.css));
   C.gnNhan = 'cham'; t = chu(dung('gn', g).than); ok('Người nhận "Để chấm" → chỉ 1 lần tên (người nộp)', (t.match(/Nguyễn Văn Giả/g)||[]).length===1); delete C.gnNhan;
   C.glLoai = '104'; t = chu(dung('gn', g).than); ok('TK 104 tổ trưởng → nội dung mặc định "Nộp tiền vào tài khoản 104"', /Nộp tiền vào tài khoản 104/.test(t)); C.glLoai = '105';
   B = dung('bk', g); t = chu(B.than);
   ok('🧾 Bảng kê nộp: "CÁC LOẠI TIỀN NỘP VÀO NGÂN HÀNG", người nộp tiền, tự chia mệnh giá (5 × 500.000), ký Người nộp / Người nhận tiền', /CÁC LOẠI TIỀN NỘP VÀO NGÂN HÀNG/.test(t) && /Họ và tên người nộp tiền: Nguyễn Văn Giả/.test(t) && /500\.000 5/.test(t) && /Người nộp tiền/.test(t) && /Người nhận tiền/.test(t) && !/người lĩnh/i.test(t), t.slice(0, 300));
   B = dung('kh', g); ok('🏦+🧾 in chung 1 tờ A4 dọc: Giấy nộp + Bảng kê nộp', /GIẤY NỘP TIỀN/.test(B.than) && /CÁC LOẠI TIỀN NỘP VÀO NGÂN HÀNG/.test(B.than) && /gl-kem/.test(B.than) && /A4 portrait/.test(B.css));
   B = dung('gn', {}, true); t = chu(B.than); ok('📄 Mẫu trắng: không tên, không số tiền, giữ khung', /GIẤY NỘP TIỀN/.test(t) && !/Nguyễn Văn Giả|2\.500\.000|Gửi tiết kiệm/.test(t));
   ok('Bảng kê Giấy lĩnh không đổi (vẫn "NGÂN HÀNG CHI RA", người lĩnh tiền)', /CÁC LOẠI TIỀN NGÂN HÀNG CHI RA/.test(gdxBKTrang(C, g)) && /người lĩnh tiền/.test(gdxBKTrang(C, g)));
   /* tab: mở mẫu Giấy nộp */
   doiNgan(7); slDoiTab && 0; await new Promise(r=>setTimeout(r,300));
   const X = gdxChup(); ok('chọn mẫu Giấy nộp → bản chụp mẫu "gn", dùng ô người · số tiền chung (không kiểm số dư rút)', X.mau==='gn' && X.gl && X.gl.du===null);
   const T = gdxTom(); ok('tóm tắt: chưa chọn người nộp → cảnh báo "người nộp"', T.canh.some(x=>/người nộp/.test(x.chu)), JSON.stringify(T.canh.map(x=>x.chu)));
   ok('tên file: GiayNop_… / BangKeNop_… / GiayNop_BangKe_…', /^GiayNop_NguyenVanGia_/.test(gdxTenFile({mau:'gn', C:C, gl:g})) && /^BangKeNop_/.test(gdxTenFile({mau:'gn', C:C, gl:g, bk:true})) && /^GiayNop_BangKe_/.test(gdxTenFile({mau:'gn', C:C, gl:g, kh:true})));
   C.form = 'gl'; return o; });
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
