// 3.369 (tối ưu nạp — phương án A anh duyệt 25/10): slNen / slMoBang viết lại cho nhanh phải cho KẾT QUẢ Y HỆT thuật toán cũ
// (giữ bản cũ trong phép thử để so) — cột số, cột chữ lặp (từ điển), cột chữ không lặp, ô trống / null / số lẫn chữ; dò Mẫu 01/TV chỉ 100 dòng đầu
// vẫn nhận được file có dòng tên cột ở dòng 30. Không cần file dữ liệu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){}
   const nenCu = function(rows, truong){ var cot = {}; truong.forEach(function(f){ var a = rows.map(function(o){ return o[f]; });
       if(((SL_TRUONG[f]||{}).t || (slNen.them && slNen.them[f] && slNen.them[f].t))==='n'){ cot[f] = a; return; }
       var tu = {}, dsTu = [], chi = new Array(a.length); for(var i=0;i<a.length;i++){ var v = a[i]==null ? '' : a[i]; var j = tu[v]; if(j===undefined){ j = tu[v] = dsTu.length; dsTu.push(v); } chi[i] = j; }
       cot[f] = dsTu.length < a.length*0.6 ? {d:dsTu, i:chi} : a; }); return cot; };
   const moCu = function(b){ var n = b.n, rows = new Array(n), i; for(i=0;i<n;i++) rows[i] = {}; Object.keys(b.cot).forEach(function(f){ var c = b.cot[f]; if(Array.isArray(c)) for(i=0;i<n;i++) rows[i][f] = c[i]; else for(i=0;i<n;i++) rows[i][f] = c.d[c.i[i]]; }); return rows; };
   const rows = []; for(let i=0;i<500;i++) rows.push({ku:String(1000000000+i), dn:i*1000, ten:'Khách '+(i%7), xa:i%3 ? 'Gia Lộc' : null, c_ghi:i%11===0 ? '' : (i%5 ? 'Ghi '+i : 5), c_so:i%4 ? i : '', c_lan:i%2 ? 5 : '5'});
   const truong = ['ku','dn','ten','xa','c_ghi','c_so','c_lan']; slNen.them = {c_so:{t:'n'}};
   const a = JSON.stringify(nenCu(rows, truong)), m = JSON.stringify(slNen(rows, truong)); slNen.them = null;
   const c = nenCu(rows, truong); const ra = {nen:a===m, mo:JSON.stringify(moCu({n:rows.length, cot:c}))===JSON.stringify(slMoBang({n:rows.length, cot:JSON.parse(JSON.stringify(c))}))};
   /* Mẫu 01/TV giả: 28 dòng tiêu đề / ghi chú rồi mới tới dòng tên cột (dòng 30) */
   const tv = []; tv.push(['Mẫu 01/TV']); for(let i=0;i<27;i++) tv.push(['ghi chú '+i]); tv.push(['Mã tổ: 0026001']);
   tv.push(['STT','Họ và tên','Mã khách hàng','Số CMND/CCCD','Điện thoại','Dư nợ','Số dư tiền gửi']); tv.push([1,'Nguyễn Văn A','0001112223','012345678901','0900000000',1000000,50000]);
   const x = tv01Doc([{ten:'S1', rows:tv}]); ra.tv01 = !!x && x.rows.length===1 && x.rows[0].kh==='0001112223';
   return ra; });
 ok('3.369 slNen mới = thuật toán cũ (cột số, chữ lặp → từ điển, chữ không lặp, ô trống / null, số lẫn chữ)', r.nen, JSON.stringify(r));
 ok('3.369 slMoBang mới dựng lại y hệt bản cũ (thứ tự trường, giá trị)', r.mo);
 ok('3.369 dò Mẫu 01/TV trong 100 dòng đầu: dòng tên cột ở dòng 30 vẫn nhận đúng', r.tv01);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t310 đạt'); await b.close(); process.exit(sai?1:0);
})();
