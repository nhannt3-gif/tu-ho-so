/* ==========================================================
   3.271 (anh chốt 20/10/2026) — 🖼 ẢNH 2 MẶT CCCD LÊN DRIVE · CẮT ẢNH TỪ PDF CŨ · BẢNG ĐỐI CHIẾU · CMND 9 SỐ
   - Anh: "cần phải lên Drive để đồng bộ giữa các máy"; "Drive anh có 5TB nên dùng PA lưu cả 3" (PDF + 2 ảnh chung thư mục CCCD);
     "khi em chạy lại chưa chắc chuẩn phải kiểm tra cắt lại"; "đọc được gì em cũng hiện ra để kiểm tra"; "CMND 9 số em cũng lưu thêm 1 cột".
   - Bản thẻ: Drive giữ 3 file cùng thư mục (CCCD / Scan chờ sắp xếp): "… - CCCD.pdf", "… - Mặt trước.jpg", "… - Mặt sau.jpg" (k.anhDrive).
     Đổi tên / dời / thùng rác: 2 ảnh đi theo PDF. Bản cũ còn ảnh trong máy → lần đồng bộ tới tự đưa ảnh lên.
   - Máy khác (không có ảnh): docAnhHS tự tải ảnh từ Drive về giữ trong máy → khung xem, hộp Sửa, in, đọc số như máy đã quét.
   - Bản cũ chỉ có PDF: dựng trang 1 → dò khung 2 thẻ (nền trắng) → cắt thành 2 ảnh (k.catTuPDF), PDF gốc giữ nguyên (không dựng lại PDF từ ảnh cắt);
     🔎 Rà có khối "Ảnh cắt từ PDF — anh xem lại" (Đúng / Cắt lại / Bỏ ảnh cắt); đọc ra số khớp Mẫu 31 → coi là cắt đúng.
   ========================================================== */
