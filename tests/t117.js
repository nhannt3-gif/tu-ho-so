// 3.113 — Đồng bộ TOÀN BỘ cài đặt qua Drive (cauhinh.json): 2 máy giả (A, B) dùng chung Drive giả.
//   khóa riêng máy không lên Drive · máy mới lấy về · 2 máy cùng sửa 1 bảng → gộp, không mất · máy chưa sửa thì theo Drive (cả xóa) · lưu là tự hẹn đẩy.
// Dữ liệu GIẢ dựng trong phép thử.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const mo = async()=>{ const ctx = await b.newContext({viewport:{width:1366,height:800}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; });
   return p; };
 const fileCH = () => { const f = Object.values(drive.F).find(x=>x.name==='cauhinh.json' && !x.trashed); return f ? JSON.parse(f.body.toString('utf8')) : null; };
 const A = await mo(), B = await mo();
 // 1. máy A khai báo Hội + khóa riêng → đẩy
 const a1 = await A.evaluate(async()=>{ D.cauHinh.ktHoiKB = {'X1|11':{ct:'Nguyễn Văn Giả', ten:'Hội Nông dân xã Giả'}}; D.cauHinh.rongPV = 555; D.cauHinh.ktgs = {xa:'X1'}; luu(); return await dongBoCauHinh('tu'); });
 let j = fileCH();
 ok('A đẩy lên: có bảng khai báo Hội, không có khóa riêng máy (độ rộng, đang chọn, dấu băm)', a1.day && j && j.ktHoiKB && j.ktHoiKB['X1|11'].ct==='Nguyễn Văn Giả' && j.rongPV===undefined && j.ktgs===undefined && j.chBam===undefined, JSON.stringify(a1));
 // 2. máy B mới mở → lấy về, giữ khóa riêng của B
 const b1 = await B.evaluate(async()=>{ D.cauHinh.rongPV = 333; luu(); const r = await dongBoCauHinh('tu'); return {r, kb:D.cauHinh.ktHoiKB, rong:D.cauHinh.rongPV, ten:D.cauHinh.donvi}; });
 ok('B lấy về bảng khai báo của A, độ rộng của B giữ nguyên', b1.kb && b1.kb['X1|11'] && b1.kb['X1|11'].ct==='Nguyễn Văn Giả' && b1.rong===333, JSON.stringify(b1.r));
 // 3. B sửa (thêm Phó CT, thêm Hội khác) và đẩy; A cùng lúc sửa số HĐ chưa lấy bản B
 await B.evaluate(async()=>{ ktHoiKBSua('X1|11', 'pct', 'Trần Thị Giả'); ktHoiKBSua('X2|12', 'ct', 'Lê Văn Giả'); await dongBoCauHinh('tu'); });
 const a3 = await A.evaluate(async()=>{ ktHoiKBSua('X1|11', 'hd', '01/HĐUT'); const r = await dongBoCauHinh('tu'); return {r, kb:D.cauHinh.ktHoiKB}; });
 ok('A sửa cùng lúc → gộp đủ: tên CT (A), Phó CT (B), số HĐ (A), Hội thứ 2 (B)', a3.kb['X1|11'].ct==='Nguyễn Văn Giả' && a3.kb['X1|11'].pct==='Trần Thị Giả' && a3.kb['X1|11'].hd==='01/HĐUT' && a3.kb['X2|12'] && a3.kb['X2|12'].ct==='Lê Văn Giả', JSON.stringify(a3.kb));
 j = fileCH(); ok('Drive sau gộp có đủ cả hai phần', j.ktHoiKB['X1|11'].hd==='01/HĐUT' && j.ktHoiKB['X1|11'].pct==='Trần Thị Giả' && !!j.ktHoiKB['X2|12']);
 const b4 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return D.cauHinh.ktHoiKB; });
 ok('B (không sửa thêm) lấy bản gộp', b4['X1|11'].hd==='01/HĐUT' && b4['X1|11'].pct==='Trần Thị Giả');
 // 4. A xóa 1 Hội → B chưa sửa thì xóa theo
 await A.evaluate(async()=>{ ktHoiKBSua('X2|12', 'ct', ''); await dongBoCauHinh('tu'); });
 const b5 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return D.cauHinh.ktHoiKB; });
 ok('xóa ở A → B (chưa sửa khóa này) xóa theo', !b5['X2|12'] && !!b5['X1|11'], JSON.stringify(b5));
 // 5. Drive không đổi → không tải lại, không đẩy
 const n0 = (Object.values(drive.F).find(x=>x.name==='cauhinh.json').nhanNoiDung||0);
 const b6 = await B.evaluate(async()=>await dongBoCauHinh('tu'));
 ok('không có gì đổi → không đẩy lại', !b6.day && !b6.doi && (Object.values(drive.F).find(x=>x.name==='cauhinh.json').nhanNoiDung||0)===n0, JSON.stringify(b6));
 // 6. lưu là tự hẹn đẩy (khóa đồng bộ), khóa riêng không hẹn
 const b7 = await B.evaluate(async()=>{ clearTimeout(H_DAY_CH); H_DAY_CH = null; D.cauHinh.rongPV = 444; luu(); const riêng = !!H_DAY_CH; D.cauHinh.ktPnkt = {'01':'Trồng lúa giả'}; luu(); const dongBo = !!H_DAY_CH; await new Promise(r=>setTimeout(r, 4600)); await (CH_DANG||Promise.resolve()); return {riêng, dongBo}; });
 j = fileCH(); ok('đổi độ rộng (riêng máy) không hẹn đẩy; đổi bảng ngành → 4 giây sau tự lên Drive', !b7.riêng && b7.dongBo && j.ktPnkt && j.ktPnkt['01']==='Trồng lúa giả', JSON.stringify(b7));
 // 7. "Lấy từ Drive" bằng tay: Drive ưu tiên
 const b8 = await A.evaluate(async()=>{ D.cauHinh.ktPnkt = {'01':'Sửa riêng A'}; D.cauHinh.chBam = {}; const ok2 = await keoCauHinh(true); return {ok2, pn:D.cauHinh.ktPnkt}; });
 ok('Lấy từ Drive (bấm tay): theo Drive', b8.ok2 && b8.pn['01']==='Trồng lúa giả', JSON.stringify(b8));
 // 8. file Drive kiểu cũ (chỉ ~30 mục) + máy lần đầu → giữ phần máy có
 const C = await mo();
 const c1 = await C.evaluate(async()=>{ D.cauHinh.ktChuan = {'11':{gon:'HND giả'}}; delete D.cauHinh.chBam; luu(); await dongBoCauHinh('tu'); return {chuan:D.cauHinh.ktChuan, kb:D.cauHinh.ktHoiKB}; });
 ok('máy thứ 3 lần đầu: lấy bảng khai báo, giữ bảng chuẩn hóa riêng của máy rồi đẩy lên', c1.kb && c1.kb['X1|11'] && c1.chuan['11'].gon==='HND giả' && fileCH().ktChuan && fileCH().ktChuan['11'].gon==='HND giả');
 o.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log((o.length-sai+loi.length)+'/'+o.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
