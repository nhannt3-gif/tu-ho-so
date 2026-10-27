// 3.151 — Thanh lọc chung tab file (anh chốt ý 6a, 9, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md):
//   1 hàng: ＋ Thêm · 🗑 Xóa · ⚲ Lọc (n) ▾ · ⇅ Sắp xếp ▾ · ☰ Kiểu xem ▾ · chip đang lọc ✕ · số mục · ⋯ · ❓ (Văn bản, Biểu mẫu, Scan dùng chung);
//   bỏ hàng chip lọc nhanh / hàng Sắp xếp; kiểu xem ▦ Bảng (thay ▤ Gọn) — cột cố định, dòng ~30 px, bấm tiêu đề sắp xếp, ô tích, ↑↓. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const mo = async (vp, mobile) => { const p = await b.newPage({viewport:vp, isMobile:!!mobile, hasTouch:!!mobile}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'?may=1'); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){}
     const vb = (i, sh, ngay, mang, ct, ty) => ({id:'v'+i, nhom:'vanBan', tenMoi:ngay+' '+sh+' '+ty+'.pdf', soHieu:sh, ngay:ngay, trichYeu:ty, tenVB:ty, mang:mang, ctrinh:ct, tag:['Tổ TK&VV'], driveId:i%2?'d'+i:''});
     D.vanBan = [vb(1,'12/HD-NHCS','2026-03-01','Tín dụng',['HN'],'Hướng dẫn cho vay hộ nghèo'), vb(2,'5/QĐ-HĐQT','2025-07-10','Kế toán',['HCN'],'Quy định hạch toán'),
       vb(3,'88/NHCS-TD','2026-09-20','Tín dụng',['HSSV'],'Cho vay học sinh sinh viên'), vb(4,'1/TB','2024-01-02','Hành chính',[],'Thông báo nghỉ Tết')];
     D.bieuMau = [{id:'b1', ten:'Đơn đề nghị vay vốn', nhom:'Hộ nghèo', soHieu:'01/TD', huongDan:false, soLanDung:5, driveId:'x'}, {id:'b2', ten:'Giấy ủy quyền', nhom:'Dùng chung', soHieu:'01/UQ', huongDan:false, soLanDung:2}];
     D.scan = [{id:'s1', ten:'Nguyễn Văn Giả', che:'the', xa:'Xã Giả', diem:'Điểm A', ap:'Ấp 1', to:'3', matTruoc:'a', matSau:'b', gioQuet:'2026-10-01T08:00', driveId:'q'},
       {id:'s2', ten:'Trần Thị Thử', che:'tailieu', xa:'Xã Giả', ap:'Ấp 2', trang:[], gioQuet:'2026-10-05T08:00', tag:['Đơn vay đã ký']}];
     D.cauHinh.dongGon = true;   /* bản cũ đang bật ▤ Gọn */
     luu(); });
   return p; };
 const p = await mo({width:1536, height:730});
 const r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)), o={};
   doiNgan(1); await w(300);
   o.gonSangBang = kxCua('vanBan')==='bang' && !D.cauHinh.dongGon;
   datKX('vanBan', 'ds'); await w(200);
   const th = document.querySelector('#nam-vb .tl-thanh');
   o.nut = [...th.querySelectorAll('button:not(.chip-ck)')].map(x=>x.textContent.trim().replace(/\s+/g,' ')).join('|');
   o.cao = Math.round(th.getBoundingClientRect().height);
   o.boHang = !document.querySelector('#tr1 .loc-nhanh') && !document.querySelector('#tr1 .sap') && !document.querySelector('#tr1 .chip-hang') && !document.querySelector('#tr1 .dang-loc');
   o.dem = (th.querySelector('.dem-tab')||{}).textContent;
   /* ⚲ Lọc */
   th.querySelector('.tl-loc').click(); await w(150);
   const hop = document.querySelector('#nam-vb .tl-panel');   /* 3.157: tấm lọc mở ngay dưới thanh (không hộp thoại) */
   o.panel = !!hop && !document.getElementById('hop').classList.contains('hien');
   o.nhom = hop ? [...hop.querySelectorAll('.lg-nhan')].map(x=>x.textContent).join('|') : '';
   [...hop.querySelectorAll('.the-loc')].find(x=>/^Tín dụng/.test(x.textContent)).click(); await w(200);
   o.panelGiu = !!document.querySelector('#nam-vb .tl-panel');
   document.querySelector('#nam-vb .tl-loc').click(); await w(100); o.panelDong = !document.querySelector('#nam-vb .tl-panel');
   const th2 = document.querySelector('#nam-vb .tl-thanh'), dl = document.querySelector('#nam-vb .tl-dang');
   o.sauLoc = {nut:th2.querySelector('.tl-loc').textContent.trim(), chip:dl ? [...dl.querySelectorAll('.tl-chip:not(.bo)')].map(x=>x.textContent.trim()).join('|') : '', soDong:BOT_DS.vanBan.length, dem:th2.querySelector('.dem-tab').textContent};
   dl.querySelector('.tl-chip').click(); await w(200);
   o.boChip = !locCua('vanBan').mang && BOT_DS.vanBan.length===4;
   /* ⇅ Sắp xếp */
   document.querySelector('#nam-vb .tl-sap').click(); await w(100);
   o.menuSap = [...document.querySelectorAll('#menu button')].map(x=>x.textContent.trim()).join('|');
   [...document.querySelectorAll('#menu button')].find(x=>/Tên/.test(x.textContent)).click(); await w(200);
   o.sapTen = SAP.cot==='ten' && /Tên/.test(document.querySelector('#nam-vb .tl-sap').textContent) && !document.getElementById('menu').classList.contains('hien');
   SAP.cot = 'ngay'; SAP.xuoi = false;
   /* ⋯ */
   document.querySelector('#nam-vb .tl-them').click(); await w(100);
   o.menuThem = document.getElementById('menu').textContent; dongMenu();
   /* ☰ → ▦ Bảng */
   o.menuXem = [...document.querySelectorAll('#nam-vb .tl-kx button')].map(x=>x.title).join('|')+(document.querySelector('#nam-vb .tl-pv') ? '|khung xem' : '');   /* 3.157: kiểu xem thành chip */
   [...document.querySelectorAll('#nam-vb .tl-kx button')].find(x=>/Bảng/.test(x.title)).click(); await w(300);
   const bang = document.querySelector('#ds-vb .bang-tab');
   o.cot = bang ? [...bang.querySelectorAll('thead th')].map(x=>x.textContent.trim()).filter(Boolean).join('|') : '';
   o.dong = bang ? bang.querySelectorAll('tbody tr').length : 0;
   o.caoDong = bang ? Math.round(bang.querySelector('tbody tr').getBoundingClientRect().height) : 0;
   o.nutXem = document.querySelector('#nam-vb .tl-kx button.bat').title;
   o.luuBang = D.cauHinh.bangTab && D.cauHinh.bangTab.vanBan===true;
   /* bấm tiêu đề cột Số hiệu */
   [...document.querySelectorAll('#ds-vb .bang-tab thead th')].find(x=>/Số hiệu/.test(x.textContent)).click(); await w(200);
   o.sh1 = [...document.querySelectorAll('#ds-vb .bang-tab tbody tr')].map(x=>x.children[1].textContent).join(',');
   [...document.querySelectorAll('#ds-vb .bang-tab thead th')].find(x=>/Số hiệu/.test(x.textContent)).click(); await w(200);
   o.sh2 = [...document.querySelectorAll('#ds-vb .bang-tab tbody tr')].map(x=>x.children[1].textContent).join(',');
   o.thSap = document.querySelector('#ds-vb .bang-tab thead th.dang').textContent;
   /* bấm dòng → xem; ↓ → dòng kế */
   document.querySelectorAll('#ds-vb .bang-tab tbody tr')[0].click(); await w(300);
   const id0 = mucDangXem && mucDangXem.id;
   document.body.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true})); await w(300);
   o.xem = {id0:id0, id1:mucDangXem && mucDangXem.id, dung:id0===document.querySelectorAll('#ds-vb .bang-tab tbody tr')[0].getAttribute('data-id')};
   /* trạng thái */
   o.tt = [...document.querySelectorAll('#ds-vb .bang-tab tbody tr')].map(x=>x.lastElementChild.previousElementSibling.textContent).join('|');
   /* ô tích → chọn để xóa */
   document.querySelector('#ds-vb .bang-tab tbody tr .o-chon').click(); await w(300);
   o.tich = {bot:BOT.tab, n:Object.keys(BOT.chon).length, nut:(document.querySelector('.thanh-bot .bot-nut')||{}).textContent};
   thoiBot(); await w(200);
   /* Biểu mẫu */
   doiNgan(5); await w(300);
   const tb = document.querySelector('#tr5 .tl-thanh');
   o.bm = {nut:[...tb.querySelectorAll('button:not(.chip-ck)')].map(x=>x.textContent.trim().replace(/\s+/g,' ')).join('|'), sap:!document.querySelector('#tr5 .sap')};
   tb.querySelector('.tl-them').click(); await w(100); o.bm.them = document.getElementById('menu').textContent; dongMenu();
   datKX('bieuMau', 'bang'); await w(300);
   o.bm.cot = [...document.querySelectorAll('#tr5 .bang-tab thead th')].map(x=>x.textContent.trim()).filter(Boolean).join('|');
   o.bm.dong = document.querySelectorAll('#tr5 .bang-tab tbody tr').length;
   /* Scan */
   doiNgan(4); for(let i=0;i<20 && !document.querySelector('#tr4 .tl-thanh');i++) await w(200); await w(200);
   const ts = document.querySelector('#tr4 .tl-thanh');
   o.sc = {co:!!ts, scXem:!document.querySelector('#tr4 .sc-xem'), ghiChu:!document.querySelector('#tr4 .tab-ghi-chu-scan'), sap:ts && ts.querySelector('.tl-sap').textContent.trim()};
   ts.querySelector('.tl-them').click(); await w(100); o.sc.them = document.getElementById('menu').textContent; dongMenu();
   ts.querySelector('.tl-loc').click(); await w(150); o.sc.loc = document.querySelector('#tr4 .tl-panel').textContent;
   [...document.querySelectorAll('#tr4 .tl-panel .the-loc')].find(x=>/Chưa đạt/.test(x.textContent)).click(); await w(200);
   document.querySelector('#tr4 .tl-loc').click(); await w(100);
   o.sc.chuaDat = HS.chuaDat && /Chưa đạt/.test(document.querySelector('#tr4 .tl-dang').textContent) && /\(1\)/.test(document.querySelector('#tr4 .tl-loc').textContent);
   document.querySelector('#tr4 .tl-dang .tl-chip').click(); await w(200); o.sc.boCD = !HS.chuaDat;
   datKX('scan', 'bang'); await w(300);
   o.sc.cot = [...document.querySelectorAll('#tr4 .bang-tab thead th')].map(x=>x.textContent.trim()).filter(Boolean).join('|');
   o.sc.dong = document.querySelectorAll('#tr4 .bang-tab tbody tr').length;
   datKX('scan', 'ds'); await w(200);
   return o; });
 ok('bản cũ đang bật ▤ Gọn → tự chuyển sang ▦ Bảng (Văn bản)', r.gonSangBang);
 ok('Văn bản: 1 hàng ＋ Thêm · 🗑 Xóa · ⚲ Lọc ▾ · ⇅ Ngày ▼ · chip ☰ 🗂 ▦ ▣ · ⋯ · ❓', r.nut==='+ Thêm file|🗑 Xóa|⚲ Lọc ▾|⇅ Ngày ▼|☰ Danh sách|🗂 Nhóm|▦ Bảng|▣ Khung xem|⋯|❓', r.nut);
 ok('3.157: ⚲ Lọc mở tấm lọc ngay dưới thanh (không hộp thoại), chọn xong vẫn mở, bấm lại đóng', r.panel && r.panelGiu && r.panelDong);
 ok('thanh lọc 1 dòng (cao ≤ 44 px)', r.cao<=44, r.cao+' px');
 ok('bỏ hàng chip lọc nhanh, hàng Sắp xếp, dòng Đang lọc', r.boHang);
 ok('số mục ở cuối thanh', /4 văn bản/.test(r.dem), r.dem);
 ok('⚲ Lọc: nhóm Năm · Mảng · CT vay · Tag · Khác', /Năm/.test(r.nhom) && /Mảng/.test(r.nhom) && /CT vay/.test(r.nhom) && /Tag/.test(r.nhom) && /Khác/.test(r.nhom), r.nhom);
 ok('lọc Tín dụng → nút "⚲ Lọc (1)", dòng "Đang lọc: Tín dụng ✕", 2 văn bản', r.sauLoc.nut==='⚲ Lọc (1) ▾' && r.sauLoc.chip==='Tín dụng ✕' && r.sauLoc.soDong===2 && /2 \/ 4/.test(r.sauLoc.dem), JSON.stringify(r.sauLoc));
 ok('bấm chip ✕ → bỏ lọc', r.boChip);
 ok('⇅ ▾: Tên · Ngày · Loại …; chọn Tên → sắp theo tên, menu đóng', /Tên/.test(r.menuSap) && /Ngày/.test(r.menuSap) && r.sapTen, r.menuSap);
 ok('⋯ Văn bản: Lập chỉ mục, đường dẫn ổ G, Drive, Sửa tag', /Lập chỉ mục/.test(r.menuThem) && /ổ G/.test(r.menuThem) && /Drive/.test(r.menuThem) && /Sửa danh sách tag/.test(r.menuThem));
 ok('chip kiểu xem: Danh sách · Nhóm · Bảng (không còn ▤ Gọn) + ▣ khung xem', /Danh sách/.test(r.menuXem) && /Nhóm/.test(r.menuXem) && /Bảng/.test(r.menuXem) && !/Gọn/.test(r.menuXem) && /khung xem/.test(r.menuXem), r.menuXem);
 ok('▦ Bảng Văn bản: cột Số hiệu · Ngày ký · Tên văn bản & Trích yếu · Mảng NV · CT vay · Trạng thái', r.cot==='Số hiệu|Ngày ký|Tên văn bản & Trích yếu|Mảng NV|CT vay|Trạng thái', r.cot);
 ok('bảng đủ 4 dòng, mỗi dòng ≤ 32 px; chip Bảng sáng; app nhớ riêng tab', r.dong===4 && r.caoDong<=32 && /Bảng/.test(r.nutXem) && r.luuBang, r.dong+' dòng · '+r.caoDong+' px · '+r.nutXem);
 ok('bấm tiêu đề Số hiệu → ▲ tăng, bấm lại → ▼ giảm', r.sh1==='1/TB,12/HD-NHCS,5/QĐ-HĐQT,88/NHCS-TD' && r.sh2==='88/NHCS-TD,5/QĐ-HĐQT,12/HD-NHCS,1/TB' && /▼/.test(r.thSap), r.sh1+' / '+r.sh2);
 ok('bấm dòng → xem; ↓ → dòng kế, khung xem theo', r.xem.dung && r.xem.id1 && r.xem.id1!==r.xem.id0, JSON.stringify(r.xem));
 ok('cột Trạng thái: biểu tượng (☁ chưa lên Drive …)', /☁/.test(r.tt), r.tt);
 ok('ô tích ở bảng Văn bản → chọn để xóa (thanh "Xóa 1 file")', r.tich.bot==='vanBan' && r.tich.n===1 && /Xóa 1 file/.test(r.tich.nut||''), JSON.stringify(r.tich));
 ok('Biểu mẫu: cùng thanh (Thêm · Xóa · Lọc · Sắp xếp · Xem · ⋯ · ❓), không còn hàng Sắp xếp', /🗑 Xóa\|⚲ Lọc ▾\|⇅ [^|]*\|☰ Danh sách\|▦ Bảng\|▣ Khung xem\|⋯\|❓$/.test(r.bm.nut) && r.bm.sap, r.bm.nut);
 ok('⋯ Biểu mẫu: 📚 Bộ biểu mẫu', /Bộ biểu mẫu/.test(r.bm.them));
 ok('▦ Bảng Biểu mẫu: Tên mẫu · Chương trình · Loại · Số lần dùng · Trạng thái', r.bm.cot==='Tên mẫu|Chương trình|Loại|Số lần dùng|Trạng thái' && r.bm.dong===2, r.bm.cot);
 ok('Scan (máy tính): cùng thanh; bỏ hàng Danh sách / Ngày-Tuần-Tháng và dòng giải thích; ⇅ = nhóm theo Ngày', r.sc.co && r.sc.scXem && r.sc.ghiChu && /Ngày/.test(r.sc.sap), JSON.stringify({sap:r.sc.sap}));
 ok('⋯ Scan: 3.309 bỏ Chế độ quét · Webcam · Chữ ký·CCCD (trùng Quét gì? / cột Ck)', !/Chế độ quét|Webcam|Chữ ký · CCCD/.test(r.sc.them), r.sc.them);
 ok('⚲ Lọc Scan: Xã · Tag · ⚠ Chưa đạt; bật → chip trên thanh, bấm ✕ bỏ', /Xã/.test(r.sc.loc) && /Chưa đạt/.test(r.sc.loc) && r.sc.chuaDat && r.sc.boCD);
 ok('▦ Bảng Scan: Tên · Ấp · Tổ trưởng (3.292) · Loại giấy tờ · Ck (3.304) · Ngày · Trạng thái', r.sc.cot==='Tên|Ấp|Tổ trưởng|Loại giấy tờ|Ck|Ngày|Trạng thái' && r.sc.dong===2, r.sc.cot);
 /* iPhone */
 const q = await mo({width:390, height:844}, true);
 const t = await q.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); D.cauHinh.bangTab = {vanBan:true}; doiNgan(1); await w(300);
   document.querySelector('#nam-vb .tl-xem').click(); await w(100);
   return {kx:kxCua('vanBan'), bang:!!document.querySelector('#ds-vb .bang-tab'), menu:document.getElementById('menu').textContent, tran:document.documentElement.scrollWidth>window.innerWidth+1}; });
 ok('iPhone: vẫn Danh sách (không có ▦ Bảng), không tràn ngang', t.kx==='ds' && !t.bang && !/Bảng/.test(t.menu) && !t.tran, JSON.stringify(t));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = o.filter(x=>x[0]==='✗').length; console.log((o.length-sai)+'/'+o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
