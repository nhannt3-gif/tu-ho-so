// 3.506 (anh 09/11 "thêm chức năng sao kê danh sách theo chương trình vay"): tab Sao kê, báo cáo 'ct' (js/74b) — anh chốt: ô chọn 1 CT / Tất cả,
//   chia Chương trình › Tổ › món, cột cơ bản, món còn dư nợ, A4 ngang. Kiểm: ô chọn sổ sẵn CT · tổng khớp Mẫu 31 · chọn 1 CT · lọc địa bàn · bản xem + Excel · không lỗi. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1500, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const S = skCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.ap = ''; S.to = ''; S.ctLoc = '';
   D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   skChonBC('ct'); for(let i=0;i<40 && !document.getElementById('sk-ct');i++) await w(150);
   const sel = document.getElementById('sk-ct'), op = sel ? [...sel.options].map(x => x.value) : [];
   const goc = (kcGoc(SK_K.B)||[]).filter(x => x.ku && ((x.dn||0)>0 || (x.qh||0)>0 || (x.kn||0)>0)), cts = [...new Set(goc.map(x => ctNgan(x.ct, x) || '(chưa rõ CT)'))];
   ok('danh mục Sao kê có "Sao kê theo chương trình vay", khổ A4 ngang', SK_BC.some(x => x.k==='ct' && /chương trình vay/.test(x.ten)) && skKhoCua('ct')==='ngang');
   ok('ô chọn chương trình sổ sẵn: "Tất cả" + mọi CT còn dư nợ, ghi số món · dư nợ', !!sel && op[0]==='' && cts.every(c => op.includes(c)) && op.length===cts.length+1 && /món · [\d.]+ tr/.test(sel.textContent), op.join(','));
   /* tất cả CT, toàn PGD */
   const r = skBaoCao('ct'), tong = goc.reduce((a, x) => a+(x.dn||0), 0), aT = r.aoa.find(x => /^TỔNG CỘNG/.test(x[2]||''));
   ok('chia Chương trình › Tổ: dòng nhóm CT, tổ, cộng chương trình (đủ số CT)', (r.html.match(/tr class="skct-c"/g)||[]).length===cts.length && /tr class="nhom"/.test(r.html) && (r.html.match(/Cộng chương trình/g)||[]).length===cts.length);
   ok('TỔNG CỘNG dư nợ = dư nợ Mẫu 31 (món còn dư nợ, toàn PGD); số dòng món đủ', !!aT && aT[6]===tong && r.aoa.filter(x => typeof x[0]==='number' && x[0]>0).length===goc.length, (aT||[])[6]+' / '+tong);
   /* chọn 1 CT qua ô chọn (data-lenh) */
   const c1 = cts[0]; sel.value = c1; sel.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   const r1 = skBaoCao('ct'), g1 = goc.filter(x => (ctNgan(x.ct, x) || '(chưa rõ CT)')===c1), cc = r1.aoa.filter(x => /^Cộng chương trình/.test(x[2]||'')).pop();
   ok('chọn 1 CT (ô chọn) → lưu skCH().ctLoc, chỉ món của CT đó, cộng CT khớp Mẫu 31, tiêu đề ghi CT', skCH().ctLoc===c1 && r1.aoa.filter(x => typeof x[0]==='number' && x[0]>0).length===g1.length && !!cc && cc[6]===g1.reduce((a, x) => a+(x.dn||0), 0) && /THEO CHƯƠNG TRÌNH VAY — /.test(r1.tieuDe), c1);
   /* lọc địa bàn đến tổ */
   const t0 = Object.values(SK_K.to).find(t => !t.trucTiep && g1.some(x => toMaCua(x)===t.ma)); S.xa = t0.xa; S.to = t0.ma;
   const r2 = skBaoCao('ct'), g2 = g1.filter(x => toMaCua(x)===t0.ma);
   ok('lọc địa bàn (đến tổ) → chỉ món của tổ', g2.length>0 && r2.aoa.filter(x => typeof x[0]==='number' && x[0]>0).length===g2.length);
   S.xa = ''; S.to = ''; S.ctLoc = '';
   /* xem thật */
   SK_XEM = []; skXem(); for(let i=0;i<40 && !SK_XEM.length;i++) await w(150); try { dongHop(); } catch(e){}
   ok('👁 Xem: lập được bản in + Excel', SK_XEM.length===1 && /THEO CHƯƠNG TRÌNH VAY/.test(SK_XEM[0].tieuDe+(SK_XEM[0].html||'')) && (SK_XEM[0].aoa||[]).length>3);
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
