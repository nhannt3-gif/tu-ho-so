// t372 (3.467, anh 04/11 "thêm 1 nút thống kê QĐ theo ngày, dòng thời gian, có số thứ tự để kiểm tra xem có đợt nào bỏ sót; tỉnh có đợt giao QĐ nhưng không giao cho Gò Dầu
//   anh cũng muốn nhập số QĐ"; "số đợt lưu theo QĐ anh nhập nếu QĐ có ghi, còn em cứ ghi stt từ QĐ đầu tiên"): 📅 DÒNG THỜI GIAN QĐ + QĐ KHÔNG GIAO CHO PGD. Bộ GIẢ gianho31, QĐ GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), vm=require('vm');
/* lõi (node) */
const ctx=vm.createContext({console}); vm.runInContext(fs.readFileSync(path.join(__dirname,'..','js','47-phan-bo.js'),'utf8'), ctx);
const o=[], ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
const nq=(so,ng,nguon,dot,tg,nx)=>({k:so, ds:Array.from({length:nx||1},()=>({so, ngay:ng, nguon, loai:'Điều chỉnh', dot, ct:[{tangGiam:tg}]}))});
const r=vm.runInContext('pbDongThoiGian(a, b)', Object.assign(ctx,{a:[nq('11','2026-03-01',1,'2',10,2), nq('10','2026-01-05',1,'1',5), nq('13','2026-06-01',1,'5',-3), nq('14','2026-06-20',1,'5',0), nq('20','2026-02-01',2,'',7), nq('9','2025-12-01',1,'9',1)],
  b:[{id:'k1', so:'12', ngay:'2026-04-01', nguon:1, dot:'3', loai:'Điều chỉnh'}]}));
