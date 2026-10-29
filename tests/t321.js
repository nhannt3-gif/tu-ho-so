// 3.401 (anh chốt 28/10 — Tèo QT-C-10 / 11, docs/TEO_QUY_TAC_CHUNG.md): chuỗi món → tổ → ấp → điểm GD.
//   Ấp của tổ = mã thôn (MADP) File Tổ trưởng (ghi đè ấp theo Mẫu 31) · món trực tiếp theo tổ cùng ấp trước danh mục địa bàn, ấp chưa có tổ → tạm GDXA (báo)
//   · Kiểm tra kỳ nhóm 6: món lệch ấp so với tổ, ấp nhiều điểm, món trực tiếp gán tạm — chỉ báo. Bộ GIẢ tests/gianho31 + File Tổ trưởng giả dựng trong phép thử.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   /* 1. đơn vị: món trực tiếp + kiểm ấp trên cây giả */
   const T = {
     A1:{ma:'A1', xa:'X1', tenXa:'Xã Giả', thon:'11', tenThon:'Ấp Một', diem:'D1', tenDiem:'Điểm Một', ngayGD:'05', thonTT:true},
     A2:{ma:'A2', xa:'X1', tenXa:'Xã Giả', thon:'11', tenThon:'Ấp Một', diem:'D1', tenDiem:'Điểm Một', ngayGD:'05', thonTT:true},
     A3:{ma:'A3', xa:'X1', tenXa:'Xã Giả', thon:'22', tenThon:'Ấp Hai', diem:'D2', tenDiem:'Điểm Hai', ngayGD:'12', thonTT:true},
     A4:{ma:'A4', xa:'X1', tenXa:'Xã Giả', thon:'22', tenThon:'Ấp Hai', diem:'D1', tenDiem:'Điểm Một', ngayGD:'05', thonTT:true}};
   const hs = [{ku:'M1', kh:'K1', ten:'Khách Giả 1', to:'A1', xa:'X1', thon:'11', dn:100},
     {ku:'M2', kh:'K2', ten:'Khách Giả 2', to:'A1', xa:'X1', thon:'22', dn:200},
     {ku:'M3', kh:'K3', ten:'Khách Giả 3', to:'', xa:'X1', tenXa:'Xã Giả', thon:'11', ngayGD:'12', dn:300},
     {ku:'M4', kh:'K4', ten:'Khách Giả 4', to:'', xa:'X1', tenXa:'Xã Giả', thon:'33', ngayGD:'12', dn:400},
     {ku:'M5', kh:'K5', ten:'Khách Giả 5', to:'', xa:'X1', tenXa:'Xã Giả', thon:'99', ngayGD:'27', dn:500}];
   const K = {to:T, kh:{A1:[hs[0], hs[1]]}, hs:hs};
   const giuDB = D.cauHinh.diaBan; D.cauHinh.diaBan = [{ma:'X1', diem:[{ma:'D2', ten:'Điểm Hai', ap:[{ma:'11'}]}]}];   /* danh mục cũ ghi ấp 11 thuộc D2 — sai với File Tổ trưởng */
   toGanTrucTiep(K, {co:{}});
   ok('QT-C-11: món trực tiếp ấp có tổ → điểm của tổ cùng ấp (File Tổ trưởng), không theo danh mục cũ / GDXA', T[hs[2]._tt] && T[hs[2]._tt].diem==='D1' && hs[2]._ttCach==='ap', hs[2]._tt+' · '+hs[2]._ttCach);
   ok('QT-C-11: ấp chưa có tổ → tạm theo ngày GDXA, đánh dấu gdxa', T[hs[3]._tt] && T[hs[3]._tt].diem==='D2' && hs[3]._ttCach==='gdxa', hs[3]._tt+' · '+hs[3]._ttCach);
   ok('QT-C-11: không ra điểm → "chưa rõ"', hs[4]._ttCach==='chua');
   D.cauHinh.diaBan = [{ma:'X1', diem:[{ma:'D2', ten:'Điểm Hai', ap:[{ma:'33'}]}]}]; hs[3]._ttCach = ''; Object.keys(T).forEach(k=>{ if(T[k].trucTiep) delete T[k]; });
   toGanTrucTiep(K, {co:{}});
   ok('QT-C-11: ấp chưa có tổ nhưng có trong danh mục địa bàn → theo danh mục, trước GDXA', hs[3]._ttCach==='danhMuc' && T[hs[3]._tt].diem==='D2');
   D.cauHinh.diaBan = giuDB;
   const q = toKiemAp(K);
   ok('QT-C-10: món ở ấp khác ấp của tổ → danh sách lệch ấp (món, tổ, ấp món, ấp tổ)', q.lechAp.length===1 && q.lechAp[0][0]==='M2' && q.lechAp[0][4]==='22' && q.lechAp[0][5]==='11', JSON.stringify(q.lechAp));
   ok('QT-C-10: ấp có tổ thuộc 2 điểm → danh sách ấp nhiều điểm', q.apNhieu.length===1 && q.apNhieu[0][1]==='22' && /Điểm Hai \(1 tổ\)/.test(q.apNhieu[0][3]) && /Điểm Một \(1 tổ\)/.test(q.apNhieu[0][3]), JSON.stringify(q.apNhieu));
   ok('QT-C-11: món trực tiếp gán tạm → danh sách (không có món theo ấp / danh mục)', q.ttTam.length===1 && q.ttTam[0][0]==='M5' && q.ttTam[0][6]==='chưa rõ điểm GD', JSON.stringify(q.ttTam));
   const kq = []; slKTAp(K, function(n, ten, okk, chu, chi, cot, ds, muc){ kq.push({n, ten, okk, chu, n2:(ds||[]).length, muc}); });
   ok('Kiểm tra kỳ: 4 mục nhóm 6 (3.406 + tổ còn dư nợ không chuẩn), có lệch → "canh" (chỉ báo, không làm trượt Đạt)', kq.length===4 && kq.every(x=>x.n===6) && kq.filter(x=>x.muc==='canh').length===3 && /1 món — cần sửa ấp/.test(kq[0].chu) && /cả 1 tổ có dư nợ đều đúng/.test(kq[2].chu), JSON.stringify(kq));
   /* 2. tích hợp: File Tổ trưởng ghi đè ấp của tổ (Mẫu 31 ghi ấp khác) + Kiểm tra kỳ chạy không lỗi */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; let K8 = await toNap('2026-08');
   const ma = Object.keys(K8.to).find(m=>!K8.to[m].trucTiep && K8.to[m].thon && (K8.kh[m]||[]).length);
   const t0 = K8.to[ma], thonCu = String(t0.thon);
   const aoa = [['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'],[''],['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'],
     ['31/08/2026', 'D9', 'Điểm Giả', '99999999', t0.tenXa||'Xã Giả', 'Ấp Giả Mới', '11', 'Hội Giả', ma, '', 'Tổ Trưởng Giả', '', '', '', '', 1, 0, '', '', '', '']];
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const kD = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'to truong nhanh.xlsx')); if(!kD.loi && kD.ky) await slGhi(kD);
   ok('File Tổ trưởng giả nạp vào ô 2026-08', kD.loai==='dsto' && !!SLM.bang['dsto|2026-08'], kD.loi || kD.loai+' '+kD.ky);
   SL_BO = {}; TO_KS = {}; K8 = await toNap('2026-08'); const t1 = K8.to[ma];
   ok('QT-C-10: ấp của tổ lấy theo MADP File Tổ trưởng, ghi lại ấp cũ theo Mẫu 31', t1.thon==='99999999' && t1.thonTT && t1.thonM31===thonCu && t1.tenThon==='Ấp Giả Mới', t1.thon+' · '+t1.thonM31);
   ok('QT-C-10: các món của tổ (ấp theo Mẫu 31) → vào danh sách lệch ấp', K8.qtc && K8.qtc.lechAp.some(r=>r[3]===ma && r[5]==='99999999'), K8.qtc && K8.qtc.lechAp.length);
   await slKiemTra('2026-08', true); await w(300);
   const kt = SLM.kt['2026-08'], m10 = kt && kt.kq.find(x=>/QT-C-10 · Món vay ở ấp khác/.test(x.ten));
   ok('Kiểm tra kỳ có mục QT-C-10 (nhóm 6) với danh sách món lệch', !!m10 && m10.nhom===6 && m10.n>0, m10 && m10.chu);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