function sxTenAnh(k, mat){ var m = mat==='sau' ? 'Mặt sau' : 'Mặt trước'; return k.maKH ? sxTenChuan(k.maKH, k.ten, m+sxSoThu(k), '.jpg') : (sachTen((k.ten||'Scan')+' - '+m) || 'Scan')+'.jpg'; }
function sxMaAnh(k, mat){ return k.id+(mat==='sau' ? '_matSau' : '_matTruoc'); }
/* tải 1 file lên Drive (multipart) → id */
function sxTaiLen(bl, ten, idTM, kieu){
  var bien = '----tuhoso'+Date.now(), dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:ten, parents:[idTM]})+'\r\n--'+bien+'\r\nContent-Type: '+(kieu||'image/jpeg')+'\r\n\r\n';
  return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, bl, '\r\n--'+bien+'--'])})
    .then(function(r){ if(!r || !r.id) throw new Error('Drive không trả mã file'); return r.id; });
}
/* đổi tên + dời 1 file theo id (cha cũ biết sẵn hoặc hỏi Drive) */
function sxDoiId(id, cha, idTM, ten){
  var c = cha ? Promise.resolve(cha) : goiDrive('https://www.googleapis.com/drive/v3/files/'+id+'?fields=parents').then(function(r){ return ((r && r.parents) || [])[0] || ''; });
  return c.then(function(c0){ return goiDrive('https://www.googleapis.com/drive/v3/files/'+id+'?fields=id,parents'+(c0 && c0!==idTM ? '&addParents='+idTM+'&removeParents='+c0 : (!c0 ? '&addParents='+idTM : '')),
    {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(ten ? {name:ten} : {})}); });
}
function sxTaiVe(id){
  return canToken().then(function(co){ if(!co) return null;
    return fetch('https://www.googleapis.com/drive/v3/files/'+id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); }); })
    .then(function(b){ return b ? new Blob([b], {type:'image/jpeg'}) : null; });
}
/* đưa / đổi tên / dời 2 ảnh của 1 bản thẻ cho khớp PDF (thư mục theo bản; trong thùng rác → _ThungRac) */
function sxDayAnh(k){
  if(!k || k.che!=='the' || !coTheNoiDrive()) return Promise.resolve();
  var duong = k.xoaLuc ? D.cauHinh.thumuc+' / _ThungRac' : duongScan(k);
  return baoDamDuong(duong).then(function(idTM){
    return ['truoc', 'sau'].reduce(function(p, mat){ return p.then(function(){
      if(!(mat==='sau' ? k.matSau : k.matTruoc)) return;
      var A = k.anhDrive = k.anhDrive || {}, a = A[mat], ten = sxTenAnh(k, mat);
      if(a && a.id){ if(a.ten===ten && a.cha===idTM) return;
        return sxDoiId(a.id, a.cha, idTM, ten).then(function(){ a.ten = ten; a.cha = idTM; }, function(e){ if(/404/.test(e && e.message || '')) delete A[mat]; }); }
      return SX_DOC_ANH_CU(sxMaAnh(k, mat)).then(function(bl){ if(!bl || !bl.size){ k.anhThu = maMayCua(); return; }
        return sxTaiLen(bl, ten, idTM, 'image/jpeg').then(function(id){ A[mat] = {id:id, ten:ten, cha:idTM}; delete k.anhThu; }); });
    }); }, Promise.resolve());
  }).then(function(){ if(k.anhDrive && !Object.keys(k.anhDrive).length) delete k.anhDrive; luu(); }, function(e){ console.warn('Chưa đưa ảnh CCCD lên Drive', e); });
}
/* đồng bộ: bản PDF đã lên mà ảnh chưa lên (bản cũ) → đưa ảnh; bản cắt từ PDF → không dựng lại PDF (giữ PDF gốc) */
var SX_CAN_DAY_41 = scanCanDay;
scanCanDay = function(){
  var ds = SX_CAN_DAY_41(), co = {}; ds.forEach(function(k){ co[k.id] = 1; });
  (D.scan||[]).forEach(function(k){ if(!co[k.id] && k.che==='the' && k.driveId && k.matTruoc && !(k.anhDrive && k.anhDrive.truoc) && k.anhThu!==maMayCua()) ds.push(k); });
  return ds;
};
var SX_DAY_MOT_41 = dayMotScan;
dayMotScan = function(k){
  var chiAnh = k.che==='the' && k.driveId && !k.canDay, chinh;
  if(chiAnh) chinh = Promise.resolve();
  else if(k.catTuPDF && k.driveId) chinh = dayMetaScan(k).then(function(r){ k.duongDrive = duongScan(k); return r; });
  else chinh = SX_DAY_MOT_41(k);
  return chinh.then(function(r){ return sxDayAnh(k).then(function(){ return r; }); });
};
/* thùng rác app: PDF dời vào / ra _ThungRac → 2 ảnh theo · xóa hẳn → 2 ảnh vào thùng rác Drive */
var SX_DOI_CHO_CU = doiChoScanKA;
doiChoScanKA = function(m){ return SX_DOI_CHO_CU(m).then(function(r){ return r && r.doi && m.anhDrive ? sxDayAnh(m).then(function(){ return r; }) : r; }); };
var SX_XOA_MAY_CU = xoaAnhMayCua;
xoaAnhMayCua = function(m){
  SX_XOA_MAY_CU(m);
  if(m && m.anhDrive && coTheNoiDrive()) Object.keys(m.anhDrive).forEach(function(mat){ var a = m.anhDrive[mat]; if(a && a.id) xoaFileDrive(a.id).catch(function(){}); });
};
/* máy khác: ảnh chưa có trong máy → tải từ Drive, giữ lại */
var SX_DOC_ANH_CU = docAnhHS;
docAnhHS = function(id){
  return SX_DOC_ANH_CU(id).then(function(b){
    if(b) return b;
    var m = /^(.+)_ma[t](Truoc|Sau)$/.exec(id||''), k = m && (D.scan||[]).find(function(x){ return x.id===m[1]; }), a = k && k.anhDrive && k.anhDrive[m[2]==='Sau' ? 'sau' : 'truoc'];
    if(!a || !a.id || !coTheNoiDrive()) return null;
    return sxTaiVe(a.id).then(function(bl){ if(!bl) return null; return luuAnhHS(id, bl).then(function(){ return bl; }); }, function(){ return null; });
  });
};
var SX_CO_ANH_CU = coAnhTrongMay;
coAnhTrongMay = function(k){
  return SX_CO_ANH_CU(k).then(function(co){ if(co || !k || k.che!=='the' || !(k.anhDrive && k.anhDrive.truoc)) return co;
    return docAnhHS(k.id+'_matTruoc').then(function(b){ if(b && typeof CO_ANH!=='undefined') CO_ANH[k.id] = true; return !!b; }); });
};

