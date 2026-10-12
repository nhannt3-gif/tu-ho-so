// 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã CÓ SỐ LIỆU (bộ GIẢ tests/gianho31): cây địa bàn theo Mẫu 31 (khối LỌC ĐỊA BÀN, mẫu cấp Điểm GD ẩn Hội / Tổ),
//   điểm GD / ngày GD theo Mẫu 31, 12/GDX in sẵn tên tổ trưởng theo Mẫu 31; 💵 Giấy lĩnh tiền mặt (tìm tên không dấu, khách TK 105 / tổ trưởng TK 104,
//   dòng có thông tin bỏ chấm — trống giữ chấm, "Rút tiền", rút hết số dư, cảnh báo vượt số dư, A5 / A4 nửa trang); danh mục tham chiếu + file TK 104
//   (dữ liệu GIẢ dựng trong phép thử) → TK 104 tổ trưởng + danh sách TK 104 không còn là tổ trưởng; 📜 nhật ký in (in lại đúng bản cũ, tự xóa sau 1 tháng);
//   điện thoại không tràn ngang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = h => String(h||'').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.gdx; delete D.cauHinh.gdxTC; delete D.cauHinh.gdxTK104; localStorage.removeItem(GDX_NK);
   gdxC().danhSachCanBo = ['Cán Bộ Giả A','Cán Bộ Giả B','Cán Bộ Giả C'];
   const S = gdxCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.to = '';
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(500);
   const fd = () => document.getElementById('gdx-khung').contentDocument;
   const T = TO_K.to, dsDiem = {}; Object.keys(T).forEach(m=>{ if(!T[m].trucTiep && T[m].diem) dsDiem[T[m].diem] = 1; });
   ok('cây địa bàn theo Mẫu 31 (khối LỌC ĐỊA BÀN); danh sách điểm GD = các điểm của Mẫu 31', !!document.querySelector('#gdx-cay .loc-khoi') && gdxDsDiem().length===Object.keys(dsDiem).length, gdxDsDiem().length);
   const g0 = gdxDiemGanNhat();
   ok('mở tab, chưa chọn điểm → tự chọn điểm có ngày GD gần nhất (Xã + Điểm GD ở khối lọc)', S.diem===g0.d.k && S.xa===g0.d.maXa && gdxC().ma04===g0.d.k && gdxC().m12SelectedDiem===g0.d.k);
   const an = s => { const e = document.querySelector('#gdx-cay '+s); return !e || getComputedStyle(e).display==='none'; };
   ok('04/TD cần tới Điểm GD → khối lọc ẩn hàng Hội / Tổ', document.getElementById('gdx-cay').classList.contains('gdx-cap-diem') && an('.cap-hoi') && an('[data-cap="to"]'));
   /* đổi điểm ở khối lọc → mẫu theo */
   const khac = gdxDsDiem().find(d=>d.k!==S.diem && d.maXa===S.xa) || gdxDsDiem().find(d=>d.k!==S.diem);
   if(khac.maXa!==S.xa) pvChon('gdx', 'xa', khac.maXa); pvChon('gdx', 'diem', khac.k); await w(300);
   ok('đổi Điểm GD ở khối lọc → 04/TD + 12/GDX theo điểm mới (địa điểm, kính gửi, ngày phát = ngày GD gần nhất)', gdxC().ma04===khac.k && gdxC().m12SelectedDiem===khac.k && gdxChup().C.ngayPhatISO===gdxNgayToi(khac.ngayGD, 1)[0] && /Điểm giao dịch /.test(gdxC().diaDiemPhatTien), khac.tenDiem);
   ok('dòng 📍 điểm: tên · mã điểm (Mẫu 31) · xã · ngày GD', new RegExp('mã '+khac.maDiem).test(document.querySelector('.gdx2-diem').textContent));
   /* 12/GDX tên tổ trưởng theo Mẫu 31 */
   gdxDoiMau('m12'); await w(300); gdxDat('m12TenToOption', 'fill', 1); gdxDat('m12NumRows', khac.to.length, 1); await w(200);
   const t12 = chu(fd().body.innerHTML);
   ok('12/GDX: in sẵn tên tổ trưởng theo Mẫu 31 (xếp theo ấp), mã điểm theo Mẫu 31', khac.to.every(x=>t12.indexOf(x.tenTo)>=0) && t12.indexOf('Mã điểm giao dịch: '+khac.maDiem)>=0);
   /* ---- 💵 Giấy lĩnh ---- */
   gdxDoiMau('gl'); await w(400);
   ok('Giấy lĩnh: tới cấp Tổ → khối lọc hiện Hội / Tổ; mở mẫu → tự chọn điểm GD gần nhất, ngày lĩnh = ngày GD điểm đó', document.getElementById('gdx-cay').classList.contains('gdx-cap-to') && S.diem===g0.d.k && gdxGLDuLieu().ngay===gdxNgayToi(g0.d.ngayGD, 1)[0]);
   ok('chưa chọn người lĩnh → cảnh báo đỏ ở Tóm tắt', /Chưa chọn người lĩnh/.test(document.getElementById('gdx-tom').textContent));
   /* tìm tổ trưởng gõ không dấu */
   const tA = Object.values(T).find(t=>!t.trucTiep && t.ten && /[^\x00-\x7f]/.test(t.ten) && gdxGLDsKhach(t).some(k=>k.t105>0 && k.stk && k.stk.length));
   GDX.glQ = boDau(tA.ten).split(' ').slice(-2).join(' '); gdxGLTim(); await w(100);
   const nut = [...document.querySelectorAll('#gdx-gl-gy button')].find(x=>x.textContent.indexOf(tA.ten)>=0 && /Tổ trưởng/.test(x.textContent));
   ok('ô tìm: gõ tên tổ trưởng không dấu → ra đúng tổ trưởng', !!nut, GDX.glQ);
   nut.click(); await w(400);
   ok('chọn kết quả → khối lọc nhảy tới đúng Xã › Điểm GD › Tổ', S.to===tA.ma && S.diem===tA.khoaDiem);
   const kA = gdxGLDsKhach(tA).find(k=>k.t105>0 && k.stk && k.stk.length);
   gdxGLChonKH(kA.kh); await w(300);
   let g = gdxGLDuLieu(), h = fd().body.innerHTML, t = chu(h);
   ok('khách rút TK 105: họ tên, số TK 105, CCCD, địa chỉ (ấp, xã, tỉnh) lấy theo Mẫu 31', g.ten===kA.ten && g.tk===kA.stk[0] && t.indexOf(kA.ten)>=0 && t.indexOf(kA.stk[0])>=0 && /tỉnh Tây Ninh/.test(g.diaChi) && (!g.cccd || t.indexOf(g.cccd)>=0));
   const dong = nhan => [...fd().querySelectorAll('.gl-r')].find(r=>r.querySelector('.gl-n') && r.querySelector('.gl-n').textContent.indexOf(nhan)===0);
   ok('dòng có thông tin bỏ chấm, dòng trống giữ chấm (giữ form); Nội dung "Rút tiền"', !dong('Họ, tên').querySelector('.gl-c') && !!dong('Họ, tên').querySelector('.gl-v') && !!dong('Số:').querySelector('.gl-c') && !!dong('Yêu cầu').querySelector('.gl-c') && /Nội dung: Rút tiền/.test(t));
   const nutHet = [...document.querySelectorAll('#gdx-m-gltien .gdx-c')].find(x=>/Rút hết số dư/.test(x.textContent)); nutHet.click(); await w(200);
   g = gdxGLDuLieu(); t = chu(fd().body.innerHTML);
   ok('Rút hết số dư → số tiền = số dư 105 theo kỳ số liệu, bằng chữ + bằng số trên giấy', +g.tien===Math.round(kA.t105) && t.indexOf(gdxDocTien(g.tien))>=0 && t.indexOf(gdxTien(g.tien))>=0);
   GDX.glHet = 0; GDX.glTien = String(Math.round(kA.t105) + 1000000); gdxVe(); await w(150);
   ok('số tiền rút lớn hơn số dư 105 → cảnh báo đỏ (không chặn)', /lớn hơn số dư 105/.test(document.getElementById('gdx-tom').textContent));
   ok('khổ A5 ngang (mặc định)', /@page\{size:A5 landscape/.test(fd().head.innerHTML));
   gdxDat('glKho', 'a4', 1); await w(150);
   ok('khổ A4 dọc in nửa trên', /@page\{size:A4 portrait/.test(fd().head.innerHTML) && !!fd().querySelector('.sheet-gl.gl-a4'));
   gdxDat('glKho', 'a5', 1);
   /* nhật ký in: in → đổi khách → in lại bản cũ đúng khách cũ */
   GDX.glTien = '500000'; gdxVe(); localStorage.removeItem(GDX_NK); const hoiGoc = hoi; hoi = (a, b2, c2, fn)=>fn();
   gdxIn(); await w(300); hoi = hoiGoc;
   const kB = gdxGLDsKhach(tA).find(k=>k.kh!==kA.kh); gdxGLChonKH(kB.kh); await w(200);
   const nk = gdxNKDs(); gdxNKIn(nk[0].id); await w(300);
   const tIn = chu(document.getElementById('gdx-in-tam').contentDocument.body.innerHTML);
   ok('📜 nhật ký in: lưu bản vừa in; In lại → đúng khách / số tiền cũ dù đang chọn khách khác', nk.length===1 && nk[0].mau==='gl' && tIn.indexOf(kA.ten)>=0 && tIn.indexOf(kB.ten)<0 && /500\.000/.test(tIn));
   const cu = gdxNKDs(); cu.push({id:'cu', luc:new Date(Date.now()-31*864e5).toISOString(), mau:'m04', tom:'cũ', X:cu[0].X}); gdxNKGhi(cu);
   ok('nhật ký tự xóa bản quá 1 tháng', gdxNKDs().length===1 && !gdxNKDs().some(x=>x.id==='cu'));
   gdxNKMo(); await w(100);
   ok('hộp 📜 Nhật ký in: dòng + 🖨 In lại + 📄 PDF + ×', /In lại/.test(document.getElementById('hop-in').textContent) && document.querySelectorAll('#hop-in .gdx-nk-nut button').length===3); dongHop();
   /* ---- tổ trưởng rút TK 104: danh mục tham chiếu + file TK 104 (dữ liệu GIẢ) ---- */
   gdxDat('glLoai', '104', 1); await w(200);
   g = gdxGLDuLieu();
   ok('TK 104 chưa nạp tham chiếu → số TK để chấm + cảnh báo vàng', g.ten===tA.ten && !g.tk && /Chưa có số tài khoản 104/.test(document.getElementById('gdx-tom').textContent));
   const dsTo = Object.keys(T).filter(m=>!T[m].trucTiep && T[m].ten).slice(0, 6), maKH = m => (typeof hsoTTKH==='function' && hsoTTKH(T[m]).kh) || ('99'+m.replace(/\D/g, '').padStart(8, '0'));
   const ttKH = {}; dsTo.concat([tA.ma]).forEach(m=>{ ttKH[m] = maKH(m); });
   const wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Mã điểm GD','Tên điểm GD','Ngày GD','Số ấp/KP','Mã xã','Tên xã/phường'], [khac.maDiem, khac.tenDiem, khac.ngayGD, 3, '900000', 'Xã Giả']]), 'Diem_giao_dich');
   XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Mã điểm GD','Tên điểm GD','Tên xã/phường','Tên ấp/KP','Mã tổ','Tên Tổ trưởng','Hội (ĐV ủy thác)','Mã KH Tổ trưởng','Số TK 104 (Hoa hồng)','Số điện thoại','Tên Tổ phó','Mã KH Tổ phó']]
     .concat(Object.keys(ttKH).map((m, i)=>[T[m].diem, T[m].tenDiem, T[m].tenXa, T[m].tenThon, m, T[m].ten, 'HỘI GIẢ', ttKH[m], String(1040000000+i), '0900000000', 'Tổ Phó Giả', '']))), 'To_truong');
   const kq = gdxDocFile(XLSX.read(XLSX.write(wb, {type:'array', bookType:'xlsx'}), {type:'array'}));
   ok('đọc file danh mục tham chiếu (sheet tổ có Mã tổ + Số TK 104; sheet điểm GD)', kq.to && Object.keys(kq.to).length===Object.keys(ttKH).length && kq.diem && kq.diem[khac.maDiem] && !kq.tk);
   GDX.napTam = {kq:kq, ten:'gia.xlsx'}; gdxNapLuu(); await w(200);
   g = gdxGLDuLieu(); h = fd().body.innerHTML;
   ok('nạp tham chiếu → Giấy lĩnh TK 104 tổ trưởng tự điền số TK 104 (nguồn: danh mục tham chiếu)', g.tk===D.cauHinh.gdxTC.to[tA.ma].tk104 && g.tkTu==='danh mục tham chiếu' && h.indexOf(g.tk)>=0);
   const wb2 = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['NGAYBC','TENPGD','MADP','MATO','SOTK','MAKH','TENKH','SDT']]
     .concat([[ '2026-10-12', 'PGD GIẢ', '', '', '1040000000', ttKH[Object.keys(ttKH)[0]], 'Tổ Trưởng Đang Làm', '' ], [ '2026-10-12', 'PGD GIẢ', '', '', '1049999991', '9999999991', 'Người Giả Đã Thôi', '' ], [ '2026-10-12', 'PGD GIẢ', '', 'T0CU01', '1049999992', '9999999992', 'Người Giả Thứ Hai', '' ]])), 'Sheet1');
   const kq2 = gdxDocFile(XLSX.read(XLSX.write(wb2, {type:'array', bookType:'xlsx'}), {type:'array'}));
   ok('đọc file TK 104 hệ thống (SOTK, MAKH, TENKH, MATO)', kq2.tk && kq2.tk.ds.length===3 && !kq2.to);
   GDX.napTam = {kq:kq2, ten:'tk104gia.xlsx'}; gdxNapLuu(); await w(200);
   const lech = gdxTK104Lech();
   ok('TK 104 không còn là tổ trưởng: chỉ báo 2 người không phải tổ trưởng ở mọi nguồn (người đang là tổ trưởng không báo)', lech && lech.length===2 && lech.every(x=>/^99999999/.test(x.kh)) && lech.some(x=>/tổ cũ T0CU01/.test(x.ghi)), lech && lech.map(x=>x.kh).join(','));
   gdxKBChung(); await w(100);
   ok('⚙ Khai báo chung: trạng thái danh mục tham chiếu + file TK 104 + nút danh sách (2)', /Danh mục tham chiếu/.test(document.getElementById('hop-in').textContent) && /TK 104 không còn là tổ trưởng \(2\)/.test(document.getElementById('hop-in').textContent));
   gdxTK104Hop(); await w(100);
   ok('bảng TK 104 không còn là tổ trưởng + 📊 Xuất Excel', document.querySelectorAll('#hop-in .gdx-bang tr').length===3 && /Xuất Excel/.test(document.getElementById('hop-in').textContent)); dongHop();
   luu(); const ch = JSON.parse(localStorage.getItem(KHOA)).cauHinh;
   ok('tham chiếu + TK 104 lưu cùng cài đặt (Drive của anh — không ở mã nguồn)', !!(ch.gdxTC && ch.gdxTC.to[tA.ma]) && !!(ch.gdxTK104 && ch.gdxTK104.ds.length===3));
   gdxDat('glLoai', '105', 1); gdxDoiMau('m04'); await w(200);
   return o;
 }, files);
 /* điện thoại: xem là chính, không tràn ngang */
 await p.setViewportSize({width:390, height:844}); await p.waitForTimeout(600);
 const tran = await p.evaluate(()=>document.documentElement.scrollWidth - window.innerWidth);
 R.push((tran<=1 ? '✓ ' : '✗ ')+'điện thoại 390 px: tab Giao dịch xã không tràn ngang — '+tran+' px');
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); const dat = R.filter(x=>x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); })();
