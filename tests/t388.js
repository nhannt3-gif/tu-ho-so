// 3.512 (anh 11/11 "KH có dư nợ trong tổ nhưng TK 105 chưa có gán mã tổ"): tab Sao kê › nhóm Khách hàng › báo cáo 'tk0' (js/76b).
//   Bộ GIẢ gianho31 + Mẫu 31 thêm dòng TK 105 (không khế ước): khách A đang vay trong tổ — dòng 105 mã tổ trống (phải ra) · khách B — dòng 105 mã tổ 0000000 (phải ra)
//   · khách C — dòng 105 có mã tổ thật (không ra). Kiểm: đúng khách, chia theo tổ đang vay, số sổ / số dư 105, dư nợ, ghi chú "Gán TK 105 vào tổ …", lọc đến tổ, 👁 Xem, không lỗi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1400, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   const thu = {};
   for(const f of files){ const bin = atob(f.b); let u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
     if(/^Ho_so.*31-08-2026/i.test(f.n)){
       const wb = XLSX.read(u, {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]], a = XLSX.utils.sheet_to_json(sh, {header:1, defval:''}), N = c => String(c).trim();
       const h = a.findIndex(r => r.some(c => N(c)==='Mã tổ')), c = t => a[h].findIndex(x => N(x)===t);
       const cT = c('Mã tổ'), cK = c('Mã KH'), cKU = c('Số khế ước'), cS = c('Sổ tiết kiệm 105'), cD = c('Số dư tiền gửi 105');
       const vay = a.slice(h+1).filter(r => N(r[cK]) && N(r[cKU]) && N(r[cT])), kh = [...new Set(vay.map(r => N(r[cK])))];
       const tao = (m, to, stk, du) => { const g = vay.find(r => N(r[cK])===m), r = g.slice(); a[h].forEach((x, j) => { if(j!==cK && /khế ước|dư nợ|giải ngân|thu nợ|lãi|quá hạn|khoanh|ngày vay|ngày đh|chương trình|thời hạn|số tiền/i.test(N(x))) r[j] = ''; });
         r[cKU] = ''; r[cT] = to; r[cS] = stk; r[cD] = du; a.push(r); return {kh:m, to:N(g[cT])}; };
       thu.A = tao(kh[0], '', '0010000091', 200000); thu.B = tao(kh[1], '0000000', '0010000092', 300000); thu.C = tao(kh[2], N(vay.find(r => N(r[cK])===kh[2])[cT]), '0010000093', 400000);
       wb.Sheets[wb.SheetNames[0]] = XLSX.utils.aoa_to_sheet(a); u = new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'})); }
     const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const S = skCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.ap = ''; S.to = '';
   D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   ok('danh mục Sao kê › Khách hàng có "khách vay trong tổ có TK 105 chưa gán mã tổ"', SK_BC.some(x => x.k==='tk0' && x.nhom==='kh' && /vay trong tổ/.test(x.ten)));
   const r = skBaoCao('tk0'), dong = r.aoa.slice(1).filter(x => typeof x[0]==='number'), theo = m => dong.find(x => x[1]===m);
   const a1 = theo(thu.A.kh), b1 = theo(thu.B.kh);
   ok('khách A (dòng 105 mã tổ trống) ra: số sổ, số dư 105, dư nợ > 0, ghi chú gán vào tổ đang vay', !!a1 && a1[3]==='0010000091' && a1[4]===200000 && a1[5]>0 && a1[6].indexOf('('+thu.A.to+')')>=0, JSON.stringify(a1));
   ok('khách B (dòng 105 mã tổ 0000000) ra', !!b1 && b1[3]==='0010000092' && b1[4]===300000, JSON.stringify(b1));
   ok('khách C (dòng 105 đã có mã tổ) không ra', !theo(thu.C.kh));
   ok('chỉ khách thử A, B (bộ giả gốc không có dòng 105 nào của khách vay thiếu tổ)', dong.length===2, dong.map(x => x[1]).join(','));
   ok('chia theo tổ đang vay (dòng nhóm tổ)', /Tổ |tổ/.test(r.html) && (r.html.match(/class="nhom"/g) || []).length>=1);
   /* lọc đến tổ của A */
   const tA = SK_K.to[thu.A.to]; S.xa = tA.xa; S.to = thu.A.to; const rA = skBaoCao('tk0'); S.xa = ''; S.to = '';
   const dA = rA.aoa.slice(1).filter(x => typeof x[0]==='number');
   ok('lọc đến tổ của khách A → chỉ khách A', dA.length===1 && dA[0][1]===thu.A.kh, JSON.stringify(dA.map(x => x[1])));
   SK_XEM = []; skChonBC('tk0'); await w(300); skXem(); for(let i=0;i<40 && !SK_XEM.length;i++) await w(150); try { dongHop(); } catch(e){}
   ok('👁 Xem: lập được bản in + Excel', SK_XEM.length===1 && /CHƯA GÁN MÃ TỔ/.test(SK_XEM[0].tieuDe) && (SK_XEM[0].aoa||[]).length>=3);
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
