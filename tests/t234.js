// 3.315 (anh 22/10): 01/TGTV in bằng 2 cách — 📊 lấy từ Mẫu 31 (tổ viên, tích in hàng loạt, in lại cả người đã có TK 105) hoặc ✍ in nhanh tự khai,
//   khai ngay trên mẫu: bấm chỗ chấm / ô ☐ trên bản xem → hộp gõ đúng mục đó, Enter lưu + sang mục kế. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1500,height:950}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R1 = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = h => String(h||'').replace(/<\/(p|td|tr)>|<br>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ');
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   const btn=[...document.querySelectorAll('.nav-i, nav button, aside button, a')].find(x=>/Hồ sơ vay/.test(x.textContent)); if(btn) btn.click(); await w(500);
   const C = hsoCH(); C.xa=''; C.diem=''; C.hoi=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const t = TO_K.to[C.to], tv = hsoTVTo(t), chua = tv.filter(k=>!k.stk.length && !k.coTK), co = tv.filter(k=>k.stk.length || k.coTK);
   hsoChonMau('01tgtv'); await w(300); HSO.vay.tgNguon = 'to'; HSO.vay.tg = {}; hsoVe(); await w(300);
   ok('cột trái có 3 nguồn: Mẫu 31 · Sổ hộ vay · ✍ tự khai', document.querySelectorAll('input[name="hso-tg"]').length===3 && /tự khai ngay trên mẫu/.test(document.getElementById('hso-tuy').textContent));
   ok('📊 Mẫu 31: mặc định tích tổ viên chưa có TK 105, mỗi người 1 bản', HSO.x.ds.length===Math.max(1, chua.length), HSO.x.ds.length+' / '+chua.length);
   if(co.length){ HSO.vay.tg[co[0].kh] = true; hsoXem(); await w(200); ok('tích thêm người đã có TK 105 → in lại được', HSO.x.ds.length===chua.length+1 && /đã có TK 105/.test(document.getElementById('hso-tuy').textContent)); delete HSO.vay.tg[co[0].kh]; }
   else ok('tổ giả không có người đã có TK 105 (bỏ qua)', true);
   HSO.vay.tgNguon = 'tay'; hsoLuu().tgTay = {}; hsoVe(); await w(300);
   ok('✍ tự khai chưa gõ gì → mẫu trắng 1 bản', HSO.x.ds.length===1 && !/NGUYỄN VĂN GIẢ/.test(chu(HSO.x.h)));
   hsoLuu().tgTay = {ten:'Nguyễn Văn Giả', ns:'1980-05-02', cccd:'072080000001', ncap:'2021-04-10', sdt:'0900000000', email:'gia@example.com', ap:'Ấp Giả', xa:'Xã Giả', ngheNghiep:'Nông dân', danToc:''}; hsoVe(); await w(300);
   let h = chu(HSO.x.h);
   ok('chữ đã gõ in lên mẫu: họ tên in hoa, ngày sinh, ấp, xã', /NGUYỄN VĂN GIẢ/.test(h) && /02 ?\/ ?05 ?\/ ?1980/.test(h) && /Ấp Giả/.test(h) && /Xã Giả/.test(h), (h.match(/Nơi thường trú.{0,200}/)||[''])[0]);
   ok('ô mặc định ✍ chấm (điện thoại, email) vẫn in khi đã gõ', /0900000000/.test(h) && /gia@example\.com/.test(h));
   ok('gõ trống (Dân tộc) → giữ chấm, không tự ghi Kinh', !/Dân tộc\*: ?Kinh/.test(h));
   ok('nơi cấp tự theo ngày cấp khi chưa gõ; CCCD 12 ô', /Nơi cấp: ?Cục CS QLHC/.test(h) && /0 7 2 0 8 0 0 0 0 0 0 1/.test(h));
   ok('nghề nghiệp ☒ Nông dân', /☒ ?Nông dân/.test(h));
   ok('tên file theo người khai', /Nguyễn Văn Giả|NguyenVanGia/.test(HSO.x.ten || ''), HSO.x.ten);
   ok('xong lần dựng không để cờ tự khai (mẫu khác không bị ảnh hưởng)', OM_TAY===null);
   OM_KIEU = 'trang'; hsoVe(); await w(300); ok('📄 Bản trắng không in chữ tự khai + nhắc chọn Bản thật', !/NGUYỄN VĂN GIẢ/.test(chu(HSO.x.h)) && /chọn 🖨 Bản thật/.test(document.getElementById('hso-tuy').textContent)); OM_KIEU = 'that';
   tgTayChep(tv[0].kh); await w(300);
   ok('Lấy từ Mẫu 31 rồi sửa: chép tổ viên vào ô tự khai', hsoLuu().tgTay.ten===tv[0].ten && hsoLuu().tgTay.cif===tv[0].kh && new RegExp(tv[0].ten.toUpperCase()).test(chu(HSO.x.h)));
   hsoLuu().tgTay = {ten:'Nguyễn Văn Giả'}; hsoVe(); await w(1500);
   return o; }, files);
 R1.forEach(x=>o.push(x));
 /* bấm trên bản xem */
 const fl = p.frameLocator('#hso-xem-khung');
 await fl.locator('[data-o="sdt"]').first().click(); await p.waitForTimeout(400);
 let tit = await p.evaluate(()=>(document.getElementById('tg-hop')||{}).textContent || '');
 o.push((/Điện thoại liên hệ/.test(tit) ? '✓ ' : '✗ ')+'bấm chỗ chấm "Điện thoại" trên bản xem → hộp gõ đúng mục — '+tit);
 await p.keyboard.type('0911111111'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
 const r2 = await p.evaluate(()=>({sdt:hsoLuu().tgTay.sdt, tit:(document.getElementById('tg-hop')||{}).textContent || ''}));
 o.push((r2.sdt==='0911111111' && /Email/.test(r2.tit) ? '✓ ' : '✗ ')+'Enter lưu và mở mục kế (Email) — '+JSON.stringify(r2));
 await p.keyboard.press('Escape'); await p.waitForTimeout(600);
 await fl.locator('[data-o="gt"]').first().click(); await p.waitForTimeout(400);
 await p.evaluate(()=>{ const r=[...document.querySelectorAll('#hop-in input[type=radio]')].find(x=>x.value==='Nữ'); r.checked=true; tgTayLuu(1); }); await p.waitForTimeout(800);
 const r3 = await p.evaluate(()=>({gt:hsoLuu().tgTay.gt, co:/☒ ?Nữ/.test(HSO.x.h.replace(/<[^>]+>/g, ''))}));
 o.push((r3.gt==='Nữ' && r3.co ? '✓ ' : '✗ ')+'ô ☐ Giới tính: chọn Nữ → ☒ Nữ trên mẫu — '+JSON.stringify(r3));
 const r4 = await p.evaluate(()=>{ tgTayMoi(); return tgTayCo(); }); o.push((r4===0 ? '✓ ' : '✗ ')+'🧹 Khai người mới xóa hết');
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
