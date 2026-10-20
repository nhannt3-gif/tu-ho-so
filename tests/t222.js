// 3.292 — tab Scan, kiểu xem ▦ Bảng: cột Tổ trưởng (tổ đã khai trên bản; chưa có → theo mã KH trên Mẫu 31). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>DB[m].ten), toMa = sxKhach(ma).to, bay = new Date().toISOString();
   D.scan.push({id:'t222a', che:'the', ten:'A', maKH:'', to:'Tổ Gia Một', ngay:bay.slice(0,10), taoLuc:bay}, {id:'t222b', che:'the', ten:DB[ma].ten, maKH:ma, ngay:bay.slice(0,10), taoLuc:bay});
   HS.ds = D.scan; doiNgan(4); await w(200); datKX('scan', 'bang'); await w(300);
   const th = Array.prototype.map.call(document.querySelectorAll('#tr4 .bang-tab thead th'), x=>x.textContent.trim());
   const ci = th.findIndex(t=>/^Tổ trưởng/.test(t)), o_ = id => { const tr = Array.prototype.find.call(document.querySelectorAll('#tr4 .bang-tab tbody tr'), r=>r.textContent.indexOf(id==='a' ? 'Tổ Gia Một' : DB[ma].ten)>=0); return tr ? tr.children[ci].textContent.trim() : null; };
   ok('bảng Scan có cột "Tổ trưởng" (sau cột Ấp)', ci>0 && /^Ấp/.test(th[ci-1]), JSON.stringify(th));
   ok('tổ đã khai trên bản → hiện tổ đó; chưa khai → theo mã KH trên Mẫu 31', o_('a')==='Tổ Gia Một' && !!toMa && o_('b')===toMa, JSON.stringify([o_('a'), o_('b'), toMa]));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
