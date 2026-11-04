// 3.464 (anh 04/11 "hạn chế code rác, tối ưu chương trình" — KE_HOACH_DON_NEN mục 7.2): ĐO MÃ RÁC bằng trình phân tích cú pháp JS (acorn)
//   - ham_chet: hàm top-level không tới được từ mã chạy lúc nạp / index.html / dt.html / khuôn KTGS (đi theo lời gọi), trừ hàm phép thử gọi (in riêng)
//   - ham_trung: nhóm hàm (> 300 ký tự) thân giống hệt nhau (bỏ chú thích, khoảng trắng)
//   In JSON: {ham_chet, ds_chet[], chi_thu[], ham_trung, ds_trung[[...]]}. Không có acorn → {"bo":"…"} (kiem.py bỏ qua thước đo này).
//   node tests/rac.js [thư mục gốc]
const fs = require('fs'), path = require('path');
let acorn, walk;
for(const g of ['acorn', '/opt/node-tools/node_modules/acorn']){ try { acorn = require(g); walk = require(g.replace(/acorn$/, 'acorn-walk')); break; } catch(e){} }
if(!acorn){ console.log(JSON.stringify({bo:'không có acorn'})); process.exit(0); }
const G = process.argv[2] || path.join(__dirname, '..'), idx = fs.readFileSync(path.join(G, 'index.html'), 'utf8');
const tep = [...idx.matchAll(/<script src="(js\/[^"?]+)/g)].map(m=>m[1]);
const fn = Object.create(null), raw = {}, H = {}; let top = idx;
for(const p of tep){ const t = fs.readFileSync(path.join(G, p), 'utf8'); raw[p] = t; const cm = [];
  const ast = acorn.parse(t, {ecmaVersion:'latest', onComment:(b, x, s, e)=>cm.push([s, e])});
  const sach = (a, b)=>{ let s = t.slice(a, b); for(const [x, y] of cm.filter(c=>c[0]>=a && c[1]<=b).sort((u, v)=>v[0]-u[0])) s = s.slice(0, x-a)+' '+s.slice(y-a); return s; };
  let pos = 0;
  for(const n of ast.body){ if(n.type==='FunctionDeclaration'){ fn[n.id.name] = {p, a:n.start, b:n.end, txt:sach(n.start, n.end)}; top += sach(pos, n.start); pos = n.end; } }
  top += sach(pos, t.length);
  walk.full(ast, n=>{ if(/^Function/.test(n.type) && n.end-n.start>300){ const k = sach(n.body.start, n.body.end).replace(/\s+/g, ''); (H[k] = H[k] || []).push(p+':'+(n.id ? n.id.name : '(ẩn)')); } }); }
for(const d of ['js/dt', 'js/khuon']){ const D = path.join(G, d); if(fs.existsSync(D)) for(const f of fs.readdirSync(D)) top += fs.readFileSync(path.join(D, f), 'utf8'); }
if(fs.existsSync(path.join(G, 'dt.html'))) top += fs.readFileSync(path.join(G, 'dt.html'), 'utf8');
const tok = s=>new Set(s.match(/[\w$]+/g) || []);
const song = new Set(), hang = []; for(const x of tok(top)) if(fn[x] && !song.has(x)){ song.add(x); hang.push(x); }
while(hang.length){ const x = hang.pop(); const t = fn[x].txt; for(const y of tok(t.slice(t.indexOf('(')))) if(fn[y] && !song.has(y)){ song.add(y); hang.push(y); } }
const thu = tok(fs.readdirSync(path.join(G, 'tests')).filter(f=>f.endsWith('.js') && f!=='rac.js').map(f=>fs.readFileSync(path.join(G, 'tests', f), 'utf8')).join('\n'));
const chet = Object.keys(fn).filter(x=>!song.has(x)), ds_chet = chet.filter(x=>!thu.has(x)).map(x=>fn[x].p+':'+x), chi_thu = chet.filter(x=>thu.has(x));
const ds_trung = Object.values(H).filter(v=>v.length>1);
console.log(JSON.stringify({ham_chet:ds_chet.length, ds_chet, chi_thu, ham_trung:ds_trung.length, ds_trung}));
