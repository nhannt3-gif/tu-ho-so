/* ==========================================================
   15. NHỜ AI CHUẨN HÓA
   Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude)
   chuẩn lại tên và trích yếu → nạp bảng kết quả về, app cập nhật hàng loạt.
   ========================================================== */
function moNhoAI(){
  var cho = D.cho.length, thieu = mucThieu().length;
  moHop('<div class="hop-tit">Nhờ AI chuẩn hóa</div>'+
    '<div class="hop-phu">App xuất danh sách ra file. Anh đưa file đó cho AI kèm câu nhắc '+
    'có sẵn bên dưới, AI trả về bảng đã chuẩn, anh nạp lại vào đây.</div>'+
    '<div class="o"><label>Chọn nhóm cần chuẩn hóa</label><select id="ai-nhom">'+
      '<option value="cho">Đang chờ duyệt ('+cho+' file)</option>'+
      '<option value="thieu">Mục còn thiếu thông tin ('+thieu+' mục)</option>'+
      '<option value="vanban">Toàn bộ văn bản ('+D.vanBan.length+' mục)</option>'+
    '</select></div>'+
    '<div class="hang-nut">'+
      '<button class="nho chinh" onclick="xuatChoAI()">Xuất file cho AI</button>'+
      '<button class="nho" onclick="chepNhac()">Sao chép câu nhắc</button></div>'+
    '<div class="hang-nut" style="margin-top:7px">'+
      '<button class="nho" onclick="moDanAI()">Hoặc dán thẳng kết quả AI</button></div>'+
    '<div class="nhan-nhom">Câu nhắc gửi AI</div>'+
    '<div class="cay" id="ai-nhac" style="white-space:pre-wrap">'+coChuHTML(cauNhacAI())+'</div>'+
    '<div class="nhan-nhom">Nạp kết quả</div>'+
    '<div class="hang-nut">'+
      '<button class="nho chinh" onclick="napTuAI()">Nạp file AI trả về</button></div>'+
    '<div class="huong-dan">Nhận cả file .csv, .txt hoặc .json. App ghép theo cột <b>ma</b>, '+
    'chỉ đổi số hiệu, ngày, trích yếu và thẻ; không đụng tới nội dung file.</div>'+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho" onclick="dongHop();moCaiDat(\'chimuc\')">Đóng</button></div>', true);
}

function cauNhacAI(){
  return 'Đây là danh sách văn bản của Ngân hàng Chính sách xã hội, dạng CSV.\n'+
  'Với mỗi dòng, đọc cột ten_cu và trich_yeu rồi chuẩn hóa lại:\n'+
  '- so_hieu: dạng đầy đủ như 4079/NHCS-TDNN hoặc 958/KH-NHCS\n'+
  '- ngay: dạng YYYY-MM-DD\n'+
  '- trich_yeu: viết đủ ý, có dấu tiếng Việt, bỏ chữ "V/v" ở đầu\n'+
  '- nghiep_vu: chọn ĐÚNG MỘT mảng trong danh sách sau:\n'+
  '  '+(D.cauHinh.nghiepVu||[]).join('; ')+'\n'+
  '- chuong_trinh: chọn MỘT trong danh sách sau; áp dụng từ 2 chương trình trở lên thì ghi Dùng chung; để trống nếu không gắn:\n'+
  '  '+(D.cauHinh.chuongTrinh||[]).join('; ')+'\n'+
  '- loai: một trong '+(D.cauHinh.loaiVB||[]).join(', ')+'\n\n'+
  'Trả về ĐÚNG định dạng CSV với các cột theo thứ tự:\n'+
  'ma,so_hieu,ngay,loai,trich_yeu,nghiep_vu,chuong_trinh\n'+
  'Giữ nguyên cột ma. Không thêm giải thích, không thêm dòng nào khác.';
}
function chepNhac(){
  var t = cauNhacAI();
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){
    bao('Đã sao chép câu nhắc. Dán vào AI kèm file vừa xuất.', 5); });
  else bao('Trình duyệt không cho sao chép tự động.', 3);
}

