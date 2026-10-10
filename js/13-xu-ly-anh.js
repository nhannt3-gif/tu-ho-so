/* ==========================================================
   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
   Tự động trước: tìm khung (thẻ CCCD / tờ giấy) → nắn phối cảnh về đúng khổ → tự xoay, tự lật, nhận mặt trước/sau (CCCD)
   → lọc làm đẹp (Magic màu cho thẻ, Giấy trắng cho tài liệu).
   Còn sót thì anh chỉnh tay ở hàng chờ: kéo 4 góc (có kính lúp), xoay 90°, lật 180°, đổi kiểu lọc, dời thứ tự.
   Ảnh gốc (thu còn cạnh dài 2000px) giữ tới khi lưu để làm lại nhiều lần không giảm chất lượng.
   Thuật toán và trọng số đã dò trên ảnh CCCD thật (bàn kính, khăn sọc, bao nhựa), 4 hướng xoay, cả ảnh nén lại:
   thẻ trên nền có màu khớp 94–98%; thẻ nhạt màu trên bàn kính 71–91% (có dấu ⚠ thì kéo góc tay).
   ========================================================== */
var KHO_THE = {rong:1012, cao:638};                 /* khổ 85,6 × 54 mm ở ~300 dpi */
var TS_THE = {tp:0.85, v:0.35, tl:6, lech:0.06, sl:20};    /* trọng số dò khung thẻ */
var TEN_LOC = {magic:'Magic màu', giay:'Giấy trắng', xam:'Xám', dentrang:'Đen trắng', goc:'Gốc'};

function anhTuBlob(b){
  return new Promise(function(ok, loi){
    var u = URL.createObjectURL(b), im = new Image();
    im.onload = function(){ URL.revokeObjectURL(u); ok(im); };
    im.onerror = function(){ URL.revokeObjectURL(u); loi(new Error('Không đọc được ảnh')); };
    im.src = u;
  });
}
function canvasRaBlob(c, cl){ return new Promise(function(ok){ c.toBlob(function(b){ ok(b); }, 'image/jpeg', cl||0.9); }); }
/* ảnh gốc thu còn cạnh dài 2000px — đủ nét cho thẻ và A4, đỡ nặng máy */
function thuGoc(file){
  return anhTuBlob(file).then(function(im){
    var k = Math.min(1, 2000/Math.max(im.width, im.height));
    var c = document.createElement('canvas'); c.width = Math.round(im.width*k); c.height = Math.round(im.height*k);
    c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
    return canvasRaBlob(c, 0.92);
  });
}

/* ---- 1. TÌM KHUNG THẺ CCCD ----
   neo bằng màu xanh ngọc đặc trưng của thẻ → dò đường thẳng theo hướng (Hough) → chọn bộ 4 cạnh:
   mép thẻ (trong đậm màu thẻ, ngoài không) + tỉ lệ gần 1,585 + cạnh đối song song, ngang ⟂ dọc */
/* thu nhỏ luôn đi qua một khung vẽ cỡ thật: trình duyệt thu nhỏ Ảnh và Khung vẽ theo 2 cách khác nhau (Ảnh bị làm mịn hơn,
   mép thẻ mờ đi) — trọng số dò khung đã chỉnh theo cách thu nhỏ Khung vẽ nên phải giữ đúng một cách */
