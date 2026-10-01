// 3.83 — số liệu giao ban + chuẩn bị buổi giao dịch (dữ liệu giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:768}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   const mon=(ku,kh,ten,maAp,maTo,ky)=>({kuoc:ku,maKH:kh,ten,maAp,maTo,toTen:'Tổ giả '+maTo,ct:'01',loai:{nqh:{ky}}});
   NO.mon={ 'K1':mon('K1','KH1','Khách Giả Một','54003508','T01',{'2026-08':{qh:10e6},'2026-09':{qh:15e6}}),
            'K2':mon('K2','KH2','Khách Giả Hai','54003508','T01',{'2026-09':{qh:20e6}}),
            'K3':mon('K3','KH3','Khách Giả Ba','54003511','T02',{'2026-08':{qh:8e6}}),
            'K4':mon('K4','KH4','Khách Giả Bốn','54003511','T02',{'2026-08':{qh:5e6},'2026-09':{qh:5e6}}) };
   NO.nhap={nqh:{ky:'2026-09'}}; NO.ho={}; NO.lan=[{id:'l1',kuoc:'K1',maKH:'KH1',loai:'nqh',ngay:'2026-09-20',camKet:'trả 5 triệu',camKetTien:5000000,camKetHan:'2026-10-01',trangThai:'KH cam kết trả'}];
   D.scan=[{id:'s1',che:'the',ten:'Khách Giả Hai',xa:'Phường Gò Dầu',diem:'Phường Gò Dầu',ap:'Thanh Bình',matTruoc:true,ngay:'2026-09-01'}]; HS.ds=D.scan;
   const R=gbTinh('nqh');
   o.tong='kỳ '+R.k1+' vs '+R.k0+' · '+R.T.n1+' món '+R.T.t1+' / '+R.T.n0+' món '+R.T.t0;
   o.xa=R.xa.map(x=>x.ten+': '+x.t1+'/'+x.t0+' ['+x.diem.map(d=>d.ten).join(',')+']').join(' | ');
   o.to='tăng: '+R.toTang.map(t=>t.ten+' +'+(t.t1-t.t0)).join(',')+' · giảm: '+R.toGiam.map(t=>t.ten).join(',')+' · vào '+R.vao.map(m=>m.kuoc)+' · ra '+R.ra.map(m=>m.kuoc);
   o.nhanDinh=gbNhanDinh(R);
   doiNgan(0); await w(300); ccMo('giaoban'); await w(300);
   o.gbUI=!!document.querySelector('.gb-bang')+' · dòng '+document.querySelectorAll('.gb-bang tr').length;
   ccMo('buoigd'); await w(300);
   const B=bgdTinh(); o.bgd=B.c.diem+' '+B.c.ngay+' · món '+B.mon.map(x=>x.m.kuoc)+' · cam kết '+B.ck.length+' · hồ sơ thiếu '+B.hs.length;
   o.chep=bgdChuTho().split('\n').slice(0,6).join(' / ');
   return o; });
 for(const k in r) console.log(k.padEnd(9), r[k]); console.log('lỗi', loi);
 await p.evaluate(async()=>{ ccMo('giaoban'); await new Promise(r=>setTimeout(r,300)); });
 await p.screenshot({path:__dirname+'/t95.png', fullPage:true}); await b.close(); })();
