// 3.461 (anh 03/11 "mẫu tạo chính ở bộ mẫu, các nơi khác cần sẽ gọi, ví dụ tạo phiếu ktra 3 tháng KHĐ của tổ nào đó") — 06A lập nhiều phiếu 1 lần:
//   hso06aLo / hso06aXuat / hso06aHop (tích món → In / Word), nút KTGS "06A món 3 tháng KHĐ". Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const doan = JSON.parse(fs.readFileSync(path.join(__dirname,'mau_goc','so_do.json'),'utf8'))['06a'].doan;
 const R = await p.evaluate(async([files, doan])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const thang = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort();
   kyChungDoi(thang[thang.length-1]); slDoiTab('hsv'); doiNgan(7); await w(1500);
   /* tổ có ≥ 2 món còn dư nợ */
   let t = null, ds = [];
   for(const ma of Object.keys(TO_K.to)){ const tt = KHO.to(ma); if(!tt || toLaTT(tt)) continue; const d = []; hsoTVTo(tt).forEach(k=>k.mon.filter(m=>(m.dn||0)>0).forEach(m=>d.push({maTo:tt.ma, kh:k.kh, ku:m.ku, ten:k.ten}))); if(d.length>=2){ t = tt; ds = d.slice(0, 3); break; } }
   ok('bộ giả có tổ ≥ 2 món còn dư nợ', !!t && ds.length>=2, ds.length+' món');
   HSO.vay.kh = 'GIU'; HSO.vay.ku = 'GIU';
   const x = hso06aLo(ds);
   ok('lập n phiếu 1 lần, mỗi món 1 phiếu đúng khách + số khế ước', x.ds.length===ds.length && x.ds.every((p, i)=>p.h.indexOf(ds[i].ku)>=0 && p.h.replace(/<[^>]+>/g, '').indexOf(tenHoaDau(ds[i].ten))>=0), x.ds.length+' phiếu');
   ok('không đổi người vay / món đang chọn ở Hồ sơ vay', HSO.vay.kh==='GIU' && HSO.vay.ku==='GIU');
   ok('1 file in: mỗi phiếu 1 khối riêng (sang trang mới)', (x.trang.match(/class="kt-to"/g)||[]).length===ds.length);
   { let bl = null; try { bl = await hsoDocx({ds:x.ds}); } catch(e){ bl = e.message; } ok('Word nhiều phiếu: mỗi phiếu 1 mục (section)', bl && bl.size>3000, bl && (bl.size || bl)); }
   /* hộp chọn món */
   delete HSO.vay.kh; delete HSO.vay.ku;
   let ra = null; const gf = window.giaoFile; window.giaoFile = (b, ten) => { ra = ten; };
   hso06aHop(ds, 'thử'); await w(300);
   ok('hộp 06A: liệt kê đủ món, tích sẵn hết', document.querySelectorAll('#h06a-ds input[data-lenh="h06a.tich"]:checked').length===ds.length);
   const cb = document.querySelector('#h06a-ds input[data-lenh="h06a.tich"][data-i="0"]'); cb.checked = false; cb.dispatchEvent(new Event('change', {bubbles:true})); await w(200);
   ok('bỏ tích 1 món → nút "Word '+(ds.length-1)+' phiếu"', new RegExp('Word '+(ds.length-1)+' phiếu').test(document.getElementById('h06a-ds').textContent));
   document.querySelector('#h06a-ds [data-lenh="h06a.xuat"][data-c="word"]').click(); for(let i=0;i<30 && !ra;i++) await w(200);
   ok('bấm Word → tải 1 file .docx ('+(ds.length-1)+' phiếu)', ra && new RegExp('06A_'+(ds.length-1)+' phieu\\.docx$').test(ra), ra);
   window.giaoFile = gf;
   /* nút KTGS: tổ có món KHĐ → nút "06A món 3 tháng KHĐ (n)" */
   const hoGoc = window.ktHo; window.ktHo = () => [{kh:ds[0].kh, ten:ds[0].ten, khd:[{ku:ds[0].ku}], mon:[]}];
   const chGoc = window.KT_CHON; window.KT_CHON = {ds:[], chon:{}, so:6}; let hk = ''; try { hk = ktChonHTML(t); } catch(e){ hk = 'LỖI '+e.message; }
   ok('KTGS chọn hộ: tổ có món KHĐ → nút "📄 06A món 3 tháng KHĐ (1)"', /data-lenh="ktk\.m06aKhd"/.test(hk) && /06A món 3 tháng KHĐ \(1\)/.test(hk), hk.slice(0, 80));
   window.ktHo = hoGoc; window.KT_CHON = chGoc;
   return o; }, [files, doan]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t367 đạt'); await b.close(); process.exit(sai?1:0);
})();
