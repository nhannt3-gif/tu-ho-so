// 3.321 (anh 23/10, ảnh hộp Sửa bản quét CCCD): "chỗ tổ cho hiện danh sách tổ ra chọn luôn, CCCD này là của tổ trưởng nhưng app báo không có trong Mẫu 31".
//   ① tra Mẫu 31 không thấy → tra bảng tổ (tổ trưởng không vay): khớp CCCD / tên tổ trưởng → điền tên, CIF, địa bàn, tổ
//   ② không có ở đâu → lấy họ tên đọc trên thẻ (QR), không để số trong ô tên ③ ô Tổ bày sẵn các tổ thành nút bấm chọn. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1400,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); await w(500);
   /* tổ trưởng giả: gắn CCCD vào bảng tổ của 1 tổ (tổ trưởng không có trong danh bạ khách) */
   if(!KHO.coKy()) TO_K = await KHO.nap(kyChungLay());   /* tab Scan: trChay tự dựng kỳ chung — phép thử dựng trước để gắn CCCD giả */
   const ma = KHO.maTo().find(m=>{ const t = KHO.to(m); return t && !toLaTT(t) && t.ten; }), t = KHO.to(ma), B = KHO.bangTo(ma);
   const so = '072099000777'; B.cccd = so; B.kh = B.kh || '9999999999';
   ok('số CCCD tổ trưởng giả không có trong danh bạ khách Mẫu 31', !Object.values(KHO.dsKhach()).some(c=>String(c.cccd||'').replace(/\D/g, '')===so));
   const x = trTimTT(so); ok('tra bảng tổ theo CCCD → đúng tổ trưởng', !!x && x.ma===ma && x.t.ten===t.ten, x && x.ma);
   const tt = trTenTT(ma, t); const rt = trTimTT(sxChuan(tt)); ok('tên tổ trưởng lấy theo danh bạ tổ (chữ hoa đầu từ); tra theo tên: đúng tổ, trùng tên nhiều tổ thì không nhận bừa', /^Tổ Trưởng/.test(tt) && (rt===null || rt.ma===ma), tt+' · '+(rt && rt.ma));
   ok('CCCD lạ → không nhận bừa', trTimTT('072099111222')===null);
   /* hộp Sửa bản quét giả lập */
   window.__k = {che:'the', tag:[], xa:'', diem:'', ap:'', to:''};
   moHop('<div id="k-diaban">'+veDiaBan(window.__k)+'</div><input id="k-ten"><div id="tr-kq-k-ten"></div>');
   const e = document.getElementById('k-ten'); e.value = so; TR = null; trChay('k-ten'); await w(100);
   const k = window.__k, kq = document.getElementById('tr-kq-k-ten').textContent;
   ok('ô tên: số CCCD tổ trưởng → tên tổ trưởng + CIF + tổ, báo "Tổ trưởng"', e.value===tt && k.ten===tt && k.maKH===B.kh && new RegExp('^'+ma+' — ').test(k.to) && /Tổ trưởng/.test(kq), JSON.stringify({v:e.value, to:k.to, kq:kq.slice(0, 120)}));
   /* không có ở đâu → tên đọc trên thẻ (QR) */
   e.value = '072099333444'; e.__the = {so:'072099333444', ten:'Nguyễn Văn Thẻ Giả'}; trChay('k-ten'); await w(100);
   ok('CCCD không có ở đâu → lấy họ tên trên thẻ (QR), không để số trong ô tên', e.value==='Nguyễn Văn Thẻ Giả' && /họ tên trên thẻ/.test(document.getElementById('tr-kq-k-ten').textContent));
   dongHop();
   /* ô Tổ: nút chọn nhanh */
   const DB = D.cauHinh.diaBan = D.cauHinh.diaBan || [];
   DB.push({xa:'Xã Giả DB', diem:[{ten:'Điểm Giả', ap:[{ten:'Ấp Giả DB', to:[{ma:'91', ten:'Tổ trưởng A'}, {ma:'92', ten:'Tổ trưởng B'}]}]}]});
   window.__k = {che:'the', xa:'Xã Giả DB', diem:'Điểm Giả', ap:'Ấp Giả DB', to:''};
   moHop('<div id="k-diaban">'+veDiaBan(window.__k)+'</div>');
   const nut = [...document.querySelectorAll('#k-diaban .db-to')];
   ok('ô Tổ: bày sẵn các tổ của ấp thành nút', nut.length===2 && /91 — Tổ trưởng A/.test(nut[0].textContent));
   nut[1].click(); await w(50);
   ok('bấm nút tổ → chọn luôn (ô Tổ + nút sáng)', window.__k.to==='92 — Tổ trưởng B' && document.getElementById('k-to').value==='92 — Tổ trưởng B' && document.querySelector('#k-diaban .db-to.bat').textContent==='92 — Tổ trưởng B');
   DB.pop(); dongHop(); return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
