/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2422–3118 của bản 3.338), không đổi logic — 10. Google Drive · Google Picker quét kho cũ (3.31) · 11. Lập chỉ mục (3.50) */
/* ==========================================================
   10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
   Cần: app đặt ở một địa chỉ https cố định + Client ID của Google.
   ========================================================== */
var DR = {
  sanSang:false, token:null, hetHan:0, dangNoi:false,
  thuMuc:{},            // đường dẫn -> id thư mục
  trangThai:'Chưa nối', // hiện ở chip dải đáy
  online: (typeof navigator==='undefined' || navigator.onLine!==false),
  hangCho: []           // {duong, tuyChon, giaiQuyet, tuChoi} — việc chờ khi mất mạng/phiên
};
var DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

window.addEventListener('online', function(){
  DR.online = true; capNhatChip();
  if(DR.hangCho.length) chayHangCho();
});
window.addEventListener('offline', function(){ DR.online = false; capNhatChip(); });

/* mỗi 4 phút, nếu đang nối thì âm thầm xin phiên mới trước khi hết hạn — không hiện popup */
setInterval(function(){
  if(DR.sanSang && DR.online && Date.now() > DR.hetHan - 10*60000) noiDrive(true);
}, 4*60000);

function chayHangCho(){
  if(!DR.hangCho.length) return;
  var viec = DR.hangCho.slice(); DR.hangCho = []; capNhatChip();
  viec.forEach(function(v){
    goiDrive(v.duong, v.tuyChon).then(v.giaiQuyet).catch(v.tuChoi);
  });
}

/* Client ID của anh gắn sẵn: mất bộ nhớ trình duyệt / đổi máy / Safari tự xóa vẫn nối được.
   Client ID của ứng dụng web không phải mật khẩu — Google chỉ nhận đăng nhập từ trang nhannt3-gif.github.io */
var CLIENT_ID_MAC_DINH = '365646961906-j476flafsqdgnl7cbbfr59kimf0t8t5c.apps.googleusercontent.com';
function layClientId(){ return (D.cauHinh.clientId||'').trim() || CLIENT_ID_MAC_DINH; }
function chepClientId(){ chepChu(layClientId(), 'Đã chép Client ID.'); }
function coTheNoiDrive(){
  return location.protocol==='https:' && !!layClientId();
}

function napGIS(){
  if(window.google && google.accounts) return Promise.resolve(true);
  return new Promise(function(ok){
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = function(){ ok(true); };
    s.onerror = function(){ ok(false); };
    document.head.appendChild(s);
  });
}

function noiDrive(imLang){
  if(!coTheNoiDrive()){
    if(!imLang) baoLoi('Chưa nối được. Cần đặt app ở địa chỉ https và khai Client ID trong Cài đặt.');
    return Promise.resolve(false);
  }
  DR.dangNoi = true; capNhatChip();
  return napGIS().then(function(co){
    if(!co){ throw new Error('Không tải được thư viện Google (mất mạng?)'); }
    return new Promise(function(ok, loi){
      try{
        var tc = google.accounts.oauth2.initTokenClient({
          client_id: layClientId(),
          scope: DRIVE_SCOPE,
          callback: function(kq){
            if(kq && kq.access_token){
              DR.token = kq.access_token;
              DR.hetHan = Date.now() + (kq.expires_in||3500)*1000;
              DR.sanSang = true; DR.trangThai = 'Đã nối';
              DR.dongBoLuc = hai(nay().getHours())+':'+hai(nay().getMinutes());
              luu(); capNhatChip(); ok(true);
            }else loi(new Error('Không nhận được quyền'));
          },
          error_callback: function(){ loi(new Error('Anh đã hủy hoặc bị chặn')); }
        });
        tc.requestAccessToken({prompt: imLang ? '' : 'consent'});
      }catch(e){ loi(e); }
    });
  }).then(function(){
    DR.dangNoi = false; capNhatChip();
    if(!imLang) bao('Đã nối Google Drive.', 4);
    if(DR.hangCho.length) chayHangCho();
    chayDongBoCho();
    if(!DR.daKeoCM){ DR.daKeoCM = true; taiChiMucTuDrive(true); }
    if(!DR.daKeoCH){ DR.daKeoCH = true; setTimeout(function(){ dongBoCauHinh('tu'); }, 800); }   /* 3.113: mở app → lấy cài đặt máy khác vừa sửa, rồi đẩy phần máy này đổi */
    if(D.cauHinh.dbMoApp!==false) setTimeout(function(){ dongBoScan(false); }, 1500);   /* 3.46: mở app → đẩy bản còn chờ */
    if(D.cauHinh.boThang!=='xong') setTimeout(boThangDon, 7000);   /* 3.144: sau khi kéo chỉ mục — bỏ dữ liệu tab Tháng */
    if(!DR.daKeoLich){ DR.daKeoLich = true; taiLichTuDrive(); taiNguonCauTuDrive(); setTimeout(taiNoTuDrive, 2500); setTimeout(function(){ (SL_SAN ? Promise.resolve() : slNap()).then(slTaiTuDrive); }, 4000); }
    return true;
  }).catch(function(e){
    DR.dangNoi = false; DR.sanSang = false;
    DR.trangThai = 'Nối lỗi'; capNhatChip();
    if(!imLang) baoLoi('Không nối được Drive: '+(e&&e.message||e));
    return false;
  });
}

function canToken(){
  if(DR.sanSang && Date.now() < DR.hetHan-60000) return Promise.resolve(true);
  return noiDrive(true);
}

