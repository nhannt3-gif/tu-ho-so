/* ---------- 4. ĐỌC PDF & RÚT THÔNG TIN ---------- */

function sanSangPDF(){
  if(!window.pdfjsLib) return false;
  if(!pdfjsLib.GlobalWorkerOptions.workerSrc){
    if(TV.pdfjsw){
      try{
        pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
          new Blob([TV.pdfjsw], {type:'text/javascript'}));
      }catch(e){
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
    }else{
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }
  return true;
}

/* Ghép các mảnh chữ trong PDF thành từng dòng đúng thứ tự.
   pdf.js trả về từng mảnh rời, có khi mỗi mảnh một chữ cái — nếu cứ nối
   bằng dấu cách thì thành "9 5 8 / K H" và mọi quy tắc nhận dạng đều trượt. */
function ghepDong(items){
  var dong = [], hien = null;
  items.forEach(function(it){
    if(!it.str && !it.hasEOL) return;
    var y = it.transform ? Math.round(it.transform[5]) : 0;
    var x = it.transform ? it.transform[4] : 0;
    if(!hien || Math.abs(hien.y - y) > 3){
      hien = {y:y, phan:[]};
      dong.push(hien);
    }
    hien.phan.push({x:x, s:it.str, w:it.width||0});
  });
  return dong.map(function(d){
    d.phan.sort(function(a,b){ return a.x-b.x; });
    var ra = '';
    for(var i=0;i<d.phan.length;i++){
      var p = d.phan[i];
      if(i>0){
        var tr = d.phan[i-1];
        var cach = p.x - (tr.x + (tr.w||0));
        /* chỉ chèn dấu cách khi thực sự có khoảng trống trên trang */
        if(cach > 1.2 && !/\s$/.test(ra) && !/^\s/.test(p.s)) ra += ' ';
      }
      ra += p.s;
    }
    return ra.trim();
  }).filter(Boolean).join('\n');
}

/* Nén những chỗ chữ bị giãn từng ký tự: "9 5 8 / K H" -> "958/KH" */
function nenChu(t){
  if(!t) return '';
  return t.split('\n').map(function(d){
    /* nếu quá nửa số "từ" trong dòng chỉ có 1 ký tự thì coi như bị giãn */
    var tu = d.trim().split(/\s+/);
    if(tu.length>=6){
      var don = tu.filter(function(x){ return x.length===1; }).length;
      if(don/tu.length > 0.6) return tu.join('');
    }
    return d.replace(/\s{2,}/g,' ');
  }).join('\n');
}

/* Đọc chữ của n trang đầu. Trả về chuỗi, hoặc '' nếu không đọc được */
function docChuPDF(file, soTrang){
  return new Promise(function(ok){
    if(!sanSangPDF()){ return ok({chu:'', trang:0}); }
    var fr = new FileReader();
    fr.onload = function(){
      pdfjsLib.getDocument({data:new Uint8Array(fr.result)}).promise.then(function(pdf){
        var n = Math.min(soTrang||2, pdf.numPages), ds = [];
        for(var i=1;i<=n;i++) ds.push(pdf.getPage(i).then(function(p){
          return p.getTextContent().then(function(tc){ return ghepDong(tc.items); });
        }));
        Promise.all(ds).then(function(a){
          ok({chu:nenChu(a.join('\n')), trang:pdf.numPages});
        }).catch(function(){ ok({chu:'', trang:pdf.numPages}); });   /* 3.31: trang lỗi không làm treo cả file */
      }).catch(function(){ ok({chu:'', trang:0}); });
    };
    fr.onerror = function(){ ok({chu:'', trang:0}); };
    fr.readAsArrayBuffer(file);
  });
}

/* Rút SỐ HIỆU: dạng 1234/NHCS-TDNN hoặc 70/QĐ-HĐQT */
function rutSoHieu(chu){
  if(!chu) return null;
  var m = chu.match(/\b(\d{1,5})\s*\/\s*([A-ZĐ][A-ZĐ0-9]{1,10}(?:\s*-\s*[A-ZĐ][A-ZĐ0-9]{1,10}){0,2})\b/);
  if(m) return m[1]+'/'+m[2].replace(/\s*-\s*/g,'-').replace(/\s+/g,'');
  m = chu.match(/\bSố\s*:?\s*(\d{1,5})\b/i);
  return m ? m[1] : null;
}

/* Rút NGÀY: "ngày 14 tháng 03 năm 2026" hoặc 14/03/2026 */
function rutNgay(chu){
  if(!chu) return null;
  /* 3.32: so trên chữ đã bỏ dấu — PDF mất dấu ("ngay 11 thang 9 nam 2026") vẫn đọc được */
  var m = boDau(chu).match(/ngay\s+(\d{1,2})\s+thang\s+(\d{1,2})\s+nam\s+(\d{4})/);
  if(m) return m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  m = chu.match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})\b/);
  if(m) return m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  return null;
}

/* 3.53 (anh chốt): số hiệu, ngày CHỈ nằm ở phần đầu văn bản — các dòng trước tiêu đề (QUYẾT ĐỊNH, QUY CHẾ…) hoặc trước
   "Căn cứ / Kính gửi / Điều 1". Không lấy ở dòng căn cứ, phần thân (vd "Căn cứ Nghị định 78/2002/NĐ-CP ngày 04/10/2002") */
