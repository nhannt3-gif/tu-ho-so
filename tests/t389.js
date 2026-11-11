// 3.513 (anh 11/11 "thống nhất cách lấy số liệu"): KTGS — Kế hoạch năm + Định kỳ 06/16 GIỮ NHƯ CŨ (cuối tháng liền trước tháng kiểm tra);
//   mọi mẫu khác theo KỲ CHỌN: Mẫu 31 đúng ngày, chấm điểm BC0437 (chỉ có theo tháng) → ngày giữa tháng lấy cuối tháng trước;
//   Sau giải ngân = món GN trong tháng của kỳ chọn đến ngày chọn; 1 tổ = Tóm tắt · 06 · 15 · 16; mỗi màn dòng 📌 Số liệu. Bộ GIẢ gianho31 + BC0437 giả T7, T8 + Mẫu 31 giả ngày 15/08.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   const tep = (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Sheet 1'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
   let u8 = null;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); if(/31-08-2026\.XLSX$/.test(f.n)) u8 = u;
     const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   /* Mẫu 31 giả ngày 15/08: chép bản 31/08, món giải ngân sau 15/08 → bỏ (đúng như hệ thống chưa có) */
   { const wb = XLSX.read(u8, {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]], a = XLSX.utils.sheet_to_json(sh, {header:1, defval:''});
     const kq = await slDocFile(tep(a.map(r => r.map(c => typeof c==='string' ? c.replace(/31\/08\/2026/g, '15/08/2026') : c)), 'Ho_so_tin_dung_chi_tiet_15-08-2026.XLSX')); if(!kq.loi && kq.ky) await slGhi(kq); }
   const ngay = KHO.dsBang('hstd').map(e => e.ky).filter(k => k.length>7);
   ok('bộ giả có Mẫu 31 ngày 15/08/2026', ngay.indexOf('2026-08-15')>=0, ngay.join(','));
   /* BC0437 giả T7 (điểm 77) + T8 (điểm 88) */
   const K8 = await KHO.nap('2026-08'), ds = Object.values(K8.to).filter(t => !t.trucTiep);
   const h37 = ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Mã tổ','Tên tổ trưởng','Số tổ viên','Số tổ viên còn dư nợ','Số tổ viên có gửi tiết kiệm','Số tổ viên có nộp lãi trong 3 tháng gần nhất','Số tổ viên không nộp lãi đầy đủ trong 3 tháng gần nhất','Số tổ viên có tham gia gửi tiết kiệm trong 3 tháng gần nhất','Số tổ viên không tham gia gửi tiết kiệm đầy đủ trong 3 tháng gần nhất','Tổng dư nợ\n(triệu đồng)','Dư nợ quá hạn (triệu đồng)','Tỷ lệ NQH (%)','Dư nợ khoanh (triệu đồng)','Tỷ lệ nợ khoanh (%)','Lãi tồn (triệu đồng)','Lãi tồn ân hạn (triệu đồng)','Số dư tiết kiệm (triệu đồng)','Mức tiền gửi bình quân/tổ viên (triệu đồng)','Mức tiền gửi bình quân/tổ viên/tháng (ngàn đồng)','Số tổ viên có lãi tồn','Số tổ viên có lãi tồn ân hạn','Kết quả chấm điểm tổ tháng gần nhất','Xếp loại'];
   for(const [ngayBC, d] of [['31072026', 77], ['31082026', 88]]){ const a = [['THÔNG TIN TỔ TK&VV DO KHÁC QUẢN LÝ ĐẾN NGÀY '+ngayBC.slice(0, 2)+'/'+ngayBC.slice(2, 4)+'/2026'], h37];
     ds.forEach(t => a.push(['004820', t.xa, t.tenXa, String(t.dv), 0, t.ma, t.ten, 5, 5, 5, 5, 0, 5, 0, 1, 0, 0, 0, 0, 3, 0, 1, 0, 10.5, 1, 0, d, 0]));
     const k = await slDocFile(tep(a, 'BC0437_004820___'+ngayBC+'.xls')); if(!k.loi) await slGhi(k); }
   ok('bộ giả có BC0437 T7 + T8', !!KHO.bang('k37', '2026-07') && !!KHO.bang('k37', '2026-08'));
   ok('luật kỳ BC: tháng → tháng · ngày giữa tháng → tháng trước · ngày cuối tháng → tháng đó', ktBCKyChon('2026-08')==='2026-08' && ktBCKyChon('2026-08-15')==='2026-07' && ktBCKyChon('2026-08-31')==='2026-08');
   /* mở KTGS kỳ ngày 15/08 */
   kyChungDoi('2026-08-15'); const C = ktCH(); C.ky = '2026-08-15'; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; C.che = 'dx'; KT_A_TH = '';
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && KT_K.ky==='2026-08-15' && KT_BC && document.getElementById('kt-the'));i++) await w(250); await w(400);
   ok('kỳ ngày 15/08: Mẫu 31 đúng ngày, BC0437 = cuối tháng trước (T7)', KT_K.ky==='2026-08-15' && KT_BC.k37 && KT_BC.k37.e.ky==='2026-07', KT_BC.k37 && KT_BC.k37.e.ky);
   const the = () => document.getElementById('kt-the'), chu = () => the().textContent;
   ok('🎯 màn bảng tổ có dòng 📌 Số liệu (Mẫu 31 ngày 15/08 · BC0437 T7), không ⚠', /📌 Số liệu: Mẫu 31 ngày 15\/08\/2026 · chấm điểm BC0437 T7\/2026/.test(chu()) && !the().querySelector('.kt-sl.sl-bao'), chu().slice(0, 300));
   const t = ds.find(x => x.dv && String(x.dv)!=='99' && KT_K.to[x.ma]); ktChonTo(t.ma); await w(500);
   const s = ktSoTo(KT_K.to[t.ma]);
   ok('chọn 1 tổ: điểm chấm = BC0437 T7 (77), số liệu tổ = Mẫu 31 ngày', s.diem===77 && s.ngay===KT_K.ngay, JSON.stringify({diem:s.diem, ngay:s.ngay}));
   const hn = [...the().querySelectorAll('.hang-nut.kt-in button')].map(x => x.textContent.trim()).join('|');
   ok('hàng nút 1 tổ: Tóm tắt · 06 · 15/TD · 16 — không còn Mẫu 04', /^📋 Tóm tắt tổ\|🖨 In Mẫu 06\|📄 Word Mẫu 06\|📄 15\/TD Đối chiếu\|🖨 In Mẫu 16\|📄 Word Mẫu 16$/.test(hn), hn);
   ok('chip BC0437 trên dải lọc không báo lệch (T7 đúng luật)', [...document.querySelectorAll('.sl-chip')].some(x => /^BC0437 ✓/.test(x.textContent.trim())), [...document.querySelectorAll('.sl-chip')].map(x => x.textContent).join('|'));
   /* Mẫu 04 theo kỳ chọn */
   C.to = ''; C.xa = t.xa; ktDoiCheDo('bc'); await w(500);
   ok('Mẫu 04: không ô Tháng kiểm tra, có 📌 Số liệu kỳ chọn', !the().querySelector('select[data-lenh="kta.th"]') && /📌 Số liệu: Mẫu 31 ngày 15\/08\/2026/.test(chu()));
   KT_BC_CHON = {}; KT_BC_CHON[t.ma] = true; const g4 = ktBCGiaTri();
   ok('Mẫu 04: số liệu kỳ chọn (ngày) → tháng kiểm tra = chính tháng 08', g4.length===1 && g4[0].f.TH04==='08', g4[0] && g4[0].f.TH04);
   /* Sau giải ngân: tháng của kỳ chọn, đến ngày chọn */
   KT_GN = null; KT_GN_KY = ''; C.gnTu = '2026-07'; C.gnDen = '2026-07'; ktDoiCheDo('gn'); for(let i=0;i<80 && !KT_GN;i++) await w(200); await w(300);
   ok('Sau GN: mặc định tháng của kỳ chọn (08) dù ô lưu cũ là T7, Mẫu 31 ngày 15/08', KT_GN.thang.join()==='2026-08' && KT_GN.ngay['2026-08']==='2026-08-15', KT_GN.thang.join()+' '+JSON.stringify(KT_GN.ngay));
   const mon = [].concat(...Object.values(KT_GN.ds['2026-08'] || {}).map(x => x.mon));
   ok('Sau GN: mọi món đều giải ngân trong tháng 08 đến 15/08', mon.every(m => { const g = ktGNNgay(m); return !g || !/^\d{4}-\d{2}-\d{2}$/.test(g) || (g.slice(0, 7)==='2026-08' && g<='2026-08-15'); }), mon.length+' món');
   ok('Sau GN: dòng 📌 Số liệu ghi tháng + ngày', /📌 Số liệu: món giải ngân T8\/2026 \(đến 15\/08/.test(chu()), (chu().match(/📌[^·]*/)||[''])[0]);
   const sel = the().querySelectorAll('.kt-gn-dau select')[0]; sel.value = '2026-07'; sel.dispatchEvent(new Event('change', {bubbles:true})); KT_GN = null; await w(300); for(let i=0;i<80 && !KT_GN;i++) await w(200); await w(300);
   ok('Sau GN: anh tự chọn từ T7 → khoảng T7–T8 giữ trong kỳ này', KT_GN.thang.join()==='2026-07,2026-08' && KT_GN_KY==='2026-08-15', KT_GN.thang.join());
   /* Hội cấp xã */
   ktDoiCheDo('hx'); await w(400);
   ok('🏛 Hội cấp xã: dòng 📌 Số liệu theo kỳ chọn', /📌 Số liệu: Mẫu 31 ngày 15\/08\/2026/.test(chu()));
   /* Định kỳ + Kế hoạch giữ như cũ */
   ktDoiCheDo('dk'); for(let i=0;i<80 && !ktNguonSan(ktDKThang());i++) await w(200); await w(400);
   ok('Định kỳ giữ như cũ: tháng kiểm tra 08 (kỳ ngày → chính tháng), số liệu cuối T7, BC0437 T7', ktDKThang()==='2026-08' && KT_KH_SL.ky==='2026-07' && /Số liệu in T8/.test(chu()), KT_KH_SL && KT_KH_SL.ky);
   ok('Định kỳ: không còn 📋 Tóm tắt / 15/TD (gom về 1 tổ)', !the().querySelector('[data-lenh="kttt.dk"],[data-lenh="kttt.in"],[data-lenh="kt7.m15"]'));
   ktDoiCheDo('kh'); await w(400);
   ok('Kế hoạch năm: dòng 📌 ghi giữ như cũ (cuối tháng liền trước)', /📌 Số liệu: Kế hoạch năm giữ như cũ/.test(chu()));
   C.che = 'dx';
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