function xepHangCho(duong, tuyChon){
  var moi = !DR.hangCho.length;
  return new Promise(function(ok, loi){
    DR.hangCho.push({duong:duong, tuyChon:tuyChon, giaiQuyet:ok, tuChoi:loi});
    capNhatChip();
    if(moi) bao((DR.online?'Phiên Drive hết, đang nối lại':'Mất mạng')+
      ' — việc này đã lưu tạm, sẽ tự gửi khi xong.', 5);
  });
}
function goiDrive(duong, tuyChon){
  if(!DR.online) return xepHangCho(duong, tuyChon);
  return canToken().then(function(co){
    if(!co) throw new Error('Chưa nối Drive');
    var t = tuyChon||{};
    t.headers = t.headers||{};
    t.headers['Authorization'] = 'Bearer '+DR.token;
    return fetch(duong, t);
  }).then(function(r){
    if(r.status===401){ DR.sanSang=false; throw new Error('Phiên hết hạn, nối lại giúp'); }
    if(!r.ok) return r.text().then(function(t){ throw new Error('Drive báo lỗi: '+r.status); });
    return r.json();
  }).catch(function(e){
    /* mất mạng giữa chừng, hoặc phiên hết mà nối lại im lặng cũng không được:
       xếp vào hàng chờ, không mất việc đang làm — chạy lại khi nối lại / có mạng */
    if(!DR.online || !DR.sanSang) return xepHangCho(duong, tuyChon);
    throw e;
  });
}

/* tìm hoặc tạo một thư mục con */
function thuMucCon(ten, cha){
  var q = "name='"+ten.replace(/'/g,"\\'")+"' and mimeType='application/vnd.google-apps.folder'"+
          " and trashed=false and '"+(cha||'root')+"' in parents";
  return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
                  '&fields=files(id,name)&pageSize=1')
  .then(function(kq){
    if(kq.files && kq.files.length) return kq.files[0].id;
    return goiDrive('https://www.googleapis.com/drive/v3/files?fields=id', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name:ten, mimeType:'application/vnd.google-apps.folder',
                            parents:[cha||'root']})
    }).then(function(r){ return r.id; });
  });
}

/* bảo đảm cả đường dẫn "A / B / C" tồn tại, trả id thư mục cuối */
function baoDamDuong(duong){
  if(!D.cauHinh.thumuc) D.cauHinh.thumuc = MAC_DINH.thumuc;   /* 3.140.4: không bao giờ tạo thư mục "undefined" / "null" trên Drive */
  duong = String(duong).replace(/^\s*(undefined|null)?\s*(?=\/|$)/, function(m, x){ return x ? D.cauHinh.thumuc : m; });
  if(DR.thuMuc[duong]) return Promise.resolve(DR.thuMuc[duong]);
  var phan = duong.split('/').map(function(x){ return x.trim(); }).filter(Boolean);
  return phan.reduce(function(p, ten){
    return p.then(function(cha){ return thuMucCon(ten, cha); });
  }, Promise.resolve('root')).then(function(id){
    DR.thuMuc[duong] = id; return id;
  });
}

/* tạo cả bộ thư mục chuẩn */
function taoBoThuMuc(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive.');
  var g = D.cauHinh.thumuc, n = nay().getFullYear();
  var ds = [g, g+'/_Chờ xử lý', g+'/Văn bản/'+n, g+'/Dữ liệu tháng/'+n,
            g+'/Ghi chú/'+n, g+'/Khác', g+'/_Hệ thống'];
  bao('Đang tạo thư mục trên Drive…', 4);
  ds.reduce(function(p, d){ return p.then(function(){ return baoDamDuong(d); }); },
            Promise.resolve())
  .then(function(){ bao('Đã tạo xong bộ thư mục trong Drive.', 5); })
  .catch(function(e){ baoLoi('Không tạo được: '+(e&&e.message||e)); });
}

/* đưa một file lên Drive đúng tên chuẩn, đúng thư mục */
function dayLenDrive(m){
  return layNoiDung(m).then(function(b){
    if(!b) throw new Error('Không có nội dung file');
    return baoDamDuong(thuMucCua(m)).then(function(idTM){
      var md = metaDrive(m, true);
      var meta = {name: m.tenMoi, parents:[idTM], description:md.description, appProperties:md.appProperties};
      m.driveCha = idTM;
      var bien = '----tuhoso'+Date.now();
      var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+
                JSON.stringify(meta)+'\r\n--'+bien+
                '\r\nContent-Type: '+(b.type||'application/octet-stream')+'\r\n\r\n';
      var cuoi = '\r\n--'+bien+'--';
      var body = new Blob([dau, b, cuoi], {type:'multipart/related; boundary='+bien});
      return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
        {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
    });
  }).then(function(r){
    m.driveId = r.id; m.daLenDrive = true; delete m.choDB; m.driveKy = kyDrive(m); luu();
    return r;
  });
}

function dayLenNhieu(ds){
  var xong = 0, hong = 0;
  bao('Đang đưa '+ds.length+' file lên Drive…', 5);
  return ds.reduce(function(p, m){
    return p.then(function(){
      return dayLenDrive(m).then(function(){ xong++; })
        .catch(function(e){ hong++; console.warn(m.tenMoi, e); });
    });
  }, Promise.resolve()).then(function(){
    ve();
    bao('Đã đưa lên Drive '+xong+' file'+(hong?', lỗi '+hong+' file':'')+'.', 6);
  });
}

/* đọc khay _Chờ xử lý trên Drive */
function napKhayCho(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Vào Cài đặt để khai Client ID.');
  batChay(true);
  var duong = D.cauHinh.thumuc+'/_Chờ xử lý';
  bao('Đang xem khay chờ trên Drive…', 4);
  baoDamDuong(duong).then(function(id){
    var q = "'"+id+"' in parents and trashed=false";
    return layHetTrang('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
                    '&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=200');
  }).then(function(kq){
    var ds = (kq.files||[]).filter(function(f){
      return f.mimeType!=='application/vnd.google-apps.folder'; });
    if(!ds.length){ bao('Khay chờ đang trống.', 4); return; }
    bao('Có '+ds.length+' file trong khay — đang tải về để đọc…', 5);
    return ds.reduce(function(p, f){
      return p.then(function(){
        return canToken().then(function(){
          return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media',
                       {headers:{'Authorization':'Bearer '+DR.token}});
        }).then(function(r){ return r.blob(); })
        .then(function(b){
          var file = new File([b], f.name, {type:f.mimeType});
          file.driveId = f.id;
          var n0 = D.cho.length;
          return xuLyMotFile(file).then(function(){
            /* 3.31: chỉ gắn khi file thật sự vào khay (file trùng bị bỏ qua thì trước đây gắn nhầm vào file trước đó) */
            var c = D.cho.length>n0 ? D.cho[D.cho.length-1] : null;
            if(c) c.tuKhay = f.id;
          });
        }).catch(function(e){ console.warn('bỏ qua', f.name, e); });
      });
    }, Promise.resolve()).then(function(){
      luu(); tatChay(); doiNgan(6);
      bao('Đã nạp '+ds.length+' file từ khay chờ. Xem rồi bấm Duyệt.', 6);
    });
  }).catch(function(e){
    tatChay();
    baoLoi('Không đọc được khay chờ: '+(e&&e.message||e));
  });
}

