// 3.223 M0: GHI bản in chuẩn khóa vào tests/chuan/<tên>.html. Dùng:
//   node tests/chuan_tao.js            → chỉ ghi mục CHƯA có chuẩn (không đè)
//   node tests/chuan_tao.js tên1 tên2  → ghi đè đúng các mục đó (chỉ khi anh đã duyệt đổi mẫu đó)
//   node tests/chuan_tao.js --xem      → in danh sách mục, không ghi
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1440, height:900}}); const loiTrang = []; p.on('pageerror', e=>loiTrang.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
  const {out, loi} = await require('./chuan_lay.js')(p); await b.close();
  const D = path.join(__dirname, 'chuan'); fs.mkdirSync(D, {recursive:true});
  const ds = process.argv.slice(2), xem = ds[0]==='--xem'; let ghi = 0;
  Object.keys(out).forEach(k=>{ const f = path.join(D, k+'.html'), co = fs.existsSync(f);
    if(xem){ console.log((co ? '  ' : '+ ')+k+' '+out[k].length); return; }
    if(ds.length ? ds.indexOf(k)>=0 : !co){ fs.writeFileSync(f, out[k]); ghi++; console.log('ghi '+k); } });
  if(loi.length) console.log('LỖI lấy:', loi.join(', ')); if(loiTrang.length) console.log('LỖI TRANG:', loiTrang.slice(0, 3));
  console.log(Object.keys(out).length+' mục · ghi '+ghi); })();
