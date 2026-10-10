// 3.144 — Sắp lại tab (anh chốt Q5, Q12, Q13, Q15):
//   · thanh tab: "📥 Nạp & KT" thay chỗ tab Tháng (tab 7, slTab 'nap'), "Số liệu" mở tab con báo cáo; tô đúng nút
//   · tab con Số liệu không còn Nạp; KTGS: phần nạp BC0437 / BC0438 chuyển sang tab Nạp, KTGS chỉ còn nút sang
//   · cột 🧰 Công cụ: ẩn Giao ban, Buổi GD (mã giữ); mở bằng lệnh cũ → báo đã bỏ
//   · bỏ dữ liệu tab Tháng: chưa nối Drive xóa mục không có file Drive; nối Drive → file + thư mục "Dữ liệu tháng" vào thùng rác Drive,
//     dấu daXoaHan, cờ boThang; văn bản không bị đụng. Dữ liệu GIẢ, Drive giả (fakedrive.js).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[];
 /* Drive giả: Tủ hồ sơ / Dữ liệu tháng / (1 file có trong chỉ mục + 1 file lẻ) */
 drive.F.g = {id:'g', name:'Tủ hồ sơ', parents:['root'], folder:true};
 drive.F.dlt = {id:'dlt', name:'Dữ liệu tháng', parents:['g'], folder:true};
 drive.F.x1 = {id:'x1', name:'2026-08_NQH_Xa.xlsx', parents:['dlt'], body:Buffer.from('a')};
 drive.F.x2 = {id:'x2', name:'file le.pdf', parents:['dlt'], body:Buffer.from('b')};
 drive.F.vb = {id:'vb', name:'van ban.pdf', parents:['g'], body:Buffer.from('c')};
 const ctx = await b.newContext({viewport:{width:1366,height:850}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
 const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(3600);   /* qua lượt boThangDon tự chạy lúc mở app */
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const nut = Array.from(document.querySelectorAll('#hangngan button')).map(x=>x.textContent.trim());
   ok('thanh tab: không còn "Tháng"; "📥 Nạp & KT" đứng ở chỗ cũ (sau Văn bản), rồi "Số liệu"', nut.indexOf('Tháng')<0 && nut[2]==='📥 Nạp & KT' && nut[3]==='Số liệu', nut.join(' | '));
   moNapSL(); await w(400);
   const chon = () => Array.from(document.querySelectorAll('#hangngan button.chon')).map(x=>x.textContent.trim()).join();
   ok('bấm Nạp & KT → tab 7, tab con nap, tô nút Nạp & KT', nganHienTai===7 && D.cauHinh.slTab==='nap' && chon()==='📥 Nạp & KT', chon());
   const tr7 = document.getElementById('tr7');
   ok('tab Nạp có tiêu đề riêng, không có thanh tab con báo cáo', !!tr7.querySelector('.sl-con-nap') && !tr7.querySelector('.sl-con button'));
   ok('tab Nạp có khối file KTGS (BC0437 / BC0438) + nút nạp', !!tr7.querySelector('.sl-ktgs-nap .kt-nap') && /BC0437/.test(tr7.querySelector('.sl-ktgs-nap').textContent));
   moBCSL(); await w(400);
   ok('bấm Số liệu → tab con báo cáo (mặc định Tổng hợp), tô nút Số liệu', D.cauHinh.slTab==='th' && chon()==='Số liệu', D.cauHinh.slTab+' · '+chon());
   const con = Array.from(tr7.querySelectorAll('.sl-con button')).map(x=>x.textContent);
   ok('thanh tab con Số liệu không còn "Nạp & Kiểm tra"', con.length===5 && !con.some(x=>/Nạp/.test(x)), con.join(' | '));
   slDoiTab('sk'); await w(200); moNapSL(); await w(200); moBCSL(); await w(300);
   ok('Số liệu nhớ tab con báo cáo gần nhất (Sao kê)', D.cauHinh.slTab==='sk');
   slDoiTab('kt'); await w(600);
   ok('KTGS: không còn khối nạp BC0437 / BC0438, có nút sang tab Nạp & KT', !tr7.querySelector('.kt-nap') && !!tr7.querySelector('.kt-nap-chuyen button'), tr7.textContent.slice(0, 120));
   doiNgan(2); await w(300);
   ok('lối cũ doiNgan(2) (Có gì mới, lời nhắc cũ) → tab Nạp & KT', nganHienTai===7 && D.cauHinh.slTab==='nap' && chon()==='📥 Nạp & KT');
   /* Công cụ */
   doiNgan(0); await w(300);
   const cc = Array.from(document.querySelectorAll('.cc-cot .cc-nut')).map(x=>x.textContent);
   ok('cột Công cụ: không còn Giao ban, Buổi GD; còn HSSV, Địa bàn, CT vay', !cc.some(x=>/Giao ban|Buổi GD/.test(x)) && cc.some(x=>/HSSV/.test(x)) && cc.some(x=>/Địa bàn/.test(x)), cc.join(' | '));
   let baoMsg = ''; const bao0 = bao; bao = t=>{ baoMsg = t; }; ccMo('giaoban'); bao = bao0;
   ok('mở Giao ban bằng lệnh cũ → báo đã bỏ, không mở', /đã bỏ/.test(baoMsg) && CC.mo==='' && !document.querySelector('.cc-hop[data-cc="giaoban"]'), baoMsg);
   ok('Hôm nay không còn lời nhắc "thiếu báo cáo" của tab Tháng', !/thiếu \d+ BC|thiếu báo cáo/.test(document.getElementById('tr0').textContent));
   /* bỏ dữ liệu tab Tháng */
   window.coTheNoiDrive=()=>true; D.cauHinh.thumuc='Tủ hồ sơ'; DR.thuMuc = {}; delete D.cauHinh.boThang;
   const now = new Date().toISOString();
   D.duLieu = [{id:'dl1', nhom:'duLieu', ky:'2026-08', maLoai:'NQH', tenMoi:'2026-08_NQH_Xa.xlsx', driveId:'x1'}, {id:'dl2', nhom:'duLieu', ky:'2026-08', maLoai:'NK', tenMoi:'nk.xlsx'}];
   D.cho = [{id:'c1', nhom:'duLieu', tenMoi:'cho.xlsx'}, {id:'c2', nhom:'vanBan', tenMoi:'vb cho.pdf'}];
   D.rac = [{id:'r1', nhom:'duLieu', khoCu:'duLieu', tenMoi:'rac.xlsx', xoaLuc:now}, {id:'r2', nhom:'vanBan', khoCu:'vanBan', tenMoi:'rac vb.pdf', xoaLuc:now}];
   D.vanBan = [{id:'v1', nhom:'vanBan', tenMoi:'van ban.pdf', driveId:'vb'}]; D.daXoaHan = []; luu();
   DR.sanSang = false; DR.online = false;
   await boThangDon();
   ok('chưa nối Drive: xóa mục không có file Drive (dl2, khay chờ c1, thùng rác r1), giữ dl1 chờ Drive, chưa đặt cờ', D.duLieu.map(x=>x.id).join()==='dl1' && D.cho.map(x=>x.id).join()==='c2' && D.rac.map(x=>x.id).join()==='r2' && !D.cauHinh.boThang,
     JSON.stringify({dl:D.duLieu.map(x=>x.id), cho:D.cho.map(x=>x.id), rac:D.rac.map(x=>x.id), co:D.cauHinh.boThang}));
   DR.sanSang = true; DR.online = true; DR.token = 'x'; DR.hetHan = Date.now()+36e5;
   const n = await boThangDon();
   ok('nối Drive: xóa dl1, đặt cờ boThang = xong', n===1 && !D.duLieu.length && D.cauHinh.boThang==='xong', JSON.stringify({n, co:D.cauHinh.boThang}));
   ok('dấu xóa hẳn daXoaHan cho mọi mục đã bỏ (máy khác bỏ theo)', ['dl1','dl2','c1','r1'].every(id=>D.daXoaHan.some(t=>t.id===id)) && D.daXoaHan.find(t=>t.id==='dl1').driveId==='x1');
   ok('văn bản, khay chờ / thùng rác văn bản không bị đụng', D.vanBan.length===1 && D.cho.length===1 && D.rac.length===1);
   ok('chạy lại: không làm gì nữa', (await boThangDon())===0);
   return o;
 });
 const tt = id => !!(drive.F[id] && drive.F[id].trashed);
 R.push((tt('x1') ? '✓ ' : '✗ ')+'file Dữ liệu tháng có trong chỉ mục → thùng rác Drive');
 R.push((tt('dlt') ? '✓ ' : '✗ ')+'thư mục "Dữ liệu tháng" (cả file lẻ bên trong) → thùng rác Drive');
 R.push((!tt('vb') && !tt('g') ? '✓ ' : '✗ ')+'thư mục gốc và văn bản trên Drive giữ nguyên');
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
