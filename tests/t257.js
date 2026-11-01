// 3.347 (anh 24/10: "kiểu bù này chỉ tính cho cuối tháng" · "làm trước tra cứu theo ngày không cần bù mẫu") — tvChuan kỳ ngày không bù Mẫu 01/TV; Tra cứu dựng theo số liệu mới nhất. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); dhSL('tra'); for(let i=0;i<60 && !TC_K;i++) await w(200); await w(800);
   const t = Object.values(TC_K.to).find(t=>!t.trucTiep && !toLaTT(t)), r0 = KHO.tvChuan(t, TC_K);
   const B2 = Object.assign({}, TC_K.B, {co:Object.assign({}, TC_K.B.co, {tv01:(TC_K.B.co.tv01||[]).concat([{kh:'9900000011', to:t.ma, ten:'Khách Giả TƯ', dn:0, t105:0}])}), nguon:Object.assign({}, TC_K.B.nguon||{}, {tv01:TC_K.ky})});
   const Kthang = Object.assign({}, TC_K, {B:B2}), Kngay = Object.assign({}, TC_K, {B:B2, ky:'2026-08-20'});
   const rt = KHO.tvChuan(t, Kthang), rn = KHO.tvChuan(t, Kngay);
   ok('3.347 kỳ chốt tháng (cùng tháng Mẫu 01/TV): vẫn bù người TƯ còn giữ', rt.bs===1 && rt.tong===r0.tong+1, rt.tong+' / '+r0.tong);
   ok('3.347 kỳ NGÀY: không bù theo Mẫu 01/TV — chỉ theo Mẫu 31', rn.bs===0 && rn.tong===r0.tong && !rn.ds.some(k=>k.kh==='9900000011'), rn.tong+' / '+r0.tong);
   ok('3.347 dòng ghi kỳ ngày nói rõ không bù', /không bù Mẫu 01\/TV/.test(tcTVGhi(rn)), tcTVGhi(rn));
   /* Tra cứu chọn kỳ mới nhất (có ngày thì lấy ngày) */
   const giuDs = window.toDsKy, giuNap = KHO.nap; let lay = '';
   window.toDsKy = () => [{ky:'2026-08'}, {ky:'2026-07'}, {ky:'2026-09-19'}, {ky:'2026-08-05'}];
   KHO.nap = ky => { lay = ky; return Promise.resolve(TC_K); };
   const kc0 = D.cauHinh.kyChung; D.cauHinh.kyChung = '';
   await tcNap(); const lay1 = lay;
   D.cauHinh.kyChung = '2026-08'; await tcNap(); const lay2 = lay;
   D.cauHinh.kyChung = kc0; window.toDsKy = giuDs; KHO.nap = giuNap;
   ok('3.347 + 3.435: chưa chọn kỳ → Tra cứu dựng theo số liệu mới nhất (ngày 19/09 > chốt T8); chọn T8 ở ô kỳ → T8', lay1==='2026-09-19' && lay2==='2026-08', lay1+' / '+lay2);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t257 đạt'); await b.close(); process.exit(sai?1:0);
})();