var RE_TIEU_DE_VB = /^\s*(QUYẾT\s*ĐỊNH|QUY\s*CHẾ|QUY\s*ĐỊNH|KẾ\s*HOẠCH|HƯỚNG\s*DẪN|THÔNG\s*BÁO|BÁO\s*CÁO|TỜ\s*TRÌNH|BIÊN\s*BẢN|NGHỊ\s*QUYẾT|CHƯƠNG\s*TRÌNH|ĐỀ\s*ÁN|GIẤY\s*MỜI|CÔNG\s*VĂN|CHỈ\s*THỊ|THÔNG\s*TƯ|NGHỊ\s*ĐỊNH|PHƯƠNG\s*ÁN|HỢP\s*ĐỒNG|DANH\s*SÁCH|ĐIỀU\s*LỆ)(?![A-Za-zÀ-ỹĐđ])/;
var RE_THAN_VB = /^\s*(Căn\s*cứ|CĂN\s*CỨ|Kính\s*gửi|KÍNH\s*GỬI|Theo\s|Thực\s*hiện|THỰC\s*HIỆN|Điều\s*\d|ĐIỀU\s*\d|Chương\s*[IVX\d]|CHƯƠNG\s*[IVX\d])/;
function laTieuDeVB(t){ t = String(t||'').trim(); return RE_TIEU_DE_VB.test(t) && t.replace(/[^A-Za-zÀ-ỹĐđ]/g,'')===t.replace(/[^A-Za-zÀ-ỹĐđ]/g,'').toUpperCase(); }
function vungDauVB(chu){
  var ds = String(chu||'').split(/\n/), ra = [];
  for(var i=0;i<ds.length && ra.length<18;i++){
    var t = ds[i].trim(); if(!t) continue;
    if(RE_THAN_VB.test(t) || laTieuDeVB(t)) break;
    ra.push(t);
  }
  return ra.join('\n');
}
/* số hiệu + ngày của phần đầu: ưu tiên dòng "Số: …"; ngày "…, ngày … tháng … năm …" */
function docDauVB(chu){
  var dau = vungDauVB(chu), so = null;
  dau.split('\n').some(function(t){
    var m = t.match(/S[ốỐ]\s*[:.]\s*(.+)$/) || t.match(/^\s*S[ốỐoO]\s+(\d.*)$/);
    if(m) so = rutSoHieu(m[1]) || (m[1].match(/^\s*(\d{1,5})\b/)||[])[1] || null;
    return !!so;
  });
  /* 3.61: dòng V/v (và các dòng nối tiếp) hay nhắc văn bản khác "…Quyết định 70/QĐ-HĐQT ngày 27-8-2026" → chỉ tìm số, ngày
     ở các dòng TRƯỚC dòng V/v; ngày ưu tiên dạng "…, ngày … tháng … năm …" */
  var dsDau = dau.split('\n'), iVv = -1;
  dsDau.some(function(t, i){ if(/^\s*(V\/v|Về\s*việc|VỀ\s*VIỆC)\b/i.test(t) || /\bV\/v\b/.test(t)){ iVv = i; return true; } });
  var truocVv = (iVv>=0 ? dsDau.slice(0, iVv) : dsDau).join('\n');
  if(iVv>=0){ var tv = dsDau[iVv].replace(/\bV\/v\b.*$/,''); if(tv.trim()) truocVv += '\n'+tv; }   /* "Số: … V/v …" cùng một dòng */
  if(!so) so = rutSoHieu(truocVv);
  var ng = null, kem = '';
  var mNg = boDau(truocVv).match(/ngay\s+(\d{1,2})\s+thang\s+(\d{1,2})\s+nam\s+(\d{4})/);
  ng = mNg ? mNg[3]+'-'+hai(+mNg[2])+'-'+hai(+mNg[1]) : rutNgay(truocVv);
  /* dòng V/v dính chung với dòng địa danh-ngày ("V/v …  Gò Dầu, ngày 11 tháng 9 năm 2026" / "Gò Dầu, 11-09-2026"):
     lấy ngày có dấu phẩy địa danh đứng trước — ngày của văn bản được nhắc thì không có */
  if(!ng && iVv>=0){ var nv = ngayDiaDanh(dsDau.slice(iVv).join('\n')); if(nv) ng = nv; }
  /* văn bản ban hành kèm (quy chế, quy định, điều lệ…): phần đầu không có "Số:", số + ngày nằm ở dòng
     "(Ban hành kèm theo Quyết định số 70/QĐ-HĐQT ngày 24/7/2026)" ngay dưới tiêu đề */
  if(!so || !ng){
    var ds = String(chu||'').split(/\n/).map(function(t){ return t.trim(); }).filter(Boolean), iTD = -1;
    for(var i=0;i<ds.length && i<25;i++){ if(RE_THAN_VB.test(ds[i])) break; if(laTieuDeVB(ds[i])){ iTD = i; break; } }
    /* chỉ văn bản BAN HÀNH KÈM (quy chế, quy định, điều lệ) — hướng dẫn / công văn nhắc "ban hành kèm theo QĐ…" thì không lấy */
    if(iTD>=0 && /^\s*(QUY\s*CHẾ|QUY\s*ĐỊNH|ĐIỀU\s*LỆ)/.test(ds[iTD])){
      var doan = ds.slice(iTD+1, iTD+5).join(' ');
      var mk = doan.match(/kèm\s*theo\s*[^()]*?số\s*[:.]?\s*(\d{1,5}\s*\/\s*[A-ZĐ][A-ZĐ0-9\/-]*)([^()]*)/i);
      if(mk){
        if(!so){ so = rutSoHieu(mk[1]); if(so) kem = 'số'; }
        if(!ng){ var n2 = rutNgay(mk[2]); if(n2){ ng = n2; kem += (kem?', ':'')+'ngày'; } }
      }
    }
  }
  return {so:so, ngay:ng, dau:dau, kem:kem};
}
/* "Gò Dầu, ngày 11 tháng 9 năm 2026" · "Gò Dầu, 11-09-2026" → 2026-09-11 (có dấu phẩy địa danh đứng trước) */
function ngayDiaDanh(t){
  var m = boDau(String(t||'')).match(/,\s*(?:ngay\s+)?(\d{1,2})(?:\s+thang\s+|\s*[\/.-]\s*)(\d{1,2})(?:\s+nam\s+|\s*[\/.-]\s*)(\d{4})/);
  return m ? m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]) : null;
}
function catDiaDanhNgay(ty){
  return String(ty||'').replace(/\s+[A-ZĐÀ-Ỹ][^,]{1,30},\s*(?:ngày\s+)?\d{1,2}(?:\s+tháng\s+|\s*[\/.-]\s*)\d{1,2}(?:\s+năm\s+|\s*[\/.-]\s*)\d{4}.*$/, '').trim();
}
/* 3.61: lớp chữ PDF lỗi font ("NQI DUNG … LA4P TO, THAY DO! BAN") — không dùng làm trích yếu */
function chuLoiFont(t){
  var tu = String(t||'').split(/\s+/).filter(function(w){ return w.replace(/[^A-Za-zÀ-ỹĐđ0-9]/g,'').length>=2; });
  if(!tu.length) return false;
  var xau = tu.filter(function(w){
    return /[A-Za-zÀ-ỹĐđ]\d+[A-Za-zÀ-ỹĐđ]/.test(w) || /[A-Za-zÀ-ỹĐđ][!#$%&*@^~|\\]/.test(w) || /q[aeioyàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợỳýỷỹỵ]/i.test(w);   /* "NQI" lỗi; "QĐ", "HĐQT" là viết tắt */
  }).length;
  return xau>=2 || xau/tu.length > 0.15;
}
/* trích yếu: dòng V/v (công văn) → tiêu đề + dòng ngay dưới (quyết định, quy chế…) → cách cũ */
function rutTyVB(chu){
  var coVv = /(^|\n)\s*(V\/v|Về\s*việc|VỀ\s*VIỆC)\b/.test(chu||'') || /V\/v\.?\s*\S/.test(chu||'');
  return (coVv ? (tyVvNhieuDong(chu) || rutTrichYeu(chu)) : null) || rutTieuDe(chu) || rutTrichYeu(chu);
}
/* 3.61: dòng V/v thường dài 2–3 dòng — nối các dòng tiếp theo tới "Kính gửi / Căn cứ" (bỏ dòng quốc hiệu, dòng địa danh-ngày) */
function tyVvNhieuDong(chu){
  var ds = String(chu||'').split(/\n/), i = -1;
  for(var k=0;k<ds.length && k<30;k++){ if(/(^|\s)(V\/v|Về\s*việc)\b/i.test(ds[k])){ i = k; break; } }
  if(i<0) return null;
  var ra = [ds[i].replace(/^.*?(V\/v\.?|Về\s*việc)\s*:?\s*/i,'')];
  for(var j=i+1;j<ds.length && j<=i+3;j++){
    var t = ds[j].trim(); if(!t) continue;
    if(/^(Kính\s*gửi|KÍNH\s*GỬI|Căn\s*cứ|CĂN\s*CỨ|Thực\s*hiện|Để\s|Nơi\s*nhận)/.test(t)) break;
    if(/CỘNG\s*HÒA|Độc\s*lập|ĐỘC\s*LẬP|,\s*ngày\s+\d{1,2}\s+tháng/i.test(t) || /^[-–_ .]+$/.test(t)) continue;
    ra.push(t);
    if(/[.;]$/.test(t)) break;
  }
  var ty = catDiaDanhNgay(ra.join(' ').replace(/\s+/g,' ')).replace(/[.;,:\s]+$/,'').trim();
  return ty.length>=6 ? ty : null;
}
function chuanSoHieu(x){ return boDau(String(x||'')).toUpperCase().replace(/[^A-Z0-9]/g,''); }

/* Rút KỲ báo cáo: "tháng 9/2026", "đến ngày 30/09/2026", "kỳ 09/2026" */
function rutKy(chu){
  if(!chu) return null;
  var m = chu.match(/tháng\s+(\d{1,2})\s*[\/.-]\s*(\d{4})/i);
  if(m) return m[2]+'-'+hai(+m[1]);
  m = chu.match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})\b/);
  if(m) return m[3]+'-'+hai(+m[2]);
  m = chu.match(/\bnăm\s+(\d{4})\b/i);
  if(m) return m[1]+'-'+hai(nay().getMonth()+1);
  return null;
}

