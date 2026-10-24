// 3.355 (KE_HOACH_DANG_KY đợt N1) — nền báo cáo bảng DANG_KY: nút ở tab Sao kê, báo cáo mẫu "Danh sách nợ cần xử lý" (lấy dòng qua KHO), chọn loại / nhóm, khuôn in chuẩn (logo, tên NHCSXH, tiêu đề, ĐVT, A4 dọc, tự co), Excel, nhật ký in. Bộ GIẢ tests/gianho31.
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
   kyChungDoi('2026-08'); slDoiTab('sk'); doiNgan(7); for(let i=0;i<60 && !SK_K;i++) await w(250); await w(500);
   /* 1. nút ở tab Sao kê */
   const nut = document.querySelector('.dk-ds [data-lenh="dk.mo"][data-ma="noxl"]');
   ok('3.355 tab Sao kê có nhóm 🧩 Báo cáo chuẩn mới + nút Danh sách nợ cần xử lý', !!nut);
   /* 2. dòng = quá hạn + khoanh + KHĐ của bộ số liệu (mặc định 3 loại, toàn PGD) */
   D.cauHinh.dkChon = {}; const B = SK_K.B, nqh = (B.co.nqh||[]).length, nk = (B.co.nk||[]).length, nkhd = Object.keys(KHO.khdKy(SK_K)).length;
   let L = dkLap('noxl'); const dem = l => L.kq.dong.filter(x=>x.loai===l).length;
   ok('3.355 noxl: số dòng quá hạn / khoanh / KHĐ khớp bộ số liệu', dem('QH')===nqh && dem('Khoanh')===nk && dem('KHĐ 3T')===nkhd && L.kq.dong.length===nqh+nk+nkhd, [dem('QH'), nqh, dem('Khoanh'), nk, dem('KHĐ 3T'), nkhd].join('/'));
   ok('3.355 bộ giả có khoanh + KHĐ để thử (quá hạn bộ giả = 0 dòng)', nk>0 && nkhd>0, [nqh, nk, nkhd].join('/'));
   /* 3. nhóm Điểm › Hội › Tổ: dòng cộng nhóm = tổng các dòng */
   const C = dkChia(L.kq, 'dht'), tongDN = L.kq.dong.reduce((a, x)=>a+(+x.dn||0), 0);
   const cap0 = C.ra.filter(r=>r.nhom!=null && r.muc===0), cong0 = cap0.reduce((a, r)=>a+r.cong.dn, 0);
   ok('3.355 nhóm Điểm › Hội › Tổ: cộng các điểm = Tổng cộng, số dòng chi tiết đủ', cap0.length>0 && cong0===tongDN && C.tong.dn===tongDN && C.ra.filter(r=>!r.nhom && r.nhom!=='' && r.x).length===L.kq.dong.length, cap0.length+' điểm · '+cong0+' / '+tongDN);
   ok('3.355 nhóm có đủ 3 cấp (điểm · hội · tổ)', [0,1,2].every(m=>C.ra.some(r=>r.nhom!=null && r.muc===m)));
   /* 4. khuôn in chuẩn */
   const h = dkHTML(L.o, L.kq, L.ctx);
   ok('3.355 bản in: logo + NGÂN HÀNG CHÍNH SÁCH XÃ HỘI + PGD Gò Dầu - Chi nhánh Tây Ninh', /<img src="data:image/.test(h) && /NGÂN HÀNG CHÍNH SÁCH XÃ HỘI/.test(h) && /PGD Gò Dầu - Chi nhánh Tây Ninh/.test(h));
   ok('3.355 bản in: tên báo cáo giữa, ngày số liệu nghiêng, Đơn vị tính: đồng, A4 dọc', /<h1>Danh sách nợ cần xử lý<\/h1>/.test(h) && /class="dk-ngay">Số liệu đến ngày 31\/08\/2026/.test(h) && /Đơn vị tính: đồng/.test(h) && /size:A4 portrait/.test(h));
   ok('3.355 bản in: tiêu đề cột 2 tầng (Mốc theo dõi) + dòng Tổng cộng', /colspan="2">Mốc theo dõi/.test(h) && /Tổng cộng \(/.test(h));
   /* 5. chọn loại (chip) — bỏ Khoanh, thêm KU chưa GN; đổi nhóm */
   dkMo('noxl'); await w(400);
   const chipKn = document.querySelector('[data-lenh="dk.chon"][data-k="loai"][data-v="kn"]'); chipKn.click(); await w(400);
   L = dkLap('noxl');
   ok('3.355 bấm chip Khoanh → bỏ dòng khoanh, lựa chọn nhớ trong cài đặt', dem('Khoanh')===0 && D.cauHinh.dkChon.noxl.loai.indexOf('kn')<0 && dem('QH')===nqh);
   document.querySelector('[data-lenh="dk.chon"][data-k="nhom"][data-v=""]').click(); await w(400);
   const fr = document.getElementById('dk-khung'); for(let i=0;i<30 && !(fr.contentWindow && fr.contentWindow.TR_XONG);i++) await w(200);
   const fd = fr && fr.contentDocument;
   ok('3.355 Không nhóm → bản xem trước không có dòng nhóm', D.cauHinh.dkChon.noxl.nhom==='' && fd && !fd.querySelector('tr.dk-nhom') && !!fd.querySelector('tr.dk-tong'));
   { const tg = fd ? fd.querySelectorAll('.tr-tg') : [], ban = fd && fd.querySelector('.tr-tg .dk-ban');
     ok('3.355 xem trước qua bộ chia trang chung: A4 dọc, có trang, lề 15/10/15/20 mm, bản không tràn ngang', tg.length>=1 && !tg[0].classList.contains('ngang') && /top:\s*15mm/.test(tg[0].querySelector('.tr-nd').style.cssText) && /left:\s*20mm/.test(tg[0].querySelector('.tr-nd').style.cssText) && ban && ban.scrollWidth<=ban.clientWidth+2, tg.length+' trang'); }
   /* bảng tổng quát (khai thử): A4 ngang, cố 1 trang → co chữ khi dài */
   DANG_KY({ma:'thu_bang', o:'thu', loai:'bang', ten:'Bảng thử', du:function(){ const d = []; for(let i=0;i<34;i++) d.push({ten:'Đơn vị '+i, a:i*1e6, b:i*2e6}); return {cot:[{k:'stt', ten:'STT'}, {k:'ten', ten:'Đơn vị'}, {k:'a', ten:'A', tien:true, nhom:'Trong đó'}, {k:'b', ten:'B', tien:true, nhom:'Trong đó'}], dong:d}; }});
   { const Lb = dkLap.call(null, 'noxl'); const kb = DK_DS.thu_bang.du({}), hb = dkHTML(DK_DS.thu_bang, kb, Object.assign({}, Lb.ctx, {chon:{}}));
     ok('3.355 bảng tổng quát: A4 ngang, đầu trang "Ngân hàng CSXH Tỉnh Tây Ninh / PGD Gò Dầu", ĐVT triệu đồng, cố 1 trang', /data-tr-ngang="1"/.test(hb) && /data-tr-1trang="1"/.test(hb) && /Ngân hàng CSXH Tỉnh Tây Ninh/.test(hb) && /Đơn vị tính: triệu đồng/.test(hb) && /Số liệu tính đến thời điểm/.test(hb));
     xemChuan(fr, hb); for(let i=0;i<30 && !(fr.contentWindow && fr.contentWindow.TR_XONG);i++) await w(200); await w(200);
     const d2 = fr.contentDocument, t2 = d2.querySelectorAll('.tr-tg'), b2 = d2.querySelector('.tr-tg .dk-ban');
     ok('3.355 bảng tổng quát 34 dòng: 1 trang ngang, tự co chữ (< 11pt)', t2.length===1 && t2[0].classList.contains('ngang') && b2 && parseFloat(b2.style.fontSize||'11')<11, t2.length+' trang · '+(b2 && b2.style.fontSize)); }
   delete DK_DS.thu_bang;
   /* 6. Excel (aoa) cùng đầu trang + tiêu đề + dòng + Tổng cộng */
   const a = dkAOA(L.o, L.kq, Object.assign({}, L.ctx, {chon:Object.assign({}, L.ctx.chon, {nhom:''})}));
   ok('3.355 Excel: đầu trang, TÊN in hoa, 2 dòng tiêu đề cột, đủ dòng + Tổng cộng', a[0][0]==='NGÂN HÀNG CHÍNH SÁCH XÃ HỘI' && a[3][0]==='DANH SÁCH NỢ CẦN XỬ LÝ' && a[7][8]==='Mốc theo dõi' && a[8][8]==='Ngày' && a.length===9+L.kq.dong.length+1+2 && /^Tổng cộng/.test(a[9+L.kq.dong.length][0]), a.length);
   /* 7. hàng nút xuất chung + nhật ký in */
   D.nkIn = []; const xw = document.querySelector('#hop .xuat-word'); if(xw){ window.taiXuongBlob = function(){}; xw.click(); await w(200); }
   ok('3.355 bấm 📝 Word → nhật ký in ghi "Danh sách nợ cần xử lý"', (D.nkIn||[]).length===1 && D.nkIn[0].mau==='Danh sách nợ cần xử lý' && D.nkIn[0].cach==='word', JSON.stringify(D.nkIn[0]||{}).slice(0, 120));
   dongHop();
   /* 8. địa bàn của dòng */
   const diem1 = (C.ra.find(r=>r.muc===0)||{}).nhom, tos = Object.keys(SK_K.to).filter(m=>dkDV(SK_K, m).diem===diem1);
   ok('3.355 dkDV trả xã / điểm / hội / tổ cho tổ của bộ giả', tos.length>0 && !!dkDV(SK_K, tos[0]).to && !!dkDV(SK_K, tos[0]).xa, diem1);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t259 đạt'); await b.close(); process.exit(sai?1:0);
})();
