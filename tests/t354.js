// 3.438 (anh 01/11): tag nguồn văn bản theo số hiệu — 🏛 VB Trung ương · 🏦 NHCSXH Trung ương · 📍 Chỉ đạo của Tỉnh; loại Nghị định / Thông tư…
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const ca = [['54/2026/NĐ-CP', 'VB Trung ương', 'Nghị định'], ['05/2024/TT-NHNN', 'VB Trung ương', 'Thông tư'], ['28/2015/QĐ-TTg', 'VB Trung ương', 'Quyết định'], ['15/2023/QH15', 'VB Trung ương', 'Luật'],
     ['34/CT-TTg', 'VB Trung ương', 'Chỉ thị'], ['7442/NHCS-TDNN', 'NHCSXH Trung ương', ''], ['54/QĐ-HĐQT', 'NHCSXH Trung ương', ''], ['727/HD-NHCS', 'NHCSXH Trung ương', ''],
     ['1234/NHCS-KHTD', 'Chỉ đạo của Tỉnh', ''], ['456/NHCS-HCTC', '', ''], ['12/KH-UBND', '', ''], ['', '', '']];
   ca.forEach(c=>ok(c[0]+' → '+(c[1]||'(không gắn)')+(c[2] ? ' · '+c[2] : ''), vbnNhom(c[0])===c[1] && (!c[2] || vbnLoai(c[0])===c[2]), vbnNhom(c[0])+' · '+vbnLoai(c[0])));
   ok('đoán loại (doanLoai) theo phần sau dấu / : 2026/NĐ-CP → Nghị định; ký hiệu ngành như cũ', doanLoai('', '2026/NĐ-CP')==='Nghị định' && doanLoai('', 'QĐ-HĐQT')==='Quyết định' && doanLoai('', 'NHCS-TDNN')==='Công văn');
   const L0 = D.cauHinh.loaiVB.slice(); delete D.cauHinh.loaiVB3438; D.cauHinh.loaiVB = L0.filter(x=>VBN.loaiMoi.indexOf(x)<0); vbnDanhMuc();
   ok('danh mục loại: thêm Nghị định, Thông tư, Nghị quyết, Chỉ thị, Luật — giữ nguyên loại cũ, thứ tự cũ', VBN.loaiMoi.every(x=>D.cauHinh.loaiVB.indexOf(x)>=0) && D.cauHinh.loaiVB.slice(0, 7).join()===L0.filter(x=>VBN.loaiMoi.indexOf(x)<0).slice(0, 7).join());
   D.cauHinh.loaiVB = D.cauHinh.loaiVB.filter(x=>x!=='Luật'); vbnDanhMuc(); ok('anh bỏ 1 loại mới → không tự thêm lại', D.cauHinh.loaiVB.indexOf('Luật')<0); D.cauHinh.loaiVB = L0.concat(VBN.loaiMoi.filter(x=>L0.indexOf(x)<0));
   const giu = D.vanBan; D.vanBan = [{id:'a', soHieu:'54/2026/NĐ-CP', the:[]}, {id:'b', soHieu:'1234/NHCS-KHTD', the:['Tín dụng']}, {id:'c', soHieu:'456/NHCS-HCTC', the:[]}, {id:'d', soHieu:'7442/NHCS-TDNN', the:['NHCSXH Trung ương']}];
   ok('nút 🏷 Gắn tag nguồn đếm đúng văn bản cũ cần gắn (2)', /Gắn tag nguồn \(2\)/.test(vbnNut()));
   vbnGanCu(); await w(200); const okBt = [...document.querySelectorAll('.hang-nut button')].find(x=>/Gắn tag/.test(x.textContent)); if(okBt) okBt.click(); await w(200);
   ok('bấm Gắn tag → chỉ thêm tag, giữ tag cũ, không gắn ký hiệu chưa có trong danh sách', D.vanBan[0].the.join()==='VB Trung ương' && D.vanBan[1].the.join()==='Tín dụng,Chỉ đạo của Tỉnh' && D.vanBan[2].the.length===0 && D.vanBan[3].the.length===1, JSON.stringify(D.vanBan.map(v=>v.the)));
   THE_LOC = [{loai:'tag', gt:'Chỉ đạo của Tỉnh'}]; ok('bộ lọc tag sẵn có lọc được nhóm Tỉnh', locTheoThe('vanBan', D.vanBan).map(v=>v.id).join()==='b'); THE_LOC = [];
   D.vanBan = giu;
   /* đọc tự động: chữ trong PDF + tên file */
   ok('đọc chữ PDF "Số: 54/2026/NĐ-CP" → đủ số hiệu (trước chỉ ra 54)', rutSoHieu('CHÍNH PHỦ\nSố: 54/2026/NĐ-CP\nHà Nội, ngày') === '54/2026/NĐ-CP' && rutSoHieu('Số: 05/2024/TT-NHNN') === '05/2024/TT-NHNN', rutSoHieu('Số: 54/2026/NĐ-CP'));
   ok('đọc chữ PDF số hiệu ngành như cũ', rutSoHieu('Số: 7442/NHCS-TDNN') === '7442/NHCS-TDNN' && rutSoHieu('Số: 54/QĐ-HĐQT') === '54/QĐ-HĐQT');
   const f1 = tuTenFile('54_2026_NĐ-CP quy dinh tin dung.pdf'), f2 = tuTenFile('54-2026-NĐ-CP.pdf'), f3 = tuTenFile('7442 NHCS-TDNN gia han no.pdf'), f4 = tuTenFile('Bao cao 15-2026-Tong ket.pdf');
   ok('tên file 54_2026_NĐ-CP / 54-2026-NĐ-CP → số hiệu 54/2026/NĐ-CP', f1.soHieu==='54/2026/NĐ-CP' && f2.soHieu==='54/2026/NĐ-CP', f1.soHieu+' · '+f2.soHieu);
   ok('tên file ngành như cũ; chữ thường không nhận nhầm là số hiệu', f3.soHieu==='7442/NHCS-TDNN' && f4.soHieu!=='15/2026/Tong', f3.soHieu+' · '+f4.soHieu);
   ok('đoán loại khi thêm file (doanLoai chữ + số hiệu đủ) → Nghị định dù nội dung có chữ "quyết định"', doanLoai('NGHỊ ĐỊNH … Thủ tướng quyết định …', '54/2026/NĐ-CP')==='Nghị định');
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t354 đạt'); await b.close(); process.exit(sai?1:0);
})();
