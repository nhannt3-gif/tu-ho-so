// 3.289 P3 🎯 BIỂU 07 PHÂN BỔ KH — mẫu js/mau/07pb.js + hộp xem trước (js/48) trên trình duyệt, bộ GIẢ tests/gianho31 + QĐ giả.
//   ① hàm thuần: ngày thông báo (QĐ + 1, né T7 / CN), tên đơn vị xã / phường, chặn khi chưa khớp QĐ (QT-16)
//   ② ĐÚNG FORM GỐC tests/mau_goc/07pb.docx: mọi đoạn chữ cố định của file Word (bỏ ô {{…}}) có trong bản app · A4 dọc · lề 20/20/20/30 · TNR 14 · bảng 4 cột đúng bề rộng · 2 trang / xã
//   ③ chỉ in ấp có tăng / giảm, số khớp QĐ · ngày thông báo tự tính / để chấm / gõ · 📦 mọi xã của QĐ (mỗi xã 2 trang, 1 file) · 📝 Word (.docx) đúng khổ, đủ chữ
//   ④ sửa tay lệch → nút Biểu 07 khóa · không lỗi trang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path'), zlib = require('zlib');
function docZip(buf, ten){   /* đọc 1 file trong .docx (zip) — thư mục trung tâm */
  let e = buf.length-22; while(e>=0 && buf.readUInt32LE(e)!==0x06054b50) e--; let p = buf.readUInt32LE(e+16); const n = buf.readUInt16LE(e+10);
  for(let i=0;i<n;i++){ const pt = buf.readUInt16LE(p+10), csz = buf.readUInt32LE(p+20), ln = buf.readUInt16LE(p+28), lx = buf.readUInt16LE(p+30), lc = buf.readUInt16LE(p+32), off = buf.readUInt32LE(p+42), tn = buf.slice(p+46, p+46+ln).toString();
    if(tn===ten){ const d = off+30+buf.readUInt16LE(off+26)+buf.readUInt16LE(off+28), raw = buf.slice(d, d+csz); return (pt===8 ? zlib.inflateRawSync(raw) : raw).toString('utf8'); }
    p += 46+ln+lx+lc; }
  return ''; }
