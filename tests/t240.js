// 3.328 (P0 — docs/KE_HOACH_KHO_KTGS.md) — cửa KHO cho KTGS: chotThang · theoNgay · bc37 / bc38 · t105Truoc · monGN
//   mỗi cửa so với hàm cũ của KTGS trên cùng kỳ (kết quả phải giống hệt) + không gán biến KTGS. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const J = x => JSON.stringify(x);
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   /* BC0437 giả dựng từ Mẫu 31 giả tháng 8 (cách của t106) */
   const tep = (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Sheet 1'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
   const K = await toNap('2026-08'); TO_K = K; const T = K.to, ds = Object.keys(T).filter(m=>!T[m].trucTiep).map(m=>T[m]);
   const diem = [93, 85, 84.5, 70, 69, 50, 45];
   const h37 = ['Mã PGD','Mã xã','Tên xã','Mã ĐVUT','Tên ĐVUT','Mã tổ','Tên tổ trưởng','Số tổ viên','Số tổ viên còn dư nợ','Số tổ viên có gửi tiết kiệm','Số tổ viên có nộp lãi trong 3 tháng gần nhất','Số tổ viên không nộp lãi đầy đủ trong 3 tháng gần nhất','Số tổ viên có tham gia gửi tiết kiệm trong 3 tháng gần nhất','Số tổ viên không tham gia gửi tiết kiệm đầy đủ trong 3 tháng gần nhất','Tổng dư nợ\n(triệu đồng)','Dư nợ quá hạn (triệu đồng)','Tỷ lệ NQH (%)','Dư nợ khoanh (triệu đồng)','Tỷ lệ nợ khoanh (%)','Lãi tồn (triệu đồng)','Lãi tồn ân hạn (triệu đồng)','Số dư tiết kiệm (triệu đồng)','Mức tiền gửi bình quân/tổ viên (triệu đồng)','Mức tiền gửi bình quân/tổ viên/tháng (ngàn đồng)','Số tổ viên có lãi tồn','Số tổ viên có lãi tồn ân hạn','Kết quả chấm điểm tổ tháng gần nhất','Xếp loại'];
   const a37 = [['THÔNG TIN TỔ TK&VV DO KHÁC QUẢN LÝ ĐẾN NGÀY 31/08/2026'], h37];
   ds.forEach((t, i)=>{ const ks = toKhach(t); let dn=0, qh=0, kn=0, tg=0, nd=0; ks.forEach(k=>{ dn+=k.dn; qh+=k.qh; kn+=k.kn; tg+=k.t105; if(k.mon.some(m=>(m.dn||0)>0)) nd++; });
     a37.push(['004820', t.xa, t.tenXa, String(t.dv), 0, t.ma, t.ten, ks.length, nd, ks.length, ks.length, 0, ks.length, 0, dn/1e6, qh/1e6, 0, kn/1e6, 0, 3, 0, tg/1e6, 0, 10.5, 1, 0, diem[i%diem.length], 0]); });
   { const k37 = await slDocFile(tep(a37, 'BC0437_004820___31082026.xls')); if(!k37.loi) await slGhi(k37); }
   const thang = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort(), ngay = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length>7).map(e=>e.ky).sort();
   ok('bộ giả có Mẫu 31 chốt tháng', thang.length>0, thang.join(','));
   const th = thang[thang.length-1];
   /* chotThang */
   ok('chotThang: tháng đã chốt → {ky:tháng, tam:false}', J(KHO.chotThang(th))===J({ky:th, tam:false}));
   ok('chotThang: tháng không có số liệu → null', KHO.chotThang('2001-01')===null);
   const thN = ngay.length ? slThang(ngay[ngay.length-1]) : '';
   if(thN && !KHO.coBang('hstd', thN)) ok('chotThang: tháng chưa chốt → Mẫu 31 ngày mới nhất (tam) = ktGNNgayCua', J(KHO.chotThang(thN))===J({ky:ktGNNgayCua(thN), tam:true}));
   else ok('chotThang: tháng chưa chốt khớp ktGNNgayCua (không có tháng chỉ có số liệu ngày → bỏ qua)', !thN || ktGNNgayCua(thN)==='');
   /* theoNgay */
   const cuoi = tdnCuoiKy(th);
   ok('theoNgay: đúng ngày cuối tháng chốt → kỳ tháng, không lùi', J(KHO.theoNgay(cuoi))===J({ky:th, ngay:cuoi, lui:false}), J(KHO.theoNgay(cuoi)));
   const sau = kyLui(th, 1)+'-15', tn = KHO.theoNgay(sau);
   ok('theoNgay: ngày không có số liệu → ngày gần nhất trước đó (lui)', !!tn && tn.lui && tn.ngay<sau && tn.ngay>=cuoi, J(tn));
   ok('theoNgay: trước mọi số liệu → null', KHO.theoNgay('2001-01-01')===null);
   /* bc37 / bc38 = ktNapBC */
   const cu = await ktNapBC(th), m37 = await KHO.bc37(th), m38 = await KHO.bc38(th);
   ok('bc37 giống ktNapBC.k37 (e, rows, theoTo)', J(m37)===J(cu.k37), cu.k37 ? cu.k37.e.ky+' · '+cu.k37.rows.length+' dòng' : 'không có BC0437');
   ok('bc38 giống ktNapBC.k38', J(m38 ? {e:m38.e, rows:m38.rows, theoTo:{}} : null)===J(cu.k38) || J(m38)===J(cu.k38), cu.k38 ? cu.k38.rows.length+' dòng' : 'không có BC0438');
   /* t105Truoc = ktTruocNap */
   const KTT = window.KT_TRUOC; window.KT_TRUOC = null; const KK = {thang:th}, a = await ktTruocNap(KK); window.KT_TRUOC = KTT;
   const KT0 = J(window.KT_TRUOC), bb = await KHO.t105Truoc(KK);
   ok('t105Truoc giống ktTruocNap', J(a)===J(bb), bb.ky+' · co '+bb.co+' · '+Object.keys(bb.t105).length+' khách');
   ok('t105Truoc không gán KT_TRUOC', J(window.KT_TRUOC)===KT0);
   const K2 = {thang:kyLui(thang[0], 0)}; window.KT_TRUOC = null; const a2 = await ktTruocNap(K2); window.KT_TRUOC = KTT; const b2 = await KHO.t105Truoc(K2);
   ok('t105Truoc tháng đầu (không có tháng trước) giống ktTruocNap', J(a2)===J(b2), J(b2).slice(0, 60));
   /* monGN = 1 tháng của ktGNNap */
   const C = ktCH(), giu = [C.gnTu, C.gnDen], KG = window.KT_GN; C.gnTu = th; C.gnDen = th; window.KT_GN = null;
   const g = await ktGNNap(); C.gnTu = giu[0]; C.gnDen = giu[1]; const KG1 = window.KT_GN; window.KT_GN = KG;
   const m = await KHO.monGN(th), J2 = x => J(x, (k, v) => k==='mon' ? v.map(z=>z.ku) : v);
   ok('monGN giống ktGNNap.ds[tháng] (tổ, món, thứ tự)', !!m && J2(m.ds)===J2(g.ds[th] || {}), Object.keys(m.ds).length+' tổ · '+Object.values(m.ds).reduce((s, x)=>s+x.mon.length, 0)+' món');
   ok('monGN không gán KT_GN', window.KT_GN===KG);
   ok('monGN tháng không có số liệu → null', (await KHO.monGN('2001-01'))===null);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t240 đạt'); await b.close(); process.exit(sai?1:0);
})();
