// 3.98 — KTGS chỉ phục vụ in (bỏ theo dõi) · Mẫu 06 bố cục mới (dòng chấm Đơn vị, Chức vụ thẳng cột bằng tab, địa bàn chuẩn, cột Mục đích rộng,
//        dòng 1,5 cm, gộp tên / ký theo hộ, mã KH, 2 mục đích PNKT51 + PNKT52) · danh sách chọn hộ chung · xem trước tách tờ ·
//        Bảng chuẩn hóa Hội – Đoàn (Kế hoạch ① ②, Mẫu 16, Đoàn / phường) · Mẫu 16 gợi ý nhận xét · điểm GD suy theo ấp / ngày GDXA.
// Bộ GIẢ: tests/gia31. Tham số tùy chọn: thư mục lưu file Word mẫu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
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
   ok('Chức vụ thẳng cột: tab cố định, có tên → không chấm, trống → chấm', /w:leader="none"|<w:tab w:val="left" w:pos="9356"\/>/.test(d6) && /<w:tab w:val="left" w:leader="dot" w:pos="9356"\/>/.test(d6) && /1\. Ông \(bà\): Phạm Văn Giả⇥Chức vụ Chủ tịch/.test(c6), (c6.match(/1\. Ông[^⇥]*⇥[^⇥]*/)||[''])[0]);
   ok('địa bàn + cách khoảng (tab) + Tổ TK&VV; thời điểm + đơn vị tính cùng dòng', /Địa bàn kiểm tra: khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh⇥Tổ TK&VV: /.test(c6) && /Thời điểm kiểm tra: 03\/10\/2026⇥Đơn vị tính: triệu đồng/.test(c6));
   ok('cột: Mục đích rộng 2099 (≈ 3,7 cm), Stt / CT / tiền thu hẹp', /<w:gridCol w:w="454"\/><w:gridCol w:w="1276"\/><w:gridCol w:w="992"\/><w:gridCol w:w="850"\/><w:gridCol w:w="850"\/><w:gridCol w:w="850"\/><w:gridCol w:w="2099"\/>/.test(d6));
   ok('dòng bảng cao 1,5 cm', (d6.match(/<w:trHeight w:val="850" w:hRule="atLeast"\/>/g)||[]).length===g.rows.length);
   const dl = d6.slice(d6.indexOf('</w:tr>', d6.lastIndexOf('<w:tblHeader/>'))), nR = (dl.match(/<w:vMerge w:val="restart"\/>/g)||[]).length, nT = (dl.match(/<w:vMerge\/>/g)||[]).length;
   ok('gộp ô Stt / Họ tên / Ký theo hộ (vMerge, chỉ dòng dữ liệu)', nR===3 && nT===3*(ho2.mon.length-1), nR+' / '+nT+' · '+ho2.mon.length+' món');
   ok('cột Mục đích in 2 mục đích', c6.indexOf('Khai thác, cung cấp nước; Xử lý ô nhiễm, chất thải')>=0);
   const gT = ktGiaTri06(tP, ktDaChon(), {md:'', dv:'-', cbtu:'trong'}); const cT = chu((await moZip(await ktDocx('m06', gT))).doc);
   ok('Đơn vị trống → còn dòng chấm thứ 2; Ông (bà) trống → chấm tab', /\.{40,}/.test(cT.slice(0, cT.indexOf('CỘNG HÒA'))) && /1\. Ông \(bà\): ⇥Chức vụ ⇥/.test(cT));
   const tH = Object.assign({}, best, {dv:'12', tenXa:'Phường Gia Lộc'}), tN = Object.assign({}, best, {dv:'11', tenXa:'Xã Phước Thạnh'});
   delete (D.cauHinh.ktHoiKB||{})[ktHoiKhoa(tH)]; delete (D.cauHinh.ktHoiKB||{})[ktHoiKhoa(tN)];
   ok('Đơn vị Mẫu 06 tự điền Hội cấp xã của tổ (viết đủ), gõ "-" → dòng chấm, gõ tên → giữ', ktGiaTri06(tN, [], {}).f.DV==='Hội Nông dân xã Phước Thạnh' && ktGiaTri06(tH, [], {}).f.DV==='Hội Liên hiệp Phụ nữ phường Gia Lộc' && ktGiaTri06(tH, [], {dv:'-'}).f.DV==='' && ktGiaTri06(tH, [], {dv:'Đơn vị khác'}).f.DV==='Đơn vị khác');
   ok('thiếu chỗ → tên gọn (Hội LHPN …)', ktDonVi(tH, {}, 30)==='Hội LHPN phường Gia Lộc');
   const d16 = ktDonVi16(tH, {}), d16n = ktDonVi16(tN, {});
   ok('Mẫu 16 đầu trang: chữ hoa, dài thì xuống dòng trước PHƯỜNG / XÃ', d16.DVA==='HỘI LIÊN HIỆP PHỤ NỮ' && d16.DVB==='PHƯỜNG GIA LỘC' && d16n.DVA==='HỘI NÔNG DÂN' && d16n.DVB==='XÃ PHƯỚC THẠNH', JSON.stringify(d16));
   const h6 = ktHTML06(g);
   ok('bản In: gộp ô rowspan, bỏ dòng chấm Đơn vị, Chức vụ thẳng cột', /rowspan="\d"/.test(h6) && !/<p>\.{30,}<\/p><\/td>/.test(h6.slice(0, 3000)) && /class="kt-dl"/.test(h6) && /khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh/.test(h6));
   /* 4. xem trước nhiều phiếu: mỗi phiếu 1 tờ */
   const hN = ktHTML06([g, gT, g]);
   ok('xem trước nhiều phiếu: mỗi phiếu 1 tờ có nhãn, in sang trang', (hN.match(/class="kt-to"/g)||[]).length===3 && /Phiếu 2\/3 · Tổ /.test(hN) && (hN.match(/break-before:page/g)||[]).length===2 && /@media print\{\.kt-to-nhan\{display:none\}/.test(hN));
   /* 5. không theo dõi */
   KT_KB = {ngay:'2026-10-03'}; ktKhaiBao('m06'); await w(50); ktXuat('m06', 'word'); await w(600); ktKhaiBao('m16'); await w(50); ktXuat('m16', 'word'); await w(600);
   ok('xuất 06 / 16: không ghi lịch sử, nhật ký', !Object.keys(D.cauHinh.ktgsLS||{}).length && !Object.keys(D.cauHinh.ktgsNK||{}).length && !Object.keys(D.cauHinh.ktgsGN||{}).length);
   /* 6. Mẫu 16: địa danh đúng chữ, Hội đầy đủ, Chức vụ tab, gợi ý nhận xét */
   const f16 = Object.keys(F).find(n=>/Mau 16/.test(n)), z16 = await moZip(F[f16]), c16 = chu(z16.doc);
   ok('Mẫu 16 Word hợp lệ, hết dấu {{', hopLe(z16.doc) && z16.doc.indexOf('{{')<0, f16);
   const capA = ktCapAp(best.tenXa), capX = ktChuan(best).xa;
   ok('Mẫu 16: "thôn/tổ dân phố", "xã/phường/đặc khu", "tỉnh/thành phố" → đúng chữ', c16.indexOf('(Tổ) '+capA+' '+ktApTen(best.tenThon)+', '+capX+' '+ktXaTen(best.tenXa)+', tỉnh Tây Ninh')>=0 && c16.indexOf('thôn/tổ dân phố')<0 && c16.indexOf('đặc khu')<0, (c16.match(/\(Tổ\)[^,]*,[^,]*,[^,]*,/)||[''])[0]);
   ok('Mẫu 16: Tổ thuộc + tên Hội đầy đủ (không "Hội Đoàn Thanh niên")', c16.indexOf('Tổ thuộc '+ktHoiTen(best))>=0 && c16.indexOf('Hội Đoàn')<0, ktHoiTen(best));
   ok('Mẫu 16: 4 dòng Ông (bà) theo tab, tổ trưởng điền tên', (z16.doc.match(/w:pos="5954"/g)||[]).length===4 && c16.indexOf('- Ông (bà): '+best.ten+'⇥Chức vụ: Tổ trưởng')>=0);
   ok('Mẫu 16 Word: đầu trang ĐƠN VỊ KIỂM TRA = Hội cấp xã của tổ, tiêu ngữ canh tab', c16.indexOf(ktDonVi16(best, {}).DVA+'⇥Độc lập')>=0 && /w:val="center" w:pos="6350"/.test(z16.doc), (c16.match(/[^\n]{0,40}⇥Độc lập/)||[''])[0]);
   const g16 = ktGiaTri16(best, ktDaChon(), {nx:'so'});
   ok('gợi ý: ô kết quả số tổ viên + lãi tồn / quá hạn', /tổ viên — (đảm bảo|không đảm bảo) \(05–60\)/.test(g16.nx.kq1) && !!g16.nx.kq2 && c16.indexOf(g16.nx.kq1)>=0, g16.nx.kq1+' · '+g16.nx.kq2);
   ok('gợi ý: III ưu điểm / tồn tại có số, kiến nghị đi theo tồn tại', (g16.nx.ud.length+g16.nx.tt.length)>0 && g16.nx.kn.length===g16.nx.tt.length && (g16.nx.tt.length ? c16.indexOf('- '+g16.nx.tt[0])>=0 : c16.indexOf('- '+g16.nx.ud[0])>=0), JSON.stringify(g16.nx).slice(0, 200));
   const g16b = ktGiaTri16(best, ktDaChon(), {nx:''}); const c16b = chu((await moZip(await ktDocx('m16', g16b))).doc);
   ok('chọn "Để trống" → III giữ dòng chấm, ô kết quả trống', !g16b.nx.kq1 && /1\. Ưu điểm: \.{20,}/.test(c16b));
   ok('khai báo Mẫu 16 có chọn gợi ý nhận xét (nhớ lựa chọn)', D.cauHinh.ktNhanXet!==undefined && /Gợi ý theo số liệu/.test(KT_NX_CHON));
   /* 7. Bảng chuẩn hóa + Kế hoạch ② cho Đoàn ở phường */
   ktChuanHop(); await w(100); ok('📖 Bảng chuẩn hóa: 4 Hội × 11 mục sửa được', document.querySelectorAll('.kt-chuan tbody input').length===44); dongHop();
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
   ok('Kế hoạch ② chưa khai căn cứ → câu gọn (không số hợp đồng, không dòng KH Hội tỉnh)', /trong hợp đồng ủy thác giữa/.test(cK) && !/Căn cứ Kế hoạch kiểm tra/.test(cK));
   ktHoiKBSua(kD, 'kh', '05/KH-THỬ'); ktHoiKBSua(kD, 'khNgay', '10/01/2026'); ktHoiKBSua(kD, 'hd', '07'); ktHoiKBSua(kD, 'hdNgay', '02/03/2020');
   const zK2 = await moZip(await ktDocx('m01b', ktKHGiaTri())), cK2 = chu(zK2.doc);
   ok('Kế hoạch ② đã khai căn cứ đủ → in đủ như khuôn ①', hopLe(zK2.doc) && zK2.doc.indexOf('{{')<0 && /Căn cứ Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác số 05\/KH-THỬ, ngày 10\/01\/2026 của Tỉnh Đoàn Tây Ninh;/.test(cK2) && /hợp đồng ủy thác số 07\/HĐUT ngày 02\/03\/2020 giữa/.test(cK2), (cK2.match(/Căn cứ Kế hoạch[^;]*;/)||[''])[0]);
   ['kh','khNgay','hd','hdNgay'].forEach(o=>ktHoiKBSua(kD, o, ''));
   ktHoiKBSua(kD, 'mauKH', ''); const cK1 = chu((await moZip(await ktDocx('m01', ktKHGiaTri()))).doc);
   ok('Kế hoạch ① Đoàn ở phường: HĐT phường, do Đoàn mình quản lý, TM. BAN THƯỜNG VỤ / BÍ THƯ', /HĐT phường/.test(cK1) && !/HĐT xã/.test(cK1) && /do Đoàn mình quản lý/.test(cK1) && /do Đoàn quản lý/.test(cK1) && /TM\. BAN THƯỜNG VỤ\s*BÍ THƯ/.test(cK1));
   KT_K.to[best.ma] = goc;
   /* 7a. khung khai báo trong tab (không hộp bật lên) + Văn bản: CT vay không bắt buộc, sắp xếp Vừa thêm */
   C.che = 'dx'; C.xa = best.xa; C.to = best.ma; ktVeThe(); await w(200);
   ok('đột xuất: khung ✎ Khai báo trong tab có bảng cán bộ theo Hội – xã + nút In / Word 06, 16', !!document.querySelector('#kt-the .kt-kb-khung .kt-hkb-bang') && /Word Mẫu 06/.test(document.getElementById('kt-the').textContent) && /Word Mẫu 16/.test(document.getElementById('kt-the').textContent));
   ok('văn bản không gắn CT vay không còn bị chờ khai', thieuThongTin({nhom:'vanBan', ngay:'2026-01-15', tenVB:'Quy chế thử', mang:'Tín dụng', ctrinh:[]}).length===0);
   ok('sắp xếp văn bản có kiểu "Vừa thêm" (mới đưa vào tủ lên đầu)', COT_SAP.some(c=>c.ma==='them') && (()=>{ const o = SAP.cot; SAP.cot = 'them'; SAP.xuoi = false; const r = sapXep([{themLuc:'2026-01-01'}, {themLuc:'2026-10-04'}], 'vanBan'); SAP.cot = o; return r[0].themLuc==='2026-10-04'; })());
   /* 7b. ⚙ Khai báo Hội dạng bảng + chép kế hoạch Hội tỉnh cho các xã cùng Hội */
   C.xa = ''; ktHoiKBHop(); await w(150); const hds = ktHoiDs();
   ok('⚙ Khai báo Hội là 1 bảng: mỗi dòng 1 Hội – xã, đủ cột', document.querySelectorAll('#hop-in .kt-hkb-bang tbody tr').length===hds.length && document.querySelectorAll('#hop-in .kt-hkb-bang thead th').length===KT_HKB_O.length+1);
   const dvc = hds.map(x=>String(x.t.dv)).find(dv=>hds.filter(x=>String(x.t.dv)===dv).length>=2), cung = hds.filter(x=>String(x.t.dv)===dvc);
   cung.forEach(x=>{ ktHoiKBSua(x.k, 'kh', ''); }); ktHoiKBSua(cung[0].k, 'kh', '15/KH-THỬ'); ktHoiKBChep('kh'); await w(150);
   ok('⇩ cùng Hội: chép số KH Hội tỉnh cho mọi xã cùng Hội, Hội khác không đổi', cung.every(x=>ktHoiKB(x.k).kh==='15/KH-THỬ') && hds.filter(x=>String(x.t.dv)!==dvc).every(x=>ktHoiKB(x.k).kh!=='15/KH-THỬ'), cung.length+' xã');
   cung.forEach(x=>ktHoiKBSua(x.k, 'kh', '')); dongHop();
   /* 8. điểm GD suy */
   const K = KT_K, T = K.to, coD = Object.values(T).filter(t=>!t.trucTiep && t.diem && t.thon);
   const mau = coD.find(t=>coD.some(x=>x!==t && x.xa===t.xa && String(x.thon)===String(t.thon)));
   if(mau){ const dg = mau.diem; delete mau.diem; mau.tenDiem = ''; mau.ngayGD = ''; toSuyDiem(K);
     ok('tổ thiếu điểm GD → suy theo tổ cùng ấp, đánh dấu', mau.diem===dg && /cùng ấp|địa bàn/.test(mau.diemSuy||''), mau.diemSuy);
     ok('báo tổ có điểm GD suy ở KTGS', /điểm GD suy theo ấp/.test(ktSuyHTML(K))); delete mau.diemSuy; }
   else ok('có tổ để thử suy điểm GD', false);
   /* 9. 🎓 Hạn trả HSSV: dòng trên GDX + ngày vay; mỗi món chỉ ra trường + tiền; Enter qua ô; bấm vào bôi đen */
   CC.hs = null; const dv = document.createElement('div'); dv.innerHTML = hsChonLoaiHTML()+ccHSSVHTML(); document.body.appendChild(dv);
   ok('HSSV: dòng trên có loại + GDX + ngày vay; dòng nhập chỉ ngày ra trường + tiền vay', !!dv.querySelector('.hs-dau #hs-gdx') && !!dv.querySelector('.hs-dau #hs-vay') && [...dv.querySelectorAll('.hs-nhap input')].map(e=>e.id).join(',')==='hs-rt,hs-tien');
   const ev = (el, k, sh) => el.dispatchEvent(new KeyboardEvent('keydown', {key:k, shiftKey:!!sh, bubbles:true, cancelable:true}));
   const rt = document.getElementById('hs-rt'), ti = document.getElementById('hs-tien'), gd = document.getElementById('hs-gdx');
   rt.focus(); ev(rt, 'Enter'); const b1 = document.activeElement===ti; ev(ti, 'Enter'); const b2 = document.activeElement===rt; ev(rt, 'Enter', true); const b3 = document.activeElement.id==='hs-vay';
   gd.focus(); ev(gd, 'Enter'); const b4 = document.activeElement.id==='hs-vay';
   ok('HSSV: Enter sang ô sau, Enter ở tiền vay về ngày ra trường (món kế), Shift+Enter lùi', b1 && b2 && b3 && b4, [b1,b2,b3,b4].join(','));
   rt.value = '30/06/2026'; rt.focus(); ok('HSSV: bấm vào ô là bôi đen số cũ (gõ là thay)', rt.selectionStart===0 && rt.selectionEnd===rt.value.length);
   dv.remove();
   C.che = 'dx'; C.xa = ''; C.hoi = ''; C.to = '';
   var ra = {d06:await b64(await ktDocx('m06', g)), d16:await b64(F[f16])};
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const ra = R0.ra, r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && ra){ fs.writeFileSync(path.join(process.argv[2], 't111_m06.docx'), Buffer.from(ra.d06, 'base64')); fs.writeFileSync(path.join(process.argv[2], 't111_m16.docx'), Buffer.from(ra.d16, 'base64')); }
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
