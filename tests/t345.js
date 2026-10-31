// 3.425 (TEO_GIAO_BAN_KY_NANG mục 4.1, 4.4, 4.5 — GĐ 2): 📝 nháp Nội dung họp mẫu 08 (js/88) — đủ đề mục I–IV, bảng II.1 = bộ số chuẩn,
//   "… khách hàng còn dư nợ" (QT-C-14), cách viết (không "……", "yêu cầu", "ấp/khu phố", số chẵn không ",0"), ô vàng phần giao ban điền, xuất Word. Bộ GIẢ gianho31.
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
   SL_BO = {}; TO_KS = {}; const K = await KHO.nap('2026-08'), B = bcTinh(K, null), d = Object.keys(B.diem)[0], D = B.diem[d];
   const html = ndDung(K, B, d), txt = (()=>{ const x = document.createElement('div'); x.innerHTML = html; return x.textContent; })();
   ok('đầu: "NỘI DUNG HỌP GIAO BAN THÁNG 09/2026" (số 31/08 → họp tháng 9), tên điểm, (Số liệu đến ngày 31/08/2026), ghi rõ bản nháp', /NỘI DUNG HỌP GIAO BAN THÁNG 09\/2026/.test(txt) && /\(Số liệu đến ngày 31\/08\/2026\)/.test(txt) && /Bản nháp app/.test(txt) && /PHÒNG GIAO DỊCH GÒ DẦU/.test(txt));
   ok('đủ 4 phần I – IV đúng mẫu 08', ['I. VĂN BẢN MỚI', 'II. KẾT QUẢ HOẠT ĐỘNG', 'III. NHIỆM VỤ THÁNG TIẾP THEO', 'IV. NHẬN ĐỊNH CHUNG, KIẾN NGHỊ, ĐỀ XUẤT'].every(s=>txt.indexOf(s)>=0) && ['1. Kế hoạch thu nợ, giải ngân', '2. Kiểm tra, giám sát', '3. Đôn đốc, xử lý nợ', '4. Nội dung khác'].every(s=>txt.indexOf(s)>=0));
   const tong = Object.keys(D.so).reduce((a, h)=>a+D.so[h].du_no, 0), kh = Object.keys(D.so).filter(h=>h!=='TT').reduce((a, h)=>a+D.so[h].so_kh_du_no, 0);
   ok('câu II.1: tổng dư nợ = bộ số chuẩn, "… khách hàng còn dư nợ" (QT-C-14)', txt.indexOf('Tổng dư nợ đạt '+ndSo(tong)+' triệu đồng, với '+kh+' khách hàng còn dư nợ')>=0, ndSo(tong)+' / '+kh);
   ok('bảng II.1 có dòng ỦY THÁC + Cộng, Hội viết tắt', /ỦY THÁC/.test(txt) && /Cộng/.test(txt) && /(HND|HPN|HCCB|ĐTN)/.test(txt));
   ok('cách viết: không "……", "yêu cầu", "ấp/khu phố", "khẩn trương", số chẵn không ",0"', !/……|yêu cầu|ấp\/khu phố|khẩn trương|quyết liệt/.test(txt) && !/\d,0(?!\d)/.test(txt), (txt.match(/.{0,20}(\d,0(?!\d)|yêu cầu).{0,20}/)||[''])[0]);
   ok('phần app không có dữ liệu → ô vàng "[Giao ban điền: …]" (văn bản mới, xếp loại tổ, nội dung khác)', (txt.match(/\[Giao ban điền:/g)||[]).length>=3);
   ok('ký: TỔ TRƯỞNG TỔ GIAO DỊCH · PHÊ DUYỆT CỦA BAN GIÁM ĐỐC, không "(Ký, ghi rõ họ tên)"', /TỔ TRƯỞNG TỔ GIAO DỊCH/.test(txt) && /PHÊ DUYỆT CỦA BAN GIÁM ĐỐC/.test(txt) && !/Ký, ghi rõ/.test(txt));
   ok('không câu cụt ("thu hồi ."), không "Lãi tồn 0 triệu đồng"', !/ \.|thu hồi\s*\./.test(txt) && !/Lãi tồn 0 triệu/.test(txt), (txt.match(/.{0,30}( \.|Lãi tồn 0).{0,10}/)||[''])[0]);
   ok('định dạng số: 57.012,4 · 1.690 · 59,39', ndSo(57012.4)==='57.012,4' && ndSo(1690)==='1.690' && ndSo(59.391, 2)==='59,39' && ndO(0)==='-');
   /* nút trong hộp 📐 + xuất Word */
   bcMo('2026-08'); for(let j=0;j<40 && !document.querySelector('[data-lenh="nd.xuat"]');j++) await w(100);
   let tai = []; const g = window.taiXuongBlob; window.taiXuongBlob = (bl, ten)=>tai.push([ten, bl.type]); document.querySelector('[data-lenh="nd.xuat"]').click(); await w(200); window.taiXuongBlob = g;
   ok('nút 📝 trong hộp 📐 → tải file Word (.doc)', tai.length===1 && /^Nhap ND hop m08 .+\.doc$/.test(tai[0][0]) && /msword/.test(tai[0][1]), JSON.stringify(tai));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