/* Rút TIÊU ĐỀ: với quyết định/kế hoạch thì tiêu đề nằm sau tên loại văn bản */
function rutTieuDe(chu){
  if(!chu) return null;
  var m = chu.match(/(?:QUYẾT ĐỊNH|KẾ HOẠCH|HƯỚNG DẪN|THÔNG BÁO|BÁO CÁO|TỜ TRÌNH|QUY CHẾ|QUY ĐỊNH|ĐIỀU LỆ|BIÊN BẢN|NGHỊ QUYẾT|CHƯƠNG TRÌNH)\s*[:\n]?\s*(?:Về việc|VỀ VIỆC|V\/v)?\s*([^\n]{10,170})/);
  if(m){
    var t = m[1].replace(/\s+/g,' ')
      .replace(/\s*(Căn cứ|CĂN CỨ|Kính gửi|KÍNH GỬI|Số\s*:|\(\s*Ban hành kèm).*$/,'').trim();
    if(t.length>=10) return t;
  }
  return null;
}

/* Rút TRÍCH YẾU: dòng sau "V/v" hoặc dòng in hoa dài nhất ở đầu */
function rutTrichYeu(chu){
  if(!chu) return null;
  var m = chu.match(/V\/v\.?\s*([^\n]{6,180})/i);
  if(m){
    return m[1].replace(/\s+/g,' ')
               .replace(/\s*(Kính gửi|KÍNH GỬI|Căn cứ|CĂN CỨ).*$/,'').trim();
  }
  m = chu.match(/(?:VỀ VIỆC|Về việc)\s*:?\s*([^\n]{6,180})/);
  if(m) return m[1].replace(/\s+/g,' ').trim();
  /* thử lấy cụm in hoa dài (tiêu đề quyết định/kế hoạch) */
  var d = chu.split(/\n/);
  for(var i=0;i<d.length && i<40;i++){
    var t = d[i].trim();
    if(t.length>=14 && t.length<=170 && t===t.toUpperCase() &&
       !/CỘNG HÒA|ĐỘC LẬP|NGÂN HÀNG|Số\s*:/i.test(t)) return t;
  }
  return null;
}

/* Đoán LOẠI văn bản */
function doanLoai(chu, soHieu){
  var c = boDau(chu||'').slice(0,1200);
  if(/quyet dinh/.test(c)) return 'Quyết định';
  if(/ke hoach/.test(c))  return 'Kế hoạch';
  if(/huong dan/.test(c)) return 'Hướng dẫn';
  if(/thong bao/.test(c)) return 'Thông báo';
  if(/bao cao/.test(c))   return 'Báo cáo';
  if(/to trinh/.test(c))  return 'Tờ trình';
  if(soHieu){
    var sh = soHieu.toUpperCase();
    if(/QD|QĐ/.test(sh)) return 'Quyết định';
    if(/\bKH\b|KH-/.test(sh)) return 'Kế hoạch';
    if(/\bTB\b|TB-/.test(sh)) return 'Thông báo';
    if(/\bHD\b|HD-/.test(sh)) return 'Hướng dẫn';
    if(/\bBC\b|BC-/.test(sh)) return 'Báo cáo';
  }
  return 'Công văn';
}

/* Gợi ý MẢNG NGHIỆP VỤ theo từ khóa trong nội dung */
/* Mảng nghiệp vụ — chọn MỘT */
var TU_KHOA_MANG = {
  'Kế toán - Ngân quỹ'  : ['ke toan','ngan quy','hach toan','thu chi tien mat','bao cao tai chinh'],
  'Tin học'             : ['tin hoc','phan mem','he thong','cong nghe thong tin','intellect'],
  'Hành chính - Tổ chức': ['hanh chinh','to chuc can bo','thi dua','khen thuong','nhan su'],
  'Kiểm tra - Giám sát' : ['kiem tra','giam sat','doi chieu','phuc tra','kiem toan'],
  'Kế hoạch - Nguồn vốn': ['ke hoach tin dung','phan bo von','chi tieu ke hoach','nguon von','khtd'],
  'Tín dụng'            : ['cho vay','muc cho vay','lai suat','ho so vay','giai ngan',
                           'to tk','to tiet kiem','giao dich xa','rui ro','huy dong']
};
function doanMang(chu){
  var c = boDau(chu||'').slice(0,3000);
  var ds = D.cauHinh.nghiepVu||[], bang = tuKhoaCua('mang');   /* 3.40: từ khóa sửa được ở Cài đặt */
  for(var ten in bang){
    if(ds.indexOf(ten)<0) continue;
    var tk = bang[ten];
    for(var i=0;i<tk.length;i++) if(tk[i] && c.indexOf(boDau(tk[i]))>=0) return ten;
  }
  return ds[0] || 'Tín dụng';
}

/* Tag thuộc tính — chọn NHIỀU */
var TU_KHOA_TAG = {
  'Tổ TK&VV'        : ['to tk','to tiet kiem','to truong','to vay von','to vien'],
  'Giao dịch xã'    : ['giao dich xa','diem giao dich','phien giao dich'],
  'Xử lý rủi ro'    : ['rui ro','xoa no','khoanh no','no bi rui ro'],
  'Huy động vốn'    : ['huy dong','tien gui','tiet kiem dan cu'],
  'Đổi tên hộ vay'  : ['doi ten','thay doi nguoi vay','chuyen nguoi vay'],
  'Đổi chữ ký CCCD' : ['chu ky','can cuoc','cccd','thay doi chu ky'],
  'HS khoanh'       : ['khoanh no','ho so khoanh'],
  'HS quá hạn'      : ['qua han','no qua han'],
  'HS 3 tháng KHĐ'  : ['khong hoat dong','3 thang khd','khd'],
  'Sắp xếp tổ'      : ['sap xep to','cung co to','gop to'],
  'Phân bổ vốn'     : ['phan bo','chi tieu','dieu chinh ke hoach']
};
var TU_KHOA_CT = {
  'HN':['ho ngheo'], 'HCN':['can ngheo'],
  'HMTN':['moi thoat ngheo'], 'NS&VSMT':['nuoc sach','ve sinh moi truong','ns&vsmt'],
  'GQVL':['giai quyet viec lam','gqvl'], 'HSSV':['hoc sinh sinh vien','hssv'],
  'NO-HN':['ho ngheo ve nha o'], 'NOXH':['nha o xa hoi','noxh'],
  'SXKD-VKK':['san xuat kinh doanh','vung kho khan'],
  'XKLĐ':['xuat khau lao dong','xkld','lam viec o nuoc ngoai'],
  'NCHXAPT':['chap hanh xong an phat tu','nchxapt']
};
function goiYThe(chu, bang, danhSach){
  var c = boDau(chu||''), ra = [];
  for(var ten in bang){
    if(danhSach.indexOf(ten)<0) continue;
    var tk = bang[ten];
    for(var i=0;i<tk.length;i++){
      if(tk[i] && c.indexOf(boDau(tk[i]))>=0){ ra.push(ten); break; }
    }
  }
  return ra.slice(0,3);
}

/* 3.32: PHÂN BIỆT CÔNG VĂN với BÁO CÁO SỐ LIỆU trước khi so từ khóa mẫu báo cáo.
   Trước đây app so từ khóa trước — công văn nào nhắc "Tổ TK&VV", "nợ quá hạn", "giao ban"… đều bị coi là báo cáo tháng.
   Dấu hiệu văn bản hành chính: quốc hiệu, tiêu ngữ, "Số: …/…", "V/v", "Kính gửi", "Nơi nhận", tên loại văn bản ở đầu.
   Dấu hiệu bảng số liệu (báo cáo xuất từ hệ thống): STT, Đơn vị tính, Tổng cộng, Người lập biểu, Ngày in, số liệu đến ngày. */
function diemVanBan(chu){
  var c = boDau(chu||'').slice(0,3000), d = 0;
  if(/cong hoa xa hoi chu nghia/.test(c)) d++;
  if(/doc lap\s*-?\s*tu do\s*-?\s*hanh phuc/.test(c)) d++;
  if(/\bso\s*:\s*\d{1,6}\s*\/\s*[a-z]/.test(c)) d++;
  if(/\bv\/v\b|ve viec/.test(c)) d++;
  if(/kinh gui|noi nhan/.test(c)) d++;
  if(/^\s*(quyet dinh|ke hoach|huong dan|thong bao|to trinh|cong van)\s*$/m.test(c)) d++;
  return d;
}
function diemBangSoLieu(chu){
  var c = boDau(chu||'').slice(0,4000), d = 0;
  if(/\bstt\b/.test(c)) d++;
  if(/don vi tinh|\bdvt\b|dv tinh/.test(c)) d++;
  if(/tong cong|cong chung/.test(c)) d++;
  if(/nguoi lap bieu|ngay in|in luc/.test(c)) d++;
  if(/(tinh )?den ngay\s*\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4}/.test(c)) d++;
  if((c.match(/\d{1,3}(\.\d{3})+/g)||[]).length >= 8) d++;   /* nhiều số tiền dạng 1.234.567 */
  return d;
}
/* khớp mẫu báo cáo theo NỘI DUNG — rõ là văn bản hành chính thì không coi là báo cáo */
function khopMauNoiDung(chu){
  if(diemVanBan(chu)>=2 && diemBangSoLieu(chu)<2) return null;
  return khopMau(chu);
}
/* khớp mẫu báo cáo theo TÊN file khi quét Drive — tên có số hiệu văn bản (958 KH-NHCS, 4079/NHCS-TDNN) thì là văn bản */
function khopMauTenQuet(ten){
  var tf = tuTenFile(ten);
  if(tf.soHieu && /[\/]/.test(tf.soHieu)) return null;
  return khopMau(ten);
}
/* Khớp MẪU BÁO CÁO tháng */
/* 3.32: chọn mẫu KHỚP NHẤT thay vì mẫu đầu tiên trong danh sách:
   từ khóa nằm ở tiêu đề (250 ký tự đầu) trước → khớp nhiều từ khóa ở tiêu đề hơn → xuất hiện sớm hơn → từ khóa dài hơn.
   Trước đây "Chất lượng Tổ" có cột "nợ quá hạn" bị nhận là Nợ quá hạn; "KQGD toàn phòng" bị nhận là KQGD xã. */