const doanW = x => (x.match(/<w:p[ >][\s\S]*?<\/w:p>/g) || []).map(p => (p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || []).map(t => t.replace(/<[^>]+>/g, '')).join('').replace(/&amp;/g, '&')).filter(s => s.trim());
const chuan = s => String(s).normalize('NFC').replace(/[\s ]+/g, ' ').replace(/[.…]{3,}/g, '…').trim();   /* 3.303: chuỗi chấm mịn dài hơn (giữ bề dài) → gộp khi so chữ */
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 /* chữ cố định của file gốc: mỗi đoạn tách theo ô {{…}} → các mảnh ≥ 4 ký tự */
 const goc = doanW(docZip(fs.readFileSync(path.join(__dirname, 'mau_goc', '07pb.docx')), 'word/document.xml'));
 const manh = []; goc.forEach(d => d.split(/\{\{[A-Z_0-9]+\}\}/).forEach(m => { m = chuan(m.replace(/^[\s,.;:]+|[\s,;:]+$/g, '')); if(m.length>=4) manh.push(m); }));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500); await p.evaluate(require('./pb_gia.js'));
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const wpf = {DanhSachQD:[
   {Id:'w1', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-14T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Phường Gò Dầu', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:1000, GiaoTangGiam:300, ChiTieuDen3112:1300}, {MaChuongTrinh:6, TenChuongTrinh:'', ChiTieuDaGiao:800, GiaoTangGiam:-150, ChiTieuDen3112:650}]},
   {Id:'w2', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-14T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Xã Truông Mít', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:500, GiaoTangGiam:200, ChiTieuDen3112:700}]}]};
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   /* ① hàm thuần */
   o.ngay = [pbNgayTB('2026-08-14'), pbNgayTB('2026-08-13'), pbNgayTB('2026-08-14', {ngayTB:0}), pbNgayTB('2026-08-14', {neCuoiTuan:false}), pbNgayTB('2026-08-14', {ngayTB:3})].join(' ');
   const dvP = pbDonVi('Phường Gò Dầu'), dvX = pbDonVi('Truông Mít');
   o.donVi = dvP.hoa==='PHƯỜNG GÒ DẦU' && dvP.apKp==='khu phố' && dvP.cap==='phường' && dvX.thuong==='xã Truông Mít' && dvX.apKp==='ấp';
   const kqGia = [{ma:'03', ten:'', so:300, daGiaoXa:1000, den3112Xa:1300, loiNhap:'', canhBao:'', ap:[{k:'a', ten:'Ấp A', truoc:600, dc:300, nam:900}, {k:'b', ten:'Ấp B', truoc:400, dc:0, nam:400}]}];
   const dOk = pbBieu07DL({so:'1', ngay:'2026-08-14', nguon:1, loai:'Điều chỉnh', tenXa:'Xã A'}, kqGia, pbTenCT);
   kqGia[0].ap[0].dc = 200; kqGia[0].ap[0].nam = 800;
   const dLoi = pbBieu07DL({so:'1', ngay:'2026-08-14', nguon:1, loai:'Điều chỉnh', tenXa:'Xã A'}, kqGia, pbTenCT);
   o.thuan = !dOk.loi.length && dOk.ap.length===1 && dOk.ap[0].ds[0].dc===300 && dOk.laDC && dLoi.loi.length>0;
   o.soQD = pb07SoQD({so:'123', kyHieu:'/QĐ-BĐDHĐQT'})+' · '+pb07SoQD({so:'123/QĐ-X', kyHieu:'/QĐ-BĐDHĐQT'});
   /* dữ liệu + QĐ giả */
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   await pbNhapGia(wpf, 'de');   /* 3.439: nạp QĐ giả qua mẫu Excel (bỏ nhập file WPF) */
   for(let i=0;i<40 && pbDL().qd.length<2;i++) await w(100); dongHop(); await w(100);
   Array.from(document.querySelectorAll('.pb-dong')).find(x => /Gò Dầu/.test(x.textContent)).click(); await w(100);
   document.querySelector('[data-lenh="pb.chay"]').click(); await w(300);
   const nut = document.querySelector('[data-lenh="pb.b07"]'), nutHet = document.querySelector('[data-lenh="pb.b07Het"]');
   o.nut = !!nut && !nut.disabled && !!nutHet && /\(2\)/.test(nutHet.textContent);
   /* ② ③ 1 xã */
   nut.click(); for(let i=0;i<40 && !(PB07.x && document.getElementById('pb07-khung'));i++) await w(100); await w(1200);
   const x = PB07.x, h = x.trang, d0 = PB07.dl[0];
   o.ds = x.ds.length; o.ten = x.ten;
   const tam = document.createElement('div'); tam.innerHTML = h.replace(/^[\s\S]*<body>|<\/body>[\s\S]*$/g, ''); o.chu = tam.textContent;
   o.kho = /@page\{size:A4 portrait;margin:20mm 19.6mm 20mm 29.6mm\}/.test(h) && /class="om-co pb07" style="font-size:14pt"/.test(h) && /data-w="13,83,32,32"/.test(h) && (h.match(/data-w="62,98"/g) || []).length===2 && /class="j thut tr om-co"/.test(h) && /class="om-min"/.test(h) && !/font-size:16pt/.test(h) && /<td class="r" style="padding-right:5pt">/.test(h);
   const kq = PB.kq, apDoi = {}; kq.forEach(k => k.ap.forEach(a => { if(a.dc) apDoi[a.ten] = 1; }));
   o.apIn = d0.ap.map(a => a.ten).sort().join('|')===Object.keys(apDoi).sort().join('|') && d0.ap.every(a => a.ds.every(c => c.dc!==0));
   const tong = {}; d0.ap.forEach(a => a.ds.forEach(c => { tong[c.ma] = (tong[c.ma] || 0) + c.dc; })); o.tong = JSON.stringify(tong);
   o.dau = /PHƯỜNG GÒ DẦU/.test(o.chu) && /THÔNG BÁO ĐIỀU CHỈNH KẾ HOẠCH DƯ NỢ/.test(o.chu) && /Trưởng các khu phố trên địa bàn phường/.test(o.chu) && /G100\/QĐ-GIẢ ngày 14\/08\/2026/.test(o.chu) && /NGUỒN VỐN TRUNG ƯƠNG/.test(o.chu) && /−/.test(o.chu);
   o.ngayTu = /ngày 17 tháng 08 năm 2026/.test(o.chu);   /* QĐ thứ 6 14/08 + 1 = thứ 7 → né sang thứ 2 17/08 */
   const f = document.getElementById('pb07-khung'); for(let i=0;i<30 && !(f.contentDocument && f.contentDocument.querySelectorAll('.tr-tg').length);i++) await w(200);
   o.trang = f.contentDocument ? f.contentDocument.querySelectorAll('.tr-tg').length : -1;
   o.nutXuat = Array.from(document.querySelectorAll('#pb07-nut button')).map(x => x.textContent.trim()+(x.disabled ? '(mờ)' : '')).join(' ');
   o.noiTu = /Gò Dầu, ngày 17 tháng 08/.test(o.chu) && !/Phường Gò Dầu, ngày/.test(o.chu);   /* 3.301: nơi lập mặc định = tên phường (bỏ chữ "phường") */
   const chip = (k, v) => document.querySelector('[data-lenh="pb.b07KC"][data-k="'+k+'"][data-v="'+v+'"]');
   const go = async (k, v) => { const e = document.querySelector('[data-lenh="pb.b07KG"][data-k="'+k+'"]'); e.value = v; e.dispatchEvent(new Event('change', {bubbles:true})); await w(300); };
   chip('ngayTB', 'cham').click(); await w(300);
   o.cham = (PB07.x.trang.replace(/<[^>]+>/g, '').match(/\.{3,} tháng \.{3,} năm \.{3,}/g) || []).length;
   chip('ngayTB', 'go').click(); await w(200); await go('ngayTB', '2192026');
   o.go = (PB07.x.trang.match(/21 tháng 09 năm 2026/g) || []).length;
   /* 3.301 ⚙ KHAI BÁO RIÊNG */
   const T = () => PB07.x.trang.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
   const kb = hsoKB(); kb.pgd.noi = 'Nơi Chung Giả'; kb.pgd.tinh = 'Tỉnh Chung Giả';
   document.querySelector('[data-lenh="pb.b07KB"]').click(); await w(300);
   o.kbMo = !!document.querySelector('.pb07-kb [data-lenh="pb.b07KLuu"]') && document.querySelectorAll('.pb07-kb .pb07-dong').length===8;
   o.kbTinhChung = /tỉnh Tỉnh Chung Giả về việc/.test(T()) && /Gò Dầu, ngày/.test(T());   /* tỉnh mặc định ⚙ chung; nơi lập 🤖 không theo khai báo chung */
   chip('noi', 'chung').click(); await w(300); o.kbNoiChung = /Nơi Chung Giả, ngày/.test(T());
   chip('noi', 'kb').click(); await w(300); o.kbNoiKbChua = /Nơi Chung Giả, ngày/.test(T());   /* ⌨ chưa gõ → in như nguồn chung */
   await go('noi', 'Nơi Riêng Giả'); o.kbNoiKb = /Nơi Riêng Giả, ngày/.test(T());
   chip('noi', 'cham').click(); await w(300); o.kbNoiCham = /\.\.\.\.\.\.\.\.\.\.\.\.\.\., ngày/.test(T());
   chip('noi', 'kb').click(); await w(300);
   chip('soTB', 'go').click(); await w(200); await go('soTB', '15');
   o.kbSo = /Số: 15\/TB-UBND/.test(T()) && /Thông báo số 15\/TB-UBND/.test(T());
   await go('chucDanh', 'KT. CHỦ TỊCH\nPHÓ CHỦ TỊCH'); chip('nguoiKy', 'kb').click(); await w(200); await go('nguoiKy', 'Nguyễn Văn Giả Ký'); await go('noiNhan', '- Như trên;\n- TT HĐND xã;\n- Lưu VT.');
   o.kbKy = /KT\. CHỦ TỊCH/.test(T()) && /PHÓ CHỦ TỊCH/.test(T()) && !/TM\. ỦY BAN NHÂN DÂN/.test(T()) && /Nguyễn Văn Giả Ký/.test(T()) && /TT HĐND xã/.test(T());
   document.querySelector('[data-lenh="pb.b07Co"][data-v="13.5"]').click(); await w(300);
   o.kbCo = /font-size:13.5pt/.test(PB07.x.trang) && !/class="om-co pb07" style="font-size:14pt"/.test(PB07.x.trang);
   o.kbChuaLuu = /chưa lưu/.test(document.getElementById('pb07-dau').textContent) && !(pbDL().ch.b07 && pbDL().ch.b07.gt && pbDL().ch.b07.gt.noi);
   document.querySelector('[data-lenh="pb.b07KHuy"]').click(); await w(300);
   o.kbHuy = /Gò Dầu, ngày/.test(T()) && /TM\. ỦY BAN NHÂN DÂN/.test(T()) && /class="om-co pb07" style="font-size:14pt"/.test(PB07.x.trang) && !/Số: 15/.test(T());   /* cách chọn (kể cả ✏ của số TB) trả về bản đã lưu */
   chip('noi', 'kb').click(); await w(200); await go('noi', 'Nơi Riêng Giả'); await go('chucDanh', 'KT. CHỦ TỊCH\nPHÓ CHỦ TỊCH');
   document.querySelector('[data-lenh="pb.b07KLuu"]').click(); await w(300);
   const L = pbDL().ch.b07 || {}; o.kbLuu = L.cach && L.cach.noi==='kb' && L.gt.noi==='Nơi Riêng Giả' && /PHÓ CHỦ TỊCH/.test(L.gt.chucDanh) && !L.go && !/chưa lưu/.test(document.getElementById('pb07-dau').textContent);
   kb.pgd.noi = 'Nơi Chung Đổi'; pb07Ve(); await w(200); o.kbKhongTheoChung = /Nơi Riêng Giả, ngày/.test(T()) && !/Nơi Chung Đổi/.test(T());
   document.querySelector('[data-lenh="pb.b07KM"][data-k="noi"]').click(); await w(300); o.kbMD = /Gò Dầu, ngày/.test(T()) && /chưa lưu/.test(document.getElementById('pb07-dau').textContent);
   dongHop(); await w(100); document.querySelector('[data-lenh="pb.b07"]').click(); for(let i=0;i<40 && !document.getElementById('pb07-khung');i++) await w(100); await w(300);
   o.kbMoLai = /Nơi Riêng Giả, ngày/.test(T()) && /PHÓ CHỦ TỊCH/.test(T()) && !/Số: <span class="o-sl">15/.test(PB07.x.trang);   /* đóng chưa lưu → bỏ; đã lưu giữ; ✏ không nhớ */
   o.kbMauKhac = !JSON.stringify(hsoLuu()).includes('Nơi Riêng Giả');   /* không ghi vào khai báo các mẫu Hồ sơ */
   kb.pgd.noi = ''; kb.pgd.tinh = '';   /* trả khai báo PGD giả về mặc định */
   document.querySelector('[data-lenh="pb.b07KB"]').click(); await w(200);   /* về mặc định (nháp) để Word so đủ chữ của file gốc */
   for(const k of ['noi', 'chucDanh']){ document.querySelector('[data-lenh="pb.b07KM"][data-k="'+k+'"]').click(); await w(200); }
   chip('ngayTB', 'go').click(); await w(200); await go('ngayTB', '2192026');
   /* 📝 Word */
   let blob = null, tenF = ''; const gf = window.giaoFile; window.giaoFile = (bl, t) => { blob = bl; tenF = t; };
   pb07Word(); for(let i=0;i<50 && !blob;i++) await w(100); window.giaoFile = gf;
   if(blob){ const u = new Uint8Array(await blob.arrayBuffer()); let s = ''; for(let i=0;i<u.length;i++) s += String.fromCharCode(u[i]); o.word = btoa(s); } o.tenWord = tenF;
   dongHop(); await w(100);
   /* 📦 mọi xã */
   document.querySelector('[data-lenh="pb.b07Het"]').click(); for(let i=0;i<40 && !(PB07.dl.length===2 && document.getElementById('pb07-khung'));i++) await w(100); await w(300);
   o.het = PB07.dl.map(d => d.dv.thuong+':'+d.ap.length).join(' | ')+' · ds '+PB07.x.ds.length+' · '+PB07.x.ten;
   o.hetChu = /XÃ TRUÔNG MÍT/.test(PB07.x.trang) && /Trưởng các ấp trên địa bàn xã/.test(PB07.x.trang);
   const kb2 = pbDL(); delete kb2.ch.b07; pbGhi(kb2); dongHop(); await w(100);   /* nơi lập 🤖 theo từng xã: bỏ khai báo đã lưu rồi xuất lại */
   document.querySelector('[data-lenh="pb.b07Het"]').click(); for(let i=0;i<40 && !(PB07.dl.length===2 && document.getElementById('pb07-khung'));i++) await w(100); await w(300);
   const T2 = PB07.x.trang.replace(/<[^>]+>/g, ''); o.hetNoi = /Gò Dầu, ngày/.test(T2) && /Truông Mít, ngày/.test(T2);
   dongHop(); await w(100);
   /* ④ sửa tay lệch → khóa nút */
   const o1 = document.querySelector('#pb-kq input[data-lenh="pb.suaTay"][data-ct="0"]'); o1.value = String((PB.kq[0].ap[0].dc || 0) + 100); o1.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   o.khoa = document.querySelector('[data-lenh="pb.b07"]').disabled;
   document.getElementById('hop-in').innerHTML = ''; let baoL = ''; const bl0 = window.baoLoi; window.baoLoi = t => { baoL = t; }; pb07Mo(false); for(let i=0;i<20 && !baoL;i++) await w(100); window.baoLoi = bl0;
   o.chan = /chưa khớp QĐ/.test(baoL) && !document.getElementById('pb07-khung'); o.chanChu = baoL+' · khung:'+!!document.getElementById('pb07-khung');
   return o; }, [files, wpf]);
 ok('3.301 nơi lập mặc định 🤖 = tên phường (bỏ chữ "phường")', r.noiTu);
 ok('3.301 ⚙ Khai báo riêng mở: 7 ô + cỡ chữ, có 💾 Lưu', r.kbMo);
 ok('tỉnh mặc định ⚙ khai báo chung (PGD); nơi lập 🤖 không theo khai báo chung', r.kbTinhChung);
 ok('nơi lập: ⚙ chung → lấy PGD › Nơi lập; ⌨ chưa gõ → in như chung; ⌨ gõ → chữ riêng; ✍ → chấm', r.kbNoiChung && r.kbNoiKbChua && r.kbNoiKb && r.kbNoiCham, [r.kbNoiChung, r.kbNoiKbChua, r.kbNoiKb, r.kbNoiCham].join());
 ok('số thông báo ✏ gõ → in ở cả 2 trang', r.kbSo);
 ok('chức danh ký, người ký, nơi nhận ⌨ → bản in đổi theo', r.kbKy);
 ok('cỡ chữ 13,5 → bản in 13,5 pt', r.kbCo);
 ok('sửa chưa lưu: báo ● chưa lưu, chưa ghi kho', r.kbChuaLuu);
 ok('✕ Hủy → trả lại cách / chữ / cỡ như lần lưu trước', r.kbHuy);
 ok('💾 Lưu → KHO1 pb.ch.b07 (cách + chữ riêng, không lưu ✏)', r.kbLuu);
 ok('đã ⌨ riêng → sửa khai báo chung PGD không đổi Biểu 07', r.kbKhongTheoChung);
 ok('↺ ô về mặc định (🤖 tên xã), báo chưa lưu', r.kbMD);
 ok('đóng chưa lưu → mở lại theo bản đã lưu; ✏ không nhớ', r.kbMoLai);
 ok('khai báo riêng không ghi vào khai báo các mẫu Hồ sơ', r.kbMauKhac);
 ok('📦 mọi xã: nơi lập 🤖 đúng từng xã (Gò Dầu, Truông Mít)', r.hetNoi);
 ok('ngày thông báo: QĐ + 1, né T7 / CN; khai báo số ngày / tắt né cuối tuần', r.ngay==='2026-08-17 2026-08-14 2026-08-14 2026-08-15 2026-08-17', r.ngay);
 ok('tên đơn vị: phường → khu phố, tên không tiền tố → xã', r.donVi);
 ok('dữ liệu Biểu 07: chỉ ấp có tăng/giảm; lệch QĐ → trả lỗi (chặn)', r.thuan);
 ok('số QĐ ghép ký hiệu (số đã có ký hiệu thì giữ)', r.soQD==='123/QĐ-BĐDHĐQT · 123/QĐ-X', r.soQD);
 ok('khớp QĐ → nút 👁 Biểu 07 bật, 📦 mọi xã (2)', r.nut);
 ok('1 xã = 2 trang mẫu (Thông báo + Danh mục), tên file chuẩn', r.ds===2 && /^Bieu07Pb_/.test(r.ten), r.ds+' · '+r.ten);
 const thieu = manh.filter(m => chuan(r.chu).indexOf(m)<0);
 ok('ĐÚNG FORM GỐC: '+manh.length+' mảnh chữ cố định của 07pb.docx đều có trong bản app', manh.length>=25 && !thieu.length, thieu.slice(0, 5).join(' | '));
 ok('A4 dọc · lề trên 2 · dưới 2 · trái 3 · phải 2 cm (−0,4 khung) · TNR 14 · 3.303 chuẩn hành chính: tên cơ quan góc trái cả 2 trang (62/98), bảng STT 13 · Chỉ tiêu 83 · số 32/32 canh phải, đoạn canh đều thụt 1 cm cách 6 pt, chấm mịn, tên loại 14 đậm', r.kho);
 ok('bảng chỉ in ấp có tăng/giảm; tổng mỗi CT = số QĐ (03 +300, 06 −150)', r.apIn && r.tong==='{"03":300,"06":-150}', r.tong);
 ok('đầu trang / kính gửi / căn cứ QĐ / nguồn vốn / số giảm in dấu −', r.dau);
 ok('ngày thông báo tự tính 17/08/2026 (né thứ 7)', r.ngayTu);
 ok('xem trước chia đúng 2 trang A4', r.trang===2, r.trang);
 ok('bộ nút xuất chung: In · PDF · Word bật', /🖨 In/.test(r.nutXuat) && !/🖨 In\(mờ\)/.test(r.nutXuat) && /📝 Word/.test(r.nutXuat) && !/Word\(mờ\)/.test(r.nutXuat), r.nutXuat);
 ok('để chấm → 2 chỗ ngày "...... tháng ...... năm ......"', r.cham===2, r.cham);
 ok('gõ ngày 2192026 → 21 tháng 09 năm 2026 (2 chỗ)', r.go===2, r.go);
 let wx = '', ws = '';
 if(r.word){ const buf = Buffer.from(r.word, 'base64'); wx = docZip(buf, 'word/document.xml'); ws = docZip(buf, 'word/styles.xml'); }
 const boTrang = s => chuan(s).replace(/ /g, ''), wChu = chuan(doanW(wx).join(' ')), wThieu = manh.filter(m => boTrang(wChu).indexOf(boTrang(m))<0);
 ok('📝 Word: file .docx, 2 phần A4 dọc, lề trái ~30 mm, đủ chữ cố định của mẫu gốc', /\.docx$/.test(r.tenWord) && (wx.match(/<w:pgSz w:w="11906" w:h="16838"\/>/g) || []).length===2 && /w:left="16[6-9]\d"/.test(wx) && !wThieu.length && /21 tháng 09 năm 2026/.test(wChu), r.tenWord+' · thiếu: '+wThieu.slice(0, 3).join(' | '));
 const szDem = (wx.match(/<w:sz w:val="\d+"/g) || []).reduce((a, x) => { const k = x.replace(/\D/g, ''); a[k] = (a[k] || 0) + 1; return a; }, {});
 ok('📝 Word cỡ chữ thân 14 (sz 28), tên loại 14 đậm (không còn 16 — NĐ 30)', szDem[28] > 10 && !szDem[32] && /Times New Roman/.test(ws), JSON.stringify(szDem));
 ok('📦 mọi xã của QĐ: 2 xã, mỗi xã 2 trang, 1 file', /phường Gò Dầu:\d+ \| xã Truông Mít:\d+ · ds 4 · Bieu07Pb_Qd/.test(r.het) && r.hetChu, r.het);
 ok('sửa tay lệch QĐ → nút Biểu 07 khóa, gọi thẳng cũng bị chặn', r.khoa && r.chan, r.khoa+' · '+r.chanChu);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); const dat = R.filter(x => x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); process.exit(dat===R.length ? 0 : 1);
})();
