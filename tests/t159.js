// 3.164 (anh chốt, BAN_GIAO_3161.md §2.1) — Tab Tổng hợp: sửa lọc "Theo nguồn vốn" tới Điểm GD / Hội / Tổ (pvLoc), danh sách 3 nhóm
//   (Chuẩn TW / LEN_31 / Tính từ Mẫu 31) + nhãn cấp, chọn 1 báo cáo → xem ngay ở khung phải (bỏ nút Xem), phạm vi sâu hơn biểu → mờ + dòng vàng,
//   dòng cộng ghi đúng phạm vi. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const C = thCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.ct=''; C.nguon=''; C.bc = {xa:true, nv:true}; delete C.bcChon;
   slDoiTab('th'); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#tr7 .th-nguon');i++) await w(250); await w(800);
   const tr7 = document.getElementById('tr7'), goc = () => (document.getElementById('th-xem-khung')||{}).trGoc || '';
   ok('3 nhóm: Chuẩn TW · LEN_31 · Tính từ Mẫu 31; mỗi báo cáo có nhãn cấp', [...tr7.querySelectorAll('.th-nhom-ten')].map(x=>x.textContent).join('|')==='Chuẩn TW|LEN_31|Tính từ Mẫu 31' && tr7.querySelectorAll('.th-luoi .th-bc2 .th-cap').length===9);
   ok('3.393 màn 1: lưới 9 nút báo cáo (bấm = mở màn xem), không ô tích + không nút 👁 Xem', tr7.querySelectorAll('.th-luoi .th-bc2').length===9 && !tr7.querySelector('#tr7 input[type=checkbox][name]') && ![...tr7.querySelectorAll('button')].some(x=>/👁 Xem/.test(x.textContent)));
   ok('dữ liệu cũ tích nhiều → giữ cái đầu (01.1)', thChon()==='xa');
   thChonBC(thChon()); for(let i=0;i<40 && !goc();i++) await w(200);
   ok('3.393 màn 2: ← Danh sách + ô sổ đổi báo cáo + khung xem rộng', !!tr7.querySelector('.th-thao button') && /Danh sách/.test(tr7.querySelector('.th-thao button').textContent) && !!tr7.querySelector('.th-thao select.sk-chon') && document.getElementById('th-xem-khung').getBoundingClientRect().width > 900);
   ok('xem ngay ở khung xem (01.1 chưa nạp → báo chưa nạp file)', /Chưa nạp/.test(goc()));
   thChonBC('nv'); for(let i=0;i<40 && !/NGUỒN VỐN/.test(goc());i++) await w(200);
   ok('bấm báo cáo khác → khung xem đổi ngay, app nhớ', /NGUỒN VỐN/.test(goc()) && thCH().bcChon==='nv' && !!document.querySelector('#tr7 .xuat-hang'));
   /* sửa lỗi lọc nguồn vốn */
   const T = TH_K.K.to, t0 = Object.values(T).find(t=>!toLaTT(t) && t.dv && t.xa);
   const tong = x => { const r = x.aoa[x.aoa.length-1]; return r; };
   C.xa = t0.xa; const nvXa = thBaoCao('nv'), tkXa = thBaoCao('tk');
   C.hoi = String(t0.dv); const nvHoi = thBaoCao('nv'), tkHoi = thBaoCao('tk');
   const dn = (x, i) => +tong(x)[i];
   ok('Theo nguồn vốn: chọn Xã + Hội → dư nợ nhỏ hơn cả xã (trước đây vẫn ra số cả xã)', dn(nvHoi, 6) < dn(nvXa, 6), dn(nvHoi, 6)+' < '+dn(nvXa, 6));
   ok('Theo nguồn vốn = Lọc sâu cùng phạm vi Xã + Hội (dư nợ cộng)', Math.abs(dn(nvHoi, 6)-dn(tkHoi, 5))<1, dn(nvHoi, 6)+' / '+dn(tkHoi, 5)+' · cả xã '+dn(nvXa, 6)+' / '+dn(tkXa, 5));
   ok('dòng cộng ghi đúng phạm vi ("Cộng <xã> · <hội>", không "Cộng xã")', /^Cộng /.test(tong(nvHoi)[0]) && tong(nvHoi)[0]!=='Cộng xã' && tong(nvHoi)[0]===tong(tkHoi)[0], tong(nvHoi)[0]);
   C.diem = t0.khoaDiem; C.to = t0.ma; const nvTo = thBaoCao('nv');
   ok('Theo nguồn vốn: chọn tới Tổ → chỉ số của tổ', dn(nvTo, 6) <= dn(nvHoi, 6) && dn(nvTo, 6) > 0, dn(nvTo, 6));
   /* phạm vi sâu hơn biểu */
   const b01 = TH_BC.find(x=>x.k==='xa');
   ok('phạm vi sâu hơn biểu: 01.1 với Hội / Tổ → thSau báo; Lọc sâu không báo', thSau(b01, C).length>0 && thSau(TH_BC.find(x=>x.k==='tk'), C).length===0);
   thVeDS(); for(let i=0;i<40 && !document.querySelector('#th-ds .th-mo2');i++) await w(200); o.push('  (phạm vi sau vẽ: '+[C.xa,C.diem,C.hoi,C.to].join('|')+')');
   ok('danh sách: 01.1 mờ (rê chuột "chỉ chia tới xã")', !!document.querySelector('#th-ds .th-mo2') && /chỉ chia tới xã/.test(document.querySelector('#th-ds .th-mo2').title));
   thChonBC('xa'); await w(800);
   const bnv = TH_BC.find(x=>x.k==='nv'); C.ct = Object.keys((TH_K.K.hs||[]).reduce((a,o)=>{ if(o.ct) a[o.ct]=1; return a; }, {}))[0]||'01'; thChonBC('nv'); for(let i=0;i<30 && !/không lọc được/.test(goc());i++) await w(200);
   ok('báo cáo không lọc được chương trình → dòng vàng đầu bảng', /⚠ [^<]*không lọc được chương trình/.test(goc()) && !/undefined/.test(goc()), (goc().match(/⚠ [^<]*/)||[''])[0]);
   C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.ct='';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
