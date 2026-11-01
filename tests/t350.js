// 3.433 (anh 01/11, ảnh Tra cứu khách "Ấp · xã: Thuận Tân, Vay trực tiếp"): dòng vay trực tiếp Mẫu 31 ghi Tên xã "… Vay trực tiếp"
//   → tên xã hiển thị lấy theo tổ cùng mã xã (xaTenSach); danh bạ không lấy tên dạng "trực tiếp". Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const th = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort().pop();
   kyChungDoi(th); slDoiTab('hsv'); doiNgan(7); await w(1500);
   const t = Object.values(TO_K.to).find(x=>!toLaTT(x) && x.xa && x.tenXa);
   ok('xaTenSach: tên "Vay trực tiếp" → tên xã của tổ cùng mã xã', xaTenSach(t.xa, 'Vay trực tiếp')===t.tenXa && xaTenSach(t.xa, 'Xã A Vay trực tiếp')===t.tenXa, t.tenXa);
   ok('xaTenSach: tên đúng giữ nguyên', xaTenSach(t.xa, 'Xã Thử')==='Xã Thử');
   D.cauHinh.diaBan = (D.cauHinh.diaBan||[]).concat([{ma:'999999', xa:'Xã Danh Mục'}]);
   ok('xaTenSach: mã xã không có tổ → danh mục ⚙ Cài đặt; không có → trống (không in "trực tiếp")', xaTenSach('999999', 'Vay trực tiếp')==='Xã Danh Mục' && xaTenSach('888888', 'Vay trực tiếp')==='');
   const c = {xa:t.xa, tenXa:'Vay trực tiếp', tenThon:'Ấp Giả', to:t.ma};
   ok('Tra cứu: nơi ở gọn không còn "trực tiếp"', !/trực tiếp/i.test(tcNoiGon(c)) && tcNoiGon(c).indexOf(String(t.tenXa).replace(/^(Xã|Phường|Thị trấn)\s+/i, ''))>=0, tcNoiGon(c));
   ok('Hồ sơ (09A / 06A / 01TD): địa chỉ không còn "trực tiếp"', !/trực tiếp/i.test(hsoDiaChi(c, t)), hsoDiaChi(c, t));
   const ma = Object.keys(SL_DB.kh)[0]; ok('danh bạ khách: không có tên xã dạng "trực tiếp"', !Object.values(SL_DB.kh).some(k=>/tr[ựu]c ti[ếe]p/i.test(k.tenXa||'')));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t350 đạt'); await b.close(); process.exit(sai?1:0);
})();
