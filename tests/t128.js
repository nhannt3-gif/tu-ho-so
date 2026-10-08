// 3.128 — (C) bộ in chuẩn: chia trang A4, số trang, 2 mặt, khung xem (đếm trang PDF thật).
// 3.128 — Tổ TK&VV: chip "Có dư nợ · chưa có TK 105", ngày tất nợ, Mới vào / Ra khỏi tổ (so Mẫu 31 tháng trước), biến động cả năm.
// Bộ GIẢ: tests/gia31 (Mẫu 31 T7, T8 — số liệu giả); dựng thêm biến động bằng cách sửa bảng T8 trong bộ nhớ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   doiNgan(7); slDoiTab('to'); for(let i=0;i<80 && !document.getElementById('to-cay');i++) await w(250);
   const C = toCH(); C.ky = '2026-08'; TO_KS = {}; TO_K = await toNap('2026-08');
   /* chọn tổ đông nhất có ở cả T7 và T8 */
   const M8 = await toMapKy('2026-08'), M7 = await toMapKy('2026-07');
   ok('bản đồ khách → tổ 2 tháng', !!M8 && !!M7 && Object.keys(M8).length>10, Object.keys(M8).length+' / '+Object.keys(M7).length);
   const t = Object.values(TO_K.to).filter(x=>!toLaTT(x)).sort((a, b)=>(TO_K.kh[b.ma]||[]).length-(TO_K.kh[a.ma]||[]).length)[0];
   /* tạo biến động giả: 1 khách tổ khác chuyển vào tổ t, 1 khách tổ t chuyển đi, 1 khách mới hoàn toàn */
   const khT = Object.keys(M8).filter(k=>M8[k].to===t.ma), khKhac = Object.keys(M8).filter(k=>M8[k].to!==t.ma && M7[k] && M7[k].to===M8[k].to);
   const kVao = khKhac[0], kDi = khT[0], toKhac = M8[kVao].to;
   M7[kVao] = Object.assign({}, M7[kVao]); M8[kVao] = Object.assign({}, M8[kVao], {to:t.ma});   /* từ tổ khác sang */
   M8[kDi] = Object.assign({}, M8[kDi], {to:toKhac});                                             /* sang tổ khác */
   M8['4899999999'] = {to:t.ma, ten:'KHÁCH GIẢ MỚI', dn:10000000, t105:0, nv:'2026-08-12'};      /* kết nạp mới */
   const B = toBienDong(t.ma, M8, M7);
   ok('Mới vào: hộ mới (CIF mới, ngày vay) + từ tổ khác — 3.132: chia nhóm', B.vao['4899999999'] && B.vao['4899999999'].tu==='hộ mới (CIF mới)' && B.vao['4899999999'].nhom==='moi' && B.vao[kVao].nhom==='chuyen' && B.vao['4899999999'].ngay==='2026-08-12' && B.vao[kVao] && /^từ tổ /.test(B.vao[kVao].tu), JSON.stringify(B.vao[kVao]));
   ok('Ra khỏi tổ: chuyển sang tổ khác ghi rõ', B.ra.some(r=>r.kh===kDi && /^sang tổ /.test(r.di)));
   delete M8['4899999999']; M8[kDi] = Object.assign({}, M8[kDi], {to:t.ma}); M8[kVao] = Object.assign({}, M8[kVao], {to:toKhac});
   const kMat = khT[1]; delete M8[kMat];
   const B2 = toBienDong(t.ma, M8, M7); ok('khách không còn trong Mẫu 31 → "không còn trong Mẫu 31"', B2.ra.some(r=>r.kh===kMat && r.di==='không còn trong Mẫu 31'));
   TO_MAP = {}; TO_BD = null;
   /* giao diện tổ */
   C.xa = t.xa; C.diem = t.khoaDiem; C.hoi = ''; C.to = t.ma; TO_LOC_MO = 'tat'; toVeThe(); await w(600);
   const the = document.getElementById('to-the');
   ok('dòng tóm tắt tổ có "Biến động T8/2026: +n vào · −n ra"', /Biến động T0?8\/2026: \+\d+ vào( \([^)]*\))? · −\d+ ra/.test(the.textContent), (the.querySelector('.to-the-so')||{}).textContent);
   const chip = [...the.querySelectorAll('.to-loc')].map(x=>x.textContent);
   ok('nút 📅 Biến động cả năm', chip.some(x=>/Biến động cả năm/.test(x)));
   { const so = (the.querySelector('.to-the-so')||{}).textContent||'', tvx = toTV(t), d = m=>tvx.filter(toLocHam(m)).length, lay = re=>+((so.match(re)||[])[1]);
     ok('3.129: dòng tóm tắt khớp chip (không dư nợ còn 105 · đề xuất cho ra · CCCD hết hạn) — thêm chip không làm lệch số', lay(/(\d+) không dư nợ còn 105/)===d('ko105') && lay(/(\d+) đề xuất cho ra/)===d('ra') && lay(/(\d+) CCCD hết hạn/)===d('cccd'), [d('ko105'), d('ra'), d('cccd')].join('/')+' · '+so.slice(0, 120)); }
   const tv = toTV(t), nCTK = tv.filter(k=>k.conNo && !k.stk.length).length;
   ok('chip "Có dư nợ · chưa có TK 105" đếm đúng (có dư nợ, không số TK)', TO_LOC.some(l=>l[0]==='ctk') && (nCTK===0 || chip.some(x=>x.indexOf('Có dư nợ · chưa có TK 105 '+nCTK)>=0)), nCTK+' khách');
   /* ngày tất nợ: khách không còn dư nợ */
   const ko = tv.filter(k=>!k.conNo);
   if(ko.length){ TO_LOC_MO = 'ko'; toVeThe(); await w(200);
     ok('chip Không dư nợ có cột "Ngày tất nợ" (ngày GD gần nhất của món tất toán, hoặc "trước năm")', /Ngày tất nợ/.test(the.querySelector('thead').textContent) && [...the.querySelectorAll('tbody tr')].every(tr=>/\d{2}\/\d{2}\/\d{4}|trước 2026/.test(tr.textContent))); }
   else ok('không có khách hết dư nợ trong tổ giả (bỏ qua ngày tất nợ)', true);
   TO_LOC_MO = 'rk'; toVeThe(); await w(200);
   ok('chip Ra khỏi tổ: bảng Đi đâu (lấy từ tháng trước)', /Đi đâu/.test(the.textContent));
   TO_LOC_MO = 'moi'; toVeThe(); await w(200);
   ok('chip Mới vào tổ: cột Ngày kết nạp (≈ ngày vay)', /Ngày kết nạp/.test(the.textContent) || !/Mới vào tổ/.test(the.textContent));
   const xBC = toBCDS(t); ok('In / Excel danh sách đang lọc theo chip mới', Array.isArray(xBC.aoa) && /DANH SÁCH TỔ VIÊN/.test(xBC.tieuDe));
   TO_LOC_MO = 'tat';
   /* biến động cả năm */
   toBDNam(); for(let i=0;i<40 && !(TO_BDN && TO_BDN.t===t);i++) await w(200); await w(200);
   const hop = document.getElementById('hop-in');
   ok('Biến động cả năm: bảng T1 … T8, có hàng Vào / Ra, tháng thiếu ghi "—"', /T1/.test(hop.textContent) && /T8/.test(hop.textContent) && /Vào/.test(hop.textContent) && /—/.test(hop.textContent), TO_BDN.ds.map(x=>x.ky+':'+(x.bd ? 'có' : '—')).join(' '));
   ok('T8 so được với T7 (có số liệu)', !!TO_BDN.ds.find(x=>x.ky==='2026-08').bd);
   dongHop();
   /* 3.132: cấp Hội / điểm / xã / PGD — tóm tắt + chip như của tổ; chip PGD; bảng PGD (Cộng trên đầu); vay trực tiếp STT 0 không tính số tổ; mới vào 3 nhóm */
   { const M7b = await toMapKy('2026-07'), mx = toCifMax(M7b), cu = Object.keys(M7b)[0];
     delete M7b[cu]; const vMoi = toVaoTu(String(mx+1), M7b), vCu = toVaoTu(cu, M7b), vChuyen = toVaoTu(Object.keys(M7b)[0], M7b);
     ok('3.132: mới vào chia 3 nhóm — CIF lớn hơn mọi CIF tháng trước = hộ mới; CIF cũ không có tháng trước = CIF cũ dùng lại; tháng trước ở tổ khác = chuyển tổ', vMoi.nhom==='moi' && vCu.nhom==='cu' && vChuyen.nhom==='chuyen', [vMoi.tu, vCu.tu, vChuyen.tu].join(' / '));
     TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null;
     C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; TO_LOC_PV = 'bang'; pvVeCay('to'); await w(1500);
     const chipX = [...document.querySelectorAll('#to-cay .to-chip')].map(x=>x.textContent+(x.classList.contains('bat') ? '*' : ''));
     ok('3.132: hàng chip xã có chip PGD (đang chọn khi chưa chọn xã)', chipX[0]==='PGD*', chipX.slice(0, 3).join(' | '));
     const so = (document.querySelector('#to-the .to-the')||{}).textContent||'';
     ok('3.132: cấp PGD có dòng tóm tắt (số tổ, tổ viên, đề xuất cho ra, CCCD, biến động) + chip như tổ', /Toàn PGD · \d+ tổ/.test(so) && /tổ viên: \d+ có dư nợ/.test(so) && /CCCD hết hạn/.test(so) && /Biến động T0?8\/2026/.test(so) && [...document.querySelectorAll('#to-the .to-loc')].some(x=>/Tất cả \d+/.test(x.textContent)), so.slice(0, 160));
     const hp = [...document.querySelectorAll('.to-bang-pgd tbody tr')];
     ok('3.132: bảng PGD — dòng Cộng toàn PGD trên đầu, rồi dòng xã, dưới là điểm GD', hp[0] && /CỘNG TOÀN PGD/.test(hp[0].textContent) && hp[1].classList.contains('nhom') && hp[2].classList.contains('diem'), hp.slice(0, 3).map(x=>x.className).join(','));
     TO_LOC_PV = 'tat'; toVeThe(); await w(100);
     ok('3.132: bấm chip ở cấp PGD → danh sách khách cả PGD có cột Tổ + Xã', /<th>Tổ<\/th><th>Họ tên<\/th><th>Xã<\/th>/.test(document.getElementById('to-the').innerHTML));
     const bc = toBCDSPV(C); ok('3.132: In / Excel danh sách phạm vi (đầu báo cáo ghi Phạm vi)', bc.aoa[0][2]==='Tổ' && bc.aoa[0][3]==='Họ tên' && /Phạm vi: <b>Toàn PGD/.test(toHTMLIn([bc], toGiaPV(C))));
     TO_LOC_PV = 'bang';
     /* vay trực tiếp giả trong điểm của tổ t */
     const K = TO_K, r0 = Object.assign({}, (K.kh[t.ma]||[])[0], {kh:'4811111111', to:'', ku:'TTGIA1', _tt:'TTGIA'}); K.to.TTGIA = {ma:'TTGIA', trucTiep:true, xa:t.xa, tenXa:t.tenXa, khoaDiem:t.khoaDiem, tenDiemDu:t.tenDiemDu, dv:'99', ten:'Vay trực tiếp (không qua tổ)', soMon:1}; K.kh.TTGIA = [r0];
     TO_PVC = null; toChonPV(t.xa, t.khoaDiem); await w(600);
     const nTo = Object.values(K.to).filter(x=>!x.trucTiep && x.xa===t.xa && x.khoaDiem===t.khoaDiem).length, rows = [...document.querySelectorAll('#to-the .to-bang.chon tbody tr')];
     ok('3.132: vay trực tiếp STT 0, đầu nhóm điểm GD; tổ đánh số từ 1; "Cộng n tổ" không tính vay trực tiếp', rows[0] && rows[0].cells[0].textContent==='0' && /Vay trực tiếp/.test(rows[0].textContent) && rows[1].cells[0].textContent==='1' && new RegExp('Cộng '+nTo+' tổ').test(rows[rows.length-1].textContent), rows[0] && rows[0].textContent.slice(0, 40)+' · '+rows[rows.length-1].textContent.slice(0, 40));
     ok('3.132: tóm tắt điểm GD đếm số tổ không tính vay trực tiếp, ghi riêng khách vay trực tiếp', new RegExp('· '+nTo+' tổ').test(document.querySelector('#to-the .to-the').textContent) && /vay trực tiếp 1 khách/.test(document.querySelector('#to-the .to-the').textContent));
     ok('3.132: In / Excel bảng các tổ — dòng vay trực tiếp STT 0', TO_BANG_XUAT && TO_BANG_XUAT.aoa[0][0]===0 && /Cộng \d+ tổ/.test(TO_BANG_XUAT.tong[2]));
     delete K.to.TTGIA; delete K.kh.TTGIA; TO_PVC = null;
     C.hoi = String(t.dv); pvVeCay('to'); await w(600);
     ok('3.132: cấp Hội có tóm tắt + chip', /Hội|Đoàn/.test((document.querySelector('#to-the .to-the-ten')||{}).textContent||'') && document.querySelectorAll('#to-the .to-loc').length>3, (document.querySelector('#to-the .to-the-ten')||{}).textContent);
     toBDNam(); for(let i=0;i<40 && !(TO_BDN && TO_BDN.pv);i++) await w(200); await w(200);
     ok('3.132: Biến động cả năm cho phạm vi — tách hộ mới / CIF cũ dùng lại / chuyển tổ', /hộ mới \(CIF mới\)/.test(document.getElementById('hop-in').textContent) && /CIF cũ dùng lại/.test(document.getElementById('hop-in').textContent) && TO_BDN.pv);
     dongHop(); C.xa = t.xa; C.diem = t.khoaDiem; C.hoi = ''; C.to = t.ma; }
   /* 3.133: chọn đa chiều (chỉ tab Tổ) — Hội cả xã, Hội toàn PGD; đổi xã giữ Hội; tab KTGS không đổi */
   { const h = String(t.dv), xa = t.xa, Tt = Object.values(TO_K.to);
     C.xa = xa; C.diem = ''; C.hoi = h; C.to = ''; TO_LOC_PV = 'bang'; pvVeCay('to'); await w(600);
     const oHoi = document.getElementById('to-hoi');
     ok('3.133: tab Tổ chọn Hội khi chưa chọn điểm GD (cả xã)', oHoi && !oHoi.disabled && oHoi.value===h, oHoi && oHoi.value);
     const nX = Tt.filter(x=>x.xa===xa && String(x.dv)===h && !x.trucTiep).length, ten = (document.querySelector('#to-the .to-the-ten')||{}).textContent||'';
     ok('3.133: Xã + Hội (cả xã) → tóm tắt / bảng chỉ các tổ của Hội đó trong cả xã', /\(cả xã\)/.test(ten) && new RegExp('· '+nX+' tổ').test(ten) && toDsTo(C).every(x=>x.xa===xa && String(x.dv)===h), ten.slice(0, 120));
     C.xa = ''; pvVeCay('to'); await w(600);
     const nP = Tt.filter(x=>String(x.dv)===h && !x.trucTiep).length, hp = [...document.querySelectorAll('.to-bang-pgd tbody tr')];
     ok('3.133: PGD + Hội → bảng PGD chỉ cộng tổ của Hội (Cộng trên đầu ghi tên Hội)', C.hoi===h && hp[0] && new RegExp('CỘNG TOÀN PGD · ').test(hp[0].textContent) && +hp[0].cells[1].textContent===nP, hp[0] && hp[0].textContent.slice(0, 80)+' / '+nP);
     const xa2 = Tt.find(x=>x.xa!==xa && String(x.dv)===h); if(xa2){ pvChon('to', 'xa', xa2.xa, 1); await w(300); }
     ok('3.133: đổi xã vẫn giữ Hội đang lọc', !xa2 || C.hoi===h);
     ok('3.133: tab khác (KTGS) giữ như cũ — Hội cần điểm GD', pvCha({xa:'x', diem:''}, 'hoi')===false && pvCha({xa:'x', diem:''}, 'hoi', true)===true);
     /* bảng chi tiết vào / ra (biến động giả T8 của tổ t) */
     C.xa = t.xa; C.diem = t.khoaDiem; C.hoi = ''; C.to = t.ma; TO_MAP = {}; TO_BD = null;
     const N8 = await toMapKy('2026-08'), N7 = await toMapKy('2026-07'), khT = Object.keys(N8).filter(k=>N8[k].to===t.ma), khK = Object.keys(N8).filter(k=>N8[k].to!==t.ma && N7[k] && N7[k].to===N8[k].to);
     const kV = khK[0], kR = khT[0]; N8[kV] = Object.assign({}, N8[kV], {to:t.ma}); N8[kR] = Object.assign({}, N8[kR], {to:N8[khK[1]].to}); N7[kR] = Object.assign({}, N7[kR], {gd:'2026-07-20'});
     toBDNam(); for(let i=0;i<40 && !(TO_BDN && TO_BDN.t===t);i++) await w(200); await w(200);
     const B = toBDNamBang(), hop = document.getElementById('hop-in').innerHTML;
     ok('3.133: bảng chi tiết cấp tổ — STT · Mã KH · Họ tên hộ vay · Vào (ngày) · Ra (ngày) · Ghi chú (không cột Tổ)', B.cot.join()==='STT,Mã KH,Họ tên hộ vay,Vào (ngày),Ra (ngày),Ghi chú' && /Bảng chi tiết vào \/ ra/.test(hop), B.cot.join());
     const rV = B.aoa.find(r=>r[1]===kV), rR = B.aoa.find(r=>r[1]===kR);
     ok('3.133: dòng vào (chuyển tổ: ghi tháng, ghi chú "Chuyển từ tổ …") và dòng ra (ghi chú "Chuyển sang tổ …")', rV && rV[3]==='T8/2026' && /^Chuyển từ tổ/.test(rV[5]) && rR && rR[4]==='T8/2026' && /^Chuyển sang tổ/.test(rR[5]), JSON.stringify([rV, rR]));
     ok('3.133: dòng Cộng: n vào · m ra · chênh lệch', /^Cộng: \d+ vào · \d+ ra · chênh lệch/.test(B.tong), B.tong);
     dongHop(); C.to = ''; C.hoi = ''; C.diem = ''; TO_BDN = null;
     toBDNam(); for(let i=0;i<40 && !(TO_BDN && TO_BDN.pv);i++) await w(200); await w(200);
     ok('3.133 / 3.137: cấp xã → thêm cột Điểm GD + Tổ (in trước Họ tên)', toBDNamBang().cot.join()==='STT,Mã KH,Điểm GD,Tổ,Họ tên hộ vay,Vào (ngày),Ra (ngày),Ghi chú', toBDNamBang().cot.join());
     dongHop(); TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; C.xa = t.xa; C.diem = t.khoaDiem; C.to = t.ma; }
   /* sửa lỗi 3.127: số TK 105 (Dư nợ chi tiết) không hiện khi file này nạp TRƯỚC Mẫu 31 */
   { const f8 = files.find(f=>/31-08-2026\.XLSX$/.test(f.n)), mk = (b64, n)=>{ const bin=atob(b64), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
     const k8 = await slDocFile(mk(f8.b, f8.n)), hs = k8.rows.filter(x=>x.ku && x.kh), soTK = kh=>'70'+String(kh).slice(-8);
     const H = ['Mã xã','Tên xã','Mã thôn','Tên thôn','Ngày GDXA','Mã điểm giao dịch','Tên điểm giao dịch','Mã tổ','Mã KH','Tên KH','Số khế ước','Tình trạng món vay','Tổng dư nợ','Sổ tiết kiệm 105','Số dư tiền gửi 105','Ngày số liệu'];
     const ws = XLSX.utils.aoa_to_sheet([H].concat(hs.map(x=>[x.xa, x.tenXa, x.thon, x.tenThon, '09', '', '', x.to, x.kh, x.ten, x.ku, 'OPEN', 999999, soTK(x.kh), 123456, '31/08/2026']))), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
     await slGhi(await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], '004820_DU_NO_CHI_tiet_DEN_31-08-2026.xlsx')));
     const kh = hs[0].kh, xoaTK = ()=>Object.values(SL_DB.kh).forEach(c=>{ delete c.stk; delete c.stkNguon; delete c.stkKy; });
     xoaTK(); await slGhi(k8);
     ok('nạp Mẫu 31 SAU Dư nợ chi tiết → số TK 105 vẫn gắn theo Dư nợ chi tiết', SL_DB.kh[kh].stk===soTK(kh) && SL_DB.kh[kh].stkNguon==='dnct', SL_DB.kh[kh].stk);
     TO_KS = {}; const K = await toNap('2026-08'), tt = K.to[hs[0].to], x = tt && (()=>{ const g = TO_K; TO_K = K; const r = toTV(tt).find(z=>z.kh===kh); TO_K = g; return r; })();
     ok('danh sách Tổ TK&VV hiện số TK 105', !!x && x.stk.join()===soTK(kh), x && x.stk.join());
     xoaTK(); await slLuuDanhBa(); await slNapDanhBa();
     ok('máy đã lỡ nạp sai thứ tự (danh bạ thiếu số TK) → mở app tự gắn lại', SL_DB.kh[kh].stk===soTK(kh));
     /* 3.130: nạp Dư nợ chi tiết tháng cũ (12/2025) — khách nay đã tất nợ (file mới không ghi số sổ) lấy số của tháng cũ; khách còn vay giữ số mới */
     const Y = hs.find(z=>z.kh!==kh).kh, dn = (ky, ten, tk)=>{ const w2 = XLSX.utils.aoa_to_sheet([H].concat(hs.map(z=>[z.xa, z.tenXa, z.thon, z.tenThon, '09', '', '', z.to, z.kh, z.ten, z.ku, tk(z.kh) ? 'OPEN' : 'CLOSE', 0, tk(z.kh)||'', 0, ky]))), b2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(b2, w2, 'Sheet 1'); return new File([XLSX.write(b2, {type:'array', bookType:'xlsx'})], ten); };
     await slGhi(await slDocFile(dn('31/08/2026', '004820_DU_NO_CHI_tiet_DEN_31-08-2026.xlsx', m=>m===kh ? '' : '71'+m.slice(-8))));
     await slGhi(await slDocFile(dn('31/12/2025', '004820_DU_NO_CHI_tiet_DEN_31-12-2025.xlsx', m=>(m===Y ? '79' : '70')+m.slice(-8))));
     ok('3.130: Dư nợ chi tiết 12/2025 → khách đã tất nợ có số sổ tháng cũ, khách còn vay giữ số mới', SL_DB.kh[kh].stk==='70'+kh.slice(-8) && SL_DB.kh[Y].stk==='71'+Y.slice(-8), SL_DB.kh[kh].stk+' · '+SL_DB.kh[Y].stk);
     const kTen = await slDocFile(dn('31/12/2025', '004820_DU_NO_CHI_TIET_DEN_07-10-2026.xlsx', m=>'70'+m.slice(-8)));
     ok('3.131: Dư nợ chi tiết lấy kỳ theo cột "Ngày số liệu" trong file, không theo ngày trên tên file', kTen.ky==='2025-12' && kTen.nguonKy==='cột ngày trong file', kTen.ky+' · '+kTen.nguonKy);
     await slDungDanhBa();
     ok('3.130: dựng lại danh bạ (máy mới / tải từ Drive) vẫn giữ số sổ tháng cũ — Dư nợ chi tiết gắn sau mọi Mẫu 31', SL_DB.kh[kh].stk==='70'+kh.slice(-8) && SL_DB.kh[Y].stk==='71'+Y.slice(-8), SL_DB.kh[kh].stk+' · '+SL_DB.kh[Y].stk); }
   return o;
 }, files);
 /* phần C — bộ in chuẩn: tự chia trang A4, @page lề 0 (không còn dòng đầu / cuối trang của trình duyệt), số trang, 2 mặt, khung xem */
 const H = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const t = Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99' && x.xa)[0]; C.xa = t.xa; ktChonTo(t.ma); await w(200);
   const g06 = ktGiaTri06(t, ktDaChon(), ktInV('m06')), r0 = g06.rows.find(r=>r.gop!=='tiep') || g06.rows[0];
   const dung = k => Object.assign({}, g06, {rows:Array.from({length:k}, (_, i)=>Object.assign({}, r0, {R1:String(i+1), R2:'Khách Giả '+(i+1), gop:'', n:1}))});
   const o = {m06:inChuan(ktHTML06(dung(20))), mot:[1, 4, 1, 6, 2].map(k=>inChuan(ktHTML06(dung(k)))), ghep:inChuan(ktHTML06([1, 4, 1, 6, 2].map(dung))), m16:inChuan(ktHTML16(ktGiaTri16(t, ktDaChon(), ktInV('m16'))))};
   o.xem = inChuan(ktHTML06([1, 4].map(dung)), 1); o.lai = inChuan(o.m06)===o.m06; return o; });
 const mo = async (h, xem) => { const q = await b.newPage({viewport:{width:1100,height:800}}); q.on('pageerror',e=>loi.push(e.message)); await q.setContent(h); for(let i=0;i<60 && !(await q.evaluate(()=>window.TR_XONG));i++) await q.waitForTimeout(100); return q; };
 const dem = async h => { const q = await mo(h); const so = await q.evaluate(()=>window.TR_SO), pdf = await q.pdf({preferCSSPageSize:true}); await q.close();
   return {so, n:await p.evaluate(async a=>(await PDFLib.PDFDocument.load(new Uint8Array(a))).getPageCount(), Array.from(pdf))}; };
 const ok2 = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 ok2('bộ in chuẩn: @page lề 0 (bỏ dòng đầu / cuối trang trình duyệt), bỏ đoạn ước lượng 2 mặt cũ, không chuẩn hóa 2 lần', /@page\{size:A4 portrait;margin:0\}/.test(H.m06) && !/kt-trang-trang\{/.test(H.m06) && H.lai);
 let q = await mo(H.m06); const x06 = await q.evaluate(()=>({so:[...document.querySelectorAll('.tr-so')].map(x=>x.textContent), tg:document.querySelectorAll('.tr-tg.ngang').length, lap:[...document.querySelectorAll('.tr-tg')].every(t=>t.querySelectorAll('.kt-bg thead').length===1), cot:[...document.querySelectorAll('.tr-tg')].map(t=>Math.round(t.querySelector('.kt-bg th[rowspan]').getBoundingClientRect().width)).join()})); await q.close();
 ok2('Mẫu 06 20 hộ: chia trang A4 ngang, "Trang x/y" mọi trang, lặp tiêu đề bảng, cột giữ nguyên bề rộng', x06.tg>=2 && x06.so.join()===Array.from({length:x06.tg}, (_, i)=>'Trang '+(i+1)+'/'+x06.tg).join() && x06.lap && new Set(x06.cot.split(',')).size===1, JSON.stringify(x06));
 const d06 = await dem(H.m06); ok2('Mẫu 06: số trang xem trước = số trang PDF thật', d06.so===d06.n, JSON.stringify(d06));
 const so = []; for(const h of H.mot) so.push((await dem(h)).n);
 const ky = so.reduce((a, n, i)=>a+(i<so.length-1 ? n+(n%2) : n), 0), dg = await dem(H.ghep);
 ok2('In 2 mặt (PDF thật): bản lẻ trang thêm đúng 1 trang trắng → mỗi bản bắt đầu mặt trước', dg.n===ky && dg.so===dg.n, 'từng bản '+JSON.stringify(so)+' → ghép '+dg.n+' (mong đợi '+ky+')');
 q = await mo(H.m16); const x16 = await q.evaluate(()=>({so:[...document.querySelectorAll('.tr-so')].map(x=>x.textContent).join(), n:window.TR_SO, mo:[...document.querySelectorAll('.tr-nd')].map(n=>{ const r = [...n.querySelectorAll('.kt-bg tr')].pop(); return r ? r.textContent.slice(0, 30) : ''; })})); await q.close();
 ok2('Mẫu 16: số trang góc dưới phải từ trang 2; dòng tiêu đề mục không bị bỏ lại cuối trang', x16.so===Array.from({length:x16.n-1}, (_, i)=>String(i+2)).join() && !x16.mo.slice(0, -1).some(t=>/^\d\. /.test(t)), JSON.stringify(x16));
 q = await mo(H.xem); const xv = await q.evaluate(async()=>{ const t = document.getElementById('tr-thanh'), n = document.getElementById('tr-n').textContent, b = l=>t.querySelector('[data-l="'+l+'"]');
   b('cuoi').click(); await new Promise(r=>setTimeout(r, 100)); const cuoi = document.getElementById('tr-o').value; b('trang').click(); const pt = document.getElementById('tr-pt').textContent;
   return {n, cuoi, pt, nut:[...t.querySelectorAll('button')].map(x=>x.textContent).join(' '), nhan:document.querySelectorAll('.tr-nhan').length, trang:document.querySelectorAll('.tr-trang-trang').length}; }); await q.close();
 ok2('khung xem: ⏮ ‹ n/N › ⏭, − % +, ↔, ⊡, In, PDF, toàn màn hình; nhãn từng bản; trang trắng 2 mặt hiện mờ', /⏮.*‹.*›.*⏭.*−.*\+.*↔.*⊡.*In.*PDF.*⤢/.test(xv.nut) && xv.cuoi===xv.n && /%$/.test(xv.pt) && xv.nhan===2 && xv.trang===1, JSON.stringify(xv));
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
