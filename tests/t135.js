// 3.140.1 — Mẫu 06 số tiền: 2 số lẻ (nợ lãi dưới 5.000 đ giữ 3 số lẻ), ô số tiền canh phải + lề ô hẹp, cỡ chữ tự thu theo đúng bề rộng ô (1,3 cm)
//          → số dài (1.178,4 · 128,56 · 12.345,67) nằm 1 dòng; dòng Cộng tính từ số gốc. Word + bản In.
// Bộ GIẢ: tests/gia31. Đối số: thư mục ghi file Word để mở thử (tùy chọn).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), ra=process.argv[2];
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)), tep={};
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   const b64 = async bl => { const u = new Uint8Array(await bl.arrayBuffer()); let s = ''; for(let i=0;i<u.length;i++) s += String.fromCharCode(u[i]); return btoa(s); };
   /* 1. hàm */
   ok('2 số lẻ: 65,556 tr → 65,56 · 1.178,4 giữ', ktTr(65556000, 2)==='65,56' && ktTr(1178400000, 2)==='1.178,4');
   ok('nợ lãi: 417.000 đ → 0,42 · dưới 5.000 đ giữ 3 số lẻ (4.000 → 0,004) · 5.000 → 0,01', ktTr06Lai(417000)==='0,42' && ktTr06Lai(4000)==='0,004' && ktTr06Lai(5000)==='0,01');
   const vua = (v, o, dam) => ktDoRong(v, ktCoTien06(v, o, dam), !dam) <= o-2*KT06_LE_TIEN-20;
   ok('Cộng 1.178,4 (đậm, ô 737) → thu cỡ, vừa 1 dòng', ktCoTien06('1.178,4', 737, true)<22 && ktCoTien06('1.178,4', 737, true)>=18 && vua('1.178,4', 737, true), ktCoTien06('1.178,4', 737, true));
   ok('Cộng 1.220 / 980 giữ cỡ 11', ktCoTien06('1.220', 737, true)===22 && ktCoTien06('980', 737, true)===22);
   ok('Cộng 12.345,67 vừa 1 dòng (cỡ ≥ 8)', vua('12.345,67', 737, true), ktCoTien06('12.345,67', 737, true));
   ok('dòng hộ 65,56 / 100 giữ cỡ 11; 128,56 vừa 1 dòng', ktCoTien06('65,56', 737)===22 && ktCoTien06('100', 737)===22 && vua('128,56', 737), ktCoTien06('128,56', 737));
   ok('nợ lãi Cộng (ô 794) 12,35 cỡ 11', ktCoTien06('12,35', 794, true)===22);
   /* 2. phiếu thật từ bộ giả */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); const t = ds[0];
   C.xa = t.xa; ktChonTo(t.ma); await w(200);
   const g6 = ktGiaTri06(t, ktDaChon(), Object.assign(ktInV('m06'), {ngay:''}));
   ok('dòng hộ: giải ngân / dư nợ tối đa 2 số lẻ', g6.rows.length>0 && g6.rows.every(r=>!/,\d{3}$/.test(r.R5||'') && !/,\d{3}$/.test(r.R6||'')), g6.rows.length+' dòng');
   ok('Cộng tính từ số gốc rồi làm tròn 2 số lẻ', g6.f.TDN===ktTr(ktDaChon().reduce((s, h)=>s+h.mon.reduce((a, m)=>a+(m.dn||0), 0), 0), 2));
   /* số dài cài vào để kiểm bố cục */
   g6.rows[0].R5 = '128,56'; g6.rows[0].R6 = '128,56'; g6.rows[0].R8 = '0,004';
   g6.f.TGN = '1.178,4'; g6.f.TDN = '12.345,67'; g6.f.TNL = '12,35'; ['TGN', 'TDN', 'TNL'].forEach(k=>{ g6.f['SZ'+k] = String(ktCoTien06(g6.f[k], KT06_O_TIEN[k], true)); });
   const bl = await ktDocx('m06', g6), x6 = await docx(bl); tep.m06 = await b64(bl);
   ok('Word 06 hợp lệ, không sót {{', hopLe(x6) && x6.indexOf('{{')<0);
   const tcCo = v => (x6.match(new RegExp('<w:tc>(?:(?!</w:tc>)[\\s\\S])*?<w:t xml:space="preserve">'+v.replace(/\./g, '\\.')+'</w:t>[\\s\\S]*?</w:tc>', 'g')) || []);
   const phai = v => { const L = tcCo(v); return L.length>0 && L.every(tc=>/<w:tcMar><w:left w:w="30" w:type="dxa"\/><w:right w:w="30" w:type="dxa"\/><\/w:tcMar>/.test(tc) && tc.indexOf('<w:jc w:val="right"/>')>=0 && !/<w:jc w:val="(both|left|center)"\/>/.test(tc)); };
   ok('ô số tiền dòng hộ canh phải, lề ô 30 (128,56 · 0,004)', phai('128,56') && phai('0,004'));
   ok('ô số tiền dòng Cộng canh phải, lề ô 30, cỡ đã thu', phai('1.178,4') && phai('12.345,67') && phai('12,35') && new RegExp('<w:sz w:val="'+g6.f.SZTGN+'"/><w:szCs w:val="'+g6.f.SZTGN+'"/></w:rPr><w:t xml:space="preserve">1\\.178,4<').test(x6));
   ok('tcMar đứng trước vAlign (đúng thứ tự Word)', !/<w:vAlign [^>]*\/><w:tcMar>/.test(x6));
   ok('chỉ 3 ô số tiền mỗi dòng đổi lề (Họ tên / Mục đích giữ)', (x6.match(/<w:tcMar>/g)||[]).length===g6.rows.length*3+3, (x6.match(/<w:tcMar>/g)||[]).length);
   /* 3. bản In */
   const h6 = ktHTML06(g6);
   ok('bản In: ô số tiền canh phải, 1 dòng (nowrap), cỡ theo ô', /<td class="s" style="white-space:nowrap;padding:1pt 1\.5pt;font-size:11pt">128,56<\/td>/.test(h6) && new RegExp('white-space:nowrap;padding:1pt 1\\.5pt;font-size:'+(+g6.f.SZTGN/2)+'pt">1\\.178,4<').test(h6));
   /* 4. mẫu trắng không lỗi */
   const xt = await docx(await ktDocx('m06', ktTrang06GT('mot'))); ok('Mẫu 06 trắng vẫn hợp lệ', hopLe(xt) && xt.indexOf('{{')<0);
   return {o, tep};
 }, files);
 R.o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 if(ra){ fs.mkdirSync(ra, {recursive:true}); Object.keys(R.tep).forEach(k=>fs.writeFileSync(path.join(ra, 't135_'+k+'.docx'), Buffer.from(R.tep[k], 'base64'))); }
 const sai = R.o.filter(x=>x[0]==='✗').length; console.log((R.o.length-sai)+'/'+R.o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