/* file lấy từ khay: duyệt xong thì đổi tên và dời luôn trên Drive */
function doiTenTrenDrive(m){
  if(!m.tuKhay) return Promise.resolve(false);
  return baoDamDuong(thuMucCua(m)).then(function(idMoi){
    var duong = D.cauHinh.thumuc+'/_Chờ xử lý';
    var idCu = m.tuKhayCha || DR.thuMuc[duong];   /* 3.31: file chọn bằng Picker nằm ở thư mục cũ của nó */
    var u = 'https://www.googleapis.com/drive/v3/files/'+m.tuKhay+
            '?addParents='+idMoi+(idCu?('&removeParents='+idCu):'')+'&fields=id,name';
    var md = metaDrive(m, true); m.driveCha = idMoi;
    return goiDrive(u, {method:'PATCH', headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({name:m.tenMoi, description:md.description, appProperties:md.appProperties})});
  }).then(function(){
    m.driveId = m.tuKhay; m.daLenDrive = true; delete m.tuKhay; delete m.tuKhayCha; m.driveKy = kyDrive(m); luu();
    return true;
  });
}

/* ==========================================================
   3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
   Nạp thư viện Picker của Google khi anh bấm (không nạp sẵn). File chọn → tải về đọc → vào khay chờ,
   gắn tuKhay + thư mục cũ (tuKhayCha); chỉ khi Duyệt mới đổi tên và dời vào đúng thư mục của tủ.
   ========================================================== */
