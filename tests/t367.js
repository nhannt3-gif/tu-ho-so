// t367 (3.462, KE_HOACH_DON_NEN D2 — QUY_CHUAN mục 13 "cắm rút"): CỔNG GẮN MẪU hsoMauGan (js/25).
//   06A, BBLV tự gắn chip + cách lập + cột trái từ js/mau/*.js; rút 3 file (0hsn, 06a, bblv) → app chạy như trước, không lỗi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const o=[]; const ok=(ten, dk, chi)=>o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const goc=path.resolve(__dirname,'..'), rut=path.join(goc,'_t367_rut.html');
 async function mo(f){ const p=await b.newPage({viewport:{width:1536,height:860}}), loi=[]; p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+f); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} }); return {p, loi}; }
 try {
  /* 1. đủ file: chip đúng thứ tự cũ, lập qua cổng */
  let {p, loi} = await mo(path.join(goc,'index.html'));
  let r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); const ks = HSO_MAU.hsv.map(m=>m.k), M6 = hsoMauK('06a'), MB = hsoMauK('bblv');
    slDoiTab('hsv'); doiNgan(7); await w(500); hsoChonMau('bblv'); await w(500);
    const x = hsoLap(); hsoChonMau('06a'); await w(500); const x6 = hsoLap();
    return {ks:ks.join(','), cong:!!(M6 && M6.lap && M6.trai && MB && MB.lap && MB.trai), mg:MB && MB.mg.join('/')===omMg([15,15,15,25]).join('/'), trai:/Chọn tổ ở bộ lọc địa bàn để hiện các hộ còn nợ/.test((document.getElementById('hso-tuy')||document.body).textContent), ma:x.ma+'|'+x6.ma, ten:/^MauBblv_/.test(x.ten), tenF:x.ten}; });
  ok('thứ tự chip Hồ sơ vay như cũ (… 03/TD · 06A · BBLV · 06/TD …)', /03td,06a,bblv,06td/.test(r.ks), r.ks);
  ok('06A, BBLV gắn qua cổng (lap + trai), lề BBLV theo file gốc', r.cong && r.mg);
  ok('hsoLap đi qua cổng: BBLV + 06A lập đúng mã, tên file, cột trái từ cổng (bảng chọn món — chưa chọn tổ thì nhắc chọn tổ)', r.ma==='BBLV|06A/TD' && r.ten && r.trai, r.ma+' · '+r.tenF);
  ok('không lỗi trang (đủ file)', !loi.length, loi.join(' | ')); await p.close();
  /* 2. rút 3 file mẫu → app chạy như trước */
  fs.writeFileSync(rut, fs.readFileSync(path.join(goc,'index.html'),'utf8').split('\n').filter(l=>!/js\/mau\/(0hsn|06a|bblv)\.js/.test(l)).join('\n'));
  ({p, loi} = await mo(rut));
  r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); const ks = HSO_MAU.hsv.map(m=>m.k).join(',');
    slDoiTab('hsv'); doiNgan(7); await w(500); hsoChonMau('01uq'); await w(500); const x = hsoLap();
    let mo = 'ok'; try { hso06aMo('', '', ''); } catch(e){ mo = e.message; }
    return {ks, ma:x.ma, mo, chip:document.querySelectorAll('.hso-dau button, .hso-dau .chip').length}; });
  ok('rút file: không còn chip 06A / BBLV, các mẫu khác còn đủ', !/06a|bblv/.test(r.ks) && /03td,06td/.test(r.ks), r.ks);
  ok('rút file: lập mẫu khác bình thường; KTGS mở 06A chỉ báo thiếu, không vỡ', r.ma==='01/UQ' && r.mo==='ok', r.ma+' · '+r.mo);
  ok('không lỗi trang (rút file)', !loi.length, loi.join(' | ')); await p.close();
 } finally { try{ fs.unlinkSync(rut); }catch(e){} }
 console.log(o.join('\n')); const sai=o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t367 SAI '+sai : '✓ t367 đạt'); await b.close(); process.exit(sai?1:0); })();
