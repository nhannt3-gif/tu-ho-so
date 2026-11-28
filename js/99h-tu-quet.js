/* ===== 3.574 (anh 28/11/2026 "em làm phần tự nạp file PDF KQGD có sẵn vào kho chưa" → đề xuất tự quét → "duyệt tự quét"): 🔄 TỰ QUÉT HỘP ĐẾN =====
   - Bật 1 lần (⋯ Nạp & KT › 🔄 Bật tự quét hộp đến): xin thêm quyền CHỈ ĐỌC Drive (drive.readonly) — anh đồng ý 1 lần trên màn Google. Kiểm quyền thật bằng tokeninfo;
     chưa có (dự án Google Cloud chưa khai quyền) → báo cách khai, app vẫn chạy như cũ.
   - Thư mục quét: thư mục hộp đến đã nhớ (D.cauHinh.hopDenId, js/99b) + thư mục anh thêm bằng Picker (D.cauHinh.tqThuMuc). Chỉ quét PDF / Excel trực tiếp trong thư mục.
   - Mở tab Nạp & KT → quét (tối đa 1 lần / 10 phút) → có file chưa từng nạp → 1 dòng "🔄 Hộp đến có n file mới — Nạp n file" (dưới thanh công cụ, không làm thanh
     công cụ 2 hàng). Bấm → tải (GET) → xem trước như Nạp file (slDocNhieu) → anh ghi. CHỈ CHÉP vào kho, KHÔNG dời / xóa file gốc. File đã nạp trùng nội dung → xem trước báo trùng (mã băm).
   - "Đã thấy" lưu trên máy theo mã file Drive + md5Checksum (IndexedDB qua luuFile: 'tuq|thay') — file sửa nội dung trên Drive (md5 đổi) được báo lại; "Quét lại từ đầu" xóa danh sách.
   Cắm rút: bỏ dòng <script> là mất tự quét; quyền đã cấp không ảnh hưởng chức năng khác. ES5. */
