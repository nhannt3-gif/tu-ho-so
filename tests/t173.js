// 3.209 (anh 14/10) — SỔ HỘ VAY: lấy từ Mẫu 31 (mã KH, SĐT, tên vợ/chồng), hộ mới (tổ, nhiều HSSV), trùng CCCD, tự gắn mã KH;
//   in theo hộ: chọn hộ → chương trình → 01/TD (+ in kèm 03/TD, 01/UQ), nhắc thiếu thừa kế; chuyển Bộ HS cũ vào sổ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete D.cauHinh.hoVayChuyen;
   slDoiTab('hsv'); doiNgan(7); await w(1200);
   const C = hsoCH(); C.xa=''; C.diem=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1000);
   const t = TO_K.to[C.to], tv = hsoTVTo(t);
   hsoChonMau('homoi'); await w(300);
   ok('tab "👪 Hộ vay" + nút ＋ Hộ mới, ＋ Lấy từ Mẫu 31; tab Bộ HS ẩn', /Hộ vay/.test(document.querySelector('#hso-tabm').textContent) && /Lấy từ Mẫu 31/.test(document.getElementById('hso-tuy').textContent) && ![...document.querySelectorAll('#hso-tabm .hso-tm')].some(e=>/Bộ HS/.test(e.textContent)));
   /* lấy từ Mẫu 31 */
   const k0 = tv[0].kh, o0 = hmTuM31(k0), c0 = SL_DB.kh[k0];
   ok('lấy từ Mẫu 31: mã KH, tổ, tên; trùng mã KH → không tạo 2 lần', o0.kh===k0 && o0.to===c0.to && o0.tv[0].ten===c0.ten && hmTuM31(k0)===o0 && hmDs().length===1);
   ok('tên vợ/chồng trên Mẫu 31 → thành viên gợi ý thừa kế (nếu có)', !c0.voChong || o0.tv.some(n=>n.ten===c0.voChong && /Vợ/.test(n.qh)));
   hmM31Hop(); await w(150); const tick = [...document.querySelectorAll('#hop-in .hm-m31-tick:not([disabled])')].slice(0, 2); tick.forEach(e=>e.checked=true); hmLayTo(); await w(200);
   ok('tích tổ viên tổ đang chọn → đưa nhiều hộ vào sổ 1 lần', hmDs().length===1+tick.length, hmDs().length);
   /* hộ mới: tổ, nhiều HSSV */
   hmMo(); await w(100);
   ok('hộ mới: gợi ý tổ theo khối lọc', HM.to===C.to);
   hmDat(0, 'ten', 'trần văn giả'); hmDat(0, 'cccd', '072079000999'); hmDat(0, 'ns', '01011979');
   HM.tv.push(hmNguoi()); hmVe(); hmDat(1, 'ten', 'Trần Thị Con Một'); HM.tv.push(hmNguoi()); hmVe(); hmDat(2, 'ten', 'Trần Văn Con Hai'); hmDatSV(1, true); hmDatSV(2, true); hmLuu(); await w(300);
   const oM = hmDs().find(o=>o.tv[0].ten==='Trần Văn Giả');
   ok('1 hộ nhiều HSSV (2 SV), có tổ, chưa mã KH', oM && hmSV(oM).length===2 && oM.to===C.to && !oM.kh);
   hmMo(); hmDat(0, 'ten', 'Người Trùng'); hmDat(0, 'cccd', '072079000999'); const n0 = hmDs().length; hmLuu(); await w(100);
   ok('trùng CCCD → không thêm, mở hộ đã có', hmDs().length===n0 && HM && HM.id===oM.id); dongHop(); HM = null;
   const kc = tv.find(k=>k.cccd && !hmDs().some(o=>o.kh===k.kh)); hmMo(); hmDat(0, 'ten', 'Người Có Mẫu 31'); hmDat(0, 'cccd', kc.cccd); hmLuu(); await w(100);
   ok('hộ mới nhập CCCD đã có trên Mẫu 31 → tự gắn mã KH', hmDs().some(o=>o.kh===kc.kh && o.tv[0].ten==='Người Có Mẫu 31'));
   /* in theo hộ */
   hmLamHS(oM.id); await w(400);
   ok('📄 In hồ sơ → tab 01/TD, cột trái "👪 Hộ vay" đã chọn hộ, chip chương trình, chip 2 SV', hsoMau().k==='01td' && /Hộ vay/.test(document.getElementById('hso-tuy').textContent) && document.querySelectorAll('#hso-tuy .hso-ct').length>=4 && /Trần Văn Giả/.test(HSO.x.trang));
   hsoBoDat('pa.sv', 'Trần Văn Con Hai', 1); hsoBoDat('tien', '40000000'); hsoBoDat('pa.soThang', '10'); await w(400);
   ok('chọn SV thứ 2 → 01/TD ghi đúng SV', /Trần Văn Con Hai/.test(HSO.x.trang) && /Học sinh sinh viên/.test(HSO.x.trang));
   hsoBoDat('kem.ds', 1, 1); hsoBoDat('kem.uq', 1, 1); await w(500);
   ok('in kèm 03/TD + 01/UQ → 1 lần in nhiều mẫu', HSO.x.ds.map(u=>u.M.k).join(',')==='01uq,01td,03td', HSO.x.ds.map(u=>u.M.k).join(','));
   ok('01/UQ thiếu ngày sinh / CCCD thành viên → ⚠ + nút Bổ sung', /01\/UQ thiếu/.test(document.getElementById('hso-tuy').textContent));
   hmLamHS(o0.id); await w(400);
   ok('hộ cũ: 01/TD lấy nhân thân Mẫu 31, đổi hộ không lẫn phương án hộ trước', HSO.x.trang.indexOf(c0.ten)>0 && hsoBo().hoId===o0.id && !/Trần Văn Con Hai/.test(HSO.x.trang));
   /* 03/TD nhiều hộ cùng chương trình */
   hsoChonMau('homoi'); await w(300); HM_CHON = {}; HM_CHON[oM.id] = true; HM_CHON[o0.id] = true; hsoVe(); await w(200);
   ok('tab Hộ vay: tích hộ → nút 📋 Lập 03/TD (2 hộ)', /Lập 03\/TD \(2 hộ\)/.test(document.getElementById('hso-tuy').textContent));
   hsoD03TuChon(); await w(500); let D3 = hsoD03();
   ok('📋 Lập 03/TD → tab 03/TD, 2 dòng, cùng chương trình', hsoMau().k==='03td' && D3.ds.length===2 && HSO.x.trang.indexOf('Trần Văn Giả')>0 && HSO.x.trang.indexOf(c0.ten)>0, D3.ct+' · '+D3.ds.length);
   hsoD03Dat(0, 'tien', '40.000.000'); hsoD03Dat(1, 'tien', '30000000'); await w(400);
   ok('sửa số tiền từng dòng → dòng Cộng tự tính', /70\.000\.000/.test(HSO.x.trang));
   const o3 = hmDs().find(o=>o.id!==oM.id && o.id!==o0.id); hsoD03Them(o3.id); await w(300);
   ok('＋ Thêm hộ vào tờ đang lập', hsoD03().ds.length===3 && HSO.x.trang.indexOf(hmTen(o3))>0);
   hsoD03CT('NSVSMT'); await w(400);
   ok('đổi chương trình → tên CT, thời hạn, ĐTTH theo thẻ cho cả tờ', /Cấp nước sạch và vệ sinh môi trường nông thôn/.test(HSO.x.trang) && hsoD03().ds.every(r=>r.th==='60'));
   /* chuyển Bộ HS cũ */
   const Bc = hsoBoMoi(); Bc.nv = {ten:'Lê Văn Bộ Cũ', cccd:'072070000777', ns:'1970-01-01'}; Bc.ho = [{ten:'Lê Thị Vợ Cũ', qh:'Vợ'}]; Bc.pa = {sv:'Lê Văn SV Cũ'};
   delete D.cauHinh.hoVayChuyen; hmChuyenCu(); const oc = hmDs().find(o=>o.tv[0].ten==='Lê Văn Bộ Cũ');
   ok('Bộ HS cũ → sổ hộ vay (người vay, thành viên, HSSV); bộ gốc giữ, gắn hoId', oc && oc.tv.length===3 && hmSV(oc).length===1 && Bc.hoId===oc.id && hsoBoDs().indexOf(Bc)>=0);
   return o;
 }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
