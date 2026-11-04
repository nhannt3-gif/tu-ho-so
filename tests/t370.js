// t370 (3.465, anh 04/11): NHẬP QĐ THEO CHƯƠNG TRÌNH — 📄 Đọc QĐ (PDF) · Excel DANH_MUC · hộp nhập tay theo chương trình (Enter xuống cùng cột) · xem QĐ 2 kiểu (theo chương trình / theo xã, 3 cột như QĐ).
//   QĐ GIẢ dựng bằng trình duyệt (page.pdf) — cùng cấu trúc QĐ tỉnh: chương trình → phòng giao dịch → xã; bộ GIẢ tests/gianho31 (PGD khai báo Gò Dầu).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const tm=fs.mkdtempSync(path.join(os.tmpdir(),'t370-'));
 try {
  /* QĐ giả (PDF có chữ) */
  const dong=(s,t,a,c,e,dam)=>'<tr'+(dam?' style="font-weight:bold"':'')+'><td>'+s+'</td><td>'+t+'</td><td>'+a+'</td><td>'+c+'</td><td>'+e+'</td></tr>';
  const khoi=(la,ten,t,x)=>dong(la,ten,t[0],t[1],t[2],1)+dong('1','Phòng giao dịch NHCSXH Ninh Giả','10','-','10',1)+dong('1.1','Xã Giả Khác','10','-','10')+
    dong('2','Phòng giao dịch NHCSXH Gò Dầu',x.p[0],x.p[1],x.p[2],1)+x.xa.map((r,i)=>dong('2.'+(i+1),r[0],r[1],r[2],r[3])).join('');
  const html='<html><body style="font:14px Times New Roman"><p>ỦY BAN NHÂN DÂN TỈNH GIẢ</p><p>Số: 77777/QĐ-BĐDHĐQT Tỉnh Giả, ngày 15 tháng 8 năm 2026</p><p>QUYẾT ĐỊNH</p>'+
    '<p>Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng nguồn vốn Trung ương năm 2026 (đợt 8)</p><p>Căn cứ Quyết định số 162/QĐ-HĐQT ngày 17/4/2003;</p>'+
    '<div style="page-break-before:always"></div><p>DANH MỤC ĐIỀU CHỈNH</p><table border="1" style="border-collapse:collapse"><tr><td>STT</td><td>Đơn vị/chỉ tiêu</td><td>Đã giao</td><td>Điều chỉnh</td><td>Đến 31/12</td></tr>'+
    '<tr><td></td><td>KẾ HOẠCH DƯ NỢ</td><td></td><td></td><td></td></tr>'+
    khoi('I','Chương trình Hộ nghèo',['310','+ 30','340'],{p:['300','+ 30','330'],xa:[['Phường Gia Lộc','100','-','100'],['Phường Gò Dầu','120','+ 40','160'],['Xã Truông Mít','80','- 10','70']]})+
    khoi('II','Chương trình Hộ Cận Nghèo',['1.010','- 5','1.005'],{p:['1.000','- 5','995'],xa:[['Phường Gia Lộc','400','- 5','395'],['Phường Gò Dầu','350','-','350'],['Xã Truông Mít','250','-','250']]})+'</table></body></html>';
  const pg=await b.newPage(); await pg.setContent(html); fs.writeFileSync(path.join(tm,'qd_gia.pdf'), await pg.pdf({format:'A4'})); await pg.close();
  const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
  const dir=path.join(__dirname,'gianho31'); const files=fs.readdirSync(dir).map(n=>({n,b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
  await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM=1;
    for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } }
    kyChungDoi('2026-08'); slDoiTab('pb'); doiNgan(7); for(let i=0;i<40 && !document.querySelector('[data-lenh="pb.nhapPdf"]');i++) await w(200); await w(800); }, files);
  /* ① Đọc QĐ (PDF) */
  await p.setInputFiles('input[data-lenh="pb.nhapPdf"]', path.join(tm,'qd_gia.pdf')); await p.waitForTimeout(2500);
  let r=await p.evaluate(()=>{ const P=PB_P||{}, h=(document.getElementById('hop-in')||{}).innerText||'';
    return {dau:P.dau, pgd:P.pgd, xa:[...document.querySelectorAll('[data-lenh="pb.pXa"]')].map(x=>x.parentNode.textContent.trim()), ma:[...document.querySelectorAll('[data-lenh="pb.pMa"]')].map(x=>x.value).join(','), khop:/✓ Khớp/.test(h), luu:!!document.querySelector('[data-lenh="pb.pLuu"]')}; });
  ok('📄 Đọc QĐ (PDF): đầu QĐ tự điền — số, ký hiệu, ngày, TW, Điều chỉnh, đợt 8 (không lấy số Căn cứ)', r.dau && r.dau.so==='77777' && r.dau.kyHieu==='/QĐ-BĐDHĐQT' && r.dau.ngay==='2026-08-15' && r.dau.nguon===1 && r.dau.loai==='Điều chỉnh' && r.dau.dot==='8', JSON.stringify(r.dau));
  ok('PGD mặc định = PGD khai báo (Gò Dầu), 3 xã của PGD, mã CT tự ghép 01 / 19, kiểm khớp', r.pgd==='godau' && r.xa.length===3 && r.ma==='01,19' && r.khop && r.luu, r.pgd+' · '+r.xa.join(' | ')+' · '+r.ma);
  await p.evaluate(async()=>{ const x=[...document.querySelectorAll('[data-lenh="pb.pXa"]')].find(e=>/Truông Mít/.test(e.parentNode.textContent)); x.checked=false; x.dispatchEvent(new Event('change',{bubbles:true})); await new Promise(r=>setTimeout(r,400));
    document.querySelector('[data-lenh="pb.pLuu"]').click(); await new Promise(r=>setTimeout(r,800)); });
  r=await p.evaluate(()=>{ const ds=pbDL().qd.filter(q=>q.so==='77777'); return {n:ds.length, xa:ds.map(q=>q.tenXa).join(','), ct:ds[0] && ds[0].ct.map(c=>c.ma+':'+c.daGiao+'/'+c.tangGiam+'/'+c.den3112).join(' '), tong:ds[0] && JSON.stringify(ds[0].tong), pgd:ds[0] && ds[0].pgd, nho:JSON.stringify(pbDL().ch.ctQD||{})}; });
  ok('bỏ tích Xã Truông Mít → lưu 2 xã; số đúng từng cột; giữ dòng tổng PGD', r.n===2 && !/Truông/.test(r.xa) && /^01:100\/0\/100 19:400\/-5\/395$/.test(r.ct) && (t=>t && t['01']+''==='300,30,330' && t['19']+''==='1000,-5,995')(JSON.parse(r.tong||'null')) && /Gò Dầu/.test(r.pgd), r.xa+' · '+r.ct+' · '+r.tong);
  ok('nhớ tên chương trình trên QĐ → mã cho lần sau', /"ho ngheo":"01"/.test(r.nho) && /"ho can ngheo":"19"/.test(r.nho), r.nho);
  /* ② xem QĐ 2 kiểu */
  await p.evaluate(async()=>{ pbDoiMuc('qd'); await new Promise(r=>setTimeout(r,500)); document.querySelector('.pb-nhom-dau[data-lenh="pb.xem"]').click(); await new Promise(r=>setTimeout(r,500)); });
  r=await p.evaluate(()=>{ const t=document.querySelector('#pb-phai .pb-x-bang'); return {co:!!t, th:t ? [...t.querySelectorAll('th')].map(x=>x.textContent).join('|') : '', chu:t ? t.innerText : ''}; });
  ok('📋 Quyết định: cột phải xem QĐ THEO CHƯƠNG TRÌNH — 3 cột như QĐ, dòng chương trình = dòng PGD trên QĐ, các xã có giao', r.co && /đã giao\|Điều chỉnh đợt này\|Đến 31\/12\/2026/.test(r.th) && /I\. 01 HN/.test(r.chu) && /II\. 19 HCN/.test(r.chu) && /330/.test(r.chu) && /Phường Gò Dầu/.test(r.chu), r.th);
  ok('theo chương trình: bỏ bớt xã → báo Σ xã ≠ dòng PGD (đối chiếu QĐ)', /Σ 2 xã ≠ dòng PGD/.test(r.chu));
  await p.evaluate(async()=>{ document.querySelector('[data-lenh="pb.kieuQD"][data-v="xa"]').click(); await new Promise(r=>setTimeout(r,500)); });
  r=await p.evaluate(()=>({chu:(document.querySelector('#pb-phai .pb-x-bang')||{}).innerText||'', nho:D.cauHinh.pbKieuQD}));
  ok('chuyển THEO XÃ: mỗi xã + các chương trình của xã, nhớ lựa chọn', /📍 Phường Gia Lộc/.test(r.chu) && /2 chương trình/.test(r.chu) && r.nho==='xa');
  /* ③ hộp sửa: theo chương trình, tổng PGD, Enter xuống cùng cột */
  await p.evaluate(async()=>{ document.querySelector('#pb-phai [data-lenh="pb.sua"]').click(); await new Promise(r=>setTimeout(r,800)); });
  r=await p.evaluate(()=>{ const t=document.querySelector('#pb-f-bang'); const ct=[...t.querySelectorAll('.pb-f-ct')].map(x=>x.textContent.trim()); const tg=[...t.querySelectorAll('[data-lenh="pb.fTong"]')].map(x=>x.value);
    return {ct, tg, th:[...t.querySelectorAll('th')].map(x=>x.textContent).join('|'), canh:t.innerText.match(/✗ tổng các xã[^\n]*/)}; });
  ok('hộp sửa xếp THEO CHƯƠNG TRÌNH (I. 01 · II. 19 như QĐ), cột như QĐ, ô Tổng PGD điền sẵn từ QĐ', r.ct.length===2 && /^I\. 01/.test(r.ct[0]) && /^II\. 19/.test(r.ct[1]) && r.tg.slice(0,3).join(',')==='300,+30,330' && /Điều chỉnh đợt này \(4\)/.test(r.th), r.ct.join(' | ')+' · '+r.tg.join(','));
  ok('hộp sửa: tổng các xã ≠ dòng PGD (đã bỏ 1 xã) → báo đỏ', !!r.canh);
  await p.focus('#pb-f-bang [data-lenh="pb.fSo"][data-f="daGiao"][data-i="0"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  r=await p.evaluate(()=>{ const a=document.activeElement; return {f:a && a.getAttribute('data-f'), i:a && a.getAttribute('data-i'), xa:a && a.closest('tr').cells[0].textContent.trim()}; });
  ok('Enter = xuống xã dưới CÙNG CỘT (Đã giao)', r.f==='daGiao' && /Gò Dầu/.test(r.xa), JSON.stringify(r));
  await p.evaluate(()=>{ PB.F=null; dongHop(); });
  /* ④ Excel DANH_MUC (mẫu mới) — cùng màn xem trước */
  const x64=await p.evaluate(()=>{ const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([PB_XLS_COT.QD, ['88888','/QĐ-BĐDHĐQT','20/08/2026','TW','Giao mới','1','','']]), 'QD');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['stt','don_vi_chi_tieu','da_giao','dieu_chinh','den_31_12'],['','KẾ HOẠCH DƯ NỢ','','',''],['I','Chương trình Hộ nghèo',300,'+30',330],['1','Phòng giao dịch NHCSXH Gò Dầu',300,'+30',330],
      ['1.1','Phường Gia Lộc',100,'-',100],['1.2','Phường Gò Dầu',200,'+30',230]]), 'DANH_MUC');
    const a=XLSX.write(wb,{type:'array',bookType:'xlsx'}); let s=''; new Uint8Array(a).forEach(c=>s+=String.fromCharCode(c)); return btoa(s); });
  fs.writeFileSync(path.join(tm,'qd.xlsx'), Buffer.from(x64,'base64'));
  await p.setInputFiles('input[data-lenh="pb.nhapXls"]', path.join(tm,'qd.xlsx')); await p.waitForTimeout(1500);
  r=await p.evaluate(()=>({t:(document.querySelector('#hop-in .hop-tit')||{}).textContent||'', d:PB_P && PB_P.dau, n:document.querySelectorAll('[data-lenh="pb.pXa"]').length, khop:/✓ Khớp/.test((document.getElementById('hop-in')||{}).innerText||'')}));
  ok('📥 Excel mẫu mới (sheet DANH_MUC chép nguyên bảng QĐ) → cùng màn xem trước theo chương trình', /bảng danh mục/.test(r.t) && r.d && r.d.so==='88888' && r.d.loai==='Giao mới' && r.n===2 && r.khop, r.t);
  await p.evaluate(()=>{ PB_P=null; dongHop(); });
  /* ⑤ mẫu Excel tải về có DANH_MUC */
  r=await p.evaluate(()=>{ let f=null; const g=window.giaoFile; window.giaoFile=(blob,ten)=>{ f={blob,ten}; }; pbXlsMau(); window.giaoFile=g; return f ? f.blob.arrayBuffer().then(a=>XLSX.read(a,{type:'array'}).SheetNames.join(',')) : ''; });
  ok('⬇ Tải mẫu Excel: có sheet DANH_MUC (chép nguyên bảng QĐ) + lời nhắc Gemini', /QD/.test(r) && /DANH_MUC/.test(r), r);
  ok('không lỗi trang', !loi.length, loi.join(' | '));
 } finally { fs.rmSync(tm,{recursive:true,force:true}); }
 console.log(o.join('\n')); const sai=o.filter(x=>x.startsWith('✗')).length; console.log(sai?'✗ t370 SAI '+sai:'✓ t370 đạt '+o.length); await b.close(); process.exit(sai?1:0); })();
