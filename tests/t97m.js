// 3.85 — giao diện máy tính + điện thoại với bộ GIẢ nhỏ
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 for(const [ten,vp] of [['may',{width:1366,height:800}],['dt',{width:390,height:844}]]){
 const p=await b.newPage({viewport:vp}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const files = fs.readdirSync(path.join(__dirname,'gianho')).map(n=>({n, b:fs.readFileSync(path.join(__dirname,'gianho',n)).toString('base64')}));
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){}
   const F = files.map(f=>{ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], f.n); });
   doiNgan(7); slDocNhieu(F); }, files);
 await p.waitForSelector('.sl-xt',{timeout:60000}); await p.screenshot({path:__dirname+'/t97m_'+ten+'_xt.png'});
 await p.evaluate(()=>slGhiDaTich()); await p.waitForSelector('#sl-ky .sl-tom',{timeout:60000}); await p.waitForTimeout(4500);
 await p.screenshot({path:__dirname+'/t97m_'+ten+'_bang.png'});
 await p.evaluate(()=>{ document.getElementById('otim').value='tran thi'; veGoiY('vanBan', D.vanBan); });
 await p.screenshot({path:__dirname+'/t97m_'+ten+'_goiy.png'});
 await p.evaluate(async()=>{ dongGoiY(); slTheKH(slTimKH('tran thi')[0].m); await new Promise(r=>setTimeout(r,800)); });
 await p.screenshot({path:__dirname+'/t97m_'+ten+'_the.png'});
 await p.close(); }
 console.log('lỗi', loi); await b.close(); })();
