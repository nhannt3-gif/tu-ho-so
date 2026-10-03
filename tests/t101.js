// 3.87 — Mẫu 10 theo ngày (dòng lặp do nhiều sổ 105 giữ riêng, 105 lấy 1 lần mỗi khách), Mẫu 7 kiểm tra tổ (ngày xuất sau ngày số liệu),
// đối chiếu tạm bằng Mẫu 10 cuối tháng, đổi ngày, nạp từng file theo ngày; chuyển Mẫu 10 từ bản 3.86 (ô HS tín dụng theo tháng) sang loại mới + Drive.
// Dữ liệu GIẢ dựng ngay trong trang. Bản cũ: node tests/t101.js <đường dẫn index.html bản 3.86> (bỏ trống thì bỏ qua phần chuyển dữ liệu)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), fs=require('fs'), os=require('os'); const drive=require('./fakedrive.js')();
const CU = process.argv[2];
const TAO = () => {   // chạy trong trang: dựng 2 file Excel giả
  const C10=['Mã PGD','Mã xã','Tên xã','Mã thôn','Tên thôn','ĐVUT','Mã tổ','Tên tổ trưởng','Mã khách hàng','Tên khách hàng','Ngày sinh','CCCD','Ngày cấp','Nơi cấp','Địa chỉ','Mã món vay','Chương trình','Tên chương trình','Số tiền giải ngân','Tổng dư nợ','Dư nợ trong hạn','Dư nợ quá hạn','Dư nợ khoanh','Ngày vay','Ngày giải ngân đầu tiên','Số tiền gia hạn','Số tháng gia hạn','Tổng sô tháng gia hạn','Nguồn vốn','Lưu vị trong năm','Lãi tồn trong hạn','Lãi tồn quá hạn','Lãi tồn AH','Lãi tồn','Ngày nhập học','Ngày ra trường','HSSV','Số TK','Tên TK','105 đầu tháng','105 Ngày BC','Mã NĐT'];
  const d = (kh, ten, ku, dn, stk, t105d, t105, to) => ['004820','540034','Phường Giả','54003401','Ấp Giả','11',to||'0050001','TỔ TRƯỞNG GIẢ',kh,ten,'01/01/1980','072000000'+kh.slice(-3),'01/01/2021','CỤC GIẢ','Ấp giả',ku,'03','Cho vay GQVL',dn,dn,dn,0,0,'01/01/2024','01/01/2024',0,0,0,'1',0,0,0,0,1000,'','','03',stk,stk?'TEN TK':'',t105d,t105,''];
  const R = [ d('4800000001','KHÁCH A GIẢ','6600000000000001',30e6,'S01',1e6,1e6), d('4800000001','KHÁCH A GIẢ','6600000000000002',20e6,'',0,0),
    d('4800000002','KHÁCH B GIẢ','6600000000000003',50e6,'S02',2e6,3e6), d('4800000002','KHÁCH B GIẢ','6600000000000003',50e6,'S03',1e6,3e6),
    d('4800000003','KHÁCH C GIẢ','6600000000000004',40e6,'S04',0,2e6), d('4800000003','KHÁCH C GIẢ','6600000000000004',40e6,'S05',2.8e6,2e6), d('4800000003','KHÁCH C GIẢ','6600000000000004',40e6,'',0,0),
    d('4800000004','KHÁCH D GIẢ','6600000000000005',0,'S06',0,0,'0050002') ];
  const aoa = [[],['','10. Sao kê chi tiết (DL Ngày)'],[],[],[''].concat(C10)].concat(R.map(r=>[''].concat(r)));
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
  const f10 = new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX');
  const C7=['TT','Mã PGD','Mã xã','Mã Thôn','Tên thôn','Tên xã','Mã điểm giao dịch','Tên điểm giao dịch','Ngày GDXA','Mã ĐVUT','Tên ĐVUT','Mã tổ','Tên tổ','Số tổ viên','Số tổ viên dư nợ','Số tổ viên còn 105','STV 3TH không nộp lãi','STV 3TH không gửi TK','Dư nợ','Dư nợ quá hạn','Tỷ lệ NQH','Dư nợ khoanh','Tỷ lệ Nợ KH','Lãi Tồn','Số dư 105','Tiền gửi bình quân/TV','Điểm tổ','Xếp loại tổ','Ngày Dữ liệu'];
  const a7 = [[],['','7. BÁO CÁO KIỂM TRA TỔ TK&VV (DL THÁNG)'],[],[],[''].concat(C7),
    ['',1,'004820','540034','54003401','Ấp Giả','Phường Giả','TXN0000001','Điểm giả','07','11','Hội Nông Dân','0050001','Tổ giả 1',3,3,3,0,0,140e6,0,0,0,0,4000,6e6,2e6,'85','Tốt','31/08/2026'],
    ['',2,'004820','540034','54003401','Ấp Giả','Phường Giả','TXN0000001','Điểm giả','07','11','Hội Nông Dân','0050002','Tổ giả 2',1,0,1,0,0,0,0,0,0,0,0,0,0,'70','Khá','31/08/2026']];
  const w7 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(w7, XLSX.utils.aoa_to_sheet(a7), 'BCQUERY');
  const f7 = new File([XLSX.write(w7, {type:'array', bookType:'xlsx'})], 'QUERY0112021190__02092026_8787_31-08-2026.XLSX');
  return [f10, f7];
};
(async()=>{ const b=await chromium.launch(); const loi=[];
 const dir = fs.mkdtempSync(path.join(os.tmpdir(), 't101-'));
 const mo = async(file, ud)=>{ const ctx = ud ? await chromium.launchPersistentContext(ud, {viewport:{width:1366,height:800}}) : await b.newContext({viewport:{width:1366,height:800}});
   await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+file); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; });
   return {p, ctx}; };
 const MOI = path.resolve(__dirname,'..','index.html');
 // ---------- A. bản mới: nạp cả bộ ----------
 const {p, ctx} = await mo(MOI);
 const r = await p.evaluate(async(TAO)=>{ const o={}, w=t=>new Promise(r=>setTimeout(r,t)); const F = eval('('+TAO+')')();
   doiNgan(7); slDocNhieu(F); for(let i=0;i<40 && !document.querySelector('.sl-xt');i++) await w(250);
   o.xemTruoc = SL_NAP.map(k=>k.loi ? 'LỖI (đúng ý — 3.90 bỏ Mẫu 7): '+k.loi.slice(0,60) : [k.loai, k.ky, k.nguonKy, k.rows.length+'+'+(k.lap||[]).length+' lặp', slTrangThai(k).chu].join(' | '));
   o.oNgay = document.querySelector('.sl-xt input[type=date]') ? 'có ô chọn ngày' : 'KHÔNG có ô ngày';
   const t = SL_NAP[0].tong; o.tong10 = 'dn '+t.dn+' · 105 '+t.t105+' · KH nhiều sổ '+t.khNhieuSo+' · món '+t.mon+' · lặp '+t.lap;
   o.tong7 = SL_NAP[1].loi ? 'Mẫu 7 không nạp nữa (3.90)' : 'Mẫu 7 VẪN NẠP — SAI';
   slGhiDaTich(); for(let i=0;i<40 && !document.querySelector('#sl-ky .sl-tom');i++) await w(250);
   o.khoa = Object.keys(SLM.bang).sort().join(', ');
   o.o = Array.from(document.querySelectorAll('.sl-bang tbody tr')).filter(tr=>/✓|⚠/.test(tr.textContent)).map(tr=>tr.cells[0].textContent+': '+Array.from(tr.cells).slice(1).map(c=>c.textContent).filter(x=>x!=='+').join(' | '));
   o.tom = Array.from(document.querySelectorAll('#sl-ky .sl-tom-dong')).map(x=>x.textContent.slice(0,230));
   o.dc = slDoiChieu(await slBo('2026-08')).map(x=>(x.ok?'✅':'⚠')+x.ten+' — '+(x.chu||'').slice(0,100));   // 3.88: đối chiếu nằm trong ② Kiểm tra
   const b = await slDocBang('m10','2026-08-31'); o.luu = 'bảng '+b.n+' dòng · lặp '+(b.lap?b.lap.n:0)+' dòng · sổ ở dòng lặp: '+slMoLap(b).map(x=>x.stk||'(trống)').join(',');
   const c = SL_DB.kh['4800000002']; o.danhBa = 'B: ky '+c.ky+' · sổ '+c.stk+' · 105 '+c.t105+' · món '+c.mon+' | C: sổ '+SL_DB.kh['4800000003'].stk+' · 105 '+SL_DB.kh['4800000003'].t105+' | D món '+SL_DB.kh['4800000004'].mon;
   slTheKH('4800000002'); for(let i=0;i<20 && !document.querySelector('.kh-mon tbody tr');i++) await w(200);
   o.the = (document.querySelector('.tc-the .tc-ct-tit, .tc-the .hop-tit')||{textContent:''}).textContent.slice(-40)+' · '+Array.from(document.querySelectorAll('.tc-the .tc-nhom')).map(x=>x.textContent).filter(x=>/Tiết kiệm 105/.test(x)).join('')+' · món '+document.querySelectorAll('.tc-mon tbody:not([hidden]) tr:not(.tc-hs):not(.tc-cong)').length; dongHop();   /* 3.94: thẻ khách mới */
   // ô ma trận Mẫu 10 → danh sách ngày → mở ngày → đổi ngày
   slMoNgay('m10','2026-08'); o.dsNgay = document.querySelectorAll('.sl-ngay-dong').length+' ngày'; dongHop();
   slDoiNgay('m10','2026-08-31'); document.getElementById('sl-dn').value='2026-08-30'; slDoiNgayGhi('m10','2026-08-31');
   for(let i=0;i<20 && !SLM.bang['m10|2026-08-30'];i++) await w(200);
   o.doiNgay = Object.keys(SLM.bang).filter(k=>/^m10/.test(k)).join(',')+' · danh bạ B ky '+SL_DB.kh['4800000002'].ky+' · IDB cũ '+!!(await docFile('sl_b_m10_2026-08-31'))+' mới '+!!(await docFile('sl_b_m10_2026-08-30'));
   // nạp từng file theo ngày: chọn ngày khác ngày theo tên file → hỏi
   const kq = await slDocFile(F[0], 'm10'); slKiemMot(kq, 'm10', '2026-09-05');
   o.napMot = (document.querySelector('.sl-bao.vang')||{}).textContent; dongHop();
   slNapMot('m10','2026-09'); o.napMotO = document.getElementById('sl-m-ky').type+' '+document.getElementById('sl-m-ky').value; slNapMotLoai('nqh'); o.napMotO += ' → nqh: '+document.getElementById('sl-m-ky').type+' '+document.getElementById('sl-m-ky').value; dongHop();
   // Drive: tên file theo tháng / ngày
   await slDay(); o.choDay = Object.keys(SLM.bang).filter(k=>SLM.bang[k].choDay).length;
   return o; }, TAO.toString());
 for(const k in r) console.log(k.padEnd(9), Array.isArray(r[k]) ? '\n    '+r[k].join('\n    ') : r[k]);
 console.log('Drive    \n    '+Object.values(drive.F).filter(f=>!f.folder && !f.trashed).map(f=>drive.duong(f.id)).sort().join('\n    '));
 await p.screenshot({path:__dirname+'/t101.png', fullPage:true}); await ctx.close();
 // ---------- B. chuyển từ bản cũ (3.86) ----------
 if(CU){
   for(const k in drive.F) delete drive.F[k];
   const ud = path.join(dir, 'u'); const A = await mo(CU, ud);
   const ra = await A.p.evaluate(async(TAO)=>{ const F = eval('('+TAO+')')(); const kq = await slDocFile(F[0]); await slGhi(kq); await slDay();
     return APP_BAN+': '+Object.keys(SLM.bang).join(',')+' · 105 '+SLM.bang['hstd|2026-08'].tong.t105+' · dn '+SLM.bang['hstd|2026-08'].tong.dn+' · KH '+Object.keys(SL_DB.kh).length; }, TAO.toString());
   console.log('cũ      ', ra); console.log('Drive cũ', Object.values(drive.F).filter(f=>!f.folder && !f.trashed).map(f=>drive.duong(f.id)).sort().join(' · '));
   await A.p.goto('file://'+MOI); await A.p.waitForTimeout(1500);
   const rb = await A.p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ';
     for(let i=0;i<40 && !(SL_SAN && SLM.bang['m10|2026-08-31']);i++) await w(250);
     const e = SLM.bang['m10|2026-08-31']||{}; const o = APP_BAN+': '+Object.keys(SLM.bang).join(',')+' · xóa '+Object.keys(SLM.xoa).join(',')+' · nguồn ngày '+e.nguonKy+' · kiểm ngày '+!!e.kiemNgay+' · IDB mới '+!!(await docFile('sl_b_m10_2026-08-31'))+' cũ '+!!(await docFile('sl_b_hstd_2026-08'));
     const c = SL_DB.kh['4800000002']; const db = ' · danh bạ B ky '+c.ky+' sổ '+c.stk;
     doiNgan(7); for(let i=0;i<20 && !document.querySelector('#sl-ky .sl-tom-dong');i++) await w(250);
     const tom = Array.from(document.querySelectorAll('#sl-ky .sl-tom-dong')).map(x=>x.textContent.slice(0,260)).join(' || ');
     await slDay(); return o+db+'\n    tóm tắt: '+tom+'\n    chờ Drive: '+Object.keys(SLM.bang).filter(k=>SLM.bang[k].choDay).length; });
   console.log('mới     ', rb);
   console.log('Drive mới', Object.values(drive.F).filter(f=>!f.folder && !f.trashed).map(f=>drive.duong(f.id)).sort().join(' · '), '· thùng rác:', Object.values(drive.F).filter(f=>f.trashed).map(f=>drive.duong(f.id)).join(' · '));
   // máy thứ 2 (bản mới, máy trắng) kéo từ Drive
   const B2 = await mo(MOI);
   const rc = await B2.p.evaluate(async()=>{ await slNap(); const n = await slTaiTuDrive(); const Bo = await slBo('2026-08-31'); return 'kéo '+n+' · '+Object.keys(SLM.bang).join(',')+' · món '+Object.keys(Bo.mon).length+' · lặp '+Bo.lap.length+' · KH '+SL_TIM.length; });
   console.log('máy 2   ', rc);
   await A.ctx.close(); await B2.ctx.close();
 }
 console.log('lỗi', loi); await b.close(); })();
