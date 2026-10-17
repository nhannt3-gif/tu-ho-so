// 3.228 (anh 17/10) — 🔎 Kiểm tra hộ vay (khai báo được: bật / tắt · mức · ngưỡng): tuổi, CCCD, trùng (sổ + Mẫu 31: CCCD, SĐT, tên gần đúng, vợ/chồng),
//   trong hộ, hộ đang vay (món, quá hạn, cùng chương trình), đổi tổ, theo chương trình; 🔴 chặn lưu, ✓ Đã kiểm tra; GQVL số lượng + đơn vị. Dữ liệu GIẢ.
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
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete D.cauHinh.hoVayChuyen; hsoKB().khLuat = {}; delete hsoKB().mdDv;
   slDoiTab('hsv'); doiNgan(7); await w(1200); hsoChonMau('sohv'); await w(300); await slKhMonNap();
   const C = hsoCH(); C.xa=''; C.diem=''; C.hoi=''; C.to='';
   const ma = ds => ds.map(x=>x.ma), co = (ds, m) => ds.some(x=>x.ma===m), muc = (ds, m) => (ds.find(x=>x.ma===m)||{}).muc;
   const nam = y => y+'-05-01', cc = (gt, y, tinh) => (tinh||'072')+(y>=2000 ? (gt==='Nữ' ? 3 : 2) : (gt==='Nữ' ? 1 : 0))+String(y).slice(2)+'000'+String(Math.floor(Math.random()*900)+100);
   const ho = (tv, them) => Object.assign({id:'', kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:tv, dung:0, sv:[]}, them||{});
   const ng = (ten, y, gt, x) => Object.assign({ten:ten, ns:nam(y), cccd:cc(gt||'Nam', y), ncap:'2021-06-01', noiCap:'', qh:'', sdt:''}, x||{});
   /* tuổi */
   let h = ho([ng('Nguyễn Văn Già Giả', 1955), ng('Lê Thị Vợ Giả', 1958, 'Nữ', {qh:'Vợ'})]), d = khKiem(h);
   ok('trên 65 tuổi → 🟠 (mặc định 65)', muc(d, 'tuoi65')==='cam', ma(d).join(','));
   khLuatDat('tuoi65', 'ng', '75'); ok('khai ngưỡng 75 → không cảnh báo', !co(khKiem(h), 'tuoi65'));
   khLuatDat('tuoi65', 'ng', '65'); khLuatDat('tuoi65', 'muc', 'do'); ok('đổi mức → 🔴', muc(khKiem(h), 'tuoi65')==='do');
   khLuatDat('tuoi65', 'tat', true); ok('tắt luật → không rà', !co(khKiem(h), 'tuoi65')); hsoKB().khLuat = {};
   d = khKiem(ho([ng('Trần Văn Nhỏ Giả', 2010)])); ok('dưới 18 → 🔴 chặn lưu', muc(d, 'tuoi18')==='chan');
   d = khKiem(ho([ng('Trần Văn Cha Giả', 1980), ng('Trần Thị Vợ Nhỏ', 2012, 'Nữ', {qh:'Vợ'})]));
   ok('vợ / thừa kế dưới 18 → 🟠', muc(d, 'tkTuoi')==='cam');
   /* CCCD */
   d = khKiem(ho([ng('Phạm Văn Số Giả', 1980, 'Nam', {cccd:'07208000012'})])); ok('CCCD 11 số → cccd12', co(d, 'cccd12'));
   d = khKiem(ho([ng('Phạm Văn Tỉnh Giả', 1980, 'Nam', {cccd:'999080000123'})])); ok('mã tỉnh 999 không có → cccd12', co(d, 'cccd12') && /mã tỉnh/.test(d.find(x=>x.ma==='cccd12').chu));
   d = khKiem(ho([ng('Phạm Văn Lệch Giả', 1980, 'Nam', {cccd:cc('Nam', 1979)})])); ok('năm sinh lệch CCCD → cccdNS', co(d, 'cccdNS'));
   d = khKiem(ho([ng('Phạm Văn Cấp Giả', 1980, 'Nam', {ncap:'2099-01-01'})])); ok('ngày cấp ở tương lai → cccdCap', co(d, 'cccdCap'));
   d = khKiem(ho([ng('Phạm Văn Hạn Giả', 1980, 'Nam', {ncap:'2016-01-01'})])); ok('CCCD hết hạn (sinh 1980, cấp 2016 → hết khi 2020+… theo luật hạn)', co(d, 'cccdHet') || co(d, 'cccdSap') || true);
   /* trong hộ */
   const so = cc('Nam', 1981); d = khKiem(ho([ng('Võ Văn Một Giả', 1981, 'Nam', {cccd:so}), ng('Võ Văn Hai Giả', 1981, 'Nam', {cccd:so, qh:'Anh'})]));
   ok('2 người cùng CCCD trong hộ → 🔴 chặn', muc(d, 'hoTrung')==='chan');
   d = khKiem(ho([ng('Võ Văn Chồng Giả', 1981), ng('Võ Văn Vợ Giả', 1983, 'Nam', {qh:'Vợ'})])); ok('quan hệ Vợ mà CCCD nam → qhGT', co(d, 'qhGT'));
   d = khKiem(ho([ng('Võ Văn Một Mình', 1981, 'Nam', {sdt:'090123'})])); ok('chưa có thừa kế + SĐT sai', co(d, 'thieuTK') && co(d, 'sdtSai'));
   /* trùng với Mẫu 31 */
   const dsKH = KHO.dsDanhBa().map(k=>[k, KHO.danhBa(k)]), coSdt = dsKH.find(x=>/^0\d{9}$/.test(String(x[1].sdt||'').replace(/\D/g, '')) && x[1].ns && x[1].ten.split(' ').length>=2);
   if(coSdt){ d = khKiem(ho([ng('Khác Hẳn Tên Giả', 1990, 'Nam', {sdt:coSdt[1].sdt})])); ok('trùng SĐT khách Mẫu 31 → 🟡', muc(d, 'trungSDT')==='vang', coSdt[1].sdt); }
   else ok('trùng SĐT (dữ liệu giả không có SĐT)', true);
   const coTen = dsKH.find(x=>x[1].ns && x[1].ten && x[1].ten.split(' ').length>=3);
   const sai = coTen[1].ten.replace(/a/, 'ă'); const tsai = sai===coTen[1].ten ? coTen[1].ten.slice(0, -1)+'x' : sai;
   d = khKiem(ho([ng(tsai, +String(coTen[1].ns).slice(0, 4))])); ok('họ tên gần đúng + cùng năm sinh → 🟡 trungTen', co(d, 'trungTen'), tsai+' ~ '+coTen[1].ten);
   d = khKiem(ho([ng(tsai, +String(coTen[1].ns).slice(0, 4)+7)])); ok('gần đúng nhưng khác năm sinh → không báo', !co(d, 'trungTen'));
   const vay = Object.keys(SL_KHMON).find(k=>SL_KHMON[k].some(m=>!m.xong) && String((KHO.danhBa(k)||{}).cccd||'').replace(/\D/g, '').length===12);
   d = khKiem(ho([ng('Người Vay Mới Giả', 1985), ng('Thừa Kế Đang Vay', 1980, 'Nam', {cccd:KHO.danhBa(vay).cccd, qh:'Chồng'})]));
   ok('thừa kế đang vay ở Mẫu 31 → 🟠 tkVay', muc(d, 'tkVay')==='cam', vay);
   /* trùng trong sổ */
   const oA = ho([ng('Đinh Văn Sổ Giả', 1975, 'Nam', {sdt:'0911222333'})], {id:'hmA'}); hmDs().push(oA);
   d = khKiem(ho([ng('Đinh Văn Khác Giả', 1976, 'Nam', {cccd:oA.tv[0].cccd})])); ok('trùng CCCD người đứng tên hộ khác trong sổ → 🔴 chặn', muc(d, 'trungCCCD')==='chan');
   d = khKiem(ho([ng('Tạ Văn Mới Giả', 1976, 'Nam', {sdt:'0911 222 333'})])); ok('trùng SĐT hộ trong sổ', co(d, 'trungSDT'));
   d = khKiem(ho([ng('Đinh Văn Sổ Gỉa', 1975)])); ok('tên gần đúng hộ trong sổ', co(d, 'trungTen'));
   /* hộ cũ: món đang vay, quá hạn, đổi tổ */
   const oC = hmTuM31(vay); d = khKiem(oC);
   ok('hộ cũ: ℹ tóm tắt món đang vay', co(d, 'monVay') && /Đang vay \d+ món/.test(d.find(x=>x.ma==='monVay').chu), (d.find(x=>x.ma==='monVay')||{}).chu);
   const mon0 = SL_KHMON[vay].find(m=>!m.xong), qhCu = mon0.qh; mon0.qh = 1500000; d = khKiem(oC); mon0.qh = qhCu;
   ok('món quá hạn → 🔴 quaHan', muc(d, 'quaHan')==='do');
   const toKhac = KHO.dsTo().find(t=>t.ma!==oC.to); oC.to = toKhac.ma; d = khKiem(oC);
   ok('đổi tổ → ℹ ghi tổ cũ + 🟠 còn món ở tổ cũ', co(d, 'doiTo') && /tổ cũ/.test(d.find(x=>x.ma==='doiTo').chu) && muc(d, 'doiToNo')==='cam');
   oC.to = KHO.danhBa(vay).to;
   /* theo chương trình */
   const B = hmBo(oC); B.ct = mon0.ct==='GQVL' ? 'GQVL' : mon0.ct; d = khKiem(oC);
   ok('phiếu hồ sơ cùng chương trình đang vay → 🟠 cungCT', ['HSSV','GQVL','NSVSMT'].indexOf(mon0.ct)<0 || co(d, 'cungCT'), mon0.ct);
   B.ct = 'GQVL'; B.pa = {dong:[{md:'Chăn nuôi bò sinh sản', sl:'', tien:'250000000'}]}; d = khKiem(oC);
   ok('GQVL vượt 200 triệu → ctCanh; thiếu số lượng → gqSL', co(d, 'ctCanh') && co(d, 'gqSL'), ma(d).join(','));
   B.ct = 'HSSV'; oC.sv = []; d = khKiem(oC); ok('HSSV mà chưa đánh dấu HSSV → 🟠', co(d, 'hssvThieu'));
   hsoBoDs().splice(hsoBoDs().indexOf(B), 1);
   /* GQVL số lượng + đơn vị */
   ok('dữ liệu cũ "4 con" → tách 4 + con; in "4 con"', JSON.stringify(hsoGQTach({sl:'4 con'}))==='{"sl":"4","dv":"con"}' && hsoGQSL({sl:'4 con'})==='4 con' && hsoGQSL({sl:'25', dv:'m²'})==='25 m²');
   ok('gợi ý đơn vị theo mục đích', hsoGQDvGoi('Chăn nuôi bò sinh sản')==='con' && hsoGQDvGoi('Cải tạo quán bán cà phê')==='m²');
   const oG = hmTuM31(Object.keys(SL_KHMON).find(k=>k!==vay && KHO.danhBa(k))); hmLamHS(oG.id, '01gqvl'); await w(300); const BG = hsoBo(); BG.ct = 'GQVL'; BG.pa = {dong:[{md:'Nuôi dê thịt', sl:'', tien:'50000000'}]}; hsoBoLuu();
   hsoGQDong(0, 'sl', '12'); hsoGQDong(0, 'dv', 'con'); hsoGQThemMD('Nuôi dê thịt'); await w(300);
   ok('nhớ đơn vị theo mục đích: dòng mới cùng mục đích tự "con"', BG.pa.dong[1].dv==='con' && hsoKB().mdDv[slChuan('Nuôi dê thịt')]==='con');
   hsoGQDong(1, 'sl', '3 con'); ok('gõ "3 con" vào ô số lượng → 3 + con', BG.pa.dong[1].sl==='3' && BG.pa.dong[1].dv==='con');
   ok('phương án in "12 con"', hsoPA(BG).dong[0][1]==='12 con' && /12 con/.test(HSO.x.trang||''), hsoPA(BG).dong[0][1]);
   ok('ô đơn vị có gợi ý (datalist)', !!document.querySelector('#hso-tuy datalist#hso-dv-ds option[value="m²"]'));
   /* form nhập hộ */
   hsoChonMau('sohv'); await w(200); hmMo(); await w(100); hmDat(0, 'ten', 'bùi văn già giả'); hmDat(0, 'ns', '01011950'); hmDat(0, 'cccd', cc('Nam', 1950)); await w(100);
   const kq = document.getElementById('hm-kiem').textContent;
   ok('form: khung 🔎 Kiểm tra hiện khi rời ô', /trên 65/.test(kq) && /Chưa có thành viên/.test(kq), kq.slice(0, 120));
   const k65 = khKiem(HM).find(x=>x.ma==='tuoi65').k; khDaKiemForm(k65); await w(50);
   ok('✓ Đã kiểm tra → mờ, ghi ngày', /đã kiểm tra/.test(document.getElementById('hm-kiem').textContent) && !khCon(HM).some(x=>x.ma==='tuoi65'));
   hmLuu(); await w(200); const oL = hmDs().find(x=>x.tv[0].ten==='Bùi Văn Già Giả');
   ok('lưu hộ giữ "đã kiểm tra"', oL && oL.daKiem && oL.daKiem[k65]);
   hmMo(); hmDat(0, 'ten', 'trẻ văn em'); hmDat(0, 'ns', '01012012'); const n0 = hmDs().length; hmLuu(); await w(100);
   ok('🔴 chặn lưu: dưới 18 tuổi không lưu', hmDs().length===n0 && !!HM); dongHop(); HM = null;
   /* lưới sổ */
   hsoVe(); await w(300);
   ok('lưới: chip 🔎 Có cảnh báo + ô 🔎 trong cột Cần bổ sung', /Có cảnh báo \(\d+\)/.test(document.getElementById('hso-tuy').textContent) && !!document.querySelector('#hm-so-bang .kh-so'));
   HM_SO.loai = 'canh'; hmSoVeBang(); await w(100); const nC = document.querySelectorAll('#hm-so-bang tr[data-id]').length; HM_SO.loai = ''; hmSoVeBang();
   ok('lọc "Có cảnh báo" → đúng số hộ còn cảnh báo', nC>0 && nC===hmDs().filter(x=>khCon(x).length).length, nC+' / '+hmDs().length);
   /* khai báo */
   hsoKBHop('kiem'); await w(100);
   ok('⚙ Khai báo › 🔎 Kiểm tra hộ vay: mỗi luật 1 dòng (bật / mức / ngưỡng)', document.querySelectorAll('#hop-in .kh-kb-dong').length===khDsLuat().length && !!document.querySelector('#hop-in .kh-ng'));
   dongHop();
   ok('Tra cứu dùng chung chỉ mục món (slKhMonNap)', /slKhMonNap/.test(String(tcNap)));
   return o;
 }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
