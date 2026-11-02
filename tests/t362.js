// 3.453 (anh 02/11 "10C cũng tương tự 10A; chọn hộ từ danh sách để kết nạp và cho ra khi chia tách số lượng lớn") — 10C: quy chuẩn 10A, Về việc chọn nhiều (4 nội dung + thêm),
//   bảng hộ vay Cho ra / Kết nạp (loại trừ nhau), kết nạp từ tổ khác CÙNG ẤP, nhớ hộ chuyển → 10C tổ nguồn tích sẵn Cho ra, ＋ / − số dòng bảng I / II và bảng 2, in theo Mã KH. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   /* chọn 1 tổ có tổ khác cùng ấp */
   const dsTo = KHO.dsTo().filter(t=>!toLaTT(t) && t.thon), t = dsTo.find(t=>dsTo.some(z=>z.ma!==t.ma && z.xa===t.xa && String(z.thon)===String(t.thon))), C = hsoCH();
   ok('bộ giả có 2 tổ cùng ấp', !!t);
   C.xa = t.xa; C.diem = t.khoaDiem; C.to = t.ma; hsoChonMau('10c'); await w(800);
   let h = HSO.x.h, tx = h.replace(/<[^>]+>/g, '');
   ok('quy chuẩn: thân 14, BIÊN BẢN HỌP 15 + kẻ', /om-goc" style="font-size:14pt/.test(h) && /class="s15"[^>]*><b>BIÊN BẢN HỌP/.test(h) && /<p class="ke" data-ke=/.test(h));
   ok('Chủ trì / Thư ký: "Ông (bà): tên" ⇥ "Chức vụ: Tổ trưởng / Tổ phó"', /<span class="tab"[^>]*><\/span>Chức vụ: Tổ trưởng\./.test(h) && /<span class="tab"[^>]*><\/span>Chức vụ: Tổ phó\./.test(h));
   ok('Nhập liệu riêng: Điền hết / Tùy chọn (không có NH / UBND)', (()=>{ OM_KIEU = 'mau'; const k = omKieuHTML('10c'); OM_KIEU = 'that'; return /Điền hết/.test(k) && !/Chừa phê duyệt/.test(k); })());
   ok('nút ⚙ Khai báo riêng 10C', !!document.querySelector('[data-lenh="omkb.ds"][data-mk="10c"]'));
   ok('Về việc chọn nhiều: 4 nội dung', OM_MAU['10c'].oK.vv.nhieu && OM_MAU['10c'].oK.vv.chon.length===4);
   const bg = document.querySelector('#hso-tuy table.hso-tv10a');
   ok('bảng hộ vay có 2 cột Cho ra · Kết nạp + nút Kết nạp từ tổ khác (cùng ấp) + ＋ / − số dòng', !!bg && /Cho ra/.test(bg.querySelector('thead').textContent) && /Kết nạp/.test(bg.querySelector('thead').textContent) && !!document.querySelector('[data-lenh="h10c.nguon"]') && document.querySelectorAll('[data-lenh="h10c.dong"]').length===4);
   /* tích Cho ra 1 hộ → Kết nạp cùng hộ bỏ tích (loại trừ) */
   const ds = HST.ds(t), x0 = ds.find(x=>x.vay), k0 = x0.kh;
   const cbRa = bg.querySelector('input[data-c="ra"][data-k="'+k0+'"]'); cbRa.checked = true; cbRa.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   HSO.kn[k0] = true; HSO.ra[k0] = false; hsoVe(); await w(300);
   const bg2 = document.querySelector('#hso-tuy table.hso-tv10a'), cbRa2 = bg2.querySelector('input[data-c="ra"][data-k="'+k0+'"]'); cbRa2.checked = true; cbRa2.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   ok('Cho ra ↔ Kết nạp loại trừ nhau', HSO.ra[k0]===true && HSO.kn[k0]===false);
   h = HSO.x.h; tx = h.replace(/<[^>]+>/g, '');
   ok('Cho ra → tên (hoa đầu từ) vào bảng II + Về việc tự có "cho tổ viên ra khỏi Tổ"', tx.indexOf(tenHoaDau(x0.ten))>=0 && /data-o="vv">Về việc cho tổ viên ra khỏi Tổ/.test(h));
   /* kết nạp từ tổ khác cùng ấp */
   document.querySelector('[data-lenh="h10c.nguon"]').click(); await w(400);
   const nn = [...document.querySelectorAll('[data-lenh="h10c.chonNguon"]')]; ok('hộp chọn tổ nguồn chỉ có tổ cùng ấp', nn.length>0 && nn.every(b=>{ const z = KHO.to(b.getAttribute('data-to')); return z.xa===t.xa && String(z.thon)===String(t.thon) && z.ma!==t.ma; }));
   nn[0].click(); await w(300); const z = KHO.to(nn[0].getAttribute('data-to')), dsZ = HST.ds(z).filter(x=>x.kh);
   document.querySelector('[data-lenh="h10c.hetN"][data-v="1"]').click(); await w(300); document.getElementById('h10c-lay').click(); await w(600);
   ok('Kết nạp n hộ từ tổ nguồn → vào cột Kết nạp tổ đích', dsZ.every(x=>HSO.kn[x.kh]===true), dsZ.length+' hộ');
   h = HSO.x.h; tx = h.replace(/<[^>]+>/g, '');
   ok('Bảng I in hộ kết nạp, theo Mã KH; Về việc có "kết nạp tổ viên"', tx.indexOf(tenHoaDau(dsZ[0].ten))>=0 && /Về việc kết nạp tổ viên/.test(tx));
   ok('nhớ hộ chuyển sang tổ đích', Object.keys((hsoLuu().chuyen10c||{})[z.ma]||{}).length===dsZ.length);
   /* ＋ / − số dòng */
   const nTr = () => (HSO.x.h.match(/Tổ viên được kết nạp[\s\S]*?<\/table>/)[0].match(/<tr/g)||[]).length;
   const n0 = nTr(); hsoLuu().d10c1 = 30; hsoVe(); await w(300); const n30 = nTr();
   ok('＋ số dòng bảng I / II (không ít hơn số hộ)', n30>=31 && n30>=n0, n0+' → '+n30); hsoLuu().d10c1 = 1; hsoVe(); await w(300);
   ok('− số dòng: không ít hơn số hộ đã tích', nTr()-1 >= Math.max(dsZ.length, 1), nTr()+' dòng · '+dsZ.length+' hộ');
   delete hsoLuu().d10c1;
   /* bảng có thead (lặp tiêu đề khi sang trang) */
   ok('bảng I / II và bảng 2 có dòng tiêu đề (thead) để lặp khi sang trang', (HSO.x.h.match(/<thead>/g)||[]).length>=2);
   /* đổi sang tổ nguồn → Cho ra tích sẵn */
   C.to = z.ma; hsoVe(); await w(800);
   ok('lập 10C cho tổ nguồn → các hộ đã chuyển tích sẵn Cho ra', dsZ.every(x=>HSO.ra[x.kh]===true));
   delete hsoLuu().chuyen10c;
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t362 đạt'); await b.close(); process.exit(sai?1:0);
})();
