/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1817–2251 của bản 3.234), không đổi logic — 🛡 KTGS — Mẫu 06 gọn, Word (ktDocx), sau giải ngân, dòng hộ chung, bản In / PDF */
/* ---------- 3.138 (anh chốt): Mẫu 06 gọn & nhạt ----------
   chấm / dòng chấm tab không đậm, cỡ nhỏ, xám · kẻ ngang giữa các dòng hộ mảnh, xám (khung, đường dọc, tiêu đề, dòng Cộng giữ 0,5 pt đen) · tiêu đề cột cỡ 11
   "Biện pháp xử lý" 1 dòng rưỡi chấm, "Ngày … tháng … năm" đưa lên nửa phải dòng chấm thứ 2 · chừa chỗ ký · mẫu trắng: Họ tên = Mục đích = Vào việc */
var KT06_LUOI = [397, 1928, 1020, 1134, 737, 737, 1644, 737, 737, 2286, 807, 807, 994, 794, 1117];
var KT06_LUOI_TRANG = [397, 1953, 1020, 1134, 737, 737, 1952, 737, 737, 1953, 807, 807, 994, 794, 1117];   /* tổng 3 cột chữ giữ nguyên → cột tiền không hẹp đi */
function ktChamNhat(xml){   /* Word: run chỉ có chấm / chỉ có tab (dòng chấm tab) → bỏ đậm, xám nhạt */
  var nhat = function(rp){ rp = (rp || '<w:rPr></w:rPr>').replace(/<w:b\/>|<w:bCs\/>|<w:color [^>]*\/>/g, ''); return rp.replace('</w:rPr>', '<w:color w:val="808080"/></w:rPr>'); };
  return String(xml).replace(/<w:r>(<w:rPr>(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr>)?(<w:t xml:space="preserve">[.…  ]{4,}<\/w:t>|<w:tab\/>)<\/w:r>/g, function(m, rp, t){ return '<w:r>'+nhat(rp)+t+'</w:r>'; });
}
function ktKeManh(tr, dau, cuoi){   /* dòng hộ: kẻ trên / dưới mảnh, xám · 3.138.1: dòng đầu (giáp tiêu đề) cạnh trên, dòng cuối (giáp Cộng) cạnh dưới giữ nét đen 0,5 pt */
  return tr.replace(/<w:(top|bottom) w:val="\w+" w:sz="\d+" w:space="0" w:color="\w+"\/>/g, function(m, c){ return (c==='top' && dau) || (c==='bottom' && cuoi) ? '<w:'+c+' w:val="single" w:sz="4" w:space="0" w:color="000000"/>' : '<w:'+c+' w:val="single" w:sz="2" w:space="0" w:color="A6A6A6"/>'; });
}
function ktLuoi06(x, moi){   /* đổi độ rộng cột bảng hộ (tblGrid + tcW theo gridSpan) — chỉ phần bảng hộ */
  x = x.replace(/<w:tblGrid>(?:<w:gridCol w:w="\d+"\/>){15}<\/w:tblGrid>/, '<w:tblGrid>'+moi.map(function(w){ return '<w:gridCol w:w="'+w+'"/>'; }).join('')+'</w:tblGrid>');
  return x.replace(/<w:tr[ >][\s\S]*?<\/w:tr>/g, function(tr){ var c = 0;
    return tr.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ var n = +((tc.match(/<w:gridSpan w:val="(\d+)"/) || [0, 1])[1]), w = 0; for(var i=0;i<n;i++) w += moi[c+i] || 0; c += n;
      return tc.replace(/<w:tcW w:w="\d+" w:type="dxa"\/>/, '<w:tcW w:w="'+w+'" w:type="dxa"/>'); }); });
}
var KT06_SAU = null;
function ktSau06(sau){   /* khuôn phần cuối: Biện pháp 1 dòng rưỡi + ngày lên dòng chấm 2; bỏ dòng trống đầu khối ký (cũ để ngang hàng dòng ngày) */
  if(KT06_SAU && KT06_SAU.goc===sau) return KT06_SAU.ra;
  var x = sau, a = x.indexOf('Biện pháp xử lý:'), p2 = a>=0 ? x.indexOf('<w:p ', a) : -1, e2 = p2>=0 ? x.indexOf('</w:p>', p2)+6 : -1;
  var nd = x.match(/<w:p [^>]*>(?:(?!<w:p[ >])[\s\S])*?Ngày \{\{ND[\s\S]*?<\/w:p>/), r = '<w:rPr><w:i/><w:iCs/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>';
  if(p2>=0 && nd){
    var ngay = (nd[0].match(/Ngày \{\{ND\|[^}]*\}\} tháng \{\{NM\|[^}]*\}\} năm \{\{NY\|[^}]*\}\}/) || ['Ngày {{ND|.........}} tháng {{NM|........}} năm {{NY|..........}}'])[0];
    var dong2 = '<w:p><w:pPr><w:keepNext/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="8600"/><w:tab w:val="center" w:pos="11805"/></w:tabs><w:spacing w:before="20" w:after="0" w:line="320" w:lineRule="exact"/><w:rPr><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:pPr>'+
      '<w:r><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:tab/></w:r><w:r>'+r+'<w:tab/></w:r><w:r>'+r+'<w:t xml:space="preserve">'+ngay+'</w:t></w:r></w:p>';
    x = x.slice(0, p2)+dong2+x.slice(e2);
    x = x.replace(nd[0], '');
    x = x.replace(/(<w:tcW w:w="8926" w:type="dxa"\/><\/w:tcPr>)<w:p><w:pPr><w:spacing w:before="60"\/>(?:(?!<\/w:p>)[\s\S])*?<\/w:p>/, '$1');
    x = x.replace(/(<w:tcW w:w="5758" w:type="dxa"\/>(?:<w:hideMark\/>)?<\/w:tcPr>)/, '$1');
  }
  x = x.replace(/(<w:spacing w:before="20" w:after="0" w:line=")(300|320)(" w:lineRule="exact"\/>)/g, '$1280$3');   /* dòng nhận xét 14 pt (cũ 15–16 pt) */
  var i1 = x.indexOf('Tình hình thực hiện'), i2 = x.indexOf('Biện pháp xử lý:');   /* 3.138.1 (anh chốt): ngắt trang tự nhiên — dòng 1 → hết các dòng giữa không buộc đi liền; "Nhận xét:" đi với dòng 1; Biện pháp + dòng ngày đi với chữ ký */
  if(i1>0 && i2>i1){ var a1 = ktDauP(x, i1), a2 = ktDauP(x, i2); x = x.slice(0, a1)+x.slice(a1, a2).replace(/<w:keepNext\/>/g, '')+x.slice(a2); }
  KT06_SAU = {goc:sau, ra:x}; return x;
}
function ktTieuDe06(x){   /* tiêu đề bảng hộ: chữ cỡ 11; ô cột tiền hẹp (≤ 900) cỡ 10; lề trong ô hẹp lại → bớt 1–2 dòng chiều cao tiêu đề */
  x = x.replace(/w:ascii="Times New Roman Bold" w:hAnsi="Times New Roman Bold"/g, 'w:ascii="Times New Roman" w:hAnsi="Times New Roman"').replace(/<w:spacing w:val="-16"\/>/g, '')   /* tên phông "… Bold" (máy khác ra phông khác) → Times New Roman + đậm */
    .replace(/(<w:tblLayout w:type="fixed"\/>)/, '$1<w:tblCellMar><w:left w:w="45" w:type="dxa"/><w:right w:w="45" w:type="dxa"/></w:tblCellMar>');
  x = x.replace(/<w:sz w:val="24"\/><w:szCs w:val="24"\/>/g, '<w:sz w:val="22"/><w:szCs w:val="22"/>');
  var e = x.indexOf('</w:tr>', x.indexOf('Vào việc')); if(e<0) return x;
  return x.slice(0, e).replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ var w = +((tc.match(/<w:tcW w:w="(\d+)"/) || [0, 9999])[1]); return w<=900 && !/>Stt</.test(tc) ? tc.replace(/<w:sz w:val="22"\/><w:szCs w:val="22"\/>/g, '<w:sz w:val="20"/><w:szCs w:val="20"/>') : tc; })+x.slice(e);
}
function ktChoKy06(x, coTen){   /* không in sẵn tên → chừa 3 dòng trống dưới "(Ký, ghi rõ họ tên)" ở cả 2 khối ký (đủ chỗ ký, không sát mép giấy) */
  if(coTen) return x; var pr = '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="280" w:lineRule="exact"/><w:jc w:val="center"/><w:rPr><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:pPr></w:p>';
  return x.replace(/(\(Ký, ghi rõ họ tên\)<\/w:t><\/w:r><\/w:p>)/g, '$1'+Array(3).join(pr));   /* + 1 dòng trống sẵn của khuôn = 3 dòng ký */
}
function ktDongCo(x){ return ktOGiua(ktOSz(ktDongCo0(x), [3], 20), [3]); }
function ktOGiua(x, ix){ var k = -1; return x.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ k++; if(ix.indexOf(k)<0) return tc;   /* 3.115 (anh chốt): cột Chương trình canh giữa ô (ngang + dọc) */
  tc = tc.replace(/<w:jc w:val="(left|both)"\/>/g, '<w:jc w:val="center"/>'); return /<w:vAlign /.test(tc) ? tc.replace(/<w:vAlign w:val="\w+"\/>/, '<w:vAlign w:val="center"/>') : tc.replace('</w:tcPr>', '<w:vAlign w:val="center"/></w:tcPr>'); }); }   /* 3.111 (anh chốt): cột Chương trình nhỏ hơn 1 cỡ (NSVSMTNT 1 dòng) */
