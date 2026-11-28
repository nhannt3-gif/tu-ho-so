// t418 (3.566 — anh 22–24/11 "thêm 1 chỗ nạp các file KQGD … chấm điểm CLT … tự đọc PDF và nhận diện chính xác" · "PDF này xuất từ hệ thống" · hộp đến "tạm chưa dời, chỉ chép thêm vào kho"):
//   Dữ liệu GIẢ (gianho31 + PDF dựng bằng pdf-lib đúng tọa độ cột của mẫu hệ thống: KQGD Mẫu 13/GDX, KQGD mẫu cũ, CLT02). Ý: nhận KQGD theo nội dung → loại kqgd_<mã điểm app>,
//   ngày giao dịch (tháng/ngày/năm), số đúng cột (nghìn → đồng), tên tổ xuống dòng ghép đúng · mẫu cũ (đồng) · CLT02 PDF ra đúng kết quả như CLT02 Excel cùng nội dung ·
//   PDF lạ → báo lỗi · đối chiếu KQGD ↔ Mẫu 31 đúng ô lệch · 📥 Lấy từ hộp đến chỉ TẢI (GET) rồi đưa vào xem trước, nhớ thư mục · rút js/99b → như cũ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99b-kqgd-pdf\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) try{ await slGhi(kq); }catch(e){} }
     const ky = '2026-08'; kyChungDoi(ky); D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
     for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250));
     /* bộ dựng PDF giả: dòng = [{s, x (trái) | r (mép phải), y (từ trên)}] */
     window.taoPDF = async (W, H, dong)=>{ const pdf = await PDFLib.PDFDocument.create(), f = await pdf.embedFont(PDFLib.StandardFonts.Helvetica); let pg = null, tr = -1;
       dong.forEach(d=>{ if(d.tr!==tr){ pg = pdf.addPage([W, H]); tr = d.tr; } const sz = d.sz || 7, x = d.r!=null ? d.r-f.widthOfTextAtSize(d.s, sz) : d.x; pg.drawText(d.s, {x, y:H-d.y, size:sz, font:f}); });
       return new Uint8Array(await pdf.save()); };
     window.soVN = (n, phay)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, phay ? ',' : '.');
   }, files);
   return p; };
 const p = await mo(false);
 /* 1. KQGD Mẫu 13/GDX của điểm Gia Lộc (số = Mẫu 31 giả, 1 tổ lệch +5 triệu) */
 let r = await p.evaluate(async()=>{
   const K = SK_K, B = K.B, t105 = slT105To(B) || {}, T = KHO.dsToKy(K).filter(t=>!t.trucTiep && String(t.diem)==='TXN0543405').sort((a, b)=>(a.dv+a.ma)<(b.dv+b.ma) ? -1 : 1);
   const S = {}; kcGoc(B).forEach(x=>{ const m = toMaCua(x); if(!x.ku || !T.some(t=>t.ma===m)) return; const a = S[m] = S[m] || {sokh:0, dn:0, qh:0, kn:0, lt:0}; a.sokh++; a.dn += x.dn||0; a.qh += x.qh||0; a.kn += x.kn||0; a.lt += laiTon(x); });
   T.forEach(t=>{ const a = S[t.ma] = S[t.ma] || {sokh:0, dn:0, qh:0, kn:0, lt:0}; a.tg = t105[t.ma] || 0; });
   const lech = T[1].ma; S[lech] = Object.assign({}, S[lech], {dn:S[lech].dn+5e6});
   const COT = {sokh:185, cv:250, tn:304, dn:370, qh:428, kn:514, lt:665, tg:720}, HOI = {'11':'HOI NONG DAN', '12':'HOI LIEN HIEP PHU NU', '13':'HOI CUU CHIEN BINH', '14':'DOAN THANH NIEN'};
   const dong = [], y0 = {v:120}, tr = {v:1}, so = (a, y)=>Object.keys(COT).forEach(k=>{ if(a[k]==null) return; dong.push({tr:tr.v, s:k==='sokh' ? soVN(a[k], 1) : soVN(a[k]/1000), r:COT[k], y}); });
   dong.push({tr:1, s:'KET QUA GIAO DICH TAI DIEM GIAO DICH GIA LOC XA GIA LOC', x:300, y:40, sz:11}, {tr:1, s:'Mau so: 13/GDX', x:850, y:20}, {tr:1, s:'Ngay giao dich :08/31/2026', x:420, y:60}, {tr:1, s:'Don vi: nghin dong', x:850, y:60});
   const tong = {sokh:0, dn:0, qh:0, kn:0, lt:0, tg:0}, ten = {};
   ['11', '12', '13', '14'].forEach(dv=>{ const ds = T.filter(t=>t.dv===dv); if(!ds.length) return; const h = {sokh:0, dn:0, qh:0, kn:0, lt:0, tg:0}; ds.forEach(t=>Object.keys(h).forEach(k=>h[k] += S[t.ma][k]||0)); Object.keys(h).forEach(k=>tong[k] += h[k]);
     dong.push({tr:tr.v, s:'0', x:20, y:y0.v}, {tr:tr.v, s:HOI[dv], x:40, y:y0.v}); so(h, y0.v); y0.v += 14;
     ds.forEach((t, i)=>{ const n = slChuan(t.ten).toUpperCase(); dong.push({tr:tr.v, s:String(i+1), x:20, y:y0.v}); so(S[t.ma], y0.v);
       if(t.ma===T[0].ma){ dong.push({tr:tr.v, s:n+' AP', x:40, y:y0.v}, {tr:tr.v, s:'DAI TEN XUONG DONG', x:40, y:y0.v+8}); y0.v += 22; ten[t.ma] = n+' AP DAI TEN XUONG DONG'; }
       else { dong.push({tr:tr.v, s:n, x:40, y:y0.v}); y0.v += 14; ten[t.ma] = n; }
       if(y0.v>540){ tr.v++; y0.v = 60; } }); });
   dong.push({tr:tr.v, s:'100', x:20, y:y0.v}, {tr:tr.v, s:'Cong', x:40, y:y0.v}); so(tong, y0.v);
   const u = await taoPDF(1000, 600, dong); window.PDF13 = u;
   const kq = await slDocFile(new File([u], 'KQGD_GiaLoc_2026_08_31.pdf')), to = (kq.rows||[]).filter(x=>x.cap==='to'), x0 = to.find(x=>x.ten===ten[T[0].ma]) || {};
   const kt = T.every(t=>to.some(x=>slChuan(x.ten)===slChuan(ten[t.ma]) && Math.abs(x.dn-S[t.ma].dn)<1000 && Math.abs(x.lt-S[t.ma].lt)<1000 && x.sokh===S[t.ma].sokh));
   const tt = slTrangThai(kq); if(!kq.loi) await slGhi(kq);
   return {loi:kq.loi, loai:kq.loai, ky:kq.ky, nTo:to.length, nT:T.length, hoi:(kq.rows||[]).filter(x=>x.cap==='hoi').map(x=>x.hoi).join(), cb:kq.canhBao, kt, x0:x0.ten, ten0:ten[T[0].ma], tt:tt.lop, tom:slTomRieng(kq.loai, kq.tong),
     goc:slTenGoc({loai:kq.loai, ky:kq.ky, ngay:kq.ngay, tenFile:kq.ten}), lech, tong:tong.dn}; });
 ok('KQGD Mẫu 13/GDX (PDF) nhận theo nội dung → loại kqgd_<mã điểm app>, ngày giao dịch 31/08/2026 (file ghi tháng/ngày/năm)', !r.loi && r.loai==='kqgd_TXN0543405' && r.ky==='2026-08-31' && r.tt==='ok', JSON.stringify(r).slice(0, 400));
 ok('đủ tổ + dòng Hội; số vào đúng cột theo mép phải, nghìn → đồng (dư nợ, lãi tồn, số KH)', r.nTo===r.nT && r.kt && /HND/.test(r.hoi), JSON.stringify({nTo:r.nTo, nT:r.nT, kt:r.kt, hoi:r.hoi}));
 ok('tên tổ dài xuống dòng → ghép vào dòng tổ', r.x0===r.ten0, r.x0+' | '+r.ten0);
 ok('tự kiểm cộng tổ = dòng Hội: khớp → không cảnh báo; tên chuẩn KQGD_<mã điểm>_<ngày>.pdf; tóm tắt ghi số tổ / Hội / mẫu', !r.cb.length && r.goc==='KQGD_TXN0543405_2026-08-31.pdf' && /tổ · .*Hội · dư nợ .*mẫu 13\/GDX/.test(r.tom), JSON.stringify({cb:r.cb, goc:r.goc, tom:r.tom}));
 /* nạp lại đúng file → nhận ra đã nạp (mã băm) */
 r = await p.evaluate(async()=>{ const kq = await slDocFile(new File([PDF13], 'ban sao.pdf')); return slTrangThai(kq); });
 ok('nạp lại cùng file (tên khác) → nhận ra "đã nạp", không tích sẵn', r.lop==='vang' && !r.ghi && /đã nạp/.test(r.chu), JSON.stringify(r));
 /* 2. đối chiếu KQGD ↔ Mẫu 31 */
 r = await p.evaluate(async()=>{ const C = skCH(); C.bc = {kqgd31:1}; C.man = 'xem'; await skXem(); await new Promise(z=>setTimeout(z, 300));
   const x = [].concat(SK_XEM||[]).find(y=>/ĐỐI CHIẾU KQGD/.test(y.tieuDe||'')) || {}, h = x.html || '';
   return {co:SK_BC.some(b=>b.k==='kqgd31' && b.nhom===(typeof OKQ!=='undefined' && OKQ.b1 ? 'kq3' : 'tt'))   /* 3.573: sang ô Kết quả giao dịch */, tieu:x.tieuDe, lech:(/(\d+) ô lệch/.exec(h)||[])[1], chua:/chưa ghép tổ app/.test(h), n:(x.aoa||[]).length, do:(h.match(/class="s do"/g)||[]).length}; });
 ok('Sao kê › Kết quả giao dịch (3.573; trước: Thông tin tổ): Đối chiếu KQGD ↔ Mẫu 31 — đúng 2 ô lệch (dòng Hội + tổ bị sửa, dư nợ), tổ đều ghép được', r.co && /GIA LOC|GIA LỘC/i.test(r.tieu||'') && r.lech==='2' && r.do===2 && !r.chua && r.n>3, JSON.stringify(r));
 /* 3. KQGD mẫu cũ (đơn vị đồng, "Ngày dd/mm/yyyy", "ĐIỂM GIAO DỊCH: …") */
 r = await p.evaluate(async()=>{ const C = {so_ho:159, dn:383, qh:452, lt:612, tg:914}, d = [{tr:1, s:'KET QUA GIAO DICH', x:300, y:30, sz:11}, {tr:1, s:'DIEM GIAO DICH: GIA BINH', x:300, y:45}, {tr:1, s:'Ngay 15/09/2026', x:350, y:60},
     /* mẫu cũ thật: tên và số in 2 hàng so le lệch ~3 pt (file 21/08/2026) */
     {tr:1, s:'0', x:20, y:103}, {tr:1, s:'HOI PHU NU', x:40, y:100}, {tr:1, s:'2', r:C.so_ho, y:103}, {tr:1, s:'123.456.789', r:C.dn, y:103}, {tr:1, s:'1.000.000', r:C.qh, y:103}, {tr:1, s:'45.678', r:C.lt, y:100}, {tr:1, s:'9.876.543', r:C.tg, y:100},
     {tr:1, s:'1', x:20, y:114}, {tr:1, s:'TO 075', x:40, y:114}, {tr:1, s:'2', r:C.so_ho, y:114}, {tr:1, s:'123.456.789', r:C.dn, y:114}, {tr:1, s:'1.000.000', r:C.qh, y:114}, {tr:1, s:'45.678', r:C.lt, y:117}, {tr:1, s:'9.876.543', r:C.tg, y:114},
     {tr:1, s:'DOAN THANH NIEN', x:40, y:131}, {tr:1, s:'0', x:20, y:134}, {tr:1, s:'5.000.000', r:C.dn, y:134}, {tr:1, s:'1', x:20, y:148}, {tr:1, s:'TO 076', x:40, y:148}, {tr:1, s:'5.000.000', r:C.dn, y:148}];
   const x = KQPDF.docKQGD(await KQPDF.dong((await taoPDF(1000, 600, d)).buffer)), t = x.rows.find(o=>o.cap==='to') || {};
   const t2 = x.rows.filter(o=>o.cap==='to')[1] || {}; return {moi:x.moi, ngay:x.ngay, diem:x.diem, dn:t.dn, qh:t.qh, lt:t.lt, tg:t.tg, sokh:t.sokh, hoi:t.hoi, hoiDong:(x.rows.find(o=>o.cap==='hoi')||{}).lt, hoi2:t2.hoi, n:x.rows.length}; });
 ok('KQGD mẫu cũ: đơn vị đồng, ngày dd/mm/yyyy, tên điểm sau "ĐIỂM GIAO DỊCH:"; tên / số in 2 hàng so le vẫn về đúng dòng và đúng Hội', r.hoiDong===45678 && r.hoi2==='DTN' && r.n===4 && !r.moi && r.ngay==='2026-09-15' && r.diem==='GIA BINH' && r.dn===123456789 && r.qh===1e6 && r.lt===45678 && r.tg===9876543 && r.sokh===2 && r.hoi==='HPN', JSON.stringify(r));
 /* 4. CLT02 PDF = CLT02 Excel cùng nội dung */
 r = await p.evaluate(async()=>{ const X = [0, 20, 45, 190, 215, 240, 265, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660], d = [], y = {v:110};
   d.push({tr:1, s:'Mau so 02/CLT', x:700, y:20}, {tr:1, s:'BANG CHAM DIEM CHAT LUONG HOAT DONG TO TK&VV TAI XA/PHUONG GIA LOC', x:150, y:40, sz:10}, {tr:1, s:'Ky: Thang 10/2026', x:300, y:56}, {tr:1, s:'STT', x:20, y:80}, {tr:1, s:'Ten to', x:45, y:80});
   for(let i=1;i<=16;i++) d.push({tr:1, s:String(i), x:X[i], y:96});
   const R = [['I', 'HOI NONG DAN'], ['1', 'TO 020 AP GIA', 3, 95, [20, 20, 25, 15, 15], 'LOC', 'DAU'], ['2', 'TO 023', 4, 78.5, [15, 18, 20, 12.5, 13]], ['II', 'HOI PHU NU'], ['1', 'TO 053', 6, 40, [10, 10, 10, 5, 5]]];
   const aoa = [['Mẫu số 02/CLT'], ['BẢNG CHẤM ĐIỂM TẠI XÃ/PHƯỜNG GIA LOC'], ['Tháng 10/2026'], [''].concat(Array.from({length:16}, (_, i)=>String(i+1)))];
   R.forEach(r=>{ d.push({tr:1, s:r[0], x:X[1], y:y.v}, {tr:1, s:r[1], x:X[2], y:y.v}); const e = []; e[1] = r[0]; e[2] = (r[6] ? r[6]+' ' : '')+r[1]+(r[5] ? ' '+r[5] : ''); if(r[6]) d.push({tr:1, s:r[6], x:X[2], y:y.v-6});   /* CLT02 thật: tên dài căn giữa ô → phần trên + dưới dòng STT */
     if(r[2]){ d.push({tr:1, s:'x', x:X[r[2]], y:y.v}, {tr:1, s:String(r[3]).replace('.', ','), x:X[7], y:y.v}); e[r[2]] = 'x'; e[7] = r[3]; r[4].forEach((v, j)=>{ d.push({tr:1, s:String(v).replace('.', ','), x:X[8+j], y:y.v}); e[8+j] = v; }); }
     if(r[5]){ d.push({tr:1, s:r[5], x:X[2], y:y.v+6}); y.v += 6; } y.v += 16; aoa.push(e); });
   d.push({tr:1, s:'Tong cong', x:X[2], y:y.v});
   const u = await taoPDF(842, 595, d), kq = await slDocFile(new File([u], 'CLT02_GiaLoc_T10.pdf'));
   const ex = CLT.doc([{ten:'CLT02', rows:aoa}]), mot = a=>(a||[]).map(o=>[o.hoi, o.stt, o.ten, o.xl, o.diem, o.tc1, o.tc2, o.tc3, o.tc4, o.tc5].join('|')).join(' ; ');
   return {loi:kq.loi, loai:kq.loai, ky:kq.ky, pdf:mot(kq.rows), ex:mot(ex && ex.rows), kEx:ex && ex.k}; });
 ok('CLT02 PDF → cùng loại / kỳ / từng tổ (xếp loại, điểm, 5 tiêu chí, tên xuống dòng) như CLT02 Excel cùng nội dung', !r.loi && r.loai===r.kEx && /^cltT_/.test(r.loai) && r.pdf===r.ex && r.pdf.split(' ; ').length===3, JSON.stringify(r).slice(0, 500));
 /* 5. PDF lạ */
 r = await p.evaluate(async()=>{ const kq = await slDocFile(new File([await taoPDF(595, 842, [{tr:1, s:'VAN BAN GIA', x:60, y:60}])], 'vb.pdf')); return kq.loi||''; });
 ok('PDF không phải KQGD / CLT02 → báo rõ, không nạp', /không phải KQGD/.test(r), r);
 /* 6. hộp đến: nút + chỉ tải (GET) → xem trước; nhớ thư mục */
 r = await p.evaluate(async()=>{ slNapThem('2026-08'); await new Promise(z=>setTimeout(z, 200));
   const nut = !!document.querySelector('#hop [data-lenh="kqpdf.hopDen"]'); try{ dongHop(); }catch(e){} const goi = []; const f0 = window.fetch;
   window.fetch = (u, o)=>{ goi.push({u:String(u), m:(o && o.method) || 'GET'}); return Promise.resolve(new Response(new Blob([PDF13]))); };
   const nd = slDocNhieu; let nhan = null; slDocNhieu = fs=>{ nhan = fs.map(f=>f.name+':'+f.size); }; canToken = ()=>Promise.resolve(true); DR.token = 'gia';
   window.google = {picker:{Response:{ACTION:'action', DOCUMENTS:'docs'}, Action:{PICKED:'picked'}, Document:{ID:'id', NAME:'name', MIME_TYPE:'mimeType', PARENT_ID:'parentId'}}};
   KQPDF.daChon({action:'picked', docs:[{id:'F1', name:'KQGD_GiaLoc_2026_08_31.pdf', mimeType:'application/pdf', parentId:'HOP'}, {id:'TM', name:'con', mimeType:'application/vnd.google-apps.folder', parentId:'HOP'}]});
   for(let i=0;i<40 && !nhan;i++) await new Promise(z=>setTimeout(z, 100)); window.fetch = f0; slDocNhieu = nd;
   return {nut, goi, nhan, hop:D.cauHinh.hopDenId}; });
 ok('menu ⋯ của Nạp & KT có 📥 Lấy từ hộp đến (thanh công cụ giữ 1 hàng); chọn file → chỉ TẢI (GET, bỏ thư mục) rồi đưa vào xem trước; nhớ thư mục hộp đến; không gọi dời / xóa', r.nut && r.goi.length===1 && r.goi[0].m==='GET' && /files\/F1\?alt=media/.test(r.goi[0].u) && r.nhan && r.nhan.length===1 && /^KQGD_GiaLoc/.test(r.nhan[0]) && r.hop==='HOP', JSON.stringify(r));
 /* 7. rút js/99b */
 const q = await mo(true);
 r = await q.evaluate(async()=>{ slNapThem('2026-08'); await new Promise(z=>setTimeout(z, 200));
   return {k:typeof KQPDF, nut:!!document.querySelector('#hop [data-lenh="kqpdf.hopDen"]'), bc:SK_BC.some(b=>b.k==='kqgd31')}; });
 ok('rút js/99b: không còn nút / báo cáo mới, Sao kê vẫn chạy', r.k==='undefined' && !r.nut && !r.bc, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t418 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
