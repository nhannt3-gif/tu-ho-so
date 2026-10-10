/* ==========================================================
   20. CÁC HÀM CÀI ĐẶT — bản dựng lại
   ========================================================== */

/* 3.31: hàm đếm địa bàn bị mất từ bản cũ — Cài đặt › Địa bàn, Nạp Excel, Nạp JSON, Lấy từ Drive đều gọi */
function demDiaBan(){
  var ra = {xa:0, diem:0, ap:0, to:0};
  (D.cauHinh.diaBan||[]).forEach(function(x){
    ra.xa++;
    (x.diem||[]).forEach(function(z){
      ra.diem++;
      (z.ap||[]).forEach(function(a){ ra.ap++; ra.to += (a.to||[]).length; });
    });
  });
  return ra;
}
function demDiaBan2(){ return demDiaBan(); }

/* ---- bật/tắt nhanh ---- */
function datLenDrive(v, el){
  D.cauHinh.tuLenDrive = v;
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.toggle('bat', b[i]===el);
  luu();
}
function datHSDrive(v, el){
  D.cauHinh.hsTuDrive = v;
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.toggle('bat', b[i]===el);
  luu();
}

/* ---- cây thư mục chuẩn trên Drive ---- */
function xemCay(){
  var g = D.cauHinh.thumuc||'Tủ hồ sơ';
  var n = nay().getFullYear();
  var t = g+'/\n'+
    '  Văn bản/\n'+
    '    '+(n-1)+'/\n'+
    '    '+n+'/\n'+
    '  Dữ liệu tháng/\n'+
    '    '+n+'/\n'+
    '      T01/ … T12/\n'+
    '  Ghi chú/\n'+
    '    '+n+'/\n'+
    '  Biểu mẫu/\n'+
    '  CCCD/<xã>/<điểm GD>/<ấp>/Tổ <n>/\n'+
    '  Khác/\n'+
    '  _Chờ xử lý/  (file app đưa lên chờ duyệt — file chép tay vào ổ G app không thấy)\n'+
    '  _Hệ thống/   (cauhinh.json, chỉ mục xuất ra)';
  window.__cay = t;
  moHop('<div class="hop-tit">Bộ thư mục chuẩn</div>'+
    '<div class="hop-phu">Bấm <b>Tạo bộ thư mục</b> ở mục Google Drive để app tự dựng, '+
    'hoặc tạo tay theo cây này. Thư mục năm và tháng chỉ tạo khi cần dùng tới.</div>'+
    '<div class="cay">'+coChuHTML(t)+'</div>'+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho" onclick="chepCay()">Sao chép</button>'+
      '<button class="nho chinh" onclick="dongHop();moCaiDat(\'drive\')">Đóng</button></div>');
}
function chepCay(){
  var t = window.__cay||'';
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){
    bao('Đã sao chép cây thư mục.', 3); });
  else bao('Trình duyệt không cho sao chép tự động.', 3);
}

