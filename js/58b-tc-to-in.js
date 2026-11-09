/* ===== js/58b-tc-to-in.js — 3.505 (anh 09/11/2026 "cần xuất nhanh ds tổ có xã, điểm theo ds lọc khi cần, A4 dọc, các cột cơ bản"): IN DANH SÁCH TỔ =====
   Ở Tra cứu KH › danh sách tổ: nút 🖨 In DS tổ → bản in A4 dọc theo ĐÚNG danh sách đang hiện (cây lọc địa bàn + ô tìm + lọc / sắp từng cột),
   nhóm theo Xã → Điểm GD (anh chọn), cột STT · Tổ trưởng · Mã tổ · Ấp · Hội · TV · Có DN, cộng từng điểm + tổng. Xuất: In / PDF (bộ nút chuẩn).
   Số TV / có dư nợ = KHO.tvChuan (QT-18, như bảng trên màn). Khung mẫu in chung MAU_IN (js/31b). Gói 1 không gian tên TCIN (QUY_CHUAN mục 13).
   Cắm rút: bỏ dòng <script> → mất nút, Tra cứu không đổi (js/58 kiểm typeof TCIN). ===== */
var TCIN = {
  /* tổ đang hiện trên bảng (giữ thứ tự sắp của bảng; dòng bị lọc cột ẩn thì bỏ) */
  dsHien: function(){ var b = document.querySelector('.tc-to-ds'); if(!b) return [];
    return [].filter.call(b.querySelectorAll('tbody tr[data-to]'), function(r){ return !r.hidden; }).map(function(r){ return tcTo(r.getAttribute('data-to')); }).filter(Boolean); },
  /* NGHIỆP VỤ thuần: tổ → nhóm Xã → Điểm GD, mỗi dòng {ten, ma, ap, hoi, tv, no}; cộng điểm, tổng */
  dl: function(ds, K){
    var nhom = [], theo = {}, tong = {to:0, tv:0, no:0};
    ds.forEach(function(t){ var r = KHO.tvChuan(t, K) || {tong:0, coNo:0}, khoa = (t.tenXa || '')+'|'+(t.diem || t.tenDiem || '');
      var g = theo[khoa]; if(!g){ g = theo[khoa] = {xa:String(t.tenXa || '').trim(), diem:String(t.tenDiem || '').trim(), ngay:t.ngayGD || '', dong:[], tv:0, no:0}; nhom.push(g); }
      var d = {ten:t.ten || '', ma:t.ma, ap:String(t.tenThon || '').trim(), hoi:tdnHoi(t.dv), tv:r.tong || 0, no:r.coNo || 0};
      g.dong.push(d); g.tv += d.tv; g.no += d.no; tong.to++; tong.tv += d.tv; tong.no += d.no; });
    return {nhom:nhom, tong:tong};
  },
  /* bản in */
  html: function(g){ var e = coChuHTML, stt = 0;
    var dau = '<tr><td class="c b">STT</td><td class="c b">Tổ trưởng</td><td class="c b">Mã tổ</td><td class="c b">Ấp / Khu phố</td><td class="c b">Hội</td><td class="c b">TV</td><td class="c b">Có DN</td></tr>';
    var than = g.d.nhom.map(function(n){
      return '<tr class="tcin-nhom"><td colspan="7" class="b">'+e(n.xa || 'Chưa rõ xã')+' · Điểm GD '+e(n.diem || '(chưa rõ)')+(n.ngay ? ' · ngày '+e(n.ngay) : '')+' — '+n.dong.length+' tổ</td></tr>'+
        n.dong.map(function(d){ return '<tr><td class="c">'+(++stt)+'</td><td>'+e(d.ten)+'</td><td class="c">'+e(d.ma)+'</td><td>'+e(d.ap)+'</td><td class="tcin-hoi">'+e(d.hoi)+'</td><td class="r">'+d.tv+'</td><td class="r">'+d.no+'</td></tr>'; }).join('')+
        (g.d.nhom.length>1 ? '<tr class="tcin-cong"><td></td><td colspan="4" class="i">Cộng điểm '+e(n.diem || '')+': '+n.dong.length+' tổ</td><td class="r b">'+n.tv+'</td><td class="r b">'+n.no+'</td></tr>' : ''); }).join('');
    return '<p class="c b s14">DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN</p><p class="c i">'+e(g.pv)+' · số liệu '+e(g.ky)+'</p>'+
      hsoBang('luoi s11', [5, 28, 12, 17, 23, 7, 8], '<thead>'+dau+'</thead><tbody>'+than+'<tr class="tcin-tong"><td></td><td colspan="4" class="b">Tổng cộng: '+g.d.tong.to+' tổ</td><td class="r b">'+g.d.tong.tv+'</td><td class="r b">'+g.d.tong.no+'</td></tr></tbody>')+
      '<p class="i s10">TV: tổng số thành viên · Có DN: thành viên còn dư nợ (cách đếm như Tra cứu KH).</p>';
  },
  mo: function(){
    if(!TC_K) return bao('Chưa có số liệu Mẫu 31.', 3);
    var ds = TCIN.dsHien(); if(!ds.length) return bao('Danh sách tổ đang trống — chọn địa bàn / bỏ bớt lọc.', 3);
    var S = tcCH(), g = {d:TCIN.dl(ds, TC_K), pv:typeof tcToDauChu==='function' ? tcToDauChu(S) : pvChu(S, TC_K), ky:TC_K.ngay ? ngayVNsl(TC_K.ngay) : kyVN(TC_K.thang || '')};
    MAU_IN.hop({ma:'tcto', gts:[g], ten:xuatTen('DS to', g.d.tong.to+' to', TC_K.ngay), tit:'🖨 Danh sách tổ — '+g.d.tong.to+' tổ (theo danh sách đang lọc)'});
  }
};
MAU_IN.dangKy('tcto', {ma:'DS tổ', ten:'Danh sách tổ', mg:[15, 12, 15, 20], ngang:false, html:TCIN.html,
  css:'<style>.tcin-nhom td{background:none;border-top:1.2pt solid #000;padding-top:3pt}.tcin-cong td{border-bottom:1pt solid #000}.tcin-hoi{white-space:nowrap}.tcin-tong td{border-top:1.2pt solid #000}table.luoi thead{display:table-header-group}table.luoi tr{break-inside:avoid}</style>'});
GD.dangKy('tcin', {mo:function(){ TCIN.mo(); }});
