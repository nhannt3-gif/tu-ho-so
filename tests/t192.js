// 3.230 (R1 chuẩn hóa — KE_HOACH_CHUAN_HOA): "Có gì mới" ≤ 15 dòng + link CHANGELOG · hàm mồ côi đã dọn không còn · thanh lọc Sổ hộ vay không bung khi tắt khung xem
//   · thước đo kiem.py chạy, trong mốc · bump.py tự cắt "Có gì mới". Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1; const w=t=>new Promise(r=>setTimeout(r,t));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const x = {};
   x.moi = CO_GI_MOI.ds.length; x.link = /CHANGELOG\.md/.test(noiDungCoGiMoi()); x.thu = CO_GI_MOI.thu.length; x.daBo = (CO_GI_MOI.bo||[]).length; x.hd = /Thử trên máy — nút mới ở đâu/.test(noiDungCoGiMoi()) && /Đã bỏ \/ thay thế/.test(noiDungCoGiMoi());
   x.bo = ['datXa','ktKBGT','tcKiemTrung','theTrong','khaiVaLuu','hangLocNhanh','menuDong','moBaoCaoQuet','gopNhanh','apToanPGD','boBaoCao','gdxGLLamTrong','gdxThan','ktDsLTC','ktGNKhaiBao','ktKhaiBao','pvMo','slKTDauHTML','thXem'].filter(n=>typeof window[n]!=='undefined');
   slDoiTab('hsv'); doiNgan(7); await w(1200); hsoChonMau('sohv'); await w(500);
   const tim = document.getElementById('hm-so-tim'), sel = [...document.querySelectorAll('.hm-so-loc select')];
   x.tim = Math.round(tim.getBoundingClientRect().width); x.sel = Math.max.apply(null, sel.map(e=>e.getBoundingClientRect().width));
   x.co = [getComputedStyle(tim).fontSize, getComputedStyle(document.querySelector('.hm-so-loc .nho')).fontSize];
   return x; }, files);
 ok('"Có gì mới" chỉ 15 dòng gần nhất + link CHANGELOG + 3.432: hướng dẫn thử (nút mới ở đâu, ≤ 20) + đã bỏ / thay thế', r.moi===15 && r.link && r.thu>0 && r.thu<=20 && r.daBo>0 && r.daBo<=20 && r.hd, JSON.stringify([r.moi, r.link, r.thu, r.daBo, r.hd]));
 ok('3.399.1: mỗi dòng "Có gì mới" có chữ đủ (không chỉ biểu tượng) + lệnh mở (đúng dạng [chữ, lệnh])', await p.evaluate(()=>CO_GI_MOI.ds.every(x=>String(x[0]).replace(/[^\p{L}\p{N}]/gu, '').length>=8 && (x[1]==='' || /^[a-zA-Z_$][\w$.]*\(/.test(String(x[1]))))), JSON.stringify(await p.evaluate(()=>CO_GI_MOI.ds.filter(x=>!(String(x[0]).replace(/[^\p{L}\p{N}]/gu, '').length>=8 && (x[1]==='' || /^[a-zA-Z_$][\w$.]*\(/.test(String(x[1]))))).map(x=>x[0]).slice(0,3))));
 ok('hàm mồ côi đã dọn không còn trong app', !r.bo.length, r.bo.join(','));
 ok('Sổ hộ vay tắt khung xem: ô Tìm ≤ 340 px, ô chọn ≤ 240 px, chữ ô tìm = chữ nút', r.tim<=340 && r.sel<=240 && r.co[0]===r.co[1], JSON.stringify([r.tim, r.sel, r.co]));
 const k = cp.execSync('python3 '+path.join(__dirname, 'kiem.py')).toString();
 ok('kiem.py: cú pháp OK, thước đo trong mốc', /Cú pháp OK/.test(k) && /Thước đo:.*— trong mốc/.test(k), k.split('\n').pop() || k.split('\n').slice(-2)[0]);
 /* bump.py cắt "Có gì mới": chạy trên bản sao tạm */
 const tam = fs.mkdtempSync('/tmp/bump'), G = path.resolve(__dirname, '..');
 cp.execSync('mkdir -p '+tam+'/js '+tam+'/tests '+tam+'/docs '+tam+'/tools && cp '+G+'/js/02-nen.js '+G+'/js/06-hop-thoai.js '+tam+'/js/ && cp '+G+'/index.html '+tam+'/ && cp '+G+'/tests/hoiquy2.js '+G+'/tests/README.md '+tam+'/tests/ && cp '+G+'/docs/CHANGELOG.md '+G+'/docs/BAN_GIAO_VIEC_CON_LAI.md '+tam+'/docs/ && cp '+G+'/tools/bump.py '+tam+'/tools/');
 const ban = /var APP_BAN = '([^']+)'/.exec(fs.readFileSync(G+'/js/02-nen.js', 'utf8'))[1];
 fs.writeFileSync(tam+'/s.json', JSON.stringify({ban:'9.999', cu:ban, moi:[['Dòng mới 1', ''], ['Dòng mới 2', '']], thu:['Nút thử 1', 'Nút thử 2'], bo:['Bỏ cái cũ'], changelog:'## 9.999 — thử', bangiao:'### Danh sách thử trên máy thật (9.999)', readme:'| `node tests/t999.js` | thử |', batdau:''}));
 cp.execSync('cd '+tam+' && python3 tools/bump.py s.json');
 const s6 = fs.readFileSync(tam+'/js/06-hop-thoai.js', 'utf8'), i = s6.indexOf('var CO_GI_MOI'), dong = s6.slice(i, s6.indexOf('  thu:[', i)).split('\n').filter(l=>/^  \[/.test(l));
 let cuPhap = true; try { cp.execSync('node --check '+tam+'/js/06-hop-thoai.js'); } catch(e){ cuPhap = false; }
 ok('bump.py: thêm 2 dòng mới vẫn chỉ giữ 15, dòng mới ở đầu, cú pháp đúng', dong.length===15 && /Dòng mới 1/.test(dong[0]) && cuPhap, dong.length);
 const tt = s6.slice(s6.indexOf('  thu:[', i), s6.indexOf('  bo:[', i)).split('\n').filter(l=>/^    "/.test(l)), bb = s6.slice(s6.indexOf('  bo:[', i), s6.indexOf(']};', s6.indexOf('  bo:[', i))+3).split('\n').filter(l=>/^    "/.test(l));
 ok('3.432 bump.py: hướng dẫn thử + đã bỏ thêm lên đầu kèm số bản, giữ ≤ 20 dòng', /"9\.999 · Nút thử 1"/.test(tt[0]) && /"9\.999 · Nút thử 2"/.test(tt[1]) && tt.length<=20 && /"9\.999 · Bỏ cái cũ"/.test(bb[0]) && bb.length<=20 && cuPhap, tt.length+' / '+bb.length);
 fs.writeFileSync(tam+'/s2.json', JSON.stringify({ban:'9.998', cu:'9.999', moi:[['Dòng mới 3', '']], changelog:'## 9.998', bangiao:'### Danh sách thử trên máy thật (9.998)', readme:'| `node tests/t998.js` | thử |', batdau:''}));
 let chan = false; try { cp.execSync('cd '+tam+' && python3 tools/bump.py s2.json 2>/dev/null'); } catch(e){ chan = true; }
 ok('3.432 bump.py: spec thiếu "thu" (hướng dẫn thử) → chặn', chan);
 cp.execSync('rm -rf '+tam);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
