// t278 (TK 3, 3.383.7 — anh 27/10): bộ lọc địa bàn — đổi cấp cao → cấp thấp về Tất cả (Điểm GD · Hội · Ấp ngang cấp giữ nhau), dải tiêu đề LỌC ĐỊA BÀN
//   chứa dòng số liệu + ▦ Chip · ⬆ · 📌 Về ghim, 📌 nhỏ từng ô; Tra cứu: dòng cộng danh sách tổ ghi cấp lọc cuối (rê chuột đủ), thẻ tổ có nút 📊 Biến động TK 105.
//   (nhớ địa bàn qua phiên + ghim từng ô khi mở lại app: t241). Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1500,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); D.cauHinh.slTab = 'tra'; doiNgan(7); slDoiTab('tra'); for(let i=0;i<80 && !TC_K;i++) await w(250); await w(600);
   const C = tcCH(), T = TC_K.to, ds = Object.values(T).filter(t=>!toLaTT(t) && !t.trucTiep && t.tenThon && t.dv && t.khoaDiem);
   const t0 = ds[0], xa = t0.xa, hoi = String(t0.dv), x2 = (Object.values(T).find(t=>t.xa && t.xa!==xa && !t.trucTiep)||{}).xa;
   /* 1. luật đổi cấp */
   pvChon('tc', 'xa', xa); pvChon('tc', 'hoi', hoi); pvChon('tc', 'diem', t0.khoaDiem); pvChon('tc', 'to', t0.ma); await w(200);
   ok('đổi Điểm GD (ngang cấp Hội / Ấp) → Hội giữ, Tổ về Tất cả', (pvChon('tc', 'diem', t0.khoaDiem), C.hoi===hoi && !C.to && C.diem===t0.khoaDiem));
   pvChon('tc', 'to', t0.ma); pvChon('tc', 'hoi', hoi); ok('đổi Hội → Tổ về Tất cả, Điểm GD giữ', !C.to && C.diem===t0.khoaDiem);
   if(x2){ pvChon('tc', 'xa', x2); ok('đổi Xã → Điểm GD · Hội · Ấp · Tổ đều về Tất cả', C.xa===x2 && !C.diem && !C.hoi && !C.ap && !C.to); }
   pvChon('tc', 'xa', xa); pvChon('tc', 'hoi', hoi); await w(300);
   /* 2. dải tiêu đề */
   const k = document.querySelector('#tc-cay .loc-khoi'), dau = k.querySelector('.pv-dau');
   ok('dải tiêu đề: nhãn LỌC ĐỊA BÀN + dòng số liệu + ▦ Chip · ⬆ · 📌 Về ghim (hàng lọc chỉ còn ô chọn)', !!dau && /LỌC ĐỊA BÀN/.test(dau.textContent) && !!dau.querySelector('.pv-dem') && !!dau.querySelector('.pv-gon') && !!dau.querySelector('.pv-len') && !!dau.querySelector('.pv-ghim-nut') && !k.querySelector('.pv-hang1 .pv-gon, .pv-hang1 .pv-dem'));
   const rD = dau.getBoundingClientRect(), rK = k.getBoundingClientRect(), rH = k.querySelector('.pv-hang1').getBoundingClientRect();
   ok('dải tiêu đề nằm trên đường viền khung, không đè hàng lọc', Math.abs(rD.top+rD.height/2 - rK.top) < 6 && rD.bottom <= rH.top+1, [rD.top, rD.bottom, rK.top, rH.top].map(Math.round).join(','));
   ok('mỗi ô lọc có 📌 nhỏ cạnh ↺', k.querySelectorAll('.pv-x + .pv-gh').length===k.querySelectorAll('select.pv-o').length);
   /* 3. dòng cộng danh sách tổ: cấp lọc cuối */
   const eD = document.createElement('div'); document.body.appendChild(eD); tcToTim('', eD);
   const cL = eD.querySelector('tfoot .tc-to-cong'), o5 = cL && cL.cells[4];
   ok('dòng cộng ghi cấp lọc cuối (Hội), rê chuột đủ phạm vi', !!o5 && o5.textContent===pvChu(C, TC_K).split(' · ').pop() && o5.title===pvChu(C, TC_K) && o5.title.indexOf(' · ')>0, o5 && o5.textContent+' | '+o5.title);
   eD.remove();
   /* 4. thẻ tổ → 📊 Biến động TK 105 */
   tcTheTo(t0.ma); await w(300);
   const nut = [...document.querySelectorAll('#tc-ct button')].find(x=>/Biến động TK 105/.test(x.textContent));
   ok('thẻ tổ có nút 📊 Biến động TK 105', !!nut && nut.getAttribute('data-lenh')==='tc.b105');
   let goi = 0; const skXem0 = window.skXem; window.skXem = function(){ goi++; };
   nut.click(); for(let i=0;i<60 && !goi;i++) await w(250);
   const S = skCH();
   ok('bấm → tab Sao kê, chọn sẵn tổ + báo cáo b105, tự Xem', goi===1 && D.cauHinh.slTab==='sk' && S.to===t0.ma && S.xa===t0.xa && S.bc.b105 && Object.keys(S.bc).length===1, JSON.stringify({goi, tab:D.cauHinh.slTab, to:S.to, bc:S.bc}));
   window.skXem = skXem0;
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(R.length-R.filter(x=>x[0]==='✗').length+'/'+R.length+' đạt'+(loi.length ? ' · lỗi trang' : '')); await b.close(); process.exit(sai?1:0);
})();
