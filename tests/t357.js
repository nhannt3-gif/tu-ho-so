// 3.441 / 3.442 (anh 02/11): gặp CCCD → rà MỌI File Tổ trưởng (số CCCD · số CMND cũ 9 số · họ tên + ngày sinh) → Sao kê TK 104 (chủ TK cùng họ tên) — tổ trưởng không vay vẫn nhận ra; hiện tại hay cũ theo CIF tổ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; const o=[]; const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const g0 = window.dsTTDs;
   window.dsTTDs = () => Promise.resolve([
     {ky:'2026-10-30', rows:[{to:'9990001', ttKH:'4800000999', toTen:'NGUYỄN VĂN TỔ', cccd:'012345678', ns:'1970-05-06', tenXa:'Xã Giả', tenThon:'Ấp Giả'},
                            {to:'9990002', ttKH:'4800000888', toTen:'TRẦN THỊ HAI', cccd:'072000000002', ns:'1980-01-02'}]},
     {ky:'2026-08-31', rows:[{to:'9990003', ttKH:'4800000777', toTen:'LÊ VĂN CŨ', cccd:'', ns:'1965-03-04'},
                            {to:'9990004', ttKH:'4800000661', toTen:'PHẠM VĂN TRÙNG', cccd:'', ns:'1975-07-07'}, {to:'9990005', ttKH:'4800000662', toTen:'PHẠM VĂN TRÙNG', cccd:'', ns:'1975-07-07'}]}]);
   const a = await dsTimTT({cccd:'072000000002'}); ok('khớp số CCCD', a && a.cif==='4800000888' && a.theo==='số CCCD', JSON.stringify(a));
   const c = await dsTimTT({cccd:'079070000123', cmnd:'012345678'}); ok('thẻ CCCD mới, File còn ghi CMND cũ 9 số → khớp số CMND cũ', c && c.cif==='4800000999' && c.theo==='số CMND cũ', JSON.stringify(c));
   const d = await dsTimTT({cccd:'079065000999', ten:'Lê Văn Cũ', ns:'1965-03-04'}); ok('File không có số → khớp họ tên + ngày sinh (tổ trưởng cũ kỳ 08)', d && d.cif==='4800000777' && d.theo==='họ tên + ngày sinh' && d.ky==='2026-08-31', JSON.stringify(d));
   const e = await dsTimTT({cccd:'079075000111', ten:'Phạm Văn Trùng', ns:'1975-07-07'}); ok('2 người trùng họ tên + ngày sinh → không đoán', e===null, JSON.stringify(e));
   const f = await dsTimTT({cccd:'079099000000', ten:'Lê Văn Cũ', ns:'1966-01-01'}); ok('trùng tên khác ngày sinh → không khớp', f===null);
   SLM.bang['__tk104_gia'] = {loai:'tk104', ky:'2026-10-30', luc:'gia'}; DS_TK104['2026-10-30|gia'] = [{kh:'4800000555', ten:'VÕ VĂN KHÔNG VAY', stk:'7060000001', thon:'111'}, {kh:'4800000661', ten:'PHẠM VĂN TRÙNG', stk:'7060000002'}, {kh:'4800000662', ten:'PHẠM VĂN TRÙNG', stk:'7060000003'}];
   const g = await dsTimTT({cccd:'079080000555', ten:'Võ Văn Không Vay', ns:'1980-08-08'}); ok('File Tổ trưởng không có → chủ TK 104 cùng họ tên (duy nhất) → nhận tổ trưởng', g && g.cif==='4800000555' && /chủ TK 104 7060000001/.test(g.theo), JSON.stringify(g));
   const g2 = await dsTimTT({cccd:'079075000222', ten:'Phạm Văn Trùng', ns:'1975-07-08'}); ok('2 chủ TK 104 trùng họ tên → không đoán', g2===null, JSON.stringify(g2));
   delete SLM.bang['__tk104_gia']; delete DS_TK104['2026-10-30|gia'];
   const old = await dsTimCCCD('072000000002'); ok('dsTimCCCD (cũ) vẫn chạy', old!==undefined);
   window.dsTTDs = g0;
   const kt = KHO.to, kb = KHO.bangTo; KHO.to = m => m==='9990001' ? {ma:m, ten:'Tổ giả', tenXa:'Xã Giả'} : null; KHO.bangTo = m => m==='9990001' ? {kh:'4800000999'} : null;
   const h = trTTHienTai({to:'9990001', cif:'4800000999', theo:'số CMND cũ'}), h2 = trTTHienTai({to:'9990001', cif:'4800000111', theo:'số CCCD'});
   KHO.to = kt; KHO.bangTo = kb;
   ok('cùng CIF tổ trưởng hiện tại của tổ → lưu như tổ trưởng hiện tại; khác → tổ trưởng cũ', !!h && h.ma==='9990001' && h2===null, JSON.stringify(h));
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t357 đạt'); await b.close(); process.exit(sai?1:0);
})();