/* ---------- cắt 2 thẻ từ trang PDF (khuôn app dựng: nền trắng, trước | sau cạnh nhau ở hàng đầu) ---------- */
var SX_CAT_THAM = [{toi:245, phu:0.5}, {toi:235, phu:0.6}, {toi:250, phu:0.35}];   /* lần cắt 1, 2 (↻ Cắt lại), 3 */
function sxCatThe(c, lan){
  var P = SX_CAT_THAM[(lan||0) % SX_CAT_THAM.length], s = Math.min(1, 700/c.width), w = Math.round(c.width*s), h = Math.round(c.height*s);
  var t = document.createElement('canvas'); t.width = w; t.height = h; var g = t.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.drawImage(c, 0, 0, w, h);
  var d = g.getImageData(0, 0, w, h).data, toi = function(x, y){ var i = (y*w+x)*4; return d[i]*0.3+d[i+1]*0.59+d[i+2]*0.11 < P.toi; };
  var y0 = -1, y1 = -1, y, x;
  for(y=0;y<h;y++){ var n = 0; for(x=0;x<w;x++) if(toi(x, y)) n++;
    if(n/w>P.phu){ if(y0<0) y0 = y; y1 = y; }
    else if(y0>=0){ if(y1-y0 >= h*0.08) break; y0 = -1; } }   /* dải thẻ đầu tiên đủ cao (bỏ đường cắt đứt quãng) */
  if(y0<0 || y1-y0 < h*0.08) return null;
  var doan = [], vao = -1;
  for(x=0;x<=w;x++){ var m = 0; if(x<w) for(y=y0;y<=y1;y++) if(toi(x, y)) m++;
    var co = x<w && m/(y1-y0+1)>0.5; if(co && vao<0) vao = x; if(!co && vao>=0){ if(x-vao>w*0.2) doan.push([vao, x-1]); vao = -1; } }
  if(doan.length<2) return null;
  doan = doan.sort(function(a, b){ return (b[1]-b[0])-(a[1]-a[0]); }).slice(0, 2).sort(function(a, b){ return a[0]-b[0]; });
  return doan.map(function(o){ var x0 = Math.round(o[0]/s), x1 = Math.round((o[1]+1)/s), yA = Math.round(y0/s), yB = Math.round((y1+1)/s), r = document.createElement('canvas');
    r.width = x1-x0; r.height = yB-yA; r.getContext('2d').drawImage(c, x0, yA, r.width, r.height, 0, 0, r.width, r.height); return r; });
}
/* trang 1 PDF của bản (Drive) → canvas */
function sxTrangPDF(k){
  if(!k.driveId || !coTheNoiDrive()) return Promise.resolve(null);
  return xongTV.then(function(){ if(!sanSangPDF()) return null; return canToken(); }).then(function(co){ if(!co) return null;
    return fetch('https://www.googleapis.com/drive/v3/files/'+k.driveId+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.arrayBuffer(); }); })
    .then(function(ab){ if(!ab) return null;
      return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise.then(function(doc){ return doc.getPage(1); }).then(function(pg){
        var v0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(4, 2000/v0.width)}), c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
        return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return c; }); }); })
    .catch(function(){ return null; });
}
/* cắt 2 ảnh từ PDF → lưu trong máy (đánh dấu cắt từ PDF) → đưa lên Drive → [trước, sau] */
function sxCatTuPDF(k, lan){
  return sxTrangPDF(k).then(function(c){
    if(!c){ k.catLoi = !k.driveId ? 'bản chưa lên Drive' : coTheNoiDrive() ? 'không tải / mở được file PDF trên Drive' : 'chưa nối Drive'; return null; }
    delete k.catLoi; var hai = k.catBo ? null : sxCatThe(c, lan);
    if(!hai){ if(!k.catBo && !k.catHong){ k.catHong = 1; luu(); } return canvasRaBlob(c, 0.92).then(function(bl){ return [bl, null]; }); }   /* không dò được khung → đọc cả trang; 3.281: ghi "không tách được" */
    return Promise.all(hai.map(function(x){ return canvasRaBlob(x, 0.92); })).then(function(bs){
      return luuAnhHS(k.id+'_matTruoc', bs[0]).then(function(){ return luuAnhHS(k.id+'_matSau', bs[1]); }).then(function(){
        k.catTuPDF = true; k.catLan = lan||0; delete k.catDuyet; delete k.catHong; k.matTruoc = true; k.matSau = true; delete k.anhThu; if(typeof CO_ANH!=='undefined') CO_ANH[k.id] = true; luu();
        if(coTheNoiDrive()) sxDayAnh(k);
        return bs; }); });
  });
}
/* ảnh để đọc số (3.269 sxAnhDoc): trong máy → ảnh trên Drive → cắt từ PDF */
sxAnhDoc = function(k){
  return Promise.all([docAnhHS(k.id+'_matTruoc'), k.matSau ? docAnhHS(k.id+'_matSau') : null]).then(function(b){
    if(b[0] || b[1]) return b;
    return sxCatTuPDF(k, k.catLan||0).then(function(r){ return r || [null, null]; });
  });
};
/* anh chọn ở 🔎 Rà: Đúng / Cắt lại / Bỏ ảnh cắt */
function sxCatXuLy(k, viec){
  if(viec==='ok'){ k.catDuyet = true; luu(); return Promise.resolve(); }
  var bo = function(){ xoaFile('hs_'+k.id+'_matTruoc'); xoaFile('hs_'+k.id+'_matSau'); if(typeof CO_ANH!=='undefined') delete CO_ANH[k.id];
    if(k.anhDrive && coTheNoiDrive()) Object.keys(k.anhDrive).forEach(function(mat){ var a = k.anhDrive[mat]; if(a && a.id) xoaFileDrive(a.id).catch(function(){}); });
    delete k.anhDrive; delete k.raDoc; delete k.catDuyet; };
  if(viec==='bo'){ bo(); k.catBo = true; delete k.catTuPDF; luu(); return Promise.resolve(); }
  bo(); var lan = (k.catLan||0)+1; delete k.catTuPDF;
  return sxCatTuPDF(k, lan).then(function(){ luu(); });
}

