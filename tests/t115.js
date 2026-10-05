// 3.111 — Mẫu 06 theo mẫu gốc (tên hoa đầu từ, dòng đầu Thời điểm · Địa bàn · Tổ, Đơn vị tính dòng riêng, cột tiền thu hẹp / Vào việc rộng,
//        1 món 2 dòng ~1,0 cm, CT / mục đích dài nhỏ 1 cỡ, Nợ lãi = lãi tồn, Cộng có tổng) · Mẫu 16 (đầu trang canh giữa, Bảng II điền sẵn / để trống)
//        · ngày ảnh scan khôi phục không vượt hôm nay.
// Bộ GIẢ: tests/gia31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   /* 1. ngày ảnh scan khôi phục */
   const id = t => Math.floor(t).toString(36)+'abcd';
   ok('ngày theo mã ảnh: hôm nay giữ, tương lai / trước 2020 → 0 (lấy hôm nay)', tgTuId(id(Date.now()-3600000))>0 && tgTuId(id(Date.UTC(2036, 5, 1)))===0 && tgTuId(id(Date.UTC(2019, 5, 1)))===0);
   /* 2. Mẫu 06 */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t)); let best = ds[0]; ds.forEach(t=>{ if(toKhach(t).length>toKhach(best).length) best = t; });
   ktChonTo(best.ma); await w(300);
   const hs = KT_CHON.ds.filter(h=>!h.loai).slice(0, 3); KT_CHON.chon = {}; hs.forEach(h=>{ KT_CHON.chon[h.kh] = {ly:'thử', bb:false}; });
   const tenCu = hs[0].ten; hs[0].ten = 'NGUYỄN  VĂN giả';
   hs.forEach((h, i)=>h.mon.forEach(m=>{ m.lt = i===0 ? 1250000 : (i===1 ? 300000 : 0); m.ltTH = 0; m.ltQH = 0; }));
   hs[0].mon[0].ct = 'NSVSMTNT'; hs[0].mon[0].c_ma_pnkt51 = '36000'; hs[0].mon[0].c_ma_pnkt52 = '39000';
   const tP = Object.assign({}, best, {tenThon:'Ấp Lộc Khê', tenXa:'Phường Gia Lộc'});
   const g = ktGiaTri06(tP, ktDaChon(), {dv:'Hội Nông dân phường Gia Lộc', ngay:'2026-10-03', md:'nganh'});
   const r0 = g.rows.find(r=>r.R1==='1' || r.R2) ;
   ok('tên người vay viết hoa đầu từ (app giữ nguyên)', g.rows.some(r=>r.R2==='Nguyễn Văn Giả') && hs[0].ten==='NGUYỄN  VĂN giả', g.rows.map(r=>r.R2).filter(Boolean).join('|'));
   const lt0 = hs[0].mon.length*1.25, lt1 = hs[1].mon.length*0.3;
   ok('cột Nợ lãi = lãi tồn (triệu đồng); hộ không lãi tồn để trống', g.rows.filter(r=>r.R8).length===hs[0].mon.length+hs[1].mon.length && g.rows.some(r=>r.R8==='1,25') && g.rows.some(r=>r.R8==='0,3'), g.rows.map(r=>r.R8).join('|'));
   ok('dòng Cộng có tổng lãi tồn', g.f.TNL===ktTr((lt0+lt1)*1e6, 3), g.f.TNL);
   ok('khoảng dừng 1 dòng: địa bàn ngắn → 1 dòng; dài → Tổ xuống dòng', ktDong3_06({TD:'03/10/2026', DB:'ấp A, xã B, tỉnh Tây Ninh', TO:'Tổ 1'}).mot && !ktDong3_06({TD:'03/10/2026', DB:'khu phố Ninh Thọ Thượng Hạ Đông Tây, phường Gia Lộc Ninh Thạnh, tỉnh Tây Ninh', TO:'Nguyễn Văn Giả Một Hai Ba Bốn'}).mot);
   const d6 = await docx(await ktDocx('m06', g)), c6 = chu(d6);
   ok('Word 06 hợp lệ, hết dấu {{', hopLe(d6) && d6.indexOf('{{')<0);
   ok('cột: tiền thực tế thu hẹp (850), Vào việc rộng 1476', /<w:gridCol w:w="2099"\/><w:gridCol w:w="850"\/><w:gridCol w:w="850"\/><w:gridCol w:w="1476"\/><w:gridCol w:w="850"\/><w:gridCol w:w="850"\/>/.test(d6));
   ok('mỗi dòng món cao tối thiểu 1,0 cm (2 dòng chữ)', (d6.match(/<w:trHeight w:val="567" w:hRule="atLeast"\/>/g)||[]).length===g.rows.length && !/w:val="850" w:hRule="atLeast"/.test(d6));
   const tr = d6.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g).filter(x=>/w:val="567" w:hRule="atLeast"/.test(x)), o3 = x => x.match(/<w:tc>[\s\S]*?<\/w:tc>/g);
   ok('cột Chương trình nhỏ 1 cỡ (10), các cột khác 11', tr.every(x=>/<w:sz w:val="20"\/>/.test(o3(x)[3]) && !/<w:sz w:val="20"\/>/.test(o3(x)[4])));
   const dai = tr.find(x=>/Xử lý ô nhiễm/.test(x));
   ok('mục đích dài → nhỏ 1 cỡ, không cắt chữ', !!dai && /<w:sz w:val="20"\/>/.test(o3(dai)[6]) && /Khai thác, cung cấp nước; Xử lý ô nhiễm, chất thải/.test(chu(o3(dai)[6])));
   ok('Cộng: tổng giải ngân / dư nợ / nợ lãi không rớt chữ (cỡ 11)', /Cộng/.test(c6) && c6.indexOf(g.f.TNL)>0 && /<w:sz w:val="22"\/>[\s\S]{0,200}?<w:t[^>]*>[^<]*<\/w:t>/.test(d6));
   ok('Thời điểm ⇥ Địa bàn ⇥ Tổ; Đơn vị tính dòng riêng; "Chức vụ" không hai chấm', /Thời điểm kiểm tra: 03\/10\/2026⇥Địa bàn kiểm tra: /.test(c6) && /⇥Đơn vị tính: triệu đồng/.test(c6) && !/2026⇥Đơn vị tính/.test(c6) && /Chức vụ [^:]/.test(c6) && !/Chức vụ:/.test(c6));
   const pDV = (d6.match(/<w:p[ >](?:(?!<\/w:p>)[\s\S])*Đơn vị kiểm tra[\s\S]*?<\/w:p>/)||[''])[0];
   ok('"Đơn vị kiểm tra" canh trái', !!pDV && !/<w:jc w:val="(center|both)"\/>/.test(pDV.slice(pDV.lastIndexOf('<w:p'))));
   ok('tiêu đề PHIẾU KIỂM TRA xích xuống (cách trên 10 pt)', /<w:spacing[^>]*w:before="200"[^>]*\/>(?:(?!<\/w:p>)[\s\S])*PHIẾU KIỂM TRA/.test(d6));
   const h6 = ktHTML06(g);
   ok('bản In 06: tên hoa đầu từ, Nợ lãi, mục đích dài nhỏ, dòng 1,0 cm, tổng lãi tồn', /Nguyễn Văn Giả/.test(h6) && /class="nho"[^>]*>[^<]*Xử lý ô nhiễm|nho[^>]*>Khai thác, cung cấp nước/.test(h6) && h6.indexOf('>1,25<')>0 && /28\.35pt/.test(h6) && h6.indexOf(g.f.TNL)>0);
   hs[0].ten = tenCu;
   /* 3. Mẫu 16 */
   const g16 = ktGiaTri16(best, [], {nx:'so'}), g16t = ktGiaTri16(best, [], {nx:'so', b2:''});
   ok('Mẫu 16 Bảng II: mặc định điền sẵn 14 ô theo 727; chọn "để trống" → không điền', g16.b2.length===14 && g16.b2.join('|')===KT_B16.map(x=>x.replace('{ấp}', ktCapAp(best.tenXa))).join('|') && g16t.b2.length===0);
   const d16 = await docx(await ktDocx('m16', g16)), c16 = chu(d16), d16t = await docx(await ktDocx('m16', g16t)), c16t = chu(d16t);
   ok('Word 16 hợp lệ, hết dấu {{ (cả 2 lựa chọn)', hopLe(d16) && hopLe(d16t) && d16.indexOf('{{')<0 && d16t.indexOf('{{')<0);
   ok('Word 16 điền sẵn (3.116): định kỳ theo quý, 4 ô "Không", "Có thực hiện", không còn "đầy đủ"', /định kỳ theo quý/.test(c16) && (c16.match(/Không/g)||[]).length>=4 && /Có thực hiện/.test(c16) && !/định kỳ theo quý/.test(c16t));
   ok('Word 16 đầu trang: ĐƠN VỊ KIỂM TRA canh giữa bằng điểm dừng (1800 / 6350)', /<w:tab w:val="center" w:pos="1800"\/>/.test(d16) && /⇥ĐƠN VỊ KIỂM TRA⇥CỘNG HO/.test(c16));
   const h16 = ktHTML16(g16), h16t = ktHTML16(g16t);
   ok('bản In 16 cùng lựa chọn', /định kỳ theo quý/.test(h16) && !/định kỳ theo quý/.test(h16t));
   const v0 = D.cauHinh.ktBang16; D.cauHinh.ktBang16 = ''; ok('nhớ lựa chọn Bảng II lần sau', ktB16Mac({})==='' && ktB16Mac({b2:'dien'})==='dien'); D.cauHinh.ktBang16 = v0;
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