/* ---- cây địa bàn: xem và sửa ---- */
var moNhanh2 = {};
function moCayDB(){
  moHop('<div class="hop-tit">Cây địa bàn</div>'+
    '<div class="hop-phu">Bấm từng cấp để mở. Sửa tên, thêm hoặc bớt ngay tại đây. '+
    'Đây cũng là nguồn cho các ô chọn ở màn quét hồ sơ.</div>'+
    '<div id="cay-db"></div>'+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho" onclick="themXa()">+ Thêm xã/phường</button>'+
      '<button class="nho chinh" onclick="dongHop();moCaiDat(\'diaban\')">Xong</button></div>',
    true);
  veCayDB();
}
function veCayDB(){
  var e = document.getElementById('cay-db'); if(!e) return;
  var ds = D.cauHinh.diaBan||[];
  var h = '';
  ds.forEach(function(x, ix){
    var idX = 'x'+ix, moX = moNhanh2[idX];
    var soAp = (x.diem||[]).reduce(function(a,z){ return a+(z.ap||[]).length; },0);
    var soTo = (x.diem||[]).reduce(function(a,z){
      return a+(z.ap||[]).reduce(function(b,p){ return b+(p.to||[]).length; },0); },0);
    h += '<div class="tm'+(moX?' mo':'')+'" id="db-'+idX+'">'+
      '<div class="tm-dau" onclick="batDB(\'' +idX+ '\')"><span class="mui">›</span>'+
      '<span class="ten">'+coChuHTML(x.xa)+'</span>'+
      '<span class="dem">'+(x.diem||[]).length+' điểm · '+soAp+' ấp · '+soTo+' tổ</span></div>'+
      '<div class="tm-than">';
    (x.diem||[]).forEach(function(z, iz){
      var idD = idX+'d'+iz, moD = moNhanh2[idD];
      h += '<div class="tm'+(moD?' mo':'')+'" id="db-'+idD+'" style="margin:6px 0">'+
        '<div class="tm-dau" onclick="batDB(\'' +idD+ '\')"><span class="mui">›</span>'+
        '<span class="ten">'+coChuHTML(z.ten)+
        (z.ngay?(' <span style="font-weight:400;color:var(--chu-phu)">· ngày '+z.ngay+'</span>'):'')+
        '</span><span class="dem">'+(z.ap||[]).length+' ấp</span></div>'+
        '<div class="tm-than">';
      (z.ap||[]).forEach(function(a, ia){
        var idA = idD+'a'+ia, moA = moNhanh2[idA];
        h += '<div class="tm'+(moA?' mo':'')+'" id="db-'+idA+'" style="margin:5px 0">'+
          '<div class="tm-dau" onclick="batDB(\'' +idA+ '\')"><span class="mui">›</span>'+
          '<span class="ten" style="font-weight:500">'+coChuHTML(a.ten)+'</span>'+
          '<span class="dem">'+(a.to||[]).length+' tổ</span></div>'+
          '<div class="tm-than">'+
          (a.to||[]).map(function(t){
            var nhan = typeof t==='string' ? t : (t.ma+' — '+t.ten+(t.ut?(' · ĐVUT '+t.ut):''));
            return '<div class="tm-file">'+coChuHTML(nhan)+'</div>';
          }).join('')+
          '<div class="hang-nut" style="margin:7px 0">'+
            '<button class="nho" onclick="suaNut(\'' +ix+','+iz+','+ia+ '\',\'ap\')">Sửa tên ấp</button>'+
            '<button class="nho" onclick="suaTo('+ix+','+iz+','+ia+')">Sửa danh sách tổ</button>'+
            '<button class="nho xau" onclick="boNut('+ix+','+iz+','+ia+')">Bỏ ấp</button>'+
          '</div></div></div>';
      });
      h += '<div class="hang-nut" style="margin:7px 0">'+
        '<button class="nho" onclick="themAp('+ix+','+iz+')">+ Thêm ấp</button>'+
        '<button class="nho" onclick="suaNut(\'' +ix+','+iz+ '\',\'diem\')">Sửa điểm</button>'+
        '<button class="nho xau" onclick="boNut('+ix+','+iz+')">Bỏ điểm</button>'+
        '</div></div></div>';
    });
    h += '<div class="hang-nut" style="margin:7px 0">'+
      '<button class="nho" onclick="themDiem('+ix+')">+ Thêm điểm GD</button>'+
      '<button class="nho" onclick="suaNut(\'' +ix+ '\',\'xa\')">Sửa tên xã</button>'+
      '<button class="nho xau" onclick="boNut('+ix+')">Bỏ xã</button>'+
      '</div></div></div>';
  });
  e.innerHTML = h || '<div class="rong">Chưa khai địa bàn nào.</div>';
}
/* 3.31 (mục 7 bàn giao): mở/đóng chỉ bật tắt class trên đúng nhánh — không dựng lại cả cây (trước giật trên iPhone) */
function batDB(id){
  moNhanh2[id] = !moNhanh2[id];
  var e = document.getElementById('db-'+id);
  if(e) e.classList.toggle('mo', moNhanh2[id]); else veCayDB();
}
function nutDB(ix, iz, ia){
  var x = D.cauHinh.diaBan[ix];
  if(iz===undefined) return x;
  var z = x.diem[iz];
  if(ia===undefined) return z;
  return z.ap[ia];
}
function suaNut(khoa, loai){
  var p = khoa.split(',').map(Number);
  var n = nutDB(p[0], p[1], p[2]);
  var cu = loai==='xa' ? n.xa : n.ten;
  var v = prompt('Tên mới:', cu);
  if(v===null) return;
  if(loai==='xa') n.xa = v.trim(); else n.ten = v.trim();
  if(loai==='diem'){
    var ng = prompt('Ngày giao dịch hằng tháng (để trống nếu không có):', n.ngay||'');
    if(ng!==null) n.ngay = ng.trim();
  }
  luu(); veCayDB();
}
function boNut(ix, iz, ia){
  hoi('Bỏ mục này?','Bỏ đi thì các cấp bên trong cũng mất. Hồ sơ đã lưu không bị ảnh hưởng.',
      'Bỏ', function(){
    if(ia!==undefined) D.cauHinh.diaBan[ix].diem[iz].ap.splice(ia,1);
    else if(iz!==undefined) D.cauHinh.diaBan[ix].diem.splice(iz,1);
    else D.cauHinh.diaBan.splice(ix,1);
    luu(); dongHop(); moCayDB();
  });
}
function themXa(){
  var v = prompt('Tên xã/phường:',''); if(!v) return;
  (D.cauHinh.diaBan = D.cauHinh.diaBan||[]).push({xa:v.trim(), diem:[]});
  luu(); veCayDB();
}
function themDiem(ix){
  var v = prompt('Tên điểm giao dịch:',''); if(!v) return;
  var ng = prompt('Ngày giao dịch hằng tháng:','') || '';
  D.cauHinh.diaBan[ix].diem.push({ten:v.trim(), ngay:ng.trim(), ap:[]});
  luu(); veCayDB();
}
function themAp(ix, iz){
  var v = prompt('Tên ấp / khu phố:',''); if(!v) return;
  D.cauHinh.diaBan[ix].diem[iz].ap.push({ten:v.trim(), to:[]});
  luu(); veCayDB();
}
function suaTo(ix, iz, ia){
  var a = nutDB(ix, iz, ia);
  var cu = (a.to||[]).map(function(t){
    return typeof t==='string' ? t : (t.ma+' | '+t.ten+(t.ut?(' | '+t.ut):''));
  }).join('\n');
  moHop('<div class="hop-tit">Danh sách tổ — '+coChuHTML(a.ten)+'</div>'+
    '<div class="hop-phu">Mỗi dòng một tổ, dạng: <b>Mã tổ | Tên tổ trưởng | ĐVUT</b>. '+
    'Mã tổ chính là mã tổ trưởng, đổi người thì giữ nguyên mã.</div>'+
    ta('','sto',cu)+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();moCayDB()">Thôi</button>'+
    '<button class="nho chinh" onclick="luuTo('+ix+','+iz+','+ia+')">Lưu</button></div>', true);
}
function luuTo(ix, iz, ia){
  var a = nutDB(ix, iz, ia);
  a.to = gt('sto').split('\n').map(function(d){ return d.trim(); }).filter(Boolean)
    .map(function(d){
      var p = d.split('|').map(function(x){ return x.trim(); });
      return p.length>1 ? {ma:p[0], ten:p[1], ut:p[2]||''} : {ma:p[0], ten:''};
    });
  luu(); dongHop(); moCayDB();
}

