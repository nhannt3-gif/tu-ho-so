/* ===== 3.327 — KTGS bước 1 (docs/KE_HOACH_KTGS_GON.md mục 2.4, 3): 2 BỘ KHAI BÁO CỐ ĐỊNH (anh chốt 23/10) =====
   ① Hội kiểm tra (cố định) — khối Bắt buộc (định kỳ, sau giải ngân) · ② Khai báo khi cần — khối Đột xuất; lúc In khối nào cũng chọn được bộ kia (tầng 3 "lần in", không lưu).
   Lưu: dùng lại chỗ cũ — bộ ① = D.cauHinh.ktIn[mẫu], bộ ② = D.cauHinh.ktIn['dx_'+mẫu] (3.323) → không phải chuyển dữ liệu, bản cũ vẫn đọc được.
   Bảng II Mẫu 16: khai cả bảng (để trống · chấm · 727) + "▸ Từng ô" (b2o[i] = {c:'trong'|'cham'|'dien'|'go', v}) — ô không khai theo cả bảng.
   Chỉ TK 3 sửa đến khi bàn giao (CLAUDE.md). Hàm dựng mẫu, khuôn Word không đổi. */
var KT_BO = {hoi:{ten:'① Hội kiểm tra', phu:'cố định — kiểm tra bắt buộc', tien:''}, can:{ten:'② Khai báo khi cần', phu:'kiểm tra đột xuất, đoàn ngoài Hội', tien:'dx_'}};
var KT_BO_IN = null;   /* tầng 3 — lần in đang mở chọn bộ khác mặc định: {che, bo}; mở hộp in mới thì về mặc định */
function ktBoMacDinh(){ return typeof ktCheDo==='function' && ktCheDo()==='dx' ? 'can' : 'hoi'; }
function ktBoDang(){ return KT_BO_IN && KT_BO_IN.che===(typeof ktCheDo==='function' ? ktCheDo() : '') ? KT_BO_IN.bo : ktBoMacDinh(); }
function ktBoKhoa(mau, bo){ return mau==='kh' || mau==='m04' ? mau : KT_BO[bo || ktBoDang()].tien+mau; }
function ktBoChonHTML(){ var d = ktBoDang(), md = ktBoMacDinh();
  return '<div class="kt-bo-chon"><span class="kt-bo-nhan">Bộ khai báo:</span>'+Object.keys(KT_BO).map(function(b){
    return GD.chip(KT_BO[b].ten+(b===md ? ' <small>(mặc định)</small>' : ''), b===d, 'ktbo.chon', {bo:b}, KT_BO[b].phu); }).join('')+'</div>'; }
/* Bảng II Mẫu 16 — 14 ô kết quả (thứ tự B[0..13] trong ktHTML16 / khuôn Word); ô số liệu kq1, kq2 theo "Nhận xét" */
var KT_B2_TEN = ['Thành lập theo cụm dân cư', 'Ban quản lý mấy người, phân công', 'Tổ trưởng – Tổ phó có quan hệ gia đình', 'Ban QL tham gia BTV CT-XH xã', 'Kiêm tổ trưởng ngân hàng khác',
  'Sinh hoạt Tổ định kỳ', 'Tuyên truyền, vận động tiết kiệm', 'Họp bình xét, thành phần', 'Tham gia giao dịch, giao ban', 'Thu phí, vay ké, chiếm dụng',
  'Ủy nhiệm thu lãi, biên lai', 'Chứng kiến kiểm tra, đối chiếu', 'Phối hợp xử lý nợ', 'Lưu giữ hồ sơ Tổ'];
