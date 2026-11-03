// 3.460 (anh 03/11 "làm mẫu 06A theo chuẩn 10A; mọi chỗ đều có khai báo được") — 06A: chữ điền liền in thường, chấm giữ form, tên hoa đầu từ,
//   "Ông (bà): tên" ⇥ tab, Hội bỏ xã, đoàn kiểm tra / thực tế / sử dụng vốn / ý kiến là ô (✍ / ✏ / ⌨), số tiền gõ tay có dấu ngăn nhóm số, số trang không đổi. Dữ liệu GIẢ.
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
   let t=null, k=null; for(const ma of Object.keys(TO_K.to)){ const tt = KHO.to(ma); if(!tt || toLaTT(tt)) continue; const ds = hsoTVTo(tt).filter(x=>x.mon.filter(m=>(m.dn||0)>0).length>0); const k2 = ds.find(x=>x.mon.filter(m=>(m.dn||0)>0).length>1) || ds[0]; if(k2){ t=tt; k=k2; if(k2.mon.filter(m=>(m.dn||0)>0).length>1) break; } }
   ok('bộ giả có tổ + người vay còn dư nợ', !!t && !!k, t && t.ma);
   const mon = k.mon.filter(m=>(m.dn||0)>0), m = mon[mon.length-1];
   hso06aMo(t.ma, k.kh, m.ku); await w(600);
   const tx = () => hsoLap().h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
   const trang = async()=>{ hsoXem(); await w(2500); const n = document.getElementById('hso-xem-khung').contentDocument.querySelectorAll('.tr-tg').length; try{ dongHop(); }catch(e){} return n; };
   const n0 = await trang();
   ok('06A bản trắng / chấm: vẫn 2 trang như file gốc', n0===2, n0+' trang');
   const h = hsoLap().h;
   ok('chữ điền liền, in thường (không khung cố định)', [...new DOMParser().parseFromString(h, 'text/html').querySelectorAll('span.om')].filter(e=>!/om-cham/.test(e.className)).every(e=>/font-weight:normal/.test(e.getAttribute('style')||'') && !/inline-block/.test(e.getAttribute('style')||'')));
   ok('tên khách hoa đầu từ, "Ông (bà): tên" ⇥ "Mã khách hàng" (tab)', tx().indexOf('Ông (bà): '+tenHoaDau(k.ten))>=0 && /<p data-tab="\d+"[^>]*>(?:(?!<\/p>).)*Ông \(bà\): (?:(?!<\/p>).)*<span class="tab"[^>]*><\/span>Mã khách hàng: /.test(h));
   ok('chỗ chưa có chữ giữ form chấm (đoàn kiểm tra, thực tế, ý kiến)', /- Ông \(bà\) [.…]+ Chức vụ [.…]+/.test(tx()) && /Tổng số tiền thực nhận: ?[.…]+ ?đồng; chênh lệch:[.…]+đồng\./.test(tx()));
   ok('mọi chỗ chấm là ô khai báo (Khai báo riêng đủ dòng)', ['d1Ten','d1Cv','d2Ten','d2Cv','ttNhan','ttNhanCl','ttGoc','ttGocCl','ttLai','ttLaiCl','ttGui','ttGuiCl','dungTien','dungViec','hd','hdNgay','hdThem','saiTien','saiViec','hq','kn','ykCB','ykKH'].every(z=>OM_MAU['06a'].oK[z]));
   ok('đoàn kiểm tra ra Chọn nhanh', ['d1Ten','d1Cv','d2Ten','d2Cv'].every(z=>omNhanh('06a').indexOf(z)>=0));
   /* đoàn kiểm tra ⌨ tự gõ */
   omDatCach('06a', 'd1Ten', 'kb'); omDatKB('06a', 'd1Ten', 'nguyen van can bo gia'); omDatCach('06a', 'd1Cv', 'kb'); omDatKB('06a', 'd1Cv', 'Cán bộ tín dụng'); await w(200);
   ok('đoàn kiểm tra: "- Ông (bà): Tên (hoa đầu từ) ⇥ Chức vụ: …" (tab)', /<span class="tab"[^>]*><\/span>Chức vụ: <span[^>]*>Cán bộ tín dụng/.test(hsoLap().h) && /- Ông \(bà\): Nguyen Van Can Bo Gia/.test(tx()));
   /* thực tế ✏ gõ khi làm, số tiền tự thêm dấu */
   omDatCach('06a', 'ttNhan', 'go'); HSO.vay.ttNhan = '30000000'; omDatCach('06a', 'ttNhanCl', 'go'); HSO.vay.ttNhanCl = '0'; await w(200);
   ok('thực tế gõ 30000000 → "Tổng số tiền thực nhận: 30.000.000 đồng; chênh lệch: 0 đồng."', /Tổng số tiền thực nhận: 30\.000\.000 đồng; chênh lệch: 0 đồng\./.test(tx()));
   /* ý kiến ⌨ — chữ liền, dòng dư giữ chấm */
   omDatCach('06a', 'ykCB', 'kb'); omDatKB('06a', 'ykCB', 'Khách hàng sử dụng vốn đúng mục đích, có hiệu quả.'); await w(200);
   const yk = hsoLap().h.split('3. Ý kiến của cán bộ kiểm tra')[1].split('4. Ý kiến')[0];
   ok('ý kiến cán bộ: chữ liền, 3 dòng còn lại giữ chấm (đủ 4 dòng như form)', /Khách hàng sử dụng vốn đúng mục đích/.test(yk) && (yk.match(/data-o="ykCB"[^>]*>\.{20,}/g)||[]).length===3);
   ok('Hội bỏ xã / phường', !/thuộc tổ chức [^<]*(xã|phường) /.test(tx()));
   const n1 = await trang(); ok('có chữ vẫn 2 trang', n1===2, n1+' trang');
   ['d1Ten','d1Cv'].forEach(z=>{ omDatKB('06a', z, ''); omDatCach('06a', z, 'cham'); }); ['ttNhan','ttNhanCl'].forEach(z=>{ delete HSO.vay[z]; omDatCach('06a', z, 'cham'); }); omDatKB('06a', 'ykCB', ''); omDatCach('06a', 'ykCB', 'cham');
   return o; }, [files, doan]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t366 đạt'); await b.close(); process.exit(sai?1:0);
})();
