// 3.94 — 👤 Tra cứu KH gọn: danh sách 2 dòng (điện thoại 50 dòng + Xem thêm), thẻ chia nhóm (số tóm tắt, nhân thân, liên hệ, tiết kiệm, món vay có mục đích,
//        HSSV đầy đủ), bấm giá trị để chép, bỏ nút Hồ sơ hộ, Mở tổ; kiểm trùng 2 ô: CCCD người vay · CCCD HSSV · tên vợ/chồng = người thừa kế · trùng họ tên.
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   let chep = []; chepChu = function(t, m){ chep.push(t); };
   doiNgan(7); slDoiTab('tra'); for(let i=0;i<80 && !SL_PHU_KY;i++) await w(200); await w(300);
   ok('có ô kiểm trùng 2 ô (CCCD + họ tên)', !!document.getElementById('tc-kt-so') && !!document.getElementById('tc-kt-ten'));
   /* danh sách gọn */
   const ma = Object.keys(SL_KHMON).find(k=>(SL_DB.kh[k]||{}).mon>0 && SL_DB.kh[k].cccd) ; const c = SL_DB.kh[ma];
   SL_TRA_Q = c.ten; document.getElementById('sl-tim').value = c.ten; slTraTim(); await w(200);
   const d0 = document.querySelector('#sl-kq .sl-kq-dong');
   ok('dòng danh sách 2 dòng: tên + mã KH nổi bật (3.103) + nhãn tình trạng · CCCD, địa bàn', !!d0 && d0.querySelector('.tc-d1 .tc-nh') && d0.querySelector('.tc-d1 .tc-ten') && /^\d+$/.test(d0.querySelector('.tc-d1 .tc-ma').textContent) && !/☎/.test(d0.querySelector('small').textContent));
   /* thẻ chi tiết */
   slTheKH(ma); await w(800); const the = document.getElementById('tc-ct');
   ok('thẻ chia nhóm: số tóm tắt + Nhân thân + Liên hệ + Tiết kiệm + Món vay', the.querySelectorAll('.tc-o').length===5 && ['Nhân thân','Liên hệ','Tiết kiệm 105','Món vay'].every(x=>the.textContent.indexOf(x)>=0));
   ok('bỏ nút Hồ sơ hộ, có Chép cả khối + Mở tổ', !/Hồ sơ hộ/.test(the.textContent) && /Chép cả khối/.test(the.textContent) && /Mở tổ/.test(the.textContent));
   ok('không còn 12 nút 📋 riêng — bấm vào giá trị', !the.querySelector('.kh-o') && the.querySelectorAll('.tc-chep').length>=4);
   const ccEl = [...the.querySelectorAll('.tc-chep')].find(x=>x.getAttribute('data-ten')==='CCCD'); ccEl.click(); await w(50);
   ok('bấm CCCD → chép đúng số', chep[chep.length-1]===c.cccd, chep[chep.length-1]);
   ok('CCCD có ngày cấp + hạn CCCD', /CCCD/.test(the.textContent) && /Hạn CCCD/.test(the.textContent) && (!c.ncap || the.textContent.indexOf('cấp '+ngayVNsl(c.ncap))>=0));
   ok('bảng món vay có cột Mục đích', [...the.querySelectorAll('.tc-mon th')].some(x=>x.textContent==='Mục đích'));
   /* HSSV */
   const mHS = Object.keys(SL_KHMON).find(k=>SL_KHMON[k].some(m=>m.ct==='HSSV' && !m.xong));
   if(mHS){ slTheKH(mHS); await w(800); const hs = document.querySelector('#tc-ct tr.tc-hs');
     ok('món HSSV: dòng 🎓 tên SV, CCCD SV, trường, khóa', !!hs && /🎓/.test(hs.textContent) && /khóa \d{4}|nhập học/.test(hs.textContent), hs ? hs.textContent.slice(0,120) : 'không có'); }
   else ok('món HSSV (dữ liệu giả không có HSSV đang vay)', true, 'bỏ qua');
   /* hạn CCCD */
   ok('tcHan: CMND 9 số → hết hạn; còn hạn → ok', tcHan({cccd:'123456789'}).kq==='het' && ['ok','sap'].indexOf(tcHan({cccd:'072190000001', ns:'1990-05-01', ncap:'2021-05-01'}).kq)>=0 && tcHan({cccd:'072200000001', ns:'2000-05-01', ncap:'2021-05-01'}).kq==='het');
   ok('địa chỉ bỏ dấu thừa', tcDiaChi('- - Cây Xoài - Phường Gò Dầu - Tây Ninh')==='Cây Xoài, Phường Gò Dầu, Tây Ninh');
   /* kiểm trùng */
   const vc = SL_PHU.find(p=>p.loai==='vc' && (SL_DB.kh[p.kh]||{}).mon>0);
   const kq1 = tcKiemTrung2(c.cccd, ''); ok('CCCD người vay → 🔴 trùng đang vay, có mã KH + món', /Trùng — đang vay vốn/.test(kq1) && /Trùng CCCD người vay/.test(kq1) && kq1.indexOf(ma)>=0);
   if(vc){ const kq2 = tcKiemTrung2('', vc.ten.toLowerCase()); ok('tên vợ/chồng (gõ thường, không dấu vẫn khớp) → 🟠 người thừa kế', /người thừa kế/.test(kq2) && kq2.indexOf(vc.kh)>=0 && /Có thể trùng người thừa kế|Trùng — đang vay/.test(kq2));
     const kq2b = tcKiemTrung2('', boDau(vc.ten)); ok('tên vợ/chồng gõ không dấu cũng khớp', /người thừa kế/.test(kq2b)); }
   else ok('tên vợ/chồng (dữ liệu giả không có)', true, 'bỏ qua');
   const hsP = SL_PHU.find(p=>p.loai==='hs' && p.so && p.so.length>=9);
   if(hsP){ const kq3 = tcKiemTrung2(hsP.so, ''); ok('CCCD HSSV → báo rõ trùng HSSV của người vay nào', /Trùng CCCD HSSV/.test(kq3) && kq3.indexOf(hsP.kh)>=0); }
   const kq4 = tcKiemTrung2('099999999999', 'Tên Không Có Ai'); ok('không trùng → 🟢 có thể nhập máy', /Không trùng — chưa vay vốn, có thể nhập máy/.test(kq4));
   TC_KT.so = c.cccd; TC_KT.ten = ''; tcKTVe(); await w(100); ok('màn rộng: chi tiết kiểm trùng ở cột phải', /Kiểm trùng/.test(document.getElementById('tc-ct').textContent) && /bên phải/.test(document.getElementById('tc-kt-kq').textContent));
   SL_TRA_Q = c.cccd; document.getElementById('sl-tim').value = c.cccd; slTraTim(); await w(100); ok('gõ CCCD ở ô tìm → tự điền ô kiểm trùng', document.getElementById('tc-kt-so').value===c.cccd);
   ok('↑ ↓ Enter có hàm', typeof tcPhim==='function');
   return o; }, files).catch(e=>['✗ LỖI '+e.message]);
 r.forEach(x=>console.log(x)); await p.screenshot({path:path.join(__dirname,'t107.png'), fullPage:true});
 /* điện thoại: 50 dòng + Xem thêm */
 await p.setViewportSize({width:390,height:844});
 const r2 = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); TC_KT={so:'',ten:''}; SL_TRA_Q='nguyen'; TC_SL=50; veSoLieu(); await w(600);
   const n1 = document.querySelectorAll('#sl-kq .sl-kq-dong').length, nut = [...document.querySelectorAll('#sl-kq button')].find(b=>/Xem thêm/.test(b.textContent));
   if(nut) nut.click(); await w(300); const n2 = document.querySelectorAll('#sl-kq .sl-kq-dong').length; return [n1, !!nut, n2]; });
 const ok2 = r2[0]<=100 && (!r2[1] || r2[2]>r2[0]); console.log((ok2 ? '✓' : '✗')+' điện thoại: danh sách giới hạn + Xem thêm — '+r2.join(' / '));
 await p.screenshot({path:path.join(__dirname,'t107_dt.png')});
 const sai = r.filter(x=>!x.startsWith('✓')).length + (ok2 ? 0 : 1); console.log((r.length+1-sai)+'/'+(r.length+1)+' đạt'); console.log('lỗi', loi); await b.close(); })();
