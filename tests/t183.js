// 3.223 M2 (anh chốt 16/10) — SỔ HỘ VAY ĐỦ CỘT: ➕ Thông tin thêm mỗi người (giới tính, dân tộc, nghề nghiệp, thu nhập, địa chỉ, nơi làm việc, hộ KD),
//   lưu vào sổ, sổ cũ đọc được, chép sang phiếu làm hồ sơ (B.nv / B.ho), cột "Cần bổ sung" theo mẫu + lọc "thiếu cho mẫu", bản in không đổi khi chưa khai. Dữ liệu GIẢ.
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
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; D.cauHinh.hsoO = {};
   slDoiTab('hsv'); doiNgan(7); await w(1200);
   /* sổ cũ (chưa có trường mới) đọc được */
   D.cauHinh.hoMoi = [{id:'hmcu1', tao:'2026-10-01', kh:'', to:'', tenXa:'Xã Giả', tenThon:'Ấp Giả', tv:[{ten:'Nguyễn Văn Cũ', ns:'1980-01-02', cccd:'072080000001', ncap:'2021-05-06', sdt:'0900000001'}], dung:0, sv:[]}];
   hsoChonMau('sohv'); await w(300); window.__t = document.getElementById('hso-tuy').textContent.slice(0, 300);
   ok('sổ cũ chưa có trường mới vẫn hiện, không lỗi', /Nguyễn Văn Cũ/.test(document.getElementById('hso-tuy').innerHTML), window.__t);
   const th = hmThieuMau(hmTim('hmcu1'), hmNguoiDung(hmTim('hmcu1')).n);
   ok('thiếu theo mẫu: 01/TGTV cần nghề nghiệp; giới tính suy từ CCCD (không báo thiếu); 01/TD đủ', th['01tgtv'] && th['01tgtv'].join()==='nghề nghiệp' && !th['01td'], JSON.stringify(th));
   ok('01/UQ: chưa có thành viên / thừa kế', th['01uq'] && /chưa có thành viên/.test(th['01uq'][0]));
   ok('cột Cần bổ sung ghi theo mẫu', /01\/TGTV: nghề nghiệp/.test(document.getElementById('hm-so-bang').textContent));
   HM_SO.mau = '01td'; hsoVe(); await w(200); ok('lọc "thiếu cho 01/TD" → không còn hộ (đủ cho 01/TD)', !/Nguyễn Văn Cũ/.test(document.getElementById('hm-so-bang').innerHTML));
   HM_SO.mau = '01tgtv'; hsoVe(); await w(200); ok('lọc "thiếu cho 01/TGTV" → còn hộ', /Nguyễn Văn Cũ/.test(document.getElementById('hm-so-bang').innerHTML)); HM_SO.mau = '';
   /* form: ➕ thông tin thêm */
   hmMo('hmcu1'); await w(200); const hop = document.getElementById('hop-in');
   ok('form hộ: mỗi người có "➕ Thông tin thêm" (thu gọn), đủ nhóm; hộ KD chỉ người đứng tên', hop.querySelectorAll('details.hm-them').length===1 && !hop.querySelector('details.hm-them').open && /Hộ kinh doanh/.test(hop.textContent) && /Nghề nghiệp hiện tại/.test(hop.textContent) && /Nơi làm việc/.test(hop.textContent));
   ok('giới tính trống → gợi ý theo CCCD', /\(CCCD: Nam\)/.test(hop.textContent));
   hmDatThem(0, 'ngheNghiep', 'Nông dân'); hmDatThem(0, 'chucVu', 'Không'); hmDatThem(0, 'thuNhap', 'Dưới 10'); hmDatNhieu(0, 'nguonThu', 'Lợi nhuận sản xuất, kinh doanh', true); hmDatThem(0, 'soNha', '12'); hmDatThem(0, 'dkkdNgay', '05032024');
   hmThemNguoi(); await w(100); hmDat(1, 'ten', 'Trần Thị Thừa'); hmDat(1, 'ns', '03031982'); hmDat(1, 'cccd', '072182000002'); hmDat(1, 'qh', 'Vợ'); hmDatThem(1, 'noiCu', 'Ấp Khác, Xã Giả');
   hmLuu(); await w(200); const ho = hmTim('hmcu1'), n0 = ho.tv[0];
   ok('lưu vào sổ: nghề nghiệp, chức vụ, thu nhập, nguồn thu (nhiều lựa chọn), số nhà, ngày đăng ký KD (ISO)', n0.ngheNghiep==='Nông dân' && n0.chucVu==='Không' && n0.thuNhap==='Dưới 10' && n0.nguonThu.join()==='Lợi nhuận sản xuất, kinh doanh' && n0.soNha==='12' && n0.dkkdNgay==='2024-03-05', JSON.stringify(n0));
   ok('thừa kế lưu nơi cư trú riêng (giấy UQ)', ho.tv[1].noiCu==='Ấp Khác, Xã Giả');
   const th2 = hmThieuMau(ho, hmNguoiDung(ho).n); ok('khai xong → hết thiếu 01/TGTV, 01/UQ', !th2['01tgtv'] && !th2['01uq'], JSON.stringify(th2));
   hmMo('hmcu1'); hmDatThem(0, 'chucVu', ''); hmLuu(); await w(100); ok('xóa trắng 1 trường → bỏ khóa (không lưu chuỗi rỗng)', !('chucVu' in hmTim('hmcu1').tv[0]));
   /* chép sang phiếu làm hồ sơ */
   hmLamHS('hmcu1', '01tgtv'); await w(300); const B = hsoBo();
   ok('phiếu làm hồ sơ: B.nv có nghề nghiệp, thu nhập, số nhà; giới tính / dân tộc vẫn có', B.nv.ngheNghiep==='Nông dân' && B.nv.thuNhap==='Dưới 10' && B.nv.soNha==='12' && B.nv.gt==='Nam' && B.nv.danToc==='Kinh', JSON.stringify(B.nv));
   ok('B.ho: thừa kế có nơi cư trú riêng', B.ho[0] && B.ho[0].noiCu==='Ấp Khác, Xã Giả');
   hmMo('hmcu1'); hmDatThem(0, 'gt', 'Nữ'); hmLuu(); await w(100); hmLamHS('hmcu1', '01tgtv'); await w(200); ok('anh khai giới tính → ưu tiên hơn suy CCCD', hsoBo().nv.gt==='Nữ');
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5)); const dat = R.filter(x=>x[0]==='✓').length;
 console.log(dat+'/'+R.length+' đạt'+(loi.length ? ' · có lỗi trang' : '')); await b.close(); process.exit(dat===R.length && !loi.length ? 0 : 1); })();
