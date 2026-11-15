/* ===== 3.327 — KTGS bước 1 (docs/KE_HOACH_KTGS_GON.md mục 2.4, 3): 2 BỘ KHAI BÁO CỐ ĐỊNH (anh chốt 23/10) =====
   ① Hội kiểm tra (cố định) — khối Bắt buộc (định kỳ, sau giải ngân) · ② Khai báo khi cần — khối Đột xuất; lúc In khối nào cũng chọn được bộ kia (tầng 3 "lần in", không lưu).
   Lưu: dùng lại chỗ cũ — bộ ① = D.cauHinh.ktIn[mẫu], bộ ② = D.cauHinh.ktIn['dx_'+mẫu] (3.323) → không phải chuyển dữ liệu, bản cũ vẫn đọc được.
   Bảng II Mẫu 16: khai cả bảng (để trống · chấm · 727) + "▸ Từng ô" (b2o[i] = {c:'trong'|'cham'|'dien'|'go', v}) — ô không khai theo cả bảng.
   Chỉ TK 3 sửa đến khi bàn giao (CLAUDE.md). Hàm dựng mẫu, khuôn Word không đổi. */
var KT_BO = {hoi:{ten:'① Hội kiểm tra', phu:'cố định — kiểm tra bắt buộc', tien:''}, can:{ten:'② Khai báo khi cần', phu:'kiểm tra đột xuất, đoàn ngoài Hội', tien:'dx_'}};
var KT_BO_IN = null;   /* tầng 3 — lần in đang mở chọn bộ khác mặc định: {che, bo}; mở hộp in mới thì về mặc định */
function ktBoMacDinh(){ return 'hoi'; }   /* 3.514: Kiểm tra tổ gộp Định kỳ → mặc định ① Hội kiểm tra mọi chỗ (② chọn được khi In) — trước: đột xuất mặc định ② */
function ktBoDang(){ return KT_BO_IN && KT_BO_IN.che===(typeof ktCheDo==='function' ? ktCheDo() : '') ? KT_BO_IN.bo : ktBoMacDinh(); }
function ktBoKhoa(mau, bo){ return mau==='kh' || mau==='m04' ? mau : KT_BO[bo || ktBoDang()].tien+mau; }
function ktBoChonHTML(){ var d = ktBoDang(), md = ktBoMacDinh();
  return '<div class="kt-bo-chon"><span class="kt-bo-nhan">Bộ khai báo:</span>'+Object.keys(KT_BO).map(function(b){
    return GD.chip(KT_BO[b].ten+(b===md ? ' <small>(mặc định)</small>' : ''), b===d, 'ktbo.chon', {bo:b}, KT_BO[b].phu); }).join('')+'</div>'; }
/* Bảng II Mẫu 16 — 14 ô kết quả (thứ tự B[0..13] trong ktHTML16 / khuôn Word); ô số liệu kq1, kq2 theo "Nhận xét" */
var KT_B2_TEN = ['Thành lập theo cụm dân cư', 'Ban quản lý mấy người, phân công', 'Tổ trưởng – Tổ phó có quan hệ gia đình', 'Ban QL tham gia BTV CT-XH xã', 'Kiêm tổ trưởng ngân hàng khác',
  'Sinh hoạt Tổ định kỳ', 'Tuyên truyền, vận động tiết kiệm', 'Họp bình xét, thành phần', 'Tham gia giao dịch, giao ban', 'Thu phí, vay ké, chiếm dụng',
  'Ủy nhiệm thu lãi, biên lai', 'Chứng kiến kiểm tra, đối chiếu', 'Phối hợp xử lý nợ', 'Lưu giữ hồ sơ Tổ'];
