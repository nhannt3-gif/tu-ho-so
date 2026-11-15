// 3.519 (anh 12/11 "tab văn bản bị che, em ghi nhận sửa 1 lần"): hộp khai văn bản — 4 nút đổi chữ (aa · Aa. · AA · Aa Aa) cùng hàng nhãn "Tên văn bản",
//   KHÔNG đè ô nhập (trước: đặt nổi top/right che chữ). Kiểm 3 bề rộng (máy tính, laptop nhỏ, điện thoại) + chế độ tối; nút vẫn đổi chữ đúng.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path = require('path');
(async()=>{ const b = await chromium.launch(); const o = [], loi = [];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 for(const [w, h, toi] of [[1366, 768, false], [1100, 800, true], [420, 860, false]]){
   const p = await b.newPage({viewport:{width:w, height:h}, colorScheme:toi ? 'dark' : 'light'}); p.on('pageerror', e => loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
   const r = await p.evaluate(async () => { await xongTV; try { dongHop(); } catch(e){}
     const m = {id:'vbgia1', ten:'gia.pdf', tenMoi:'gia.pdf', nhom:'vanBan', loai:'Quyết định', soKH:'29/2025/QĐ-TTG', ngay:'2025-08-28', tenVB:'Quyết định Giả về tín dụng đối với học sinh, sinh viên, học viên thạc sĩ, nghiên cứu sinh học các ngành', luc:new Date().toISOString(), kieu:'application/pdf', co:1};
     (D.vanBan = D.vanBan || []).push(m); suaCho('vbgia1'); await new Promise(r => setTimeout(r, 600));
     const i = document.getElementById('s-ty'), c = document.querySelector('#hop .chu-doi'); if(!i || !c) return null;
     const a = i.getBoundingClientRect(), z = c.getBoundingClientRect(), chong = !(z.bottom<=a.top+0.5 || z.top>=a.bottom-0.5 || z.right<=a.left || z.left>=a.right);
     i.value = 'quyết định GIẢ về NHCSXH'; c.querySelector('[data-k="tu"]').click(); await new Promise(r => setTimeout(r, 100));
     return {chong:chong, nutCao:Math.round(c.querySelector('button').getBoundingClientRect().height), doi:i.value}; });
   ok(w+'px'+(toi ? ' (tối)' : '')+': 4 nút đổi chữ không đè ô Tên văn bản', !!r && !r.chong, JSON.stringify(r));
   ok(w+'px: nút gọn (≤ 26px)', !!r && r.nutCao<=26, r && r.nutCao);
   ok(w+'px: bấm Aa Aa vẫn đổi chữ (giữ từ viết tắt)', !!r && r.doi==='Quyết Định Giả Về NHCSXH', r && r.doi);
   await p.close(); }
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 o.forEach(x => console.log(x)); console.log((o.length-o.filter(x => x[0]==='✗').length)+'/'+o.length+' đạt'); await b.close(); })();
