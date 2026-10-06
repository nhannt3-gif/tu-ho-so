// 3.121 — Đối chiếu Mẫu 31 ↔ Dư nợ chi tiết cùng kỳ: tổng (món, khách, dư nợ, số dư 105), danh sách món lệch, cột "Dư nợ CT" ở bảng đối chiếu ② Kiểm tra.
// Bộ GIẢ: tests/gia31 + file Dư nợ chi tiết GIẢ dựng từ Mẫu 31 T8 (số liệu giả).
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
   const B8 = await slBo('2026-08'), hs = B8.co.hstd.filter(x=>x.ku && x.kh);
   const H = ['Mã xã','Tên xã','Mã thôn','Tên thôn','Mã điểm giao dịch','Tên điểm giao dịch','Mã tổ','Mã KH','Tên KH','Số khế ước','Tình trạng món vay','Dư nợ trong hạn','Dư nợ quá hạn','Dư nợ khoanh','Tổng dư nợ','Giải ngân trong tháng','Thu nợ TH tháng','Sổ tiết kiệm 105','Số dư tiền gửi 105','Ngày số liệu'];
   const dung = (sua) => { const rows = hs.concat((B8.lap||[]).filter(x=>x.ku && x.kh)).map(x=>[x.xa, x.tenXa, x.thon, x.tenThon, 'TXN01', 'Điểm Giả', x.to, x.kh, x.ten, x.ku, x.ttMon||'OPEN', x.th||0, x.qh||0, x.kn||0, x.dn||0, x.gnT||0, x.tnTH||0, '70'+String(x.kh).slice(-8), x.t105||0, '31/08/2026']);
     const r = sua ? sua(rows) : rows; const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([H].concat(r)), 'Sheet 1');
     return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], '004820_DU_NO_CHI_tiet_DEN_31-08-2026.xlsx'); };
   /* 1. khớp */
   let kq = await slDocFile(dung()); await slGhi(kq);
   ok('Dư nợ chi tiết lưu thêm cột số tiền (chỉ để đối chiếu)', kq.rows[0].dn!==undefined && kq.rows[0].qh!==undefined && kq.tong && kq.tong.mon>0, 'tổng '+kq.tong.dn);
   const e = SLM.bang[slKhoa('dnct','2026-08')]; ok('dòng nạp Dư nợ chi tiết có tóm tắt số món / dư nợ', e.tong && e.tong.mon===hs.length && Math.abs(e.tong.dn - hs.reduce((a,x)=>a+(x.dn||0),0))<1);
   await slKiemTra('2026-08'); await w(200);
   let K = SLM.kt['2026-08'], m5 = K.kq.find(x=>/Mẫu 31 ↔ Dư nợ chi tiết/.test(x.ten));
   ok('② Kiểm tra: mục Mẫu 31 ↔ Dư nợ chi tiết — khớp', m5 && m5.kq==='ok', m5 && m5.chu);
   ok('bảng đối chiếu có cột "Dư nợ CT", dư nợ = Mẫu 31', K.dc.v[''].dn.dnct!==undefined && Math.abs(K.dc.v[''].dn.dnct - K.dc.v[''].dn.m31)<1 && /Dư nợ CT/.test(slDCHTML('2026-08')));
   /* 2. lệch: 1 món đổi dư nợ, 1 món bỏ */
   const ku1 = hs[0].ku, ku2 = hs[1].ku;
   kq = await slDocFile(dung(rows=>rows.filter(r=>r[9]!==ku2).map(r=>r[9]===ku1 ? r.slice(0,14).concat([(r[14]||0)+1000000], r.slice(15)) : r))); await slGhi(kq);
   await slKiemTra('2026-08'); await w(200);
   K = SLM.kt['2026-08']; m5 = K.kq.find(x=>/Mẫu 31 ↔ Dư nợ chi tiết/.test(x.ten));
   ok('lệch → báo lệch, liệt kê đúng món (đổi dư nợ + thiếu món)', m5 && m5.kq==='lech' && m5.n===((hs[1].dn||0)>0 ? 2 : 1) && m5.ds.some(r=>r[0]===ku1 && Math.abs(r[5]+1000000)<1), m5 && (m5.chu+' · '+m5.n+' món'));
   ok('ô Dư nợ CT bảng đối chiếu báo lệch so với số chuẩn khi có số chuẩn', (K.dc.tt['']||{}).dn && (K.dc.tt[''].dn.dnct||[''])[0]!=='k' || !K.dc.v[''].dn.bx);
   ok('không sửa số liệu Mẫu 31', (await slBo('2026-08')).co.hstd.find(x=>x.ku===ku1).dn===hs[0].dn);
   /* 3. bản nạp 3.120 (chưa có số tiền) → bỏ qua, nhắc nạp lại */
   const b0 = await docFile(slIDB('dnct','2026-08')); const rows0 = slMoBang(b0).map(x=>({ku:x.ku, kh:x.kh, stk:x.stk})); slNen.them = {}; b0.cot = slNen(rows0, ['ku','kh','stk']); slNen.them = null; await luuFile(slIDB('dnct','2026-08'), b0); SL_BO = {};
   await slKiemTra('2026-08'); await w(200); m5 = SLM.kt['2026-08'].kq.find(x=>/Mẫu 31 ↔ Dư nợ chi tiết/.test(x.ten));
   ok('file nạp ở bản 3.120 (chưa có số tiền) → nhắc nạp lại, không báo lệch sai', m5 && m5.kq==='bo' && /nạp lại/.test(m5.chu));
   ok('3.122: ô Danh sách tổ (DSTO) báo số tổ, không phải số dòng', slNgan(slLoai('dsto'), {n:369})==='369 tổ' && /369 tổ/.test(slTomDong(slLoai('dsto'), {soDong:369, tong:{n:369}})));
   const eTT = SLM.bang[slKhoa('tt','2026-08')]; ok('tóm tắt Thông tin tổ trưởng không lặp chữ "tổ"', !eTT || (slTomDong(slLoai('tt'), eTT).match(/\d+ tổ/g)||[]).length===1, eTT && slTomDong(slLoai('tt'), eTT).replace(/<[^>]+>/g,' ').slice(0,160));
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
