// 3.118 — Rà mẫu chung (06 / 16 / 04): "Chức vụ:" có hai chấm, chữ sau dòng chấm cách 1 khoảng, đơn vị dài xuống dòng trước "xã / phường",
//        Mẫu 06: Cán bộ chứng kiến ngang Cán bộ kiểm tra, dòng Cộng in đậm; Mẫu 16 / 04: có tên đơn vị thì bỏ dòng "ĐƠN VỊ KIỂM TRA";
//        "(tỷ lệ 0%)"; chức vụ dài viết tắt BTV; Mẫu 04 nơi nhận PGD NHCSXH …; Phân công BTV: đủ ấp của xã theo cây, chia sẵn (Chủ tịch ít hơn), ô nhiệm kỳ / HĐUT.
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
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<w:br\/>/g, '↵').replace(/<\/w:p>/g, '¶').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   /* 1. hàm chung */
   ok('chức vụ vừa chỗ giữ đủ; không vừa → viết tắt BTV / BCH', ktCVGon('Ủy viên Ban Thường vụ', 9000, 27)==='Ủy viên Ban Thường vụ' && ktCVGon('Ủy viên Ban Thường vụ', 3259, 27)==='Ủy viên BTV' && ktCVGon('Ủy viên Ban Chấp hành', 2000, 27)==='Ủy viên BCH' && ktCVGon('Phó Bí thư', 3259, 27)==='Phó Bí thư');
   ok('đơn vị dài → xuống dòng trước "xã / phường"; ngắn giữ 1 dòng', ktTachDV('Đơn vị kiểm tra: ', 'Đoàn Thanh niên xã Truông Giả', 4000)==='Đoàn Thanh niên\nxã Truông Giả' && ktTachDV('Đơn vị kiểm tra: ', 'Hội ND xã A', 4000)==='Hội ND xã A');
   ok('chia ấp: Chủ tịch ≈ nửa phần, dư dồn người trước; ít ấp thì Chủ tịch không nhận', JSON.stringify(ktPCChia(9, 4))==='[1,2,2,2,2]' && JSON.stringify(ktPCChia(11, 4))==='[1,3,3,2,2]' && JSON.stringify(ktPCChia(20, 4))==='[2,5,5,4,4]' && JSON.stringify(ktPCChia(3, 4))==='[0,1,1,1,0]' && JSON.stringify(ktPCChia(5, 2, 1))==='[3,2]');
   /* 2. Mẫu 06 tổ Đoàn */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); const t = ds.find(y=>String(y.dv)==='14') || ds[0], k = ktHoiKhoa(t);
   D.cauHinh.ktHoiKB = D.cauHinh.ktHoiKB || {}; D.cauHinh.ktHoiKB[k] = {ct:'Chủ Giả Một', pct:'Phó Giả Hai', uv1:'Ủy Giả Ba', uv2:'Ủy Giả Bốn'};
   C.xa = t.xa; ktChonTo(t.ma); await w(200); const c = ktChuan(t);
   const g6 = ktGiaTri06(t, ktDaChon(), Object.assign(ktInV('m06'), {ngay:''})), x6 = await docx(await ktDocx('m06', g6)), c6 = chu(x6);
   ok('Word 06 hợp lệ', hopLe(x6) && x6.indexOf('{{')<0);
   ok('"Chức vụ:" có hai chấm; người 2 trống → " Chức vụ" cách dòng chấm', /⇥Chức vụ: /.test(c6) && /2\. Ông \(bà\): ⇥ Chức vụ: /.test(c6));
   ok('Thời điểm trống → " Địa bàn kiểm tra" cách dòng chấm', /Thời điểm kiểm tra: ⇥ Địa bàn kiểm tra: /.test(c6));
   ok('dòng Cộng: số tiền in đậm', ['TGN','TDN'].every(f=>!g6.f[f] || new RegExp('<w:b/><w:bCs/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t xml:space="preserve">'+g6.f[f].replace('.', '\\.')+'<').test(x6)));
   ok('số Cộng dài (1.653,808) → thu cỡ chữ, không xuống dòng; số ngắn giữ cỡ 11', ktCoVua('1.653,808', 992)<22 && ktDoRong('1.653,808', ktCoVua('1.653,808', 992))<=776 && ktCoVua('980', 992)===22 && new RegExp('<w:sz w:val="'+g6.f.SZTDN+'"/><w:szCs w:val="'+g6.f.SZTDN+'"/></w:rPr><w:t xml:space="preserve">'+g6.f.TDN.replace('.', '\\.')).test(x6) && /white-space:nowrap;font-size:/.test(ktHTML06(Object.assign({}, g6, {f:Object.assign({}, g6.f, {TDN:'1.653,808', SZTDN:String(ktCoVua('1.653,808', 992))})}))));
   const ky = x6.slice(x6.lastIndexOf('<w:tbl>')), tcT = ky.match(/<w:tc>[\s\S]*?<\/w:tc>/g)[0];
   ok('Cán bộ chứng kiến ngang Cán bộ kiểm tra: ô trái dòng trống đầu (như "Ngày …"), dòng chấm ra ngoài bảng ký', /^<w:tc><w:tcPr>[\s\S]*?<\/w:tcPr><w:p><w:pPr><w:spacing w:before="60"\/>/.test(tcT) && tcT.indexOf('........')<0 && chu(x6.slice(0, x6.lastIndexOf('<w:tbl>'))).slice(-30).indexOf('.....')>=0);
   const h6 = ktHTML06(g6);
   ok('bản In 06: khối ký canh trên (chứng kiến ngang kiểm tra), Cộng in đậm', /width:50%;vertical-align:top"><p class="kt-i">&nbsp;<\/p><p class="kt-b">CÁN BỘ CHỨNG KIẾN/.test(h6) && /class="kt-c" style="vertical-align:top"><p class="kt-i">Ngày/.test(h6) && /class="s kt-b"/.test(h6) && /margin-right:4pt/.test(h6));
   /* 3. Mẫu 16 */
   const g16 = ktGiaTri16(t, ktDaChon(), Object.assign(ktInV('m16'), {ng1:'pct', ng2:'uv1'})), x16 = await docx(await ktDocx('m16', g16)), c16 = chu(x16);
   ok('Word 16 hợp lệ; có tên đơn vị → bỏ dòng "ĐƠN VỊ KIỂM TRA"', hopLe(x16) && x16.indexOf('{{')<0 && c16.indexOf('ĐƠN VỊ KIỂM TRA')<0 && c16.indexOf(g16.f.DV0)>=0);
   ok('tỷ lệ: "(tỷ lệ …%)" cả nợ quá hạn và nợ khoanh, không dính, không " %"', /nợ quá hạn [^¶]*\(tỷ lệ [^ )]+%\), nợ khoanh [^¶]*\(tỷ lệ [^ )]+%\)/.test(c16) && !/tỷ lệ\S/.test(c16) && !/ %\)/.test(c16), (c16.match(/nợ quá hạn [^¶]*/)||[''])[0]);
   ok('chức vụ Ủy viên Ban Thường vụ dài → "Ủy viên BTV"', /Chức vụ: Ủy viên BTV/.test(c16));
   const h16 = ktHTML16(g16); ok('bản In 16: bỏ nhãn, tên đơn vị lên đầu', h16.indexOf('ĐƠN VỊ KIỂM TRA')<0 && h16.indexOf(coChuHTML(g16.f.DV0))>0 && /\(tỷ lệ [^%]*%\), nợ khoanh .* \(tỷ lệ [^%]*%\)/.test(h16));
   const g16t = ktGiaTri16(t, ktDaChon(), Object.assign(ktInV('m16'), {dv:'-'})), c16t = chu(await docx(await ktDocx('m16', g16t)));
   ok('đơn vị để trống (ghi tay) → giữ "ĐƠN VỊ KIỂM TRA" + dòng chấm', c16t.indexOf('ĐƠN VỊ KIỂM TRA')>=0 && /\.{20}/.test(c16t.slice(0, 300)));
   /* 4. Mẫu 04 */
   C.che='bc'; ktVeThe(); await w(200); ktBCTich(t.ma, true); await w(100); ktBCXem(1); await w(500); const g4 = KT_BC_XEM.gts[0]; dongHop();
   const x4 = await docx(await ktDocx('m04', g4)), c4 = chu(x4);
   ok('Word 04 hợp lệ; nơi nhận "- PGD NHCSXH …;"; bỏ nhãn đơn vị', hopLe(x4) && x4.indexOf('{{')<0 && /- PGD NHCSXH [^.;]+;/.test(c4) && c4.indexOf('ĐƠN VỊ KIỂM TRA')<0 && c4.indexOf(g4.f.DV0)>=0, (c4.match(/- PGD NHCSXH[^¶]*/)||[''])[0]);
   const h4 = ktHTML04(g4); ok('bản In 04: nơi nhận + bỏ nhãn', /- PGD NHCSXH [^<]+;<\/p>/.test(h4) && h4.indexOf('ĐƠN VỊ KIỂM TRA')<0);
   /* 5. Phân công */
   C.che='hdt'; ktVeThe(); await w(200);
   const apXa = new Set(Object.values(KT_K.to).filter(y=>!toLaTT(y) && y.xa===t.xa).map(y=>ktApChu(y.tenThon, y.tenXa)).filter(Boolean)), ap = ktPCAp(k);
   ok('ấp: đủ ấp / khu phố của xã (không chỉ ấp có tổ của Hội)', ap.length===apXa.size && ap.every(a=>apXa.has(a)), ap.length+' ấp');
   ok('ấp xếp theo cây: điểm GD trước, rồi số ấp', ap.every((a, i)=>{ if(!i) return true; const d = y=>Object.values(KT_K.to).filter(z=>!toLaTT(z) && z.xa===t.xa && ktApChu(z.tenThon, z.tenXa)===y).map(z=>String(z.tenDiemDu||'')).sort((m, n)=>m.localeCompare(n, 'vi'))[0]; return d(ap[i-1]).localeCompare(d(a), 'vi')<=0; }));
   delete (D.cauHinh.ktPC||{})[k]; ktPCHop(k); await w(150); const x = ktPCLay(k), sl = ktPCChia(ap.length, 3);
   ok('mở lần đầu → chia sẵn theo thứ tự: Chủ tịch ít hơn, đoạn liền nhau', x.chia===1 && ['ct','pct','uv1','uv2'].map(v=>(x.p[v].ap||[]).length).join()===sl.join() && [].concat(x.p.ct.ap, x.p.pct.ap, x.p.uv1.ap, x.p.uv2.ap).join('|')===ap.join('|'), sl.join('/'));
   const hop = document.getElementById('hop-in');
   ok('hộp có ô Nhiệm kỳ, Số HĐ ủy thác, Ngày ký HĐ + nút Chia lại đều', hop.querySelectorAll('.kt-pc-kb input').length===3 && /Chia lại đều/.test(hop.textContent));
   const ink = hop.querySelector('.kt-pc-kb input'); ink.value = '2022 – 2027'; ink.dispatchEvent(new Event('change')); await w(50);
   ok('sửa nhiệm kỳ trong hộp → lưu khai báo Hội, văn bản ghi theo', ktHoiKB(k).nk==='2022 – 2027' && ktPCNoiDung(k).khoi.some(y=>/nhiệm kỳ 2022 – 2027/.test(y.s)));
   const g = ktPCNoiDung(k), noi = g.khoi.map(y=>y.s).join('\n');
   ok('Chủ tịch có ấp → câu "Trực tiếp thực hiện kiểm tra tại …"', !x.p.ct.ap.length || noi.indexOf('Trực tiếp thực hiện kiểm tra tại '+x.p.ct.ap.join(', '))>=0);
   x.p.ct.ap = []; ok('bỏ hết ấp của Chủ tịch → không có câu đó', ktPCNoiDung(k).khoi.map(y=>y.s).join('\n').indexOf('Trực tiếp thực hiện kiểm tra tại')<0);
   x.p.pct.ap = ['x']; ktPCHop(k); await w(100); ok('mở lại không chia đè lựa chọn tay', ktPCLay(k).p.pct.ap[0]==='x');
   ok('Word phân công hợp lệ', hopLe(await docx(await ktDocx('pc', ktPCNoiDung(k)))));
   dongHop(); C.che='dx'; C.xa=''; C.to='';
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