/* ---------- bảng đối chiếu: thông tin đọc được trên thẻ ↔ Mẫu 31 ---------- */
function sxGT(v){ v = String(v||''); return {'01':'Nam', '02':'Nữ', 'M':'Nam', 'F':'Nữ', '1':'Nam', '0':'Nữ'}[v] || v; }
function sxBangDoc(r, ma){
  if(!r || !(r.cccd || r.ten)) return '';
  var c = (ma && KHO.dsKhach()[ma]) || {}, so = rsSo(c.cccd), e = coChuHTML;
  var dong = function(nhan, the, mau, kieu){ if(!the) return '';
    var dk = !mau ? '' : kieu==='ten' ? (sxTenGan(the, mau) ? 'ok' : 'sai') : kieu==='dc' ? (sxChuan(mau).indexOf(sxChuan(the).split(' ').slice(-3).join(' '))>=0 || sxChuan(the).indexOf(sxChuan(mau))>=0 ? 'ok' : 'sai') : (String(the)===String(mau) ? 'ok' : 'sai');
    return '<tr class="'+(dk==='sai' ? 'sx-lech' : '')+'"><td>'+nhan+'</td><td><b>'+e(the)+'</b></td><td>'+e(mau||'')+'</td><td class="c">'+(dk==='ok' ? '<b class="xanh">✓</b>' : dk==='sai' ? '<b class="do">✗</b>' : '')+'</td></tr>'; };
  var han = r.han || sxHanCCCD(r.ns, r.ncap);
  return '<table class="to-bang luoi sx-doc-bang"><thead><tr><th>Thông tin</th><th>Trên thẻ</th><th>Mẫu 31'+(ma ? ' ('+e(ma)+')' : '')+'</th><th></th></tr></thead><tbody>'+
    dong('Số CCCD', r.cccd, so.length===12 ? so : '')+dong('CMND cũ (9 số)', r.cmnd, so.length===9 ? so : '')+dong('Họ tên', r.ten, c.ten, 'ten')+
    dong('Ngày sinh', r.ns ? ngayVNsl(r.ns) : '', c.ns ? ngayVNsl(c.ns) : '')+dong('Giới tính', r.gt, sxGT(c.gt))+dong('Nơi thường trú', r.dc, c.dc, 'dc')+
    dong('Ngày cấp', r.ncap ? ngayVNsl(r.ncap) : '', c.ncap ? ngayVNsl(c.ncap) : '')+dong('Hạn thẻ', han ? ngayVNsl(han)+(han<ngayISO(nay()) ? ' (đã hết hạn)' : '') : '', '')+
    dong('Đọc từ', r.nguon||'', '')+'</tbody></table>';
}
function sxXemDoc(r, ma, mo){ var b = sxBangDoc(r, ma); return b ? '<details class="sx-doc-xem"'+(mo ? ' open' : '')+'><summary>📋 Thông tin đọc được trên thẻ — so Mẫu 31</summary>'+b+'</details>' : ''; }
/* kết quả đọc đầy đủ để lưu vào bản (k.cccdDoc) */
function sxGhiDoc(r){ var o = {}; ['cccd', 'cmnd', 'ten', 'ns', 'gt', 'dc', 'ncap', 'han', 'nguon'].forEach(function(f){ if(r && r[f]) o[f] = r[f]; }); return o; }

