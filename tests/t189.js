// 3.227 (anh 17/10) — 📒 Sổ hộ vay gộp tab 👪 Hộ vay: lọc theo khối LỌC ĐỊA BÀN (Xã › Điểm · Hội › Tổ), ngày nhập (từ / đến, nút nhanh),
//   sắp theo ngày nhập, nhóm theo tháng (gập / mở, tích cả tháng), tích hộ → 📋 Lập 03/TD; cây địa bàn 📌 Ghim, ⬆ Lên 1 cấp, Backspace. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete D.cauHinh.hoVayChuyen; delete D.cauHinh.pvGhim; delete D.cauHinh.pvGon;
   D.cauHinh.hsoTK = {ky:'', hst:'10c', hsv:'homoi', v209:1};   /* máy đang nhớ tab cũ */
   slDoiTab('hsv'); doiNgan(7); await w(1200);
   const C = hsoCH(); C.xa=''; C.diem=''; C.hoi=''; C.to='';
   ok('gộp tab: không còn 👪 Hộ vay, máy nhớ tab cũ → 📒 Sổ hộ vay', !HSO_MAU.hsv.some(m=>m.k==='homoi') && hsoMau().k==='sohv' && C.hsv==='sohv');
   /* hộ giả: 2 tổ khác nhau + 1 hộ chưa có tổ; ngày nhập 3 tháng */
   const xa = pvLuaChon(TO_K.to, C, 'xa', true)[0].k; C.xa = xa; const dsTo = pvLuaChon(TO_K.to, C, 'to', true); C.xa = '';
   const t1 = TO_K.to[dsTo[0].k], t2 = TO_K.to[dsTo[1].k], n = nay(), y = n.getFullYear(), m = n.getMonth();
   const lam = (ten, to, ngay, xaHo) => { const o = {id:'hm'+ten.length+Math.random().toString(36).slice(2,6), tao:ngay.toISOString(), kh:'', to:to||'', xa:xaHo||'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:[{ten:ten, ns:'', cccd:'', ncap:'', noiCap:'', qh:'', sdt:''}], dung:0, sv:[]}; hmDs().push(o); return o; };
   const a1 = lam('Hộ Một Tháng Này', t1.ma, new Date(y, m, 3, 9)), a2 = lam('Hộ Hai Tháng Này', t2.ma, new Date(y, m, 5, 20)), a3 = lam('Hộ Ba Tháng Trước', t1.ma, new Date(y, m-1, 10, 8)),
     a4 = lam('Hộ Bốn Chưa Tổ', '', new Date(y, m-1, 12, 8), xa), a5 = lam('Hộ Năm Năm Trước', t2.ma, new Date(y-1, 5, 1, 8));
   luu(); hsoVe(); await w(300);
   const thang = () => [...document.querySelectorAll('#hm-so-bang tr.hm-so-thang')].map(x=>x.textContent.trim());
   const ten = () => [...document.querySelectorAll('#hm-so-bang tr[data-id] input[data-so="ten"]')].map(x=>x.value);
   ok('nhóm theo tháng: 3 dòng tháng, tháng mới trước, đếm hộ', thang().length===3 && /· 2 hộ/.test(thang()[0]) && /· 2 hộ/.test(thang()[1]) && /· 1 hộ/.test(thang()[2]), thang().join(' | '));
   ok('sắp theo ngày nhập (mới trước): Hai (ngày 5) trước Một (ngày 3)', ten()[0]==='Hộ Hai Tháng Này' && ten()[1]==='Hộ Một Tháng Này', ten().join(','));
   ok('cột Ngày nhập ghi ngày (giờ máy)', document.querySelector('#hm-so-bang tr[data-id="'+a2.id+'"]').textContent.indexOf(ngayVNsl(ngayISO(new Date(y, m, 5))))>=0);
   hmSoSapXep('tao'); await w(200);
   ok('đảo chiều ngày nhập: tháng cũ trước', /Tháng 0?6\/|Tháng 06/.test(thang()[0]) && ten()[0]==='Hộ Năm Năm Trước', thang()[0]);
   hmSoSapXep('tao'); await w(200);
   hmSoGon(hmSoThang(a1)); await w(100);
   ok('bấm dòng tháng → gập (ẩn hộ tháng đó, dòng tháng còn)', thang().length===3 && /▸/.test(thang()[0]) && ten().indexOf('Hộ Một Tháng Này')<0);
   hmSoGon(hmSoThang(a1)); await w(100);
   HM_SO.nhom = 0; hmSoVeBang(); await w(100); ok('tắt nhóm → bảng phẳng', thang().length===0 && ten().length===5); HM_SO.nhom = 1; hmSoVeBang();
   /* ngày nhập */
   hmSoKhoang('thang'); await w(200);
   ok('nút Tháng này → 2 hộ', ten().length===2 && /ngày nhập từ/.test(hmSoLocChu()), ten().length);
   hmSoKhoang('truoc'); await w(200); ok('nút Tháng trước → 2 hộ', ten().length===2, ten().join(','));
   hmSoKhoang(''); hmSoNgay('tu', ngayVNsl(ngayISO(new Date(y, m-1, 11)))); await w(200);
   ok('gõ "từ ngày" → lọc từ ngày đó', ten().length===3 && ten().indexOf('Hộ Ba Tháng Trước')<0, ten().join(','));
   hmSoNgay('tu', 'abc'); ok('ngày gõ sai → giữ lọc cũ', !!HM_SO.tu); hmSoKhoang(''); await w(200);
   /* địa bàn theo khối lọc */
   pvChon('hsv', 'xa', xa); await w(300);
   ok('chọn Xã → hộ của xã (kể cả hộ chưa có tổ khai xã)', ten().indexOf('Hộ Bốn Chưa Tổ')>=0 && ten().length===5, ten().length);
   pvChon('hsv', 'to', t1.ma); await w(300);
   ok('chọn Tổ → chỉ hộ của tổ đó; bộ lọc ghi trên bản in', ten().length===2 && ten().every(x=>/Một|Ba/.test(x)) && /lọc:/.test(hmSoLocChu()), ten().join(','));
   if(t1.dv && t2.dv && String(t1.dv)!==String(t2.dv)){ pvChon('hsv', 'to', ''); pvChon('hsv', 'hoi', String(t2.dv)); await w(300); ok('chọn Hội → hộ của tổ thuộc Hội', ten().length>=2 && ten().every(x=>/Hai|Năm/.test(x)), ten().join(',')); }
   /* 📌 ghim cây */
   pvChon('hsv', 'hoi', ''); pvChon('hsv', 'to', t1.ma); await w(200);
   ok('3.327 mặc định kiểu gọn (Hồ sơ): chọn tổ → khối lọc 1 dòng ô chọn', !!document.querySelector('#hsv-cay .loc-khoi.gon') && C.to===t1.ma);
   ok('có ⬆ Lên 1 cấp, nút 📌, nút đổi kiểu ▦ Chip', !!document.querySelector('#hsv-cay .pv-len') && !!document.querySelector('#hsv-cay .pv-ghim-nut') && /Chip/.test(document.querySelector('#hsv-cay .pv-gon').textContent));
   pvLen('hsv'); await w(200);
   ok('⬆ Lên 1 cấp: bỏ tổ, giữ xã, vẫn kiểu gọn', !C.to && C.xa===xa && !!document.querySelector('#hsv-cay .loc-khoi.gon'));
   pvChon('hsv', 'to', t1.ma); await w(200); ok('chọn lại tổ', C.to===t1.ma);
   document.activeElement && document.activeElement.blur && document.activeElement.blur();
   document.body.dispatchEvent(new KeyboardEvent('keydown', {key:'Backspace', bubbles:true})); await w(200);
   ok('Backspace (không ở ô nhập) = lên 1 cấp', !C.to && C.xa===xa);
   const tim = document.getElementById('hm-so-tim'); tim.focus(); tim.dispatchEvent(new KeyboardEvent('keydown', {key:'Backspace', bubbles:true})); await w(100);
   ok('Backspace trong ô nhập → không đổi địa bàn', C.xa===xa); tim.blur();
   pvGonDoi('hsv'); pvGhimDoi('hsv'); await w(100); pvChon('hsv', 'to', t1.ma); await w(200);
   ok('📌 ghim: giữ kiểu chip đang chọn + địa bàn vào cài đặt', pvGhimCua('hsv') && !document.querySelector('#hsv-cay .loc-khoi.gon') && D.cauHinh.pvKieu.hsv==='chip' && D.cauHinh.pvChung.to===t1.ma && /Đã ghim/.test(document.querySelector('#hsv-cay .pv-ghim-nut').textContent));
   pvGhimDoi('hsv'); pvGonDoi('hsv'); ok('bỏ ghim (chung mọi tab)', !D.cauHinh.pvGhimBat && !pvGhimCua('to') && !pvGhimCua('gdx'));
   ok('cài đặt ghim đồng bộ theo khối Số liệu', chKhoiCua('pvGhimBat')==='solieu');
   pvChon('hsv', 'xa', ''); await w(300);
   /* tích → Lập 03/TD */
   HM_CHON = {}; hmSoTick(a1.id, true); hmSoTick(a2.id, true); await w(100);
   ok('tích 2 hộ → 📋 Lập 03/TD (2 hộ)', /Lập 03\/TD \(2 hộ\)/.test(document.getElementById('hm-so-chon').textContent));
   hmSoTickThang(hmSoThang(a3), true); await w(100);
   ok('tích cả tháng trước → 4 hộ; ô tích dòng tháng đã chọn', /\(4 hộ\)/.test(document.getElementById('hm-so-chon').textContent) && document.querySelectorAll('#hm-so-bang tr.hm-so-thang input:checked').length===2);
   hsoD03TuChon(); await w(500);
   ok('📋 Lập 03/TD → tab 03/TD, 4 dòng', hsoMau().k==='03td' && hsoD03().ds.length===4, hsoD03().ds.length);
   hsoChonMau('sohv'); await w(300);
   const h = hsoLap().h || ''; ok('bản in: có dòng tháng khi nhóm', (h.match(/Tháng \d\d\/\d{4} \(\d hộ\)/g)||[]).length===3);
   ok('dọn mã cũ: không còn hmTuyHTML / HM_Q', typeof hmTuyHTML==='undefined' && typeof HM_Q==='undefined');
   return o;
 }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
