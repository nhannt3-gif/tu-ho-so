/* ===== js/31b-mau-in.js — 3.503 (anh duyệt 08/11/2026 "làm đợt tiếp theo, gom 1 lần" — rà soát kiến trúc Đợt 2 mục 4): KHUNG MẪU IN CHUNG `MAU_IN` =====
   Mục đích: mẫu mới (GDX, KH, KTGS VB mới…) chỉ khai PHẦN RIÊNG — số liệu → giá trị ô, HTML bản in, cách điền khuôn Word — phần chung do khung lo:
     · sổ mẫu: MAU_IN.dangKy(ma, {ten, ngang, mg, css, html(g), khuon:[tệp, phần], word(K, g, M), sau(xml)})
     · bản in (hsoTrang — khổ / lề / số trang theo mẫu), hộp xem trước + bộ nút chuẩn In / PDF / Word (xuatHang), mở lại an toàn sau khi đóng (bài học 3.501)
     · khuôn Word dựng từ FILE GỐC (tools/khuon_*.py → js/khuon/<tên>.js ghi MAU_KHUON[tên]) — tải khi cần
     · ghép .docx (styles / settings / font / theme của chính file gốc + chân trang số trang), nhiều bản → ngắt trang
     · điền ô {{KHOA|chấm}}: có giá trị → thay (thêm 1 khoảng trắng khi mẫu gốc để nhãn dính chấm), trống → giữ chấm gốc
   Không đổi mẫu cũ: Hồ sơ (hsoMauGan / HST / nền ô), GDX (GDX_THEM), KTGS khóa (ktDocx) giữ nguyên — dùng khung khi làm mẫu mới / sửa tới.
   Gói 1 không gian tên (QUY_CHUAN mục 13). ===== */