/* ---- xuất / nạp danh mục dạng JSON ---- */
function xuatDB(){
  var j = JSON.stringify({loai:'danh-muc-dia-ban', donvi:D.cauHinh.donvi,
    xuatLuc:new Date().toISOString(), diaBan:D.cauHinh.diaBan}, null, 1);
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([j],{type:'application/json'}));
  a.download = 'DanhMuc_DiaBan_'+ngayISO(nay())+'.json';
  document.body.appendChild(a); a.click(); a.remove();
  bao('Đã xuất danh mục. Sửa xong bấm Nạp từ file.', 5);
}
function napDB(){
  var i = document.createElement('input');
  i.type='file'; i.accept='.json,.txt';
  i.onchange = function(){
    var fr = new FileReader();
    fr.onload = function(){
      try{
        var j = JSON.parse(fr.result);
        var db = j.diaBan || j;
        if(!Array.isArray(db) || !db.length || !db[0].xa)
          throw new Error('Không thấy danh sách xã trong file');
        var cu = demDiaBan();
        D.cauHinh.diaBan = db; luu();
        var m = demDiaBan();
        dongHop(); moCaiDat('diaban');
        bao('Đã nạp: '+m.xa+' xã · '+m.diem+' điểm · '+m.ap+' ấp · '+m.to+
            ' tổ (trước đó '+cu.ap+' ấp).', 8);
      }catch(e){ baoLoi('File không đúng định dạng danh mục: '+(e&&e.message||e)); }
    };
    fr.readAsText(i.files[0]);
  };
  i.click();
}

