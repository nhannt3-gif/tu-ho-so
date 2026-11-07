/* ===== js/26c-gdx-to.js — 3.497 (tách từ js/26b, QUY_CHUAN 1.3 "tách dữ liệu – nghiệp vụ – giao diện"; không đổi chức năng): 👥 TỔ GIAO DỊCH =====
   ① DỮ LIỆU: D.cauHinh.gdx.g4To = [{ten, vai:['tt'|'ksv'|'gdvc'|'gdv'|'lx'|'bvd'|'bvt']}] · g4ToHay = [{ten, ds}] (khóa tiền tố g4 của khối Giao dịch xã, đồng bộ Drive)
   ② NGHIỆP VỤ (thuần, không vẽ, không đọc ô nhập): QT-19 thành phần Tổ giao dịch VB 4368 — g4KiemTo · g4Dong03II · g4PaGan · g4VaiDoi
   ③ GIAO DIỆN: khung khai (g4ToHTML), tóm tắt (g4TomTo), lệnh data-lenh="g4.*", phím Enter / Tab (QUY_CHUAN 11)
   Mẫu dùng: 03/GDX, 📘 Nhiệm vụ (js/26b). Cắm rút: bỏ dòng <script> → mẫu vẫn in, tên để trống ghi tay. ===== */
GDX_MD.g4To = []; GDX_MD.g4ToHay = [];   /* gdxC tự điền khi thiếu */
GDX_BO.push('g4ToHay');   /* tổ hay dùng không chụp vào nhật ký in */
/* ==========================================================
   3.496 (anh 07/11 "mẫu 03 cho chọn trực quan, 1 số quy tắc đọc kỹ VB — ví dụ tổ trưởng tổ GD kiêm bảo vệ"; "tạm cứ cho khai thủ công tất cả các thành viên"):
   👥 TỔ GIAO DỊCH — khai tay từng người (gõ tên / chọn từ danh sách cán bộ) + chip vai; ⭐ lưu tổ hay dùng; PA 1/2/3 (04/GDX) gán lái xe, bảo vệ đường.
   Điền 03/GDX (Phần I áp tải = GDV chính · lái xe · bảo vệ; Phần II mỗi vai 1 dòng + CCDC theo vai) và 📘 Nhiệm vụ Tổ GD (tên cạnh vai).
   Đồng bộ 12/GDX (Tổ trưởng · KSV · GDV = GDV chính). Kiểm tra quy tắc VB 4368 mục II.2, II.7 — chỉ cảnh báo, không chặn in.
   ========================================================== */
var G4_VAI = [['tt', 'Tổ trưởng', 'Tổ trưởng Tổ giao dịch'], ['ksv', 'KSV', 'Kiểm soát viên'], ['gdvc', 'GDV chính', 'Giao dịch viên chính — người áp tải'], ['gdv', 'GDV', 'Giao dịch viên'],
  ['lx', 'Lái xe', 'Lái xe (đường đi, về)'], ['bvd', 'BV đường', 'Bảo vệ trên đường đi, về'], ['bvt', 'BV tại điểm', 'Bảo vệ tại điểm giao dịch']];
var G4_PA = {'1':'Tổ trưởng lái xe · GDV chính áp tải · thành viên còn lại bảo vệ', '2':'Thành viên còn lại lái xe · GDV chính áp tải · Tổ trưởng bảo vệ', '3':'Cán bộ lái xe riêng · GDV chính áp tải · Tổ trưởng bảo vệ'};
var G4_NV2 = {tt:'Tổ trưởng', ksv:'Kiểm soát viên', gdvc:'Giao dịch viên chính', gdv:'Giao dịch viên', bvt:'Bảo vệ'};   /* Phần II 03/GDX: mỗi vai 1 dòng (như mẫu ghi chép) */
var G4_CC2 = {tt:'Thiết bị kết nối mạng, camera, …', ksv:'Máy tính xách tay, máy in, …', gdvc:'Thùng đựng tiền, máy in, máy đếm tiền, …', gdv:'Thùng đựng tiền, máy đếm tiền, …', bvt:'Công cụ hỗ trợ'};
function g4To(c){ c = c || gdxC(); if(!Array.isArray(c.g4To)) c.g4To = []; return c.g4To; }
function g4Ten(x){ return String(x && x.ten || '').trim(); }
function g4Ai(c, v){ return g4To(c).filter(function(x){ return (x.vai || []).indexOf(v)>=0; }); }
function g4AiTen(c, v){ return g4Ai(c, v).map(g4Ten).filter(Boolean); }
function g4ToMoi(C){ if(g4To(C).length) return; var ds = [];   /* tổ trống → lấy sẵn Tổ trưởng · KSV · GDV đã chọn ở 12/GDX */
  [['m12ToTruong', 'tt'], ['m12KSV', 'ksv'], ['m12GDV', 'gdvc']].forEach(function(p){ var t = String(C[p[0]] || '').trim(); if(!t) return; var x = ds.filter(function(o){ return o.ten===t; })[0]; if(x) x.vai.push(p[1]); else ds.push({ten:t, vai:[p[1]]}); });
  C.g4To = ds; }