function napPicker(){
  if(window.google && google.picker) return Promise.resolve(true);
  return new Promise(function(ok, loi){
    var lay = function(){ gapi.load('picker', {callback:function(){ ok(true); }, onerror:function(){ loi(new Error('Không nạp được Google Picker')); }}); };
    if(window.gapi) return lay();
    var sc = document.createElement('script');
    sc.src = 'https://apis.google.com/js/api.js';
    sc.onload = lay; sc.onerror = function(){ loi(new Error('Không tải được thư viện Google (mất mạng?)')); };
    document.head.appendChild(sc);
  });
}
function moPicker(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Nối Drive trước ở mục này.');
  var key = (D.cauHinh.apiKey||'').trim();
  if(!key) return baoLoi('Chưa có API key của Google Picker — dán vào ô phía trên rồi bấm lại.');
  canToken().then(function(co){
    if(!co) throw new Error('Chưa nối được Drive');
    return napPicker();
  }).then(function(){
    var P = google.picker;
    var xem = new P.DocsView(P.ViewId.DOCS).setIncludeFolders(true).setSelectFolderEnabled(true).setMode(P.DocsViewMode.LIST);
    new P.PickerBuilder().addView(xem).enableFeature(P.Feature.MULTISELECT_ENABLED)
      .setOAuthToken(DR.token).setDeveloperKey(key).setAppId(layClientId().split('-')[0])
      .setTitle('Chọn thư mục hoặc file trong kho cũ').setCallback(ketQuaPicker).build().setVisible(true);
  }).catch(function(e){ baoLoi('Không mở được Google Picker: '+(e&&e.message||e)); });
}
function ketQuaPicker(data){
  var P = google.picker;
  if(data[P.Response.ACTION]!==P.Action.PICKED) return;
  var ds = data[P.Response.DOCUMENTS]||[], THU_MUC = 'application/vnd.google-apps.folder';
  var file = [], thuMuc = [];
  ds.forEach(function(d){
    var f = {id:d[P.Document.ID], name:d[P.Document.NAME], mimeType:d[P.Document.MIME_TYPE], cha:d[P.Document.PARENT_ID]||''};
    if(f.mimeType===THU_MUC) thuMuc.push(f); else file.push(f);
  });
  dongHop(); batChay(true, 'Đang đọc danh sách file đã chọn…');
  /* thư mục: gom file bên trong (đệ quy, tối đa 500 file) */
  var gomTM = function(id, han){
    var ra = [], hang = [id];
    var tiep = function(){
      if(!hang.length || ra.length>=han) return Promise.resolve(ra);
      var cha = hang.shift();
      return layHetTrang('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+cha+"' in parents and trashed=false")+
        '&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=200').then(function(kq){
        (kq.files||[]).forEach(function(f){
          if(f.mimeType===THU_MUC) hang.push(f.id); else if(ra.length<han) ra.push({id:f.id, name:f.name, mimeType:f.mimeType, cha:cha});
        });
        return tiep();
      });
    };
    return tiep();
  };
  thuMuc.reduce(function(p, t){ return p.then(function(){ return gomTM(t.id, 500).then(function(r){ file = file.concat(r); }); }); }, Promise.resolve())
  .then(function(){
    var docDuoc = file.filter(function(f){ return !/^application\/vnd\.google-apps\./.test(f.mimeType||''); });
    var boGoogle = file.length - docDuoc.length;
    if(!docDuoc.length){
      tatChay();
      return baoLoi(thuMuc.length ? 'Google không cho app đọc bên trong thư mục đã chọn. Mở lại và chọn trực tiếp các file (giữ Ctrl/Shift để chọn nhiều).'
                                  : 'Không có file nào đọc được (file Google Docs/Sheets gốc chưa hỗ trợ).');
    }
    var xong = 0, trung = 0;
    return docDuoc.reduce(function(p, f){
      return p.then(function(){
        if(QUET.dung) return;
        dangLamChu('Đang đọc '+(xong+1)+'/'+docDuoc.length+' · '+f.name);
        return canToken().then(function(){
          return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}});
        }).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); })
        .then(function(b){
          var n0 = D.cho.length;
          return xuLyMotFile(new File([b], f.name, {type:f.mimeType||b.type})).then(function(){
            var c = D.cho.length>n0 ? D.cho[D.cho.length-1] : null;
            if(c){ c.tuKhay = f.id; if(f.cha) c.tuKhayCha = f.cha; c.canCu = (c.canCu||'')+' · từ kho Drive cũ'; xong++; }
            else trung++;
          });
        }).catch(function(e){ console.warn('bỏ qua', f.name, e); });
      });
    }, Promise.resolve()).then(function(){
      tatChay(); luu(); doiNgan(6);
      bao('Đã đưa '+xong+' file vào khay chờ'+(trung?' · bỏ '+trung+' file trùng':'')+(boGoogle?' · bỏ '+boGoogle+' file Google Docs gốc':'')+
        '. Xem tên đề xuất rồi bấm Duyệt — lúc đó app mới đổi tên và dời file.', 9);
    });
  }).catch(function(e){ tatChay(); baoLoi('Không đọc được: '+(e&&e.message||e)); });
}
function capNhatChip(){
  if(typeof capNhatDaiDrive==='function') setTimeout(capNhatDaiDrive, 0);
  if(typeof ttVe==='function') setTimeout(ttVe, 0);   /* 3.148: đèn trạng thái theo Drive */
  var e = document.getElementById('chip-drive');
  if(!e) return;
  var nTen = ((typeof demChoDB==='function') ? demChoDB().length : 0) + scanCanDay().length + kaCanDay().length +
             (typeof nkChuaLen==='function' ? nkChuaLen() : 0);
  var nLoi = (D.scan||[]).concat(D.kyAnh||[]).filter(function(k){ return k.dbLoi; }).length;
  var dangGui = DR.hangCho.length ? ' · đang gửi '+DR.hangCho.length : '';
  /* 3.53: chip Drive chỉ báo trạng thái nối; số bản chưa lên và lỗi có chip riêng */
  var ec = document.getElementById('chip-chua'), el = document.getElementById('chip-loi');
  if(ec){ ec.textContent = nTen ? '☁ '+nTen+' chưa lên Drive' : ''; ec.classList.toggle('an', !nTen || !coTheNoiDrive()); }
  if(el){ el.textContent = nLoi ? '⚠ '+nLoi+' lỗi đẩy lên' : ''; el.classList.toggle('an', !nLoi); }
  if(typeof capNhatBoNho==='function') capNhatBoNho();
  if(!DR.online){ e.textContent='🔴 Mất mạng · lưu tạm trong máy'; e.className='chip do'; return; }
  if(DR.dangNoi){ e.textContent='🟡 Đang nối Drive…'; e.className='chip vang'; return; }
  if(DR.sanSang){
    e.textContent = '🟢 Drive'+(DR.dongBoLuc?' · '+DR.dongBoLuc:' · đã nối')+dangGui;
    e.className = 'chip luc'; return;
  }
  if(DR.trangThai==='Nối lỗi' || coTheNoiDrive()){ e.textContent='🟡 Drive · bấm để nối lại'; e.className='chip vang'; return; }
  e.textContent = '⚪ Chưa cài Drive';
  e.className = 'chip';
}

/* ==========================================================
   11. LẬP CHỈ MỤC
   a) Quét kho cũ trên Drive — chỉ đọc, KHÔNG đổi tên, KHÔNG dời file
   b) Đọc lại những mục còn thiếu thông tin
   c) Dọn chỉ mục — bỏ mục hỏng, gộp mục trùng
   ========================================================== */
var QUET = {chay:false, dung:false, xong:0, tong:0, them:0, bo:0, dang:''};


function mucThieu(){
  return D.vanBan.filter(function(m){
    return !m.soHieu || !m.trichYeu || m.trichYeu===(m.tenCu||'').replace(/\.[^.]+$/,'');
  }).concat(D.duLieu.filter(function(m){ return m.maLoai==='KHAC'; }));
}

/* --- 1. QUÉT DRIVE --- */
/* gọi danh sách file Drive và gom đủ mọi trang; trả {files:[…]} như một lần gọi */
function layHetTrang(url){
  var tat = [];
  function trang(tok){
    return goiDrive(url+(tok?'&pageToken='+encodeURIComponent(tok):'')).then(function(kq){
      tat = tat.concat(kq.files||[]);
      return (kq.nextPageToken && !QUET.dung) ? trang(kq.nextPageToken) : {files:tat};
    });
  }
  return trang('');
}

