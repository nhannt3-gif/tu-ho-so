// 3.400 (anh chốt 28/10 — Tèo): TÊN CHUẨN file gốc <MÃ>_<YYYY-MM-DD> (loại trước, ngày sau; ô tháng → ngày cuối tháng, ô ngày → đúng ngày),
//        mọi chỗ hiện tên dùng tên chuẩn (+ "anh đặt"), báo Mẫu 31 ↔ File Tổ trưởng lệch ngày, sổ DANH_MUC_NAP.csv, 🏷 chuẩn hóa tên tháng cũ (Drive giả).
//        Bộ GIẢ tests/gianho31 (tạo: python3 tests/taogia.py 300 tests/gianho31 m31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = (f, ten) => { const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], ten||f.n); };
   /* 1. quy tắc tên */
   ok('ô tháng → MÃ + ngày cuối tháng, đuôi gốc chữ thường', slTenGoc({loai:'hstd', ky:'2026-10', ngay:'2026-10-31', tenFile:'abc.XLSX'})==='MAU31_2026-10-31.xlsx', slTenGoc({loai:'hstd', ky:'2026-10', tenFile:'abc.XLSX'}));
   ok('ô tháng không có ngay → vẫn ra ngày cuối tháng', slTenGoc({loai:'dsto', ky:'2026-02', tenFile:'x.xls'})==='TOTRUONG_2026-02-28.xls');
   ok('ô ngày (kỳ phiên) → đúng ngày', slTenGoc({loai:'hstd', ky:'2026-10-19', ngay:'2026-10-19', tenFile:'mau 31 nhanh.xlsx'})==='MAU31_2026-10-19.xlsx');
   ok('loại theo ngày (TK 105, phân kỳ) + biểu TW', slTenGoc({loai:'tk105', ky:'2026-10-31', tenFile:'a.pdf'})==='TK105_2026-10-31.pdf' && slTenGoc({loai:'bx', ky:'2026-09'})==='BCDHTD011_2026-09-30.xlsx');
   const ma = SL_LOAI.map(L=>slMaTen(L.k));
   ok('mỗi loại một MÃ riêng, chữ in hoa không dấu', ma.every(m=>/^[A-Z0-9]+$/.test(m)) && new Set(ma).size===ma.length, ma.join(' '));
   ok('tên hiện: tên chuẩn đậm + (anh đặt: …)', /<b>MAU31_2026-10-31\.xlsx<\/b> <small>\(anh đặt: mau 31 thang 10\.xlsx\)<\/small>/.test(slTenHTML({loai:'hstd', ky:'2026-10', tenFile:'mau 31 thang 10.xlsx'})));
   /* 2. xem trước khi nạp: tên sẽ lưu + báo thiếu File Tổ trưởng cùng ngày */
   doiNgan(7); await w(300);
   slDocNhieu([tep(files[0], 'mau 31 anh dat nhanh.XLSX')]); for(let i=0;i<80 && !document.querySelector('.sl-xt');i++) await w(250);
   const tr = document.querySelector('.sl-xt tbody tr');
   ok('xem trước hiện "→ lưu tên MAU31_2026-08-31.xlsx"', !!tr && /→ lưu tên MAU31_2026-08-31\.xlsx/.test(tr.textContent), tr && tr.querySelector('.sl-xt-ten').textContent);
   ok('xem trước báo chưa có File Tổ trưởng cùng ngày', !!tr && /Chưa có File Tổ trưởng cùng ngày 31\/08\/2026/.test(tr.textContent));
   ok('chỉ báo, vẫn tự tích ghi nhận', !!tr && tr.querySelector('.sl-tich').checked);
   slGhiDaTich(); for(let i=0;i<120 && !SLM.bang['hstd|2026-08'];i++) await w(250); await w(500);
   const e = SLM.bang['hstd|2026-08'];
   ok('ghi nhận: giữ tên anh đặt ở tenFile, lần thay 0', !!e && e.tenFile==='mau 31 anh dat nhanh.XLSX' && !e.lanThay);
   /* 3. sổ nạp */
   const csv = slDmnCsv('2026-08'), dong = csv.split('\r\n');
   ok('sổ nạp: BOM + 12 cột tiêu đề', csv.charCodeAt(0)===0xFEFF && dong[0].split(',').length===12 && /^﻿Tên chuẩn,Tên anh đặt,Mã/.test(dong[0]));
   ok('sổ nạp: dòng Mẫu 31 — tên chuẩn, tên anh đặt, Cuối tháng, ngày 31/08/2026, kiểm báo thiếu Tổ trưởng',
      /^MAU31_2026-08-31\.xlsx,mau 31 anh dat nhanh\.XLSX,MAU31,.*,Cuối tháng,31\/08\/2026,/.test(dong[1]) && /Chưa có File Tổ trưởng cùng ngày 31\/08\/2026/.test(dong[1]), dong[1]);
   ok('sổ nạp: ô có dấu phẩy được bọc nháy', slCsvO('a,b')==='"a,b"' && slCsvO('x"y')==='"x""y"' && slCsvO('ok')==='ok');
   ok('có File Tổ trưởng cùng ngày → hết báo', (function(){ SLM.bang['dsto|2026-08'] = {loai:'dsto', ky:'2026-08', ngay:'2026-08-31', tenFile:'ds to.xlsx'}; var r = slDmnKiem(e); delete SLM.bang['dsto|2026-08']; return r==='✓'; })());
   ok('Tổ trưởng khác ngày (19/10) với Mẫu 31 cuối tháng → báo', /Chưa có Mẫu 31 cùng ngày 19\/10\/2026/.test(slCapLech('dsto', '2026-10-19')));
   /* 4. thay file → lần thay + tên trước */
   const kq2 = await slDocFile(tep(files[0], 'M31 lan 2.xlsx')); await slGhi(kq2);
   const e2 = SLM.bang['hstd|2026-08'];
   ok('nạp lại cùng ô → lanThay 1, tenTruoc = tên lần trước', e2.lanThay===1 && e2.tenTruoc==='mau 31 anh dat nhanh.XLSX' && slTenGoc(e2)==='MAU31_2026-08-31.xlsx');
   /* 5. Drive giả: sổ nạp ghi 1 lần, không đổi thì không ghi lại; chuẩn hóa tên tháng cũ */
   const ghi = [], patch = [];
   window.coTheNoiDrive = ()=>true; DR.sanSang = true;
   window.baoDamDuong = d=>Promise.resolve('tm:'+d);
   window.timFileTrong = (t, id)=>Promise.resolve(null);
   window.slGhiBlob = (ten, idTM, blob, cuId, them)=>{ ghi.push({ten, idTM, cuId, them}); return Promise.resolve({id:'f'+ghi.length}); };
   await luuFile('sl_dmn', {}); await slDmnDay();
   ok('sổ nạp lên Drive: DANH_MUC_NAP.csv trong Số liệu/2026-08', ghi.length===1 && ghi[0].ten==='DANH_MUC_NAP.csv' && /\/Số liệu\/2026-08$/.test(ghi[0].idTM), JSON.stringify(ghi));
   await slDmnDay();
   ok('sổ không đổi → không ghi lại', ghi.length===1);
   e2.goc = 'goc1'; SLM.bang['hstd|2026-07'] = {loai:'hstd', ky:'2026-07', ngay:'2026-07-31', tenFile:'cu.xlsx', goc:'goc2'};
   window.slDSDrive = ()=>Promise.resolve([{id:'goc1', ten:'2026-08-31 Mẫu 31 · HS tín dụng (chốt tháng).xlsx'}, {id:'goc2', ten:'MAU31_2026-07-31.xlsx'}]);
   window.goiDrive = (u, o)=>{ patch.push({u, b:JSON.parse(o.body)}); return Promise.resolve({id:'x'}); };
   slTenCuXem(); await w(400);
   const hop = document.querySelector('.hop-tit') && document.querySelector('.hop-tit').parentNode;
   ok('🏷 liệt kê đúng 1 file tên cũ → tên chuẩn (file đã chuẩn bỏ qua)', SL_TEN_CU.length===1 && SL_TEN_CU[0].moi==='MAU31_2026-08-31.xlsx' && !!hop && /1 file cần đổi tên/.test(hop.textContent), JSON.stringify(SL_TEN_CU));
   const nut = document.querySelector('[data-lenh="slten.doi"]'); ok('có nút đổi tên (data-lenh)', !!nut);
   nut.click(); await w(500);
   ok('đổi tên: PATCH tên chuẩn + mô tả tên gốc, chỉ metadata', patch.length===1 && /files\/goc1/.test(patch[0].u) && patch[0].b.name==='MAU31_2026-08-31.xlsx' && patch[0].b.description==='Tên gốc: M31 lan 2.xlsx', JSON.stringify(patch));
   ok('sau đổi tên ghi lại sổ nạp các tháng', ghi.length>=2);
   /* 6. menu ⋯ có nút, tìm rác bỏ qua sổ nạp */
   slNapThem('2026-08'); await w(200);
   ok('⋯ Nạp & KT có 🏷 Chuẩn hóa tên file gốc', !!document.querySelector('[data-lenh="slten.xem"]'));
   dongHop();
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
