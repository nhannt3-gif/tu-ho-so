// 3.136 — Số liệu theo NGÀY: mọi loại nạp được theo ngày; kỳ ngày lấy bảng đúng ngày, thiếu thì bảng liền trước (cuối tháng trước) + ghi căn cứ;
//        Mới vào / Ra khỏi tổ so ngày với cuối tháng trước; cột 📅 Theo ngày + Xóa ngày cũ; dựng sẵn ngày mới nhất; Sau giải ngân dùng Mẫu 31 ngày.
// Bộ GIẢ: tests/gia31 (Mẫu 31 T7, T8 …) — bản "theo ngày" dựng bằng cách đọc file T8 rồi gán ngày khác (số liệu giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = n => { const f = files.find(x=>x.n===n), bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   for(const f of files){ const kq = await slDocFile(tep(f.n)); if(!kq.loi) await slGhi(kq); }
   const ngay = async (ten, ky, sua) => { const kq = await slDocFile(tep(ten)); kq.ky = ky; kq.ngay = ky; if(sua) sua(kq); return slGhi(kq); };
   /* Mẫu 31 + KHĐ ngày 10/09 (giả từ T8; bỏ 1 khách để có "ra khỏi tổ") */
   const k8 = await slDocFile(tep('Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX')); const khDi = k8.rows.find(x=>x.ku && x.to && x.to!==TO_GIA).kh, toDi = k8.rows.find(x=>x.kh===khDi).to;
   await ngay('Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX', '2026-09-10', kq=>{ kq.rows = kq.rows.filter(x=>x.kh!==khDi); kq.lap = (kq.lap||[]).filter(x=>x.kh!==khDi); });
   await ngay('Mon_vay_03_thang_KHD_2026-08-31.xlsx', '2026-09-10');
   ok('loại mới nạp theo ngày: KHĐ, quá hạn, khoanh, tổ trưởng, DSTO, Tổng dư nợ = tùy kỳ', ['khd','nqh','nk','tt','dsto','tdn'].every(slTuy) && !!SLM.bang[slKhoa('khd', '2026-09-10')]);
   const dk = toDsKy(); ok('ô Số liệu có "ngày 10/09/2026 · Mẫu 31" (sau các tháng)', dk.some(x=>x.ky==='2026-09-10' && /Mẫu 31/.test(x.chu)) && dk[0].ky.length===7, dk.map(x=>x.chu).join(' | '));
   TO_KS = {}; SL_BO = {}; const K = await toNap('2026-09-10');
   ok('kỳ ngày: Mẫu 31 + KHĐ đúng ngày, Quá hạn / Tổ trưởng lấy cuối T8', K.B.nguon.hstd==='2026-09-10' && K.B.nguon.khd==='2026-09-10' && K.B.nguon.nqh==='2026-08' && K.B.nguon.tt==='2026-08', JSON.stringify(K.B.nguon));
   ok('kỳ ngày: danh sách món theo Mẫu 31 ngày (khách bỏ không còn)', K.hsTen==='Mẫu 31 ngày 10/09/2026' && !K.hs.some(x=>x.kh===khDi) && K.hs.length>10, K.hsTen);
   const Km = await toNap('2026-08'); ok('kỳ cuối tháng giữ nguyên: lấy đúng bảng T8', Km.B.nguon.hstd==='2026-08' && Km.B.nguon.khd==='2026-08' && Km.hs.some(x=>x.kh===khDi));
   const gc = slNguonHTML(K.B), gk = slNguonHTML(K.B, true);
   ok('ghi chú căn cứ (tab Tổ / Sao kê): "Mẫu 31: 10/09 · … Quá hạn: cuối T8" (mượn = tô vàng)', /Số liệu ngày <b>10\/09\/2026<\/b>/.test(gc) && /Mẫu 31: 10\/09/.test(gc) && /class="muon"[^>]*>Quá hạn: cuối T8/.test(gc), gc.replace(/<[^>]+>/g, ''));
   ok('KTGS: chỉ cảnh báo đủ / thiếu → lấy cuối tháng trước', /Kỳ ngày 10\/09\/2026: có Mẫu 31, KHĐ/.test(gk) && /thiếu .*Quá hạn.* → lấy theo cuối T8/.test(gk), gk.replace(/<[^>]+>/g, ''));
   ok('cuối tháng: không có dòng ghi chú', slNguonHTML(Km.B)==='' && slNguonChu(Km.B)==='');
   TO_K = K; const t = K.to[toDi]; TO_BD = null; await toBDNap(t);
   ok('Ra khỏi tổ kỳ ngày: so 10/09 với cuối T8', TO_BD.co && TO_BD.ky==='2026-09-10' && TO_BD.tr==='2026-08' && TO_BD.ra.some(r=>r.kh===khDi), JSON.stringify({ky:TO_BD.ky, tr:TO_BD.tr, ra:TO_BD.ra.length}));
   ok('nhãn chip: "Mới vào 10/09"', toLocNhan(['moi','Mới vào'])==='Mới vào 10/09' && /Số liệu ngày 10\/09\/2026/.test(toKyKQ(TO_K)), toLocNhan(['moi','Mới vào']));
   ok('bản in tab Tổ: "Số liệu đến ngày 10/09/2026 (Mẫu 31 ngày 10/09/2026; Quá hạn cuối T8 …)"', /^Số liệu đến ngày 10\/09\/2026 \(Mẫu 31 ngày 10\/09\/2026; .*Quá hạn cuối T8/.test(toNgayChu()), toNgayChu());
   /* ngày chỉ có Dư nợ chi tiết */
   const H = ['Mã xã','Tên xã','Mã thôn','Tên thôn','Ngày GDXA','Mã điểm giao dịch','Tên điểm giao dịch','Mã tổ','Mã KH','Tên KH','Số khế ước','Tình trạng món vay','Tổng dư nợ','Ngày vay','Sổ tiết kiệm 105','Số dư tiền gửi 105','Ngày số liệu'];
   const ws = XLSX.utils.aoa_to_sheet([H, ['540034','Xã Giả','01','Ấp 1','09','TXN1','Điểm 1','0000001','4800000001','Khách Giả','6600000000000001','OPEN',1000000,'23/05/2026','7000000001',0,'12/09/2026']]), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
   await slGhi(await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], '004820_DU_NO_CHI_TIET.xlsx')));
   const d12 = toDsKy().find(x=>x.ky==='2026-09-12');
   ok('ngày chỉ có Dư nợ chi tiết vẫn chọn được, ghi rõ món vay theo Mẫu 31 liền trước', !!d12 && /Dư nợ chi tiết \(món vay theo Mẫu 31 ngày 10\/09\/2026\)/.test(d12.chu), d12 && d12.chu);
   const K12 = await toNap('2026-09-12'); ok('ngày 12/09: Mẫu 31 mượn bản ngày 10/09 (gần nhất trong tháng), Dư nợ chi tiết đúng ngày', K12.B.nguon.hstd==='2026-09-10' && K12.B.nguon.dnct==='2026-09-12', JSON.stringify(K12.B.nguon));
   /* tên file có ngày giữa tháng nhưng trong file không ghi ngày → 3.143 (Q14): không tự lấy, anh khai (tên file chỉ gợi ý) — thay quy tắc 3.136 "vào ô tháng" */
   window.KHAI_TU_DONG = false;
   const kTen = await slDocFile(new File([await tep('Mon_vay_03_thang_KHD_2026-08-31.xlsx').arrayBuffer()], 'Mon_vay_03_thang_KHD_2026-09-15.xlsx'));
   window.KHAI_TU_DONG = true;
   ok('KHĐ: ngày chỉ có trên tên file → cần anh khai (3.143), gợi ý 15/09; ngày ghi trong file → theo ngày', kTen.canKhai ? (!kTen.ky && kTen.goiYTen==='2026-09-15') : kTen.ky.length>7, JSON.stringify({ky:kTen.ky, khai:!!kTen.canKhai, g:kTen.goiYTen}));
   /* Sau giải ngân: tháng 9 chưa có Mẫu 31 cuối tháng → dùng bản ngày */
   ok('Sau giải ngân: có "T9/2026 (đến 10/09 — Mẫu 31 ngày)"', ktThangHS()[0]==='2026-09' && /đến 10\/09 — Mẫu 31 ngày/.test(ktGNThangChu('2026-09')) && ktGNThangChu('2026-08')===kyVN('2026-08'), ktGNThangChu('2026-09'));
   ktCH().gnTu = '2026-09'; ktCH().gnDen = '2026-09'; KT_GN = null; const RG = await ktGNNap();
   ok('Sau giải ngân T9: lấy Mẫu 31 ngày 10/09, không báo thiếu', !RG.thieu.length && RG.ngay['2026-09']==='2026-09-10' && !!RG.ds['2026-09'], JSON.stringify({thieu:RG.thieu, ngay:RG.ngay, to:Object.keys(RG.ds['2026-09']||{}).length}));
   /* ma trận: cột 📅 Theo ngày */
   doiNgan(7); slDoiTab('nap'); for(let i=0;i<40 && !document.querySelector('.sl-ngay-th');i++) await w(150);
   const th = document.querySelector('.sl-ngay-th'), chip = [...document.querySelectorAll('.sl-ngay-chip')].map(x=>x.textContent);
   ok('ma trận có cột "📅 Theo ngày" + nút Xóa ngày cũ; chip 10/09, 12/09', !!th && /Xóa ngày cũ/.test(th.textContent) && chip.includes('10/09') && chip.includes('12/09'), chip.join(','));
   ok('ô tháng không còn "+ n ngày"', !/\+ \d+ ngày/.test(document.querySelector('.sl-bang').textContent));
   /* dựng sẵn: ngày mới nhất + tháng mới nhất, có tiến độ */
   slNapLai(); for(let i=0;i<80 && SL_SAN_NAP.chay;i++) await w(150);
   ok('dựng sẵn: có ngày mới nhất 12/09 và tháng T8; chữ tiến độ', !!TO_KS['2026-09-12'] && !!TO_KS['2026-08'] && /Sẵn dùng: .*ngày 12\/09/.test(slGiuChu()), slGiuChu());
   /* xóa ngày cũ: giữ ngày mới nhất, không đụng bản cuối tháng */
   slXoaNgayCu(); await w(100); const xn = [...document.querySelectorAll('#hop-in button')].find(b=>b.textContent.trim()==='Xóa'); if(xn) xn.click(); for(let i=0;i<40 && SLM.bang[slKhoa('hstd', '2026-09-10')];i++) await w(150); await w(300);
   ok('🗑 Xóa ngày cũ: bỏ 10/09, giữ 12/09 + mọi bản cuối tháng', !SLM.bang[slKhoa('hstd', '2026-09-10')] && !SLM.bang[slKhoa('khd', '2026-09-10')] && !!SLM.bang[slKhoa('dnct', '2026-09-12')] && !!SLM.bang[slKhoa('hstd', '2026-08')] && !!SLM.bang[slKhoa('khd', '2026-08')]);
   const K12b = await toNap('2026-09-12'); ok('sau khi xóa: ngày 12/09 mượn Mẫu 31 cuối T8', K12b.B.nguon.hstd==='2026-08', JSON.stringify(K12b.B.nguon));
   /* 3.137: cột Nợ lãi cạnh Dư nợ; dư nợ 0 còn lãi = chưa tất nợ */
   TO_K = await toNap('2026-08'); const t8 = Object.values(TO_K.to).filter(x=>!toLaTT(x)).sort((a, b)=>(TO_K.kh[b.ma]||[]).length-(TO_K.kh[a.ma]||[]).length)[0];
   TO_LOC_MO = 'tat'; const bc = toBCDS(t8), bt = await toBCTK105(t8);
   ok('3.137: danh sách tổ viên (In / Excel) có cột "Nợ lãi" ngay sau "Dư nợ"', /<th>Dư nợ<\/th><th>Nợ lãi<\/th><th>Số dư 105<\/th>/.test(bc.html) && bc.aoa[0].indexOf('Nợ lãi')===bc.aoa[0].indexOf('Dư nợ')+1);
   TO_LOC_PV = 'tat'; const bp = toBCDSPV(Object.assign({}, toCH(), {xa:'', diem:'', hoi:'', to:''}));
   ok('3.137: danh sách phạm vi — cột Tổ in trước Họ tên', bp.aoa[0].slice(0, 4).join()==='STT,Mã KH,Tổ,Họ tên' && /<th>Tổ<\/th><th>Họ tên<\/th>/.test(bp.html), bp.aoa[0].slice(0, 5).join());
   ok('3.137: báo cáo TK 105 mục A có cột Dư nợ, Nợ lãi', /A\. KHÁCH ĐÃ TẤT NỢ/.test(bt.html) && (/<th>Dư nợ<\/th><th>Nợ lãi<\/th><th>Số TK 105<\/th>/.test(bt.html) || /A\. KHÁCH ĐÃ TẤT NỢ[^<]*— 0 khách/.test(bt.html)));
   ok('3.137: dư nợ 0 còn lãi → gợi ý "chưa tất nợ", không đề xuất cho ra', toGoiY({conNo:true, dn:0, lt:50000, t105:0})==='Còn lãi — chưa tất nợ' && toGoiY({conNo:false, t105:0})==='Cho ra' && !toLocHam('ra')({conNo:true, dn:0, lt:50000, t105:0}));
   ok('3.137: chip "Tất nợ · còn TK 105" thay "Không dư nợ"; ẩn chip "còn 105" và "Đề xuất cho ra"', toLocNhan(TO_LOC.find(l=>l[0]==='ko'))==='Tất nợ · còn TK 105' && TO_LOC.find(l=>l[0]==='ko105')[4] && TO_LOC.find(l=>l[0]==='ra')[4]);
   ok('3.137: tất nợ còn 105 → "Chờ vay lại"; 105 > 100.000 đ in đậm số (không tô nền); còn nợ lãi không vào Tất nợ', toGoiY({conNo:false, t105:500000})==='Chờ vay lại' && /<b>/.test(to105({conNo:false, t105:150000}, true)) && !/<b>/.test(to105({conNo:false, t105:50000}, true)) && !toLocHam('ko')({conNo:true, dn:0, lt:1000}));
   { const x = toXen([{to:'a'},{to:'a'},{to:'b'},{to:'c'}]); ok('3.137: nền nhạt xen kẽ theo tổ', x[0]==='' && x[1]==='' && /to-xen/.test(x[2]) && x[3]==='', JSON.stringify(x)); }
   ok('3.137: cột "Ghi chú" (thay Gợi ý) để trống khi In / Excel', bc.aoa[0][bc.aoa[0].length-1]==='Ghi chú' && bc.aoa.slice(1, -1).every(r=>r[r.length-1]==='') && !/Gợi ý/.test(bc.html) && /Ghi chú<\/th>/.test(bp.html));
   try{ dongHop(); }catch(e){}
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
