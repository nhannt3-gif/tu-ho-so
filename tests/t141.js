// 3.145 — nhóm file mới (Ⓑ bắt buộc 3 · Ⓐ chuẩn TW 6 · Ⓓ phụ), xóa hẳn loại đã bỏ, ô ma trận số chính + mũi tên, bấm ô = nạp / hỏi thay,
//        hoàn tác lần thay (máy + Drive giả), KHĐ tự tính từ Mẫu 31, tổ dư nợ 0 (cần đóng / ẩn), DSTO điền trước Thông tin tổ trưởng, 📋 File cần xuất.
//        Dữ liệu GIẢ dựng ngay trong trang, Drive giả (fakedrive.js).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[];
 const ctx = await b.newContext({viewport:{width:1366,height:900}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
 const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.hoi = function(a, b, c, f){ f(); };   /* tự xác nhận */
   const tep = (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'S'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
   /* 1. nhóm file */
   ok('9 file cần cho Đạt: Mẫu 31, Dư nợ chi tiết, DSTO + 01.1, 01.2, 4 LEN_31', SL_BAT_BUOC.slice().sort().join()===['hstd','dnct','dsto','bx','bc','lx','lh','lc','lt'].sort().join(), SL_BAT_BUOC.join());
   ok('nhóm: DSTO bắt buộc (Ⓑ), Thông tin tổ trưởng + KHĐ phụ (Ⓓ), B32 đã bỏ', slLoai('dsto').nhom==='B' && slLoai('tt').nhom==='D' && slLoai('khd').nhom==='D' && !!slLoai('b32').bo && slLoai('b32').nhom==='X');
   /* 2. xóa hẳn bảng của loại đã bỏ */
   for(const [l, k] of [['b32','2026-07'], ['kttk','2026-07'], ['kh','2026-07-15']]){ await luuFile(slIDB(l, k), {v:1, n:0, cot:{}}); SLM.bang[slKhoa(l, k)] = {loai:l, ky:k, soDong:0, luc:new Date().toISOString(), tenFile:l+'.xlsx'}; }
   const nBo = await slBoLoaiDon();
   ok('mở app: bảng B32 / Mẫu 7 / Sao kê KH đã nạp bị xóa hẳn (meta + máy, dấu xóa cho máy khác)', nBo===3 && !Object.keys(SLM.bang).some(k=>/^(b32|kttk|kh)\|/.test(k)) && !!SLM.xoa['b32|2026-07'] && !(await docFile(slIDB('b32','2026-07'))), 'xóa '+nBo);
   /* 3. ô ma trận: số chính + mũi tên */
   const dat = (l, k, tong) => { SLM.bang[slKhoa(l, k)] = {loai:l, ky:k, ngay:tdnCuoiKy(k), soDong:tong.n||1, luc:'2026-09-01T00:00:00Z', tenFile:l+'_'+k+'.xlsx', tong:tong, choDay:false, goc:'g', dl:'d'}; };
   dat('hstd', '2026-07', {n:10, mon:10, dn:100e6}); dat('hstd', '2026-08', {n:10, mon:10, dn:120e6});
   dat('nqh', '2026-07', {n:2, qh:1e6}); dat('nqh', '2026-08', {n:3, qh:2e6});
   dat('khd', '2026-07', {n:5, dn:1e6}); dat('khd', '2026-08', {n:4, dn:1e6});
   dat('dsto', '2026-07', {n:30}); dat('dsto', '2026-08', {n:31});
   SL_KY = '2026-08'; doiNgan(7); slDoiTab('nap'); veSoLieu(); await w(500);
   const o8 = l => slOMT(slLoai(l), '2026-08');
   ok('dư nợ tăng → ▲ xanh', /sl-mt xanh">▲/.test(o8('hstd')) && /120/.test(o8('hstd')), o8('hstd').replace(/<[^>]+>/g, ' ').slice(-40));
   ok('quá hạn tăng → ▲ đỏ, ô ghi số món + số tiền', /sl-mt do">▲/.test(o8('nqh')) && /3 món/.test(o8('nqh')));
   ok('KHĐ giảm → ▼ xanh (ngược chiều), đơn vị món', /sl-mt xanh">▼ 1 món/.test(o8('khd')));
   ok('tổ: số tổ, không mũi tên', /31 tổ/.test(o8('dsto')) && !/sl-mt/.test(o8('dsto')));
   ok('ô tháng đầu (không có tháng trước): không mũi tên', !/sl-mt/.test(slOMT(slLoai('hstd'), '2026-07')));
   ok('ma trận trên màn hình có ô mũi tên (nhóm Ⓑ mở sẵn)', document.querySelectorAll('.sl-bang .sl-mt').length>=1, document.querySelectorAll('.sl-bang .sl-mt').length+' ô');
   /* 4. bấm ô */
   let napO = ''; const napCu = slNapMot; slNapMot = (l, k) => { napO = l+'|'+k; };
   slOBam('nk', '2026-08'); ok('bấm ô trống → nạp file vào ô đó', napO==='nk|2026-08', napO); slNapMot = napCu;
   slOBam('hstd', '2026-08'); await w(100);
   const hop = (document.querySelector('.hop-in')||{}).textContent||'';
   ok('bấm ô đã có file → hỏi "Thay bằng file mới?" + nút Thôi / Thay / Xem / Tải / Xóa', /Thay bằng file mới\?/.test(hop) && /Thôi/.test(hop) && /Xem chi tiết/.test(hop) && /Tải file gốc/.test(hop) && /Xóa ô/.test(hop) && !/Hoàn tác/.test(hop));
   dongHop();
   /* 5. 📋 File cần xuất */
   slFileXuat('2026-08'); await w(100);
   const fx = document.querySelector('.hop-in .sl-fx'), fxc = fx ? fx.textContent : '';
   ok('📋 File cần xuất: có KHĐ MẪU 14, không dùng 08/KTNB, Mẫu 31, DSTO, 4 LEN_31', /MẪU 14/.test(fxc) && /08\/KTNB/.test(fxc) && /Mẫu 31/.test(fxc) && /DSTO/.test(fxc) && (fxc.match(/LEN_31/g)||[]).length>=4);
   ok('📋 ✓ file tháng đang xem đã có (Mẫu 31, DSTO), file chưa có không ✓', fx && fx.querySelectorAll('b.xanh').length===4, fx && fx.querySelectorAll('b.xanh').length+' ✓ (hstd, nqh, khd, dsto)');
   ok('tab Nạp có nút 📋 File cần xuất', Array.from(document.querySelectorAll('#tr7 button')).some(x=>/File cần xuất/.test(x.textContent)));
   dongHop();
   ['hstd','nqh','khd','dsto'].forEach(l=>['2026-07','2026-08'].forEach(k=>{ delete SLM.bang[slKhoa(l, k)]; }));
   /* 6. thay file + hoàn tác — trong máy (bản cũ chưa lên Drive) */
   const fNQH = (ten, so) => tep([['Sao kê nợ quá hạn'], ['Số khế ước','Mã khách hàng','Tên khách hàng','Dư nợ quá hạn','Ngày chuyển quá hạn']].concat(Array.from({length:so}, (_, i)=>['66000000000000'+(10+i), '48000000'+(10+i), 'KHÁCH GIẢ '+i, 1e6, '01/08/2026'])), ten);
   const ghi = async (f) => { const kq = await slDocFile(f, 'nqh'); kq.loai = 'nqh'; kq.ky = '2026-09'; kq.ngay = '2026-09-30'; kq.nguonKy = 'anh chọn'; await slGhi(kq); return kq; };
   await ghi(fNQH('NQH cu.xlsx', 2)); await ghi(fNQH('NQH moi.xlsx', 5));
   const e1 = SLM.bang['nqh|2026-09'];
   ok('thay file: giữ bản trước (tên file cũ, mốc thay) + bản trong máy _truoc', e1.tenFile==='NQH moi.xlsx' && e1.truoc && e1.truoc.tenFile==='NQH cu.xlsx' && !!(await docFile(slIDB('nqh','2026-09')+'_truoc')));
   slOBam('nqh', '2026-09'); await w(100);
   ok('ô đã thay: có nút ↩ Hoàn tác lần thay (về file cũ)', /Hoàn tác lần thay \(về “NQH cu\.xlsx”\)/.test((document.querySelector('.hop-in')||{}).textContent||'')); dongHop();
   slHoanTac('nqh', '2026-09'); for(let i=0;i<40 && SLM.bang['nqh|2026-09'].tenFile!=='NQH cu.xlsx';i++) await w(150); await w(300);
   const e2 = SLM.bang['nqh|2026-09'], b2 = await docFile(slIDB('nqh','2026-09'));
   ok('hoàn tác (trong máy): ô quay về file cũ, bảng 2 dòng, không còn bản trước (chỉ 1 bước)', e2.tenFile==='NQH cu.xlsx' && b2 && b2.n===2 && !e2.truoc && !(await docFile(slIDB('nqh','2026-09')+'_truoc')), JSON.stringify({ten:e2.tenFile, n:b2 && b2.n}));
   e2.truoc = {tenFile:'x', thayLuc:'2026-01-01T00:00:00Z'}; let bm = ''; const bao0 = bao; bao = t=>{ bm = t; }; slHoanTac('nqh', '2026-09'); bao = bao0;
   ok('quá 30 ngày → không hoàn tác được', /quá 30 ngày/.test(bm) && SLM.bang['nqh|2026-09'].tenFile==='NQH cu.xlsx', bm); delete e2.truoc;
   /* 7. hoàn tác khi bản cũ đã lên Drive (đã vào Thùng rác Drive) */
   window.coTheNoiDrive=()=>true; D.cauHinh.thumuc='Tủ hồ sơ'; DR.sanSang = true; DR.online = true; DR.token = 'x'; DR.hetHan = Date.now()+36e5;
   await slDay(); const eA = SLM.bang['nqh|2026-09'], gA = eA.goc, dA = eA.dl;
   await ghi(fNQH('NQH moi 2.xlsx', 4)); await slDay(); const eB = SLM.bang['nqh|2026-09'];
   const sau = await p_trash([gA, dA, eB.goc, eB.dl]);
   ok('đẩy bản mới lên Drive → file cũ vào Thùng rác Drive', !!gA && !!dA && sau[0] && sau[1] && !sau[2] && !sau[3], JSON.stringify(sau));
   slHoanTac('nqh', '2026-09'); for(let i=0;i<40 && SLM.bang['nqh|2026-09'].tenFile!=='NQH cu.xlsx';i++) await w(150); await w(500);
   const sau2 = await p_trash([gA, dA, eB.goc, eB.dl]), e3 = SLM.bang['nqh|2026-09'];
   ok('hoàn tác (Drive): lấy file cũ khỏi Thùng rác, file mới vào Thùng rác, ô trỏ lại file cũ', !sau2[0] && !sau2[1] && sau2[2] && sau2[3] && e3.goc===gA && e3.dl===dA && !e3.choDay, JSON.stringify(sau2));
   ok('hoàn tác: mốc giờ mới (máy khác bỏ bản trong máy, tải lại bản cũ)', e3.luc > eB.luc);
   /* 8. KHĐ tự tính từ Mẫu 31 (kỳ T9 → mốc 30/06) */
   const m = (ku, x) => Object.assign({ku:ku, kh:'k'+ku, dn:1e6, kn:0, ct:'03', nv:'2025-01-01', ngdg:'2026-06-29'}, x);
   const hs = [m('A'), m('B', {ngdg:'2026-06-30'}), m('C', {kn:1e6}), m('D', {ct:'02'}), m('E', {dn:0}), m('F', {nv:'2026-07-05', ngdg:'2026-05-01'}), m('G', {ngdg:'2026-03-01'}), m('A')];
   const kd = slKHDTinh(hs, '2026-09');
   ok('KHĐ tự tính: còn dư nợ, GD gần nhất trước 30/06 (đúng ngày mốc không tính), bỏ khoanh, HSSV, món vay sau mốc, không trùng', kd.map(x=>x.ku).join()==='A,G', kd.map(x=>x.ku).join());
   ok('tháng không có file KHĐ → dùng số tự tính; có file → dùng file', slKHD({co:{}, khdTinh:kd}).length===2 && slKHD({co:{khd:[1]}, khdTinh:kd}).length===1);
   /* 9. cây tổ: DSTO trước Thông tin tổ trưởng; tổ dư nợ 0 */
   const r31 = (to, ku, dn) => ({to:to, ku:ku, kh:'KH'+ku, dn:dn, xa:'X1', tenXa:'Xã Giả', thon:'T1', tenThon:'Ấp Giả', dv:'03', toTen:'TỔ TRƯỞNG '+to});
   SL_BO['2026-10'] = {ky:'2026-10', co:{hstd:[r31('0000001', 'K1', 5e6), r31('0000002', 'K2', 0)],
       dsto:[{to:'0000001', sdt:'0901111111', phoTen:'PHÓ DSTO', diem:'D1', tenDiem:'Điểm Giả'}, {to:'0000002', diem:'D1', tenDiem:'Điểm Giả'}, {to:'0000003', diem:'D1', tenDiem:'Điểm Giả', toTen:'TỔ BA', tenXa:'Xã Giả'}],
       tt:[{to:'0000001', sdt:'0999999999', phoTen:'PHÓ TT', diem:'D1'}, {to:'0000004', diem:'D1', toTen:'TỔ BỐN'}]},
     mon:{}, theoKH:{}, lap:[], to:{}, nqh:{}, nk:{}, khd:{}, tdn:[], nguon:{hstd:'2026-10', dsto:'2026-10', tt:'2026-10'}, hsTen:'Mẫu 31'};
   delete TO_KS['2026-10']; const K = await toNap('2026-10');
   const t1 = K.to['0000001'], t2 = K.to['0000002'], t3 = K.to['0000003'];
   ok('SĐT tổ trưởng, tổ phó lấy theo DSTO (file bắt buộc), không theo Thông tin tổ trưởng', t1 && t1.sdt==='0901111111' && /DSTO/i.test(t1.pho||''), t1 && (t1.sdt+' · '+t1.pho));
   ok('tổ dư nợ 0 còn trên DSTO → vẫn là tổ, ghi "cần đóng tổ"', t2 && t2.canDong && t3 && t3.canDong && K.canDong.length===2, K.canDong.join());
   ok('tổ dư nợ 0 không còn trên DSTO / LEN_31 → ẩn khỏi cây, vẫn giữ để tìm', !K.to['0000004'] && !!K.toAn['0000004']);
   ok('tổ có dư nợ: không gắn nhãn', !t1.canDong);
   const nhan = pvLuaChon(K.to, {xa:t1.xa, diem:t1.khoaDiem, hoi:'', to:''}, 'to').map(x=>x.chu).join(' | ');
   ok('danh sách tổ: tổ dư nợ 0 có nhãn "⚠ Dư nợ 0 — cần đóng tổ", tổ đang vay không', /0000002 · ⚠ Dư nợ 0 — cần đóng tổ/.test(nhan) && !/0000001 · ⚠/.test(nhan), nhan);
   const chip = toDong0HTML(Object.keys(K.to).map(k=>K.to[k]));
   ok('chip "⚠ 2 tổ dư nợ 0 — cần đóng tổ" (bấm mở danh sách tổ)', /⚠ 2 tổ dư nợ 0 — cần đóng tổ/.test(chip) && (chip.match(/toChonTo/g)||[]).length===2);
   ok('thẻ tổ cần đóng có nhãn đỏ', /to-dong0/.test(toTheHTML(t2, [])));
   TO_K = K; TO_Q = 'TỔ BỐN'; document.body.insertAdjacentHTML('beforeend', '<div id="to-gy"></div>'); toTim();
   ok('tìm tổ đã ẩn: vẫn thấy, ghi rõ đã ẩn', /đã ẩn/.test(document.getElementById('to-gy').textContent), document.getElementById('to-gy').textContent.slice(0, 80));
   document.getElementById('to-gy').remove(); TO_Q = ''; delete SL_BO['2026-10']; delete TO_KS['2026-10'];
   return o;
   async function p_trash(ids){ return Promise.all(ids.map(id=>fetch('https://www.googleapis.com/drive/v3/files/'+id+'?fields=id,trashed', {headers:{Authorization:'Bearer x'}}).then(r=>r.json()).then(j=>!!j.trashed).catch(()=>null))); }
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