function g4DongBo(C){ if(!g4To(C).some(g4Ten)) return; var f = function(v){ return g4AiTen(C, v)[0] || ''; }; C.m12ToTruong = f('tt'); C.m12KSV = f('ksv'); C.m12GDV = f('gdvc'); }
/* Phần II: mỗi (người, vai) 1 dòng theo thứ tự Tổ trưởng · KSV · GDV chính · GDV · Bảo vệ tại điểm */
function g4Dong03II(c){ var r = [], cc = c.g4CCDC!=='trong';
  ['tt', 'ksv', 'gdvc', 'gdv', 'bvt'].forEach(function(v){ g4Ai(c, v).forEach(function(x){ if(!g4Ten(x)) return;
    r.push({stt:r.length+1, ten:g4Ten(x), nv:G4_NV2[v], cc:cc ? gdxE(v==='bvt' && c.g4CCHT ? c.g4CCHT : G4_CC2[v]) : ''}); }); });
  return r; }
/* QT-19 — quy tắc thành phần Tổ giao dịch VB 4368 mục II.2, II.7 (cảnh báo, không chặn in) → [{muc 'do'|'vang', chu}] */
function g4KiemTo(c){
  var ds = g4To(c), r = [], dem = function(v){ return g4Ai(c, v).length; }, co = function(x, v){ return (x.vai || []).indexOf(v)>=0; }, add = function(m, t){ r.push({muc:m, chu:t}); };
  if(!ds.length) return [{muc:'vang', chu:'Chưa khai Tổ giao dịch — tên trên mẫu để trống ghi tay.'}];
  var ten = ds.filter(g4Ten); if(ten.length < 3) add('vang', 'Tổ giao dịch tối thiểu 03 cán bộ (đang '+ten.length+').');
  if(ds.some(function(x){ return !g4Ten(x) && (x.vai || []).length; })) add('vang', 'Có vai chưa ghi họ tên.');
  if(!dem('tt')) add('do', 'Chưa có Tổ trưởng.'); else if(dem('tt')>1) add('do', 'Chỉ 01 Tổ trưởng (đang '+dem('tt')+').');
  if(!dem('gdvc')) add('do', 'Chưa có Giao dịch viên chính (người áp tải).'); else if(dem('gdvc')>1) add('do', 'Chỉ 01 GDV chính (đang '+dem('gdvc')+').');
  if(!dem('ksv')) add('vang', 'Chưa có Kiểm soát viên (Tổ trưởng kiêm KSV thì bấm cả 2 vai).');
  if(ds.some(function(x){ return co(x, 'tt') && co(x, 'ksv') && co(x, 'bvt'); })) add('do', 'Tổ trưởng làm bảo vệ tại điểm thì không kiêm Kiểm soát viên.');
  if(ds.some(function(x){ return co(x, 'gdvc') && (co(x, 'lx') || co(x, 'bvd')); })) add('do', 'GDV chính là người áp tải — không lái xe, không bảo vệ đường.');
  if(!dem('lx')) add('vang', 'Đi đường: chưa có lái xe.');
  if(!dem('bvd')) add('vang', 'Đi đường: chưa có bảo vệ.');
  if(ds.some(function(x){ return co(x, 'lx') && co(x, 'bvd'); })) add('vang', 'Lái xe và bảo vệ là 2 người (đi đường tối thiểu 03 người: áp tải · lái xe · bảo vệ).');
  if(!dem('bvt')) add('vang', 'Chưa có bảo vệ tại điểm (Tổ trưởng hoặc lực lượng khác).');
  var g = {}; ten.forEach(function(x){ var k = g4Ten(x).toLowerCase(); g[k] = (g[k] || 0)+1; }); var trung = Object.keys(g).filter(function(k){ return g[k]>1; });
  if(trung.length) add('vang', 'Trùng tên ở 2 dòng — gộp vai vào 1 dòng: '+trung.join(', ')+'.');
  return r; }
