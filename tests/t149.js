// 3.153 — Xóa thống nhất (anh chốt ý 3 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi thứ vào 🗑 Thùng rác app, không thanh Hoàn tác;
//   xóa 1 mục không hỏi, xóa nhiều hỏi 1 lần ghi rõ số mục; mục nhỏ (việc lịch, lần làm việc, bộ biểu mẫu, kế hoạch KTGS) vào ngăn Mục nhỏ,
//   khôi phục về đúng chỗ; ô Số liệu vào ngăn Số liệu (t141); Thùng rác giữ 30 ngày rồi tự xóa hẳn (bật sẵn). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const hopMo = () => document.getElementById('hop').classList.contains('hien');
   D.rac = []; D.vanBan = ['a','b','c'].map(i=>({id:'v'+i, nhom:'vanBan', tenMoi:'2026-10-0'+(i.charCodeAt(0)-96)+' '+i+'/TB Thử '+i+'.pdf', soHieu:i+'/TB', ngay:'2026-10-01', mang:'Tín dụng'})); luu();
   doiNgan(1); await w(200);
   /* xóa 1 file: không hỏi */
   batBot('vanBan'); BOT.chon = {va:1}; botXacNhan(); await w(200);
   ok('xóa 1 file: không hỏi, vào Thùng rác, không có nút ↩ Hoàn tác', !hopMo() && D.rac.length===1 && !D.vanBan.some(m=>m.id==='va') && !document.querySelector('.bao-ht'));
   /* xóa nhiều: hỏi 1 lần ghi rõ số */
   batBot('vanBan'); BOT.chon = {vb:1, vc:1}; botXacNhan(); await w(150);
   const hop = (document.getElementById('hop-in')||{}).textContent||'';
   ok('xóa 2 file: hỏi 1 lần "Xóa 2 file?"', hopMo() && /Xóa 2 file\?/.test(hop) && D.vanBan.length===2, hop.slice(0, 60));
   [...document.querySelectorAll('#hop-in button')].find(x=>/Xóa 2 file/.test(x.textContent)).click(); await w(200);
   ok('bấm Xóa 2 file → cả 2 vào Thùng rác', D.vanBan.length===0 && D.rac.length===3);
   khoiPhucRac(['va','vb','vc']); ok('khôi phục 3 file về Văn bản', D.vanBan.length===3 && D.rac.length===0);
   /* việc lịch */
   const L = lcData(); L.viec.push({id:'lc1', ten:'Họp tổ giả', ngay:'2026-10-20', lap:'mot', xong:false, xongNgay:{}, bo:[]}); LICH.viecChon = 'lc1';
   lcXoa(); await w(100);
   ok('xóa việc lịch: không hỏi, vào ngăn Mục nhỏ', !hopMo() && !lcTim('lc1') && D.rac.length===1 && nganRac(D.rac[0])==='mucNho' && /Họp tổ giả/.test(D.rac[0].tenMoi));
   khoiPhucRac([D.rac[0].id]); ok('khôi phục việc lịch về lịch', !!lcTim('lc1') && !lcData().daXoa.some(x=>x.id==='lc1') && D.rac.length===0);
   /* lần làm việc */
   /* 3.399: bỏ phần thử 🗑 lần làm việc (⚠ Theo dõi nợ đã gỡ) */
   /* bộ biểu mẫu */
   dsBo().push({ten:'Bộ giả', mau:[]}); const nb = dsBo().length; xoaBo(nb-1); await w(100);
   ok('xóa bộ biểu mẫu: không hỏi, vào Thùng rác', dsBo().length===nb-1 && D.rac.some(m=>m.loaiNho==='boBM')); dongHop();
   khoiPhucRac([D.rac.find(m=>m.loaiNho==='boBM').id]); ok('khôi phục bộ biểu mẫu', dsBo().length===nb && dsBo().some(x=>x.ten==='Bộ giả'));
   /* Thùng rác: ngăn Số liệu + Mục nhỏ, tự xóa 30 ngày bật sẵn */
   lcData().viec.push({id:'lc2', ten:'Việc cũ giả', ngay:'2026-08-01', lap:'mot', xong:false, xongNgay:{}, bo:[]}); LICH.viecChon = 'lc2'; lcXoa();
   D.rac.push({id:'slrGIA', khoCu:'soLieu', tenMoi:'Nợ quá hạn · T9/2026 — giả.xlsx', xoaLuc:new Date().toISOString(), sl:{loai:'nqh', ky:'2026-09', e:{loai:'nqh', ky:'2026-09'}}, kA:'slr_x_a', kG:'slr_x_g'});
   moDonKho('rac'); await w(300);
   const dk = document.getElementById('ds-vb').textContent;
   ok('Thùng rác có ngăn 📈 Số liệu và 🗒 Mục nhỏ, ghi "Trước ở: …"', /📈 Số liệu/.test(dk) && /🗒 Mục nhỏ/.test(dk) && /Trước ở: Số liệu › /.test(dk) && /Trước ở: Hôm nay › Lịch/.test(dk));
   const cb = [...document.querySelectorAll('#ds-vb .dk-bat input')][0];
   ok('"Tự xóa hẳn rác cũ hơn 30 ngày" bật sẵn', cb && cb.checked && D.cauHinh.racTuXoa===undefined);
   dongDonKho();
   D.rac.forEach(m=>{ if(m.loaiNho==='lich') m.xoaLuc = new Date(Date.now()-40*864e5).toISOString(); });
   TU_DON_RAC = false; tuDonRac(); await w(400);
   ok('mục quá 30 ngày tự xóa hẳn (mặc định), mục mới giữ lại', !D.rac.some(m=>m.loaiNho==='lich') && D.rac.some(m=>m.id==='slrGIA'));
   ok('không còn hàm hoàn tác lần thay của Số liệu', typeof slHoanTac==='undefined' && typeof slGiuTruoc==='undefined');
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