function quaKhung(img){
  if(img.getContext) return img;
  var c=document.createElement('canvas'); c.width=img.width; c.height=img.height; c.getContext('2d').drawImage(img,0,0);
  return c;
}
function laMauThe(r,g,b){
  var mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn; if(!d||mx<100) return false;
  var h; if(mx===r) h=60*(((g-b)/d)%6); else if(mx===g) h=60*((b-r)/d+2); else h=60*((r-g)/d+4); if(h<0) h+=360;
  return h>=160 && h<=210 && d/mx>0.10;
}
/* màu giống thẻ: sáng, nhạt vừa phải, tông vàng → xanh ngọc (loại vải tím, sọc tối, cây nhựa cam, mặt bàn xám) */
function giongThe(r,g,b){
  var mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn; if(mx<150||!d) return false;
  var s=d/mx; if(s<0.08||s>0.5) return false;
  var h; if(mx===r) h=60*(((g-b)/d)%6); else if(mx===g) h=60*((b-r)/d+2); else h=60*((r-g)/d+4); if(h<0) h+=360;
  return h>=20 && h<=210;
}
function timKhungThe(img){
  var TS=TS_THE, MAX=640, k=Math.min(1, MAX/Math.max(img.width,img.height)), w=Math.round(img.width*k), h=Math.round(img.height*k);
  var c=document.createElement('canvas'); c.width=w; c.height=h; var x=c.getContext('2d'); x.drawImage(quaKhung(img),0,0,w,h);
  var d=x.getImageData(0,0,w,h).data, N=w*h, xam=new Float32Array(N), xanh=new Uint8Array(N), dam=new Uint8Array(N);
  for(var i=0,j=0;j<N;i+=4,j++){ xam[j]=d[i]*.299+d[i+1]*.587+d[i+2]*.114; xanh[j]=laMauThe(d[i],d[i+1],d[i+2])?1:0;
    dam[j]=giongThe(d[i],d[i+1],d[i+2])?1:0; }
  /* neo: ô lưới nhiều điểm màu thẻ → gom các khối đủ lớn */
  var G=Math.max(8, Math.round(Math.max(w,h)/40)), gw=Math.ceil(w/G), gh=Math.ceil(h/G), o=new Float32Array(gw*gh);
  for(var y=0;y<h;y++) for(var xx=0;xx<w;xx++) if(xanh[y*w+xx]) o[((y/G)|0)*gw+((xx/G)|0)]++;
  var co=new Uint8Array(gw*gh), q; for(q=0;q<gw*gh;q++) co[q]=o[q]>G*G*0.08?1:0;
  var gian=new Uint8Array(gw*gh);
  for(var gy=0;gy<gh;gy++) for(var gx=0;gx<gw;gx++){ var v=0;
    for(var a=-1;a<=1&&!v;a++) for(var b=-1;b<=1;b++){ var X=gx+b,Y=gy+a; if(X>=0&&Y>=0&&X<gw&&Y<gh&&co[Y*gw+X]){ v=1; break; } }
    gian[gy*gw+gx]=v; }
  var nh=new Int32Array(gw*gh), so=0, khoi=[];
  for(var s=0;s<gw*gh;s++){ if(!gian[s]||nh[s]) continue; so++; var st=[s], ds=[]; nh[s]=so;
    while(st.length){ var p=st.pop(); ds.push(p); var px=p%gw, py=(p/gw)|0;
      for(var a2=-1;a2<=1;a2++) for(var b2=-1;b2<=1;b2++){ var X2=px+b2,Y2=py+a2; if(X2<0||Y2<0||X2>=gw||Y2>=gh) continue; var q2=Y2*gw+X2; if(gian[q2]&&!nh[q2]){ nh[q2]=so; st.push(q2);} } }
    khoi.push({diem:ds.reduce(function(t,p){ return t+o[p]; },0), ds:ds}); }
  if(!khoi.length) return null;
  var lon=Math.max.apply(null, khoi.map(function(bk){ return bk.diem; }));
  if(lon < N*0.01) return null;                         /* quá ít màu thẻ → không phải CCCD */
  var x0=1e9,y0=1e9,x1=-1,y1=-1;
  khoi.forEach(function(bk){ if(bk.diem<lon*0.15) return; bk.ds.forEach(function(p){ if(!co[p]) return;
    var px=p%gw, py=(p/gw)|0; x0=Math.min(x0,px*G); y0=Math.min(y0,py*G); x1=Math.max(x1,(px+1)*G); y1=Math.max(y1,(py+1)*G); }); });
  var sw=x1-x0, sh=y1-y0, md=Math.max(sw,sh), cx=(x0+x1)/2, cy=(y0+y1)/2;
  /* Sobel cả ảnh */
  var GX=new Float32Array(N), GY=new Float32Array(N);
  for(var y4=1;y4<h-1;y4++) for(var x4=1;x4<w-1;x4++){ var p4=y4*w+x4;
    GX[p4]=(xam[p4-w+1]+2*xam[p4+1]+xam[p4+w+1])-(xam[p4-w-1]+2*xam[p4-1]+xam[p4+w-1]);
    GY[p4]=(xam[p4+w-1]+2*xam[p4+w]+xam[p4+w+1])-(xam[p4-w-1]+2*xam[p4-w]+xam[p4-w+1]); }
  /* Hough theo hướng: ngang y = r + (x-cx)·tan(a); dọc x = r + (y-cy)·tan(a); a trong ±12° */
  var GOC=[]; for(var t=-24;t<=24;t++) GOC.push(t*0.5*Math.PI/180);
  function hough(ngang){
    var dai=ngang?h:w, acc=GOC.map(function(){ return new Float32Array(dai); });
    for(var y5=1;y5<h-1;y5++) for(var x5=1;x5<w-1;x5++){ var p5=y5*w+x5, gx5=GX[p5], gy5=GY[p5], m=Math.abs(gx5)+Math.abs(gy5);
      if(m<50) continue;
      if(ngang ? Math.abs(gy5)<2*Math.abs(gx5) : Math.abs(gx5)<2*Math.abs(gy5)) continue;
      for(var t2=0;t2<GOC.length;t2++){ var tn=Math.tan(GOC[t2]);
        var r = ngang ? Math.round(y5-(x5-cx)*tn) : Math.round(x5-(y5-cy)*tn);
        if(r>=0&&r<dai) acc[t2][r]+=Math.min(m,500); } }
    var dinh=[]; for(var r2=0;r2<dai;r2++){ var bt=0,bv=0; for(var t3=0;t3<GOC.length;t3++) if(acc[t3][r2]>bv){ bv=acc[t3][r2]; bt=t3; } if(bv>0) dinh.push({r:r2, a:GOC[bt], v:bv}); }
    return dinh;
  }
  /* độ tương phản: dải phía trong đường đậm màu thẻ hơn dải phía ngoài → đúng mép thẻ (không phải mép bao nhựa, sọc vải) */
  function tuongPhan1(ngang, L, huong, mask){
    var trong=0, ngoai=0, n=0, tn=Math.tan(L.a), tu=ngang?x0:y0, den=ngang?x1:y1;
    for(var s2=tu; s2<=den; s2+=2){
      for(var dd=2; dd<=6; dd+=2){
        var a1, b1, a3, b3;
        if(ngang){ var yy=L.r+(s2-cx)*tn; a1=s2; b1=Math.round(yy+huong*dd); a3=s2; b3=Math.round(yy-huong*dd); }
        else { var xx2=L.r+(s2-cy)*tn; b1=s2; a1=Math.round(xx2+huong*dd); b3=s2; a3=Math.round(xx2-huong*dd); }
        if(a1<0||b1<0||a1>=w||b1>=h||a3<0||b3<0||a3>=w||b3>=h) continue;
        trong+=mask[b1*w+a1]; ngoai+=mask[b3*w+a3]; n++; } }
    return n ? (trong-ngoai)/n : 0;
  }
  function tuongPhan(ngang, L, huong){ return Math.max(tuongPhan1(ngang, L, huong, xanh), tuongPhan1(ngang, L, huong, dam)); }
  function ungVien(ds, tu, den, ngang, huong){
    var c2=ds.filter(function(p){ return p.r>=tu && p.r<=den; }).sort(function(a3,b3){ return b3.v-a3.v; });
    var chon=[]; c2.forEach(function(p){ if(chon.length<TS.sl && chon.every(function(q3){ return Math.abs(q3.r-p.r)>3; })) chon.push(p); });
    var mx=Math.max.apply(null, chon.map(function(p){ return p.v; }).concat([1]));
    chon.forEach(function(p){ p.tp=tuongPhan(ngang, p, huong); p.d=TS.tp*p.tp + TS.v*p.v/mx; });
    return chon;
  }
  /* ứng viên = gần neo (mép thẻ thường sát vùng màu thẻ) ∪ cả ảnh (neo chỉ phủ một phần thẻ) */
  function gop(a4, b4){ b4.forEach(function(p){ if(a4.every(function(q4){ return Math.abs(q4.r-p.r)>3; })) a4.push(p); }); return a4; }
  var H=hough(true), V=hough(false), mg=md*0.25;
  var T=gop(ungVien(H, y0-mg, y0+sh*0.2, true, 1), ungVien(H, 0, y0+sh*0.2, true, 1));
  var B=gop(ungVien(H, y1-sh*0.2, y1+mg, true, -1), ungVien(H, y1-sh*0.2, h, true, -1));
  var L=gop(ungVien(V, x0-mg, x0+sw*0.2, false, 1), ungVien(V, 0, x0+sw*0.2, false, 1));
  var R=gop(ungVien(V, x1-sw*0.2, x1+mg, false, -1), ungVien(V, x1-sw*0.2, w, false, -1));
  var tot=null, dung=sh>sw*1.1, DO=180/Math.PI;
  T.forEach(function(t1){ B.forEach(function(b1){ L.forEach(function(l1){ R.forEach(function(r1){
    var cao=b1.r-t1.r, rong=r1.r-l1.r; if(cao<10||rong<10) return;
    var tl = dung ? cao/rong : rong/cao;
    var lech=Math.abs(t1.a-b1.a)*DO + Math.abs(l1.a-r1.a)*DO + Math.abs((t1.a+b1.a)/2 + (l1.a+r1.a)/2)*DO;
    var diem=t1.d+b1.d+l1.d+r1.d - TS.tl*Math.abs(tl-1.585)/1.585 - TS.lech*lech;
    if(!tot||diem>tot.diem) tot={diem:diem, t:t1, b:b1, l:l1, r:r1, tl:tl}; }); }); }); });
  if(!tot) return null;
  function giao(Hn, Vd){ var th=Math.tan(Hn.a), tv=Math.tan(Vd.a), yy=Hn.r, xx3=Vd.r;
    for(var it=0;it<20;it++){ xx3=Vd.r+(yy-cy)*tv; yy=Hn.r+(xx3-cx)*th; } return [xx3/k, yy/k]; }
  var tpTB=(tot.t.tp+tot.b.tp+tot.l.tp+tot.r.tp)/4;
  return {goc:[giao(tot.t,tot.l), giao(tot.t,tot.r), giao(tot.b,tot.r), giao(tot.b,tot.l)],
    tin: Math.max(0, Math.min(1, tpTB*2)) * (Math.abs(tot.tl-1.585)<0.1 ? 1 : 0.5)};
}

