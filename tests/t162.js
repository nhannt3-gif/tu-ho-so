// 3.167 (anh chốt 11/10) — KHỐI LỌC ĐỊA BÀN đồng bộ mọi tab: khung "LỌC ĐỊA BÀN", mỗi dòng 1 thanh, Điểm GD và Hội 2 thanh riêng (bỏ vạch │),
//   mỗi cấp 1 màu (Xã · Điểm GD · Hội · Tổ — nhãn + chip đang chọn), tên dòng chữ to / đậm hơn chip con. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   for(const t of ['to','kt','sk','th','tra']){ slDoiTab(t); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#tr7 .pv-cay .loc-khoi');i++) await w(200); await w(300);
     const k = document.querySelector('#tr7 .pv-cay .loc-khoi');
     ok('tab '+t+': có khối LỌC ĐỊA BÀN, dòng Xã có màu cấp', !!k && /LỌC ĐỊA BÀN/.test((k.querySelector('.pv-dau .pv-dau-nhan')||{}).textContent||'') && !!k.querySelector('.pv-hang1.cap-xa .pv-nhan')); }
   slDoiTab('to'); doiNgan(7); await w(800); const C = toCH(); C.xa=''; C.diem=''; C.hoi=''; C.to='';
   pvChon('to','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(800);
   const k = () => document.querySelector('#tr7 .pv-cay .loc-khoi');
   const dh = k().querySelector('.pv-hang2[data-cap="diem-hoi"]');
   ok('Điểm GD và Hội: 2 thanh riêng, không còn vạch │', !!dh.querySelector('.pv-nhom.cap-diem') && !!dh.querySelector('.pv-nhom.cap-hoi') && !dh.querySelector('.pv-vach'));
   pvChon('to','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(800);
   pvChon('to','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const mau = sel => { const x = k().querySelector(sel+' .to-chip.bat'); return x ? getComputedStyle(x).backgroundColor : ''; };
   const m = [mau('.cap-xa'), mau('.cap-diem'), mau('.cap-to')];
   ok('chip đang chọn mỗi cấp 1 màu khác nhau (Xã · Điểm GD · Tổ)', m.every(Boolean) && new Set(m).size===3, m.join(' | '));
   const nh = k().querySelector('.cap-xa .pv-nhan'), ch = k().querySelector('.cap-xa .to-chip');
   ok('tên dòng chữ to và đậm hơn chip con', parseFloat(getComputedStyle(nh).fontSize) > parseFloat(getComputedStyle(ch).fontSize) && +getComputedStyle(nh).fontWeight >= 700, getComputedStyle(nh).fontSize+' / '+getComputedStyle(ch).fontSize);
   ok('khối không tràn ngang', k().scrollWidth <= k().clientWidth+2);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
