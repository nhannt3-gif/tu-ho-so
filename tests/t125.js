// 3.123 — Phân công BTV: tích người phân công, khuyết Chủ tịch (Phó đôn lên) / khuyết Phó (CT kiêm), người ký, ô kiểm tra đủ nhiệm vụ;
//        rà soát chính tả tên; Kế hoạch: chọn tháng bằng chip, tự lưu khi xem, xóa kế hoạch, tổ không còn trong số liệu; Báo cáo tổ theo kế hoạch.
// Bộ GIẢ: tests/gia31 (tên người là tên giả).
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
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.khHoi=''; C.che='dx'; C.khNam = 2026; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && String(t.dv)!=='14' && t.xa); const t = ds[0];
   const k = ktHoiKhoa(t), c = ktChuan(t), ten = ktHoiTenTD(t); D.cauHinh.ktHoiKB = D.cauHinh.ktHoiKB || {};
   const NV = s => s.replace(/\{xa\}|\{ten\}|\{cxa\}|\{ap\}|\{capAp\}|\{ngan\}|\{cap\}|\{CT\}|\{CTc\}|\{PCT\}/g, '§').split('§').sort((a, b)=>b.length-a.length)[0];   /* đoạn chữ cố định dài nhất của 1 nhiệm vụ */
   const noi = () => ktPCNoiDung(k).khoi.map(y=>y.s).join('\n'), dem = (s, x) => s.split(x).length-1;
   /* 1. đủ người: như cũ */
   D.cauHinh.ktHoiKB[k] = {ct:'Nguyễn Văn Chủ', pct:'Trần Thị Phó', pct2:'Lê Văn Phó Hai', uv1:'Phạm Thị Ủy', uv2:'Võ Văn Viên'}; delete (D.cauHinh.ktPC||{})[k];
   ktPCHop(k); await w(150);
   const hop = document.getElementById('hop-in');
   ok('hộp phân công: cột tích "Phân công", mặc định tích hết 5 người', hop.querySelectorAll('.kt-pc-bang tbody tr').length===5 && [...hop.querySelectorAll('.kt-pc-bang tbody tr td:first-child input')].every(x=>x.checked));
   ok('ô Người ký: mặc định để trống — ghi chung', hop.querySelector('.kt-pc-vt select') && hop.querySelector('.kt-pc-vt select').value==='' && /ghi chung/.test(hop.textContent));
   ok('ô Kiểm tra đủ nhiệm vụ có trong hộp', !!document.getElementById('kt-pc-kiem') && /Kiểm tra đủ nhiệm vụ/.test(document.getElementById('kt-pc-kiem').textContent));
   let s0 = noi();
   ok('đủ người: CT có 10 nhiệm vụ CT, không kiêm việc Phó / Ủy viên', KT_PC_CT.every(x=>s0.indexOf(NV(x))>=0) && dem(s0, NV(KT_PC_PHO[3]))===2 && dem(s0, NV(KT_PC_UV[0]))===2);
   ok('câu tập huấn vẫn ghi đủ chức danh (Chủ tịch, Phó Chủ tịch và Ủy viên)', s0.indexOf(c.ky+', '+c.pho+' và Ủy viên Ban Thường vụ')>=0);
   /* 2. bỏ tích Chủ tịch → khuyết: Phó 1 đôn lên mặc định; chọn Phó 2 */
   ktPCChon(k, 'ct', false); await w(100);
   let g = ktPCNoiDung(k), s1 = noi();
   ok('bỏ tích Chủ tịch → Phó đầu tiên đôn lên phụ trách, đứng đầu, nhận đủ 10 nhiệm vụ CT', /^1\. Đồng chí Trần Thị Phó, /.test(g.khoi.find(y=>/^1\. /.test(y.s)).s) && s1.indexOf('Đồng chí Trần Thị Phó, '+c.pho+' phụ trách '+ten+':')>=0 && KT_PC_CT.every(x=>s1.indexOf(NV(x))>=0) && s1.indexOf('Nguyễn Văn Chủ')<0);
   ok('Phó / Ủy viên còn lại: "tham mưu / phân công của Phó Chủ tịch phụ trách"', s1.indexOf('Tham mưu cho '+c.pho+' phụ trách '+ten)>=0 && s1.indexOf('theo sự phân công của '+c.pho+' phụ trách '+ten)>=0 && s1.indexOf('Tham mưu cho '+c.ky+' ')<0);
   ok('còn Phó 2 → Phó 2 giữ đủ 6 nhiệm vụ Phó, người phụ trách không lặp', dem(s1, NV(KT_PC_PHO[3]))===1 && dem(s1, NV(KT_PC_PHO[5]))===1);
   ok('tiêu đề bỏ "Chủ tịch" khi khuyết', /^Phân công nhiệm vụ của /.test(g.tieu) && g.tieu.indexOf('của '+c.pho+', Ủy viên Ban Thường vụ '+ten)>=0);
   ok('ấp chia lại: người phụ trách ít ấp như Chủ tịch; hết ấp, không trùng', ktPCKiem(k).find(r=>/có người kiểm tra/.test(r.chu)).ok);
   ktPCDoiPT(k, 'pct2'); await w(100); s1 = noi();
   ok('chọn Phó 2 đôn lên → Phó 2 đứng đầu, Phó 1 làm nhiệm vụ Phó', /^1\. Đồng chí Lê Văn Phó Hai, /m.test(s1) && s1.indexOf('Đồng chí Trần Thị Phó, '+c.pho+' '+ten+', thực hiện')>=0);
   ok('ô kiểm tra: ✓ Khuyết Chủ tịch — Phó đôn lên', ktPCKiem(k)[0].ok && /đôn lên phụ trách/.test(ktPCKiem(k)[0].chu));
   /* 3. khuyết cả CT, chỉ còn 1 Phó → người phụ trách kiêm việc riêng của Phó */
   ktPCChon(k, 'pct', false); await w(100); s1 = noi();
   ok('khuyết CT + chỉ 1 Phó → Phó phụ trách kiêm 3 nhiệm vụ riêng của Phó, không lặp 3 việc trùng', dem(s1, NV(KT_PC_PHO[3]))===1 && dem(s1, NV(KT_PC_PHO[4]))===1 && dem(s1, NV(KT_PC_PHO[5]))===1 && s1.indexOf(NV(KT_PC_PHO[0]))<0);
   ok('việc kiêm đặt trước "nhiệm vụ phát sinh khác"', s1.indexOf(NV(KT_PC_PHO[5])) < s1.indexOf(NV(KT_PC_CT[9])));
   /* 4. khuyết CT, không tích Phó nào → ⚠ */
   ktPCChon(k, 'pct2', false); await w(100);
   ok('khuyết CT, không tích Phó nào → ô kiểm tra ⚠ nhiệm vụ CT chưa có người nhận', !ktPCKiem(k)[0].ok && /chưa có người nhận/.test(ktPCKiem(k)[0].chu) && /chưa tích/.test(document.getElementById('hop-in').textContent));
   ktPCXuat(k, 'word'); await w(100);
   ok('còn ⚠ → bấm Word hỏi trước, chưa xuất', !Object.keys(F).length && /Vẫn xuất Word/.test(document.getElementById('hop-in').textContent));
   [...document.querySelectorAll('#hop-in button')].find(x=>/Vẫn xuất Word/.test(x.textContent)).click(); await w(800);
   ok('bấm "Vẫn xuất Word" → xuất, Word hợp lệ', Object.keys(F).length===1 && hopLe(await docx(F[Object.keys(F)[0]])));
   /* 5. đủ CT, không tích Phó → CT kiêm; không tích Ủy viên → việc Ủy viên về người đứng đầu */
   ktPCChon(k, 'ct', true); await w(50); ktPCChon(k, 'uv1', false); await w(50); ktPCChon(k, 'uv2', false); await w(100); s1 = noi();
   ok('khuyết Phó → Chủ tịch kiêm 3 nhiệm vụ riêng của Phó', /^1\. Đồng chí Nguyễn Văn Chủ, /.test(s1.split('\n').find(x=>/^1\. /.test(x))) && dem(s1, NV(KT_PC_PHO[4]))===1 && dem(s1, '. Đồng chí ')===1);
   ok('không Ủy viên, không Phó → Chủ tịch nhận nhiệm vụ Ủy viên; ô kiểm tra ghi rõ', dem(s1, NV(KT_PC_UV[0]))===1 && ktPCKiem(k).some(r=>r.ok && /nhận nhiệm vụ của Ủy viên/.test(r.chu)));
   ktPCChon(k, 'pct', true); await w(100); s1 = noi();
   ok('có lại Phó, không Ủy viên → Phó nhận nhiệm vụ Ủy viên', dem(s1, NV(KT_PC_UV[0]))===1 && s1.indexOf(NV(KT_PC_UV[0])) > s1.indexOf('Đồng chí Trần Thị Phó'));
   /* 6. người ký */
   ktPCDoiKy(k, 'pct'); g = ktPCNoiDung(k);
   ok('chọn người ký = Phó → TM. BAN THƯỜNG VỤ / PHÓ CHỦ TỊCH + tên', g.ky.cv===c.pho.toUpperCase() && g.ky.ten==='Trần Thị Phó');
   ktPCDoiKy(k, ''); g = ktPCNoiDung(k); ok('về "để trống" → CHỦ TỊCH, không tên', g.ky.cv===c.ky.toUpperCase() && g.ky.ten==='');
   ktPCDoiKy(k, 'pct2'); g = ktPCNoiDung(k); ok('người ký không còn được phân công → về ghi chung', g.ky.ten==='' && g.ky.cv===c.ky.toUpperCase());
   ktPCDoiKy(k, ''); dongHop();
   /* 7. chỉnh ấp tay rồi đổi người → giữ ấp, ô kiểm tra báo thiếu */
   ktPCChiaDeu(k, 1); const ap = ktPCAp(k), a0 = (ktPCLay(k).p.pct.ap||[])[0];
   if(a0){ ktPCDoi(k, 'pct', 'ap', a0, false); ktPCChon(k, 'uv1', true); await w(100);
     ok('đã chỉnh ấp tay → đổi người không chia đè; ô kiểm tra báo ấp chưa ai nhận', (ktPCLay(k).p.uv1.ap||[]).length===0 && ktPCKiem(k).some(r=>!r.ok && r.chu.indexOf(a0)>=0)); }
   else ok('đã chỉnh ấp tay (bỏ qua: không có ấp)', true);
   ktPCChiaDeu(k, 1); ok('⇄ Chia lại đều → hết ấp, không trùng', ktPCKiem(k).find(r=>/có người kiểm tra/.test(r.chu)).ok, ap.length+' ấp'); dongHop();
   /* 8. rà soát tên */
   const kt1 = ktTenKiem('  nguyễn  văn a '), kt2 = ktTenKiem('Nguyen Van A'), kt3 = ktTenKiem('Nguyễń Văn1'), kt4 = ktTenKiem('Hùng'), kt5 = ktTenKiem('Nguyễn Thị Mỹ Ngọc');
   ok('rà tên: khoảng trắng thừa + viết hoa → gợi ý "Nguyễn Văn A"', kt1.loi.length===2 && kt1.goiY==='Nguyễn Văn A');
   ok('rà tên: không dấu / ký tự lạ / 1 chữ; tên đúng không báo', /chưa có dấu/.test(kt2.loi.join()) && /ký tự lạ/.test(kt3.loi.join()) && /1 chữ/.test(kt4.loi.join()) && !kt5.loi.length && !kt5.goiY);
   ok('rà tên: một chữ 2 dấu thanh', /2 dấu thanh/.test(ktTenKiem('Nguyêñ̀ Văn A'.normalize('NFC')).loi.join()) || /2 dấu thanh|ký tự lạ/.test(ktTenKiem('Nguyêñ̀ Văn A').loi.join()));
   D.cauHinh.ktHoiKB[k].uv1 = 'trần  thị phó';
   ok('rà tên: trùng tên 2 vai trò + ô kiểm tra phân công báo tên', ktTenLoiO(ktHoiKB(k), 'uv1').loi.some(x=>/trùng tên/.test(x)) && ktPCKiem(k).some(r=>!r.ok && /Tên "trần  thị phó"/.test(r.chu)));
   C.che = 'hdt'; ktCH().hdtTab = 'hoi'; C.xa = t.xa; ktVeThe(); await w(300);
   const id = k.replace(/[^0-9a-z]/gi, '_'), oL = document.getElementById('hkbt-'+id+'-uv1');
   ok('thẻ Khai báo: ⚠ dưới ô tên + nút "Sửa theo gợi ý"', oL && /⚠/.test(oL.textContent) && !!oL.querySelector('button'));
   oL.querySelector('button').click(); await w(100);
   ok('bấm "Sửa theo gợi ý" → tên sửa, ô nhập cập nhật', ktHoiKB(k).uv1==='Trần Thị Phó' && document.getElementById('hkb-'+id+'-uv1').value==='Trần Thị Phó');
   ktHoiKBSua(k, 'uv2', 'Võ Văn Viên'.normalize('NFD')); ok('lưu tên gõ tổ hợp → tự chuẩn dựng sẵn (NFC)', ktHoiKB(k).uv2==='Võ Văn Viên' && ktHoiKB(k).uv2.length==='Võ Văn Viên'.normalize('NFC').length);
   /* 9. Kế hoạch: chip tháng */
   const dmK = {}; Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99').forEach(x=>{ const kk = x.xa+'|'+x.dv; dmK[kk] = (dmK[kk]||0)+1; });
   const [xa, dv] = Object.keys(dmK).sort((a, b2)=>dmK[b2]-dmK[a])[0].split('|');
   C.che = 'kh'; C.xa = xa; C.hoi = ''; C.khHoi = dv; delete (D.cauHinh.ktKH||{})['2026|'+xa+'|'+dv]; ktVeThe(); await w(200);
   let L = ktKHLich(); const N = L.ds.length;
   ok('KH: 2 cách chọn, mặc định Từ → đến (02 → 10), chưa lưu', L.cach==='khoang' && L.tu===2 && L.den===10 && !L.luu && /Từ tháng → đến tháng/.test(document.getElementById('kt-the').textContent));
   ktKHDoiCach('chip'); await w(150); L = ktKHLich();
   ok('chuyển "Chọn tháng" → giữ tháng 2–10, hiện 12 chip, chip có số tổ', L.cach==='chip' && L.thang.join()==='2,3,4,5,6,7,8,9,10' && document.querySelectorAll('.kt-kh-th').length===12 && /tổ/.test(document.querySelector('.kt-kh-th.bat small').textContent));
   ktKHNhanh('le'); await w(100); L = ktKHLich();
   ok('Chọn nhanh Tháng lẻ → T1,3,5,7,9,11; chia đều 100% tổ vào các tháng đó', L.thang.join()==='1,3,5,7,9,11' && Object.keys(L.gan).length===N && Object.values(L.gan).every(m=>m%2===1));
   ktKHNhanh('chan'); await w(50); ok('Tháng chẵn → 2…12', ktKHLich().thang.join()==='2,4,6,8,10,12');
   ktKHNhanh('quy'); await w(50); ok('Cuối quý → 3,6,9,12', ktKHLich().thang.join()==='3,6,9,12');
   ktKHNhanh('bo'); await w(50); L = ktKHLich(); ok('Bỏ hết → chưa tháng nào, mọi tổ báo chưa xếp', !L.thang.length && L.thieu.length===N);
   [3, 5, 7].forEach(m=>ktKHTichThang(m)); await w(100); L = ktKHLich();
   ok('tích T3, T5, T7 (ví dụ của anh) → tổ chia vào 3 tháng, theo thứ tự ấp', L.thang.join()==='3,5,7' && Object.keys(L.gan).length===N && L.ds.every((x, i)=>!i || L.gan[x.ma]>=L.gan[L.ds[i-1].ma]));
   const gKH = ktKHGiaTri(ktInV('kh')); ok('bảng Kế hoạch chỉ có các tháng đã chọn; TU/DEN = 03 → 07', gKH.f.TU==='03/2026' && gKH.f.DEN==='07/2026' && gKH.rows.length>=1);
   ok('Word Kế hoạch hợp lệ (chip)', hopLe(await docx(await ktDocx(gKH.mau||'m01', gKH))));
   ktKHDoiThang(L.ds[0].ma, 7); await w(50); ktKHTichThang(9); await w(100);
   ok('đã chỉnh tay → đổi tháng hỏi trước, chưa chia lại', /Chia lại các tổ/.test(document.getElementById('hop-in').textContent) && ktKHLich().thang.join()==='3,5,7' && ktKHLich().gan[L.ds[0].ma]===7);
   [...document.querySelectorAll('#hop-in button')].find(x=>/Chia lại/.test(x.textContent)).click(); await w(150);
   ok('bấm Chia lại → T3,5,7,9 chia đều lại', ktKHLich().thang.join()==='3,5,7,9' && Object.keys(ktKHLich().gan).length===N);
   ok('nhớ cách chọn theo Hội – xã (lưu cauHinh, đồng bộ Drive)', D.cauHinh.ktKH['2026|'+xa+'|'+dv].cach==='chip' && !chRieng('ktKH'));
   /* 10. tự lưu khi Xem; tổ không còn trong số liệu; xóa */
   delete D.cauHinh.ktKH['2026|'+xa+'|'+dv]; ktVeThe(); await w(100); ok('chưa lưu trước khi Xem', !ktKHLich().luu);
   ktKHXem(1); await w(300); dongHop(); ok('bấm Xem Kế hoạch → tự lưu kế hoạch (để quay lại in báo cáo tổ)', ktKHLich().luu && /Đã lưu kế hoạch năm 2026/.test(document.getElementById('kt-the').textContent));
   L = ktKHLich(); const tMat = L.ds[L.ds.length-1], thMat = L.gan[tMat.ma], toGoc = KT_K.to[tMat.ma]; delete KT_K.to[tMat.ma]; ktVeThe(); await w(100);
   L = ktKHLich(); ok('tổ không còn trong số liệu → giữ trong kế hoạch, báo ⚠ kèm tên tổ đã lưu', L.mat.length===1 && L.mat[0].ma===tMat.ma && L.mat[0].ten===(tMat.ten||'') && /không còn trong số liệu/.test(document.getElementById('kt-the').textContent));
   ktKHDoiThang(L.ds[0].ma, L.thang[0]); ok('sửa kế hoạch sau đó vẫn giữ tổ đã mất trong lịch đã lưu', +D.cauHinh.ktKH['2026|'+xa+'|'+dv].to[tMat.ma]===thMat);
   /* 11. Báo cáo tổ (Mẫu 04) theo kế hoạch */
   C.che = 'bc'; C.hoi = ''; ktVeThe(); await w(200);
   ok('màn Báo cáo tổ: có hàng "📅 Theo kế hoạch 2026"', /Theo kế hoạch 2026/.test(document.getElementById('kt-the').textContent));
   const S = D.cauHinh.ktKH['2026|'+xa+'|'+dv], dTh = {}; Object.keys(S.to).forEach(m=>{ if(m!==tMat.ma) dTh[S.to[m]] = (dTh[S.to[m]]||0)+1; }); const mBC = +Object.keys(dTh).sort((a, b2)=>dTh[b2]-dTh[a])[0], soMBC = Object.keys(S.to).filter(m=>+S.to[m]===mBC && m!==tMat.ma).length;
   ktBCTheoKH('2026|'+xa+'|'+dv, mBC); await w(150);
   ok('bấm tháng → tích sẵn đúng các tổ của tháng đó; tổ không còn trong số liệu không tích', soMBC>0 && Object.keys(KT_BC_CHON).length===soMBC && !KT_BC_CHON[tMat.ma] && ktBCDs().filter(r=>r.chon).length===soMBC, soMBC+' tổ');
   KT_K.to[tMat.ma] = toGoc; KT_BC_CHON = {};
   C.che = 'kh'; C.khHoi = dv; ktVeThe(); await w(150);
   ktKHXoa(); await w(50); ok('🗑 Xóa kế hoạch → hỏi trước', /Xóa kế hoạch năm 2026/.test(document.getElementById('hop-in').textContent) && ktKHLich().luu);
   [...document.querySelectorAll('#hop-in button')].find(x=>/🗑 Xóa kế hoạch/.test(x.textContent)).click(); await w(150);
   L = ktKHLich(); ok('xóa → về xếp tự động (02 → 10), giữ dấu xóa để Drive không kéo lại', !L.luu && L.cach==='khoang' && L.tu===2 && D.cauHinh.ktKH['2026|'+xa+'|'+dv].xoa===1 && !Object.values(ktDKLich('2026-'+hai(mBC))).some(v=>v==='2026|'+xa+'|'+dv));
   ok('sau khi xóa: Báo cáo tổ không còn hàng Theo kế hoạch của Hội này', !ktBCKH().some(x=>x.dv===dv));
   /* 12. kế hoạch lưu ở bản cũ (chưa có v) vẫn đọc được, coi như đã chỉnh tay */
   D.cauHinh.ktKH['2026|'+xa+'|'+dv] = {tu:4, den:6, to:{[L.ds[0].ma]:5}, luc:'2026-03-01T00:00:00.000Z'}; L = ktKHLich();
   ok('kế hoạch bản cũ: đọc đúng khoảng 04 → 06, tổ đã xếp giữ nguyên, tổ cùng ấp theo tháng ấp (3.140), tổ ấp khác báo chưa xếp', L.cach==='khoang' && L.tu===4 && L.den===6 && L.gan[L.ds[0].ma]===5 && L.thieu.length===L.ds.filter(t=>ktKHAp(t)!==ktKHAp(L.ds[0])).length && L.ds.filter(t=>ktKHAp(t)===ktKHAp(L.ds[0])).every(t=>L.gan[t.ma]===5) && L.tay);
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