var KT_B2_CACH = [['', 'Theo cả bảng'], ['trong', 'Để trống'], ['dien', 'Theo 727'], ['go', 'Gõ chữ']];
function ktB16Mang(t, v){   /* → mảng 14 ô Bảng II theo lựa chọn cả bảng + từng ô */
  var ca = ktB16Mac(v), o = (v && v.b2o) || {}, co = Object.keys(o).some(function(i){ return o[i] && o[i].c; });
  if(!co) return ca==='dien' ? KT_B16.map(function(x, i){ return ktB2Chu(t, ca, i); }) : [];
  return KT_B16.map(function(x, i){ var r = o[i] || {}; return r.c==='go' ? String(r.v || '') : ktB2Chu(t, r.c==='trong' ? '' : r.c || ca, i); });
}
function ktB2Chu(t, c, i){ return c==='dien' ? KT_B16[i].replace('{ấp}', ktCapAp(t.tenXa)) : ''; }
function ktB2TungOHTML(mau, o){
  var b2o = o.b2o || {}, n = Object.keys(b2o).filter(function(i){ return b2o[i] && b2o[i].c; }).length;
  return '<details class="kt-b2-o"'+(KT_IN_X && KT_IN_X.b2mo ? ' open' : '')+'><summary data-lenh="ktbo.b2mo">Từng ô'+(n ? ' ('+n+' ô khai riêng)' : '')+'</summary><table class="kt-b2-bang">'+
    KT_B2_TEN.map(function(ten, i){ var r = b2o[i] || {}, id = 'ki-'+mau+'-b2o-'+i;
      return '<tr><td>'+(i+1)+'. '+coChuHTML(ten)+'</td><td><select id="'+id+'" data-lenh="ktbo.doc" data-su="change">'+KT_B2_CACH.map(function(c){ return '<option value="'+c[0]+'"'+((r.c || '')===c[0] ? ' selected' : '')+'>'+c[1]+'</option>'; }).join('')+'</select>'+
        (r.c==='go' ? GD.o({id:id+'-v', gt:r.v || '', ph:'chữ in vào ô', lenh:'ktbo.doc'}) : '')+'</td></tr>'; }).join('')+'</table></details>';
}
function ktB2Doc(X, mau){   /* đọc "▸ Từng ô" trong hộp in → X.b2o */
  if(!document.getElementById('ki-'+mau+'-b2o-0')) return; var b = {};
  KT_B2_TEN.forEach(function(_, i){ var c = document.getElementById('ki-'+mau+'-b2o-'+i).value, e = document.getElementById('ki-'+mau+'-b2o-'+i+'-v');
    if(c) b[i] = c==='go' ? {c:c, v:e ? String(e.value || '').replace(/\s+/g, ' ').trim() : ((X.b2o || {})[i] || {}).v || ''} : {c:c}; });
  X.b2o = b;
}
GD.dangKy('ktbo', {
  chon:function(el){ var b = el.getAttribute('data-bo'); KT_BO_IN = b===ktBoMacDinh() ? null : {che:ktCheDo(), bo:b}; if(KT_IN_X){ if(KT_IN_X.tab) ktVeThe(); else ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1); } },
  doc:function(){ ktInDoc(); },
  b2mo:function(el){ if(KT_IN_X) KT_IN_X.b2mo = el.parentNode.open ? 0 : 1; }   /* bấm trước khi mở / đóng → nhớ trạng thái sau */
});
/* ===== 3.328 — KTGS bước 2: KHỐI BẮT BUỘC theo THÁNG KIỂM TRA + LỚP NGUỒN ktNguon* (docs/KE_HOACH_KTGS_GON.md mục 2.2, 9) =====
   Kiểm tra định kỳ + Mẫu 04: chọn 1 ô "Tháng kiểm tra" → số liệu = Mẫu 31 chốt cuối tháng liền trước (+ BC0437 / BC0438 tháng đó); ô Kỳ đầu trang không ảnh hưởng.
   Chưa nạp tháng đó → tháng gần nhất trước đó, ghi rõ ⚠ (như in theo tháng Kế hoạch 3.141). Sau giải ngân: số liệu theo Mẫu 31 tháng giải ngân (ktGNNap).
   TK 2 (đưa KTGS qua KHO): chỉ viết lại THÂN các hàm ktNguon* — mọi chỗ khối Bắt buộc lấy kỳ đều đi qua đây. */
var KT_A_TH = '';   /* tháng kiểm tra anh chọn (trong phiên); trống = mặc định */
function ktNguonThangKT(){   /* mặc định: kỳ đầu trang là tháng → tháng sau (như cũ); là ngày → chính tháng đó */
  if(KT_A_TH) return KT_A_TH; var k = String(ktCH().ky || kyChungLay() || ''); return k.length===7 ? kyLui(k, 1) : k.slice(0, 7);
}
/* 3.513 (anh 11/11 "thống nhất cách lấy số liệu"): GIỮ NHƯ CŨ = Kế hoạch năm 01/KH + Định kỳ 06 + 16 (tháng kiểm tra ở trên);
   MỌI MẪU KHÁC theo KỲ ĐANG CHỌN (ô Kỳ đầu trang, đúng ngày): Mẫu 31 đúng kỳ; số liệu chỉ có theo tháng (chấm điểm BC0437 / BC0438) → kỳ là ngày giữa tháng thì cuối tháng liền trước. */
