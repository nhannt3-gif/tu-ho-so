// 3.443 (anh 02/11) — Mẫu 10A/TD: khung cố định 100 tổ viên, 3 cột × 34 dòng (đánh số dọc theo cột), nằm trang 1–2;
//   phần II "Quy ước" luôn bắt đầu trang 3 (ngắt trang cứng ở bản in + Word); Word: dòng khung cao cố định (sửa tên không đẩy trang).
//   Tích > 100 tổ viên → báo, chỉ in 100. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300);
   pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300);
   pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const t = TO_K.to[C.to], tv = hsoTVTo(t);
   hsoChonMau('10a'); await w(400);
   const dem = () => { const d = new DOMParser().parseFromString(HSO.x.h, 'text/html'), tb = d.querySelector('table.tv100'); return {d, tb}; };
   let {d, tb} = dem();
   const o100 = tb ? [...tb.querySelectorAll('td')].map(x=>x.textContent.trim()).filter(Boolean) : [];
   ok('khung 3 cột × 34 dòng, đủ 100 ô đánh số', tb && tb.rows.length===34 && tb.rows[0].cells.length===3 && o100.length===100, tb && (tb.rows.length+' dòng · '+o100.length+' ô'));
   ok('đánh số dọc theo cột: dòng 1 = 1 · 35 · 69; dòng 34 = 34 · 68 · (trống)', tb && /^1\./.test(tb.rows[0].cells[0].textContent) && /^35\./.test(tb.rows[0].cells[1].textContent) && /^69\./.test(tb.rows[0].cells[2].textContent) && /^68\./.test(tb.rows[33].cells[1].textContent) && !tb.rows[33].cells[2].textContent.trim() && /^100\./.test(tb.rows[31].cells[2].textContent));
   const daTich = tv.filter(k=>HSO.tv[k.kh]!==false);
   ok('tổ viên tích điền theo thứ tự, ô sau trống chấm; Tổng số đúng', daTich.length>0 && tb.rows[0].cells[0].textContent.indexOf(daTich[0].ten)>=0 && /\.{10}/.test(tb.rows[33].cells[1].textContent) && new RegExp('Tổng số: '+daTich.length+' ?tổ viên').test(d.body.textContent), daTich.length+' tổ viên');
   ok('khung chữ cỡ 12, dòng cao cố định (data-cao)', /\bs12\b/.test(tb.className) && +tb.getAttribute('data-cao')>0);
   const pII = [...d.querySelectorAll('p')].find(x=>/II\. QUY ƯỚC/.test(x.textContent));
   ok('phần II có dấu sang trang (tr-sang)', pII && pII.classList.contains('tr-sang'));
   /* xem trước = bản in: khung trang 1–2, phần II đầu trang 3 */
   hsoXem(); await w(2500);
   const kd = document.getElementById('hso-xem-khung').contentDocument, tg = [...kd.querySelectorAll('.tr-tg')].map(x=>x.innerText.replace(/\s+/g, ' '));
   const iII = tg.findIndex(x=>/II\. QUY ƯỚC/.test(x)), i100 = tg.findIndex(x=>/\b100\./.test(x));
   ok('bản in: số 100 ở trang 2, Tổng số trang 2, phần II mở đầu trang 3', i100===1 && /Tổng số/.test(tg[1]||'') && iII===2 && /^\s*II\. QUY ƯỚC/.test((tg[2]||'').replace(/^\D*?(?=II\.)/, '')) && (tg[2]||'').indexOf('II. QUY ƯỚC')<40, tg.length+' trang · 100 ở trang '+(i100+1)+' · II ở trang '+(iII+1));
   ok('trang 1 không còn phần II', !/QUY ƯỚC HOẠT ĐỘNG/.test(tg[0]||'') && !/QUY ƯỚC HOẠT ĐỘNG/.test(tg[1]||''));
   ok('cả mẫu ≤ 5 trang (phần II–IV + phê duyệt sau trang 2)', tg.length>=3 && tg.length<=5, tg.length+' trang');
   /* Word */
   const x = hsoLap(); let b64 = '';
   try { const bl = await hsoDocx(x); b64 = await new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result.split(',')[1]); fr.readAsDataURL(bl); }); } catch(e){ b64 = ''; }
   window.__W = b64;
   /* > 100 tổ viên: chỉ in 100, báo */
   const goc = window.hsoTVTo; window.hsoTVTo = tt => { const a = goc(tt).slice(); for(let i=a.length;i<105;i++) a.push({kh:'GIA'+i, ten:'Tổ Viên Giả '+i, mon:[]}); return a; };
   hsoVe(); await w(600); ({d, tb} = dem()); window.__TUY = document.getElementById('hso-tuy').textContent;
   ok('tích 105 → khung vẫn 100 ô, Tổng số 100, có cảnh báo', tb.querySelectorAll('td').length===102 && /Tổng số: 100 ?tổ viên/.test(d.body.textContent) && /tối đa 100/.test(window.__TUY), [tb.querySelectorAll('td').length, (d.body.textContent.match(/Tổng số: [^t]*/)||[''])[0], (window.__TUY.match(/⚠ Đang tích[^.]*/)||['không có cảnh báo'])[0]].join(' | '));
   window.hsoTVTo = goc; hsoVe(); await w(300);
   /* mẫu khác không bị ảnh hưởng: 10B không có tr-sang / data-cao */
   hsoChonMau('10b'); await w(300);
   ok('10B không đổi (không ngắt trang, không dòng cố định)', !/tr-sang|data-cao/.test(HSO.x.h));
   return o; }, files);
 const b64 = await p.evaluate(()=>window.__W||''); let xml = '';
 if(b64){ const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't358-')), f = path.join(tmp, '10a.docx'); fs.writeFileSync(f, Buffer.from(b64, 'base64')); xml = cp.execSync('unzip -p '+f+' word/document.xml').toString(); }
 const okN = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 okN('Word: phần II có ngắt trang (pageBreakBefore)', /<w:pageBreakBefore\/>(?:(?!<\/w:p>).)*II\. QUY ƯỚC/.test(xml));
 okN('Word: 34 dòng khung cao cố định (trHeight exact)', (xml.match(/w:hRule="exact"/g)||[]).length===34, (xml.match(/w:hRule="exact"/g)||[]).length);
 okN('Word: khung 3 cột chia đều', /<w:tblGrid>(<w:gridCol w:w="(\d+)"\/>){3}<\/w:tblGrid>/.test(xml));
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t358 đạt'); await b.close(); process.exit(sai?1:0);
})();