var TUQ = (function(){
  var M = {SCOPE:'https://www.googleapis.com/auth/drive.readonly', moi:[], luc:0, dang:false, thay:null};
  M.bat = function(){ return !!D.cauHinh.tqBat; };
  M.themScope = function(){ if(typeof DRIVE_SCOPE!=='undefined' && DRIVE_SCOPE.indexOf(M.SCOPE)<0) DRIVE_SCOPE = DRIVE_SCOPE+' '+M.SCOPE; };
  try{ if(D && D.cauHinh && D.cauHinh.tqBat) M.themScope(); }catch(e){}
  M.coQuyen = function(){ if(!DR || !DR.token) return Promise.resolve(false);
    return fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='+encodeURIComponent(DR.token)).then(function(r){ return r.ok ? r.json() : {}; }).then(function(j){ return String(j.scope||'').indexOf(M.SCOPE)>=0; }, function(){ return false; }); };
  M.batQuet = function(){
    if(typeof coTheNoiDrive!=='function' || !coTheNoiDrive()) return baoLoi(typeof drChuaNoi==='function' ? drChuaNoi() : 'Chưa nối Drive.');
    D.cauHinh.tqBat = true; luu(); M.themScope(); DR.sanSang = false;   /* buộc xin token mới có thêm quyền đọc */
    noiDrive(false).then(function(co){ if(!co) throw new Error('chưa nối được Drive'); return M.coQuyen(); }).then(function(q){
      if(!q){ D.cauHinh.tqBat = false; luu(); return baoLoi('Google chưa cấp quyền chỉ đọc Drive. Nếu màn đồng ý không hỏi quyền đọc: vào Google Cloud › OAuth consent screen của app › Scopes › thêm ".../auth/drive.readonly" (và thêm anh vào Test users nếu app đang thử nghiệm), rồi bấm lại.'); }
      bao('Đã bật tự quét hộp đến — mỗi lần mở Nạp & KT, app báo file mới (chỉ chép vào kho, không dời / xóa file gốc).', 6); M.luc = 0; M.quet(true);
    }).catch(function(e){ D.cauHinh.tqBat = false; luu(); baoLoi('Không bật được tự quét: '+(e && e.message || e)); }); };
  M.tatQuet = function(){ D.cauHinh.tqBat = false; luu(); M.moi = []; bao('Đã tắt tự quét (quyền đã cấp vẫn còn ở tài khoản Google — gỡ ở myaccount.google.com › Bảo mật nếu muốn).', 6); M.veBao(); };
  M.thuMuc = function(){ var ds = (D.cauHinh.tqThuMuc || []).slice(); if(D.cauHinh.hopDenId && ds.indexOf(D.cauHinh.hopDenId)<0) ds.unshift(D.cauHinh.hopDenId); return ds; };
  M.docThay = function(){ if(M.thay) return Promise.resolve(M.thay); return docFile('tuq|thay').then(function(x){ return M.thay = (x && typeof x==='object') ? x : {}; }, function(){ return M.thay = {}; }); };
  M.ghiThay = function(){ return luuFile('tuq|thay', M.thay || {}); };
  M.LOAI = /\.(pdf|xlsx|xls|xlsm)$/i;
  M.liet = function(id){ var q = "'"+id+"' in parents and trashed=false", ds = [];
    var trang = function(tk){ return goiDrive('https://www.googleapis.com/drive/v3/files?pageSize=200&fields=nextPageToken,files(id,name,md5Checksum,mimeType,size)&q='+encodeURIComponent(q)+(tk ? '&pageToken='+tk : ''))
      .then(function(j){ (j.files||[]).forEach(function(f){ if(M.LOAI.test(f.name||'')) ds.push(f); }); return j.nextPageToken ? trang(j.nextPageToken) : ds; }); };
    return trang(''); };
  /* quét: tìm file chưa từng thấy (hoặc md5 đổi) */
  M.quet = function(ep){ if(!M.bat() || M.dang) return Promise.resolve(M.moi); if(!ep && Date.now()-M.luc<600000) return Promise.resolve(M.moi);
    var tm = M.thuMuc(); if(!tm.length) return Promise.resolve(M.moi = []);
    M.dang = true; return M.docThay().then(function(){ return Promise.all(tm.map(function(id){ return M.liet(id).catch(function(){ return []; }); })); }).then(function(r){
      var gap = {}; M.moi = [].concat.apply([], r).filter(function(f){ if(gap[f.id]) return false; gap[f.id] = 1; return M.thay[f.id]!==(f.md5Checksum || f.size || '1'); });
      M.luc = Date.now(); M.dang = false; M.veBao(); return M.moi; }, function(e){ M.dang = false; return M.moi; }); };
  /* nạp: tải → xem trước (slDocNhieu); đánh dấu đã thấy */
  M.nap = function(){ var ds = M.moi.slice(); if(!ds.length) return;
    batChay(true, 'Đang tải '+ds.length+' file từ hộp đến…');
    Promise.all(ds.map(function(f){ return canToken().then(function(){ return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}); })
      .then(function(r){ if(!r.ok) throw new Error(f.name+': Drive báo lỗi '+r.status); return r.blob(); }).then(function(b){ return {f:f, file:new File([b], f.name)}; }); }))
      .then(function(x){ tatChay(); x.forEach(function(z){ M.thay[z.f.id] = z.f.md5Checksum || z.f.size || '1'; }); M.ghiThay(); M.moi = []; M.veBao(); if(x.length) slDocNhieu(x.map(function(z){ return z.file; })); },
        function(e){ tatChay(); baoLoi('Không tải được file: '+(e && e.message || e)); }); };
  M.quetLai = function(){ M.thay = {}; M.ghiThay(); M.luc = 0; M.quet(true); };
  M.themThuMuc = function(){ var key = (D.cauHinh.apiKey||'').trim(); if(!key) return baoLoi('Chưa có API key của Google Picker — khai ở ⚙ Cài đặt › Google Drive.');
    canToken().then(function(){ return napPicker(); }).then(function(){ var P = google.picker, xem = new P.DocsView(P.ViewId.FOLDERS).setIncludeFolders(true).setSelectFolderEnabled(true).setMimeTypes('application/vnd.google-apps.folder');
      new P.PickerBuilder().addView(xem).enableFeature(P.Feature.MULTISELECT_ENABLED).setOAuthToken(DR.token).setDeveloperKey(key).setAppId(layClientId().split('-')[0]).setTitle('Chọn thư mục cho app tự quét (vd 03_DU_LIEU_GOC/KQGD)')
        .setCallback(function(d){ if(d[P.Response.ACTION]!==P.Action.PICKED) return; var ds = D.cauHinh.tqThuMuc = D.cauHinh.tqThuMuc || [];
          (d[P.Response.DOCUMENTS]||[]).forEach(function(x){ if(ds.indexOf(x[P.Document.ID])<0) ds.push(x[P.Document.ID]); }); luu(); M.luc = 0; M.quet(true); bao('Đã thêm thư mục tự quét.', 4); }).build().setVisible(true); })
      .catch(function(e){ baoLoi('Không mở được Google Picker: '+(e && e.message || e)); }); };
  /* giao diện: nút trong ⋯ + dòng báo dưới thanh công cụ Nạp & KT */
  M.nutMenu = function(){ if(!M.bat()) return '<button class="nho" data-lenh="tuq.bat" data-dong="1" title="Xin quyền chỉ đọc Drive để app tự báo file mới trong thư mục hộp đến (chỉ chép vào kho, không dời / xóa file gốc)">🔄 Bật tự quét hộp đến</button>';
    return '<button class="nho" data-lenh="tuq.quetLai" data-dong="1" title="Quên danh sách đã thấy — báo lại mọi file trong thư mục quét">🔄 Quét lại hộp đến từ đầu ('+M.thuMuc().length+' thư mục)</button>'+
      '<button class="nho" data-lenh="tuq.themTM" data-dong="1">📁 Thêm thư mục tự quét</button><button class="nho" data-lenh="tuq.tat" data-dong="1">Tắt tự quét</button>'; };
  M.dongBao = function(){ return M.bat() && M.moi.length ? '<div class="sl-bao tuq-bao">🔄 Hộp đến có <b>'+M.moi.length+' file mới</b> ('+coChuHTML(M.moi.slice(0, 3).map(function(f){ return f.name; }).join(', ')+(M.moi.length>3 ? '…' : ''))+') '+
    '<button class="nho chinh" data-lenh="tuq.nap">📥 Nạp '+M.moi.length+' file</button> <small>chỉ chép vào kho, file gốc giữ nguyên</small></div>' : ''; };
  M.veBao = function(){ var e = document.getElementById('tr7'); if(!e || !e.querySelector('.sl-thanh-nap')) return; var cu = e.querySelector('.tuq-bao'); if(cu) cu.remove();
    var h = M.dongBao(); if(!h) return; var t = e.querySelector('.sl-thanh-nap'); if(t) t.insertAdjacentHTML('afterend', h); };
  if(typeof veSoLieu==='function'){ var cuVe = veSoLieu; veSoLieu = function(){ var r = cuVe.apply(this, arguments);
      if(M.bat() && document.querySelector('#tr7 .sl-thanh-nap')){ M.veBao(); M.quet(false); } return r; }; }
  if(typeof slNapThem==='function'){ var cuThem = slNapThem; slNapThem = function(){ var r = cuThem.apply(this, arguments); var h = document.querySelector('#hop .sl-them-ds'); if(h) h.insertAdjacentHTML('afterbegin', M.nutMenu()); return r; }; }
  if(typeof gdDangKy==='function') gdDangKy('tuq', {bat:function(){ M.batQuet(); }, tat:function(){ M.tatQuet(); }, nap:function(){ M.nap(); }, quetLai:function(){ M.quetLai(); }, themTM:function(){ M.themThuMuc(); }});
  return M;
})();
