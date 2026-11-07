/* ===== js/mau/0pb.js — 3.497 (QUY_CHUAN 9.4 "mẫu không gọi mẫu khác"): PHẦN CHUNG CÁC MẪU PHÂN BỔ KH =====
   Tách nguyên văn từ js/mau/07pb.js (Biểu 07 cũ) để Biểu 07 cũ (07pb) và 07/KH · 08/KH · 09/KH (07kh) cùng gọi — kết quả in không đổi.
   Khai báo riêng kiểu nền ô: mỗi ô chọn ✍ ghi tay · 🤖 tự động · ⚙ khai báo chung · ⌨ tự gõ riêng mẫu · ✏ gõ trong lần làm.
   K = {cach:{ô: cách}, gt:{ô: chữ ⌨}, go:{ô: chữ ✏}, co: cỡ chữ, ds: danh sách ô của mẫu đang in}. Ô: {k, n, ds (các cách), md, mau, chung, tuFn(d), ngay, nhieu}.
   Không đọc biến của giao diện (js/48); mẫu truyền danh sách ô qua K.ds. ===== */
var PB07_CACH = {cham:['✍', 'Ghi tay — để chấm'], tu:['🤖', 'Tự động'], chung:['⚙', 'Khai báo chung (⚙ Khai báo đơn vị › PGD)'], kb:['⌨', 'Tự gõ — nhớ riêng mẫu này'], go:['✏', 'Gõ trong lần làm (không nhớ)']};
var PB07_CO = [13, 13.5, 14];
function pb07OK(k, ds){ ds = ds || []; for(var i=0;i<ds.length;i++) if(ds[i].k===k) return ds[i]; return null; }   /* ds = danh sách ô của mẫu (truyền vào — phần chung không đọc biến của giao diện) */
/* K = {cach, gt, go, co, ds} (khai báo đang dùng + ds = danh sách ô của mẫu) → cách hiệu lực của ô */
function pb07Cach(K, k){ var x = pb07OK(k, (K || {}).ds), c = ((K || {}).cach || {})[k]; return x && x.ds.indexOf(c)>=0 ? c : x ? x.md : 'cham'; }
function pb07Ten0(dv){ return String((dv || {}).thuong || '').replace(/^(xã|phường|thị trấn)\s+/i, ''); }
function pb07GT(K, k, d){
  K = K || {}; var x = pb07OK(k, K.ds), c = pb07Cach(K, k); if(!x) return '';
  var chung = function(){ return x.chung && typeof hsoPGD==='function' ? String(hsoPGD(x.chung) || '') : ''; };
  var tu = function(){ return x.tuFn ? x.tuFn(d) || '' : ''; };   /* 🤖 tự động: mỗi mẫu khai tuFn ở ô của mình */
  if(c==='cham') return '';
  if(c==='tu') return tu();
  if(c==='chung') return chung();
  if(c==='go') return String((K.go || {})[k] || '');
  var v = String((K.gt || {})[k] || '').trim(); if(v) return v;   /* ⌨ chưa gõ → chữ sẵn của mẫu / in như nguồn chung / tự động (như nền ô) */
  return x.mau || (x.ds.indexOf('chung')>=0 ? chung() : x.ds.indexOf('tu')>=0 ? tu() : '');
}
function pb07CoChu(K){ var v = +((K || {}).co); return PB07_CO.indexOf(v)>=0 ? v : 14; }
function pb07O(v, cham){ v = v==null ? '' : String(v); return v ? '<span class="o-sl">'+coChuHTML(v)+'</span>' : cham; }   /* ô: có số liệu → nền xanh (chỉ trên màn hình) · trống → chấm như giấy gốc */
function pb07NgayDai(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+' tháng '+m[2]+' năm '+m[1] : ''; }
function pb07SoQD(d){ return d.so.indexOf('/')>=0 || !d.kyHieu ? d.so : d.so+(d.kyHieu.charAt(0)==='/' ? '' : '/')+d.kyHieu; }   /* "123" + "/QĐ-BĐDHĐQT" → "123/QĐ-BĐDHĐQT"; số đã có ký hiệu thì giữ */
function pb07Boc(h, K){ var co = pb07CoChu(K);   /* 3.494: tách từ pb07Lap (dùng chung 07/KH · 08/KH · 09/KH) — không đổi kết quả */   /* cỡ chữ thân: gắn cho từng đoạn / bảng chưa có cỡ riêng (lớp om-co + font-size) — bộ xuất Word chung (hsoDocx) đọc cỡ theo đoạn / bảng, không theo khung bọc */
    h = h.replace(/<(p|table)(\s[^>]*)?>/g, function(m, the, at){ at = at || ''; var lop = (at.match(/class="([^"]*)"/) || [])[1] || '';
      if(/(^| )s\d+( |$)/.test(lop)) return m;
      var st = (at.match(/style="([^"]*)"/) || [])[1] || ''; at = at.replace(/\s*class="[^"]*"/, '').replace(/\s*style="[^"]*"/, '');
      return '<'+the+' class="'+(lop ? lop+' ' : '')+'om-co" style="font-size:'+co+'pt;'+st+'"'+at+'>'; });
    if(typeof omChamMin==='function') h = omChamMin(h);   /* 3.303: dòng chấm nhỏ mịn như các mẫu đã chốt (Word cỡ nhỏ theo tỉ lệ) */
    return '<div class="om-co pb07" style="font-size:'+co+'pt">'+h+'</div>'; 
}
function pbNgayVN(iso){ var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3]+'/'+m[2]+'/'+m[1] : ''; }
