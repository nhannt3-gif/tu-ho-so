// 3.89 — bộ chọn phạm vi chung · Tra cứu KH (phạm vi, kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HSSV) · tab con 📑 Sao kê (8 báo cáo, theo xã / điểm / tổ, chia theo tổ)
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o={}, w=t=>new Promise(r=>setTimeout(r,t));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); slDoiTab('tra'); for(let i=0;i<80 && !(TC_K && SL_PHU_KY && document.getElementById('tc-xa'));i++) await w(250);
   o.tab = Array.from(document.querySelectorAll('.sl-con button')).map(x=>x.textContent).join(' | ');
   o.phu = SL_PHU.filter(x=>x.loai==='vc').length+' vợ/chồng · '+SL_PHU.filter(x=>x.loai==='hs').length+' HSSV';
   const tim = q => { SL_TRA_Q=q; document.getElementById('sl-tim').value=q; slTraTim(); return document.getElementById('sl-kq'); };
   const c = SL_DB.kh[Object.keys(SL_DB.kh).find(m=>SL_DB.kh[m].mon && SL_DB.kh[m].cccd)];
   tim(c.cccd); o.trung = document.getElementById('tc-kt-kq').querySelector('.sl-bao').textContent.slice(0,40);   // 3.94: kiểm trùng ở khung riêng (2 ô)
   tim('079999999999'); o.khongTrung = document.getElementById('tc-kt-kq').querySelector('.sl-bao').textContent.slice(0,60);
   o.tenVC = tim('vo chong gia').querySelectorAll('.sl-kq-dong.phu').length+' dòng vợ/chồng';
   o.tenHS = tim('sinh vien gia').querySelectorAll('.sl-kq-dong.phu').length+' dòng HSSV';
   o.khongKhopTo = tim('to truong').querySelectorAll('.sl-kq-dong').length+' (tên tổ trưởng không làm khớp khách)';
   const ten = c.ten.split(' ').slice(-2).join(' '); const n0 = tim(ten).querySelectorAll('.sl-kq-dong:not(.phu)').length;
   pvChon('tc','xa', pvLuaChon(TC_K.to, tcCH(), 'xa')[0].k); await w(50);
   o.phamVi = 'toàn PGD '+n0+' → '+pvChu(tcCH(), TC_K)+' '+tim(ten).querySelectorAll('.sl-kq-dong:not(.phu)').length;
   pvChon('tc','xa','');
   // phím chung ở cây phạm vi của Tra cứu: Enter ở ô Xã (không bắt buộc) → không báo, sang ô kế
   // Sao kê
   slDoiTab('sk'); for(let i=0;i<80 && !document.getElementById('sk-cay');i++) await w(250);
   o.kySK = SK_K.ky+' · '+SK_K.B.hsTen;
   const C = skCH(); C.bc = {qh:true,kh:true,khd:true,sdt:true,dh:true,gn:true,ddn:true,m105:true}; C.tu='2029-01-01'; C.den='2029-12-31';
   const x0 = pvLuaChon(SK_K.to, C, 'xa')[0].k; pvChon('sk','xa', x0); await w(50);
   skXem(); let d; for(let i=0;i<60;i++){ await w(250); d = document.getElementById('sk-khung').contentDocument; if(d && d.readyState==='complete' && d.querySelectorAll('h1').length===8) break; }
   o.xa = d.querySelector('.bc-to').textContent+'\n    '+Array.from(d.querySelectorAll('.trang')).map(t=>t.querySelector('h1').textContent+': '+t.querySelectorAll('tbody tr:not(.nhom):not(.tong)').length+' dòng, '+t.querySelectorAll('tr.nhom').length+' tổ').join('\n    ');
   o.sdt = (d.querySelector('.bc-tom')||{}).textContent;
   dongHop();
   // theo tổ: không chia nhóm
   const d0 = pvLuaChon(SK_K.to, C, 'diem')[0].k; pvChon('sk','diem', d0); const t0 = pvLuaChon(SK_K.to, C, 'to')[0].k; pvChon('sk','to', t0);
   skXem(); await w(1200); d = document.getElementById('sk-khung').contentDocument;
   o.to = d.querySelector('.bc-to').textContent+' · nhóm tổ: '+d.querySelectorAll('tr.nhom').length;
   o.excel = typeof skExcel; dongHop();
   // Tổ TK&VV vẫn chạy sau khi đổi sang bộ chọn chung
   slDoiTab('to'); for(let i=0;i<80 && !document.getElementById('to-cay');i++) await w(250);
   o.toTab = !!document.querySelector('#to-cay.pv-cay')+' · '+document.querySelectorAll('#to-cay select').length+' ô';
   return o; }, files);
 for(const k in r) console.log(k.padEnd(11), r[k]);
 await p.screenshot({path:__dirname+'/t104.png'}); console.log('lỗi', loi); await b.close(); })();
