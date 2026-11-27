/* ===== js/58b-tc-to-in.js — 3.505 (anh 09/11/2026 "cần xuất nhanh ds tổ có xã, điểm theo ds lọc khi cần, A4 dọc, các cột cơ bản"): IN DANH SÁCH TỔ =====
   Ở Tra cứu KH › danh sách tổ: nút 🖨 In DS tổ → bản in A4 dọc theo ĐÚNG danh sách đang hiện (cây lọc địa bàn + ô tìm + lọc / sắp từng cột),
   nhóm theo Xã → Điểm GD (anh chọn), cột STT · Tổ trưởng · Mã tổ · Ấp · Hội · TV · Có DN, cộng từng điểm + tổng. 3.569: nhóm thêm Hội (bỏ cột Hội), STT theo Hội, + SĐT tổ trưởng, Tổ phó, cộng điểm / xã chia theo Hội; bỏ cột 10C. Xuất: In / PDF (bộ nút chuẩn).
   Số TV / có dư nợ = KHO.tvChuan (QT-18, như bảng trên màn). Khung mẫu in chung MAU_IN (js/31b). Gói 1 không gian tên TCIN (QUY_CHUAN mục 13).
   Cắm rút: bỏ dòng <script> → mất nút, Tra cứu không đổi (js/58 kiểm typeof TCIN). ===== */
