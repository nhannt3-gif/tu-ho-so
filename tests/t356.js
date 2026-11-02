// 3.440 (anh 02/11 "anh muốn truy vấn được CCCD tổ trưởng từ đây, dùng cây lọc địa bàn"): Tra cứu › Tìm theo Tổ trưởng — cột CCCD (Đã lưu / Thiếu), cộng theo lọc, lọc cột.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); SL_TRA_Q = ''; slDoiTab('tra'); doiNgan(7);
   for(let i=0;i<60 && !(document.querySelector('#sl-kq .sl-kq-dong') && TC_K);i++) await w(200); await w(500);
   const T = Object.values(TC_K.to).filter(t=>!toLaTT(t)), t1 = T[0]; if(!((t1.ds||{}).ttKH || (t1.tt||{}).ttKH || t1.cif)) t1.cif = '9999990001';   /* bộ giả không có CIF tổ trưởng → gán CIF giả */
   const cif = String((t1.ds||{}).ttKH || (t1.tt||{}).ttKH || t1.cif || '');
   D.scan = (D.scan||[]).concat([{id:'s-gia', maKH:cif, ten:'Giả', ngay:'2026-10-20', vaiTro:'tt'}]);
   const chip = k => document.querySelector('.tc-theo .gd-chip[data-k="'+k+'"]');
   chip('tt').click(); const i = document.getElementById('sl-tim'); i.value = ''; i.dispatchEvent(new Event('input', {bubbles:true})); await w(400);
   const th = [...document.querySelectorAll('#sl-kq thead tr:first-child th')].map(x=>x.textContent);
   ok('bảng Tổ trưởng có cột CCCD', th[th.length-1]==='CCCD', th.join('|'));
   const d1 = document.querySelector('#sl-kq .sl-kq-dong[data-to="'+t1.ma+'"]'), oc = d1 && d1.lastElementChild;
   ok('tổ trưởng đã lưu CCCD → "Đã lưu" (rê chuột thấy ngày lưu)', !!oc && /Đã lưu/.test(oc.textContent) && /20\/10\/2026/.test(oc.title), oc && (oc.textContent+' · '+oc.title));
   const thieu = [...document.querySelectorAll('#sl-kq .sl-kq-dong')].filter(r=>/Thiếu/.test(r.lastElementChild.textContent)).length;
   ok('các tổ khác → "Thiếu"; dòng cộng ghi đã lưu / tổng theo lọc', thieu===T.length-1 && /^1\/\d+$/.test(document.querySelector('#sl-kq tfoot tr').lastElementChild.textContent), thieu+' · '+document.querySelector('#sl-kq tfoot tr').lastElementChild.textContent);
   ok('cột CCCD có bộ lọc cột (chọn Đã lưu / Thiếu)', !!document.querySelector('#sl-kq thead tr:nth-child(2) th:last-child select, #sl-kq thead tr:nth-child(2) td:last-child select'));
   D.scan = D.scan.filter(k=>k.id!=='s-gia'); return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t356 đạt'); await b.close(); process.exit(sai?1:0);
})();
