// 3.311 (anh 21/10): công cụ 🎓 Hạn trả HSSV trên màn thấp (17 inch ~1366×650, laptop 125% ~1536×730) — lịch tháng thu còn 1 hàng nút,
// công cụ hiện trọn trong khung (không cuộn), tiêu đề 1 dòng không tràn; đóng công cụ → lịch hiện lại; màn cao không đổi. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 for(const [W,H,ten] of [[1366,650,'17 inch'],[1536,730,'laptop 125%'],[1920,1000,'màn cao']]){
  const p=await b.newPage({viewport:{width:W,height:H}}); p.on('pageerror',e=>loi.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
  const r = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); doiNgan(0); await w(300); ccMo('hssv'); await w(200);
    CC.hs.vay='05/09/2022'; CC.hs.vayTay=1; CC.hs.rt='30/06/2026'; CC.hs.gdx='15'; CC.hs.tien='40'; CC.hs.tienTay=1; veCC(); await w(300);
    const o = document.getElementById('cc-o'), d = o.querySelector('.cc-dau'), lu = document.querySelector('.lc-luoi'), cau = o.querySelector('.hs-cau').getBoundingClientRect();
    const kq = {gon:document.querySelector('.blv-lich').classList.contains('cc-gon'), luoi:!!(lu && lu.offsetParent), cuon:o.scrollHeight - o.clientHeight, dau:d.scrollWidth - d.clientWidth, cauDuoi:Math.round(cau.bottom), day:window.innerHeight};
    ccDong(); await w(200); kq.sauDong = {gon:document.querySelector('.blv-lich').classList.contains('cc-gon'), luoi:!!(document.querySelector('.lc-luoi')||{}).offsetParent};
    return kq; });
  if(H<960){
   ok(ten+': mở Hạn trả HSSV → lịch tháng thu gọn, công cụ hiện trọn (không cuộn, câu chốt trong màn), tiêu đề 1 dòng không tràn', r.gon && !r.luoi && r.cuon<=2 && r.dau<=1 && r.cauDuoi<=r.day, JSON.stringify(r));
   ok(ten+': đóng công cụ → lịch tháng hiện lại', !r.sauDong.gon && r.sauDong.luoi, JSON.stringify(r.sauDong));
  } else ok(ten+': màn cao → lịch giữ nguyên khi mở công cụ', !r.gon && r.luoi, JSON.stringify(r));
  await p.close(); }
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