/* ---- 2. TÌM TỜ GIẤY: vùng sáng lớn nhất (ngưỡng Otsu) → 4 góc theo cực trị x+y, x−y ---- */
function timKhungGiay(img){
  var k=Math.min(1,420/Math.max(img.width,img.height)), w=Math.round(img.width*k), h=Math.round(img.height*k);
  var c=document.createElement('canvas'); c.width=w; c.height=h; var x=c.getContext('2d'); x.drawImage(quaKhung(img),0,0,w,h);
  var d=x.getImageData(0,0,w,h).data, N=w*h, L=new Uint8Array(N), hist=new Float64Array(256), j, t;
  for(var i=0;(j=i/4)<N;i+=4){ L[j]=Math.round(d[i]*.299+d[i+1]*.587+d[i+2]*.114); hist[L[j]]++; }
  var tong=0; for(t=0;t<256;t++) tong+=t*hist[t]; var wB=0,sB=0,tot=0,ng=0;
  for(t=0;t<256;t++){ wB+=hist[t]; if(!wB) continue; var wF=N-wB; if(!wF) break; sB+=t*hist[t];
    var mB=sB/wB, mF=(tong-sB)/wF, v=wB*wF*(mB-mF)*(mB-mF); if(v>tot){ tot=v; ng=t; } }
  var m=new Uint8Array(N); for(j=0;j<N;j++) m[j]=L[j]>ng?1:0;
  var nh=new Int32Array(N), best=null, so=0;
  for(var s=0;s<N;s++){ if(!m[s]||nh[s]) continue; so++; var st=[s], pts=[]; nh[s]=so;
    while(st.length){ var p=st.pop(), px=p%w, py=(p/w)|0; pts.push([px,py]);
      if(px+1<w && m[p+1] && !nh[p+1]){ nh[p+1]=so; st.push(p+1); }
      if(px>0 && m[p-1] && !nh[p-1]){ nh[p-1]=so; st.push(p-1); }
      if(py+1<h && m[p+w] && !nh[p+w]){ nh[p+w]=so; st.push(p+w); }
      if(py>0 && m[p-w] && !nh[p-w]){ nh[p-w]=so; st.push(p-w); } }
    if(!best||pts.length>best.length) best=pts; }
  if(!best || best.length < N*0.12) return null;
  var g=[null,null,null,null];
  best.forEach(function(p){ var a=p[0]+p[1], b=p[0]-p[1];
    if(!g[0]||a<g[0][0]+g[0][1]) g[0]=p; if(!g[2]||a>g[2][0]+g[2][1]) g[2]=p;
    if(!g[1]||b>g[1][0]-g[1][1]) g[1]=p; if(!g[3]||b<g[3][0]-g[3][1]) g[3]=p; });
  /* độ tin: tứ giác chiếm gần hết vùng sáng (giấy là hình chữ nhật) */
  var dt=0; for(var q=0;q<4;q++){ var A=g[q], Bq=g[(q+1)%4]; dt+=A[0]*Bq[1]-Bq[0]*A[1]; } dt=Math.abs(dt)/2;
  var tin = dt ? Math.min(1, best.length/dt) : 0;
  return {goc:g.map(function(p){ return [(p[0]+0.5)/k, (p[1]+0.5)/k]; }), tin: tin>0.9 ? 0.9 : tin*0.8};
}

