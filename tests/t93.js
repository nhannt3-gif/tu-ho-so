// 3.81 — an toàn dữ liệu: luôn gộp trước khi ghi Drive, chặn ghi trống, dự phòng đầu ngày, sao lưu trong máy, lấy lại mục thiếu (dữ liệu giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1366,height:768}}); const p=await ctx.newPage(); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.addInitScript(()=>{ if(localStorage.getItem('t93')) return; localStorage.setItem('t93','1');
   const vb=i=>({id:'v'+i,nhom:'vanBan',soHieu:i+'/CV',ngay:'2026-09-0'+i,tenMoi:'vb'+i+'.pdf',suaLuc:'2026-09-0'+i+'T00:00:00Z'});
   localStorage.setItem('tuhoso_v1', JSON.stringify({phienBan:1,cauHinh:{thumuc:'Tủ hồ sơ'},vanBan:[vb(1),vb(2),vb(3),vb(4)],duLieu:[],ghiChu:[],cho:[],bieuMau:[],rac:[],
     scan:[{id:'sA',che:'the',ten:'Khach gia A',matTruoc:true,suaLuc:'2026-09-01T00:00:00Z'},{id:'sB',che:'tailieu',ten:'Ho so gia B',trang:['x'],suaLuc:'2026-09-01T00:00:00Z'}]})); });
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(5500);   // đợi sao lưu đầu ngày (4s)
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} document.getElementById('bao').style.opacity='0'; const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5;
   o.saoLuuMay = (await dsSaoLuuMay()).map(x=>x.ngay).join(',')+' · ngày ghi='+D.cauHinh.saoLuuNgay;
   // 1) đẩy lần đầu: Drive có chimuc + dự phòng hôm nay
   await dayChiMucLenDrive(); o.day1 = 'dự phòng Drive: '+(await dsSaoLuuDrive()).length;
   // 2) giả lập máy lỗi mất danh sách Scan + 2 văn bản (không qua thùng rác) rồi đẩy lên — Drive phải giữ lại nhờ gộp
   D.scan=[]; HS.ds=D.scan; D.vanBan=D.vanBan.slice(0,2); luu();
   await dayChiMucLenDrive();
   o.sauDay = 'máy sau gộp: VB '+D.vanBan.length+' · Scan '+D.scan.length+' (gộp lại từ Drive)';
   // 3) chặn ghi trống: giả lập gopTuRemote không lấy lại được gì (máy mất sạch) — xem có ghi đè không
   const goc = window.gopTuRemote; window.gopTuRemote=function(){ return 0; };
   D.vanBan=[]; D.scan=[]; HS.ds=D.scan; await dayChiMucLenDrive(); window.gopTuRemote=goc;
   const f = Object.values(window.__dr||{}); 
   o.chanTrong = 'báo: '+(document.getElementById('bao').textContent.indexOf('Không ghi chỉ mục trống')>=0);
   // 4) dự phòng đầu ngày không bị ghi đè trong ngày
   o.duPhong = 'số bản Drive '+(await dsSaoLuuDrive()).length;
   // 5) lấy lại từ sao lưu trong máy (máy đang trống)
   D.rac=[]; luu();
   const ds = await dsSaoLuuMay(); SL_DS = ds; const j = await docSaoLuu(ds[0]); const th = mucThieuTuSaoLuu(j);
   o.thieu = 'VB thiếu '+th.vanBan.length+' · Scan thiếu '+th.scan.length;
   SL_CHON = Object.assign(ds[0], {j}); layLaiSaoLuu(); await w(200);
   o.layLai = 'VB '+D.vanBan.length+' · Scan '+D.scan.length+' · HS.ds = D.scan: '+(HS.ds===D.scan);
   // 6) mục đang trong thùng rác không bị lấy lại
   xoaNhieuVaoRac(['v1']); await w(200);
   o.racKhongLay = 'thiếu sau khi xóa v1: '+mucThieuTuSaoLuu(j).vanBan.length;
   // 7) giao diện Dọn kho › Sao lưu
   moDonKho('saoluu'); await w(1500);
   o.giaoDien = [...document.querySelectorAll('.sl-dong')].map(e=>e.textContent.replace(/\s+/g,' ').trim()).join(' | ').slice(0,200);
   return o; });
 for(const k in r) console.log(k.padEnd(10), r[k]);
 const cm = Object.values(drive.F).filter(f=>f.name==='chimuc.json' && !f.trashed)[0];
 const j = JSON.parse(cm.body.toString()); console.log('drive chimuc  VB '+j.vanBan.length+' · Scan '+j.scan.length+' (không bị ghi trống)');
 console.log('du_phong     ', Object.values(drive.F).filter(f=>/^chimuc_/.test(f.name)&&!f.trashed).map(f=>f.name+' VB '+JSON.parse(f.body.toString()).vanBan.length).join(', '));
 console.log('lỗi', loi); await p.screenshot({path:__dirname+'/t93.png'}); await b.close(); })();
