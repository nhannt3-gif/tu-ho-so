// 3.208 (anh chốt 14/10) — KHAI BÁO CHUNG (tab con PGD · Trưởng ấp · Tổ phó · Chương trình vay) + THẺ CHƯƠNG TRÌNH VAY → 01/TD, 03/TD tự điền;
//   HSSV số tháng / số tiền gõ tay; thời hạn + hạn trả cuối: gõ thì in, trống thì chấm; thời hạn 01/TD → 03/TD; NSVSMT ghi sẵn; bố cục như GDX. Dữ liệu GIẢ.
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
   kyChungDoi('2026-08'); const kb = hsoKB(); delete kb.ctv; kb.dtth = 'HSSV: Hộ gia đình giả khó khăn\nNSVSMT: Hộ giả nông thôn'; kb.md = '';
   slDoiTab('hsv'); doiNgan(7); await w(1200);
   /* 1. khai báo chung — cửa sổ có tab con */
   hsoChonMau('01td'); await w(300);
   ok('nút "⚙ Khai báo chung" + cột trái ghi "⚙ Khai báo riêng — Mẫu 01/TD"', /⚙ Khai báo chung/.test(document.getElementById('hso-tabm').textContent) && /Khai báo riêng — Mẫu 01\/TD/.test(document.getElementById('hso-tuy').textContent));
   hsoKBHop('ct'); await w(200);
   const hop = document.getElementById('hop-in');
   ok('cửa sổ có 4 tab con: PGD · Trưởng ấp · Tổ phó · Chương trình vay; mở tab Chương trình vay', [...hop.querySelectorAll('.hso-kbt')].map(e=>e.getAttribute('data-kb')).join(',')==='pgd,ap,pho,ct' && hop.querySelector('.hso-kbp[data-kb="ct"]').style.display==='' && hop.querySelector('.hso-kbp[data-kb="pgd"]').style.display==='none');
   ok('3 thẻ mặc định HSSV · NSVSMT · GQVL', hsoCTVDs().map(c=>c.ma).join(',')==='HSSV,NSVSMT,GQVL' && hop.querySelectorAll('.hso-ctv').length===3);
   ok('khai báo cũ "MÃ: …" (đối tượng thụ hưởng) chuyển vào thẻ', hsoCTV('HSSV').dtth.indexOf('Hộ gia đình giả khó khăn')>=0 && hsoCTV('NSVSMT').dtth.indexOf('Hộ giả nông thôn')>=0 && hsoCTV('GQVL').dtth.join()==='Người lao động');
   hsoKBTab('ap'); ok('bấm tab Trưởng ấp → hiện, có chọn xã', hop.querySelector('.hso-kbp[data-kb="ap"]').style.display==='' && !!hop.querySelector('.hso-kbp[data-kb="ap"] .hso-kb-loc select'));
   const xa = Object.keys(hmDiaBan())[0]; HSO_KBT.xa = xa; hsoKBHop(); await w(100);
   ok('chọn xã trong cửa sổ → chỉ ấp xã đó', [...document.querySelectorAll('#hop-in .hso-kbp[data-kb="ap"] .kt-kb')].length>0 && HSO_KBT.tab==='ap');
   dongHop(); HSO_KBT.xa = null;
   /* 2. HSSV: số tháng, số tiền gõ tay; thời hạn chấm (thẻ), gõ thì in + sang 03/TD */
   hsoChonMau('bo'); await w(300); const B = hsoBoMoi(); hsoBoDat('moi', true); hsoBoDat('nv.ten', 'Nguyễn Văn Giả'); hsoBoDat('pa.sv', 'Nguyễn Văn Con'); hsoBoDat('tien', '60000000'); await w(300);
   hsoChonMau('01td'); await w(300); let h = chu(HSO.x.h);
   ok('HSSV chưa gõ số tháng → ô số lượng chấm (không tự chia 4 triệu)', !/15 tháng/.test(h) && /Chi phí học tập, sinh hoạt cho sinh viên: Nguyễn Văn Con \.+ 60\.000\.000 đồng/.test(h), (h.match(/sinh viên: [^]{0,60}/)||[''])[0]);
   ok('HSSV thời hạn xin vay để chấm (thẻ ✍), kỳ hạn 12 ghi sẵn, hạn cuối chấm', /Thời hạn xin vay: \.+ tháng; Kỳ hạn trả nợ: 12 tháng\/lần/.test(h) && /Hạn trả nợ cuối cùng: Ngày\.+\/\.+\/\.+/.test(h));
   hsoBoDat('pa.soThang', '15'); hsoBoDat('th', '48'); hsoBoDat('hanCuoi', '15102030'); await w(400); h = chu(HSO.x.h);
   ok('gõ số tháng 15, thời hạn 48, hạn cuối 15102030 → in đúng', /15 tháng 60\.000\.000/.test(h) && /Thời hạn xin vay: 48 tháng/.test(h) && /Hạn trả nợ cuối cùng: Ngày 15\/10\/2030/.test(h) && B.hanCuoi==='2030-10-15');
   ok('tab 01/TD có ô Thời hạn + Hạn trả nợ cuối (sửa thẳng vào bộ)', /Thời hạn xin vay \(tháng\)/.test(document.getElementById('hso-tuy').textContent) && /Hạn trả nợ cuối cùng/.test(document.getElementById('hso-tuy').textContent));
   hsoChonMau('03td'); await w(300); h = chu(HSO.x.h);
   ok('03/TD: thời hạn 48 tháng đồng bộ từ 01/TD, CT "Học sinh sinh viên"', /60\.000\.000 Chi phí học tập, sinh hoạt cho sinh viên Nguyễn Văn Con 48 tháng/.test(h) && /Chương trình cho vay: Học sinh sinh viên/.test(h), (h.match(/60\.000\.000 Chi[^]{0,80}/)||[''])[0]);
   /* 3. NSVSMT: ghi sẵn hết theo thẻ; ĐTTH mặc định theo xã / phường */
   B.ct = 'NSVSMT'; B.th = ''; B.pa = {loai:'sua', nuoc:true, tienN:'25000000'}; B.nv.tenXa = 'Xã Giả'; hsoChonMau('01td'); await w(300); h = chu(HSO.x.h);
   ok('NSVSMT sửa chữa 1 công trình: mục đích, 01 công trình, thời hạn 60, kỳ hạn 12 ghi sẵn, không khối UBND', /Sửa chữa công trình cấp nước/.test(h) && /Công trình cấp nước 01 công trình 25\.000\.000 đồng/.test(h) && /Thời hạn xin vay: 60 tháng; Kỳ hạn trả nợ: 12 tháng\/lần/.test(h) && !/Xác nhận của UBND xã/.test(h) && /Đề nghị cho vay số tiền/.test(h));
   hsoChonMau('03td'); await w(300); h = chu(HSO.x.h);
   ok('03/TD NSVSMT xã: ĐTTH mặc định "cư trú tại vùng nông thôn", 60 tháng', /Hộ gia đình cư trú tại vùng nông thôn 25\.000\.000 Sửa chữa công trình cấp nước 60 tháng/.test(h), (h.match(/Nguyễn Văn Giả[^]{0,120}/)||[''])[0]);
   B.nv.tenXa = 'Phường Giả'; hsoXem(); await w(200); h = chu(HSO.x.h);
   ok('03/TD NSVSMT phường: ĐTTH "ở khu vực thành thị", chữ "UBND phường"', /Hộ gia đình ở khu vực thành thị/.test(h) && /UBND phường/.test(h));
   const iN = hsoCTVDs().findIndex(c=>c.ma==='NSVSMT'); hsoCTDat(iN, 'thIn', 'cham'); hsoChonMau('01td'); await w(300); h = chu(HSO.x.h);
   ok('đổi thẻ NSVSMT thời hạn → ✍ Chấm: 01/TD thời hạn để chấm', /Thời hạn xin vay: \.+ tháng/.test(h)); hsoCTDat(iN, 'thIn', 'in');
   /* 4. thẻ tự thêm dạng 1 mục đích; đổi tên tắt → bộ đi theo (3.211: GQVL có dạng riêng — thử ở t174) */
   ok('GQVL: dạng riêng (01/GQVL + 07b), bật ở Bộ HS', hsoCTV('GQVL').kieu==='gqvl' && hsoCTV('GQVL').bat!==false);
   hsoCTThem(); const iG = hsoCTVDs().length-1; hsoCTDat(iG, 'ma', 'GQX'); hsoCTDat(iG, 'ten', 'Hỗ trợ tạo việc làm giả'); hsoCTDat(iG, 'md', 'Chăn nuôi bò giả\nTrồng trọt giả', 'ds'); hsoCTDat(iG, 'ubnd', true);
   B.ct = 'GQX'; B.tien = '50000000'; B.pa = {sl:'02 con'}; hsoChonMau('bo'); await w(300);
   ok('Bộ HS: ① liệt kê chương trình theo thẻ (HSSV, NSVSMT, GQVL)', ['HSSV','NSVSMT','GQVL','GQX'].every(k=>document.querySelector('#hso-tuy input[name="hso-ct"][onchange*="\''+k+'\'"]')));
   hsoChonMau('01td'); await w(300); h = chu(HSO.x.h);
   ok('01/TD GQVL: tên in theo thẻ, mục đích đầu danh sách, số lượng gõ, khối UBND theo thẻ', /Chương trình cho vay: Hỗ trợ tạo việc làm/.test(h) && /Để thực hiện phương án: Chăn nuôi bò giả\./.test(h) && /Chăn nuôi bò giả 02 con 50\.000\.000 đồng/.test(h) && /Xác nhận của UBND xã/.test(h));
   hsoCTDat(iG, 'ma', 'gq x2'); ok('đổi tên tắt thẻ → bộ hồ sơ đổi theo', hsoCTVDs()[iG].ma==='GQX2' && B.ct==='GQX2');
   /* 5. bố cục như GDX: nhập liệu rộng hơn xem trước */
   const bo = document.querySelector('.hso-bo'), cot = bo ? [...bo.children].map(e=>e.getBoundingClientRect().width) : [0, 0];
   ok('bố cục như tab Giao dịch xã: cột nhập ~60 %, xem trước ~40 %', cot[0]>cot[1]*1.3, cot.map(Math.round).join(' / '));
   return o;
   function chu(x){ const d = document.createElement('div'); d.innerHTML = x.replace(/<\/(td|p|th)>/g, ' $&'); return d.textContent.replace(/\s+/g, ' '); }
 }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