function veQuet(){
  var e = document.getElementById('hop-quet');
  if(!e){
    moHop('<div class="hop-tit">Đang quét Drive</div>'+
      '<div class="hop-phu">Chỉ đọc để lập chỉ mục. Không đổi tên, không dời, không xóa file nào. '+
      'Anh có thể dừng bất cứ lúc nào rồi chạy tiếp sau.</div>'+
      '<div class="quet" id="hop-quet"></div>'+
      '<div class="tien"><i id="quet-tien"></i></div>'+
      '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho xau" onclick="dungQuet()">Dừng</button>'+
      '<button class="nho" onclick="dongHop()">Ẩn đi</button></div>');
    e = document.getElementById('hop-quet');
  }
  var pt = QUET.tong ? Math.round(QUET.xong/QUET.tong*100) : 0;
  e.innerHTML = '<div class="dong"><b>'+QUET.xong+'</b>'+(QUET.tong?(' / '+QUET.tong):'')+
    ' file · thêm '+QUET.them+' · bỏ qua '+QUET.bo+'</div>'+
    '<div class="nho-chu">'+coChuHTML(QUET.dang)+'</div>';
  var t = document.getElementById('quet-tien');
  if(t) t.style.width = pt+'%';
}
function dungQuet(){ QUET.dung = true; bao('Đang dừng…', 3); }
/* tên hiện tại có đúng quy tắc đặt tên của app không */
function tenDungChuan(m){
  if(m.giuTen || laBieuMau(m) || laFileHeThong(m)) return true;
  var t = m.nhom==='duLieu' ? tenDuLieu(m, m.duoi)
        : m.nhom==='ghiChu' ? tenGhiChu(m, m.duoi)
        : m.nhom==='khac'   ? tenKhac(m, m.duoi)
        : tenVanBan({ngay:m.ngay, soHieu:m.soHieu, loai:m.loai, trichYeu:m.tenVB||m.trichYeu}, m.duoi);
  return t===m.tenMoi;
}
/* QUÉT TỦ — chỉ trong thư mục Tủ hồ sơ; tìm file mới + tên lệch/chưa chuẩn rồi báo */
/* ==========================================================
   3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
   Gặp file chưa có chỉ mục thì xác định thuộc tab nào theo thứ tự: dấu app ghi trên file → THƯ MỤC chứa file → tên/nội dung.
   File đủ thông tin nhờ đường dẫn thì vào thẳng tab; thiếu thì vào Chờ khai (ghi rõ thuộc tab, lấy từ thư mục nào).
   Chỉ thấy file do app tạo / anh chọn qua Picker (quyền Drive hiện tại).
   ========================================================== */
