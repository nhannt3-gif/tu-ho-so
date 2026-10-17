// 3.225 (anh chốt 17/10) — ĐỒNG BỘ DRIVE THEO KHỐI: _Hệ thống/khoi/<khối>__<lô>.json; 3 máy giả lập + Drive giả (máy C = bản cũ, chỉ chimuc.json / cauhinh.json):
//   chỉ gửi file khối đổi, kéo chỉ file đổi, gộp theo mục / theo khóa, dấu xóa không làm mục sống lại, máy cũ ↔ máy mới qua chimuc.json, chặn ghi trống,
//   chimuc.json tối đa 1 lần / giờ, "máy cũ đã cập nhật hết" thôi ghi chimuc.json. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], R=[];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const mo = async(cu)=>{ const ctx = await b.newContext({viewport:{width:1366,height:800}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   if(cu) await ctx.addInitScript(()=>{ localStorage.setItem('tuhoso_dbk', 'tat'); });
   const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ';
     window.__ghi = []; const g = window.ghiJSONLenDrive; window.ghiJSONLenDrive = function(ten){ __ghi.push(ten); return g.apply(this, arguments); }; });
   return p; };
 const khoi = () => Object.values(drive.F).filter(f=>!f.folder && !f.trashed && /__/.test(f.name)).map(f=>f.name).sort();
 const A = await mo(), B = await mo(), C = await mo(true);
 // 1. A: văn bản 2025 + 2026, ghi chú, khai báo Hội → đẩy
 await A.evaluate(async()=>{ const t = new Date().toISOString();
   D.vanBan.push({id:'vA1', nhom:'vanBan', soHieu:'1/CV-GIA', ngay:'2025-03-01', tenMoi:'a1.pdf', suaLuc:t}, {id:'vA2', nhom:'vanBan', soHieu:'2/CV-GIA', ngay:'2026-09-01', tenMoi:'a2.pdf', suaLuc:t});
   D.ghiChu.push({id:'gA', nhom:'ghiChu', tieuDe:'Ghi chú giả A', suaLuc:t}); D.cauHinh.ktHoiKB = {'X1|11':{ct:'Nguyễn Văn Giả'}}; luuNgay(); await kdDay(); });
 const f1 = khoi();
 ok('A đẩy theo khối: văn bản chia lô theo năm, ghi chú khối lịch, khai báo Hội khối KTGS', ['vanban__2025.json', 'vanban__2026.json', 'lich__ds.json', 'ktgs__caidat.json', 'chung__caidat.json'].every(n=>f1.indexOf(n)>=0), f1.join(' '));
 // 2. B kéo về
 const b2 = await B.evaluate(async()=>{ await kdKeoVe(); return {vb:D.vanBan.map(x=>x.id).sort().join(), gc:D.ghiChu.some(x=>x.id==='gA'), hoi:((D.cauHinh.ktHoiKB||{})['X1|11']||{}).ct}; });
 ok('B kéo về đủ văn bản, ghi chú, khai báo Hội', b2.vb==='vA1,vA2' && b2.gc && b2.hoi==='Nguyễn Văn Giả', JSON.stringify(b2));
 // 3. B sửa 1 ghi chú → chỉ gửi file khối lịch
 const b3 = await B.evaluate(async()=>{ await kdDay(); __ghi = []; const g = D.ghiChu.find(x=>x.id==='gA'); g.tieuDe = 'Ghi chú giả A (B sửa)'; g.suaLuc = new Date(Date.now()+1000).toISOString(); luuNgay(); await kdDay(); return __ghi; });
 ok('B sửa 1 ghi chú → chỉ ghi đúng 1 file lich__ds (không gửi văn bản, cài đặt)', b3.length===1 && b3[0]==='lich__ds.json', JSON.stringify(b3));
 // 4. A kéo: chỉ tải file đổi
 const a4 = await A.evaluate(async()=>{ let tai = 0; const g = window.kdTai; window.kdTai = function(f){ tai++; return g.apply(this, arguments); }; await kdKeoVe(); window.kdTai = g; return {tai, gc:D.ghiChu.find(x=>x.id==='gA').tieuDe}; });
 ok('A kéo về chỉ tải 1 file đổi, nhận bản B sửa', a4.tai===1 && /B sửa/.test(a4.gc), JSON.stringify(a4));
 // 5. Máy cũ C (chỉ chimuc.json): A đẩy chimuc.json (bản chuyển tiếp), C kéo; C thêm scan → A đọc chimuc.json → đẩy vào khối scan
 await A.evaluate(async()=>{ D.cauHinh.chiMucThoi = ''; await dayChiMucLenDrive(); });
 const c5 = await C.evaluate(async()=>{ await taiChiMucTuDrive(true); const t = new Date().toISOString(); D.scan.push({id:'sC', che:'the', ten:'Khach gia C', ngay:'2026-10-05', matTruoc:true, suaLuc:t, taoLuc:t}); luuNgay(); D.cauHinh.chiMucDriveTG = ''; await dayChiMucLenDrive(); return D.vanBan.length; });
 ok('máy cũ C đọc được văn bản qua chimuc.json (A vẫn ghi cho máy cũ)', c5===2, c5);
 const a5 = await A.evaluate(async()=>{ D.cauHinh.chiMucDriveTG = ''; await taiChiMucTuDrive(true); await kdDay(); return D.scan.some(x=>x.id==='sC'); });
 ok('A nhận scan của máy cũ C, đẩy vào khối scan theo tháng', a5 && khoi().indexOf('scan__2026-10.json')>=0, khoi().join(' '));
 const b5 = await B.evaluate(async()=>{ await kdKeoVe(); return D.scan.some(x=>x.id==='sC'); });
 ok('B nhận scan của C qua khối scan', b5);
 // 6. xóa hẳn ở B → A bỏ, không sống lại
 const a6 = await B.evaluate(async()=>{ D.vanBan = D.vanBan.filter(x=>x.id!=='vA1'); D.daXoaHan = (D.daXoaHan||[]).concat([{id:'vA1', luc:new Date().toISOString()}]); luuNgay(); await kdDay(); return 1; })
   .then(()=>A.evaluate(async()=>{ await kdKeoVe(); const co = D.vanBan.some(x=>x.id==='vA1'); await kdDay(); await kdKeoVe(); return {co, sau:D.vanBan.some(x=>x.id==='vA1')}; }));
 ok('xóa hẳn ở B → A bỏ theo, đẩy / kéo lại không sống lại', !a6.co && !a6.sau, JSON.stringify(a6));
 // 7. chặn ghi trống: A mất hết danh sách → không ghi đè khối trên Drive
 const a7 = await A.evaluate(async()=>{ let bl = ''; const g = window.baoLoi; window.baoLoi = t => { bl = t; }; __ghi = []; D.vanBan = []; D.ghiChu = []; D.scan = []; luuNgay(); await kdDay(); window.baoLoi = g; return {ghi:__ghi.filter(n=>/vanban|lich__ds|scan/.test(n)), bl}; });
 ok('máy trống → không ghi đè khối văn bản / ghi chú / scan trên Drive, có báo', !a7.ghi.length && /trống/.test(a7.bl), JSON.stringify(a7));
 // 8. chimuc.json tối đa 1 lần / giờ; bật "máy cũ đã cập nhật hết" → thôi ghi
 const b8 = await B.evaluate(async()=>{ let n = 0; const g = window.KD_HEN_CM_CU; window.KD_HEN_CM_CU = () => { n++; }; D.cauHinh.chiMucThoi = new Date().toISOString(); henDongBoChiMuc(); const trongGio = n;
   D.cauHinh.chiMucThoi = new Date(Date.now()-2*36e5).toISOString(); henDongBoChiMuc(); const quaGio = n - trongGio; D.cauHinh.kdBoCu = true; henDongBoChiMuc(); const boCu = n - trongGio - quaGio; window.KD_HEN_CM_CU = g; delete D.cauHinh.kdBoCu; return {trongGio, quaGio, boCu}; });
 ok('chimuc.json: trong 1 giờ không ghi lại, quá 1 giờ ghi; bật "máy cũ đã cập nhật hết" thì thôi', b8.trongGio===0 && b8.quaGio===1 && b8.boCu===0, JSON.stringify(b8));
 // 9. mốc riêng máy (kdBam, kdKeo) không lên Drive
 const cd = Object.values(drive.F).filter(f=>/caidat\.json$|cauhinh\.json$/.test(f.name)).map(f=>f.body.toString('utf8')).join('');
 ok('mốc đồng bộ riêng máy (kdBam / kdKeo / chBam) không lên Drive', !/"kdBam"|"kdKeo"|"chBam"/.test(cd));
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