function ktKyChon(){ return String(ktCH().ky || kyChungLay() || ''); }
function ktBCKyChon(ky){ ky = String(ky || ''); if(ky.length<=7 || KHO.bang('k37', ky)) return ky;   /* có BC đúng ngày → dùng; ngày cuối tháng → tháng đó; ngày giữa tháng → tháng trước */
  var th = slThang(ky); return tdnCuoiKy(th)===ky ? th : kyLui(th, -1); }
function ktBC37Dung(){ var b = KT_BC && KT_BC.k37; return b && KT_K && slThang(b.e.ky)===slThang(ktBCKyChon(KT_K.ky)) ? b : null; }   /* 3.514 (anh "để trống"): BC0437 đúng tháng cần, không có → null (không lấy tháng khác) */
function ktSLDong(){   /* dòng 📌 Số liệu của màn theo kỳ chọn (KT_K / KT_BC đang dựng) */
  if(!KT_K) return ''; var b = KT_BC && KT_BC.k37, can = slThang(ktBCKyChon(KT_K.ky)), dung = b && slThang(b.e.ky)===can;
  return '<div class="'+(b && !dung ? 'sl-bao vang' : 'to-the-so')+' kt-sl">📌 Số liệu: Mẫu 31 <b>'+coChuHTML(slKyChu(KT_K.ky))+'</b> · chấm điểm BC0437 '+
    (b ? '<b>'+coChuHTML(slKyChu(b.e.ky))+'</b>'+(dung ? '' : ' ⚠ cần '+kyVN(can)+' — chưa nạp, điểm để trống') : 'chưa nạp — điểm để trống')+' — theo ô Kỳ đầu trang</div>'; }
function ktNguonNap(th){ return ktKHNapSL(th); }   /* nạp Mẫu 31 + BC0437 / BC0438 + 105 tháng trước của tháng kiểm tra th */
function ktNguonSan(th){ var S = KT_KH_SL; return !!S && S.th===th && S.goc===KT_K; }
function ktNguonVoi(th, fn){ return ktNguonSan(th) ? ktKHVoiSL(fn) : fn(); }   /* chạy fn với số liệu tháng kiểm tra th (KT_K / kỳ đang dựng / KT_BC / KT_TRUOC tạm đổi rồi trả lại) */

/* ===== 3.329 — KTGS bước 3–4: THANH 3 KHỐI + MÀN 🧩 BỘ KHAI BÁO MẪU + Mẫu 04 đột xuất (docs/KE_HOACH_KTGS_GON.md mục 2.1, 2.4) =====
   khối A 📅 Bắt buộc (che dk · gn · bc · kh — thẻ con), B 🎯 Đột xuất (dx), C ⚙ Khai báo (hdt: Hội – xã · Chuẩn hóa · Bộ khai báo). Khóa che cũ giữ nguyên. */
