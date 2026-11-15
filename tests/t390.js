// 3.514 (anh 11/11): KTGS thanh 5 nút + 🎯 Kiểm tra tổ 1 hay nhiều tổ (gộp Định kỳ 06 + 16 và Mẫu 04, js/80) + ⚙ Khai báo › 🎯 Chọn hộ kiểm tra + Esc lùi 1 cấp.
//   Kiểm: 5 nút · tích nhiều tổ → gợi ý hộ từng tổ · 4 kiểu (tốt · cần quan tâm · Trung hòa % · hết tổ) · món xét đúng luật / mọi món · khai báo số hộ + % ·
//   ✅ hết tổ + 📜 đúng luật = bản in Định kỳ cũ (ktDKGiaTri) giống hệt · ngày chung · Mẫu 04 / 15/TD cho tổ đã tích · Esc · BC0437 thiếu tháng → để trống điểm. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const C = ktCH(); C.ky = '2026-08'; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; C.che = 'dk'; D.cauHinh.ktChonHo = {}; KT_DK_CHON = {};
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-the'));i++) await w(250); await w(400);
   const the = () => document.getElementById('kt-the'), chu = () => the().textContent;
   const nut = [...the().querySelectorAll('.kt-khoi .gd-chip')].map(x => x.textContent.trim());
   ok('thanh 5 nút: Kiểm tra tổ · sau 30 ngày · Kiểm tra Hội · Kế hoạch năm · Khai báo + ‹ Lùi (Esc)', nut.join('|')==='🎯 Kiểm tra tổ|📅 Kiểm tra sau 30 ngày|🏛 Kiểm tra Hội|🗓 Kế hoạch năm|⚙ Khai báo' && !!the().querySelector('[data-lenh="ktk.lui"]'), nut.join('|'));
   ok('che cũ "dk" (Định kỳ) mở vào 🎯 Kiểm tra tổ', ktCheDo()==='dx' && /Kiểm tra tổ/.test(the().querySelector('.kt-khoi .bat').textContent));
   const ds = Object.values(KT_K.to).filter(t => !toLaTT(t) && t.dv && String(t.dv)!=='99'), xa = ds[0].xa, ts = ds.filter(t => t.xa===xa).slice(0, 2);
   pvChon('kt', 'xa', String(xa)); await w(800);
   ok('chọn xã → bảng tổ có ô tích, nút in mờ khi chưa tích', the().querySelectorAll('input[data-lenh="ktto.to"]').length>=2 && the().querySelector('[data-lenh="ktto.xem"][data-m="m06"]').disabled);
   for(const t of ts){ const c = the().querySelector('input[data-lenh="ktto.to"][data-m="'+t.ma+'"]'); c.checked = true; c.dispatchEvent(new Event('change', {bubbles:true})); await w(300); }
   ok('tích 2 tổ → Đã chọn 2 tổ, mỗi tổ có số hộ gợi ý', KTTO.dsTo().length===2 && /Đã chọn 2\//.test(chu()) && ts.every(t => Object.keys(KTTO.goi(t).chon).length>0));
   const hn = [...the().querySelectorAll('.kt-to-in button')].map(x => x.textContent.trim()).join('|');
   ok('hàng nút: Tóm tắt · 06 · 15 · 16 · 04 + 1 ô ngày chung', hn==='📋 Tóm tắt|📄 06/TD|📄 15/TD|📄 16/TD|📄 04' && the().querySelectorAll('#kb-ngay').length===1, hn);
   /* kiểu chọn hộ */
   const bam = async (sel) => { the().querySelector(sel).click(); await w(300); };
   const t0 = ts[0], dung = () => KTTO.goi(t0).ds.filter(h => !h.loai), chonDs = () => KTTO.daChon(t0);
   await bam('[data-lenh="ktto.kieu"][data-k="het"]');
   ok('✅ Chọn hết tổ → mọi hộ không QH / khoanh', chonDs().length===dung().length && chonDs().every(h => !h.loai), chonDs().length+'/'+dung().length);
   await bam('[data-lenh="ktto.mon"][data-k="luat"]');
   const dau = KTTO.thKT().slice(0, 4)+'-01-01';
   ok('📜 Đúng luật → chỉ món giải ngân trước 01/01 năm kiểm tra', KTTO.goi(t0).ds.every(h => h.mon.every(m => (m.ngn || m.nv) < dau)));
   /* = Định kỳ cũ: ✅ hết tổ + đúng luật, kỳ cuối tháng */
   KT_A_TH = ''; KT_DK_TH = ''; const cu = ktDKGiaTri(ktInV('m06'), ktInV('m16')), moi = KTTO.giaTri(ktInV('m06'), ktInV('m16'));
   ok('✅ Hết tổ + 📜 Đúng luật = bản in Định kỳ cũ (Mẫu 06 + 16 giống hệt từng ký tự)', ktHTML06(cu.g06)===ktHTML06(moi.g06) && ktHTML16(cu.g16)===ktHTML16(moi.g16) && moi.g06.length===2 && moi.th==='2026-09', moi.th);
   await bam('[data-lenh="ktto.mon"][data-k="tat"]');
   await bam('[data-lenh="ktto.kieu"][data-k="tot"]');
   ok('👍 Toàn hộ tốt: hộ tốt trước, đủ số gợi ý (hoặc bù)', chonDs().filter(h => !h.moi30.length).every((h, i, a) => h.tot || a.filter(x => x.tot).length===dung().filter(x => x.tot).length));
   await bam('[data-lenh="ktto.kieu"][data-k="xau"]');
   ok('⚠ Toàn hộ cần quan tâm: hộ cần quan tâm được chọn trước', dung().filter(h => h.xau).slice(0, KTTO.goi(t0).so).every(h => KTTO.goi(t0).chon[h.kh]) || chonDs().filter(h => h.xau).length===Math.min(KTTO.goi(t0).so, dung().filter(h => h.xau).length));
   /* Trung hòa % theo khai báo */
   D.cauHinh.ktChonHo = {s1:10, s2:10, s3:10, pt:30}; KTTO.ho = {}; await bam('[data-lenh="ktto.kieu"][data-k="trung"]');
   const X = KTTO.goi(t0), nXau = Object.keys(X.chon).filter(k => { const h = X.ds.find(x => x.kh===k); return h && h.xau && !h.tot && !X.chon[k].bb; }).length, coXau = dung().filter(h => h.xau && !h.tot).length;
   ok('⚖ Trung hòa: khai báo 10 hộ × 30% = 3 hộ cần quan tâm (nếu tổ đủ)', X.so===10 && nXau>=Math.min(3, coXau), 'so '+X.so+' · cần QT '+nXau+' / có '+coXau);
   ok('dòng chip Trung hòa ghi "30% cần QT"', /Trung hòa 30% cần QT/.test(chu()));
   await bam('[data-lenh="ktto.so"][data-d="1"]');
   ok('− / + số hộ của đợt: 10 → 11, không ghi đè khai báo', KTTO.goi(t0).so===11 && D.cauHinh.ktChonHo.s1===10);
   KTTO.d = 0;
   /* ▾ mở hộ, bỏ tích 1 hộ */
   await bam('[data-lenh="ktto.mo"][data-m="'+t0.ma+'"]');
   const hc = the().querySelector('input[data-lenh="ktto.ho"][data-m="'+t0.ma+'"]:checked'), khBo = hc && hc.getAttribute('data-kh'); hc.checked = false; hc.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   ok('▾ Hộ: bỏ tích 1 hộ → giữ trong đợt', !!khBo && !KTTO.goi(t0).chon[khBo] && KTTO.mo===t0.ma);
   /* Esc lùi 1 cấp: thu gọn ▾ → lên cấp cây */
   document.body.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); await w(400);
   ok('Esc: đang mở ▾ → thu gọn (đợt giữ nguyên)', KTTO.mo==='' && !KTTO.goi(t0).chon[khBo] && KTTO.dsTo().length===2);
   document.body.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); await w(800);
   ok('Esc lần 2: lên 1 cấp cây lọc (bỏ xã), tổ đã tích vẫn giữ', !ktCH().xa && KTTO.dsTo().length===2, 'xa='+ktCH().xa);
   /* ngày chung + in 06 */
   const on = document.getElementById('kb-ngay'); if(on) on.value = '2026-09-10'; KT_KB.ngay = '2026-09-10'; KTTO.xem('m06', 1); await w(500);
   ok('📄 06 (ngày chung 10/09) → hộp xem có In / PDF / Word, 2 phiếu ghi ngày 10/09/2026', !!document.getElementById('kt-to-khung') && KTTO.X.gts.length===2 && KTTO.X.gts.every(g => g.f.TD==='10/09/2026') && /PDF/.test(document.getElementById('hop-in').textContent));
   dongHop(); KT_KB.ngay = ''; if(on) on.value = '';
   KTTO.xem('m04', 1); await w(400);
   ok('📄 04 → Mẫu 04 cho các tổ đã tích (theo Hội – xã), nút Đổi lựa chọn quay về Kiểm tra tổ', KT_BC_XEM && KT_BC_XEM.tu==='to' && KT_BC_XEM.gts.reduce((a, g) => a+g.rows.length, 0)===2 && /KTTO\.xem/.test(document.getElementById('hop-in').innerHTML));
   dongHop(); kt7Mo15('to'); await w(600);
   ok('📄 15/TD → mỗi tổ đã tích 1 danh sách', KT7.cho==='to' && KT7.gts.length===2);
   dongHop();
   /* BC0437 thiếu tháng → để trống điểm */
   const bcCu = KT_BC; KT_BC = {k37:{e:{ky:'2026-07'}, theoTo:{[t0.ma]:{diemTo:90, xepLoai:'Tốt'}}, rows:[]}, k38:null};
   ok('BC0437 khác tháng cần (T7 cho kỳ T8) → điểm để trống', ktSoTo(t0).diem==='' && ktSoTo(t0).xl==='');
   KT_BC = {k37:{e:{ky:'2026-08'}, theoTo:{[t0.ma]:{diemTo:90, xepLoai:'Tốt'}}, rows:[]}, k38:null};
   ok('BC0437 đúng tháng → có điểm', ktSoTo(t0).diem===90); KT_BC = bcCu;
   /* ⚙ Khai báo › 🎯 Chọn hộ kiểm tra */
   C.che = 'hdt'; C.hdtTab = 'chon'; ktVeThe(); await w(300);
   const pt = the().querySelector('input[data-lenh="ktto.kb"][data-o="pt"]');
   ok('⚙ Khai báo có mục 🎯 Chọn hộ kiểm tra (số hộ, Trung hòa %, mặc định)', !!pt && pt.value==='30' && !!the().querySelector('select[data-o="kieu"]') && !!the().querySelector('select[data-o="mon"]'));
   pt.value = '40'; pt.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   ok('sửa % → lưu D.cauHinh.ktChonHo.pt + ghi nhật ký', D.cauHinh.ktChonHo.pt===40 && ktKBNK().some(x => x.t==='chonho' && x.o==='pt' && x.moi==='40'));
   D.cauHinh.ktKBKhoa = 1; ktVeThe(); await w(200);
   ok('🔒 khóa khai báo → ô chọn hộ chỉ xem', the().querySelector('input[data-lenh="ktto.kb"][data-o="pt"]').disabled);
   D.cauHinh.ktKBKhoa = 0; KTTO.kbSua('', null);
   ok('↺ Về mặc định → 6/7/8, 30%, Trung hòa, Đúng luật', JSON.stringify(KTTO.kb())===JSON.stringify(KTTO.MD));
   document.body.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); await w(300);
   ok('Esc ở mục khai báo con → về 🏛 Hội – xã', ktCH().hdtTab==='hoi');
   C.che = 'dx';
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
