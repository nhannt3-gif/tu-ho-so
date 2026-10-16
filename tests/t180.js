// 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN GỐC — bản in TRẮNG của app so với file Word anh gửi (tests/mau_goc/so_do.json, tools/domau.py):
//   ① chữ (tỷ lệ từ của mẫu gốc có đúng thứ tự trong bản app — LCS) · ② số trang · ③ khổ dọc / ngang · ④ lề (±2 mm)
//   · ⑤ vị trí dòng: ghép dòng gốc (PDF LibreOffice của file Word) ↔ dòng app theo chữ đầu dòng, ≥ 70 % dòng ghép được (chú thích cuối trang, dòng chấm xuống dòng khác Word không ghép được), 90 % dòng lệch dọc ≤ 3 mm.
//   Mẫu nằm trong tests/mau_goc/khop.json (đã làm lại theo file gốc, anh duyệt) → BẮT BUỘC đạt (chữ ≥ 98 %, đúng trang, khổ, lề).
//   Mẫu chưa làm lại → chỉ BÁO số đo (không trượt) để làm ở mốc M4–M7. Tham số --chi-tiet: in các đoạn chữ gốc app còn thiếu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
const GOC = JSON.parse(fs.readFileSync(path.join(__dirname, 'mau_goc', 'so_do.json'), 'utf8'));
const KHOP = fs.existsSync(path.join(__dirname, 'mau_goc', 'khop.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'mau_goc', 'khop.json'), 'utf8')) : {};
const NOI = {hsv:{'01td':'01td', '01uq':'01uq', '03td':'03td', '09a':'09a', '01tdck':'01tdck', '01tgtv':'01tgtv', '01gqvl':'01gqvl', '07b':'07b'},
             hst:{'10c':'10c_moi', '10a':'10a', '10b':'10b', '11':'11_cu', '01bg':'01bg', '02bg':'02bg'}};
Object.assign(NOI.hsv, KHOP.noiHsv||{}); Object.assign(NOI.hst, KHOP.noiHst||{});
const tu = s => String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/[.…_,;:()\[\]"“”'‘’!?\/\-–—*+=%]+/g, ' ').split(/\s+/).filter(x=>x && !/^\d$/.test(x));
function lcs(a, b){ const n = a.length, m = b.length; let pr = new Uint16Array(m+1), cu = new Uint16Array(m+1); const keo = new Uint8Array(n);
  const D = []; for(let i=1;i<=n;i++){ for(let j=1;j<=m;j++) cu[j] = a[i-1]===b[j-1] ? pr[j-1]+1 : Math.max(pr[j], cu[j-1]); D.push(cu.slice()); [pr, cu] = [cu, pr]; cu.fill(0); }
  let i = n, j = m; while(i>0 && j>0){ if(a[i-1]===b[j-1]){ keo[i-1] = 1; i--; j--; } else if((i>1 ? D[i-2][j] : 0) >= D[i-1][j-1]) i--; else j--; }
  return {n:D.length ? D[n-1][m] : 0, keo}; }
(async()=>{ const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1440, height:900}}); const loi = []; p.on('pageerror', e=>loi.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
  const A = await p.evaluate(async(NOI)=>{ await xongTV; try{dongHop()}catch(e){} const w = t=>new Promise(r=>setTimeout(r, t)); const o = {};
    D.cauHinh.hsoO = {}; delete D.cauHinh.hsoBo;
    for(const tab of ['hsv', 'hst']){ slDoiTab(tab); doiNgan(7); await w(1200); const C = hsoCH(); C.xa=''; C.diem=''; C.to=''; C.boId = '';
      for(const k of Object.keys(NOI[tab])){ hsoChonMau(k); await w(900);
        const f = document.getElementById('hso-xem-khung'), d = f && f.contentDocument, M = hsoMau(), x = hsoLap();
        const dong = [], MM = 96/25.4;   /* vị trí đầu mỗi dòng chữ (mm từ mép trang) — so với vị trí dòng của gốc */
        if(d) [...d.querySelectorAll('.tr-tg:not(.tr-trang-trang)')].forEach((g, i) => { const r0 = g.getBoundingClientRect(), kk = (g.classList.contains('ngang') ? 210 : 297)/(r0.height/MM), tw = d.createTreeWalker(g, NodeFilter.SHOW_TEXT); let n;
          while((n = tw.nextNode())){ const v = n.nodeValue, re = /\S+/g; let m; while((m = re.exec(v))){ const rg = d.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index+m[0].length); const rc = rg.getClientRects()[0]; if(!rc) continue;   /* từng chữ → ghép theo dòng */
            const y = (rc.top - r0.top)/MM*kk, x = (rc.left - r0.left)/MM*kk, L = dong.find(q=>q[0]===i+1 && Math.abs(q[1]-y)<1.2 && x>q[4] && x-q[4]<40);
            if(L){ L[3] += ' '+m[0]; L[4] = x; } else dong.push([i+1, y, x, m[0], x]); } } });
        o[tab+'|'+k] = {goc:NOI[tab][k], h:x.h || (x.ds||[]).map(y=>y.h).join(' '), trang:d ? d.querySelectorAll('.tr-tg:not(.tr-trang-trang)').length : 0, ngang:!!M.ngang, le:M.mg || [20, 20, 20, 30], dong:dong}; } }
    return o; }, NOI);
  await b.close();
  const R = [], ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi ? ' — '+chi : '')), bao = s => R.push('  · '+s), chiTiet = process.argv.indexOf('--chi-tiet')>=0;
  Object.keys(A).forEach(k=>{ const a = A[k], g = GOC[a.goc]; if(!g){ ok(k, false, 'không có số đo gốc '+a.goc); return; }
    const tg = tu(g.doan.join(' ')), ta = tu(a.h), L = lcs(tg, ta), tl = Math.round(L.n*1000/Math.max(1, tg.length))/10;
    const leL = a.le.map((x, i)=>Math.abs(x-g.le[i])), leOk = leL.every(x=>x<=2), trOk = a.trang===g.trang || (a.trang===g.trang-1 && KHOP.trangTrang && KHOP.trangTrang.indexOf(a.goc)>=0), ngOk = a.ngang===g.ngang;
    /* vị trí dòng: ghép dòng gốc ↔ dòng app theo chữ đầu dòng (cùng trang, theo thứ tự) → độ lệch dọc mm */
    const khoa = s => (tu(s)[0]||'')+' '+(tu(s)[1]||''), sx = a => a.slice().sort((p, q)=>p[0]-q[0] || p[1]-q[1] || p[2]-q[2]);
    const gd = sx(g.dong||[]).filter(x=>tu(x[3]).length), ad = sx(a.dong||[]).filter(x=>tu(x[3]).length); let j = 0; const lech = [];
    gd.forEach(x=>{ const kx = khoa(x[3]); for(let q=j;q<Math.min(ad.length, j+14);q++){ if(ad[q][0]===x[0] && khoa(ad[q][3])===kx && Math.abs(ad[q][1]-x[1])<20){ lech.push(Math.abs(ad[q][1]-x[1])); j = q+1; break; } } });
    lech.sort((p, q)=>p-q); const ghep = Math.round(lech.length*100/Math.max(1, gd.length)), p90 = lech.length ? lech[Math.floor(lech.length*0.9)].toFixed(1) : '?';
    const vtOk = ghep>=70 && lech.length && +p90<=3;
    const tom = 'vị trí dòng: ghép '+ghep+' %, lệch 90 % ≤ '+p90+' mm · chữ '+tl+' % · trang app '+a.trang+' / gốc '+g.trang+' · '+(a.ngang ? 'ngang' : 'dọc')+(ngOk ? '' : ' ≠ gốc')+' · lề app '+a.le.join('/')+' / gốc '+g.le.join('/');
    if((KHOP.mau||[]).indexOf(a.goc)>=0) ok(k+' ↔ '+a.goc+' (đã khớp)', tl>=98 && trOk && ngOk && leOk && vtOk, tom);
    else bao(k+' ↔ '+a.goc+' (chưa làm lại): '+tom);
    if(chiTiet){ let run = []; const thieu = []; tg.forEach((x, i)=>{ if(!L.keo[i]) run.push(x); else { if(run.length>=3) thieu.push(run.join(' ')); run = []; } }); if(run.length>=3) thieu.push(run.join(' '));
      thieu.slice(0, 12).forEach(s=>bao('   thiếu: '+s.slice(0, 140))); }
  });
  ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' · '));
  R.forEach(x=>console.log(x)); const n = R.filter(x=>x[0]==='✓' || x[0]==='✗'), dat = n.filter(x=>x[0]==='✓').length;
  console.log(dat+'/'+n.length+' đạt'); process.exit(dat===n.length ? 0 : 1); })();
