// 3.384 (anh 27/10 "kiểm tra xóa các phép thử / hàm không còn dùng"): thXem — lập MỌI báo cáo Tổng hợp đang tích vào 1 hộp xem — app không còn gọi
//   (giao diện dùng thXemNgay, xem từng báo cáo) → chuyển khỏi app sang đây, để t105 / t148 / t196 vẫn kiểm đủ các báo cáo Tổng hợp. Nguyên văn hàm cũ (js/22i).
module.exports = async function(p){ await p.addInitScript(()=>{
  window.thXem = function(){
    var C = thCH(); if(!TH_K) return;
    var ds = TH_BC.filter(function(b){ return C.bc[b.k]; }); if(!ds.length) return bao('Tích ít nhất 1 báo cáo.', 3);
    var pv = pvChu(C, TH_K.K)+(C.ct ? ' · CT '+ctNgan(C.ct) : '')+(C.nguon ? ' · nguồn '+(SL_NGUON[C.nguon]||C.nguon) : '');
    try{ TH_XEM = ds.map(function(b){ CT_DUNG = {}; var x = thBaoCao(b.k); x.pv = pv; x.ctChu = ctChuThich(); CT_DUNG = null; return x; }); }
    catch(er){ CT_DUNG = null; return baoLoi('Lập báo cáo lỗi: '+(er && er.message || er)); }
    moHop('<div class="hop-tit">👁 Xem tổng hợp — '+coChuHTML(pv)+'</div><iframe id="th-khung" class="to-khung" title="Xem trước"></iframe>'+
      xuatHang({ten:xuatTen(TH_XEM.length>1 ? 'Tong hop' : TH_XEM[0].ten, pv, TH_K.ky), html:function(){ return thHTMLIn(TH_XEM); }, excel:'thExcel()'}), true);   /* 3.152 */
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
    var f = document.getElementById('th-khung'); xemChuan(f, thHTMLIn(TH_XEM));
  };
}); };
