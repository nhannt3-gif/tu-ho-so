// Mục 13 bàn giao: có thư viện thật, thêm file vào từng tab, đi 6 tab ở máy tính và iPhone
const { chromium, devices } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const kq=[]; function ok(t,d,g){ kq.push((d?'✓ ':'✗ ')+t+(g?' — '+g:'')); }
(async()=>{
  const b = await chromium.launch();
  for(const may of [{ten:'máy tính', opt:{viewport:{width:1400,height:900}}}, {ten:'iPhone', opt:devices['iPhone 13']}]){
    const ctx = await b.newContext(may.opt); const p = await ctx.newPage();
    const loi=[]; p.on('pageerror',e=>loi.push(e.message)); p.on('console',m=>{ if(m.type()==='error' && !/ERR_FAILED|net::/.test(m.text())) loi.push('console: '+m.text()); });
    await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
    await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(2500);
    ok(`[${may.ten}] bản 3.33, thư viện nạp đủ`, await p.evaluate(()=>APP_BAN==='3.122' && !!window.pdfjsLib && !!window.PDFLib && !!window.XLSX));
    let tabs=''; for(const i of [0,1,2,5,4,3]){ tabs += await p.evaluate(async i=>{ doiNgan(i); await new Promise(r=>setTimeout(r,300)); var t=document.getElementById('tr'+i); return i+':'+(t&&t.innerHTML.length>50?'ok':'TRỐNG')+' '; }, i); }
    ok(`[${may.ten}] đi hết 6 tab`, !/TRỐNG/.test(tabs), tabs);
    const r = await p.evaluate(async()=>{
      var out={}, cho = ms=>new Promise(r=>setTimeout(r,ms));
      HTMLInputElement.prototype.click = function(){ var el=this; if(window.__fileThu){ Object.defineProperty(el,'files',{value:window.__fileThu, configurable:true}); window.__fileThu=null; setTimeout(function(){ el.onchange&&el.onchange(); },0); } };
      // 1. PDF văn bản thật (pdf-lib) → đọc số hiệu, ngày
      var pdf = await PDFLib.PDFDocument.create(); var f = await pdf.embedFont(PDFLib.StandardFonts.Helvetica); var pg = pdf.addPage([595,842]);
      pg.drawText('So: 958/KH-NHCS', {x:50,y:780,size:12,font:f}); pg.drawText('KE HOACH', {x:50,y:740,size:14,font:f});
      pg.drawText('V/v trien khai ke hoach tin dung nam 2026', {x:50,y:720,size:12,font:f}); pg.drawText('Go Dau, 11/09/2026', {x:350,y:780,size:12,font:f});
      var bpdf = new Blob([await pdf.save()],{type:'application/pdf'});
      doiNgan(1); D.cho=[]; await gioiThieuFile([new File([bpdf],'scan001.pdf',{type:'application/pdf'})]); await cho(300);
      var c = D.cho[0]; out.pdf = c ? {so:c.soHieu, ngay:c.ngay, ten:c.tenMoi} : 'không vào khay';
      if(c){ duyet(c.id,true); await cho(300); out.pdfVao = D.vanBan.some(x=>x.id===c.id) && nganHienTai===1; }
      // 2. Excel tab Tháng (tên chuẩn) → Dữ liệu tháng
      doiNgan(2); D.cho=[]; TAB_TRUOC=2;
      await gioiThieuFile([new File(['x'+Math.random()],'NQH_Phuong_Gia_Loc_2026_09.xlsx')]); await cho(300);
      c = D.cho[0]; out.xls = c ? {nhom:c.nhom, ma:c.maLoai, ky:c.ky, pham:c.phamVi} : 'không vào khay';
      if(c){ duyet(c.id,true); await cho(300); out.xlsO = oDoiChieu('2026-09','NQH','Phường Gia Lộc').tt; }
      // 3. Biểu mẫu
      doiNgan(5); var n0=(D.bieuMau||[]).length; window.__fileThu=[new File(['mau'],'Don vay 01TD.docx')]; themBieuMau(); await cho(600);
      out.bm = (D.bieuMau||[]).length-n0; out.bmTen = (D.bieuMau||[]).slice(-1)[0] && D.bieuMau.slice(-1)[0].tenMoi; dongHop();
      // 4. Ghi chú (ảnh)
      var cv=document.createElement('canvas'); cv.width=200; cv.height=120; cv.getContext('2d').fillRect(10,10,50,50);
      var anh = await new Promise(r=>cv.toBlob(r,'image/jpeg'));
      doiNgan(3); D.cho=[]; await gioiThieuFile([new File([anh],'ghichu.jpg',{type:'image/jpeg'})]); await cho(300);
      c = D.cho[0]; if(c){ duyet(c.id,true); await cho(300); } out.gc = D.ghiChu.length;
      // 5. Scan: lưu tạm 2 mặt thẻ
      doiNgan(4); await cho(300); SC.che='the';
      var anh2 = await new Promise(r=>{ var k=document.createElement('canvas'); k.width=856; k.height=540; k.getContext('2d').fillRect(0,0,100,100); k.toBlob(r,'image/jpeg'); });
      nhanVaoScan([new File([anh],'t.jpg',{type:'image/jpeg'}), new File([anh2],'s.jpg',{type:'image/jpeg'})],'photo'); await cho(1200);
      luuSauHang(); await cho(500); out.scan = D.scan.length+' bản · '+(D.scan[0]&&D.scan[0].matSau?'đủ 2 mặt':'thiếu');
      var anhDoc = await docAnhHS(D.scan[0].id+'_matTruoc'); out.anhMaHoa = !!anhDoc;
      // 6. Cài đặt đủ trang
      var cd=[]; ['vanBan','duLieu','ghiChu','scan','bieuMau','chung','drive','diaban','chimuc','lich','dulieu','hd'].forEach(function(k){ try{ moCaiDat(k); if(document.getElementById('cd-noi').innerHTML.length<30) cd.push(k+' trống'); }catch(e){ cd.push(k+': '+e.message); } }); dongCaiDat();
      out.caiDat = cd.join(', ')||'ok';
      // 7. Xuất rồi nạp dự phòng (gộp, không nhân đôi)
      var goi = {vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu, bieuMau:D.bieuMau, scan:D.scan, rac:D.rac, lich:D.lich, cauHinh:{}};
      var nTruoc = D.vanBan.length+D.bieuMau.length+D.scan.length;
      window.__fileThu=[new File([JSON.stringify(goi)],'dp.json')]; napDL(); await cho(500);
      out.napDL = (D.vanBan.length+D.bieuMau.length+D.scan.length)===nTruoc;
      return out;
    });
    ok(`[${may.ten}] PDF đọc được số hiệu + ngày, vào tab Văn bản`, r.pdf && r.pdf.so==='958/KH-NHCS' && r.pdf.ngay==='2026-09-11' && r.pdfVao, JSON.stringify(r.pdf));
    ok(`[${may.ten}] Excel tab Tháng vào đúng ô ma trận`, r.xls && r.xls.nhom==='duLieu' && r.xls.ma==='NQH' && r.xlsO==='du', JSON.stringify(r.xls));
    ok(`[${may.ten}] thêm biểu mẫu, đặt tên chuẩn`, r.bm===1 && /^MAU_/.test(r.bmTen||''), r.bmTen);
    ok(`[${may.ten}] thêm ghi chú ảnh`, r.gc===1);
    ok(`[${may.ten}] scan thẻ 2 mặt, đọc lại ảnh được`, /1 bản · đủ 2 mặt/.test(r.scan) && r.anhMaHoa, r.scan);
    ok(`[${may.ten}] mở đủ 12 trang Cài đặt`, r.caiDat==='ok', r.caiDat);
    ok(`[${may.ten}] nạp lại dự phòng không nhân đôi`, r.napDL);
    ok(`[${may.ten}] không lỗi đỏ trong Console`, !loi.length, loi.join(' | '));
    await ctx.close();
  }
  await b.close(); console.log(kq.join('\n'));
})();
