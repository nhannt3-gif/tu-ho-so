// 3.120 — Nạp số liệu: dòng riêng "Dư nợ chi tiết" (chỉ tham chiếu số TK 105 + điểm GD xã; Mẫu 31 là số liệu chính), bỏ hẳn Mẫu 10.
// Bộ GIẢ: tests/gia31 (Mẫu 31) + file Dư nợ chi tiết GIẢ dựng ngay trong phép thử từ Mẫu 31 T8 (số sổ 105 giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const mk = (b64, n) => { const bin=atob(b64), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   for(const f of files){ const kq = await slDocFile(mk(f.b, f.n)); if(!kq.loi) await slGhi(kq); }
   /* 1. loại file */
   ok('Nạp số liệu: có dòng "Dư nợ chi tiết" ngay sau Mẫu 31 (nhóm Ⓑ), không bắt buộc', slLoai('dnct') && slLoai('dnct').nhom==='B' && SL_LOAI.indexOf(slLoai('dnct'))===SL_LOAI.indexOf(slLoai('hstd'))+1 && SL_BAT_BUOC.indexOf('dnct')<0);
   ok('Mẫu 10 thành loại đã bỏ', slLoai('m10').nhom==='X' && /không dùng nữa/.test(slLoai('m10').bo) && !slLaHS('m10') && slLaHS('hstd'));
   /* 2. dựng file Dư nợ chi tiết GIẢ T8 từ Mẫu 31 T8 */
   const B8 = await slBo('2026-08'), hs = B8.co.hstd.filter(x=>x.ku && x.kh);
   const soTK = kh => '70'+String(kh).slice(-8);
   const H = ['Mã xã','Tên xã','Mã thôn','Tên thôn','Ngày GDXA','Mã điểm giao dịch','Tên điểm giao dịch','Mã tổ','Mã KH','Tên KH','Số khế ước','Tình trạng món vay','Tổng dư nợ','Sổ tiết kiệm 105','Số dư tiền gửi 105','Ngày số liệu'];
   const to0 = hs[0].to, aoa = [H].concat(hs.map(x=>[x.xa, x.tenXa, x.thon, x.tenThon, '09', x.to===to0 ? 'TXNGIA0001' : '', x.to===to0 ? 'Điểm Giả Một' : '', x.to, x.kh, x.ten, x.ku, 'OPEN', 999999, soTK(x.kh), 123456, '31/08/2026']));
   const ws = XLSX.utils.aoa_to_sheet(aoa), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
   const fDn = new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], '004820_DU_NO_CHI_tiet_DEN_31-08-2026.xlsx');
   const kq = await slDocFile(fDn);
   ok('file Dư nợ chi tiết → tự vào dòng Dư nợ chi tiết, kỳ T8', kq.loai==='dnct' && kq.ky==='2026-08' && !kq.loi, kq.loi||kq.loai+' '+kq.ky);
   ok('chỉ lưu cột tham chiếu + cột số tiền để đối chiếu (3.121), không lưu cột khác', kq.rows[0] && kq.rows[0].stk===soTK(kq.rows[0].kh) && kq.rows[0].ku && Object.keys(kq.rows[0]).every(f=>slLoai('dnct').chi.indexOf(f)>=0));
   const kh = hs[0].kh, t105Truoc = SL_DB.kh[kh] && SL_DB.kh[kh].t105;
   await slGhi(kq); await w(50);
   ok('2 dòng riêng: Mẫu 31 T8 vẫn nguyên, Dư nợ chi tiết T8 ghi riêng', !!SLM.bang[slKhoa('hstd','2026-08')] && !!SLM.bang[slKhoa('dnct','2026-08')]);
   /* 3. số TK 105 */
   ok('Tra cứu: số TK 105 lấy từ Dư nợ chi tiết; số dư 105 vẫn theo Mẫu 31', SL_DB.kh[kh].stk===soTK(kh) && SL_DB.kh[kh].t105===t105Truoc, SL_DB.kh[kh].stk+' · '+SL_DB.kh[kh].t105);
   ok('số sổ chỉ nhận 10 chữ số (bỏ số hệ thống 14 chữ số dạng 1482…)', slStk('14820000004812').length===0 && slStk('7012345678, 7099999999').length===2 && slStk('48000294').length===0);
   await slDungDanhBa(); ok('dựng lại danh bạ (dnct sau Mẫu 31 cùng kỳ) vẫn giữ số sổ tham chiếu', SL_DB.kh[kh].stk===soTK(kh));
   const kq2 = await slDocFile(mk(files.find(f=>/31-08-2026\.XLSX$/.test(f.n)).b, 'Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX'));
   await slGhi(kq2); ok('nạp lại Mẫu 31 sau đó → không mất số sổ tham chiếu', SL_DB.kh[kh].stk===soTK(kh));
   SL_DB.kh[kh].stk = '14820000004812';
   ok('danh bạ cũ còn số 1482… → Tra cứu hiện "—"', slStk(SL_DB.kh[kh].stk).length===0);
   SL_DB.kh[kh].stk = soTK(kh);
   /* 4. Tổ TK&VV + điểm GD */
   SL_BO = {}; const K = await toNap('2026-08'); TO_K = K;
   const t = K.to[to0];
   ok('điểm GD xã của tổ lấy thẳng từ Dư nợ chi tiết (ưu tiên)', t && t.diem==='TXNGIA0001' && /Điểm Giả Một/.test(t.tenDiemDu) && /Dư nợ chi tiết/.test(t.diemTu||''), t && (t.diem+' · '+t.diemTu));
   const ks = toKhach(t); ok('Tổ TK&VV: cột Số TK 105 có số từ Dư nợ chi tiết', ks.length && ks.every(k=>k.stk.join(', ')===soTK(k.kh)), ks.length+' khách');
   const dn31 = m=>hs.filter(x=>x.kh===m).reduce((a,x)=>a+(x.dn||0),0); ok('Tổ TK&VV: dư nợ, số dư 105 vẫn theo Mẫu 31 (không lấy số của file tham chiếu)', ks.every(k=>Math.abs(k.dn-dn31(k.kh))<1) && !ks.some(k=>k.t105===123456));
   const demD = {}; Object.values(K.to).forEach(x=>{ const k = x.xa+'|'+x.khoaDiem; demD[k] = (demD[k]||0)+1; }); const dMax = Object.keys(demD).sort((a,b)=>demD[b]-demD[a])[0].split('|');
   const S = {xa:dMax[0], diem:dMax[1], hoi:'', to:''}, dsTo = pvLuaChon(K.to, S, 'to'), apOf = k=>String((K.to[k.k]||{}).tenThon||'');
   ok('chip / danh sách tổ xếp theo ấp (cùng ấp theo tên tổ trưởng)', dsTo.length>1 && dsTo.every((x,i)=>!i || !apOf(dsTo[i-1]) ? true : (!apOf(x) || ktApTen(apOf(dsTo[i-1])).localeCompare(ktApTen(apOf(x)), 'vi', {numeric:true})<=0)), dsTo.map(apOf).join(' | '));
   /* 5. bỏ Mẫu 10: dữ liệu cũ */
   const fake = {v:1, loai:'m10', ky:'2026-08-15', ngay:'2026-08-15', n:1, cot:slNen([{ku:'6600000000000001', kh:kh, stk:'14820000004812', dn:1}], ['ku','kh','stk','dn'])};
   await luuFile(slIDB('m10','2026-08-15'), fake); SLM.bang[slKhoa('m10','2026-08-15')] = {loai:'m10', ky:'2026-08-15', ngay:'2026-08-15', soDong:1, luc:new Date().toISOString(), tenFile:'mau10.xlsx'};
   const kh2 = Object.keys(SL_DB.kh).find(m=>m!==kh); SL_DB.kh[kh2].stk = '14820000004812'; const soKH = Object.keys(SL_DB.kh).length;
   delete SL_DB.b120; const n = await slBoMau10();
   ok('mở app bản mới: bản Mẫu 10 đã nạp được bỏ (đánh dấu xóa, đồng bộ máy khác)', n===1 && !SLM.bang[slKhoa('m10','2026-08-15')] && !!SLM.xoa[slKhoa('m10','2026-08-15')] && !(await docFile(slIDB('m10','2026-08-15'))));
   ok('danh bạ làm sạch 1 lần tại chỗ: bỏ số 1482…, giữ số sổ đúng, không mất khách', SL_DB.b120===1 && !SL_DB.kh[kh2].stk && SL_DB.kh[kh].stk===soTK(kh) && Object.keys(SL_DB.kh).length===soKH);
   ok('lần sau không dọn / dựng lại nữa', (await slBoMau10())===0);
   const kqM10 = await slDocFile(new File([XLSX.write((()=>{ const wb2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['Mã món vay','Mã khách hàng','Tổng dư nợ','Số tiền giải ngân','Số TK'],['6600000000000001','4800000001',1,1,'14820000004812']]), 'S'); return wb2; })(), {type:'array', bookType:'xlsx'})], 'Ho so tin dung chi tiet 15-10-2026.xlsx'));
   ok('thả file Mẫu 10 → báo "không dùng nữa", không nạp', !kqM10.loai && /Mẫu 10 không dùng nữa/.test(kqM10.loi), kqM10.loi);
   /* 6. màn Nạp số liệu */
   D.cauHinh.slTab='nap'; doiNgan(7); await w(600);
   const man = document.getElementById('tr7') ? document.getElementById('tr7').textContent : document.body.textContent;
   ok('màn Nạp: có dòng Dư nợ chi tiết, không còn dòng Mẫu 10', /Dư nợ chi tiết/.test(man) && !/Mẫu 10 · Sao kê chi tiết/.test(man));
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
