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
  chon:function(el){ var b = el.getAttribute('data-bo'); KT_BO_IN = b===ktBoMacDinh() ? null : {che:ktCheDo(), bo:b}; if(KT_IN_X) ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1); },
  doc:function(){ ktInDoc(); },
  b2mo:function(el){ if(KT_IN_X) KT_IN_X.b2mo = el.parentNode.open ? 0 : 1; }   /* bấm trước khi mở / đóng → nhớ trạng thái sau */
});
