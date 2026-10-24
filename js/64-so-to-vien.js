/* ===== 3.357 (KE_HOACH_CHOT_SO — đợt C1): SỔ TỔ VIÊN / CHỐT SỔ 31/12 =====
   Anh 24/10: "theo em, tiếp tục Mẫu 01/TV — anh sẽ gửi mỗi tháng kèm Mẫu 31".
   - Sổ tổ viên của kỳ tháng đang xem ở tab Tổ TK&VV: mỗi tổ viên 1 dòng (còn nợ · còn lãi tồn · tất nợ còn TK 105 · cần cho ra khỏi tổ),
     lấy đúng danh sách tvChuan (Mẫu 31 + bù theo Mẫu 01/TV cùng tháng — 3.347). Kỳ tháng 12 → "SỔ TỔ VIÊN — CHỐT 31/12/<năm>".
   - Không lưu bản sao riêng: Mẫu 31 + 01/TV tháng 12 vốn lưu vĩnh viễn (máy + Drive) → sổ dựng lại đúng bất cứ lúc nào;
     xóa ô / cả tháng 12 của Mẫu 31 hoặc 01/TV → app hỏi trước (slSoChot). Năm sau dùng sổ chốt: đợt C2.
   - Khai bằng DANG_KY (js/62) → khuôn in chuẩn, nhóm Từng tổ / Điểm › Hội › Tổ, Excel, Word, 📜 nhật ký.
   3.358 (đợt C2) — NĂM SAU DÙNG SỔ CHỐT: khách TƯ còn giữ (01/TV) mà Mẫu 31 năm nay không còn → tra sổ chốt tháng 12 năm trước
   (STV_CHOT[năm] = {mã KH: {to, ten, tat, ct, t105}} — dựng 1 lần từ bộ số liệu tháng 12, chỉ khi cần) → ghi "Tất nợ <năm> (ngày) · CT …";
   đối chiếu 01/TV xếp vào lý do đã biết "tất nợ năm trước". ES5. */
var STV_CHOT = {}, STV_DANG = {};
function stvNamTruoc(ky){ var y = parseInt(String(ky||'').slice(0, 4), 10); return y ? y-1 : 0; }
function stvCoSo(nam){ return !!(nam && KHO.bang('hstd', nam+'-12')); }   /* có Mẫu 31 tháng 12 năm đó */
function stvChotNap(nam){   /* → Promise({kh: …} | null) — dựng sổ chốt 31/12/<nam> từ bộ số liệu tháng 12 */
  if(STV_CHOT[nam]!==undefined) return Promise.resolve(STV_CHOT[nam]);
  if(!stvCoSo(nam)){ STV_CHOT[nam] = null; return Promise.resolve(null); }
  if(STV_DANG[nam]) return STV_DANG[nam];
  return STV_DANG[nam] = KHO.nap(nam+'-12').then(function(K){
    var m = {};
    KHO.dsToKy(K).forEach(function(t){ var r = tvChuan(t, K); if(!r) return;
      r.ds.forEach(function(x){ if((x.dn||0)>0) return; var mo = stvMon(K, x.kh); m[x.kh] = {to:t.ma, ten:x.ten, tat:mo.tat, ct:mo.ct, t105:x.t105||0, lai:x.loai==='lai'}; }); });
    STV_CHOT[nam] = m; delete STV_DANG[nam]; return m;
  }).catch(function(){ STV_CHOT[nam] = null; delete STV_DANG[nam]; return null; });
}
function stvChotCua(kh, ky){ var m = STV_CHOT[stvNamTruoc(ky)]; return m && kh ? m[kh] || null : null; }
/* gọi khi có khách TƯ còn giữ mà Mẫu 31 không còn: chưa có sổ năm trước → nạp ngầm, xong bỏ kết quả đối chiếu đã tính + vẽ lại tab Số liệu */
function stvHen(K){ var nam = stvNamTruoc(K && K.ky); if(!nam || STV_CHOT[nam]!==undefined || STV_DANG[nam] || !stvCoSo(nam)) return;
  stvChotNap(nam).then(function(m){ if(!m) return; Object.keys(TO_KS).forEach(function(k){ var x = TO_KS[k]; if(x && x.B) delete x.B._tv; });
    if(typeof nganHienTai!=='undefined' && nganHienTai===7 && typeof veSoLieu==='function') veSoLieu(); }); }
