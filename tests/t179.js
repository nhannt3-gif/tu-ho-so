// 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN KHÓA — bản in MỌI mẫu so TỪNG KÝ TỰ với tests/chuan/*.html.
//   Sửa mẫu A làm lệch mẫu B → trượt, không gộp. Chỉ ghi lại chuẩn của mẫu anh đã duyệt đổi: node tests/chuan_tao.js <tên>.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1440, height:900}}); const loiTrang = []; p.on('pageerror', e=>loiTrang.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
  const {out, loi} = await require('./chuan_lay.js')(p); await b.close();
  const D = path.join(__dirname, 'chuan'), co = fs.existsSync(D) ? fs.readdirSync(D).filter(f=>/\.html$/.test(f)).map(f=>f.slice(0, -5)) : [];
  const R = [], ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi ? ' — '+chi : ''));
  Object.keys(out).forEach(k=>{
    if(co.indexOf(k)<0) return ok(k, false, 'chưa có chuẩn (node tests/chuan_tao.js)');
    const a = fs.readFileSync(path.join(D, k+'.html'), 'utf8'), c = out[k];
    if(a===c) return ok(k, true);
    let i = 0; while(i<a.length && a[i]===c[i]) i++;
    ok(k, false, 'lệch từ ký tự '+i+': chuẩn «'+a.slice(Math.max(0, i-40), i+60).replace(/\s+/g, ' ')+'» · nay «'+c.slice(Math.max(0, i-40), i+60).replace(/\s+/g, ' ')+'»');
  });
  co.filter(k=>!(k in out)).forEach(k=>ok(k, false, 'có chuẩn nhưng không lấy được bản in (mẫu bị bỏ / đổi tên?)'));
  ok('lấy đủ bản in, không lỗi', !loi.length && !loiTrang.length, loi.concat(loiTrang.slice(0, 3)).join(' · '));
  R.forEach(x=>console.log(x)); const dat = R.filter(x=>x[0]==='✓').length;
  console.log(dat+'/'+R.length+' đạt'); process.exit(dat===R.length ? 0 : 1); })();
