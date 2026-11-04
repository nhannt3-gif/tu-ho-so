// t373 (3.470, anh 04/11 "đang gộp các điểm giao dịch, Gia Lộc gộp làm 1"): trong lúc gộp điểm GD, cột Tên xã Mẫu 31 ghi "… Vay trực tiếp"
//   → TÊN XÃ THEO MÃ XÃ ngay khi đọc bộ số liệu (slXaTenChuan ở slBo) — mọi tab dùng chung; Kiểm tra kỳ báo cặp mã · tên khác chuẩn;
//   Phân bổ › Diễn biến: ô chọn xã không còn "Vay trực tiếp", không trùng giá trị "Tất cả xã". Bộ GIẢ gianho31 (sửa tên xã 1 xã cả file, kỳ 08).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[]; const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message+' @ '+(e.stack||'').split('\n').slice(1,3).join(' ')));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir=path.join(__dirname,'gianho31'); const files=fs.readdirSync(dir).map(n=>({n,b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const o = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
   window.SL_KHONG_TU_KIEM=1; window.confirm=()=>true; const TT=/tr[ựu]c ti[ếe]p/i; let maXa='', tenCu='';
   for(const f of files){ const bin=atob(f.b); let u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i);
     if(/^Ho_so.*31-08-2026/i.test(f.n)){   /* giả lập lúc gộp điểm: cả 1 xã ghi Tên xã dạng "… Vay trực tiếp" (2 kiểu) */
       const wb=XLSX.read(u,{type:'array'}), sh=wb.Sheets[wb.SheetNames[0]], a=XLSX.utils.sheet_to_json(sh,{header:1,defval:''});
       const N=c=>String(c).trim(), h=a.findIndex(r=>r.some(c=>N(c)==='Tên xã')), cT=a[h].findIndex(c=>N(c)==='Tên xã'), cM=a[h].findIndex(c=>N(c)==='Mã xã');
       const dong=a.slice(h+1).filter(r=>String(r[cM]).trim()); maXa=String(dong[0][cM]).trim(); tenCu=String(dong[0][cT]);
       let n=0; for(let r=h+1;r<a.length;r++) if(String(a[r][cM]).trim()===maXa){ a[r][cT] = (n++%2 ? 'Vay trực tiếp' : tenCu+' - Vay trực tiếp'); }
       const s2=XLSX.utils.aoa_to_sheet(a); wb.Sheets[wb.SheetNames[0]]=s2; u=new Uint8Array(XLSX.write(wb,{type:'array',bookType:'xlsx'})); }
     const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } }
   const ky = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort().pop();
   const B = await slBo(ky), hs = B.co.hstd || [], cua = hs.filter(x=>String(x.xa)===maXa);
   ok('đọc bộ: cả xã '+maXa+' ghi "… Vay trực tiếp" → tên chuẩn theo mã xã (File Tổ trưởng / danh mục), không còn "trực tiếp"', cua.length>0 && !hs.some(x=>TT.test(x.tenXa||'')) && cua.every(x=>x.tenXa===B.xaTen[maXa]) && !TT.test(B.xaTen[maXa]), B.xaTen[maXa]+' · '+cua.length+' dòng');
   ok('giữ tên gốc để soát (tenXaGoc)', cua.every(x=>TT.test(x.tenXaGoc||'')));
   const Dn = await KHO.duNoAp(ky); ok('KHO.duNoAp (Phân bổ, Tổng hợp…): tên xã sạch', Dn && Dn.ds.length && !Dn.ds.some(x=>TT.test(x.tenXa)));
   kyChungDoi(ky); slDoiTab('hsv'); doiNgan(7); await w(1500);
   ok('cây địa bàn: tên xã của tổ sạch', Object.values(TO_K.to).filter(t=>String(t.xa)===maXa).every(t=>!TT.test(t.tenXa||'')));
   /* Kiểm tra kỳ: dòng soát tên xã */
   window.bao=()=>{}; await slKiemTra(ky, true); await w(500);
   const d = (((SLM.kt||{})[ky]||{}).kq||[]).find(x=>/Tên xã trên Mẫu 31/.test(x.ten||''));
   ok('Kiểm tra kỳ: báo "Tên xã trên Mẫu 31 = tên chuẩn" — cặp mã xã · tên khác chuẩn, số dòng', !!d && d.kq==='canh' && d.ds.some(r=>r[0]===maXa && TT.test(r[2])), d ? d.chu : 'không thấy dòng');
   /* Phân bổ › Diễn biến: ô chọn xã */
   const xa = B.xaTen, dl = pbDL(); dl.qd=[{id:'t373', so:'73000', kyHieu:'/QĐ-BĐDHĐQT', ngay:ky.slice(0,4)+'-02-01', nguon:1, loai:'Giao mới', dot:'1', xa:maXa, tenXa:'Vay trực tiếp', ct:[{ma:'01', daGiao:100, tangGiam:0, den3112:100}]}]; pbGhi(dl);
   slDoiTab('pb'); for(let i=0;i<40 && !(PB.dsXa||[]).length;i++) await w(200); pbDoiMuc('db'); await w(1500);
   const op = [...document.querySelectorAll('#pb-phai [data-lenh="pb.dbChon"][data-f="xaDs"]')];   /* 3.471: chọn xã = chip (chọn nhiều) */
   ok('Diễn biến: chọn xã chỉ 1 mục "Tất cả", không mục "trực tiếp", tên theo cây', op.length>1 && op.filter(x=>x.getAttribute('data-v')==='').length===1 && !op.some(x=>TT.test(x.textContent)) && op.some(x=>x.textContent.trim()===B.xaTen[maXa]), op.map(x=>x.getAttribute('data-v')+':'+x.textContent.trim()).join(' | ').slice(0,200));
   return o; }, files);
 o.push((loi.length?'✗ ':'✓ ')+'không lỗi trang'+(loi.length?' — '+loi.join(' | '):''));
 console.log(o.join('\n')); const sai=o.filter(x=>x.startsWith('✗')).length; console.log(sai?'✗ t373 SAI '+sai:'✓ t373 đạt '+o.length); await b.close(); process.exit(sai?1:0); })();