function ktDongCo0(x){ return x.replace(/<w:trHeight [^>]*\/>/g, '<w:trHeight w:val="567" w:hRule="atLeast"/>').replace(/<w:jc w:val="both"\/>/g, '<w:jc w:val="left"/>').replace(/<w:sz w:val="26"\/><w:szCs w:val="26"\/>/g, '<w:sz w:val="22"/><w:szCs w:val="22"/>'); }   /* dòng có số liệu: tối thiểu 1,2 cm (mẫu 0,8 cm) để có chỗ ghi phần kiểm tra thực tế, chữ dài tự xuống dòng; chữ 11 như tiêu đề bảng */
function ktKyTen(x, nhan, ten){   /* 3.115: in tên dưới "(Ký, ghi rõ họ tên)" của khối ký có chữ `nhan` (chừa 3 dòng ký) */
  if(!ten) return x; var a = x.indexOf(nhan); if(a<0) return x; var k = x.indexOf('(Ký, ghi rõ họ tên', a); if(k<0) return x; var e = x.indexOf('</w:p>', k); if(e<0) return x;
  var pr = '<w:pPr><w:jc w:val="center"/></w:pPr>';
  return x.slice(0, e+6)+Array(4).join('<w:p>'+pr+'</w:p>')+'<w:p>'+pr+'<w:r><w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(ten)+'</w:t></w:r></w:p>'+x.slice(e+6);
}
function ktFtrSo(kieu){   /* 3.128: chân trang số trang cỡ nhỏ, góc dưới phải — 'xy' = "Trang x/y" (đếm trong phần = mỗi bản), 'so' = số trang (trang 1 không ghi) */
  var r = function(x){ return '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:i/><w:sz w:val="'+(kieu==='xy' ? 16 : 18)+'"/><w:szCs w:val="'+(kieu==='xy' ? 16 : 18)+'"/></w:rPr>'+x+'</w:r>'; };
  var f = function(ma){ return '<w:fldSimple w:instr=" '+ma+' ">'+r('<w:t>1</w:t>')+'</w:fldSimple>'; };
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:p><w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="0"/></w:pPr>'+
    (kieu==='xy' ? r('<w:t xml:space="preserve">Trang </w:t>')+f('PAGE')+r('<w:t>/</w:t>')+f('SECTIONPAGES') : f('PAGE'))+'</w:p></w:ftr>';
}
function ktSectSo(sect, kieu){   /* 3.128: gắn chân trang số trang (rId11), đánh lại từ 1 mỗi phần; 'so' → trang 1 không số (titlePg) */
  sect = String(sect).replace(/<w:footerReference [^>]*\/>/g, '');
  sect = /<w:headerReference [^>]*\/>/.test(sect) ? sect.replace(/(<w:headerReference [^>]*\/>)(?![\s\S]*<w:headerReference)/, '$1<w:footerReference w:type="default" r:id="rId11"/>') : sect.replace(/<w:sectPr>/, '<w:sectPr><w:footerReference w:type="default" r:id="rId11"/>');
  sect = /<w:pgNumType/.test(sect) ? sect.replace(/<w:pgNumType\b([^>]*?)\s*\/>/, function(m, a){ return '<w:pgNumType'+a.replace(/ w:start="\d+"/, '')+' w:start="1"/>'; })
    : sect.replace(/(<w:cols|<w:formProt|<w:vAlign|<w:noEndnote|<w:titlePg|<w:textDirection|<w:bidi|<w:rtlGutter|<w:docGrid|<\/w:sectPr>)/, '<w:pgNumType w:start="1"/>$1');
  if(kieu==='so' && !/<w:titlePg\/>/.test(sect)) sect = sect.replace(/(<w:textDirection|<w:bidi|<w:rtlGutter|<w:docGrid|<w:printerSettings|<\/w:sectPr>)/, '<w:titlePg/>$1');
  if(kieu==='xy') sect = sect.replace(/ w:footer="\d+"/, ' w:footer="284"');
  return sect;
}
function ktSectLe(sect){ sect = String(sect).replace(/<w:type w:val="[^"]*"\/>/, ''); return sect.replace(/<w:pgSz/, '<w:type w:val="oddPage"/><w:pgSz'); }
function ktDocx(mau, gt){   /* 3.236: tải khuôn trước (giữ cờ in 1 / 2 mặt KT_HAI_EP của lúc gọi) */
  var ep = KT_HAI_EP; return ktKhuon().then(function(){ var cu = KT_HAI_EP; KT_HAI_EP = ep; try { return ktDocxLam(mau, gt); } finally { KT_HAI_EP = cu; } });
}
function ktDocxLam(mau, gt){   /* gt = 1 phiếu, hoặc mảng phiếu (3.93.1: mỗi phiếu sang trang mới, cùng 1 file) */
  var K = mau==='pc' ? KT_KHUON.m01b : KT_KHUON[mau], G = KT_KHUON.chung, enc = function(t){ return new Blob([t], {type:'application/xml'}); };
  var mot = function(g){
    if(mau==='pc') return ktBungPC(g);   /* 3.117: Thông báo phân công Ban Thường vụ */
    if(mau==='m04') return ktGach04(ktBung04(K, g));   /* 3.95 · 3.138: gạch dưới tên đơn vị, canh Trưởng đoàn */
    if(mau==='m01' || mau==='m01b') return ktBung01(K, g);   /* 3.96 · 3.97 khuôn ② */
    if(mau==='m16') return ktKyTen(ktKyTen(ktDien(K.than, Object.assign({KQ1:g.nx ? g.nx.kq1 : '', KQ2:g.nx ? g.nx.kq2 : ''}, (g.b2||[]).reduce(function(o, x, i){ o['B'+(i+1)] = x; return o; }, {}), g.f)).replace('{{@UD}}', function(){ return ktNxDoan(K, 'ud', '1. Ưu điểm', g.nx && g.nx.ud); })
      .replace('{{@TT}}', function(){ return ktNxDoan(K, 'tt', '2. Tồn tại', g.nx && g.nx.tt); }).replace('{{@KN}}', function(){ return ktNxDoan(K, 'kn', '3. Kiến nghị (nếu có)', g.nx && g.nx.kn); }), 'TRƯỞNG ĐOÀN KIỂM TRA', g.f.CB1), 'TỔ TRƯỞNG TỔ', g.f.TT);   /* 3.98: gợi ý nhận xét · 3.115: tên Trưởng đoàn, Tổ trưởng dưới khối ký */
    if(mau!=='m06') return ktDien(K.than, g.f);
    var R = ktDongBu(g.rows), kCuoi = R.length-1; while(kCuoi>0 && R[kCuoi].gop==='tiep') kCuoi--;
    /* 3.98: Đơn vị đã điền → bỏ dòng chấm thứ 2; 4 dòng cán bộ / địa bàn / thời điểm dựng theo tab; dòng cao 1,5 cm; gộp ô theo hộ */
    var tr = ktDien(K.truoc, g.f).replace('{{@DV2}}', g.f.DV ? '' : ktDien(K.dv2, g.f)).replace('{{@CB}}', ktCB06(g.f)), iB = tr.indexOf('PHẦN GHI THEO');
    iB = iB>=0 ? tr.lastIndexOf('<w:tbl>', iB) : -1;
    if(g.trang) tr = tr.replace(/<w:p w14:paraId="4F8507C9"[^>]*><w:pPr>(?:(?!<\/w:pPr>)[\s\S])*<\/w:pPr><\/w:p>/, '').replace(/w:line="320" w:lineRule="exact"/g, 'w:line="280" w:lineRule="exact"');   /* 3.138.1: mẫu trắng chừa khoảng dư cho Word (giữ chú thích cuối trang) — bỏ dòng trống ô Đơn vị, dòng cán bộ 14 pt */
    iB = tr.indexOf('PHẦN GHI THEO'); iB = iB>=0 ? tr.lastIndexOf('<w:tbl>', iB) : -1;
    if(iB>=0){ var bg = ktTieuDe06(tr.slice(iB));   /* 3.138: tiêu đề cột cỡ 11 (cột tiền hẹp cỡ 10) */
      tr = tr.slice(0, iB)+(g.trang ? ktLuoi06(bg, KT06_LUOI_TRANG) : bg); }
    var sau = ktChoKy06(ktKyTen(ktDien(ktCong06(ktSau06(K.sau)), g.f), 'CÁN BỘ KIỂM TRA', g.f.CB1), !!g.f.CB1);   /* 3.140.1: ô số tiền dòng Cộng canh phải */
    if(g.trang) sau = ktLuoi06(sau, KT06_LUOI_TRANG).replace(/<w:sz w:val="26"\/><w:szCs w:val="26"\/>/g, '<w:sz w:val="24"/><w:szCs w:val="24"/>').replace(/(w:line=")280(" w:lineRule="exact")/g, '$1250$2');   /* mẫu trắng: nhận xét cỡ 12 (anh cho phép) để 1 mặt đủ 4 dòng hộ + chỗ ký · 3.138.1: dòng 12,5 pt */
    return tr+
      R.map(function(r, i){ var d = ktDongCo(i>=kCuoi || (R[i+1] && R[i+1].gop==='tiep') ? K.dongKN : K.dong); if(r.gop) d = ktGopO(d, r.gop);   /* 3.117: các dòng của 1 hộ không tách trang; hộ cuối đi liền dòng Cộng + nhận xét + ký */
        var m = {}; m[1] = ktCo06Ten(r.R2); m[3] = ktCo06CT(r.R4); m[6] = ktCo06Md(r.R7); m[4] = r.R5 ? ktCoTien06(r.R5, 737) : 0; m[5] = r.R6 ? ktCoTien06(r.R6, 737) : 0; m[13] = r.R8 ? ktCoTien06(r.R8, 794) : 0; if(m[1] || m[3] || m[6] || m[4] || m[5] || m[13]) d = ktOSz2(d, m);
        d = ktOTien06(d, [4, 5, 13]);   /* 3.140.1 (anh chốt): số tiền canh phải, vừa 1 dòng */
        if(g.trang) d = ktLuoi06(d.replace(/<w:trHeight w:val="567"/, '<w:trHeight w:val="454"'), KT06_LUOI_TRANG);   /* 3.134: mẫu trắng — dòng 0,8 cm · 3.138: 3 cột chữ bằng nhau */   /* 3.128: tên ưu tiên 1 dòng, mục đích tối đa 2 dòng (thu chữ cho vừa) */
        return ktDien(ktKeManh(d, i===0, i===R.length-1), r); }).join('')+sau;   /* 3.115: tên cán bộ kiểm tra dưới khối ký · 3.138: kẻ dòng hộ mảnh, xám */
  };
  var than, le = '', ds = Array.isArray(gt) ? gt : [gt], soK = mau==='m06' ? 'xy' : 'so', sectS = ktSectSo(K.sect, soK);   /* 3.128 (anh chốt): số trang — Mẫu 06 "Trang x/y" mỗi tổ; văn bản khác góc dưới phải từ trang 2 */
  if(ds.length===1) than = mot(ds[0]);
  else {   /* nhiều phiếu: ngắt trang giữa các phiếu; đánh lại id hình (đường kẻ) và bỏ mã đoạn trùng để Word không báo lỗi */
    var id = 100;
    le = ktHaiMat() ? ktSectLe(sectS) : sectS.replace(/<w:type w:val="[^"]*"\/>/, '');   /* 3.124: in 2 mặt → ngắt phần "sang trang lẻ" · 3.128: không in 2 mặt vẫn ngắt phần (mỗi bản đánh số trang riêng) */
    than = ds.map(function(g){ return mot(g).replace(/ w14:(paraId|textId)="[^"]*"/g, '').replace(/<wp:docPr id="\d+"/g, function(){ return '<wp:docPr id="'+(id++)+'"'; }); })
      .join('<w:p><w:pPr>'+le+'</w:pPr></w:p>');
  }
  var lay = function(k){ return K[k]!==undefined ? K[k] : G[k]; };   /* null = khuôn không có phần đó (3.96: 01/KH có chân trang, không có đầu trang / chú thích) */
  var doc = lay('mo')+(mau==='m06' ? ktChamNhat(ktChamMin(than)) : ktChamMin(than))+(le ? le : sectS)+'</w:body></w:document>';   /* 3.138: Mẫu 06 chấm nhạt */   /* 3.124: dòng chấm mịn */
  var ct = 'application/vnd.openxmlformats-officedocument.', P = function(p, t){ return '<Override PartName="/word/'+p+'" ContentType="'+ct+t+'+xml"/>'; };
  var phu = [['header','rId8','header','header1.xml','wordprocessingml.header'], ['endnotes','rId7','endnotes','endnotes.xml','wordprocessingml.endnotes'], ['footnotes','rId6','footnotes','footnotes.xml','wordprocessingml.footnotes'],
    ['footer','rId11','footer','footer1.xml','wordprocessingml.footer']].filter(function(x){ return x[0]==='footer' || lay(x[0]); });   /* 3.128: chân trang số trang luôn có */
  return taoZip([
    {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+
      P('document.xml', 'wordprocessingml.document.main')+P('styles.xml', 'wordprocessingml.styles')+P('settings.xml', 'wordprocessingml.settings')+P('fontTable.xml', 'wordprocessingml.fontTable')+
      phu.map(function(x){ return P(x[3], x[4]); }).join('')+P('theme/theme1.xml', 'theme')+'</Types>')},
    {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
    {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      phu.map(function(x){ return [x[1], x[2], x[3]]; }).concat([['rId3','styles','styles.xml'],['rId4','settings','settings.xml'],['rId9','fontTable','fontTable.xml'],['rId10','theme','theme/theme1.xml']])
        .map(function(r){ return '<Relationship Id="'+r[0]+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/'+r[1]+'" Target="'+r[2]+'"/>'; }).join('')+'</Relationships>')},
    {ten:'word/document.xml', b:enc(doc)},
    {ten:'word/styles.xml', b:enc(lay('styles'))}, {ten:'word/settings.xml', b:enc(lay('settings'))}, {ten:'word/fontTable.xml', b:enc(lay('fontTable'))}, {ten:'word/theme/theme1.xml', b:enc(lay('theme'))}
  ].concat(phu.map(function(x){ return {ten:'word/'+x[3], b:enc(x[0]==='footer' ? ktFtrSo(soK) : lay(x[0]))}; }))).then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
}

/* ---------- 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
   chọn tháng (hoặc từ tháng → đến tháng) → chọn địa bàn (cây Xã → Điểm GD → Hội → Tổ) → 👁 Xem → In / Word.
   - món = mọi lần giải ngân trong tháng ("Giải ngân trong tháng" > 0 ở Mẫu 31 của tháng đó), KỂ CẢ HSSV nhận tiền lần 2 trở đi; chỉ món qua tổ (bỏ vay trực tiếp)
   - mỗi tổ, mỗi tháng 1 phiếu Mẫu 06; chọn đến xã / điểm / hội = mọi tổ trong phạm vi; chọn đến tổ = tích / bỏ tích từng món
   - cột Dư nợ = TỔNG DƯ NỢ của món cuối tháng đó (anh chốt); Tổng số tiền giải ngân = tổng đã giải ngân của món (đúng tên cột mẫu)
   - tháng chưa nạp Mẫu 31 → báo thiếu, không in. 3.98: mỗi tổ 1 phiếu (gom các tháng); không ghi theo dõi đã lập phiếu */
var KT_GN = null, KT_GN_BO = {};   /* KT_GN = {khoa, thang:[…], thieu:[…], ds:{tháng:{mã tổ:{t, mon:[…]}}}} · KT_GN_BO['tháng|KU'] = 1 → anh bỏ tích */
function ktCheDo(){ var c = ktCH().che; return c==='gn' || c==='bc' || c==='kh' || c==='dk' || c==='hdt' ? c : 'dx'; }   /* 3.113: + 'hdt' Khai báo Hội đoàn thể */   /* 3.95: + 'bc' Mẫu 04 · 3.96: + 'kh' Kế hoạch 01/KH */
function ktDoiCheDo(c){ ktCH().che = c; luu(); ktVeThe(); }
function ktCheDoHTML(){ return ktKhoiHTML(ktCheDo()); }   /* 3.329: thanh 3 khối Bắt buộc · Đột xuất · Khai báo (js/56-ktgs-bo.js) thay 6 chip */
function ktThangHS(){   /* các tháng có Mẫu 31 chốt tháng — mới nhất trước · 3.136: + tháng chưa có bản cuối tháng nhưng đã có Mẫu 31 theo ngày */
  var m = {}; KHO.dsBang('hstd').forEach(function(e){ m[slThang(e.ky)] = 1; });
  return Object.keys(m).sort().reverse();
}
function ktGNNgayCua(th){ var c = KHO.chotThang(th); return c && c.tam ? c.ky : ''; }   /* 3.333: qua cửa KHO (trước: đọc SLM) — tháng chưa có Mẫu 31 cuối tháng → Mẫu 31 ngày mới nhất */   /* 3.136: tháng chưa có Mẫu 31 cuối tháng → Mẫu 31 ngày mới nhất */
function ktGNThangChu(k){ var n = ktGNNgayCua(k); return kyVN(k)+(n ? ' (đến '+ngayVNsl(n).slice(0, 5)+' — Mẫu 31 ngày)' : ''); }
function ktGNKhoang(){
  var C = ktCH(), ds = ktThangHS(); if(!ds.length) return [];
  var den = ds.indexOf(C.gnDen)>=0 ? C.gnDen : ds[0], tu = C.gnTu && C.gnTu<=den ? C.gnTu : den, ra = [];
  for(var k = tu; k<=den && ra.length<24; k = kyLui(k, 1)) ra.push(k);
  return ra;
}
function ktGNNap(){
  var ks = ktGNKhoang(), khoa = ks.map(function(th){ return th+(ktGNNgayCua(th) ? '@'+ktGNNgayCua(th) : ''); }).join(',');
  if(KT_GN && KT_GN.khoa===khoa) return Promise.resolve(KT_GN);
  var R = {khoa:khoa, thang:ks, thieu:[], ds:{}, ngay:{}, kh:{}};
  return ks.reduce(function(p, th){ return p.then(function(){   /* 3.333 (bàn giao KTGS mục 3): món GN trong tháng qua cửa KHO.monGN (cùng luật 3.136 / 3.329) */
    return KHO.monGN(th).then(function(m){ if(!m){ R.thieu.push(th); return; } if(m.ngay) R.ngay[th] = m.ngay; R.ds[th] = m.ds; R.kh[th] = m.kh; });
  }); }, Promise.resolve()).then(function(){ KT_GN = R; return R; });
}
function ktGNTrongPV(x){   /* tổ trong phạm vi cây (điểm GD theo cây của kỳ đang mở; tổ không còn trên cây thì xét theo xã / hội) */
  var C = ktCH(), t = (KT_K && KT_K.to[x.t.ma]) || {ma:x.t.ma, xa:x.t.xa, dv:x.t.dv, khoaDiem:''};
  return pvLoc(C, t);
}
function ktGNVe(o){
  var C = ktCH(), ds = ktThangHS();
  if(!ds.length){ o.innerHTML = ktCheDoHTML()+'<div class="rong">Chưa có Mẫu 31 chốt tháng — nạp ở tab con 📥 Nạp &amp; Kiểm tra.</div>'; return; }
  var ks = ktGNKhoang(), opt = function(v){ return ds.slice().reverse().map(function(k){ return '<option value="'+k+'"'+(k===v ? ' selected' : '')+'>'+coChuHTML(ktGNThangChu(k))+'</option>'; }).join(''); };
  o.innerHTML = ktCheDoHTML()+'<div class="kt-gn-dau"><label>Tháng giải ngân: từ <select onchange="ktCH().gnTu=this.value;luu();ktVeThe()">'+opt(ks[0])+'</select></label>'+
    '<label>đến <select onchange="ktCH().gnDen=this.value;if((ktCH().gnTu||\'\')>this.value)ktCH().gnTu=this.value;luu();ktVeThe()">'+opt(ks[ks.length-1])+'</select></label>'+
    '<span class="sl-phu">Phạm vi: <b>'+coChuHTML(pvChu(C, KT_K))+'</b> — chọn ở cây phía trên (đến xã: cả xã · đến tổ: tích từng món)</span></div><div id="kt-gn"><div class="rong">Đang mở Mẫu 31…</div></div>';
  ktGNNap().then(ktGNVeLai)
    .catch(function(er){ var e = document.getElementById('kt-gn'); if(e) e.innerHTML = '<div class="sl-bao do">Chưa mở được Mẫu 31: '+coChuHTML(er && er.message || er)+'</div>'; });
}
function ktGNTo(){   /* 3.328 (anh chốt 23/10): gom nhiều tháng được nhưng 1 tổ × 1 tháng = 1 phiếu Mẫu 06 (trước: mỗi tổ 1 phiếu gom các tháng) */
  var R = KT_GN, thu = []; if(!R) return [];
  R.thang.forEach(function(th){ var D1 = R.ds[th]; if(!D1) return;
    Object.keys(D1).forEach(function(m){ var x = D1[m]; if(!ktGNTrongPV(x)) return;
      var mon = x.mon.slice(); mon.forEach(function(o){ o._th = th; }); ktMaKV(mon); thu.push({x:x, mon:mon, thang:[th], th:th}); }); });
  return thu.sort(function(a, b){ return ((a.x.t.tenXa||'')+'|'+ktKHAp(a.x.t)+'|'+(a.x.t.ten||'')+'|'+a.th).localeCompare((b.x.t.tenXa||'')+'|'+ktKHAp(b.x.t)+'|'+(b.x.t.ten||'')+'|'+b.th, 'vi', {numeric:true}); });
}
function ktGNChon(){   /* [{x, thang, th, mon:[đã tích]}] — 1 tổ × 1 tháng = 1 phiếu */
  return ktGNTo().map(function(p){ return {x:p.x, thang:p.thang, th:p.th, mon:p.mon.filter(function(o){ return !KT_GN_BO[o._th+'|'+o.ku]; })}; }).filter(function(p){ return p.mon.length; });
}
function ktGNHo(p){   /* món của tổ → hộ (theo mã KH); 3.328: lãi tồn / 105 / quá hạn theo Mẫu 31 tháng giải ngân của phiếu (không theo ô Số liệu đầu trang) */
  var KH = (KT_GN && KT_GN.kh && KT_GN.kh[p.th]) || {}, ho = [], g = {};
  p.mon.forEach(function(o){ var h = g[o.kh]; if(!h){ var k = KH[o.kh];
      h = g[o.kh] = {kh:o.kh, ten:o.ten||'', mon:[], lt:k ? k.lt : 0, t105:k ? k.t105 : 0, loai:k ? k.loai : false, gnMon:true, _k:!!k}; ho.push(h); }
    h.mon.push(o); if(!h._k){ h.lt += laiTon(o); if((o.t105||0)>h.t105) h.t105 = o.t105; if((o.qh||0)>0 || (o.kn||0)>0) h.loai = true; } });
  return ho.sort(ktTheoKH);
}
function ktGNNgay(o){ return o.c_ngay_gn_cuoi_cung ? (ngayISOTuVN(o.c_ngay_gn_cuoi_cung) || o.c_ngay_gn_cuoi_cung) : (o.ngn||''); }
function ktGNDsHTML(){
  var C = ktCH(), R = KT_GN, h = '';
  if(R.thieu.length) h += '<div class="sl-bao vang">⚠ Chưa có Mẫu 31 tháng '+R.thieu.map(kyVN).join(', ')+' — tháng này không lập phiếu được.</div>';
  var nds = Object.keys(R.ngay||{}); if(nds.length) h += '<div class="sl-chip-hang">'+nds.map(function(th){ return '<span class="sl-chip vang" title="'+coChuHTML(kyVN(th)+' chưa có Mẫu 31 cuối tháng — lấy món giải ngân đến ngày '+ngayVNsl(R.ngay[th])+' (Mẫu 31 ngày). Khi nạp Mẫu 31 cuối tháng, danh sách tự theo bản cuối tháng.')+'">📌 '+kyVN(th).replace(/\/\d{4}$/, '')+': GN đến '+ngayVNsl(R.ngay[th]).slice(0, 5)+'</span>'; }).join('')+'</div>';   /* 3.136: chỉ trên màn hình · 3.163: thành chip */
  var ds = ktGNTo();
  if(!ds.length) return h+'<div class="rong">Không có món giải ngân trong '+(R.thang.length>1 ? 'các tháng đã chọn' : 'tháng '+kyVN(R.thang[0]))+' ở phạm vi này.</div>';
  var chon = ktGNChon(), soMon = chon.reduce(function(a, p){ return a+p.mon.length; }, 0);
  h += '<div class="kt-nhac30">⏱ Kiểm tra trong 30 ngày kể từ ngày giải ngân (727) — ngày kiểm tra ghi tay trên phiếu.</div>';   /* 3.328 (anh chốt): chỉ nhắc, không chặn */
  h += '<div class="to-the-so"><b>'+chon.length+'</b> phiếu Mẫu 06 (1 tổ × 1 tháng = 1 phiếu'+(R.thang.length>1 ? ', '+R.thang.length+' tháng' : '')+') · <b>'+soMon+'</b> món · tổng giải ngân trong kỳ '+ktTr(chon.reduce(function(a, p){ return a+p.mon.reduce(function(s, o){ return s+(o.gnT||0); }, 0); }, 0))+' tr</div>';
  if(!C.to){
    h += '<div class="to-bang-cuon"><table class="to-bang kt-gn-bang"><thead><tr><th>Tổ (mã)</th><th>Ấp · xã</th><th>Tháng GN</th><th>Số hộ</th><th>Số món</th><th>GN trong kỳ (tr)</th></tr></thead><tbody>'+
      ds.map(function(p){ var x = p.x, nh = {}; p.mon.forEach(function(o){ nh[o.kh] = 1; });
        return '<tr><td class="to-ten"><b>'+coChuHTML(x.t.ten)+'</b> ('+x.t.ma+')</td><td>'+coChuHTML([ktKHAp(x.t), x.t.tenXa].filter(Boolean).join(' · '))+'</td><td>'+p.thang.map(kyVN).join(', ')+'</td><td class="s">'+Object.keys(nh).length+'</td><td class="s">'+p.mon.length+'</td>'+
          '<td class="s">'+ktTr(p.mon.reduce(function(s, o){ return s+(o.gnT||0); }, 0))+'</td></tr>'; }).join('')+'</tbody></table></div>';
  } else ds.forEach(function(p){
    h += '<div class="nhan-nhom">Tổ '+coChuHTML(p.x.t.ten)+' ('+p.x.t.ma+') · '+coChuHTML([ktKHAp(p.x.t), p.x.t.tenXa].filter(Boolean).join(' · '))+' · tháng GN '+p.thang.map(kyVN).join(', ')+'</div>'+
      '<div class="to-bang-cuon"><table class="to-bang kt-bang">'+KT_HO_TH+'<tbody>'+ktGNHo(p).map(function(y, i){
        var bo = y.mon.filter(function(o){ return KT_GN_BO[o._th+'|'+o.ku]; }).length, het = bo===y.mon.length, nhieu = y.mon.length>1;
        return ktHoDongHTML({stt:i+1, h:y, lop:het ? 'kt-loai' : 'kt-co',
          chon:'<input type="checkbox"'+(het ? '' : ' checked')+' onchange="ktGNTichHo(\''+p.x.t.ma+'\',\''+y.kh+'\',this.checked,\''+p.th+'\')" aria-label="Chọn hộ">',
          mon:y.mon.map(function(o){ var k = o._th+'|'+o.ku; return ktMonDong(o, nhieu ? '<input type="checkbox"'+(KT_GN_BO[k] ? '' : ' checked')+' onchange="ktGNTich(\''+k+'\',this.checked)" aria-label="Chọn món"> ' : '',
            ' · GN '+ngayVNsl(ktGNNgay(o))+' ('+ktTr(o.gnT)+' tr)'); }).join(''),
          ghi:ktGhiHo(y, 'Giải ngân '+p.thang.map(kyVN).join(', ')+' — 727: kiểm tra sử dụng vốn trong 30 ngày')}); }).join('')+'</tbody></table></div>'; });
  var xaGN = {}; chon.forEach(function(p){ var t = (KT_K && KT_K.to[p.x.t.ma]) || p.x.t; if(t.xa) xaGN[t.xa] = 1; });
  h += ktKBKhung('gn', ktHoiDsXa(xaGN))+'<div class="hang-nut kt-in"><button class="nho chinh" onclick="ktDocKB();ktGNXem()"'+(chon.length ? '' : ' disabled')+'>👁 Xem '+chon.length+' phiếu Mẫu 06</button><button class="nho" onclick="ktTrang06()" title="Phiếu trống để ghi tay — 1 mặt hoặc 1 tờ 2 mặt">📄 Mẫu 06 trắng</button></div>'+
    '<p class="ghi">Món = mọi lần giải ngân trong các tháng đã chọn theo Mẫu 31 tháng đó (kể cả HSSV nhận tiền lần 2 trở đi), chỉ món qua tổ. Mỗi tổ mỗi tháng giải ngân 1 phiếu; lãi tồn, số dư 105 theo Mẫu 31 tháng giải ngân. Cột Dư nợ trên phiếu = tổng dư nợ của món cuối tháng; Tổng số tiền giải ngân = tổng đã giải ngân của món. '+
      (C.to ? 'Bỏ tích hộ / món không cần lập phiếu.' : 'Chọn đến 1 tổ để tích / bỏ tích từng hộ, từng món.')+'</p>';
  return h;
}
function ktGNVeLai(){ var e = document.getElementById('kt-gn'); if(e) e.innerHTML = ktGNDsHTML(); }
function ktGNTich(k, v){ if(v) delete KT_GN_BO[k]; else KT_GN_BO[k] = 1; ktGNVeLai(); }
function ktGNTichHo(ma, kh, v, th){ ktGNTo().forEach(function(p){ if(p.x.t.ma!==ma || (th && p.th!==th)) return; p.mon.forEach(function(o){ if(o.kh!==kh) return; var k = o._th+'|'+o.ku; if(v) delete KT_GN_BO[k]; else KT_GN_BO[k] = 1; }); }); ktGNVeLai(); }
function ktGNGiaTri(v){   /* mỗi phiếu = 1 tổ: hộ = gom món theo khách */
  return ktGNChon().map(function(p){
    var hs = [], theo = {};
    p.mon.forEach(function(o){ var h = theo[o.kh]; if(!h){ h = theo[o.kh] = {kh:o.kh, ten:o.ten||'', mon:[]}; hs.push(h); } h.mon.push(o); });
    ktMaKV(p.mon);
    var t = (KT_K && KT_K.to[p.x.t.ma]) || p.x.t, g = ktGiaTri06({tenThon:t.tenThon||p.x.t.tenThon, tenXa:t.tenXa||p.x.t.tenXa, ten:t.ten||p.x.t.ten, xa:t.xa||p.x.t.xa, dv:t.dv||p.x.t.dv}, hs, v);
    g.p = p; return g;
  });
}
/* ---------- 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ) ---------- */
var KT_HO_TH = '<thead><tr><th>Chọn</th><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Món vay (mã KV · số KU · CT · dư nợ · ngày GN)</th><th>Lãi tồn (đ)</th><th>Số dư 105 (đ)</th><th>Ghi chú</th></tr></thead>';
function ktMonDong(m, truoc, sau){ var n = m.ngn || m.nv || '';
  return '<div class="kt-mon">'+(truoc||'')+'<b>'+coChuHTML(m._ma||'')+'</b> <small class="kt-ku">KU '+coChuHTML(String(m.ku||''))+'</small> · '+coChuHTML(ctNgan(m.ct, m))+' · '+ktTr(m.dn)+' tr'+(sau!==undefined ? sau : (n ? ' · GN '+ngayVNsl(n) : ''))+'</div>'; }
function ktHoDongHTML(o){ var h = o.h;
  return '<tr class="'+(o.lop||'')+(h.loai ? ' kt-loai' : '')+'"><td class="c">'+o.chon+'</td><td class="c">'+o.stt+'</td><td>'+coChuHTML(h.kh)+'</td><td class="to-ten"><b>'+coChuHTML(h.ten)+'</b></td><td>'+o.mon+'</td>'+
    '<td class="s">'+(h.lt>0 ? '<b class="do">'+tdnTien(h.lt)+'</b>' : '')+'</td><td class="s">'+tdnTien(h.t105||0)+(h.tkChu ? '<div><small>'+coChuHTML(h.tkChu)+'</small></div>' : '')+'</td><td>'+o.ghi+'</td></tr>'; }
function ktGhiHo(h, ly){   /* tình trạng hộ: quá hạn / khoanh, giải ngân < 30 ngày, tốt / cần quan tâm, HSSV, lãi tồn — kèm lý do chọn */
  var b = [];
  if(h.loai) b.push('<span class="kt-nh do">Quá hạn / khoanh — kiểm tra riêng</span>');
  if(h.moi30 && h.moi30.length) b.push('<span class="kt-nh vang">GN dưới 30 ngày — bắt buộc</span>');
  if(!h.loai && h.tot) b.push('<span class="kt-nh xanh">Tốt</span>');
  if(!h.loai && h.xau) b.push('<span class="kt-nh vang">Cần quan tâm</span>');
  if(h.gnMon && h.lt>0) b.push('<span class="kt-nh vang">Lãi tồn</span>');
  if(h.hssv) b.push('<span class="kt-nh">🎓 HSSV</span>');
  return b.join(' ')+(ly ? '<div><small>'+coChuHTML(ly)+'</small></div>' : '');
}
function ktGNKhaiBao(){ ktKhaiBao('m06'); }   /* 3.98: khung khai báo trong tab */
var KT_GN_XEM = null;
function ktGNNk(){ var to = [], kh = [];   /* 3.353: 📜 nhật ký đã lập / in — Mẫu 06 sau giải ngân ghi tổ + hộ của từng phiếu (chỉ đọc, không đổi mẫu) */
  ((KT_GN_XEM && KT_GN_XEM.gts) || []).forEach(function(g){ var p = g.p || {}, t = p.x && p.x.t; if(t && t.ma && to.indexOf(t.ma)<0) to.push(t.ma); (p.mon||[]).forEach(function(o){ if(o.kh && kh.indexOf(o.kh)<0) kh.push(o.kh); }); });
  return {mau:'Mẫu 06/TD — kiểm tra sau giải ngân', to:to, kh:kh, tab:'ktgs'}; }
function ktGNXem(ok){   /* 3.114: hỏi lựa chọn in trước */
  if(!ok){ ktDocKB(); return ktInHop(['m06'], ktInNutXem('ktGNXem(1)'), ktHoiCuaTo(ktGNChon().map(function(p){ return (KT_K && KT_K.to[p.x.t.ma]) || p.x.t; }))); }
  var v = ktInV('m06'), gts = ktGNGiaTri(v); KT_GN_XEM = {v:v, gts:gts};
  var html = ktHTML06(gts);
  moHop('<div class="hop-tit">👁 Xem '+gts.length+' phiếu Mẫu 06 — kiểm tra sau giải ngân</div>'+
    '<iframe id="kt-gn-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({nk:ktGNNk(), truoc:'<button class="nho" onclick="dongHop();ktGNXem()">‹ Đổi lựa chọn in</button>', html:function(){ return ktHTML06(KT_GN_XEM.gts); }, in:'ktGNIn(\'in\')', pdf:'ktGNIn(\'pdf\')', word:'ktGNIn(\'word\')'}), true);   /* 3.152 */
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  var f = document.getElementById('kt-gn-khung'); xemChuan(f, html);
}
function ktGNIn(cach){
  var X = KT_GN_XEM; if(!X || !X.gts.length) return;
  var C = ktCH(), th = KT_GN.thang, ten = 'Mau 06 sau giai ngan '+(th.length>1 ? kyVN(th[0])+' den '+kyVN(th[th.length-1]) : kyVN(th[0])).replace(/\//g, '-')+' - '+boDauTen(pvChu(C, KT_K)).slice(0, 60);
  dongHop();
  if(cach==='word') return ktDocx('m06', X.gts).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+X.gts.length+' phiếu trong '+ten+'.docx (1 tổ × 1 tháng = 1 phiếu, mỗi phiếu 1 trang mới) — chỉ lưu trên máy / Drive của anh.', 7); })
    .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  if(cach==='pdf') return inPDF(ktHTML06(X.gts), ten);   /* 3.152 */
  inBlob(new Blob([ktHTML06(X.gts)], {type:'text/html'}), ten+'.html');
}

/* ---------- bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm ---------- */
function ktC(v, n){ return v ? coChuHTML(v).replace(/\n/g, '<br>') : Array((n||20)+1).join('.'); }
/* 3.124 (anh chốt): dòng chấm mịn — đoạn ……/....... in cỡ ≈ 65% cỡ chữ, thêm chấm theo tỷ lệ cho đủ dài như cũ (Word + bản In, mọi mẫu KTGS) */
var KT_CHAM_TL = 0.65;
function ktChamDai(seg, tl){   /* giữ bề dài: … ≈ 4 dấu chấm (Times New Roman) */
  var e = (seg.match(/…/g) || []).length, d = seg.length-e, u = Math.floor((e*4+d)*tl);
  return e>=d ? new Array(Math.floor(u/4)+1).join('…')+new Array(u%4+1).join('.') : new Array(u+1).join('.');
}
function ktChamMin(xml){   /* Word: tách đoạn chấm (≥ 4) thành run riêng, cỡ nhỏ hơn */
  return String(xml).replace(/<w:r( [^>]*)?>(<w:rPr>(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr>)?<w:t( xml:space="preserve")?>([^<]*)<\/w:t><\/w:r>/g, function(m, at, rp, sp, t){
    if(!/[.…]{4,}/.test(t)) return m; rp = rp || ''; var sz = +((rp.match(/<w:sz w:val="(\d+)"/) || [0, 26])[1]), nho = Math.max(14, Math.round(sz*KT_CHAM_TL));
    var rpN = !rp ? '<w:rPr><w:sz w:val="'+nho+'"/><w:szCs w:val="'+nho+'"/></w:rPr>' : /<w:sz /.test(rp) ? rp.replace(/(<w:sz(?:Cs)? w:val=")\d+"/g, '$1'+nho+'"') :
      rp.replace(/(<w:(?:highlight|u|effect|bdr|shd|fitText|vertAlign|rtl|cs|em|lang|eastAsianLayout|specVanish|oMath)[ \/>])|(<\/w:rPr>)/, function(x){ return '<w:sz w:val="'+nho+'"/><w:szCs w:val="'+nho+'"/>'+x; });
    var r = function(pr, x){ return x ? '<w:r'+(at||'')+'>'+pr+'<w:t xml:space="preserve">'+x+'</w:t></w:r>' : ''; };
    return t.split(/([.…]{4,})/).map(function(x, i){ return i%2 ? r(rpN, ktChamDai(x, sz/nho)) : r(rp, x); }).join('');
  });
}
function ktChamHTML(h){   /* bản In: bọc đoạn chấm trong <span class="kt-cham"> (chỉ phần thân, không đụng CSS) */
  var i = String(h).indexOf('<body'); if(i<0) return h;
  return h.slice(0, i)+h.slice(i).replace(/>([^<>]*)</g, function(m, t){ return /[.…]{4,}/.test(t) ? '>'+t.replace(/[.…]{4,}/g, function(x){ return '<span class="kt-cham">'+ktChamDai(x, 1/KT_CHAM_TL)+'</span>'; })+'<' : m; });
}
var KT_HAI_EP = null;   /* 3.140: ép in 1 mặt / 2 mặt theo từng mẫu (in theo tháng kế hoạch) */
function ktHaiMat(){ if(KT_HAI_EP!==null) return KT_HAI_EP; return D.cauHinh.ktHaiMat!==0; }
function ktMat(h, v){ return String(h).replace('<head>', '<head><meta name="kt-hai-mat" content="'+(v ? 1 : 0)+'">'); }   /* đánh dấu bản In 1 / 2 mặt cho bộ in chuẩn */   /* 3.124 (anh chốt, mặc định bật): in 2 mặt — mỗi bản bắt đầu tờ mới */
var KT_IN_CSS = 'body{margin:0;font-family:"Times New Roman",Times,serif;color:#000}p{margin:0}.kt-p{line-height:1.25}.kt-cham{font-size:65%;letter-spacing:0}'+
  '.kt-dau{width:100%;border-collapse:collapse}.kt-dau td{vertical-align:top;padding:0}.kt-c{text-align:center}.kt-b{font-weight:bold}.kt-i{font-style:italic}'+
  '.kt-gach{border-top:.5pt solid #000;margin:2px auto 0;height:0}.kt-u{text-decoration-thickness:.5pt;text-underline-offset:2.5pt}';
function ktHTML06(gt){ return Array.isArray(gt) ? ktHTML06Goc(gt) : ktChamHTML(ktHTML06Goc(gt)); }   /* 3.124: dòng chấm mịn */
function ktHTML06Goc(gt){
  if(Array.isArray(gt)) return ktGhepTo(gt.map(function(g){ return ktHTML06(g); }), 297, gt.map(function(g, i){ return 'Phiếu '+(i+1)+'/'+gt.length+' · Tổ '+(g.f.TO||'')+(g.f.DB ? ' · '+g.f.DB : ''); }));   /* 3.93.1 · 3.98: xem trước mỗi phiếu 1 tờ */
  var f = gt.f, R = ktDongBu(gt.rows), tg = !!gt.trang, W = tg ? ['12.33%', '12.33%', '12.34%'] : ['12.1%', '10.4%', '14.5%'];   /* 3.138: mẫu trắng — Họ tên = Mục đích = Vào việc */
  var o = function(v, c, n){ return '<td'+(c ? ' class="'+c+'"' : '')+(n>1 ? ' rowspan="'+n+'"' : '')+'>'+(v ? coChuHTML(v) : '')+'</td>'; };
  var hang = R.map(function(r){ var tiep = r.gop==='tiep', n = r.gop ? r.n : 1;   /* 3.98: khách nhiều khế ước → gộp Stt, họ tên, ô ký */
    var sT = ktCo06Ten(r.R2), sM = ktCo06Md(r.R7);
    var oT = function(v, w){ return '<td class="s" style="white-space:nowrap;padding:1pt 1.5pt'+(v ? ';font-size:'+(ktCoTien06(v, w)/2)+'pt' : '')+'">'+(v ? coChuHTML(v) : '')+'</td>'; };   /* 3.140.1: số tiền canh phải, 1 dòng */
    var oS = function(v, c, n, sz){ return '<td'+(c ? ' class="'+c+'"' : '')+(n>1 ? ' rowspan="'+n+'"' : '')+(sz ? ' style="font-size:'+(sz/2)+'pt"' : '')+'>'+(v ? coChuHTML(v) : '')+'</td>'; };   /* 3.128 */
    return '<tr class="kt-h'+(r===R[0] ? ' kt-d1' : '')+(r===R[R.length-1] ? ' kt-dc' : '')+'">'+(tiep ? '' : o(r.R1, 'c', n)+oS(r.R2, '', n, sT))+o(r.R3, 'c')+oS(r.R4, 'c nho giua', 1, ktCo06CT(r.R4))+oT(r.R5, 737)+oT(r.R6, 737)+oS(r.R7, '', 1, sM)+'<td></td><td></td><td></td><td></td><td></td><td></td>'+oT(r.R8, 794)+(tiep ? '' : o('', '', n))+'</tr>'; });   /* 3.111: Nợ lãi, chữ nhỏ 1 cỡ (Chương trình; Họ tên / Mục đích dài) */
  var k = R.length-1; while(k>0 && R[k].gop==='tiep') k--;   /* hộ cuối (cả các dòng gộp) đi liền dòng Cộng */
  var cuoi = hang.slice(k).join(''), than = '';
  for(var i=0;i<k;){ var n = R[i].gop==='dau' ? R[i].n : 1; than += '<tbody class="kt-ho">'+hang.slice(i, i+n).join('')+'</tbody>'; i += n; }   /* 3.117: các dòng của 1 hộ không tách trang */
  return '<!doctype html><html><head><meta charset="utf-8"><title>Mau 06/TD</title><style>@page{size:A4 landscape;margin:10mm 10mm 10mm 12mm}'+KT_IN_CSS+'.kt-ho{break-inside:avoid}'+   /* 3.117: lề trên / dưới 1 cm để 1 mặt chứa thêm 1 hộ */
    'body{font-size:13pt}.kt-bg{width:100%;border-collapse:collapse;font-size:11pt;margin-top:2pt}.kt-bg th,.kt-bg td{border:.5pt solid #000;padding:1pt 3pt;vertical-align:middle}.kt-bg th{font-weight:bold;text-align:center;padding:1pt 1.5pt;line-height:1.1}.kt-bg th.h{font-size:10pt}'+
    '.kt-bg tbody.kt-ho td,.kt-bg tr.kt-h td{border-top:.4pt solid #a6a6a6;border-bottom:.4pt solid #a6a6a6}.kt-bg tr.kt-d1 td{border-top:.5pt solid #000}.kt-bg tr.kt-dc td,.kt-bg tr.kt-dc td[rowspan]{border-bottom:.5pt solid #000}.kt-cham{color:#777}.kt-nx2{display:flex;align-items:baseline;line-height:18pt}.kt-nx2 .kt-ld{flex:0 0 55%;margin-left:0}.kt-nx2 span{flex:1;text-align:center;font-style:italic}'+   /* 3.138: kẻ dòng hộ mảnh xám; chấm nhạt; dòng chấm 2 + ngày */
    '.kt-bg td.c{text-align:center}.kt-bg td.giua{vertical-align:middle}.kt-bg td.s{text-align:right}.kt-bg tbody tr{height:'+(gt.trang ? '22.7pt' : '28.35pt')+';break-inside:avoid}.kt-bg td.nho{font-size:10pt}.kt-dl{display:flex;align-items:baseline;line-height:18pt;white-space:nowrap}.kt-dl>span{display:flex;align-items:baseline;overflow:hidden}.kt-ld{flex:1;border-bottom:.5pt dotted #777;min-width:4mm;margin-left:1pt;margin-right:4pt}.kt-bg td{word-break:break-word}.kt-bg thead{display:table-header-group}.kt-giu{break-inside:avoid}.kt-bg td.kt-nx,.kt-bg .kt-dau td{border:0}</style></head><body>'+
    '<table class="kt-dau"><tr><td style="width:27%"><p><b>Đơn vị kiểm tra:</b> '+ktC(f.DV, 32)+'</p>'+(f.DV ? '' : '<p>'+Array(62).join('.')+'</p>')+'</td>'+
    '<td style="width:47%" class="kt-c"><p class="kt-b">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="kt-b">Độc lập - Tự do - Hạnh phúc</p><div class="kt-gach" style="width:52mm"></div><p class="kt-b" style="font-size:15pt;margin-top:13pt">PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY</p></td>'+
    '<td style="width:26%;font-size:10pt;text-align:right"><p class="kt-b">Mẫu số 06/TD</p><p>Lập 02 liên:</p><p class="kt-i">- 01 liên chính lưu NH;</p><p class="kt-i">- 01 liên phô tô lưu Đ.v k.tra.</p></td></tr></table>'+
    ktCB06HTML(f)+
    '<table class="kt-bg"><thead><tr><th colspan="7">PHẦN GHI THEO HỒ SƠ CHO VAY</th><th colspan="8">PHẦN KIỂM TRA THỰC TẾ TẠI KHÁCH HÀNG</th></tr>'+
    '<tr><th rowspan="2" style="width:2.5%">Stt</th><th rowspan="2" style="width:'+W[0]+'">Họ và tên<br>người vay</th><th rowspan="2" style="width:6.4%">Mã khoản vay</th><th rowspan="2" style="width:7.1%">Chương trình cho vay</th><th rowspan="2" class="h" style="width:4.6%">Tổng số tiền giải ngân</th><th rowspan="2" class="h" style="width:4.6%">Dư nợ đến ngày kiểm tra</th><th rowspan="2" style="width:'+W[1]+'">Mục đích sử dụng vốn vay</th>'+
    '<th rowspan="2" class="h" style="width:4.6%">Tổng số tiền<br>thực nhận</th><th rowspan="2" class="h" style="width:4.6%">Dư nợ đến ngày kiểm tra</th><th colspan="3">Thực tế sử dụng</th><th rowspan="2" style="width:6.2%">Hiệu<br>quả đầu tư</th><th rowspan="2" style="width:5%">Nợ lãi</th><th rowspan="2" style="width:7%">Ký xác nhận của người vay</th></tr>'+
    '<tr><th style="width:'+W[2]+'">Vào việc</th><th class="h" style="width:5.1%">Số tiền sử dụng đúng mục đích</th><th class="h" style="width:5.1%">Số tiền sử dụng sai mục đích</th></tr></thead>'+   /* 3.128 (anh chốt theo mẫu chuẩn): cột như khuôn Word */   /* 3.111: thu hẹp cột số tiền thực tế, nới Vào việc, Chương trình, cột tổng */   /* 3.98: cột theo khuôn Word mới (Mục đích rộng) */
    than+'<tbody class="kt-giu">'+cuoi+'<tr style="height:22pt"><td></td><td class="c kt-b">Cộng</td>'+['','',f.TGN,f.TDN].map(function(v, i){ return '<td class="'+(i>1 ? 's kt-b' : '')+'" style="border:.5pt solid #000'+(i>1 ? ';white-space:nowrap;padding:1pt 1.5pt;font-size:'+((+f[i===2 ? 'SZTGN' : 'SZTDN']||22)/2)+'pt' : '')+'">'+(v ? coChuHTML(v) : '')+'</td>'; }).join('')+Array(8).join('<td style="border:.5pt solid #000"></td>')+'<td class="s kt-b" style="border:.5pt solid #000;white-space:nowrap;padding:1pt 1.5pt;font-size:'+((+f.SZTNL||22)/2)+'pt">'+(f.TNL ? coChuHTML(f.TNL) : '')+'</td><td style="border:.5pt solid #000"></td></tr>'+
    '</tbody></table><div class="kt-nxk" style="padding:4pt 0 0;font-size:'+(tg ? '12pt' : '13pt')+'"><div class="kt-giu"><p class="kt-b">Nhận xét: </p><p class="kt-dl">1. Tình hình thực hiện phương án vay vốn&nbsp;<i class="kt-ld"></i></p></div>'+   /* 3.138.1 (anh chốt): nhận xét ra ngoài bảng → dòng nào dư mới sang trang; "Nhận xét:" đi với dòng 1 */
    '<p>2. Kiểm tra, đối chiếu thực tế được ..................... khách hàng, số tiền ....................................... đồng. Trong đó:</p>'+
    '<p>- Số khách hàng sử dụng vốn vay đúng mục đích: ............. khách hàng, số tiền:.......................... đồng, tỷ trọng: ......... %.</p>'+
    '<p>- Số khách hàng sử dụng vốn vay sai mục đích: ................ khách hàng, số tiền:........................... đồng, tỷ trọng: ......... %.</p>'+
    '<div class="kt-giu"><p class="kt-dl"><b>Biện pháp xử lý:</b>&nbsp;<i class="kt-ld"></i></p><p class="kt-nx2"><i class="kt-ld" style="height:14pt"></i><span>Ngày '+ktC(f.ND, 9)+' tháng '+ktC(f.NM, 8)+' năm '+ktC(f.NY, 10)+'</span></p>'+   /* 3.138 (anh chốt): 1 dòng rưỡi chấm, ngày đưa lên nửa phải dòng 2 */
    '<table class="kt-dau" style="margin-top:2pt"><tr><td class="kt-c" style="width:50%;vertical-align:top"><p class="kt-b">CÁN BỘ CHỨNG KIẾN <span style="font-weight:normal">(nếu có)</span></p><p class="kt-i">(Ký, ghi rõ họ tên)</p>'+(f.CB1 ? '' : '<div style="height:40pt"></div>')+'</td>'+
    '<td class="kt-c" style="vertical-align:top"><p class="kt-b">CÁN BỘ KIỂM TRA</p><p class="kt-i">(Ký, ghi rõ họ tên)</p>'+(f.CB1 ? '<p class="kt-b" style="margin-top:42pt">'+coChuHTML(f.CB1)+'</p>' : '')+'</td></tr></table></div></div>'+   /* Biện pháp + dòng ngày + chữ ký đi liền */   /* chừa chỗ ký (không sát mép giấy) */
    '</body></html>';
}
/* 3.134 (anh chốt): Mẫu 06 trắng để ghi tay — dòng hộ 0,8 cm (1 hộ có thể ghi 2 dòng); in 1 mặt: đủ phiếu trên 1 mặt; in 2 mặt: 1 tờ — mặt trước đầu phiếu + bảng, mặt sau bảng tiếp + nhận xét + ký */
var KT_TRANG06 = {mot:4, hai:21};   /* số dòng hộ vừa đúng (đo bằng bộ in chuẩn, A4 ngang) */
function ktTrang06GT(kieu){ return {f:{}, trang:1, rows:Array.apply(null, Array(KT_TRANG06[kieu])).map(function(){ return {}; })}; }
var KT_TRANG06_KIEU = 'mot';
function ktTrang06(kieu){
  KT_TRANG06_KIEU = kieu || (ktHaiMat() ? 'hai' : 'mot');
  var nut = function(k, chu){ return '<button class="nho'+(KT_TRANG06_KIEU===k ? ' chinh' : '')+'" onclick="ktTrang06(\''+k+'\')">'+chu+'</button>'; };
  moHop('<div class="hop-tit">📄 Mẫu 06 trắng — ghi tay</div><div class="hang-nut">'+nut('mot', 'In 1 mặt ('+KT_TRANG06.mot+' dòng hộ)')+nut('hai', 'In 2 mặt — 1 tờ ('+KT_TRANG06.hai+' dòng hộ)')+'</div>'+
    '<div class="hop-phu">Dòng hộ cao 0,8 cm — hộ nhiều món hoặc ghi dài thì dùng 2 dòng. Đầu phiếu để chấm ghi tay.</div><iframe id="kt-trang-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({html:function(){ return ktHTML06(ktTrang06GT(KT_TRANG06_KIEU)); }, in:'ktTrang06Xuat(\'in\')', pdf:'ktTrang06Xuat(\'pdf\')', word:'ktTrang06Xuat(\'word\')'}), true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  xemChuan(document.getElementById('kt-trang-khung'), ktHTML06(ktTrang06GT(KT_TRANG06_KIEU)));
}
function ktTrang06Xuat(cach){
  var gt = ktTrang06GT(KT_TRANG06_KIEU), ten = 'Mau 06 trang - '+(KT_TRANG06_KIEU==='hai' ? '2 mat' : '1 mat');
  if(cach==='word') return ktDocx('m06', gt).then(function(b){ giaoFile(b, ten+'.docx'); });
  if(cach==='pdf') return inPDF(ktHTML06(gt), ten.replace(/ - /g, '_').replace(/\s+/g, ''));   /* 3.152 */
  inBlob(new Blob([ktHTML06(gt)], {type:'text/html'}), ten+'.html');
}
function ktCB06HTML(f){   /* 3.98: bản In — 4 dòng đầu như Word: cột Ông (bà) / Chức vụ / Tổ TK&VV cố định; trống = chấm, có chữ = khoảng trắng */
  var mm = function(tw){ return (tw/567*10).toFixed(1)+'mm'; }, T = KT_TAB06;
  var o = function(chu, gt, w, cham){ return '<span style="'+(w ? 'width:'+w : 'flex:1')+'">'+chu+(gt ? coChuHTML(gt) : '')+(cham && !gt ? '<i class="kt-ld"></i>' : '')+'</span>'; };
  var t0 = ktTab0(), cb = function(so, ten, cv){ return '<div class="kt-dl"><span style="width:'+mm(t0)+'">'+(so==='1' ? 'Họ và tên cán bộ kiểm tra:' : '')+'</span>'+o(so+'. Ông (bà):&nbsp;', ten, mm(T[1]-t0), 1)+o('Chức vụ:&nbsp;', ktCVGon(cv, KT_TAB06[3]-KT_TAB06[1], 26), '', 1)+'</div>'; };
  var d3 = ktDong3_06(f), to = o('Tổ TK&amp;VV:&nbsp;', f.TO, '', 1);   /* 3.111: theo mẫu gốc — Thời điểm · Địa bàn · Tổ TK&VV; Đơn vị tính dòng riêng */
  return '<div style="margin-top:6pt">'+cb('1', f.CB1, f.CV1)+cb('2', f.CB2, f.CV2)+
    (d3.mot ? '<div class="kt-dl">'+o('Thời điểm kiểm tra:&nbsp;', f.TD, mm(d3.a), 1)+o('Địa bàn kiểm tra:&nbsp;', d3.db, mm(d3.b-d3.a), 1)+to+'</div>'
      : '<div class="kt-dl">'+o('Thời điểm kiểm tra:&nbsp;', f.TD, mm(d3.a), 1)+o('Địa bàn kiểm tra:&nbsp;', f.DB, '', 1)+'</div><div class="kt-dl"><span style="width:'+mm(T[2])+'"></span>'+to+'</div>')+
    '<div class="kt-dl"><span style="flex:1;justify-content:flex-end;font-style:italic;font-size:12pt">Đơn vị tính: triệu đồng</span></div></div>';
}
var KT_TO_CSS = '@media screen{html{background:#8d939b}body{margin:0;padding:10px 6px}.kt-to{background:#fff;margin:0 auto 16px;padding:10mm 12mm;box-shadow:0 2px 6px rgba(0,0,0,.45);box-sizing:border-box}.kt-to-nhan{font:bold 12px Arial,sans-serif;color:#1a5fb4;margin:-6mm 0 4mm;border-bottom:1px solid #ccd;padding-bottom:2px}}@media print{.kt-to-nhan{display:none}}';
function ktGhepTo(ds, rong, nhan){   /* 3.98: nhiều phiếu / biên bản / báo cáo → 1 tài liệu, mỗi bản sang trang mới khi in; trên màn hình mỗi bản là 1 tờ riêng có nhãn (không còn nối đuôi).
     Bản khác loại (Kế hoạch + Mẫu 04): gom CSS của các loại (bản đầu quyết định khổ giấy), cỡ chữ gốc giữ theo từng bản */
  var css = [], co = ds.map(function(h){ var st = (h.match(/<style>([\s\S]*?)<\/style>/) || [0, ''])[1], m = st.match(/body\{font-size:([\d.]+pt)/); if(css.indexOf(st)<0) css.push(st); return m ? m[1] : ''; });
  return ds[0].replace(/<style>[\s\S]*?<\/style>/, function(){ return '<style>'+css.slice().reverse().join('')+KT_TO_CSS+'@media screen{.kt-to{max-width:'+rong+'mm}}</style>'; }).replace(/<body>[\s\S]*<\/body>/, function(){ return '<body>'+ds.map(function(h, i){
    return '<div class="kt-to" style="'+(co[i] ? 'font-size:'+co[i]+';' : '')+(i ? 'break-before:page' : '')+'"><div class="kt-to-nhan">'+coChuHTML(nhan[i]||'')+'</div>'+h.replace(/^[\s\S]*<body>|<\/body>[\s\S]*$/g, '')+'</div>'; }).join('')+'</body>'; });
}
function ktCB16HTML(ten, cv){   /* 3.98: Mẫu 16 bản In — "Chức vụ" thẳng cột (như tab Word: 10,5 cm từ lề) */
  var o = function(chu, gt, w){ return '<span style="'+(w ? 'width:'+w : 'flex:1')+'">'+chu+(gt ? coChuHTML(gt) : '<i class="kt-ld"></i>')+'</span>'; };
  return '<div class="kt-dl">'+o('- Ông (bà):&nbsp;', ten, '95mm')+o('Chức vụ:&nbsp;', cv, '')+'</div>';
}
function ktHTML16(gt){ return Array.isArray(gt) ? ktHTML16Goc(gt) : ktChamHTML(ktHTML16Goc(gt)); }   /* 3.124: dòng chấm mịn */
function ktHTML16Goc(gt){
  if(Array.isArray(gt)) return ktGhepTo(gt.map(function(g){ return ktHTML16(g); }), 210, gt.map(function(g, i){ return 'Biên bản '+(i+1)+'/'+gt.length+' · Tổ '+(g.f.TT||''); }));   /* 3.97 · 3.98 */
  var f = gt.f, nx = gt.nx || {}, B = gt.b2 || [], hang = function(nd, b, kq){ return '<tr><td'+(b ? ' class="kt-b"' : '')+'>'+nd+'</td><td class="kt-c">'+(kq ? coChuHTML(kq) : '')+'</td></tr>'; };
  var muc3 = function(nhan, ds, n1, n2){ return ds && ds.length ? '<p class="kt-p"><b>'+nhan+':</b></p>'+ds.map(function(x){ return '<p class="kt-p">- '+coChuHTML(x)+'</p>'; }).join('')+'<p>'+Array(n2).join('.')+'</p>' : '<p class="kt-p"><b>'+nhan+':</b> '+Array(n1).join('.')+'</p><p>'+Array(n2).join('.')+'</p>'; };
  var bang = function(ds){ return '<table class="kt-bg"><thead><tr><th style="width:62%">Nội dung</th><th>Kết quả kiểm tra</th></tr></thead><tbody>'+ds.map(function(x){ return hang(x[0], x[1], x[2]); }).join('')+'</tbody></table>'; };
  return '<!doctype html><html><head><meta charset="utf-8"><title>Mau 16/TD</title><style>@page{size:A4;margin:15mm 20mm 15mm 27.5mm}'+KT_IN_CSS+
    'body{font-size:13pt}.kt-dl{display:flex;align-items:baseline;white-space:nowrap;margin:2pt 0;padding-left:10mm}.kt-dl>span{display:flex;align-items:baseline;overflow:hidden}.kt-ld{flex:1;border-bottom:.5pt dotted #555;min-width:4mm;margin-left:1pt;margin-right:4pt}.kt-p{text-align:justify;text-indent:10mm;margin:2pt 0}.kt-bg{width:100%;border-collapse:collapse;font-size:12.5pt;margin:3pt 0}.kt-bg th,.kt-bg td{border:.5pt solid #000;padding:1pt 4pt;vertical-align:top}.kt-bg tr{break-inside:avoid}.kt-bg thead{display:table-header-group}.kt-giu{break-inside:avoid}</style></head><body>'+
    '<p class="kt-b kt-i" style="text-align:right;font-size:12pt">Mẫu số 16/TD</p>'+
    '<table class="kt-dau"><tr><td class="kt-c" style="width:40%">'+(f.DV0 ? '<p class="kt-b" style="font-size:13pt">'+coChuHTML(f.DV0)+(String(f.DVA||'').trim() ? '<br>'+coChuHTML(f.DVA) : '')+'</p>'   /* 3.118: có tên đơn vị → bỏ dòng "ĐƠN VỊ KIỂM TRA" */
      : '<p class="kt-b" style="font-size:13pt">ĐƠN VỊ KIỂM TRA</p><p class="kt-b">'+Array(41).join('.')+'</p>')+'<div class="kt-gach" style="width:30mm"></div></td>'+
    '<td class="kt-c"><p class="kt-b" style="font-size:13pt">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="kt-b">Độc lập - Tự do - Hạnh phúc</p><div class="kt-gach" style="width:56mm"></div></td></tr></table>'+
    '<p class="kt-c kt-b" style="margin-top:14pt;font-size:13.5pt">BIÊN BẢN KIỂM TRA</p><p class="kt-c kt-b">Hoạt động của Tổ Tiết kiệm và vay vốn</p><div class="kt-gach" style="width:40mm;margin-bottom:8pt"></div>'+
    '<p class="kt-p">Hôm nay, ngày '+ktC(f.ND, 4)+' tháng '+ktC(f.NM, 3)+' năm 20'+ktC(f.NY, 4)+', tại Tổ Tiết kiệm và vay vốn (Tổ) '+(f.CAPA || 'thôn/tổ dân phố')+' '+ktC(f.THON, 22)+', '+(f.CAPX || 'xã/phường/đặc khu')+' '+ktC(f.XA, 28)+', '+(f.CAPT || 'tỉnh/thành phố')+' '+ktC(f.TINH, 22)+', chúng tôi gồm:</p>'+
    '<p class="kt-p"><b>ĐOÀN KIỂM TRA:</b> '+ktC(f.DOAN, 90)+'</p>'+
    ktCB16HTML(f.CB1, f.CV1)+ktCB16HTML(f.CB2, f.CV2)+
    '<p class="kt-p"><b>ĐƠN VỊ ĐƯỢC KIỂM TRA:</b> Tổ thuộc '+(f.HOI ? coChuHTML(f.HOI) : 'Hội '+Array(54).join('.'))+'</p>'+
    ktCB16HTML(f.TT, 'Tổ trưởng')+ktCB16HTML('', '')+
    '<p class="kt-p">Cùng tiến hành kiểm tra việc thực hiện Hợp đồng ủy nhiệm của Tổ đã ký với NHCSXH, thống nhất kết quả kiểm tra như sau:</p>'+
    '<p class="kt-p kt-b">I. TÌNH HÌNH CHUNG CỦA TỔ <span style="font-weight:normal">(đến thời điểm '+ktC(f.SD, 6)+'/'+ktC(f.SM, 6)+'/20'+ktC(f.SY, 5)+')</span></p>'+
    '<p class="kt-p">1. Tổng dư nợ của Tổ: '+ktC(f.DN, 19)+' triệu đồng, '+ktC(f.STV, 3)+' tổ viên. Trong đó, nợ quá hạn '+ktC(f.QH, 15)+' triệu đồng (tỷ lệ '+ktC(f.TLQH, 7)+'%), nợ khoanh '+ktC(f.KN, 15)+' triệu đồng (tỷ lệ '+ktC(f.TLKN, 5)+'%)</p>'+
    '<p class="kt-p">2. Tổng lãi tồn của Tổ: '+ktC(f.LT, 21)+' triệu đồng.</p><p class="kt-p">3. Số dư tiền gửi của Tổ: '+ktC(f.TG, 17)+' triệu đồng.</p>'+
    '<p class="kt-p">4. Kết quả chấm điểm xếp loại Tổ (tháng '+ktC(f.XM, 5)+'/20'+ktC(f.XY, 3)+'): '+ktC(f.XL, 42)+'</p>'+
    '<p class="kt-p kt-b">II. HOẠT ĐỘNG CỦA TỔ VÀ BAN QUẢN LÝ TỔ</p>'+
    '<p class="kt-p">Đoàn/cán bộ kiểm tra thực hiện kiểm tra theo nội dung kiểm tra, giám sát tại khoản 3 Phụ lục I văn bản số 727/HD-NHCS ngày 11/02/2026 hướng dẫn phương pháp, quy trình kiểm tra, giám sát hoạt động ủy thác. Cụ thể:</p>'+
    bang([['1. Thành lập Tổ', 1], ['- Tổ có được thành lập theo cụm dân cư liền kề?', 0, B[0]], ['- Số lượng đảm bảo quy định (từ 05 đến 60 tổ viên)', 0, nx.kq1], ['2. Ban quản lý Tổ', 1], ['- Ban quản lý Tổ gồm mấy người? Phân công nhiệm vụ Tổ trưởng, Tổ phó?', 0, B[1]],
      ['- Tổ trưởng, Tổ phó có mối quan hệ vợ, chồng, cha, mẹ, con hoặc anh, chị, em ruột?', 0, B[2]], ['- Ban quản lý Tổ có tham gia Ban Thường vụ tổ chức CT-XH cấp xã?', 0, B[3]], ['- Ban quản lý Tổ có kiêm Tổ trưởng Tổ vay vốn của ngân hàng khác?', 0, B[4]]])+
    bang([['3. Thực hiện nhiệm vụ của Ban quản lý Tổ', 1], ['- Duy trì sinh hoạt Tổ định kỳ như thế nào (địa điểm, thời gian theo tháng/quý,….)?', 0, B[5]], ['- Tuyên truyền, phổ biến chính sách đến tổ viên? Vận động tổ viên thực hành tiết kiệm như thế nào?', 0, B[6]],
      ['- Tiếp nhận đề nghị vay vốn, tổ chức họp bình xét cho vay? Thành phần tham dự họp có đầy đủ?', 0, B[7]], ['- Tham gia giao dịch, chứng kiến giải ngân, thu nợ, họp giao ban tại điểm giao dịch?', 0, B[8]], ['- Có thu phí, thu nợ gốc, vay ké, chiếm dụng vốn, giữ sổ vay vốn của tổ viên?', 0, B[9]],
      ['- Trường hợp được ủy nhiệm thu lãi, có trả biên lai cho tổ viên sau khi thu tiền? Nộp về ngân hàng đầy đủ số tiền đã thu và biên lai chưa thu (nếu có)?', 0, B[10]],
      ['- Chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay và số dư tiền gửi tổ viên của các tổ chức, cá nhân có thẩm quyền khi được yêu cầu?', 0, B[11]],
      ['- Giám sát, đôn đốc tổ viên sử dụng vốn vay đúng mục đích; trả nợ gốc, lãi đúng hạn? Số tổ viên có lãi tồn (không bao gồm lãi tồn ân hạn), nợ quá hạn, sử dụng vốn vay sai mục đích?', 0, nx.kq2],
      ['- Thông báo, phối hợp xác minh và xử lý các trường hợp gia hạn nợ, điều chỉnh kỳ hạn nợ, nợ quá hạn, nợ bị rủi ro, nợ bị chiếm dụng, sử dụng vốn sai mục đích, người vay đi khỏi nơi cư trú?', 0, B[12]],
      ['- Sắp xếp, lưu giữ hồ sơ hoạt động Tổ theo quy định?', 0, B[13]], ['- ………………...….……………………………….']])+
    '<p class="kt-p kt-b">III. ĐÁNH GIÁ, NHẬN XÉT CỦA ĐOÀN KIỂM TRA</p>'+
    '<p class="kt-p">Qua kiểm tra tại Tổ và kiểm tra thực tế tổ viên, Đoàn có nhận xét như sau:</p>'+   /* 3.124 (anh chốt): bỏ số khách — số tổ viên của tổ và số khách kiểm tra thực tế không khớp */
    muc3('1. Ưu điểm', nx.ud, 109, 132)+muc3('2. Tồn tại', nx.tt, 112, 132)+muc3('3. Kiến nghị (nếu có)', nx.kn, 91, 131)+
    '<div class="kt-giu"><p class="kt-p">Kèm theo Biên bản này là '+ktC(f.SPH, 3)+' Phiếu kiểm tra sử dụng vốn vay của khách hàng.</p><p class="kt-p">Biên bản được lập thành 02 bản (01 bản lưu Đoàn kiểm tra, 01 bản lưu Tổ).</p>'+
    '<table class="kt-dau" style="margin-top:8pt"><tr><td class="kt-c"><p class="kt-b">TRƯỞNG ĐOÀN KIỂM TRA</p><p class="kt-i">(Ký, ghi rõ họ tên)</p>'+(f.CB1 ? '<p class="kt-b" style="margin-top:48pt">'+coChuHTML(f.CB1)+'</p>' : '')+'</td><td class="kt-c"><p class="kt-b">TỔ TRƯỞNG TỔ TK&amp;VV</p><p class="kt-i">(Ký, ghi rõ họ tên)</p>'+(f.TT ? '<p class="kt-b" style="margin-top:48pt">'+coChuHTML(f.TT)+'</p>' : '')+'</td></tr></table></div>'+
    '</body></html>';
}

