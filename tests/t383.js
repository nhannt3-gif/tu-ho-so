// 3.498 (anh 07/11 — VB 727): 🛡 KTGS — 📄 15/TD Danh sách đối chiếu số dư tiền vay và tiền gửi · 🏛 03/BB-CX Biên bản kiểm tra Hội cấp xã (js/56b).
//   ① nút ở khối B (tổ đang chọn) · 15/TD: toàn bộ tổ viên còn nợ / lãi tồn / tiền gửi (KHO.doiChieu — cùng 02/BG), nợ lãi = lãi tồn, Tổng cộng khớp, Đến ngày = ngày số liệu
//   ② 03/BB-CX: Hội – xã, mục I tự điền (số tổ, thôn, khách, dư nợ, NQH, khoanh, tỷ lệ) khớp số tự cộng, mục III / IV (sửa từ IV / V của mẫu gốc), khai báo cán bộ NH lưu
//   ③ Word theo khuôn gốc (tests/mau_goc 15td / 03bbcx): tạo được, đủ chữ mẫu, số liệu vào đúng ô, không còn {{…}} · mẫu KTGS cũ không đổi · không lỗi trang. Dữ liệu GIẢ (gianho31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path'), zlib = require('zlib');
function docZip(buf, ten){ let e = buf.length-22; while(e>=0 && buf.readUInt32LE(e)!==0x06054b50) e--; let p = buf.readUInt32LE(e+16); const n = buf.readUInt16LE(e+10);
  for(let i=0;i<n;i++){ const pt = buf.readUInt16LE(p+10), csz = buf.readUInt32LE(p+20), ln = buf.readUInt16LE(p+28), lx = buf.readUInt16LE(p+30), lc = buf.readUInt16LE(p+32), off = buf.readUInt32LE(p+42), tn = buf.slice(p+46, p+46+ln).toString();
    if(tn===ten){ const d = off+30+buf.readUInt16LE(off+26)+buf.readUInt16LE(off+28), raw = buf.slice(d, d+csz); return (pt===8 ? zlib.inflateRawSync(raw) : raw).toString('utf8'); } p += 46+ln+lx+lc; } return ''; }
