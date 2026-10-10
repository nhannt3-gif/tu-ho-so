/* ===== 3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px =====
   - Chỉ đổi cách đi giữa các màn: mỗi mục gọi đúng lối cũ (doiNgan / moNapSL / slDoiTab / ccMo / moRac / moCaiDat…); nội dung từng màn giữ nguyên.
   - Thanh tab ngang + thanh tab con Số liệu chỉ ẩn bằng CSS khi có thanh bên → màn < 1100 px (điện thoại, máy bảng) vẫn dùng như cũ.
   - Thu gọn 60 px (chỉ biểu tượng): nút « / » — nhớ riêng từng máy (localStorage 'tb_gon': '1' thu / '0' mở); chưa chọn thì màn < 1280 px tự thu.
   - Tô mục đang mở: toNutSL() (gọi mỗi lần đổi tab / tab con) gọi dhTo(). */
var DH_MUC = [
  {k:'0',   bt:'🏠', ten:'Hôm nay',    mo:function(){ doiNgan(0); }},
  {k:'1',   bt:'📄', ten:'Văn bản',    mo:function(){ doiNgan(1); }, dem:function(){ return (D.cho||[]).filter(function(c){ return c.nhom!=='duLieu'; }).length; }, demTit:'file chờ duyệt'},
  {k:'nap', bt:'📥', ten:'Nạp & KT',   mo:function(){ moNapSL(); }, dem:dhThieuNap, do:true, demTit:'file bắt buộc còn thiếu (tháng mới nhất)'},
  {nhom:'Số liệu'},
  {k:'th',  bt:'📊', ten:'Tổng hợp',   mo:function(){ dhSL('th'); }},
  {k:'sk',  bt:'📑', ten:'Sao kê',     mo:function(){ dhSL('sk'); }},
  {k:'to',  bt:'👥', ten:'Tổ TK&VV',   mo:function(){ dhSL('to'); }},
  {k:'kt',  bt:'🛡', ten:'KTGS Hội',   mo:function(){ dhSL('kt'); }},
  {k:'tra', bt:'👤', ten:'Tra cứu KH', mo:function(){ dhSL('tra'); }},
  {nhom:'Hồ sơ'},
  {k:'5',   bt:'📋', ten:'Biểu mẫu',   mo:function(){ doiNgan(5); }},
  {k:'4',   bt:'🪪', ten:'Scan',       mo:function(){ doiNgan(4); }},
  {k:'3',   bt:'🖼', ten:'Thư viện',   mo:function(){ doiNgan(3); }}
];
var DH_CC = [['hssv','🎓','HSSV','Hạn trả HSSV'], ['diaban','🗺','Địa bàn','Cây địa bàn — mã xã, điểm GD, ấp'], ['ctvay','📚','CT vay','Chương trình vay']];
function dhSL(t){ slDoiTab(t); if(nganHienTai!==7) doiNgan(7); }
function dhCC(id){ if(nganHienTai!==0) doiNgan(0); var c = ccTim(id); if(c && CC.mo===id && !c.hop) return; ccMo(id); }   /* công cụ mở ở cột Công cụ của Hôm nay (như cũ) */
function dhThieuNap(){
  if(typeof SLM==='undefined' || !SLM.bang || typeof slKyMoi!=='function') return 0;
  var ky = slKyMoi(); if(!ky) return 0;
  return SL_BAT_BUOC.filter(function(k){ return !SLM.bang[slKhoa(k, ky)]; }).length;
}
function dhDang(){ return nganHienTai===7 ? (D.cauHinh && D.cauHinh.slTab) || 'nap' : String(nganHienTai); }
function dhGon(){ var v = null; try{ v = localStorage.getItem('tb_gon'); }catch(e){} return v==='1' || (v!=='0' && window.innerWidth < 1280); }
function dhDoiGon(){ var g = !dhGon(); try{ localStorage.setItem('tb_gon', g ? '1' : '0'); }catch(e){} dhVe(); }
function dhVe(){
  var n = document.getElementById('thanh-ben'); if(!n) return;
  var gon = dhGon(), dang = dhDang(), h = '';
  document.body.classList.toggle('tb-gon', gon);
  h += '<div class="tb-dau"><div class="tb-logo" onclick="doiNgan(0)" title="Hôm nay">TH</div><div class="tb-ten">Tủ hồ sơ<small>'+coChuHTML((document.getElementById('donvi')||{}).textContent||'')+'</small></div>'+
    '<button class="tb-gon-nut" onclick="dhDoiGon()" title="'+(gon ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên')+'">'+(gon ? '»' : '«')+'</button></div><div class="tb-ds">';
  DH_MUC.forEach(function(m, i){
    if(m.nhom){ h += '<div class="tb-nhom">'+m.nhom+'</div>'; return; }
    var d = m.dem ? m.dem() : 0;
    h += '<a class="tb-muc'+(m.k===dang ? ' bat' : '')+'" data-m="'+m.k+'" onclick="DH_MUC['+i+'].mo()" title="'+coChuHTML(m.ten)+(d ? ' · '+d+' '+m.demTit : '')+'"><span class="bt">'+m.bt+'</span><span class="chu">'+coChuHTML(m.ten)+'</span>'+
      (d ? '<span class="so'+(m.do ? ' do' : '')+'">'+(m.do ? '⚠ ' : '')+d+'</span>' : '')+'</a>';
  });
  h += '<div class="tb-nhom">Công cụ</div><div class="tb-cc">'+DH_CC.map(function(c){ return '<a onclick="dhCC(\''+c[0]+'\')" title="'+coChuHTML(c[3])+'"><span class="bt">'+c[1]+'</span><span class="chu">'+c[2]+'</span></a>'; }).join('')+'</div></div>';
  var rac = (D.rac||[]).length;
  h += '<div class="tb-chan"><a onclick="moRac()" title="Thùng rác'+(rac ? ' · '+rac+' mục' : '')+'"><span class="bt">🗑</span>'+(rac ? '<span class="so">'+rac+'</span>' : '')+'</a>'+
    '<a onclick="moDonKho()" title="Dọn kho: thùng rác, lập chỉ mục, quét rác"><span class="bt">🧰</span></a><a onclick="moHuongDan()" title="Hướng dẫn"><span class="bt">❓</span></a><a onclick="moCaiDat()" title="Cài đặt"><span class="bt">⚙</span></a></div>';
  n.innerHTML = h;
}
function dhTo(){   /* tô mục đang mở + làm mới số đếm (rẻ: chỉ đếm mảng nhỏ / meta) */
  if(!document.getElementById('thanh-ben')) return;
  dhVe();
}
/* Alt+1…9: mở mục theo thứ tự trên thanh bên (bỏ qua tiêu đề nhóm) */
document.addEventListener('keydown', function(e){
  if(!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || !document.body.classList.contains('co-tb')) return;
  var so = +e.key; if(!(so>=1 && so<=9)) return;
  var ds = DH_MUC.filter(function(m){ return !m.nhom; }); if(!ds[so-1]) return;
  e.preventDefault(); ds[so-1].mo();
});
window.addEventListener('resize', function(){ var v = null; try{ v = localStorage.getItem('tb_gon'); }catch(e){} if(v===null && document.body.classList.contains('tb-gon')!==dhGon()) dhVe(); });
document.body.classList.add('co-tb');
dhVe();
