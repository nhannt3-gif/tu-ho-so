// 3.165 (anh chốt, BAN_GIAO_3161.md §2.4) — Kết quả kiểm tra theo cấu trúc ma trận: gom theo từng file (thứ tự dòng ma trận), mỗi file "✓ n · ⚠ n · ⓘ n",
//   mục so 2 file hiện ở file đứng trước, file kia "↗ xem ở …"; chip lọc (mặc định ⚠ + ⓘ), ⊞ Mở hết / ⊟ Gập hết, 🔎 tìm mục, bấm ⚠ trên ma trận → nhảy tới file. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   const K = '2026-09', dat = l => { SLM.bang[slKhoa(l, K)] = {loai:l, ky:K, ngay:'2026-09-30', soDong:10, luc:'2026-10-01T01:00:00Z', tenFile:l+'.xlsx', tong:{n:10, dn:1e6}, choDay:false}; };
   ['hstd','dnct','dsto','bx','bc','lx','lh','lc','lt'].forEach(dat);
   SLM.kt[K] = {luc:new Date().toISOString(), dau:slDauKy(K), dem:{ok:2, lech:2, canh:1}, kq:[
     {nhom:1, ten:'Đủ 9 file bắt buộc', kq:'ok', chu:'đủ'},
     {nhom:7, ten:'BCDHTD 01.1 ↔ LEN_31 XAPUONG từng xã', kq:'lech', chu:'1 xã lệch dư nợ', cot:['Xã','01.1','LEN_31'], ds:[['Xã A', 100, 90]], n:1},
     {nhom:8, ten:'Mẫu 31 ↔ BCDHTD 01.1 từng xã', kq:'ok', chu:'khớp'},
     {nhom:5, ten:'Mẫu 31 ↔ Dư nợ chi tiết', kq:'lech', chu:'2 món lệch'},
     {nhom:6, ten:'Mẫu 31 · khách thiếu CCCD', kq:'canh', chu:'3 khách'}]};
   D.cauHinh.slKqMo = true; delete D.cauHinh.slKtLoc; doiNgan(7); SL_KY = K; slDoiTab('nap'); SL_KY = K; veSoLieu(); await w(600);
   const kt = () => document.getElementById('sl-kt'), files = () => [...kt().querySelectorAll('details.sl-kt-file')];
   const ten = () => files().map(d=>d.querySelector('summary b').textContent);
   ok('chip lọc: mặc định ⚠ + ⓘ (có chênh lệch)', /⚠ \+ ⓘ/.test(kt().querySelector('.sl-kt-loc .to-chip.bat').textContent));
   ok('gom theo file, thứ tự như dòng ma trận (Mẫu 31 trước 01.1 trước LEN_31)', (i31 => i31>=0 && i31 < ten().findIndex(x=>/01\.1/.test(x)) && ten().findIndex(x=>/01\.1/.test(x)) < ten().findIndex(x=>/LEN_31/.test(x)))(ten().findIndex(x=>/^Mẫu 31/.test(x))), ten().join(' | '));
   const f31 = document.getElementById('sl-kt-f-hstd');
   ok('dòng file có đếm ✓ / ⚠ / ⓘ', !!f31 && /⚠ 1/.test(f31.querySelector('.sl-kt-dem').textContent) && /ⓘ 1/.test(f31.querySelector('.sl-kt-dem').textContent), f31 && f31.querySelector('.sl-kt-dem').textContent);
   ok('mục so 2 file: hiện ở file trước, file sau ghi "↗ xem ở …"', [...kt().querySelectorAll('.sl-kt-ref')].some(x=>/xem ở/.test(x.textContent)));
   ok('lọc ⚠ + ⓘ: không hiện mục ✓ khớp', !/Mẫu 31 ↔ BCDHTD 01.1 từng xã/.test(kt().textContent) || [...kt().querySelectorAll('.sl-kt-muc.ok')].length===0);
   [...kt().querySelectorAll('.sl-kt-loc .to-chip')].find(x=>/Tất cả/.test(x.textContent)).click(); await w(200);
   ok('chip Tất cả → có cả mục khớp, nhóm "Chung" (đủ file); app nhớ', /Đủ 9 file/.test(kt().textContent) && /Chung/.test(ten()[0]) && D.cauHinh.slKtLoc==='all');
   slKTMo(1); ok('⊞ Mở hết', files().every(d=>d.open)); slKTMo(0); ok('⊟ Gập hết', files().every(d=>!d.open));
   slKTTim('cccd'); const hien = files().filter(d=>d.style.display!=='none');
   ok('🔎 tìm "cccd" → chỉ còn file có mục khớp chữ, tự mở', hien.length===1 && hien[0].open && /CCCD/.test(hien[0].textContent), hien.map(d=>d.id).join());
   slKTTim('');
   delete D.cauHinh.slKtLoc; veSoLieu(); await w(400); D.cauHinh.slKqMo = false;
   const dau = document.querySelector('.sl-bang .sl-dau.lech');
   if(dau){ document.getElementById('sl-kq').open = false; dau.click(); await w(400); const f = document.querySelector('#sl-kt details.sl-kt-file[open]');
     ok('bấm ⚠ trên ô ma trận → mở Kết quả kiểm tra, mở đúng dòng file', document.getElementById('sl-kq').open && !!f, f && f.id); }
   else { slKTToi('lx'); await w(300); ok('slKTToi: mở Kết quả kiểm tra + đúng dòng file', document.getElementById('sl-kq').open && document.getElementById('sl-kt-f-lx').open); }
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
