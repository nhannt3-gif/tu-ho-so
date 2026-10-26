// t275 (TK 3, 3.381 — anh 26/10 "khi nạp dữ liệu dùng khóa liên kết thành 1 data hoàn chỉnh, mọi truy vấn lấy qua kho; data chuẩn lấy nguyên bản Mẫu 31,
//   bổ sung số TK 105, 104, không đổi bất cứ gì"). js/73 KHO CHUẨN: gốc không bị sửa, gắn thêm đúng khóa, toKhach / hoVay đọc qua kho cho KẾT QUẢ NHƯ CŨ. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[]; window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   const K0 = await KHO.nap('2026-08'), vay = K0.B.co.hstd.filter(x=>x.ku && x.to && (x.dn||0)>0), k1 = vay[0].kh, k2 = vay[1].kh;
   const sk = (kh, stk, cuoi, dau, sp) => ['', '004820', '900000', '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, dau, sp, '01/01/2024', '31/08/2026'];
   const nap = async (aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); const kq = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!kq.loi) await slGhi(kq); return kq; };
   const dau = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']];
   await nap(dau.concat([sk(k1, '0010000001', 200000, 100000, '105'), sk(k1, '0010000011', 50000, 0, '105'), sk(k2, '0010000002', 70000, 70000, '105')]), 'Sao_ke_TK_105_31-08-2026.XLSX');
   await nap(dau.concat([sk(k2, '1040000002', 900000, 800000, '104')]), 'Sao_ke_TK_104_31-08-2026.XLSX');
   for(const k in TO_KS) delete TO_KS[k]; const K = KHO.datKy(await KHO.nap('2026-08'));
   const goc = JSON.stringify(K.B.co.hstd);
   /* toKhach cũ (trước 3.381) — tham chiếu */
   const cu = t => { const ds = (K.kh[t.ma]||[]), lap = {}, kh = {}; (K.lap||[]).forEach(o=>{ if(o.to===t.ma) (lap[o.kh] = lap[o.kh]||[]).push(o); });
     ds.forEach(o=>{ const k = kh[o.kh] = kh[o.kh] || {kh:o.kh, ten:o.ten||'', mon:[], dn:0, qh:0, kn:0, lt:0, t105:0, stk:[], coTK:false}; if(!k.ten && o.ten) k.ten = o.ten;
       if(o.ku){ k.mon.push(o); k.dn += o.dn||0; k.qh += o.qh||0; k.kn += o.kn||0; k.lt += laiTon(o); }
       [o].concat(lap[o.kh]||[]).forEach(x=>{ if((x.t105||0) > k.t105) k.t105 = x.t105; if(slCoTK(x.stk)) k.coTK = true; slStk(x.stk).forEach(z=>{ if(k.stk.indexOf(z)<0) k.stk.push(z); }); }); });
     return Object.keys(kh).sort().map(m=>{ const k = kh[m]; k.stk = slStkKH(m, k.stk); return k; }); };
   const dsTo = Object.values(K.to); let lech = 0, nKH = 0;
   dsTo.forEach(t=>{ const a = JSON.stringify(cu(t)), m = toKhach(t); nKH += m.length; if(a!==JSON.stringify(m)) lech++; });
   ok('toKhach đọc qua KHO CHUẨN: mọi tổ, mọi khách giống hệt cách cũ', lech===0 && nKH>0, dsTo.length+' tổ · '+nKH+' khách · lệch '+lech);
   const c = KHO.kc();
   ok('kho chuẩn: gốc = đúng mảng dòng Mẫu 31 của kỳ (không chép, không lọc), chỉ mục KH / KU / tổ', c.dong===K.B.co.hstd && c.theoKH===K.B.theoKH && c.theoKU===K.B.mon && c.theoTo===K.kh);
   const x1 = KHO.kcKH(k1), x2 = KHO.kcKH(k2);
   ok('gắn thêm theo mã KH: TK 105 (2 TK) · TK 104; tổ theo mã tổ', x1.tk105.length===2 && x1.tk105.map(z=>z.stk).join()==='0010000001,0010000011' && x2.tk104.length===1 && x2.tk104[0].stk==='1040000002' && x1.to && x1.to.ma===vay[0].to, JSON.stringify([x1.tk105.length, x2.tk104.length, x1.to && x1.to.ma]));
   const kuQH = Object.keys(K.B.nqh)[0], u = KHO.kcKU(kuQH);
   ok('gắn thêm theo số KU: dòng Mẫu 31 + Nợ quá hạn', !kuQH || (u.nqh===K.B.nqh[kuQH] && u.dong===K.B.mon[kuQH]), kuQH);
   const n = kcNguon(K);
   ok('kho ghi kỳ từng nguồn đã nối', n.hstd && n.tk105==='2026-08-31' && n.tk104==='2026-08-31', JSON.stringify(n));
   const tA = vay[0].to, hv = KHO.hoVay(tA), hk = KHO.hoVayKH(k1);
   ok('KHO.hoVay đọc qua kho chuẩn: khách 2 TK cộng số dư (250.000)', hk && hk.tk.cuoi===250000 && hk.tk.dau===100000 && hv.some(y=>y.kh===k1), hk && JSON.stringify(hk.tk));
   /* gọi đủ các truy vấn rồi so gốc */
   dsTo.forEach(t=>{ toKhach(t); KHO.hoVay(t.ma); }); Object.keys(K.B.theoKH).forEach(k=>KHO.kcKH(k));
   ok('KHÔNG đổi dữ liệu gốc: dòng Mẫu 31 sau mọi truy vấn giống hệt lúc nạp', JSON.stringify(K.B.co.hstd)===goc);
   ok('KU hủy giữ riêng (không mất), dòng TK riêng / khách ra tổ ở lap', Array.isArray(c.huy) && Array.isArray(c.lap));
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
