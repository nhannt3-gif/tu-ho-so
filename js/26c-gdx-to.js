/* ===== js/26c-gdx-to.js — 3.497 (tách từ js/26b, QUY_CHUAN 1.3 "tách dữ liệu – nghiệp vụ – giao diện"; không đổi chức năng): 👥 TỔ GIAO DỊCH =====
   ① DỮ LIỆU: D.cauHinh.gdx.g4To = [{ten, vai:['tt'|'ksv'|'gdvc'|'gdv'|'lx'|'bvd'|'bvt']}] · g4ToHay = [{ten, ds}] (khóa tiền tố g4 của khối Giao dịch xã, đồng bộ Drive)
   ② NGHIỆP VỤ (thuần, không vẽ, không đọc ô nhập): QT-19 thành phần Tổ giao dịch VB 4368 — g4KiemTo · g4Dong03II · g4OGan · g4KiemDoi
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
/* 3.510 (anh 10/11 "làm mẫu 03 theo dạng khung cố định theo thứ tự tổ trưởng, ksv, gdv chính, gdv"; "chỉ cần khai đơn giản vậy thôi, Lái xe và BV là kiêm nhiệm —
   Tổ trưởng kiêm bảo vệ, Kiểm soát hoặc GDV kiêm lái xe, cho chọn thêm kiêm nhiệm; BV chỉ chung 1 dạng bảo vệ; sang Mẫu 03 đúng như cũ"):
   KHUNG CỐ ĐỊNH 4 vai đúng thứ tự (GDV nhiều người — luôn có ô "＋ thêm"); mỗi dòng có nút KIÊM: 🚗 Lái xe · 🛡 Bảo vệ (bảo vệ = cả đường đi lẫn tại điểm: bvd + bvt).
   GDV chính (áp tải) không kiêm. Dữ liệu giữ nguyên g4To = [{ten, vai}] → 03/GDX Phần I–II, 📘 Nhiệm vụ, 12/GDX, QT-19, PA 1/2/3, ⭐ tổ hay dùng không đổi.
   [mã vai, nhãn, nhiều người?, gợi ý, được kiêm?] */