function nhomAI(){
  var k = gt('ai-nhom');
  if(k==='cho') return D.cho.slice();
  if(k==='thieu') return mucThieu();
  return D.vanBan.slice();
}
function csvO(v){
  v = String(v==null?'':v);
  return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v;
}
function xuatChoAI(){
  var ds = nhomAI();
  if(!ds.length) return bao('Nhóm này đang trống.', 3);
  var d = [['ma','ten_cu','so_hieu','ngay','loai','trich_yeu','nghiep_vu','chuong_trinh']];
  ds.forEach(function(m){
    d.push([m.id, m.tenCu||'', m.soHieu||'', m.ngay||'', m.loai||'',
            m.trichYeu||m.moTa||'', m.mang||'', (m.ctrinh||[]).join('; ')]);
  });
  var csv = '\ufeff' + d.map(function(r){ return r.map(csvO).join(','); }).join('\n');
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
  a.download = 'ChoAI_'+ds.length+'-muc_'+ngayISO(nay())+'.csv';
  document.body.appendChild(a); a.click(); a.remove();
  bao('Đã xuất '+ds.length+' mục. Đưa file này cho AI kèm câu nhắc.', 6);
}

function docCSV(t){
  t = t.replace(/^\ufeff/,'');
  var ra = [], d = [], o = '', trongNhay = false;
  for(var i=0;i<t.length;i++){
    var c = t[i];
    if(trongNhay){
      if(c==='"'){ if(t[i+1]==='"'){ o+='"'; i++; } else trongNhay = false; }
      else o += c;
    }else{
      if(c==='"') trongNhay = true;
      else if(c===','){ d.push(o); o=''; }
      else if(c==='\n'){ d.push(o); ra.push(d); d=[]; o=''; }
      else if(c!=='\r') o += c;
    }
  }
  if(o||d.length){ d.push(o); ra.push(d); }
  return ra.filter(function(r){ return r.some(function(x){ return String(x).trim(); }); });
}

function napTuAI(){
  var i = document.createElement('input');
  i.type='file'; i.accept='.csv,.txt,.json';
  i.onchange = function(){
    var fr = new FileReader();
    fr.onload = function(){
      try{
        var t = String(fr.result), ds;
        if(t.trim().charAt(0)==='['){
          ds = JSON.parse(t);
        }else{
          var r = docCSV(t);
          if(r.length<2) throw new Error('File không có dòng dữ liệu nào');
          var cot = r[0].map(function(x){ return boDau(String(x).trim()).replace(/\s+/g,'_'); });
          ds = r.slice(1).map(function(d){
            var o = {};
            cot.forEach(function(c, k){ o[c] = String(d[k]==null?'':d[k]).trim(); });
            return o;
          });
        }
        var xong = 0, khong = 0;
        ds.forEach(function(x){
          var id = x.ma || x.id;
          var m = D.cho.find(function(y){ return y.id===id; }) || timMuc(id);
          if(!m){ khong++; return; }
          if(x.so_hieu) m.soHieu = x.so_hieu;
          if(x.ngay && /^\d{4}-\d{2}-\d{2}$/.test(x.ngay)) m.ngay = x.ngay;
          if(x.loai) m.loai = x.loai;
          if(x.trich_yeu) m.trichYeu = x.trich_yeu;
          /* 3.31: nghiệp vụ = Mảng (chọn một), không ghi vào Tag như trước */
          if(x.nghiep_vu!==undefined && x.nghiep_vu!==''){
            var mg = x.nghiep_vu.split(/[;,]/).map(function(z){ return z.trim(); }).filter(Boolean)[0];
            if(mg && dsMang().indexOf(mg)>=0) m.mang = mg;
          }
          if(x.chuong_trinh!==undefined && x.chuong_trinh!==''){
            var ct = x.chuong_trinh.split(/[;,]/).map(function(z){ return z.trim(); }).filter(Boolean);
            m.ctrinh = ct.length>1 ? ['Dùng chung'] : ct;
          }
          apDoiTuAI(m);
          m.canCu = 'AI chuẩn hóa, anh đã nạp lại';
          xong++;
        });
        luu(); dongHop(); ve(); if(DR.sanSang && DR.online) chayDongBoCho();
        bao('Đã cập nhật '+xong+' mục'+(khong?(', bỏ qua '+khong+' dòng không khớp'):'')+'.', 8);
      }catch(e){
        console.warn(e);
        baoLoi('Không đọc được file: '+(e&&e.message||e)+
               '. Cần đúng cột ma, so_hieu, ngay, loai, trich_yeu.');
      }
    };
    fr.readAsText(i.files[0]);
  };
  i.click();
}

