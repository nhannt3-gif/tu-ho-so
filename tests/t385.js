// 3.504 (rà soát 08/11 — Đợt 2 mục 6, QUY_CHUAN §18.3): CHẠY APP VỚI BỘ GIẢ "GIỐNG FILE THẬT" (tests/gia_that.js — biến thể gianho31):
//   Thông tin tổ trưởng TÊN XÃ / THÔN TOÀN HOA + khoảng trắng thừa, "Ông  …" tên tổ trưởng; Mẫu 31 tên khách thừa khoảng trắng, ô SĐT / ngày sinh trống, mã tổ mất số 0.
//   So với bộ gốc: ① số tổ · số khách · tổng dư nợ không đổi ② tên khách không còn khoảng trắng thừa ③ tên xã / thôn không TOÀN HOA (cây tổ, 15/TD, 03/BB-CX)
//   ④ các màn chính mở được (Tổ, KTGS 15/TD · 03/BB-CX, Hồ sơ 02/BG, Giao dịch xã 12) ⑤ không lỗi trang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path = require('path'), that = require('./gia_that.js');
async function chay(b, bienThe){
  const loi = [], p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
  let files = that.docBo(), dem = null;
  if(bienThe){ await p.evaluate(() => xongTV); const x = await that.bienDoi(p, files); files = x.files; dem = x.dem; }
  const r = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1; window.confirm = () => true;
    for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try { await slGhi(kq); } catch(e){} } }
    kyChungDoi('2026-08'); const K = await KHO.nap('2026-08'); KHO.datKy(K);
    const to = Object.keys(K.to).map(m => K.to[m]).filter(t => !toLaTT(t)), tv = [].concat.apply([], to.map(t => KHO.toVien(t)));
    o.so = {to:to.length, kh:tv.length, dn:tv.reduce((a, k) => a+(k.dn||0), 0)};
    o.tenThua = tv.filter(k => /\s{2}|^\s|\s$/.test(k.ten||'')).map(k => k.ten).slice(0, 3);
    const hoa = s => { s = String(s||'').trim(); return s.length>3 && s===s.toUpperCase() && /[A-ZĐÂĂÊÔƠƯ]/.test(s); };
    o.xaHoa = to.filter(t => hoa(t.tenXa) || hoa(t.tenThon)).map(t => t.tenXa+' / '+t.tenThon).slice(0, 3);
    /* màn Tổ */
    doiNgan(7); slDoiTab('to'); for(let i=0;i<60 && !document.getElementById('to-cay');i++) await w(200); await w(400);
    const chuTo = (document.getElementById('tr7')||{}).textContent || '';
    o.toMo = chuTo.length>200; o.toHoa = /PHƯỜNG GIA LỘC|XÃ TRUÔNG MÍT|PHƯỜNG GÒ DẦU/.test(chuTo);
    /* KTGS 15/TD · 03/BB-CX */
    const C = ktCH(); C.ky = '2026-08'; C.xa = ''; C.to = ''; C.che = 'dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
    const t = Object.values(KT_K.to).filter(x => !toLaTT(x) && x.dv && String(x.dv)!=='99' && KHO.doiChieu(x).length)[0];
    const g15 = kt15DL(t), g03 = kt03DL(ktHoiKhoa(t), {});
    o.kt = {xa15:g15.f.XA, dc15:g15.f.DC, xa03:g03.f.XA, hoixa:g03.f.HOIXA, tt:g15.f.TT};
    o.ktHoa = [g15.f.XA, g15.f.DC, g03.f.XA, g03.f.HOIXA].some(s => /[A-ZĐ]{4,} [A-ZĐ]{3,}/.test(s||''));
    o.trang15 = /DANH SÁCH ĐỐI CHIẾU/.test(MAU_IN.trang('kt15', [g15])) && /BIÊN BẢN KIỂM TRA/.test(MAU_IN.trang('kt03', [g03]));
    /* Hồ sơ 02/BG · Giao dịch xã 12 */
    o.bg = typeof hsoLap02bg==='function';
    slDoiTab('gdx'); await w(600); o.gdx = !!document.querySelector('#tr7 .gdx2-dau');
    return o; }, files);
  await p.close(); return {r, loi, dem};
}
(async()=>{ const b = await chromium.launch(), R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const goc = await chay(b, false), that2 = await chay(b, true), a = goc.r, x = that2.r;
 ok('bộ giống thật đã biến đổi đủ kiểu (xã / thôn HOA, tên thừa khoảng trắng, ô trống, mã tổ mất số 0)', that2.dem && that2.dem.xa>0 && that2.dem.ten>0 && that2.dem.trong>0 && that2.dem.ma>0 && that2.dem.tt>0, JSON.stringify(that2.dem));
 ok('① số tổ · số khách · tổng dư nợ giống bộ gốc', JSON.stringify(a.so)===JSON.stringify(x.so), JSON.stringify(a.so)+' ↔ '+JSON.stringify(x.so));
 ok('② tên khách không còn khoảng trắng thừa (lúc nạp chỉ đổi cách viết — QUY_CHUAN §15)', !x.tenThua.length, JSON.stringify(x.tenThua));
 ok('③ tên xã / thôn trong kho không TOÀN HOA', !x.xaHoa.length, JSON.stringify(x.xaHoa));
 ok('③ màn Tổ mở được, không hiện tên xã TOÀN HOA', x.toMo && !x.toHoa);
 ok('③ KTGS 15/TD · 03/BB-CX: Xã, địa chỉ, Hội – xã không TOÀN HOA; bản in dựng được', !x.ktHoa && x.trang15, JSON.stringify(x.kt));
 ok('③ 15/TD · 03/BB-CX: địa danh giống bộ gốc', x.kt.xa15===a.kt.xa15 && x.kt.dc15===a.kt.dc15 && x.kt.xa03===a.kt.xa03, JSON.stringify(a.kt)+' ↔ '+JSON.stringify(x.kt));
 ok('④ Hồ sơ 02/BG có hàm dựng · Giao dịch xã mở được', x.bg && x.gdx);
 ok('⑤ không lỗi trang (bộ gốc + bộ giống thật)', !goc.loi.length && !that2.loi.length, goc.loi.concat(that2.loi).slice(0, 3).join(' | '));
 R.forEach(z => console.log(z)); console.log((R.length-R.filter(z => z[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
