/* ==========================================================
   3.307 — CHẾ ĐỘ LỌC CHO BẢN PHOTO (lớp Nghiệp vụ xử lý ảnh, dùng chung Scan)
   Anh 21/10/2026: "tinh chỉnh thêm các chế độ cho bản scan từ photo rõ hơn — hiện tại chế độ xám hay trắng vẫn chưa đạt lắm, magic cũng vậy".
   Bản photo: nền xám mực in không đều, chữ xám nhạt, lấm tấm chấm mực, không có màu. Cách làm chung: chia cho nền sáng từng vùng (khử nền xám,
   bóng tay) → nền về trắng hẳn, phần tối kéo đậm theo đường cong → bỏ chấm lấm tấm lẻ → làm nét.
   - 📠 Photo rõ (mới, mặc định khi quét 🗎 Bản photo CCCD): xám, nền trắng hẳn, chữ đậm, ảnh chân dung giữ độ đậm nhạt.
   - Xám: không đi qua Magic nữa (trước Magic rồi bỏ màu → bản photo nền còn xám) — khử nền + giãn tương phản + làm nét.
   - Giấy trắng: như cũ (giữ dấu đỏ) + kéo đậm chữ nhạt, làm nét nhẹ.
   - Đen trắng: ngưỡng theo nền từng vùng (trước 1 ngưỡng cố định 165 → bản photo nền xám thành mảng đen / chữ nhạt mất nét) + bỏ chấm lẻ.
   - Magic: ảnh gần như không màu (bản photo) → sau Magic kéo nền trắng + chữ đậm như Photo rõ nhưng nhẹ hơn; ảnh màu giữ như cũ.
   ========================================================== */
/* độ sáng chia cho nền sáng từng vùng: 1 = bằng nền, < 1 = tối hơn nền */
function lpTiNen(c, oLuoi){
  var W = c.width, H = c.height, im = c.getContext('2d').getImageData(0, 0, W, H), p = im.data, bg = nenSang(p, W, H, -1, oLuoi||32, 0.85), v = new Float32Array(W*H);
  /* nền không tối hơn 80% nền giấy chung (phân vị 90%) — vùng tối lớn như ảnh chân dung không bị coi là nền rồi tẩy trắng */
  var h = new Uint32Array(256), n = 0, cum = 0, i, j, giay = 255;
  for(j=0;j<p.length;j+=28){ h[Math.max(p[j], p[j+1], p[j+2])]++; n++; }
  for(i=255;i>=0;i--){ cum += h[i]; if(cum>=n*0.1){ giay = i; break; } }
  var san = Math.max(40, giay*0.8);
  for(i=0, j=0;i<v.length;i++, j+=4) v[i] = (p[j]*0.299+p[j+1]*0.587+p[j+2]*0.114)/Math.max(san, bg[j]);
  return {W:W, H:H, im:im, v:v};
}
/* nền (≥ nguong) → trắng; tối hơn → kéo đậm theo mũ */
function lpCong(v, nguong, mu){ return v>=nguong ? 255 : Math.round(255*Math.pow(Math.max(0, v)/nguong, mu)); }
/* bỏ chấm lấm tấm: cụm điểm tối liền nhau nhỏ (≤ max điểm, cỡ chấm mực photo) → trắng; nét chữ, dấu thanh đều lớn hơn */
function lpBoCham(g, W, H, toi, max){
  max = max || Math.max(6, Math.round(W*H/60000)); var da = new Uint8Array(W*H), hang = new Int32Array(max+2), i, k;
  for(i=0;i<W*H;i++){ if(da[i] || g[i]>=toi) continue;
    var n = 0, dau = 0, lon = false; hang[n++] = i; da[i] = 1;
    while(dau<n){ var q = hang[dau++], x = q%W, y = (q/W)|0;
      for(var dy=-1;dy<=1;dy++) for(var dx=-1;dx<=1;dx++){ var xx = x+dx, yy = y+dy; if(xx<0 || yy<0 || xx>=W || yy>=H) continue; var r = yy*W+xx;
        if(da[r] || g[r]>=toi) continue; da[r] = 1; if(n<=max) hang[n++] = r; else lon = true; } }
    if(!lon && n<=max) for(k=0;k<n;k++) g[hang[k]] = 255; }
}
function lpGhiXam(c, T, g){ var p = T.im.data; for(var i=0, j=0;i<g.length;i++, j+=4){ p[j] = p[j+1] = p[j+2] = g[i]; p[j+3] = 255; } c.getContext('2d').putImageData(T.im, 0, 0); }
/* phân vị thấp của tỉ lệ nền (mực đậm nhất) — để giãn tương phản */
function lpPhanVi(v, q){ var h = new Uint32Array(256), n = 0, i, cum = 0; for(i=0;i<v.length;i+=7){ h[Math.min(255, Math.round(v[i]*200))]++; n++; } for(i=0;i<256;i++){ cum += h[i]; if(cum>=n*q) return i/200; } return 0; }

