// 3.150 — Tab 📥 Nạp & KT gọn (anh chốt ý 1 — docs/KE_HOACH_GON_GIAO_DIEN.md):
//   1 hàng công cụ (‹ tháng › · 📥 Nạp file · 📋 File cần xuất · ⋯ · ❓), 1 dòng trạng thái chỉ 1 cảnh báo theo ưu tiên,
//   ma trận trọn chiều ngang, kết quả kiểm tra + file KTGS gập sẵn, việc phụ trong ⋯, giải thích trong ❓, tháng chưa có file không báo "kiểm lại".
//   Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   SL_KY = '2026-08'; moNapSL(); await w(600);
   const tr7 = document.getElementById('tr7'), thanh = tr7.querySelector('.sl-thanh-nap');
   const nut = thanh ? [...thanh.querySelectorAll('button')].map(x=>x.textContent.trim()) : [];
   ok('1 hàng công cụ: ‹ tháng › · Nạp file · File cần xuất · ⋯ · ❓', nut.join('|')==='‹|T8/2026 ▾|›|📥 Nạp file|📋 File cần xuất|⋯|❓', nut.join('|'));
   ok('hàng công cụ 1 dòng (cao ≤ 40 px)', thanh && thanh.getBoundingClientRect().height <= 40, thanh && Math.round(thanh.getBoundingClientRect().height));
   ok('bỏ: dòng giải thích đầu tab, khung ①, 4 ô bước, chú thích ma trận, "Sẵn dùng", Làm sạch, Giữ sẵn, cũ hơn / mới hơn', !/Nơi duy nhất nạp file/.test(tr7.textContent) && !tr7.querySelector('.sl-4buoc') && !tr7.querySelector('.sl-mt-dau') && !/Sẵn dùng|Làm sạch|Giữ sẵn|cũ hơn|mới hơn/.test(tr7.textContent));
   const tt = tr7.querySelectorAll('.sl-tt-1');
   ok('1 dòng trạng thái: T8 thiếu file (liệt kê 1 lần) + nút Kiểm tra kỳ', tt.length===1 && /T8\/2026 chưa Đạt — thiếu \d+ file/.test(tt[0].textContent) && /Kiểm tra kỳ|Kiểm lại/.test(tt[0].textContent), tt[0] && tt[0].textContent.slice(0, 90));
   ok('danh sách thiếu file chỉ hiện 1 lần trên tab', (tr7.textContent.match(/LEN_31 TO_TRUONG/g)||[]).length===1 + (tr7.textContent.match(/LEN_31 TO_TRUONG/g)||[]).length-1 && (tr7.textContent.split('thiếu ').length-1)<=1);
   ok('rê chuột dòng trạng thái: báo cáo nào dùng được', /Tổ TK&VV · Sao kê · Tra cứu KH/.test(tt[0].title), tt[0].title.split('\n')[0]);
   const bang = tr7.querySelector('.sl-mt-cuon .sl-bang');
   ok('ma trận trọn chiều ngang', bang && bang.getBoundingClientRect().width >= tr7.getBoundingClientRect().width*0.95, bang && Math.round(bang.getBoundingClientRect().width)+' / '+Math.round(tr7.getBoundingClientRect().width));
   ok('kết quả kiểm tra + file KTGS: gập sẵn (details)', !!tr7.querySelector('details.sl-kq') && !tr7.querySelector('details.sl-kq').open && !!tr7.querySelector('.sl-ktgs-nap details.kt-nap'));
   /* ⋯ */
   thanh.querySelector('button[title^="Tải file gốc cả tháng"]').click(); await w(150);
   const them = (document.querySelector('#hop-in')||{}).textContent||'';
   ok('⋯: Tải gốc cả tháng · Xóa cả bộ tháng · Tóm tắt · Làm sạch & nạp lại · Giữ sẵn · Tìm rác · Làm mới toàn bộ', ['Tải file gốc cả tháng','Xóa cả bộ tháng','Tóm tắt chi tiết','Làm sạch','Giữ sẵn','Tìm file rác','Làm mới toàn bộ'].every(x=>them.indexOf(x)>=0), them.slice(0, 120)); dongHop();
   slNapHoi(); await w(100); ok('❓: giải thích ma trận + Kiểm tra kỳ', /Ma trận/.test(document.querySelector('#hop-in').textContent) && /Kiểm tra kỳ/.test(document.querySelector('#hop-in').textContent)); dongHop();
   /* tháng chưa có file: không báo "kiểm lại" */
   slChonThang(0, '2026-10'); await w(400);
   const t10 = document.querySelector('.sl-tt-1');
   ok('tháng chưa có file (T10): chỉ báo "chưa có file nào", không báo kiểm lại / kết quả cũ', /T10\/2026 chưa có file nào/.test(t10.textContent) && !/kiểm lại|Kiểm lại|kết quả cũ/i.test(document.getElementById('tr7').querySelector('.sl-tt-1').textContent), t10.textContent.slice(0, 80));
   /* bấm tiêu đề cột tháng → chọn tháng + kỳ chung theo (khi tháng có số liệu) */
   [...document.querySelectorAll('.sl-bang thead th')].find(x=>/T7\/2026/.test(x.textContent)).click(); await w(400);
   ok('bấm tiêu đề cột T7 → ma trận chọn T7, kỳ chung theo T7', SL_KY==='2026-07' && D.cauHinh.kyChung==='2026-07', SL_KY+' · '+D.cauHinh.kyChung);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
