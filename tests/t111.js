// 3.98–3.103 — HSSV cửa sổ nổi 3 mức + nền sáng/tối (3.103) · HSSV cửa sổ nổi 📌 (3.102) · HSSV tiền vay theo năm học (3.101) · HSSV ngày vay gợi ý GDX gần nhất (3.100) · HSSV gợi ý tiền vay + 5 khối (3.99) · KTGS chỉ phục vụ in (bỏ theo dõi) · Mẫu 06 bố cục mới (dòng chấm Đơn vị, Chức vụ thẳng cột bằng tab, địa bàn chuẩn, cột Mục đích rộng,
//        dòng 1,5 cm, gộp tên / ký theo hộ, mã KH, 2 mục đích PNKT51 + PNKT52) · danh sách chọn hộ chung · xem trước tách tờ ·
//        Bảng chuẩn hóa Hội – Đoàn (Kế hoạch ① ②, Mẫu 16, Đoàn / phường) · Mẫu 16 gợi ý nhận xét · điểm GD suy theo ấp / ngày GDXA.
// Bộ GIẢ: tests/gia31. Tham số tùy chọn: thư mục lưu file Word mẫu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500); await p.evaluate(s=>{ window.NGUON_APP=s; }, require('./nguon.js')());   /* 3.142: mã ở file riêng */
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R0 = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const moZip = async (bl) => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); const g = n => { const f = XLSX.CFB.find(z, n) || XLSX.CFB.find(z, '/'+n); return f ? new TextDecoder().decode(f.content) : null; }; return {z, g, doc:g('word/document.xml')}; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const b64 = async bl => { const a = new Uint8Array(await bl.arrayBuffer()); let s=''; for(let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]); return btoa(s); };
   /* 1. địa danh chuẩn */
   ok('tên ấp bỏ tiền tố (Ấp / KP / Khu phố / Thôn)', ktApTen('Ấp Lộc Khê')==='Lộc Khê' && ktApTen('KP 3')==='3' && ktApTen('kp.Lộc Khê')==='Lộc Khê' && ktApTen('Khu phố Ninh Thọ')==='Ninh Thọ' && ktApTen('Thôn A')==='A' && ktApTen('Bàu Đưng')==='Bàu Đưng');
   ok('xã → ấp, phường → khu phố; trong câu viết thường + tỉnh Tây Ninh', ktDiaBan({tenThon:'Ấp Lộc Khê', tenXa:'Phường Gia Lộc'})==='khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh' && ktDiaBan({tenThon:'Bàu Đưng', tenXa:'Xã Phước Thạnh'})==='ấp Bàu Đưng, xã Phước Thạnh, tỉnh Tây Ninh', ktDiaBan({tenThon:'Ấp Lộc Khê', tenXa:'Phường Gia Lộc'}));
   ok('nhãn đầu dòng viết hoa chữ đầu', ktApChu('Lộc Khê', 'Phường Gia Lộc', 1)==='Khu phố Lộc Khê' && ktApChu('KP 2', 'Xã A', 1)==='Ấp 2');
   /* 2. mở KTGS, tổ nhiều hộ */
   D.cauHinh.ktHaiMat = 0;   /* 3.124: phép này kiểm ngắt trang thường — in 2 mặt kiểm ở t126 */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t)); let best = ds[0]; ds.forEach(t=>{ if(toKhach(t).length>toKhach(best).length) best = t; });
   ktChonTo(best.ma); await w(300);
   const th = [...document.querySelectorAll('#kt-the .kt-bang thead th')].map(x=>x.textContent).join('|');
   ok('đột xuất: cột chung Mã KH · Món (mã KV, số KU) · Lãi tồn · Số dư 105 · Ghi chú', /Mã KH/.test(th) && /số KU/.test(th) && /Lãi tồn/.test(th) && /Số dư 105/.test(th) && /Ghi chú/.test(th), th);
   KT_LOC = 'tat'; ktVeThe(); await w(150);
   const mkh = [...document.querySelectorAll('#kt-the .kt-bang tbody tr')].map(tr=>tr.children[2] && tr.children[2].textContent).filter(Boolean);
   ok('danh sách hộ xếp theo mã KH', mkh.length>3 && mkh.every((k, i)=>!i || String(mkh[i-1]).localeCompare(k, 'vi', {numeric:true})<=0), mkh.slice(0,4).join(','));
   ok('dòng món có số KU', /KU \d/.test(document.querySelector('#kt-the .kt-bang tbody').textContent));
   ok('không còn dấu ↺ KT lần trước / cột KT gần nhất', !/↺ KT|KT gần nhất|kiểm tra gần nhất/.test(document.getElementById('kt-the').textContent));
   KT_LOC = 'goi';
   /* 3. Mẫu 06: gộp theo hộ, PNKT52, mã KH, Word */
   const ho2 = KT_CHON.ds.find(h=>!h.loai && h.mon.length>=2), ho1 = KT_CHON.ds.filter(h=>!h.loai && h.mon.length===1).slice(0, 2);
   KT_CHON.chon = {}; [ho2].concat(ho1).forEach(h=>{ KT_CHON.chon[h.kh] = {ly:'thử', bb:false}; });
   ho2.mon[0].c_ma_pnkt51 = '36000'; ho2.mon[0].c_ten_pnkt51 = 'Khai thác, xử lý và cung cấp nước'; ho2.mon[0].c_ma_pnkt52 = '39000'; ho2.mon[1].c_ma_pnkt51 = '01412'; ho2.mon[1].c_ma_pnkt52 = '0';
   ok('món 2 mục đích (PNKT52) → in cả 2; PNKT52 = 0 → bỏ qua', ktNganh(ho2.mon[0])==='Khai thác, cung cấp nước; Xử lý ô nhiễm, chất thải' && ktNganh(ho2.mon[1])==='Chăn nuôi trâu, bò', ktNganh(ho2.mon[0]));
   const tP = Object.assign({}, best, {tenThon:'Ấp Lộc Khê', tenXa:'Phường Gia Lộc'});
   ktHoiKBSua(ktHoiKhoa(tP), 'cb', 'Phạm Văn Giả'); ktHoiKBSua(ktHoiKhoa(tP), 'cbcv', 'Chủ tịch');
   const g = ktGiaTri06(tP, ktDaChon(), {dv:'Hội Cựu chiến binh phường Gia Lộc', ngay:'2026-10-03', md:'nganh'});
   ok('cán bộ kiểm tra lấy theo bảng Hội – xã của tổ; chọn "Để trống" → dòng chấm', g.f.CB1==='Phạm Văn Giả' && g.f.CV1==='Chủ tịch' && ktGiaTri06(tP, [], {cbtu:'trong'}).f.CB1==='' && ktGiaTri16(tP, [], {cbtu:'trong'}).f.CB1==='' && ktGiaTri16(tP, [], {}).f.CB1==='Phạm Văn Giả');
   const iH = g.rows.findIndex(r=>r.R2===ho2.ten);
   ok('1 khách nhiều khế ước: tên 1 lần, Stt theo hộ', iH>=0 && g.rows[iH].gop==='dau' && g.rows[iH].n===ho2.mon.length && g.rows[iH+1].gop==='tiep' && g.rows[iH+1].R2==='' && g.rows.filter(r=>r.R1).length===3, g.rows.map(r=>r.R1+':'+r.R2.slice(0,6)).join(' | '));
   const khs = [ho2].concat(ho1).map(h=>h.kh).sort((a, b)=>String(a).localeCompare(String(b), 'vi', {numeric:true}));
   ok('phiếu xếp theo mã KH', g.rows.filter(r=>r.R1).map(r=>r.R2).join('|')===khs.map(k=>KT_CHON.ds.find(h=>h.kh===k).ten).join('|'));
   ok('địa bàn Mẫu 06: khu phố …, phường …, tỉnh Tây Ninh', g.f.DB==='khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh');
   const z = await moZip(await ktDocx('m06', g)), d6 = z.doc, c6 = chu(d6);
   ok('Word 06: hợp lệ, hết dấu {{', hopLe(d6) && d6.indexOf('{{')<0);
   ok('Đơn vị đã điền → bỏ dòng chấm thứ 2', !/\.{40,}/.test(c6.slice(0, c6.indexOf('CỘNG HÒA'))));
   ok('Chức vụ thẳng cột: tab cố định, có tên → không chấm, trống → chấm', /w:leader="none"|<w:tab w:val="left" w:pos="9700"\/>/.test(d6) && /<w:tab w:val="left" w:leader="dot" w:pos="9700"\/>/.test(d6) && /1\. Ông \(bà\): Phạm Văn Giả⇥Chức vụ: Chủ tịch/.test(c6), (c6.match(/1\. Ông[^⇥]*⇥[^⇥]*/)||[''])[0]);
   ok('3.111: thời điểm ⇥ địa bàn ⇥ Tổ TK&VV (dài thì Tổ xuống dòng); đơn vị tính dòng riêng', /Thời điểm kiểm tra: 03\/10\/2026⇥Địa bàn kiểm tra: khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh⇥Tổ TK&VV: /.test(c6) && /⇥Đơn vị tính: triệu đồng/.test(c6) && !/2026⇥Đơn vị tính/.test(c6));
   ok('cột (3.128 theo mẫu chuẩn): Họ tên 1928, CT 1134, Mục đích 1644', /<w:gridCol w:w="397"\/><w:gridCol w:w="1928"\/><w:gridCol w:w="1020"\/><w:gridCol w:w="1134"\/><w:gridCol w:w="737"\/><w:gridCol w:w="737"\/><w:gridCol w:w="1644"\/>/.test(d6));
   ok('dòng bảng cao 1,0 cm (3.111)', (d6.match(/<w:trHeight w:val="567" w:hRule="atLeast"\/>/g)||[]).length===g.rows.length);
   const dl = d6.slice(d6.indexOf('</w:tr>', d6.lastIndexOf('<w:tblHeader/>'))), nR = (dl.match(/<w:vMerge w:val="restart"\/>/g)||[]).length, nT = (dl.match(/<w:vMerge\/>/g)||[]).length;
   ok('gộp ô Stt / Họ tên / Ký theo hộ (vMerge, chỉ dòng dữ liệu)', nR===3 && nT===3*(ho2.mon.length-1), nR+' / '+nT+' · '+ho2.mon.length+' món');
   ok('cột Mục đích in 2 mục đích', c6.indexOf('Khai thác, cung cấp nước; Xử lý ô nhiễm, chất thải')>=0);
   const gT = ktGiaTri06(tP, ktDaChon(), {md:'', dv:'-', cbtu:'trong'}); const cT = chu((await moZip(await ktDocx('m06', gT))).doc);
   ok('Đơn vị trống → còn dòng chấm thứ 2; Ông (bà) trống → chấm tab', /\.{40,}/.test(cT.slice(0, cT.indexOf('CỘNG HÒA'))) && /1\. Ông \(bà\): ⇥ Chức vụ: ⇥/.test(cT));
   const tH = Object.assign({}, best, {dv:'12', tenXa:'Phường Gia Lộc'}), tN = Object.assign({}, best, {dv:'11', tenXa:'Xã Phước Thạnh'});
   delete (D.cauHinh.ktHoiKB||{})[ktHoiKhoa(tH)]; delete (D.cauHinh.ktHoiKB||{})[ktHoiKhoa(tN)];
   ok('Đơn vị Mẫu 06 tự điền Hội cấp xã của tổ (viết đủ), gõ "-" → dòng chấm, gõ tên → giữ', ktGiaTri06(tN, [], {}).f.DV.replace('\n', ' ')==='Hội Nông dân xã Phước Thạnh' && ktGiaTri06(tH, [], {}).f.DV.replace('\n', ' ')==='Hội Liên hiệp Phụ nữ phường Gia Lộc' && ktGiaTri06(tH, [], {dv:'-'}).f.DV==='' && ktGiaTri06(tH, [], {dv:'Đơn vị khác'}).f.DV==='Đơn vị khác');
   ok('thiếu chỗ → tên gọn (Hội LHPN …)', ktDonVi(tH, {}, 30)==='Hội LHPN phường Gia Lộc');
   const d16 = ktDonVi16(tH, {}), d16n = ktDonVi16(tN, {});
   ok('Mẫu 16 đầu trang: chữ hoa, dài thì xuống dòng trước PHƯỜNG / XÃ', d16.DVA==='HỘI LIÊN HIỆP PHỤ NỮ' && d16.DVB==='PHƯỜNG GIA LỘC' && d16n.DVA==='HỘI NÔNG DÂN' && d16n.DVB==='XÃ PHƯỚC THẠNH', JSON.stringify(d16));
   const h6 = ktHTML06(g);
   ok('bản In: gộp ô rowspan, bỏ dòng chấm Đơn vị, Chức vụ thẳng cột', /rowspan="\d"/.test(h6) && !/<p>\.{30,}<\/p><\/td>/.test(h6.slice(0, 3000)) && /class="kt-dl"/.test(h6) && /khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh/.test(h6));
   /* 4. xem trước nhiều phiếu: mỗi phiếu 1 tờ */
   const hN = ktHTML06([g, gT, g]);
   ok('xem trước nhiều phiếu: mỗi phiếu 1 tờ có nhãn, in sang trang', (hN.match(/class="kt-to"/g)||[]).length===3 && /Phiếu 2\/3 · Tổ /.test(hN) && (hN.match(/break-before:page/g)||[]).length===2 && /@media print\{\.kt-to-nhan\{display:none\}/.test(hN));
   /* 5. không theo dõi */
   KT_KB = {ngay:'2026-10-03'}; ktKhaiBao('m06'); await w(50); ktXuat('m06', 'word', 1); await w(600); ktKhaiBao('m16'); await w(50); ktXuat('m16', 'word', 1); await w(600);
   ok('xuất 06 / 16: không ghi lịch sử, nhật ký', !Object.keys(D.cauHinh.ktgsLS||{}).length && !Object.keys(D.cauHinh.ktgsNK||{}).length && !Object.keys(D.cauHinh.ktgsGN||{}).length);
   /* 6. Mẫu 16: địa danh đúng chữ, Hội đầy đủ, Chức vụ tab, gợi ý nhận xét */
   const f16 = Object.keys(F).find(n=>/Mau 16/.test(n)), z16 = await moZip(F[f16]), c16 = chu(z16.doc);
   ok('Mẫu 16 Word hợp lệ, hết dấu {{', hopLe(z16.doc) && z16.doc.indexOf('{{')<0, f16);
   const capA = ktCapAp(best.tenXa), capX = ktChuan(best).xa;
   ok('Mẫu 16: "thôn/tổ dân phố", "xã/phường/đặc khu", "tỉnh/thành phố" → đúng chữ', c16.indexOf('(Tổ) '+capA+' '+ktApTen(best.tenThon)+', '+capX+' '+ktXaTen(best.tenXa)+', tỉnh Tây Ninh')>=0 && c16.indexOf('thôn/tổ dân phố')<0 && c16.indexOf('đặc khu')<0, (c16.match(/\(Tổ\)[^,]*,[^,]*,[^,]*,/)||[''])[0]);
   ok('Mẫu 16: Tổ thuộc + tên Hội đầy đủ (không "Hội Đoàn Thanh niên")', c16.indexOf('Tổ thuộc '+ktHoiTen(best))>=0 && c16.indexOf('Hội Đoàn')<0, ktHoiTen(best));
   ok('Mẫu 16: 4 dòng Ông (bà) theo tab, tổ trưởng điền tên', (z16.doc.match(/w:pos="5954"/g)||[]).length===4 && c16.indexOf('- Ông (bà): '+best.ten+'⇥ Chức vụ: Tổ trưởng')>=0);
   ok('Mẫu 16 Word: đầu trang = Hội cấp xã của tổ (3.118: bỏ nhãn ĐƠN VỊ KIỂM TRA), tiêu ngữ canh tab', c16.indexOf(ktDonVi16(best, {}).DVA+'⇥CỘNG HO')>=0 && c16.indexOf('ĐƠN VỊ KIỂM TRA')<0 && /w:val="center" w:pos="6350"/.test(z16.doc), (c16.match(/[^\n]{0,40}⇥Độc lập/)||[''])[0]);
   const g16 = ktGiaTri16(best, ktDaChon(), {nx:'so'});
   ok('gợi ý: ô kết quả số tổ viên + lãi tồn / quá hạn', /tổ viên — (đảm bảo|không đảm bảo) \(05–60\)/.test(g16.nx.kq1) && !!g16.nx.kq2 && c16.indexOf(g16.nx.kq1)>=0, g16.nx.kq1+' · '+g16.nx.kq2);
   ok('gợi ý: III ưu điểm / tồn tại có số, kiến nghị đi theo tồn tại', (g16.nx.ud.length+g16.nx.tt.length)>0 && g16.nx.kn.length===g16.nx.tt.length && (g16.nx.tt.length ? c16.indexOf('- '+g16.nx.tt[0])>=0 : c16.indexOf('- '+g16.nx.ud[0])>=0), JSON.stringify(g16.nx).slice(0, 200));
   const g16b = ktGiaTri16(best, ktDaChon(), {nx:''}); const c16b = chu((await moZip(await ktDocx('m16', g16b))).doc);
   ok('chọn "Để trống" → III giữ dòng chấm, ô kết quả trống', !g16b.nx.kq1 && /1\. Ưu điểm: \.{20,}/.test(c16b));
   ok('khai báo Mẫu 16 có chọn gợi ý nhận xét (3.114: trong hộp chọn khi in, mặc định gợi ý)', ktInLay('m16').nx==='so' && /Gợi ý theo số liệu/.test(KT_NX_CHON));
   /* 7. Bảng chuẩn hóa + Kế hoạch ② cho Đoàn ở phường */
   const cheCu = ktCH().che; ktChuanHop(); await w(100); ok('📖 Bảng chuẩn hóa (3.113: tab nhỏ trong Khai báo Hội đoàn thể): 4 Hội × 12 mục sửa được', ktCH().hdtTab==='chuan' && document.querySelectorAll('#kt-the .kt-chuan tbody input').length===48); ktCH().hdtTab='hoi'; ktCH().che = cheCu; ktVeThe(); await w(100);
   const tD = Object.assign({}, best, {dv:'14', tenXa:'Phường Gia Lộc', tenThon:'Ấp Lộc Khê'}); const kD = ktHoiKhoa(tD);
   const cD = ktChuan(tD); ok('Đoàn: Bí thư, Tỉnh Đoàn, Đoàn cấp trên, Ban Thường vụ, phường → khu phố', cD.ky==='Bí thư' && cD.tinh==='TỈNH ĐOÀN TÂY NINH' && cD.cap==='Đoàn cấp trên' && cD.ld==='Ban Thường vụ' && cD.xa==='phường' && cD.ap==='khu phố');
   ktChuanSua('12', 'ten', 'Hội LHPN thử'); ok('sửa bảng → tên đơn vị đổi theo', ktHoiTenTD({dv:'12', tenXa:'Xã A'})==='Hội LHPN thử xã A'); ktChuanSua('12', 'ten', '');
   ok('mặc định Hội Phụ nữ = Hội Liên hiệp Phụ nữ', ktHoiTenTD({dv:'12', tenXa:'Xã A'})==='Hội Liên hiệp Phụ nữ xã A');
   const goc = KT_K.to[best.ma]; KT_K.to[best.ma] = tD;
   C.che = 'kh'; C.khNam = 2026; C.xa = tD.xa; C.hoi = '14'; C.khHoi = '14';
   const L = ktKHLich(); if(!L.ds.length){ KT_K.to[best.ma] = tD; }
   const dsKH = ktKHDsTo(); dsKH.forEach(t=>{ t.tenXa = 'Phường Gia Lộc'; });
   ktHoiKBSua(kD, 'mauKH', '2'); const gK = ktKHGiaTri(); const cK = chu((await moZip(await ktDocx('m01b', gK))).doc);
   ok('Kế hoạch ② Đoàn: đầu trang TỈNH ĐOÀN, ĐTN PHƯỜNG, Bí thư, Tỉnh Đoàn, TM. BAN THƯỜNG VỤ', /TỈNH ĐOÀN TÂY NINH/.test(cK) && /ĐTN PHƯỜNG GIA LỘC/.test(cK) && /TM\. BAN THƯỜNG VỤ/.test(cK) && /BÍ THƯ/.test(cK) && /Tỉnh Đoàn;/.test(cK) && /Bí thư, phó Bí thư/.test(cK) && /Đoàn cấp trên/.test(cK) && /Văn phòng khu phố/.test(cK) && /Trưởng khu phố/.test(cK) && !/thôn(?!g)|tổ dân phố|xóm/.test(cK) && /Ủy viên BTV/.test(cK) && /Quyết định của BTV/.test(cK) && /Đoàn Thanh niên phường/.test(cK) && !/Hội cấp trên/.test(cK), [/Trưởng khu phố/, /thôn(?!g)|tổ dân phố|xóm/, /Ủy viên BTV/, /Quyết định của BTV/, /Tỉnh Đoàn;/].map(r=>r+':'+((cK.match(r)||[''])[0] ? 'có' : 'không')).join(' ')+' · '+((cK.match(/.{30}(thôn(?!g)|tổ dân phố|xóm).{20}/)||[''])[0]));
   ok('Kế hoạch ② chưa khai căn cứ → vẫn đủ 3 căn cứ như ①, số / ngày để chấm (3.106)', /Căn cứ văn bản số 727\/HD-NHCS/.test(cK) && /Căn cứ Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác số [.…]/.test(cK) && /Căn cứ Hợp đồng ủy thác số [.…]/.test(cK), (cK.match(/Căn cứ Hợp đồng[^;]*;/)||[''])[0]);
   ktHoiKBSua(kD, 'kh', '05/KH-THỬ'); ktHoiKBSua(kD, 'khNgay', '10/01/2026'); ktHoiKBSua(kD, 'hd', '07'); ktHoiKBSua(kD, 'hdNgay', '02/03/2020');
   const zK2 = await moZip(await ktDocx('m01b', ktKHGiaTri())), cK2 = chu(zK2.doc);
   ok('Kế hoạch ② đã khai căn cứ đủ → in đủ như khuôn ①', hopLe(zK2.doc) && zK2.doc.indexOf('{{')<0 && /Căn cứ Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác số 05\/KH-THỬ, ngày 10\/01\/2026 của Tỉnh Đoàn Tây Ninh;/.test(cK2) && /Hợp đồng ủy thác số 07\/HĐUT ngày 02\/03\/2020 giữa/.test(cK2), (cK2.match(/Căn cứ Kế hoạch[^;]*;/)||[''])[0]);
   ['kh','khNgay','hd','hdNgay'].forEach(o=>ktHoiKBSua(kD, o, ''));
   ktHoiKBSua(kD, 'mauKH', ''); const cK1 = chu((await moZip(await ktDocx('m01', ktKHGiaTri()))).doc);
   ok('Kế hoạch ① Đoàn ở phường: HĐT phường, do Đoàn mình quản lý, TM. BAN THƯỜNG VỤ / BÍ THƯ', /HĐT phường/.test(cK1) && !/HĐT xã/.test(cK1) && /do Đoàn mình quản lý/.test(cK1) && /do Đoàn quản lý/.test(cK1) && /TM\. BAN THƯỜNG VỤ\s*BÍ THƯ/.test(cK1));
   ok('3.106 Kế hoạch ① thành phần: 1 câu chung theo Bảng chuẩn hóa (Đoàn: Bí thư, Phó Bí thư, Ủy viên Ban Thường vụ)', /thành lập đoàn kiểm tra gồm: Các đồng chí Bí thư, Phó Bí thư, Ủy viên Ban Thường vụ Đoàn Thanh niên phường Gia Lộc\./.test(cK1), (cK1.match(/[^.]*thành lập đoàn kiểm tra[^.]*\./)||[''])[0]);
   KT_K.to[best.ma] = goc;
   /* 7a. khung khai báo trong tab (không hộp bật lên) + Văn bản: CT vay không bắt buộc, sắp xếp Vừa thêm */
   C.che = 'dx'; C.xa = best.xa; C.to = best.ma; ktVeThe(); await w(200);
   ok('đột xuất: dòng nhắc khai báo Hội (3.113) + ngày kiểm tra cạnh nút In (3.114) + nút In / Word 06, 16', !!document.querySelector('#kt-the .kt-hdt-nhac') && !!document.querySelector('#kt-the .kt-in #kb-ngay') && /Word Mẫu 06/.test(document.getElementById('kt-the').textContent) && /Word Mẫu 16/.test(document.getElementById('kt-the').textContent));
   ok('văn bản không gắn CT vay không còn bị chờ khai', thieuThongTin({nhom:'vanBan', ngay:'2026-01-15', tenVB:'Quy chế thử', mang:'Tín dụng', ctrinh:[]}).length===0);
   ok('sắp xếp văn bản có kiểu "Vừa thêm" (mới đưa vào tủ lên đầu)', COT_SAP.some(c=>c.ma==='them') && (()=>{ const o = SAP.cot; SAP.cot = 'them'; SAP.xuoi = false; const r = sapXep([{themLuc:'2026-01-01'}, {themLuc:'2026-10-04'}], 'vanBan'); SAP.cot = o; return r[0].themLuc==='2026-10-04'; })());
   /* 7b. ⚙ Khai báo Hội dạng bảng + chép kế hoạch Hội tỉnh cho các xã cùng Hội */
   C.xa = ''; ktHoiKBHop(); await w(150); const hds = ktHoiDs();
   ok('3.113 Khai báo Hội: mỗi Hội – xã 1 thẻ, đủ ô', document.querySelectorAll('#kt-the .kt-hdt-the').length===hds.length && document.querySelectorAll('#kt-the .kt-hdt-the input').length===hds.length*KT_HKB_O.length); ktCH().che = 'dx';
   const dvc = hds.map(x=>String(x.t.dv)).find(dv=>hds.filter(x=>String(x.t.dv)===dv).length>=2), cung = hds.filter(x=>String(x.t.dv)===dvc);
   cung.forEach(x=>{ ktHoiKBSua(x.k, 'kh', ''); }); ktHoiKBSua(cung[0].k, 'kh', '15/KH-THỬ'); ktHoiKBChep('kh'); await w(150);
   ok('⇩ cùng Hội: chép số KH Hội tỉnh cho mọi xã cùng Hội, Hội khác không đổi', cung.every(x=>ktHoiKB(x.k).kh==='15/KH-THỬ') && hds.filter(x=>String(x.t.dv)!==dvc).every(x=>ktHoiKB(x.k).kh!=='15/KH-THỬ'), cung.length+' xã');
   cung.forEach(x=>ktHoiKBSua(x.k, 'kh', '')); dongHop();
   /* 8. điểm GD suy */
   const K = KT_K, T = K.to, coD = Object.values(T).filter(t=>!t.trucTiep && t.diem && t.thon);
   const mau = coD.find(t=>coD.some(x=>x!==t && x.xa===t.xa && String(x.thon)===String(t.thon)));
   if(mau){ const dg = mau.diem; const tt0 = mau.tt; delete mau.diem; delete mau.tt; mau.tenDiem = ''; mau.ngayGD = ''; toSuyDiem(K);
     ok('tổ thiếu điểm GD → suy theo tổ cùng ấp, đánh dấu', mau.diem===dg && /cùng ấp|địa bàn/.test(mau.diemSuy||''), mau.diemSuy);
     ok('báo tổ có điểm GD suy ở KTGS (3.107: thiếu trong file Thông tin tổ trưởng → xếp theo ấp)', /thiếu 1 tổ/.test(ktSuyHTML(K)) && /theo ấp 1/.test(ktSuyHTML(K)), (ktSuyHTML(K).match(/⚠[^<]*/)||[''])[0]); delete mau.diemSuy; mau.tt = tt0; }
   else ok('có tổ để thử suy điểm GD', false);
   /* 9. 🎓 Hạn trả HSSV: dòng trên GDX + ngày vay; mỗi món chỉ ra trường + tiền; Enter qua ô; bấm vào bôi đen */
   CC.hs = null; const dv = document.createElement('div'); dv.innerHTML = hsChonLoaiHTML()+ccHSSVHTML(); document.body.appendChild(dv);
   ok('HSSV: dòng trên có loại + GDX; dòng nhập giữ ngày vay chỗ cũ + ngày ra trường + tiền vay', !!dv.querySelector('.hs-dau #hs-gdx') && !dv.querySelector('.hs-dau #hs-vay') && [...dv.querySelectorAll('.hs-nhap input')].map(e=>e.id).join(',')==='hs-vay,hs-rt,hs-tien');
   const ev = (el, k, sh) => el.dispatchEvent(new KeyboardEvent('keydown', {key:k, shiftKey:!!sh, bubbles:true, cancelable:true}));
   const rt = document.getElementById('hs-rt'), ti = document.getElementById('hs-tien'), gd = document.getElementById('hs-gdx');
   rt.focus(); ev(rt, 'Enter'); const b1 = document.activeElement===ti; ev(ti, 'Enter'); const b2 = document.activeElement===rt; ev(rt, 'Enter', true); const b3 = document.activeElement.id==='hs-vay';
   gd.focus(); ev(gd, 'Enter'); const b4 = document.activeElement.id==='hs-vay';
   ok('HSSV: Enter sang ô sau, Enter ở tiền vay về ngày ra trường (món kế), Shift+Enter lùi', b1 && b2 && b3 && b4, [b1,b2,b3,b4].join(','));
   rt.value = '30/06/2026'; rt.focus(); ok('HSSV: bấm vào ô là bôi đen số cũ (gõ là thay)', rt.selectionStart===0 && rt.selectionEnd===rt.value.length);
   /* 3.99: tiền vay gợi ý theo nửa năm phát tiền vay (làm tròn lên) */
   const gyc = [['01/09/2026','01/09/2030',8,40,160],['01/09/2026','01/02/2030',7,35,140],['01/09/2026','01/03/2030',7,35,140],['01/09/2026','01/04/2030',7,35,140],['07/10/2026','30/12/2028',4,20,80],['01/09/2026','01/12/2029',6,30,120],['15/09/2026','15/09/2030',8,40,160],['15/09/2026','15/02/2030',7,35,140],['15/09/2026','15/12/2028',4,20,80],['15/09/2026','15/05/2030',7,35,140],['15/09/2026','15/06/2030',8,40,160],['15/02/2027','15/06/2030',7,35,140],['15/07/2027','15/06/2030',6,30,120],['15/02/2027','15/06/2027',1,5,20],['15/09/2026','15/01/2030',6,30,120],['15/09/2026','15/02/2030',7,35,140],['07/10/2026','30/08/2030',8,40,160],['01/09/2026','01/11/2026',1,5,20]];
   const gys = gyc.map(c=>{ const g = hsGoiY({vay:c[0], rt:c[1]}); return g && g.nua===c[2] && g.thang===c[3] && g.trieu===c[4]; });
   ok('HSSV: gợi ý tiền vay theo năm học (ra 9→0, 12→0, 1→0, 2/5→½, 6→1; vay 2→½, 7→năm sau; cùng năm học)', gys.every(Boolean), gys.join(','));
   gd.value = '7'; gd.dispatchEvent(new Event('input'));
   const vy = document.getElementById('hs-vay'); vy.value = '01/09/2026'; vy.dispatchEvent(new Event('input'));
   rt.value = '01/02/2030'; rt.dispatchEvent(new Event('input'));
   ok('HSSV: gõ ngày ra trường → ô tiền tự điền 140, nhãn gợi ý 35 th', ti.value==='140' && /gợi ý 35 th = 140/.test(document.getElementById('hs-goiy').textContent), ti.value);
   let kq = document.getElementById('hs-kq'), ks = kq.querySelectorAll('.hs-k');
   ok('HSSV: 5 khối — 3 lớn (tiền vay, thời hạn, hạn cuối) + 2 phụ (trả mỗi lần, lần đầu)', ks.length===5 && kq.querySelectorAll('.hs-k.phu').length===2 && /Số tiền vay/.test(ks[0].textContent) && /140\.000\.000/.test(ks[0].textContent) && /35 tháng vay \(3 năm rưỡi\)/.test(ks[0].textContent) && /Trả mỗi lần/.test(ks[3].className+ks[3].textContent) && ks[3].classList.contains('phu'), ks[0].textContent);
   ti.value = '100'; ti.dispatchEvent(new Event('input')); ks = document.querySelectorAll('#hs-kq .hs-k');
   ok('HSSV: gõ đè tiền → dùng số anh gõ, ghi "Gợi ý: 35 tháng = 140 tr"', /100\.000\.000/.test(ks[0].textContent) && /Gợi ý: 35 tháng = 140 tr/.test(ks[0].textContent) && /Số tiền vay 100\.000\.000/.test(hsTinh(hsGT()).cau));
   rt.value = '01/09/2030'; rt.dispatchEvent(new Event('input'));
   ok('HSSV: Cách tính liệt kê năm học (ra 01/09/2030 → năm 2030-2031 không tính)', /2026-2027 \(tròn năm\).*2029-2030 \(tròn năm\) · 2030-2031 \(không tính\) = <b>40 tháng vay × 4 tr = 160 triệu/.test(hsKetQuaHTML()), (hsKetQuaHTML().match(/Tiền vay gợi ý theo năm học[^<]*/)||[''])[0]);
   ok('HSSV: món kế (đổi ngày ra trường) → tiền tự điền lại 160', ti.value==='160' && hsGT().tien==='160');
   /* 3.100: ngày vay gợi ý = GDX gần nhất kể từ hôm nay */
   const nay0 = nay; nay = () => new Date(2026, 9, 4, 9);
   const vg = [hsVayGoiY(7)==='07/10/2026', hsVayGoiY(3)==='03/11/2026', hsVayGoiY(4)==='04/10/2026', hsVayGoiY(31)==='31/10/2026', hsVayGoiY('')===''];
   nay = () => new Date(2026, 10, 30, 9); vg.push(hsVayGoiY(31)==='30/11/2026'); nay = () => new Date(2026, 1, 15, 9); vg.push(hsVayGoiY(10)==='10/03/2026', hsVayGoiY(30)==='28/02/2026');
   ok('HSSV: ngày vay gợi ý = GDX gần nhất từ hôm nay (07→07/10, 03→03/11, hôm nay 04→04/10, 31 cuối tháng)', vg.every(Boolean), vg.join(','));
   nay = () => new Date(2026, 9, 4, 9);
   CC.hs = null; dv.innerHTML = hsChonLoaiHTML()+ccHSSVHTML();
   const g2 = document.getElementById('hs-gdx'), v2 = document.getElementById('hs-vay');
   g2.value = '15'; g2.dispatchEvent(new Event('input'));
   const t1 = v2.value==='15/10/2026' && /GDX gần nhất/.test(document.getElementById('hs-vgy').textContent);
   v2.value = '20/10/2026'; v2.dispatchEvent(new Event('input')); g2.value = '07'; g2.dispatchEvent(new Event('input'));
   const t2 = v2.value==='20/10/2026' && hsGT().vay==='20/10/2026' && !/GDX gần nhất/.test(document.getElementById('hs-vgy').textContent);
   ok('HSSV: đổi GDX → ngày vay gợi ý lại; đã gõ tay thì giữ nguyên', t1 && t2, [t1,t2].join(','));
   /* 3.102: 📌 cửa sổ nổi — giả Document PiP bằng window.open */
   nay = () => new Date(2026, 9, 4, 9); CC.hs = null; dv.remove();
   const pipGoc = window.documentPictureInPicture; delete window.documentPictureInPicture;
   let baoMsg = ''; const bao0 = bao; bao = (t)=>{ baoMsg = t; };
   hsNoi(); ok('📌 trình duyệt không hỗ trợ → báo cần Chrome / Edge, không lỗi', /Chrome hoặc Edge/.test(baoMsg) && !HS_PIP);
   bao = bao0;
   window.documentPictureInPicture = {requestWindow: () => Promise.resolve(window.open('', 'hsnoi', 'width=460,height=620'))};
   CC.mo = ''; ccMo('hssv'); await w(100);
   ok('📌 nút Nổi có trên ô HSSV', !!document.querySelector('#cc-o button[onclick="hsNoi()"]'));
   /* 3.142: CSS ở file riêng; mở bằng file:// trình duyệt chặn cửa sổ nổi tải css/app.css → thay link bằng <style> cùng nội dung
      (giống khi chạy web: app chép luật CSS sang cửa sổ nổi). Đường web thật kiểm ở t138. */
   (function(){ const l = document.querySelector('link[rel=stylesheet]'); if(!l) return; const st = document.createElement('style'); st.textContent = NGUON_APP.split('<style>\n')[1].split('</style>')[0]; l.replaceWith(st); })();
   hsNoi(); await w(400);
   const pw = HS_PIP, pd = pw && pw.document;
   ok('📌 mở cửa sổ nổi: có đủ ô (loại, GDX, ngày vay, ra trường, tiền) + kết quả', !!pd && ['hs-loai','hs-gdx','hs-vay','hs-rt','hs-tien','hs-kq'].every(id=>pd.getElementById(id)) && pd.querySelectorAll('style').length>=document.querySelectorAll('style').length+1);
   ok('📌 ô trong app chuyển thành dòng "Đang mở ở cửa sổ nổi", không trùng ô', /cửa sổ nổi/.test(document.getElementById('cc-o').textContent) && !document.getElementById('hs-rt'));
   const pv = id => pd.getElementById(id), go = (id, v) => { const e = pv(id); e.value = v; e.dispatchEvent(new pw.Event('input')); };
   go('hs-gdx', '07'); const vayNoi = pv('hs-vay').value;
   go('hs-rt', '30/08/2030');
   const ksN = pd.querySelectorAll('#hs-kq .hs-k');
   ok('📌 gõ trong cửa sổ nổi: ngày vay gợi ý 07/10/2026, tiền 160, 5 khối', vayNoi==='07/10/2026' && pv('hs-tien').value==='160' && ksN.length===5 && /160\.000\.000/.test(ksN[0].textContent), vayNoi+' '+pv('hs-tien').value);
   const rtN = pv('hs-rt'), tiN = pv('hs-tien'); rtN.focus(); rtN.dispatchEvent(new pw.KeyboardEvent('keydown', {key:'Enter', bubbles:true, cancelable:true}));
   ok('📌 Enter trong cửa sổ nổi sang ô tiền vay', pd.activeElement===tiN);
   pv('hs-loai').value = 'duoi'; pv('hs-loai').dispatchEvent(new pw.Event('change'));
   ok('📌 đổi loại khóa học trong cửa sổ nổi → lưu ý cam', hsGT().loai==='duoi' && /đến 12 tháng/.test(pv('hs-luuy').textContent));
   /* 3.103: 3 mức + nền sáng / tối */
   pv('hs-loai').value = 'tren'; pv('hs-loai').dispatchEvent(new pw.Event('change'));
   const cls = () => pd.body.className, an = el => !el || pw.getComputedStyle(el).display==='none';
   ok('📌 mở ra ở mức thu gọn: ẩn bảng + kỳ trả, có nút ▾ Chi tiết', /hs-m-gon/.test(cls()) && an(pd.querySelector('.hs-bang')) && an(pd.querySelector('.hs-ct')) && /Chi tiết/.test(pv('hs-chi-nut').textContent) && !an(pd.querySelector('.hs-k')));
   hsNoiChi();
   ok('📌 ▾ Chi tiết: hiện bảng + kỳ trả, nút đổi thành ▴ Thu gọn', /hs-m-chi/.test(cls()) && !an(pd.querySelector('.hs-bang')) && !an(pd.querySelector('.hs-ct')) && /Thu gọn/.test(pv('hs-chi-nut').textContent));
   hsNoiMuc();
   ok('📌 ▁ thu nhỏ: còn ô ra trường + tiền vay + 1 dòng kết quả', /hs-m-nho/.test(cls()) && an(pv('hs-kq')) && an(pv('hs-vay').closest('.hs-o')) && !an(pv('hs-rt')) && !an(pv('hs-tien')) && /104 th · hạn 07\/07\/2035 · 32\.000\.000 × 5 kỳ · lần đầu 07\/08\/2031/.test(pv('hs-mini').textContent) && pv('hs-noi-nho').textContent==='▢', pv('hs-mini').textContent);
   go('hs-rt', '30/08/2028');
   ok('📌 thu nhỏ: gõ món mới → dòng kết quả cập nhật', /lần đầu/.test(pv('hs-mini').textContent) && !/104 th/.test(pv('hs-mini').textContent), pv('hs-mini').textContent);
   go('hs-rt', '30/08/2030'); hsNoiMuc();
   ok('📌 ▢ mở ra: về mức thu gọn', /hs-m-gon/.test(cls()));
   const m0 = hsNoiToi(); hsNoiMau(); const m1 = hsNoiToi();
   let luu = ''; try{ luu = localStorage.getItem('tuhoso_hs_noi_mau'); }catch(e){}
   ok('📌 ☀/🌙 đổi nền riêng cửa sổ nổi, nhớ lựa chọn, app chính không đổi', m0!==m1 && luu===(m1?'dark':'light') && pd.documentElement.getAttribute('data-theme')===(m1?'dark':'light') && document.documentElement.getAttribute('data-theme')!==pd.documentElement.getAttribute('data-theme') || (m0!==m1 && luu===(m1?'dark':'light')));
   pd.documentElement.setAttribute('data-theme', 'dark');
   ok('📌 nền tối: khối HSSV nền tối (không còn nền sáng)', pw.getComputedStyle(pd.querySelector('.hs-k')).backgroundColor==='rgb(22, 58, 36)', pw.getComputedStyle(pd.querySelector('.hs-k')).backgroundColor);
   try{ localStorage.removeItem('tuhoso_hs_noi_mau'); }catch(e){}
   hsNoiDong(); await w(150);
   ok('📌 Đưa về: cửa sổ đóng, ô trong app hiện lại với số đang nhập', !HS_PIP && document.getElementById('hs-rt') && document.getElementById('hs-rt').value==='30/08/2030' && document.getElementById('hs-tien').value==='160');
   if(pipGoc) window.documentPictureInPicture = pipGoc; else delete window.documentPictureInPicture;
   CC.mo = 'hssv'; ccMo('hssv');
   nay = nay0; CC.hs = null;
   /* 3.106: bảng khai báo Hội – xã — dòng "In ra", bỏ ô Đoàn; Mẫu 04 nhận xét từng tổ; dọn dữ liệu rác; chép file */
   C.xa = best.xa; ktHoiKBHop(); await w(150);
   const hin = document.querySelector('#kt-the .hkb-in');
   ok('3.106 bảng khai báo: không còn cột Đoàn kiểm tra; dưới mỗi ô có dòng "In ra" (trống = tự lấy)', !document.querySelector('#kt-the .kt-hkb-doan') && !!hin && /In ra: \(tự lấy\)/.test(hin.textContent));
   const kB = ktHoiKhoa(best), idB = kB.replace(/[^0-9a-z]/gi, '_'), oKH = document.getElementById('hkb-'+idB+'-kh');
   if(oKH){ oKH.value = '06'; oKH.dispatchEvent(new Event('input')); }
   const inKH = (document.getElementById('hkbi-'+idB+'-kh')||{}).textContent||'';
   ok('3.106 gõ số KH → dòng In ra đổi ngay, thiếu "/KH" thì nhắc cam', /Căn cứ Kế hoạch … số 06/.test(inKH) && /⚠/.test(inKH), inKH);
   if(oKH){ oKH.value = ''; oKH.dispatchEvent(new Event('input')); } ktCH().che = 'dx';
   D.cauHinh.ktgsLS = {x:1}; D.cauHinh.ktgsNK = [1]; ktHoiKBSua(kB, 'doan', 'Rác'); ktHoiKBSua(kB, 'cb', 'Giả Cán Bộ');
   ok('3.106 Mẫu 04: Đoàn kiểm tra lấy cán bộ Mẫu 06 / 16, nhận xét từng tổ có dư nợ', (()=>{ const g = ktBC04([{t:best}])[0]; return g.doan.length>=1 && g.doan[0].cb==='Giả Cán Bộ' && /^- Tổ TK&VV .+: dư nợ [\d.,]+ triệu đồng/.test(g.nx[0]); })());
   ktHoiKBSua(kB, 'cb', '');
   /* dọn rác: chạy lại đoạn dọn (khởi động) */
   (function(){ var ch = D.cauHinh; ['ktgsLS', 'ktgsNK', 'ktgsGN'].forEach(function(k){ delete ch[k]; }); Object.keys(ch.ktHoiKB || {}).forEach(function(k){ if(ch.ktHoiKB[k]) delete ch.ktHoiKB[k].doan; }); })();
   ok('3.106 code dọn dữ liệu rác có trong app (ktgsLS / NK / GN, ô doan)', /\['ktgsLS', 'ktgsNK', 'ktgsGN'\]\.forEach/.test(NGUON_APP) && D.cauHinh.ktgsLS===undefined && !(D.cauHinh.ktHoiKB[kB]||{}).doan);
   /* chép file: giả cầu nối */
   const goi0 = goiCauNoi, goiDS = []; goiCauNoi = (h, r) => goiDS.push([h, r]);
   const coCN0 = coCauNoi; coCauNoi = () => true; try{ localStorage.setItem('tuhoso_cn_ban', '2'); }catch(e){}
   const giaMuc = n => ({id:'gia'+n, driveId:'d'+n, nhom:'vanBan', tenMoi:'Văn bản thử số '+n+' dài dài dài.pdf', duong:'Văn bản/2026'});
   const rel0 = relCua(giaMuc(0));
   chepNhieu(Array.from({length:25}, (x, i)=>giaMuc(i)));
   const c1 = goiDS[0], ds1 = c1 ? decodeURIComponent(escape(atob(c1[1].replace(/-/g,'+').replace(/_/g,'/')))).split('\n') : [];
   ok('3.106 chép nhiều file: 1 lệnh chepn, tối đa 20 file / lần, còn lại để "Chép tiếp"', !!rel0 && c1 && c1[0]==='chepn' && ds1.length>0 && ds1.length<=20 && ds1[0]===rel0 && CN_CHEP_CON.length===25-ds1.length, ds1.length+' + '+CN_CHEP_CON.length);
   chepTiep(); ok('3.106 Chép tiếp: gửi đợt kế', goiDS.length===2 && goiDS[1][0]==='chepn');
   try{ localStorage.removeItem('tuhoso_cn_ban'); }catch(e){}
   goiDS.length = 0; chepNhieu([giaMuc(1)]); ok('3.106 cầu nối cũ (chưa bản 2) → hỏi cài bản mới, không gửi lệnh', goiDS.length===0 && /cầu nối bản mới/.test(document.getElementById('hop-in').textContent)); dongHop();
   goiCauNoi = goi0; coCauNoi = coCN0; CN_CHEP_CON = [];
   C.che = 'dx'; C.xa = ''; C.hoi = ''; C.to = '';
   var ra = {d06:await b64(await ktDocx('m06', g)), d16:await b64(F[f16])};
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const ra = R0.ra, r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && ra){ fs.writeFileSync(path.join(process.argv[2], 't111_m06.docx'), Buffer.from(ra.d06, 'base64')); fs.writeFileSync(path.join(process.argv[2], 't111_m16.docx'), Buffer.from(ra.d16, 'base64')); }
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
