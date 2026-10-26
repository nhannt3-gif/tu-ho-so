// t276 (TK 3, 3.382 — anh 26/10 "mọi truy vấn lấy qua kho"): BẢN CHỤP KẾT QUẢ các báo cáo Sao kê (mọi báo cáo), tab Tổ (ds · no · tk · ct), Tổng hợp, kiểm Nạp TW
//   trên bộ GIẢ tests/gianho31 + Sao kê TK 105 giả. Chuyển báo cáo sang đọc KHO CHUẨN phải cho kết quả GIỐNG HỆT bản chụp (tests/t276_chup.json — dữ liệu giả).
//   Chạy "node tests/t276.js --chup" để ghi lại bản chụp (chỉ khi anh duyệt đổi nội dung báo cáo).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), crypto=require('crypto'), CHUP = path.join(__dirname, 't276_chup.json');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   const K0 = await KHO.nap('2026-08'), vay = K0.B.co.hstd.filter(x=>x.ku && x.to && (x.dn||0)>0);
   const sk = (kh, stk, cuoi, dau) => ['', '004820', '900000', '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, dau, '105', '01/01/2024', '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']]
     .concat(vay.slice(0, 20).map((x, i)=>sk(x.kh, '00100000'+String(10+i), 100000*(i+1), 50000*i)));
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k5 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k5.loi) await slGhi(k5);
   for(const k in TO_KS) delete TO_KS[k];
   const out = {}, gon = x => JSON.stringify(x, (k, v)=>typeof v==='function' ? undefined : v);
   /* Sao kê: mọi báo cáo, toàn PGD + 1 xã */
   const S = skCH(); S.ky = '2026-08'; S.xa = ''; S.diem = ''; S.hoi = ''; S.to = ''; S.tu = '2026-09-01'; S.den = '2026-09-30'; SK_K = null; D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   const xa1 = vay[0].xa;
   for(const pv of ['', xa1]){ S.xa = pv;
     for(const bc of SK_BC){ S.bc = {}; S.bc[bc.k] = true; SK_XEM = []; try{ skXem(); }catch(e){ out['sk|'+pv+'|'+bc.k] = 'LỖI '+e.message; continue; }
       for(let i=0;i<40 && !SK_XEM.length;i++) await w(100); try{ dongHop(); }catch(e){}
       out['sk|'+pv+'|'+bc.k] = gon(SK_XEM.map(x=>({h:x.html, a:x.aoa, n:x.ngay}))); } }
   S.xa = ''; S.bc = {qh:true};
   /* tab Tổ: 4 báo cáo × 5 tổ */
   KHO.datKy(await KHO.nap('2026-08')); const dsTo = [...new Set(vay.map(x=>x.to))].slice(0, 5);
   dsTo.forEach(ma=>['ds','no','tk','ct'].forEach(k=>{ try{ out['to|'+ma+'|'+k] = gon(toBaoCao(k, TO_K.to[ma])); }catch(e){ out['to|'+ma+'|'+k] = 'LỖI '+e.message; } }));
   /* Tổng hợp + kiểm Nạp TW */
   TH_K = null; for(const k in TH_KS) delete TH_KS[k]; await thNap('2026-08'); const C = thCH(); C.ky = '2026-08';
   TH_BC.forEach(bc=>{ try{ out['th|'+bc.k] = gon(thBaoCao(bc.k)); }catch(e){ out['th|'+bc.k] = 'LỖI '+e.message; } });
   try{ const ds = []; slKTTW('2026-08', TH_K.B, function(){ ds.push([].slice.call(arguments)); }); out['kttw'] = gon(ds); }catch(e){ out['kttw'] = 'LỖI '+e.message; }
   return out; }, files);
 const bam = Object.fromEntries(Object.entries(R).map(([k, v])=>[k, crypto.createHash('sha1').update(String(v)).digest('hex').slice(0, 16)+' '+String(v).length]));
 const loiBC = Object.entries(R).filter(([k, v])=>/^LỖI /.test(v)).map(([k, v])=>k+': '+v);
 if(process.argv.includes('--chup')){ fs.writeFileSync(CHUP, JSON.stringify(bam, null, 1)); console.log('Đã ghi bản chụp', Object.keys(bam).length, 'báo cáo · lỗi:', loiBC.length, loiBC.slice(0, 5)); await b.close(); return; }
 const cu = JSON.parse(fs.readFileSync(CHUP, 'utf8')), khac = Object.keys(cu).filter(k=>cu[k]!==bam[k]), moi = Object.keys(bam).filter(k=>!(k in cu));
 o.push((Object.keys(bam).length>40 ? '✓ ' : '✗ ')+'đủ báo cáo để so — '+Object.keys(bam).length);
 o.push((!khac.length ? '✓ ' : '✗ ')+'mọi báo cáo GIỐNG HỆT bản chụp (đọc qua kho không đổi kết quả)'+(khac.length ? ' — khác: '+khac.slice(0, 8).join(', ') : ''));
 o.push((!moi.length ? '✓ ' : '✗ ')+'không có báo cáo mới chưa chụp'+(moi.length ? ' — '+moi.join(', ') : ''));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
