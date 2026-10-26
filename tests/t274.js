// t274 (TK 3, 3.380 — anh 26/10 "data dựng sẵn từ Mẫu 31, TK 105 và tổ"; "cột số tiền KH đã CK vào riêng, cột CK trả lãi và gốc"; "ký hiệu theo dõi").
//   js/72 KHO.hoVay / hoVayKH + báo cáo Sao kê 'b105'. Bộ GIẢ tests/gianho31 + Sao kê TK 105 giả dựng trong phép thử (khuôn file thật — docs/COT_FILE_MAU.md).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const tep = f => { const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], f.n); };
   const M8 = 'Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX';
   for(const f of files){ if(f.n===M8) continue; const kq = await slDocFile(tep(f)); if(!kq.loi && kq.ky) await slGhi(kq); }
   const kq = await slDocFile(tep(files.find(f=>f.n===M8)));
   const vay = kq.rows.filter(x=>x.ku && x.to && x.to!==TO_GIA && (x.dn||0)>0), demTo = {}; vay.forEach(x=>{ (demTo[x.to] = demTo[x.to] || new Set()).add(x.kh); }); const toA = Object.keys(demTo).sort((a, b)=>demTo[b].size-demTo[a].size)[0];
   const khA = [...new Set(vay.filter(x=>x.to===toA).map(x=>x.kh))].slice(0, 6), dong = kh => kq.rows.filter(x=>x.kh===kh && x.ku);
   ok('bộ giả: tổ có ≥ 6 khách vay', khA.length===6, khA.length);
   const dat = (kh, v) => dong(kh).forEach((x, i)=>{ Object.assign(x, {c_lai_dt_trong_thang:0, c_thu_lai_th_thang:0, c_thu_lai_qh_thang:0, tnTH:0, tnQH:0, tnK:0}, i ? {} : v); });
   const [k1, k2, k3, k4, k5, k6] = khA;
   khA.forEach(k=>dat(k, {}));
   dat(k1, {c_lai_dt_trong_thang:300000, c_thu_lai_th_thang:300000, ngdg:'2026-08-19'});                                  /* 🏦: vào = 100.000 + 300.000 */
   dat(k2, {c_lai_dt_trong_thang:250000});                                                                                  /* ⏳ chưa chuyển */
   dat(k3, {c_lai_dt_trong_thang:200000, c_thu_lai_th_thang:200000, tnTH:1000000});                                       /* 💵?: vào = −2.000.000 + 1.200.000 < 0 */
   dat(k4, {c_lai_dt_trong_thang:100000, c_thu_lai_th_thang:60000, c_thu_lai_qh_thang:40000});                            /* 2 TK 105 cộng lại */
   dat(k5, {c_lai_dt_trong_thang:100000, c_thu_lai_th_thang:100000}); kq.rows.forEach(x=>{ if(x.kh===k5){ x.t105 = 0; x.stk = ''; } });   /* 💵? không có TK 105 */
   dat(k6, {c_lai_dt_trong_thang:300000, c_thu_lai_th_thang:100000});                                                     /* 🟠 thu < phải thu */
   const r1 = dong(k1)[0]; kq.rows.push(Object.assign({}, r1, {ku:'9900000000000101', ct:'03', dn:50000000, c_lai_dt_trong_thang:0, c_thu_lai_th_thang:0}));   /* k1 vay thêm GQVL → ghi chú 2 CT */
   await slGhi(kq);
   const sk = (kh, stk, cuoi, dau) => ['', '004820', '900000', '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, dau, '105', '01/01/2024', '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC'],
     sk(k1, '0010000001', 200000, 100000), sk(k2, '0010000002', 50000, 50000), sk(k3, '0010000003', 0, 2000000),
     sk(k4, '0010000004', 300000, 100000), sk(k4, '0010000044', 100000, 0), sk(k6, '0010000006', 500000, 500000)];
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k105 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k105.loi) await slGhi(k105);
   ok('đọc Sao kê TK 105 giả (khuôn file thật)', k105.loai==='tk105' && k105.ky==='2026-08-31', k105.loi || k105.ky);
   /* Sao kê tab, kỳ 08/2026, phạm vi tổ A */
   const S = skCH(); S.ky = '2026-08'; S.xa = ''; S.diem = ''; S.hoi = ''; S.to = ''; SK_K = null; D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   ok('Sao kê có báo cáo "biến động TK 105" ở nhóm Thông tin tổ', SK_BC.some(x=>x.k==='b105' && x.nhom==='tt') && /biến động TK 105/.test(document.getElementById('tr7').textContent));
   S.xa = SK_K.to[toA].xa; S.to = toA;
   const r = skBaoCao('b105'), H = r.aoa[0], c = n => H.indexOf(n), hang = kh => r.aoa.find(x=>x[1]===kh) || [];
   ok('3.380.1: cột liên quan cạnh nhau, tiêu đề ghi rõ ngày số dư (31/07 · 31/08)', H.join('|')==='STT|Mã KH|Họ tên|Dư nợ|Số TK 105|Số dư cuối tháng trước 31/07/2026|Khách chuyển vào|Lãi phải thu tháng|Trích trả lãi|Trích trả gốc|Số dư đến hết ngày 31/08/2026|Tăng / giảm|Ngày GD gần nhất|Ghi chú' && /table class="bc-bang hv105"/.test(r.html) && /td class="gc"/.test(r.html), H.join('|'));
   const mk = r.aoa.slice(1).map(x=>x[1]).filter(x=>/^\d/.test(String(x)));
   ok('xếp theo mã KH', mk.join()===mk.slice().sort().join());
   const h1 = hang(k1);
   ok('🏦 khách chuyển vào = (200.000 − 100.000) + 300.000 = 400.000; tăng / giảm 100.000; trả lãi 300.000; ngày GD', h1[c('Khách chuyển vào')]===400000 && h1[c('Tăng / giảm')]===100000 && h1[c('Trích trả lãi')]===300000 && h1[c('Ngày GD gần nhất')]==='19/08/2026' && /🏦/.test(h1[c('Ghi chú')]), JSON.stringify(h1));
   ok('khách vay 2 chương trình → ghi chú "… + …"; dư nợ cộng cả 2 món', / \+ /.test(h1[c('Ghi chú')]) && h1[c('Dư nợ')]===dong(k1).reduce((a, x)=>a+(x.dn||0), 0)+0, h1[c('Ghi chú')]);
   ok('⏳ chưa chuyển: có lãi phải thu, chưa thu, số dư không đổi', /⏳ chưa chuyển/.test(hang(k2)[c('Ghi chú')]) && hang(k2)[c('Khách chuyển vào')]===0);
   const h3 = hang(k3);
   ok('💵? có thể tiền mặt: khách chuyển vào ra âm (−800.000), trả gốc 1.000.000', h3[c('Khách chuyển vào')]===-800000 && h3[c('Trích trả gốc')]===1000000 && /💵\? có thể tiền mặt/.test(h3[c('Ghi chú')]), JSON.stringify(h3));
   const h4 = hang(k4);
   ok('khách 2 TK 105 → cộng số dư 2 TK (400.000 / 100.000), trả lãi TH + QH = 100.000, ghi TK chính in đậm + ghi chú 2 TK (anh 26/10)', h4[c('Số dư đến hết ngày 31/08/2026')]===400000 && h4[c('Số dư cuối tháng trước 31/07/2026')]===100000 && h4[c('Trích trả lãi')]===100000 && h4[c('Số TK 105')]==='0010000004' && /2 TK 105 \(số dư cộng chung\): 0010000004 300\.000 · 0010000044 100\.000/.test(h4[c('Ghi chú')]) && /<td><b>0010000004<\/b><\/td>/.test(r.html), JSON.stringify(h4));
   ok('💵? không có TK 105 mà có thu', /💵\? không có TK 105/.test(hang(k5)[c('Ghi chú')]) && hang(k5)[c('Khách chuyển vào')]==='');
   ok('🟠 thu < phải thu', /🟠/.test(hang(k6)[c('Ghi chú')]));
   ok('dòng TỔNG CỘNG cộng trả lãi / trả gốc / khách chuyển vào', (()=>{ const t = r.aoa.find(x=>x[2]==='TỔNG CỘNG'); return t && t[c('Trích trả gốc')]>=1000000 && t[c('Trích trả lãi')]===800000; })());
   ok('dòng tóm tắt: số khách chuyển vào, tổ trưởng đã trích trả lãi / gốc, ký hiệu, Sao kê cùng ngày', /tổ trưởng đã trích 105 trả lãi/.test(r.html) && /⏳ chưa chuyển 1/.test(r.html) && /💵\? 2/.test(r.html) && /Sao kê TK 105 ngày 31\/08\/2026/.test(r.html) && !/khác ngày Mẫu 31/.test(r.html), r.html.slice(0, 300));
   /* cửa KHO */
   const [hv, x4] = KHO.voiKy(SK_K, ()=>[KHO.hoVay(toA), KHO.hoVayKH(k4)]);
   ok('KHO.hoVay(tổ) 1 dòng / khách, KHO.hoVayKH(kh) đủ trường', hv.length>=6 && new Set(hv.map(x=>x.kh)).size===hv.length && x4 && x4.tk.ds.length===2 && x4.tk.nguon==='Sao kê TK 105' && x4.tinh.traLai===100000, x4 && JSON.stringify(x4.tinh));
   const khong = hvGhep(SK_K.B.co.hstd.filter(x=>x.to===toA), null), y1 = khong.find(x=>x.kh===k1);
   ok('chưa nạp Sao kê → số dư theo Mẫu 31, không có số đầu tháng, khách chuyển vào trống', y1.tk && y1.tk.nguon==='Mẫu 31' && y1.tk.dau===null && y1.tinh.vao===null);
   window.__hvIn = skHTMLIn([Object.assign({}, r, {pv:'Tổ giả', ngang:true})]);
   return o; }, files);
 if(process.env.HV_ANH){ const h = await p.evaluate(()=>window.__hvIn); const q = await b.newPage({viewport:{width:1123, height:794}}); await q.setContent(h); await q.waitForTimeout(300); await q.screenshot({path:process.env.HV_ANH, fullPage:true}); }
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
