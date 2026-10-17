// 3.226 — CÀI ĐẶT THEO KHỐI: _Hệ thống/caidat/<khối>.json (chia chính cơ chế cauhinh.json, luật gộp theo khóa giữ nguyên);
//   3 máy giả lập + Drive giả (máy C = bản cũ, chỉ cauhinh.json): chỉ ghi file khối có khóa đổi; máy mới ↔ máy cũ qua cauhinh.json (mốc chCuBam riêng,
//   không làm lẫn mốc chBam); xóa mục trong khóa lan sang máy khác; mốc riêng máy không lên Drive; "Máy cũ đã cập nhật hết" thôi ghi cauhinh.json. Dữ liệu GIẢ.
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
 const fileJ = n => { const f = Object.values(drive.F).find(x=>!x.folder && !x.trashed && x.name===n); return f ? JSON.parse(f.body.toString('utf8')) : null; };
 const A = await mo(), B = await mo(), C = await mo(true);
 // 1. A: khai báo Hội + tên đơn vị → đồng bộ
 const a1 = await A.evaluate(async()=>{ D.cauHinh.ktHoiKB = {'X1|11':{ct:'Nguyễn Văn Giả'}, 'X2|12':{ct:'Trần Thị Giả'}}; D.cauHinh.donvi = 'PGD GIẢ'; luu(); __ghi = []; const r = await dongBoCauHinh('tu'); return {r, ghi:__ghi}; });
 const kt = fileJ('ktgs.json'), ch = fileJ('chung.json'), cu = fileJ('cauhinh.json');
 ok('A: cài đặt chia file theo khối (ktgs.json có khai báo Hội, chung.json có tên đơn vị) + vẫn ghi cauhinh.json cho máy cũ', kt && kt.ktHoiKB && kt.ktHoiKB['X1|11'].ct==='Nguyễn Văn Giả' && !kt.donvi && ch && ch.donvi==='PGD GIẢ' && !ch.ktHoiKB && cu && cu.ktHoiKB && cu.donvi==='PGD GIẢ', a1.ghi.join(' '));
 ok('mốc riêng máy (chBam, chKhoi, chCuBam) không lên Drive', !/"chBam"|"chKhoi"|"chCuBam"|"chCuNoi"/.test(JSON.stringify([kt, ch, cu])));
 // 2. A chỉ sửa tên đơn vị → chỉ ghi chung.json (+ cauhinh.json máy cũ), không ghi ktgs.json
 const a2 = await A.evaluate(async()=>{ D.cauHinh.donvi = 'PGD GIẢ 2'; luu(); __ghi = []; await dongBoCauHinh('tu'); return __ghi; });
 ok('sửa 1 khóa khối Chung → chỉ ghi chung.json (và cauhinh.json cho máy cũ)', a2.indexOf('chung.json')>=0 && a2.indexOf('ktgs.json')<0, a2.join(' '));
 const a3 = await A.evaluate(async()=>{ __ghi = []; const r = await dongBoCauHinh('tu'); return {r, ghi:__ghi}; });
 ok('không đổi gì → không ghi file nào', !a3.ghi.length && !a3.r.day, JSON.stringify(a3));
 // 3. B (máy mới) nhận
 const b1 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return {kb:D.cauHinh.ktHoiKB, dv:D.cauHinh.donvi}; });
 ok('B nhận khai báo Hội + tên đơn vị', b1.kb && b1.kb['X2|12'] && b1.dv==='PGD GIẢ 2', JSON.stringify(b1));
 // 4. C (máy cũ) sửa khai báo Hội qua cauhinh.json → A, B nhận
 await C.evaluate(async()=>{ await dongBoCauHinh('tu'); ktHoiKBSua('X1|11', 'pct', 'Lê Văn Cũ'); D.cauHinh.ktChuan = {'11':{gon:'HND cũ'}}; luu(); await dongBoCauHinh('tu'); });
 const a4 = await A.evaluate(async()=>{ __ghi = []; await dongBoCauHinh('tu'); return {kb:D.cauHinh.ktHoiKB, chuan:D.cauHinh.ktChuan, ghi:__ghi}; });
 ok('A (mới) nhận phần máy cũ C sửa qua cauhinh.json, rồi ghi lại ktgs.json', a4.kb['X1|11'].pct==='Lê Văn Cũ' && a4.chuan && a4.chuan['11'].gon==='HND cũ' && a4.ghi.indexOf('ktgs.json')>=0 && fileJ('ktgs.json').ktHoiKB['X1|11'].pct==='Lê Văn Cũ', JSON.stringify(a4.ghi));
 const b2 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return D.cauHinh.ktHoiKB['X1|11']; });
 ok('B nhận luôn phần máy cũ sửa', b2.pct==='Lê Văn Cũ', JSON.stringify(b2));
 // 5. A xóa 1 Hội – xã → B mất theo (khóa máy B chưa sửa → theo Drive)
 await A.evaluate(async()=>{ const k = Object.assign({}, D.cauHinh.ktHoiKB); delete k['X2|12']; D.cauHinh.ktHoiKB = k; luu(); await dongBoCauHinh('tu'); });
 const b3 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return Object.keys(D.cauHinh.ktHoiKB).join(); });
 ok('A xóa 1 dòng khai báo → B mất theo', b3==='X1|11', b3);
 // 6. B và A cùng sửa khác ô của cùng khóa → gộp
 await B.evaluate(async()=>{ ktHoiKBSua('X1|11', 'hd', '01/HĐUT'); await dongBoCauHinh('tu'); });
 await A.evaluate(async()=>{ ktHoiKBSua('X1|11', 'nk', '2025 – 2030'); await dongBoCauHinh('tu'); });
 const b4 = await B.evaluate(async()=>{ await dongBoCauHinh('tu'); return D.cauHinh.ktHoiKB['X1|11']; });
 ok('2 máy sửa khác ô cùng khóa → gộp đủ cả hai', b4.hd==='01/HĐUT' && b4.nk==='2025 – 2030' && b4.pct==='Lê Văn Cũ', JSON.stringify(b4));
 // 7. C (máy cũ) vẫn thấy phần máy mới sửa
 const c1 = await C.evaluate(async()=>{ await dongBoCauHinh('tu'); return D.cauHinh.ktHoiKB['X1|11']; });
 ok('máy cũ C vẫn nhận phần máy mới sửa qua cauhinh.json', c1.hd==='01/HĐUT' && c1.nk==='2025 – 2030', JSON.stringify(c1));
 // 8. "Máy cũ đã cập nhật hết" → thôi ghi cauhinh.json
 const a5 = await A.evaluate(async()=>{ D.cauHinh.kdBoCu = true; luu(); await dongBoCauHinh('tu'); D.cauHinh.donvi = 'PGD GIẢ 3'; luu(); __ghi = []; await dongBoCauHinh('tu'); return __ghi; });
 ok('bật "Máy cũ đã cập nhật hết" → không ghi cauhinh.json nữa', a5.indexOf('cauhinh.json')<0 && a5.indexOf('chung.json')>=0, a5.join(' '));
 // 9. Lấy từ Drive (Drive ưu tiên)
 const b5 = await B.evaluate(async()=>{ D.cauHinh.donvi = 'Sửa riêng B'; D.cauHinh.chBam = {}; await keoCauHinh(true); return D.cauHinh.donvi; });
 ok('B bấm "Lấy từ Drive" → Drive ưu tiên', b5==='PGD GIẢ 3', b5);
 // 10. tắt đồng bộ theo khối trên máy → về cách cũ (chỉ cauhinh.json)
 const c2 = await C.evaluate(async()=>{ __ghi = []; D.cauHinh.donvi = 'C cũ'; luu(); const r = await dongBoCauHinh('tu'); return r; });
 ok('máy tắt đồng bộ theo khối vẫn dùng cauhinh.json như cũ', c2 && !c2.loi && JSON.parse(Object.values(drive.F).find(x=>x.name==='cauhinh.json' && !x.trashed).body.toString('utf8')).donvi==='C cũ', JSON.stringify(c2));
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
