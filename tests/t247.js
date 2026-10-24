// 3.337 (anh 24/10) — Tra cứu KH: thẻ khách gọn trong 1 khung (3 cột Nhân thân │ Liên hệ · TK 105 │ Tổ, món vay chiếm phần còn lại),
//   cột Đến hạn tô màu (quá hạn đỏ · ≤ 30 ngày cam · ≤ 90 ngày vàng; GH = hạn gia hạn), danh sách: tình trạng chữ nhỏ ngay sau tên. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], R=[];
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 for(const [W,H] of [[1366,768],[1920,1080]]){
  const p=await b.newPage({viewport:{width:W,height:H}}); p.on('pageerror',e=>loi.push(e.message));
  await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
  await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
  const o = await p.evaluate(async(a)=>{ const [files, W, dau] = a; await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+W+' px: '+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); SL_TRA_Q = ''; D.cauHinh.tcTim = {theo:''}; slDoiTab('tra'); doiNgan(7);
   for(let i=0;i<60 && !(document.querySelector('#sl-kq .sl-kq-dong') && TC_K);i++) await w(200); await w(500);
   if(dau){   /* màu ngày đến hạn — đặt "hôm nay" cố định */
     const nay0 = window.nay; window.nay = ()=>new Date(2029, 2, 1);
     const h = (m, x) => { const d = document.createElement('div'); d.innerHTML = tcHanMon(m, x); return d; };
     const q = h({dhg:'2029-02-20'}), c = h({dhg:'2029-03-20'}), v = h({dhg:'2029-05-01'}), t = h({dhg:'2030-01-01'}), g = h({dhg:'2028-12-31', dhgh:'2029-03-10'}), x = h({dhg:'2029-02-20'}, true);
     ok('quá hạn → đỏ, ghi "quá n ngày"', !!q.querySelector('.tc-han-do') && /quá 9 ngày/.test(q.textContent));
     ok('còn ≤ 30 ngày → cam', !!c.querySelector('.tc-han-cam') && /còn 19 ngày/.test(c.textContent));
     ok('còn ≤ 90 ngày → vàng', !!v.querySelector('.tc-han-vang') && /còn 61 ngày/.test(v.textContent));
     ok('còn > 90 ngày → không tô', !t.querySelector('.tc-han-do,.tc-han-cam,.tc-han-vang') && /01\/01\/2030/.test(t.textContent));
     ok('có gia hạn → lấy hạn gia hạn, ghi GH', /10\/03\/2029/.test(g.textContent) && /GH/.test(g.textContent) && !!g.querySelector('.tc-han-cam'));
     ok('món đã tất toán → không tô, không đếm ngày', !x.querySelector('.tc-han-do') && !/ngày/.test(x.textContent));
     window.nay = nay0; }
   /* bố cục */
   const m = Object.keys(SL_DB.kh).find(k=>SL_DB.kh[k].mon>=4) || Object.keys(SL_DB.kh)[0];
   slTheKH(m); await w(1200);
   const k = document.querySelector('#tc-ct .tc-khung'), mon = k.querySelector('.tc-mon'), cuon = k.querySelector('.tc-mon-cuon');
   ok('3 cột: Nhân thân │ Liên hệ · TK 105 │ Tổ & địa bàn', k.querySelectorAll('.tc-3cot > .tc-nhom').length===3 && /Liên hệ · TK 105/.test(k.querySelector('.tc-3cot').textContent) && !!k.querySelector('.tc-3cot .tc-to-khoi'));
   ok('thẻ khách gọn trong 1 khung (không cuộn ngoài)', k.scrollHeight <= k.clientHeight+2, k.scrollHeight+' / '+k.clientHeight);
   ok('bảng món vay đủ cột, không bị cắt ngang', !!mon && mon.scrollWidth <= cuon.clientWidth+2, mon.scrollWidth+' / '+cuon.clientWidth);
   ok('cột Đến hạn riêng, mỗi món có ngày', [...mon.querySelectorAll('th')].some(x=>x.textContent==='Đến hạn') && mon.querySelectorAll('tbody:not([hidden]) .tc-han').length>=SL_DB.kh[m].mon);
   const r0 = document.querySelector('#sl-kq tr.sl-kq-dong'), tt = r0 && r0.querySelector('.tc-tt-nho');
   ok('danh sách: tình trạng chữ nhỏ cùng dòng với tên (dòng không cao gấp đôi)', !!tt && r0.getBoundingClientRect().height < 34 && Math.abs(tt.getBoundingClientRect().top - r0.querySelector('b').getBoundingClientRect().top) < 8, r0 && Math.round(r0.getBoundingClientRect().height)+' px');
   const cot = document.querySelector('#tr7 .tc-2cot.tc-bang'), tr = cot.querySelector('.tc-trai').getBoundingClientRect().width, ph = cot.querySelector('.tc-phai').getBoundingClientRect().width;
   ok('khung chi tiết rộng hơn danh sách (45 / 55)', ph > tr, Math.round(tr)+' / '+Math.round(ph));
   return o; }, [files, W, W===1366]);
  R.push(...o); await p.screenshot({path:path.join(__dirname,'t247_'+W+'.png')}); await p.close();
 }
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t247 đạt'); await b.close(); process.exit(sai?1:0);
})();
