// 3.416 (anh 31/10: "gặp CCCD tổ trưởng dù cũ hay mới cũng lưu trữ… 1 chỗ lọc ra CCCD của tổ trưởng xem có lưu đủ hay chưa" + "có kiểm tổ phó hiện tại, tổ trưởng cũ cũng lưu và lọc riêng"):
//   ① CCCD tổ trưởng CŨ (chỉ có ở File Tổ trưởng kỳ trước) → nhận ra, tên chuẩn CIF - Họ tên - CCCD, vaiTro ttCu ② 👑 Kiểm CCCD tổ trưởng · tổ phó hiện tại (đủ / thiếu, Chỉ thiếu, tổ trưởng cũ riêng, Excel).
//   Bộ GIẢ gianho31 + 2 Danh sách tổ giả (T7: tổ trưởng cũ · T8: tổ trưởng + tổ phó hiện tại).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   let K = await KHO.nap('2026-08'); const dsTo = Object.values(K.to).filter(x=>!x.trucTiep), tA = dsTo[0], tB = dsTo[1];
   const kh = Object.values(K.kh[tA.ma]||[]).find(x=>x.kh && x.cccd);   /* tổ phó = 1 khách vay của tổ A */
   const C = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
   const dong = (ng, t, cif, ten, cmt, matp, tentp) => [ng, 'D9', 'Điểm Giả', t.thon||'', t.tenXa||'', t.tenThon||'', String(t.dv||'11'), 'Hội Giả', t.ma, cif, ten, cmt, '01/02/2022', '0900000000', '01/01/1970', 10, 100000000, '1049999999', matp||'', tentp||'', ''];
   const nap = async(rows, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], C].concat(rows)), 'BCQUERY'); const k = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!k.loi && k.ky) await slGhi(k); return k; };
   await nap([dong('31/07/2026', tB, '7130000001', 'Tổ Trưởng Cũ Giả', '072100000001')], 'baocao_20260731_000000.xlsx');
   await nap([dong('31/08/2026', tA, '7130000002', 'Tổ Trưởng Mới Giả', '072100000002', kh.kh, kh.ten), dong('31/08/2026', tB, '7130000003', 'Tổ Trưởng Thay Giả', '072100000003')], 'baocao_20260831_000000.xlsx');
   SL_BO = {}; TO_KS = {}; K = await KHO.nap('2026-08'); KHO.datKy(K); TO_K = K;
   /* ① tổ trưởng cũ */
   ok('CCCD tổ trưởng cũ: không có ở Mẫu 31, không có ở bảng tổ kỳ này', !trTimTT('072100000001'));
   const c = await dsTimCCCD('072100000001');
   ok('tra File Tổ trưởng các kỳ trước → ra tổ trưởng cũ (CIF, tổ, kỳ T7)', !!c && c.cif==='7130000001' && c.to===tB.ma && c.ky==='2026-07', JSON.stringify(c));
   const e = document.createElement('input'); e.id = 'sx-ten'; e.value = '072100000001'; document.body.appendChild(e); const kq = document.createElement('div'); kq.id = 'tr-kq-sx-ten'; document.body.appendChild(kq);
   window.SX = {ten:'072100000001'}; SXK.length = 0; const giuNhom = window.scanNhom; window.scanNhom = ()=>[[{}]]; SC.che = 'the';
   trChay('sx-ten'); for(let i=0;i<40 && !/CŨ/.test(kq.textContent);i++) await w(100);
   ok('🔎 Tra ở hộp Lưu: báo "Tổ trưởng CŨ", tên chuẩn CIF - Họ tên - CCCD', /Tổ trưởng CŨ/.test(kq.textContent) && /^7130000001 - Tổ Trưởng Cũ Giả - CCCD$/.test(e.value), e.value);
   ok('lưu vào tủ gắn mã CIF + vai trò tổ trưởng cũ', SXK[0] && SXK[0].ma==='7130000001' && SXK[0].vaiTro==='ttCu');
   e.value = '079999999999'; e.__ttCuKhong = ''; trChay('sx-ten'); await w(600);
   ok('số CCCD không có ở đâu: không lặp tra mãi, báo như cũ', /không có/i.test(kq.textContent), kq.textContent.slice(0, 80));
   window.scanNhom = giuNhom; window.SX = null; e.remove(); kq.remove();
   /* ② kiểm: giả lập đã lưu CCCD tổ trưởng A (theo CIF) + 1 bản tổ trưởng cũ */
   const giuScan = D.scan; D.scan = [{id:'g1', che:'the', maKH:'7130000002', ten:'Tổ Trưởng Mới Giả', cccd:'072100000002', ngay:'2026-10-30', tag:['CCCD'], vaiTro:'tt'},
     {id:'g2', che:'the', maKH:'7130000001', ten:'Tổ Trưởng Cũ Giả', cccd:'072100000001', ngay:'2026-10-31', tag:['CCCD'], vaiTro:'ttCu', xa:tB.tenXa}];
   const B = ttkDung(K, await dsTTDs()), toA = B.ds.flatMap(x=>x.to).find(t=>t.ma===tA.ma), toB2 = B.ds.flatMap(x=>x.to).find(t=>t.ma===tB.ma);
   ok('3.416.1 chỉ kiểm tổ trưởng (bỏ tổ phó): tổ A tổ trưởng (CIF) đã lưu ✓', toA && toA.nguoi.length===1 && toA.nguoi[0].vai==='Tổ trưởng' && toA.nguoi[0].da, JSON.stringify(toA && toA.nguoi));
   ok('tổ B: tổ trưởng HIỆN TẠI (thay người) chưa lưu — bản tổ trưởng cũ không tính thay', toB2 && !toB2.nguoi[0].da);
   ok('tổ trưởng cũ lấy từ File Tổ trưởng kỳ trước (không trùng người hiện tại), đã lưu ✓ + kỳ cuối', B.cu.length===1 && B.cu[0].cif==='7130000001' && B.cu[0].da && B.cu[0].ky==='2026-07', JSON.stringify(B.cu));
   D.scan = D.scan.filter(k=>k.vaiTro!=='ttCu'); const B2 = ttkDung(K, await dsTTDs());
   ok('tổ trưởng cũ CHƯA lưu vẫn hiện (để quét bổ sung) — thiếu', B2.cu.length===1 && !B2.cu[0].da);
   D.scan.push({id:'g3', che:'the', maKH:'7130000099', ten:'Người Cũ Ngoài File', cccd:'072100000099', ngay:'2026-10-31', tag:['CCCD'], vaiTro:'ttCu'});
   ok('bản đã lưu là tổ trưởng cũ mà File chưa nạp → vẫn hiện', ttkDung(K, await dsTTDs()).cu.some(n=>n.cif==='7130000099' && n.da));
   TTK.B = B2; TTK.xem = 'nay'; TTK.loc = 'tat'; ttkVe(); const hop = () => (document.getElementById('hop-in')||{}).textContent||'';
   ok('màn 👑: đếm tổ trưởng hiện tại + cũ, không còn tổ phó', /Tổ trưởng hiện tại \d+\/\d+/.test(hop()) && /tổ trưởng cũ 0\/1/.test(hop()) && !/Tổ phó/.test(hop()) && /Chỉ thiếu/.test(hop()), hop().slice(0, 160));
   document.querySelector('[data-lenh="ttk.loc"][data-k="thieu"]').click(); await w(200);
   ok('Chỉ thiếu: không còn dòng đã lưu ✓', !/✓/.test([...document.querySelectorAll('#hop-in tbody tr:not(.tong)')].map(x=>x.textContent).join('|')));
   document.querySelector('[data-lenh="ttk.xem"][data-k="cu"]').click(); await w(200);
   ok('chọn 👑 Tổ trưởng cũ + Chỉ thiếu: hiện người cũ còn thiếu', /Tổ Trưởng Cũ Giả/.test(hop()) && /7130000001/.test(hop()) && /thiếu/.test(hop()));
   let tai = []; const giuT = window.taiXuongBlob; window.taiXuongBlob = (bl, ten)=>tai.push(ten); document.querySelector('[data-lenh="ttk.excel"]').click(); for(let i=0;i<40 && !tai.length;i++) await w(100); window.taiXuongBlob = giuT;
   ok('📊 Excel', tai.length===1, tai.join());
   dongHop(); SXK_BANG = sxKiemDung(K); sxKiemVe(''); await w(100);
   ok('nút 👑 ở màn 📊 Kiểm tra hồ sơ scan', !!document.querySelector('#hop-in [data-lenh="ttk.mo"]'));
   dongHop(); D.scan = giuScan;
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