function khopMau(chu){
  var c = boDau(chu||'').slice(0,2500), TIEU_DE = 250;
  var tot = null;
  (D.cauHinh.mauBaoCao||[]).forEach(function(m){
    var dau = -1, soTD = 0, dai = 0;
    (m.tuKhoa||[]).forEach(function(k){
      var kk = boDau(k); if(!kk) return;
      var i = c.indexOf(kk); if(i<0) return;
      if(dau<0 || i<dau) dau = i;
      if(i<TIEU_DE) soTD++;
      if(kk.length>dai) dai = kk.length;
    });
    if(dau<0) return;
    var d = {m:m, td:dau<TIEU_DE?0:1, soTD:soTD, dau:dau, dai:dai};
    if(!tot || d.td<tot.td || (d.td===tot.td && (d.soTD>tot.soTD || (d.soTD===tot.soTD &&
       (d.dau<tot.dau || (d.dau===tot.dau && d.dai>tot.dai)))))) tot = d;
  });
  return tot ? tot.m : null;
}

/* ---------- RÚT THÔNG TIN TỪ CHÍNH TÊN FILE ----------
   Tên file anh đặt tay thường đã có đủ số hiệu, ngày và nội dung.
   Dùng làm lối dự phòng khi không đọc được chữ bên trong PDF. */