var MAU_KHUON = window.MAU_KHUON || {};
var MAU_IN = {
  so: {},
  /* ---------- sổ mẫu ---------- */
  dangKy: function(ma, M){ M.ma = M.ma || ma; M.k = M.k || ma; MAU_IN.so[ma] = M; return M; },
  lay: function(ma){ var M = MAU_IN.so[ma]; if(!M) throw new Error('Chưa đăng ký mẫu '+ma); return M; },
  /* ---------- bản in HTML: gts = 1 hoặc nhiều bộ giá trị (mỗi bộ 1 bản, khổ / lề theo mẫu) ---------- */
  trang: function(ma, gts, ten){ var M = MAU_IN.lay(ma), ds = Array.isArray(gts) ? gts : [gts];
    var h = hsoTrang(ds.map(function(g){ return {M:M, h:M.html(g)}; }), null, ten || M.ten);
    return M.css ? h.replace('</head>', M.css+'</head>') : h; },
  /* ---------- hộp xem trước: o = {ma, gts, ten, tit, dau (HTML khai báo phía trên), chiXem (chỉ dựng lại bản xem — giữ con trỏ ô đang gõ)} ---------- */
  X: null,
  hop: function(o){
    var M = MAU_IN.lay(o.ma), ten = o.ten || M.ten, trang = MAU_IN.trang(o.ma, o.gts, ten), hop = document.getElementById('hop');
    var mo = !!document.getElementById('mi-khung') && hop && hop.classList.contains('hien') && MAU_IN.X && MAU_IN.X.ma===o.ma;   /* dongHop chỉ ẩn hộp — khung cũ còn trong trang */
    MAU_IN.X = {ma:o.ma, gts:o.gts, ten:ten, trang:trang};
    if(!mo) moHop('<div class="hop-tit">'+(o.tit || coChuHTML(M.ten))+'</div><div id="mi-dau" class="phim-chung"></div><iframe id="mi-khung" class="to-khung" title="Xem trước"></iframe><div id="mi-nut"></div>', true);
    if(!mo || !o.chiXem) document.getElementById('mi-dau').innerHTML = o.dau || '';
    document.getElementById('mi-nut').innerHTML = xuatHang({ten:ten, html:function(){ return MAU_IN.X.trang; }, word:M.word ? 'MAU_IN.wordTai()' : ''});
    xemChuan(document.getElementById('mi-khung'), trang);
  },
  /* ---------- khuôn Word: js/khuon/<tên>.js (ghi MAU_KHUON[tên]) — tải 1 lần khi cần ---------- */
  khuon: function(ten){
    if(MAU_KHUON[ten]) return Promise.resolve(MAU_KHUON[ten]);
    var c = MAU_IN.khuon.cho = MAU_IN.khuon.cho || {};
    if(!c[ten]) c[ten] = new Promise(function(ok, loi){ var s = document.createElement('script'); s.src = 'js/khuon/'+ten+'.js?v='+APP_BAN;
      s.onload = function(){ MAU_KHUON[ten] ? ok(MAU_KHUON[ten]) : loi(new Error('Khuôn '+ten+' rỗng')); };
      s.onerror = function(){ c[ten] = null; s.remove(); loi(new Error('Không tải được khuôn Word '+ten+' (mất mạng?) — thử lại khi có mạng.')); }; document.head.appendChild(s); });
    return c[ten];
  },
  /* ---------- điền ô {{KHOA|chấm}} · {{KHOA~|chấm}} (phần chấm ở run sau: có giá trị thì bỏ) ---------- */
  xml: function(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
  dien: function(x, v){
    var o = {}, re = /\{\{([A-Z0-9]+)\|[^}]*\}\}/g, m, k;
    for(k in v) o[k] = v[k];
    while((m = re.exec(x))){ var s = o[m[1]]; if(s===undefined || s===null || s==='') continue; s = String(s);   /* thêm cách khi mẫu gốc để nhãn dính liền chấm ("Xã……" → "Xã Truông Mít") */
      var tr = x.slice(Math.max(0, m.index-600), m.index), sa = x.slice(m.index+m[0].length, m.index+m[0].length+600);
      tr = tr.slice(Math.max(tr.lastIndexOf('<w:p>'), tr.lastIndexOf('<w:p '), 0)).replace(/<[^>]*>/g, ''); tr = tr.charAt(tr.length-1);
      sa = sa.split('</w:p>')[0].replace(/<[^>]*>/g, '').charAt(0);
      if(/[^\s(\/]/.test(tr) && s.charAt(0)!==' ') s = ' '+s; if(/[A-Za-z0-9\u00C0-\u1EF9(]/.test(sa)) s = s+' '; o[m[1]] = s; }
    return x.replace(/\{\{([A-Z0-9]+)(~?)\|([^}]*)\}\}/g, function(t, k, ng, cham){ var s = o[k], co = !(s===undefined || s===null || s==='');
      if(ng) return co ? '' : cham; return co ? MAU_IN.xml(s).replace(/\n/g, '</w:t><w:br/><w:t xml:space="preserve">') : cham; });
  },
  /* ---------- ghép .docx từ khuôn K (của file gốc) + thân mỗi bản (mảng chuỗi XML body) ---------- */
  chanSo: function(){   /* chân trang: số trang góc dưới phải, cỡ 9, trang 1 không ghi (titlePg) */
    var r = '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:i/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr>';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:fldSimple w:instr=" PAGE ">'+r+'<w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>';
  },
  sect: function(sect){   /* bỏ tham chiếu đầu / chân trang của file gốc (mã rId không còn đúng) → gắn chân trang số trang rIdF1, trang 1 không số */
    sect = String(sect || '<w:sectPr/>').replace(/<w:(header|footer)Reference [^>]*\/>/g, '');
    sect = sect.replace(/<w:sectPr(\s[^>]*)?>/, function(t){ return t+'<w:footerReference w:type="default" r:id="rIdF1"/>'; }).replace(/<w:sectPr(\s[^>]*)?\/>/, '<w:sectPr><w:footerReference w:type="default" r:id="rIdF1"/></w:sectPr>');
    return /<w:titlePg\/>/.test(sect) ? sect : sect.replace('</w:sectPr>', '<w:titlePg/></w:sectPr>');
  },
  docx: function(K, than){
    var ds = Array.isArray(than) ? than : [than], id = 100, enc = function(t){ return new Blob([t], {type:'application/xml'}); };
    var body = ds.length===1 ? ds[0] : ds.map(function(t){ return t.replace(/ w14:(paraId|textId)="[^"]*"/g, '').replace(/<wp:docPr id="\d+"/g, function(){ return '<wp:docPr id="'+(id++)+'"'; }); })
      .join('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    var doc = K.mo+body+MAU_IN.sect(K.sect)+'</w:body></w:document>';
    var ct = 'application/vnd.openxmlformats-officedocument.', P = function(p, t){ return '<Override PartName="/word/'+p+'" ContentType="'+ct+t+'+xml"/>'; };
    var phu = [['footnotes', 'rIdN1', 'footnotes', 'footnotes.xml', 'wordprocessingml.footnotes'], ['endnotes', 'rIdN2', 'endnotes', 'endnotes.xml', 'wordprocessingml.endnotes']].filter(function(x){ return K[x[0]]; });
    var R = phu.map(function(x){ return [x[1], x[2], x[3]]; }).concat([['rIdF1', 'footer', 'footer1.xml'], ['rIdS1', 'styles', 'styles.xml'], ['rIdS2', 'settings', 'settings.xml'], ['rIdS3', 'fontTable', 'fontTable.xml'], ['rIdS4', 'theme', 'theme/theme1.xml']]);
    return taoZip([
      {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+
        P('document.xml', 'wordprocessingml.document.main')+P('styles.xml', 'wordprocessingml.styles')+P('settings.xml', 'wordprocessingml.settings')+P('fontTable.xml', 'wordprocessingml.fontTable')+P('footer1.xml', 'wordprocessingml.footer')+
        phu.map(function(x){ return P(x[3], x[4]); }).join('')+P('theme/theme1.xml', 'theme')+'</Types>')},
      {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
      {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
        R.map(function(r){ return '<Relationship Id="'+r[0]+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/'+r[1]+'" Target="'+r[2]+'"/>'; }).join('')+'</Relationships>')},
      {ten:'word/document.xml', b:enc(doc)}, {ten:'word/footer1.xml', b:enc(MAU_IN.chanSo())},
      {ten:'word/styles.xml', b:enc(K.styles)}, {ten:'word/settings.xml', b:enc(String(K.settings).replace(/<w:(footnotePr|endnotePr)>[\s\S]*?<\/w:\1>/g, phu.length===2 ? '$&' : ''))}, {ten:'word/fontTable.xml', b:enc(K.fontTable)}, {ten:'word/theme/theme1.xml', b:enc(K.theme)}
    ].concat(phu.map(function(x){ return {ten:'word/'+x[3], b:enc(K[x[0]])}; }))).then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
  },
  /* ---------- Word của mẫu ma cho gts (1 hoặc nhiều bản) ---------- */
  word: function(ma, gts){ var M = MAU_IN.lay(ma), ds = Array.isArray(gts) ? gts : [gts];
    return MAU_IN.khuon(M.khuon[0]).then(function(KH){ var K = KH[M.khuon[1]]; return MAU_IN.docx(K, ds.map(function(g){ var x = M.word(K, g, M); return M.sau ? M.sau(x) : x; })); }); },   /* M.sau: xử lý chung của gói sau khi điền (vd KTGS: dòng chấm mịn) */
  wordTai: function(){ var x = MAU_IN.X; if(!x) return; batChay(false, 'Đang tạo Word…');
    MAU_IN.word(x.ma, x.gts).then(function(bl){ tatChay(); giaoFile(bl, x.ten+'.docx'); bao('Đã tạo '+x.ten+'.docx', 5); }, function(er){ tatChay(); baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }
};
