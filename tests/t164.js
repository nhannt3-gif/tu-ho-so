// 3.171 (anh chốt 11/10) — mẫu bám sát PDF anh gửi: kẻ mảnh dưới tiêu ngữ (không gạch chân), logo khai báo 1 lần + tích mẫu, 01/TD theo chương trình (HSSV có xác nhận UBND xã),
//   03/TD số dòng = số người + 2, 04/TD in từng thông báo, 09A/TD, mẫu mới 01/UQ (người thừa kế) + 01/TGTV (12 ô CCCD, chân trang, in hàng loạt chưa có TK 105),
//   BỘ HỒ SƠ VAY lưu tạm (hộ mới / hộ cũ, trạng thái, nhận ra khi đã lên Mẫu 31), 02/BG chia trang như Mẫu 06, Word nhiều khổ. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = h => String(h||'').replace(/<\/(p|td|tr)>|<br>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ');
   const b64 = bl => new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result.split(',')[1]); fr.readAsDataURL(bl); });
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   /* logo giả 2×2 px (không dùng logo thật trong phép thử) */
   const cv = document.createElement('canvas'); cv.width = 20; cv.height = 20; cv.getContext('2d').fillStyle = '#c06'; cv.getContext('2d').fillRect(0, 0, 20, 20);
   hsoKB().logo = cv.toDataURL('image/png'); hsoKB().logoTy = 1; hsoKB().logoMau = null; hsoKB().dtth = 'HSSV: Đối tượng giả HSSV\nNSVSMT: Đối tượng giả NS';
   slDoiTab('hsv'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hsv-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH(); C.xa=''; C.diem=''; C.hoi=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const t = TO_K.to[C.to], tv = hsoTVTo(t);
   /* ---- quốc hiệu: kẻ mảnh riêng, không gạch chân ---- */
   const tat = []; for(const m of HSO_MAU.hst.concat(HSO_MAU.hsv)){ if(m.k==='bo') continue; slDoiTab(HSO_MAU.hst.indexOf(m)>=0 ? 'hst' : 'hsv'); hsoChonMau(m.k); await w(250); tat.push([m.k, HSO.x.trang]); }
   ok('mọi mẫu: tiêu ngữ không gạch chân chữ, có đường kẻ mảnh riêng (≈ 0,5 pt — 3.249: vạch 1 px thu scaleY(.55)) dưới tiêu ngữ', tat.every(x=>!/<u>Độc lập/.test(x[1]) && (!/Độc lập/.test(x[1]) || /Hạnh phúc<\/p><p class="ke"/.test(x[1]) || /class="om-goc"/.test(x[1]))) && /p\.ke\{[^}]*height:1px[^}]*background:#000[^}]*scaleY\(\.55\)/.test(tat[0][1]), tat.filter(x=>/<u>Độc lập/.test(x[1])).map(x=>x[0]).join(','));
   ok('logo mặc định chỉ in ở mẫu gốc có logo (01/TD, 01/TGTV)', tat.filter(x=>/class="hso-logo"/.test(x[1])).map(x=>x[0]).sort().join(',')==='01td,01tgtv', tat.filter(x=>/class="hso-logo"/.test(x[1])).map(x=>x[0]).join(','));
   hsoKB().logoMau = {'09a':true}; slDoiTab('hsv'); hsoChonMau('09a'); await w(300);   /* 3.172: 04/TD dời sang tab Giao dịch xã → thử với 09A */
   ok('tích / bỏ tích mẫu in logo ở khai báo → áp ngay', /class="hso-logo"/.test(HSO.x.trang)); hsoKB().logoMau = null;
   /* ---- hồ sơ vay hộ mới (3.246: Bộ HS cũ đã gỡ → 📒 Sổ hộ vay + 01/TD In kèm) ---- */
   hmMo(); await w(100); hmDat(0, 'ten', 'Nguyễn Văn Giả'); hmDat(0, 'ns', '06/05/1980'); hmDat(0, 'cccd', '072080001234'); hmDat(0, 'ncap', '08/04/2021');
   ok('hộ mới: nơi cấp gợi ý theo ngày cấp (trước 01/07/2024 → Cục CS QLHC)', HM.tv[0].noiCap==='Cục CS QLHC' && HM.tv[0].ns==='1980-05-06', HM.tv[0].noiCap);
   hmDat(0, 'ncap', '02/01/2026'); ok('ngày cấp từ 01/07/2024 → Bộ Công an', HM.tv[0].noiCap==='Bộ Công an'); hmDat(0, 'ncap', '08/04/2021');
   HM.tv.push(hmNguoi()); hmVe(); hmDat(1, 'ten', 'Trần Thị Giả'); hmDat(1, 'qh', 'Vợ'); hmDat(1, 'ns', '01/01/1982'); HM.to = (KHO.to(hsoCH().to) || {}).ma || HM.to; hmLuu(); await w(300); try{ dongHop(); }catch(e){} HM = null;
   const oG = hmDs().find(x=>x.tv[0].ten==='Nguyễn Văn Giả'); hmLamHS(oG.id, '01td'); await w(400); const B = hsoBo();
   ok('hộ mới: giới tính tự lấy từ số CCCD', B.nv.gt==='Nam', B.nv.gt);
   hsoBoDat('soNguoi', '3'); hsoBoDat('ct', 'HSSV'); hsoBoDat('pa.sv', 'Nguyễn Văn Con'); hsoBoDat('pa.soThang', '15'); hsoBoDat('tien', '60000000'); hsoBoDat('tuCo', '20000000'); hsoBoDat('dtth', 'Đối tượng giả HSSV');
   ['uq', 'bb', 'ds', 'tgtv'].forEach(k=>hsoBoDat('kem.'+k, 1)); hsoVe(); await w(500);
   ok('phiếu hồ sơ lưu trong cài đặt (đồng bộ Drive), có trạng thái', D.cauHinh.hsoBo.some(x=>x.id===B.id && !!x.tt));
   ok('hộ mới → In kèm có 01/TGTV (hộ mới)', /01\/TGTV mở TK tổ viên \(hộ mới\)/.test(document.getElementById('hso-tuy').textContent));
   const X = hsoLap(), ds = X.ds.map(u=>u.M.k);
   ok('01/TD + In kèm: 01/UQ · 01/TD · biên bản 10C · 03/TD · 01/TGTV, mỗi mẫu 1 bản riêng khổ (03/TD ngang)', ds.join(',')==='01uq,01td,10c,03td,01tgtv' && /data-tr-ngang="1"[^>]*>[^]*DANH SÁCH TỔ VIÊN/.test(X.trang), ds.join(','));
   const h01 = chu(X.ds[1].h), hUQ = chu(X.ds[0].h), hBB = chu(X.ds[2].h), h03 = chu(X.ds[3].h), hTG = X.ds[4].h;
   ok('01/TD HSSV: đúng PDF — Mẫu số cùng hàng quốc hiệu, CT "Học sinh sinh viên", bằng chữ, 15 tháng, kỳ hạn 12, có khối Xác nhận của UBND xã', /Mẫu số 01\/TD/.test(h01) && /Chương trình cho vay: Học sinh sinh viên/.test(h01) && /Sáu mươi triệu đồng/.test(h01) && /15 tháng/.test(h01) && /Kỳ hạn trả nợ: 12 tháng\/lần/.test(h01) && /Xác nhận của UBND xã/.test(h01) && /Tổng nhu cầu vốn: 80\.000\.000/.test(h01));
   ok('01/TD: ngày hạn trả cuối để trống (anh chốt)', /Hạn trả nợ cuối cùng: Ngày[ .…]+\/[ .…]+\/[ .…]+/.test(h01));
   ok('01/UQ: người vay STT 01 + thành viên hộ (người thừa kế) trong bảng mục I và bảng Bên ủy quyền, 4 chú thích', /II\. Các thành viên/.test(hUQ) && hUQ.indexOf('Trần Thị Giả')>=0 && /Vợ/.test(hUQ) && /gồm 3 người/.test(hUQ) && (X.ds[0].h.match(/<sup[^>]*>\(\d\)<\/sup>/g)||[]).length>=8);
   ok('biên bản họp (10C mới): hộ mới ở mục kết nạp + mục 2 danh sách đề nghị vay', /Tổ viên cho ra khỏi Tổ 1 Nguyễn Văn Giả 1/.test(hBB) && /1 Nguyễn Văn Giả Học sinh sinh viên 60 Chi phí học tập/.test(hBB), hBB.slice(hBB.indexOf('Tổ viên được'), hBB.indexOf('Tổ viên được')+300));
   ok('03/TD: 1 người + 2 dòng trống + dòng Cộng có tổng; kẻ chấm; tiêu đề bảng lặp', /Cộng: 60\.000\.000/.test(h03) && /Đối tượng giả HSSV/.test(h03) && (X.ds[3].h.match(/<tbody>[^]*<\/tbody>/)[0].match(/<tr/g)||[]).length>=4 && /class="luoi cham/.test(X.ds[3].h) && /<thead>/.test(X.ds[3].h));
   ok('01/TGTV: logo + khung "Mẫu 01/TGTV", 12 ô số CCCD, ☒ Nam, ngày hết hạn tự tính mặc định (3.320 anh: 06/05/2040), chân trang ngành', /hso-logo/.test(hTG) && ((hTG.match(/<td class="c"><span class="o-sl">\d<\/span><\/td>/g)||[]).length===12 || (hTG.match(/data-o="cccd"[^>]*>\d<\/span>/g)||[]).length===12) && (/☒Nam/.test(hTG) || /☒<\/span>Nam/.test(hTG)) && /06\/05\/2040/.test(hTG) && X.ds[4].M.chan.indexOf('vbsp.org.vn')>0);
   /* hộ cũ (mã KH) — từ Mẫu 31 */
   const o2 = hmTuM31(tv[0].kh); hmLamHS(o2.id, '01td'); await w(400); const B2 = hsoBo();
   ok('hộ cũ: lấy từ Mẫu 31 → nhân thân từ số liệu, tổ trưởng, Hội; không tích 01/TGTV', B2.nv.ten===tv[0].ten && !!hsoBoT(B2).tt && !(B2.kem||{}).tgtv);
   /* NSVSMT */
   B2.ct = 'NSVSMT'; B2.pa = {loai:'moi', nuoc:true, vs:true, tienN:'25000000', tienV:'26000000'}; hsoChonMau('01td'); await w(300);
   const hN = chu(HSO.x.h);
   ok('01/TD NSVSMT: không khối xác nhận, 2 công trình (01 công trình), xây mới, thời hạn 60 tháng', !/Xác nhận của UBND xã/.test(hN) && /Công trình cấp nước 01 công trình 25\.000\.000 đồng/.test(hN) && /Xây mới công trình cấp nước, công trình vệ sinh/.test(hN) && /Thời hạn xin vay: 60 tháng/.test(hN) && /Cấp nước sạch và vệ sinh môi trường nông thôn/.test(hN));
   ok('NSVSMT vượt 25 triệu / công trình → cảnh báo', hsoPA(B2).canh.length===1);
   /* 04/TD: 3.172 dời sang tab 🏢 Giao dịch xã (mẫu chép nguyên file anh đã in thử — xem t165) */
   ok('04/TD dời sang tab Giao dịch xã', !HSO_MAU.hsv.some(m=>m.k==='04td') && /Mẫu số 04\/TD/.test(gdxHTML04({soNguoi:1, soTien:'80000000'}, gdxC())));
   /* 01/TGTV hàng loạt */
   HSO.vay.tgNguon = 'to'; hsoChonMau('01tgtv'); await w(300); HSO.vay.tgNguon = 'to'; hsoXem(); await w(200);
   const ctk = tv.filter(k=>!k.stk.length && !k.coTK).length;
   ok('01/TGTV in hàng loạt tổ viên chưa có TK 105 (mỗi người 1 bản)', HSO.x.ds.length===Math.max(1, ctk), HSO.x.ds.length+' / '+ctk);
   /* 02/BG như Mẫu 06 */
   slDoiTab('hst'); hsoChonMau('02bg'); await w(400);
   ok('02/BG: tiêu đề bảng lặp (thead), mỗi khách 1 nhóm không tách trang, Trang x/y', /<thead>/.test(HSO.x.h) && /<tbody class="kt-ho">/.test(HSO.x.h) && /data-tr-so="xy"/.test(HSO.x.trang));
   const w02 = await b64(await hsoDocx(HSO.x));
   hsoChonMau('10c'); await w(300); ok('10C: dòng tiêu đề bảng lặp khi dài (thead) — 3.223: mẫu dựng theo gốc thì bảng như gốc', /<thead>/.test(HSO.x.h) || /class="om-goc"/.test(HSO.x.h));
   /* Word cả bộ */
   slDoiTab('hsv'); hsoCH().boId = B.id; hsoChonMau('01td'); await w(400); const wBo = await b64(await hsoDocx(hsoLap()));
   hsoKBHop(); await w(200); ok('⚙ Khai báo: mục Logo (chọn ảnh, tích mẫu) + Đối tượng thụ hưởng theo CT (3.172: giờ phát tiền chuyển sang tab Giao dịch xã)', /Logo/.test(document.getElementById('hop-in').textContent) && /Đối tượng thụ hưởng/.test(document.getElementById('hop-in').textContent) && !/Giờ phát tiền/.test(document.getElementById('hop-in').textContent)); dongHop();
   return {o, w02, wBo};
 }, files);
 const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't164-')), doc = (b64, ten, phan) => { const f = path.join(tmp, ten); fs.writeFileSync(f, Buffer.from(b64, 'base64')); return cp.execSync('unzip -p '+f+' '+(phan||'word/document.xml')).toString(); };
 const xBo = doc(R.wBo, 'bo.docx'), x02 = doc(R.w02, 'b.docx'), ls = cp.execSync('unzip -l '+path.join(tmp, 'bo.docx')).toString();
 R.o.push(((xBo.match(/<w:sectPr>/g)||[]).length===5 && /w:orient="landscape"/.test(xBo) && /<w:drawing>/.test(xBo) && /word\/media\/anh1\.png/.test(ls) && /footer4\.xml/.test(ls) && /<w:tblHeader\/>/.test(xBo) ? '✓ ' : '✗ ')+'Word cả bộ: 5 phần (khổ riêng, 03/TD ngang), logo, chân trang 01/TGTV, tiêu đề bảng lặp');
 R.o.push((!/<w:u [^>]*\/><\/w:rPr><w:t[^>]*>Độc lập/.test(xBo) && /<w:pBdr><w:top w:val="single" w:sz="4"/.test(xBo) ? '✓ ' : '✗ ')+'Word: tiêu ngữ không gạch chân, kẻ mảnh bằng viền đoạn 0,5 pt');
 R.o.push((/<w:tblHeader\/>/.test(x02) && /w:orient="landscape"/.test(x02) ? '✓ ' : '✗ ')+'Word 02/BG: khổ ngang, lặp tiêu đề bảng');
 R.o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.o.filter(x=>x[0]==='✗').length; console.log((R.o.length-sai)+'/'+R.o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
