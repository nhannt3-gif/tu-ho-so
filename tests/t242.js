// 3.327 (anh chốt 23/10) — cây địa bàn nhúng dùng chung CAY (js/57): 4 nơi chọn địa bàn trong form / hộp khai báo cùng 1 nguồn danh sách + 1 kiểu ô chọn
//   (👪 Hộ vay, lập 01/TD, khai nhanh 01/TGTV, ⚙ Khai báo chung › Trưởng ấp / Tổ phó). Bộ GIẢ tests/gianho31.
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
   kyChungDoi('2026-08'); slDoiTab('to'); doiNgan(7); await w(1200);
   /* 1. dữ liệu */
   const X = hmDiaBan(), xs = CAY.dsXa();
   ok('CAY.dsXa = mọi xã trong cây tổ', xs.length===Object.keys(X).length && xs.length>0, xs.map(x=>x[1]).join(', '));
   const xa = xs[0][0], aps = CAY.dsAp(xa);
   ok('CAY.dsAp: khóa ấp khớp hmDiaBan, có tên ấp', aps.length===Object.keys(X[xa].ap).length && aps.every(a=>X[xa].ap[a[0]] && a[1]));
   const d0 = CAY.dsDiem(xa)[0], apD = d0 ? CAY.dsAp(xa, d0[0]) : aps;
   ok('CAY.dsAp lọc theo điểm GD', apD.every(a=>a[2].diem[d0 ? d0[0] : Object.keys(a[2].diem)[0]]));
   const tos = CAY.dsTo({xa:xa}), t = tos[0];
   ok('CAY.dsTo theo xã (bỏ vay trực tiếp), lọc thêm ấp', tos.length>0 && tos.every(z=>z.xa===xa && !toLaTT(z)) && CAY.dsTo({xa:xa, thon:t.thon, tenThon:t.tenThon}).every(z=>z.thon===t.thon || z.tenThon===t.tenThon));
   const h = CAY.o('xa', xa, '— Xã —', xs, 'data-x="1"');
   ok('CAY.o: ô chọn kiểu gọn, tô màu khi đã chọn, giữ thuộc tính nơi gọi', /class="pv-o cay-o pv-xa co"/.test(h) && /data-x="1"/.test(h) && /selected/.test(h));
   /* 2. 👪 Hộ vay */
   slDoiTab('hsv'); doiNgan(7); await w(1000); hsoChonMau('sohv'); await w(400);
   if(typeof hmMo==='function') hmMo(); await w(500);
   const dc = document.querySelector('.hm-dc');
   ok('👪 Hộ vay: ô Xã › Điểm › Ấp › Tổ là cây nhúng chung', !!dc && !!dc.querySelector('.cay-nhung select.cay-o[data-hm="xa"]'), dc ? '' : 'không mở được form');
   if(dc){ const sx = dc.querySelector('select[data-hm="xa"]'); sx.value = xa; sx.dispatchEvent(new Event('change')); await w(300);
     const sa = document.querySelector('.hm-dc select[data-hm="ap"]'), st = document.querySelector('.hm-dc select[data-hm="to"]');
     ok('👪 Hộ vay: chọn xã → có ô Ấp, Tổ (đủ danh sách)', !!sa && !!st && sa.options.length-1===aps.length && st.options.length-1===tos.length);
     sa.value = aps[0][0]; sa.dispatchEvent(new Event('change')); await w(300);
     ok('👪 Hộ vay: chọn ấp → ghi thôn / tên thôn vào hộ (như cũ)', HM.xa===xa && (HM.thon===aps[0][2].thon) && HM.tenThon===aps[0][2].tenThon);
     dongHop(); await w(200); }
   /* 3. ⚙ Khai báo chung › Trưởng ấp */
   hsoKBHop('ap'); await w(400);
   const kb = document.querySelector('.hso-kb-loc .cay-nhung select.cay-o.pv-xa');
   ok('⚙ Khai báo chung: lọc Xã / Điểm GD là cây nhúng chung', !!kb);
   if(kb){ kb.value = xa; kb.dispatchEvent(new Event('change')); await w(300); ok('⚙ Khai báo chung: chọn xã → lọc ấp + hiện ô Điểm GD', HSO_KBT.xa===xa && (!CAY.dsDiem(xa).length || !!document.querySelector('.hso-kb-loc select.pv-diem'))); }
   dongHop(); await w(200);
   /* 4. 01/TGTV */
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t242 đạt'); await b.close(); process.exit(sai?1:0);
})();
