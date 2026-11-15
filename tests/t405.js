// t405 (3.549 C5, hộp thư TK 1 02/11 — anh 15/11 "code cả 2 và gộp" · "CLT sẽ nạp theo xã và 2 loại tháng và định kỳ"): nạp CLT02 xếp loại tổ.
//   Dựng file "Mẫu số 02/CLT" GIẢ đúng khuôn file thật (sheet CLT02_VB3986, dòng TẠI XÃ/PHƯỜNG, dòng kỳ, dòng đánh số cột 1…16, Hội La Mã, tổ, Tổng cộng)
//   từ tổ trong bộ dữ liệu giả gianho31 → nạp tháng + định kỳ cho 1 xã: nhận đúng loại theo NỘI DUNG (tên file vô nghĩa), ô riêng xã × loại, tên chuẩn,
//   số có dấu phẩy, xếp loại, báo tổ không ghép được, thẻ tổ hiện CLT02; nạp lại cùng xã thay đúng ô; file thiếu dòng kỳ → báo lỗi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } } }, files);
 const ky = await p.evaluate(()=>Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort().pop());
 /* dựng file CLT02 giả từ tổ của 1 xã */
 const r0 = await p.evaluate(async(ky)=>{
   const K = await KHO.nap(ky); KHO.datKy(K);
   const ds = KHO.dsToKy(K).filter(t=>t && !t.trucTiep && !toLaTT(t) && t.tenXa && t.ten);
   const xa = ds[0].tenXa, cua = ds.filter(t=>t.tenXa===xa).slice(0, 4);
   const [m, y] = [+ky.slice(5), +ky.slice(0, 4)], cuoi = new Date(y, m, 0).getDate();
   const dung = (loai) => { const A = [], dong = (cells)=>{ const r = []; Object.keys(cells).forEach(i=>{ r[+i] = cells[i]; }); A.push(r); };
     dong({22:'Mẫu số 02/CLT'}); dong({1:'CHI NHÁNH NHCSXH TỈNH GIẢ'}); dong({0:'BIỂU TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CHẤT LƯỢNG HOẠT ĐỘNG UỶ NHIỆM CỦA TỔ TK&VV  TẠI XÃ/PHƯỜNG '+xa.toUpperCase()});
     dong({3:loai==='T' ? 'Tháng '+String(m).padStart(2, '0')+'/'+y : 'Từ 01/01/'+y+' đến '+cuoi+'/'+String(m).padStart(2, '0')+'/'+y}); dong({0:'STT'});
     dong({5:'Tốt', 6:'Khá', 7:'TB', 8:'Yếu', 11:'Tiêu chí'}); dong({11:'Tổng\nđiểm', 12:'Tham gia giao dịch xã (20đ)'});
     const so = {}; [[0,1],[2,2],[5,3],[6,4],[7,5],[8,6],[11,7],[12,8],[14,9],[15,10],[16,11],[19,12],[21,13],[23,14],[24,15],[27,16]].forEach(([c, n])=>{ so[c] = String(n); }); dong(so);
     const hoi = {}; cua.forEach(t=>{ const h = tdnHoi(t.dv) || 'Hội nông dân'; (hoi[h] = hoi[h] || []).push(t); });
     const la = ['I', 'II', 'III', 'IV']; let hi = 0;
     Object.keys(hoi).forEach(h=>{ dong({0:la[hi++], 2:h, 5:'1', 6:'-'}); hoi[h].forEach((t, i)=>{ dong({0:String(i+1), 2:t.ten, [i%2 ? 6 : 5]:'x', 11:i%2 ? '78,57' : '92,00', 12:'20,00', 14:'15,00', 15:'12,57', 16:'1,00', 19:'30,00'}); }); });
     dong({0:String(9), 2:'Tổ Giả Không Có', 8:'x', 11:'40,00', 12:'10,00', 14:'-', 15:'-', 16:'-', 19:'30,00'});
     dong({2:'Tổng cộng', 5:'3', 11:'300,00'});
     const ws = XLSX.utils.aoa_to_sheet(A), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'CLT02_VB3986');
     return new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'})); };
   const nap = async (u, ten) => { const kq = await slDocFile(new File([u], ten)); const r = {loi:kq.loi, loai:kq.loai, ky:kq.ky, ngay:kq.ngay, tom:kq.tong ? slTomRieng(kq.loai, kq.tong) : '', canh:(kq.canhBao||[]).join(' | '), rows:(kq.rows||[]).length, r0:kq.rows && kq.rows[0]};
     if(!kq.loi) await slGhi(kq); return r; };
   const T = await nap(dung('T'), 'file_bat_ky_123.xlsx'), DK = await nap(dung('DK'), 'abc ĐK 999.xlsx');
   return {xa, n:cua.length, T, DK, ma:CLT.ma(xa), t0:cua[0].ma};
 }, ky);
 ok('nhận CLT02 tháng theo NỘI DUNG (tên file vô nghĩa) → ô cltT_<MÃ XÃ>, ngày = cuối tháng, đọc đủ tổ', r0.T && !r0.T.loi && r0.T.loai==='cltT_'+r0.ma && r0.T.ky===ky && r0.T.rows===r0.n+1, JSON.stringify(r0.T).slice(0, 300));
 ok('nhận CLT02 định kỳ (Từ … đến …) → ô riêng cltDK_<MÃ XÃ>', r0.DK && !r0.DK.loi && r0.DK.loai==='cltDK_'+r0.ma && r0.DK.ky===ky, JSON.stringify(r0.DK).slice(0, 200));
 ok('số có dấu phẩy, xếp loại, Hội: dòng đầu đọc đúng', r0.T.r0 && r0.T.r0.diem===92 && r0.T.r0.tc3===12.57 && r0.T.r0.xl==='Tốt' && !!r0.T.r0.hoi, JSON.stringify(r0.T.r0));
 ok('tóm tắt "N tổ · Tốt · Khá · TB · Yếu"; tổ trong file không có ở app → báo, không đoán', /tổ · Tốt \d+ · Khá \d+ · TB \d+ · Yếu 1/.test(r0.T.tom) && /1 tổ trong file chưa ghép/.test(r0.T.canh) && /Tổ Giả Không Có/.test(r0.T.canh), r0.T.tom+' || '+r0.T.canh);
 /* ma trận + tên chuẩn */
 let r = await p.evaluate((x)=>{ D.cauHinh.slTab = 'nap'; SL_KY = x.ky; slMoNhom && D.cauHinh; return {L:!!slLoai('cltT_'+x.ma) && !!slLoai('cltDK_'+x.ma), ma:slMaTen('cltT_'+x.ma)+'|'+slMaTen('cltDK_'+x.ma), ten:slLoai('cltT_'+x.ma).ten, co:KHO.coBang('cltT_'+x.ma, x.ky) && KHO.coBang('cltDK_'+x.ma, x.ky)}; }, {ky, ma:r0.ma});
 ok('ô riêng xã × loại ở nhóm Ⓓ, tên chuẩn CLT02T_<MÃ> / CLT02DK_<MÃ>, đã lưu kho', r.L && r.co && r.ma==='CLT02T_'+r0.ma+'|CLT02DK_'+r0.ma && /CLT02 tháng · /.test(r.ten), JSON.stringify(r));
 r = await p.evaluate(async(x)=>{ moNapSL(); await new Promise(z=>setTimeout(z, 1500)); if(!slNhomMo('D')) slMoNhom('D'); await new Promise(z=>setTimeout(z, 500)); return document.querySelector('.sl-luoi') ? /CLT02 tháng/.test(document.querySelector('.sl-luoi').textContent) && /CLT02 định kỳ/.test(document.querySelector('.sl-luoi').textContent) : false; }, {ky});
 ok('ma trận Nạp & KT hiện 2 dòng CLT02 tháng / định kỳ của xã', r);
 /* thẻ tổ */
 r = await p.evaluate(async(x)=>{ for(const k of Object.keys(SL_BO)) delete SL_BO[k]; const K = await KHO.nap(x.ky); KHO.datKy(K); const t = KHO.toKy(K, x.t0); return toTheHTML(t, KHO.toVien(t)); }, {ky, t0:r0.t0});
 ok('thẻ tổ (tab Tổ) hiện "CLT02 tháng: Tốt 92,00 · định kỳ: Tốt 92,00"', /to-clt/.test(r) && /tháng: <b>Tốt 92,00<\/b>/.test(r) && /định kỳ: <b>Tốt 92,00<\/b>/.test(r), (r.match(/<span class="to-clt"[^]*?<\/span>/)||[''])[0]);
 /* file thiếu dòng kỳ */
 r = await p.evaluate(async()=>{ const ws = XLSX.utils.aoa_to_sheet([['Mẫu số 02/CLT'], ['x'], ['BIỂU … TẠI XÃ/PHƯỜNG XÃ GIẢ']]), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'CLT02_VB3986');
   const kq = await slDocFile(new File([new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'}))], 'x.xlsx')); return kq.loi || ''; });
 ok('file CLT02 thiếu dòng kỳ → báo lỗi rõ, không nạp', /không đọc được dòng kỳ/.test(r), r);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t405 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
