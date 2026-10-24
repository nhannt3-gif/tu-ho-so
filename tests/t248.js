// 3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2): 🩺 Sức khỏe sao lưu ở ⚙ Khai báo đơn vị › 💾 Sao lưu — mỗi đường lưu 1 dòng + màu theo tuổi
//   (≤ 2 ngày lục · 3–7 vàng · quá 7 / chưa có đỏ), chưa nối Drive vàng, file chưa lên Drive đếm. Chỉ đọc trạng thái — không đổi luồng lưu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const ngay = n => new Date(Date.now()-n*864e5), iso = n => ngay(n).toISOString(), ymd = n => ngayISO(ngay(n));
   const dong = ten => skDs().find(d=>d.ten.indexOf(ten)>=0) || {};
   ok('tuổi → màu: 0 / 2 ngày lục · 3 / 7 vàng · 8 đỏ · chưa có đỏ', skMuc(0)==='luc' && skMuc(2)==='luc' && skMuc(3)==='vang' && skMuc(7)==='vang' && skMuc(8)==='do' && skMuc(null)==='do');
   D.cauHinh.saoLuuNgay = ymd(0); ok('bản tự lưu đầu ngày hôm nay → lục', dong('Bản tự lưu').muc==='luc', dong('Bản tự lưu').chu);
   D.cauHinh.saoLuuNgay = ymd(10); ok('bản tự lưu 10 ngày trước → đỏ', dong('Bản tự lưu').muc==='do', dong('Bản tự lưu').chu);
   delete D.cauHinh.saoLuuNgay; ok('chưa có bản tự lưu → đỏ "chưa có lần nào"', dong('Bản tự lưu').muc==='do' && /chưa có/.test(dong('Bản tự lưu').chu));
   const giu = window.coTheNoiDrive; window.coTheNoiDrive = ()=>false;
   ok('chưa nối Drive → 1 dòng vàng "chưa nối Drive"', dong('☁ Drive').muc==='vang' && !dong('cauhinh.json').ten);
   window.coTheNoiDrive = ()=>true; D.cauHinh.chGhiLuc = iso(1); D.cauHinh.chiMucDriveTG = iso(5);
   ok('đã nối: cài đặt 1 ngày → lục · danh sách hồ sơ 5 ngày → vàng', dong('cauhinh.json').muc==='luc' && dong('chimuc.json').muc==='vang', dong('cauhinh.json').chu+' | '+dong('chimuc.json').chu);
   const v0 = D.vanBan; D.vanBan = (v0||[]).concat([{id:'sk1'}, {id:'sk2', driveId:'x'}]);
   ok('file chưa lên Drive: đếm mục không có driveId', /\d+ file/.test(dong('chưa lên Drive').chu) && dong('chưa lên Drive').muc!=='luc', dong('chưa lên Drive').chu);
   D.vanBan = v0;
   ok('tổng: lấy mức xấu nhất', skXau([{muc:'luc'}, {muc:'vang'}])==='vang' && skXau([{muc:'luc'}, {muc:'do'}, {muc:'vang'}])==='do' && skXau([{muc:'luc'}])==='luc');
   /* giao diện */
   D.cauHinh.saoLuuNgay = ymd(0); hsoKBHop('sl'); await w(500);
   const the = document.querySelector('.sk-the');
   ok('⚙ Khai báo đơn vị › 💾 Sao lưu: thẻ 🩺 Sức khỏe sao lưu đứng đầu, đủ dòng, có chip tổng', !!the && /Sức khỏe sao lưu/.test(the.textContent) && the.querySelectorAll('.sk-dong').length>=5 && !!the.querySelector('b + .nh'), the && the.querySelectorAll('.sk-dong').length+' dòng');
   ok('thẻ đứng trước bảng 📸 Tự lưu (vẫn giữ các phần cũ)', !!the && /Tự lưu trên máy này/.test(the.parentNode.textContent) && the.parentNode.textContent.indexOf('Sức khỏe') < the.parentNode.textContent.indexOf('Tự lưu trên máy này'));
   window.coTheNoiDrive = giu; delete D.cauHinh.chGhiLuc; delete D.cauHinh.chiMucDriveTG;
   return o; });
 await p.screenshot({path:path.join(__dirname,'t248.png')});
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t248 đạt'); await b.close(); process.exit(sai?1:0);
})();