/* ---- 3. NẮN PHỐI CẢNH ---- */
function heSoPhoiCanh(src, dst){
  var A=[], B=[];
  for(var i=0;i<4;i++){ var x=src[i][0],y=src[i][1],X=dst[i][0],Y=dst[i][1];
    A.push([x,y,1,0,0,0,-X*x,-X*y]); B.push(X); A.push([0,0,0,x,y,1,-Y*x,-Y*y]); B.push(Y); }
  for(var c=0;c<8;c++){ var p=c; for(var r=c+1;r<8;r++) if(Math.abs(A[r][c])>Math.abs(A[p][c])) p=r;
    var t=A[c];A[c]=A[p];A[p]=t; t=B[c];B[c]=B[p];B[p]=t;
    for(var r2=0;r2<8;r2++){ if(r2===c||!A[c][c]) continue; var f=A[r2][c]/A[c][c]; for(var k=c;k<8;k++) A[r2][k]-=f*A[c][k]; B[r2]-=f*B[c]; } }
  return B.map(function(b,i){ return A[i][i] ? b/A[i][i] : 0; }).concat([1]);
}
/* xếp 4 góc theo thứ tự trên-trái, trên-phải, dưới-phải, dưới-trái */
function xepGoc4(g){
  var c=[0,0]; g.forEach(function(p){ c[0]+=p[0]/4; c[1]+=p[1]/4; });
  g = g.slice().sort(function(a,b){ return Math.atan2(a[1]-c[1],a[0]-c[0]) - Math.atan2(b[1]-c[1],b[0]-c[0]); });
  var i0=0; g.forEach(function(p,i){ if(p[0]+p[1] < g[i0][0]+g[i0][1]) i0=i; });
  return [0,1,2,3].map(function(k){ return g[(i0+k)%4]; });
}
function dai2(a,b){ return Math.hypot(a[0]-b[0], a[1]-b[1]); }
/* khổ ảnh ra: thẻ luôn nằm ngang đúng tỉ lệ; giấy gần tỉ lệ A4 thì đúng A4, khác thì giữ tỉ lệ thật */
function khoRa(goc, che){
  var g = xepGoc4(goc), ngang=(dai2(g[0],g[1])+dai2(g[3],g[2]))/2, doc=(dai2(g[0],g[3])+dai2(g[1],g[2]))/2;
  if(che==='the'){
    if(doc>ngang) g=[g[1],g[2],g[3],g[0]];              /* thẻ nằm dọc → xoay cho nằm ngang */
    return {goc:g, rong:KHO_THE.rong, cao:KHO_THE.cao};
  }
  var tl = Math.max(ngang,doc)/Math.max(1,Math.min(ngang,doc)), dai = 1754, ngan = Math.abs(tl-1.414)<0.12 ? 1240 : Math.round(1754/tl);
  return ngang>doc ? {goc:g, rong:dai, cao:ngan} : {goc:g, rong:ngan, cao:dai};
}
function nanPhoiCanh(img, goc, W, H){
  var M = heSoPhoiCanh([[0,0],[W,0],[W,H],[0,H]], goc);   /* đích → nguồn */
  var s = document.createElement('canvas'); s.width=img.width; s.height=img.height; var sx=s.getContext('2d'); sx.drawImage(img,0,0);
  var sd = sx.getImageData(0,0,s.width,s.height).data, sw=s.width, sh=s.height;
  var c = document.createElement('canvas'); c.width=W; c.height=H; var x=c.getContext('2d'), o=x.createImageData(W,H), od=o.data;
  for(var Y=0;Y<H;Y++) for(var X=0;X<W;X++){
    var z=M[6]*X+M[7]*Y+1, u=(M[0]*X+M[1]*Y+M[2])/z, v=(M[3]*X+M[4]*Y+M[5])/z, oi=(Y*W+X)*4;
    var x0=Math.floor(u), y0=Math.floor(v), fx=u-x0, fy=v-y0;
    if(x0<0) { x0=0; fx=0; } if(y0<0) { y0=0; fy=0; } if(x0>=sw-1){ x0=sw-2; fx=1; } if(y0>=sh-1){ y0=sh-2; fy=1; }
    var i00=(y0*sw+x0)*4, i01=i00+4, i10=i00+sw*4, i11=i10+4;
    for(var ch=0;ch<3;ch++) od[oi+ch]=(sd[i00+ch]*(1-fx)+sd[i01+ch]*fx)*(1-fy)+(sd[i10+ch]*(1-fx)+sd[i11+ch]*fx)*fy;
    od[oi+3]=255;
  }
  x.putImageData(o,0,0); return c;
}
function xoayCanvas(c, doXoay){
  doXoay = ((doXoay%360)+360)%360; if(!doXoay) return c;
  var r = document.createElement('canvas'), n = doXoay%180!==0;
  r.width = n ? c.height : c.width; r.height = n ? c.width : c.height;
  var x = r.getContext('2d'); x.translate(r.width/2, r.height/2); x.rotate(doXoay*Math.PI/180); x.drawImage(c, -c.width/2, -c.height/2);
  return r;
}
/* khung mặc định khi không tìm được: thẻ → cắt giữa ảnh đúng tỉ lệ thẻ (như bản cũ); giấy → cả ảnh */
function khungMacDinh(img, che){
  var W=img.width, H=img.height;
  if(che!=='the') return [[0,0],[W,0],[W,H],[0,H]];
  var tl=1.585, doc=H>W, dai=doc?H:W, ngan=doc?W:H, a=dai, b=dai/tl;
  if(b>ngan){ b=ngan; a=ngan*tl; }
  var rw=doc?b:a, rh=doc?a:b, x0=(W-rw)/2, y0=(H-rh)/2;
  return [[x0,y0],[x0+rw,y0],[x0+rw,y0+rh],[x0,y0+rh]];
}

