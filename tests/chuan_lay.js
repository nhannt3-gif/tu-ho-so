// 3.223 M0 (anh chốt 16/10): LẤY BẢN IN CHUẨN của MỌI mẫu đang chạy — dùng chung cho tests/chuan_tao.js (ghi chuẩn) và t179 (so từng ký tự).
//   Dữ liệu GIẢ (tests/gianho31). Chuẩn hóa: ngày hôm nay, mã hộ ngẫu nhiên, số bản app → không lệch theo ngày chạy.
//   Mỗi mục: tên = '<nhóm>_<mẫu>_<trạng thái>' · trạng thái: trang (mẫu trắng) · so (có số liệu giả) · gm (📝 bản ghi mẫu).
const fs = require('fs'), path = require('path');
module.exports = async function(p){
  const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
  const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const w = t=>new Promise(r=>setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
    window.nay = ()=>new Date(2026, 9, 17, 9, 0, 0);   /* 3.339: "hôm nay" cố định = ngày ghi chuẩn (17/10/2026) — GDX chọn điểm có ngày GD gần nhất theo hôm nay → chạy ngày khác lệch nhầm (t179 trượt từ 24/10) */
    for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
    const out = {}, loi = [];
    const lay = (ten, f) => { try { const x = f(); out[ten] = typeof x==='string' ? x : (x.h || (x.ds||[]).map(y=>y.h).join('\n<!--trang-->\n')); } catch(e){ out[ten] = 'LỖI '+e.message; loi.push(ten); } };
    kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete D.cauHinh.gdx; D.cauHinh.hsoO = {}; D.cauHinh.hsoKB = {};
    /* ---- Giao dịch xã (mẫu khóa) ---- */
    slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(400);
    const T = TO_K.to, dsTo = Object.keys(T).filter(m=>!T[m].trucTiep && !toLaTT(T[m]));
    for(const mm of ['m04', 'm12', 'bk']){ gdxDoiMau(mm); await w(300); lay('gdx_'+mm, ()=>{ const B = gdxDung(gdxChup()); return gdxTrang(B.than, B.css); }); }
    gdxDoiMau('gl'); await w(200); pvChonTo('gdx', dsTo[0]); await w(200); gdxDat('glLoai', '104', 1); await w(200);
    lay('gdx_gl_104', ()=>{ const B = gdxDung(gdxChup()); return gdxTrang(B.than, B.css); });
    gdxDat('glLoai', '105', 1); await w(200); const k5 = gdxGLDsKhach(T[dsTo[0]])[0]; if(k5){ gdxGLChonKH(k5.kh); await w(100); }
    lay('gdx_gl_105', ()=>{ const B = gdxDung(gdxChup()); return gdxTrang(B.than, B.css); });
    /* ---- Hồ sơ Tổ ---- */
    slDoiTab('hst'); doiNgan(7); await w(1500); const C2 = hsoCH(); C2.xa=''; C2.diem=''; C2.to='';
    for(const M of HSO_MAU.hst){ hsoChonMau(M.k); await w(250); lay('hst_'+M.k+'_trang', ()=>hsoLap()); }
    const h2 = C2.hoi; pvChon('hst', 'xa', pvLuaChon(TO_K.to, C2, 'xa', true)[0].k); if(h2) pvChon('hst', 'hoi', h2); await w(300);   /* 3.383.7: đổi Xã nay bỏ Hội → chọn lại Hội cũ cho giữ đúng kịch bản chuẩn */ pvChon('hst', 'to', pvLuaChon(TO_K.to, C2, 'to', true)[0].k); await w(1500);
    for(const M of HSO_MAU.hst){ hsoChonMau(M.k); await w(400); lay('hst_'+M.k+'_so', ()=>hsoLap()); }
    /* ---- Hồ sơ vay ---- */
    slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); C.xa=''; C.diem=''; C.to='';
    const VAY = ['01uq', '01td', '01gqvl', '03td', '07b', '01tgtv', '09a', '01tdck'];
    for(const m of VAY){ hsoChonMau(m); await w(250); lay('hsv_'+m+'_trang', ()=>hsoLap()); }
    const h1 = C.hoi; pvChon('hsv', 'xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); if(h1) pvChon('hsv', 'hoi', h1); await w(300); pvChon('hsv', 'to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
    const tv = hsoTVTo(TO_K.to[C.to]), ho = hmTuM31(tv[0].kh); ho.tv.push({ten:'Con Giả', ns:'2004-05-06', cccd:'072204000001', ncap:'2021-03-04', qh:'Con'});
    const hoG = hmTuM31(tv[1].kh);
    for(const m of ['01uq', '01td', '01tgtv']){ hmLamHS(ho.id, m); await w(250); const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Con Giả', soThang:'12'}); B.tien = '40000000'; B.th = '60'; hsoBoLuu(); hsoVe(); await w(250); lay('hsv_'+m+'_so', ()=>hsoLap()); }
    hmLamHS(hoG.id, '01gqvl'); await w(250); const BG = hsoBo(); BG.ct = 'GQVL'; BG.tien = '50000000'; BG.th = '36'; BG.pa = BG.pa || {}; BG.pa.k = 1; hsoBoLuu();   /* 3.310: hệ số phương án cố định — bản chuẩn không đổi theo số ngẫu nhiên */ hsoVe(); await w(250);
    for(const m of ['01gqvl', '07b']){ hsoChonMau(m); await w(300); lay('hsv_'+m+'_so', ()=>hsoLap()); }
    hmLamHS(ho.id, '03td'); await w(300); lay('hsv_03td_so', ()=>hsoLap());
    hsoChonMau('09a'); await w(250); const tv9 = tv.find(k=>k.mon.some(m=>(m.dn||0)>0)) || tv[0]; HSO.vay.kh = tv9.kh; hsoLuu().kemTDCK = 0; hsoVe(); await w(300); lay('hsv_09a_so', ()=>hsoLap());
    hsoChonMau('01tdck'); await w(250); HSO.vay.kh = tv9.kh; hsoVe(); await w(300); lay('hsv_01tdck_so', ()=>hsoLap());
    /* 📝 bản ghi mẫu */
    HSO_GM = true; OM_KIEU = 'mau'; for(const m of ['01td', '01tgtv']){ hmLamHS(ho.id, m); await w(300); lay('hsv_'+m+'_gm', ()=>hsoLap()); } HSO_GM = false; OM_KIEU = 'that';   /* 3.223: mẫu trên nền ô → 📝 Bản mẫu (điền hết) */
    /* ---- KTGS (mẫu khóa) ---- */
    const K = ktCH(); K.ky='2026-08'; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
    const dsK = Object.values(KT_K.to).filter(t=>!toLaTT(t)); let best = dsK[0]; dsK.forEach(t=>{ if(toKhach(t).length>toKhach(best).length) best = t; });
    ktChonTo(best.ma); await w(300); KT_CHON.chon = {}; KT_CHON.ds.filter(h=>!h.loai).slice(0, 3).forEach(h=>{ KT_CHON.chon[h.kh] = {ly:'thử', bb:false}; });
    let g06 = null; lay('kt_06', ()=>{ g06 = ktGiaTri06(best, ktDaChon(), {dv:'Hội Giả', ngay:'2026-10-03', md:'nganh'}); return ktHTML06(g06); });
    lay('kt_16', ()=>ktHTML16(ktGiaTri16(best, [], {nx:'so'})));
    lay('kt_04', ()=>ktHTML04([ktBC04([{t:best}])[0]]));
    return {out, loi};
  }, files);
  const hom = new Date(2026, 9, 17), dd = String(hom.getDate()).padStart(2, '0'), mm = String(hom.getMonth()+1).padStart(2, '0'), yy = hom.getFullYear();
  const chuan = s => String(s).split(dd+'/'+mm+'/'+yy).join('{NGAY}').split(yy+'-'+mm+'-'+dd).join('{NGAY}')
    .replace(new RegExp('ngày ([^0-9]{0,40})'+dd+'([^0-9]{1,40})tháng([^0-9]{1,40})'+mm+'([^0-9]{1,40})năm([^0-9]{1,40})'+yy, 'gi'), 'ngày $1{D}$2tháng$3{M}$4năm$5{Y}')
    .replace(/\bhm[a-z0-9]{8,}\b/g, '{HO}').replace(/\?v=[0-9.]+/g, '?v={BAN}');
  const o = {}; Object.keys(R.out).sort().forEach(k=>{ o[k] = chuan(R.out[k]); });
  return {out:o, loi:R.loi, chuan:chuan};   /* 3.320: t179 chuẩn hóa cả bản chuẩn — ngày giả trong số liệu trùng ngày chạy (vd 23/10/2026) không báo lệch nhầm */
};
