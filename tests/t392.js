// 3.516 / 3.517 (anh 11/11 "KH năm lấy theo Mẫu 31 đầu năm khi lập, còn in thì lấy đúng tháng KH"): 🗓 Kế hoạch năm LẬP theo Mẫu 31 đầu năm (chốt 31/12 năm trước) — không theo Kỳ đầu trang; in theo tháng vẫn số liệu tháng kiểm tra;
//   kế hoạch đã chốt giữ nguyên khi tổ đổi — tổ đã gộp / đi khỏi chỉ cảnh báo; tổ mới của ấp có tháng tự theo ấp; 🔎 Kế hoạch đã lưu (cả bản trong Thùng rác). Bộ GIẢ gianho31 + Mẫu 31 giả ngày 05/09.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1366, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   let u8 = null;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); if(/31-08-2026\.XLSX$/.test(f.n)) u8 = u; const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-07'); const C = ktCH(); C.ky = '2026-07'; C.che = 'kh'; C.khNam = 2026; C.diem = ''; C.ap = ''; C.to = '';
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-the'));i++) await w(250); await w(400);
   const t = Object.values(KT_K.to).find(x => !toLaTT(x) && x.dv && String(x.dv)!=='99' && x.xa); C.xa = t.xa; C.hoi = String(t.dv); ktVeThe();
   for(let i=0;i<60 && !(KTKH.K && document.querySelector('#kt-the .kt-kh-bang'));i++) await w(200); await w(300);
   const the = () => document.getElementById('kt-the'), chu = () => the().textContent;
   ok('KH 2026: chưa có T12/2025 → lập theo bản sớm nhất (T7/2026) + ⚠, dòng 📌 ghi rõ đầu năm + mới nhất', KTKH.dau().ky==='2026-07' && KTKH.dau().lech && /Kế hoạch lập theo Mẫu 31 T7\/2026 \(đầu năm — ⚠ chưa nạp T12\/2025/.test(chu()) && /Mẫu 31 mới nhất \(T8\/2026\) chỉ cảnh báo/.test(chu()), (chu().match(/📌[^\n]{0,200}/)||[''])[0]);
   const L = ktKHLich(); ok('danh sách tổ lấy từ Mẫu 31 đầu năm (đối tượng tổ của bản T7)', L.ds.length>0 && L.ds.every(x => KTKH.lay('2026-07').to[x.ma]===x));
   C.khNam = 2027; ktVeThe(); for(let i=0;i<40 && !/Kế hoạch lập theo Mẫu 31 T8\/2026 \(đầu năm\)/.test(chu());i++) await w(200);
   ok('KH 2027 → đầu năm = chốt T12/2026 chưa có → tháng chốt gần nhất trước đó T8/2026', KTKH.dau(2027).ky==='2026-08' && /Kế hoạch lập theo Mẫu 31 T8\/2026 \(đầu năm — ⚠ chưa nạp T12\/2026/.test(chu()), (chu().match(/📌[^\n]{0,120}/)||[''])[0]);
   C.khNam = 2026; ktVeThe(); await w(400);
   /* in theo tháng: số liệu tháng kiểm tra */
   let dung = null; ktKHVoiSL(() => { dung = KTKH.Kdung()===KT_K; });
   ok('trong In theo tháng (ktKHVoiSL) dùng số liệu tháng kiểm tra, không lấy bản mới nhất', dung===true && KTKH.muon===0);
   /* chốt + tổ đã gộp (mã không còn) + tổ mới cùng ấp */
   const k = ktKHKhoa(), ds = L.ds, ap = ktKHAp(ds[0]), cungAp = ds.filter(x => ktKHAp(x)===ap);
   const to = {}; ds.forEach(x => { to[x.ma] = 3; }); to['9999999'] = 5; if(cungAp.length>1) delete to[cungAp[1].ma];
   const snap = {'9999999':{ten:'Tổ Đã Gộp Giả', ap:ap}};
   D.cauHinh.ktKH = D.cauHinh.ktKH || {}; D.cauHinh.ktKH[k] = {v:2, tu:2, den:10, to:to, snap:snap, luc:'2026-10-01T00:00:00.000Z', khoa:1, chot:[{luc:'2026-10-01T00:00:00.000Z', tu:2, den:10, to:JSON.parse(JSON.stringify(to)), snap:snap, n:Object.keys(to).length}]};
   ktVeThe(); await w(400);
   ok('kế hoạch đã chốt vẫn ✅ Đã chốt khi Mẫu 31 sắp lại tổ', /Đã chốt/.test(chu()) && D.cauHinh.ktKH[k].khoa===1 && D.cauHinh.ktKH[k].chot.length===1);
   ok('tổ đã gộp (mã không còn) → chỉ cảnh báo ⚠, kế hoạch / bản chốt không đổi', /⚠ 1 tổ trong kế hoạch không còn trong số liệu \(Tổ Đã Gộp Giả/.test(chu()) && D.cauHinh.ktKH[k].to['9999999']===5 && D.cauHinh.ktKH[k].chot[0].to['9999999']===5);
   /* so với Mẫu 31 mới nhất (giả): 1 tổ đầu năm đã gộp, 1 tổ mới cùng ấp */
   const Km = KTKH.lay('2026-08'), Kg = Object.assign({}, Km, {to:Object.assign({}, Km.to)}), bo = ds[ds.length-1]; delete Kg.to[bo.ma]; Kg.to['8888888'] = Object.assign({}, ds[0], {ma:'8888888', ten:'Tổ Mới Giả'}); KTKH.c['2026-08'] = Kg;
   ktVeThe(); await w(400);
   ok('tổ đầu năm không còn trong Mẫu 31 mới nhất → ⚠ chỉ cảnh báo (kế hoạch giữ nguyên)', /⚠ 1 tổ trong kế hoạch đã gộp \/ đi khỏi theo Mẫu 31 T8\/2026/.test(chu()) && /chỉ cảnh báo/.test(chu()) && D.cauHinh.ktKH[k].to[bo.ma]===3, (chu().match(/⚠ 1 tổ trong kế hoạch đã gộp[^—]*/)||[''])[0]);
   ok('tổ mới theo Mẫu 31 mới nhất cùng ấp → 🆕 in theo tháng của ấp', /🆕 \d+ tổ mới theo Mẫu 31 T8\/2026: .*Tổ Mới Giả · in theo T3 của ấp/.test(chu()), (chu().match(/🆕[^—]*/)||[''])[0]);
   KTKH.c['2026-08'] = Km;
   /* 🔎 Kế hoạch đã lưu (+ bản trong Thùng rác) */
   const kCu = '2025|'+t.xa+'|'+t.dv; D.rac = D.rac || []; D.rac.push({id:'mnthu', khoCu:'mucNho', loaiNho:'ktKH', khoa:kCu, tenMoi:'KH cũ', data:{to:{a:2, b:3}, luc:'2025-03-01T00:00:00.000Z', khoa:1, chot:[{luc:'2025-03-02T00:00:00.000Z', to:{a:2, b:3}}]}, xoaLuc:'2025-12-01T00:00:00.000Z'});
   D.cauHinh.ktKH['2026|99999|11'] = {v:2, to:{x:2}, luc:'2026-09-01T00:00:00.000Z'};
   const nut = the().querySelector('[data-lenh="ktkh.ds"]'); ok('màn Kế hoạch có nút 🔎 Kế hoạch đã lưu', !!nut);
   nut.click(); await w(300); const hop = document.getElementById('hop-in').textContent;
   const dsK = KTKH.ds();
   ok('🔎 liệt kê kế hoạch đang có (✅ đã chốt, số lần chốt + ngày) + bản đã xóa trong Thùng rác', dsK.some(x => x.k===k && x.khoa && x.chot===1) && dsK.some(x => x.rac && x.k===kCu && x.chot===1) && /đã xóa/.test(hop) && /Thùng rác/.test(hop));
   ok('🔎 bản có mã xã không còn trong số liệu → ghi rõ', dsK.some(x => x.xa==='99999' && !x.co) && /mã xã \/ Hội không còn trong số liệu/.test(hop));
   /* Mở → đúng năm / xã / Hội */
   C.khNam = 2027; dongHop(); KTKH.mo(k); await w(500);
   ok('Mở → đúng năm / xã / Hội của kế hoạch', ktKHNam()===2026 && String(C.xa)===String(t.xa) && ktKHHoi()===String(t.dv) && ktCheDo()==='kh');
   /* Mẫu 31 theo ngày mới hơn (tổ hiện tại) */
   const wb = XLSX.read(u8, {type:'array'}), a = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1, defval:''});
   const tep = new File([(() => { const w2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(w2, XLSX.utils.aoa_to_sheet(a.map(r => r.map(c => typeof c==='string' ? c.replace(/31\/08\/2026/g, '05/09/2026') : c))), 'Sheet 1'); return XLSX.write(w2, {type:'array', bookType:'xlsx'}); })()], 'Ho_so_tin_dung_chi_tiet_05-09-2026.XLSX');
   const kq = await slDocFile(tep); if(!kq.loi && kq.ky) await slGhi(kq);
   ok('Mẫu 31 theo ngày 05/09 = mới nhất (để so tổ đã gộp); lập vẫn theo đầu năm', KTKH.kyMoi()==='2026-09-05' && KTKH.dau().ky==='2026-07', KTKH.kyMoi());
   ktVeThe(); for(let i=0;i<60 && !KTKH.lay('2026-09-05');i++) await w(200); await w(300);
   ok('dòng 📌 ghi mới nhất ngày 05/09/2026', /Mẫu 31 mới nhất \(ngày 05\/09\/2026\)/.test(chu()), (chu().match(/📌[^\n]{0,240}/)||[''])[0]);
   C.che = 'dx';
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
