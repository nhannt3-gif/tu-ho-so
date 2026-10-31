// 3.407 (Tèo bước B4 — TK 1 30/10 "TK 2: phép thử JS đọc cùng file"): PHÉP THỬ CHUNG tests/teo/teo_ca.json — mỗi trường hợp 1 trang sạch:
//   dựng Mẫu 31 (cột hệ thống, ô không ghi lấy mac_dinh_mau31) + File Tổ trưởng (baocao_…, cùng ngày trừ ngay_to_truong) → nạp qua slDocFile / slGhi → KHO (toNap) →
//   so đáp án: dong (file đối chiếu DOI_CHIEU_APP, slDCTeoTinh) · ngay_qh (skCQH) · lech_ap / ap_nhieu_diem (K.qtc) · khong_ghep_to_truong · ham (so_thang_lai, xep_loai).
//   KHÔNG sửa đáp án (đổi đáp án = đổi luật → anh chốt). App ra khác → ghi hộp thư TEO_PHOI_HOP mục 14. Chạy: node tests/t328.js [mã trường hợp,…]
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
const BO = JSON.parse(fs.readFileSync(path.join(__dirname,'teo','teo_ca.json'),'utf8'));
const CHON = (process.argv[2]||'').split(',').filter(Boolean);
/* lệch ĐÃ BÁO, chờ chốt (không sửa đáp án) — in ⏳, không làm trượt; chốt xong thì xóa dòng + sửa app hoặc đáp án theo luật mới */
const CHO = {'C21-1 · bien_dong':'màn Biến động tổ đã gỡ ở 3.410 — anh 31/10 "màn biến động tổ sẽ bàn lại làm sau"', 'C09-1 · khong_ghep_to_truong':'anh 30/10 đổi lại: "lấy như cũ nhưng Mẫu 31 vẫn là chính" — app vẫn ghép File Tổ trưởng gần nhất, khác ngày chỉ bù chỗ trống + báo; TK 1 sửa đáp án C09-1 theo luật mới'};   /* 3.409: C01-1 xong (cộng sổ) */
(async()=>{ const b=await chromium.launch(); const kq=[]; let loiTrang=[];
 for(const ca of BO.truong_hop){ if(CHON.length && CHON.indexOf(ca.id)<0) continue;
  const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loiTrang.push(ca.id+': '+e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
  const r = await p.evaluate(async(x)=>{ const {ca, BO} = x; await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1; const ra = [];
    const vn = s => { const m = String(s||'').match(/^(\d\d)\/(\d\d)\/(\d{4})$/); return m ? m[3]+'-'+m[2]+'-'+m[1] : ''; };
    const nap = async(aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); const k = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!k.loi && k.ky) await slGhi(k); return k; };
    let K = null, k31 = null, kTT = null;
    /* app chỉ nhận mã đúng dạng hệ thống (số khế ước 10–20 số, mã KH 6–12 số — SL_KHOA_DUNG); mã giả "KU-01" / "KH-01" → ánh xạ cố định sang số, kết quả trả theo mã gốc */
    const MA = {ku:{}, kh:{}, so:{}}, DANG = {ku:[/^\d{10,20}$/, '9000000000', 5], kh:[/^\d{6,12}$/, '900000', 3], so:[/^\d{10}$/, '1050', 6]}, so = (loai, v) => { if(v==null || v==='') return v; const d = DANG[loai]; if(d[0].test(String(v))) return v; const m = MA[loai]; if(!m[v]) m[v] = d[1]+String(Object.keys(m).length+1).padStart(d[2], '0'); return m[v]; };   /* số sổ 105 giả "S-01a" → 10 số */
    const kuSo = v => MA.ku[v] || v, kuGoc = v => { const g = Object.keys(MA.ku).find(z=>MA.ku[z]===v); return g || v; };
    let Kp = null;
    if(ca.ky_truoc && ca.ky_truoc.mau31 && ca.ky_truoc.mau31.length){   /* 3.424 QT-C-21: Mẫu 31 kỳ so sánh (ngày ky_truoc.ngay) */
      const dp = ca.ky_truoc.mau31.map(o=>{ const z = Object.assign({}, BO.mac_dinh_mau31, o, {'Ngày số liệu':ca.ky_truoc.ngay}); z['Số khế ước'] = so('ku', z['Số khế ước']); z['Mã KH'] = so('kh', z['Mã KH']); z['Sổ tiết kiệm 105'] = so('so', z['Sổ tiết kiệm 105']); return z; });
      const cp = []; dp.forEach(o=>Object.keys(o).forEach(c=>{ if(cp.indexOf(c)<0) cp.push(c); }));
      await nap([['31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu'], [], cp].concat(dp.map(o=>cp.map(c=>o[c]===undefined ? '' : o[c]))), 'mau31 truoc.xlsx');
      SL_BO = {}; TO_KS = {}; Kp = await toNap(slThang(vn(ca.ky_truoc.ngay)));
    }
    if(ca.mau31 && ca.mau31.length){
      const dong = ca.mau31.map(o=>{ const z = Object.assign({}, BO.mac_dinh_mau31, o, {'Ngày số liệu':BO.ngay_so_lieu}); z['Số khế ước'] = so('ku', z['Số khế ước']); z['Mã KH'] = so('kh', z['Mã KH']); z['Sổ tiết kiệm 105'] = so('so', z['Sổ tiết kiệm 105']); return z; });
      const cot = []; dong.forEach(o=>Object.keys(o).forEach(c=>{ if(cot.indexOf(c)<0) cot.push(c); }));
      k31 = await nap([['31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu'], [], cot].concat(dong.map(o=>cot.map(c=>o[c]===undefined ? '' : o[c]))), 'mau31 thu.xlsx');
      if(ca.to_truong && ca.to_truong.length){
        const C = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
        const nTT = ca.ngay_to_truong || BO.ngay_so_lieu;
        kTT = await nap([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], C].concat(ca.to_truong.map(o=>{ const z = Object.assign({}, BO.mac_dinh_to_truong, o, {NGAYBC:nTT, TENXA:BO.mac_dinh_mau31['Tên xã']}); return C.map(c=>z[c]===undefined ? '' : z[c]); })), 'baocao_'+vn(nTT).replace(/-/g,'')+'_000000.xlsx');
      }
      SL_BO = {}; TO_KS = {}; K = await toNap(slThang(vn(BO.ngay_so_lieu)));
    }
    const COT = SL_DC_COT, dongDC = K ? slDCTeoTinh(K).dong : [];
    for(const e of ca.ket_qua){ let app, dung = false, nhan = e.loai+(e.cot ? ' '+e.khoa+'.'+e.cot : e.so_ku ? ' '+e.so_ku : e.ham ? ' '+e.ham+'('+JSON.stringify(e.vao)+')' : '');
      try {
        if(e.loai==='dong'){ const d = dongDC.find(z=>String(z[0])===String(e.khoa)); app = d ? d[COT.indexOf(e.cot)] : '(không có dòng)'; dung = String(app)===String(e.bang); }
        else if(e.loai==='ngay_qh'){ const o = K.hs.find(z=>z.ku===kuSo(e.so_ku)); app = o ? ngayVNsl(skCQH(o).d) : '(không có món)'; dung = app===e.bang; }
        else if(e.loai==='lech_ap'){ app = (K.qtc.lechAp||[]).map(z=>kuGoc(z[0])).join(','); dung = (K.qtc.lechAp||[]).some(z=>kuGoc(z[0])===e.so_ku); }
        else if(e.loai==='ap_nhieu_diem'){ app = (K.qtc.apNhieu||[]).map(z=>z[1]).join(','); dung = (K.qtc.apNhieu||[]).some(z=>String(z[1])===String(e.ma_ap)); }
        else if(e.loai==='khong_ghep_to_truong'){ const coDS = KHO.dsToKy(K).some(t=>t.ds); app = 'nguồn DS tổ '+(K.B && K.B.nguon.dsto || '—')+' · tổ có ghép DS: '+coDS; dung = !coDS; }
        else if(e.loai==='ham' && e.ham==='so_thang_lai'){ const v = e.vao, o = {dn:v['Tổng dư nợ'], ls:v['Lãi suất'], ltTH:v['Lãi tồn TH'], ltQH:v['Lãi tồn QH']}; app = Math.round(laiTon(o)/ktLaiThang(o)*100)/100; dung = Math.abs(app-e.bang)<0.005; }
        else if(e.loai==='ham' && e.ham==='xep_loai'){ app = ktXepLoai(e.vao); dung = app===e.bang; }
        else if((e.loai==='ky_truoc_to' || e.loai==='ky_truoc_diem') && Kp){ const R = toKyTruoc(K, Kp), x = e.loai==='ky_truoc_to' ? R.to[e.ma_to] : R.diem[e.ma_diem], f = {du_no:'dn', tien_gui:'t105'}[e.cot];
          app = x ? Math.round(x[f]||0) : 0; dung = app===e.bang; }   /* 3.424 QT-C-21 */
        else if(e.loai==='to_khong_hien' && K){ const t = K.to[e.ma_to]; app = t ? 'còn trên cây' : 'không hiện'; dung = !t; }   /* 3.424 QT-C-21: tổ đóng không còn trên cây (QUY_CHUAN mục 16) */
        else app = '(chưa hỗ trợ loại '+e.loai+')';
      } catch(er){ app = 'LỖI '+er.message; }
      ra.push({nhan, bang:e.bang, app, dung});
    }
    return {ra, loi31:k31 && k31.loi, loiTT:kTT && kTT.loi, loaiTT:kTT && kTT.loai+' '+kTT.ky};
  }, {ca, BO});
  r.ra.forEach(x=>kq.push({id:ca.id, luat:ca.luat, ...x}));
  if(r.loi31 || r.loiTT) kq.push({id:ca.id, luat:ca.luat, nhan:'nạp file', bang:'đọc được', app:(r.loi31||'')+' '+(r.loiTT||''), dung:false});
  await p.close();
 }
 kq.forEach(x=>{ const c = !x.dung && (CHO[x.id+' · '+x.nhan] || (/^\(chưa hỗ trợ loại /.test(String(x.app)) && 'luật mới chưa làm ở app (teo_ca 1.2: QT-C-21 kỳ trước theo khế ước) — việc tiếp, anh duyệt')); x.cho = !!c; console.log((x.dung ? '✓ ' : c ? '⏳ ' : '✗ ')+x.id+' '+x.luat+' · '+x.nhan+' — đáp án '+JSON.stringify(x.bang)+(x.dung ? '' : ' · app '+JSON.stringify(x.app))+(c ? ' · CHỜ CHỐT: '+c : '')); });
 if(loiTrang.length) console.log('LỖI TRANG:', loiTrang.slice(0,5));
 const sai = kq.filter(x=>!x.dung && !x.cho).length, cho = kq.filter(x=>x.cho).length; console.log((kq.length-sai-cho)+'/'+kq.length+' đạt'+(cho ? ' · '+cho+' chờ chốt' : ''));
 await b.close(); process.exit(sai||loiTrang.length ? 1 : 0);
})();
