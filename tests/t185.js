// 3.223 M8 (anh chốt 16/10) — LƯU THEO NGĂN (IndexedDB 'tuhoso_ngan'): lần đầu chép từ localStorage + giữ bản cũ 30 ngày, chỉ ghi ngăn đổi,
//   localStorage đầy (dữ liệu > 5 MB) vẫn lưu được và mở lại đủ, công tắc quay lại cách cũ (chặn khi dữ liệu quá lớn), dùng lại bản lúc chuyển,
//   IndexedDB bị chặn → cách cũ, xóa sạch máy bỏ cả kho ngăn, 2 máy giả lập đồng bộ cài đặt qua Drive giả không mất của nhau. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], R=[];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const url='file://'+path.resolve(__dirname,'..','index.html');
 const vb = i => ({id:'v'+i, nhom:'vanBan', soHieu:i+'/CV-GIA', ngay:'2026-09-01', tenMoi:'vb'+i+'.pdf', suaLuc:'2026-09-01T00:00:00Z'});
 const CU = JSON.stringify({phienBan:1, cauHinh:{thumuc:'Tủ hồ sơ', donvi:'PGD Giả', thuCu:'goc'}, vanBan:[vb(1), vb(2)], duLieu:[], ghiChu:[{id:'g1', nhom:'ghiChu', tieuDe:'Ghi chú giả'}], cho:[], bieuMau:[], rac:[]});
 const mo = async(ctx, chan)=>{ const p = await ctx.newPage({viewport:{width:1366,height:800}}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   if(chan) await p.addInitScript(()=>{ indexedDB.open = function(n){ if(n==='tuhoso_ngan') throw new Error('chặn giả'); return IDBFactory.prototype.open.apply(indexedDB, arguments); }; });
   await p.goto(url); await p.waitForTimeout(1200); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} await LN.xong(); }); return p; };
 const w = (p, t) => p.waitForTimeout(t);

 // 1. máy có dữ liệu cũ (trước 3.223) → lần đầu chuyển
 const os=require('os'), fs=require('fs'), HS=fs.mkdtempSync(path.join(os.tmpdir(), 't185-'));   /* hồ sơ trình duyệt ghi đĩa như máy thật — ngữ cảnh ẩn danh (RAM) có hạn mức nhỏ, chạy song song nặng Chromium xóa cả kho trang */
 const ctx = await chromium.launchPersistentContext(HS, {});
 const TRANG = path.join(HS, 'trong.html'); fs.writeFileSync(TRANG, '<!doctype html><title>trống</title>');   /* trang file:// trống cùng nguồn: đặt dữ liệu cũ 1 lần, KHÔNG dùng addInitScript (localStorage bị xóa thì không tự nạp lại → thấy đúng lỗi) */
 { const t = await ctx.newPage(); await t.goto('file://'+TRANG); await t.evaluate(d=>localStorage.setItem('tuhoso_v1', d), CU); await t.close(); }
 let p = await mo(ctx); await w(p, 600);
 const a1 = await p.evaluate(async()=>{ await LN.xong(); const j = await LN.napIDB(), f = await docFile('ln:banCu'), t = LN.tt();
   return {bat:t.bat, vb:j && j.vanBan.length, ch:j && j.cauHinh.thuCu, gc:j && j.ghiChu.length, banCu:f ? await f.text() : '', bc:!!t.banCu, ls:/"luuLuc":\d+\}$/.test(localStorage.getItem('tuhoso_v1'))}; });
 ok('lần đầu: chép đủ dữ liệu cũ sang IndexedDB theo ngăn (văn bản, ghi chú, cài đặt)', a1.bat && a1.vb===2 && a1.ch==='goc' && a1.gc===1, JSON.stringify(a1).slice(0, 200));
 ok('giữ bản localStorage cũ (đúng từng ký tự) làm bản dự phòng 30 ngày', a1.banCu===CU && a1.bc, a1.banCu===CU ? '' : a1.banCu.slice(0, 120)+' | bc '+a1.bc);
 ok('localStorage vẫn ghi như cũ (có dấu luuLuc để so bản)', a1.ls);

 // 2. chỉ ghi ngăn đổi
 const a2 = await p.evaluate(async()=>{ await LN.xong(); luuNgay(); await LN.xong(); D.cauHinh.thuNgan = 1; luuNgay(); await LN.xong(); const n1 = LN.tt().dem.ngan;
   D.vanBan.push({id:'v9', nhom:'vanBan', soHieu:'9/CV-GIA', ngay:'2026-09-09', tenMoi:'vb9.pdf'}); D.cauHinh.thuNgan = 2; luuNgay(); await LN.xong(); return {n1, n2:LN.tt().dem.ngan}; });
 ok('đổi 1 ngăn (cài đặt) → chỉ ghi 1 ngăn; đổi 2 ngăn → ghi 2', a2.n1===1 && a2.n2===2, JSON.stringify(a2));

 // 3. dữ liệu lớn > localStorage (6 MB văn bản giả) → vẫn lưu, mở lại đủ
 const a3 = await p.evaluate(async()=>{ let bl = ''; const g = window.baoLoi; window.baoLoi = t => { bl = t; };
   const dai = 'x'.repeat(3000); for(let i=0;i<2000;i++) D.vanBan.push({id:'L'+i, nhom:'vanBan', soHieu:i+'/LON-GIA', ngay:'2026-09-02', tenMoi:'lon'+i+'.pdf', noiDung:dai});
   const r = luuNgay(); await LN.xong(); await new Promise(x=>setTimeout(x, 100)); window.baoLoi = g;
   return {r, bl, ls:localStorage.getItem('tuhoso_v1'), cho:localStorage.getItem('tuhoso_ln_cho')}; });
 ok('localStorage đầy → luuNgay() vẫn được, không báo lỗi; bỏ bản cũ ở localStorage, đánh dấu đọc IndexedDB', a3.r===true && !a3.bl && a3.ls===null && !!a3.cho, JSON.stringify({r:a3.r, bl:a3.bl, ls:a3.ls && a3.ls.length, cho:a3.cho}));
 const a3b = await p.evaluate(()=>{ return lnDoiCach('cu', true), {cach:LN.cach(), bat:LN.bat()}; });
 ok('dữ liệu lớn hơn localStorage → KHÔNG cho quay lại cách cũ (giữ lưu theo ngăn)', a3b.cach==='ngan' && a3b.bat, JSON.stringify(a3b));
 await p.reload(); await w(p, 1500);
 const a4 = await p.evaluate(async()=>{ await xongTV; await LN.xong(); return {vb:D.vanBan.length, lon:D.vanBan.filter(x=>/LON-GIA/.test(x.soHieu)).length, ch:D.cauHinh.thuNgan, cu:D.cauHinh.thuCu, gc:D.ghiChu.length, dau:(document.getElementById('donvi')||{}).textContent||''}; });
 ok('mở lại app → đọc IndexedDB trước khi vẽ: đủ 2003 văn bản, cài đặt, ghi chú; đầu trang đếm đúng', a4.vb===2003 && a4.lon===2000 && a4.ch===2 && a4.cu==='goc' && a4.gc===1 && /2004 mục/.test(a4.dau), JSON.stringify(a4));
 const a5 = await p.evaluate(async()=>{ D.vanBan = D.vanBan.filter(x=>!/LON-GIA/.test(x.soHieu)); luuNgay(); await LN.xong(); return {cho:localStorage.getItem('tuhoso_ln_cho'), ls:!!localStorage.getItem('tuhoso_v1')}; });
 ok('dữ liệu nhỏ lại → localStorage ghi lại được, bỏ dấu chờ', a5.cho===null && a5.ls);

 // 3b. localStorage bị xóa mất (Chromium có lúc xóa cả kho sau lần ghi quá chỗ) → mở lại KHÔNG coi là máy mới, nạp IndexedDB, không ghi đè bằng bản trống
 await p.evaluate(async()=>{ await LN.xong(); localStorage.clear(); }); await p.reload(); await w(p, 1500);
 const a5b = await p.evaluate(async()=>{ await xongTV; await LN.xong(); await new Promise(x=>setTimeout(x, 500)); const j = await LN.napIDB(); return {vb:D.vanBan.length, ch:D.cauHinh.thuNgan, idb:j.vanBan.length, ls:!!localStorage.getItem('tuhoso_v1')}; });
 ok('localStorage bị xóa mất → mở lại nạp đủ từ IndexedDB, ghi lại localStorage, IndexedDB không bị ghi đè', a5b.vb===3 && a5b.ch===2 && a5b.idb===3 && a5b.ls, JSON.stringify(a5b));

 // 4. công tắc quay lại cách cũ → chỉ localStorage; bật lại → chép đủ sang IndexedDB
 const a6 = await p.evaluate(async()=>{ lnDoiCach('cu', true); const g0 = LN.tt().dem.ghi; D.cauHinh.thuCach = 'cu'; luuNgay(); await LN.xong(); return {cach:LN.cach(), bat:LN.bat(), ghi:LN.tt().dem.ghi-g0, ls:JSON.parse(localStorage.getItem('tuhoso_v1')).cauHinh.thuCach}; });
 ok('quay lại cách cũ: không ghi IndexedDB nữa, localStorage giữ bản mới', a6.cach==='cu' && !a6.bat && a6.ghi===0 && a6.ls==='cu', JSON.stringify(a6));
 await p.reload(); await w(p, 1500);
 const a7 = await p.evaluate(async()=>{ await xongTV; const o = {cach:LN.cach(), ch:D.cauHinh.thuCach, vb:D.vanBan.length};
   lnDoiCach('ngan', true); await LN.xong(); const j = await LN.napIDB(); o.idb = j.cauHinh.thuCach; o.bat = LN.bat(); return o; });
 ok('mở lại khi đang cách cũ → đọc localStorage; bật lại lưu theo ngăn → IndexedDB có bản mới nhất', a7.cach==='cu' && a7.ch==='cu' && a7.vb===3 && a7.idb==='cu' && a7.bat, JSON.stringify(a7));

 // 5. ↩ dùng lại dữ liệu lúc chuyển + giao diện Sao lưu
 const a8 = await p.evaluate(async()=>{ slDoiTab('hsv'); doiNgan(7); await new Promise(x=>setTimeout(x, 800)); hsoKBHop('sl'); await new Promise(x=>setTimeout(x, 200)); const h = (document.getElementById('hop-in')||document.body).innerHTML;
   await lnDungBanCu(true); await LN.xong(); const tr = await docFile('ln:truocDungLai'), t = tr ? JSON.parse(await tr.text()) : {};
   return {ui:/Nơi lưu dữ liệu trên máy này/.test(h) && /Dùng lại dữ liệu lúc chuyển/.test(h), vb:D.vanBan.length, ch:D.cauHinh.thuCach, cu:D.cauHinh.thuCu, truoc:(t.vanBan||[]).length, trCh:(t.cauHinh||{}).thuCach}; });
 ok('tab 💾 Sao lưu có nhóm 🗄 Nơi lưu + nút dùng lại bản lúc chuyển', a8.ui);
 ok('dùng lại bản lúc chuyển → dữ liệu như lúc chuyển; bản ngay trước đó được giữ (ln:truocDungLai)', a8.vb===2 && a8.ch===undefined && a8.cu==='goc' && a8.truoc===3 && a8.trCh==='cu', JSON.stringify(a8));
 const a9 = await p.evaluate(async()=>{ LN.banCu = {luc:new Date(Date.now()-31*864e5).toISOString(), kb:1}; await LN.donCu(); await new Promise(x=>setTimeout(x, 100)); return {f:await docFile('ln:banCu'), m:await LN.napMeta().then(()=>LN.banCu)}; });
 ok('bản cũ quá 30 ngày → tự bỏ', a9.f===null && a9.m===null, JSON.stringify(a9));

 // 6. xóa sạch máy → bỏ cả kho ngăn (mở lại như mới, không lôi dữ liệu cũ về)
 const a10 = await p.evaluate(async()=>{ window.hoi = (a, b, c, f) => f(); window.xuatDuPhong = () => 'gia.json'; const r0 = location.reload; document.body.insertAdjacentHTML('beforeend', '<input id="xs-go" value="XOA">');
   window.__t185 = 1; xoaSachMay(); await new Promise(x=>setTimeout(x, 300)); const j = await LN.napIDB().catch(()=>'loi'); return {j:j===null}; });
 await w(p, 1500); await p.evaluate(async()=>{ await xongTV; await LN.xong(); await new Promise(x=>setTimeout(x, 400)); });
 const a11 = await p.evaluate(()=>({vb:D.vanBan.length, cu:D.cauHinh.thuCu}));
 ok('xóa sạch máy → kho ngăn trống, mở lại không có dữ liệu cũ', a10.j && a11.vb===0 && a11.cu===undefined, JSON.stringify([a10, a11]));
 await ctx.close(); try { fs.rmSync(HS, {recursive:true, force:true}); } catch(e){}

 // 7. IndexedDB bị chặn (trình duyệt riêng tư) → cách cũ, app chạy bình thường
 const c2 = await b.newContext(); await c2.addInitScript(d=>{ if(!localStorage.getItem('t185')){ localStorage.setItem('t185','1'); localStorage.setItem('tuhoso_v1', d); } }, CU);
 const q = await mo(c2, true); await w(q, 300);
 const a12 = await q.evaluate(async()=>{ await LN.xong(); D.cauHinh.thuChan = 1; const r = luuNgay(); return {r, bat:LN.bat(), hong:LN.tt().hong, vb:D.vanBan.length, ls:JSON.parse(localStorage.getItem('tuhoso_v1')).cauHinh.thuChan}; });
 ok('IndexedDB bị chặn → tự dùng localStorage như cũ, dữ liệu đủ', a12.r===true && !a12.bat && a12.hong && a12.vb===2 && a12.ls===1, JSON.stringify(a12));
 await c2.close();

 // 8. 2 máy giả lập (sự cố 09/10): A sửa khai báo Hội, B sửa lựa chọn in → đồng bộ cài đặt qua Drive giả, mở lại (đọc IndexedDB) không ai mất của ai
 const may = async()=>{ const c = await b.newContext(); await c.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy); const x = await mo(c);
   await x.evaluate(()=>{ window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; }); return x; };
 const A = await may(), B = await may();
 await A.evaluate(async()=>{ D.cauHinh.ktHoiKB = {'X1|11':{ct:'Nguyễn Văn Giả'}}; luuNgay(); await dongBoCauHinh('tu'); });
 await B.evaluate(async()=>{ await dongBoCauHinh('tu'); D.cauHinh.ktIn = {coChu:13}; luuNgay(); await dongBoCauHinh('tu'); });
 await A.evaluate(async()=>{ await dongBoCauHinh('tu'); luuNgay(); await LN.xong(); });
 await B.evaluate(async()=>{ await LN.xong(); });
 await A.reload(); await B.reload(); await w(A, 1500);
 const k = async x => x.evaluate(async()=>{ await xongTV; await LN.xong(); const j = await LN.napIDB(); return {hoi:((D.cauHinh.ktHoiKB||{})['X1|11']||{}).ct, inn:(D.cauHinh.ktIn||{}).coChu, idbHoi:((j.cauHinh.ktHoiKB||{})['X1|11']||{}).ct}; });
 const kA = await k(A), kB = await k(B);
 ok('2 máy: A có cả khai báo Hội (của A) + lựa chọn in (của B), lưu cả trong IndexedDB', kA.hoi==='Nguyễn Văn Giả' && kA.inn===13 && kA.idbHoi==='Nguyễn Văn Giả', JSON.stringify(kA));
 ok('2 máy: B giữ lựa chọn in của mình + nhận khai báo Hội của A', kB.hoi==='Nguyễn Văn Giả' && kB.inn===13, JSON.stringify(kB));

 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
