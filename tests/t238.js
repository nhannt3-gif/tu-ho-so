// 3.330 (KE_HOACH_KTGS_GON bước 3–4): thanh 3 khối 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo (thay 6 chip), màn 🧩 Bộ khai báo mẫu (sửa 2 bộ không cần In, chép ① sang ②),
//   đột xuất có Mẫu 04, Định kỳ tích tổ có lịch tháng kiểm tra. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const K = ktCH(); K.ky = '2026-08'; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dx'; KT_A_TH = ''; delete D.cauHinh.ktIn;
   kyChungDoi('2026-08'); doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const the = () => document.getElementById('kt-the'), bam = async(sel)=>{ const e = typeof sel==='string' ? the().querySelector(sel) : sel; e.click(); await w(250); };
   const khoi = () => [...the().querySelectorAll('.kt-khoi button')];
   ok('thanh 3 khối: 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo; đột xuất đang chọn', khoi().length===3 && /Bắt buộc/.test(khoi()[0].textContent) && /Đột xuất/.test(khoi()[1].textContent) && /Khai báo/.test(khoi()[2].textContent) && khoi()[1].classList.contains('bat'));
   ok('khối Đột xuất không có hàng thẻ con', !the().querySelector('.kt-a-the'));
   await bam(khoi()[0]);
   ok('bấm 📅 Bắt buộc → Định kỳ (mặc định) + 4 thẻ con', ktCheDo()==='dk' && the().querySelectorAll('.kt-a-the button').length===4 && /Định kỳ/.test(the().querySelector('.kt-a-the .bat').textContent));
   await bam([...the().querySelectorAll('.kt-a-the button')].find(b=>/Sau giải ngân/.test(b.textContent)));
   ok('thẻ con Sau giải ngân → che gn, nhớ thẻ', ktCheDo()==='gn' && K.aThe==='gn');
   await bam(khoi()[1]); await bam(khoi()[0]);
   ok('quay lại Bắt buộc → mở đúng thẻ con lần trước (Sau giải ngân)', ktCheDo()==='gn');
   await bam(khoi()[2]);
   ok('⚙ Khai báo → 🏛 Hội – xã / 📖 Chuẩn hóa / 🧩 Bộ khai báo mẫu', ktCheDo()==='hdt' && /Bộ khai báo mẫu/.test(the().querySelector('.kt-che').textContent));
   await bam([...the().querySelectorAll('.kt-che button')].find(b=>/Bộ khai báo/.test(b.textContent)));
   ok('màn Bộ khai báo: 4 phần mẫu (06, 16, 04, Kế hoạch) + chọn bộ, không mở hộp', the().querySelectorAll('.kt-in-phan').length===4 && !!the().querySelector('.kt-bo-chon') && !document.querySelector('#hop.hien'));
   /* sửa bộ ① ngay trên màn */
   const s1 = the().querySelector('#ki-m16-b2'); s1.value = 'cham'; s1.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('sửa Bảng II bộ ① trên màn → lưu ktIn.m16, không mở hộp', D.cauHinh.ktIn.m16.b2==='cham' && !document.querySelector('#hop.hien') && /① Hội kiểm tra/.test(the().querySelector('.kt-bo-chon .bat').textContent));
   await bam(the().querySelector('[data-lenh="ktk.chep"]'));
   ok('⧉ Chép bộ ① sang ②', D.cauHinh.ktIn.dx_m16 && D.cauHinh.ktIn.dx_m16.b2==='cham');
   await bam(the().querySelector('.kt-bo-chon [data-bo="can"]'));
   const s2 = the().querySelector('#ki-m16-dvc'); s2.value = 'cham'; s2.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('chọn bộ ② trên màn → sửa vào dx_m16, bộ ① giữ', D.cauHinh.ktIn.dx_m16.dvc==='cham' && (D.cauHinh.ktIn.m16.dvc||'')==='' && /② Khai báo khi cần/.test(the().querySelector('.kt-bo-chon .bat').textContent));
   /* đột xuất: Mẫu 04 */
   await bam(khoi()[1]); const t = Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99')[0]; ktChonTo(t.ma); await w(400);
   ok('đột xuất có nút 📋 Mẫu 04', !!the().querySelector('[data-lenh="ktk.dx04"]'));
   await bam(the().querySelector('[data-lenh="ktk.dx04"]'));
   ok('bấm Mẫu 04 → hộp chọn khi in Mẫu 04', !!document.getElementById('ki-m04-ng1'));
   dongHop(); KT_KB.ngay = ''; ktDX04(1); await w(400);
   ok('Mẫu 04 đột xuất: 1 báo cáo, tháng để chấm khi chưa khai ngày, nút Đổi lựa chọn quay về Mẫu 04 đột xuất', KT_BC_XEM && KT_BC_XEM.tu==='dx' && KT_BC_XEM.gts.length===1 && KT_BC_XEM.gts[0].f.TH04==='' && /ktDX04\(\)/.test(document.getElementById('hop-in').innerHTML));
   dongHop();
   /* định kỳ: tích tổ theo lịch */
   const nam = '2026', khoa = nam+'|'+t.xa+'|'+t.dv; D.cauHinh.ktKH = {}; D.cauHinh.ktKH[khoa] = {to:{}}; D.cauHinh.ktKH[khoa].to[t.ma] = 9;
   K.che = 'dk'; K.xa = t.xa; KT_DK_CHON = {}; ktVeThe(); await w(400);
   const nl = the().querySelector('[data-lenh="ktk.dkLich"]');
   ok('Định kỳ T9: nút "📅 Tích 1 tổ có lịch T9"', !!nl && /Tích 1 tổ có lịch T9/.test(nl.textContent), nl && nl.textContent);
   await bam(nl); ok('bấm → tổ có lịch được tích', KT_DK_CHON[t.ma]===true);
   const cb = the().querySelector('[data-lenh="ktk.dkTich"][data-m="'+t.ma+'"]'); cb.checked = false; cb.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('ô tích tổ (data-lenh) bỏ tích được', !KT_DK_CHON[t.ma]);
   K.che = 'dx'; delete D.cauHinh.ktKH;
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
