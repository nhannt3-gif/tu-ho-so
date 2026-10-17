// 3.223 M1 (anh chốt 16/10) — LƯU AN TOÀN B1: cửa KHO1 (chụp / khôi phục), tự chụp trước khi nhận Drive, bỏ bản trùng, giữ 10 bản;
//   tab 💾 Sao lưu trong ⚙ Khai báo đơn vị; xuất / nạp khai báo ra file theo nhóm (nhóm có số liệu khách mặc định không tích; chụp trước khi nạp). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   localStorage.removeItem('tuhoso_chup'); window.KB_NAP = null;
   D.cauHinh.hsoKB = {pgd:{ten:'PGD Giả A'}}; D.cauHinh.hoMoi = [{id:'hmgia', kh:'', tv:[{ten:'Khách Giả', cccd:'072000000001'}]}];
   /* 1. chụp */
   const r1 = await KHO1.chup('thử 1'); ok('KHO1.chup → bản ghi có lúc, lý do, số mục; nằm đầu danh sách', !!r1 && KHO1.dsChup()[0].id===r1.id && r1.ly==='thử 1' && r1.khoa>0);
   const r2 = await KHO1.chup('thử trùng'); ok('nội dung không đổi → không chụp thêm (bỏ trùng)', r2===null && KHO1.dsChup().length===1);
   const j = await KHO1.docChup(r1.id); ok('đọc lại bản chụp đúng nội dung (khai báo + sổ hộ vay)', j && j.hsoKB.pgd.ten==='PGD Giả A' && j.hoMoi[0].tv[0].ten==='Khách Giả');
   ok('không chụp khóa riêng máy (độ rộng khung…)', !('rongTrai' in j) && !('chBam' in j));
   for(let i=0;i<12;i++){ D.cauHinh.hsoKB.pgd.ten = 'PGD Giả '+i; await KHO1.chup('vòng '+i); }
   ok('giữ đúng 10 bản gần nhất', KHO1.dsChup().length===10 && KHO1.dsChup()[0].ly==='vòng 11');
   /* 2. khôi phục */
   const id5 = KHO1.dsChup().find(x=>x.ly==='vòng 5').id; D.cauHinh.hsoKB.pgd.ten = 'PGD Sửa Nhầm';
   const n = await kbKhoiPhuc(id5, 1); await w(100);
   ok('↩ khôi phục → khai báo về như lúc chụp', D.cauHinh.hsoKB.pgd.ten==='PGD Giả 5' && n>0);
   ok('trước khi khôi phục tự chụp bản đang dùng (quay lại được)', KHO1.dsChup()[0].ly==='trước khi khôi phục');
   const j2 = await KHO1.docChup(KHO1.dsChup()[0].id); ok('bản "trước khi khôi phục" giữ đúng bản sửa nhầm', j2.hsoKB.pgd.ten==='PGD Sửa Nhầm');
   /* 3. tự chụp trước khi nhận Drive */
   const n0 = KHO1.dsChup()[0].id; D.cauHinh.hsoKB.pgd.ten = 'PGD Trước Drive';
   const src = String(typeof CH_DB_CU!=='undefined' ? CH_DB_CU : dongBoCauHinh), srcK = typeof chKhoiDongBo==='function' ? String(chKhoiDongBo) : ''; ok('đồng bộ Drive: chụp trước khi áp bản Drive (mã — đường cũ + đường theo khối 3.226)', /KHO1\.chup\('trước khi nhận cài đặt từ Drive'\)[\s\S]{0,120}chApDrive/.test(src) && (!srcK || (/KHO1\.chup\('trước khi nhận cài đặt từ Drive'\)/.test(srcK) && /chup\(\); doi \+= chApDrive/.test(srcK))));
   localStorage.removeItem('tuhoso_chup'); await KHO1.chupNgay(); ok('tự lưu hằng ngày: chưa có bản hôm nay → chụp', KHO1.dsChup().length===1 && KHO1.dsChup()[0].ly==='tự lưu hằng ngày');
   await KHO1.chupNgay(); ok('đã có bản hôm nay → không chụp thêm', KHO1.dsChup().length===1);
   /* 4. tab 💾 Sao lưu */
   slDoiTab('hsv'); doiNgan(7); await w(800); hsoKBHop('sl'); await w(150); const hop = document.getElementById('hop-in');
   ok('⚙ Khai báo đơn vị có tab 💾 Sao lưu: lịch sử chụp + nút khôi phục + xuất + nạp', /Tự lưu trên máy này/.test(hop.textContent) && hop.querySelectorAll('.hso-kbp[data-kb="sl"] button').length>=3 && /Xuất khai báo ra file/.test(hop.textContent) && /Nạp khai báo từ file/.test(hop.textContent));
   const tich = [...hop.querySelectorAll('.kb-xuat')].reduce((a, e)=>(a[e.value] = e.checked, a), {});
   ok('xuất: nhóm Hồ sơ / GDX / KTGS tích sẵn; TK, Sổ hộ vay (số liệu khách) KHÔNG tích', tich.hso && !tich.tk && !tich.so);
   const F = {}; const gf = giaoFile; giaoFile = (bl, ten)=>{ F.bl = bl; F.ten = ten; }; kbXuat(); giaoFile = gf; await w(50);
   const s = await F.bl.text(), d = JSON.parse(s);
   ok('file xuất: tên KhaiBao_TuHoSo_dd-mm-yyyy.json, có nhóm hso, không có hoMoi', /^KhaiBao_TuHoSo_\d\d-\d\d-\d{4}\.json$/.test(F.ten) && d.loai==='tuhoso-khaibao' && d.nhom.hso && d.nhom.hso.hsoKB && !d.nhom.so && s.indexOf('Khách Giả')<0);
   /* 5. nạp */
   D.cauHinh.hsoKB.pgd.ten = 'PGD Đang Dùng';
   ok('file lạ → báo, không ghi', kbDocChuoi('{"a":1}', 'x.json')===false && kbDocChuoi('khong phai json', 'y')===false);
   ok('file đúng → nhận đúng nhóm, bỏ khóa lạ', kbDocChuoi(JSON.stringify({loai:'tuhoso-khaibao', ban:'3.222', nhom:{hso:{hsoKB:{pgd:{ten:'PGD Từ File'}}, khoaLa:1}, la:{x:1}}}), 'kb.json') && Object.keys(KB_NAP.d.nhom).join()==='hso' && !('khoaLa' in KB_NAP.d.nhom.hso));
   const c0 = KHO1.dsChup().length; await kbNap(['hso'], 1); await w(100);
   ok('nạp nhóm Hồ sơ → khai báo đổi theo file; chụp bản đang dùng trước khi nạp', D.cauHinh.hsoKB.pgd.ten==='PGD Từ File' && KHO1.dsChup()[0].ly==='trước khi nạp file khai báo' && KHO1.dsChup().length===c0+1);
   ok('nạp không đụng sổ hộ vay', D.cauHinh.hoMoi[0].tv[0].ten==='Khách Giả');
   dongHop(); return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5)); const dat = R.filter(x=>x[0]==='✓').length;
 console.log(dat+'/'+R.length+' đạt'+(loi.length ? ' · có lỗi trang' : '')); await b.close(); process.exit(dat===R.length && !loi.length ? 0 : 1); })();
