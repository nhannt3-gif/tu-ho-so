// 3.216 (anh 15/10) — CỬA KHO (js/29-kho.js): mỗi cửa trả đúng như hàm được bọc (hợp đồng), chưa dựng kỳ → rỗng không lỗi;
//   Giấy lĩnh / mini app / Hồ sơ vay / sổ hộ vay hỏi số qua KHO (không còn đọc thẳng TO_K / SL_DB / Sao kê trong các hàm đã chuyển). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   /* chưa dựng kỳ */
   const tk0 = TO_K; TO_K = null; let rong = false; try { rong = KHO.ky()===null && KHO.to('x')===null && KHO.dsTo().length===0 && KHO.toVien('x').length===0 && KHO.dongTo('x').length===0 && KHO.bangTo('x')===null && KHO.thanhVienTW()===null; } catch(e){ rong = 'lỗi '+e.message; } TO_K = tk0;
   ok('chưa dựng kỳ: các cửa trả rỗng / null, không báo lỗi', rong===true, String(rong));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(500);
   const J = x=>JSON.stringify(x), T = TO_K.to, m = Object.keys(T).find(k=>!T[k].trucTiep && (TO_K.kh[k]||[]).length), t = T[m], tv = toTV(t), kh = tv[0].kh;
   ok('KHO.ky(): kỳ đang dựng + tên Mẫu 31 + nguồn từng loại', KHO.ky().ky===TO_K.ky && KHO.ky().ngay===TO_K.ngay && /Mẫu 31/.test(KHO.ky().ten) && !!KHO.ky().nguon.hstd, J(KHO.ky()).slice(0, 120));
   ok('KHO.to / dsTo / dongTo = cây tổ kỳ đang dựng (bỏ tổ trực tiếp)', KHO.to(m)===t && KHO.dsTo().every(x=>!toLaTT(x)) && KHO.dsTo().length===Object.keys(T).filter(k=>!toLaTT(T[k])).length && KHO.dongTo(m)===TO_K.kh[m]);
   ok('KHO.toVien(mã tổ | tổ) = toTV (QT-01…07)', J(KHO.toVien(m))===J(tv) && J(KHO.toVien(t))===J(tv), tv.length+' tổ viên');
   ok('KHO.khach = hsoKhach; KHO.danhBa = danh bạ Mẫu 31 các kỳ (QT-13)', J(KHO.khach(kh, t))===J(hsoKhach(kh, t)) && KHO.danhBa(kh)===SL_DB.kh[kh] && KHO.coDanhBa() && KHO.dsDanhBa().length===Object.keys(SL_DB.kh).length);
   const cc = SL_DB.kh[kh].cccd; ok('KHO.timCCCD(số CCCD) → mã KH; số ngắn → rỗng', KHO.timCCCD(cc)===kh && KHO.timCCCD('123')==='' , cc);
   ok('KHO.tim = slTimKH (tên / CCCD / mã KH)', J(KHO.tim(SL_DB.kh[kh].ten, 5))===J(slTimKH(SL_DB.kh[kh].ten, 5)) && KHO.tim(SL_DB.kh[kh].ten, 5).some(r=>r.m===kh));
   ok('KHO.cccd = cccdCua (Mẫu 31 → 01/TV → file về tổ → anh gõ; thiếu có lý do) · KHO.hanCCCD = toCCCDHan', J(KHO.cccd(kh, t, false))===J(cccdCua(kh, t, false)) && J(KHO.hanCCCD('072180000001', '1980-01-01', '2021-05-01'))===J(toCCCDHan('072180000001', '1980-01-01', '2021-05-01')));
   ok('KHO.bangTo = bảng tổ dựng sẵn · KHO.toTruong = tkTT · KHO.toTruongKH = hsoTTKH (QT-12)', J(KHO.bangTo(m))===J(tkBangTo()[m]) && J(KHO.toTruong(t))===J(tkTT(t)) && J(KHO.toTruongKH(t))===J(hsoTTKH(t)));
   ok('KHO.tk105 / tk104 / saoKe = tkCua / tkBang (QT-11, 12) · KHO.tv01 / thanhVienTW (QT-14)', J(KHO.tk105(kh))===J(tkCua('tk105', kh)) && J(KHO.tk104(kh))===J(tkCua('tk104', kh)) && KHO.saoKe('tk105')===tkBang('tk105') && J(KHO.tv01(kh))===J(tv01Cua(kh)) && J(KHO.thanhVienTW())===J(tvDoiChieu(TO_K.B)));
   /* tab đã chuyển sang KHO: không còn đọc thẳng biến chung */
   const doc = f => String(f).replace(/\/\*[\s\S]*?\*\//g, '');
   const tho = f => (doc(f).match(/\b(TO_K|SL_DB|toTV|tkCua|tkBangTo|cccdCua|slTimKH)\b/g) || []);
   const hamGL = [gdxGLDsKhach, gdxGLDuLieu, gdxMiniGoi, hsoTVTo, hmM31, hmTuM31, hmM31Tim, hmDongBo, hmNguoiDung];
   const sai = hamGL.map(f=>[f.name, tho(f)]).filter(x=>x[1].length);
   ok('Giấy lĩnh, mini app, Hồ sơ vay / sổ hộ vay: hỏi qua KHO, không đọc thẳng TO_K / SL_DB / Sao kê', !sai.length, sai.map(x=>x[0]+': '+x[1].join(',')).join(' · ') || hamGL.length+' hàm sạch');
   ok('js/29-kho.js nạp sau js/28 (thứ tự nạp)', [...document.scripts].map(s=>s.src).findIndex(s=>/29-kho/.test(s)) > [...document.scripts].map(s=>s.src).findIndex(s=>/28-tv-tk/.test(s)));
   return o;
 }, files);
 /* kiểm tĩnh: js/25 (Hồ sơ Tổ / Hồ sơ vay / sổ hộ vay) + js/26 (Giao dịch xã) không còn đọc thẳng biến kho — chỉ còn chỗ TAB ĐẶT KỲ (TO_K = …), cây chọn (PV_DUNG K) và đọc kỳ trước */
 const choPhep = /PV_DUNG\.|TO_K = |toNap\(|var cu = TO_K|TO_K && TO_K\.ky===S\.ky/;
 const con = []; ['25-ho-so.js', '25b-ho-so-vay.js', '25c-ho-so-giao-dien.js', '26-giao-dich-xa.js'].forEach(f=>fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8').split('\n').forEach((l, i)=>{ const x = l.replace(/\/\*.*?\*\//g, ''); if(/\b(TO_K|SL_DB|SLM|KT_K)\b/.test(x) && !choPhep.test(x)) con.push(f+':'+(i+1)); }));
 R.push((con.length ? '✗ ' : '✓ ')+'js/25 + js/26 chỉ hỏi qua KHO (còn lại: đặt kỳ của tab, cây chọn, kỳ trước) — '+(con.length ? con.slice(0, 8).join(' · ') : 'sạch'));
 const k29 = fs.readFileSync(path.join(__dirname, '..', 'js', '29-kho.js'), 'utf8');
 R.push((/function hsoKhach\(/.test(k29) && /function hsoTTKH\(/.test(k29) && !['25-ho-so.js', '25b-ho-so-vay.js', '25c-ho-so-giao-dien.js'].some(f=>/function hsoKhach\(/.test(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'))) ? '✓ ' : '✗ ')+'lõi kho hsoKhach / hsoTTKH dời về js/29 (giữ tên cũ)');
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
