// 3.443 (anh 02/11) — Mẫu 10A/TD: khung cố định 100 tổ viên, 3 cột × 34 dòng (đánh số dọc theo cột), nằm trang 1–2;
//   3.443.1 (anh 02/11): cả mẫu 4 trang, chừa chỗ ký — bỏ ngắt trang cứng (dòng khung cao cố định giữ bố cục), lề 15 mm, tên dài thu chữ.
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
   ok('3.443.1: không ngắt trang cứng (khung cao cố định giữ bố cục)', pII && !pII.classList.contains('tr-sang') && !/tr-sang/.test(HSO.x.h));
   ok('3.443.1: lề trên / dưới 15 mm', hsoMauK('10a').mg[0]===15 && hsoMauK('10a').mg[2]===15, JSON.stringify(hsoMauK('10a').mg));
   /* xem trước = bản in: khung trang 1–2, cả mẫu 4 trang, chừa chỗ UBND ký */
   hsoXem(); await w(2500);
   const kd = document.getElementById('hso-xem-khung').contentDocument, tg = [...kd.querySelectorAll('.tr-tg')].map(x=>x.innerText.replace(/\s+/g, ' '));
   const i100 = tg.findIndex(x=>/\b100\./.test(x)), iII = tg.findIndex(x=>/II\. QUY ƯỚC/.test(x));
   ok('bản in: khung 1–100 + Tổng số ở trang 1–2, phần II nối sau ở trang 2', i100===1 && /Tổng số/.test(tg[1]||'') && iII===1, tg.length+' trang · 100 ở trang '+(i100+1)+' · II ở trang '+(iII+1));
   ok('cả mẫu đúng 4 trang', tg.length===4, tg.length+' trang');
   const nd = [...kd.querySelectorAll('.tr-nd')], Ln = nd[nd.length-1], rb = Ln.getBoundingClientRect().bottom, kb = [...Ln.querySelectorAll('p,td')].reduce((m,e)=>Math.max(m, e.getBoundingClientRect().bottom), 0), trong = (rb-kb)/(96/25.4);
   ok('trang 4: dưới chỗ UBND ký còn ≥ 25 mm', trong>=25, trong.toFixed(1)+' mm');
   const tieu = [...kd.querySelectorAll('.tr-tg')].map(x=>{ const ps = [...x.querySelectorAll('.tr-nd p')].filter(p=>p.textContent.trim()); return ps.length ? ps[ps.length-1].textContent.trim() : ''; });
   ok('tiêu đề mục II–IV không treo cuối trang', !tieu.some(t=>/^(II|III|IV)\. /.test(t)), tieu.map(t=>t.slice(0, 20)).join(' | '));
   /* Word */
   const x = hsoLap(); let b64 = '';
   try { const bl = await hsoDocx(x); b64 = await new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result.split(',')[1]); fr.readAsDataURL(bl); }); } catch(e){ b64 = ''; }
   window.__W = b64;
   /* tên dài → thu chữ trong ô (không xuống dòng) */
   { const g0 = window.hsoTVTo; window.hsoTVTo = tt => [{kh:'GD1', ten:'Nguyễn Thị Ngọc Phương Thảo', mon:[]}, {kh:'GD2', ten:'Lê Văn An', mon:[]}];
     hsoVe(); await w(500); const t2 = dem().tb; window.hsoTVTo = g0;
     ok('tên dài (5 chữ) thu cỡ 9–11, tên ngắn giữ cỡ 12', /\bs(9|10|11)\b/.test(t2.rows[0].cells[0].innerHTML) && !/class="s(9|10|11)"/.test(t2.rows[1].cells[0].innerHTML), t2.rows[0].cells[0].innerHTML.slice(0, 80)); }
   /* > 100 tổ viên: chỉ in 100, báo */
   const goc = window.hsoTVTo; window.hsoTVTo = tt => { const a = goc(tt).slice(); for(let i=a.length;i<105;i++) a.push({kh:'GIA'+i, ten:'Tổ Viên Giả '+i, mon:[]}); return a; };
   hsoVe(); await w(600); ({d, tb} = dem()); window.__TUY = document.getElementById('hso-tuy').textContent;
   ok('tích 105 → khung vẫn 100 ô, Tổng số 100, có cảnh báo', tb.querySelectorAll('td').length===102 && /Tổng số: 100 ?tổ viên/.test(d.body.textContent) && /tối đa 100/.test(window.__TUY), [tb.querySelectorAll('td').length, (d.body.textContent.match(/Tổng số: [^t]*/)||[''])[0], (window.__TUY.match(/⚠ Đang tích[^.]*/)||['không có cảnh báo'])[0]].join(' | '));
   window.hsoTVTo = goc; hsoVe(); await w(300);
   /* mẫu khác không bị ảnh hưởng: 10B không có tr-sang / data-cao */
   hsoChonMau('10b'); await w(300);
   ok('10B không đổi (không dòng cố định)', !/data-cao/.test(HSO.x.h));
   return o; }, files);
 const b64 = await p.evaluate(()=>window.__W||''); let xml = '';
 if(b64){ const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't358-')), f = path.join(tmp, '10a.docx'); fs.writeFileSync(f, Buffer.from(b64, 'base64')); xml = cp.execSync('unzip -p '+f+' word/document.xml').toString(); }
 const okN = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 okN('Word: không ngắt trang cứng', !/<w:pageBreakBefore\/>/.test(xml));
 okN('Word: 34 dòng khung cao cố định (trHeight exact)', (xml.match(/w:hRule="exact"/g)||[]).length===34, (xml.match(/w:hRule="exact"/g)||[]).length);
 okN('Word: khung 3 cột chia đều', /<w:tblGrid>(<w:gridCol w:w="(\d+)"\/>){3}<\/w:tblGrid>/.test(xml));
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t358 đạt'); await b.close(); process.exit(sai?1:0);
})();
