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
   kyChungDoi('2026-08'); delete D.cauHinh.gdx; delete D.cauHinh.dmTo; delete D.cauHinh.dmTK104; DMT_KQ = null; localStorage.removeItem(GDX_NK);
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
   ok('3.179: Giấy lĩnh mặc định TK 104 tổ trưởng', gdxC().glLoai==='104');
   gdxDoiMau('gl'); gdxDat('glLoai', '105', 1); await w(400);
   ok('Giấy lĩnh: tới cấp Tổ → khối lọc hiện Hội / Tổ; mở mẫu → tự chọn điểm GD gần nhất, ngày lĩnh mặc định = hôm nay (3.182 bỏ ngày GD điểm)', document.getElementById('gdx-cay').classList.contains('gdx-cap-to') && S.diem===g0.d.k && gdxGLDuLieu().ngay===gdxHom());
   ok('chưa chọn người lĩnh → cảnh báo đỏ ở Tóm tắt', /Chưa chọn người lĩnh/.test(document.getElementById('gdx-tom').textContent));
   /* tìm tổ trưởng gõ không dấu */
   const tA = Object.values(T).find(t=>!t.trucTiep && t.ten && /[^\x00-\x7f]/.test(t.ten) && gdxGLDsKhach(t).some(k=>k.t105>0 && k.stk && k.stk.length));
   GDX.glTatCa = 1; GDX.glQ = boDau(tA.ten).split(' ').slice(-2).join(' '); gdxGLTim(); await w(100);
   const nut = [...document.querySelectorAll('#gdx-gl-gy button')].find(x=>x.textContent.indexOf(tA.ten)>=0 && /Tổ trưởng/.test(x.textContent));
   ok('ô tìm: gõ tên tổ trưởng không dấu → ra đúng tổ trưởng', !!nut, GDX.glQ);
   const q = document.getElementById('gdx-gl-q'), dsN = [...document.querySelectorAll('#gdx-gl-gy button')], iA = dsN.indexOf(nut);
   for(let i=0;i<iA;i++) q.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}));
   ok('3.176: ↑↓ di chuyển trong kết quả tìm (dòng đang chọn tô màu)', iA===0 || (dsN[iA].classList.contains('bat') && !dsN[0].classList.contains('bat')), iA);
   q.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(400);
   ok('chọn kết quả → khối lọc nhảy tới đúng Xã › Điểm GD › Tổ', S.to===tA.ma && S.diem===tA.khoaDiem);
   const kA = gdxGLDsKhach(tA).find(k=>k.t105>0 && k.stk && k.stk.length);
   gdxGLChonKH(kA.kh); await w(300);
   let g = gdxGLDuLieu(), h = fd().body.innerHTML, t = chu(h);
   ok('khách rút TK 105: họ tên, số TK 105, CCCD, địa chỉ (ấp, xã, tỉnh) lấy theo Mẫu 31', g.ten===kA.ten && g.tk===kA.stk[0] && t.indexOf(kA.ten)>=0 && t.indexOf(kA.stk[0])>=0 && /tỉnh Tây Ninh/.test(g.diaChi) && (!g.cccd || t.indexOf(g.cccd)>=0));
   const dong = nhan => [...fd().querySelectorAll('.gl-r')].find(r=>r.querySelector('.gl-n') && r.querySelector('.gl-n').textContent.indexOf(nhan)===0);
   ok('dòng có thông tin bỏ chấm, dòng trống giữ chấm (giữ form); Nội dung "Rút tiền"', !dong('Họ, tên').querySelector('.gl-c') && !!dong('Họ, tên').querySelector('.gl-v') && !!dong('Số:').querySelector('.gl-c') && !!dong('Yêu cầu').querySelector('.gl-c') && /Nội dung: Rút tiền/.test(t));
   const nutHet = [...document.querySelectorAll('#gdx-m-glphieu .gdx-c')].find(x=>/Rút hết/.test(x.textContent)); nutHet.click(); await w(200);
   g = gdxGLDuLieu(); t = chu(fd().body.innerHTML);
   ok('Rút hết số dư → số tiền = số dư 105 theo kỳ số liệu, bằng chữ + bằng số trên giấy', +g.tien===Math.round(kA.t105) && t.indexOf(gdxDocTien(g.tien))>=0 && t.indexOf(gdxTien(g.tien))>=0);
   GDX.glHet = 0; GDX.glTien = String(Math.round(kA.t105) + 1000000); gdxVe(); await w(150);
   ok('số tiền rút lớn hơn số dư 105 → cảnh báo đỏ (không chặn)', /lớn hơn số dư 105/.test(document.getElementById('gdx-tom').textContent));
   GDX.glTien = '1632500'; GDX.glHet = 0; gdxVe(); await w(300);
   let b1 = fd().querySelector('.gl-bc1'), b2 = fd().querySelector('.gl-bc2');
   ok('3.175: bằng chữ dài → phần còn lại xuống dòng dưới (bỏ chấm), đủ chữ không cắt', !!b1 && !!b2 && b2.classList.contains('gl-v') && (b1.textContent+' '+b2.textContent).trim()===gdxDocTien('1632500') && b1.scrollWidth<=b1.clientWidth+1, b1 && b1.textContent+' | '+(b2 && b2.textContent));
   GDX.glTien = '500000'; gdxVe(); await w(300); b2 = fd().querySelector('.gl-bc2');
   ok('bằng chữ vừa 1 dòng → dòng dưới giữ chấm', !!b2 && b2.classList.contains('gl-c'));
   ok('chữ VBSP chìm + chữ 13 pt', !!fd().querySelector('.gl-chim') && /\.gl-trang\{[^}]*font-size:13pt/.test(fd().head.innerHTML));
   const ip = k => document.querySelector('.gl-form-luoi input[data-k="'+k+'"]');
   ok('3.175: form gõ tay dưới ô tìm, app điền sẵn theo người đã chọn', !!ip('ten') && ip('ten').value===kA.ten && ip('tk').value===kA.stk[0]);
   ip('ten').value = 'Người Giả Sửa Tay'; ip('ten').oninput(); ip('ncap').value = '230421'; ip('ncap').oninput(); await w(200);
   g = gdxGLDuLieu(); t = chu(fd().body.innerHTML);
   ok('sửa tay trên form → in theo form (chỉ lần in này), ngày cấp gõ nhanh 230421 → 23/04/2021', g.ten==='Người Giả Sửa Tay' && g.ncap==='2021-04-23' && t.indexOf('Người Giả Sửa Tay')>=0 && (SL_DB.kh[kA.kh]||{}).ten!=='Người Giả Sửa Tay');
   gdxGLLamTrong(); await w(200); g = gdxGLDuLieu();
   ok('✕ Làm trống form → gõ người khác từ đầu (không cần tìm); 3.185: bỏ luôn chọn tổ ở cây địa bàn, giữ Xã / Điểm', !g.ten && !g.tk && !!fd().querySelector('.gl-r .gl-c') && !S.to && !!S.diem);
   pvChonTo('gdx', tA.ma); await w(300); gdxGLChonKH(kA.kh); await w(200);
   gdxGLTrangIn(2); await w(400); let dIn = document.getElementById('gdx-in-tam').contentDocument;
   ok('3.175: in mẫu trắng 2 mẫu / A4 cắt đôi: 2 tờ trắng đúng form (không tên, không "Rút tiền"), vạch cắt giữa, khổ A4', dIn.querySelectorAll('.gl-trang').length===2 && !!dIn.querySelector('.gl-cat') && /@page\{size:A4 portrait/.test(dIn.head.innerHTML) && chu(dIn.body.innerHTML).indexOf(kA.ten)<0 && !/Rút tiền/.test(chu(dIn.body.innerHTML)));
   gdxGLTrangIn(1); await w(400); dIn = document.getElementById('gdx-in-tam').contentDocument;
   ok('in mẫu trắng 1 mẫu / A4', dIn.querySelectorAll('.gl-trang').length===1 && !!dIn.querySelector('.sheet-gl.gl-a4'));
   ok('3.176: khung gọn — loại TK + ô tìm + khách trong tổ (ô sổ xuống) + form + số tiền trong 1 khung', !!document.querySelector('#gdx-m-glphieu .gl-khung select') && !!document.querySelector('#gdx-m-glphieu #gdx-gl-q') && document.querySelectorAll('#gdx-m-glphieu .gl-form-luoi input').length===5 && !!document.querySelector('#gdx-m-glphieu #gdx-gl-tien') && !document.getElementById('gdx-m-gltien') && !document.getElementById('gdx-m-glnguoi'));
   GDX.glTien = '1000000'; gdxVe(); gdxGLBuoc(100000); gdxGLBuoc(100000); gdxGLBuoc(-100000);
   ok('3.176: ▲▼ số tiền bước 100 nghìn', gdxGLDuLieu().tien==='1100000' && document.getElementById('gdx-gl-tien').value==='1.100.000');
   ok('3.176: Nội dung nằm cột trái, ô Số tiền kéo tới ngang dòng Nội dung', (()=>{ const nd = [...fd().querySelectorAll('.gl-trai .gl-r .gl-n')].find(x=>/Nội dung/.test(x.textContent)); const b3 = fd().querySelector('.gl-hop3'); if(!nd || !b3) return false; const a = nd.parentNode.getBoundingClientRect(), b = b3.getBoundingClientRect(); return Math.abs(a.bottom - b.bottom) < 12; })());
   const chim = () => { const e = fd().querySelector('.gl-chim'); return e ? e.className.replace('gl-chim ', '') : 'tat'; };
   const c0 = chim(); gdxDat('glChim', 'dam', 1); await w(100); const c1 = chim(); gdxDat('glChim', 'tat', 1); await w(100); const c2 = chim();
   gdxGLTrangIn(1); await w(300); const cT = document.getElementById('gdx-in-tam').contentDocument.querySelector('.gl-chim');
   gdxDat('glChim', 'nhat', 1); await w(100); gdxGLTrangIn(1); await w(300); const cT2 = document.getElementById('gdx-in-tam').contentDocument.querySelector('.gl-chim');
   ok('3.176: chữ chìm Tắt · Nhạt · Vừa · Đậm — phiếu điền mặc định Nhạt, phiếu trắng Vừa, Tắt thì tắt cả 2', c0==='chim-nhat' && c1==='chim-dam' && c2==='tat' && !cT && !!cT2 && /chim-vua/.test(cT2.className), [c0, c1, c2].join(','));
   ok('khổ A5 ngang (mặc định)', /@page\{size:A5 landscape/.test(fd().head.innerHTML));
   gdxDat('glKho', 'a4', 1); await w(150);
   ok('khổ A4 dọc in nửa trên', /@page\{size:A4 portrait/.test(fd().head.innerHTML) && !!fd().querySelector('.sheet-gl.gl-a4'));
   gdxDat('glKho', 'a5', 1);
   /* nhật ký in: in → đổi khách → in lại bản cũ đúng khách cũ */
   GDX.glTien = '500000'; gdxVe(); localStorage.removeItem(GDX_NK); const hoiGoc = hoi; hoi = (a, b2, c2, fn)=>fn();
   gdxIn(); await w(300); hoi = hoiGoc;
   ok('3.176/3.182: in xong → nút ✕ Làm trống (in người khác) ở đầu khung, kế 👁 Xem', !!document.querySelector(".gdx2-nut .gdx-moi") && !document.querySelector("#gdx-tom .gdx-moi"));
   { const dd = [...document.querySelectorAll('#gdx-m-glngay .gdx-c')].map(b=>b.textContent).join('|'), h0 = gdxDung({mau:'gl', C:gdxC(), gl:gdxGLDuLieu()});
     ok('3.182: ngày lĩnh chỉ Hôm nay · nhập ngày · Để chấm (bỏ ngày GD điểm), 1 dòng; ô số tiền nổi bật', !/Ngày GD/.test(dd) && /Hôm nay/.test(dd) && /Để chấm/.test(dd) && !!document.querySelector('#gdx-m-glngay .gdx-1dong') && !!document.querySelector('#gdx-gl-tien.gdx-tien-to'), dd);
     ok('3.183: nơi cấp tự tính theo ngày cấp, viết đủ (từ 01/07/2024 Bộ Công an; trước đó Cục Cảnh sát quản lý hành chính về trật tự xã hội)', gdxNoiCap('2024-07-01')==='Bộ Công an' && gdxNoiCap('30/06/2024')==='Cục Cảnh sát quản lý hành chính về trật tự xã hội' && gdxNoiCap('')==='');
     GDX.glSua = {ncap:'05/03/2017'}; const gC = gdxGLDuLieu(), tC = gdxTom().canh.map(x=>x.chu).join(' | '); GDX.glSua = {};
     ok('3.184: thẻ cấp trước 10/10/2018 (trường hợp cũ) → ghi chung "Cục Cảnh sát" + cảnh báo kiểm lại', gC.noiCap==='Cục Cảnh sát' && /trước 10\/10\/2018/.test(tC), gC.noiCap);
     GDX.glSua = {ncap:'250221'}; const gN = gdxGLDuLieu(); GDX.glSua = {};
     ok('3.183: Giấy lĩnh — gõ ngày cấp → ô Nơi cấp tự điền đủ chữ, không lấy số liệu', gN.noiCap==='Cục Cảnh sát quản lý hành chính về trật tự xã hội', gN.noiCap);
     gdxVe(); await w(200); const r1 = ['ten','cccd','ncap'].map(k=>document.querySelector('.gl-form-luoi input[data-k="'+k+'"]').getBoundingClientRect().top);
     { const q = k => document.querySelector('.gl-form-luoi input[data-k="'+k+'"]').getBoundingClientRect().top, nc = document.getElementById('gdx-gl-noicap');
       GDX.glSua = {ncap:'010824'}; gdxVe(); await w(150); const nc2 = (document.getElementById('gdx-gl-noicap')||{}).textContent || ''; GDX.glSua = {}; gdxVe(); await w(100);
       ok('3.184: không còn ô Nơi cấp — chữ mờ cạnh nhãn Địa chỉ (tự tính theo ngày cấp); Địa chỉ · Tài khoản số cùng 1 dòng', !document.querySelector('.gl-form-luoi input[data-k="noiCap"]') && !!nc && /Nơi cấp: Bộ Công an/.test(nc2) && Math.abs(q('diaChi')-q('tk'))<3, nc2); }
     ok('3.183: Họ tên · CCCD · Ngày cấp cùng 1 dòng; nút 👁 Xem: Bật / Tắt ghi rõ trạng thái', Math.abs(r1[0]-r1[1])<3 && Math.abs(r1[0]-r1[2])<3 && /Xem: (Bật|Tắt)/.test(document.querySelector('.gdx2-nut').textContent), r1.join(','));
     { const c1 = JSON.parse(JSON.stringify(gdxC())); c1.glPGD = 'Gò Dầu'; c1.glPGDDam = 'thuong'; const hT = gdxHTMLGL({}, c1); c1.glPGDDam = 'dam'; const hD = gdxHTMLGL({}, c1);
       ok('3.200: tùy chọn dòng PGD Giấy lĩnh — Đậm (mặc định) / Thường; số tiền bằng chữ in nghiêng', /\.gl-bc1,\.gl-bc2,\.gl-v\.gl-ng\{font-style:italic\}/.test(h0.css) && /class="gl-pgdv gl-thuong">PHÒNG GIAO DỊCH GÒ DẦU/.test(hT) && /class="gl-pgdv">PHÒNG GIAO DỊCH GÒ DẦU/.test(hD) && /\.gl-pgdv\.gl-thuong\{font-weight:normal\}/.test(h0.css) && GDX_MD.glPGDDam==='dam'); }
     ok('3.199: ngày tháng cùng dòng PGD (ngày cách tiêu đề 2,75 mm; dòng chấm PGD trống cũng ngang ngày), thân phiếu + chữ chìm lên 1,25 mm', /\.gl-ngay\{[^}]*margin-top:2\.75mm/.test(h0.css) && /\.gl-nh \.gl-pgd\{margin-top:-\.3mm/.test(h0.css) && /top:47\.15mm/.test(h0.css));
     ok('3.198: Giấy lĩnh không viết tắt PGD — PGD Gò Dầu / Gò Dầu → PHÒNG GIAO DỊCH GÒ DẦU; trống → chấm', gdxTenPGD('PGD GÒ DẦU')==='PHÒNG GIAO DỊCH GÒ DẦU' && gdxTenPGD('Gò Dầu')==='PHÒNG GIAO DỊCH GÒ DẦU' && gdxTenPGD('Phòng giao dịch Gò Dầu')==='PHÒNG GIAO DỊCH GÒ DẦU' && gdxTenPGD(' ')==='');
     ok('3.197: PGD Giấy lĩnh in đậm; ô Số tiền bằng số giãn đều; Bảng kê chữ Họ tên nhỏ nghiêng, chấm dài', /\.gl-pgdv\{font-weight:bold\}/.test(h0.css) && /\.gl-hop3 \.gl-hop\{justify-content:space-evenly/.test(h0.css) && /\.bk-hoten \.gl-n\{font-size:8pt\}/.test(BK_CSS_LOI+BK_CSS) && /<i>Họ tên:<\/i>/.test(gdxBKTrang(gdxC())));
     ok('3.182: mẫu in lề trên 13 mm (+5), chữ chìm dời theo, 2 gạch dọc ô Người lĩnh tiền cách đáy 0,5 mm (3.197: dài thêm 2 mm), khối trái giãn đều 7,08 mm, chấm bằng chữ lên 0,8 mm', /\.gl-trang\{[^}]*padding:13mm/.test(h0.css) && /top:47\.15mm/.test(h0.css) && /\.gl-trai \.gl-r\{min-height:7\.08mm\}/.test(h0.css) && /\.gl-bcd \.gl-c\{position:relative;top:-\.8mm\}/.test(h0.css) && /class="gl-bcd"/.test(h0.than) && /\.gl-dau\{[^}]*margin-bottom:8mm/.test(h0.css) && /\.gl-ky-l\{[^}]*margin-bottom:\.5mm/.test(h0.css)); }
   const kB = gdxGLDsKhach(tA).find(k=>k.kh!==kA.kh); gdxGLChonKH(kB.kh); await w(200);
   const nk = gdxNKDs(); gdxNKIn(nk[0].id); await w(300);
   const tIn = chu(document.getElementById('gdx-in-tam').contentDocument.body.innerHTML);
   ok('📜 nhật ký in: lưu bản vừa in; In lại → đúng khách / số tiền cũ dù đang chọn khách khác', nk.length===1 && nk[0].mau==='gl' && tIn.indexOf(kA.ten)>=0 && tIn.indexOf(kB.ten)<0 && /500\.000/.test(tIn));
   { /* 3.187: CCCD tổ trưởng (TK 104) lấy từ file về tổ khi danh bạ khách không có */
     gdxDat('glLoai', '104', 1); pvChonTo('gdx', tA.ma); await w(300);
     const goc = window.hsoKhach, t0 = TO_K.to[tA.ma], tt0 = t0.tt; window.hsoKhach = function(){ return {}; };
     t0.tt = Object.assign({}, tt0||{}, {cccd:'012345678999', ncap:'2021-02-25'}); TO_K.bangTo = null; const gT = gdxGLDuLieu();
     t0.tt = Object.assign({}, tt0||{}, {cccd:''}); const ds0 = t0.ds; t0.ds = Object.assign({}, ds0||{}, {cccd:''}); const dm0 = D.cauHinh.dmTo; D.cauHinh.dmTo = {to:{}, diem:{}}; TO_K.bangTo = null;
     gdxVe(); await w(200); const gK = gdxGLDuLieu(), tK = gdxTom().canh.map(x=>x.chu).join(' | ');
     window.hsoKhach = goc; t0.tt = tt0; t0.ds = ds0; D.cauHinh.dmTo = dm0; TO_K.bangTo = null; gdxVe(); await w(200);
     ok('3.187: CCCD tổ trưởng — danh bạ khách không có → lấy từ file Thông tin tổ trưởng (kèm ngày cấp); không có ở đâu → Tóm tắt báo lý do', gT.cccd==='012345678999' && gT.ncap==='2021-02-25' && /Thông tin tổ trưởng/.test(gT.ccTu) && !gK.cccd && /Chưa có CCCD tổ trưởng/.test(tK), (gT.ccTu||'')+' · '+tK.slice(0, 60)); }
   { /* 3.193 (anh): 🧾 Bảng kê = mẫu độc lập (mẫu trắng), không còn dính Giấy lĩnh */
     ok('3.194: Giấy lĩnh có 3 nút in 💵 / 🧾 / 💵+🧾 + Mẫu trắng (Giấy lĩnh · Bảng kê · Kết hợp); ⚙ Giấy lĩnh không có mục Bảng kê', document.querySelectorAll('#gdx-tom .gdx-seg .gdx-c').length===3 && /Bảng kê/.test(document.querySelector('#gdx-tom .gdx-menu').textContent) && /Kết hợp/.test(document.querySelector('#gdx-tom .gdx-menu').textContent) && !/a4bk/.test(gdxGLMuc('glkho', 1)) && !GDX_MUC.gl.some(o=>/^bk/.test(o.k)));
     { GDX.glTien = '1750000'; gdxDat('glIn', 'kh', 1); await w(400); const dK = fd(), gK = gdxGLDuLieu(), bk = dK.querySelector('.gl-bkk .bk-trang');
       ok('3.194: 💵+🧾 — 1 tờ A4: Giấy lĩnh + Bảng kê điền theo Giấy lĩnh (họ tên, tự chia 3×500.000, bằng chữ), dòng ký Họ tên để trống, logo NHCSXH', !!dK.querySelector('.gl-trang') && !!bk && (!gK.ten || bk.querySelector('.bk-ten').textContent.indexOf(gK.ten)>=0) && bk.querySelector('.bk-sl').textContent==='3' && /Một triệu bảy trăm năm mươi/.test(bk.textContent) && bk.querySelectorAll('.bk-hoten .gl-v').length===0 && !!bk.querySelector('img.bk-logo'));
       gdxDat('glIn', 'bk', 1); await w(400); const dR = fd(), T = dR.querySelectorAll('.bk-trang');
       ok('3.194: 🧾 từ Giấy lĩnh — A4 ngang 1 tờ có dữ liệu, không có Giấy lĩnh, 1 nét cắt', T.length===1 && !dR.querySelector('.gl-trang') && dR.querySelectorAll('.bk-cat').length===1 && T[0].querySelector('.bk-sl').textContent==='3');
       gdxDat('glIn', 'gl', 1); GDX.glTien = ''; await w(300);
       ok('3.194: 💵 Lĩnh — chỉ Giấy lĩnh', !fd().querySelector('.bk-trang') && !!fd().querySelector('.gl-trang')); }
     { const c = gdxC(), k = c.glKho; c.glKho = 'a4bk'; gdxC(); ok('3.193: khổ cũ "A4 + Bảng kê" → A4 nửa trên', c.glKho==='a4'); c.glKho = k; }
     gdxDoiMau('bk'); await w(500); const dB = fd(), S = dB.querySelector('.sheet-bk'), T = [...dB.querySelectorAll('.bk-trang')].map(x=>x.getBoundingClientRect()), zB = S ? (+S.style.zoom || 1) : 1, mm = v=>Math.round(v/3.7795/zB);
     ok('3.193: chip mẫu 🧾 Bảng kê; xem 2 tờ 105 × 210 / A4 ngang sát 2 mép, 2 nét cắt; lọc địa bàn ẩn', [...document.querySelectorAll('.gdx2-mau .gdx-c')].some(b=>/Bảng kê/.test(b.textContent)) && !!S && mm(S.getBoundingClientRect().width)===297 && T.length===2 && mm(T[0].width)===105 && mm(T[0].height)===210 && mm(T[0].left-S.getBoundingClientRect().left)===0 && mm(S.getBoundingClientRect().right-T[1].right)===0 && dB.querySelectorAll('.bk-cat').length===2 && (!document.getElementById('gdx-cay') || getComputedStyle(document.getElementById('gdx-cay')).display==='none'));
     ok('3.193: khai báo Bảng kê đủ 6 mục ở khung trái (Tên cơ quan · Ngày · Họ tên · Địa chỉ · Nội dung · Logo chìm)', ['bkcq','bkngay','bkten','bkdc','bknd','bkchim'].every(k=>!!document.getElementById('gdx-m-'+k)));
     ok('3.193: mặc định — PGD GÒ DẦU in sẵn (in hoa), ngày / họ tên / địa chỉ / nội dung chấm, bảng mệnh giá trắng', /PHÒNG GIAO DỊCH:\s*\S/.test(dB.querySelector('.bk-pgd').textContent) && /PHÒNG GIAO DỊCH: GÒ DẦU/.test(dB.querySelector('.bk-pgd b').textContent) && !dB.querySelector('.bk-pgd .gl-c') && /PHÒNG GIAO DỊCH:\s*$/.test(gdxBKTrang(Object.assign({}, gdxC(), {bkPGD:''})).match(/<div class="gl-r bk-pgd"><b>([^<]*)/)[1]) && /bk-pgd"><b>PHÒNG GIAO DỊCH:<\/b><span class="gl-c/.test(gdxBKTrang(Object.assign({}, gdxC(), {bkPGD:''}))) && !dB.querySelector('.bk-ngay .gl-vn') && !!dB.querySelector('.bk-ten .gl-c') && [...dB.querySelectorAll('.bk-sl')].every(x=>!x.textContent) && dB.querySelectorAll('.bk-lt').length===22);
     gdxDat('bkTen', 'Giả Văn Kê'); gdxDat('bkND', 'Rút tiền'); gdxDat('bkNgay', 'hom', 1); gdxDat('bkCQ2', 'CHI NHÁNH GIẢ', 1); await w(400); const d2 = fd();
     ok('3.193: có chữ thì in (họ tên, nội dung, tên cơ quan), ngày hôm nay ghi sẵn', /Giả Văn Kê/.test(d2.querySelector('.bk-ten').textContent) && /Rút tiền/.test(d2.body.textContent) && /CHI NHÁNH GIẢ/.test(d2.querySelector('.bk-nh').textContent) && !!d2.querySelector('.bk-ngay .gl-vn'));
     ['bkTen','bkND'].forEach(k=>gdxC()[k]=''); gdxC().bkNgay = 'cham'; gdxC().bkCQ2 = GDX_MD.bkCQ2;
     const kb = hsoKB(), lgCu = kb.logo; kb.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
     const cc = JSON.parse(JSON.stringify(gdxC())); cc.bkChim = 'dam'; cc.glChim = 'tat'; const hD = gdxBKTrang(cc); cc.bkChim = 'tat'; cc.glChim = 'dam'; const hT = gdxBKTrang(cc);
     if(lgCu) kb.logo = lgCu; else delete kb.logo; const hV = gdxBKTrang(gdxC());
     ok('3.193/3.194: logo chìm Bảng kê riêng (Đậm / Tắt không theo Giấy lĩnh); chưa nạp logo → logo NHCSXH có sẵn; ⬇ Tải logo', /<img class="bk-chim bk-logo chim-dam"/.test(hD) && !/bk-chim/.test(hT) && hV.indexOf(LOGO_NHCSXH)>0 && /^data:image\/png;base64,/.test(LOGO_NHCSXH) && typeof hsoLogoTai==='function');
     ok('3.187: tự chia mệnh giá (hàm giữ lại) 1.350.000 = 2×500.000 + 1×200.000 + 1×100.000 + 1×50.000', JSON.stringify(gdxBKChia(1350000).so)==='{"50000":1,"100000":1,"200000":1,"500000":2}');
     gdxDoiMau('gl'); await w(400); }
   { /* 3.185: tìm theo CCCD · Enter → ô số tiền · TK 105 bù theo CCCD / ghi lý do */
     gdxDat('glLoai', '105', 1); await w(200);
     let kc = null; for(const m of Object.keys(TO_K.kh)){ const t = TO_K.to[m]; if(!t || t.trucTiep) continue; for(const o of TO_K.kh[m]){ const cc = gdxCCCDCua(o.kh, t); if(cc && cc.length>=9){ kc = {o, m, cc}; break; } } if(kc) break; }
     if(kc){ GDX.glTatCa = 1; GDX.glQ = kc.cc.slice(-6); gdxGLTim(); await w(100);
       const bs = [...document.querySelectorAll('#gdx-gl-gy button')], iC = bs.findIndex(b=>b.textContent.indexOf(kc.cc)>=0), q = document.getElementById('gdx-gl-q');
       for(let j=0;j<iC;j++) q.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}));
       q.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(400);
       ok('3.185: gõ 6 số cuối CCCD → ra đúng người (kèm CCCD); ↑↓ Enter → điền form, con trỏ nhảy ô số tiền', iC>=0 && (document.activeElement||{}).id==='gdx-gl-tien' && String(gdxGLDuLieu().cccd).replace(/\D/g,'')===kc.cc, kc.cc.slice(-6)); }
     else ok('3.185: tìm theo CCCD', false, 'dữ liệu giả không có CCCD');
     let kn = null; for(const m of Object.keys(TO_K.kh)){ const t = TO_K.to[m]; if(!t || t.trucTiep) continue; const x = gdxGLDsKhach(t).find(k=>!(k.stk||[]).length && gdxCCCDCua(k.kh, t).length>=9); if(x){ kn = {x, t}; break; } }
     if(kn){ pvChonTo('gdx', kn.t.ma); await w(300); gdxGLChonKH(kn.x.kh); await w(300);
       const g1 = gdxGLDuLieu(), ly = (document.querySelector('#gdx-m-glphieu').textContent.match(/TK 105: chưa có — [^\n]*/)||[''])[0];
       const cc = gdxCCCDCua(kn.x.kh, kn.t); SL_DB.kh['ZZ_GIA_99'] = {cccd:cc, stk:'1234567890', stkKy:'2026-07'}; const g2 = gdxGLDuLieu(); delete SL_DB.kh['ZZ_GIA_99'];
       ok('3.185: TK 105 chưa có số sổ → ghi lý do; có số sổ cùng CCCD ở danh bạ (mã KH khác) → lấy, ghi "theo CCCD"', !g1.tk && !!g1.tkLy && !!ly && g2.tk==='1234567890' && /theo CCCD/.test(g2.tkTu), ly.slice(0, 60)); }
     else { /* dữ liệu giả: khách có CCCD đều đã có số sổ → giả lập 1 khách chưa có số sổ (chỉ trong phép thử) */
       let kz = null; for(const m of Object.keys(TO_K.kh)){ const t = TO_K.to[m]; if(!t || t.trucTiep) continue; const x = gdxGLDsKhach(t).find(k=>gdxCCCDCua(k.kh, t).length>=9); if(x){ kz = {x, t}; break; } }
       const goc = window.gdxGLDsKhach; window.gdxGLDsKhach = function(t){ return goc(t).map(k=>k.kh===kz.x.kh ? Object.assign({}, k, {stk:[], coTK:true}) : k); };
       const db = SL_DB.kh[kz.x.kh], stk0 = db && db.stk; if(db) delete db.stk;
       pvChonTo('gdx', kz.t.ma); await w(300); gdxGLChonKH(kz.x.kh); await w(300);
       const g1 = gdxGLDuLieu(), ly = (document.querySelector('#gdx-m-glphieu').textContent.match(/TK 105: chưa có — .{0,80}/)||[''])[0];
       SL_DB.kh['ZZ_GIA_99'] = {cccd:gdxCCCDCua(kz.x.kh, kz.t), stk:'1234567890', stkKy:'2026-07'}; const g2 = gdxGLDuLieu(); delete SL_DB.kh['ZZ_GIA_99'];
       window.gdxGLDsKhach = goc; if(db && stk0) db.stk = stk0;
       ok('3.185: TK 105 chưa có số sổ → ghi lý do (Mẫu 31 chỉ báo đã mở TK…); có số sổ cùng CCCD ở danh bạ (mã KH khác) → lấy, ghi "theo CCCD"', !g1.tk && /Sao kê TK 105/.test(g1.tkLy||'') && !!ly && g2.tk==='1234567890' && /theo CCCD/.test(g2.tkTu), ly.slice(0, 70)); }
   }
   GDX.glDaIn = true; gdxTomVe(); gdxGLMoi(); await w(400);
   ok('bấm Làm trống — in người khác: bỏ người lĩnh, tổ, số tiền; giữ ngày, khổ; con trỏ về ô tìm', !gdxGLDuLieu().ten && !gdxGLDuLieu().tien && !S.to && !!S.diem && document.activeElement && document.activeElement.id==='gdx-gl-q');
   pvChonTo('gdx', tA.ma); gdxGLChonKH(kA.kh); await w(300);
   const cu = gdxNKDs(); cu.push({id:'cu', luc:new Date(Date.now()-31*864e5).toISOString(), mau:'m04', tom:'cũ', X:cu[0].X}); gdxNKGhi(cu);
   ok('nhật ký tự xóa bản quá 1 tháng', gdxNKDs().length===1 && !gdxNKDs().some(x=>x.id==='cu'));
   gdxNKMo(); await w(100);
   ok('hộp 📜 Nhật ký in: dòng + 🖨 In lại + 📄 PDF + ×', /In lại/.test(document.getElementById('hop-in').textContent) && document.querySelectorAll('#hop-in .gdx-nk-nut button').length===3); dongHop();
   /* ---- 3.201: tổ trưởng rút TK 104 — Sao kê TK 104 theo ngày (dữ liệu GIẢ), ghép Mã CIF TT / mã KH tổ trưởng; bỏ danh mục tổ ---- */
   gdxDat('glLoai', '104', 1); await w(200);
   { const tk0 = gdxGLDuLieu().tk; gdxGLLamTrong(); await w(100); const trong = !gdxGLDuLieu().tk; pvChonTo('gdx', tA.ma); await w(300);
     ok('3.179: Làm trống rồi chọn lại đúng tổ cũ ở khối lọc → điền lại TK 104 theo số liệu', !tk0 || (trong && gdxGLDuLieu().tk===tk0), tk0); }
   g = gdxGLDuLieu();
   ok('3.201: bỏ hẳn danh mục tổ (không còn hàm / khối 📚)', typeof dmtTimTo==='undefined' && typeof gdxTC==='undefined' && typeof dmtKhoiHTML==='undefined');
   const khTT = hsoTTKH(tA).kh || ((TO_K.kh[tA.ma]||[])[0]||{}).kh || ''; tA.cif = khTT; TO_K.bangTo = null;   /* bộ GIẢ không có cột Mã CIF TT → gán tay như Mẫu 31 thật */
   const aoa4 = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC'],
     ['', '009999','900000','90000001', khTT, tA.ten, 'Gia', '1040000000', 150000, 100000, '104', '01/01/2024', '13/10/2026'],
     ['', '009999','900000','90000001', '9999999991', 'Người Giả Đã Thôi', 'Gia', '1049999991', 20000, 0, '104', '01/01/2020', '13/10/2026'],
     ['', '009999','900000','90000001', '9999999992', 'Người Giả Thứ Hai', 'Gia', '1049999992', 0, 0, '104', '01/01/2021', '13/10/2026']];
   gdxVe(); await w(200); g = gdxGLDuLieu();
   ok('3.201: chưa nạp Sao kê TK 104 → số TK để chấm + cảnh báo vàng ghi rõ lý do', g.ten===tA.ten && !g.tk && /chưa nạp (Danh sách tổ \/ )?Sao kê TK 104/.test(g.tkLy||'') && /Chưa có số tài khoản 104/.test(document.getElementById('gdx-tom').textContent), g.tkLy);
   const nap = async (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); const kq = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!kq.loi && kq.ky) await slGhi(kq); return kq; };
   const k4 = await nap(aoa4, 'Sao_ke_TK_104_13-10-2026.XLSX');
   ok('3.201: đọc Sao kê TK 104 (9. Sao kê TK theo mã sản phẩm) — loại tk104, kỳ theo cột Ngày BC', k4.loai==='tk104' && k4.ky==='2026-10-13' && k4.rows.length===3 && /3 tài khoản/.test(slTomTat(k4.loai, k4.tong)), k4.loi || k4.loai+' '+k4.ky);
   await tkNapMoi(TO_K); gdxVe(); await w(300);
   g = gdxGLDuLieu(); h = fd().body.innerHTML;
   ok('3.201: Giấy lĩnh TK 104 tổ trưởng lấy theo Sao kê TK 104 mới nhất (dù kỳ đang xem cũ hơn)', !!khTT && g.tk==='1040000000' && /Sao kê TK 104/.test(g.tkTu) && h.indexOf('1040000000')>=0, g.tk+' · '+g.tkTu);
   const cd = tkCanDong();
   ok('3.201: TK 104 cần đóng — chỉ 2 TK không phải tổ trưởng hiện tại', cd.k104 && cd.k104.ds.length===2 && cd.k104.ds.every(x=>/^99999999/.test(x.kh)), cd.k104 && cd.k104.ds.map(x=>x.kh).join(','));
   tkCanDongHop('tk104'); await w(100);
   ok('3.201: hộp TK 104 cần đóng + 📊 Xuất Excel', document.querySelectorAll('#hop-in .to-bang tbody tr').length===2 && /Xuất Excel/.test(document.getElementById('hop-in').textContent)); dongHop();
   gdxKBChung(); await w(100);
   ok('3.201: ⚙ Khai báo chung có khối 🏦 TK 104 / 105 (ngày Sao kê + nút TK cần đóng), không còn khối danh mục', /Sao kê TK 104: 13\/10\/2026|Sao kê TK 104: ngày 13\/10\/2026/.test(document.getElementById('hop-in').textContent) && /TK 105 cần đóng/.test(document.getElementById('hop-in').textContent) && !/Danh mục tổ/.test(document.getElementById('hop-in').textContent), document.getElementById('hop-in').textContent.slice(0, 300)); dongHop();
   /* ---- 3.202: bảng tổ dựng sẵn + TK 105 tra khi cần + TK trùng ---- */
   { const bt = tkBangTom(), r0 = tkBangTo()[tA.ma];
     ok('3.202: bảng tổ dựng sẵn — mỗi tổ có tổ trưởng (mã KH), TK 104 Sao kê, CCCD + nguồn; đếm đủ / thiếu', bt && bt.n>0 && bt.du+bt.thieu.length===bt.n && r0 && r0.kh===khTT && r0.tk==='1040000000' && /Sao kê TK 104/.test(r0.tkTu), bt && JSON.stringify({n:bt.n, du:bt.du, thieu:bt.thieu.length}));
     tkThieuHop(); await w(100); const hT = document.getElementById('hop-in').textContent; dongHop();
     ok('3.202: hộp "Tổ chưa đủ dữ liệu · bổ sung" mở được (bảng hoặc báo đủ)', /Bảng tổ — chưa đủ dữ liệu/.test(hT));
     const kh5 = ((TO_K.kh[tA.ma]||[]).find(o=>o.kh!==khTT)||{}).kh;
     const aoa5 = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC'],
       ['', '009999','900000','90000001', kh5, 'Khách Giả', 'Gia', '1050000001', 300000, 0, '105', '01/01/2020', '13/10/2026'],
       ['', '009999','900000','90000001', kh5, 'Khách Giả', 'Gia', '1050000002', 0, 0, '105', '01/06/2025', '13/10/2026']];
     const wb5 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb5, XLSX.utils.aoa_to_sheet(aoa5), 'BCQUERY'); const k5 = await slDocFile(new File([XLSX.write(wb5, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_13-10-2026.XLSX')); if(!k5.loi) await slGhi(k5);
     await tkNapMoi(TO_K); gdxDat('glLoai', '105', 1); pvChonTo('gdx', tA.ma); await w(300); gdxGLChonKH(kh5); await w(300);
     let g5 = gdxGLDuLieu(); const tom5 = gdxTom().canh.map(x=>x.chu).join(' | ');
     ok('3.202: TK 105 khách tra Sao kê khi chọn — 2 TK → lấy TK mở gần nhất, cảnh báo chọn TK đang dùng + ô chọn', !!kh5 && g5.tk==='1050000002' && g5.tkTrung && /có 2 TK 105/.test(tom5) && !!document.querySelector('.gdx-tk-chon'), g5.tk+' · '+tom5.slice(0, 80));
     tkChonDat('tk105', kh5, '1050000001'); await w(200); g5 = gdxGLDuLieu();
     ok('3.202: anh chọn TK đang dùng → nhớ, hết cảnh báo; danh sách ⚠ TK trùng có khách này', g5.tk==='1050000001' && !g5.tkTrung && tkTrungDs().some(o=>o.kh===kh5 && o.chon==='1050000001'));
     delete D.cauHinh.tkChon; gdxDat('glLoai', '104', 1); pvChonTo('gdx', tA.ma); await w(300); }
   /* CCCD / ngày cấp anh gõ tay → nhớ theo mã KH */
   ccNhoGhi('ncap', '01/02/2023');
   ok('3.201: ngày cấp gõ tay được nhớ theo mã KH tổ trưởng (cài đặt — Drive của anh)', D.cauHinh.ccNho && D.cauHinh.ccNho[khTT] && D.cauHinh.ccNho[khTT].ncap==='2023-02-01');
   delete D.cauHinh.ccNho;
   /* ---- 3.201: Mẫu 01/TV (dữ liệu GIẢ) → đối chiếu thành viên + cần cho ra khỏi tổ ---- */
   const tvA = (TO_K.kh[tA.ma]||[]).reduce((a, o)=>{ if(!a.some(x=>x.kh===o.kh)) a.push(o); return a; }, []);
   const aoa1 = [['Mẫu 01/TV'],['NGÂN HÀNG CHÍNH SÁCH XÃ HỘI'],['CHI NHÁNH GIẢ'],['PGD GIẢ'],['(Đến ngày 31 tháng 08 năm 2026)'],['Mã tổ: '+tA.ma],['Tên tổ trưởng: '+tA.ten],['Tên tổ phó: Tổ Phó Giả'],['Địa chỉ: Ấp Giả'],['Đơn vị tính: đồng'],
     ['STT','Họ và tên','Mã\nkhách hàng','','CMND/CCCD','Điện thoại di động','Dư nợ','','','','','Số dư tiền gửi'],['(1)','(2)','(3)','','(4)','(5)','(6)','','','','','(7)']]
     .concat(tvA.map((o, i)=>[i+1, o.ten, o.kh, '', '079000000'+String(i).padStart(3, '0'), '', 1000000, '', '', '', '', 50000]))
     .concat([[tvA.length+1, 'Thành Viên Giả Treo', '9999999993', '', '079000000999', '', 0, '', '', '', '', 0]]);
   const k1 = await nap(aoa1, '4820_MAU01_TV_31082026_0000.XLSX');
   ok('3.201: đọc Mẫu 01/TV — khối theo tổ, kỳ tháng theo dòng "Đến ngày"', k1.loai==='tv01' && k1.ky==='2026-08' && k1.rows.length===tvA.length+1 && k1.rows[0].to===tA.ma && k1.rows[0].cccd==='079000000000', k1.loi || k1.loai+' '+k1.ky+' '+k1.rows.length);
   SL_BO = {}; const B9 = await slBo('2026-08'), dc = tvDoiChieu(B9);
   ok('3.201: đối chiếu thành viên tổ ↔ 01/TV: thành viên treo (dư nợ 0, tiền gửi 0, Mẫu 31 không có) vào "Cần cho ra khỏi tổ"', dc && dc.ra.some(o=>o.kh==='9999999993' && /không còn món vay/.test(o.ly)) && dc.thieu.some(o=>o.kh==='9999999993') && dc.khop===tvA.length, dc && JSON.stringify({khop:dc.khop, ra:dc.ra.length, du:dc.du.length}));
   SL_BO = {}; TO_K.B = await slBo(TO_K.ky);
   ok('3.201: tab Tổ — chip "Cần cho ra khỏi tổ (TƯ)" của tổ có thành viên treo', (tvRaCuaTo(tA.ma)||[]).length===1 && /Thành Viên Giả Treo/.test(tvRaHTML(tA.ma)));
   /* ---- 3.202 (anh chốt 14/10): Danh sách tổ hệ thống (dữ liệu GIẢ) — nguồn thống nhất CCCD, TK 104 tổ trưởng; Sao kê TK 104 chỉ tham khảo ---- */
   { const aoaD = [['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'],[''],['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'],
       ['13/10/2026', 'D9', 'Điểm Giả', '90000001', 'Xã Giả', 'Ấp Giả', '03', 'Hội Giả', tA.ma, khTT, tA.ten, '079123456789', '01/02/2022', '0900000000', '01/01/1970', 10, 100000000, '1049999999', '9999999998', 'Phó Giả', '']];
     const kD = await nap(aoaD, 'baocao_20261014_175516.xlsx');
     ok('3.202: đọc Danh sách tổ hệ thống (baocao_…) — loại dsto, kỳ theo cột Ngày báo cáo', kD.loai==='dsto' && kD.ky==='2026-10-13' && kD.rows.length===1 && kD.rows[0].cccd==='079123456789' && kD.rows[0].tk104==='1049999999', kD.loi || kD.loai+' '+kD.ky);
     SL_BO = {}; TO_KS = {}; TO_K = await toNap(TO_K.ky); const rD = tkBangTo()[tA.ma];
     ok('3.202: kỳ cũ hơn vẫn dùng Danh sách tổ gần nhất; CCCD, ngày cấp, TK 104 tổ trưởng lấy từ Danh sách tổ', TO_K.B.nguon.dsto==='2026-10-13' && rD && rD.cccd==='079123456789' && rD.ncap==='2022-02-01' && rD.ccTu==='Danh sách tổ' && rD.tk==='1049999999' && rD.tkTu==='Danh sách tổ', rD && [rD.cccd, rD.ncap, rD.ccTu, rD.tk, rD.tkTu].join(' · '));
     const cdD = tkCanDong().k104;
     ok('3.202: TK 104 trong Sao kê khác TK trên Danh sách tổ → vào "TK 104 chưa đóng" (lý do: tổ trưởng đang dùng TK khác)', rD.tkThua.indexOf('1040000000')>=0 && cdD.ds.some(x=>x.stk==='1040000000' && /đang dùng TK khác/.test(x.ly)), cdD.ds.map(x=>x.stk+' '+x.ly).join(', '));
     ok('3.202: file bắt buộc "Danh sách tổ" của tháng tính bản gần nhất', !!slBBE('dsto', TO_K.ky) && slBBE('dsto', TO_K.ky).ganNhat==='2026-10-13'); }
   slDoiTab('gdx'); doiNgan(7); await w(500); gdxDoiMau('gl'); await w(200);
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
