// 3.503 (anh 08/11 — Đợt 2 mục 4): KHUNG MẪU IN CHUNG MAU_IN (js/31b) — hợp đồng của khung, độc lập với mẫu cụ thể:
//   ① dangKy / lay (chưa đăng ký → báo lỗi rõ) · ② trang: khổ / lề theo mẫu, nhiều bản · ③ hop: mở, đóng rồi mở lại vẫn hiện, chiXem giữ khung khai báo
//   ④ dien: thay / giữ chấm / thêm cách khi nhãn dính chấm / {{K~|…}} · ⑤ khuon: tải khi cần, tên sai → lỗi rõ, không treo · ⑥ docx: 1 bản + nhiều bản (ngắt trang), XML hợp lệ, chân trang số trang
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path = require('path'), zlib = require('zlib');
function docZip(buf, ten){ let e = buf.length-22; while(e>=0 && buf.readUInt32LE(e)!==0x06054b50) e--; let p = buf.readUInt32LE(e+16); const n = buf.readUInt16LE(e+10);
  for(let i=0;i<n;i++){ const pt = buf.readUInt16LE(p+10), csz = buf.readUInt32LE(p+20), ln = buf.readUInt16LE(p+28), lx = buf.readUInt16LE(p+30), lc = buf.readUInt16LE(p+32), off = buf.readUInt32LE(p+42), tn = buf.slice(p+46, p+46+ln).toString();
    if(tn===ten){ const d = off+30+buf.readUInt16LE(off+26)+buf.readUInt16LE(off+28), raw = buf.slice(d, d+csz); return (pt===8 ? zlib.inflateRawSync(raw) : raw).toString('utf8'); } p += 46+ln+lx+lc; } return ''; }
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1280, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const r = await p.evaluate(async() => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   /* ① sổ */
   MAU_IN.dangKy('thu1', {ma:'TH/01', ten:'Mẫu thử', mg:[15, 15, 15, 25], ngang:true, html:function(g){ return '<p class="b">MẪU THỬ '+coChuHTML(g.ten)+'</p>'; },
     khuon:['kt727', 'cx03'], word:function(K, g){ return MAU_IN.dien(K.than, {HOI:g.ten, XA:'Xã Thử', STO:'3'}); }});
   let e1 = ''; try { MAU_IN.lay('khongco'); } catch(e){ e1 = e.message; }
   o.so = MAU_IN.lay('thu1').ma==='TH/01' && /Chưa đăng ký mẫu khongco/.test(e1);
   /* ② trang */
   const h = MAU_IN.trang('thu1', [{ten:'Một'}, {ten:'Hai'}], 'Tên thử');
   o.trang = /size:A4 landscape/.test(h) && /15mm 15mm 15mm 25mm/.test(h) && /MẪU THỬ Một/.test(h) && /MẪU THỬ Hai/.test(h) && /<title>Tên thử<\/title>/.test(h);
   /* ③ hop: mở → đóng → mở lại; chiXem giữ khung khai báo */
   MAU_IN.hop({ma:'thu1', gts:[{ten:'A'}], dau:'<input id="o-thu" value="giu">'}); await w(200);
   const hien = () => document.getElementById('hop').classList.contains('hien') && !!document.getElementById('mi-khung');
   o.hop1 = hien() && MAU_IN.X.ma==='thu1';
   dongHop(); await w(100); MAU_IN.hop({ma:'thu1', gts:[{ten:'B'}], dau:'<input id="o-thu" value="moi">'}); await w(200);
   o.hop2 = hien() && /MẪU THỬ B/.test(MAU_IN.X.trang) && document.getElementById('o-thu').value==='moi';
   document.getElementById('o-thu').value = 'dang go'; MAU_IN.hop({ma:'thu1', gts:[{ten:'C'}], dau:'<input id="o-thu" value="x">', chiXem:1}); await w(150);
   o.chiXem = document.getElementById('o-thu').value==='dang go' && /MẪU THỬ C/.test(MAU_IN.X.trang);
   o.nutWord = !!document.querySelector('#mi-nut [data-lenh], #mi-nut button'); dongHop();
   /* ④ dien */
   const x1 = '<w:p><w:r><w:t xml:space="preserve">Xã{{XA|.....}} có {{SO|....}}(tỷ lệ) {{TR|......}}</w:t></w:r></w:p>';
   o.dien = MAU_IN.dien(x1, {XA:'Truông Mít', SO:'3', TR:''})==='<w:p><w:r><w:t xml:space="preserve">Xã Truông Mít có 3 (tỷ lệ) ......</w:t></w:r></w:p>';
   o.dienNg = MAU_IN.dien('<w:t>{{A~|...}}</w:t>', {A:'x'})==='<w:t></w:t>' && MAU_IN.dien('<w:t>{{A~|...}}</w:t>', {})==='<w:t>...</w:t>' && MAU_IN.dien('<w:t>{{A|..}}</w:t>', {A:'a<b&c'})==='<w:t>a&lt;b&amp;c</w:t>';
   /* ⑤ khuon */
   let e2 = ''; try { await MAU_IN.khuon('khong-co-khuon'); } catch(e){ e2 = e.message; }
   o.khuonLoi = /Không tải được khuôn Word khong-co-khuon/.test(e2);
   const K1 = await MAU_IN.khuon('kt727'), K2 = await MAU_IN.khuon('kt727'); o.khuon = !!K1.m15 && K1===K2;
   /* ⑥ docx */
   const b1 = await MAU_IN.word('thu1', {ten:'Hội Thử'}), b2 = await MAU_IN.word('thu1', [{ten:'Hội Một'}, {ten:'Hội Hai'}]);
   o.b1 = Array.from(new Uint8Array(await b1.arrayBuffer())); o.b2 = Array.from(new Uint8Array(await b2.arrayBuffer()));
   return o; });
 const x1 = docZip(Buffer.from(r.b1), 'word/document.xml'), x2 = docZip(Buffer.from(r.b2), 'word/document.xml'), ft = docZip(Buffer.from(r.b1), 'word/footer1.xml'), rel = docZip(Buffer.from(r.b1), 'word/_rels/document.xml.rels');
 const hopLe = await p.evaluate(ds => ds.map(x => !!x && !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length), [x1, x2, ft, rel]);
 ok('① sổ mẫu: đăng ký / lấy; mẫu chưa đăng ký → báo lỗi rõ', r.so);
 ok('② bản in: khổ ngang, lề theo mẫu, nhiều bản, tên', r.trang);
 ok('③ hộp: mở được, có nút xuất', r.hop1 && r.nutWord);
 ok('③ hộp: đóng rồi mở lại vẫn hiện, nội dung mới (bài học 3.501)', r.hop2);
 ok('③ hộp: chiXem chỉ dựng lại bản xem, giữ ô đang gõ', r.chiXem);
 ok('④ điền: thay giá trị, thêm cách khi nhãn dính chấm, trống giữ chấm gốc', r.dien);
 ok('④ điền: {{K~|…}} bỏ chấm khi có giá trị, giữ khi trống; thoát ký tự XML', r.dienNg);
 ok('⑤ khuôn: tải 1 lần dùng lại; tên sai → lỗi rõ, không treo', r.khuon && r.khuonLoi);
 ok('⑥ Word 1 bản: XML hợp lệ (document, chân trang, quan hệ), có chữ đã điền, chân trang số trang', hopLe.every(Boolean) && /Hội Thử/.test(x1) && /PAGE/.test(ft) && /rIdF1/.test(x1) && /footer1\.xml/.test(rel), JSON.stringify(hopLe));
 ok('⑥ Word nhiều bản: ngắt trang giữa các bản, đủ 2 bản', /w:br w:type="page"/.test(x2) && /Hội Một/.test(x2) && /Hội Hai/.test(x2));
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