/* ---- 4. HƯỚNG THẺ & MẶT TRƯỚC / SAU ----
   Thẻ có dấu đỏ (mặt trước cả 2 loại, mặt sau thẻ cũ): dấu đỏ luôn ở nửa trên.
   Mặt sau thẻ mới (không đỏ): 3 dòng mã IDVNM… đậm ở dưới cùng.
   Mặt sau: có chip vàng lớn (thẻ cũ) hoặc không có đỏ (thẻ mới). */
function dacTrungThe(c){
  var W=400, H=252, t=document.createElement('canvas'); t.width=W; t.height=H; var x=t.getContext('2d'); x.drawImage(c,0,0,W,H);
  var d=x.getImageData(0,0,W,H).data, f={doT:0,doD:0,toiT:0,toiD:0,vang:0}, n=W*H;
  for(var y=0;y<H;y++) for(var xx=0;xx<W;xx++){ var i=(y*W+xx)*4, r=d[i],g=d[i+1],b=d[i+2], mx=Math.max(r,g,b), mn=Math.min(r,g,b), s=mx?(mx-mn)/mx:0, l=r*.3+g*.59+b*.11, h=0;
    if(mx!==mn){ if(mx===r) h=60*(((g-b)/(mx-mn))%6); else if(mx===g) h=60*((b-r)/(mx-mn)+2); else h=60*((r-g)/(mx-mn)+4); } if(h<0) h+=360;
    if((h<15||h>340)&&s>0.45&&mx>120){ if(y<H/2) f.doT++; else f.doD++; }
    if(xx<W*0.7&&y<H*0.32&&l<80) f.toiT++; if(xx<W*0.7&&y>H*0.68&&l<80) f.toiD++;
    if(h>=28&&h<=50&&s>0.45&&mx>120) f.vang++; }
  for(var k in f) f[k]=f[k]/n*100;
  return f;
}
function huongThe(c){
  var a=dacTrungThe(c), dO=a.doT+a.doD, lat, tin;
  if(dO>=0.3){ lat = a.doD>a.doT; tin = Math.abs(a.doT-a.doD)/dO; }
  else { var b=dacTrungThe(xoayCanvas(c,180)), s1=a.toiD-a.toiT, s2=b.toiD-b.toiT; lat = s2>s1; tin = Math.min(1, Math.abs(s1-s2)); }
  return {lat:lat, tin:tin, mat:(a.vang>1.0 || dO<0.3) ? 'sau' : 'truoc'};
}