function phanTheoDuong(duong, ten){
  var p = String(duong||'').split(' / ').map(function(x){ return x.trim(); }).filter(Boolean), a = p[0]||'';
  var bo = function(x){ return (!x || /^Chưa rõ/.test(x)) ? '' : x; };
  if(a==='Văn bản') return {tab:'vanBan'};
  if(a==='Dữ liệu tháng'){ var t = parseInt(String(p[2]||'').replace(/^T/i,''), 10); return {tab:'duLieu', ky: /^\d{4}$/.test(p[1]||'') && t ? p[1]+'-'+hai(t) : ''}; }
  if(a==='Biểu mẫu') return {tab:'bieuMau', nhom:p[1]||'Dùng chung'};
  if(a==='Ghi chú') return {tab:'ghiChu'};
  if(a==='CCCD') return {tab:'scan', che:'the', xa:bo(p[1]), diem:bo(p[2]), ap:bo(p[3]), to:bo(p[4]).replace(/^Tổ\s*/,'')};
  if(a==='Hồ sơ scan'){
    if(p[1]==='Chưa khai') return {tab:'scan', che:/ - người \d/.test(ten||'') ? 'the' : 'tailieu', chuaKhai:true};
    return {tab:'scan', che:'tailieu', xa:bo(p[1]), diem:bo(p[2]), ap:bo(p[3]), to:bo(p[4]).replace(/^Tổ\s*/,'')};
  }
  if(a==='Chữ ký - CCCD') return {tab:'kyAnh', thang:p[1]||''};
  if(a==='_ThungRac') return {tab:'rac'};
  if(a==='_Chờ xử lý') return {tab:'cho'};
  return {tab:'khac'};
}
var TEN_PHAN = {vanBan:'Văn bản', duLieu:'Dữ liệu tháng', bieuMau:'Biểu mẫu', ghiChu:'Thư viện · Ghi chú', scan:'Scan', kyAnh:'Chữ ký · CCCD', rac:'Thùng rác', cho:'Khay chờ', khac:'Chưa rõ phần'};
function tenKhachTuFile(ten){
  var t = String(ten||'').replace(/\.[^.]+$/,'');
  var m = t.match(/^(?:CCCD|HS)\x5F([^\x5F]+)/); if(m) return m[1].replace(/-/g,' ');
  return t;
}
function lapChiMuc(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Bấm chip Drive ở dải dưới để nối rồi làm lại.');
  if(QUET.chay) return bao('Đang chạy rồi, anh chờ chút.', 3);
  if(!DK.mo || DK.phan!=='lcm') moDonKho('lcm');
  QUET = {chay:true, dung:false, xong:0, tong:0, them:0, bo:0, dang:''};
  batChay(true, 'Đang lập chỉ mục — đi qua thư mục Tủ hồ sơ…', true);
  var now = new Date().toISOString();
  var kq = {luc:now, xem:0, daCo:0, moi:{}, khay:[], canKhai:[], lech:[], mat:[], saiCho:[], boQua:[]};
  Object.keys(TEN_PHAN).forEach(function(k){ kq.moi[k] = []; });
  var tu = function(){ return D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]); };
  var biet = {};
  tu().concat(D.rac||[], D.scan||[], D.kyAnh||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = m; });
  (D.cho||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = m; if(m.tuKhay) biet[m.tuKhay] = m; });
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.driveId) biet[f.driveId] = {boFile:true}; }); });
  nkDriveIds().forEach(function(d){ biet[d] = {boFile:true}; });   /* 3.52: ảnh / file ở tab Hôm nay */
  (D.daXoaHan||[]).forEach(function(t){ if(t.driveId) biet[t.driveId] = {daXoa:true}; });
  timThuMucKhongTao(D.cauHinh.thumuc).then(function(id){
    if(!id) throw new Error('Chưa có thư mục '+D.cauHinh.thumuc+' trên Drive');
    return gomTatCaDon(id);
  }).then(function(g){
    var coTrenDrive = {};
    g.files.forEach(function(f){ coTrenDrive[f.id] = 1; });
    kq.xem = g.files.length;
    g.files.forEach(function(f, i){
      if(QUET.dung) return;
      if(i%25===0){ dangLamChu('Lập chỉ mục · '+(i+1)+'/'+g.files.length+' file'); tienChay(Math.round(i/g.files.length*100)); }
      if(laFileHeThong({tenCu:f.name})) return;
      var phan = phanTheoDuong(f.duong, f.name), m = biet[f.id];
      if(m){
        kq.daCo++;
        if(m.daXoa || m.boFile) return;
        var laTu = tu().indexOf(m)>=0;
        if(laTu){
          if(f.name!==m.tenMoi){ kq.lech.push({id:m.id, ly:'Tên trên Drive khác trong app'}); delete m.driveKy; m.choKhai = true; m.lyDoKhai = 'Tên trên Drive khác trong app'; }
          if(/^(vanBan|duLieu|ghiChu|bieuMau)$/.test(phan.tab) && khoCuaMuc(m)!==phan.tab && !m.duongTuy)
            kq.saiCho.push({id:m.id, duong:f.duong, tab:phan.tab});
        }
        return;
      }
      if(/^application\/vnd\.google-apps\./.test(f.mimeType||'')){ kq.boQua.push(f.name+' (Google Docs gốc)'); return; }
      var r = taoMucTuDrive(f, phan, now);
      if(r && r.khay){ kq.khay.push(f); return; }
      if(r){ kq.moi[r.tab].push(r.m.id); if(r.canKhai) kq.canKhai.push(r.m.id); QUET.them++; }
    });
    tu().forEach(function(m){ if(m.driveId && !m.driveMat && !laFileHeThong(m) && !coTrenDrive[m.driveId]) kq.mat.push(m.id); });
    if(typeof HS!=='undefined') HS.ds = D.scan;
    noiLienKetSauQuet();
    DK.lcm = kq; QUET.chay = false; tatChay(); luu(); ve();
    var tongMoi = Object.keys(kq.moi).reduce(function(a,k){ return a+kq.moi[k].length; }, 0);
    if(kq.khay.length){ bao('Đã lập chỉ mục '+tongMoi+' file · đang đưa '+kq.khay.length+' file chưa rõ phần vào khay chờ…', 6); lapChiMucQD(kq.khay, true); }
    else bao('Lập chỉ mục xong: xem '+kq.xem+' file · '+tongMoi+' file mới vào tủ'+(kq.canKhai.length?' · '+kq.canKhai.length+' cần khai':'')+'.', 7);
  }).catch(function(e){ QUET.chay = false; tatChay(); baoLoi('Lập chỉ mục dừng: '+(e&&e.message||e)); });
}
/* dựng bản ghi cho một file Drive chưa có chỉ mục — theo dấu app hoặc theo thư mục */
function taoMucTuDrive(f, phan, now){
  if(phan.tab==='duLieu' || (f.appProperties && f.appProperties.th && tuMetaDrive(f).nhom==='duLieu')) return null;   /* 3.144: bỏ tab Tháng — không dựng lại mục Dữ liệu tháng */
  var canCu = 'Lập chỉ mục — nằm trong '+D.cauHinh.thumuc+(f.duong?' / '+f.duong:'');
  var co = function(m){
    m.driveId = f.id; m.driveCha = (f.parents||[])[0]||''; m.tenCu = f.name; m.duoi = duoiFile(f.name);
    m.co = +(f.size||0); m.themLuc = f.modifiedTime||now; m.chiMucThoi = true; m.canCu = m.canCu || canCu; return m;
  };
  /* 1. file app đã ghi dấu → khôi phục đúng tab, đủ phân loại */
  if(f.appProperties && f.appProperties.th){
    var km = tuMetaDrive(f); km.canCu = 'Khôi phục từ dấu app trên file · '+canCu;
    var k0 = laBieuMau(km) ? 'bieuMau' : (km.nhom==='duLieu' ? 'duLieu' : (km.nhom==='ghiChu' ? 'ghiChu' : 'vanBan'));
    if(phan.tab==='rac'){ km.xoaLuc = f.modifiedTime||now; km.suaLuc = now; km.khoCu = k0; D.rac.push(km); return {tab:'rac', m:km}; }
    D[k0] = D[k0]||[]; D[k0].push(km);
    var th0 = thieuThongTin(km).length; if(th0){ km.choKhai = true; km.lyDoKhai = 'Mới lập chỉ mục từ Drive'; }
    return {tab:k0, m:km, canKhai:!!th0};
  }
  var ten = f.name.replace(/\.[^.]+$/,''), laAnh = /^image\//.test(f.mimeType||'') || /\.(jpe?g|png|webp)$/i.test(f.name);
  var ngTen = rutNgay(ten) || ((ten.match(/\b20\d{2}-\d{2}-\d{2}\b/)||[])[0]) || '';
  var tab = phan.tab, m;
  /* 2. theo thư mục */
  if(tab==='vanBan'){
    var so = rutSoHieu(ten) || rutSoHieu(ten.replace(/-/g,'/'));
    m = co({id:idMoi(), nhom:'vanBan', ngay:ngTen || (f.modifiedTime||now).slice(0,10), soHieu:so||'', loai:doanLoai(ten, so),
      trichYeu:ten.replace(/^\d{4}-\d{2}(-\d{2})?[_ ]/,'').replace(/[_-]/g,' '), the:[], ctrinh:[], tenMoi:f.name});
    if(khopMauTenQuet(f.name)) m.canCu += ' · tên giống Dữ liệu tháng — kiểm lại?';
    D.vanBan.push(m);
  }else if(tab==='duLieu'){
    var mau = khopMauTenQuet(f.name), ky = phan.ky || ((ten.match(/\b(20\d{2})-(\d{2})\b/)||[])[0]) || (f.modifiedTime||now).slice(0,7);
    m = co({id:idMoi(), nhom:'duLieu', ky:ky, maLoai:mau?mau.ma:'KHAC', tenLoai:mau?mau.ten:'Khác', ghiThem:'', tenMoi:f.name});
    D.duLieu.push(m);
  }else if(tab==='ghiChu'){
    m = co({id:idMoi(), nhom:'ghiChu', ngay:ngTen || (f.modifiedTime||now).slice(0,10), moTa:ten.replace(/^\d{4}-\d{2}-\d{2}[_ ](GHI-CHU_|Ghi chú )?/,'').replace(/[_-]/g,' '), the:[], tenMoi:f.name});
    D.ghiChu.push(m);
  }else if(tab==='bieuMau'){
    m = co({id:idMoi(), ten:ten, nhom:phan.nhom, huongDan:false, soLanDung:0, tenMoi:f.name});
    D.bieuMau = D.bieuMau||[]; D.bieuMau.push(m);
  }else if(tab==='scan'){
    var t0 = f.modifiedTime||now;
    m = {id:idMoi(), che:phan.che, ten:tenKhachTuFile(f.name), xa:phan.xa||'', diem:phan.diem||'', ap:phan.ap||'', to:phan.to||'',
      ngay:t0.slice(0,10), taoLuc:t0, suaLuc:now, driveId:f.id, driveCha:(f.parents||[])[0]||'', may:'drive', tuDrive:true,
      tag:[], ctrinh:[], trang:[], co:+(f.size||0), canCu:canCu};
    if(phan.che==='the'){ m.matTruoc = true; m.matSau = true; }
    if(phan.chuaKhai) m.chuaKhai = true;
    D.scan = D.scan||[]; D.scan.push(m);
    return {tab:'scan', m:m, canKhai:!!(m.chuaKhai || !m.xa)};
  }else if(tab==='kyAnh'){
    var t1 = f.modifiedTime||now, loai = /\bCK\.(jpe?g|png)$/i.test(f.name) ? 'ky' : 'anh';
    var khach = f.name.replace(/\.[^.]+$/,'').replace(/^\d{4}-\d{2}-\d{2}\s*/,'').replace(/\s*(CK|CCCD)$/i,'');
    m = {id:'ka'+idMoi(), loai:loai, ten:f.name, khach:khach, co:+(f.size||0), ngay:ngTen || (phan.thang ? phan.thang+'-01' : t1.slice(0,10)),
      luc:t1, suaLuc:now, driveId:f.id, driveCha:(f.parents||[])[0]||'', may:'drive'};
    D.kyAnh = D.kyAnh||[]; D.kyAnh.push(m);
    return {tab:'kyAnh', m:m};
  }else if(tab==='rac'){
    m = co({id:idMoi(), tenMoi:f.name, nhom:'khac', khoCu:'vanBan', xoaLuc:f.modifiedTime||now, suaLuc:now, lyDoXoa:'Nằm sẵn trong _ThungRac (lập chỉ mục)'});
    D.rac.push(m);
    return {tab:'rac', m:m};
  }else{
    f.tuKhayDuong = f.duong;
    return {khay:true};
  }
  var th = thieuThongTin(m).length;
  if(th || /kiểm lại/.test(m.canCu)){ m.choKhai = true; m.lyDoKhai = 'Mới lập chỉ mục từ Drive'; }
  return {tab:tab, m:m, canKhai:!!(th || m.choKhai)};
}
function veLapChiMucHTML(){
  var h = '<div class="dk-mo-ta"><b>Lập chỉ mục</b> đi hết thư mục <b>'+coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+'</b> trên Drive để <b>mọi file đều được app quản lý</b>. '+
    'File chưa có trong app được xếp vào đúng tab theo <b>thư mục đang chứa file</b> (Văn bản, Dữ liệu tháng / năm / tháng, Biểu mẫu, Ghi chú, CCCD / xã / điểm / ấp / tổ, Hồ sơ scan, Chữ ký - CCCD). '+
    'Đủ thông tin thì vào thẳng tab, thiếu thì vào <b>Chờ khai</b>. App không dời, không đổi tên file nào.</div>'+
    '<div class="dk-hang"><button class="nho chinh" onclick="lapChiMuc()"'+(coTheNoiDrive()?'':' disabled')+'>🗂 Bắt đầu lập chỉ mục</button>'+
    (coTheNoiDrive() ? '' : '<span class="huong-dan">Cần nối Drive.</span>')+'</div>'+
    '<div class="huong-dan" style="margin:0 0 10px">Lưu ý: Google chỉ cho app thấy file do app tạo hoặc anh chọn qua “Lấy từ kho Drive cũ”. File chép tay vào ổ G thì đưa vào bằng <b>+ Thêm file</b>.</div>';
  var k = DK.lcm; if(!k) return h;
  var tongMoi = Object.keys(k.moi).reduce(function(a,x){ return a+k.moi[x].length; }, 0);
  h += '<div class="dk-khoi"><h4>Kết quả lần gần nhất · '+coChuHTML(k.luc.replace('T',' ').slice(0,16))+'</h4>'+
    '<div class="dk-tong">Đã xem <b>'+k.xem+'</b> file · đã có sẵn <b>'+k.daCo+'</b> · mới vào tủ <b>'+tongMoi+'</b>'+
    (k.canKhai.length?' · cần khai <b>'+k.canKhai.length+'</b>':'')+(k.khay.length?' · chưa rõ phần <b>'+k.khay.length+'</b> (vào khay chờ)':'')+
    (k.mat.length?' · <span class="ck-thieu">mất file '+k.mat.length+'</span>':'')+'</div>';
  Object.keys(TEN_PHAN).forEach(function(tab){
    var ids = k.moi[tab]||[]; if(!ids.length) return;
    h += '<details class="dk-ngan"><summary><b>'+TEN_PHAN[tab]+'</b> <span>'+ids.length+' mới</span></summary>'+
      ids.map(function(id){
        var m = timMuc(id) || timScan(id) || (D.kyAnh||[]).find(function(x){ return x.id===id; }) || (D.rac||[]).find(function(x){ return x.id===id; });
        if(!m) return '';
        var loai = tab==='scan' ? 'scan' : tab==='kyAnh' ? 'ka' : tab==='rac' ? 'rac' : 'muc';
        return '<div class="dk-dong"><div class="dk-ten" onclick="xemThu(\''+loai+'\',\''+id+'\')"><b>'+coChuHTML(m.tenMoi||m.ten||m.tenCu||'')+'</b>'+
          '<small>'+coChuHTML(duongThat(m, loai==='ka'?'ka':''))+'</small>'+
          (k.canKhai.indexOf(id)>=0 ? '<small class="ck-thieu">cần khai thêm</small>' : '')+'</div></div>';
      }).join('')+'</details>';
  });
  if(k.saiCho.length) h += '<details class="dk-ngan"><summary><b>Nằm khác thư mục của tab</b> <span>'+k.saiCho.length+' file — app tin theo chỉ mục, không dời</span></summary>'+
    k.saiCho.map(function(x){ var m = timMuc(x.id); if(!m) return '';
      return '<div class="dk-dong"><div class="dk-ten" onclick="xemThu(\'muc\',\''+x.id+'\')"><b>'+coChuHTML(m.tenMoi||'')+'</b>'+
        '<small>đang ở ☁ '+coChuHTML(D.cauHinh.thumuc+' / '+x.duong)+' · trong app thuộc '+coChuHTML(TEN_PHAN[khoCuaMuc(m)]||'')+'</small></div></div>'; }).join('')+'</details>';
  if(k.mat.length) h += '<details class="dk-ngan"><summary><b>Mất file trên Drive</b> <span>'+k.mat.length+' mục — dọn ở 🧹 Quét rác</span></summary>'+
    k.mat.map(function(id){ var m = timMuc(id); return m ? '<div class="dk-dong"><div class="dk-ten"><b>'+coChuHTML(m.tenMoi||'')+'</b><small>'+coChuHTML(thuMucCua(m))+'</small></div></div>' : ''; }).join('')+'</details>';
  if(k.boQua.length) h += '<div class="huong-dan">Bỏ qua: '+coChuHTML(k.boQua.join(' · '))+'</div>';
  var nCK = demChoKhai();
  h += '<div class="dk-hang" style="margin-top:8px">'+(nCK?'<button class="nho chinh" onclick="DK.mo=false;moChoKhai()">📥 Mở Chờ khai ('+nCK+')</button>':'')+'</div></div>';
  return h;
}
function ketQuet(t){
  QUET.chay = false; tatChay();
  luu(); capNhatDau(); ve(); dongHop();
  bao(t, 8);
}

