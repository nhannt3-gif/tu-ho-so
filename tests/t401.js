// t401 (3.535, anh 14/11 "trên điện thoại em làm lại cho phù hợp… dùng nhiều nhất là xem văn bản, tra cứu KH… gửi cả VB hay 1 trang"):
//   điện thoại 360 / 390 / 430 px — Tra cứu KH 1 ô tìm ở đầu, lọc địa bàn gọn bấm mở, 📞 Gọi; Văn bản thẻ gọn, xem: nút "📤 Gửi trang này" tách đúng 1 trang, "📤 Gửi cả VB".
//   Máy tính 1366: không đổi (ô tìm chung còn, không nút gửi trang, không 📞). Dữ liệu GIẢ (tests/gianho31 + PDF dựng tại chỗ).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (W, H, dt) => { const ctx = await b.newContext(dt ? {viewport:{width:W, height:H}, isMobile:true, hasTouch:true,
     userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'} : {viewport:{width:W, height:H}});
   const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(W+': '+e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
     kyChungDoi('2026-08');
     for(let i=1;i<=3;i++){ const d = await PDFLib.PDFDocument.create(); for(let t=1;t<=3;t++) d.addPage([595,842]); const by = await d.save(); const id='vgia'+i; await luuFile(id, new Blob([by],{type:'application/pdf'}));
       D.vanBan.push({id, nhom:'vanBan', tenMoi:'2026-10-0'+i+' '+i+'/NHCS-TD Van ban gia '+i+'.pdf', tenCu:'a'+i+'.pdf', duoi:'pdf', soHieu:i+'/NHCS-TD', ngay:'2026-10-0'+i, trichYeu:'Văn bản giả '+i, mang:'Tín dụng', soTrang:3, co:by.length}); }
     luu(); window.GUI = []; navigator.canShare = ()=>true; navigator.share = async x=>{ for(const f of x.files){ const d = await PDFLib.PDFDocument.load(await f.arrayBuffer()); GUI.push({ten:f.name, trang:d.getPageCount()}); } }; }, files);
   return {p, ctx}; };
 const W8 = t=>new Promise(r=>setTimeout(r,t));
 for(const [W, H] of [[360, 740], [390, 844], [430, 932]]){
   const {p, ctx} = await mo(W, H, true);
   await p.evaluate(async()=>{ dhMuc('tra').mo(); await new Promise(r=>setTimeout(r,2000)); });
   const t = await p.evaluate(()=>{ const r = e=>e && e.getBoundingClientRect(), vis = e=>!!e && e.offsetParent!==null && getComputedStyle(e).display!=='none';
     const tim = document.getElementById('sl-tim'), loc = document.querySelector('#tc-cay .loc-khoi'), sel = document.querySelector('#tc-cay .pv-hang1');
     return {tran:document.documentElement.scrollWidth - innerWidth, chung:vis(document.querySelector('.tim-bao')), timTren: r(tim).top < r(loc).top, selAn:!vis(sel), dong1:r(document.querySelector('#sl-kq .sl-kq-dong')).top}; });
   ok(W+' Tra cứu: không tràn ngang, ẩn ô tìm chung (tìm văn bản), ô tìm khách nằm trên lọc địa bàn', t.tran<=1 && !t.chung && t.timTren, JSON.stringify(t));
   ok(W+' Tra cứu: lọc địa bàn gọn 1 dòng (ô chọn ẩn), khách đầu tiên lên trong 330 px', t.selAn && t.dong1 < 330, JSON.stringify(t));
   await p.click('#tc-cay .pv-dau-nhan'); await W8(300);
   const m = await p.evaluate(()=>{ const s = document.querySelector('#tc-cay .pv-hang1'); return !!s && s.offsetParent!==null; });
   await p.click('#tc-cay .pv-dau-nhan'); await W8(300);
   const g = await p.evaluate(()=>{ const s = document.querySelector('#tc-cay .pv-hang1'); return !!s && s.offsetParent!==null; });
   ok(W+' Tra cứu: bấm "LỌC ĐỊA BÀN" mở 3 ô chọn, bấm lại gọn', m && !g, m+'/'+g);
   await p.evaluate(async()=>{ document.querySelector('#sl-kq .sl-kq-dong').click(); await new Promise(r=>setTimeout(r,800)); });
   const goi = await p.evaluate(()=>{ const a = document.querySelector('#hop .tc-goi'); return a ? {href:a.getAttribute('href'), hien:a.offsetParent!==null} : null; });
   ok(W+' thẻ khách: có nút 📞 Gọi (tel:)', !!goi && /^tel:\d{9,11}$/.test(goi.href) && goi.hien, JSON.stringify(goi));
   await p.evaluate(()=>{ try{dongHop()}catch(e){} dhMuc('1').mo(); }); await W8(1500);
   const v = await p.evaluate(()=>{ const d = document.querySelector('#tr1 .d2'); return {tran:document.documentElement.scrollWidth - innerWidth, cao:d ? d.offsetHeight : 0, ico:d && d.querySelector('.ico').offsetParent!==null}; });
   ok(W+' Văn bản: không tràn, thẻ gọn (≤ 150 px, bỏ biểu tượng 📄 thừa)', v.tran<=1 && v.cao>0 && v.cao<=150 && !v.ico, JSON.stringify(v));
   await p.evaluate(()=>moXem('vgia2')); await W8(1800);
   const x = await p.evaluate(()=>({n:document.querySelectorAll('#x-than .dtm-gui1').length, ca:(document.querySelector('#xem [data-lenh="khung.guiFileMenu"]')||{}).textContent, zoom:document.querySelector('#xem .xem-dau .zoom').offsetParent!==null, tran:document.querySelector('#xem .xem-day').scrollWidth - document.querySelector('#xem .xem-day').clientWidth}));
   ok(W+' Xem VB: mỗi trang có "📤 Gửi trang này", nút dưới "📤 Gửi cả VB", bỏ nhóm zoom trùng, thanh dưới không tràn', x.n===3 && /Gửi cả VB/.test(x.ca) && !x.zoom && x.tran<=1, JSON.stringify(x));
   await p.evaluate(()=>document.querySelectorAll('#x-than .dtm-gui1')[1].click()); await W8(1500);
   const s = await p.evaluate(()=>({gui:GUI.slice(), chon:Object.keys(trangChon).length}));
   ok(W+' "📤 Gửi trang này" (trang 2) → bảng chia sẻ nhận 1 file PDF đúng 1 trang, tên có _trang-2; không để lại trang đã chọn', s.gui.length===1 && s.gui[0].trang===1 && /_trang-2\.pdf$/.test(s.gui[0].ten) && s.chon===0, JSON.stringify(s));
   await p.evaluate(()=>doiChonTrang(XEM.lon.khung[0], 1)); const n1 = await p.evaluate(()=>document.getElementById('nut-gui-trang').textContent);
   ok(W+' tích 1 trang → nút "📤 Gửi 1 trang"', /Gửi 1 trang/.test(n1), n1);
   if(W===390){   /* 3.541 (anh "tinh chỉnh cho màn iPhone, tận dụng vuốt mượt"): lọc gọn mọi màn · chip GDX 1 dòng cuộn · vuốt ngang đổi tab · vuốt xuống đóng hộp */
     const g = await p.evaluate(async()=>{ try{dongXem()}catch(e){} try{dongHop()}catch(e){} document.body.classList.remove('dtm-loc-mo'); const r = {};
       for(const k of ['to', 'gdx', 'kt']){ dhMuc(k).mo(); await new Promise(z=>setTimeout(z,1500)); const sel = document.querySelector('section.trang.hien .pv-cay .pv-hang1'), dan = document.querySelector('section.trang.hien .pv-cay .pv-dan');
         r[k] = {an:!sel || sel.offsetParent===null, dan:dan ? dan.textContent.replace(/\s+/g,' ').slice(0, 40) : ''}; }
       dhMuc('gdx').mo(); await new Promise(z=>setTimeout(z,1200)); const m = [...document.querySelectorAll('section.trang.hien .gdx2-mau')].find(x=>x.offsetParent);
       r.chip = m ? {cao:m.offsetHeight, cuon:m.scrollWidth > m.clientWidth} : null; return r; });
     ok('390 lọc địa bàn gọn 1 dòng ở Tổ TK&VV / Giao dịch xã / KTGS, dòng gọn ghi phạm vi (🏠 …)', ['to','gdx','kt'].every(k=>g[k].an && /🏠/.test(g[k].dan)), JSON.stringify(g));
     ok('390 Giao dịch xã: 15 nút mẫu 1 dòng cuộn ngang (cao < 50 px)', g.chip && g.chip.cao < 50 && g.chip.cuon, JSON.stringify(g.chip));
     const nh = await p.evaluate(async()=>{ const r = {}; for(const [k, sel] of [['to', '.to-nhom'], ['kt', '.kt-to-nhom']]){ dhMuc(k).mo(); await new Promise(z=>setTimeout(z,1500));
       r[k] = [...document.querySelectorAll('section.trang.hien '+sel)].filter(x=>x.offsetParent).map(x=>x.offsetHeight); } return r; });
     ok('390 Tổ TK&VV (Khách / Cần xử lý) + KTGS (Món / Kiểu / Số hộ): mỗi nhóm chip 1 dòng (≤ 46 px)', nh.to.length>=2 && nh.kt.length>=2 && nh.to.concat(nh.kt).every(h=>h<=46), JSON.stringify(nh));
     const tab = await p.evaluate(async()=>{ doiNgan(0); dtVe(); await new Promise(z=>setTimeout(z,600)); const el = document.querySelector('section.trang.hien');
       const tc = (x, y) => new Touch({identifier:1, target:el, clientX:x, clientY:y}), ban = (loai, x, y) => el.dispatchEvent(new TouchEvent(loai, {bubbles:true, cancelable:true, touches:loai==='touchend' ? [] : [tc(x, y)], changedTouches:[tc(x, y)]}));
       const truoc = dtDang(); ban('touchstart', 300, 400); ban('touchend', 120, 410); await new Promise(z=>setTimeout(z,1200)); const sau = dtDang();
       ban('touchstart', 120, 400); ban('touchend', 320, 405); await new Promise(z=>setTimeout(z,1200)); const lui = dtDang();
       ban('touchstart', 10, 400); ban('touchend', 300, 400); await new Promise(z=>setTimeout(z,600)); return {truoc, sau, lui, mep:dtDang()}; });
     ok('390 vuốt trái: Hôm nay → Tra cứu; vuốt phải: về Hôm nay; vuốt từ sát mép trái (vuốt lùi Safari) không đổi tab', tab.truoc==='0' && tab.sau==='tra' && tab.lui==='0' && tab.mep==='0', JSON.stringify(tab));
     const hop = await p.evaluate(async()=>{ dtThem(); await new Promise(z=>setTimeout(z,400)); const hi = document.querySelector('#hop .hop-in'), y0 = hi.getBoundingClientRect().top+30;
       const tc = (y) => new Touch({identifier:2, target:hi, clientX:200, clientY:y}), ban = (loai, y) => hi.dispatchEvent(new TouchEvent(loai, {bubbles:true, touches:loai==='touchend' ? [] : [tc(y)], changedTouches:[tc(y)]}));
       ban('touchstart', y0); ban('touchmove', y0+40); ban('touchend', y0+40); await new Promise(z=>setTimeout(z,400)); const conMo = document.getElementById('hop').classList.contains('hien');
       ban('touchstart', y0); ban('touchmove', y0+80); ban('touchmove', y0+160); ban('touchend', y0+160); await new Promise(z=>setTimeout(z,500));
       return {conMo, dong:!document.getElementById('hop').classList.contains('hien')}; });
     ok('390 vuốt xuống hộp ☰: kéo ít (40 px) trượt về, kéo 160 px đóng hộp', hop.conMo && hop.dong, JSON.stringify(hop)); }
   if(W===390){   /* 3.536 (anh "giữ trong ngày thôi"): VB đã xem cất máy chỉ giữ trong ngày — ngày mới dọn bản trong máy của VB đã lên Drive */
     const d = await p.evaluate(async()=>{ try{dongXem()}catch(e){} try{dongHop()}catch(e){}
       const B = ()=>new Blob(['%PDF-1.4'], {type:'application/pdf'});
       D.vanBan.push({id:'vcu', nhom:'vanBan', tenMoi:'VB xem hôm qua.pdf', duoi:'pdf', ngay:'2026-11-01', driveId:'dcu'}, {id:'vnay', nhom:'vanBan', tenMoi:'VB xem hôm nay.pdf', duoi:'pdf', ngay:'2026-11-02', driveId:'dnay'},
         {id:'vmay', nhom:'vanBan', tenMoi:'VB chỉ có trong máy.pdf', duoi:'pdf', ngay:'2026-11-03'}); luu();
       for(const id of ['vcu', 'vnay', 'vmay']) await luuFile(id, B());
       const h = ngayISO(nay()); localStorage.setItem('tuhoso_dt_xem', JSON.stringify({vcu:'2026-01-01'}));
       moXem('vnay'); await new Promise(r=>setTimeout(r,800)); try{dongXem()}catch(e){}
       const ghi = JSON.parse(localStorage.getItem('tuhoso_dt_xem'));
       const n = await DTM.don(); const con = {}; for(const id of ['vcu', 'vnay', 'vmay']) con[id] = !!(await docFile(id));
       return {ghi, h, n, con}; });
     ok('390 VB đã xem giữ trong ngày: mở VB → ghi ngày xem hôm nay (bỏ ngày cũ); dọn: xóa bản máy VB đã lên Drive xem hôm trước, giữ VB xem hôm nay + VB chỉ có trong máy',
       d.ghi.vnay===d.h && !d.ghi.vcu && d.n===1 && !d.con.vcu && d.con.vnay && d.con.vmay, JSON.stringify(d)); }
   await ctx.close(); }
 /* 3.537 (ảnh iPhone anh: lọc không mở được, thanh dưới kiểu cũ — JS điện thoại không chạy lúc nạp): nạp ở 800 px rồi thu về 390 → phần điện thoại tự khởi động */
 { const {p, ctx} = await mo(800, 900, true); await p.setViewportSize({width:390, height:844}); await W8(2500);
   await p.evaluate(async()=>{ dhMuc('tra').mo(); await new Promise(r=>setTimeout(r,2000)); });
   const a = await p.evaluate(()=>({on:document.body.classList.contains('dtm-on'), nut:[...document.querySelectorAll('#thanh-duoi a')].map(x=>x.textContent.trim()).join('|')}));
   await p.click('#tc-cay .pv-dau-nhan'); await W8(300);
   const m = await p.evaluate(()=>document.querySelector('#tc-cay .pv-hang1').offsetParent!==null);
   ok('nạp ở màn rộng rồi thu về 390 px: phần điện thoại tự khởi động (body.dtm-on, thanh dưới Tra cứu · Văn bản), bấm LỌC ĐỊA BÀN mở được', a.on && /Tra cứu/.test(a.nut) && /Văn bản/.test(a.nut) && m, JSON.stringify([a, m]));
   await ctx.close(); }
 /* chưa có JS điện thoại (body không có dtm-on) → lọc KHÔNG bị gọn (không kẹt) */
 { const {p, ctx} = await mo(390, 844, true); await p.evaluate(async()=>{ document.body.classList.remove('dtm-on'); dhMuc('tra').mo(); await new Promise(r=>setTimeout(r,2000)); });
   const v = await p.evaluate(()=>document.querySelector('#tc-cay .pv-hang1').offsetParent!==null);
   ok('390 px khi JS điện thoại chưa chạy: lọc địa bàn hiện đủ ô chọn (không kẹt gọn)', v); await ctx.close(); }
 /* máy tính: không đổi */
 { const {p, ctx} = await mo(1366, 900, false);
   await p.evaluate(async()=>{ dhMuc('tra').mo(); await new Promise(r=>setTimeout(r,2000)); });
   const d = await p.evaluate(()=>({chung:document.querySelector('.tim-bao').offsetParent!==null, sel:document.querySelector('#tc-cay .pv-hang1').offsetParent!==null}));
   await p.evaluate(async()=>{ dhMuc('1').mo(); await new Promise(r=>setTimeout(r,1200)); moXem('vgia1'); await new Promise(r=>setTimeout(r,1800)); });
   const x = await p.evaluate(()=>({n:document.querySelectorAll('.dtm-gui1').length, ca:document.querySelector('#xem [data-lenh="khung.guiFileMenu"]').textContent.trim()}));
   x.don = await p.evaluate(()=>typeof DTM==='undefined' || !DTM_HEP);
   ok('máy tính 1366: không chạy dọn bản trong máy (chỉ điện thoại)', x.don);
   ok('máy tính 1366: Tra cứu giữ ô tìm chung + 3 ô chọn lọc; xem VB không thêm nút gửi trang, nút "📤 Gửi" như cũ', d.chung && d.sel && x.n===0 && x.ca==='📤 Gửi', JSON.stringify([d, x]));
   await ctx.close(); }
 ok('không lỗi trang', !loi.length, loi.slice(0,3).join(' | '));
 console.log(o.join('\n')); const tr = o.filter(x=>x[0]==='✗').length; console.log(tr ? tr+' ✗' : '✓ t401 đạt'); await b.close(); process.exit(tr ? 1 : 0); })();