/* 3.40: đọc tên file viết lại — trước đây gạch dưới (_) làm hỏng nhận ngày/số (4079_NHCS-TDNN_07-09-2026),
   không nhận ngày viết liền (20260915), số hiệu ăn lan sang ngày/năm (942/NHCS-KHNV-15), trích yếu còn sót "QD", "V.v".
   Không dùng lookbehind để chạy được trên iPhone đời cũ. */
function ngayHopLe(y, m, d){
  y = +y; m = +m; d = +d;
  if(y<2000 || y>2099 || m<1 || m>12 || d<1 || d>31) return '';
  return y+'-'+hai(m)+'-'+hai(d);
}
function tuTenFile(ten){
  var goc = (ten||'').replace(/\.[a-z0-9]{2,5}$/i,'');
  /* gạch dưới, nhiều khoảng trắng → một khoảng trắng; đệm 2 đầu để so ranh giới bằng [^0-9] */
  var t = ' '+goc.replace(/_+/g,' ').replace(/\s+/g,' ').trim()+' ';
  var ra = {}, m;

  /* 1. NGÀY (bỏ khỏi chuỗi trước để số hiệu không ăn nhầm) */
  var mauNgay = [
    [/([^0-9])(20\d{2})[.\/-](\d{1,2})[.\/-](\d{1,2})(?=[^0-9])/, function(m){ return ngayHopLe(m[2],m[3],m[4]); }],
    [/([^0-9])(\d{1,2})[.\/-](\d{1,2})[.\/-](20\d{2})(?=[^0-9])/, function(m){ return ngayHopLe(m[4],m[3],m[2]); }],
    [/([^0-9])(20\d{2})(\d{2})(\d{2})(?=[^0-9])/,                function(m){ return ngayHopLe(m[2],m[3],m[4]); }],
    [/([^0-9])(\d{2})(\d{2})(20\d{2})(?=[^0-9])/,                function(m){ return ngayHopLe(m[4],m[3],m[2]); }]
  ];
  for(var i=0;i<mauNgay.length && !ra.ngay;i++){
    m = t.match(mauNgay[i][0]);
    if(m){ var n = mauNgay[i][1](m); if(n){ ra.ngay = n; t = t.replace(m[0], m[1]+' '); } }
  }
  /* chữ "ngày"/"ngay" đứng trơ sau khi cắt ngày */
  t = t.replace(/\s(ngày|ngay)\s/gi, ' ');

  /* 2. SỐ HIỆU: 4079/NHCS-TDNN · 70-QĐ-HĐQT · 958 KH-NHCS · CV942 NHCS-KHNV · TB 125 NHCS-TCCB · Số 4079
     phần ký hiệu = các cụm VIẾT HOA nối bằng gạch, cụm nào toàn số (năm, ngày) thì dừng */
  var HOA = 'A-ZĐ', cum = '['+HOA+']['+HOA+'0-9&]{0,11}';
  /* ngăn cách số với ký hiệu: "/" (có thể cách), "-" hay "." liền, hoặc một khoảng trắng — " - " có cách là kiểu "số - trích yếu" */
  var reSo = new RegExp('([^0-9A-Za-zÀ-ỹ])(\\d{1,6})(?:\\s*\\/\\s*|[.-]| )('+cum+'(?:-'+cum+'){0,3})(?=[^A-Za-zÀ-ỹ0-9]|$)');
  m = t.match(reSo);
  var tienTo = t.match(/\s(CV|QĐ|QD|KH|TB|BC|HD|TTr|VB)\s?(\d{1,6})(?=[^0-9])/);
  if(m && !(tienTo && tienTo.index < m.index)){
    ra.soHieu = m[2]+'/'+m[3];
    t = t.replace(m[0], m[1]+' ');
  }else if(tienTo){
    /* CV942 NHCS-KHNV → 942/NHCS-KHNV; TB 125 NHCS-TCCB → 125/NHCS-TCCB */
    var sau = t.slice(tienTo.index + tienTo[0].length).match(new RegExp('^\\s*[\\/-]?\\s*('+cum+'(?:-'+cum+'){0,3})(?=[^A-Za-zÀ-ỹ0-9]|$)'));
    ra.soHieu = tienTo[2] + (sau ? '/'+sau[1] : '');
    ra.loai = {CV:'Công văn', 'QĐ':'Quyết định', QD:'Quyết định', KH:'Kế hoạch', TB:'Thông báo', BC:'Báo cáo', HD:'Hướng dẫn', TTr:'Tờ trình'}[tienTo[1]] || '';
    t = t.slice(0, tienTo.index) + ' ' + t.slice(tienTo.index + tienTo[0].length + (sau ? sau[0].length : 0));
  }else{
    m = t.match(/\s(?:số|so|Số|So|SỐ|SO)\s*[:.]?\s*(\d{1,6})(?=[^0-9])/) ||
        t.match(/\s(?:công văn|cong van|quyết định|quyet dinh|kế hoạch|ke hoach|thông báo|thong bao|báo cáo|bao cao|hướng dẫn|huong dan|tờ trình|to trinh)\s+(\d{1,6})(?=[^0-9])/i);
    if(m){ ra.soHieu = m[1]; t = t.replace(m[0].replace(/^\s/,''), ' '); }
    else{
      /* kiểu anh hay đặt: "11068 - cho vay LĐNN" — số đứng đầu, gạch nối rồi tới nội dung.
         Số bắt đầu bằng 0 (01, 02…) thường là số thứ tự nên không nhận */
      m = t.match(/^\s([1-9]\d{0,5})\s*[-–.]\s*(?=[A-Za-zÀ-ỹĐđ])/);
      if(m && !/^20\d{2}$/.test(m[1])){ ra.soHieu = m[1]; t = ' '+t.slice(m[0].length); }
      else if(/^\s[1-9]\d{0,5}\s$/.test(t) && !/^\s20\d{2}\s$/.test(t)){ ra.soHieu = t.trim(); t = ' '; }   /* tên chỉ là số: 4079.pdf */
      else t = t.replace(/^\s0\d{0,2}\s*[-–.]\s*/, ' ');   /* số thứ tự đứng đầu: "01 - Báo cáo…" */
    }
  }

  /* 3. TRÍCH YẾU = phần còn lại, bỏ chữ dẫn đứng trơ (CV, QĐ, số, V/v…) và dấu thừa */
  var con = t.replace(/\s(CV|QĐ|QD|KH|TB|BC|HD|TTr|VB|số|so|Số|So)(?=\s)/g, ' ')
    .replace(/\s(V\/v|V\.v|Vv|v\/v|v\.v|Về việc|về việc|Ve viec|ve viec)\.?(?=\s)/g, ' ')
    .replace(/\s\d{6}(?=\s)/g, ' ')                       /* giờ chụp kiểu 143022 của file Scan_ */
    .replace(/(^|\s)[.,;:\-]+(?=\s|$)/g, ' ')
    .replace(/\s{2,}/g, ' ').trim()
    .replace(/^[\s.,;:\-]+|[\s.,;:\-]+$/g, '');
  /* tên cả chuỗi không có khoảng trắng (Huong-dan-ra-soat) → gạch nối thành khoảng trắng */
  if(!/\s/.test(con)) con = con.replace(/-+/g, ' ').trim();
  if(/^scan$/i.test(con) || /^[\d\s]+$/.test(con)) con = '';   /* chỉ còn số (năm, số trơ) thì không phải trích yếu */
  if(con.length>=3) ra.trichYeu = con;
  return ra;
}