const tw26=r.find(b=>b.nam==='2026' && b.nguon===1), dp26=r.find(b=>b.nam==='2026' && b.nguon===2);
ok('mỗi năm × nguồn 1 bảng (2025 TW · 2026 TW · 2026 ĐP)', r.length===3 && !!tw26 && !!dp26, r.map(b=>b.nam+'/'+b.nguon).join(','));
ok('STT theo ngày từ QĐ đầu tiên; QĐ không giao cho PGD vẫn có STT', tw26.ds.filter(x=>x.thieu==null).map(x=>x.stt+':'+x.so+(x.khong?'K':'')).join(' ')==='1:10 2:11 3:12K 4:13 5:14');
ok('soát đợt: thiếu đợt 4 (có 1, 2, 3, 5) chèn sau đợt 3', tw26.ds.map(x=>x.thieu!=null?'T'+x.thieu:x.dot).join(',')==='1,2,3,T4,5,5');
ok('đợt trùng (5, 5) được đánh dấu', tw26.ds.filter(x=>x.trung).length===2);
ok('Σ điều chỉnh PGD cộng các xã (QĐ 11: 2 xã × 10 = 20); số xã', tw26.ds.find(x=>x.so==='11').tg===20 && tw26.ds.find(x=>x.so==='11').soXa===2);
ok('QĐ không ghi đợt → không nhắc thiếu', dp26.ds.length===1 && !dp26.ds.some(x=>x.thieu!=null));
(async()=>{ const b=await chromium.launch(); const loi=[]; const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir=path.join(__dirname,'gianho31'); const files=fs.readdirSync(dir).map(n=>({n,b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const o2 = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
   window.SL_KHONG_TU_KIEM=1; window.confirm=()=>true;
   for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('pb'); doiNgan(7); for(let i=0;i<40 && !(PB.dsXa||[]).length;i++) await w(200); await w(500);
   const xa=PB.dsXa[0], q=(so,ng,dot)=>({id:'t372'+so, so, kyHieu:'/QĐ-BĐDHĐQT', ngay:ng, nguon:1, loai:'Điều chỉnh', dot, xa:xa.ma, tenXa:xa.ten, ct:[{ma:'01', daGiao:100, tangGiam:10, den3112:110}]});
   const dl=pbDL(); dl.qd=[q('70001','2026-02-01','1'), q('70003','2026-06-01','3')]; dl.qdKhong=[]; pbGhi(dl); pbDoiMuc('qd'); await w(400);
   document.querySelector('[data-lenh="pb.dtg"]').click(); await w(400);
   let t=(document.querySelector('#pb-phai .pb-dtg')||{}).innerText||'';
   ok('📅 Dòng thời gian: bảng STT · Đợt · Số QĐ · Ngày …; báo "Thiếu đợt 2"', /STT\s+Đợt\s+Số QĐ\s+Ngày/.test(t) && /Thiếu đợt 2/.test(t) && !!document.querySelector('#pb-phai .pb-dtg-thieu [data-lenh="pb.khongMoi"]'), t.slice(0,160));
   document.querySelector('#pb-phai .pb-dtg-thieu [data-lenh="pb.khongMoi"]').click(); await w(300);
   ok('＋ ghi số QĐ ở dòng thiếu: hộp điền sẵn đợt 2, nguồn TW', PB.K0 && PB.K0.dot==='2' && PB.K0.nguon===1);
   const set=(f,v)=>{ const e=document.querySelector('[data-lenh="pb.k0"][data-f="'+f+'"]'); e.value=v; e.dispatchEvent(new Event('change',{bubbles:true})); };
   set('so','70002'); set('ngay','1542026'); set('ghi','tỉnh giao xã khác'); document.querySelector('[data-lenh="pb.k0Luu"]').click(); await w(500);
   const k=pbDL().qdKhong; ok('lưu QĐ không giao cho PGD (riêng, không vào danh sách QĐ có số liệu)', k.length===1 && k[0].so==='70002' && k[0].ngay==='2026-04-15' && !pbDL().qd.some(x=>x.so==='70002'));
   document.querySelector('[data-lenh="pb.dtg"]').click(); await w(400); t=(document.querySelector('#pb-phai .pb-dtg')||{}).innerText||'';
   ok('dòng thời gian đủ đợt 1–2–3, STT 1–3, dòng 2 "không giao cho PGD"', !/Thiếu đợt/.test(t) && /2\s+2\s+70002/.test(t) && /không giao cho PGD/.test(t), t.replace(/\s+/g,' ').slice(0,220));
   ok('cột trái có nhóm "QĐ không giao cho PGD"', /QĐ không giao cho PGD/.test(document.getElementById('pb-trai').innerText));
   document.querySelector('#pb-phai .pb-dtg tr[data-lenh="pb.xem"]').click(); await w(400);
   ok('bấm dòng QĐ có số liệu → mở bảng xem QĐ đó', !!document.querySelector('#pb-phai .pb-x-bang') && !document.querySelector('#pb-phai .pb-dtg'));
   /* QĐ đọc vào không có khối PGD mình → lưu số QĐ */
   pbPMo('qd_khac.pdf', {so:'70004', kyHieu:'/QĐ-BĐDHĐQT', ngay:'2026-07-01', nguon:1, loai:'Điều chỉnh', dot:'4'},
     [{cap:'muc', ten:'KẾ HOẠCH DƯ NỢ'}, {stt:'I', ten:'Chương trình Hộ nghèo', so:[10,0,10]}, {stt:'1', ten:'Phòng giao dịch NHCSXH Huyện Giả Khác', so:[10,0,10]}, {stt:'1.1', ten:'Xã Giả Xa', so:[10,0,10]}], 'pdf'); await w(400);
   ok('đọc QĐ không có khối PGD mình → báo + nút "Lưu số QĐ (không giao cho PGD)"', /không có khối của PGD/.test((document.getElementById('hop-in')||{}).innerText||'') && !!document.querySelector('[data-lenh="pb.pKhong"]'));
   document.querySelector('[data-lenh="pb.pKhong"]').click(); await w(300);
   ok('hộp ghi số QĐ điền sẵn từ QĐ đọc được (số, ngày, đợt)', PB.K0 && PB.K0.so==='70004' && PB.K0.ngay==='2026-07-01' && PB.K0.dot==='4');
   document.querySelector('[data-lenh="pb.k0Luu"]').click(); await w(400);
   ok('đã ghi QĐ 70004 (không giao)', pbDL().qdKhong.some(x=>x.so==='70004'));
   /* xem gọn + bảng phải: dòng tổng đậm, dòng con thường */
   D.cauHinh.pbGonQD=false; pbVeTrai(); document.querySelector('[data-lenh="pb.gon"]').click(); await w(300);
   const dg=[...document.querySelectorAll('#pb-trai .pb-gon-dong')];
   ok('☰ Xem gọn: mỗi QĐ 1 dòng (2 QĐ có số liệu), nhớ lựa chọn', dg.length===2 && D.cauHinh.pbGonQD===true && /QĐ 70003/.test(dg[0].textContent));
   dg[0].click(); await w(400);
   const tr=document.querySelector('#pb-phai .pb-x-bang tr.pb-x-ct'), con=document.querySelector('#pb-phai .pb-x-bang tbody tr:not(.pb-x-ct)');
   ok('bấm dòng gọn → bảng bên phải; dòng tổng đậm cả 3 cột số, dòng con in thường', !!tr && tr.querySelectorAll('td.s b').length===3 && !!con && con.querySelectorAll('td.s b').length===0);
   let f=null; const g=window.giaoFile; window.giaoFile=(bl,ten)=>{ f={bl,ten}; }; pbDTGExcel(); await w(800); window.giaoFile=g;
   const sh = f ? XLSX.read(await f.bl.arrayBuffer(),{type:'array'}) : null, a = sh ? XLSX.utils.sheet_to_json(sh.Sheets.DONG_THOI_GIAN,{header:1}) : [];
   ok('Excel dòng thời gian: 4 QĐ, có cột STT / Đợt / Giao cho PGD', a.length===5 && a[0].join('|').indexOf('STT|Đợt|Số QĐ')>=0 && a.some(r=>r[7]==='không giao cho PGD'), a.length);
   return o; }, files);
 const all=o.concat(o2); all.push((loi.length?'✗ ':'✓ ')+'không lỗi trang'+(loi.length?' — '+loi.join(' | '):''));
 console.log(all.join('\n')); const sai=all.filter(x=>x.startsWith('✗')).length; console.log(sai?'✗ t372 SAI '+sai:'✓ t372 đạt '+all.length); await b.close(); process.exit(sai?1:0); })();
