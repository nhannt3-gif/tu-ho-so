// 3.170 (anh chốt 11/10) — 2 tab con mới của Số liệu: 📝 Hồ sơ Tổ (10C cũ / mới, 10A, 10B, 11/TD, 01/BG, 02/BG) · 📄 Hồ sơ vay (01/TD, 03/TD, 04/TD, 09A/TD).
//   Điền tự động từ số liệu, thiếu thì chấm; ⚙ Khai báo 1 lần (PGD, trưởng ấp, tổ phó thực tế); 10C chọn mẫu theo ngày họp; Word .docx đúng khổ. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = () => (HSO.x && HSO.x.h || '').replace(/<\/(p|td|tr)>|<br>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   const b64 = bl => new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result.split(',')[1]); fr.readAsDataURL(bl); });
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const nut = [].map.call(document.querySelectorAll('#tr7 .sl-con button'), x=>x.textContent);
   ok('thanh tab con Số liệu có 📝 Hồ sơ Tổ và 📄 Hồ sơ vay', nut.some(x=>/Hồ sơ Tổ/.test(x)) && nut.some(x=>/Hồ sơ vay/.test(x)), nut.join(' | '));
   ok('thanh bên: nhóm Hồ sơ có 2 mục mới', DH_MUC.some(m=>m.k==='hst') && DH_MUC.some(m=>m.k==='hsv'));
   ok('tab Hồ sơ Tổ: khối LỌC ĐỊA BÀN + danh sách 6 mẫu + khung xem', !!document.querySelector('#hst-cay .loc-khoi') && document.querySelectorAll('#hso-tabm .hso-tm').length===6 && !!document.getElementById('hso-xem-khung'));
   /* chưa chọn tổ → mẫu trắng */
   const C = hsoCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; hsoChonMau('10c'); await w(400);
   ok('chưa chọn tổ: 10C là mẫu trắng (chấm), vẫn có nút In / Word', /BIÊN BẢN HỌP/.test(chu()) && /Chủ trì: Ông \(bà\) \.{10}/.test(chu()) && /Word/.test(document.getElementById('hso-xem-nut').textContent));
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(400);
   pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(400);
   pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1500);
   const t = TO_K.to[C.to], tv = hsoTVTo(t);
   /* 10C theo ngày họp */
   HSO.o.ngay = '2026-09-15'; hsoXem(); await w(200);
   ok('10C ngày họp 15/09/2026 → mẫu cũ (kết nạp bổ sung, Ấp (kp))', /kết nạp bổ sung tổ viên/.test(chu()) && /Ấp \(kp\)/.test(chu()) && HSO.x.ma.indexOf('cũ')>0);
   HSO.o.ngay = '2026-10-05'; hsoXem(); await w(200);
   ok('10C ngày họp 05/10/2026 → mẫu mới QĐ 70 (Hình thức họp, bảng I │ II, đề nghị vay)', /Hình thức họp/.test(chu()) && /Tổ viên được kết nạp/.test(chu()) && /đề nghị vay vốn NHCSXH/.test(chu()) && /05\/10\/2026/.test(chu()));
   ok('10C điền tổ trưởng, thôn, xã từ số liệu', chu().indexOf('Ông (bà) '+t.ten+'. Chức vụ: Tổ trưởng')>=0 && chu().indexOf('Thôn '+hsoApTen(t))>=0, t.ten+' · '+hsoApTen(t));
   /* tích kết nạp 1 người, cho ra 1 người → bảng + tổng sau họp */
   HSO.kn = {}; HSO.ra = {}; HSO.kn['KH_GIA_MOI'] = true; HSO.ra[tv[0].kh] = true; hsoXem(); await w(200);
   const L = hsoKNRa(t, tv);
   ok('tích Cho ra 1 tổ viên → có tên trong bảng II, tổng sau họp = trước − 1 + 1 kết nạp', chu().indexOf(tv[0].ten)>=0 && L.sau===tv.length && L.truoc===tv.length && /Tổng số tổ viên sau khi kết nạp, cho ra khỏi Tổ: \d+ tổ viên/.test(chu()), 'trước '+L.truoc+' · sau '+L.sau);
   /* khai báo 1 lần */
   hsoKB().pgd.daiDien = 'Nguyễn Văn Giả'; hsoKB().ap[hsoApKhoa(t)] = 'Trần Trưởng Ấp Giả'; hsoKB().pho[t.ma] = 'Lê Tổ Phó Thật'; luu();
   hsoVe(); await w(300);
   ok('khai báo trưởng ấp + tổ phó thực tế → 10C dùng (ô vàng)', chu().indexOf('Trần Trưởng Ấp Giả')>=0 && chu().indexOf('Lê Tổ Phó Thật')>=0 && /o-kb">Trần Trưởng Ấp Giả/.test(HSO.x.h));
   ok('tổ phó khai khác máy → nhắc ⚠ ở cột tùy chọn', !t.pho || /Tổ phó theo khai báo/.test(document.getElementById('hso-tuy').textContent));
   hsoKBHop(); await w(200);
   ok('hộp ⚙ Khai báo 1 lần: có PGD, trưởng ấp, tổ phó, mục đích vay', ['Phòng giao dịch','Trưởng ấp','Tổ phó thực tế','Mục đích vay'].every(x=>document.getElementById('hop-in').textContent.indexOf(x)>=0));
   dongHop(); await w(200);
   /* từng mẫu Tổ */
   const kq = {};
   for(const m of HSO_MAU.hst){ hsoChonMau(m.k); await w(500); kq[m.k] = {chu:chu(), x:HSO.x}; }
   ok('10A: danh sách tổ viên + tổng số + phê duyệt UBND', kq['10a'].chu.indexOf(tv[0].ten)>=0 && new RegExp('Tổng số: '+tv.length+' tổ viên').test(kq['10a'].chu) && /PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ/.test(kq['10a'].chu));
   ok('10B: kết nạp + bầu thay Ban quản lý', /Bầu thành viên mới tham gia Ban quản lý Tổ/.test(kq['10b'].chu) && /Tổng số tổ viên của tổ sau kỳ họp là: \d+/.test(kq['10b'].chu));
   ok('11/TD: Bên A người đại diện (khai báo) · Bên B tổ trưởng · lời văn Điều 1–4', kq['11'].chu.indexOf('Nguyễn Văn Giả')>=0 && kq['11'].chu.indexOf('Ban quản lý Tổ TK&VV: '+t.ten)>=0 && /Điều 4\. Điều khoản thi hành/.test(kq['11'].chu));
   ok('01/BG: Bên giao = tổ trưởng hiện tại (tháng trước không đổi), Bên nhận chấm', kq['01bg'].chu.indexOf('Ông/Bà: '+t.ten+', nguyên Tổ trưởng')>=0 && /Ông\/Bà: \.{10,} Chức vụ: Tổ trưởng/.test(kq['01bg'].chu));
   const dn = tv.filter(k=>k.conNo || k.lt>0 || k.t105>0).reduce((a,k)=>a+(k.dn||0), 0), mon1 = tv.find(k=>k.mon.length).mon[0];
   ok('02/BG: A4 ngang, dòng khách + dòng món (mã khoản vay), Tổng cộng nợ gốc đúng', kq['02bg'].x.M.ngang && kq['02bg'].chu.indexOf(mon1.ku)>=0 && kq['02bg'].chu.indexOf('Tổng cộng '+tdnTien(dn))>=0 && /Đến ngày 31\/08\/2026/.test(kq['02bg'].chu), 'tổng '+tdnTien(dn));
   /* Word */
   hsoChonMau('02bg'); await w(300); const w02 = await b64(await hsoDocx(HSO.x));
   hsoChonMau('11'); await w(300); const w11 = await b64(await hsoDocx(HSO.x));
   /* Hồ sơ vay */
   slDoiTab('hsv'); for(let i=0;i<30 && !document.querySelector('#hsv-cay .loc-khoi');i++) await w(200); await w(600);
   ok('tab Hồ sơ vay: 6 mục (3.172: 04/TD dời sang tab 🏢 Giao dịch xã)', document.querySelectorAll('#hso-tabm .hso-tm').length===6);
   const kv = tv.find(k=>k.mon.some(m=>(m.dn||0)>0)), c = hsoKhach(kv.kh, t);
   const B0 = hsoBoMoi(); hsoBoChonKH(kv.kh); B0.ct = 'HSSV'; B0.tien = '80000000'; B0.tuCo = '20.000.000'; B0.pa = {sv:'SV Giả'}; hsoChonMau('01td'); await w(300);   /* 3.171: đơn vay lấy theo bộ hồ sơ */
   ok('01/TD: người vay từ Mẫu 31 (tên, CCCD), tổ trưởng, số tiền + bằng chữ, tổng nhu cầu', chu().indexOf(c.ten)>=0 && (!c.cccd || chu().indexOf(c.cccd)>=0) && /Tám mươi triệu đồng/.test(chu()) && /Tổng nhu cầu vốn: 100\.000\.000/.test(chu()) && chu().indexOf('do ông (bà): '+t.ten)>=0);
   ok('01/TD: HSSV gợi ý đối tượng phương án, thời hạn / kỳ hạn để chấm', /Chi phí học tập, sinh hoạt cho sinh viên/.test(chu()) && /Thời hạn xin vay: \.{5,} tháng/.test(chu()));
   hsoCH().boId = ''; hsoChonMau('03td'); HSO.vay.chon[tv[0].kh] = true; HSO.vay.chon[tv[1].kh] = true; hsoXem(); await w(300);
   ok('03/TD: A4 ngang, tên tổ / ấp / xã, tổ viên đã tích vào bảng', HSO.x.M.ngang && chu().indexOf(tv[0].ten)>=0 && chu().indexOf(tv[1].ten)>=0 && chu().indexOf('Tên tổ TK&VV: '+t.ten)>=0);
   ok('04/TD không còn ở Hồ sơ vay — in ở tab 🏢 Giao dịch xã (3.172)', !HSO_MAU.hsv.some(m=>m.k==='04td') && typeof gdxHTML04==='function');
   hsoChonMau('09a'); HSO.vay.kh = kv.kh; hsoVe(); await w(300); const m9 = kv.mon.filter(m=>(m.dn||0)>0)[0];
   ok('09A/TD: món còn dư nợ → mã khoản vay, chương trình, gốc, ngày đến hạn; số tiền gia hạn mặc định = gốc', chu().indexOf(m9.ku)>=0 && chu().indexOf(tdnTien(m9.dn))>=0 && (!skHL(m9) || chu().indexOf(ngayVNsl(skHL(m9)))>=0) && /gia hạn khoản nợ gốc ?\d/.test(chu()));
   ok('đọc số thành chữ', hsoChuSo(21500000)==='Hai mươi mốt triệu năm trăm nghìn đồng' && hsoChuSo(115000)==='Một trăm mười lăm nghìn đồng' && hsoChuSo(2014)==='Hai nghìn không trăm mười bốn đồng' && hsoChuSo(1000000000)==='Một tỷ đồng');
   /* hồi quy: tab Tổ vẫn chạy */
   slDoiTab('to'); await w(1500);
   ok('tab Tổ TK&VV vẫn mở bình thường', !!document.querySelector('#to-cay .loc-khoi') && !!document.getElementById('to-the'));
   return {o, w02, w11, ten:t.ten};
 }, files);
 const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't163-')), doc = (b64, ten) => { const f = path.join(tmp, ten); fs.writeFileSync(f, Buffer.from(b64, 'base64')); return cp.execSync('unzip -p '+f+' word/document.xml').toString(); };
 const x02 = doc(R.w02, 'a.docx'), x11 = doc(R.w11, 'b.docx');
 R.o.push((/w:orient="landscape"/.test(x02) && /<w:vMerge w:val="restart"\/>/.test(x02) ? '✓ ' : '✗ ')+'Word 02/BG: A4 ngang, tiêu đề bảng gộp ô');
 R.o.push((x11.indexOf(R.ten)>=0 && /Điều 1\. Bên A ủy nhiệm/.test(x11) && !/o-sl|o-kb|<span/.test(x11) ? '✓ ' : '✗ ')+'Word 11/TD: có chữ đã điền, không lẫn thẻ HTML');
 R.o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.o.filter(x=>x[0]==='✗').length; console.log((R.o.length-sai)+'/'+R.o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