/* ---------- CMND 9 số đọc từ thẻ (theo mã KH) ---------- */
function sxCmndCua(ma){
  var r = ''; (D.scan||[]).forEach(function(k){ if(!r && k.maKH===ma) r = k.cmnd || (k.cccdDoc||{}).cmnd || (k.raDoc||{}).cmnd || ''; });
  return r;
}

/* ---------- 3.272 (bố trí anh duyệt ở 3.264): khung xem phải — dòng "Hồ sơ của khách" ----------
   Bản scan / chữ ký / ảnh đã gắn mã KH → gom mọi bản của khách đó: 🪪 CCCD · ✍ Chữ ký · 🧑 Ảnh · 📄 tài liệu (theo loại); thiếu ghi ✗;
   bấm 1 mục → xem ngay ở khung phải (bản đang xem tô đậm). */
function sxHoSoKhach(ma, dangId){
  if(!ma) return '';
  var sc = (D.scan||[]).filter(function(k){ return k.maKH===ma; }), ka = (D.kyAnh||[]).filter(function(k){ return k.maKH===ma; }), e = coChuHTML;
  var nut = function(loai, id, chu){ return '<button class="sx-hs-nut'+(id===dangId ? ' dang' : '')+'" data-lenh="sx.xemHS" data-loai="'+loai+'" data-id="'+id+'">'+chu+'</button>'; };
  var nhom = function(ico, ten, ds, loai){ return ds.length ? ds.map(function(k, i){ return nut(loai, k.id, ico+' '+ten+(ds.length>1 ? ' '+(i+1) : '')); }).join('') : '<span class="sx-hs-thieu">'+ico+' '+ten+' ✗</span>'; };
  var tl = sc.filter(function(k){ return k.che==='tailieu'; });
  return '<div class="sx-hskh"><b>Hồ sơ của khách</b> <small>'+e(sxNhanKH(ma))+'</small><div class="sx-hs-hang">'+
    nhom('🪪', 'CCCD', sc.filter(function(k){ return k.che!=='tailieu'; }), 'scan')+nhom('✍', 'Chữ ký', ka.filter(function(k){ return k.loai==='ky'; }), 'ka')+
    nhom('🧑', 'Ảnh', ka.filter(function(k){ return k.loai!=='ky'; }), 'ka')+tl.map(function(k){ return nut('scan', k.id, '📄 '+e(sxLoaiScan(k))); }).join('')+'</div></div>';
}
var SX_XEM_THU_CU = xemThu;
xemThu = function(loai, id, i){
  SX_XEM_THU_CU(loai, id, i);
  if(loai!=='scan' && loai!=='ka') return;
  var m = loai==='scan' ? timScan(id) : (D.kyAnh||[]).find(function(x){ return x.id===id; });
  var cp = document.getElementById('cotphai'), noi = cp && cp.offsetParent && !anPV ? document.getElementById('cp-phu') : document.getElementById('x-phu');
  if(m && m.maKH && noi) noi.insertAdjacentHTML('beforeend', sxHoSoKhach(m.maKH, id));
};
GD.dangKy('sx', {xemHS:function(el){ var loai = el.getAttribute('data-loai'), id = el.getAttribute('data-id'); if(loai==='scan' && typeof xemScanCP==='function') xemScanCP(id); else xemThu(loai, id); }});

