// 3.148 — Nút & trạng thái (anh chốt ý 10, 12, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md):
//   nút vừa chữ (không giãn), hộp thoại Đóng / Thôi bên trái · nút chính bên phải, nút Thêm xanh, bỏ 🗑 cuối dòng,
//   1 nơi trạng thái (đèn + thanh màu + chữ) ở chân thanh bên / thanh đáy điện thoại, tin không nổi đè nút, 🔔 20 tin, NhanNT trên thanh bên,
//   máy tính bỏ thanh đáy (trừ khi cần nút của nó). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const mo = async (vp, mobile) => { const p = await b.newPage({viewport:vp, isMobile:!!mobile, hasTouch:!!mobile}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){}
     D.vanBan = [{id:'v1', nhom:'vanBan', tenMoi:'2026-10-01 1/A Thử.pdf', soHieu:'1/A', ngay:'2026-10-01', trichYeu:'Thử', mang:'Tín dụng', ctrinh:['HN'], the:[]}]; luu(); ve(); });
   return p; };
 const p = await mo({width:1536, height:730});
 const r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)), o={};
   const hien = e => !!e && getComputedStyle(e).display!=='none' && e.getBoundingClientRect().width>0;
   doiNgan(1); await w(300);
   o.rac = !!document.querySelector('#ds-vb .d2 .nut button[title="Xóa vào thùng rác"]');
   o.them = getComputedStyle(document.querySelector('.nut-them')).backgroundColor;
   const nho = document.querySelector('.dau-tab .nho, .hang-nut .nho, .nut-bot');
   /* nút trong hộp thoại */
   hoi('Xóa thử?', 'Nội dung', 'Xóa', function(){}); await w(200);
   const bs = Array.from(document.querySelectorAll('#hop-in .hang-nut button')), thoi = bs.find(x=>/Thôi|Đóng/.test(x.textContent)), chinh = bs.find(x=>x.classList.contains('chinh'));
   o.hop = thoi && chinh ? {thoiX:Math.round(thoi.getBoundingClientRect().left), chinhX:Math.round(chinh.getBoundingClientRect().left), rongMax:Math.max.apply(null, bs.map(x=>Math.round(x.getBoundingClientRect().width)))} : null;
   o.flex = getComputedStyle(chinh || bs[0]).flexGrow;
   /* tin khi đang mở hộp thoại → vẫn nổi trên hộp */
   bao('Tin trong hộp'); o.baoHop = document.getElementById('bao').classList.contains('hien'); dongHop(); document.getElementById('bao').classList.remove('hien');
   /* tin thường → ô trạng thái, không nổi */
   bao('Đã nạp Mẫu 31 T9/2026'); await w(50);
   const k = document.getElementById('tt-khoi');
   o.tin = {noi:document.getElementById('bao').classList.contains('hien'), chu:k.querySelector('.tt-chu').textContent, trongBen:!!k.closest('#thanh-ben')};
   baoLoi('Lỗi thử'); o.den = k.querySelector('.tt-den').className;
   batChay(false, 'Đang đọc file…'); tienChay(40); await w(50);
   o.chay = {den:k.querySelector('.tt-den').className, chu:k.querySelector('.tt-chu').textContent, thanh:k.querySelector('.tt-thanh').className, rong:k.querySelector('.tt-thanh i').style.width, hopDangLam:hien(document.getElementById('danglam'))};
   await w(500); o.dangLamKhongDung = getComputedStyle(document.getElementById('danglam')).display;
   tatChay(); await w(50); o.sau = {den:k.querySelector('.tt-den').className, thanh:k.querySelector('.tt-thanh').className};
   k.querySelector('.tt-chu').click(); await w(200); o.ds = (document.querySelector('#hop-in .tt-ds')||{}).textContent||''; dongHop();
   /* thanh bên: NhanNT, chip Drive / bộ nhớ đi theo; thanh đáy ẩn ở tab không cần */
   o.tg = /NhanNT/.test(document.getElementById('thanh-ben').textContent);
   o.chip = !!document.querySelector('#thanh-ben #so-lieu #chip-drive');
   doiNgan(1); await w(200); o.dayVB = getComputedStyle(document.querySelector('.day')).display;
   doiNgan(6); await w(200); o.dayCho = getComputedStyle(document.querySelector('.day')).display;
   /* Tổ: nút In bảng / Excel không giãn */
   doiNgan(0); await w(100);
   return o; });
 ok('bỏ nút 🗑 cuối dòng văn bản', !r.rac);
 ok('nút ＋ Thêm có màu xanh nhạt', r.them==='rgb(234, 242, 250)', r.them);
 ok('hộp thoại: Thôi bên trái, nút chính bên phải; nút không giãn (≤ 240 px)', r.hop && r.hop.thoiX < r.hop.chinhX && r.hop.rongMax<=240 && r.flex==='0', JSON.stringify(r.hop)+' flex '+r.flex);
 ok('đang mở hộp thoại: tin vẫn nổi trên hộp', r.baoHop);
 ok('tin thường → ô trạng thái ở chân thanh bên, không nổi đè', !r.tin.noi && r.tin.chu==='Đã nạp Mẫu 31 T9/2026' && r.tin.trongBen, JSON.stringify(r.tin));
 ok('báo lỗi → đèn đỏ', /\bdo\b/.test(r.den), r.den);
 ok('đang chạy → đèn vàng, chữ việc đang chạy, thanh màu 40 %', /vang/.test(r.chay.den) && r.chay.chu==='Đang đọc file…' && /chay/.test(r.chay.thanh) && r.chay.rong==='40%', JSON.stringify(r.chay));
 ok('việc không có nút Dừng: không thả hộp "Đang xử lý…" che đỉnh màn', r.dangLamKhongDung==='none', r.dangLamKhongDung);
 ok('xong việc → hết vàng, thanh ẩn', !/vang/.test(r.sau.den) && !/chay/.test(r.sau.thanh), JSON.stringify(r.sau));
 ok('bấm dòng chữ → 🔔 danh sách tin gần đây', /Đã nạp Mẫu 31/.test(r.ds) && /Lỗi thử/.test(r.ds));
 ok('NhanNT trên thanh bên; chip Drive / bộ nhớ dời vào chân thanh bên', r.tg && r.chip);
 ok('máy tính: thanh đáy ẩn ở Văn bản, hiện ở khay chờ duyệt', r.dayVB==='none' && r.dayCho!=='none', r.dayVB+' / '+r.dayCho);
 /* Tổ TK&VV: In bảng / Excel không dài như lỗi */
 const w2 = await p.evaluate(async()=>{ const ra = []; for(const f of [()=>doiNgan(1), ()=>moNapSL(), ()=>{ slDoiTab('to'); doiNgan(7); }, ()=>{ slDoiTab('kt'); doiNgan(7); }]){ f(); await new Promise(r=>setTimeout(r,700)); Array.from(document.querySelectorAll('.trang.hien .nho')).forEach(x=>{ const w = Math.round(x.getBoundingClientRect().width); if(w) ra.push(w); }); } return ra; });
 ok('Văn bản, Nạp & KT, Tổ, KTGS: không nút .nho nào rộng quá 240 px', w2.length>3 && w2.every(x=>x<=240), w2.length+' nút · lớn nhất '+Math.max.apply(null, w2));
 /* iPhone: ô trạng thái trong thanh đáy */
 const q = await mo({width:390, height:844}, true);
 const t = await q.evaluate(()=>{ bao('Đã lưu'); const k = document.getElementById('tt-khoi'); return {day:!!(k && k.closest('.day')), noi:document.getElementById('bao').classList.contains('hien'), tran:document.documentElement.scrollWidth>window.innerWidth+1}; });
 ok('iPhone: ô trạng thái nằm trong thanh đáy, tin không nổi, không tràn ngang', t.day && !t.noi && !t.tran, JSON.stringify(t));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = o.filter(x=>x[0]==='✗').length; console.log((o.length-sai)+'/'+o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
