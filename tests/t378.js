// 3.489 (Đ6 kế hoạch dọn — tab Tổ mở lần đầu < 300 ms): toKhach / hạn CCCD ghi nhớ CHỈ trong 1 lần vẽ thẻ tổ (TO_KH_TAM), skNhomDH bỏ tính ngày chuyển QH khi không cần.
//   Kết quả phải như cũ: so có / không ghi nhớ, so skNhomDH với công thức cũ trên mọi món. Dữ liệu GIẢ (gianho31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   kyChungDoi('2026-08'); doiNgan(7); slDoiTab('to'); await w(2500);
   const K = KHO.kyDung(), ds = Object.keys(K.to).map(m=>K.to[m]);
   ok('xong lần vẽ → bỏ bộ nhớ tạm (không giữ số sang lần sau)', TO_KH_TAM===null);
   const khong = ds.map(t=>JSON.stringify([toKhach(t), toSoTo(t)]));
   TO_KH_TAM = {K:K, m:{}}; const co = ds.map(t=>JSON.stringify([toKhach(t), toSoTo(t)])); const co2 = ds.map(t=>JSON.stringify(toKhach(t))); TO_KH_TAM = null;
   ok('toKhach + toSoTo: có ghi nhớ = không ghi nhớ (mọi tổ)', khong.every((x, i)=>x===co[i]), ds.length+' tổ');
   ok('trong 1 lần vẽ: gọi lại toKhach trả đúng kết quả đã tính', co2.every((x, i)=>x===JSON.stringify(JSON.parse(co[i])[0])));
   /* skNhomDH = công thức cũ (tính skCQH trước) */
   const cu = (o, tu, den, ns) => { const hl = skHL(o), gd = skCQH(o).d; if(!hl) return 0; if(hl<=ns && gd>ns && gd>=tu) return 1; if(hl>=tu && hl<=den) return (!gd || gd<=den) ? 2 : 3; return 0; };
   const mon = []; ds.forEach(t=>(K.kh[t.ma]||[]).forEach(o=>{ if(o.ku) mon.push(o); }));
   const moc = [['2026-09-01', '2026-09-30', '2026-08-31'], ['2026-08-01', '2026-08-31', '2026-07-31'], ['2027-01-01', '2027-01-31', '2026-12-31']];
   let sai = 0; moc.forEach(m=>mon.forEach(o=>{ if(skNhomDH(o, m[0], m[1], m[2])!==cu(o, m[0], m[1], m[2])) sai++; }));
   ok('skNhomDH mới = công thức cũ (mọi món × 3 mốc kỳ)', sai===0 && mon.length>0, mon.length+' món · lệch '+sai);
   ok('hạn CCCD ngoài lần vẽ: tính bình thường', toCCCDHan('079099009999', '1990-01-01', '2021-05-01').kq && TO_KH_TAM===null);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t378 đạt'); await b.close(); process.exit(sai?1:0);
})();
