// 3.490 (anh 07/11 "Word giống bản in") — hsoDocx đọc style bản in trong khối mẫu NỀN Ô (.om-goc / .om-co): canh đều / giữa, thụt đầu dòng, cỡ chữ thân mẫu,
//   giãn dòng cố định đúng pt, cách đoạn (gộp như bản in), khung "Mẫu số" trên–phải, khối chú thích đáy trang, ô nhiều dòng, bảng không khai data-w. Mẫu khác xuất như cũ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const xml = async(mk, tab)=>{ slDoiTab(tab); await w(700); const C = hsoCH(); if(!C.to){ const t = Object.keys(TO_K.to).map(m=>KHO.to(m)).find(t=>t && !toLaTT(t)); C.xa = t.xa; C.diem = t.khoaDiem; C.to = t.ma; }
     hsoChonMau(mk); await w(500); const bl = await hsoDocx(hsoLap()); const z = await JSZipDoc(bl); return z; };
   window.JSZipDoc = async(bl)=>{ const buf = new Uint8Array(await bl.arrayBuffer()); let s = ''; for(let i=0;i<buf.length;i++) s += String.fromCharCode(buf[i]); return s; };   /* zip lưu không nén → đọc thẳng chữ XML */
   const a = await xml('10a', 'hst');
   ok('10A Word: có đoạn canh đều 2 bên (jc both) và thụt đầu dòng 12,7 mm', /w:jc w:val="both"/.test(a) && /w:firstLine="720"/.test(a));
   ok('10A Word: cỡ chữ thân mẫu 14 (sz 28)', (a.match(/w:sz w:val="28"/g)||[]).length > 50);
   ok('10A Word: giãn dòng cố định đúng pt bản in (17 pt = 340)', /w:line="340" w:lineRule="exact"/.test(a));
   ok('10A Word: hộp "Mẫu số 10A/TD" là khung nổi trên–phải (không đẩy nội dung)', /<w:framePr[^>]*w:xAlign="right"/.test(a));
   const g = await xml('06a', 'hsv');
   ok('06A Word: cỡ chữ 13,5 (sz 27), có thụt đầu dòng 10 mm', /w:sz w:val="27"/.test(g) && /w:firstLine="567"/.test(g));
   ok('06A Word: không có khoảng cách âm (Word không nhận)', !/w:before="-/.test(g) && !/w:after="-/.test(g));
   const q = await xml('01gqvl', 'hsv');
   ok('01/GQVL Word: bảng không khai data-w → không còn cột rộng 0', !/<w:tcW w:w="0"/.test(q));
   const s = await xml('sohv', 'hsv');
   ok('mẫu không nền ô (Sổ hộ vay): không thêm khung nổi / giãn cố định của nền ô', !/<w:framePr/.test(s));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t379 đạt'); await b.close(); process.exit(sai?1:0);
})();
