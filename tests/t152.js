// 3.156 — Tab Nạp & KT gọn 2 (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2):
//   1 nút 📥 Nạp file (gồm BC0437 / 0438, nhóm Ⓚ KTGS trong ma trận), ma trận kẻ ô rõ, cột tháng chọn sáng, mặc định tháng chọn + tháng trước + Theo ngày,
//   ⇔ Tổng quan 12 tháng, ▾ thu gọn 1 dòng, chuyển tháng 1 chỗ, tự kiểm ngầm + 🔍 Kiểm tra lại, ô ✓ / ⚠, kết quả kiểm tra 1 dòng, vừa 1 màn hình. Bộ GIẢ tests/gianho31.
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
   SL_KY = '2026-08'; D.cauHinh.slMt = ''; moNapSL(); await w(400);
   const tr7 = document.getElementById('tr7');
   const nut = [...tr7.querySelectorAll('.sl-thanh-nap button')].map(x=>x.textContent.trim()).join('|');
   ok('hàng nút: ‹ T7 · T8/2026 ▾ · T9 › · 📥 Nạp file · 🔍 Kiểm tra lại · 📋 File cần xuất · [▾ Thu gọn][2 tháng][⇔ Tổng quan] · ⋯ · ❓', nut==='‹ T7|T8/2026 ▾|T9 ›|📥 Nạp file|🔍 Kiểm tra lại|📋 File cần xuất|▾ Thu gọn|2 tháng|⇔ Tổng quan|⋯|❓', nut);
   ok('1 nút nạp: bỏ khối / nút "Nạp nhiều file" KTGS riêng, bỏ ‹ › góc ma trận', !tr7.querySelector('.kt-nap') && !/Nạp nhiều file/.test(tr7.textContent) && !tr7.querySelector('.sl-tq-nut'));
   const th = [...tr7.querySelectorAll('.sl-bang thead th')].map(x=>x.textContent.trim());
   ok('mặc định: tháng chọn + tháng trước + Theo ngày', th.length===4 && /T7\/2026/.test(th[1]) && /T8\/2026/.test(th[2]) && /Theo ngày/.test(th[3]), th.join(' | '));
   ok('cột tháng chọn sáng lên (tiêu đề + ô)', tr7.querySelector('.sl-bang thead th.sl-cot') && /T8/.test(tr7.querySelector('.sl-bang thead th.sl-cot').textContent) && tr7.querySelectorAll('.sl-bang tbody td.sl-cot').length>=4);
   ok('kẻ ô rõ: bảng lưới, ô cao 28 px', tr7.querySelector('.sl-bang.sl-luoi') && Math.round(tr7.querySelector('.sl-bang .bdc-o.sl-o').getBoundingClientRect().height)<=29, Math.round(tr7.querySelector('.sl-bang .bdc-o.sl-o').getBoundingClientRect().height));
   ok('nhóm Ⓚ KTGS trong ma trận (gập sẵn)', [...tr7.querySelectorAll('.sl-nh-dong')].some(r=>/KTGS/.test(r.textContent) && !r.classList.contains('mo')));
   ok('tên báo cáo dài: chữ nhỏ, xuống dòng (lớp dai)', [...tr7.querySelectorAll('.sl-con-ten.dai')].some(x=>/Danh sách tổ/.test(x.textContent)));
   /* tự kiểm ngầm */
   for(let i=0;i<40 && !(SLM.kt['2026-08'] && !slKTCu('2026-08'));i++) await w(250);
   ok('tự kiểm ngầm tháng đang xem (không bấm gì)', !!SLM.kt['2026-08'] && !slKTCu('2026-08'));
   await w(300); veSoLieu(); await w(100);
   const dau = [...document.querySelectorAll('#tr7 .sl-bang .sl-dau')];
   ok('ô có dấu ✓ khớp / ⚠ chênh sau kiểm tra, rê chuột có giải thích', dau.length>0 && dau.every(x=>/✓|⚠/.test(x.textContent) && x.title.length>5), dau.map(x=>x.textContent).join(''));
   const kq = document.querySelector('#tr7 details.sl-kq');
   ok('kết quả kiểm tra: 1 dòng, gập sẵn, tóm tắt khớp / chênh', kq && !kq.open && /khớp/.test(kq.querySelector('summary').textContent) && kq.querySelector('summary').getBoundingClientRect().height<=48, kq && kq.querySelector('summary').textContent.trim().slice(0, 80));
   ok('dòng trạng thái không còn nút Kiểm tra (đã ở hàng nút)', !document.querySelector('#tr7 .sl-tt-1 button.nho'));
   ok('cả tab vừa 1 màn hình (không cuộn)', document.documentElement.scrollHeight<=window.innerHeight+2, document.documentElement.scrollHeight+' / '+window.innerHeight);
   /* xóa 1 ô → tự kiểm lại */
   const luc0 = SLM.kt['2026-08'].luc; const l = Object.keys(SLM.bang).map(k=>SLM.bang[k]).find(e=>e.ky==='2026-08' && e.loai!=='hstd' && slLoai(e.loai).nhom==='D');
   if(l){ await slXoa(l.loai, '2026-08'); for(let i=0;i<40 && !(SLM.kt['2026-08'].luc>luc0 && !slKTCu('2026-08'));i++) await w(250);
     ok('xóa 1 ô → app tự kiểm lại tháng đó', SLM.kt['2026-08'].luc>luc0 && !slKTCu('2026-08')); }
   else ok('xóa 1 ô → tự kiểm lại (bỏ qua: bộ giả thiếu file phụ)', true);
   /* chuyển tháng */
   document.querySelector('#tr7 .sl-thang-lui').click(); await w(300);
   const th2 = [...document.querySelectorAll('#tr7 .sl-bang thead th')].map(x=>x.textContent.trim());
   ok('‹ T7 → tháng chọn T7, ma trận T6 + T7', SL_KY==='2026-07' && /T6\/2026/.test(th2[1]) && /T7\/2026/.test(th2[2]), th2.join(' | '));
   slChonThang(0, '2026-08'); await w(200);
   /* tổng quan */
   [...document.querySelectorAll('#tr7 .sl-mt-k')].find(x=>/Tổng quan/.test(x.textContent)).click(); await w(300);
   const bang = document.querySelector('#tr7 .sl-bang'), cotT = [...bang.querySelectorAll('thead th')].filter(x=>/\d{4}/.test(x.textContent));
   ok('⇔ Tổng quan: 12 tháng, trọn chiều ngang, nhớ lựa chọn', cotT.length===12 && bang.getBoundingClientRect().width>=document.getElementById('tr7').getBoundingClientRect().width*0.95 && D.cauHinh.slMt==='tq', cotT.length+' tháng');
   /* thu gọn */
   [...document.querySelectorAll('#tr7 .sl-mt-k')].find(x=>/Thu gọn/.test(x.textContent)).click(); await w(300);
   const thu = document.querySelector('#tr7 .sl-mt-thu');
   ok('▾ Thu gọn: 1 dòng tóm tắt tháng, không bảng', thu && !document.querySelector('#tr7 .sl-bang') && /T8\/2026/.test(thu.textContent) && thu.getBoundingClientRect().height<=48);
   thu.click(); await w(300); ok('bấm dòng tóm tắt → mở lại 2 tháng', !!document.querySelector('#tr7 .sl-bang') && slMtKieu()==='gon');
   slNapHoi(); await w(100); ok('❓ giải thích tự kiểm, ✓ / ⚠, kiểu ma trận', /tự kiểm tra ngầm/.test(document.getElementById('hop-in').textContent) && /Tổng quan/.test(document.getElementById('hop-in').textContent)); dongHop();
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