/* ---- 5. LỌC LÀM ĐẸP ---- */
/* ước lượng nền sáng từng vùng (khử bóng tay, ánh đèn lệch) — trả mảng RGBA cùng cỡ ảnh */
function nenSang(p, W, H, kenh, oLuoi, phanVi){
  var bw=oLuoi, bh=Math.max(4,Math.round(oLuoi*H/W)), t=document.createElement('canvas'); t.width=bw; t.height=bh;
  var td=t.getContext('2d').createImageData(bw,bh);
  for(var by=0;by<bh;by++) for(var bx=0;bx<bw;bx++){ var arr=[];
    for(var y=Math.floor(by*H/bh);y<Math.floor((by+1)*H/bh);y+=3) for(var x=Math.floor(bx*W/bw);x<Math.floor((bx+1)*W/bw);x+=3){
      var i=(y*W+x)*4; arr.push(kenh<0 ? Math.max(p[i],p[i+1],p[i+2]) : p[i+kenh]); }
    arr.sort(function(a,b){ return a-b; });
    var v=arr[Math.floor(arr.length*phanVi)]||255, k=(by*bw+bx)*4; td.data[k]=td.data[k+1]=td.data[k+2]=v; td.data[k+3]=255; }
  t.getContext('2d').putImageData(td,0,0);
  var to=document.createElement('canvas'); to.width=W; to.height=H; var tx=to.getContext('2d');
  tx.filter='blur('+Math.round(W/60)+'px)'; tx.drawImage(t,0,0,W,H);
  return tx.getImageData(0,0,W,H).data;
}
/* Magic màu (thẻ): khử bóng, kéo tương phản theo phân vị 0,5–99,5%, tươi màu nhẹ, làm nét */
function locMagic(c){
  var W=c.width, H=c.height, x=c.getContext('2d'), im=x.getImageData(0,0,W,H), p=im.data, i, t;
  var bg=nenSang(p, W, H, -1, 24, 0.9);
  for(i=0;i<p.length;i+=4){ var f=235/Math.max(60,bg[i]); p[i]=Math.min(255,p[i]*f); p[i+1]=Math.min(255,p[i+1]*f); p[i+2]=Math.min(255,p[i+2]*f); }
  var hist=new Uint32Array(256), tong=0, lo=0, hi=255, cum=0;
  for(i=0;i<p.length;i+=16){ hist[Math.round((p[i]+p[i+1]+p[i+2])/3)]++; tong++; }
  for(t=0;t<256;t++){ cum+=hist[t]; if(cum>tong*0.005){ lo=t; break; } } cum=0;
  for(t=255;t>=0;t--){ cum+=hist[t]; if(cum>tong*0.005){ hi=t; break; } }
  var he=255/Math.max(40,hi-lo);
  for(i=0;i<p.length;i+=4){
    var r=(p[i]-lo)*he, g=(p[i+1]-lo)*he, b=(p[i+2]-lo)*he, l=(r+g+b)/3;
    p[i]=Math.max(0,Math.min(255,l+(r-l)*1.15)); p[i+1]=Math.max(0,Math.min(255,l+(g-l)*1.15)); p[i+2]=Math.max(0,Math.min(255,l+(b-l)*1.15)); }
  x.putImageData(im,0,0);
  lamNet(c, 0.6);
  return c;
}
function lamNet(c, muc){
  var W=c.width, H=c.height, x=c.getContext('2d'), n=document.createElement('canvas'); n.width=W; n.height=H;
  var nx=n.getContext('2d'); nx.filter='blur(1px)'; nx.drawImage(c,0,0);
  var bl=nx.getImageData(0,0,W,H).data, im=x.getImageData(0,0,W,H), q=im.data;
  for(var i=0;i<q.length;i+=4) for(var k=0;k<3;k++) q[i+k]=Math.max(0,Math.min(255,q[i+k]+(q[i+k]-bl[i+k])*muc));
  x.putImageData(im,0,0);
}
/* Giấy trắng (tài liệu): chia cho nền sáng từng kênh → nền trắng hẳn, khử ám vàng/xám, chữ đậm lại, dấu đỏ giữ màu */
function locGiayTrang(c){
  var W=c.width, H=c.height, x=c.getContext('2d'), im=x.getImageData(0,0,W,H), p=im.data;
  var nen=[nenSang(p,W,H,0,40,0.92), nenSang(p,W,H,1,40,0.92), nenSang(p,W,H,2,40,0.92)];
  for(var i=0;i<p.length;i+=4) for(var k=0;k<3;k++){
    var v=p[i+k]/Math.max(40,nen[k][i]);
    v = v>=0.9 ? 1 : Math.pow(v/0.9, 1.6);
    p[i+k]=Math.round(255*v); }
  x.putImageData(im,0,0);
  return c;
}
function locXam(c, nguon){
  (nguon==='giay' ? locGiayTrang : locMagic)(c);
  var x=c.getContext('2d'), im=x.getImageData(0,0,c.width,c.height), p=im.data;
  for(var i=0;i<p.length;i+=4){ var l=p[i]*.299+p[i+1]*.587+p[i+2]*.114; p[i]=p[i+1]=p[i+2]=l; }
  x.putImageData(im,0,0); return c;
}
function locDenTrang(c){
  locGiayTrang(c);
  var x=c.getContext('2d'), im=x.getImageData(0,0,c.width,c.height), p=im.data;
  for(var i=0;i<p.length;i+=4){ var l=p[i]*.299+p[i+1]*.587+p[i+2]*.114, v=l<165?0:255; p[i]=p[i+1]=p[i+2]=v; }
  x.putImageData(im,0,0); return c;
}
function apLoc(c, kieu, che){
  if(kieu==='magic') return locMagic(c);
  if(kieu==='giay') return locGiayTrang(c);
  if(kieu==='xam') return locXam(c, che==='the'?'magic':'giay');
  if(kieu==='dentrang') return locDenTrang(c);
  return c;
}

