// 3.177 (anh chốt 13/10) — 📦 MINI APP Giao dịch xã: xuất 1 file HTML từ app (bộ GIẢ tests/gianho31 + TK 104 giả), mở file mini:
//   in 04/TD · 12/GDX theo điểm GD, Giấy lĩnh TK 104 chọn tổ trưởng (điền tên, TK 104, địa chỉ), ▲▼, mẫu trắng; số liệu xáo (không đọc được tên tổ trưởng trong mã);
//   không gói khách TK 105; hết hạn → khóa hết (cả khi chỉnh giờ lại); lùi giờ máy → khóa; file bị sửa hạn → khóa; còn < 7 ngày → nhắc.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os');
const lech = n => `(()=>{const D=Date, off=${n}*864e5; function X(...a){ if(!(this instanceof X)) return D(); return a.length ? new D(...a) : new D(D.now()+off); }
  X.prototype = D.prototype; X.now = () => D.now()+off; X.UTC = D.UTC; X.parse = D.parse; window.Date = X; })();`;
(async()=>{ const b=await chromium.launch(); const loi=[], R=[];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const X = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.gdx; delete D.cauHinh.dmTK104;
   gdxC().danhSachCanBo = ['Cán Bộ Giả A','Cán Bộ Giả B','Cán Bộ Giả C'];
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(500);
   const ds = gdxDsDiem(), d = ds.find(x=>x.to.length>=2), t = d.to[0];
   D.cauHinh.dmTo = {to:{}, diem:{}, luc:'', ten:'gia'}; D.cauHinh.dmTo.to[t.maTo] = {tt:t.tenTo, tk104:'9990001112223'};   /* TK 104 GIẢ */
   const nut = [...document.querySelectorAll('.gdx2-nut button')].some(x=>/Mini app/.test(x.textContent));
   gdxMiniHop(60); await w(100); const hop = document.querySelector('#hop').textContent;
   const G = gdxMiniGoi(), M = gdxMiniHTML(30, G);
   /* khách TK 105 (không phải tổ trưởng) không được gói */
   const tens = new Set(); ds.forEach(x=>x.to.forEach(o=>tens.add(o.tenTo)));
   let khach = ''; Object.keys(TO_K.kh).some(m=>(TO_K.kh[m]||[]).some(o=>{ if(o.ten && !tens.has(o.ten) && o.ten.length>8){ khach = o.ten; return true; } return false; }));
   dongHop();
   return {nut, hop, html:M.html, han:M.han, d:{k:d.k, ten:d.tenDiem, ma:d.maDiem, ngay:d.ngayGD, nTo:d.to.length}, t:{ten:t.tenTo, ma:t.maTo}, nDiem:ds.length, khach, tens:[...tens].slice(0, 30), canBo:gdxC().danhSachCanBo};
 }, files);
 ok('tab Giao dịch xã có nút 📦 Mini app; hộp xuất cho chọn 30 / 60 / 90 ngày, ghi rõ gói gì, không gói khách TK 105', X.nut && /30 ngày/.test(X.hop) && /90 ngày/.test(X.hop) && /Không gói số liệu khách TK 105/.test(X.hop.replace(/\s+/g, ' ')));
 const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mini-')), f = path.join(tmp, 'mini.html'); fs.writeFileSync(f, X.html);
 ok('file mini gọn (< 400 KB), một file, không gọi mạng (không <script src>, không link CSS ngoài)', X.html.length < 400e3 && !/<script[^>]+src=/i.test(X.html) && !/<link /i.test(X.html), Math.round(X.html.length/1024)+' KB');
 ok('số liệu xáo mã: mở bằng Notepad không thấy tên tổ trưởng, tên điểm, TK 104, tên cán bộ', X.tens.every(n=>!n || X.html.indexOf(n)<0) && X.html.indexOf('9990001112223')<0 && X.html.indexOf(X.d.ten)<0 && X.canBo.every(n=>X.html.indexOf(n)<0));
 ok('không gói khách TK 105 (tên khách không phải tổ trưởng không có trong số liệu)', !!X.khach && X.html.indexOf(X.khach)<0, X.khach ? 'có tên khách giả để thử' : 'không tìm được khách để thử');

 /* ---- mở file mini (ngày thật) ---- */
 const ctx = await b.newContext({viewport:{width:1400,height:900}}); const mo = async(n, file)=>{ const q = await ctx.newPage(); q.on('pageerror',e=>loi.push('mini: '+e.message));
   if(n) await q.addInitScript(lech(n)); await q.addInitScript(()=>{ window.__in = 0; window.print = ()=>{ window.__in++; }; });
   await q.goto('file://'+(file||f)); await q.waitForTimeout(500); return q; };
 let q = await mo(0);
 const m = await q.evaluate(async(X)=>{ const w=t=>new Promise(r=>setTimeout(r,t)), o = {};
   const fd = () => document.getElementById('mn-khung').contentDocument, chu = () => fd().body.textContent.replace(/\s+/g, ' ');
   o.mo = !!document.getElementById('mn-trai') && !document.querySelector('.mn-khoa');
   o.han = document.querySelector('.mn-han').textContent;
   o.diem = document.querySelectorAll('.mn-diem option').length;
   mn.chonDiem(X.d.k); await w(100);
   o.t04 = chu(); o.ngayGD = gdxNgayToi(X.d.ngay, 1)[0];
   o.tien0 = String(document.getElementById('mn-tien04').value); mn.buoc04tien(5000000); await w(50); o.tien1 = document.getElementById('mn-tien04').value;
   o.sheets04 = fd().querySelectorAll('.sheet-a4').length;
   mn.mau('m12'); await w(100); mn.dat('m12TenToOption', 'fill', 1); mn.dat('m12GDV', 'Cán Bộ Giả A', 1); await w(100); o.t12 = chu();
   o.gdvKSV = [...document.querySelectorAll('.mn-hang')].find(h=>/KSV/.test(h.textContent)).querySelectorAll('option').length;
   mn.mau('gl'); await w(100); mn.glLoai('104'); await w(100);
   const q = document.getElementById('mn-q'); q.value = X.tt; mn.tim(X.tt); await w(50);
   o.gy = document.querySelectorAll('#mn-gy button').length;
   q.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(150);
   o.formTen = document.querySelector('.mn-form input[data-k="ten"]').value; o.formTK = document.querySelector('.mn-form input[data-k="tk"]').value; o.formDC = document.querySelector('.mn-form input[data-k="diaChi"]').value;
   mn.glBuoc(100000); mn.glBuoc(100000); await w(50); o.glTien = document.getElementById('mn-tiengl').value;
   o.tgl = chu(); o.chim = !!fd().querySelector('.gl-chim.chim-nhat');
   mn.inNgay(); await w(500); o.inGL = document.getElementById('mn-in').contentWindow.__in!==undefined ? 1 : 1; o.lamTrong = /in người khác/.test(document.querySelector('.mn-in').textContent);
   mn.lamTrong(); await w(50); o.trong = !document.querySelector('.mn-form input[data-k="ten"]').value;
   mn.inTrang(2); await w(400); const di = document.getElementById('mn-in').contentDocument; o.trang2 = di.querySelectorAll('.gl-trang').length===2 && !!di.querySelector('.gl-x2') && /A4 portrait/.test(di.head.textContent);
   o.luu = JSON.parse(localStorage.getItem('gdxmini_c') || '{}');
   return o; }, {d:X.d, tt:X.t.ten.split(' ').slice(-2).join(' ').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase()});
 ok('mở file mini → giao diện chạy, hiện "Dùng tới ngày …" đúng hạn đã chọn', m.mo && m.han.indexOf(X.han.split('-').reverse().join('/'))>=0, m.han);
 ok('chọn điểm GD: đủ điểm như app (theo xã)', m.diem===X.nDiem, m.diem+'/'+X.nDiem);
 ok('04/TD: kính gửi UBND xã, địa điểm = điểm GD, ngày phát = ngày GD gần nhất, 2 bản; ▲ số tiền bước 5 triệu', /Kính gửi: Ủy ban nhân dân/.test(m.t04) && m.t04.indexOf('Điểm giao dịch '+X.d.ten)>=0 &&
   (!m.ngayGD || m.t04.indexOf('ngày '+m.ngayGD.slice(8)+' tháng '+m.ngayGD.slice(5,7))>=0) && m.sheets04===2 && +m.tien1.replace(/\D/g,'') - +m.tien0.replace(/\D/g,'') === 5000000, m.tien0+' → '+m.tien1);
 ok('12/GDX: tên điểm, mã điểm, in sẵn tên tổ trưởng, GDV in đậm', m.t12.indexOf('Mã điểm giao dịch: '+X.d.ma)>=0 && m.t12.indexOf(X.t.ten)>=0 && /Giao dịch viên: Cán Bộ Giả A/.test(m.t12));
 ok('12/GDX: GDV đã chọn không còn trong ô KSV (chọn loại trừ)', m.gdvKSV===X.canBo.length, m.gdvKSV);
 ok('Giấy lĩnh TK 104: gõ tên tổ trưởng không dấu → Enter → điền tên, TK 104 (giả), địa chỉ', m.gy>=1 && m.formTen===X.t.ten && m.formTK==='9990001112223' && /tỉnh Tây Ninh/.test(m.formDC), m.formTen+' · '+m.formTK);
 ok('Giấy lĩnh: ▲ bước 100 nghìn, bằng chữ trên giấy, chữ chìm mức Nhạt', m.glTien==='200.000' && m.tgl.indexOf('Hai trăm nghìn đồng.')>=0 && m.tgl.indexOf('9990001112223')>=0 && m.chim, m.glTien);
 ok('In Giấy lĩnh → nút "Làm trống — in người khác"; bấm → form trống', m.lamTrong && m.trong);
 ok('In mẫu trắng 2 mẫu / A4 (cắt đôi)', m.trang2);
 ok('lựa chọn lưu trên máy (localStorage) — mẫu, loại TK, GDV', m.luu.mau==='gl' && m.luu.glLoai==='104' && m.luu.m12GDV==='Cán Bộ Giả A');
 await q.close();
 /* mở lại → giữ lựa chọn */
 q = await mo(0); const giu = await q.evaluate(()=>document.querySelector('.mn-mau .mn-c.bat').textContent); ok('mở lại file → giữ lựa chọn lần trước', /Giấy lĩnh/.test(giu), giu); await q.close();
 /* còn < 7 ngày → nhắc */
 q = await mo(26); const nh = await q.evaluate(()=>{ const e = document.querySelector('.mn-han'); return e ? e.className+' '+e.textContent : 'khóa'; });
 ok('còn < 7 ngày → dòng hạn tô vàng + nhắc liên hệ lấy bản mới', /gan/.test(nh) && /còn \d ngày/.test(nh), nh); await q.close();
 /* lùi giờ máy về trước ngày đã mở → khóa */
 q = await mo(-3); const lui = await q.evaluate(()=>({khoa:!!document.querySelector('.mn-khoa'), t:document.body.textContent, data:typeof mn}));
 ok('lùi giờ máy về trước lần mở trước → khóa (không giải mã số liệu)', lui.khoa && /sớm hơn lần mở trước/.test(lui.t) && lui.data==='undefined'); await q.close();
 /* quá hạn → khóa hết; chỉnh giờ lại cũng vẫn khóa */
 q = await mo(31); const het = await q.evaluate(()=>({khoa:!!document.querySelector('.mn-khoa'), t:document.body.textContent, data:typeof mn}));
 ok('quá hạn → khóa hết: "Bản này hết hạn ngày …, liên hệ anh Nhân để lấy bản mới"', het.khoa && het.data==='undefined' && het.t.indexOf('Bản này hết hạn ngày '+X.han.split('-').reverse().join('/')+', liên hệ anh Nhân để lấy bản mới')>=0); await q.close();
 q = await mo(0); const het2 = await q.evaluate(()=>!!document.querySelector('.mn-khoa') && typeof mn==='undefined'); ok('đã hết hạn rồi chỉnh giờ máy về trước → vẫn khóa', het2); await q.close();
 /* sửa hạn trong file → khóa (không giải được số liệu) */
 const f2 = path.join(tmp, 'sua.html'), han2 = '2099-12-31'; fs.writeFileSync(f2, X.html.replace('var MINI_HAN = "'+X.han+'"', 'var MINI_HAN = "'+han2+'"'));
 const ctx2 = await b.newContext(); const q2 = await ctx2.newPage(); q2.on('pageerror',e=>loi.push('mini2: '+e.message)); await q2.goto('file://'+f2); await q2.waitForTimeout(400);
 const sua = await q2.evaluate(()=>({khoa:!!document.querySelector('.mn-khoa'), t:document.body.textContent}));
 ok('sửa ngày hạn trong file → khóa (file bị sửa), không mở được số liệu', X.html.indexOf('var MINI_HAN = "'+X.han+'"')>=0 && sua.khoa && /bị sửa/.test(sua.t));
 /* điện thoại */
 const q3 = await (await b.newContext({viewport:{width:390,height:844}})).newPage(); q3.on('pageerror',e=>loi.push('mini3: '+e.message)); await q3.goto('file://'+f); await q3.waitForTimeout(500);
 const tran = await q3.evaluate(()=>document.documentElement.scrollWidth - window.innerWidth); ok('điện thoại 390 px: mini không tràn ngang', tran<=1, tran+' px');
 fs.rmSync(tmp, {recursive:true, force:true});
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); const dat = R.filter(x=>x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); })();
