// 3.323 (anh 23/10): Kiểm tra đột xuất — đơn vị kiểm tra (Mẫu 06 + 16, cả "ĐOÀN KIỂM TRA") chọn: theo Hội · chấm ghi tay · khai báo tên đoàn;
//   cán bộ kiểm tra: vai trò Hội · để trống · khai báo tên; số liệu ghi sẵn; Bảng II Mẫu 16: trống · chấm ghi tay · điền đầy đủ; lựa chọn đột xuất lưu riêng. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   const chu = h => String(h||'').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.ktIn; delete D.cauHinh.ktKBLuu;
   const K = ktCH(); K.ky='2026-08'; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99'), t = ds[0]; ktChonTo(t.ma); await w(500);
   const dc = ktDaChon(), hoiTen = ktHoiTenTD(t);
   ok('đang ở 🎯 Kiểm tra đột xuất → khóa lựa chọn riêng dx_m06 / dx_m16', ktInKhoa('m06')==='dx_m06' && ktInKhoa('m16')==='dx_m16' && ktInKhoa('m04')==='m04');
   /* mặc định: như cũ (Hội) */
   let v = ktInV('m16'), h = chu(ktHTML16(ktGiaTri16(t, dc, v)));
   ok('mặc định: Đoàn kiểm tra = Hội phụ trách tổ (như cũ)', h.indexOf(hoiTen)>=0, hoiTen);
   /* khai tên đoàn + cán bộ */
   const S = D.cauHinh.ktIn = {}; S.dx_m06 = {dvc:'go', dvt:'Đoàn kiểm tra NHCSXH Giả', ng1:'go', cb1t:'Nguyễn Kiểm Tra Giả', cv1t:'Cán bộ tín dụng'};
   S.dx_m16 = {dvc:'go', dvt:'Đoàn kiểm tra NHCSXH Giả', ng1:'go', cb1t:'Nguyễn Kiểm Tra Giả', cv1t:'Cán bộ tín dụng', ng2:'go', cb2t:'Trần Đoàn Viên Giả', cv2t:'Kế toán', b2:'cham', nx:''};
   v = ktInV('m06'); let g6 = ktGiaTri06(t, dc, v), h6 = chu(ktHTML06(g6));
   ok('Mẫu 06: Đơn vị kiểm tra = tên đoàn khai báo; cán bộ = tên + chức vụ khai báo', /Đơn vị kiểm tra: Đoàn kiểm tra NHCSXH Giả/.test(h6) && /Nguyễn Kiểm Tra Giả/.test(h6) && /Cán bộ tín dụng/.test(h6), h6.slice(0, 200));
   ok('Mẫu 06: số liệu hồ sơ vẫn ghi sẵn (họ tên, mã khoản vay)', dc.length ? h6.indexOf(tenHoaDau(dc[0].ten))>=0 : true);
   v = ktInV('m16'); let g16 = ktGiaTri16(t, dc, v), h16 = chu(ktHTML16(g16));
   ok('Mẫu 16: ĐOÀN KIỂM TRA + đầu trang = tên đoàn khai báo; 2 cán bộ khai báo', /ĐOÀN KIỂM TRA: Đoàn kiểm tra NHCSXH Giả/.test(h16) && /ĐOÀN KIỂM TRA NHCSXH GIẢ/.test(h16) && /Nguyễn Kiểm Tra Giả/.test(h16) && /Trần Đoàn Viên Giả/.test(h16) && /Kế toán/.test(h16));
   ok('Mẫu 16: Bảng II "chấm ghi tay" — ô kết quả là dòng chấm, không chữ điền sẵn', g16.b2.length===14 && g16.b2.every(x=>/^\.{20,}$/.test(x)) && !/Theo cụm dân cư liền kề/.test(h16) && /^\.{20,}$/.test(g16.nx.kq1));
   ok('Mẫu 16: số liệu tổ vẫn ghi sẵn (dư nợ, số tổ viên)', !!g16.f.DN && !!g16.f.STV);
   /* chấm ghi tay */
   S.dx_m16 = {dvc:'cham', ng1:'', ng2:''}; v = ktInV('m16'); h16 = chu(ktHTML16(ktGiaTri16(t, dc, v)));
   ok('Đơn vị "Để chấm": Mẫu 16 không in tên Hội ở đầu trang / Đoàn kiểm tra (chỉ còn ở Đơn vị được kiểm tra), đầu trang "ĐƠN VỊ KIỂM TRA" + dòng chấm', h16.split(hoiTen).length===2 && /ĐƯỢC KIỂM TRA: Tổ thuộc /.test(h16) && /ĐƠN VỊ KIỂM TRA/.test(h16) && /ĐOÀN KIỂM TRA: \.{10,}/.test(h16));
   S.dx_m06 = {dvc:'cham', ng1:''}; h6 = chu(ktHTML06(ktGiaTri06(t, dc, ktInV('m06'))));
   ok('Đơn vị "Để chấm": Mẫu 06 dòng chấm', /Đơn vị kiểm tra: ?\.{10,}/.test(h6) && h6.indexOf(hoiTen)<0);
   /* lưu riêng: chế độ khác không bị ảnh hưởng */
   K.che = 'gn'; ok('chế độ khác (sau giải ngân) dùng lựa chọn chung — vẫn theo Hội', ktInKhoa('m16')==='m16' && chu(ktHTML16(ktGiaTri16(t, dc, ktInV('m16')))).indexOf(hoiTen)>=0); K.che = 'dx';
   /* hộp chọn khi in: ô chọn + ô khai tên */
   S.dx_m16 = {dvc:'go', dvt:'Đoàn Giả', ng1:'go'}; ktInHop(['m16'], '', ktHoiCuaTo([t])); await w(100);
   const hop = document.getElementById('hop-in');
   ok('hộp Chọn khi in: nhãn "lựa chọn riêng kiểm tra đột xuất", ô Đơn vị / Đoàn, ô khai tên đoàn + họ tên cán bộ, Bảng II có "Chấm ghi tay"', /lựa chọn riêng kiểm tra đột xuất/.test(hop.textContent) && !!document.getElementById('ki-m16-dvc') && !!document.getElementById('ki-m16-dvt') && !!document.getElementById('ki-m16-cb1t') && /Chấm ghi tay \(theo mẫu\)/.test(hop.innerHTML));
   document.getElementById('ki-m16-dvt').value = 'Đoàn Giả Sửa'; ktInDoc(); await w(50);
   ok('sửa ô khai tên → lưu vào dx_m16', D.cauHinh.ktIn.dx_m16.dvt==='Đoàn Giả Sửa');
   dongHop(); return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