function stvChotChu(c, ky){ return c ? 'Tất nợ '+stvNamTruoc(ky)+(c.tat ? ' ('+ngayVNsl(c.tat)+')' : '')+(c.ct ? ' · '+c.ct : '') : ''; }
var STV_TT = {no:'Còn nợ', lai:'Còn lãi tồn', '105':'Tất nợ · còn TK 105', ra:'Cần cho ra khỏi tổ'};
function slSoChot(loai, ky){ return (loai==='hstd' || loai==='tv01') && /^\d{4}-12$/.test(String(ky||'')); }   /* ô thuộc sổ chốt cuối năm */
function stvMon(K, kh){   /* CT các món + ngày tất nợ (≈ ngày GD gần nhất của món đã tất toán) */
  var ds = KHO.monKy(K, kh).filter(function(o){ return o.ku; }), ct = {}, tat = '', con = false;
  ds.forEach(function(o){ ct[ctNgan(o.ct, o)] = 1; if((o.dn||0)>0) con = true; else if(o.ngdg && String(o.ngdg)>tat) tat = String(o.ngdg).slice(0, 10); });
  return {ct:Object.keys(ct).join(', '), tat:con ? '' : tat};
}
DANG_KY({ma:'sotv', o:'to', loai:'ds', ten:'Sổ tổ viên', nhom:true, nhomMd:'to', mo:'Mỗi tổ viên 1 dòng theo Mẫu 31 + Mẫu 01/TV cùng tháng — kỳ tháng 12 là sổ chốt 31/12',
  chon:[{k:'gom', ten:'Gồm', kieu:'tich', ds:[['no', 'Còn nợ'], ['lai', 'Còn lãi tồn'], ['105', 'Tất nợ · còn TK 105'], ['ra', 'Cần cho ra khỏi tổ']], md:['no', 'lai', '105', 'ra']}],
  du:function(ctx){
    var K = ctx.K, gom = ctx.chon.gom || [], dong = [], tw = '', bs = 0, ngay = String(K.ky).length===7;
    KHO.dsToKy(K).filter(function(t){ return pvLoc(ctx.S, t); }).forEach(function(t){
      var r = tvChuan(t, K); if(!r) return;
      if(r.kyTW) tw = r.kyTW; bs += r.bs;
      r.ds.forEach(function(x){ if(gom.indexOf(x.loai)<0) return; var m = stvMon(K, x.kh);
        var c = x.chot;   /* 3.358: khách tất nợ năm trước — lấy ngày tất nợ + CT từ sổ chốt 31/12 */
        dong.push({kh:x.kh, ten:x.ten, tt:c && x.loai!=='ra' ? 'Tất nợ '+stvNamTruoc(K.ky)+' · còn TK 105' : STV_TT[x.loai] || '', dn:x.dn||0, lt:x.lt||0, t105:x.t105||0,
          tat:c ? (c.tat ? ngayVNsl(c.tat) : '') : (m.tat ? ngayVNsl(m.tat) : ''), ct:c ? c.ct : m.ct, nguon:x.nguon==='tv01' ? (c ? '01/TV · sổ '+stvNamTruoc(K.ky) : '01/TV') : 'Mẫu 31',
          _dv:dkDV(K, t.ma), _lop:x.loai==='ra' ? 'nb' : ''}); });
    });
    dong.sort(function(a, b){ var x = a._dv, y = b._dv; return (x.xa+x.diem+x.hoi+x.to).localeCompare(y.xa+y.diem+y.hoi+y.to) || String(a.kh).localeCompare(String(b.kh)); });
    var chot = ngay && /-12$/.test(K.ky);
    return {tieuDe:chot ? 'Sổ tổ viên Tổ TK&VV — chốt 31/12/'+String(K.ky).slice(0, 4) : 'Danh sách tổ viên Tổ TK&VV',
      cot:[{k:'stt', ten:'STT'}, {k:'kh', ten:'Mã KH'}, {k:'ten', ten:'Họ tên', rong:24}, {k:'tt', ten:'Trạng thái'}, {k:'dn', ten:'Dư nợ', tien:true}, {k:'lt', ten:'Lãi tồn', tien:true},
        {k:'t105', ten:'Số dư TK 105', tien:true}, {k:'tat', ten:'Ngày tất nợ'}, {k:'ct', ten:'CT', xd:1}, {k:'nguon', ten:'Nguồn', nho:1}],
      dong:dong,
      ghi:(!ngay ? 'Kỳ theo ngày: tổ viên suy từ Mẫu 31 + TK 105 (không bù Mẫu 01/TV — 01/TV là số cuối tháng). ' :
        tw ? 'Đã đối chiếu Mẫu 01/TV '+slKyChu(tw)+': bù '+bs+' khách chỉ có ở 01/TV (nguồn "01/TV"). ' : '⚠ Chưa có Mẫu 01/TV cùng tháng — tổ viên suy từ Mẫu 31 + TK 105, khách tất nợ năm trước có thể thiếu. ')+
        'Ngày tất nợ ≈ ngày giao dịch gần nhất của món đã tất toán (Mẫu 31). Dòng tô vàng = cần cho ra khỏi tổ.'};
  }});