/* ---------- 5. SINH TÊN CHUẨN ---------- */
function duoiFile(ten){
  var i = ten.lastIndexOf('.');
  return i>0 ? ten.slice(i).toLowerCase() : '';
}

/* Văn bản:  2026-09-02_CV-1580_Giai-dap-vuong-mac.pdf */
/* bỏ những ký tự tên file không chứa được, giữ nguyên dấu tiếng Việt */
function sachTen(t){
  return (t||'').replace(/[\/\\:*?"<>|]/g,'-')
                .replace(/\s{2,}/g,' ').trim();
}
function tenVanBan(v, duoi){
  var ngay = v.ngay || (v.anhPDF ? '' : ngayISO(nay()));   /* 3.46: PDF ảnh chưa có ngày → tên không gắn ngày hôm nay */
  if(D.cauHinh.kieuTen==='codau'){
    /* kiểu đọc được: 2026-09-07 4079-NHCS-TDNN Hướng dẫn quy trình rà soát */
    var so = sachTen(v.soHieu||'');
    /* bỏ "V/v", "Về việc" TRƯỚC khi thay dấu gạch chéo, không thì thành "V-v" */
    var ty = (v.trichYeu||'')
      .replace(/^\s*(V\/v\.?|Về\s+việc|VỀ\s+VIỆC)\s*:?\s*/i,'')
      .replace(/\s+/g,' ').trim();
    ty = sachTen(chuanTenVB(ty, v.loai));
    if(ty.length>110) ty = catTenGon(ty, 110);   /* 3.65 (việc AB): trước cắt ở 60 ký tự → "…hoạt động của.pdf" */
    var tp = {ngay:ngay, so:so, ty:ty}, thuTu = tenCauTrucHienTai();
    return thuTu.map(function(k){ return tp[k]; }).filter(Boolean).join(' ') + (duoi||'.pdf');
  }
  var p = ngay ? [ngay] : [];
  var vt = vietTatLoai(v.loai);   /* 3.40: viết tắt sửa được ở Cài đặt */
  var s0 = (v.soHieu||'').split('/')[0] || 'x';
  p.push(vt+'-'+s0);
  p.push(slug(v.trichYeu||'Chua-co-trich-yeu', 8) || 'Van-ban');
  return p.join('_') + (duoi||'.pdf');
}

/* 3.65 (việc AB): trích yếu để tìm — mở rộng viết tắt của tên (TK&VV → Tiết kiệm và vay vốn…); giống hệt tên thì để trống (khỏi thừa) */
/* 3.69: chữ viết tắt → đầy đủ (dùng khi tìm); chỉ trả về khi có viết tắt để đỡ tốn */
function moVietTat(t){ t = String(t||''); var r = t; MO_VIET_TAT.forEach(function(x){ r = r.replace(x[0], x[1]); }); return r===t ? '' : r; }
var MO_VIET_TAT = [[/\bTổ TK&VV\b/g,'Tổ Tiết kiệm và vay vốn'],[/\bTK&VV\b/g,'Tiết kiệm và vay vốn'],[/\bNHCSXH\b/g,'Ngân hàng Chính sách xã hội'],
  [/\bHĐQT\b/g,'Hội đồng quản trị'],[/\bHĐĐD\b/g,'Hội đồng đại diện'],[/\bBĐD\b/g,'Ban đại diện'],[/\bUBND\b/g,'Ủy ban nhân dân'],[/\bHSSV\b/g,'học sinh, sinh viên'],
  [/\bGQVL\b/g,'giải quyết việc làm'],[/\bNSVSMT\b/g,'nước sạch và vệ sinh môi trường'],[/\bSXKD\b/g,'sản xuất kinh doanh']];
function tyDayDu(t){
  var t0 = chuanTenVB(String(t||'')), r = t0; MO_VIET_TAT.forEach(function(x){ r = r.replace(x[0], x[1]); });
  return r===t0 ? '' : r;
}
/* 3.65 (việc AB): cắt tên dài ở ranh giới từ, không để treo từ nối cuối câu ("của", "và", "về"…) */
function catTenGon(t, n){
  t = String(t||'').slice(0, n).replace(/\s+\S*$/, '');
  var NOI = /\s+(của|và|về|cho|các|trong|tại|theo|với|đối|trên|dưới|đến|từ|thực|một|số|những|là|được|để|năm|ngày|tháng|thuộc|tổ|ban|hội|quy)$/i;
  for(var i=0;i<4 && NOI.test(t);i++) t = t.replace(NOI, '');
  return t.trim();
}
/* 3.65 (việc AB): "Hướng dẫn Thực hiện…" → "Hướng dẫn thực hiện…" — chữ đầu sau tên loại văn bản viết thường,
   trừ tên riêng / viết tắt (Tổ, Hội, Ngân hàng, UBND, NHCSXH, Nghị định…) */
var GIU_HOA = /^(Tổ|Hội|Ngân|Nhà|Nghị|Quyết|Thông tư|Luật|Chính|Ủy|Uỷ|Đảng|Đoàn|Chi|Phòng|Bộ|Hội đồng|Tỉnh|Huyện|Xã|Phường|Việt)(?![A-Za-zÀ-ỹĐđ])/;
function chuanTenVB(t, loai){
  t = String(t||'');
  var m = t.match(/^(Hướng dẫn|Kế hoạch|Quyết định|Thông báo|Báo cáo|Tờ trình|Công văn|Quy chế|Quy định|Chương trình|Biên bản)\s+(\S+)/);
  if(!m) return t;
  var w = m[2];
  if(w.length<2 || w!==w.charAt(0)+w.slice(1).toLowerCase() || /[0-9&]/.test(w) || w===w.toUpperCase() || GIU_HOA.test(t.slice(m[1].length).trim())) return t;
  return m[1]+' '+w.charAt(0).toLowerCase()+w.slice(1)+t.slice(m[0].length);
}
/* Cấu trúc tên file (kiểu có dấu) — bật/tắt + đổi thứ tự 3 thành phần gốc */
var TEN_CT_NHAN = {ngay:'Ngày ban hành', so:'Số hiệu', ty:'Tên văn bản'};
function tenCauTrucHienTai(){
  var d = D.cauHinh.tenCauTruc;
  return (d && d.length) ? d.slice() : ['ngay','so','ty'];
}
function veTenCauTruc(){
  var thuTu = tenCauTrucHienTai();
  var con = Object.keys(TEN_CT_NHAN).filter(function(k){ return thuTu.indexOf(k)<0; });
  var ds = thuTu.concat(con); /* item tắt xếp cuối, vẫn hiện để bật lại */
  return ds.map(function(k, i){
    var bat = thuTu.indexOf(k)>=0;
    return '<div class="hang-nut" data-k="'+k+'" style="margin-bottom:6px;align-items:center">'+
      '<label style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">'+
        '<input type="checkbox" data-chk'+(bat?' checked':'')+'/> '+TEN_CT_NHAN[k]+'</label>'+
      '<button class="nho" style="flex:0 0 auto" onclick="doiThuTuTen(this,-1)"'+
        (i===0?' disabled':'')+'>↑</button>'+
      '<button class="nho" style="flex:0 0 auto" onclick="doiThuTuTen(this,1)"'+
        (i===ds.length-1?' disabled':'')+'>↓</button></div>';
  }).join('');
}
function doiThuTuTen(el, dir){
  var row = el.closest('[data-k]'), sib = dir<0 ? row.previousElementSibling : row.nextElementSibling;
  if(!sib) return;
  if(dir<0) row.parentNode.insertBefore(row, sib);
  else row.parentNode.insertBefore(sib, row);
  var rows = row.parentNode.querySelectorAll('[data-k]');
  rows.forEach(function(r,i){
    r.querySelector('button:nth-of-type(1)').disabled = (i===0);
    r.querySelector('button:nth-of-type(2)').disabled = (i===rows.length-1);
  });
}
function layTenCauTruc(){
  var e = document.getElementById('cd-tenct'); if(!e) return null;
  var ra = [];
  Array.prototype.slice.call(e.querySelectorAll('[data-k]')).forEach(function(r){
    if(r.querySelector('[data-chk]').checked) ra.push(r.getAttribute('data-k'));
  });
  return ra.length ? ra : ['ngay','so','ty'];
}

/* Dữ liệu tháng: 2026-09_DU-NO-THEO-TO_Truong-Mit.pdf */
/* 3.23: khuôn tên tab Tháng theo cách anh vẫn đặt — KQGD_Truong_Mit_2026_09_25
   MÃ LOẠI _ đơn vị (bỏ dấu) _ năm _ tháng [_ ngày nếu báo cáo theo ngày] */
function khongDau(x){
  return boDau(x||'').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'')
    .split('_').filter(Boolean).map(function(t){ return t.charAt(0).toUpperCase()+t.slice(1); }).join('_');
}
function mauTheoNgay(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; });
  return !!(m && m.theoNgay);
}
function tenThangChuan(v, duoi){
  var ky = v.ky || ngayISO(nay()).slice(0,7);
  var p = [(v.maLoai||'KHAC').toUpperCase()];
  p.push(khongDau(v.phamVi||'ToanPGD') || 'ToanPGD');
  p.push(ky.slice(0,4), ky.slice(5,7));
  if(mauTheoNgay(v.maLoai) && v.nsl) p.push(v.nsl.slice(8,10));
  if(v.banPhu && v.nsl && !mauTheoNgay(v.maLoai)) p.push('GT'+v.nsl.slice(8,10));
  if(v.ghiThem) p.push(khongDau(v.ghiThem));
  return p.join('_') + (duoi||'.pdf');
}
function tenDuLieu(v, duoi){
  if((D.cauHinh.kieuTenThang||'ma') === 'ma') return tenThangChuan(v, duoi);
  var ky = v.ky || ngayISO(nay()).slice(0,7);
  var ky0 = v.ky || ngayISO(nay()).slice(0,7);
  var nhan = v.banPhu ? ('giữa tháng '+(v.nsl||'').slice(8,10)+'-'+(v.nsl||'').slice(5,7)) : '';
  if(D.cauHinh.kieuTen==='codau'){
    return [ky, sachTen(v.tenLoai||'Khác'), sachTen(v.phamVi||''), sachTen(v.ghiThem||'')]
      .filter(Boolean).join(' ') + (nhan?' ('+nhan+')':'') + (duoi||'.pdf');
  }
  var p = [ky, v.maLoai || 'KHAC'];
  if(v.phamVi) p.push(slug(v.phamVi, 4));
  if(v.ghiThem) p.push(slug(v.ghiThem, 5));
  if(v.banPhu) p.push('giua-thang-'+(v.nsl||'').slice(8,10));
  return p.join('_') + (duoi||'.pdf');
}