/* --- 2. ĐỌC LẠI MỤC THIẾU --- */
function docLai(){
  var ds = mucThieu();
  if(!ds.length) return;
  dongHop();
  QUET = {chay:true, dung:false, xong:0, tong:ds.length, them:0, bo:0, dang:''};
  veQuet();
  ds.reduce(function(p, m){
    return p.then(function(){
      if(QUET.dung) return;
      QUET.xong++; QUET.dang = m.tenMoi||m.tenCu||''; veQuet();
      return docFile(m.id).then(function(b){
        if(!b) return;
        var f = new File([b], m.tenCu||'f.pdf', {type:b.type||'application/pdf'});
        return docChuPDF(f, D.cauHinh.soTrangDoc||2).then(function(kq){
          var chu = kq.chu||''; if(!chu) return;
          var mau = khopMau(chu);
          if(m.nhom==='duLieu'){
            if(mau){ m.maLoai = mau.ma; m.tenLoai = mau.ten; }
            m.ky = rutKy(chu)||m.ky;
            m.tenMoi = tenDuLieu(m, m.duoi);
            m.canCu = 'Đọc lại — khớp mẫu '+(mau?mau.ten:'Khác');
            QUET.them++;
            return;
          }
          var dauVB = docDauVB(chu), so = dauVB.so, ng = dauVB.ngay;   /* 3.53: chỉ phần đầu văn bản */
          var ty = rutTyVB(chu); if(ty && chuLoiFont(ty)) ty = null;
          if(so) m.soHieu = so;
          if(ng) m.ngay = ng;
          if(ty) m.trichYeu = ty;
          m.loai = doanLoai(chu, m.soHieu);
          if(!m.mang) m.mang = doanMang(chu);
          if(!(m.the||[]).length) m.the = goiYThe(chu, tuKhoaCua('tag'), dsTag('vanBan'));
          if(!(m.ctrinh||[]).length) m.ctrinh = ctGoiY(chu);
          m.tenMoi = tenVanBan(m, m.duoi);
          m.canCu = 'Đọc lại nội dung file';
          QUET.them++;
        });
      }).catch(function(e){ console.warn(e); });
    });
  }, Promise.resolve()).then(function(){
    ketQuet('Đọc lại xong. Cập nhật được '+QUET.them+' / '+ds.length+' mục.');
  });
}

