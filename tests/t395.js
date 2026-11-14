// 3.521 (anh 14/11 "gộp và code 4 ý" — gọn chip các tab): đo ở 1366×768, bộ GIẢ gianho31.
//   ① Hồ sơ vay › Sổ hộ vay: Ngày nhập + loại hộ chung 1 khung chip nhỏ, số hộ lên hàng nút, hướng dẫn vào ⓘ, bỏ dòng "Nhập liệu" / "Sổ hộ vay — n hộ", nút In… cùng hàng tiêu đề → bảng ≤ 360px
//   ② Giao dịch xã: chip mẫu nhỏ, khung chip ≤ 100px · ③ Phân bổ KH: 6 nút 1 nhóm, nút ≤ 28px · ④ Hồ sơ Tổ: chip mẫu ≤ 28px · tab Tổ / Tra cứu giữ cỡ chip.
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
   kyChungDoi('2026-08'); doiNgan(7);
   const h = e => e ? Math.round(e.getBoundingClientRect().height) : 999, top = e => e ? Math.round(e.getBoundingClientRect().top) : 999, q = s => document.querySelector(s);
   /* ① Sổ hộ vay */
   slDoiTab('hsv'); await w(3000); if(typeof hsoChonMau==='function'){ hsoChonMau('sohv'); await w(1200); }
   const loc = [...document.querySelectorAll('#tr7 .hm-so-loc')], khung = loc[1];
   ok('① Ngày nhập + loại hộ (Tất cả / Hộ cũ / Hộ mới…) chung 1 khung chip', loc.length===2 && !!khung && /Ngày nhập/.test(khung.textContent) && /Hộ cũ \(mã KH\)/.test(khung.textContent));
   ok('① chip nhỏ (≤ 24px)', !!khung && [...khung.querySelectorAll('.hm-so-chip')].every(c => h(c)<=24), khung && h(khung.querySelector('.hm-so-chip')));
   ok('① số hộ lên hàng nút; không còn dòng "📒 Sổ hộ vay — n hộ" riêng', !!q('#tr7 .hm-so-loc .hm-so-dem-o #hm-so-dem') && ![...document.querySelectorAll('#tr7 .nhan-nhom')].some(e => e.offsetParent && /Sổ hộ vay —/.test(e.textContent)));
   ok('① dòng "✎ Nhập liệu" ẩn, hướng dẫn thu vào ⓘ', !(q('#tr7 .hso-kbr') || {}).offsetParent && !!q('#tr7 details.hm-so-ghi') && !q('#tr7 details.hm-so-ghi').open);
   const xn = q('#hso-xem-nut'), td = q('#tr7 .hso-dau-ds');
   ok('① nút In / PDF / Word cùng hàng tiêu đề (không chồng chữ)', !!xn && !!td && Math.abs(top(xn)-top(td))<=6 && xn.getBoundingClientRect().left>td.querySelector('.hso-tieu').getBoundingClientRect().right, top(xn)+' / '+top(td));
   ok('① bảng Sổ hộ vay bắt đầu ≤ 360px (trước 493)', top(q('#hm-so-bang table, #hm-so-bang'))<=360, top(q('#hm-so-bang')));
   /* ④ Hồ sơ: chip mẫu */
   ok('④ chip mẫu Hồ sơ ≤ 28px', [...document.querySelectorAll('#tr7 .hso-dau .gdx-c')].filter(e => e.offsetParent).every(c => h(c)<=28), h(q('#tr7 .hso-dau .gdx-c')));
   /* ② Giao dịch xã */
   slDoiTab('gdx'); await w(3500);
   ok('② khung chip mẫu GDX ≤ 100px (trước 134)', h(q('#tr7 .gdx2-dau-du'))<=100, h(q('#tr7 .gdx2-dau-du')));
   ok('② đủ chip mẫu, chip nhỏ (≤ 26px)', document.querySelectorAll('#tr7 .gdx2-du .gdx-c').length>=12 && h(q('#tr7 .gdx2-du .gdx-c'))<=26, document.querySelectorAll('#tr7 .gdx2-du .gdx-c').length+' chip · '+h(q('#tr7 .gdx2-du .gdx-c'))+'px');
   /* ③ Phân bổ KH */
   slDoiTab('pb'); await w(2500);
   const nh = [...document.querySelectorAll('#pb-trai .gd-hang')];
   ok('③ 6 nút Quyết định chung 1 nhóm, nút ≤ 28px', nh.length===1 && nh[0].querySelectorAll('.gd-nut, .nut-tep').length===6 && [...nh[0].querySelectorAll('.gd-nut, .nut-tep')].every(e => h(e)<=28), nh.length);
   /* tab khác giữ cỡ */
   slDoiTab('tra'); await w(2500);
   const c = q('#tr7 .tc-theo .gd-chip, #tr7 .tc-theo button');
   ok('Tra cứu KH giữ cỡ chip cũ (13px)', !!c && getComputedStyle(c).fontSize==='13px', c && getComputedStyle(c).fontSize);
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
