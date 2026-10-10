/* 3.135 — anh Nhân: mọi ô chọn ngày ghi rõ kiểu ngày/tháng/năm (trình duyệt tiếng Anh hiện tháng/ngày → dễ nhầm, gán sai kỳ) */
function ngayGY(iso){ return iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso.slice(8,10)+'/'+iso.slice(5,7)+'/'+iso.slice(0,4) : ''; }
function ngayGYCapNhat(i){
  var g = i._gy; if(!g) return;
  var la = i.type==='date', h = la ? (i.value ? '= <b>'+ngayGY(i.value)+'</b> (ngày/tháng/năm)' : 'ngày/tháng/năm') : '';
  if(g.innerHTML!==h) g.innerHTML = h;
  g.style.display = la ? '' : 'none';
}
function ngayGYQuet(){
  var ds = document.querySelectorAll('input[type=date]'), k;
  for(k=0;k<ds.length;k++){
    var i = ds[k];
    if(!i._gy || !i._gy.parentNode){
      var g = document.createElement('small'); g.className = 'ngay-gy';
      i.parentNode.insertBefore(g, i.nextSibling); i._gy = g;
    }
    ngayGYCapNhat(i);
  }
  ds = document.querySelectorAll('small.ngay-gy');   /* ô đổi sang kiểu tháng thì ẩn dòng gợi ý */
  for(k=0;k<ds.length;k++){ var t = ds[k].previousSibling; if(t && t._gy===ds[k]) ngayGYCapNhat(t); }
}
(function(){
  var hen = 0;
  function henQuet(){ if(hen) return; hen = setTimeout(function(){ hen = 0; ngayGYQuet(); }, 30); }
  function suKien(e){ var i = e.target; if(i && i._gy) ngayGYCapNhat(i); }
  function chay(){
    document.addEventListener('input', suKien, true); document.addEventListener('change', suKien, true);
    ngayGYQuet();
    if(typeof MutationObserver!=='undefined')
      new MutationObserver(henQuet).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['type']});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', chay); else chay();
})();
/* 3.136 (anh chốt): mở app là dựng sẵn số liệu (tháng + ngày mới nhất) chạy ngầm — vào tab nào cũng dùng ngay */
setTimeout(function(){
  if(slNapSan.da) return;
  (SL_SAN ? Promise.resolve() : slNap()).then(function(){ if(slNapSan.da || !Object.keys(SLM.bang||{}).length) return; slNapSan.da = 1; slNapSan(); }).catch(function(){});
}, 6000);