/* ---- 6. XỬ LÝ MỘT ẢNH ----
   x = {che:'the'|'tailieu', khung, xoay, xoayTay, loc, mat, tin}
   tuDong = true: tìm khung + hướng lại từ đầu; false: dùng khung/xoay anh đã chỉnh */
function xuLyTuAnh(im, x, tuDong){
  if(tuDong || !x.khung){
    var k = x.che==='the' ? timKhungThe(im) : timKhungGiay(im);
    x.khung = k ? k.goc : khungMacDinh(im, x.che);
    x.tin = k ? k.tin : 0;
  }
  var kr = khoRa(x.khung, x.che), c = nanPhoiCanh(im, kr.goc, kr.rong, kr.cao);
  if(x.che==='the' && !x.xoayTay){ var hg = huongThe(c); x.xoay = hg.lat ? 180 : 0; x.mat = hg.mat; x.tinHuong = hg.tin; }
  c = xoayCanvas(c, x.xoay||0);
  /* 3.41: tự làm thẳng — tài liệu bật sẵn, thẻ bật khi anh bấm 📐 (thẻ đã nắn theo 4 góc nên thường đã thẳng) */
  if(thangBat(x)){
    var ng = doNghieng(c);
    if(x.che!=='the' && !x.xoayTay && !x.xoayTuDong && ng.doc){
      /* tài liệu chụp ngang, chữ nằm dọc → xoay 90° cho chữ đứng (sai chiều thì bấm ⇅) */
      x.xoayTuDong = true; x.xoay = ((x.xoay||0)+90)%360; c = xoayCanvas(c, 90); ng = doNghieng(c);
    }
    x.nghieng = ng.goc;
    if(Math.abs(ng.goc)>=0.3) c = xoayNho(c, -ng.goc);
  }else x.nghieng = 0;
  if(!x.loc) x.loc = locMacDinh(x.che==='the' ? 'the' : 'tailieu');   /* 3.40: kiểu màu mặc định chỉnh ở Cài đặt › Scan */
  apLoc(c, x.loc, x.che);
  return c;
}
/* ảnh trong hàng chờ: đọc ảnh gốc hs_<id>_goc → xử lý → ghi đè hs_<id> */
function xuLyAnhScan(x, tuDong){
  return docAnhHS(x.id+'_goc').then(function(b){
    if(!b) throw new Error('Ảnh gốc không còn');
    return anhTuBlob(b);
  }).then(function(im){
    return canvasRaBlob(xuLyTuAnh(im, x, tuDong), 0.9);
  }).then(function(bl){ x.co = bl.size; return luuAnhHS(x.id, bl); }).then(function(){ return x; });
}
function thangBat(x){ return x.thang!==undefined ? !!x.thang : x.che!=='the'; }
function batThangHang(i){
  var x = HANG[i]; if(!x) return;
  x.thang = !thangBat(x);
  batChay(true);
  xuLyAnhScan(x, false).then(function(){ tatChay(); veAnhHang();
    bao(x.thang ? ('Đã bật tự làm thẳng'+(x.nghieng ? ' · xoay '+(Math.round(x.nghieng*10)/10)+'°' : ' · ảnh vốn đã thẳng')+'.') : 'Đã tắt tự làm thẳng.', 4); })
    .catch(function(e){ tatChay(); baoLoi('Không xử lý lại được: '+(e&&e.message||e)); });
}
/* dò độ nghiêng: điểm tối (chữ, mép) chiếu lên trục vuông góc với dòng — góc nào cho các dòng "dồn" rõ nhất là góc nghiêng.
   Thử −15°…15°, bước 0,5° rồi tinh chỉnh 0,1°. doc = chữ đang nằm dọc (ảnh chụp ngang) */
