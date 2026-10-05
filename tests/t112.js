// 3.107 — xếp tổ / món vay trực tiếp vào điểm GD khi file Thông tin tổ trưởng thiếu tổ · dòng báo vàng ở KTGS Hội · KTGS bỏ mục vay trực tiếp · Mẫu 16 "Đoàn kiểm tra" = tên Hội cấp xã.
// Bộ GIẢ: tests/gia31 + bảng tổ T7 dựng từ bảng T8 bỏ bớt 3 tổ (giống tháng 9 thật: file hệ thống xuất thiếu tổ).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = f => { const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u; };
   for(const f of files){ const kq = await slDocFile(new File([tep(f)], f.n)); if(!kq.loi) await slGhi(kq); }
   /* bảng tổ T7 = bảng T8 bỏ 3 tổ có món ở Mẫu 31 T7 */
   const fT8 = files.find(f=>/to truong T8/i.test(f.n)), wb = XLSX.read(tep(fT8), {type:'array'}), ws = wb.Sheets[wb.SheetNames[0]];
   const rows = XLSX.utils.sheet_to_json(ws, {header:1, defval:''}), iH = rows.findIndex(r=>r.indexOf('Mã tổ trưởng')>=0), cTo = rows[iH].indexOf('Mã tổ trưởng');
   const K8 = await toNap('2026-07'); delete TO_KS['2026-07'];
   const coMon = {}; (K8.hs||[]).forEach(x=>{ if(x.to) coMon[x.to] = 1; });
   const bo = rows.slice(iH+1).filter(r=>coMon[String(r[cTo]).padStart(7, '0')]).slice(0, 3).map(r=>String(r[cTo]).padStart(7, '0'));
   const moi = rows.filter((r, i)=>i<=iH || bo.indexOf(String(r[cTo]).padStart(7, '0'))<0);
   const wb2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet(moi), 'BCQUERY');
   const kq7 = await slDocFile(new File([XLSX.write(wb2, {type:'array', bookType:'xlsx'})], 'Thong tin to truong T7 2026.xlsx'));
   ok('nạp bảng tổ T7 (thiếu 3 tổ)', !kq7.loi && kq7.ky==='2026-07', (kq7.loi||'')+' '+kq7.ky+' · bỏ '+bo.join(','));
   if(!kq7.loi) await slGhi(kq7);
   /* B. tổ thiếu trong bảng tổ kỳ đang xem → lấy bảng tổ tháng gần nhất (T8), ghi căn cứ */
   for(const k in TO_KS) delete TO_KS[k];
   const K = await toNap('2026-07'), T8 = await toNap('2026-08');
   const tb = bo.map(m=>K.to[m]);
   ok('B: 3 tổ thiếu lấy điểm GD theo Thông tin tổ trưởng T8 (không suy)', tb.every(t=>t && t.diem && !t.tt && t.diemTu==='Thông tin tổ trưởng T8/2026' && !t.diemSuy), tb.map(t=>t && (t.diem+'·'+t.diemTu)).join(' | '));
   ok('B: điểm GD lấy được trùng bảng T8', bo.every(m=>K.to[m].diem===T8.to[m].diem && K.to[m].tenDiemDu===T8.to[m].tenDiemDu));
   ok('B: Hội của tổ theo mã ĐVUT trên món vay', bo.every(m=>String(K.to[m].dv)===String(K.kh[m][0].dv)));
   ok('B: tổ có trong bảng T7 không bị ghi căn cứ', Object.values(K.to).filter(t=>t.tt).every(t=>!t.diemTu && !t.diemSuy));
   /* C. dòng báo vàng */
   const h = document.createElement('div'); h.innerHTML = ktSuyHTML(K);
   const tom = (h.querySelector('summary')||{}).textContent||'';
   ok('C: báo "File Thông tin tổ trưởng T7/2026 thiếu 3 tổ … đã xếp điểm GD: tháng trước 3"', /File Thông tin tổ trưởng T7\/2026 thiếu 3 tổ/.test(tom) && /tháng trước 3/.test(tom) && !/chưa rõ/.test(tom), tom);
   ok('C: bảng từng tổ: xã, ấp, Hội, điểm GD + căn cứ, số món', h.querySelectorAll('.kt-suy tbody tr').length===3 && /Thông tin tổ trưởng T8\/2026/.test(h.textContent) && /Món còn dư nợ/.test(h.textContent));
   ok('C: không thiếu tổ → không báo', ktSuyHTML(T8)==='' || !/thiếu/.test(ktSuyHTML(T8)));
   /* B'. bảng tháng trước không mở được → danh bạ tổ; không đối được mã điểm → để suy */
   const Kd = {thang:'2026-09', B:{co:{tt:[1]}}, kh:{}, to:{
     A:{ma:'A', xa:'X1', thon:'X101', diem:'D1', tenDiem:'Điểm Một ', ngayGD:'07', tt:{}},
     B:{ma:'B', xa:'X1', thon:'X109', dv:'11'}, C:{ma:'C', xa:'X1', thon:'X101', dv:'12'}}};
   const sdb = SL_DB; SL_DB = {to:{B:{diem:'Điểm một', ngayGD:'07', ky:'2026-08'}, C:{diem:'Điểm lạ', ky:'2026-08'}}};
   toDanhBaDiem(Kd); toSuyDiem(Kd); SL_DB = sdb;
   ok("B': danh bạ tổ → đối ra mã điểm của tổ cùng xã", Kd.to.B.diem==='D1' && /^danh bạ tổ/.test(Kd.to.B.diemTu), Kd.to.B.diem+' '+Kd.to.B.diemTu);
   ok("B': danh bạ ghi điểm không có mã → bỏ qua, suy theo ấp", Kd.to.C.diem==='D1' && !Kd.to.C.diemTu && /ấp/.test(Kd.to.C.diemSuy), Kd.to.C.diemSuy);
   /* A. món vay trực tiếp: ấp → ngày GDXA → xã 1 điểm */
   const Ka = {to:{
       T1:{ma:'T1', xa:'X1', thon:'X101', diem:'D1', tenDiem:'Điểm 1', ngayGD:'07'}, T2:{ma:'T2', xa:'X1', thon:'X102', diem:'D2', tenDiem:'Điểm 2', ngayGD:'23'},
       T3:{ma:'T3', xa:'X2', thon:'X201', diem:'D3', tenDiem:'Điểm 3', ngayGD:'10'}}, kh:{},
     hs:[{ku:'k1', xa:'X1', thon:'X102', ngayGD:'15', dn:5}, {ku:'k2', xa:'X1', thon:'X199', ngayGD:'07', dn:5}, {ku:'k3', xa:'X2', thon:'X299', ngayGD:'30', dn:5}, {ku:'k4', xa:'X1', thon:'X199', ngayGD:'30', dn:5}]};
   const dc = D.cauHinh.diaBan; D.cauHinh.diaBan = []; toGanTrucTiep(Ka, null); D.cauHinh.diaBan = dc;
   const tt = ku => Ka.to[Ka.hs.find(x=>x.ku===ku)._tt];
   ok('A: món trực tiếp theo ấp (ngày không trùng) → điểm của ấp', tt('k1').diem==='D2', tt('k1').ma);
   ok('A: ấp lạ → theo ngày GDXA', tt('k2').diem==='D1');
   ok('A: xã chỉ 1 điểm GD → lấy luôn', tt('k3').diem==='D3');
   ok('A: không xếp được → vẫn để chưa rõ (không đoán)', !tt('k4').diem && tt('k4').ma==='TTX1_d30');
   /* E. KTGS Hội bỏ mục vay trực tiếp; tab Tổ giữ */
   const Tz = {a:{ma:'a', xa:'X1', khoaDiem:'D1', dv:'11'}, TTX1_D1:{ma:'TTX1_D1', trucTiep:true, xa:'X1', khoaDiem:'D1', dv:'99'}};
   ok('E: cây KTGS bỏ vay trực tiếp, cây Tổ giữ', PV_DUNG.kt.boTT===true && !PV_DUNG.to.boTT && Object.keys(pvBoTT(Tz)).join()==='a');
   doiNgan(7); const C = ktCH(); C.ky='2026-07'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const t0 = Object.values(KT_K.to).find(t=>!toLaTT(t) && t.xa); C.xa = t0.xa; C.diem = ''; pvVeCay('kt'); await w(100);
   const chuCay = document.getElementById('kt-cay').textContent;
   ok('E: tab KTGS không còn chip "Trực tiếp" / "Vay trực tiếp"', !/Trực tiếp|Vay trực tiếp/.test(chuCay));
   ok('C: KTGS hiện dòng báo thiếu tổ', /File Thông tin tổ trưởng T7\/2026 thiếu 3 tổ/.test(document.getElementById('tr7').textContent));
   /* D. Mẫu 16: Đoàn kiểm tra = tên Hội cấp xã của tổ, không còn ô khai */
   const tH = Object.assign({}, t0, {dv:'11', tenXa:'Phường Gia Lộc'});
   ok('D: Đoàn kiểm tra = Hội Nông dân phường …', ktGiaTri16(tH, [], {}).f.DOAN==='Hội Nông dân phường Gia Lộc', ktGiaTri16(tH, [], {}).f.DOAN);
   ok('D: tổ Đoàn Thanh niên', ktGiaTri16(Object.assign({}, tH, {dv:'14'}), [], {}).f.DOAN==='Đoàn Thanh niên phường Gia Lộc', ktGiaTri16(Object.assign({}, tH, {dv:'14'}), [], {}).f.DOAN);
   ok('D: chữ cũ đã gõ không còn tác dụng; trực tiếp → dòng chấm', ktGiaTri16(tH, [], {doan:'Đoàn cũ'}).f.DOAN==='Hội Nông dân phường Gia Lộc' && ktGiaTri16(Object.assign({}, tH, {dv:'99'}), [], {}).f.DOAN==='');
   ok('D: không còn ô Đoàn kiểm tra (3.114: hộp chọn khi in Mẫu 16 cũng không có)', !/doan/.test(ktKBKhung('dx', [])) && !/doan/.test(ktInPhan('m16', [])) && KT_KB_LUU.indexOf('doan')<0);
   ok('D: dọn ktKBLuu.doan khi mở app', /delete ch\.ktKBLuu\.doan/.test(document.documentElement.innerHTML));
   const z = await ktDocx('m16', ktGiaTri16(tH, [], {})); const zz = XLSX.CFB.read(new Uint8Array(await z.arrayBuffer()), {type:'array'});
   const doc = new TextDecoder().decode((XLSX.CFB.find(zz, 'word/document.xml') || XLSX.CFB.find(zz, '/word/document.xml')).content).replace(/<[^>]+>/g, '');
   ok('D: Word Mẫu 16 in "ĐOÀN KIỂM TRA: Hội Nông dân phường Gia Lộc"', /ĐOÀN KIỂM TRA: ?Hội Nông dân phường Gia Lộc/.test(doc), (doc.match(/ĐOÀN KIỂM TRA:.{0,40}/)||[''])[0]);
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
