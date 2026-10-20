// 3.268 — 🔎 Rà CCCD đã lưu: đúng khách (QR giả), sai khách → đổi + ảnh khách đi theo, CMND cũ, lệch số, không phải chủ hộ,
// mã KH ngoài Mẫu 31, 1 số 2 mã KH, hết hạn, không đọc được; bản trùng (giống hệt / mặt trước + sau); thư mục CCCD trên Drive (giả lập).
// Dữ liệu GIẢ: bộ tests/gianho31 + khách / số CCCD tự đặt — không ảnh CCCD thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const qrLib = fs.readFileSync(path.join(__dirname,'lib','qrcode-generator-1.4.4','package','qrcode.js'),'utf8');
 const R = await p.evaluate(async([files, qrLib])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), mas = Object.keys(DB).filter(m=>DB[m].ten), coSo = mas.filter(m=>/^\d{12}$/.test(String(DB[m].cccd||'')));
   const kA = coSo[0], kHan = coSo[1], kTr = coSo[2], kTS = coSo[3], khac = mas.filter(m=>coSo.slice(0, 4).indexOf(m)<0), kSai = khac[0], kLech = khac[1], kChu = khac[2], kKhong = khac[3], kHai = khac[4];
   /* số hạn theo tuổi + hạn trong mã máy đọc */
   ok('hạn CCCD theo tuổi: cấp lúc 20 tuổi → hạn 25 tuổi; cấp lúc 30 → 40; cấp lúc 60 → không hạn', sxHanCCCD('1990-05-10', '2010-01-01')==='2015-05-10' && sxHanCCCD('1980-05-10', '2010-06-01')==='2020-05-10' && sxHanCCCD('1950-01-01', '2015-01-01')==='', [sxHanCCCD('1990-05-10', '2010-01-01'), sxHanCCCD('1980-05-10', '2010-06-01')].join(' · '));
   const sd = '000000123', mrz = 'IDVNM'+sd+icaoSo(sd)+'079000000123<<9\n800101'+icaoSo('800101')+'M360101'+icaoSo('360101')+'VNM<<<<<<<<<<<4\nNGUYEN<<VAN<GIA<<<<<<<<<<<<<<<<<';
   ok('mã máy đọc: đọc thêm ngày hết hạn thẻ', (cccdMRZ(mrz)||{}).han==='2036-01-01', JSON.stringify(cccdMRZ(mrz)));
   /* khách giả thêm vào danh bạ */
   DB['9990000081'] = {ten:'Khách Cmnd Giả', cccd:'123456789', tenXa:'Xã A'};
   DB['9990000082'] = {ten:'Hai Mã Một', cccd:'079099999999', tenXa:'Xã A'}; DB['9990000083'] = {ten:'Hai Mã Hai', cccd:'079099999999', tenXa:'Xã B'}; SX_CHI = null;
   /* ảnh thẻ giả có QR */
   eval(qrLib); qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
   const theQR = async (txt, nen) => { const qr = qrcode(0, 'M'); qr.addData(txt); qr.make(); const c = document.createElement('canvas'); c.width = 856; c.height = 540; const g = c.getContext('2d'); g.fillStyle = nen||'#eee'; g.fillRect(0, 0, 856, 540);
     const n = qr.getModuleCount(), z = 4; g.fillStyle = '#fff'; g.fillRect(856-(n+8)*z-20, 20, (n+8)*z, (n+8)*z); g.fillStyle = '#000';
     for(let r=0;r<n;r++) for(let q=0;q<n;q++) if(qr.isDark(r, q)) g.fillRect(856-(n+8)*z-20+(q+4)*z, 20+(r+4)*z, z, z);
     return new Promise(r=>c.toBlob(r, 'image/jpeg', 0.92)); };
   const cA = DB[kA], bay = new Date().toISOString(), the = (id, ma, them) => Object.assign({id, che:'the', ten:(DB[ma]||{}).ten||'Khach', maKH:ma, tag:['CCCD'], matTruoc:true, ngay:bay.slice(0,10), suaLuc:bay, taoLuc:bay}, them||{});
   const blA = await theQR(cA.cccd+'|111222333|'+cA.ten.toUpperCase()+'|01011980|Nam|Ấp Giả|01012021');
   await luuAnhHS('t208a_matTruoc', blA);
   const sA = the('t208a', kA), sSai = the('t208b', kSai, {raDoc:{cccd:cA.cccd, ten:cA.ten, nguon:'QR'}}), sCm = the('t208c', '9990000081', {raDoc:{cccd:'079000000555', cmnd:'123456789', ten:'Khách Cmnd Giả', nguon:'QR'}});
   const sLech = the('t208d', kLech, {raDoc:{cccd:'079000000777', ten:DB[kLech].ten, nguon:'QR'}}), sChu = the('t208e', kChu, {raDoc:{cccd:'079000000888', ten:'Người Khác Hẳn Xyz', nguon:'QR'}});
   const sNgoai = the('t208f', '9990000099', {ten:'Khách Ngoài', raDoc:{cccd:'079000000999', nguon:'mã máy đọc'}}), sKhong = the('t208g', kKhong), sHai = the('t208h', kHai, {raDoc:{cccd:'079099999999', nguon:'QR'}});
   const sHan = the('t208i', kHan, {raDoc:{cccd:DB[kHan].cccd, ns:'1990-01-01', ncap:'2010-01-01', nguon:'QR'}});
   /* bản trùng: 2 bản giống hệt từng byte · mặt trước / mặt sau tách 2 bản */
   const blTr = await theQR(DB[kTr].cccd+'||X|01011980|Nam|A|01012021', '#ddd');
   for(const id of ['t208j', 't208k']) await luuAnhHS(id+'_matTruoc', blTr);
   const sTr1 = the('t208j', kTr, {driveId:'drJ', raDoc:{cccd:DB[kTr].cccd, nguon:'QR', mot:true}}), sTr2 = the('t208k', kTr, {raDoc:{cccd:DB[kTr].cccd, nguon:'QR', mot:true}});
   await luuAnhHS('t208l_matTruoc', await theQR(DB[kTS].cccd+'||Y|01011980|Nam|A|01012021', '#ccc')); await luuAnhHS('t208m_matTruoc', await theQR('khong phai cccd', '#999'));
   const sTS1 = the('t208l', kTS, {raDoc:{cccd:DB[kTS].cccd, nguon:'QR', mot:true}}), sTS2 = the('t208m', kTS, {raDoc:{cccd:DB[kTS].cccd, nguon:'mã máy đọc', mot:true}});
   const anhSai = {id:'kat208', loai:'anh', khach:DB[kSai].ten, maKH:kSai, tuCCCD:'t208b', ten:'x.jpg', suaLuc:bay};
   D.scan = D.scan || []; D.kyAnh = D.kyAnh || []; D.scan.push(sA, sSai, sCm, sLech, sChu, sNgoai, sKhong, sHai, sHan, sTr1, sTr2, sTS1, sTS2); D.kyAnh.push(anhSai);
   /* mở từ tab Scan */
   doiNgan(4); await w(400);
   document.querySelector('#tr4 [data-lenh="ql.mo"]').click(); await w(400);   /* 3.278: 🗂 Quản lý hồ sơ scan → thẻ 🔎 Rà */
   const nut = document.querySelector('#hop-in .ql-the [data-lenh="rs.mo"]');
   ok('🗂 Quản lý hồ sơ scan có thẻ "🔎 Rà CCCD đã lưu"', !!nut && /Rà CCCD đã lưu/.test(nut.textContent));
   nut.click(); for(let i=0;i<60 && !RS;i++) await w(200); await w(300);
   const N = RS ? RS.nhom : {}, co = (n, k) => (N[n]||[]).some(x=>x.k===k), ht = (document.getElementById('hop-in')||{}).textContent||'';
   ok('đọc lại ảnh (QR giả) → số khớp Mẫu 31 → ✓ Đúng, ghi kết quả vào bản lưu (lần sau không đọc lại)', co('dung', sA) && sA.raDoc && sA.raDoc.cccd===cA.cccd, JSON.stringify(sA.raDoc));
   ok('số trên thẻ của khách khác → ✗ Sai khách, đề xuất khách đúng', co('sai', sSai) && N.sai.find(x=>x.k===sSai).ma===kA);
   ok('Mẫu 31 còn số CMND cũ (QR có CMND) → ⚠ đúng khách, cần cập nhật', co('cmnd', sCm));
   ok('tên khớp, số khác Mẫu 31 → ⚠ Lệch số (không coi file sai)', co('lech', sLech) && /khách đổi thẻ hoặc Mẫu 31 nhập sai số/.test(N.lech.find(x=>x.k===sLech).ly));
   ok('tên trên thẻ khác chủ hộ → ⚠ Không phải chủ hộ, chỉ báo', co('khongChu', sChu));
   ok('mã KH không có trên Mẫu 31 → ⏳ chỉ báo', co('ngoai', sNgoai));
   ok('không có ảnh trong máy → ? Không đọc được', co('khong', sKhong) && !sKhong.raDoc);
   ok('1 số CCCD có ở 2 mã KH → 🔀 anh chọn', co('hai', sHai) && N.hai.find(x=>x.k===sHai).ds.length===2);
   ok('thẻ quá hạn theo tuổi → ⏰ Hết hạn (vẫn ✓ đúng khách)', co('han', sHan) && co('dung', sHan));
   const gTr = RS.trung.find(g=>g.ma===kTr), gTS = RS.trung.find(g=>g.ma===kTS);
   ok('bản trùng giống hệt từng byte → giữ 1, bản kia tích sẵn Xóa', gTr && gTr.bo.length===1 && gTr.bo[0].muc==='giong' && gTr.giu.k===sTr1 && RS.xoa[RS.trung.indexOf(gTr)+':0']===true, gTr ? gTr.bo.map(x=>x.muc).join(',') : 'không thấy nhóm');
   ok('mặt trước (QR) + mặt sau (mã máy đọc) tách 2 bản → không tính trùng, không tích xóa', gTS && gTS.bo[0].muc==='truocSau' && !RS.xoa[RS.trung.indexOf(gTS)+':0'], gTS ? gTS.bo[0].muc : 'không thấy nhóm');
   ok('hộp rộng; có ảnh nhỏ cạnh nhau; nút đáy đếm việc', document.getElementById('hop-in').classList.contains('xem-rong') && document.querySelectorAll('#hop-in .rs-ban img').length>=4 && /Làm 1 việc/.test(document.querySelector('#hop-in [data-lenh="rs.apDung"]').textContent), document.querySelector('#hop-in [data-lenh="rs.apDung"]').textContent);
   ok('nhóm ghi rõ: chỉ báo / anh chọn', /Sai khách/.test(ht) && /Không phải chủ hộ — chỉ báo/.test(ht) && /Bản trùng/.test(ht));
   /* chọn: sai khách → đổi sang khách đúng; 🔀 → chọn mã thứ 2 */
   document.querySelector('#hop-in [data-lenh="rs.chon"][data-k="t208b"][data-v="ma:'+kA+'"]').click(); await w(100);
   document.querySelector('#hop-in [data-lenh="rs.chon"][data-k="t208h"][data-v="ma:9990000083"]').click(); await w(100);
   ok('chọn → nút đáy đếm 3 việc, không vẽ lại', /Làm 3 việc/.test(document.querySelector('#hop-in [data-lenh="rs.apDung"]').textContent));
   document.querySelector('#hop-in [data-lenh="rs.apDung"]').click(); await w(400);
   ok('sai khách → bản lưu gắn khách đúng, tên file chuẩn theo khách mới (3.277: khách đã có 1 bản CCCD → bản này " (2)")', sSai.maKH===kA && tenScanDrive(sSai)===kA+' - '+cA.ten+' - CCCD (2).pdf', tenScanDrive(sSai));
   ok('ảnh khách tạo từ thẻ đó đi theo khách mới', anhSai.maKH===kA && anhSai.ten===kA+' - '+cA.ten+' - Ảnh.jpg', anhSai.ten);
   ok('🔀 chọn mã → gắn mã đó', sHai.maKH==='9990000083');
   ok('bản trùng tích Xóa → vào 🗑 Thùng rác (lấy lại được), bản giữ còn nguyên', !D.scan.includes(sTr2) && (D.rac||[]).some(m=>m.id==='t208k' && m.khoCu==='scan') && D.scan.includes(sTr1));
   ok('bản chỉ báo không bị đổi (lệch số, không phải chủ hộ, ngoài Mẫu 31)', sLech.maKH===kLech && sChu.maKH===kChu && sNgoai.maKH==='9990000099');
   /* lần 2: đã rà → không đọc lại; trả về thư mục chờ */
   sA.raDoc.dau = 1; moRaSoat(false); for(let i=0;i<60 && !(RS && RS.nhom);i++) await w(200); await w(300);
   ok('lần sau không đọc lại bản đã rà', sA.raDoc && sA.raDoc.dau===1);
   ok('sau khi đổi: bản sai khách giờ ✓ Đúng', RS.nhom.dung.some(x=>x.k===sSai));
   RS.chon['t208e'] = 'cho'; rsApDung(); await w(300);
   ok('trả về thư mục chờ: bỏ mã KH, tên giữ tên + số đọc được để Sắp xếp đối chiếu', !sChu.maKH && sChu.ten==='cccd-Người Khác Hẳn Xyz - 079000000888' && duongScan(sChu)===D.cauHinh.thumuc+' / Scan chờ sắp xếp', sChu.ten);
   /* Drive (giả lập): tên sửa tay · file ngoài app · file giống hệt */
   const cu = {n:coTheNoiDrive, d:baoDamDuong, g:goiDrive};
   coTheNoiDrive = () => true; baoDamDuong = () => Promise.resolve('TM');
   goiDrive = () => Promise.resolve({files:[{id:'drJ', name:'sua tay.pdf', md5Checksum:'m1'}, {id:'drX', name:'cccd-'+cA.ten+' - '+cA.cccd+'.pdf', md5Checksum:'m1'}, {id:'drY', name:'gi do.pdf', md5Checksum:'m2'}]});
   const dr = await rsDrive(); coTheNoiDrive = cu.n; baoDamDuong = cu.d; goiDrive = cu.g;
   ok('Drive: file app biết mà tên bị sửa tay → đề xuất đặt lại tên chuẩn', dr.ten && dr.ten.length===1 && dr.ten[0].dung===tenScanDrive(sTr1), JSON.stringify(dr.ten && dr.ten.map(x=>x.dung)));
   ok('Drive: file không qua app → chỉ báo, nhận ra khách từ tên', dr.ngoai.length===2 && dr.ngoai.some(x=>x.f.id==='drX' && /khớp/.test(x.ly)));
   ok('Drive: 2 file giống hệt (md5) → giữ bản app biết, bản kia đề nghị xóa', dr.giong.length===1 && dr.giong[0].giu.id==='drJ' && dr.giong[0].bo[0].f.id==='drX' && !dr.giong[0].bo[0].app);
   dongHop();
   /* dọn */
   D.scan = D.scan.filter(k=>!/^t208/.test(k.id)); D.kyAnh = D.kyAnh.filter(k=>k.id!=='kat208'); D.rac = (D.rac||[]).filter(m=>!/^t208/.test(m.id||''));
   ['9990000081', '9990000082', '9990000083'].forEach(m=>delete DB[m]); SX_CHI = null; luu();
   return o;
 }, [files, qrLib]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
