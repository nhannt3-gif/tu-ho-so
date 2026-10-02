// 3.90 — 7 file chuẩn TW (BCDHTD 01.1 / 01.2 · B32 · LEN_31 × 4): đọc, kỳ tháng / ngày, kiểm tra chéo với Mẫu 31, tab con 📊 Tổng hợp,
//        loại đã bỏ (Mẫu 7, Sao kê KH, KHĐ mẫu 08/KTNB), KHĐ rỗng, thay file 1 ô, xóa cả bộ tháng, làm mới toàn bộ, chuẩn in, thẻ tổ LEN_31
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31). File TW giả dựng ngay trong trang từ Mẫu 31 giả (số khớp), rồi làm lệch 1 chỗ để thử báo lệch.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o={}, w=t=>new Promise(r=>setTimeout(r,t));
   window.hoi = function(a, b, c, f){ f(); };   /* tự xác nhận */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const B = await slBo('2026-07'), hs = B.co.hstd;
   const tep = (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'S'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
   const doc = async (f) => slDocFile(f);
   const ghi = async (f) => { const kq = await doc(f); if(kq.loi) throw new Error(f.name+': '+kq.loi); await slGhi(kq); return kq; };
   const tr = v => Math.round(v)/1e6, moc = n => { const r = []; for(let i=1;i<=n;i++) r[i<=2 ? (i===1 ? 0 : 2) : i] = '('+i+')'; return r; };
   const X = twTinh31(hs, B.lap, o=>o.tenXa||null); Object.keys(X).forEach(k=>{ if(!X[k].mon) delete X[k]; }); const xs = Object.keys(X).sort();
   const sum = (A, f) => Object.keys(A).reduce((s, k)=>s+(A[k][f]||0), 0);
   const dongBC = (stt, ten, x) => { const r = [stt, '', ten]; [x.cvT, x.cvN, x.tnT, x.tnN, x.xoaT, x.xoaN, x.dn, x.th, x.qh, x.kn, 0, x.dn, 0].forEach((v, i)=>r[3+i] = tr(v)); r[16] = x.khDn; r[17] = 0; return r; };
   const bcdhtd = (so, ten, ngay, A, tieu) => { const aoa = [['Mẫu biểu số: '+so+'/BCTD'], ['CHI NHÁNH NHCSXH TỈNH GIẢ'], ['BÁO CÁO KẾT QỦA CHO VAY HỘ NGHÈO VÀ CÁC ĐỐI TƯỢNG CHÍNH SÁCH'], [ngay], ['Đơn vị: triệu đồng, hộ'], ['TT', '', tieu], [], moc(17)];
     let i = 0; Object.keys(A).sort().forEach(k=>aoa.push(dongBC(++i, k, A[k]))); const t = {}; ['cvT','cvN','tnT','tnN','xoaT','xoaN','dn','th','qh','kn','khDn'].forEach(f=>t[f] = sum(A, f));
     const tg = dongBC('TỔNG CỘNG', '', t); aoa.push(tg); aoa.push(['', '', '', 'null, ngày 2 tháng 8 năm 2026']); return tep(aoa, ten); };
   /* BCDHTD 01.1 / 01.2 */
   const fBX = bcdhtd('01.1', '4820_BCDHTD_01.1_31072026_1.XLSX', 'Ngày 31 Tháng 07 Năm 2026', X, 'CHI NHÁNH/ HUYỆN/XÃ');
   const C = twTinh31(hs, null, o=>o.ct ? ctNgan(o.ct) : 'Cho vay khác'); Object.keys(C).forEach(k=>{ if(!C[k].mon) delete C[k]; });
   const fBC = bcdhtd('01.2', '4820_BCDHTD_01.2_31072026_1.XLSX', 'Ngày 31 Tháng 07 Năm 2026', C, 'CHƯƠNG TRÌNH VAY');
   /* LEN_31 */
   const lenDau = () => [['CHI NHÁNH NHCSXH TỈNH GIẢ'], ['TỔNG HỢP SỐ LIỆU TÍN DỤNG'], ['', '', '', 'Ngày 31 tháng 7 năm 2026'], ['Đơn vị tính: Đồng'], ['STT', '', 'Tên xã( phường)', 'Số tổ', 'Số hộ', 'Dư nợ'], [], moc(14)];
   const lenSo = (stt, ten, x, soTo, them) => { const r = [stt, '', ten, soTo||0, x.khDn, x.dn+(them||0), x.th+(them||0), x.qh, x.kn, x.tg, x.gnT, x.tnT, 0, 0, 0]; return r; };
   const T = twTinh31(hs, B.lap, o=>o.to ? o.tenXa+'|'+o.to : null); Object.keys(T).forEach(k=>{ if(!T[k].mon) delete T[k]; });
   const tenTo = {}; hs.forEach(o=>{ if(o.to) tenTo[o.to] = o.toTen; });
   const H = twTinh31(hs, B.lap, o=>o.to ? o.tenXa+'|'+(o.dv||'') : null); Object.keys(H).forEach(k=>{ if(!H[k].mon) delete H[k]; });
   const HC = twTinh31(hs, B.lap, o=>o.to && o.ct ? o.tenXa+'|'+(o.dv||'')+'|'+o.ct : null); Object.keys(HC).forEach(k=>{ if(!HC[k].mon) delete HC[k]; });
   const soToXa = x => Object.keys(T).filter(k=>k.split('|')[0]===x).length;
   const XT = twTinh31(hs, B.lap, o=>o.to ? o.tenXa : null);   /* xã: chỉ tính dòng có tổ (khớp cách dựng tổ / hội) */
   const tongL = () => { const t = {}; ['khDn','dn','th','qh','kn','tg','gnT','tnT'].forEach(f=>t[f] = sum(XT, f)); return t; };
   const fLX = (lech) => { const a = lenDau(); xs.forEach((x, i)=>a.push(lenSo(i+1, x, XT[x], soToXa(x), i===0 ? lech : 0))); a.push(lenSo('Tổng cộng', '', tongL(), Object.keys(T).length, lech)); a.push(['', '', '', 'null, ngày 2 tháng 8 năm 2026']); return tep(a, '4820_LEN_31_XAPUONG_31072026_1.XLSX'); };
   const fLT = () => { const a = lenDau(); let n = 0; xs.forEach((x, i)=>{ a.push(lenSo('ABCDEFGH'[i], x, XT[x], soToXa(x))); Object.keys(T).filter(k=>k.split('|')[0]===x).forEach(k=>a.push(lenSo(++n, tenTo[k.split('|')[1]], T[k]))); }); a.push(lenSo('Tổng cộng', '', tongL(), Object.keys(T).length)); return tep(a, '4820_LEN_31_TO_TRUONG_31072026_1.XLSX'); };
   const HOI = {'11':'Hội nông dân','12':'Hội liên hiệp phụ nữ','13':'Hội cựu chiến binh','14':'Đoàn thanh niên','':'Trực tiếp','99':'Trực tiếp'};
   const fLH = () => { const a = lenDau(); xs.forEach((x, i)=>{ a.push(lenSo('ABCDEFGH'[i], x, XT[x], soToXa(x))); let n = 0; Object.keys(H).filter(k=>k.split('|')[0]===x).forEach(k=>a.push(lenSo(++n, HOI[k.split('|')[1]]||'Hội khác', H[k]))); }); a.push(lenSo('Tổng cộng', '', tongL(), Object.keys(T).length)); return tep(a, '4820_LEN_31_DONVIUT_31072026_1.XLSX'); };
   const fLC = () => { const a = lenDau(); xs.forEach(x=>{ a.push(lenSo('', x, XT[x], soToXa(x))); Object.keys(H).filter(k=>k.split('|')[0]===x).forEach(k=>{ a.push(lenSo('', HOI[k.split('|')[1]]||'Hội khác', H[k])); let n = 0;
       Object.keys(HC).filter(c=>c.indexOf(k+'|')===0).forEach(c=>a.push(lenSo(++n, (hs.find(o=>o.ct===c.split('|')[2])||{}).ctTen||ctNgan(c.split('|')[2]), HC[c]))); }); }); a.push(lenSo('Tổng cộng', '', tongL(), Object.keys(T).length)); return tep(a, '4820_LEN_31_CHTRINH_31072026_1.XLSX'); };
   /* B32: nguồn TW / ĐP × xã; cho vay gồm đảo khoản; "thu nợ" = thu nợ thực + cho vay */
   const N = twTinh31(hs, null, o=>o.tenXa && o.nguon ? o.tenXa+'|'+o.nguon : null);
   const fB32 = () => { const a = [['Mẫu biểu số: 13/BC'], ['CHI NHÁNH NHCSXH TỈNH GIẢ'], ['BÁO CÁO KẾT QUẢ HOẠT ĐỘNG TÍN DỤNG'], ['Ngày 31 Tháng 07 Năm 2026'], ['Đơn vị: triệu đồng, hộ'], ['TT', '', 'CHI NHÁNH/ HUYỆN/XÃ', 'Tổng số', '', 'HSSV'], [], moc(6)];
     const r2 = v => Math.round(v/1e4)/100;
     [['I. Doanh số cho vay', x=>x.gnT], ['II. Doanh số thu nợ', x=>x.tnT+x.gnT], ['III. Tổng dư nợ', x=>x.dn], ['IV. Nợ quá hạn', x=>x.qh]].forEach(ph=>{ a.push([ph[0]]);
       [['1','Nguồn trung ương'], ['2','Nguồn địa phương']].forEach(ng=>{ a.push([ng[1]]); const ks = Object.keys(N).filter(k=>k.split('|')[1]===ng[0] && N[k].mon);
         a.push(['PGD Giả', '', '', 1, r2(ks.reduce((s, k)=>s+ph[1](N[k]), 0)), 0, 0]); ks.forEach(k=>a.push(['', '', k.split('|')[0], 1, r2(ph[1](N[k])), 0, 0])); }); });
     a.push(['', '', '', '', '', 'PGD Giả, ngày 2 tháng 8 năm 2026']); return tep(a, '4820_B32_31072026_1.XLSX'); };
   const tw = [fBX, fBC, fB32(), fLX(0), fLH(), fLC(), fLT()], kqTW = [];
   for(const f of tw){ const kq = await ghi(f); kqTW.push(kq.loai+' '+kq.ky+' '+kq.rows.length+'d'); }
   o.docTW = kqTW.join(' · ');
   /* kỳ: ngày giữa tháng → ô theo ngày; cuối tháng → ô tháng */
   const k15 = await ghi(bcdhtd('01.1', '4820_BCDHTD_01.1_15082026_1.XLSX', 'Ngày 15 Tháng 08 Năm 2026', X, 'CHI NHÁNH/ HUYỆN/XÃ'));
   const k31 = await ghi(bcdhtd('01.1', '4820_BCDHTD_01.1_31082026_1.XLSX', 'Ngày 31 Tháng 08 Năm 2026', X, 'CHI NHÁNH/ HUYỆN/XÃ'));
   o.kyTuy = k15.ky+' / '+k31.ky+' · ô ngày: '+slCacNgay('bx', '2026-08').map(e=>e.ky).join(',');
   /* loại đã bỏ / file sai */
   const kt08 = await doc(tep([[], ['08 - DS khoản vay trên N tháng không hoạt động (mẫu 08/KTNB)'], [], [], ['Mã CN','Mã PGD','Mã tổ','Mã khác hàng','Mã món vay','Ngày giao dịch gần nhất','Tổng dư nợ','Mô tả'], ['1','2','0000001','4800000001','6600000000000001','01/01/2026',1000,'X']], 'Mon_vay_03_thang_KH__2026-07-31_KTNB.XLSX'));
   const khdRong = await doc(tep([[], ['14. Sao kê món vay N tháng không hoạt động (DL Tháng)'], [], [], ['Mã CN','Mã khách hàng','Số khế ước','Tổng dư nợ','Ngày giao dịch gần nhất','Lãi tồn']], 'Mon_vay_03_thang_KH__2026-07-31.XLSX'));
   const skKH = await doc(tep([['Sao kê khách hàng'], ['Mã khách hàng','Tên khách hàng','CCCD'], ['4800000001','A','079000000001'], ['4800000002','B','079000000002']], 'Sao ke khach hang 2026-07-31.xlsx'));
   const m7 = await doc(tep([['Báo cáo kiểm tra tổ'], ['Mã tổ','Tên tổ trưởng','Số tổ viên','Xếp loại tổ','Dư nợ'], ['0000001','A',10,'Tốt',1000]], 'Kiem tra to 2026-07.xlsx'));
   o.boLoai = ['KTNB: '+kt08.loi.slice(0, 40), 'KHĐ rỗng: '+khdRong.loi.slice(0, 40), 'Sao kê KH: '+skKH.loi.slice(0, 35), 'Mẫu 7: '+m7.loi.slice(0, 30)].join(' | ');
   o.loaiChon = SL_LOAI.filter(L=>!L.bo).length+' loại cho chọn · bỏ: '+SL_LOAI.filter(L=>L.bo).map(L=>L.k).join(',');
   /* kiểm tra: số khớp */
   await slKiemTra('2026-07'); let kt = SLM.kt['2026-07'];
   const nh = n => kt.kq.filter(x=>x.nhom===n).map(x=>({ok:'✅',lech:'⚠',canh:'ⓘ',bo:'—'}[x.kq])+' '+x.ten.slice(0, 48)).join('\n    ');
   o.kt7 = '\n    '+nh(7); o.kt8 = '\n    '+nh(8);
   o.ktTong = JSON.stringify(kt.dem)+' · '+kt.kq.filter(x=>x.kq==='lech').map(x=>x.ten.slice(0,30)+': '+x.ds.slice(0,3).map(r=>r.join(' / ')).join(' ; ')).join(' ‖ ');
   /* làm lệch: LEN_31 XAPUONG xã đầu +1.000.000 đ → báo lệch ở 7b và LEN khớp nhau */
   await ghi(fLX(1000000)); await slKiemTra('2026-07'); kt = SLM.kt['2026-07'];
   const l = kt.kq.find(x=>/01\.1 ↔ LEN_31 XAPUONG/.test(x.ten));
   o.lech = l.kq+' · '+l.chu+' · '+l.ds.map(r=>r[0]+' '+r[1]+' chênh '+tdnTien(r[4])).join('; ');
   await ghi(fLX(0)); await slKiemTra('2026-07');
   /* thay file 1 ô: sai kỳ → không thay; đúng kỳ → thay */
   const cu = slChonFile; let hop = '';
   slChonFile = h => h([bcdhtd('01.1', '4820_BCDHTD_01.1_31082026_2.XLSX', 'Ngày 31 Tháng 08 Năm 2026', X, 'CHI NHÁNH/ HUYỆN/XÃ')]); slThayO('bx', '2026-07'); await w(1500);
   hop = (document.querySelector('.hop-in .sl-bao.do')||{}).textContent||''; dongHop();
   const luc0 = SLM.bang['bx|2026-07'].luc;
   slChonFile = h => h([fBX]); slThayO('bx', '2026-07'); await w(1500); slGhiMot(); await w(1500);
   o.thay = 'sai kỳ: '+hop.slice(0, 60)+' | đúng kỳ: '+(SLM.bang['bx|2026-07'].luc!==luc0 ? 'đã thay' : 'CHƯA THAY'); slChonFile = cu;
   /* giao diện nạp: nhóm Ⓐ Ⓑ Ⓒ Ⓓ, ma trận theo nhóm */
   doiNgan(7); slDoiTab('nap'); SL_KY = '2026-07'; veSoLieu(); await w(800);
   o.nap = '① '+document.querySelector('.sl-tt').textContent.replace(/\s+/g,' ').slice(0, 90)+' · ma trận '+document.querySelectorAll('.sl-bang tbody tr').length+' dòng, chấm nhóm '+document.querySelectorAll('.sl-bang .sl-nh').length+', dòng tiêu đề nhóm '+document.querySelectorAll('.sl-nhom-dong').length;
   /* 3.90.1: bảng đối chiếu chéo (sau lần kiểm cuối) */
   const dcb = document.querySelector('.sl-dc-bang');
   o.dc = dcb ? dcb.querySelectorAll('tbody tr').length+' chỉ tiêu × '+(dcb.querySelectorAll('thead th').length-1)+' nguồn · ô khớp '+dcb.querySelectorAll('td.k').length+' · lệch '+dcb.querySelectorAll('td.l').length+' · chip phạm vi '+document.querySelectorAll('.sl-dc-pv .to-chip').length : 'KHÔNG CÓ BẢNG';
   document.querySelectorAll('.sl-dc-pv .to-chip')[1].click(); await w(200);
   o.dcXa = SL_DC_PV+' · '+document.querySelectorAll('.sl-dc-bang tbody tr').length+' chỉ tiêu';
   o.datGom = (document.querySelector('details.sl-kt-muc.ok summary')||{}).textContent;
   /* làm lệch lại để bấm ô đỏ */
   await ghi(fLX(1000000)); await slKiemTra('2026-07'); veSoLieu(); await w(400); SL_DC_PV=''; document.getElementById('sl-kt').innerHTML = slKTHTML('2026-07');
   const oL = document.querySelector('.sl-dc-bang td.l'); if(oL) oL.click(); await w(200);
   o.dcLech = (oL ? 'ô đỏ '+oL.textContent+' → ' : 'không có ô đỏ → ')+(document.querySelector('#sl-dc-chi summary')||{textContent:'(không mở)'}).textContent.slice(0, 60);
   await ghi(fLX(0)); await slKiemTra('2026-07');
   /* tháng trống: không kiểm */
   const truocKT = Object.keys(SLM.kt).length; await slKiemTra('2026-11'); o.thangTrong = 'kiểm tháng trống: '+(Object.keys(SLM.kt).length===truocKT && !SLM.kt['2026-11'] ? 'không chạy, có báo' : 'VẪN CHẠY');
   SLM.kt['2026-11'] = {luc:'2026-10-02T07:15:00', dau:'cu', dem:{ok:2, lech:1, canh:0}, kq:[{nhom:2, ten:'Toàn vẹn các file', kq:'ok', chu:'', ds:[]}]};   /* kết quả cũ lưu từ bản trước */
   { const h = slKTHTML('2026-11'), d = slKTDauHTML('2026-11'); o.thangTrong += ' · kết quả cũ tháng trống: '+(/mục đạt|Kiểm lại/.test(h) ? 'VẪN HIỆN' : 'ẩn')+' · bước 2 '+(/xong">2\./.test(d) ? 'SAI (Đã kiểm)' : 'chưa'); } delete SLM.kt['2026-11'];
   /* tải file gốc: bắt tên file */
   const tai = []; const cuTai = taiXuongBlob; taiXuongBlob = (bl, ten)=>tai.push(ten+' '+bl.size+'B');
   slTaiGoc('bx', '2026-07'); await w(800); slTaiGocThang('2026-07'); for(let i=0;i<40 && tai.length<9;i++) await w(300);
   o.taiGoc = tai.length+' file: '+tai.slice(0, 2).join(' | '); taiXuongBlob = cuTai;
   /* file rác: tạo 1 bảng mồ côi trong máy → tìm thấy → xóa */
   await luuFile('sl_b_lx_2025-01', {cot:{}, n:0}); slTimRac(); for(let i=0;i<40 && !document.querySelector('.sl-rac, .hop-in .sl-bao.xanh');i++) await w(250);
   const nRac = document.querySelectorAll('.sl-rac-tich').length, coMoCoi = /LEN_31 XAPUONG.*T1\/2025/.test((document.querySelector('.sl-rac')||{}).textContent||'');
   document.querySelectorAll('.sl-rac-tich').forEach(c=>{ if(/T1\/2025/.test(c.parentNode.textContent)) c.checked = true; }); slXoaRac(); await w(800);
   o.rac = nRac+' mục rác · thấy bảng mồ côi: '+coMoCoi+' · sau xóa còn trong máy: '+!!(await docFile('sl_b_lx_2025-01'));
   o.tab = Array.from(document.querySelectorAll('.sl-con button')).map(x=>x.textContent).join(' | ');
   /* Tổng hợp */
   slDoiTab('th'); for(let i=0;i<120 && !document.getElementById('th-cay');i++) await w(250);
   const CH = thCH(); CH.ky = '2026-07'; CH.bc = {xa:true,ct:true,dv:true,hoi:true,ctx:true,to:true,tg:true,nv:true,tk:true}; veTongHop(); for(let i=0;i<120 && !(TH_K && TH_K.ky==='2026-07' && document.getElementById('th-cay'));i++) await w(250);
   thXem(); let d; for(let i=0;i<40;i++){ await w(250); d = document.getElementById('th-khung').contentDocument; if(d && d.querySelectorAll('.trang').length===9) break; }
   o.th = '\n    '+Array.from(d.querySelectorAll('.trang')).map(t=>t.querySelector('h1').textContent.slice(0, 55)+': '+t.querySelectorAll('tbody tr').length+' dòng'+(t.querySelector('.bc-dat,.bc-canh') ? ' · '+t.querySelector('.bc-dat,.bc-canh').textContent.slice(0, 40) : '')+(t.querySelector('.bc-ky') ? ' · '+t.querySelector('.bc-ky').textContent : '')).join('\n    ');
   o.thTong = Array.from(d.querySelector('.trang tr.tong').querySelectorAll('td')).slice(8, 9).map(x=>x.textContent).join('')+' (dư nợ triệu) = '+thTr(sum(X, 'dn'));
   const ht = thHTMLIn(TH_XEM); o.in = (ht.indexOf('A4 landscape')>0 ? 'A4 ngang' : 'DỌC?')+' · '+(ht.indexOf('margin:20mm 20mm 20mm 30mm')>0 ? 'lề 2/2/3/2 cm' : 'LỀ SAI')+' · '+(/counter\(page\)/.test(ht) ? 'số trang' : 'không số trang');
   dongHop();
   const x0 = pvLuaChon(TH_K.K.to, CH, 'xa')[0].k; pvChon('th','xa', x0); const d0 = pvLuaChon(TH_K.K.to, CH, 'diem')[0].k; pvChon('th','diem', d0); CH.ct = hs.find(o=>o.ct).ct;
   thXem(); await w(1500); d = document.getElementById('th-khung').contentDocument;
   const tk = d.querySelectorAll('.trang')[8]; o.thSau = d.querySelector('.bc-to').textContent.slice(0, 80)+'\n    tham khảo: '+tk.querySelector('h1').textContent.slice(0, 50)+' · '+(tk.querySelector('.bc-dat,.bc-canh')||{}).textContent.slice(0, 60)+'\n    tổ trưởng: '+d.querySelectorAll('.trang')[5].querySelectorAll('tbody tr').length+' dòng';
   dongHop(); pvChon('th','xa',''); CH.ct = '';
   /* in tổ / sao kê: lề chuẩn + "PGD NHCSXH GÒ DẦU" */
   o.inKhac = (skHTMLIn([{tieuDe:'X', ngay:'', pv:'', html:''}]).indexOf('bc-ky')>0 ? 'sao kê có dòng PGD' : 'THIẾU')+' · '+(bcCSS(false).indexOf('A4 portrait')>0 ? 'danh sách A4 dọc' : 'SAI');
   /* thẻ tổ: chỉ tiêu LEN_31 */
   toCH().ky = '2026-07'; slDoiTab('to'); for(let i=0;i<80 && !(TO_K && TO_K.ky==='2026-07' && document.getElementById('to-cay'));i++) await w(250);
   const ma = Object.keys(TO_K.to).find(m=>TO_K.to[m].len); toChonTo(ma); await w(300);
   { const t = TO_K.to[ma], ds = (TO_K.kh[ma]||[]).filter(x=>x.ku), m0 = ds[0], giu = {dn:m0.dn, tt:m0.ttMon, lt:m0.ltTH, lq:m0.ltQH, qh:m0.qh};
     m0.dn = 0; m0.ttMon = 'CLOSE'; m0.ltTH = 0; m0.ltQH = 0; m0.qh = 0;   /* 3.91.1: giả 1 món đã tất toán */
     const r = toBaoCao('ds', t); o.dsTatToan = 'món tất toán '+(r.html.indexOf(m0.ku)>=0 ? 'hiện' : 'BỊ ẨN')+' · ghi (đã TT) '+(/đã TT\)/.test(r.html) ? 'có' : 'KHÔNG');
     m0.dn = giu.dn; m0.ttMon = giu.tt; m0.ltTH = giu.lt; m0.ltQH = giu.lq; m0.qh = giu.qh; }
   o.theTo = Object.keys(TO_K.to).filter(m=>TO_K.to[m].len).length+'/'+Object.keys(TO_K.to).length+' tổ có LEN_31 · '+Array.from(document.querySelectorAll('.to-kpi div')).map(x=>x.textContent).filter(t=>/LEN/.test(t)).join(' | ');
   /* 3.91: nhóm ma trận sổ / gọn + chip · chọn tháng chữ Việt · kiểm tra & chốt khóa */
   slDoiTab('nap'); SL_KY = '2026-07'; D.cauHinh.slMo = {}; veSoLieu(); await w(500);
   o.nhom = Array.from(document.querySelectorAll('.sl-nh-dong')).map(tr=>tr.cells[0].textContent.trim()+(tr.classList.contains('mo') ? '(sổ)' : '')+': '+Array.from(tr.querySelectorAll('.sl-chipn')).map(x=>x.textContent).filter(t=>t!=='—').join(' ')).join(' / ');
   slMoNhom('A'); await w(300); o.soA = document.querySelectorAll('.sl-bang tbody tr').length+' dòng khi sổ Ⓐ';
   o.thangVN = document.querySelector('.sl-thang-ten').textContent+' · ô month: '+document.querySelectorAll('.sl-dau input[type=month]').length;
   slChonThangHop(2026); await w(200); o.hopThang = document.querySelectorAll('.sl-luoi-thang button').length+' nút tháng'; dongHop();
   o.buocKT = document.querySelector('.sl-4buoc').textContent;
   slChotHop('2026-07'); await w(200); const chuaDat = slChot('2026-07') ? 'CHỐT ĐƯỢC KHI CHƯA ĐẠT' : 'chưa Đạt → không chốt';
   const bbCu = SL_BAT_BUOC; SL_BAT_BUOC = bbCu.filter(k=>k!=='tt' && k!=='khd'); await slKiemTra('2026-07'); veSoLieu(); await w(300);   /* bộ giả T7 chỉ có Mẫu 31 ở nhóm Ⓑ */
   slChotHop('2026-07'); await w(200); slChotGhi('2026-07'); await w(200); const chuaTich = slChot('2026-07');
   document.getElementById('sl-da-xem').checked = true; slChotGhi('2026-07'); await w(400);
   let chan = []; try{ await slGhi(await doc(fBX)); chan.push('ghi: VẪN GHI'); }catch(e){ chan.push('ghi: chặn'); }
   const nBang = Object.keys(SLM.bang).length; slXoa('bx','2026-07'); slXoaThang('2026-07'); await w(300); chan.push('xóa: '+(Object.keys(SLM.bang).length===nBang ? 'chặn' : 'VẪN XÓA'));
   o.chot = chuaDat+' · chưa tích → '+chuaTich+' · tích → '+slChot('2026-07')+' · '+chan.join(' · ')+' · ô khóa '+document.querySelectorAll('.sl-o.khoa').length+' · tiêu đề cột 🔒 '+document.querySelectorAll('.sl-bang th.khoa').length;
   slMoKhoa('2026-07'); await w(300); o.moKhoa = slChot('2026-07')+' · lịch sử: '+!!SLM.chot['2026-07'].chotCu; SL_BAT_BUOC = bbCu;
   /* 3.91: nợ đến hạn 3 khung + viết tắt CT */
   slDoiTab('sk'); for(let i=0;i<80 && !document.getElementById('sk-cay');i++) await w(250);
   const K2 = skCH(); K2.ky = '2026-07'; K2.xa=''; K2.diem=''; K2.hoi=''; K2.to=''; veSaoKe(); for(let i=0;i<80 && !(SK_K && SK_K.ky==='2026-07' && document.getElementById('sk-cay'));i++) await w(250);
   K2.bc = {dh:true}; skDatNgay('nam'); for(let i=0;i<40 && !document.getElementById('sk-cay');i++) await w(250); await w(400); o.nutNam = K2.tu+'→'+K2.den; skDatNgay('quy'); await w(600); o.nutNam += ' · quý '+K2.tu+'→'+K2.den;
   K2.tu = '2029-01-01'; K2.den = '2029-03-31';   /* bộ giả: hạn trả năm 2029 */
   skXem(); await w(1500); const dd = document.getElementById('sk-khung').contentDocument;
   o.dh = K2.tu+'→'+K2.den+' · '+Array.from(dd.querySelectorAll('.bc-khung-ten')).map(x=>x.textContent.slice(0, 2)+' '+x.textContent.split('— ').pop()).join(' | ')+' · cột: '+Array.from(dd.querySelectorAll('.bc-khung th')).slice(0, 12).map(x=>x.textContent).join(',');
   K2.den = '2029-04-30'; CT_DUNG = {}; const r2 = skBaoCao('dh'); CT_DUNG = null; o.dhDenT4 = (r2.html.match(/bc-khung-ten">[^<]*/g)||[]).map(x=>x.slice(14,15)+' '+x.split('— ').pop()).join(' | ')+' (hạn HĐ 20/03, GDXA 19/04 → trong kỳ)';
   o.ctVT = (/bc-ghi">Chương trình: /.test(skHTMLIn(SK_XEM)) ? 'có dòng chú thích' : 'THIẾU chú thích')+' · ô CT: '+((dd.querySelector('.bc-khung tbody tr:not(.nhom):not(.tong) td:nth-child(5)')||{}).textContent||'');
   o.ctChu = SK_XEM[0].ctChu; const ex = SK_XEM[0].aoa; o.dhExcel = ex[0].length+' cột Excel: '+ex[0].slice(0, 6).join(',');
   dongHop();
   /* 3.91: sao kê nợ đến hạn kỳ con (phân kỳ) — sửa tạm 2 món giả thành CT 12 + 1 món cho vay trực tiếp (không tổ); nạp file phân kỳ giả */
   const mv = SK_K.B.co.hstd.filter(x=>x.ku && x.dn>0 && x.to).slice(0, 3);
   mv.forEach((x, i)=>{ x.ct = i<2 ? '12' : '03'; if(i===2) x.to=''; x.c_goc_den_han_lk = i ? 20000000 : 10000000; x.c_goc_da_tra = i===1 ? 15000000 : (i ? 20000000 : 10000000); x.c_tong_chuyen_no_qh = i===1 ? 3000000 : 0; x.c_ngay_b_dau_tra_goc = '07/01/2027'; });
   const ns31 = SLM.bang[slKhoa('hstd', SK_K.thang)].ngay;
   K2.bc = {noxh:true}; K2.den = '2027-12-31'; SK_PK = null; skXem(); await w(1500); let dn = document.getElementById('sk-khung').contentDocument;
   o.noxh = SK_XEM[0].tieuDe.slice(0, 30)+' · '+Array.from(dn.querySelectorAll('.bc-khung-ten')).map(x=>x.textContent.slice(0,1)+' '+x.textContent.split('— ').pop()).join(' | ')+' · ngang '+!!dn.querySelector('.trang.ngang')+' · Excel '+SK_XEM[0].aoa[0].length+' cột · ước tính ≈ '+(dn.body.textContent.match(/≈/g)||[]).length+' · chú thích NOXH '+/NOXH = /.test(SK_XEM[0].ctChu||'');
   dongHop();
   const pkF = tep([['NGAYBC','SOKU','MAKH','TENKH','CTVT','DUNO','TDUNO','NGAYDENHAN','GOCDTRA','NODENHAN'],
     ['01/08/2026', mv[0].ku, mv[0].kh, 'Khach gia', 'CVNHA100', 4000000, mv[0].dn, '15/10/2026', '0', 4000000]], 'No_den_han_phan_ky_den_31-12-2026.xlsx');
   const kpk = await doc(pkF); o.pkDoc = kpk.loai+' · kỳ '+kpk.ky+' · '+(kpk.rows||[]).length+' dòng'; if(!kpk.loi) await slGhi(kpk); await w(300);
   skXem(); await w(1500); dn = document.getElementById('sk-khung').contentDocument;
   o.pkCo = (SK_PK ? 'file '+SK_PK.ky+' hạn '+SK_PK.han : 'KHÔNG NẠP ĐƯỢC FILE')+' · kỳ tới món 1: '+(skPKKy(mv[0], ns31).toiNgay+' '+skPKKy(mv[0], ns31).toiTien)+' · ① '+(dn.querySelector('.bc-khung-ten')||{}).textContent;
   dongHop();
   /* xóa cả bộ tháng 8 · làm mới toàn bộ */
   const truoc = Object.keys(SLM.bang).filter(k=>/\|2026-08/.test(k)).length;
   slXoaThang('2026-08'); for(let i=0;i<40 && Object.keys(SLM.bang).some(k=>/\|2026-08/.test(k));i++) await w(250); await w(500);
   o.xoaThang = truoc+' ô tháng 8 → '+Object.keys(SLM.bang).filter(k=>/\|2026-08/.test(k)).length+' · tháng 7 còn '+Object.keys(SLM.bang).filter(k=>/\|2026-07/.test(k)).length+' ô';
   const vb = (D.vanBan||[]).length;
   slLamMoi(); await w(200); document.getElementById('sl-lm').value = 'xoa'; slLamMoiGhi(); for(let i=0;i<40 && Object.keys(SLM.bang).length;i++) await w(250); await w(500);
   o.lamMoi = Object.keys(SLM.bang).length+' ô · danh bạ '+Object.keys(SL_DB.kh).length+' KH · kiểm tra '+Object.keys(SLM.kt).length+' · văn bản giữ '+(D.vanBan||[]).length+'/'+vb+' · màn hình: '+(document.querySelector('#tr7 .rong')||{}).textContent.slice(0, 40);
   /* 3.91: bản scan chỉ có PDF trên Drive (quét ở máy khác) đổi tên → vẫn vào hàng đẩy, chỉ đổi tên / dời (không dựng lại PDF) */
   { const k = {id:'scgia1', che:'tailieu', ten:'Khach gia Hdtd', trang:[], driveId:'drgia1', driveCha:'chagia', canDay:true, xa:'x', diem:'d', ap:'a', to:'t'};
     D.scan = (D.scan||[]).concat([k]); const goc = {g:window.goiDrive, b:window.baoDamDuong}; let goi = '';
     window.baoDamDuong = () => Promise.resolve('chagia2'); window.goiDrive = (u, opt) => { goi += opt.method+' '+(/upload/.test(u) ? 'UPLOAD' : 'META')+' '; return Promise.resolve({id:'drgia1'}); };
     const trongHang = scanCanDay().indexOf(k)>=0; let kq = ''; try{ await dayMotScan(k); kq = 'ok'; }catch(e){ kq = 'LỖI '+e.message; }
     window.goiDrive = goc.g; window.baoDamDuong = goc.b; D.scan = D.scan.filter(x=>x!==k);
     o.scanDoiTen = 'vào hàng đẩy '+trongHang+' · '+kq+' · gọi Drive: '+goi.trim()+' · còn canDay '+!!k.canDay+' · trạng thái '+(ttScan(k).dat ? 'Đạt' : ttScan(k).thieu.join(',')); }
   return o; }, files);
 for(const k in r) console.log(k.padEnd(9), r[k]);
 await p.setViewportSize({width:390, height:844});
 await p.evaluate(async()=>{ D.cauHinh.slTab='th'; veSoLieu(); await new Promise(r=>setTimeout(r,800)); });
 await p.screenshot({path:__dirname+'/t105.png'}); console.log('lỗi', loi); await b.close(); })();
