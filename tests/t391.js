// 3.515 (anh 11/11 "rà soát giao diện tối ưu tránh chiếm quá nhiều chỗ của các chip"): KTGS gọn — đo chiều cao ở màn 1366×768.
//   Khung chọn hộ 1 hàng (≤ 40px) · thanh 5 nút ≤ 30px · hàng in ≤ 34px · dòng tổ đã tích = dòng thường · bảng tổ bắt đầu ≤ 280px ·
//   Sau 30 ngày: chip Tất cả / Lần 1 cùng hàng tháng GN, nhắc 30 ngày trong dòng đếm · chip tab khác không đổi cỡ. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1366, height:768}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const C = ktCH(); C.ky = '2026-08'; C.che = 'dx'; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; KT_DK_CHON = {};
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-the'));i++) await w(250); await w(400);
   const t0 = Object.values(KT_K.to).find(t => !toLaTT(t) && t.xa); pvChon('kt', 'xa', String(t0.xa)); await w(800);
   KTTO.dsBang().slice(0, 2).forEach(r => KT_DK_CHON[r.t.ma] = true); ktVeThe(); await w(500);
   const T = document.getElementById('kt-the'), h = e => e ? Math.round(e.getBoundingClientRect().height) : 999, top = e => e ? Math.round(e.getBoundingClientRect().top) : 999;
   ok('thanh 5 nút ≤ 30px', h(T.querySelector('.kt-khoi'))<=30, h(T.querySelector('.kt-khoi')));
   ok('khung chọn hộ 1 hàng (Món · Kiểu · Số hộ · ↺) ≤ 40px', h(T.querySelector('.kt-to-cong'))<=40, h(T.querySelector('.kt-to-cong')));
   ok('hàng in (Đã chọn · ngày · 5 nút) ≤ 34px', h(T.querySelector('.kt-to-in'))<=34, h(T.querySelector('.kt-to-in')));
   const tr = [...T.querySelectorAll('.kt-to-bang tbody tr')], co = tr.find(x => x.classList.contains('kt-co')), khong = tr.find(x => !x.classList.contains('kt-co'));
   ok('dòng tổ đã tích (có ▾ Hộ) cao bằng dòng thường', Math.abs(h(co)-h(khong))<=2, h(co)+' / '+h(khong));
   ok('bảng tổ bắt đầu ≤ 280px từ đỉnh màn', top(T.querySelector('.kt-to-bang'))<=280, top(T.querySelector('.kt-to-bang')));
   ok('chip nhãn ngắn, tên đủ ở title', /Toàn hộ cần quan tâm/.test((T.querySelector('[data-lenh="ktto.kieu"][data-k="xau"]')||{}).title||'') && /Cần QT/.test(T.querySelector('[data-lenh="ktto.kieu"][data-k="xau"]').textContent));
   /* Sau 30 ngày */
   ktDoiCheDo('gn'); for(let i=0;i<40 && !document.querySelector('#kt-the .kt-gn-dau .kt-gn-lan');i++) await w(200); await w(300);
   const T2 = document.getElementById('kt-the');
   ok('Sau 30 ngày: chip Tất cả / Lần 1 cùng hàng tháng giải ngân', !!T2.querySelector('.kt-gn-dau .kt-gn-lan [data-lenh="ktgn.lan"]'));
   ok('Sau 30 ngày: nhắc 30 ngày nằm trong dòng đếm phiếu (không thành hàng riêng)', !!T2.querySelector('.kt-gn-dem .kt-nhac30') && /Kiểm tra trong 30 ngày kể từ ngày giải ngân/.test(T2.textContent));
   /* chip tab khác giữ cỡ */
   ktDoiCheDo('dx');
   const ngoai = document.createElement('div'); ngoai.innerHTML = GD.chip('Thử', false, 'x', {}); document.body.appendChild(ngoai);
   const fs1 = getComputedStyle(ngoai.firstChild).fontSize, fs2 = getComputedStyle(T.querySelector('.kt-to-cong .gd-chip') || ngoai.firstChild).fontSize; ngoai.remove();
   ok('CSS chỉ trong KTGS: chip ngoài #kt-the giữ cỡ cũ', fs1!==fs2, fs1+' / '+fs2);
   C.che = 'dx';
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
