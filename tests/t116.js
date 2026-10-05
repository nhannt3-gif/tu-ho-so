// 3.112 — Kế hoạch KTGS: chọn căn cứ 727 (mặc định) hoặc hướng dẫn cũ 10566 (kế hoạch lập trước 727), áp cả khuôn ① ②,
//        chỉ thay dòng căn cứ đầu, nhớ theo Hội, tên file có "(can cu 10566)", bản In cùng nội dung.
// Bộ GIẢ: tests/gia31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const chu = x => x.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const t0 = Object.values(KT_K.to).find(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa);
   C.che = 'kh'; C.khNam = 2026; C.xa = t0.xa; C.hoi = String(t0.dv); ktVeThe(); await w(200);
   const the = () => document.getElementById('kt-the').textContent;
   ok('màn Kế hoạch có chọn căn cứ 727 / 10566, mặc định 727', /Căn cứ:/.test(the()) && /10566 \(trước 727\)/.test(the()) && ktKHCC()==='727');
   for(const mau of ['1', '2']){
     const ten = mau==='1' ? 'khuôn ①' : 'khuôn ②'; ktKHDoiMau(mau);
     ktKHDoiCC('727'); const g7 = ktKHGiaTri(), d7 = await docx(await ktDocx(g7.mau, g7)), c7 = chu(d7);
     ktKHDoiCC('10566'); const g1 = ktKHGiaTri(), d1 = await docx(await ktDocx(g1.mau, g1)), c1 = chu(d1);
     ok(ten+': căn cứ 727 như cũ', c7.indexOf(KT_CC727)>=0 && c7.indexOf('10566')<0);
     ok(ten+': chọn 10566 → dòng căn cứ hướng dẫn cũ, không còn 727, Word hợp lệ', hopLe(d1) && d1.indexOf('{{')<0 && c1.indexOf(KT_CC10566)>=0 && c1.indexOf('727/HD-NHCS')<0);
     ok(ten+': chỉ thay đúng 1 dòng (phần còn lại giống hệt)', c1.replace(KT_CC10566, KT_CC727)===c7);
     ok(ten+': bản In cùng căn cứ', ktHTML01(g1).indexOf('10566/HD-NHCS ngày 29/12/2022')>=0 && ktHTML01(g7).indexOf('727/HD-NHCS')>=0);
   }
   ok('nhớ lựa chọn theo Hội', ktHoiKB(t0.xa+'|'+t0.dv).ccKH==='10566' && ktKHCC()==='10566');
   ktKHXem(1); await w(300); ktKHIn('word'); await w(1200);
   ok('tên file Word có "(can cu 10566)"', Object.keys(F).some(n=>/\(can cu 10566\)/.test(n)), Object.keys(F).join(' | '));
   ktKHDoiCC('727'); ok('về 727: xóa lựa chọn đã nhớ', !ktHoiKB(t0.xa+'|'+t0.dv).ccKH && ktKHCC()==='727');
   ktKHDoiMau('1'); C.che = 'dx'; C.xa=''; C.hoi='';
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
