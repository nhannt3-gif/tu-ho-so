// 3.256 (anh chốt 17/10 ý 10.3, "code tiếp" 18/10): GIẤY ỦY QUYỀN 01/UQ chọn hộ từ 📒 Sổ hộ vay — form theo thứ tự giấy: hộ → I. ngày lập, số người, thành viên ≥ 18 tuổi
//   → II. người được ủy quyền (= người đứng tên vay trong sổ) → trưởng thôn; người dưới 18 tuổi không vào giấy; thiếu ngày sinh / CCCD → ⚠. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:'')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   hmMo(); await w(100); hmDat(0, 'ten', 'Lê Văn Chủ Giả'); hmDat(0, 'ns', '01011975'); hmDat(0, 'cccd', '072075000111'); hmDat(0, 'ncap', '01012022');
   HM.tv.push(hmNguoi()); hmVe(); hmDat(1, 'ten', 'Trần Thị Vợ Giả'); hmDat(1, 'qh', 'Vợ'); hmDat(1, 'ns', '02021978'); hmDat(1, 'cccd', '072178000222');
   HM.tv.push(hmNguoi()); hmVe(); hmDat(2, 'ten', 'Lê Văn Con Lớn'); hmDat(2, 'qh', 'Con'); hmDat(2, 'ns', '03032003');
   HM.tv.push(hmNguoi()); hmVe(); hmDat(3, 'ten', 'Lê Thị Con Nhỏ'); hmDat(3, 'qh', 'Con'); hmDat(3, 'ns', '04042015'); hmLuu(); await w(300); try{ dongHop(); }catch(e){} HM = null;
   const ho = hmDs().find(x=>x.tv[0].ten==='Lê Văn Chủ Giả'); hmLamHS(ho.id, '01uq'); await w(600);
   const tuy = ()=>document.getElementById('hso-tuy').textContent;
   ok('form 01/UQ theo thứ tự giấy: Hộ (sổ) → I. Hộ gia đình (ngày lập, số người, thành viên) → II. Người được ủy quyền → Trưởng thôn', /Hộ \(📒 Sổ hộ vay\)[^]*I\. Hộ gia đình[^]*Ngày lập giấy[^]*Hộ gồm[^]*II\. Người được ủy quyền[^]*Trưởng thôn chứng kiến/.test(tuy()));
   ok('01/UQ không còn chương trình / phương án vay (của 01/TD)', !/Chương trình vay/.test(tuy()) && !/Phương án/.test(tuy()));
   ok('thành viên: con dưới 18 tuổi ghi "không vào giấy"; con thiếu CCCD → ⚠ thiếu', /Lê Thị Con Nhỏ[^•⭐]*dưới 18 tuổi/.test(tuy()) && /Lê Văn Con Lớn[^•⭐]*thiếu CCCD/.test(tuy()) && /Giấy UQ cần đủ thành viên[^]*Lê Văn Con Lớn/.test(tuy()));
   let h = hsoLap().ds ? hsoLap().ds[0].h : hsoLap().h, t = h.replace(/<[^>]+>/g, ' ');
   ok('bản in: thành viên ≥ 18 tuổi có, người dưới 18 tuổi không', /Trần Thị Vợ Giả/.test(t) && /Lê Văn Con Lớn/.test(t) && !/Lê Thị Con Nhỏ/.test(t));
   ok('II. mặc định cử người đứng tên vay (Lê Văn Chủ Giả)', /cử ông \(bà\)\s*:?\s*Lê Văn Chủ Giả/i.test(t.replace(/\s+/g, ' ')) || hsoBo().nv.ten==='Lê Văn Chủ Giả');
   hmDatDung(ho.id, 1); await w(500); h = hsoLap().h; t = h.replace(/<[^>]+>/g, ' ');
   ok('chọn người được ủy quyền = Vợ → người đứng tên vay đổi (01/TD dùng chung), Chủ hộ sang bên ủy quyền', hmTim(ho.id).dung===1 && hsoBo().nv.ten==='Trần Thị Vợ Giả' && hsoBo().ho.some(x=>x.ten==='Lê Văn Chủ Giả'));
   hmDatDung(ho.id, 0); await w(300);
   hsoBoDat('soNguoi', '4', 1); await w(300); ok('số người trong hộ gõ → in "gồm 4 người"', /gồm\s*4\s*người/.test(hsoLap().h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')));
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