/* Ghi chú: 2026-09-20_GHI-CHU_Bang-phan-bo-von.jpg */
function tenKhac(v, duoi){
  var ngay = v.ngay||ngayISO(nay());
  if(D.cauHinh.kieuTen==='codau'){
    var t = sachTen(v.trichYeu||v.tenCu||'Tài liệu');
    if(t.length>100) t = t.slice(0,100).replace(/\s+\S*$/,'');
    return ngay+' '+t+(duoi||'');
  }
  return ngay+'_KHAC_'+(slug(v.trichYeu||v.tenCu||'Tai-lieu', 7)||'Tai-lieu')+(duoi||'');
}
function tenGhiChu(v, duoi){
  var ngay = v.ngay||ngayISO(nay());
  if(D.cauHinh.kieuTen==='codau'){
    var t = sachTen(v.moTa||'Ghi chú');
    if(t.length>90) t = t.slice(0,90).replace(/\s+\S*$/,'');
    return ngay+' Ghi chú '+t+(duoi||'.jpg');
  }
  return ngay + '_GHI-CHU_' + (slug(v.moTa||'Ghi-chu', 6)||'Ghi-chu') + (duoi||'.jpg');
}

function thuMucCuaGoc(m){
  var giu = m.duongTuy; delete m.duongTuy;
  var d = thuMucCua(m);
  if(giu) m.duongTuy = giu;
  return d;
}
function thuMucCua(m){
  if(m.xoaLuc) return D.cauHinh.thumuc+' / _ThungRac';   /* mục trong thùng rác → file nằm ở _ThungRac */
  if(m.duongTuy) return m.duongTuy;
  var g = D.cauHinh.thumuc;
  if(m.nhom==='duLieu') return g+' / Dữ liệu tháng / '+(m.ky||'').slice(0,4)+' / T'+parseInt((m.ky||'--').slice(5),10);
  if(m.nhom==='ghiChu') return g+' / Ghi chú / '+(m.ngay||'').slice(0,4);
  if(m.nhom==='khac') return g+' / Khác';
  if(m.ten && m.huongDan!==undefined) return g+' / Biểu mẫu / '+(m.nhom||'Dùng chung');
  return g+' / Văn bản / '+(m.ngay||'').slice(0,4);
}
