// 3.223 (anh chốt 16/10, QUY_CHUAN mục 9.3): CHỒNG KHÍT — mẫu trên nền ô: 📄 bản trắng · 🖨 bản thật có số liệu · 📝 bản mẫu điền hết
//   phải CÙNG số trang và mọi đoạn / dòng bảng CÙNG vị trí trên trang (±0,5 mm). Số liệu chỉ nằm trong khung ô, không xô form. Dữ liệu GIẢ.
//   Danh sách mẫu: OM_MAU (mẫu nào lên nền ô tự vào phép thử). Tham số: tên mẫu để thử riêng.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async([files, chi])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; D.cauHinh.hsoO = {};
   const doViTri = () => { const d = document.getElementById('hso-xem-khung').contentDocument, MM = 96/25.4, r = [];
     [...d.querySelectorAll('.tr-tg')].forEach((g, i) => { const y0 = g.getBoundingClientRect().top; [...g.querySelectorAll('p, tr')].filter(e=>!e.closest('.om')).forEach(e=>{ r.push(i+':'+((e.getBoundingClientRect().top - y0)/MM).toFixed(2)); }); });
     return {trang:d.querySelectorAll('.tr-tg').length, vt:r}; };
   const DUNG = {'01td':'trang', '03td':'trang'};   /* 3.247 (anh 18/10): 01/TD có số liệu chỉ in dòng số liệu của bảng, chữ liền như đánh máy → chỉ giữ cùng số trang */   /* 3.240 (anh 17/10 "giữ form nhưng linh động"): 01/TD cho chữ dài xuống dòng trong bảng → khối dưới xê ≤ 12 mm, vẫn cùng số đoạn, cùng trang */
   const so = (a, b, tl) => { tl = tl || 0.5; if(tl==='trang') return a.trang!==b.trang ? 'số trang '+a.trang+' ≠ '+b.trang : '';   /* 3.240: 03/TD bản trắng 5 dòng, có số liệu co dòng (anh 17/10) → chỉ giữ cùng số trang */ if(a.trang!==b.trang) return 'số trang '+a.trang+' ≠ '+b.trang; if(a.vt.length!==b.vt.length) return 'số đoạn '+a.vt.length+' ≠ '+b.vt.length;
     for(let i=0;i<a.vt.length;i++){ const x = a.vt[i].split(':'), y = b.vt[i].split(':'); if(x[0]!==y[0] || Math.abs(+x[1]-+y[1])>tl) return 'đoạn '+i+' lệch: '+a.vt[i]+' ≠ '+b.vt[i]+' (trang:mm)'; } return ''; };
   for(const mk of Object.keys(OM_MAU).filter(k=>!chi || k===chi)){
     const tab = HSO_MAU.hst.some(m=>m.k===mk) ? 'hst' : 'hsv'; slDoiTab(tab); doiNgan(7); await w(1000); const C = hsoCH(); C.xa=''; C.diem=''; C.to=''; C.boId='';
     pvChon(tab, 'xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon(tab, 'to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
     if(tab==='hsv'){ const tv = hsoTVTo(TO_K.to[C.to]); const ho = hmTuM31(tv[0].kh); ho.tv.push({ten:'Trần Thị Thừa Kế Giả', ns:'1982-03-03', cccd:'072182000002', qh:'Vợ'}); hmLamHS(ho.id, mk); await w(300);
       const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Nguyễn Văn Con Giả Có Tên Rất Dài', soThang:'12'}); B.tien = '40000000'; B.th = '60'; B.hanCuoi = '2031-10-15'; hsoBoLuu(); HSO.vay.kh = tv[0].kh; }
     /* bản thật: bật hết ô sang in (🤖 / ✎ / ⌨) + khai giá trị → nhiều chữ nhất */
     const m = OM_MAU[mk]; m.phan.forEach(q=>omDatPhan(mk, q, 'in')); m.o.forEach(x=>{ if(x.l==='kb' || x.l==='tukb'){ omDatKB(mk, x.k, 'Giá trị khai báo giả '+x.k); }   /* 3.229: ô 🤖 cũng có ⌨ — chỉ gõ giả ô khai báo như trước */ omDatChuMau(mk, x.k, m.giuCo ? 'Mẫu' : 'Chữ mẫu giả cho ô '+x.n);   /* 3.319: mẫu giuCo không thu nhỏ — chữ mẫu độ dài thường phải chồng khít; chữ quá dài thử riêng dưới (⚠ báo) */ if(x.l==='go') HSO.vay[x.k] = x.ngay ? '2026-10-20' : '123.456.789'; });
     dongHop(); const lay = async k => { OM_KIEU = k; hsoChonMau(mk); hsoVe(); await w(1600); return doViTri(); };
     const a = await lay('trang'), t = await lay('that'), u = await lay('mau'), hMau = HSO.x.h; OM_KIEU = 'that';
     ok(mk+': bản trắng có '+a.trang+' trang, '+a.vt.length+' đoạn / dòng bảng', a.trang>0 && a.vt.length>5);
     const e1 = so(a, t, DUNG[mk]), e2 = so(a, u, DUNG[mk]);
     ok(mk+': bản thật (bật hết ô, có số liệu) chồng khít bản trắng', !e1, e1 || undefined);
     ok(mk+': bản mẫu (điền hết, chữ mẫu) chồng khít bản trắng', !e2, e2 || undefined);
     if(m.giuCo){ const k0 = (hMau.match(/data-o="([^"]+)"[^>]*>Mẫu</)||[])[1], x0 = m.oK[k0] || m.o[0];   /* ô bản mẫu đang in chữ mẫu */ omDatChuMau(mk, x0.k, 'Chữ mẫu giả rất dài cho ô '+x0.n+' — dài hơn hẳn chỗ chấm trên mẫu gốc để thử'); OM_KIEU = 'mau'; hsoXem(); await w(300);
       const sp = (HSO.x.h.match(new RegExp('data-o="'+x0.k+'"[^>]*>'))||[''])[0];
       ok(mk+' (giuCo): chữ quá dài không thu nhỏ, ⚠ báo dài hơn ô', +((sp.match(/font-size:([0-9.]+)pt/)||[0, 99])[1]) >= 11 && OM_DAI.some(y=>y.mk===mk && y.k===x0.k && y.gian), x0.k+' '+sp); OM_KIEU = 'that'; }
   }
   return o; }, [files, process.argv[2]||'']);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5)); const dat = R.filter(x=>x[0]==='✓').length;
 console.log(dat+'/'+R.length+' đạt'+(loi.length ? ' · có lỗi trang' : '')); await b.close(); process.exit(dat===R.length && !loi.length ? 0 : 1); })();
