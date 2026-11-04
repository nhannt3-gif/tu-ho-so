// t374 (3.474–3.475, Đ4 kế hoạch dọn — bỏ onclick viết thẳng): nút đã chuyển sang data-lenh phải GỌI ĐÚNG HÀM CŨ với đúng tham số, không nút nào "Chưa có lệnh".
//   ① menu chuột phải danh sách file (menu.*) — mục giả, các hàm đích thay bằng bộ ghi · ② Nạp & KT (nkt.*) — hộp chọn tháng, ô ma trận, Kiểm tra kỳ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], canh = [];
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e=>loi.push(e.message)); p.on('console', m=>{ if(/Chưa có lệnh/.test(m.text())) canh.push(m.text()); });
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const o = await p.evaluate(async(files)=>{ await xongTV; try{ dongHop(); }catch(e){} const o = [], w = t=>new Promise(r=>setTimeout(r, t)), ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined && !d ? ' — '+c : ''));
   window.SL_KHONG_TU_KIEM = 1; const goi = [], ghi = ten => function(){ goi.push(ten+'('+[].slice.call(arguments).map(x=>typeof x==='string' ? x : JSON.stringify(x)).join(',')+')'); };
   /* ① menu chuột phải — mục giả (Excel, có Drive) */
   const id = 'gia374'; window.timMuc = x=>x===id ? {id, tenMoi:'Bao cao gia.xlsx', driveId:'d1'} : null; window.coCauNoi = ()=>true; window.laBieuMau = ()=>false;
   ['moXem', 'guiNhanh', 'inTheoId', 'suaCho', 'moTrenDrive', 'moThuMucMuc', 'cnHanh', 'chepDuongMay', 'batTatPV', 'chepTen', 'moChepAI', 'moBangOffice', 'xoaVaoRac'].forEach(f=>{ window[f] = ghi(f); });
   window.thuMucCua = m=>'G:/thu muc/'+m.id;
   moMenu({stopPropagation(){}, clientX:100, clientY:100}, id); await w(100);
   const nut = [...document.querySelectorAll('#menu button')];
   ok('menu: mọi nút dùng data-lenh="menu.*", không còn onclick', nut.length>=14 && nut.every(x=>/^menu\./.test(x.getAttribute('data-lenh')||'') && !x.hasAttribute('onclick')), nut.length);
   for(const x of nut){ moMenu({stopPropagation(){}, clientX:100, clientY:100}, id); await w(20); document.querySelector('#menu [data-lenh="'+x.getAttribute('data-lenh')+'"]'+(x.getAttribute('data-v') ? '[data-v="'+x.getAttribute('data-v')+'"]' : '')).click(); await w(20); }
   const g = goi.join(' ');
   ok('menu: gọi đúng hàm cũ với mã mục — xem, gửi, in, sửa, Drive, máy tính (mở / xem / chép / thư mục), đường dẫn, tên, AI, Excel, xóa',
     ['moXem(gia374)', 'guiNhanh(gia374)', 'inTheoId(gia374)', 'suaCho(gia374)', 'moTrenDrive(gia374)', 'moThuMucMuc(gia374)', 'cnHanh(mo,muc,gia374)', 'cnHanh(xem,muc,gia374)', 'cnHanh(chep,muc,gia374)',
      'cnHanh(thumuc,muc,gia374)', 'chepDuongMay(G:/thu muc/gia374)', 'batTatPV()', 'chepTen(gia374)', 'moChepAI(gia374)', 'moBangOffice(gia374,excel)', 'xoaVaoRac(gia374)'].every(x=>g.indexOf(x)>=0), g);
   ok('menu: bấm xong menu đóng', !document.getElementById('menu').classList.contains('hien'));
   /* ② Nạp & KT */
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   doiNgan(7); slDoiTab('nkt'); await w(800);
   const sl = document.getElementById('so-lieu') || document.body;
   ok('Nạp & KT: không còn onclick / onchange / oninput viết thẳng', !document.querySelector('[onclick^="sl"], [onclick*="dongHop();sl"], [onchange^="sl"], [oninput^="sl"]'));
   slChonThangHop(2026); await w(200); const th = document.querySelector('#hop-in [data-lenh="nkt.chonThang"]');
   ok('hộp chọn tháng: nút tháng = nkt.chonThang (đóng hộp trước), năm ‹ › = nkt.thangHop', !!th && th.getAttribute('data-dong')==='1' && document.querySelectorAll('#hop-in [data-lenh="nkt.thangHop"]').length===2);
   document.querySelector('#hop-in [data-lenh="nkt.thangHop"]').click(); await w(200); ok('‹ năm trước → hộp năm 2025', /Năm 2025/.test(document.getElementById('hop-in').textContent));
   dongHop(); await w(100);
   const goc = {kiem:window.slKiemTra}; window.slKiemTra = ghi('slKiemTra'); goi.length = 0;
   const nk = document.querySelector('[data-lenh="nkt.kiem"]'); if(nk) nk.click(); await w(100); window.slKiemTra = goc.kiem;
   ok('nút 🔍 Kiểm tra kỳ → slKiemTra(kỳ đang xem)', /slKiemTra\(\d{4}-\d{2}/.test(goi.join(' ')), goi.join(' '));
   const oO = document.querySelector('[data-lenh="nkt.oBam"], [data-lenh="nkt.moNgay"], [data-lenh="nkt.napMot"]');
   ok('ô ma trận mang đủ loại file + kỳ (data-a, data-b)', !!oO && !!oO.getAttribute('data-a') && !!oO.getAttribute('data-b'));
   return o; }, files);
 o.push((canh.length ? '✗ ' : '✓ ')+'không nút nào "Chưa có lệnh"'+(canh.length ? ' — '+canh.slice(0, 3).join(' | ') : ''));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t374 SAI '+sai : '✓ t374 đạt '+o.length); await b.close(); process.exit(sai ? 1 : 0); })();
