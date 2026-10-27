/* 3.387 (anh 27/10 "mẫu biểu tập trung"): KHUÔN IN CHUNG cho báo cáo tab Số liệu (Tổ · Sao kê · Tổng hợp) — 1 chỗ cho đầu trang:
   logo (NHCSXH có sẵn hoặc logo anh nạp ở ⚙ Khai báo) · tên đơn vị (BC_DV) · ngày số liệu · tiêu đề · phạm vi. Đổi logo / chữ đầu trang ở đây là mọi báo cáo theo.
   Báo cáo chỉ đưa dữ liệu (bảng); CSS in dùng chung TO_IN_CSS / bcCSS (js/22h), co trang skInTu. KTGS (Mẫu 06/16/04) và Hồ sơ vay giữ khuôn riêng (mẫu nhà nước, khóa t179). ES5. */
function bcLogo(){ var src = typeof hsoLogoSrc==='function' ? hsoLogoSrc() : ''; return src ? '<img src="'+src+'" alt="" style="height:10mm;vertical-align:middle;margin-right:2mm">' : ''; }
function bcDauTrang(ngay, tieuDeHTML, pvHTML){
  return '<div class="bc-dau"><div>'+bcLogo()+'<b>'+coChuHTML(BC_DV)+'</b></div><div class="bc-ngay">'+coChuHTML(ngay)+'</div></div>'+
    '<h1>'+tieuDeHTML+'</h1><div class="bc-to">'+pvHTML+'</div>';
}