/* ---- xuất / nạp danh mục dạng Excel ---- */
function xuatExcel(){
  if(!window.XLSX) return baoLoi('Chưa tải được bộ Excel. Có mạng một lần rồi thử lại.');
  var wb = XLSX.utils.book_new();

  var hd = [['Xã/Phường','Mã xã','Điểm giao dịch','Mã điểm','Ngày GD',
             'Ấp/Khu phố','Mã ấp','Mã tổ','Tên tổ trưởng','ĐVUT']];
  (D.cauHinh.diaBan||[]).forEach(function(x){
    (x.diem||[]).forEach(function(z){
      (z.ap||[]).forEach(function(a){
        if(!(a.to||[]).length){
          hd.push([x.xa, x.ma||'', z.ten, z.ma||'', z.ngay||'', a.ten, a.ma||'', '', '', '']);
          return;
        }
        (a.to||[]).forEach(function(t){
          var o2 = typeof t==='string' ? {ma:t, ten:'', ut:''} : t;
          hd.push([x.xa, x.ma||'', z.ten, z.ma||'', z.ngay||'', a.ten, a.ma||'',
                   o2.ma||'', o2.ten||'', o2.ut||'']);
        });
      });
    });
  });
  var s1 = XLSX.utils.aoa_to_sheet(hd);
  s1['!cols'] = [{wch:18},{wch:9},{wch:18},{wch:13},{wch:8},{wch:16},{wch:11},
                 {wch:10},{wch:24},{wch:7}];
  XLSX.utils.book_append_sheet(wb, s1, 'Dia ban');

  var s2 = XLSX.utils.aoa_to_sheet([['Tên báo cáo','Mã trong tên file','Từ khóa nhận dạng']]
    .concat((D.cauHinh.mauBaoCao||[]).map(function(m){
      return [m.ten, m.ma, (m.tuKhoa||[]).join(', ')]; })));
  s2['!cols'] = [{wch:26},{wch:22},{wch:44}];
  XLSX.utils.book_append_sheet(wb, s2, 'Mau bao cao');

  var n = Math.max((D.cauHinh.nghiepVu||[]).length, (D.cauHinh.chuongTrinh||[]).length,
                   (D.cauHinh.loaiVB||[]).length);
  var dm = [['Mảng nghiệp vụ','Chương trình vay','Loại văn bản']];
  for(var i=0;i<n;i++) dm.push([
    (D.cauHinh.nghiepVu||[])[i]||'', (D.cauHinh.chuongTrinh||[])[i]||'',
    (D.cauHinh.loaiVB||[])[i]||'']);
  var s3 = XLSX.utils.aoa_to_sheet(dm);
  s3['!cols'] = [{wch:24},{wch:24},{wch:18}];
  XLSX.utils.book_append_sheet(wb, s3, 'Danh muc');

  var tg = [['Tab','Tag']];
  ['vanBan','duLieu','ghiChu','scan','bieuMau'].forEach(function(tb){
    dsTag(tb).forEach(function(t){ tg.push([tb, t]); });
  });
  var s5 = XLSX.utils.aoa_to_sheet(tg);
  s5['!cols'] = [{wch:12},{wch:32}];
  XLSX.utils.book_append_sheet(wb, s5, 'Tag');

  var s4 = XLSX.utils.aoa_to_sheet([
    ['HƯỚNG DẪN SỬA FILE NÀY'],[''],
    ['Sheet "Dia ban": mỗi dòng một tổ TK&VV. Cấp trên lặp lại ở mỗi dòng.'],
    ['  - Thêm tổ mới: thêm một dòng, điền đủ từ cột Xã đến cột ĐVUT.'],
    ['  - Thêm ấp chưa có tổ: điền tới cột Mã ấp, ba cột cuối để trống.'],
    ['  - Đổi tổ trưởng: giữ nguyên Mã tổ, chỉ sửa cột Tên tổ trưởng.'],
    ['  - Bỏ tổ: xóa cả dòng đó.'],[''],
    ['Sheet "Mau bao cao": app so Từ khóa với nội dung PDF để nhận ra loại báo cáo.'],
    ['Sheet "Danh muc": ba danh mục dùng chung cho mọi tab.'],
    ['Sheet "Tag": cột Tab ghi vanBan / duLieu / ghiChu / scan / bieuMau.'],[''],
    ['Sửa xong lưu lại rồi vào app: Cài đặt > Địa bàn > Nạp Excel.']
  ]);
  s4['!cols'] = [{wch:86}];
  XLSX.utils.book_append_sheet(wb, s4, 'Huong dan');

  XLSX.writeFile(wb, 'DanhMuc_TuHoSo_'+ngayISO(nay())+'.xlsx');
  bao('Đã xuất Excel. Sửa xong bấm Nạp Excel để đưa trở lại.', 6);
}