function g4TomTo(X, lk, cb){ var c = X.C, n = g4To(c).filter(g4Ten).length; lk('g4to', n ? 'Tổ GD '+n+' người' : 'Tổ GD: chưa khai', n ? '' : 'vang');
  g4KiemTo(c).forEach(function(x){ cb(x.muc, x.chu, 'g4to'); }); }
function g4ToHTML(){
  var C = gdxC(); g4ToMoi(C); var ds = g4To(C), cb = C.danhSachCanBo || [], hay = C.g4ToHay || [];
  var nut = function(chu, lenh, du, tit, lop){ return '<button type="button" class="'+(lop || 'nho')+'" data-lenh="g4.'+lenh+'"'+(du!=null ? ' data-i="'+du+'"' : '')+(tit ? ' title="'+gdxE(tit)+'"' : '')+'>'+chu+'</button>'; };
  var h = ds.map(function(x, i){ return '<div class="g4-to-d"><span class="g4-to-so">'+(i+1)+'</span><input class="gdx-i g4-to-ten" list="g4-cb" value="'+gdxE(x.ten || '')+'" placeholder="Họ tên" data-lenh="g4.ten" data-su="change" data-i="'+i+'">'+
    G4_VAI.map(function(v){ return '<button type="button" class="gdx-c'+((x.vai || []).indexOf(v[0])>=0 ? ' bat' : '')+'" data-lenh="g4.vai" data-i="'+i+'" data-v="'+v[0]+'" title="'+gdxE(v[2])+'">'+v[1]+'</button>'; }).join('')+
    nut('×', 'bo', i, 'Bỏ người này', 'gdx-x')+'</div>'; }).join('');
  h += '<datalist id="g4-cb">'+cb.map(function(n){ return '<option value="'+gdxE(n)+'">'; }).join('')+'</datalist>';
  h += '<div class="gdx-chips">'+nut('＋ Thêm người', 'them', null, 'Gõ tên (hoặc chọn từ danh sách cán bộ) rồi bấm vai — người ngoài (bảo vệ thuê, lái xe, công an) cũng gõ tay')+
    (ds.length ? nut('⭐ Lưu tổ hay dùng', 'hayLuu', null, 'Lưu tổ này để phiên sau chọn lại')+nut('🗑 Xóa hết', 'xoa') : '')+'</div>';
  if(hay.length) h += '<div class="gdx-chips gdx-phu"><span class="gdx-nho2">Tổ hay dùng:</span>'+hay.map(function(t, i){ return '<span class="gdx-mh">'+nut('⭐ '+gdxE(t.ten)+' ('+t.ds.length+')', 'hay', i, t.ds.map(function(x){ return x.ten; }).join(', '), 'gdx-c')+nut('×', 'hayBo', i, 'Xóa tổ hay dùng này', 'gdx-x')+'</span>'; }).join('')+'</div>';
  var k = ds.length ? g4KiemTo(C) : [];
  return h+(k.length ? '<div class="g4-to-canh">'+k.map(function(x){ return '<div class="'+(x.muc==='do' ? 'do' : 'vang')+'">'+(x.muc==='do' ? '⛔ ' : '⚠ ')+gdxE(x.chu)+'</div>'; }).join('')+'</div>' : ds.length ? '<div class="g4-to-canh"><div class="ok">✓ Đúng quy định thành phần Tổ giao dịch (VB 4368).</div></div>' : '');
}
/* PA 1/2/3 (04/GDX) — THUẦN: gán lại lái xe, bảo vệ đường trên danh sách ds (sửa tại chỗ) → '' hoặc lời báo */
function g4PaGan(ds, v){
  var tt = ds.filter(function(x){ return (x.vai || []).indexOf('tt')>=0; })[0]; if(!tt) return 'Chọn Tổ trưởng trước (bấm chip "Tổ trưởng" ở 1 dòng).';
  ds.forEach(function(x){ x.vai = (x.vai || []).filter(function(a){ return a!=='lx' && a!=='bvd'; }); });
  var con = ds.filter(function(x){ var a = x.vai; return x!==tt && a.indexOf('gdvc')<0 && a.indexOf('tt')<0; })[0], moi = function(a){ var x = {ten:'', vai:[a]}; ds.push(x); return x; };
  if(v==='1'){ tt.vai.push('lx'); if(con) con.vai.push('bvd'); else moi('bvd'); }
  else if(v==='2'){ if(con) con.vai.push('lx'); else moi('lx'); tt.vai.push('bvd'); }
  else { moi('lx'); tt.vai.push('bvd'); }
  return '';
}
/* bấm vai (1 Tổ trưởng · 1 GDV chính; GDV chính thay GDV) — THUẦN */
function g4VaiDoi(ds, i, v){ var x = ds[i]; if(!x) return; x.vai = x.vai || [];
  if(x.vai.indexOf(v)>=0){ x.vai = x.vai.filter(function(a){ return a!==v; }); return; }
  if(v==='tt' || v==='gdvc') ds.forEach(function(o){ o.vai = (o.vai || []).filter(function(a){ return a!==v; }); });
  if(v==='gdvc') x.vai = x.vai.filter(function(a){ return a!=='gdv'; }); if(v==='gdv' && x.vai.indexOf('gdvc')>=0) return;
  x.vai.push(v); }