const chuW = x => (x.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || []).map(t => t.replace(/<[^>]+>/g, '')).join('').replace(/&amp;/g, '&');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const r = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const chu = h => String(h || '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try { await slGhi(kq); } catch(e){} } }
   kyChungDoi('2026-08'); doiNgan(7); delete D.cauHinh.ktIn;
   const K = ktCH(); K.ky = '2026-08'; K.xa = ''; K.diem = ''; K.hoi = ''; K.to = ''; K.che = 'dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t => !toLaTT(t) && t.dv && String(t.dv)!=='99').sort((a, c) => KHO.doiChieu(c).length - KHO.doiChieu(a).length), t = ds[0]; K.xa = t.xa; K.diem = t.khoaDiem; pvVeCay('kt'); await w(300); ktChonTo(t.ma); await w(600);
   o.nut = !!document.querySelector('[data-lenh="kt7.m15"][data-c="dx"]') && !document.querySelector('#kt-the [data-lenh="kt7.m03"]');   /* 3.500: 03 không còn ở cấp tổ */
   /* ① 15/TD */
   document.querySelector('[data-lenh="kt7.m15"]').click(); for(let i=0;i<30 && !(KT7.x && document.getElementById('mi-khung'));i++) await w(100); await w(300);
   const g = KT7.gts[0], dc = KHO.doiChieu(t), h15 = chu(KT7.x.trang);
   o.ds15 = g.kh.length===dc.length && g.kh.length>0 && dc.every(k => h15.indexOf(k.ten)>=0);
   const tg = dc.reduce((a, k) => a+(k.dn||0), 0), tl = dc.reduce((a, k) => a+(k.lt||0), 0), t5 = dc.reduce((a, k) => a+(k.t105||0), 0);
   o.tong15 = g.tong.dn===tg && g.tong.lt===tl && g.tong.t105===t5 && h15.indexOf('Tổng cộng '+tdnTien(tg))>=0;
   o.lai = dc.every((k, i) => g.kh[i].mon.every((m, j) => m.lt===(laiTon(k.mon[j])||0)));
   o.chu15 = ['DANH SÁCH ĐỐI CHIẾU SỐ DƯ TIỀN VAY VÀ TIỀN GỬI', 'Mẫu số: 15/TD', 'Số liệu tại NHCSXH', 'Chênh lệch (+,-)', 'Nguyên nhân chênh lệch', 'CÁN BỘ ĐỐI CHIẾU', 'Đến ngày '+ngayVNsl(KT_K.ngay), 'Mã Tổ: '+t.ma].filter(x => h15.indexOf(x)<0);
   o.ngang = /size:A4 landscape/.test(KT7.x.trang); o.h15 = KT7.x.trang;
   /* 02/BG dùng cùng cửa (QT-22) */
   o.bg = typeof hsoLap02bg==='function';
   /* Word 15/TD */
   let bl = null; try { bl = await MAU_IN.word('kt15', g); } catch(e){ o.loiW = e.message; }
   o.w15 = bl ? Array.from(new Uint8Array(await bl.arrayBuffer())) : null;
   dongHop(); await w(100);
   /* ② 03/BB-CX */
   /* 3.500: khối riêng 🏛 Hội cấp xã — bảng Hội – xã, bấm Hội của tổ */
   [...document.querySelectorAll('#kt-the .kt-khoi > button')].find(b => /Hội cấp xã/.test(b.textContent)).click(); for(let i=0;i<30 && !document.querySelector('#kt-the .kt-hx');i++) await w(100); await w(200);
   const hx = document.querySelector('#kt-the .kt-hx'), nutHoi = hx && hx.querySelector('[data-lenh="kt7.m03"][data-k="'+ktHoiKhoa(t)+'"]');
   o.hx = ktCheDo()==='hx' && !!nutHoi && hx.querySelectorAll('tbody tr').length===ktHoiDs().filter(x => !ktCH().hoi || String(x.t.dv)===String(ktCH().hoi)).length && !document.querySelector('#kt-the [data-lenh="kt7.m15"]');
   nutHoi.click(); for(let i=0;i<30 && !(KT7.x && KT7.mau==='m03' && document.getElementById('mi-khung'));i++) await w(100); await w(300);
   const g3 = KT7.gts[0], hk = ktHoiKhoa(t), toHoi = Object.values(KT_K.to).filter(x => x.xa===t.xa && String(x.dv)===String(t.dv) && !toLaTT(x));
   let dn = 0, qh = 0, kn = 0; const kh = {}; toHoi.forEach(x => KHO.toVien(x).forEach(k => { if(!(k.dn>0)) return; kh[k.kh] = 1; dn += k.dn; qh += k.qh||0; kn += k.kn||0; }));
   o.k03 = KT7.k===hk; o.so03 = g3.f.STO===String(toHoi.length) && g3.f.SKH===String(Object.keys(kh).length) && g3.f.DN===(Math.round(dn/1e4)/100).toLocaleString('vi-VN') && g3.f.NQH===(qh ? (Math.round(qh/1e4)/100).toLocaleString('vi-VN') : '0');
   const h3 = chu(KT7.x.trang); o.h03 = KT7.x.trang;
   o.chu03 = ['BIÊN BẢN KIỂM TRA', 'Hoạt động nhận ủy thác với NHCSXH của tổ chức CT-XH cấp xã', 'I. KẾT QUẢ HOẠT ĐỘNG ỦY THÁC', 'II. KẾT QUẢ THỰC HIỆN', 'III. ĐÁNH GIÁ, NHẬN XÉT CỦA ĐOÀN KIỂM TRA', 'IV. Ý KIẾN CỦA ĐƠN VỊ ĐƯỢC KIỂM TRA',
     '727/HD-NHCS ngày 11/02/2026', 'TRƯỞNG ĐOÀN KIỂM TRA', 'Tổng số Tổ TK&VV do Hội quản lý: '+toHoi.length].filter(x => h3.indexOf(x)<0);
   o.khongV = !/V\. Ý KIẾN/.test(h3.replace('IV. Ý KIẾN', ''));
   /* khai báo cán bộ NH */
   const e = document.querySelector('[data-lenh="kt7.kb"][data-k="cb1"]'); e.value = 'Cán Bộ NH Giả'; e.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   o.kb = D.cauHinh.ktIn.kt03.cb1==='Cán Bộ NH Giả' && chu(KT7.x.trang).indexOf('Cán Bộ NH Giả')>=0;
   let b3 = null; try { b3 = await MAU_IN.word('kt03', KT7.gts[0]); } catch(e){ o.loiW3 = e.message; }
   o.w03 = b3 ? Array.from(new Uint8Array(await b3.arrayBuffer())) : null; o.f3 = KT7.gts[0].f;
   dongHop();
   /* khối A: Định kỳ (tổ đã tích) → 15/TD đúng tổ; Mẫu 04 (Hội) → 03/BB-CX đúng Hội – xã */
   KT_DK_CHON = {}; KT_DK_CHON[t.ma] = 1; await kt7Mo15('dk'); await w(400);
   o.dk15 = KT7.mau==='m15' && KT7.gts.some(x => x.t.ma===t.ma) && !!document.getElementById('mi-khung'); dongHop(); await w(100);
   ktDoiCheDo('bc'); await w(400); o.bc03 = !document.querySelector('#kt-the [data-lenh="kt7.m03"]');   /* Mẫu 04 không còn nút 03 */
   /* mẫu KTGS cũ vẫn dựng như trước (Mẫu 16) */
   o.m16 = /BIÊN BẢN KIỂM TRA/.test(chu(ktHTML16(ktGiaTri16(t, ktDaChon(), ktInV('m16')))));
   o.g15 = {f:g.f, n:g.kh.length, ten0:g.kh[0].ten, tong:tdnTien(g.tong.dn)};
   return o; }, files);
 ok('khối B: nút 📄 15/TD cạnh Mẫu 06 / 16 / 04; không còn nút 03 ở cấp tổ', r.nut);
 ok('khối 🏛 Hội cấp xã (3.500): bảng đủ Hội – xã theo lọc, mỗi Hội 1 nút 03/BB-CX, không có nút cấp tổ', r.hx);
 ok('15/TD: toàn bộ tổ viên còn nợ / lãi tồn / tiền gửi (KHO.doiChieu)', r.ds15);
 ok('15/TD: dòng Tổng cộng = tổng nợ gốc, lãi tồn, tiền gửi', r.tong15);
 ok('15/TD: nợ lãi từng món = lãi tồn', r.lai);
 ok('15/TD: đủ chữ mẫu, Đến ngày = ngày số liệu, mã tổ', !r.chu15.length, r.chu15.join(' | '));
 ok('15/TD: A4 ngang', r.ngang);
 const w15 = r.w15 ? docZip(Buffer.from(r.w15), 'word/document.xml') : '', t15 = chuW(w15);
 ok('15/TD Word (khuôn gốc): tạo được, đủ chữ mẫu, tên khách + tổng, không còn {{…}}', !!w15 && /DANH SÁCH ĐỐI CHIẾU SỐ DƯ TIỀN VAY VÀ TIỀN GỬI/.test(t15) && t15.indexOf(r.g15.ten0)>=0 && t15.indexOf(r.g15.tong)>=0 && !/\{\{/.test(w15) && /w:orient="landscape"/.test(w15), r.loiW || t15.slice(0, 120));
 ok('15/TD Word: không còn dòng ví dụ "Nguyễn Văn A" của mẫu', !/Nguyễn Văn A|70\.000\.000/.test(t15));
 ok('03/BB-CX: chọn đúng Hội – xã của tổ', r.k03);
 ok('03/BB-CX mục I: số tổ, số khách, dư nợ, NQH (triệu) khớp tự cộng', r.so03, JSON.stringify(r.f3 && {STO:r.f3.STO, SKH:r.f3.SKH, DN:r.f3.DN, NQH:r.f3.NQH}));
 ok('03/BB-CX: đủ chữ mẫu, mục III · IV (sửa từ IV · V)', !r.chu03.length && r.khongV, r.chu03.join(' | '));
 ok('03/BB-CX: khai báo cán bộ NH lưu (ktIn.kt03) và in ra', r.kb);
 const w03 = r.w03 ? docZip(Buffer.from(r.w03), 'word/document.xml') : '', t03 = chuW(w03);
 ok('03/BB-CX Word (khuôn gốc): tạo được, III / IV, số liệu vào ô, cán bộ khai báo, không còn {{…}}', !!w03 && /III\. ĐÁNH GIÁ/.test(t03) && /IV\. Ý KIẾN/.test(t03) && !/(^|[^I])V\. Ý KIẾN/.test(t03) && t03.indexOf('Cán Bộ NH Giả')>=0 && t03.indexOf(r.f3.DN)>=0 && !/\{\{/.test(w03), r.loiW3 || '');
 const hopLe = await p.evaluate(ds => ds.map(x => !!x && !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length), [w15, w03]);
 ok('Word 15/TD · 03/BB-CX: XML hợp lệ (mở được bằng Word)', hopLe[0] && hopLe[1], JSON.stringify(hopLe));
 ok('khối A Định kỳ: 15/TD theo tổ đã tích', r.dk15);
 ok('Mẫu 04 (Bắt buộc): không còn nút 03/BB-CX (đã dời lên khối Hội cấp xã)', r.bc03);
 ok('mẫu KTGS cũ (Mẫu 16) vẫn dựng', r.m16);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 /* §11 bàn phím: hộp 03 — gõ tên cán bộ, Enter → sang ô Chức vụ 1, giá trị lưu, khung khai báo không vẽ lại */
 await p.evaluate(async() => { ktDoiCheDo('hx'); await new Promise(r => setTimeout(r, 300)); kt7Mo03(''); await new Promise(r => setTimeout(r, 400)); });
 await p.focus('#mi-dau [data-lenh="kt7.kb"][data-k="cb2"]'); await p.keyboard.press('Control+A'); await p.keyboard.type('Người Thử Hai'); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
 const ph = await p.evaluate(() => ({k:document.activeElement && document.activeElement.getAttribute('data-k'), v:(D.cauHinh.ktIn.kt03||{}).cb2, xem:/Người Thử Hai/.test(KT7.x.trang)}));
 ok('03/BB-CX bàn phím (§11): Enter sang ô kế (Chức vụ 2), giữ con trỏ, lưu + hiện trên bản xem', ph.k==='cv2' && ph.v==='Người Thử Hai' && ph.xem, JSON.stringify(ph));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 if(process.env.T383_ANH){ fs.writeFileSync(path.join(process.env.T383_ANH, 'h15.html'), r.h15 || ''); fs.writeFileSync(path.join(process.env.T383_ANH, 'h03.html'), r.h03 || ''); }
 if(process.env.T383_ANH){ fs.writeFileSync(path.join(process.env.T383_ANH, 'm15.docx'), Buffer.from(r.w15 || [])); fs.writeFileSync(path.join(process.env.T383_ANH, 'm03.docx'), Buffer.from(r.w03 || [])); }
 await b.close(); })();
