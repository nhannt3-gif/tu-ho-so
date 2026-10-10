// 3.143 (Q14) — ngày số liệu lấy từ NỘI DUNG file; file không ghi ngày → anh khai khi nạp, tên file chỉ là gợi ý.
//        Bộ GIẢ tests/gianho31: Mẫu 31 + Tổng dư nợ có cột ngày trong file; KHĐ, Nợ quá hạn, Nợ khoanh, Thông tin tổ trưởng chỉ có ngày trên tên file.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.addInitScript(() => { window.KHAI_TU_DONG = false; });   /* tắt giả lập khai ngày của tv.js — kiểm đúng hành vi app */
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = (f, ten) => { const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], ten||f.n); };
   const F = n => files.find(f=>f.n.indexOf(n)>=0);
   /* 1. đọc từng file */
   const m31 = await slDocFile(tep(F('31-08-2026.XLSX'))), khd = await slDocFile(tep(F('KHD'))), tt = await slDocFile(tep(F('to truong')));
   ok('Mẫu 31 có cột ngày trong file → tự nhận, không cần khai', m31.ky==='2026-08' && !m31.canKhai && m31.nguonKy==='cột ngày trong file', m31.ky+' · '+m31.nguonKy);
   ok('KHĐ không ghi ngày trong file → cần khai, ô Kỳ trống (không tự lấy tên file)', khd.canKhai===true && khd.ky==='' && khd.ngay==='' && khd.goiYTen==='2026-08-31', JSON.stringify({ky:khd.ky, g:khd.goiYTen}));
   ok('Thông tin tổ trưởng "T8 2026" trên tên file → gợi ý 31/08, vẫn phải khai', tt.canKhai===true && tt.ky==='' && tt.goiYTen==='2026-08-31');
   const kTrong = await slDocFile(tep(F('KHD'), 'Mon vay 3 thang KHD.xlsx'));
   ok('tên file không có ngày → cần khai, không có gợi ý', kTrong.canKhai===true && !kTrong.ky && !kTrong.goiYTen);
   ok('chưa khai → slGhi từ chối', await slGhi(khd).then(()=>false, ()=>true));
   /* 2. nạp cả bộ — xem trước */
   doiNgan(7); await w(300);
   slDocNhieu(files.map(f=>tep(f))); for(let i=0;i<80 && !document.querySelector('.sl-xt');i++) await w(250);
   const hang = n => { const i = SL_NAP.findIndex(k=>k.ten.indexOf(n)>=0); return {i, tr: document.querySelectorAll('.sl-xt tbody tr')[i]}; };
   const hK = hang('KHD'), hM = hang('31-08-2026.XLSX');
   ok('xem trước: Mẫu 31 tự tích', hM.tr.querySelector('.sl-tich').checked && !hM.tr.querySelector('.sl-tich').disabled);
   ok('xem trước: KHĐ không tích, khóa ô tích, báo "Cần khai ngày" + gợi ý tên file', !hK.tr.querySelector('.sl-tich').checked && hK.tr.querySelector('.sl-tich').disabled && /Cần khai ngày/.test(hK.tr.textContent) && /31\/08\/2026/.test(hK.tr.textContent), hK.tr.querySelector('.sl-xt-tt').textContent.slice(0, 120));
   ok('xem trước: ô Kỳ KHĐ để trống', hK.tr.querySelector('input[type=date],input[type=month]').value==='');
   const chip = hK.tr.querySelector('.sl-goi-y'); ok('có nút gợi ý "Tên file: 31/08/2026 — dùng"', !!chip && /31\/08\/2026/.test(chip.textContent));
   chip.click(); await w(200);
   const hK2 = hang('KHD');
   ok('bấm gợi ý → có kỳ, tích được, ghi "theo anh khai", trạng thái báo ngày do anh khai', SL_NAP[hK2.i].ky==='2026-08' && !hK2.tr.querySelector('.sl-tich').disabled && /anh khai/.test(hK2.tr.textContent) && /do anh khai/.test(hK2.tr.querySelector('.sl-xt-tt').textContent), SL_NAP[hK2.i].ky);
   /* khai tay ô Kỳ cho Thông tin tổ trưởng (ngày khác gợi ý) */
   const hT = hang('to truong'), oT = hT.tr.querySelector('input[type=date],input[type=month]');
   oT.value = oT.type==='date' ? '2026-08-31' : '2026-08'; oT.dispatchEvent(new Event('change')); await w(200);
   ok('khai tay ô Kỳ → nhận, nguồn "anh chọn"', SL_NAP[hang('to truong').i].ky==='2026-08' && SL_NAP[hang('to truong').i].nguonKy==='anh chọn');
   /* tích các file đã có kỳ rồi ghi nhận */
   document.querySelectorAll('.sl-tich').forEach(c=>{ if(!c.disabled) c.checked = true; });
   slGhiDaTich(); for(let i=0;i<120 && !SLM.bang['khd|2026-08'];i++) await w(250); await w(500);
   const eK = SLM.bang['khd|2026-08'];
   ok('ghi nhận KHĐ vào ô T8, nguồn kỳ = anh chọn (anh khai)', !!eK && eK.nguonKy==='anh chọn', eK && eK.nguonKy);
   ok('file chưa khai (Nợ khoanh) không vào ma trận', !Object.keys(SLM.bang).some(k=>/^nk\|/.test(k)), Object.keys(SLM.bang).join());
   /* 3. nạp từng file: anh chọn loại + kỳ trước → không phải khai lại */
   const nk = await slDocFile(tep(F('Khoanh'))); slKiemMot(nk, 'nk', '2026-08'); await w(200);
   ok('nạp từng file (chọn kỳ trước): dùng kỳ anh chọn, ghi được', /^2026-08(-31)?$/.test(SL_NAP[0].ky) && SL_NAP[0].nguonKy==='anh chọn', SL_NAP[0].ky+' · '+SL_NAP[0].nguonKy);
   slGhiMot(); for(let i=0;i<80 && !SLM.bang['nk|2026-08'];i++) await w(250);
   ok('Nợ khoanh vào ô T8', !!SLM.bang['nk|2026-08']);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