/* --- 3. DỌN CHỈ MỤC --- */
/* 3.31 (mục 8 bàn giao): GOM FILE TRÙNG THEO DẤU VÂN (SHA-256, trường van)
   Mỗi nhóm cùng nội dung một khối; anh chọn bản giữ lại (mặc định: tên đúng chuẩn nhất, rồi bản mới nhất);
   bản còn lại vào THÙNG RÁC (khôi phục được), KHÔNG xóa hẳn. Thay cho nút "Dọn" cũ (xóa thẳng khỏi chỉ mục). */
function nhomTrungVan(){
  var nhom = {};
  ['vanBan','duLieu','ghiChu','bieuMau'].forEach(function(k){
    (D[k]||[]).forEach(function(m){ if(m.van && !laFileHeThong(m)) (nhom[m.van] = nhom[m.van]||[]).push({m:m, k:k}); });
  });
  return Object.keys(nhom).filter(function(v){ return nhom[v].length>1; }).map(function(v){
    var ds = nhom[v].slice().sort(function(a,b){
      return (tenDungChuan(b.m)?1:0)-(tenDungChuan(a.m)?1:0) ||
             String(b.m.themLuc||b.m.suaLuc||'').localeCompare(String(a.m.themLuc||a.m.suaLuc||''));
    });
    return {van:v, ds:ds};
  });
}

