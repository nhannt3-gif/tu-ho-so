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
   const khoi = () => [...the().querySelectorAll('.kt-khoi > .gd-chip')];
   ok('3.514 thanh 5 nút: Kiểm tra tổ · sau 30 ngày · Kiểm tra Hội · Kế hoạch năm · Khai báo; Kiểm tra tổ đang chọn', khoi().length===5 && /Kiểm tra tổ/.test(khoi()[0].textContent) && /sau 30 ngày/.test(khoi()[1].textContent) && /Kiểm tra Hội/.test(khoi()[2].textContent) && /Kế hoạch năm/.test(khoi()[3].textContent) && /Khai báo/.test(khoi()[4].textContent) && khoi()[0].classList.contains('bat'), khoi().map(x=>x.textContent).join('|'));
   ok('không còn hàng thẻ con Bắt buộc', !the().querySelector('.kt-a-the'));
   await bam(khoi()[1]); ok('📅 Kiểm tra sau 30 ngày → che gn', ktCheDo()==='gn');
   await bam(khoi()[3]); ok('🗓 Kế hoạch năm → che kh', ktCheDo()==='kh');
   await bam(khoi()[2]); ok('🏛 Kiểm tra Hội → che hx', ktCheDo()==='hx');
   await bam(khoi()[4]);
   ok('⚙ Khai báo → 🏛 Hội – xã / 📖 Chuẩn hóa / 🧩 Bộ khai báo mẫu', ktCheDo()==='hdt' && /Bộ khai báo mẫu/.test(the().querySelector('.kt-che').textContent));
   await bam([...the().querySelectorAll('.kt-che button')].find(b=>/Bộ khai báo/.test(b.textContent)));
   ok('màn Bộ khai báo: 4 phần mẫu (06, 16, 04, Kế hoạch) + chọn bộ, không mở hộp', the().querySelectorAll('.kt-in-phan').length===4 && !!the().querySelector('.kt-bo-chon') && !document.querySelector('#hop.hien'));
   /* sửa bộ ① ngay trên màn */
   const s1 = the().querySelector('#ki-m16-b2'); s1.value = 'dien'; s1.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('sửa Bảng II bộ ① trên màn → lưu ktIn.m16, không mở hộp', D.cauHinh.ktIn.m16.b2==='dien' && !document.querySelector('#hop.hien') && /① Hội kiểm tra/.test(the().querySelector('.kt-bo-chon .bat').textContent));
   await bam(the().querySelector('[data-lenh="ktk.chep"]'));
   ok('⧉ Chép bộ ① sang ②', D.cauHinh.ktIn.dx_m16 && D.cauHinh.ktIn.dx_m16.b2==='dien');
   await bam(the().querySelector('.kt-bo-chon [data-bo="can"]'));
   const s2 = the().querySelector('#ki-m16-dvc'); s2.value = 'cham'; s2.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('chọn bộ ② trên màn → sửa vào dx_m16, bộ ① giữ', D.cauHinh.ktIn.dx_m16.dvc==='cham' && (D.cauHinh.ktIn.m16.dvc||'')==='' && /② Khai báo khi cần/.test(the().querySelector('.kt-bo-chon .bat').textContent));
   /* đột xuất: Mẫu 04 */
   K.che = 'dx'; ktVeThe(); await w(200); const t = Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99')[0]; ktChonTo(t.ma); await w(400);
   const hn = [...the().querySelectorAll('.hang-nut.kt-in button')].map(b=>b.textContent.trim()).join('|');
   ok('3.514: hàng nút Kiểm tra tổ = Tóm tắt · 06/TD · 15/TD · 16/TD · 04 (không còn nút ktk.dx04)', !the().querySelector('[data-lenh="ktk.dx04"]') && hn==='📋 Tóm tắt|📄 06/TD|📄 15/TD|📄 16/TD|📄 04', hn);
   ktDX04(); await w(300);
   ok('ktDX04 (hàm giữ) → hộp chọn khi in Mẫu 04', !!document.getElementById('ki-m04-ng1'));
   dongHop(); KT_KB.ngay = ''; ktDX04(1); await w(400);
   ok('Mẫu 04 đột xuất: 1 báo cáo, tháng để chấm khi chưa khai ngày, nút Đổi lựa chọn quay về Mẫu 04 đột xuất', KT_BC_XEM && KT_BC_XEM.tu==='dx' && KT_BC_XEM.gts.length===1 && KT_BC_XEM.gts[0].f.TH04==='' && /ktDX04\(\)/.test(document.getElementById('hop-in').innerHTML));
   dongHop();
   /* 3.514 (anh "kế hoạch năm để riêng, không link qua kiểm tra tổ"): Kiểm tra tổ không có nút tích theo lịch; ô tích tổ (data-lenh) */
   const nam = '2026', khoa = nam+'|'+t.xa+'|'+t.dv; D.cauHinh.ktKH = {}; D.cauHinh.ktKH[khoa] = {to:{}}; D.cauHinh.ktKH[khoa].to[t.ma] = 9;
   K.che = 'dk'; K.xa = t.xa; K.to = ''; KT_DK_CHON = {}; ktVeThe(); await w(400);
   ok('che cũ dk → 🎯 Kiểm tra tổ, không có nút "Tích tổ có lịch"', ktCheDo()==='dx' && !the().querySelector('[data-lenh="ktk.dkLich"]'));
   const cb = the().querySelector('[data-lenh="ktto.to"][data-m="'+t.ma+'"]'); cb.checked = true; cb.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('ô tích tổ (data-lenh) tích được', KT_DK_CHON[t.ma]===true);
   const cb2 = the().querySelector('[data-lenh="ktto.to"][data-m="'+t.ma+'"]'); cb2.checked = false; cb2.dispatchEvent(new Event('change', {bubbles:true})); await w(250);
   ok('ô tích tổ (data-lenh) bỏ tích được', !KT_DK_CHON[t.ma]);
   K.che = 'dx'; delete D.cauHinh.ktKH;
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
