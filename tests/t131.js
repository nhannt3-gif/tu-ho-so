// 3.138 — ⟳ Làm mới cạnh ô Số liệu + chip kỳ đang dùng; TK 105 "đã mở TK"; KU hủy / nhập nhầm tổ (CLOSE + giải ngân 0) loại khỏi tổ;
//        KU đã nhập máy chưa giải ngân (OPEN, giải ngân 0) không tính tất nợ + báo cáo Sao kê (quá 1 tháng → cần đóng KU); chip Đến hạn tháng sau 2 ngày.
// Bộ GIẢ: tests/gia31 — dòng cài thêm trong phép thử (khách / KU giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = n => { const f = files.find(x=>x.n===n), bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   const M8 = 'Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX';
   for(const f of files){ if(f.n===M8) continue; const kq = await slDocFile(tep(f.n)); if(!kq.loi) await slGhi(kq); }
   /* Mẫu 31 T8 + dòng giả: A = khách tổ X có KU hủy ở tổ Y (nhập nhầm); B = khách mới tổ Y chỉ có KU hủy; C, D = KU OPEN chưa giải ngân (vay 15/07 → quá 1 tháng, 20/08 → chưa) */
   const kq = await slDocFile(tep(M8)); const vay = kq.rows.filter(x=>x.ku && x.to && x.to!==TO_GIA && (x.dn||0)>0);
   const a = vay[0], toY = vay.find(x=>x.to!==a.to).to, mau = Object.assign({}, a);
   ok('Mẫu 31 giả có cột Tình trạng món vay + Tổng giải ngân', a.ttMon==='OPEN' && a.gn>0, a.ttMon+' '+a.gn);
   const moi = (x) => Object.assign({}, mau, {t105:0, stk:'', lt:0, ltTH:0, ltQH:0, qh:0, kn:0, th:0, gnT:0, dn:0, gn:0}, x);
   kq.rows.push(moi({kh:a.kh, ten:a.ten, to:toY, ku:'9900000000000001', ttMon:'CLOSE'}));
   kq.rows.push(moi({kh:'4899999991', ten:'Khách Giả Hủy', to:toY, ku:'9900000000000002', ttMon:'CLOSE'}));
   kq.rows.push(moi({kh:'4899999992', ten:'Khách Giả Chờ Một', to:toY, ku:'9900000000000003', ttMon:'OPEN', nv:'2026-07-15', mucVay:30000000, stk:'14820000012345'}));
   kq.rows.push(moi({kh:'4899999994', ten:'Khách Giả Tất Nợ', to:a.to, ku:'9900000000000005', ttMon:'CLOSE', gn:20000000, stk:'14820000055555'}));   /* 3.138.1: tất nợ, có số TK 14 số */
   kq.rows.push(moi({kh:'4899999995', ten:'Khách Giả Ra Tổ Một', to:a.to, ku:'9900000000000006', ttMon:'CLOSE', gn:20000000}));   /* 3.138.1: tất nợ, TK 105 tách dòng riêng không tổ */
   kq.rows.push(moi({kh:'4899999995', ten:'Khách Giả Ra Tổ Một', to:'', ku:'', ttMon:'', gn:0, stk:'14820000066666', t105:1500}));
   kq.rows.push(moi({kh:'4899999996', ten:'Khách Giả Ra Tổ Hai', to:a.to, ku:'9900000000000007', ttMon:'CLOSE', gn:30000000}));   /* tất nợ, đã đóng TK 105 */
   kq.rows.push(moi({kh:'4899999993', ten:'Khách Giả Chờ Hai', to:toY, ku:'9900000000000004', ttMon:'OPEN', nv:'2026-08-20', mucVay:20000000}));
   /* TK 105: khách còn nợ, số dư 0, chỉ có số tài khoản hệ thống 14 số (chưa có số sổ 10 số) */
   const e = vay.find(x=>x.to===a.to && x.kh!==a.kh); kq.rows.filter(x=>x.kh===e.kh).forEach(x=>{ x.stk = '14820000099999'; x.t105 = 0; }); (kq.lap||[]).filter(x=>x.kh===e.kh).forEach(x=>{ x.stk = ''; x.t105 = 0; });
   if(SL_DB && SL_DB.kh && SL_DB.kh[e.kh]) delete SL_DB.kh[e.kh].stk;
   /* Đến hạn: món trong hạn tổ X — HĐ 20/09, GDXA 07/10 (chuyển QH sau kỳ) */
   const f = vay.find(x=>x.to===a.to && x.kh!==a.kh && x.kh!==e.kh && !(x.qh>0)); kq.rows.filter(x=>x.ku===f.ku).forEach(x=>{ x.dhg = '2026-09-20'; x.dhgh = ''; x.dhgd = '2026-10-07'; });
   const g = vay.find(x=>x.to===a.to && ![a.kh, e.kh, f.kh].includes(x.kh) && !(x.qh>0)); kq.rows.filter(x=>x.ku===g.ku).forEach(x=>{ x.dhg = '2026-08-25'; x.dhgh = ''; x.dhgd = '2026-09-07'; });
   await slGhi(kq);
   ok('slKUHuy / slKUChuaGN đúng định nghĩa', slKUHuy({ku:'1', ttMon:'CLOSE', gn:0, dn:0}) && !slKUHuy({ku:'1', ttMon:'CLOSE', gn:5, dn:0}) && !slKUHuy({ku:'1', ttMon:'CLOSE', dn:0}) && slKUChuaGN({ku:'1', ttMon:'OPEN', gn:0, dn:0}) && !slKUChuaGN({ku:'1', ttMon:'OPEN', gn:9, dn:9}));
   TO_KS = {}; SL_BO = {}; const B = await slBo('2026-08'); const nHuy = (B.huy||[]).filter(x=>!/^99/.test(x.ku)).length;   /* bộ giả có sẵn 1 món CLOSE giải ngân 0 (dòng mẫu taogia.py) */
   ok('KU hủy bị loại khỏi Mẫu 31 (2 KU giả), KU chưa giải ngân vẫn giữ', (B.huy||[]).filter(x=>/^99/.test(x.ku)).length===2 && !B.co.hstd.some(x=>/^990000000000000[12]$/.test(x.ku)) && B.co.hstd.some(x=>x.ku==='9900000000000003'), (B.huy||[]).length);
   const dc = slDoiChieu(B).find(x=>/KU hủy/.test(x.ten)); ok('Kiểm tra số liệu: dòng "KU hủy / nhập nhầm … n KU — đã loại"', !!dc && dc.chu.indexOf((2+nHuy)+' KU — đã loại')===0, dc && dc.chu);
   /* tab Tổ */
   doiNgan(7); const C = toCH(); C.ky = '2026-08'; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; D.cauHinh.slTab = 'to'; slDoiTab('to'); for(let i=0;i<120 && !TO_K;i++) await w(250); await w(400);
   const tY = TO_K.to[toY], tvY = toTV(tY), tvX = toTV(TO_K.to[a.to]);
   ok('tổ Y (tổ nhập nhầm): không có khách A, không có khách chỉ có KU hủy', !tvY.some(k=>k.kh===a.kh) && !tvY.some(k=>k.kh==='4899999991'));
   ok('tổ X: khách A vẫn là tổ viên có dư nợ', tvX.some(k=>k.kh===a.kh && k.conNo));
   const c1 = tvY.find(k=>k.kh==='4899999992'), c2 = tvY.find(k=>k.kh==='4899999993');
   ok('KU chưa giải ngân: chuaGN, không vào chip Tất nợ / Đề xuất cho ra, ghi chú "Chưa giải ngân"', c1 && c1.chuaGN && !toLocHam('ko')(c1) && !toLocHam('ra')(c1) && toGoiY(c1)==='Chưa giải ngân' && toNgayO(c1, 'ko')==='chưa giải ngân');
   const kE = tvX.find(k=>k.kh===e.kh);
   ok('TK 105: có số TK 14 số (số dư 0) → "đã mở TK", không vào chip "chưa có TK 105"', kE && kE.coTK && toStkChu(kE)==='đã mở TK' && !toLocHam('ctk')(kE), kE && JSON.stringify({stk:kE.stk, co:kE.coTK}));
   const kT = tvX.find(k=>k.kh==='4899999994');
   ok('3.138.1: khách đã tất nợ có số TK 14 số → KHÔNG ghi "đã mở TK" (để trống)', kT && !kT.conNo && kT.coTK && toStkChu(kT)==='', kT && toStkChu(kT));
   ok('3.138.1: khách tất nợ có TK 105 tách dòng riêng (không tổ) / đã đóng TK 105 → không còn là tổ viên', !tvX.some(k=>k.kh==='4899999995' || k.kh==='4899999996') && tvX.some(k=>k.kh==='4899999994'));
   ok('3.138.1: B.raTo ghi lý do; ② Kiểm tra có dòng "đã ra khỏi tổ"', (B.raTo||[]).find(x=>x.kh==='4899999995').ly==='tất nợ, TK 105 không còn gắn tổ' && (B.raTo||[]).find(x=>x.kh==='4899999996').ly==='tất nợ, đã đóng TK 105' && slDoiChieu(B).some(x=>/đã ra khỏi tổ/.test(x.ten)));
   const Mn = await toMapKy('2026-08'), bd = toBienDong(a.to, Mn, Object.assign({}, Mn, {'4899999995':{to:a.to, ten:'Khách Giả Ra Tổ Một', dn:0, t105:0}, '4899999996':{to:a.to, ten:'Khách Giả Ra Tổ Hai', dn:0, t105:0}}));
   ok('3.138.1: chip Ra khỏi tổ — cột "Đi đâu" ghi lý do', bd.ra.find(r=>r.kh==='4899999995').di==='tất nợ, TK 105 không còn gắn tổ' && bd.ra.find(r=>r.kh==='4899999996').di==='tất nợ, đã đóng TK 105', JSON.stringify(bd.ra.map(r=>r.di)));
   ok('khách chưa giải ngân có số TK 105 → "đã mở TK"', toStkChu(c1)==='đã mở TK' && toStkChu(c2)==='');
   /* chip Đến hạn tháng sau: 2 cột */
   const kF = tvX.find(k=>k.kh===f.kh), kG = tvX.find(k=>k.kh===g.kh), vF = toNgayGT(kF, 'dh'), vG = toNgayGT(kG, 'dh');
   ok('chip Đến hạn: tiêu đề 2 cột', toNgayH(toNgayCot('dh')).length===2 && /ĐH theo HĐ/.test(toNgayCot('dh')) && /GDXA/.test(toNgayCot('dh')));
   ok('món HĐ 20/09, GDXA 07/10 → "ĐH HĐ T09, chuyển QH ngày 07/10"', kF.dhSau && /20\/09\/2026/.test(vF[0]) && /07\/10\/2026 — ĐH HĐ T09, chuyển QH ngày 07\/10/.test(vF[1]), vF.join(' | '));
   ok('món đã quá ĐH HĐ 25/08 (GDXA 07/09) → "đã quá ĐH HĐ — chưa chuyển QH do ngày GD xã"', kG.dhSau && /25\/08\/2026/.test(vG[0]) && /chưa chuyển QH do ngày GD xã/.test(vG[1]), vG.join(' | '));
   C.to = a.to; TO_LOC_MO = 'dh'; const bc = toBCDS(TO_K.to[a.to]);
   ok('In / Excel chip Đến hạn: có 2 cột ĐH theo HĐ + ĐH theo GDXA, dòng cùng số cột', bc.aoa[0].includes('ĐH theo HĐ (gia hạn)') && bc.aoa[0].includes('ĐH theo GDXA · ghi chú') && bc.aoa.every(r=>r.length===bc.aoa[0].length), bc.aoa[0].join(','));
   TO_LOC_MO = 'tat';
   /* Sao kê: KU đã nhập máy chưa giải ngân */
   const S = skCH(); S.ky = '2026-08'; S.xa = ''; S.diem = ''; S.hoi = ''; S.to = ''; SK_K = null; D.cauHinh.slTab = 'sk'; slDoiTab('sk'); for(let i=0;i<80 && !SK_K;i++) await w(250); await w(300);
   ok('Sao kê có báo cáo "KU đã nhập máy chưa giải ngân" ở nhóm Nợ cần xử lý', SK_BC.some(x=>x.k==='cgn' && x.nhom==='xl') && /KU đã nhập máy chưa giải ngân/.test(document.getElementById('tr7').textContent));
   const r = skBaoCao('cgn');
   ok('báo cáo: 2 KU, KU vay 15/07 quá 1 tháng xếp đầu "Cần đóng KU", 20/08 chưa', r.aoa.length>=3 && r.aoa[1][6]==='9900000000000003' && /cần đóng KU/.test(r.aoa[1][11]) && r.aoa[2][6]==='9900000000000004' && !r.aoa[2][11], JSON.stringify(r.aoa.slice(0, 3)));
   ok('báo cáo: cột Tổ / Xã / Hội / Mức vay / Ngày vay / Số ngày; dòng quá hạn tô nền', r.aoa[0].join('|')==='STT|Tổ|Xã|Hội|Mã KH|Họ tên|Số KU|Chương trình|Mức vay|Ngày vay (nhập máy)|Số ngày|Ghi chú' && r.aoa[1][8]===30000000 && r.aoa[1][9]==='15/07/2026' && r.aoa[1][10]===47 && /class="nb"/.test(r.html), r.aoa[1].join('|'));
   ok('quá 1 tháng theo tháng lịch (31/01 → 28/02; 15/07 → 15/08)', ngayThem1Thang('2026-01-31')==='2026-02-28' && ngayThem1Thang('2028-01-31')==='2028-02-29' && ngayThem1Thang('2026-12-15')==='2027-01-15' && skQua1Thang('2026-07-15', '2026-08-16') && !skQua1Thang('2026-07-15', '2026-08-15'));
   /* ⟳ Làm mới + chip */
   const kq9 = await slDocFile(tep(M8)); kq9.ky = '2026-09-10'; kq9.ngay = '2026-09-10'; await slGhi(kq9);
   D.cauHinh.slTab = 'to'; C.to = ''; TO_K = null; veSoLieu(); for(let i=0;i<80 && !TO_K;i++) await w(250); await w(400);
   const the = () => document.getElementById('tr7');
   /* 3.149: ô Kỳ chung ở đầu trang thay ⟳ Làm mới + chip từng tab */
   kyChungVe(); const sel = document.getElementById('ky-chung-o');
   ok('3.149: ô Kỳ chung ở đầu trang có kỳ ngày 10/09 (khi cần)', !!sel && [...sel.options].some(x=>x.value==='2026-09-10'));
   kyChungDoi('2026-09-10'); for(let i=0;i<80 && !(TO_K && TO_K.ky==='2026-09-10');i++) await w(250); await w(400);
   ok('đổi kỳ chung: Tổ, Sao kê, KTGS cùng kỳ 10/09', toCH().ky==='2026-09-10' && skCH().ky==='2026-09-10' && ktCH().ky==='2026-09-10' && TO_K.ky==='2026-09-10', TO_K && TO_K.ky);
   D.cauHinh.slTab = 'sk'; SK_K = null; veSoLieu(); for(let i=0;i<80 && !SK_K;i++) await w(250); await w(300);
   ok('Sao kê theo kỳ chung (10/09)', SK_K.ky==='2026-09-10');
   D.cauHinh.slTab = 'kt'; KT_K = null; veSoLieu(); for(let i=0;i<80 && !KT_K;i++) await w(250); await w(500);
   ok('KTGS theo kỳ chung (10/09)', KT_K && KT_K.ky==='2026-09-10');
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0, 5));
 console.log((R.filter(x=>x[0]==='✓').length)+'/'+R.length+' đạt'); await b.close(); })();