function napExcel(){
  if(!window.XLSX) return baoLoi('Chưa tải được bộ Excel. Có mạng một lần rồi thử lại.');
  var i = document.createElement('input');
  i.type='file'; i.accept='.xlsx,.xls,.csv';
  i.onchange = function(){
    var fr = new FileReader();
    fr.onload = function(){
      try{
        var wb = XLSX.read(new Uint8Array(fr.result), {type:'array'});
        var cu = demDiaBan(), doi = [];

        var sh = wb.Sheets['Dia ban'] || wb.Sheets[wb.SheetNames[0]];
        if(sh){
          var r = XLSX.utils.sheet_to_json(sh, {header:1, defval:''});
          var cay = [];
          for(var k=1;k<r.length;k++){
            var d = r[k].map(function(x){ return String(x==null?'':x).trim(); });
            if(!d[0] || !d[2] || !d[5]) continue;
            var xa = cay.find(function(y){ return y.xa===d[0]; });
            if(!xa){ xa = {xa:d[0], ma:d[1], diem:[]}; cay.push(xa); }
            var dm2 = xa.diem.find(function(y){ return y.ten===d[2]; });
            if(!dm2){ dm2 = {ten:d[2], ma:d[3], ngay:d[4], ap:[]}; xa.diem.push(dm2); }
            var ap = dm2.ap.find(function(y){ return y.ten===d[5]; });
            if(!ap){ ap = {ten:d[5], ma:d[6], to:[]}; dm2.ap.push(ap); }
            if(d[7]) ap.to.push({ma:d[7], ten:d[8]||'', ut:d[9]||''});
          }
          if(cay.length){ D.cauHinh.diaBan = cay; doi.push('địa bàn'); }
        }

        var sm = wb.Sheets['Mau bao cao'];
        if(sm){
          var rm = XLSX.utils.sheet_to_json(sm, {header:1, defval:''});
          var mau = [];
          for(var k2=1;k2<rm.length;k2++){
            var d2 = rm[k2].map(function(x){ return String(x==null?'':x).trim(); });
            if(!d2[0]) continue;
            mau.push({ten:d2[0], ma:(d2[1]||slug(d2[0],4)).toUpperCase(),
              tuKhoa:(d2[2]||'').split(',').map(function(x){ return x.trim(); }).filter(Boolean)});
          }
          if(mau.length){ D.cauHinh.mauBaoCao = gopMauBaoCao(mau); doi.push('mẫu báo cáo'); }
        }

        var sd = wb.Sheets['Danh muc'];
        if(sd){
          var rd = XLSX.utils.sheet_to_json(sd, {header:1, defval:''});
          var cot = [[],[],[]];
          for(var k3=1;k3<rd.length;k3++){
            for(var c2=0;c2<3;c2++){
              var v = String(rd[k3][c2]==null?'':rd[k3][c2]).trim();
              if(v) cot[c2].push(v);
            }
          }
          if(cot[0].length) D.cauHinh.nghiepVu = cot[0];
          if(cot[1].length) D.cauHinh.chuongTrinh = cot[1];
          if(cot[2].length) D.cauHinh.loaiVB = cot[2];
          if(cot[0].length||cot[1].length) doi.push('danh mục');
        }

        var st = wb.Sheets['Tag'];
        if(st){
          var rt = XLSX.utils.sheet_to_json(st, {header:1, defval:''});
          var gom = {};
          for(var k4=1;k4<rt.length;k4++){
            var tb = String(rt[k4][0]||'').trim(), tg2 = String(rt[k4][1]||'').trim();
            if(!tb || !tg2) continue;
            (gom[tb] = gom[tb]||[]).push(tg2);
          }
          if(Object.keys(gom).length){
            D.cauHinh.tagTab = D.cauHinh.tagTab || {};
            for(var tb2 in gom) D.cauHinh.tagTab[tb2] = gom[tb2];
            doi.push('tag');
          }
        }

        if(!doi.length) throw new Error('Không thấy sheet nào đúng khuôn');
        luu();
        var m2 = demDiaBan();
        dongHop(); moCaiDat('diaban');
        bao('Đã nạp '+doi.join(', ')+'. Địa bàn: '+m2.xa+' xã · '+m2.diem+' điểm · '+
            m2.ap+' ấp · '+m2.to+' tổ (trước đó '+cu.ap+' ấp · '+cu.to+' tổ).', 9);
      }catch(e){
        console.warn(e);
        baoLoi('File Excel không đúng khuôn: '+(e&&e.message||e)+
               '. Nên xuất Excel từ app rồi sửa trên bản đó.');
      }
    };
    fr.readAsArrayBuffer(i.files[0]);
  };
  i.click();
}
