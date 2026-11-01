// 3.426 (GIAO_BAN_KY_NANG mục 4.2 — GĐ 3): 📄 nháp Thông báo kết luận theo phiên 08/GDX (js/89) — đầu "Số: /TB-KLGB", ngày ký = ngày làm việc kế tiếp phiên,
//   THÔNG BÁO / Kết luận … / Tại điểm …, không "(Số liệu đến ngày …)", I–IV, bảng 11 cột, "Biểu Kết quả giao dịch … kèm theo.", tồn tại II.2, nơi nhận điểm phụ, ký GIÁM ĐỐC;
//   có kỳ trước → "(… so với ngày <cuối tháng trước>)". Bộ GIẢ gianho31 + C21-1 (truong_hop_mau).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const TEO = JSON.parse(fs.readFileSync(path.join(__dirname,'chung','truong_hop_mau.json'),'utf-8')), C21 = TEO.truong_hop.find(c=>c.id==='C21-1');
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async([files, C21, BO])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await KHO.nap('2026-08'), B = bcTinh(K, null), d = Object.keys(B.diem)[0];
   const txt = h => { const x = document.createElement('div'); x.innerHTML = h; return x.textContent; }, t = txt(tbDung(K, null, B, d));
   ok('đầu: Số: /TB-KLGB · Tây Ninh, ngày 1 tháng 9 năm 2026 (31/08 thứ Hai → ngày làm việc kế tiếp)', /Số:\s+\/TB-KLGB/.test(t) && /Tây Ninh, ngày 1 tháng 9 năm 2026/.test(t), (t.match(/Tây Ninh[^\n]{0,30}/)||[''])[0]);
   ok('THÔNG BÁO / Kết luận cuộc họp giao ban tháng 08/2026 / Tại điểm giao dịch …; KHÔNG có "(Số liệu đến ngày …)"', /THÔNG BÁO/.test(t) && /Kết luận cuộc họp giao ban tháng 08\/2026/.test(t) && /Tại điểm giao dịch/.test(t) && !/Số liệu đến ngày/.test(t));
   ok('I–IV đúng 08/GDX', ['I. CHÍNH SÁCH MỚI TRONG THÁNG', 'II. KẾT QUẢ THỰC HIỆN TẠI ĐIỂM GIAO DỊCH (đến ngày 31/08/2026)', 'III. NHIỆM VỤ THÁNG TIẾP THEO', 'IV. KIẾN NGHỊ, ĐỀ XUẤT'].every(s=>t.indexOf(s)>=0));
   ok('II.1: "… khách hàng còn dư nợ, thông qua … Tổ TK&VV" + bảng 11 cột + "Biểu Kết quả giao dịch tại điểm giao dịch kèm theo."', /khách hàng còn dư nợ, thông qua \d+ Tổ TK&VV/.test(t) && /Tỷ trọng %/.test(t) && /Số món KHĐ/.test(t) && /Biểu Kết quả giao dịch tại điểm giao dịch kèm theo\./.test(t));
   ok('II.2 tồn tại: quá hạn, chất lượng Tổ, KH 1166, huy động', /Tồn tại, hạn chế/.test(t) && /(Không phát sinh nợ quá hạn|Nợ quá hạn)/.test(t) && /Chất lượng Tổ/.test(t) && /KH 1166/.test(t) && /Huy động tiền gửi/.test(t));
   ok('nơi nhận điểm phụ (không UBND trong danh sách), ký GIÁM ĐỐC, "Lưu: VT, CBTD"', /Nơi nhận:/.test(t) && /Lưu: VT, CBTD/.test(t) && /GIÁM ĐỐC/.test(t) && !/- (Đảng ủy|UBND)/.test(t));
   ok('cách viết: không "……", "yêu cầu", "ấp/khu phố", số chẵn không ",0"; có ô vàng giao ban điền', !/……|yêu cầu|ấp\/khu phố|khẩn trương/.test(t) && !/\d,0(?!\d)/.test(t) && (t.match(/\[Giao ban điền:/g)||[]).length>=4);
   /* có kỳ trước (C21-1): so với ngày 30/09 */
   const vn = s => { const m = String(s||'').match(/^(\d\d)\/(\d\d)\/(\d{4})$/); return m ? m[3]+'-'+m[2]+'-'+m[1] : ''; };
   const nap = async(aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); const k = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!k.loi && k.ky) await slGhi(k); return k; };
   const m31 = async(ds, ngay, ten) => { const dd = ds.map(x=>{ const z = Object.assign({}, BO.mac_dinh_mau31, x, {'Ngày số liệu':ngay}); if(z['Sổ tiết kiệm 105']) z['Sổ tiết kiệm 105'] = '1050000001'; return z; }); const cot = []; dd.forEach(x=>Object.keys(x).forEach(c=>{ if(cot.indexOf(c)<0) cot.push(c); }));
     return nap([['31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu'], [], cot].concat(dd.map(x=>cot.map(c=>x[c]===undefined ? '' : x[c]))), ten); };
   await m31(C21.ky_truoc.mau31, C21.ky_truoc.ngay, 'mau31 truoc.xlsx'); await m31(C21.mau31, BO.ngay_so_lieu, 'mau31 nay.xlsx');
   const CT = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
   await nap([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], CT].concat(C21.to_truong.map(x=>{ const z = Object.assign({}, BO.mac_dinh_to_truong, x, {NGAYBC:BO.ngay_so_lieu, TENXA:BO.mac_dinh_mau31['Tên xã']}); return CT.map(c=>z[c]===undefined ? '' : z[c]); })), 'baocao_'+vn(BO.ngay_so_lieu).replace(/-/g,'')+'_000000.xlsx');
   SL_BO = {}; TO_KS = {}; const Kp = await KHO.nap(slThang(vn(C21.ky_truoc.ngay))), K2 = await KHO.nap(slThang(vn(BO.ngay_so_lieu))), B2 = bcTinh(K2, Kp), d2 = Object.keys(B2.diem)[0];
   const t2 = txt(tbDung(K2, Kp, B2, d2));
   ok('có kỳ trước: "Tổng dư nợ đạt 58 triệu đồng … (giảm 2 triệu đồng so với ngày 30/09/2026)"', /Tổng dư nợ đạt 58 triệu đồng/.test(t2) && /giảm 2 triệu đồng so với ngày 30\/09\/2026/.test(t2), (t2.match(/Tổng dư nợ đạt[^.]*\./)||[''])[0]);
   ok('huy động ± so với ngày cuối tháng trước', /Huy động tiền gửi tiết kiệm qua Tổ đạt 1,2 triệu đồng, tăng 0,2 triệu đồng so với ngày 30\/09\/2026/.test(t2), (t2.match(/Huy động[^.]*\./)||[''])[0]);
   /* nút trong hộp 📐 + xuất Word */
   bcMo('2026-08'); for(let j=0;j<40 && !document.querySelector('[data-lenh="tb.xuat"]');j++) await w(100);
   let tai = []; const g = window.taiXuongBlob; window.taiXuongBlob = (bl, ten)=>tai.push([ten, bl.type]); document.querySelector('[data-lenh="tb.xuat"]').click(); await w(200); window.taiXuongBlob = g;
   ok('nút 📄 trong hộp 📐 → tải file Word (.doc)', tai.length===1 && /^Nhap TB KL phien .+\.doc$/.test(tai[0][0]) && /msword/.test(tai[0][1]), JSON.stringify(tai));
   return o; }, [files, C21, {mac_dinh_mau31:TEO.mac_dinh_mau31, mac_dinh_to_truong:TEO.mac_dinh_to_truong, ngay_so_lieu:TEO.ngay_so_lieu}]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
