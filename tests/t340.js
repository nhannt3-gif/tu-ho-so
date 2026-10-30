// 3.416.1 (anh 31/10, hộp Sửa bản quét tài liệu: "cho hiện ds tổ của ấp ra chọn luôn") — danh mục địa bàn chưa khai tổ → ô Tổ TK&VV + nút chọn nhanh
//   lấy tổ của ấp từ Mẫu 31 (khớp tên xã / ấp, bỏ chữ "Xã", "Ấp"…). Bộ GIẢ gianho31.
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
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   const K = await KHO.nap('2026-08'); KHO.datKy(K);
   const t0 = KHO.maTo().map(m=>KHO.to(m)).find(t=>t && !t.trucTiep && !toLaTT(t) && t.tenThon), canAp = KHO.maTo().map(m=>KHO.to(m)).filter(t=>t && !t.trucTiep && !toLaTT(t) && t.xa===t0.xa && t.tenThon===t0.tenThon);
   const giu = D.cauHinh.diaBan; D.cauHinh.diaBan = [{xa:t0.tenXa, diem:[{ten:'Điểm Giả', ap:[{ten:t0.tenThon, to:[]}]}]}];
   const ds = dsTo(t0.tenXa, 'Điểm Giả', t0.tenThon);
   ok('danh mục chưa khai tổ → lấy tổ của ấp từ Mẫu 31', ds.length===canAp.length && ds.every(x=>/^\d+ — /.test(x)), ds.length+' / '+canAp.length+' · '+ds.slice(0, 2).join(' | '));
   ok('khớp tên bỏ chữ "Xã" / "Ấp" (danh mục ghi khác Mẫu 31)', dsTo(t0.tenXa.replace(/^(Xã|Phường)\s+/i, ''), '', 'Ấp '+t0.tenThon.replace(/^(ấp|thôn|kp)\s+/i, '')).length===canAp.length);
   window.__k = {xa:t0.tenXa, diem:'Điểm Giả', ap:t0.tenThon, to:''}; const box = document.createElement('div'); box.id = 'k-diaban'; box.innerHTML = veDiaBan(window.__k); document.body.appendChild(box);
   ok('ô Tổ TK&VV có danh sách + nút chọn nhanh', box.querySelectorAll('#k-to option').length===canAp.length+2 && box.querySelectorAll('.db-to').length===canAp.length, box.querySelectorAll('.db-to').length);
   box.querySelector('.db-to').click(); await w(50);
   ok('bấm nút tổ → chọn tổ đó', window.__k.to===ds[0] && document.getElementById('k-to').value===ds[0], window.__k.to);
   D.cauHinh.diaBan = [{xa:t0.tenXa, diem:[{ten:'Điểm Giả', ap:[{ten:t0.tenThon, to:['99 — Tổ Khai Tay']}]}]}];
   ok('danh mục đã khai tổ → dùng danh mục như cũ', dsTo(t0.tenXa, 'Điểm Giả', t0.tenThon).join()==='99 — Tổ Khai Tay');
   box.remove(); D.cauHinh.diaBan = giu;
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
