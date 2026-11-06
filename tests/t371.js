// t371 (3.466, anh 04/11 "khi sửa các QĐ, sao cho linh động được" — làm hết 6 ý): Phân bổ KH — SỬA QĐ LINH ĐỘNG.
//   ① ✎ Sửa nhanh ngay tại bảng xem · ② hộp sửa xếp theo chương trình ↔ theo xã · ③ khối chương trình: đổi mã, ＋ xã, 🗑 bỏ; xã: ＋ chương trình, 🗑 bỏ
//   ④ ghép xã chưa khớp cây (nhớ cho QĐ sau) · ⑤ ⧉ QĐ kế tiếp (Đã giao = Đến 31/12 QĐ này, đợt + 1) · ⑥ đọc lại QĐ đã có → so sánh cũ ↔ mới. Bộ GIẢ tests/gianho31, QĐ GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[]; const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir=path.join(__dirname,'gianho31'); const files=fs.readdirSync(dir).map(n=>({n,b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const o = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
   window.SL_KHONG_TU_KIEM=1; window.confirm=()=>true;
   for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('pb'); doiNgan(7); for(let i=0;i<40 && !(PB.dsXa||[]).length;i++) await w(200); await w(600);
   const X = n => (PB.dsXa.find(x=>x.ten.indexOf(n)>=0)||{}).ma, chon = (sel, v)=>{ const e=document.querySelector(sel); e.value=v; e.dispatchEvent(new Event('change',{bubbles:true})); };
   /* QĐ giả: 3 xã (1 xã tên lạ chưa khớp cây), chương trình 01, 19 */
   const ct = (dg, tg)=>[{ma:'01', ten:'Hộ nghèo', daGiao:dg, tangGiam:tg, den3112:dg+tg}, {ma:'19', ten:'Cận nghèo', daGiao:2*dg, tangGiam:0, den3112:2*dg}];
   const q = (xa, ten, dg, tg)=>({id:'t371'+ten, so:'55555', kyHieu:'/QĐ-BĐDHĐQT', ngay:'2026-08-10', nguon:1, loai:'Điều chỉnh', dot:'5', xa:xa, tenXa:ten, ct:ct(dg, tg), pgd:'Phòng giao dịch NHCSXH Gò Dầu', tong:{'01':[300,30,330]}});
   const dl=pbDL(); dl.qd=[q(X('Gia Lộc'),'Phường Gia Lộc',100,10), q(X('Gò Dầu'),'Phường Gò Dầu',120,20), q('','Xã Lạ Giả',80,0)]; pbGhi(dl); pbDoiMuc('qd'); await w(500);
   const k = pbKhoa(dl.qd[0]);
   /* ① sửa nhanh tại bảng */
   document.querySelector('#pb-phai [data-lenh="pb.suaNhanh"]').click(); await w(400);
   ok('✎ Sửa nhanh: bộ sửa hiện NGAY TẠI cột phải (không mở hộp), đủ ô số', !!document.querySelector('#pb-phai #pb-f #pb-f-bang') && !document.querySelector('#hop.hien #pb-f') && document.querySelectorAll('#pb-phai [data-lenh="pb.fSo"]').length===18);
   /* ④ ghép xã lạ */
   ok('xã chưa khớp cây có ô "ghép xã"', !!document.querySelector('[data-lenh="pb.fGhepXa"]'));
   chon('[data-lenh="pb.fGhepXa"]', X('Truông Mít')); await w(300);
   /* ③ đổi mã 19 → 09, ＋ chương trình cho 1 xã (kiểu theo xã), bỏ khối */
   chon('[data-lenh="pb.fDoiMa"][data-ma="19"]', '09'); await w(300);
   ok('đổi mã chương trình 19 → 09 (cả khối, giữ số)', PB.F.dong.filter(d=>d.ma==='09').length===3 && !PB.F.dong.some(d=>d.ma==='19') && PB.F.dong.find(d=>d.ma==='09').daGiao===200);
   document.querySelector('[data-lenh="pb.fKieu"][data-v="xa"]').click(); await w(300);
   ok('② hộp sửa xếp THEO XÃ: mỗi xã + ＋ chương trình, 🗑 bỏ xã', document.querySelectorAll('#pb-f-bang .pb-f-ct').length===3 && /📍 Phường Gia Lộc/.test(document.querySelector('#pb-f-bang').textContent) && !!document.querySelector('[data-lenh="pb.fThemCTXa"]') && !!document.querySelector('[data-lenh="pb.fBoXa"]'));
   chon('[data-lenh="pb.fThemCTXa"][data-xa="'+X('Gia Lộc')+'"]', '03'); await w(300);
   ok('＋ chương trình 03 chỉ cho Phường Gia Lộc', PB.F.dong.filter(d=>d.ma==='03').length===1 && PB.F.dong.find(d=>d.ma==='03').xa===X('Gia Lộc'));
   document.querySelector('[data-lenh="pb.fKieu"][data-v="ct"]').click(); await w(300);
   ok('chuyển lại theo chương trình: đầu khối có đổi mã · ＋ xã · 🗑 bỏ chương trình', document.querySelectorAll('[data-lenh="pb.fDoiMa"]').length===3 && !!document.querySelector('[data-lenh="pb.fThemXaCT"][data-ma="03"]') && !!document.querySelector('[data-lenh="pb.fBoCT"][data-ma="03"]'));
   document.querySelector('[data-lenh="pb.fBoCT"][data-ma="03"]').click(); await w(300);
   ok('🗑 bỏ chương trình 03 (cả khối)', !PB.F.dong.some(d=>d.ma==='03'));
   const so = document.querySelector('#pb-phai [data-lenh="pb.fSo"][data-f="tangGiam"]'); so.value='15'; so.dispatchEvent(new Event('change',{bubbles:true})); await w(300);
   document.querySelector('#pb-phai [data-lenh="pb.fLuu"]').click(); await w(600);
   let d=pbDL(), g=d.qd.filter(x=>x.so==='55555'), la=g.find(x=>x.tenXa.indexOf('Truông')>=0 || x.xa===X('Truông Mít'));
   ok('Lưu: xã lạ đã ghép đúng xã cây, nhớ tên cho QĐ sau', !!la && la.xa===X('Truông Mít') && (d.ch.xaQD||{})['xa la gia']===X('Truông Mít'), JSON.stringify(d.ch.xaQD));
   ok('Lưu: mã 09 thay 19, số sửa nhanh được ghi (Gia Lộc 01: 100 + 15 = 115), dòng tổng PGD theo mã giữ', g.every(x=>x.ct.some(c=>c.ma==='09') && !x.ct.some(c=>c.ma==='19')) && (g.find(x=>x.xa===X('Gia Lộc')).ct.find(c=>c.ma==='01')||{}).den3112===115 && g[0].tong['01']+''==='300,30,330');
   ok('sau Lưu: cột phải về bảng xem QĐ', !!document.querySelector('#pb-phai .pb-x-bang') && !document.querySelector('#pb-phai #pb-f'));
   /* Bỏ: không ghi */
   document.querySelector('#pb-phai [data-lenh="pb.suaNhanh"]').click(); await w(300);
   const s2=document.querySelector('#pb-phai [data-lenh="pb.fSo"][data-f="daGiao"]'); s2.value='999'; s2.dispatchEvent(new Event('change',{bubbles:true})); await w(200);
   document.querySelector('#pb-phai [data-lenh="pb.fBo"]').click(); await w(300);
   ok('Bỏ khi sửa nhanh: không ghi, về bảng xem', !pbDL().qd.some(x=>x.so==='55555' && x.ct.some(c=>c.daGiao===999)) && !!document.querySelector('#pb-phai .pb-x-bang'));
   /* ⑤ QĐ kế tiếp */
   document.querySelector('#pb-phai [data-lenh="pb.ke"]').click(); await w(400);
   const F=PB.F; ok('⧉ QĐ kế tiếp: chép 3 xã + chương trình, Đã giao = Đến 31/12 QĐ này, đợt 5 → 6, Điều chỉnh, số / ngày trống', F && !F.ids.length && !F.so && !F.ngay && F.dot==='6' && F.loai==='Điều chỉnh' && Object.keys(F.xa).length===3 && (F.dong.find(x=>x.xa===X('Gia Lộc') && x.ma==='01')||{}).daGiao===115);
   F.so='55556'; F.ngay='2026-09-20'; F.dong.forEach(x=>{ x.tangGiam=0; }); pbFLuu(); await w(500);
   ok('lưu QĐ kế tiếp → QĐ mới 3 xã', pbDL().qd.filter(x=>x.so==='55556').length===3);
   /* ⑥ đọc lại QĐ đã có → so sánh */
   const dau={so:'55556', kyHieu:'/QĐ-BĐDHĐQT', ngay:'2026-09-20', nguon:1, loai:'Điều chỉnh', dot:'6'};
   const rows=[{cap:'muc', ten:'KẾ HOẠCH DƯ NỢ'}, {stt:'I', ten:'Chương trình Hộ nghèo', so:[355,5,360]}, {stt:'1', ten:'Phòng giao dịch NHCSXH Gò Dầu', so:[355,5,360]},
     {stt:'1.1', ten:'Phường Gia Lộc', so:[115,5,120]}, {stt:'1.2', ten:'Phường Gò Dầu', so:[140,0,140]}, {stt:'1.3', ten:'Xã Lạ Giả', so:[80,0,80]},
     {stt:'II', ten:'Chương trình Cho vay Hộ mới thoát nghèo', so:[600,0,600]}, {stt:'1', ten:'Phòng giao dịch NHCSXH Gò Dầu', so:[600,0,600]},
     {stt:'1.1', ten:'Phường Gia Lộc', so:[200,0,200]}, {stt:'1.2', ten:'Phường Gò Dầu', so:[240,0,240]}, {stt:'1.3', ten:'Xã Lạ Giả', so:[160,0,160]}];
   pbPMo('doc_lai.xlsx', dau, rows, 'xls'); await w(400);
   const h=(document.getElementById('hop-in')||{}).innerText||'';
   ok('⑥ đọc lại QĐ đã có: báo so sánh — 1 dòng 01 đổi (Gia Lộc +5), xã lạ tự ghép theo tên đã nhớ', /So với QĐ đã lưu: 1 dòng thay đổi/.test(h) && /Phường Gia Lộc/.test(h) && !/Xã Lạ Giả \?/.test(h), (h.match(/So với QĐ đã lưu[^\n]*/)||[''])[0]);
   PB_P=null; dongHop();
   return o; }, files);
 o.push((loi.length?'✗ ':'✓ ')+'không lỗi trang'+(loi.length?' — '+loi.join(' | '):''));
 console.log(o.join('\n')); const sai=o.filter(x=>x.startsWith('✗')).length; console.log(sai?'✗ t371 SAI '+sai:'✓ t371 đạt '+o.length); await b.close(); process.exit(sai?1:0); })();
