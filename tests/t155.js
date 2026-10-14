// 3.159 — Chân thanh bên + chế độ tối (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2):
//   dòng trạng thái hiện đủ chữ (≤ 3 dòng), không lặp thông tin Drive (đã có chip), chip xuống dòng khi dài;
//   nút ◐ / ☀ / ☾ ở chân thanh bên đổi Theo máy → Sáng → Tối, app nhớ; nền tối không còn chữ sáng trên nền sáng; bản in giữ nền trắng. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   D.cauHinh.giaoDien = 'auto'; apGiaoDien(); dhVe(); await w(100);
   /* 1. chân thanh bên */
   ttVe(); const chu = document.querySelector('#thanh-ben .tt-chu');
   ok('dòng trạng thái không lặp "Drive" (đã có chip Drive ngay dưới)', !/Drive/.test(chu.textContent) && !!document.querySelector('#thanh-ben #chip-drive'), chu.textContent);
   TTB.chu = 'Đã lưu 3 file vào Văn bản / 2026 · đã đẩy lên Drive xong, bấm để xem chi tiết các file vừa lưu'; TTB.luc = Date.now(); ttVe();
   const h = chu.getBoundingClientRect().height, lh = parseFloat(getComputedStyle(chu).lineHeight);
   ok('tin dài: xuống dòng hiện đủ (tối đa 3 dòng), không cắt "…" 1 dòng', getComputedStyle(chu).whiteSpace==='normal' && h>lh*1.5 && h<=lh*3+2, Math.round(h)+' px / dòng '+lh);
   TTB.chu = ''; ttVe();
   ok('chip (Drive, bộ nhớ) xuống dòng khi dài, không bị cắt', [...document.querySelectorAll('#thanh-ben #so-lieu .chip')].every(c=>getComputedStyle(c).whiteSpace==='normal'));
   /* 2. nút chế độ tối */
   const nut = () => document.querySelector('#thanh-ben .tb-chan .tb-gd');
   ok('nút ◐ Giao diện ở chân thanh bên (cạnh 🗑 🧰 ❓ ⚙)', !!nut() && nut().textContent==='◐' && /Theo máy/.test(nut().title));
   nut().click(); await w(400);   /* 3.203: ghi gom sau 300 ms */
   ok('bấm → Sáng ☀ (nhớ ở cài đặt)', D.cauHinh.giaoDien==='light' && document.documentElement.getAttribute('data-theme')==='light' && nut().textContent==='☀' && JSON.parse(localStorage.getItem(KHOA)).cauHinh.giaoDien==='light');
   nut().click(); await w(100);
   ok('bấm → Tối ☾, nền app tối', D.cauHinh.giaoDien==='dark' && document.documentElement.getAttribute('data-theme')==='dark' && nut().textContent==='☾' && (()=>{ const c = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number); return c[0]+c[1]+c[2] < 150; })());
   /* 3. rà tương phản chữ / nền ở các tab chính */
   const rgb = c => { const m = c.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?/); return m ? [+m[1], +m[2], +m[3], m[4]===undefined ? 1 : +m[4]] : null; };
   const lum = x => (0.299*x[0]+0.587*x[1]+0.114*x[2])/255;
   const nen = e => { for(let x=e;x;x=x.parentElement){ const c = rgb(getComputedStyle(x).backgroundColor); if(c && c[3]>=0.5) return c; } return [16,21,27,1]; };
   const ra = () => { const kq = []; document.querySelectorAll('#tr7 *, #tr1 *').forEach(e=>{ if(![...e.childNodes].some(n=>n.nodeType===3 && n.textContent.trim())) return; const r = e.getBoundingClientRect(); if(!r.width || r.bottom<0 || r.top>innerHeight) return;
     const cs = getComputedStyle(e); if(cs.visibility==='hidden' || +cs.opacity<0.3) return; const c = rgb(cs.color); if(c && Math.abs(lum(c)-lum(nen(e)))<0.3) kq.push(e.className+' "'+e.textContent.trim().slice(0, 20)+'"'); }); return kq; };
   const sai = [];
   for(const t of ['to','kt','sk','th','tra']){ slDoiTab(t); doiNgan(7); await w(1500); sai.push(...ra().map(x=>t+': '+x)); }
   SL_KY = '2026-08'; moNapSL(); await w(1500); sai.push(...ra().map(x=>'nap: '+x));
   doiNgan(1); await w(500); sai.push(...ra().map(x=>'vb: '+x));
   ok('nền tối: không còn chữ sáng trên nền sáng (Nạp & KT, Tổ, KTGS, Sao kê, Tổng hợp, Tra cứu, Văn bản)', !sai.length, sai.slice(0, 5).join(' | '));
   ok('dòng xã bảng Tổ / chip đỏ dùng màu theo giao diện (không còn nền hồng / xanh nhạt cố định)', getComputedStyle(document.documentElement).getPropertyValue('--do-nen').trim().toLowerCase()==='#3a1a18');
   ok('bản in giữ nền trắng chữ đen (CSS bản in không đổi)', /color:#000/.test(TDN_IN_CSS) && /#eef3f9/.test(TDN_IN_CSS));
   nut().click(); await w(100); ok('bấm lần nữa → về Theo máy ◐', D.cauHinh.giaoDien==='auto' && !document.documentElement.getAttribute('data-theme') && nut().textContent==='◐');
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