var TCIN = {
  /* tổ đang hiện trên bảng (giữ thứ tự sắp của bảng; dòng bị lọc cột ẩn thì bỏ) */
  dsHien: function(){ var b = document.querySelector('.tc-to-ds'); if(!b) return [];
    return [].filter.call(b.querySelectorAll('tbody tr[data-to]'), function(r){ return !r.hidden; }).map(function(r){ return tcTo(r.getAttribute('data-to')); }).filter(Boolean); },
  /* NGHIỆP VỤ thuần (3.569 — anh 27/11 "bỏ cột Hội, nhóm theo dòng, có số thứ tự nhìn là biết Hội bao nhiêu tổ, xã điểm bao nhiêu tổ, thêm tên tổ phó, số ĐT tổ trưởng"
     · chọn "STT theo Hội nhưng có tổng của điểm và xã" · "bỏ cột 10C"): tổ → Xã → Điểm GD → Hội (HND · HPN · HCCB · ĐTN), dòng {ten, sdt, pho, ma, ap, tv, no};
     cộng Hội / điểm / xã / tổng, mỗi mức đếm số tổ từng Hội. Trong Hội giữ thứ tự đang sắp của bảng. */
  HOI: ['11', '12', '13', '14'], NGAN: {'11':'HND', '12':'HPN', '13':'HCCB', '14':'ĐTN'},
  dl: function(ds, K){
    var cong = function(){ return {to:0, tv:0, no:0, hoi:{}}; }, them = function(c, d, dv){ c.to++; c.tv += d.tv; c.no += d.no; c.hoi[dv] = (c.hoi[dv]||0)+1; };
    var xa = [], theoXa = {}, tong = cong();
    ds.forEach(function(t){ var r = KHO.tvChuan(t, K) || {tong:0, coNo:0}, dv = String(t.dv || ''), kx = String(t.tenXa || ''), kd = String(t.diem || t.tenDiem || '');
      var X = theoXa[kx]; if(!X){ X = theoXa[kx] = {xa:String(t.tenXa || '').trim(), diem:[], theo:{}, c:cong()}; xa.push(X); }
      var Dm = X.theo[kd]; if(!Dm){ Dm = X.theo[kd] = {diem:String(t.tenDiem || '').trim(), ngay:t.ngayGD || '', hoi:{}, c:cong()}; X.diem.push(Dm); }
      var H = Dm.hoi[dv] = Dm.hoi[dv] || {dv:dv, ten:tdnHoi(dv) || (dv ? 'Hội '+dv : '(chưa rõ Hội)'), dong:[], c:cong()};
      var d = {ten:t.ten || '', sdt:String(t.sdt || '').trim(), pho:String(t.pho || '').trim(), ma:t.ma, ap:String(t.tenThon || '').trim(), tv:r.tong || 0, no:r.coNo || 0};
      H.dong.push(d); [H.c, Dm.c, X.c, tong].forEach(function(c){ them(c, d, dv); }); });
    var thu = function(dv){ var i = TCIN.HOI.indexOf(dv); return i<0 ? 99 : i; };
    xa.forEach(function(X){ X.diem.forEach(function(Dm){ Dm.dsHoi = Object.keys(Dm.hoi).map(function(k){ return Dm.hoi[k]; }).sort(function(a, b){ return thu(a.dv)-thu(b.dv); }); }); });
    return {xa:xa, tong:tong};
  },
  chiaHoi: function(c){ var k = Object.keys(c.hoi).sort(function(a, b){ var x = TCIN.HOI.indexOf(a), y = TCIN.HOI.indexOf(b); return (x<0 ? 99 : x)-(y<0 ? 99 : y); });
    return k.map(function(dv){ return (TCIN.NGAN[dv] || tdnHoi(dv) || 'Khác')+' '+c.hoi[dv]; }).join(' · '); },
  /* bản in A4 dọc: STT theo Hội; dòng nhóm Xã / Điểm / Hội ghi số tổ; Cộng điểm / Cộng xã / Tổng cộng chia số tổ theo Hội */
  html: function(g){ var e = coChuHTML, N = 8, d = g.d, nhieuXa = d.xa.length>1, nhieuDiem = function(X){ return X.diem.length>1; };
    var dau = '<tr><td class="c b">STT</td><td class="c b">Tổ trưởng</td><td class="c b">SĐT tổ trưởng</td><td class="c b">Tổ phó</td><td class="c b">Mã tổ</td><td class="c b">Ấp / Khu phố</td><td class="c b">TV</td><td class="c b">Có DN</td></tr>';
    var cong = function(lop, nhan, c){ return '<tr class="'+lop+'"><td></td><td colspan="5" class="'+(lop==='tcin-tong' ? 'b' : 'i')+'">'+nhan+': '+c.to+' tổ ('+TCIN.chiaHoi(c)+')</td><td class="r b">'+c.tv+'</td><td class="r b">'+c.no+'</td></tr>'; };
    var than = d.xa.map(function(X){
      var h = (nhieuXa || nhieuDiem(X)) ? '<tr class="tcin-xa"><td colspan="'+N+'" class="b">'+e((X.xa || 'Chưa rõ xã').toUpperCase())+' — '+X.c.to+' tổ</td></tr>' : '';
      h += X.diem.map(function(Dm){
        return '<tr class="tcin-nhom"><td colspan="'+N+'" class="b">'+e(X.xa || 'Chưa rõ xã')+' · Điểm GD '+e(Dm.diem || '(chưa rõ)')+(Dm.ngay ? ' · ngày '+e(Dm.ngay) : '')+' — '+Dm.c.to+' tổ</td></tr>'+
          Dm.dsHoi.map(function(H){ var stt = 0;
            return '<tr class="tcin-hoi"><td colspan="'+N+'" class="b i">'+e(H.ten)+' — '+H.c.to+' tổ</td></tr>'+
              H.dong.map(function(r){ return '<tr><td class="c">'+(++stt)+'</td><td>'+e(r.ten)+'</td><td class="c">'+e(r.sdt)+'</td><td>'+e(r.pho)+'</td><td class="c">'+e(r.ma)+'</td><td>'+e(r.ap)+'</td><td class="r">'+r.tv+'</td><td class="r">'+r.no+'</td></tr>'; }).join(''); }).join('')+
          cong('tcin-cong', 'Cộng điểm '+e(Dm.diem || ''), Dm.c); }).join('');
      return h+(nhieuDiem(X) ? cong('tcin-cong tcin-congxa', 'Cộng xã '+e(X.xa || ''), X.c) : ''); }).join('');
    return '<p class="c b s14">DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN</p><p class="c i">'+e(g.pv)+' · số liệu '+e(g.ky)+'</p>'+
      hsoBang('luoi s10', [5, 22, 13, 20, 10, 16, 6, 8], '<thead>'+dau+'</thead><tbody>'+than+(nhieuXa ? cong('tcin-tong', 'TỔNG CỘNG', d.tong) : '')+'</tbody>')+
      '<p class="i s10">STT đánh theo từng Hội (số cuối = số tổ của Hội) · TV: tổng số thành viên · Có DN: thành viên còn dư nợ (cách đếm như Tra cứu KH) · SĐT, tổ phó theo Danh sách tổ / Mẫu 31 (trống = chưa có).</p>';
  },
  mo: function(){
    if(!TC_K) return bao('Chưa có số liệu Mẫu 31.', 3);
    var ds = TCIN.dsHien(); if(!ds.length) return bao('Danh sách tổ đang trống — chọn địa bàn / bỏ bớt lọc.', 3);
    var S = tcCH(), g = {d:TCIN.dl(ds, TC_K), pv:typeof tcToDauChu==='function' ? tcToDauChu(S) : pvChu(S, TC_K), ky:TC_K.ngay ? ngayVNsl(TC_K.ngay) : kyVN(TC_K.thang || '')};
    MAU_IN.hop({ma:'tcto', gts:[g], ten:xuatTen('DS to', g.d.tong.to+' to', TC_K.ngay), tit:'🖨 Danh sách tổ — '+g.d.tong.to+' tổ (theo danh sách đang lọc)'});
  }
};
MAU_IN.dangKy('tcto', {ma:'DS tổ', ten:'Danh sách tổ', mg:[15, 12, 15, 20], ngang:false, html:TCIN.html,
  
  css:'<style>.tcin-nhom td{background:none;border-top:1.2pt solid #000;padding-top:3pt}.tcin-cong td{border-bottom:1pt solid #000}'+
    '.tcin-hoi td{padding-left:8pt;border-top:.6pt solid #000}.tcin-xa td{border-top:1.5pt solid #000;padding-top:4pt}.tcin-congxa td{font-weight:bold}.tcin-tong td{border-top:1.2pt solid #000}table.luoi thead{display:table-header-group}table.luoi tr{break-inside:avoid}</style>'});
GD.dangKy('tcin', {mo:function(){ TCIN.mo(); }});
