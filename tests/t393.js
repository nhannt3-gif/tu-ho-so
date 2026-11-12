// 3.518 (anh 12/11 "bản cũ anh đã chốt nhưng chuyển qua bản mới làm lại báo chưa chốt"): 🔎 Kế hoạch đã lưu → ↪ Nhận về xã / Hội hiện tại
//   kế hoạch mang mã xã cũ (Mẫu 31 mới đổi mã sau sáp nhập) → tìm xã / Hội theo mã tổ, chép lịch + lịch sử chốt (giữ đã chốt), bản cũ giữ, nháp đích vào Thùng rác,
//   đích đã chốt → không ghi đè. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1366, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const C = ktCH(); C.ky = '2026-08'; C.che = 'kh'; C.khNam = 2026; C.diem = ''; C.ap = ''; C.to = '';
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-the'));i++) await w(250); await w(400);
   const t = Object.values(KT_K.to).find(x => !toLaTT(x) && x.dv && String(x.dv)!=='99' && x.xa), dv = String(t.dv);
   const toCua = Object.values(KT_K.to).filter(x => !toLaTT(x) && x.xa===t.xa && String(x.dv||'')===dv);
   const kCu = '2026|99001|'+dv, kMoi = '2026|'+t.xa+'|'+dv, lich = {}; toCua.forEach((x, i) => { lich[x.ma] = 2+(i%3); }); lich['7777777'] = 6;
   D.cauHinh.ktKH = {}; D.cauHinh.ktKH[kCu] = {v:2, tu:2, den:10, to:lich, snap:{'7777777':{ten:'Tổ Cũ Giả', ap:'Ấp Cũ'}}, luc:'2026-03-01T00:00:00.000Z', khoa:1, chot:[{luc:'2026-03-02T00:00:00.000Z', tu:2, den:10, to:JSON.parse(JSON.stringify(lich)), n:Object.keys(lich).length}]};
   D.cauHinh.ktKH[kMoi] = {v:2, tu:2, den:10, to:{[toCua[0].ma]:9}, luc:'2026-11-11T00:00:00.000Z'};
   D.rac = (D.rac || []).filter(m => m.loaiNho!=='ktKH');
   C.xa = t.xa; C.hoi = dv; ktVeThe(); for(let i=0;i<60 && !document.querySelector('#kt-the [data-lenh="ktkh.ds"]');i++) await w(200); await w(300);
   ok('trước: màn Kế hoạch mã xã mới báo chưa chốt', /chưa chốt/.test(document.getElementById('kt-the').textContent));
   document.querySelector('#kt-the [data-lenh="ktkh.ds"]').click(); await w(300);
   const nut = document.querySelector('#hop-in [data-lenh="ktkh.nhan"][data-k="'+kCu+'"]');
   ok('🔎: dòng mã xã cũ (đã chốt) có nút ↪ Nhận về xã / Hội hiện tại', !!nut && /đã chốt/.test(nut.closest('tr').textContent) && /không còn trong số liệu/.test(nut.closest('tr').textContent));
   const d = KTKH.dich(kCu);
   ok('tìm đích theo mã tổ: đúng xã / Hội hiện tại, khớp đủ tổ (trừ tổ đã gộp)', d.k===kMoi && d.khop===toCua.length && d.n===toCua.length+1, JSON.stringify(d));
   nut.click(); await w(300); const hop = document.getElementById('hop-in').textContent;
   ok('bấm → hộp hỏi trước: ghi bản cũ (đã chốt), đích, khớp n tổ, báo thay bản nháp vào Thùng rác', /Nhận kế hoạch cũ/.test(hop) && /đã chốt 1 lần/.test(hop) && new RegExp('khớp '+toCua.length).test(hop) && /bản nháp/.test(hop) && /Thùng rác/.test(hop));
   document.querySelector('#hop-in [data-lenh="ktkh.nhanOk"]').click(); await w(800);
   const S = D.cauHinh.ktKH;
   ok('nhận về: đích có lịch + lịch sử chốt, giữ đã chốt; bản cũ giữ nguyên', S[kMoi].khoa===1 && S[kMoi].chot.length===1 && S[kMoi].to[toCua[0].ma]===lich[toCua[0].ma] && S[kMoi].nhan.tu===kCu && S[kCu].khoa===1);
   ok('bản nháp đích cũ vào 🗑 Thùng rác (khôi phục được)', (D.rac || []).some(m => m.loaiNho==='ktKH' && m.khoa===kMoi && m.data.to[toCua[0].ma]===9));
   const the = document.getElementById('kt-the').textContent;
   ok('màn Kế hoạch mở đúng xã / Hội: ✅ Đã chốt; tổ đã gộp chỉ cảnh báo', ktCheDo()==='kh' && ktKHKhoa()===kMoi && /Đã chốt/.test(the) && /Tổ Cũ Giả/.test(the) && /không còn trong số liệu/.test(the));
   /* đích đã chốt → không ghi đè */
   S[kCu].to[toCua[0].ma] = 12; const truoc = JSON.stringify(S[kMoi]); KTKH.nhan(kCu, 1); await w(200);
   ok('đích đã có bản chốt → không ghi đè', JSON.stringify(S[kMoi])===truoc);
   C.che = 'dx';
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
