// 3.259 — 📒 Bộ thông tin tổ (Sao kê › Thông tin tổ): KQGD từng điểm GD (Mẫu 13/GDX + thông tin tổ) · 3 tháng KHĐ · Nợ QH · Nợ khoanh
//   chia Điểm GD › Hội › Tổ, dòng nhóm mang số cộng; Excel nhiều sheet, dòng cộng + tỷ lệ là công thức. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); await w(300);
   slDoiTab('sk'); doiNgan(7); for(let i=0;i<60 && !SK_K;i++) await w(250); await w(300);
   ok('nhóm "Thông tin tổ" có 2 báo cáo', SK_NHOM.some(n=>n.k==='tt') && SK_BC.filter(b=>b.nhom==='tt').map(b=>b.k).join(',')==='kqgd,bott');
   skChonBC('bott'); await w(400);
   ok('màn Sao kê hiện lựa chọn Bộ thông tin tổ', /Bộ thông tin tổ/.test(document.getElementById('tr7').textContent));
   /* toàn PGD */
   const C = skCH(); C.xa = ''; C.diem = ''; C.hoi = ''; C.to = '';
   skXem(); for(let i=0;i<40 && !document.getElementById('sk-khung');i++) await w(250); await w(800);
   const X = SK_XEM, kq = X.filter(x=>/^KẾT QUẢ GIAO DỊCH/.test(x.tieuDe));
   ok('bộ = các trang KQGD (mỗi điểm 1) + 3 tháng KHĐ + Nợ QH + Nợ khoanh', kq.length>=1 && X.length===kq.length+3 && X.slice(-3).map(x=>x.ten).join('|')==='3 Tháng KHĐ|Nợ QH|Nợ khoanh', X.map(x=>x.ten).join('|'));
   const diemT = new Set(Object.values(SK_K.to).map(t=>t.khoaDiem || ttDiemTen(t)));
   ok('số trang KQGD = số điểm GD có tổ', kq.length===diemT.size, kq.length+' / '+diemT.size);
   const k0 = kq[0], cot = k0.aoa[0];
   ok('KQGD: đủ 24 cột (thêm doanh số, lãi đã nộp, nợ đến hạn theo 13/GDX)', cot.length===24 && cot.indexOf('Doanh số cho vay')>=0 && cot.indexOf('Tiền lãi đã nộp')>=0 && cot.indexOf('Nợ đến hạn tháng sau — Phân kỳ')>=0, cot.length);
   const r1 = k0.aoa[1];
   ok('KQGD: dòng đầu là Hội (cộng) có công thức SUM', /\(\d+ tổ\)$/.test(String(r1[1])) && r1[9] && /^SUM\(J7:J\d+\)$/.test(r1[9].f), JSON.stringify(r1[9]));
   ok('KQGD: tỷ lệ NQH là công thức IFERROR', r1[11] && /^IFERROR\(K6\/J6\*100,0\)$/.test(r1[11].f), JSON.stringify(r1[11]));
   const cong = k0.aoa.find(r=>/^CỘNG \(\d+ tổ\)$/.test(String(r[1])));
   ok('KQGD: dòng CỘNG = tổng các dòng Hội (công thức)', cong && /^J\d+(\+J\d+)*$/.test(cong[9].f), cong && cong[9].f);
   /* đối chiếu dư nợ: tổng các trang KQGD = tổng dư nợ món Mẫu 31 thuộc các tổ */
   const tongKQ = kq.reduce((a, x)=>{ const c = x.aoa.find(r=>/^CỘNG/.test(String(r[1]))); return a + (c ? c[9].v : 0); }, 0);
   let tong31 = 0; Object.keys(SK_K.to).forEach(m=>{ (SK_K.kh[m]||[]).forEach(o=>{ if(o.ku) tong31 += o.dn||0; }); });
   ok('KQGD: tổng dư nợ các điểm = dư nợ món Mẫu 31 của các tổ', Math.abs(tongKQ - tong31) < 1 && tong31>0, tongKQ+' / '+tong31);
   ok('KQGD: có dòng theo chương trình (tên viết tắt hệ thống)', k0.aoa.some(r=>/^· \S+/.test(String(r[1]))), k0.aoa.filter(r=>/^· /.test(String(r[1]))).map(r=>r[1]).slice(0,5).join(' '));
   ok('KQGD in: nghìn đồng, 2 dòng tiêu đề, khổ ngang', /nghìn đồng/.test(k0.html) && /rowspan="2"/.test(k0.html) && k0.ngang===true);
   /* 3 sao kê */
   const khd = X.find(x=>x.ten==='3 Tháng KHĐ'), qh = X.find(x=>x.ten==='Nợ QH'), kn = X.find(x=>x.ten==='Nợ khoanh');
   const dem = (x, re) => x.aoa.filter(r=>re.test(String(r[1]))).length;
   ok('KHĐ: cột như file mẫu (11 cột)', khd.aoa[0].length===11 && khd.aoa[0][2]==='Số khế ước' && khd.aoa[0][10].indexOf('Ghi chú')===0, khd.aoa[0].join('|'));
   ok('KHĐ: nhóm Điểm GD › Hội › Tổ', dem(khd, /^ĐIỂM GD: /)>=1 && dem(khd, /^(Hội|Đoàn|Cho vay trực tiếp|Chưa rõ hội).*\(\d+ tổ, \d+ khoản\)$/)>=1 && dem(khd, /^(Tổ: .*\(Mã \d+\)|Vay trực tiếp|Chưa gắn tổ).* — \d+ hộ, \d+ khoản$/)>=1, [dem(khd, /^ĐIỂM GD/), dem(khd, /khoản\)$/), dem(khd, / hộ, /)].join('/'));
   const nKHD = SK_K.B && slKHD(SK_K.B).filter(skTrongPV).length;
   const dongKHD = khd.aoa.filter(r=>typeof r[0]==='number' && r[0]>0).length;
   ok('KHĐ: đủ số khoản trong phạm vi', dongKHD===nKHD && nKHD>0, dongKHD+' / '+nKHD);
   const toR = khd.aoa.findIndex(r=>/^Tổ: /.test(String(r[1])));
   ok('KHĐ: dòng tổ cộng bằng SUM các dòng của tổ', toR>0 && /^SUM\(H\d+:H\d+\)$/.test(khd.aoa[toR][7].f) && +khd.aoa[toR][7].f.match(/H(\d+):/)[1]===toR+5+1, khd.aoa[toR] && khd.aoa[toR][7].f+' @'+(toR+5));
   const tKHD = khd.aoa[khd.aoa.length-1];
   ok('KHĐ: dòng TỔNG CỘNG = cộng các dòng Điểm GD', /^TỔNG CỘNG/.test(tKHD[1]) && /^H\d+(\+H\d+)*$/.test(tKHD[7].f), tKHD[7].f);
   ok('Nợ QH: 8 cột như file mẫu', qh.aoa[0].join('|')==='STT|Tên khách hàng|Số khế ước|Dư nợ quá hạn|Ngày chuyển quá hạn|Nguồn vốn|Chương trình|Ghi chú (thực trạng / đề xuất)', qh.aoa[0].join('|'));
   ok('Nợ khoanh: 9 cột như file mẫu', kn.aoa[0].join('|')==='STT|Tên khách hàng|Số khế ước|Dư nợ khoanh|Ngày hiệu lực khoanh|Hạn khoanh|Nguồn vốn|Chương trình|Ghi chú (thực trạng / đề xuất)', kn.aoa[0].join('|'));
   const nQH = (SK_K.B.co.nqh||[]).filter(skTrongPV).length, dQH = qh.aoa.filter(r=>typeof r[0]==='number' && r[0]>0).length;
   ok('Nợ QH: đủ số khoản', dQH===nQH, dQH+' / '+nQH);
   /* Excel: sheet theo tên điểm + 3 sheet, công thức giữ */
   let wb = null; const tai0 = window.taiXuongBlob; window.taiXuongBlob = async (bl, ten) => { wb = XLSX.read(new Uint8Array(await bl.arrayBuffer()), {type:'array', cellFormula:true}); wb._ten = ten; };
   skExcel(); for(let i=0;i<20 && !wb;i++) await w(250); window.taiXuongBlob = tai0;
   ok('Excel: 1 sheet mỗi điểm + 3 Tháng KHĐ, Nợ QH, Nợ khoanh', wb && wb.SheetNames.length===X.length && wb.SheetNames.slice(-3).join('|')==='3 Tháng KHĐ|Nợ QH|Nợ khoanh', wb && wb.SheetNames.join('|'));
   const s0 = wb && wb.Sheets[wb.SheetNames[0]];
   ok('Excel: ô cộng Hội có công thức (J6)', s0 && s0.J6 && /^SUM\(J7:J\d+\)$/.test(s0.J6.f || ''), s0 && JSON.stringify(s0.J6));
   dongHop();
   /* phạm vi 1 điểm GD: chỉ 1 trang KQGD */
   const t0 = Object.values(SK_K.to).find(t=>t.diem && !toLaTT(t)); C.xa = t0.xa; C.diem = t0.khoaDiem; C.hoi = ''; C.to = '';
   skXem(); await w(1200);
   ok('chọn 1 điểm GD → 1 trang KQGD + 3 sao kê', SK_XEM.length===4 && /^KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH /.test(SK_XEM[0].tieuDe), SK_XEM.map(x=>x.ten).join('|'));
   dongHop();
   /* chỉ KQGD */
   skChonBC('kqgd'); await w(300); skXem(); await w(1200);
   ok('báo cáo KQGD riêng: chỉ trang KQGD', SK_XEM.length===1 && /^KẾT QUẢ GIAO DỊCH/.test(SK_XEM[0].tieuDe), SK_XEM.length);
   dongHop();
   /* báo cáo cũ không đổi: 1 trang, có ngang theo khổ */
   skChonBC('qh'); await w(300); skXem(); await w(1000);
   ok('sao kê cũ vẫn 1 trang như trước', SK_XEM.length===1 && SK_XEM[0].ten==='Sao kê nợ quá hạn' && typeof SK_XEM[0].ngang==='boolean', SK_XEM.length+' '+SK_XEM[0].ten);
   dongHop(); C.xa = ''; C.diem = '';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
