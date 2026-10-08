// 3.139 — Tab Tổ TK&VV › báo cáo "Dự kiến chia tách tổ" (A4 ngang, tối đa 2 trang, mỗi hộ 1 dòng theo mã KH, cột Tổ mới, vợ/chồng, SĐT,
//        QH / khoanh in đậm sau tên, dòng dự kiến chia tối đa 3 tổ, ký Tổ trưởng); "PGD NHCSXH GÒ DẦU" in đậm góc trái các báo cáo app lập.
// Bộ GIẢ: tests/gia31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   doiNgan(7); const C = toCH(); C.ky = '2026-08'; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; D.cauHinh.slTab = 'to'; slDoiTab('to'); for(let i=0;i<120 && !TO_K;i++) await w(250); await w(400);
   const ds = Object.values(TO_K.to).filter(t=>!toLaTT(t)).map(t=>({t, n:toTV(t).length})).sort((a, b2)=>b2.n-a.n);
   const t = ds[0].t, tv = toTV(t);
   ok('có báo cáo "Dự kiến chia tách tổ" trong danh sách báo cáo của tổ', TO_BC.some(x=>x.k==='ct'));
   const x = toBaoCao('ct', t);
   ok('A4 ngang; tiêu đề; cột đúng thứ tự (Tổ mới cạnh Họ tên, có vợ/chồng, SĐT; không Số KU / QH / Ấp)', x.ngang && /DỰ KIẾN CHIA TÁCH TỔ/.test(x.tieuDe) && x.aoa[2].join('|')==='STT|Mã KH|Họ tên người vay|Tổ mới (1/2/3)|Tên vợ / chồng|Số điện thoại|Chương trình|Dư nợ|Nợ lãi|Số dư 105|Ghi chú', x.aoa[2].join('|'));
   const dong = x.aoa.slice(3).filter(r=>typeof r[0]==='number');
   ok('mỗi hộ 1 dòng, sắp theo mã KH, cột Tổ mới để trống', dong.length===tv.length && dong.every((r, i)=>!i || r[1]>dong[i-1][1]) && dong.every(r=>r[3]===''), dong.length+' hộ');
   ok('dòng dự kiến 1 dòng: số tổ viên, hộ còn dư nợ, (1) (2) (3)', new RegExp('^Tổ hiện có '+tv.length+' tổ viên, '+tv.filter(k=>k.conNo).length+' hộ còn dư nợ\\. Dự kiến chia tách: \\(1\\) .*\\(2\\) .*\\(3\\) ').test(x.aoa[0][0]) && /class="ct-tom"/.test(x.html), x.aoa[0][0]);
   const kq = tv.find(k=>k.qh>0 || k.kn>0);
   ok('hộ QH / khoanh: ghi sau tên, in đậm', !kq || new RegExp('<b>'+kq.ten.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+' \\((QH|Khoanh)\\)').test(x.html), kq ? kq.ten : 'không có hộ QH trong tổ');
   ok('khối ký Tổ trưởng (thay dòng ký chung)', /TỔ TRƯỞNG/.test(x.ky) && /Ký, ghi rõ họ tên/.test(x.ky));
   const h = toHTMLIn([x], t);
   ok('bản In: "PGD NHCSXH GÒ DẦU" in đậm góc trái; có khối ký Tổ trưởng', /<div class="bc-dau"><div><b>PGD NHCSXH GÒ DẦU<\/b><\/div>/.test(h) && /TỔ TRƯỞNG/.test(h));
   ok('Sao kê / Tổng hợp cũng ghi "PGD NHCSXH GÒ DẦU" in đậm', /<b>PGD NHCSXH GÒ DẦU<\/b>/.test(skHTMLIn([{ngay:'', tieuDe:'X', pv:'Y', html:''}])) && /<b>PGD NHCSXH GÒ DẦU<\/b>/.test(thHTMLIn([{ngay:'', tieuDe:'X', pv:'Y', html:''}])));
   /* tổ đông giả (60 hộ) → vẫn tối đa 2 trang */
   const k0 = tv.find(k=>k.qh>0) || tv[0], goc = toTV, gia = n => { toTV = () => Array.from({length:n}, (_, i)=>Object.assign({}, k0, {kh:String(4800000000+i), ten:'Nguyễn Thị Khách Giả '+(i+1), ct:'HN · NS · GQVL', sdt:'0912345678'})); const r = toBaoCao('ct', t); toTV = goc; return r; };
   const x50 = gia(50), x60 = gia(60);
   window.__h = [inChuan(toHTMLIn([x50], t)), inChuan(toHTMLIn([x60], t))];
   ok('tổ đông tự thu cỡ chữ (50 hộ cỡ 10, 60 hộ cỡ 9)', x50.coChu===10 && x60.coChu===9);
   return o; }, files);
 const dem = async h => { const q = await b.newPage(); await q.setContent(h); for(let i=0;i<60 && !(await q.evaluate(()=>window.TR_XONG));i++) await q.waitForTimeout(100); const so = await q.evaluate(()=>window.TR_SO); await q.close(); return so; };
 const H = await p.evaluate(()=>window.__h), n1 = await dem(H[0]), n2 = await dem(H[1]);
 R.push((n1<=2 ? '✓ ' : '✗ ')+'tổ 50 hộ (tên dài, QH): tối đa 2 trang — '+n1);
 R.push((n2<=2 ? '✓ ' : '✗ ')+'tổ 60 hộ: tối đa 2 trang — '+n2);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0, 5));
 console.log((R.filter(x=>x[0]==='✓').length)+'/'+R.length+' đạt'); await b.close(); })();
