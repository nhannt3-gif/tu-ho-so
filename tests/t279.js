// t279 (TK 3, 3.385 — anh 27/10): SAO KÊ THEO NHÀ ĐẦU TƯ (tab Sao kê, báo cáo 'ndt') — ô chọn NĐT sổ sẵn mọi mã trong Mẫu 31 (mã trống = vốn TW),
//   chia NĐT › chương trình › tổ › món, cộng tổ / chương trình / NĐT / tổng khớp Mẫu 31; chọn 1 NĐT; theo bộ lọc địa bàn; tên NĐT (✏) lưu D.cauHinh.slNdtTen. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1500,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   kyChungDoi('2026-08'); const S = skCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.ap = ''; S.to = ''; S.ndt = '';
   D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   skChonBC('ndt'); for(let i=0;i<40 && !document.getElementById('sk-ndt');i++) await w(150);
   const sel = document.getElementById('sk-ndt'), op = sel ? [...sel.options].map(x=>x.value) : [];
   const goc = (kcGoc(SK_K.B)||[]).filter(x=>x.ku && ((x.dn||0)>0 || (x.qh||0)>0 || (x.kn||0)>0)), ma = [...new Set(goc.map(x=>String(x.ndt||'').trim()||'-'))];
   ok('ô chọn NĐT sổ sẵn: "Tất cả" + mọi mã trong Mẫu 31 (mã trống = Vốn TW), ghi nguồn · số món · dư nợ', !!sel && op[0]==='' && ma.every(m=>op.includes(m)) && /Vốn TW/.test(sel.textContent) && /món · [\d.]+ tr/.test(sel.textContent), op.join(','));
   /* tất cả NĐT, toàn PGD */
   const r = skBaoCao('ndt'), tongMau = goc.reduce((a, x)=>a+(x.dn||0), 0), aoaTong = r.aoa.find(x=>/^TỔNG CỘNG/.test(x[2]||''));
   ok('chia NĐT › chương trình › tổ: có dòng nhóm NĐT, chương trình, tổ; cộng chương trình / NĐT', /Nhà đầu tư: /.test(r.html) && /tr class="ndt-c"/.test(r.html) && /tr class="nhom"/.test(r.html) && /Cộng chương trình/.test(r.html) && (r.html.match(/tr class="ndt-n"/g)||[]).length===ma.length);
   ok('TỔNG CỘNG dư nợ = dư nợ Mẫu 31 (món còn dư nợ, toàn PGD)', !!aoaTong && aoaTong[6]===tongMau, (aoaTong||[])[6]+' / '+tongMau);
   ok('số dòng món = số món Mẫu 31 còn dư nợ', r.aoa.filter(x=>typeof x[0]==='number' && x[0]>0).length===goc.length);
   /* chọn 1 NĐT có mã */
   const m1 = ma.find(m=>m!=='-'); S.ndt = m1; const r1 = skBaoCao('ndt'), g1 = goc.filter(x=>String(x.ndt||'').trim()===m1);
   const c1 = r1.aoa.filter(x=>/^Cộng Mã NĐT/.test(x[2]||'')).pop();
   ok('chọn 1 NĐT → chỉ món của NĐT đó, cộng NĐT khớp Mẫu 31', !!m1 && r1.aoa.filter(x=>typeof x[0]==='number' && x[0]>0).length===g1.length && !!c1 && c1[6]===g1.reduce((a, x)=>a+(x.dn||0), 0) && /SAO KÊ DƯ NỢ THEO NHÀ ĐẦU TƯ — MÃ NĐT/.test(r1.tieuDe));
   /* theo bộ lọc địa bàn */
   const t0 = Object.values(SK_K.to).find(t=>!t.trucTiep && g1.some(x=>toMaCua(x)===t.ma)); S.xa = t0.xa; S.to = t0.ma;
   const r2 = skBaoCao('ndt'), g2 = g1.filter(x=>toMaCua(x)===t0.ma);
   ok('lọc địa bàn (đến tổ) → chỉ món của tổ', r2.aoa.filter(x=>typeof x[0]==='number' && x[0]>0).length===g2.length && g2.length>0);
   S.xa = ''; S.to = ''; S.ndt = '';
   /* tên NĐT */
   ndtSuaTen(); await w(200); const inp = document.querySelector('#hop-in .ndt-ten input[data-ma="'+m1+'"]'); inp.value = 'NĐT Giả Tỉnh'; ndtLuuTen(); await w(300);
   ok('✏ Tên NĐT → lưu D.cauHinh.slNdtTen (khối Số liệu), ô chọn + báo cáo ghi tên', D.cauHinh.slNdtTen[m1]==='NĐT Giả Tỉnh' && chKhoiCua('slNdtTen')==='solieu' && /NĐT Giả Tỉnh/.test(document.getElementById('sk-ndt').textContent) && /NĐT Giả Tỉnh/.test(skBaoCao('ndt').html));
   /* xem thật */
   SK_XEM = []; skXem(); for(let i=0;i<40 && !SK_XEM.length;i++) await w(150); try{ dongHop(); }catch(e){}
   ok('👁 Xem: lập được bản in + Excel', SK_XEM.length===1 && /SAO KÊ DƯ NỢ THEO NHÀ ĐẦU TƯ/.test(SK_XEM[0].tieuDe+(SK_XEM[0].html||'')) && (SK_XEM[0].aoa||[]).length>3, JSON.stringify({n:SK_XEM.length, k:Object.keys(SK_XEM[0]||{}), td:(SK_XEM[0]||{}).tieuDe, a:((SK_XEM[0]||{}).aoa||[]).length}));
   delete D.cauHinh.slNdtTen; return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(R.length-R.filter(x=>x[0]==='✗').length+'/'+R.length+' đạt'+(loi.length ? ' · lỗi trang' : '')); await b.close(); process.exit(sai?1:0);
})();