/* 3.277: ảnh cắt từ PDF CHƯA duyệt (k.catTuPDF, chưa catDuyet) — in / lưu / gửi dùng PDF gốc trên Drive (không dựng lại từ ảnh cắt có thể lệch).
   1 bản → lấy thẳng PDF gốc; nhiều bản lẫn bản chưa duyệt → vẫn dựng, báo tên bản chưa duyệt để anh xem ở 🔎 Rà. */
function sxCatChuaDuyet(k){ return !!(k && k.catTuPDF && !k.catDuyet); }
var SX_DUNG_THE_CU = dungTrangThe;
dungTrangThe = function(dsId, viec){
  var ids = dsId || Object.keys(HS.chon||{}), ds = ids.map(function(id){ return timScan(id); }).filter(Boolean), chua = ds.filter(sxCatChuaDuyet);
  if(!chua.length || viec==='drive') return SX_DUNG_THE_CU(dsId, viec);
  if(ds.length===1 && chua[0].driveId && coTheNoiDrive()){
    var k = chua[0];
    return taiPDFDrive(k.driveId).then(function(bl){
      if(viec==='blob') return bl;
      var ten = tenScanDrive(k);
      if(viec==='in'){ inBlob(bl, ten); bao('In PDF gốc (ảnh cắt từ PDF chưa duyệt ở 🔎 Rà).', 6); return; }
      var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = ten; document.body.appendChild(a); a.click(); thuHoiSau(a.href); a.remove(); bao('Đã lưu PDF gốc '+ten+'.', 5);
    }, function(){ return SX_DUNG_THE_CU(dsId, viec); });
  }
  if(viec!=='blob') bao('⚠ '+chua.length+' bản có ảnh cắt từ PDF chưa duyệt ('+chua.slice(0, 3).map(function(k){ return k.ten; }).join(', ')+(chua.length>3 ? '…' : '')+') — xem lại ở 🔎 Rà CCCD.', 8);
  return SX_DUNG_THE_CU(dsId, viec);
};

/* ---------- 3.280 (anh: "cccd cũ app vẫn lưu PDF chưa tách ra 2 mặt"): bản CCCD cũ chỉ có PDF ----------
   Mở xem ở khung phải / xem lớn → tự cắt 2 mặt thẻ từ trang 1 PDF trên Drive (như 🔎 Rà), lưu 2 ảnh + đưa lên Drive, hiện 2 mặt.
   Dò không ra khung → ghi k.catHong, lần sau hiện PDF luôn (không tải lại); ↻ Cắt lại ở 🔎 Rà vẫn làm được. PDF gốc giữ nguyên. */
