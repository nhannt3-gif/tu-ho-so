// 3.108 — Danh sách tổ TK&VV (DSTO): đọc (vùng dữ liệu khai sai, dòng tên cột phụ, chữ ký), bổ sung tổ thiếu trong Thông tin tổ trưởng,
//        đối chiếu Thông tin tổ trưởng ↔ DSTO ↔ Mẫu 31, tên tổ trưởng chuẩn (bỏ Ông / Bà, lấy dấu, hoa đầu từ).
// Bộ GIẢ: tests/gia31 + bảng tổ T7 (= T8 bỏ 3 tổ) + DSTO T7 dựng từ bảng tổ T8 (cài lệch: 1 điểm GD, 1 Hội, thiếu 1 tổ).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = f => { const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u; };
   for(const f of files){ const kq = await slDocFile(new File([tep(f)], f.n)); if(!kq.loi) await slGhi(kq); }
   /* 1. vùng dữ liệu khai sai */
   const ws = XLSX.utils.aoa_to_sheet([['a','b'],[1,2],[3,4],[5,6],[7,8]]); ws['!ref'] = 'A1:B2';
   ok('vùng dữ liệu khai thiếu (dimension) → mở rộng theo ô thật', slSuaRef(ws)['!ref']==='A1:B5' && XLSX.utils.sheet_to_json(ws, {header:1}).length===5, ws['!ref']);
   /* 2. dựng bảng tổ T7 (thiếu 3 tổ) + DSTO T7 */
   const fT8 = files.find(f=>/to truong T8/i.test(f.n)), wb = XLSX.read(tep(fT8), {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]];
   const rows = XLSX.utils.sheet_to_json(sh, {header:1, defval:''}), iH = rows.findIndex(r=>r.indexOf('Mã tổ trưởng')>=0), H = rows[iH], c = n => H.indexOf(n);
   const ma = r => String(r[c('Mã tổ trưởng')]).padStart(7, '0');
   const K8 = await toNap('2026-07'); for(const k in TO_KS) delete TO_KS[k];
   const coMon = {}; (K8.hs||[]).forEach(x=>{ if(x.to && (x.dn||0)>0) coMon[x.to] = 1; });
   const du = rows.slice(iH+1).filter(r=>r[c('Mã tổ trưởng')]!=='' && coMon[ma(r)]);
   const boTT = du.slice(0, 3).map(ma), [mA, mB, mC] = du.slice(3, 6).map(ma);
   const xl = (aoa, ten) => { const w = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(w, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); return new File([XLSX.write(w, {type:'array', bookType:'xlsx'})], ten); };
   const kqT = await slDocFile(xl(rows.filter((r, i)=>i<=iH || boTT.indexOf(ma(r))<0), 'Thong tin to truong T7 2026.xlsx')); await slGhi(kqT);
   const dvTen = {'11':'HỘI NÔNG DÂN', '12':'HỘI PHỤ NỮ', '13':'HỘI CỰU CHIẾN BINH', '14':'ĐOÀN THANH NIÊN'};
   const diemKhac = du.map(r=>r[c('Mã điểm GDXA')]).find(d=>d!==du[3][c('Mã điểm GDXA')]);
   const dvB = String(du[4][c('ĐVUT')]).padStart(2, '0'), dvKhac = dvB==='11' ? '12' : '11';
   const aoa = [['NGÂN HÀNG CHÍNH SÁCH XÃ HỘI'], [], ['DANH SÁCH TỔ TK&VV'], [],
     ['MÃ PGD','TÊN XÃ','MÃ ĐIỂM GDX','TÊN ĐIỂM GDX','TÊN THÔN','ĐƠN VỊ ỦY THÁC','MÃ TỔ','MÃ KHÁCH HÀNG TỔ TRƯỞNG','TÊN TỔ TRƯỞNG','SỐ ĐIỆN THOẠI','SỐ TỔ VIÊN','TỔNG DƯ NỢ','SỐ HỘ TẤT NỢ',''],
     ['','','','','','','','','','','','','CÒN LÃI TỒN','CÒN TIẾT KIỆM']];
   du.forEach(r=>{ const m = ma(r); if(m===mC) return; const dv = String(r[c('ĐVUT')]).padStart(2, '0');
     aoa.push(['004820', r[c('Tên xã')], m===mA ? diemKhac : r[c('Mã điểm GDXA')], r[c('Tên điểm GDXA')], r[c('Tên thôn')], dvTen[m===mB ? dvKhac : dv]||'', m, '', String(r[c('Tên tổ trưởng')]).toUpperCase(), r[c('SĐT Tổ trưởng')], 10, 1000000, 0, 0]); });
   aoa.push(['TỔNG CỘNG','','','','','','','','','','','=SUM(L7:L99)']); aoa.push([]); aoa.push(['Thủ trưởng đơn vị','','','','Lập biểu']); aoa.push(['(Ký, ghi rõ họ tên)']);
   const kqD = await slDocFile(xl(aoa, '004820_31072026_DSTO.xlsx'));
   ok('đọc DSTO: đúng loại, kỳ T7 theo tên file, bỏ dòng tên cột phụ / tổng / chữ ký (0 dòng sai)', kqD.loai==='dsto' && kqD.ky==='2026-07' && kqD.rows.length===du.length-1 && !kqD.bo.sai, kqD.loai+' '+kqD.ky+' '+kqD.rows.length+'/'+(du.length-1)+' '+JSON.stringify(kqD.bo));
   ok('Hội ghi bằng chữ → mã (HỘI NÔNG DÂN → 11, ĐOÀN THANH NIÊN → 14)', toDvTuTen('HỘI NÔNG DÂN')==='11' && toDvTuTen('ĐOÀN THANH NIÊN')==='14' && toDvTuTen('HỘI PHỤ NỮ')==='12');
   await slGhi(kqD);
   /* 3. tổ thiếu trong Thông tin tổ trưởng → điểm GD theo DSTO cùng tháng (trước bảng tháng khác) */
   const K = await toNap('2026-07');
   ok('3 tổ thiếu lấy điểm GD theo Danh sách tổ T7/2026', boTT.every(m=>K.to[m] && K.to[m].diem && K.to[m].diemTu==='Danh sách tổ T7/2026'), boTT.map(m=>K.to[m] && K.to[m].diemTu).join(' | '));
   ok('tổ có trong Thông tin tổ trưởng giữ điểm GD của file đó (DSTO lệch không đè)', K.to[mA].diem===du[3][c('Mã điểm GDXA')] && !K.to[mA].diemTu);
   ok('ngày GD của tổ lấy theo DSTO = ngày của điểm GD (DSTO không có cột ngày)', boTT.every(m=>K.to[m].ngayGD));
   const h = document.createElement('div'); h.innerHTML = ktSuyHTML(K);
   ok('dòng báo vàng: "… thiếu 3 tổ … đã xếp điểm GD: Danh sách tổ (DSTO) 3"', /thiếu 3 tổ/.test(h.textContent) && /Danh sách tổ \(DSTO\) 3/.test(h.textContent), (h.querySelector('summary')||{}).textContent);
   /* 4. đối chiếu chéo trong ② Kiểm tra */
   await slKiemTra('2026-07'); const kt = SLM.kt['2026-07'].kq.filter(x=>x.nhom===6), tim = re => kt.find(x=>re.test(x.ten)) || {};
   ok('thiếu trong Thông tin tổ trưởng: 3 tổ (lưu ý, app đã bù)', tim(/có trong Thông tin tổ trưởng/).kq==='canh' && tim(/có trong Thông tin tổ trưởng/).n===3, tim(/có trong Thông tin tổ trưởng/).chu);
   ok('thiếu trong DSTO: 1 tổ', tim(/có trong Danh sách tổ/).n===1 && tim(/có trong Danh sách tổ/).ds[0][0]===mC, tim(/có trong Danh sách tổ/).chu);
   ok('lệch điểm GD 2 danh sách: 1 tổ', tim(/^Điểm GD/).kq==='lech' && tim(/^Điểm GD/).n===1 && tim(/^Điểm GD/).ds[0][0]===mA, tim(/^Điểm GD/).chu);
   ok('lệch Hội (DSTO ≠ ĐVUT món): 1 tổ', tim(/^Hội của tổ/).n===1 && tim(/^Hội của tổ/).ds[0][0]===mB, tim(/^Hội của tổ/).chu);
   ok('tổ trưởng / SĐT: so không phân biệt hoa thường → khớp', tim(/Tổ trưởng \/ SĐT/).kq==='ok', tim(/Tổ trưởng \/ SĐT/).chu);
   ok('có DSTO → bỏ phép cũ "Tổ … có trong danh sách tổ trưởng" (không báo trùng)', !kt.some(x=>/có trong danh sách tổ trưởng/.test(x.ten)));
   ok('không so dư nợ / số tổ viên (DSTO khác thời điểm)', !kt.some(x=>/dư nợ tổ|số tổ viên/i.test(x.ten)));
   /* 5. tên tổ trưởng chuẩn */
   ok('hoa đầu từ', tenHoaDau('NGUYỄN VĂN AN')==='Nguyễn Văn An' && tenHoaDau('  trần  thị bé ')==='Trần Thị Bé');
   const Kt = {hs:[{kh:'K1', ten:'Trần Văn Hải', to:'X'}, {kh:'K2', ten:'Nguyễn Thị Một', to:'A'}], kh:{A:[{ten:'Nguyễn Thị Một'}, {ten:'Lê Văn Tư'}]}, to:{
     A:{ma:'A', ten:'BÀ NGUYEN THI MOT', pho:'ONG LE VAN TU'}, B:{ma:'B', ten:'Ong TRAN VAN HAI', ds:{ttKH:'K1'}}, C:{ma:'C', ten:'LE VAN BA'}, D:{ma:'D', ten:'NGUYỄN VĂN AN'}, E:{ma:'E', ten:'Bà Ba'},
     F:{ma:'F', ten:'ONG PHAM VAN NAM', ds:{ttKH:'K1'}}, G:{ma:'G', trucTiep:true, ten:'Vay trực tiếp (không qua tổ)'}}};
   toTenChuan(Kt); const t = Kt.to;
   ok('bỏ "Bà" + lấy dấu theo thành viên tổ trùng tên', t.A.ten==='Nguyễn Thị Một' && t.A.tenGoc==='BÀ NGUYEN THI MOT', t.A.ten);
   ok('tổ phó cũng chuẩn', t.A.pho==='Lê Văn Tư', t.A.pho);
   ok('bỏ "Ong" + lấy dấu theo mã KH tổ trưởng (Mẫu 31)', t.B.ten==='Trần Văn Hải', t.B.ten);
   ok('không tìm được → giữ không dấu, hoa đầu từ, đánh dấu', t.C.ten==='Le Van Ba' && t.C.tenKhongDau, t.C.ten);
   ok('tên có dấu in hoa → hoa đầu từ', t.D.ten==='Nguyễn Văn An');
   ok('"Bà Ba" (còn 1 chữ) không bỏ', t.E.ten==='Bà Ba', t.E.ten);
   ok('mã KH khác tên → không lấy nhầm', t.F.ten==='Pham Van Nam' && t.F.tenKhongDau, t.F.ten);
   ok('vay trực tiếp không đổi', t.G.ten==='Vay trực tiếp (không qua tổ)');
   ok('tổ trưởng trong app đã chuẩn (không còn IN HOA / Ông / Bà)', Object.values(K.to).filter(x=>!x.trucTiep && x.ten).every(x=>x.ten!==x.ten.toUpperCase() && !/^(ông|bà) /i.test(x.ten)));
   KT_K = K; TO_K = K; ok('Mẫu 16 in tên tổ trưởng đã chuẩn', ktGiaTri16(K.to[boTT[0]], [], {}).f.TT===K.to[boTT[0]].ten);
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
