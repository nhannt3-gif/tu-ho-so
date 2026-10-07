// 3.93 — tab con 🛡 KTGS Hội: đọc BC0437 / BC0438 GIẢ (dựng trong trang từ Mẫu 31 giả), xếp loại theo công thức khi cột = 0, dòng lặp,
//        không hiện ở ma trận Nạp; bảng tổ có điểm / xếp loại; gợi ý hộ Mẫu 06 (Trung hòa / Hộ tốt / Cần quan tâm, bỏ QH / khoanh,
//        HSSV ≥ 1, giải ngân < 30 ngày), mã khoản vay 2-4 (trùng → 6), Word đúng khuôn (XML hợp lệ, trống giữ dòng chấm), In / PDF, lịch sử kiểm tra.
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const tep = (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Sheet 1'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
   /* công thức xếp loại của BC0437 */
   ok('xếp loại theo công thức', ktXepLoai(49.9)==='Yếu' && ktXepLoai(50)==='Trung bình' && ktXepLoai(69.99)==='Trung bình' && ktXepLoai(70)==='Khá' && ktXepLoai(84.9)==='Khá' && ktXepLoai(85)==='Tốt' && ktXepLoai('')==='');
   /* dựng BC0437 / BC0438 giả từ tổ trong Mẫu 31 giả tháng 8 */
   const K = await toNap('2026-08'); TO_K = K; const T = K.to, ds = Object.keys(T).filter(m=>!T[m].trucTiep).map(m=>T[m]);
   const diem = [93, 85, 84.5, 70, 69, 50, 45];
   const h37 = ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Mã tổ','Tên tổ trưởng','Số tổ viên','Số tổ viên còn dư nợ','Số tổ viên có gửi tiết kiệm','Số tổ viên có nộp lãi trong 3 tháng gần nhất','Số tổ viên không nộp lãi đầy đủ trong 3 tháng gần nhất','Số tổ viên có tham gia gửi tiết kiệm trong 3 tháng gần nhất','Số tổ viên không tham gia gửi tiết kiệm đầy đủ trong 3 tháng gần nhất','Tổng dư nợ\n(triệu đồng)','Dư nợ quá hạn (triệu đồng)','Tỷ lệ NQH (%)','Dư nợ khoanh (triệu đồng)','Tỷ lệ nợ khoanh (%)','Lãi tồn (triệu đồng)','Lãi tồn ân hạn (triệu đồng)','Số dư tiết kiệm (triệu đồng)','Mức tiền gửi bình quân/tổ viên (triệu đồng)','Mức tiền gửi bình quân/tổ viên/tháng (ngàn đồng)','Số tổ viên có lãi tồn','Số tổ viên có lãi tồn ân hạn','Kết quả chấm điểm tổ tháng gần nhất','Xếp loại'];
   const a37 = [['THÔNG TIN TỔ TK&VV DO KHÁC QUẢN LÝ ĐẾN NGÀY 31/08/2026'], h37];
   ds.forEach((t, i)=>{ const ks = toKhach(t); let dn=0, qh=0, kn=0, tg=0, nd=0; ks.forEach(k=>{ dn+=k.dn; qh+=k.qh; kn+=k.kn; tg+=k.t105; if(k.mon.some(m=>(m.dn||0)>0)) nd++; });
     a37.push(['004820', t.xa, t.tenXa, String(t.dv), 0, t.ma, t.ten, ks.length, nd, ks.length, ks.length, 0, ks.length, 0, dn/1e6, qh/1e6, 0, kn/1e6, 0, 3, 0, tg/1e6, 0, 10.5, 1, 0, diem[i%diem.length], 0]); });
   a37.push(a37[2].slice());   /* 1 dòng lặp y hệt */
   const k37 = await slDocFile(tep(a37, 'BC0437_004820___31082026.xls'));
   ok('BC0437 nhận loại + kỳ', k37.loai==='k37' && k37.ky==='2026-08', k37.loai+' '+k37.ky+' '+(k37.loi||''));
   ok('BC0437 bỏ dòng lặp, tính xếp loại', k37.rows.length===ds.length && /1 dòng tổ lặp/.test(k37.canhBao.join()) && /tính lại/.test(k37.canhBao.join()), k37.rows.length+'/'+ds.length+' · '+k37.canhBao.join(' | '));
   ok('BC0437 tiền triệu → đồng', k37.rows[0].dn===Math.round(a37[2][14]*1e6) && k37.rows[0].xepLoai==='Tốt', k37.rows[0].dn+' '+k37.rows[0].xepLoai);
   await slGhi(k37);
   const xs = {}; k37.rows.forEach(b=>{ const k = b.xa+'|'+b.dv; const x = xs[k] = xs[k] || {xa:b.xa, ten:b.tenXa, dv:b.dv, to:0, dn:0, tg:0, xl:{}}; x.to++; x.dn+=b.dn; x.tg+=b.tg; x.xl[b.xepLoai]=(x.xl[b.xepLoai]||0)+1; });
   const a38 = [['THÔNG TIN ỦY THÁC XÃ 000000 ĐẾN NGÀY 31/08/2026'], [1, 'Dư nợ nhận ủy thác'], ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Số ấp có dư nợ do HĐT quản lý','Số ấp trên địa bàn','Tổng số tổ do HĐT quản lý','Tổng số khách hàng vay vốn do HĐT quản lý','Tổng dư nợ do HĐT quản lý','Số dư tiết kiệm do HĐT quản lý']];
   Object.values(xs).forEach(x=>a38.push(['004820', x.xa, x.ten, x.dv, 0, 3, 5, x.to, 100, x.dn, x.tg])); a38.push(['Tổng cộng', '', '', '', '', 0, 0, 0, 0, 0, 0]);
   a38.push([2, 'Chấm điểm hoạt động nhận ủy nhiệm'], ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Tổng số','Tốt','Khá','Trung bình','Yếu']);
   Object.values(xs).forEach(x=>a38.push(['004820', x.xa, x.ten, x.dv, 0, 0, x.xl['Tốt']||0, x.xl['Khá']||0, x.xl['Trung bình']||0, x.xl['Yếu']||0])); a38.push(['Tổng cộng']);
   a38.push([3, 'Dư nợ nhận ủy thác'], ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Tên chương trình vay','Số khách hàng','Tổng dư nợ','Nợ quá hạn','','Nợ khoanh','','Lãi tồn','Số món vay 3 tháng không hoạt động'], ['','','','','','','','','Số tiền','Tỷ lệ','Số tiền','Tỷ lệ']);
   Object.values(xs).forEach(x=>a38.push(['004820', x.xa, x.ten, x.dv, 0, 'Cho vay hộ nghèo', 10, 1e9, 0, 0, 0, 0, 1e6, 1]));
   const k38 = await slDocFile(tep(a38, 'BC0438_000000_31082026.xls'));
   ok('BC0438 nhận loại + 3 phần', k38.loai==='k38' && k38.ky==='2026-08' && ['ut','cd','ct'].every(ph=>k38.rows.some(x=>x.phan===ph)) && (()=>{ const c = k38.rows.find(x=>x.phan==='cd'); return c.tong===c.tot+c.kha+c.tb+c.yeu; })(), (k38.loi||'')+' '+slTomTat('k38', k38.tong));
   await slGhi(k38);
   const sai = await slDocFile(tep(a37, 'BC0437.xls'), 'k38'); ok('chọn sai loại → báo', !!sai.loi && sai.goiY==='k37', sai.loi);
   ok('kiểm tra tháng chính không tính BC0437/0438 (không bị "kiểm lại")', slDauKy('2026-08').indexOf('k37')<0 && slDauKy('2026-08').indexOf('k38')<0);
   /* nạp nhiều file qua luồng chuẩn (xem trước → tích → ghi nhận): BC0437 tháng 7 */
   const a37b = a37.map(r=>r.slice()); a37b[0] = ['THÔNG TIN TỔ TK&VV DO KHÁC QUẢN LÝ ĐẾN NGÀY 31/07/2026'];
   D.cauHinh.slTab = 'kt'; await new Promise(res=>{ slDocNhieu([tep(a37b, 'BC0437_004820___31072026.xls')]); const t = setInterval(()=>{ if(document.querySelector('.sl-tich')){ clearInterval(t); res(); } }, 100); });
   ok('xem trước nhận BC0437 tháng 7, tích sẵn', SL_NAP[0].loai==='k37' && SL_NAP[0].ky==='2026-07' && document.querySelector('.sl-tich').checked, SL_NAP[0].loai+' '+SL_NAP[0].ky);
   slGhiDaTich(); for(let i=0;i<40 && !SLM.bang['k37|2026-07'];i++) await w(150);
   ok('ghi nhận vào ô BC0437 T7', !!SLM.bang['k37|2026-07']);
   /* không lên ma trận Nạp */
   doiNgan(7); slDoiTab('nap'); SL_KY='2026-08'; veSoLieu(); await w(600);
   ok('ma trận Nạp không có BC0437/0438', !/BC0437|BC0438/.test(document.getElementById('tr7').textContent));
   /* tab KTGS */
   D.cauHinh.ktHaiMat = 0;   /* 3.124: phép này kiểm ngắt trang thường — in 2 mặt kiểm ở t126 */
   const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('thanh BC0437 / BC0438 ✓', document.querySelectorAll('.kt-bc.co').length===2, document.querySelector('.kt-dau').textContent);
   const mt = document.querySelectorAll('.kt-nap .sl-bang tbody tr');
   ok('ma trận KTGS: 2 dòng BC0437 / BC0438, ô ✓ T7, T8', mt.length===2 && document.querySelectorAll('.kt-nap .sl-o.du').length===3, mt.length+' dòng · '+document.querySelectorAll('.kt-nap .sl-o.du').length+' ô có file');
   await ktKiemTra('2026-08'); for(let i=0;i<80 && !(SLM.ktg && SLM.ktg['2026-08']);i++) await w(200); await w(300);
   const KQ = SLM.ktg['2026-08'];
   ok('kiểm tra KTGS: lưu kết quả, đủ 3 nhóm so', !!KQ && KQ.muc.some(m=>/BC0437 ↔ BC0438 ①/.test(m.ten)) && KQ.muc.some(m=>/↔ Mẫu 31 từng tổ/.test(m.ten)) && KQ.muc.some(m=>/BC0438 ③/.test(m.ten)), KQ && KQ.muc.map(m=>m.tt+' '+m.ten.slice(0,30)).join(' | '));
   ok('BC0437 ↔ BC0438 ① ② khớp (file giả dựng từ cùng số)', KQ.muc.find(m=>/②/.test(m.ten)).tt==='c' && KQ.muc.find(m=>/①/.test(m.ten)).tt==='c', KQ.muc.slice(0,2).map(m=>m.ghi).join(' | '));
   ok('BC0437 ↔ Mẫu 31 từng tổ khớp (lệch < 1 triệu coi là khớp)', KQ.muc.find(m=>/từng tổ: tổ viên/.test(m.ten)).tt==='c', KQ.muc.find(m=>/từng tổ: tổ viên/.test(m.ten)).ghi);
   ok('khung kiểm tra hiện kết quả + chip tháng', /mục lệch|khớp/.test(document.querySelector('.kt-nap summary').textContent) && document.querySelectorAll('.kt-muc').length===KQ.muc.length);
   const e37 = SLM.bang['k37|2026-08']; const luc0 = e37.luc; e37.luc = new Date(Date.now()+1000).toISOString(); ok('đổi file → kiểm tra cũ (⟳ kiểm lại)', ktKTCu('2026-08')); e37.luc = luc0;
   ok('mục đích: bảng ngành rút gọn + tự rút gọn ngành mới', ktNganh({c_ma_pnkt51:'36000'})==='Khai thác, cung cấp nước' && ktNganh({c_ma_pnkt51:'01412'})==='Chăn nuôi trâu, bò' && ktNganh({c_ma_pnkt51:'99999', c_ten_pnkt51:'Hoạt động gì đó chưa được phân vào đâu (thử)'})==='gì đó', ktNganh({c_ma_pnkt51:'99999', c_ten_pnkt51:'Hoạt động gì đó chưa được phân vào đâu (thử)'}));
   const t0 = ds[0]; C.xa=t0.xa; C.diem=t0.khoaDiem; C.hoi=''; C.to=''; pvVeCay('kt'); await w(300);
   const hang = document.querySelectorAll('#kt-the .to-bang tbody tr'); ok('bảng tổ có điểm + xếp loại', hang.length>0 && /Tốt|Khá|Trung bình|Yếu/.test(document.getElementById('kt-the').textContent), hang.length+' tổ');
   /* tổ nhiều hộ nhất */
   let best = ds[0]; ds.forEach(t=>{ if((K.kh[t.ma]||[]).length > (K.kh[best.ma]||[]).length) best = t; });
   ktChonTo(best.ma); await w(300);
   const X = KT_CHON, s = ktSoTo(best);
   ok('số hộ gợi ý 6–8 theo tổ viên', X.goiY===(s.stv<=20 ? 6 : s.stv<=40 ? 7 : 8) && X.so===X.goiY, s.stv+' tổ viên → '+X.goiY);
   const dcT = ktDaChon(), bb = dcT.filter(h=>X.chon[h.kh].bb);
   ok('Trung hòa: đủ số, chọn chủ đích ≤ 2 hộ cần quan tâm (còn lại hộ tốt, thiếu mới bổ sung)', dcT.length>=Math.min(X.so, X.ds.filter(h=>!h.loai).length) && dcT.filter(h=>/^(KHĐ|Lãi tồn|Không gửi)/.test(X.chon[h.kh].ly)).length<=2, dcT.length+' hộ: '+dcT.map(h=>X.chon[h.kh].ly.slice(0,18)).join(' / '));
   ok('không gợi ý hộ QH / khoanh', !dcT.some(h=>h.loai && !X.chon[h.kh].bb));
   ok('món giải ngân < 30 ngày luôn có', X.ds.filter(h=>!h.loai && h.moi30.length).every(h=>X.chon[h.kh]), bb.length+' hộ bắt buộc');
   ok('có HSSV thì ≥ 1 món HSSV', !X.ds.some(h=>!h.loai && h.hssv) || dcT.some(h=>h.hssv));
   ktDoiKieu('tot'); await w(100); const dTot = ktDaChon(); ok('Hộ tốt: ưu tiên hộ tốt', dTot.filter(h=>h.tot).length>=Math.min(KT_CHON.so-bb.length-1, X.ds.filter(h=>h.tot).length), dTot.filter(h=>h.tot).length+' tốt / '+dTot.length);
   ktDoiKieu('xau'); await w(100); const dXau = ktDaChon(); ok('Cần quan tâm: ưu tiên hộ cần quan tâm', dXau.filter(h=>h.xau).length>=Math.min(KT_CHON.so-bb.length-1, X.ds.filter(h=>h.xau).length), dXau.filter(h=>h.xau).length+' cần QT / '+dXau.length);
   ktDoiSo(1); await w(100); ok('Số hộ + 1', KT_CHON.so===X.goiY+1);
   ktDoiKieu('trung'); ktGoiYLai(); await w(100);
   /* mã khoản vay */
   const mm = [{ku:'6600000000001234'}, {ku:'6600000000991234'}, {ku:'6600000000005678'}]; ktMaKV(mm);
   ok('mã khoản vay 2-4, trùng 4 số → 6 số', mm[0]._ma==='66-001234' && mm[1]._ma==='66-991234' && mm[2]._ma==='66-5678', mm.map(x=>x._ma).join(' '));
   ok('ktTr không cắt số 0', ktTr(3680e6, 0)==='3.680' && ktTr(0, 0)==='0' && ktTr(12.5e6)==='12,5' && ktTr(9388148, 3)==='9,388', [ktTr(3680e6,0), ktTr(0,0), ktTr(12.5e6), ktTr(9388148,3)].join(' '));
   /* Word: bắt file, giải nén, kiểm XML */
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const moZip = async (bl) => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); const f = XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml'); return {z, doc:new TextDecoder().decode(f.content)}; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   KT_KB = {}; delete D.cauHinh.ktMucDich; ktKhaiBao('m06'); await w(100); ok('hộp chọn khi in Mẫu 06 có cột Mục đích, mặc định Để trống (3.114)', document.getElementById('ki-m06-md') && document.getElementById('ki-m06-md').value===''); dongHop();
   const mon0 = ktDaChon()[0].mon[0]; mon0.c_ma_pnkt51 = '36000';
   ok('chọn In ngành → cột mục đích có tên rút gọn', ktGiaTri06(KT_K.to[best.ma], ktDaChon(), {md:'nganh'}).rows[0].R7==='Khai thác, cung cấp nước' && ktGiaTri06(KT_K.to[best.ma], ktDaChon(), {md:''}).rows[0].R7==='');
   KT_NG_HET = true; ktNganhHop(); await w(200); const nDong = document.querySelectorAll('#kt-ng tbody tr').length;
   ktNganhSua('36000', 'Cấp nước sạch'); ok('⚙ Bảng ngành: liệt kê đủ ngành, anh sửa → in tên đã sửa, ↺ trả về đề xuất', nDong>=176 && ktNganh({c_ma_pnkt51:'36000'})==='Cấp nước sạch' && (ktNganhSua('36000', ''), ktNganh({c_ma_pnkt51:'36000'})==='Khai thác, cung cấp nước'), nDong+' dòng');
   ok('đề xuất chỉ dùng từ trong tên gốc', ktNganhDeXuat('01452', 'Chăn nuôi lợn')==='Chăn nuôi lợn' && ktNganhDeXuat('92001', '')==='Hoạt động xổ số');
   dongHop(); ktKhaiBao('m06'); await w(100);
   ktXuat('m06', 'word', 1); await w(800);
   const f06 = Object.keys(F).find(n=>/Mau 06/.test(n)); const z06 = await moZip(F[f06]);
   const soMon = ktDaChon().reduce((a, h)=>a+h.mon.length, 0);
   ok('Mẫu 06 Word: XML hợp lệ, hết dấu {{', hopLe(z06.doc) && z06.doc.indexOf('{{')<0, f06);
   ok('Mẫu 06: đủ phần (styles, header, theme…)', ['word/styles.xml','word/settings.xml','word/header1.xml','word/theme/theme1.xml','word/footnotes.xml'].every(n=>XLSX.CFB.find(z06.z, n) || XLSX.CFB.find(z06.z, '/'+n)));
   ok('Mẫu 06: tổ trưởng + mã khoản vay (gạch không ngắt)', z06.doc.indexOf(xmlEsc(best.ten))>=0 && /66<\/w:t><w:noBreakHyphen\/>/.test(z06.doc));
   ok('Mẫu 06: số dòng = số món (tối thiểu 3)', (z06.doc.match(/<w:tr[ >]/g)||[]).length >= Math.max(3, soMon)+4, soMon+' món');
   ok('Mẫu 06: trống giữ dòng chấm (đơn vị, cán bộ, ngày)', /Đơn vị kiểm tra: <\/w:t>/.test(z06.doc) && /\.{20,}/.test(z06.doc) && /Ngày \.{5,}/.test(z06.doc.replace(/<[^>]+>/g, '')));
   ok('Mẫu 06: dòng cao tối thiểu 1,0 cm (3.111: 1 món 2 dòng), chữ tự xuống dòng', /<w:trHeight w:val="567" w:hRule="atLeast"\/>/.test(z06.doc) && !/<w:noWrap\/>/.test(z06.doc));
   ok('Mẫu 06: lặp tiêu đề bảng + không cắt dòng + giữ liền chữ ký', (z06.doc.match(/<w:tblHeader\/>/g)||[]).length===3 && /<w:cantSplit\/>/.test(z06.doc) && /<w:keepNext\/>/.test(z06.doc));
   ok('Mẫu 06: không có trang mẫu tham khảo', z06.doc.indexOf('MẪU THAM KHẢO')<0 && z06.doc.indexOf('Vũ Văn Nam')<0);
   ok('Mẫu 06: đường kẻ dạng shape giữ nguyên', /prst="line"/.test(z06.doc));
   ok('3.98: không còn ghi lịch sử kiểm tra (chỉ phục vụ in)', !((D.cauHinh.ktgsLS||{})[best.ma]||[]).length);
   KT_KB = {ngay:'2026-09-05', doan:'Đoàn giả', cb1:'Cán bộ Giả'}; ktVeThe(); await w(50); ktKhaiBao('m16'); await w(100); ktXuat('m16', 'word', 1); await w(800);
   const f16 = Object.keys(F).find(n=>/Mau 16/.test(n)); const z16 = await moZip(F[f16]); const c16 = z16.doc.replace(/<[^>]+>/g, '');
   ok('Mẫu 16 Word: XML hợp lệ, hết dấu {{', hopLe(z16.doc) && z16.doc.indexOf('{{')<0, f16);
   ok('Mẫu 16: ngày, đoàn (3.107: tên Hội cấp xã, bỏ ô khai), tổ trưởng, hội, số liệu BC0437, xếp loại', /ngày 05 tháng 09 năm 2026/.test(c16) && /ĐOÀN KIỂM TRA: ?(Hội|Đoàn Thanh niên) [^.]*(xã|phường)/.test(c16) && !/Đoàn giả/.test(c16) && c16.indexOf(best.ten)>=0 && /điểm, xếp loại (Tốt|Khá|Trung bình|Yếu)/.test(c16) && /đến thời điểm 31\/08\/2026/.test(c16), c16.slice(c16.indexOf('Tổng dư nợ'), c16.indexOf('Tổng dư nợ')+90));
   ok('Mẫu 16: tổ phó để trống (chấm bằng tab), Chức vụ thẳng cột', /Chức vụ: Tổ trưởng- Ông \(bà\):\s*Chức vụ: /.test(c16) && (z16.doc.match(/w:leader="dot" w:pos="5954"/g)||[]).length>=2);
   ok('Mẫu 16: 3.124 không ghi số khách (kiểm tra thực tế tổ viên) + 01 phiếu kèm theo', /Qua kiểm tra tại Tổ và kiểm tra thực tế tổ viên, Đoàn có nhận xét như sau:/.test(c16) && !/thực tế tại/.test(c16) && /là 01 Phiếu/.test(c16));
   ktKhaiBao('m06'); await w(50); ktXuat('m06', 'in', 1); await w(300); ktKhaiBao('m16'); await w(50); ktXuat('m16', 'in', 1); await w(300);
   const h06 = await H[Object.keys(H).find(n=>/Mau 06/.test(n))].text(), h16 = await H[Object.keys(H).find(n=>/Mau 16/.test(n))].text();
   ok('In / PDF: A4 ngang lặp tiêu đề, khối cuối giữ liền', /size:A4 landscape/.test(h06) && /table-header-group/.test(h06) && /kt-giu/.test(h06) && h06.indexOf(best.ten)>=0);
   ok('In / PDF Mẫu 16: A4 dọc', /size:A4;/.test(h16) && /Hoạt động của Tổ Tiết kiệm và vay vốn/.test(h16));
   /* 3.93.1: Mẫu 06 sau giải ngân — chọn tháng → địa bàn → xem → in */
   ok('dòng trống bù (3.98: 0 món → 2 · 1 món → 1 · 2 món → 0)', ktDongBu([]).length===2 && ktDongBu([{R1:'1'}]).length===2 && ktDongBu([{R1:'1'},{R1:'2'}]).length===2 && ktDongBu([{R1:'1'},{R1:'2'},{R1:'3'}]).length===3);
   KT_NG_HET = false; KT_NG_Q = ''; KT_NG_LOC = ''; ktNganhHop(); await w(150); const nGon = document.querySelectorAll('#kt-ng tbody tr').length, coNut = /Hiện thêm/.test(document.getElementById('kt-ng').textContent);
   KT_NG_HET = true; ktNganhVe(); const nHet = document.querySelectorAll('#kt-ng tbody tr').length; dongHop();
   ok('bảng ngành: ẩn ngành dưới 10 món, nút Hiện thêm / Thu gọn', coNut && nHet>nGon && nHet>=176, nGon+' → '+nHet);
   const C2 = ktCH(); C2.che = 'gn'; C2.gnTu = '2026-07'; C2.gnDen = '2026-08'; C2.xa = t0.xa; C2.diem = ''; C2.hoi = ''; C2.to = ''; KT_GN = null; ktVeThe(); for(let i=0;i<80 && !KT_GN;i++) await w(200); await w(300);
   const B7 = await slBo('2026-07'), B8 = await slBo('2026-08');
   const toGN = {}, dem = (B, xa) => { const g = {}; (B.co.hstd||[]).forEach(o=>{ if(!o.ku || g[o.ku] || !o.to || o.to==='0000000' || !((o.gnT||0)>0)) return; g[o.ku] = 1; const t = KT_K.to[o.to] || {xa:o.xa}; if(t.xa===xa) toGN[o.to] = 1; }); };
   dem(B7, t0.xa); dem(B8, t0.xa); const kv = Object.keys(toGN).length;
   ok('chọn đến xã + 2 tháng: mỗi tổ 1 phiếu (3.98, gom 2 tháng)', ktGNChon().length===kv && kv>0, ktGNChon().length+' phiếu / tính tay '+kv);
   ok('món = mọi lần giải ngân trong tháng (gồm cả món vay trước tháng)', ktGNChon().every(p=>p.mon.every(o=>(o.gnT||0)>0)) && KT_GN.thang.join()==='2026-07,2026-08');
   const p0 = ktGNChon().find(p=>p.mon.length>=2) || ktGNChon()[0]; C2.to = p0.x.t.ma; ktVeThe(); await w(300);
   const truoc = ktGNChon().reduce((a,p)=>a+p.mon.length,0); const cb = document.querySelector('#kt-gn input[type=checkbox]'); cb.checked = false; cb.onchange(); await w(100);
   ok('chọn đến tổ: tích / bỏ tích từng món', document.querySelectorAll('#kt-gn input[type=checkbox]').length>=1 && ktGNChon().reduce((a,p)=>a+p.mon.length,0)===truoc-1, truoc+' → '+ktGNChon().reduce((a,p)=>a+p.mon.length,0));
   KT_GN_BO = {}; C2.to = ''; ktVeThe(); await w(200);
   KT_KB = {}; ktGNKhaiBao(); await w(100); ok('khai báo (3.114 hộp chọn khi in): chữ “In sẵn mục đích”', /In sẵn mục đích/.test(document.getElementById('ki-m06-md').innerHTML)); dongHop(); ktGNXem(1); await w(400);
   const nP = KT_GN_XEM.gts.length; ok('👁 Xem trước rồi mới in', !!document.getElementById('kt-gn-khung') && nP===kv);
   const gt0 = KT_GN_XEM.gts[0]; ok('cột Dư nợ = tổng dư nợ của món cuối tháng', gt0.rows[0].R6===ktTr(gt0.p.mon[0].dn, 3) && gt0.rows[0].R5===ktTr(gt0.p.mon[0].gn, 3));
   ktGNIn('word'); await w(1200);
   const fG = Object.keys(F).find(n=>/sau giai ngan/.test(n)); const zG = await moZip(F[fG]); const ids = (zG.doc.match(/<wp:docPr id="\d+"/g)||[]);
   ok('Word nhiều phiếu: XML hợp lệ, ngắt trang giữa phiếu, id hình không trùng', hopLe(zG.doc) && zG.doc.indexOf('{{')<0 && (zG.doc.match(/<w:sectPr/g)||[]).length===nP   /* 3.128: mỗi phiếu 1 phần (số trang riêng) */ && new Set(ids).size===ids.length && !/w14:paraId/.test(zG.doc), fG+' · '+nP+' phiếu');
   ok('3.98: không ghi nhận món đã lập phiếu', !Object.keys(D.cauHinh.ktgsGN||{}).length);
   ktGNKhaiBao(); await w(50); ktGNXem(1); await w(200); ktGNIn('in'); await w(300);
   const hG = await H[Object.keys(H).find(n=>/sau giai ngan/.test(n))].text(); ok('In / PDF nhiều phiếu: mỗi phiếu trang mới', (hG.match(/break-before:page/g)||[]).length===nP-1);
   C2.che = 'dx';
   /* 3.93.1: dán file (Ctrl+V) → nhận như kéo thả */
   const goc = gioiThieuFile; let nhan = null; gioiThieuFile = function(fs){ nhan = fs; };
   const dt = new DataTransfer(); dt.items.add(new File(['x'], 'CV 123 thu.pdf', {type:'application/pdf'}));
   const ev = new ClipboardEvent('paste', {clipboardData:dt, bubbles:true, cancelable:true}); document.body.dispatchEvent(ev);
   const dt2 = new DataTransfer(); dt2.setData('text/plain', 'chữ'); let nhan2 = null; gioiThieuFile = function(fs){ nhan2 = fs; }; document.body.dispatchEvent(new ClipboardEvent('paste', {clipboardData:dt2, bubbles:true, cancelable:true}));
   gioiThieuFile = goc;
   ok('dán file (Ctrl+V) → nhận như kéo thả; dán chữ không ảnh hưởng', !!nhan && nhan.length===1 && nhan[0].name==='CV 123 thu.pdf' && ev.defaultPrevented && nhan2===null);
   /* điện thoại */
   return o; }, files).catch(e=>['✗ LỖI '+e.message]);
 r.forEach(x=>console.log(x)); await p.screenshot({path:path.join(__dirname,'t106.png'), fullPage:true});
 await p.setViewportSize({width:390,height:844}); await p.evaluate(()=>{ dongHop(); ktVeThe(); }); await p.waitForTimeout(300); await p.screenshot({path:path.join(__dirname,'t106_dt.png'), fullPage:true});
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