function sxCanCat(k){ return !!(k && (k.che==='the' || (!k.che && (k.tag||[]).indexOf('CCCD')>=0)) && k.driveId && !k.anhDrive && !k.catBo && !k.catTuPDF && !k.catHong); }
var SX_CAT_DANG = {};
function sxCatMot(k){
  if(!SX_CAT_DANG[k.id]) SX_CAT_DANG[k.id] = sxCatTuPDF(k, k.catLan||0).then(function(bs){
    if(bs && bs[1] && !k.che){ k.che = 'the'; luu(); }   /* bản rất cũ chỉ gắn nhãn CCCD */
    return !!(bs && bs[1]); }, function(){ return false; }).then(function(ok){ delete SX_CAT_DANG[k.id]; return ok; });
  return SX_CAT_DANG[k.id];
}
var SX_VE_KHUNG_CU = veVaoKhung;
veVaoKhung = function(m, n){
  var S = XEM[n], o = S && document.getElementById(S.id);
  if(o && n!=='sua' && laScanMuc(m)) setTimeout(function(){ sxVeTTCat(m, n); }, 0);   /* 3.281: dòng trạng thái tách 2 mặt */
  if(!o || n==='sua' || !laScanMuc(m) || !sxCanCat(m) || !coTheNoiDrive()) return SX_VE_KHUNG_CU(m, n);
  S.m = m;
  docAnhHS(m.id+'_matTruoc').then(function(b){ if(b || S.m!==m) return null;   /* đã có ảnh trong máy → xem như cũ */
    o.innerHTML = '<div class="rong">✂ Bản CCCD cũ chỉ có PDF — đang tách 2 mặt thẻ…</div>'; return sxCatMot(m); }, function(){ return null; }).then(function(ok){
    if(S.m!==m) return;
    SX_VE_KHUNG_CU(m, n); sxVeTTCat(m, n);
    if(ok) bao('✂ Đã tách 2 mặt thẻ từ PDF (PDF gốc giữ nguyên) — cắt lệch thì xem lại ở 🗂 Quản lý › 🔎 Rà CCCD.', 6);
    else if(ok===false) baoLoi('⚠ Chưa tách được 2 mặt thẻ: '+sxLyCat(m)+' — đang xem PDF.');
  });
};

/* ---------- 3.281 (anh: "có cái app tự tách, có cái không — báo app có làm chưa, làm không được cũng báo") ----------
   Mỗi bản CCCD khi xem: 1 dòng trạng thái dưới tên — ảnh gốc lúc quét / đã tách (chưa duyệt · đã duyệt) / đang tách / không tách được + lý do + ↻ Thử tách lại. */
function sxLaCCCD(k){ return !!(k && (k.che==='the' || (!k.che && (k.tag||[]).indexOf('CCCD')>=0))); }
function sxLyCat(k){ return k.catHong ? 'không dò ra 2 khung thẻ trên trang 1 của PDF (scan mờ / lệch / thẻ sát mép, hoặc 2 mặt nằm 2 trang)' : (k.catLoi || 'chưa rõ lý do'); }
function sxTTCat(k){
  if(!sxLaCCCD(k)) return '';
  var t = function(lop, chu, lai){ return '<div class="sx-cat-tt'+(lop ? ' '+lop : '')+'" data-k="'+k.id+'">'+chu+(lai ? ' <button class="sx-cat-lai" data-lenh="sx.catLai" data-k="'+k.id+'">↻ Thử tách lại</button>' : '')+'</div>'; };
  if(SX_CAT_DANG[k.id]) return t('', '✂ Đang tách 2 mặt thẻ từ PDF…');
  if(k.catTuPDF) return k.catDuyet ? t('xanh', '✂ Đã tách 2 mặt từ PDF · ✓ đã duyệt') : t('vang', '✂ Đã tách 2 mặt từ PDF — chưa duyệt: xem lại ở 🗂 Quản lý › 🔎 Rà CCCD', 1);
  if(k.catBo) return t('', '📄 Đang dùng PDF — anh đã bỏ ảnh cắt', 1);
  if(k.catHong || k.catLoi) return t('do', '⚠ Không tách được 2 mặt: '+coChuHTML(sxLyCat(k))+' — đang xem PDF', 1);
  if(sxCanCat(k) && !coTheNoiDrive()) return t('vang', '⚠ Chưa tách 2 mặt: nối Drive để app tải PDF về tách');
  if(k.matTruoc || k.anhDrive) return t('xanh', '🪪 Ảnh 2 mặt thẻ lúc quét');
  return t('vang', '⚠ Chưa tách 2 mặt'+(k.driveId ? '' : ': bản chưa lên Drive, máy này không có ảnh'));
}
function sxVeTTCat(k, n){
  var noi = document.getElementById(n==='lon' ? 'x-phu' : 'cp-phu'); if(!noi || XEM[n].m!==k) return;
  Array.prototype.forEach.call(noi.querySelectorAll('.sx-cat-tt'), function(x){ x.remove(); });
  var h = sxTTCat(k); if(h) noi.insertAdjacentHTML('beforeend', h);
}
GD.dangKy('sx', {catLai:function(el){ var k = timScan(el.getAttribute('data-k')); if(!k) return;
  if(k.catTuPDF || k.catBo) return moRaSoat(false);   /* đã có ảnh cắt / anh đã bỏ → làm ở 🔎 Rà (Cắt lại / Đúng) */
  k.catLan = (k.catLan||0)+(k.catHong ? 1 : 0); delete k.catHong; delete k.catLoi; luu(); veNoiDung(k); }});


