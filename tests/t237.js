// 3.328 (anh 23/10, KE_HOACH_KTGS_GON bước 2): khối Bắt buộc — ô Tháng kiểm tra, số liệu Mẫu 31 chốt cuối tháng liền trước (không theo ô Kỳ đầu trang);
//   Sau giải ngân 1 tổ × 1 tháng = 1 phiếu, số liệu hộ theo Mẫu 31 tháng giải ngân, dòng nhắc 30 ngày. Bộ GIẢ tests/gianho31.
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
   const thangs = toDsKy().map(e=>e.ky).filter(k=>k.length===7).sort(); ok('bộ giả có ≥ 2 tháng Mẫu 31', thangs.length>=2, thangs.join(','));
   const m1 = thangs[0], m2 = thangs[thangs.length-1];
   kyChungDoi(m1); const K = ktCH(); K.ky = m1; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dk'; KT_A_TH = '';
   doiNgan(7); slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('mặc định: tháng kiểm tra = tháng sau kỳ đầu trang (như cũ)', ktNguonThangKT()===kyLui(m1, 1), ktNguonThangKT());
   /* chọn tháng kiểm tra = tháng sau m2 → số liệu m2 dù ô đầu trang là m1 */
   const th = kyLui(m2, 1), sel = ()=>document.querySelector('#kt-the .kt-a-thang select');
   for(let i=0;i<40 && !sel();i++) await w(150);
   ok('thẻ Định kỳ có ô 📅 Tháng kiểm tra', !!sel(), String((document.getElementById('tr7')||{}).textContent).slice(0, 300)+' | '+nganHienTai+' '+D.cauHinh.slTab); if(!sel()) return o;
   sel().value = th; if(sel().value!==th){ const op = document.createElement('option'); op.value = th; sel().appendChild(op); sel().value = th; }
   sel().dispatchEvent(new Event('change', {bubbles:true}));
   for(let i=0;i<80 && !ktNguonSan(th);i++) await w(200); await w(300);
   ok('đổi tháng kiểm tra → nạp số liệu cuối tháng liền trước', ktNguonSan(th) && KT_KH_SL.ky===m2, KT_KH_SL && KT_KH_SL.ky);
   ok('ô Kỳ đầu trang giữ nguyên (KT_K vẫn kỳ '+m1+')', KT_K.ky===m1 && ktCH().ky===m1, KT_K.ky);
   ok('trong khối Bắt buộc số liệu = '+m2+' (ktNguonVoi)', ktNguonVoi(th, ()=>KT_K.ky)===m2 && KT_K.ky===m1);
   ok('dòng số liệu ghi rõ kỳ dùng', /Số liệu in T/.test(document.getElementById('kt-the').textContent));
   ok('tháng kiểm tra định kỳ = ô đã chọn', ktDKThang()===th);
   const t = ktNguonVoi(th, ()=>Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99')[0]);
   K.xa = t.xa; ktVeThe(); await w(300); KT_DK_CHON = {}; KT_DK_CHON[t.ma] = true;
   const X = ktNguonVoi(th, ()=>ktDKGiaTri(ktInV('m06'), ktInV('m16')));
   const s2 = ktNguonVoi(th, ()=>ktSoTo(KT_K.to[t.ma]));
   ok('Mẫu 16 định kỳ: tháng = tháng kiểm tra, số liệu tổ theo '+m2, X.g16.length===1 && X.g16[0].f.NM===th.slice(5) && X.g16[0].f.DN===ktTr(s2.dn, s2.nguon==='BC0437' ? 0 : 2), JSON.stringify({NM:X.g16[0] && X.g16[0].f.NM, DN:X.g16[0] && X.g16[0].f.DN}));
   /* Mẫu 04 cùng ô tháng */
   K.che = 'bc'; ktVeThe(); await w(300);
   ok('thẻ Mẫu 04 cùng ô Tháng kiểm tra (chung khối Bắt buộc)', !!sel() && sel().value===th);
   KT_BC_CHON = {}; KT_BC_CHON[t.ma] = true; const g4 = ktBCGiaTri();
   ok('Mẫu 04: tháng báo cáo = tháng kiểm tra', g4.length===1 && g4[0].f.TH04===th.slice(5), g4[0] && g4[0].f.TH04);
   /* Sau giải ngân: 1 tổ × 1 tháng */
   K.che = 'gn'; K.gnTu = m1; K.gnDen = m2; K.xa = t.xa; K.to = ''; KT_GN = null; ktVeThe(); for(let i=0;i<80 && !KT_GN;i++) await w(200); await w(300);
   const ch = ktGNChon(), cap = {}; ch.forEach(x=>{ cap[x.x.t.ma+'|'+x.th] = (cap[x.x.t.ma+'|'+x.th]||0)+1; });
   ok('Sau GN gom nhiều tháng: mỗi phiếu đúng 1 tổ × 1 tháng', ch.length>0 && ch.every(x=>x.thang.length===1 && x.mon.every(m=>m._th===x.th)) && Object.values(cap).every(n=>n===1), ch.length+' phiếu');
   ok('dòng nhắc "Kiểm tra trong 30 ngày kể từ ngày giải ngân (727)"', /Kiểm tra trong 30 ngày kể từ ngày giải ngân/.test(document.getElementById('kt-the').textContent));
   const p0 = ch[0], h0 = ktGNHo(p0), kh0 = KT_GN.kh[p0.th][h0[0].kh];
   ok('Sau GN: lãi tồn / 105 của hộ theo Mẫu 31 tháng giải ngân', !!kh0 && h0[0].lt===kh0.lt && h0[0].t105===kh0.t105);
   const gt = ktGNGiaTri(ktInV('m06')); ok('Mẫu 06 sau GN: số phiếu = số tổ × tháng', gt.length===ch.length);
   KT_A_TH = ''; K.che = 'dx';
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
