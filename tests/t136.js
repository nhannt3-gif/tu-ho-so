// 3.140.4 — Lỗi mất cài đặt 09/10: máy bị trống cài đặt → đồng bộ với file cauhinh.json ở thư mục khác ("undefined") rồi quay về thư mục thật
//   → bản cũ (3.113–3.140.3) không lấy file thật về mà ghi đè bản trống. Nay: nhớ đúng file (chFileId) → khác file thì luôn lấy về gộp trước;
//   không bao giờ tạo thư mục "undefined" / "null". Dữ liệu GIẢ dựng trong phép thử, Drive giả (fakedrive.js).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const mo = async()=>{ const ctx = await b.newContext({viewport:{width:1366,height:800}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; });
   return p; };
 const thuMuc = ten => Object.values(drive.F).filter(x=>x.folder && x.name===ten && !x.trashed);
 const fileTrong = tenCha => { const cha = Object.values(drive.F).filter(x=>x.folder && x.name===tenCha).map(x=>x.id);
   const ht = Object.values(drive.F).filter(x=>x.folder && x.name==='_Hệ thống' && cha.indexOf(x.parents[0])>=0).map(x=>x.id);
   const f = Object.values(drive.F).find(x=>x.name==='cauhinh.json' && !x.trashed && ht.indexOf(x.parents[0])>=0); return f ? JSON.parse(f.body.toString('utf8')) : null; };
 // 1. máy A: khai báo Hội đầy đủ, đẩy lên Tủ hồ sơ
 const A = await mo();
 await A.evaluate(async()=>{ D.cauHinh.ktHoiKB = {'X1|11':{ct:'Nguyễn Văn Giả', pct:'Trần Thị Giả', hd:'01/HĐUT'}}; D.cauHinh.ktPnkt = {'01':'Trồng lúa giả'}; luu(); await dongBoCauHinh('tu'); });
 ok('A đẩy khai báo lên Tủ hồ sơ/_Hệ thống', (fileTrong('Tủ hồ sơ')||{}).ktHoiKB && fileTrong('Tủ hồ sơ').ktHoiKB['X1|11'].ct==='Nguyễn Văn Giả');
 // 2. máy B: đã từng đồng bộ (có chBam, chKeoLuc), rồi bị trống cài đặt, chạy 1 lần với thư mục khác ("Khác giả") → tạo file ở đó
 const B = await mo();
 await B.evaluate(async()=>{ await dongBoCauHinh('tu'); });   /* B lấy bản của A */
 const b2 = await B.evaluate(async()=>{ D.cauHinh.ktHoiKB = {'X1|11':{ccKH:'10566'}}; delete D.cauHinh.ktPnkt; D.cauHinh.thumuc = 'Khác giả'; DR.thuMuc = {}; luu();
   const r = await dongBoCauHinh('tu'); return r; });
 // 3. B quay về Tủ hồ sơ, sửa thêm 1 ô (giống anh làm Kế hoạch sáng 09/10) → đồng bộ tự động
 const b3 = await B.evaluate(async()=>{ D.cauHinh.thumuc = 'Tủ hồ sơ'; DR.thuMuc = {}; ktHoiKBSua('X1|11', 'mauKH', '2'); const r = await dongBoCauHinh('tu'); return {r, kb:D.cauHinh.ktHoiKB, pn:D.cauHinh.ktPnkt, id:D.cauHinh.chFileId}; });
 const j = fileTrong('Tủ hồ sơ');
 ok('quay về thư mục thật: KHÔNG ghi đè — lấy file thật về gộp (giữ tên CT / Phó CT / số HĐ của A)', b3.kb['X1|11'].ct==='Nguyễn Văn Giả' && b3.kb['X1|11'].hd==='01/HĐUT' && b3.kb['X1|11'].mauKH==='2', JSON.stringify(b3.kb));
 ok('file Drive thật vẫn đủ khai báo + phần B vừa sửa; bảng ngành A không mất', j.ktHoiKB['X1|11'].ct==='Nguyễn Văn Giả' && j.ktHoiKB['X1|11'].mauKH==='2' && j.ktPnkt && j.ktPnkt['01']==='Trồng lúa giả', JSON.stringify(j.ktHoiKB));
 ok('máy nhớ đúng file đã đồng bộ (chFileId, riêng máy — không lên Drive)', !!b3.id && j.chFileId===undefined);
 // 4. thư mục "undefined": thumuc trống → không tạo thư mục "undefined", dùng Tủ hồ sơ
 const n0 = thuMuc('Tủ hồ sơ').length;
 const c = await B.evaluate(async()=>{ delete D.cauHinh.thumuc; DR.thuMuc = {}; const r = await dongBoCauHinh('tu'); return {r, tm:D.cauHinh.thumuc}; });
 ok('tên thư mục trống → không tạo "undefined" / "null", dùng "Tủ hồ sơ" (không tạo thêm)', !thuMuc('undefined').length && !thuMuc('null').length && c.tm==='Tủ hồ sơ' && thuMuc('Tủ hồ sơ').length===n0, JSON.stringify(c));
 // 5. hồi quy: cùng file, không đổi → không tải lại, không đẩy
 const d = await A.evaluate(async()=>{ await dongBoCauHinh('tu'); return await dongBoCauHinh('tu'); });
 ok('cùng file, không đổi → không đẩy lại', !d.day && !d.doi, JSON.stringify(d));
 o.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log((o.length-sai+loi.length)+'/'+o.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