/* 3.511 (anh 10/11 "chỉ có tổ trưởng kiêm bảo vệ, KS hay GDV có thể kiêm lái xe"): cột 5 = kiêm được — Tổ trưởng: Bảo vệ · KSV, GDV: Lái xe · GDV chính: không */
var G4_O = [['tt', 'Tổ trưởng', 0, '', ['bv']], ['ksv', 'Kiểm soát viên', 1, 'Tổ trưởng kiêm KSV: chọn cùng tên Tổ trưởng', ['lx']], ['gdvc', 'GDV chính', 0, 'Giao dịch viên chính — người áp tải (không kiêm lái xe, bảo vệ)', []], ['gdv', 'Giao dịch viên', 1, '', ['lx']]];
var G4_SO = {ksv:1, gdv:3};   /* số dòng hiện của vai nhiều người (anh 10/11 "có thể có 2 KSV, nên có nút thêm; GDV mặc định để 3, có thể thêm xóa") — trong phiên, không lưu */
var G4_KIEM = [['lx', '🚗 Lái xe', ['lx']], ['bv', '🛡 Bảo vệ', ['bvd', 'bvt']]];
function g4K(t){ return String(t || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
/* gán tên vào ô vai v — THUẦN (sửa ds tại chỗ). cu = tên đang ở ô (vai nhiều người); ô 1 người: bỏ vai v của mọi người rồi gán */
/* 3.510 (anh 10/11 "tổ trưởng có thể kiêm KSV, còn các nơi khác em loại trừ cán bộ như cũ"): 1 người chỉ 1 vai Tổ GD, trừ cặp Tổ trưởng ↔ KSV */
var G4_LOI = ['tt', 'ksv', 'gdvc', 'gdv'];
function g4DuocKiem(a, b){ return a===b || (a==='tt' && b==='ksv') || (a==='ksv' && b==='tt'); }
/* vai Tổ GD khác (không được kiêm với v) mà người tên `ten` đang giữ → '' nếu được */
function g4VaiChan(ds, v, ten){ var x = ds.filter(function(o){ return g4K(o.ten)===g4K(ten); })[0]; if(!x) return '';
  return (x.vai || []).filter(function(a){ return G4_LOI.indexOf(a)>=0 && !g4DuocKiem(a, v); })[0] || ''; }
function g4OGan(ds, v, ten, cu, nhieu){ var bo = function(x){ x.vai = (x.vai || []).filter(function(a){ return a!==v; }); };
  ten = String(ten || '').replace(/\s+/g, ' ').trim();
  if(ten && g4K(ten)!==g4K(cu) && g4VaiChan(ds, v, ten)) return g4VaiChan(ds, v, ten);   /* loại trừ: không gán, trả vai đang giữ */
  if(nhieu){ if(cu) ds.forEach(function(x){ if(g4K(x.ten)===g4K(cu)) bo(x); }); } else ds.forEach(bo);
  if(ten){ var x = ds.filter(function(o){ return g4K(o.ten)===g4K(ten); })[0]; if(!x){ x = {ten:ten, vai:[]}; ds.push(x); } x.vai = x.vai || [];
    if(v==='gdvc') x.vai = x.vai.filter(function(a){ return a!=='lx' && a!=='bvd' && a!=='bvt'; });   /* áp tải không kiêm */
    if(x.vai.indexOf(v)<0) x.vai.push(v); }
  g4Gon(ds); return '';
}
/* người không còn vai Tổ giao dịch (tt · ksv · gdvc · gdv) → bỏ hẳn (kể cả kiêm lái xe / bảo vệ còn sót) */
function g4Gon(ds){ for(var i=ds.length-1;i>=0;i--){ var a = ds[i].vai || []; if(!a.some(function(v){ return v==='tt' || v==='ksv' || v==='gdvc' || v==='gdv'; })) ds.splice(i, 1); } }
/* bật / tắt kiêm nhiệm — THUẦN: k = 'lx' (1 lái xe: chọn người này thì bỏ ở người khác) | 'bv' (bảo vệ đường + tại điểm, nhiều người) */
function g4KiemDuoc(x, k){ return G4_O.some(function(r){ return (x.vai || []).indexOf(r[0])>=0 && r[4].indexOf(k)>=0; }); }   /* người x được kiêm k theo vai đang giữ */
function g4KiemDoi(ds, ten, k){ var x = ds.filter(function(o){ return g4K(o.ten)===g4K(ten); })[0]; if(!x || (x.vai || []).indexOf('gdvc')>=0) return;
  var m = k==='lx' ? ['lx'] : ['bvd', 'bvt'], co = x.vai.some(function(a){ return m.indexOf(a)>=0; });
  if(co){ x.vai = x.vai.filter(function(a){ return m.indexOf(a)<0; }); return; }
  if(!g4KiemDuoc(x, k)) return;   /* tắt luôn được; bật chỉ khi vai cho phép */
  if(k==='lx') ds.forEach(function(o){ o.vai = (o.vai || []).filter(function(a){ return a!=='lx'; }); });
  m.forEach(function(a){ if(x.vai.indexOf(a)<0) x.vai.push(a); }); }
function g4ToHTML(){
  var C = gdxC(); g4ToMoi(C); var ds = g4To(C), cb = C.danhSachCanBo || [], hay = C.g4ToHay || [];
  var nut = function(chu, lenh, du, tit, lop){ return '<button type="button" class="'+(lop || 'nho')+'" data-lenh="g4.'+lenh+'"'+(du!=null ? ' data-i="'+du+'"' : '')+(tit ? ' title="'+gdxE(tit)+'"' : '')+'>'+chu+'</button>'; };
  var kiem = function(r, x){ if(!x || !g4Ten(x)) return ''; return '<span class="g4-o-kiem">'+G4_KIEM.map(function(k){ var co = (x.vai || []).some(function(a){ return k[2].indexOf(a)>=0; });
    if(r[4].indexOf(k[0])<0 && !co) return '';   /* chỉ nút kiêm vai cho phép; kiêm cũ ngoài quy tắc (dữ liệu trước 3.511) vẫn hiện để tắt */
    return '<button type="button" class="gdx-c'+(co ? ' bat' : ' g4-k-mo')+'" data-lenh="g4.kiem" data-k="'+k[0]+'" data-cu="'+gdxE(g4Ten(x))+'" title="'+(co ? 'Bỏ kiêm ' : 'Kiêm ')+gdxE(k[1].slice(3))+'">'+(co ? k[1] : k[1].split(' ')[0])+'</button>'; }).join('')+'</span>'; };   /* 3.512 (anh 10/11 "chip không chọn nhìn không đẹp"): chưa chọn = biểu tượng nhỏ mờ, chọn = đủ chữ */
  /* 3.510 (anh 10/11 "ds lấy từ khai báo cán bộ"): ô chọn từ danh sách cán bộ (⚙ khai báo đơn vị — chung 12/GDX), loại trừ người giữ vai khác (trừ Tổ trưởng ↔ KSV) và người đã ở vai này */
  var chon = function(r, x){ var v = x ? g4Ten(x) : '', L = (v && !cb.some(function(n){ return g4K(n)===g4K(v); }) ? [v] : []).concat(cb).filter(function(n){ return g4K(n)===g4K(v) || (!g4VaiChan(ds, r[0], n) && !g4Ai(C, r[0]).some(function(o){ return g4K(o.ten)===g4K(n); })); });
    return '<option value="">— chọn —</option>'+L.map(function(n){ return '<option value="'+gdxE(n)+'"'+(g4K(n)===g4K(v) ? ' selected' : '')+'>'+gdxE(n)+'</option>'; }).join(''); };
  var o = function(r, x, cu){ return '<div class="g4-o"><span class="g4-o-vai"'+(r[3] ? ' title="'+gdxE(r[3])+'"' : '')+'>'+gdxE(r[1])+'</span>'+
    '<select class="gdx-i g4-to-ten" data-lenh="g4.o" data-su="change" data-v="'+r[0]+'"'+(cu ? ' data-cu="'+gdxE(cu)+'"' : '')+'>'+chon(r, x)+'</select>'+
    kiem(r, x)+(r[2] ? '<button type="button" class="gdx-x" data-lenh="g4.oBo" data-v="'+r[0]+'"'+(cu ? ' data-cu="'+gdxE(cu)+'"' : '')+' title="'+(cu ? 'Bỏ người này' : 'Bớt dòng trống')+'">×</button>' : '')+'</div>'; };
  var h = '<div class="g4-o-nhom">'+G4_O.map(function(r){ var co = g4Ai(C, r[0]);
    if(!r[2]) return o(r, co[0]); var trong = Math.max(0, (G4_SO[r[0]] || 1)-co.length), h2 = co.map(function(x){ return o(r, x, g4Ten(x) || ' '); }).join('');
    for(var t=0;t<trong;t++) h2 += o(r, null);
    return h2+'<div class="g4-o"><span class="g4-o-vai"></span><button type="button" class="nho" data-lenh="g4.oThem" data-v="'+r[0]+'">＋ thêm '+(r[0]==='ksv' ? 'KSV' : 'GDV')+'</button></div>'; }).join('')+'</div>';
  if(!cb.length) h += '<div class="g4-to-canh"><div class="vang">⚠ Chưa có danh sách cán bộ — <a href="#" data-lenh="g4.cb">⚙ khai báo cán bộ</a> (dùng chung 12/GDX).</div></div>';
  h += '<div class="gdx-chips">'+(ds.length ? nut('⭐ Lưu tổ hay dùng', 'hayLuu', null, 'Lưu tổ này để phiên sau chọn lại')+nut('🗑 Xóa hết', 'xoa') : '')+'</div>';
  if(hay.length) h += '<div class="gdx-chips gdx-phu"><span class="gdx-nho2">Tổ hay dùng:</span>'+hay.map(function(t, i){ return '<span class="gdx-mh">'+nut('⭐ '+gdxE(t.ten)+' ('+t.ds.length+')', 'hay', i, t.ds.map(function(x){ return x.ten; }).join(', '), 'gdx-c')+nut('×', 'hayBo', i, 'Xóa tổ hay dùng này', 'gdx-x')+'</span>'; }).join('')+'</div>';
  var k = ds.length ? g4KiemTo(C) : [];
  return h+(k.length ? '<div class="g4-to-canh">'+k.map(function(x){ return '<div class="'+(x.muc==='do' ? 'do' : 'vang')+'">'+(x.muc==='do' ? '⛔ ' : '⚠ ')+gdxE(x.chu)+'</div>'; }).join('')+'</div>' : ds.length ? '<div class="g4-to-canh"><div class="ok">✓ Đúng quy định thành phần Tổ giao dịch (VB 4368).</div></div>' : '');
}
/* ==========================================================
   3.510 (anh 10/11 "thêm chức năng lưu phiên theo điểm, có thể mở ra xem lại theo tháng, khi lưu có thể liên kết dữ liệu in mẫu 12"):
   💾 PHIÊN GIAO DỊCH — 1 phiên = 1 điểm GD · 1 ngày GD: Tổ GD (vai + kiêm) · phương tiện · công cụ hỗ trợ · GDV / KSV / Tổ trưởng của 12/GDX.
   D.cauHinh.gdx.g4Phien = [{v, id, diem, tenDiem, ngay, luc, gio:{di, bd, kt, ve}, km, d:{khóa: giá trị}}]
   — DỮ LIỆU GỐC phân công (anh 10/11: "sau này dùng làm dữ liệu cho việc khác: chấm công GD xã, thanh toán xăng, lệnh điều xe"; v = phiên bản dạng dữ liệu, thêm trường thì tăng v, phiên cũ vẫn đọc) (đồng bộ Drive cùng khối Giao dịch xã; lưu lại cùng điểm + ngày = ghi đè).
   📂 Phiên đã lưu: chọn tháng ‹ › · lọc điểm đang chọn / tất cả · Mở (điền lại 03/GDX) · 🖨 12/GDX (điền lại + chuyển sang 12/GDX) · xóa.
   ========================================================== */
var G4_PHIEN_KHOA = ['g4To', 'g4Xe', 'g4CCHT', 'g4Noi', 'g4CCDC', 'm12SelectedDiem', 'm12NgayGD', 'm12ToTruong', 'm12KSV', 'm12GDV'];
var G4_PH = {thang:'', moi:true};
var G4_PHIEN_V = 1;   /* trạng thái hộp xem phiên (trong phiên làm việc) */
GDX_BO.push('g4Phien');   /* nhật ký in không chụp danh sách phiên */
function g4Phien(c){ c = c || gdxC(); if(!Array.isArray(c.g4Phien)) c.g4Phien = []; return c.g4Phien; }
/* THUẦN: tạo bản ghi phiên từ khối c (điểm + ngày bắt buộc) → {phien} | {loi} */
function g4PhienTao(c, tenDiem, luc){ if(!c.m12SelectedDiem) return {loi:'Chọn điểm giao dịch trước.'}; if(!c.m12NgayGD) return {loi:'Chọn ngày giao dịch trước.'};
  var d = {}; G4_PHIEN_KHOA.forEach(function(k){ if(c[k]!==undefined) d[k] = JSON.parse(JSON.stringify(c[k])); });
  return {phien:{v:G4_PHIEN_V, id:c.m12SelectedDiem+'|'+c.m12NgayGD, diem:c.m12SelectedDiem, tenDiem:tenDiem || '', ngay:c.m12NgayGD, luc:luc || '',
    gio:{di:c.g4GioDi || '', bd:c.g4GioBD || '', kt:c.g4GioKT || '', ve:c.g4GioVe || ''}, km:+String((c.g4Km || {})[c.m12SelectedDiem] || '').replace(',', '.') || 0, d:d}}; }
/* THUẦN: ghi vào danh sách (cùng id → thay) — xếp mới nhất trước */
function g4PhienGhi(ds, p){ var i = ds.map(function(x){ return x.id; }).indexOf(p.id); if(i>=0) ds[i] = p; else ds.push(p);
  ds.sort(function(a, b){ return a.ngay===b.ngay ? String(a.tenDiem).localeCompare(String(b.tenDiem), 'vi') : (a.ngay<b.ngay ? 1 : -1); }); return i>=0; }
/* THUẦN: điền lại khối c từ phiên */
function g4PhienDung(c, p){ G4_PHIEN_KHOA.forEach(function(k){ if(p.d[k]!==undefined) c[k] = JSON.parse(JSON.stringify(p.d[k])); }); }
function g4PhienHTML(){ var C = gdxC(), d = gdxDiem(C.m12SelectedDiem), ds = g4Phien(C), co = ds.filter(function(x){ return x.id===C.m12SelectedDiem+'|'+C.m12NgayGD; })[0];
  var duoc = d && C.m12NgayGD;
  return '<div class="gdx-chips"><button type="button" class="nho'+(duoc ? ' chinh' : '')+'" data-lenh="g4.phLuu"'+(duoc ? '' : ' disabled')+
    ' title="Lưu Tổ GD · phương tiện · GDV / KSV / Tổ trưởng (12/GDX) của điểm + ngày đang chọn">💾 '+(co ? 'Lưu lại' : 'Lưu')+' phiên'+(duoc ? ': '+gdxE(d.tenDiem)+' · '+gdxDMY(C.m12NgayGD) : ' (chọn điểm + ngày GD)')+'</button>'+
    '<button type="button" class="nho" data-lenh="g4.phMo">📂 Phiên đã lưu ('+ds.length+')</button>'+(co ? '<small class="gdx-ghi">✓ đã lưu lúc '+gdxE(co.luc)+'</small>' : '')+'</div>'+g4ThieuHTML(); }
function g4ThieuHTML(){ var t = g4PhienThieu(gdxDsDiem(), g4Phien(), ngayISO(nay())); if(!t.length) return '';
  return '<div class="g4-to-canh"><div class="vang">⚠ Thiếu '+t.length+' phiên (từ tháng 11/2026): '+gdxE(t.slice(0, 6).map(function(x){ return x.tenDiem+' '+gdxDMY(x.ngay).slice(0, 5); }).join(', '))+(t.length>6 ? ', …' : '')+
    ' — <a href="#" data-lenh="g4.phMo" data-v="thieu">📂 xem, khai bổ sung</a></div></div>'; }
function g4PhienHop(){ var C = gdxC(), ds = g4Phien(C), th = G4_PH.thang || String(C.m12NgayGD || ngayISO(nay())).slice(0, 7), e = gdxE, nh = {};
  G4_PH.thang = th; G4_VAI.forEach(function(v){ nh[v[0]] = v[1]; });
  var L = ds.filter(function(p){ return p.ngay.slice(0, 7)===th && (G4_PH.moi ? true : p.diem===C.m12SelectedDiem); });
  var ai = function(p, v){ return (p.d.g4To || []).filter(function(x){ return (x.vai || []).indexOf(v)>=0; }).map(function(x){ return e(x.ten); }).join(', '); };
  var dong = L.map(function(p){ return '<tr><td>'+e(gdxDMY(p.ngay))+'</td><td>'+e(p.tenDiem || p.diem)+'</td><td>'+ai(p, 'tt')+'</td><td>'+ai(p, 'ksv')+'</td><td>'+ai(p, 'gdvc')+'</td><td>'+ai(p, 'gdv')+'</td><td>'+ai(p, 'lx')+'</td><td>'+ai(p, 'bvt')+'</td><td>'+e(p.gio ? [p.gio.bd, p.gio.kt].filter(Boolean).join('–') : '')+'</td><td>'+(p.km || '')+'</td>'+
    '<td class="g4-ph-nut"><button type="button" class="nho" data-lenh="g4.phDung" data-id="'+e(p.id)+'" title="Điền lại vào 03/GDX">📂 Mở</button>'+
      '<button type="button" class="nho" data-lenh="g4.phM12" data-id="'+e(p.id)+'" title="Điền lại và in 12/GDX">🖨 12/GDX</button><button type="button" class="gdx-x" data-lenh="g4.phXoa" data-id="'+e(p.id)+'" title="Xóa phiên này">×</button></td></tr>'; }).join('');
  moHop('<div class="hop-tit" id="g4-ph">📂 Phiên giao dịch đã lưu</div><div class="gdx-chips"><button type="button" class="nho" data-lenh="g4.phThang" data-v="-1">‹</button><b>Tháng '+th.slice(5)+'/'+th.slice(0, 4)+'</b><button type="button" class="nho" data-lenh="g4.phThang" data-v="1">›</button>'+
    '<span class="gdx-gian"></span><button type="button" class="gdx-c'+(G4_PH.moi ? ' bat' : '')+'" data-lenh="g4.phLoc" data-v="1">Tất cả điểm</button><button type="button" class="gdx-c'+(G4_PH.moi ? '' : ' bat')+'" data-lenh="g4.phLoc" data-v="0">Điểm đang chọn</button>'+
    '<button type="button" class="nho" data-lenh="g4.phExcel" title="Bảng phân công cả tháng: mỗi người × mỗi phiên 1 dòng (vai, lái xe, bảo vệ, xe, giờ, km)">📊 Excel tháng</button></div>'+
    (dong ? '<div class="g4-ph-khung"><table class="g4-ph-bang"><thead><tr><th>Ngày</th><th>Điểm GD</th><th>Tổ trưởng</th><th>KSV</th><th>GDV chính</th><th>GDV</th><th>Lái xe</th><th>Bảo vệ</th><th>Giờ GD</th><th>Km</th><th></th></tr></thead><tbody>'+dong+'</tbody></table></div>'
      : '<div class="sl-phu">Chưa có phiên nào lưu trong tháng này'+(G4_PH.moi ? '' : ' ở điểm đang chọn')+'.</div>')+
    g4ThieuHop(th, C)+'<div class="hop-nut"><button data-lenh="hop.dong">Đóng</button></div>', true); }
function g4ThieuHop(th, C){ var t = g4PhienThieu(gdxDsDiem(), g4Phien(C), ngayISO(nay())).filter(function(x){ return x.ngay.slice(0, 7)===th && (G4_PH.moi || x.diem===C.m12SelectedDiem); }); if(!t.length) return '';
  return '<div class="g4-ph-thieu"><b>⚠ Thiếu '+t.length+' phiên tháng '+th.slice(5)+'/'+th.slice(0, 4)+'</b>'+t.map(function(x){ return '<div>'+gdxE(x.tenDiem)+' · ngày GD '+gdxE(gdxDMY(x.ngay))+
    ' <button type="button" class="nho" data-lenh="g4.phBoSung" data-diem="'+gdxE(x.diem)+'" data-ngay="'+x.ngay+'" title="Chọn điểm + ngày này ở 03/GDX, khai Tổ GD rồi bấm 💾 Lưu phiên">＋ Khai bổ sung</button></div>'; }).join('')+'</div>'; }
/* 3.510 (anh 10/11 "trong tháng em sẽ cho lưu, có thể khai bổ sung cho các phiên cũ, và có cảnh báo thiếu phiên nào, bắt đầu từ tháng 11"):
   THUẦN — phiên còn thiếu: mỗi điểm có ngày GD hằng tháng (ngayGD), mỗi tháng từ G4_PH_TU tới tháng của `hom`, ngày GD đã qua (≤ hom) mà điểm chưa có phiên nào
   trong tháng đó → [{diem, tenDiem, ngay}] (xếp ngày, tên điểm). Điểm chưa khai ngày GD không tính. */
var G4_PH_TU = '2026-11';
function g4PhienThieu(dsDiem, ds, hom, tu){ tu = tu || G4_PH_TU; var r = [], co = {}, th = tu, cuoi = String(hom).slice(0, 7);
  ds.forEach(function(p){ co[p.diem+'|'+p.ngay.slice(0, 7)] = 1; });
  for(var n=0; th<=cuoi && n<60; n++, th = kyLui(th, 1)){ var y = +th.slice(0, 4), m = +th.slice(5, 7), max = new Date(y, m, 0).getDate();
    dsDiem.forEach(function(d){ var g = +String(d.ngayGD || '').replace(/\D/g, ''); if(!g || g>31) return; var ng = th+'-'+('0'+Math.min(g, max)).slice(-2);
      if(ng<=hom && !co[d.k+'|'+th]) r.push({diem:d.k, tenDiem:d.tenDiem, ngay:ng}); }); }
  return r.sort(function(a, b){ return a.ngay===b.ngay ? String(a.tenDiem).localeCompare(String(b.tenDiem), 'vi') : (a.ngay<b.ngay ? -1 : 1); }); }
/* đặt bộ lọc địa bàn của tab về đúng điểm (gdxTheoLoc lấy điểm theo bộ lọc) rồi điền điểm + ngày GD — không tự đổi sang ngày GD kế */
function g4PhienDiem(ma, ngay){ var S = gdxCH(), d = gdxDiem(ma), C = gdxC(); if(d && S.diem!==d.k){ S.xa = d.maXa || ''; S.diem = d.k; S.hoi = ''; S.to = ''; } C.m12SelectedDiem = ma; if(ngay) C.m12NgayGD = ngay; }
/* CHỖ ĐỌC CHUNG (THUẦN) — bảng phân công: mỗi người × mỗi phiên 1 dòng, lọc tháng 'yyyy-mm' (trống = tất cả) / điểm. Chấm công, xăng, lệnh điều xe sau này đọc ở đây. */
function g4PhanCong(ds, thang, diem){ var r = [], nh = {}; G4_VAI.forEach(function(v){ nh[v[0]] = v[2]; });
  ds.filter(function(p){ return (!thang || p.ngay.slice(0, 7)===thang) && (!diem || p.diem===diem); }).slice().sort(function(a, b){ return a.ngay===b.ngay ? String(a.tenDiem).localeCompare(String(b.tenDiem), 'vi') : (a.ngay<b.ngay ? -1 : 1); })
    .forEach(function(p){ var g = p.gio || {}, xe = (p.d || {}).g4Xe || ''; ((p.d || {}).g4To || []).forEach(function(x){ var a = x.vai || [];
      r.push({ngay:p.ngay, diem:p.diem, tenDiem:p.tenDiem, ten:x.ten, vai:G4_LOI.filter(function(v){ return a.indexOf(v)>=0; }).map(function(v){ return nh[v]; }).join(', '),
        laiXe:a.indexOf('lx')>=0, baoVe:a.indexOf('bvd')>=0 || a.indexOf('bvt')>=0, xe:a.indexOf('lx')>=0 ? xe : '', gioDi:g.di || '', gioBD:g.bd || '', gioKT:g.kt || '', gioVe:g.ve || '', km:a.indexOf('lx')>=0 ? (p.km || 0) : 0}); }); });
  return r; }
function g4PhienExcel(th){ var L = g4PhanCong(g4Phien(), th); if(!L.length) return bao('Tháng này chưa có phiên nào.', 3);
  xongTV.then(function(){ if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel — có mạng một lần rồi thử lại.');
    var aoa = [['BẢNG PHÂN CÔNG TỔ GIAO DỊCH — THÁNG '+th.slice(5)+'/'+th.slice(0, 4)], [], ['STT', 'Ngày', 'Điểm giao dịch', 'Họ tên', 'Vai', 'Lái xe', 'Bảo vệ', 'Phương tiện', 'Giờ đi', 'Bắt đầu GD', 'Kết thúc GD', 'Giờ về', 'Km đi – về']];
    L.forEach(function(x, i){ aoa.push([i+1, gdxDMY(x.ngay), x.tenDiem, x.ten, x.vai, x.laiXe ? 'x' : '', x.baoVe ? 'x' : '', x.xe, x.gioDi, x.gioBD, x.gioKT, x.gioVe, x.km || '']); });
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Phan cong');
    taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Phan cong To GD '+th+'.xlsx'); }); }
function g4PhienTim(id){ return g4Phien().filter(function(p){ return p.id===id; })[0]; }
function g4Sau(){ var C = gdxC(), a = document.activeElement, giu = a && a.classList && a.classList.contains('g4-to-ten') ? Array.prototype.indexOf.call(document.querySelectorAll('.g4-to-ten'), a) : -1;   /* 3.510: vị trí ô (khung cố định không có data-i) */
  g4DongBo(C); gdxLuu(); gdxVe();
  if(giu>=0) setTimeout(function(){ var e = document.querySelectorAll('.g4-to-ten')[giu]; if(e){ e.focus(); try { e.select(); } catch(er){} } }, 0); }   /* vẽ lại xong vẫn đứng ở ô đang gõ (QUY_CHUAN 11) */
/* QUY_CHUAN 11: Enter / Tab → ô tên kế; Shift+Enter / Shift+Tab → ô trước */
document.addEventListener('keydown', function(ev){ var e = ev.target; if(!e || !e.classList || !e.classList.contains('g4-to-ten') || (ev.key!=='Enter' && ev.key!=='Tab')) return;
  var ds = document.querySelectorAll('.g4-to-ten'), i = Array.prototype.indexOf.call(ds, e), j = ev.shiftKey ? i-1 : i+1;
  if(j<0) return; ev.preventDefault();
  if(j>=ds.length) return;   /* 3.510: khung cố định — ô cuối không thêm dòng */
  ds[j].focus(); });
gdDangKy('g4', gdLenh({
  o:function(el){ var v = el.getAttribute('data-v'), r = G4_O.filter(function(x){ return x[0]===v; })[0], ten = String(el.value || '').trim(), chan = g4OGan(g4To(), v, ten, el.getAttribute('data-cu'), !!(r && r[2]));
    if(chan){ var nh = {}; G4_VAI.forEach(function(a){ nh[a[0]] = a[2]; }); bao('⚠ '+ten+' đang là '+nh[chan]+' — mỗi người 1 vai (chỉ Tổ trưởng được kiêm KSV). Bỏ ở ô đó trước.', 5); } g4Sau(); },   /* 3.510 khung cố định */
  phLuu:function(){ var C = gdxC(), d = gdxDiem(C.m12SelectedDiem), r = g4PhienTao(C, d ? d.tenDiem : '', ngayVN(ngayISO(nay()))+' '+new Date().toTimeString().slice(0, 5)); if(r.loi) return bao(r.loi, 4);
    var thay = g4PhienGhi(g4Phien(C), r.phien); gdxLuu(); gdxVe(); bao('💾 '+(thay ? 'Đã lưu lại' : 'Đã lưu')+' phiên '+r.phien.tenDiem+' · '+gdxDMY(r.phien.ngay)+'.', 3); },   /* 3.510 phiên theo điểm */
  cb:function(){ gdxKBChung(); },
  phExcel:function(){ g4PhienExcel(G4_PH.thang); },
  km:function(el){ var C = gdxC(); C.g4Km = C.g4Km || {}; C.g4Km[el.getAttribute('data-diem')] = String(el.value || '').replace(/[^\d.,]/g, ''); gdxLuu(); },   /* 3.510 km theo điểm */
  phMo:function(el){ var t = el && el.getAttribute('data-v')==='thieu' ? g4PhienThieu(gdxDsDiem(), g4Phien(), ngayISO(nay())) : []; G4_PH.thang = t.length ? t[0].ngay.slice(0, 7) : ''; if(t.length) G4_PH.moi = true; g4PhienHop(); },
  phBoSung:function(el){ var C = gdxC(); dongHop(); g4PhienDiem(el.getAttribute('data-diem'), el.getAttribute('data-ngay')); gdxLuu(); gdxDoiMau('g03');
    bao('＋ Khai bổ sung phiên '+(gdxDiem(C.m12SelectedDiem) || {}).tenDiem+' · '+gdxDMY(C.m12NgayGD)+': sửa Tổ GD rồi bấm 💾 Lưu phiên.', 5); },
  phThang:function(el){ G4_PH.thang = kyLui(G4_PH.thang, +el.getAttribute('data-v')); g4PhienHop(); },
  phLoc:function(el){ G4_PH.moi = el.getAttribute('data-v')==='1'; g4PhienHop(); },
  phDung:function(el){ var p = g4PhienTim(el.getAttribute('data-id')); if(!p) return; dongHop(); g4PhienDung(gdxC(), p); g4PhienDiem(p.diem, p.ngay); gdxLuu(); gdxDoiMau('g03'); bao('📂 Đã mở phiên '+p.tenDiem+' · '+gdxDMY(p.ngay)+' vào 03/GDX.', 3); },
  phM12:function(el){ var p = g4PhienTim(el.getAttribute('data-id')); if(!p) return; dongHop(); g4PhienDung(gdxC(), p); g4PhienDiem(p.diem, p.ngay); gdxLuu(); gdxDoiMau('m12'); bao('🖨 12/GDX: '+p.tenDiem+' · '+gdxDMY(p.ngay)+' — GDV · KSV · Tổ trưởng theo phiên đã lưu.', 4); },
  phXoa:function(el){ var id = el.getAttribute('data-id'), p = g4PhienTim(id); if(!p || !confirm('Xóa phiên '+p.tenDiem+' · '+gdxDMY(p.ngay)+'?')) return; var ds = g4Phien(); ds.splice(ds.indexOf(p), 1); gdxLuu(); g4PhienHop(); gdxVe(); },
  kiem:function(el){ g4KiemDoi(g4To(), el.getAttribute('data-cu'), el.getAttribute('data-k')); g4Sau(); },   /* 3.510 kiêm lái xe / bảo vệ */
  oBo:function(el){ var v = el.getAttribute('data-v'), cu = el.getAttribute('data-cu'); if(cu) g4OGan(g4To(), v, '', cu, true); else G4_SO[v] = Math.max(0, Math.max(G4_SO[v] || 0, g4Ai(gdxC(), v).length+1)-1); g4Sau(); },
  oThem:function(el){ var v = el.getAttribute('data-v'); G4_SO[v] = Math.max(G4_SO[v] || 0, g4Ai(gdxC(), v).length)+1; g4Sau(); setTimeout(function(){ var a = document.querySelectorAll('[data-lenh="g4.o"][data-v="'+v+'"]:not([data-cu])'); if(a.length) a[a.length-1].focus(); }, 60); },
  xoa:function(){ if(!confirm('Xóa hết thành viên Tổ giao dịch đang khai?')) return; gdxC().g4To = []; gdxLuu(); gdxVe(); },
  hayLuu:function(){ var C = gdxC(), d = gdxDiem(C.m12SelectedDiem), t = prompt('Tên tổ hay dùng:', d ? 'Tổ '+d.tenDiem : 'Tổ '+((C.g4ToHay || []).length+1)); if(!t) return;
    C.g4ToHay = (C.g4ToHay || []).filter(function(o){ return o.ten!==t.trim(); }); C.g4ToHay.unshift({ten:t.trim(), ds:JSON.parse(JSON.stringify(g4To(C)))}); C.g4ToHay = C.g4ToHay.slice(0, 20); gdxLuu(); gdxVe(); },
  hay:function(el){ var C = gdxC(), t = (C.g4ToHay || [])[+el.getAttribute('data-i')]; if(!t) return; C.g4To = JSON.parse(JSON.stringify(t.ds)); g4Sau(); },
  hayBo:function(el){ var C = gdxC(); (C.g4ToHay || []).splice(+el.getAttribute('data-i'), 1); gdxLuu(); gdxVe(); },
}));

