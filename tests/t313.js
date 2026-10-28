// 3.391 (BAN_GIAO_TK3_2710 mục 3.2 phần còn — anh 27/10 "khi hiện báo cáo nên tối ưu để hiện trong 1 khung, in trong 1 trang"; anh 28/10 đồng ý: co không vừa thì sang trang 2, chữ ≥ 8 pt):
// báo cáo tổng hợp / biểu (SK_BC motTrang: Kết quả GD tại điểm, THHD; Tổ TK&VV "Nợ") gắn data-tr-1trang → bộ in chung (trDan) co lề / chữ cho vừa 1 trang;
// khổ dọc co ở khổ dọc (không nhảy sang ngang); bảng quá dài vẫn sang trang 2 ở 8 pt; báo cáo danh sách không đổi. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
   kyChungDoi('2026-08'); doiNgan(7); slDoiTab('sk'); }, files);
 await p.waitForTimeout(1500);
 // bảng giả n dòng → vẽ qua skHTMLIn + xemChuan vào khung thật, đếm trang + cỡ chữ
 const do_ = (n, ngang, mt)=>p.evaluate(async([n, ngang, mt])=>{ let h='<table class="bc-bang luoi"><thead><tr><th>STT</th><th>Tên tổ</th><th>Số hộ</th><th>Dư nợ</th><th>Quá hạn</th></tr></thead><tbody>';
   for(let i=1;i<=n;i++) h+='<tr><td class="c">'+i+'</td><td>Tổ giả '+i+'</td><td class="s">'+(200+i)+'</td><td class="s">'+(17000+i)+'.000</td><td class="s">0</td></tr>';
   h+='</tbody></table>'; const f=document.createElement('iframe'); f.style.cssText='width:1000px;height:800px'; document.body.appendChild(f);
   xemChuan(f, skHTMLIn([{tieuDe:'BIỂU GIẢ', ngay:'Số liệu T8/2026', pv:'Toàn PGD', html:h, aoa:[], ngang:ngang, motTrang:mt}]));
   await new Promise(r=>setTimeout(r, 1500)); const d=f.contentDocument, u=d.querySelector('.tr-nd > .trang');
   const r={trang:d.querySelectorAll('.tr-tg').length, ngang:d.querySelectorAll('.tr-tg.ngang').length, pt:u ? Math.round(parseFloat(getComputedStyle(u).fontSize)*72/96*10)/10 : 0}; f.remove(); return r; }, [n, ngang, mt]);
 let a = await do_(34, true, 0), c = await do_(34, true, 1);
 ok('biểu ngang 34 dòng (~ 1 điểm GD thật): không cờ → tràn 2 trang; có cờ motTrang → co còn 1 trang, chữ ≥ 8 pt', a.trang>=2 && c.trang===1 && c.ngang===1 && c.pt>=8, JSON.stringify({a, c}));
 a = await do_(55, false, 0); c = await do_(55, false, 1);
 ok('biểu dọc 55 dòng: có cờ → 1 trang KHỔ DỌC (không nhảy sang ngang), chữ ≥ 8 pt', a.trang>=2 && c.trang===1 && c.ngang===0 && c.pt>=8, JSON.stringify({a, c}));
 c = await do_(200, true, 1);
 ok('quá dài (200 dòng) → vẫn sang trang 2, chữ dừng ở 8 pt (anh 28/10)', c.trang>=2 && c.pt===8, JSON.stringify(c));
 a = await do_(20, false, 1);
 ok('bảng ngắn có cờ → giữ cỡ chữ thường (không co thừa)', a.trang===1 && a.pt>8.5, JSON.stringify(a));
 const kh = await p.evaluate(()=>SK_BC.filter(x=>x.motTrang).map(x=>x.k).sort().join(','));
 ok('SK_BC khai motTrang: kqgd, thhd', kh==='kqgd,thhd', kh);
 for(const [k, co] of [['kqgd', 1], ['thhd', 1], ['qh', 0]]){ await p.evaluate(k=>skChonBC(k), k); await p.waitForTimeout(2500);
   const r = await p.evaluate(()=>{ const d=document.getElementById('sk-xem-khung').contentDocument; return {co:d.querySelectorAll('.tr-nd > .trang[data-tr-1trang]').length, n:d.querySelectorAll('.tr-nd > .trang').length}; });
   ok('Sao kê '+k+(co ? ': mọi trang mang cờ vừa 1 trang' : ': danh sách không gắn cờ'), co ? r.co>0 && r.co===r.n : r.co===0 && r.n>0, JSON.stringify(r)); }
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t313 đạt'); await b.close(); process.exit(sai?1:0);
})();
