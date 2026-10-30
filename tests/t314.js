// 3.392 (BAN_GIAO_TK3_2710 mục 6 — cắm rút): báo cáo Sao kê dạng danh sách tách sang js/76-sk-danh-sach.js (SK_BC.push + lap).
// Có file: đủ 19 báo cáo (3.409: + tk2), thứ tự từng nhóm như cũ, báo cáo cần Mẫu 31 dùng nền chung skNen31; RÚT file (chặn tải js/76): app chạy, không lỗi trang,
// Sao kê chỉ còn nhóm Thông tin tổ, mở báo cáo Kết quả GD vẫn được. Kết quả từng báo cáo giống hệt bản cũ: t276 (bản chụp). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(rut)=>{ const p=await b.newPage({viewport:{width:1440,height:900}}), loi=[]; p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/76-sk-danh-sach\.js/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); doiNgan(7); slDoiTab('sk'); skVeDS(); }, files);
   await p.waitForTimeout(1500); return {p, loi}; };
 let {p, loi} = await mo(false);
 let r = await p.evaluate(()=>({n:SK_BC.length, nhom:SK_NHOM.map(n=>n.k+':'+SK_BC.filter(b=>b.nhom===n.k).map(b=>b.k).join(',')).join('|'), lap:SK_BC.filter(b=>b.lap).length, nut:document.querySelectorAll('.sk-bc2').length}));
 ok('có js/76: 19 báo cáo (3.409 + tk2), thứ tự nhóm như cũ, danh mục hiện đủ', r.n===19 && r.nhom==='xl:qh,kh,khd,cgn|dh:dh,noxh,pkto|ps:gn,ddn,m105|kh:sdt,tk2|tt:kqgd,thhd,tqh,tkn,tkhd,b105,ndt' && r.nut===19, JSON.stringify(r));
 ok('14 báo cáo tự lập (lap) — 12 ở js/76 + b105 + ndt', r.lap===14, r.lap);
 r = await p.evaluate(()=>{ const K0 = SK_K; SK_K = Object.assign({}, K0, {B:Object.assign({}, K0.B, {hsTen:'Mẫu 10'})}); const x = skBaoCao('gn'); SK_K = K0; return x.html; });
 ok('chưa có Mẫu 31 → báo cáo cần Mẫu 31 hiện trang nhắc (skNen31)', /cần <b>Mẫu 31/.test(r), r.slice(0, 80));
 ok('không lỗi trang (có file)', !loi.length, loi.slice(0, 2).join(' | ')); await p.close();
 ({p, loi} = await mo(true));
 r = await p.evaluate(()=>({n:SK_BC.length, k:SK_BC.map(b=>b.k).join(','), nut:document.querySelectorAll('.sk-bc2').length}));
 ok('RÚT js/76: Sao kê chỉ còn nhóm Thông tin tổ (7 báo cáo), danh mục vẽ được', r.n===7 && r.k==='kqgd,thhd,tqh,tkn,tkhd,b105,ndt' && r.nut===7, JSON.stringify(r));
 await p.evaluate(()=>skChonBC('kqgd')); await p.waitForTimeout(2500);
 r = await p.evaluate(()=>{ const f=document.getElementById('sk-xem-khung'); return f && f.contentDocument ? f.contentDocument.querySelectorAll('.tr-tg').length : 0; });
 ok('RÚT js/76: mở Kết quả GD tại điểm vẫn được', r>0, r);
 ok('RÚT js/76: không lỗi trang', !loi.length, loi.slice(0, 2).join(' | ')); await p.close();
 o.forEach(x=>console.log(x)); const sai = o.filter(x=>x[0]==='✗').length; console.log(sai ? '✗ '+sai+' sai' : '✓ t314 đạt'); await b.close(); process.exit(sai?1:0);
})();
