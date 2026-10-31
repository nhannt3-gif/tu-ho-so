// 3.407 (anh 30/10 qua TK 1 — docs/AP_KP_CU.md): ghi chú ấp / KP cũ (js/83, cắm rút) — chỉ tham khảo, không đổi số.
//   ① LỌC ĐỊA BÀN: nút 🏷 Tên ấp cũ mặc định TẮT, bật → ghi chú các ấp / KP trong phạm vi; ② dòng nhỏ 4 KP Gia Lộc khi toàn PGD / Phường Gia Lộc (cờ AP_CU_GIA_LOC);
//   ③ 🗺 Địa bàn: ghi chú cạnh ấp + gợi ý 📝. Ghép theo mã ấp. Bộ GIẢ tests/gianho31 (có ấp 54003407 ở Phường Gia Lộc 540034).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   ok('bảng 19 ấp / KP theo mã (AP_KP_CU), có 4 KP Gia Lộc', Object.keys(AP_CU).length===19 && ['54003406','54003407','54003408','54003409'].every(m=>AP_CU[m] && AP_CU[m][0]==='Phường Gia Lộc') && /Phước Đức B/.test(apCuGhi('54003407')));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; delete D.cauHinh.pvApCu; Object.assign(tcCH(), {xa:'', diem:'', hoi:'', ap:'', to:''});
   doiNgan(7); slDoiTab('tra'); await tcNap(); await w(500); pvVeCay('tc'); await w(100);
   const cay = () => document.getElementById('tc-cay'), gl = () => cay().querySelector('.pv-apcu-gl'), nut = () => cay().querySelector('[data-lenh="apcu.bat"]');
   ok('3.416.1 toàn PGD: không hiện nút / chữ ấp cũ (không tốn dòng)', !gl() && !nut());
   pvChon('tc', 'xa', '540034'); await w(300);
   ok('② mở Phường Gia Lộc: chữ 4 KP Gia Lộc trên dải tiêu đề LỌC ĐỊA BÀN (không thêm dòng)', !!gl() && /Gia Lộc đổi tên KP từ 01\/7\/2026/.test(gl().textContent) && /Suối Cao B → Suối Cao/.test(gl().title) && !!gl().closest('.pv-dau'));
   ok('① nút 🏷 Tên ấp cũ cùng hàng, MẶC ĐỊNH TẮT (chưa hiện danh sách)', !!nut() && !!nut().closest('.pv-hang1') && !cay().querySelector('.pv-apcu-ds'), nut() && nut().textContent);
   nut().click(); await w(200);
   ok('① bật → hiện ghi chú ấp trong phạm vi (Phước Đức — trước là KP Phước Đức B), lưu cờ', D.cauHinh.pvApCu===true && /Phước Đức.*trước là KP Phước Đức B/.test((cay().querySelector('.pv-apcu-ds')||{}).textContent||''));
   pvChon('tc', 'xa', '540035'); await w(300);
   ok('chọn Phường Gò Dầu → không còn dòng Gia Lộc', !gl());
   const coAp = Object.keys(AP_CU).some(m=>m.slice(0, 6)==='540035');
   ok('xã không có ấp đổi tên → không hiện nút', coAp ? !!nut() : !nut(), coAp);
   pvChon('tc', 'xa', '540034'); await w(300);
   ok('chọn Phường Gia Lộc → có dòng Gia Lộc', !!gl());
   AP_CU_GIA_LOC = false; pvVeCay('tc'); await w(100);
   ok('cờ AP_CU_GIA_LOC = false → gỡ dòng Gia Lộc (nút ghi chú vẫn còn)', !gl() && !!nut()); AP_CU_GIA_LOC = true;
   nut().click(); await w(150); ok('bấm lại → tắt', D.cauHinh.pvApCu===false && !cay().querySelector('.pv-apcu-ds'));
   /* ③ 🗺 Địa bàn */
   DBSL.K = null; DBSL.ky = ''; DBSL.xem = 'sl'; const box = document.createElement('div'); document.body.appendChild(box); box.innerHTML = ccDiaBanHTML(); for(let i=0;i<60 && !document.getElementById('dbsl-cay');i++) await w(200);
   ok('③ 🗺 Địa bàn: ghi chú 🏷 cạnh ấp 54003407', /🏷 trước là KP Phước Đức B/.test(document.getElementById('dbsl-cay').textContent));
   const c0 = dbslCay(DBSL.K).find(x=>x.ma==='540034'), d0 = c0 && c0.diem.find(d=>d.ap.some(a=>a.ma==='54003407'));
   ok('③ 💡 gợi ý ghi chú điểm GD có dòng tên cũ', !!d0 && /Phước Đức B/.test(dbslGoiY(dbslKhoaDiem(c0, d0))));
   box.remove(); Object.assign(tcCH(), {xa:'', diem:'', hoi:'', ap:'', to:''});
   /* không đổi số: cây tổ giống hệt khi gỡ file */
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