function doNghieng(c){
  var W = c.width, H = c.height, k = Math.min(1, 700/Math.max(W, H)), w = Math.max(1, Math.round(W*k)), h = Math.max(1, Math.round(H*k));
  var t = document.createElement('canvas'); t.width = w; t.height = h; t.getContext('2d').drawImage(c, 0, 0, w, h);
  var d = t.getContext('2d').getImageData(0, 0, w, h).data, n = w*h, xam = new Uint8Array(n), tong = 0, i;
  for(i=0;i<n;i++){ xam[i] = (d[i*4]*.299 + d[i*4+1]*.587 + d[i*4+2]*.114)|0; tong += xam[i]; }
  var tb = tong/n, bx = Math.round(w*0.04), by = Math.round(h*0.04), px = [], py = [];
  for(var y=by;y<h-by;y++) for(var x=bx;x<w-bx;x++){ if(xam[y*w+x] < tb-45){ px.push(x); py.push(y); } }
  if(px.length<150) return {goc:0, doc:false};
  var buoc = Math.max(1, Math.floor(px.length/40000));
  function diem(a, cot){
    var r = a*Math.PI/180, cs = Math.cos(r), sn = Math.sin(r), bin = new Float32Array(w+h+4), s = 0;
    for(var j=0;j<px.length;j+=buoc){
      var v = cot ? (px[j]*cs + py[j]*sn) : (py[j]*cs - px[j]*sn + w);
      bin[Math.round(v)+2]++;
    }
    for(var q=0;q<bin.length;q++) s += bin[q]*bin[q];
    return s;
  }
  var tot = 0, dTot = -1;
  for(var a=-15;a<=15.001;a+=0.5){ var v = diem(a, false); if(v>dTot){ dTot = v; tot = a; } }
  var goc0 = tot;
  for(var a2=goc0-0.5;a2<=goc0+0.5001;a2+=0.1){ var v2 = diem(a2, false); if(v2>dTot){ dTot = v2; tot = a2; } }
  var cot = 0; for(var a3=-15;a3<=15.001;a3+=1){ var v3 = diem(a3, true); if(v3>cot) cot = v3; }
  return {goc:Math.round(tot*10)/10, doc: cot > dTot*1.25};   /* trang đứng ≈ 0,5 · trang nằm ngang ≈ 2 (đo trên công văn thật) */
}
/* xoay nhỏ quanh tâm, phần góc hở tô màu nền (lấy trung bình 4 góc ảnh) */
function xoayNho(c, deg){
  var W = c.width, H = c.height, x0 = c.getContext('2d'), m = [0,0,0], so = 0;
  [[2,2],[W-8,2],[2,H-8],[W-8,H-8]].forEach(function(p){
    var dd = x0.getImageData(Math.max(0,p[0]), Math.max(0,p[1]), 6, 6).data;
    for(var i=0;i<dd.length;i+=4){ m[0]+=dd[i]; m[1]+=dd[i+1]; m[2]+=dd[i+2]; so++; } });
  var o = document.createElement('canvas'); o.width = W; o.height = H;
  var x = o.getContext('2d');
  x.fillStyle = 'rgb('+Math.round(m[0]/so)+','+Math.round(m[1]/so)+','+Math.round(m[2]/so)+')'; x.fillRect(0, 0, W, H);
  x.translate(W/2, H/2); x.rotate(deg*Math.PI/180); x.drawImage(c, -W/2, -H/2);
  return o;
}
function canXemLai(x){
  if(x.kieu!=='anh' || x.tin===undefined) return false;
  return x.che==='the' ? (x.tin<0.52 || (x.tinHuong!==undefined && x.tinHuong<0.2)) : x.tin<0.5;
}
