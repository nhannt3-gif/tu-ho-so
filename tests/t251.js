// P1 🎯 PHÂN BỔ KH — cửa chung KHO.duNoAp(kỳ) (js/29-kho.js): dư nợ Mẫu 31 gộp xã × thôn × CT × nguồn. Chạy bằng node (giả slBo / SLM), dữ liệu GIẢ.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dong = [
  {ku:'K1', xa:'480001', tenXa:'Xã Giả A', thon:'48000101', tenThon:'Thôn 1', ct:'03', nguon:'1', dn:100e6, ttMon:'OPEN'},
  {ku:'K1', xa:'480001', tenXa:'Xã Giả A', thon:'48000101', tenThon:'Thôn 1', ct:'03', nguon:'1', dn:100e6, ttMon:'OPEN'},   // dòng lặp khế ước → 1 lần
  {ku:'K2', xa:'480001', tenXa:'Xã Giả A', thon:'48000101', tenThon:'Thôn 1', ct:'03', nguon:'TW', dn:50e6, ttMon:'OPEN'},
  {ku:'K3', xa:'480001', tenXa:'Xã Giả A', thon:'48000101', tenThon:'Thôn 1', ct:'03', nguon:'2', dn:70e6, ttMon:'OPEN'},    // khác nguồn
  {ku:'K4', xa:'480001', tenXa:'Xã Giả A', thon:'48000102', tenThon:'Thôn 2', ct:'06', nguon:'Địa phương', dn:30e6, ttMon:'OPEN'},
  {ku:'K5', xa:'480001', tenXa:'Xã Giả A', thon:'48000102', tenThon:'Thôn 2', ct:'06', nguon:'2', dn:0, ttMon:'OPEN'},       // dư nợ 0 → bỏ
  {ku:'K6', xa:'480001', tenXa:'Xã Giả A', thon:'48000102', tenThon:'Thôn 2', ct:'06', nguon:'2', dn:20e6, ttMon:'CLOSE'},   // đã tất toán → bỏ
  {kh:'KH9', xa:'480001', thon:'48000102', ct:'', nguon:'', dn:0},                                                            // khách chỉ gửi TK → bỏ
  {ku:'K7', xa:'480002', tenXa:'Phường Giả B', thon:'48000201', tenThon:'Khu phố 1', ct:'03', nguon:'1', dn:40e6, ttMon:'OPEN'}];
const ctx = vm.createContext({console, Promise, TO_K:null, SLM:{bang:{'hstd|2026-08':{loai:'hstd', ky:'2026-08'}}},
  slKhoa:(l, k) => l+'|'+k, slBo:ky => Promise.resolve({co:{hstd:dong}})});
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', '29-kho.js'), 'utf8'), ctx);
const R = []; const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
(async()=>{
  const D = await ctx.KHO.duNoAp('2026-08');
  const tim = (thon, ct, nv) => D.ds.find(d => d.thon===thon && d.ct===ct && d.nguon===nv);
  ok('có kết quả đúng kỳ', D && D.ky==='2026-08');
  ok('gộp theo thôn × CT × nguồn; dòng lặp khế ước tính 1 lần; "TW" = 1', tim('48000101', '03', 1) && tim('48000101', '03', 1).dn===150e6 && tim('48000101', '03', 1).mon===2, JSON.stringify(tim('48000101', '03', 1)));
  ok('khác nguồn tách riêng', tim('48000101', '03', 2) && tim('48000101', '03', 2).dn===70e6);
  ok('"Địa phương" = 2; bỏ món dư nợ 0, món CLOSE, khách chỉ gửi TK', tim('48000102', '06', 2) && tim('48000102', '06', 2).dn===30e6 && tim('48000102', '06', 2).mon===1);
  ok('giữ mã + tên xã, thôn', (d => d && d.tenXa==='Phường Giả B' && d.tenThon==='Khu phố 1' && d.xa==='480002')(tim('48000201', '03', 1)));
  ok('đúng 4 nhóm', D.ds.length===4, D.ds.length);
  ok('kỳ chưa có Mẫu 31 → null', (await ctx.KHO.duNoAp('2026-09'))===null);
  // nối với lõi js/47: dư nợ 1 xã đổi sang triệu, khóa ấp = mã thôn
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', '47-phan-bo.js'), 'utf8'), ctx);
  const x = ctx.pbDuNoXa(D, '480001');
  ok('pbDuNoXa: chỉ xã đó, triệu đồng, khóa = mã thôn', x.length===3 && x.every(d => d.k.indexOf('480001')===0) && x.find(d => d.k==='48000101' && d.nguon===1).dn===150);
  R.forEach(r => console.log(r));
  console.log(R.filter(r => r[0]==='✓').length+'/'+R.length+' đạt');
})().catch(e => { console.log('lỗi', e); });
