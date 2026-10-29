// 3.408 (anh 30/10: "trong tra cứu KH em hiện cảnh báo KH có 2 số TK 105, và hiện cả 2 để biết và đóng"): thẻ khách Tra cứu —
//   gộp số TK 105 từ danh bạ + Sao kê TK 105 (số dư từng sổ, ngày mở), ≥ 2 sổ → nhãn đỏ "N TK 105" ở đầu thẻ + liệt kê đủ + nhắc đóng bớt; 1 sổ → như cũ.
//   Bộ GIẢ tests/gianho31 + Sao kê TK 105 giả (thay tcTk105Ds).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; doiNgan(7); slDoiTab('tra'); await tcNap(); await w(500);
   const ds = KHO.chiMuc().map(r=>r.m), a = ds[0], b2 = ds[1];
   const sA = slStk((KHO.danhBa(a)||{}).stk), sB = slStk((KHO.danhBa(b2)||{}).stk);   /* sổ có sẵn trong danh bạ giả */
   const SK = [{kh:a, stk:'1050000000001', t105:500000, ndk:'2024-01-02'}, {kh:a, stk:'1050000000002', t105:0, ndk:'2025-03-04'}, {kh:b2, stk:sB[0] || '1050000000009', t105:100000, ndk:'2023-05-06'}];
   const giu = tcTk105Ds; window.tcTk105Ds = () => SK;
   const nA = tcTkDs(a, sA).length;
   const tk = tcTkDs(a, []);
   ok('tcTkDs: gộp 2 sổ của khách, số dư từng sổ, xếp theo ngày mở', tk.length===2 && tk[0].stk==='1050000000001' && tk[0].t105===500000 && tk[1].t105===0, JSON.stringify(tk));
   ok('tcTkDs: sổ trong danh bạ chưa có ở Sao kê vẫn đếm (số dư chưa rõ)', tcTkDs(b2, ['1050000000010']).some(x=>x.stk==='1050000000010' && x.t105===null) && tcTkDs(b2, ['1050000000010']).length===2);
   slTheKH(a); await w(400);
   const the = (document.getElementById('tc-ct')||document.getElementById('hop-in')).textContent;
   ok('thẻ khách nhiều TK: nhãn đỏ "N TK 105" ở đầu thẻ (N = sổ danh bạ + Sao kê)', nA>=2 && !!document.querySelector('#tc-nhan .tc-nh.do') && new RegExp(nA+' TK 105').test(document.getElementById('tc-nhan').textContent), nA+' · '+document.getElementById('tc-nhan').textContent);
   ok('thẻ khách 2 TK: hiện đủ 2 số TK + số dư + ngày mở + "số dư 0" + nhắc đóng bớt', /1050000000001/.test(the) && /1050000000002/.test(the) && /mở 02\/01\/2024/.test(the) && /số dư 0/.test(the) && /giữ 1, làm thủ tục đóng TK còn lại/.test(the), the.slice(0, 300));
   slTheKH(b2); await w(400);
   ok('thẻ khách 1 TK (danh bạ = Sao kê cùng số): không cảnh báo', sB.length<=1 && !/TK 105/.test(document.getElementById('tc-nhan').textContent) && !document.querySelector('.tc-tk-nhieu'), sB.join());
   window.tcTk105Ds = giu;
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
