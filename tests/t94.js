// 3.82 — hồ sơ hộ một trang (dữ liệu giả, tên khách giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:768}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.addInitScript(()=>{ localStorage.setItem('t94','1');
   localStorage.setItem('tuhoso_v1', JSON.stringify({phienBan:1,cauHinh:{},vanBan:[],duLieu:[],ghiChu:[],cho:[],bieuMau:[],rac:[],
     scan:[{id:'sc1',che:'the',ten:'Nguyễn Văn Thử',ap:'Ấp Giả',to:'0231790 — Trần Tổ Giả',matTruoc:true,matSau:true,ngay:'2026-09-01'},
           {id:'sc2',che:'tailieu',ten:'Nguyen Van Thu Hdtd',to:'0231790 — Trần Tổ Giả',trang:['a','b'],ngay:'2026-09-02'},
           {id:'sc3',che:'the',ten:'Nguyễn Văn Thử',to:'9999999 — Tổ Khác',matTruoc:true,ngay:'2026-09-03'},
           {id:'sc4',che:'the',ten:'Lê Thị Khác',to:'0231790 — Trần Tổ Giả',matTruoc:true,ngay:'2026-09-03'}],
     kyAnh:[{id:'ka1',loai:'ky',ten:'2026-09-01 Nguyen Van Thu CK.jpg',khach:'Nguyễn Văn Thử',ngay:'2026-09-01'}],
     boHS:[{id:'bo1',ten:'Hồ sơ vay · Nguyễn Văn Thử',khach:'Nguyễn Văn Thử',to:'0231790',file:[{k:'scan',id:'sc1'}]}]})); });
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   const c=document.createElement('canvas'); c.width=320;c.height=200; c.getContext('2d').fillRect(0,0,320,200); await luuFile('hs_sc1_matTruoc', await new Promise(r=>c.toBlob(r,'image/jpeg')));
   NO.mon['KU1']={kuoc:'KU1',maKH:'KHGIA1',ten:'Nguyễn Văn Thử',maTo:'0231790',toTen:'Trần Tổ Giả',ct:'01',dvut:'12',loai:{nqh:{ky:{'2026-09':{qh:12500000,ncq:'2026-05-01'}}}}};
   NO.mon['KU2']={kuoc:'KU2',maKH:'KHGIA1',ten:'Nguyễn Văn Thử',maTo:'0231790',ct:'06',loai:{khd:{ky:{'2026-09':{dn:30000000}}}}};
   NO.nhap={nqh:{ky:'2026-09'},khd:{ky:'2026-09'}};
   NO.ho['KHGIA1']={ma:'KHGIA1',ten:'Nguyễn Văn Thử',tt:{nguoiVay:{chon:['Đi làm ăn xa'],sdt:'0900000000'},nguyenNhan:{chon:['Làm ăn thua lỗ']}},ls:[],file:[]};
   NO.lan=[{id:'tl1',kuoc:'KU1',maKH:'KHGIA1',loai:'nqh',ngay:'2026-09-15',trangThai:'KH cam kết trả',camKet:'trả 5 triệu',camKetHan:'2026-10-15'}];
   moHoSoHo('KHGIA1'); await w(600);
   const h=document.getElementById('hop-in');
   o.tieuDe=h.querySelector('.hop-tit').textContent+' | '+h.querySelector('.hop-phu').textContent;
   o.cccd=[...h.querySelectorAll('.h1-the figcaption')].map(e=>e.textContent).join(' ; ')+' · ảnh: '+!!(h.querySelector('#h1a-sc1')||{}).src;
   o.thuThap=JSON.stringify({scan:HO1.scan.map(k=>k.id),ka:HO1.ka.map(k=>k.id),bo:HO1.bo.map(b=>b.id),mon:HO1.mons.map(m=>m.kuoc),lan:HO1.lan.length});
   o.mon=[...h.querySelectorAll('.h1-cot:nth-child(2) .h1-dong b')].map(e=>e.textContent).join(' ; ');
   o.nut=[...h.querySelectorAll('.day-form button')].map(b=>b.textContent).join(' | ');
   window.__shot=1;
   dongHop(); doiNgan(4); await w(300);
   o.nutScan=!!document.querySelector('#tr4 .sc-d button[title^="Hồ sơ hộ"]');
   moHoSoTuScan('sc4'); await w(300); o.tuScan=HO1.ten+' · scan '+HO1.scan.map(k=>k.id)+' · món '+HO1.mons.length;
   dongHop();
   document.getElementById('otim').value='van thu'; veGoiY('scan', D.scan); await w(100);
   o.goiY=[...document.querySelectorAll('#goiy button')].map(b=>b.textContent).filter(t=>/🏠/.test(t)).join(' | ');
   return o; });
 for(const k in r) console.log(k.padEnd(8), r[k]); console.log('lỗi', loi);
 await p.evaluate(async()=>{ document.getElementById('goiy').classList.remove('hien'); moHoSoHo('KHGIA1'); await new Promise(r=>setTimeout(r,500)); });
 await p.screenshot({path:__dirname+'/t94.png'}); await b.close(); })();
