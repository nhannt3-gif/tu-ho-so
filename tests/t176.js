// 3.215 (anh 15/10) — KHAI BÁO RIÊNG từng mẫu Hồ sơ vay (đợt 1: 01/TD · 03/TD · 01/UQ): ô tùy biến liệt kê từ trên xuống, công tắc ✍ chấm / 🖨 in sẵn,
//   loại khai 1 lần (nhớ, lãi suất theo chương trình) · tự lấy · ngày (trống = hôm nay). Mặc định = bản in cũ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete (D.cauHinh.hsoO||{}).cham; delete (D.cauHinh.hsoO||{}).chamGT;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); C.xa=''; C.diem=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const ho = hmTuM31(hsoTVTo(TO_K.to[C.to])[0].kh); ho.tv.push({ten:'Con Giả', ns:'2000-01-01', cccd:'072200000001', qh:'Con'});
   const hom = ngayISO(nay()).split('-'), ngayHom = 'Ngày '+hom[2]+' tháng '+hom[1]+' năm '+hom[0], chu = h=>String(h).replace(/<[^>]+>/g, '');
   /* 01/TD */
   hmLamHS(ho.id, '01td'); await w(300); const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Con Giả', soThang:'12'}); B.tien = '40000000'; B.th = '60'; hsoBoLuu(); hsoVe(); await w(300);
   const tuy = document.getElementById('hso-tuy').textContent;
   ok('01/TD: khối "Ô tùy biến — Mẫu 01/TD (từ trên xuống)": Người vay → Xác nhận UBND → Phê duyệt NH (đủ 9 ô)', /Ô tùy biến — Mẫu 01\/TD/.test(tuy) && tuy.indexOf('Người vay')<tuy.indexOf('Xác nhận của UBND xã') && tuy.indexOf('Xác nhận của UBND xã')<tuy.indexOf('Phê duyệt của Ngân hàng') && HSO_CHAM['01td'].filter(x=>x[2]!=='nhom').length===9 && document.querySelectorAll('#hso-tuy .hso-cham-o').length>=9);
   let h = chu(hsoLap().h);
   ok('mặc định ✍: ngày ký, Ông/bà, phê duyệt NH đều chấm như bản cũ', /Ngày\.+ tháng \.+ năm \.+/.test(h) && /Ông\/bà \.{20,}/.test(h) && /Lãi suất: \.+%\/năm/.test(h) && /vào ngày \.{20,}/.test(h));
   ['ngayKy','ubOng','nhTien','nhLai','nhQH','nhTH','nhNgayLai','nhNgay'].forEach(k=>hsoChamDat('01td', k, 'in'));
   hsoChamKBDat('01td', 'nhLai', '6,6'); hsoChamKBDat('01td', 'nhQH', '130'); hsoChamKBDat('01td', 'nhNgayLai', '20'); await w(300);
   h = chu(hsoLap().h); const A = hsoPA(B);
   ok('🖨 ngày chưa gõ → vẫn chấm (không tự lấy hôm nay); Ông/bà = tên người vay; NH: số tiền + bằng chữ, lãi 6,6, quá hạn 130, thời hạn, ngày trả lãi 20, ngày GĐ ký', h.split(ngayHom).length===1 && /Ngày\.+ tháng \.+ năm \.+/.test(h) && h.indexOf('Ông/bà '+B.nv.ten)>=0 && A.tien===40000000 && h.indexOf('Số tiền cho vay: '+tdnTien(A.tien))>=0 && h.indexOf(hsoChuSo(A.tien))>=0 && /Lãi suất: 6,6%\/năm/.test(h) && /quá hạn: 130%/.test(h) && /vào ngày 20/.test(h) && h.indexOf('Thời hạn cho vay: 60 tháng')>=0, (h.match(/PHÊ DUYỆT[\s\S]{0,260}/)||[''])[0]);
   ok('lãi suất nhớ THEO CHƯƠNG TRÌNH (HSSV), khai báo lưu vào cài đặt (đồng bộ Drive)', hsoLuu().chamGT['01td']['nhLai|HSSV']==='6,6' && hsoLuu().chamGT['01td'].nhQH==='130' && hsoLuu().cham['01td'].nhLai==='in');
   B.ct = 'NSVSMT'; hsoBoLuu(); await w(100); h = chu(hsoLap().h);
   ok('đổi sang NSVSMT chưa khai lãi → lãi chấm (không lấy nhầm lãi HSSV); quá hạn vẫn 130', /Lãi suất: \.+%\/năm/.test(h) && /quá hạn: 130%/.test(h));
   B.ct = 'HSSV'; hsoBoLuu(); HSO.vay.ngayKy = '2026-11-02'; h = chu(hsoLap().h);
   ok('gõ ngày cụ thể → in đúng ngày đó', /Ngày 02 tháng 11 năm 2026/.test(h));
   delete HSO.vay.ngayKy;
   /* 03/TD */
   hsoChonMau('03td'); await w(300);
   ok('03/TD: khối ô tùy biến (Tổ trưởng · UBND → Phê duyệt NH)', /Ô tùy biến — Mẫu 03\/TD/.test(document.getElementById('hso-tuy').textContent));
   let h3 = hsoLap().h; const vienCham = chu(h3);
   ok('03/TD mặc định: cột 7–8 trống, số người / tổng tiền chấm', /Số người được vay vốn đợt này: \.+ người/.test(vienCham) && /Tổng số tiền cho vay: \.+ đồng/.test(vienCham));
   ['ngayKy','nhCot','nhNgay','nhSo'].forEach(k=>hsoChamDat('03td', k, 'in')); await w(200); h3 = hsoLap().h; const t3 = chu(h3), D3 = hsoD03(), n3 = D3.ds.length || 1;
   const tong = (D3.ds.length ? D3.ds : [{tien:hsoPA(hsoBo()).tien}]).reduce((a, r)=>a+(hsoSo(r.tien)||0), 0);
   ok('03/TD 🖨: số người = số dòng, tổng tiền tự tính; ngày chưa gõ vẫn chấm; cột 7 = số tiền đề nghị', new RegExp('Số người được vay vốn đợt này: '+n3+' người').test(t3) && (tong>0 && t3.indexOf('Tổng số tiền cho vay: '+tdnTien(tong)+' đồng')>=0) && t3.split(ngayHom).length===1 && (tong>0 && (h3.match(new RegExp(tdnTien(tong).replace(/\./g, '\\.'), 'g'))||[]).length>=3), n3+' người · '+tong);
   /* 01/UQ */
   hsoChonMau('01uq'); await w(300); let hu = chu(hsoLap().h);
   ok('01/UQ mặc định: "Ngày … tháng … năm ……." như cũ, không in tên trưởng thôn', /I\. Ngày … tháng … năm ……\., hộ gia đình/.test(hu));
   const kbc = hsoKB(); kbc.ap = kbc.ap || {}; kbc.ap[hsoApKhoa(TO_K.to[C.to])] = 'Trưởng Ấp Giả'; const T = hsoBoT(hsoBo());
   hsoChamDat('01uq', 'ngayLap', 'in'); hsoChamDat('01uq', 'truongThon', 'in'); HSO.vay.ngayLap = '2026-10-20'; await w(200); hu = chu(hsoLap().h);
   ok('01/UQ 🖨: mục I ghi ngày đã gõ; tên trưởng thôn theo ⚙ Khai báo chung in dưới chỗ ký', hu.indexOf('I. Ngày 20 tháng 10 năm 2026, hộ gia đình')>=0 && T.truongAp==='Trưởng Ấp Giả' && /TRƯỞNG THÔN\(Ký, ghi rõ họ tên\)\s*Trưởng Ấp Giả/.test(hu.replace(/&nbsp;/g, ' ')), T.truongAp);
   /* mẫu trắng */
   hsoCH().boId = ''; hsoChonMau('01td'); await w(300); h = chu(hsoLap().h);
   ok('mẫu trắng 01/TD vẫn có khối ô tùy biến; lãi suất khai báo vẫn in', /Ô tùy biến — Mẫu 01\/TD/.test(document.getElementById('hso-tuy').textContent) && /PHÊ DUYỆT/.test(h));
   /* tắt lại → về chấm */
   ['ngayKy','ubOng','nhTien','nhLai','nhQH','nhTH','nhNgayLai','nhNgay'].forEach(k=>hsoChamDat('01td', k, 'cham')); h = chu(hsoLap().h);
   ok('bấm ✍ lại → về chấm như cũ (giá trị khai vẫn nhớ)', /Lãi suất: \.+%\/năm/.test(h) && hsoLuu().chamGT['01td']['nhLai|HSSV']==='6,6');
   ok('09A giữ nguyên 7 ô (không đụng)', HSO_CHAM['09a'].length===7);
   /* 3.218: 01/TGTV vừa 3 trang (trước rớt Số CIF + chú thích sang trang 4) */
   hmLamHS(ho.id, '01tgtv'); await w(500); hsoXem(); await w(2500);
   const nTG = (document.getElementById('hso-xem-khung').contentDocument.getElementById('tr-n')||{}).textContent;
   const pg3 = [...document.getElementById('hso-xem-khung').contentDocument.querySelectorAll('div')].filter(x=>/tr-tg\b/.test(x.className)).map(x=>x.innerText.replace(/\s+/g, ' '));
   ok('01/TGTV (có hộ) đúng 3 trang như file Word mẫu: chú thích ¹ ngay sau phần B (trang 2), phần D + Số CIF + Hiệu lực trọn trang 3, chân trang "Trang x / 3"', nTG==='3' && /Trong thời gian NHCSXH/.test(pg3[1]||'') && /D - PHẦN DÀNH CHO NGÂN HÀNG/.test(pg3[2]||'') && /Số CIF/.test(pg3[2]||'') && /Hiệu lực từ ngày/.test(pg3[2]||'') && /Trang 3 \/ 3/.test(pg3[2]||''), nTG);
   hsoCH().boId = ''; hsoVe(); await w(2500); const nTr = (document.getElementById('hso-xem-khung').contentDocument.getElementById('tr-n')||{}).textContent;
   ok('01/TGTV mẫu trắng cũng 3 trang', nTr==='3', nTr);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
