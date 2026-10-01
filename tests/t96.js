// 3.84 — tên có dấu cho scan, phím chung hộp lần làm việc, chip chờ khai điện thoại (dữ liệu giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:768}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   const mon=(ku,kh,ten,maTo)=>({kuoc:ku,maKH:kh,ten,maAp:'54003508',maTo,toTen:'Tổ giả',ct:'01',loai:{}});
   NO.mon={K1:mon('K1','KH1','Nguyễn Văn Giả','T01'),K2:mon('K2','KH2','Trần Thị Thử','T01'),K3:mon('K3','KH3','Lê Văn Trùng','T01'),K4:mon('K4','KH4','Lê Văn Trừng','T01')};
   NO.ho={}; NO.lan=[];
   D.scan=[{id:'a',che:'hs',ten:'Nguyen Van Gia Hdtd',ap:'Ấp giả'},{id:'b',che:'hs',ten:'Tran Thi Thu'},{id:'c',che:'hs',ten:'Le Van Trung'},
           {id:'d',che:'hs',ten:'Nguyễn Văn Giả'},{id:'e',che:'hs',ten:'Pham Van Khong',driveId:'x'}]; HS.ds=D.scan;
   const g=goiYTenCoDau(); o.goiY=g.map(x=>x.k.id+'→'+x.moi).join(' | ');
   doiNgan(4); await w(300); o.thanh=!!Array.from(document.querySelectorAll('.thanh-chon')).find(x=>/tên không dấu/.test(x.textContent));
   moTenCoDau(); await w(200); o.hop=document.querySelectorAll('.tdau').length;
   document.querySelector('.tdau[value="1"]').checked=false; apTenCoDau(); await w(200);
   o.sau=D.scan.map(x=>x.id+':'+x.ten).join(' | ');
   // phím chung hộp lần làm việc
   tdnLanMoi('K1'); await w(300);
   o.lop=document.getElementById('hop-in').classList.contains('phim-chung');
   const os=sgO(); o.soO=os.length; os[0].focus();
   const ev=(k,sh)=>{ const e=new KeyboardEvent('keydown',{key:k,shiftKey:!!sh,bubbles:true,cancelable:true}); document.activeElement.dispatchEvent(e); return e.defaultPrevented; };
   ev('Enter'); o.enter1=document.activeElement===os[1];
   ev('Tab',true); o.shiftLui=document.activeElement===os[0];
   const ta=os.find(x=>x.tagName==='TEXTAREA'); if(ta){ ta.focus(); o.taEnterGiu=!ev('Enter'); ev('Tab'); o.taTabSang=document.activeElement!==ta; }
   dongHop(); moHop('<div class="hop-tit">x</div><input id="z">'); o.lopXoa=!document.getElementById('hop-in').classList.contains('phim-chung'); dongHop();
   return o; });
 for(const k in r) console.log(k.padEnd(10), r[k]);
 await p.setViewportSize({width:390,height:800});
 const ck=await p.evaluate(()=>{ const d=document.createElement('div'); d.innerHTML=chipChoKhai.toString().length?'<button class="chip-ck">📥 3<span class="ck-chu"> chờ khai ›</span></button>':''; document.body.appendChild(d); const s=d.querySelector('.ck-chu'); return getComputedStyle(s).display; });
 console.log('chip390  ', ck, '· lỗi', loi); await b.close(); })();
