// 3.146 — Kiểm tra kỳ (anh chốt 10/10/2026): bỏ hẳn chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã kiểm, sau lần đổi file cuối);
//        chênh lệch giữa các file chỉ ghi nhận (không ảnh hưởng Đạt); theo loại báo cáo; meta cũ có SLM.chot vẫn đọc được. Dữ liệu GIẢ (chỉ meta, không bảng).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const K = '2026-09', dat = (l, x) => { SLM.bang[slKhoa(l, K)] = Object.assign({loai:l, ky:K, ngay:'2026-09-30', soDong:10, luc:'2026-10-01T0'+(Object.keys(SLM.bang).length%10)+':00:00Z', tenFile:l+'.xlsx', tong:{n:10, dn:1e6}, choDay:false}, x||{}); };
   const kiem = (lech) => { SLM.kt[K] = {luc:new Date().toISOString(), dau:slDauKy(K), dem:{ok:5, lech:lech||0, canh:0}, kq:[{nhom:7, ten:'BCDHTD 01.1 ↔ LEN_31 XAPUONG từng xã', kq:lech ? 'lech' : 'ok', chu:lech ? '1 dòng lệch' : 'khớp', cot:['Xã','Chênh'], ds:lech ? [['Xã Giả', 1000]] : []}]}; };
   /* 1. bỏ chốt */
   ok('không còn hàm chốt / khóa tháng', ['slChot','slKhoaO','slKhoaBao','slChotHop','slChotGhi','slMoKhoa','slDatChot'].every(f=>typeof window[f]==='undefined'));
   const m = slChuanMeta({bang:{}, chot:{'2026-08':{khoa:true, luc:'2026-09-01'}}});
   ok('meta cũ có chốt tháng: đọc được, bỏ phần chốt', !('chot' in m) && !!m.bang);
   ok('gộp meta máy khác (bản cũ có chốt) không lỗi', (()=>{ try{ slGopMeta({bang:{}, chot:{'2026-08':{khoa:true, luc:'2026-09-01'}}}); return !SLM.chot; }catch(e){ return false; } })());
   /* 2. thiếu file → chưa Đạt */
   ['hstd','dnct','dsto','bx','bc','lx','lh','lc'].forEach(l=>dat(l)); kiem();
   let g = slDanhGia(K);
   ok('thiếu LEN_31 TO_TRUONG → chưa Đạt, ghi thiếu gì', !g.dat && g.thieu.length===1 && /TO_TRUONG/.test(g.thieu[0]), g.thieu.join());
   /* 3. đủ 9 file nhưng chưa kiểm lại sau khi đổi file → chưa Đạt */
   dat('lt'); g = slDanhGia(K);
   ok('đủ 9 file, dữ liệu đổi sau lần kiểm → chưa Đạt (cần kiểm lại)', !g.dat && !g.thieu.length && !g.daKiem);
   kiem(); g = slDanhGia(K);
   ok('đủ 9 file + đúng kỳ + đúng cấu trúc + đã kiểm → ✓ Đạt', g.dat, JSON.stringify({thieu:g.thieu, ky:g.ky, ct:g.ct}));
   /* 4. chênh lệch chỉ ghi nhận */
   kiem(3); ok('có 3 mục chênh lệch giữa các file → VẪN Đạt (chỉ ghi nhận)', slDanhGia(K).dat);
   /* 5. sai kỳ / sai cấu trúc */
   dat('bx', {ngay:'2026-09-15'}); kiem(); g = slDanhGia(K);
   ok('file có ngày số liệu không phải cuối tháng → chưa Đạt (sai kỳ)', !g.dat && g.ky.length===1 && /15\/09\/2026/.test(g.ky[0]), g.ky.join());
   dat('bx'); dat('lx', {soDong:0}); kiem(); g = slDanhGia(K);
   ok('file 0 dòng dữ liệu → chưa Đạt (sai cấu trúc)', !g.dat && g.ct.length===1, g.ct.join());
   dat('lx', {bo:{sai:3}}); dat('dsto', {nguonKy:'anh chọn'}); kiem(); g = slDanhGia(K);
   ok('dòng sai mã khóa / ngày anh khai → chỉ lưu ý, vẫn Đạt', g.dat && g.luuY.length===2, g.luuY.join(' | '));
   /* 6. theo loại báo cáo */
   const bc = g.bc.map(x=>x.ten+':'+x.thieu.length).join(' | ');
   ok('theo loại báo cáo: Tổ / Sao kê đủ, Tổng hợp tổng quan đủ, KTGS thiếu 2 (BC0437 / BC0438)', g.bc[0].thieu.length===0 && g.bc[1].thieu.length===0 && g.bc[2].thieu.length===2, bc);
   /* 7. giao diện tab Nạp & KT */
   SL_KY = K; moNapSL(); await w(600);
   const tr7 = document.getElementById('tr7').textContent;
   ok('khung kiểm: 4 bước Đủ file · Đúng kỳ · Đúng cấu trúc · Đã kiểm, báo ✅ Đạt', /Đủ file/.test(tr7) && /Đúng kỳ/.test(tr7) && /Đúng cấu trúc/.test(tr7) && !!document.querySelector('.sl-dat') && document.querySelectorAll('.sl-4buoc .xong').length===4);
   ok('không còn nút Chốt / Mở khóa, không 🔒', !/Chốt tháng|Mở khóa|🔒/.test(tr7));
   ok('dòng ①: pill "✓ Đạt"', /✓ Đạt/.test(document.querySelector('.sl-tt').textContent), document.querySelector('.sl-tt').textContent.replace(/\s+/g,' ').slice(0, 120));
   ok('tiêu đề cột tháng Đạt: ✓ xanh', !!document.querySelector('.sl-bang thead th.dat') && /✓/.test(document.querySelector('.sl-bang thead th.dat').textContent));
   kiem(2); veSoLieu(); await w(400);
   ok('có chênh lệch: mục "Ghi nhận chênh lệch — chỉ để biết" + pill vẫn Đạt', !!document.querySelector('.sl-kt-ghi') && /✓ Đạt · 2 chênh lệch ghi nhận/.test(document.querySelector('.sl-tt').textContent));
   delete SLM.bang[slKhoa('lt', K)]; veSoLieu(); await w(400);
   ok('xóa 1 file → khung báo Chưa Đạt + thiếu file', /Chưa Đạt — Thiếu file/.test(document.getElementById('tr7').textContent));
   ok('chọn tháng không còn 🔒 trong hộp chọn', (slChonThangHop(2026), !/🔒/.test(document.querySelector('.sl-luoi-thang').textContent))); dongHop();
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