var KT_A_THE = [['dk', '🗓 Định kỳ · Mẫu 06 + 16'], ['gn', '📅 Sau giải ngân · Mẫu 06'], ['bc', '📋 Báo cáo tổng hợp · Mẫu 04'], ['kh', '🗓 Kế hoạch năm · 01/KH']];
function ktKhoi(c){ return c==='dx' ? 'B' : c==='hdt' ? 'C' : c==='hx' ? 'D' : 'A'; }   /* 3.500: D 🏛 Hội cấp xã */
function ktKhoiHTML(c){   /* 3.514 (anh 11/11): 5 nút — 🎯 Kiểm tra tổ (gộp Định kỳ + Mẫu 04) · 📅 Kiểm tra sau 30 ngày · 🏛 Kiểm tra Hội · 🗓 Kế hoạch năm · ⚙ Khai báo; ‹ Lùi (Esc) */
  var k = ktKhoi(c), nut = [['B', '🎯 Kiểm tra tổ', 'Chọn 1 hay nhiều tổ → Tóm tắt · 06 · 15/TD · 16 · 04 — số liệu theo Kỳ đầu trang'],
    ['gn', '📅 Kiểm tra sau 30 ngày', 'Món giải ngân trong tháng của Kỳ đầu trang (đến ngày chọn) — Mẫu 06'],
    ['D', '🏛 Kiểm tra Hội', 'Biên bản kiểm tra Hội cấp xã 03/BB-CX — số liệu theo Kỳ đầu trang'],
    ['kh', '🗓 Kế hoạch năm', 'Lịch, Kế hoạch 01/KH, in theo tháng — số liệu cuối tháng liền trước tháng kiểm tra (như cũ)'],
    ['C', '⚙ Khai báo', 'Hội – xã, Chuẩn hóa, Bộ khai báo mẫu, Chọn hộ kiểm tra']];
  var bat = function(x){ return x[0]==='gn' || x[0]==='kh' ? c===x[0] : k===x[0]; };
  return '<div class="kt-khoi">'+nut.filter(function(x){ return x[0]!=='D' || typeof kt7HXVe==='function'; }).map(function(x){ return GD.chip(x[1], bat(x), 'ktk.khoi', {k:x[0]}, x[2]); }).join('')+
    '<button type="button" class="nho kt-lui" data-lenh="ktk.lui" title="Lùi về 1 cấp (phím Esc)">‹ Lùi <small>(Esc)</small></button></div>';
}
var KT_BO_CHEP = 0;
function ktBoVe(o, h){   /* màn 🧩 Bộ khai báo mẫu — sửa sẵn 2 bộ không cần bấm In (cùng ô với hộp 🖨 Chọn khi in) */
  var ds = ['m06', 'm16', 'm04', 'kh'], hoi = ktHoiDs();
  KT_IN_X = {ds:ds, nut:'', hoi:hoi, tab:1, mo:KT_IN_X && KT_IN_X.tab ? KT_IN_X.mo : 0, b2mo:KT_IN_X && KT_IN_X.tab ? KT_IN_X.b2mo : 0};
  KT_IN_X.cu = {}; ds.forEach(function(m){ KT_IN_X.cu[ktInKhoa(m)] = JSON.parse(JSON.stringify(ktInLay(m))); });
  o.innerHTML = h+'<div class="kt-bo-man"><p class="sl-phu">Mỗi ô trên mẫu điền thế nào — app nhớ, dùng khi In. <b>① Hội kiểm tra</b>: mặc định kiểm tra bắt buộc · <b>② Khai báo khi cần</b>: mặc định kiểm tra đột xuất (lúc In chọn được bộ kia). Mẫu 04, Kế hoạch dùng chung 1 bộ. Tên người lấy theo 🏛 Hội – xã.</p>'+
    ktBoChonHTML()+GD.hang([GD.nut({chu:'⧉ Chép bộ ① sang ②', lenh:'ktk.chep', tit:'Bộ ② lấy y như bộ ① (Mẫu 06, 16) — sửa tiếp phần khác'}), GD.nut({chu:'📄 Mẫu 06 trắng', lenh:'ktk.trang', tit:'Phiếu trống để ghi tay'})])+
    '<div class="kt-in-luoi">'+ds.map(function(m){ return ktInPhan(m, hoi); }).join('')+'</div>'+ktKN04HTML()+'</div>';
}
function ktDX04(ok){   /* Mẫu 04 cho tổ đang chọn — kiểm tra đột xuất (số liệu ngày chọn); chưa khai ngày → tháng / năm để chấm */
  var C = ktCH(), t = KT_K && KT_K.to[C.to]; if(!t) return bao('Chọn 1 tổ trước.', 3);
  if(!ok) return ktInHop(['m04'], ktInNutXem('ktDX04(1)'), ktHoiCuaTo([t]));
  ktDocKB(); var ng = KT_KB.ngay || '', gts = ktBC04([{t:t, ngay:ng}]);
  if(!ng) gts.forEach(function(g){ g.f.TH04 = ''; g.f.NAM04 = ''; g.rows.forEach(function(r){ r.C2 = ''; }); });
  KT_BC_XEM = {tu:'dx', gts:gts, tenFile:ktFTen(t, {to:1, mau:'M04'})}; ktBCHop('kiểm tra đột xuất');
}
GD.dangKy('ktk', {
  khoi:function(el){ var k = el.getAttribute('data-k'); ktDoiCheDo(k==='B' ? 'dx' : k==='C' ? 'hdt' : k==='D' ? 'hx' : k); },   /* 3.514: gn · kh trực tiếp */
  lui:function(){ if(typeof KTTO!=='undefined') KTTO.lui(); },
  hdt:function(el){ ktCH().hdtTab = el.getAttribute('data-t'); luu(); ktVeThe(); },
  chep:function(){ var S = D.cauHinh.ktIn = D.cauHinh.ktIn || {}; ['m06', 'm16'].forEach(function(m){ S['dx_'+m] = JSON.parse(JSON.stringify(S[m] || {})); }); luu(); ktVeThe(); bao('Đã chép bộ ① sang bộ ② (Mẫu 06, 16).', 3); },
  trang:function(){ ktTrang06(); },
  /* 3.520: bỏ lệnh màn cũ (dx04 · kieu · so · goiYLai · loc · xuat · dkTich · dkMo · dkLich · che) — Kiểm tra tổ dùng ktto.* (js/80) */
});
