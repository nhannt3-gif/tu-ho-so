// 3.88.1 — tab con Tổ TK&VV trên máy thứ 2: bảng số liệu chưa tải (Drive hết phiên) → cây tổ dựng tạm từ danh bạ + cảnh báo + nút Nối Drive / Thử lại; nối lại → tải bảng, hết cảnh báo (bộ gianho)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[];
 const mo = async()=>{ const ctx=await b.newContext({viewport:{width:1366,height:900}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; });
   return p; };
 const dir=path.join(__dirname,'gianho31'); /* 3.120: bộ nhỏ có Mẫu 31 (Mẫu 10 đã bỏ) */ const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const A = await mo(); await A.evaluate(async(files)=>{ for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); } await slDay(); }, files);
 const B = await mo();
 const r = await B.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); await slNap(); await slTaiTuDrive();
   DR.sanSang=false; window.noiDrive=()=>Promise.resolve(false);   // Drive hết phiên, nối lại im lặng không được
   doiNgan(7); slDoiTab('to'); for(let i=0;i<40 && !document.getElementById('to-cay');i++) await w(250); await w(500);
   window.__r1 = {thieu:!!(TO_K && TO_K.thieuBang), soTo:TO_K ? Object.keys(TO_K.to).length : 0, xa:document.getElementById('to-xa') ? document.getElementById('to-xa').options.length-1 : 0, bao:(document.querySelector('#tr7 .sl-bao')||{}).textContent||''};
   return 'KH danh bạ '+SL_TIM.length+' · cây: '+!!document.getElementById('to-cay')+' · lựa chọn xã: '+(document.getElementById('to-xa')?document.getElementById('to-xa').options.length-1:'-')+' · chữ: '+document.getElementById('tr7').textContent.slice(0,200); });
 console.log(r);
 const r2 = await B.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); DR.sanSang=true; DR.hetHan=Date.now()+36e5; toThuLai(); for(let i=0;i<40 && !(TO_K && !TO_K.thieuBang && document.getElementById('to-cay'));i++) await w(250); await w(300);
   window.__r2 = {bao:!!document.querySelector('#tr7 .sl-bao'), xa:document.getElementById('to-xa').options.length-1, mon:TO_K.hs.length, thieu:!!TO_K.thieuBang};
   return 'sau khi nối lại: còn cảnh báo '+!!document.querySelector('#tr7 .sl-bao')+' · xã '+(document.getElementById('to-xa').options.length-1)+' · món '+TO_K.hs.length; });
 console.log(r2);
 /* 3.411.2 (RA_SOAT_HOI_QUY D1): câu kiểm thật — trước chỉ in chữ nên lỗi cây rỗng (từ 3.383.6) không bị bắt */
 const R1 = await B.evaluate(()=>window.__r1), R2 = await B.evaluate(()=>window.__r2), kq = [], ok = (ten, dk, chi) => kq.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 ok('máy 2, bảng chưa tải: cây tổ dựng tạm từ danh bạ (có tổ, có xã)', R1.thieu && R1.soTo>0 && R1.xa>0, JSON.stringify({thieu:R1.thieu, soTo:R1.soTo, xa:R1.xa}));
 ok('cảnh báo vàng + nút Nối Drive / Thử lại', /chưa có trên máy này/.test(R1.bao) && /Nối Drive/.test(R1.bao) && /Thử lại/.test(R1.bao), R1.bao.slice(0, 80));
 ok('nối lại → tải bảng, hết cảnh báo, có món vay', !R2.bao && !R2.thieu && R2.mon>0 && R2.xa>0, JSON.stringify(R2));
 ok('không lỗi trang', !loi.length, loi.slice(0, 2).join(' | '));
 kq.forEach(x=>console.log(x)); const sai = kq.filter(x=>x[0]==='✗').length; console.log((kq.length-sai)+'/'+kq.length+' đạt');
 await B.screenshot({path:__dirname+'/t103.png'}); await b.close(); process.exit(sai ? 1 : 0); })();
