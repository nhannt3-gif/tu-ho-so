// 3.435 (anh 01/11 "app mặc định lấy kỳ mới nhất nhưng khi anh chọn thì phải theo cột số liệu" + "luôn ghi lấy dữ liệu theo kỳ nào"):
//   Tra cứu theo ô kỳ góc phải (mặc định mới nhất) — thẻ khách món / số / số dư 105 + thẻ tổ theo kỳ chọn; ghi rõ kỳ. Bộ GIẢ gianho31 (T7, T8).
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
   const th = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort();
   ok('bộ giả có 2 tháng', th.length>=2, th.join(','));
   const cu = th[0], moi = th[th.length-1];
   D.cauHinh.kyChung = ''; ok('chưa chọn kỳ → Tra cứu lấy MỚI NHẤT', tcKyDung()===toDsKy().reduce((a, x)=>slThuTu(x.ky)>slThuTu(a.ky) ? x : a).ky, tcKyDung());
   kyChungDoi(cu); slDoiTab('tra'); doiNgan(7); await w(1800);
   ok('chọn '+cu+' → Tra cứu dùng đúng kỳ (TC_K)', tcKyDung()===cu && TC_K && TC_K.ky===cu, TC_K && TC_K.ky);
   const m = Object.keys(SL_DB.kh).find(k=>SL_DB.kh[k].to && SL_DB.kh[k].mon>=1); slTheKH(m); await w(1500);
   const the = document.querySelector('#tc-ct .tc-khung') || document.querySelector('.tc-khung');
   ok('thẻ khách ghi rõ kỳ: 📅 '+slKyChu(cu)+' + "Món vay — '+slKyChu(cu)+'"', !!the && the.querySelector('.tc-ky').textContent.indexOf(slKyChu(cu))>=0 && the.textContent.indexOf('Món vay — '+slKyChu(cu))>=0, the && the.querySelector('.tc-ky') && the.querySelector('.tc-ky').textContent);
   const B = await KHO.bo(cu), dn = KHO.monKy(B, m).filter(x=>x.ku && x.ttMon!=='CLOSE' && (x.dn||0)>0).reduce((a, x)=>{ if(!a.g[x.ku]){ a.g[x.ku] = 1; a.s += x.dn||0; } return a; }, {g:{}, s:0}).s;
   ok('ô Tổng dư nợ theo kỳ chọn', document.getElementById('tc-so').textContent.indexOf(tdnTien(dn))>=0, tdnTien(dn));
   kyChungDoi(moi); await w(1800);
   ok('đổi sang '+moi+' → Tra cứu theo kỳ mới', TC_K && TC_K.ky===moi && tcKyDung()===moi);
   slTheKH(m); await w(1500); const t2 = document.querySelector('.tc-khung');
   ok('thẻ khách đổi ghi '+slKyChu(moi), t2 && t2.querySelector('.tc-ky').textContent.indexOf(slKyChu(moi))>=0);
   ok('khối LỌC ĐỊA BÀN ghi đúng kỳ đang dùng', PV_DUNG.tc.ghi().indexOf(slKyChu(moi))>=0, PV_DUNG.tc.ghi());
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t351 đạt'); await b.close(); process.exit(sai?1:0);
})();