var KT_B2_CACH = [['', 'Theo cả bảng'], ['trong', 'Để trống'], ['cham', 'Chấm ghi tay'], ['dien', 'Theo 727'], ['go', 'Gõ chữ']];
function ktB16Mang(t, v){   /* → mảng 14 ô Bảng II theo lựa chọn cả bảng + từng ô */
  var ca = ktB16Mac(v), o = (v && v.b2o) || {}, co = Object.keys(o).some(function(i){ return o[i] && o[i].c; });
  if(!co) return ca==='dien' || ca==='cham' ? KT_B16.map(function(x, i){ return ktB2Chu(t, ca, i); }) : [];
  return KT_B16.map(function(x, i){ var r = o[i] || {}; return r.c==='go' ? String(r.v || '') : ktB2Chu(t, r.c==='trong' ? '' : r.c || ca, i); });
}
function ktB2Chu(t, c, i){ return c==='dien' ? KT_B16[i].replace('{ấp}', ktCapAp(t.tenXa)) : c==='cham' ? KT_B16_CHAM : ''; }
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
function ktNguonKy(th){ return ktKHKySL(th); }   /* → {can: tháng cần, ky: kỳ Mẫu 31 dùng được} */
function ktNguonNap(th){ return ktKHNapSL(th); }   /* nạp Mẫu 31 + BC0437 / BC0438 + 105 tháng trước của tháng kiểm tra th */
function ktNguonSan(th){ var S = KT_KH_SL; return !!S && S.th===th && S.goc===KT_K; }
function ktNguonVoi(th, fn){ return ktNguonSan(th) ? ktKHVoiSL(fn) : fn(); }   /* chạy fn với số liệu tháng kiểm tra th (KT_K / TO_K / KT_BC / KT_TRUOC tạm đổi rồi trả lại) */
function ktNguonVe(o, th, ve){   /* vẽ thẻ khối Bắt buộc: chưa có số liệu tháng → nạp rồi vẽ lại */
  if(!th) return ve();
  if(!ktNguonSan(th)){ o.innerHTML = ktCheDoHTML()+ktAThangHTML(th)+'<div class="rong">Đang mở số liệu '+(ktNguonKy(th).ky ? slKyChu(ktNguonKy(th).ky) : 'cuối '+kyVN(kyLui(th, -1)))+'…</div>';
    ktNguonNap(th).then(function(){ if(KT_K && document.getElementById('kt-the')) ktVeThe(); }); return; }
  return ktNguonVoi(th, ve);
}
function ktAThangDs(th){   /* tháng chọn được: tháng sau mỗi tháng có Mẫu 31, + tháng hiện tại, + tháng đang chọn */
  var m = {}; toDsKy().forEach(function(e){ if(String(e.ky).length===7) m[kyLui(e.ky, 1)] = 1; });
  var d = nay(); m[d.getFullYear()+'-'+hai(d.getMonth()+1)] = 1; if(th) m[th] = 1;
  return Object.keys(m).sort().reverse().slice(0, 18);
}
function ktAThangHTML(th){
  var S = KT_KH_SL, san = !!S && S.th===th && (S.goc===KT_K || S.K===KT_K);   /* gọi cả lúc đang mượn số liệu (KT_K = S.K) */
  return '<div class="kt-a-thang"><label><b>📅 Tháng kiểm tra</b> <select data-lenh="kta.th" data-su="change">'+ktAThangDs(th).map(function(k){ return '<option value="'+k+'"'+(k===th ? ' selected' : '')+'>'+kyVN(k)+'</option>'; }).join('')+'</select></label>'+
    '<span class="sl-phu">số liệu cuối tháng liền trước — không theo ô Kỳ đầu trang</span></div>'+(san ? ktKHSLChu(S, +th.slice(5)) : '');
}
GD.dangKy('kta', {th:function(el){ KT_A_TH = el.value || ''; KT_DK_CACHE = {}; ktVeThe(); }});
/* ===== 3.329 — KTGS bước 3–4: THANH 3 KHỐI + MÀN 🧩 BỘ KHAI BÁO MẪU + Mẫu 04 đột xuất (docs/KE_HOACH_KTGS_GON.md mục 2.1, 2.4) =====
   khối A 📅 Bắt buộc (che dk · gn · bc · kh — thẻ con), B 🎯 Đột xuất (dx), C ⚙ Khai báo (hdt: Hội – xã · Chuẩn hóa · Bộ khai báo). Khóa che cũ giữ nguyên. */
var KT_A_THE = [['dk', '🗓 Định kỳ · Mẫu 06 + 16'], ['gn', '📅 Sau giải ngân · Mẫu 06'], ['bc', '📋 Báo cáo tổng hợp · Mẫu 04'], ['kh', '🗓 Lịch năm · Kế hoạch 01/KH']];
function ktKhoi(c){ return c==='dx' ? 'B' : c==='hdt' ? 'C' : 'A'; }
function ktKhoiHTML(c){
  var k = ktKhoi(c), h = '<div class="kt-khoi">'+GD.chip('📅 Bắt buộc <small>· theo tháng</small>', k==='A', 'ktk.khoi', {k:'A'}, 'Định kỳ theo kế hoạch, sau giải ngân, Mẫu 04, Lịch năm — số liệu cuối tháng liền trước tháng kiểm tra')+
    GD.chip('🎯 Đột xuất <small>· theo ngày</small>', k==='B', 'ktk.khoi', {k:'B'}, 'Số liệu theo ngày chọn ở ô Kỳ đầu trang')+GD.chip('⚙ Khai báo', k==='C', 'ktk.khoi', {k:'C'}, 'Hội – xã, Chuẩn hóa, Bộ khai báo mẫu')+
    (typeof KT_CHIP==='string' && KT_CHIP ? '<span class="kt-khoi-bc">'+KT_CHIP+'</span>' : '')+'</div>';   /* 3.334: chip BC0437 / BC0438 / nguồn số liệu ở cuối thanh khối (trước ở hàng lọc) */
  if(k==='A') h += '<div class="kt-che kt-a-the">'+KT_A_THE.map(function(x){ return GD.chip(x[1], c===x[0], 'ktk.che', {c:x[0]}); }).join('')+'</div>';
  return h;
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
  khoi:function(el){ var k = el.getAttribute('data-k'), C = ktCH(); ktDoiCheDo(k==='B' ? 'dx' : k==='C' ? 'hdt' : (C.aThe || 'dk')); },
  che:function(el){ var c = el.getAttribute('data-c'); ktCH().aThe = c; ktDoiCheDo(c); },
  hdt:function(el){ ktCH().hdtTab = el.getAttribute('data-t'); luu(); ktVeThe(); },
  chep:function(){ var S = D.cauHinh.ktIn = D.cauHinh.ktIn || {}; ['m06', 'm16'].forEach(function(m){ S['dx_'+m] = JSON.parse(JSON.stringify(S[m] || {})); }); luu(); ktVeThe(); bao('Đã chép bộ ① sang bộ ② (Mẫu 06, 16).', 3); },
  trang:function(){ ktTrang06(); },
  dx04:function(){ ktDX04(); },
  kieu:function(el){ ktDoiKieu(el.getAttribute('data-k')); }, so:function(el){ ktDoiSo(+el.getAttribute('data-d')); }, goiYLai:function(){ ktGoiYLai(); },
  loc:function(el){ KT_LOC = el.getAttribute('data-l'); ktVeThe(); }, xuat:function(el){ ktXuat(el.getAttribute('data-m'), el.getAttribute('data-c')); },
  dkTich:function(el){ ktDKTich(el.getAttribute('data-m'), el.checked); }, dkMo:function(el){ ktDKMo(el.getAttribute('data-m')); },
  dkLich:function(){ var th = ktDKThang(), lich = ktDKLich(th); Object.keys(lich).forEach(function(m){ KT_DK_CHON[m] = true; }); ktVeThe(); }
});
