// 3.142 — đợt A tách file: mở app qua máy chủ web (như link GitHub Pages), không phải file://
//        · đủ 22 file js + css nạp, đúng số bản; ?v= khớp APP_BAN · index.html không còn khối viết trong trang, kiểu chữ từ css/app.css
//        · cửa sổ nổi HSSV (giả lập bằng window.open) chép đủ luật CSS → nền tối khối HSSV đúng màu
//        · mã ghép (tests/nguon.js) giống bản tách: mọi hàm cấp ngoài của các file js đều có trên trang
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), http=require('http');
const GOC = path.resolve(__dirname, '..');
const LOAI = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8'};
const sv = http.createServer((q, r) => { const f = path.join(GOC, decodeURIComponent(q.url.split('?')[0]).replace(/^\/$/, '/index.html'));
  if(!f.startsWith(GOC)) { r.statusCode = 403; return r.end(); }
  fs.readFile(f, (e, d) => { if(e){ r.statusCode = 404; return r.end(); } r.setHeader('Content-Type', LOAI[path.extname(f)] || 'application/octet-stream'); r.end(d); }); });
(async()=>{ await new Promise(r=>sv.listen(0, '127.0.0.1', r)); const cong = sv.address().port;
 const b=await chromium.launch(); const loi=[], thieu=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 p.on('response', x=>{ if(x.status()>=400 && /127\.0\.0\.1/.test(x.url())) thieu.push(x.url()); });
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('http://127.0.0.1:'+cong+'/'); await p.waitForTimeout(1500);
 const tepJS = fs.readdirSync(path.join(GOC,'js')).filter(n=>n.endsWith('.js')).sort();
 const hamFile = [].concat.apply([], tepJS.map(n=>(fs.readFileSync(path.join(GOC,'js',n),'utf8').match(/^function ([\w$]+)/mg)||[]).map(x=>x.slice(9))));
 const R = await p.evaluate(async(a)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const sc = Array.from(document.querySelectorAll('script[src]')).map(s=>s.getAttribute('src'));
   ok('nạp đủ '+a.tepJS.length+' file js theo thứ tự tên', sc.filter(s=>/^js\//.test(s)).map(s=>s.replace(/^js\/|\?.*$/g,'')).join()===a.tepJS.join(), sc.length);
   ok('?v= mọi thẻ nạp = APP_BAN', Array.from(document.querySelectorAll('script[src^="js/"],link[href^="css/"]')).every(e=>(e.getAttribute('src')||e.getAttribute('href')).split('?v=')[1]===APP_BAN), APP_BAN);
   ok('file index.html không còn khối <style> / <script> viết trong trang', a.trongHTML===0, a.trongHTML);
   ok('kiểu chữ từ css/app.css có tác dụng (biến màu nền)', getComputedStyle(document.documentElement).getPropertyValue('--nen').trim()!=='');
   const vang = a.ham.filter(f=>typeof window[f]!=='function'); ok('mọi hàm cấp ngoài trong js/ đều có trên trang ('+a.ham.length+')', !vang.length, vang.slice(0,5).join());
   /* cửa sổ nổi HSSV: trang http đọc được luật CSS → chép thành <style> ngay, không chờ tải */
   window.documentPictureInPicture = {requestWindow: () => Promise.resolve(window.open('', 'hsnoi', 'width=460,height=620'))};
   CC.mo = ''; ccMo('hssv'); await w(100); hsNoi(); await w(400);
   const pw = HS_PIP, pd = pw && pw.document;
   ok('📌 cửa sổ nổi mở, có ô ra trường + kết quả', !!pd && !!pd.getElementById('hs-rt') && !!pd.getElementById('hs-kq'));
   ok('📌 luật CSS chép sang ngay (không dùng link)', !!pd && !pd.querySelector('link') && pd.querySelectorAll('style').length>=2 && Array.from(pd.querySelectorAll('style')).some(s=>/--nen/.test(s.textContent)));
   if(pd){ const go = (id, v) => { const e = pd.getElementById(id); e.value = v; e.dispatchEvent(new pw.Event('input')); };
     go('hs-gdx', '07'); go('hs-rt', '30/08/2030'); await w(200);
     pd.documentElement.setAttribute('data-theme', 'dark');
     ok('📌 nền tối: khối HSSV nền tối', pw.getComputedStyle(pd.querySelector('.hs-k')).backgroundColor==='rgb(22, 58, 36)', pw.getComputedStyle(pd.querySelector('.hs-k')).backgroundColor);
     hsNoiDong(); }
   return o;
 }, {tepJS, ham: hamFile, trongHTML: (fs.readFileSync(path.join(GOC,'index.html'),'utf8').match(/^<(style|script)>$/mg)||[]).length});
 R.forEach(x=>console.log(x)); if(thieu.length) console.log('THIẾU FILE:', thieu.slice(0,5)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length + (thieu.length ? 1 : 0); console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); sv.close(); process.exit(sai||loi.length ? 1 : 0);
})();