/* ---------- 3.282 (anh: "in nhiều CCCD 1 lúc, 4 CCCD trên 1 trang A4") ----------
   In / Lưu PDF nhiều bản (4 khách / A4, 3.35): trước khi dựng — bản CCCD cũ chỉ có PDF tự tách 2 mặt; bản vẫn không có ảnh mặt thẻ
   (không tách được / chưa nối Drive) → bỏ ra khỏi trang ghép (trước đây để ô trống), báo tên để in riêng bằng PDF gốc. */
var SX_DUNG_THE_282 = dungTrangThe;
dungTrangThe = function(dsId, viec){
  var ids = dsId || Object.keys(HS.chon||{}), ds = ids.map(function(id){ return timScan(id); }).filter(Boolean);
  if((viec!=='in' && viec!=='luu') || ds.length<2 || ds.some(function(k){ return k.che==='tailieu'; })) return SX_DUNG_THE_282(dsId, viec);
  var can = ds.filter(sxCanCat), n = 0;
  if(can.length) batChay(false, 'Đang tách 2 mặt thẻ cho '+can.length+' bản CCCD cũ…');
  return can.reduce(function(p, k){ return p.then(function(){ n++; dangLamChu('Đang tách 2 mặt thẻ '+n+'/'+can.length+'…');
      return docAnhHS(k.id+'_matTruoc').then(function(b){ return b ? null : sxCatMot(k); }); }); }, Promise.resolve())
    .then(function(){ if(can.length) tatChay(); return Promise.all(ds.map(function(k){ return k.matTruoc ? docAnhHS(k.id+'_matTruoc').catch(function(){ return null; }) : null; })); })
    .then(function(a){
      var co = ds.filter(function(_, i){ return a[i]; }), thieu = ds.filter(function(_, i){ return !a[i]; });
      if(!co.length) return baoLoi('⚠ '+ds.length+' bản đã chọn đều chưa có ảnh 2 mặt thẻ (không tách được từ PDF) — mở từng bản để in PDF gốc.');
      var r = SX_DUNG_THE_282(co.map(function(k){ return k.id; }), viec);
      if(thieu.length) setTimeout(function(){ baoLoi('⚠ '+thieu.length+' bản chưa có ảnh 2 mặt thẻ nên không ghép vào trang: '+thieu.map(function(k){ return k.ten||k.maKH; }).join(', ')+' — mở từng bản để in PDF gốc (lý do ở dòng trạng thái dưới tên).'); }, 600);
      return r;
    }, function(e){ tatChay(); baoLoi('Chưa dựng được trang in: '+(e && e.message || e)); });
};