function locPhoto(c){
  var T = lpTiNen(c, 32), g = new Uint8Array(T.v.length), lo = Math.min(0.5, lpPhanVi(T.v, 0.01));
  for(var i=0;i<g.length;i++){ var v = (T.v[i]-lo)/Math.max(0.2, 1-lo); g[i] = lpCong(v, 0.84, 1.9); }
  lpBoCham(g, T.W, T.H, 140); lpGhiXam(c, T, g); lamNet(c, 0.5); return c;
}
function locXam2(c){
  var T = lpTiNen(c, 32), g = new Uint8Array(T.v.length), lo = Math.min(0.5, lpPhanVi(T.v, 0.01));
  for(var i=0;i<g.length;i++){ var v = (T.v[i]-lo)/Math.max(0.2, 1-lo); g[i] = lpCong(v, 0.9, 1.35); }
  lpBoCham(g, T.W, T.H, 150); lpGhiXam(c, T, g); lamNet(c, 0.4); return c;
}
function locTrang2(c){
  locGiayTrang(c);
  var x = c.getContext('2d'), im = x.getImageData(0, 0, c.width, c.height), p = im.data;
  for(var i=0;i<p.length;i+=4){ var l = (p[i]*0.299+p[i+1]*0.587+p[i+2]*0.114)/255; if(l>=0.97) continue;
    var k = Math.pow(l/0.97, 1.35)/Math.max(0.01, l); for(var t=0;t<3;t++) p[i+t] = Math.max(0, Math.min(255, Math.round(p[i+t]*k))); }   /* đậm chữ, giữ tỉ lệ màu (dấu đỏ) */
  var n = c.width*c.height, g = new Uint8Array(n), j;
  for(j=0;j<n;j++) g[j] = p[j*4]*0.299+p[j*4+1]*0.587+p[j*4+2]*0.114;
  var cu = g.slice(); lpBoCham(g, c.width, c.height, 150);
  for(j=0;j<n;j++) if(g[j]!==cu[j]) p[j*4] = p[j*4+1] = p[j*4+2] = 255;
  x.putImageData(im, 0, 0); lamNet(c, 0.4); return c;
}
function locDenTrang2(c){
  var T = lpTiNen(c, 40), g = new Uint8Array(T.v.length);
  for(var i=0;i<g.length;i++) g[i] = T.v[i] < 0.75 ? 0 : 255;
  lpBoCham(g, T.W, T.H, 128, Math.max(3, Math.round(T.W*T.H/120000))); lpGhiXam(c, T, g); return c;   /* đen trắng: chấm dấu thanh mảnh hơn → chỉ bỏ cụm rất nhỏ */
}
/* ảnh gần như không màu (bản photo, ảnh chụp đen trắng) */
function lpItMau(c){
  var s = Math.min(1, 200/Math.max(c.width, c.height)), w = Math.max(1, Math.round(c.width*s)), h = Math.max(1, Math.round(c.height*s)), t = document.createElement('canvas'); t.width = w; t.height = h;
  var g = t.getContext('2d'); g.drawImage(c, 0, 0, w, h); var d = g.getImageData(0, 0, w, h).data, tong = 0, n = 0;
  for(var i=0;i<d.length;i+=4){ var mx = Math.max(d[i], d[i+1], d[i+2]); if(mx<30) continue; tong += (mx-Math.min(d[i], d[i+1], d[i+2]))/mx; n++; }
  return !n || tong/n < 0.07;
}
function locMagic2(c){
  var xam = lpItMau(c); locMagic(c); if(!xam) return c;
  var T = lpTiNen(c, 32), g = new Uint8Array(T.v.length);
  for(var i=0;i<g.length;i++) g[i] = lpCong(T.v[i], 0.88, 1.5);
  lpBoCham(g, T.W, T.H, 150); lpGhiXam(c, T, g); return c;
}
TEN_LOC.photo = 'Photo rõ';
TEN_LOC_NGAN = {vanban:'Văn bản rõ', photo:'Photo rõ', magic:'Magic', giay:'Giấy trắng', xam:'Xám', dentrang:'Đen trắng', goc:'Gốc'};
var LP_AP_LOC = apLoc;
apLoc = function(c, kieu, che){
  if(kieu==='photo') return locPhoto(c);
  if(kieu==='xam') return locXam2(c);
  if(kieu==='giay') return locTrang2(c);
  if(kieu==='dentrang') return locDenTrang2(c);
  if(kieu==='magic') return locMagic2(c);
  return LP_AP_LOC(c, kieu, che);
};
/* quét 🗎 Bản photo CCCD → mặc định Photo rõ */
var LP_LOC_MD = locMacDinh;
locMacDinh = function(che){ if(che==='the' && typeof SC!=='undefined' && SC.photo2) return 'photo'; return LP_LOC_MD(che); };