function g4Sau(){ var C = gdxC(), a = document.activeElement, giu = a && a.classList && a.classList.contains('g4-to-ten') ? +a.getAttribute('data-i') : -1;
  g4DongBo(C); gdxLuu(); gdxVe();
  if(giu>=0) setTimeout(function(){ var e = document.querySelectorAll('.g4-to-ten')[giu]; if(e){ e.focus(); try { e.select(); } catch(er){} } }, 0); }   /* vẽ lại xong vẫn đứng ở ô đang gõ (QUY_CHUAN 11) */
/* QUY_CHUAN 11: Enter / Tab → ô tên kế (cuối danh sách: Enter thêm người); Shift+Enter / Shift+Tab → ô trước */
document.addEventListener('keydown', function(ev){ var e = ev.target; if(!e || !e.classList || !e.classList.contains('g4-to-ten') || (ev.key!=='Enter' && ev.key!=='Tab')) return;
  var ds = document.querySelectorAll('.g4-to-ten'), i = +e.getAttribute('data-i'), j = ev.shiftKey ? i-1 : i+1;
  if(j<0) return; ev.preventDefault();
  if(j>=ds.length){ if(ev.key==='Enter'){ e.blur(); g4To().push({ten:'', vai:[]}); g4Sau(); setTimeout(function(){ var a = document.querySelectorAll('.g4-to-ten'); if(a.length) a[a.length-1].focus(); }, 30); } return; }
  ds[j].focus(); });
gdDangKy('g4', gdLenh({
  ten:function(el){ var ds = g4To(), i = +el.getAttribute('data-i'); if(ds[i]) ds[i].ten = String(el.value || '').replace(/\s+/g, ' ').trim(); g4Sau(); },
  vai:function(el){ g4VaiDoi(g4To(), +el.getAttribute('data-i'), el.getAttribute('data-v')); g4Sau(); },
  them:function(){ g4To().push({ten:'', vai:[]}); g4Sau(); setTimeout(function(){ var a = document.querySelectorAll('.g4-to-ten'); if(a.length) a[a.length-1].focus(); }, 60); },
  bo:function(el){ g4To().splice(+el.getAttribute('data-i'), 1); g4Sau(); },
  xoa:function(){ if(!confirm('Xóa hết thành viên Tổ giao dịch đang khai?')) return; gdxC().g4To = []; gdxLuu(); gdxVe(); },
  hayLuu:function(){ var C = gdxC(), d = gdxDiem(C.m12SelectedDiem), t = prompt('Tên tổ hay dùng:', d ? 'Tổ '+d.tenDiem : 'Tổ '+((C.g4ToHay || []).length+1)); if(!t) return;
    C.g4ToHay = (C.g4ToHay || []).filter(function(o){ return o.ten!==t.trim(); }); C.g4ToHay.unshift({ten:t.trim(), ds:JSON.parse(JSON.stringify(g4To(C)))}); C.g4ToHay = C.g4ToHay.slice(0, 20); gdxLuu(); gdxVe(); },
  hay:function(el){ var C = gdxC(), t = (C.g4ToHay || [])[+el.getAttribute('data-i')]; if(!t) return; C.g4To = JSON.parse(JSON.stringify(t.ds)); g4Sau(); },
  hayBo:function(el){ var C = gdxC(); (C.g4ToHay || []).splice(+el.getAttribute('data-i'), 1); gdxLuu(); gdxVe(); },
  pa:function(el){ var loi = g4PaGan(g4To(), el.getAttribute('data-v')); if(loi) return bao(loi, 4); g4Sau(); }
}));

