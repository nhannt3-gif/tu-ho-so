// t273 (TK 3, 3.379 — anh 26/10 "tóm tắt tình hình tổ … trong 1 mặt A4, để cán bộ đi kiểm tra có thông tin"; "nhớ ghi số liệu đến ngày").
//   js/71 📋 Tóm tắt tổ ở 🎯 Kiểm tra đột xuất. Dữ liệu GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   const chu = h => String(h||'').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/\s+/g, ' ');
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   doiNgan(7); const K = ktCH(); K.ky='2026-08'; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99');
   const t = ds.map(t=>[t, ktttSo(t)]).sort((a, b)=>b[1].ho.length-a[1].ho.length)[0][0]; ktChonTo(t.ma); K.xa = t.xa; K.to = t.ma; ktVeThe(); await w(400);
   for(let i=0;i<40 && !document.querySelector('[data-lenh="kttt.in"]');i++){ if(i===10 && document.getElementById('kt-the')) ktVeThe(); await w(250); }
   const nut = document.querySelector('[data-lenh="kttt.in"]');
   ok('🎯 Đột xuất: có nút 📋 Tóm tắt tổ cạnh 📋 Mẫu 04', !!nut && /Tóm tắt tổ/.test(nut.textContent));
   const x = ktttSo(t), s = ktSoTo(t), h = ktttHTML(x), c = chu(h);
   ok('ghi "số liệu đến ngày" theo ngày số liệu đang chọn', c.indexOf('số liệu đến ngày '+ngayVNsl(s.ngay || KT_K.ngay))>=0, (c.match(/số liệu đến ngày [^,)]*/)||[''])[0]);
   ok('đầu trang: tên tổ, mã tổ, Hội', c.indexOf('mã '+t.ma)>=0 && c.indexOf(ktHoiTen(t))>=0);
   ok('I. Tổng quan: 8 ô số, dư nợ + số tổ viên khớp ktSoTo', (h.match(/<div>[^<]*: <b/g)||[]).length===8 && c.indexOf('Dư nợ: '+ktTr(s.dn)+' tr')>=0 && c.indexOf(s.stv+' tổ viên')>=0);
   const tong = x.ct.reduce((a, k)=>a+k[1], 0);
   ok('II. Dư nợ theo chương trình cộng lại = dư nợ tổ', Math.abs(tong-s.dn)<1, tong+' / '+s.dn);
   ok('III. hộ cần quan tâm xếp ưu tiên (quá hạn / khoanh trước), mỗi hộ có vấn đề', x.ho.length>0 && x.ho.every((y, i)=>!i || x.ho[i-1].uu<=y.uu) && x.ho.every(y=>y.v.length), x.ho.length+' hộ');
   const qh = ktHo(t).filter(h=>h.qh>0).length;
   ok('hộ quá hạn đều có trong bảng, ghi đỏ', x.ho.filter(y=>y.uu===1).length>=qh && (!qh || /class="do">Quá hạn/.test(h)));
   ok('IV. 4 nhóm nội dung căn cứ 727 có ô ☐; V. Kết quả kiểm tra thực tế, đề nghị', /IV\. Nội dung kiểm tra \(căn cứ văn bản 727\)/.test(c) && (c.match(/☐/g)||[]).length===10 && /V\. Kết quả kiểm tra thực tế, đề nghị/.test(c));
   /* nhiều hộ → cắt 18 + "và n hộ khác" */
   const nhieu = Object.assign({}, x, {ho:Array.from({length:25}, (_, i)=>({kh:'K'+i, ten:'Hộ Giả '+i, dn:1e7, v:[{chu:'Lãi tồn 1 đ'}], uu:3}))});
   const hn = chu(ktttHTML(nhieu));
   ok('nhiều hộ: in 18 hộ ưu tiên + "… và 7 hộ khác", chữ bảng nhỏ lại', /Hộ Giả 17 /.test(hn) && !/Hộ Giả 18 /.test(hn) && /và 7 hộ khác/.test(hn) && /class=" nho"/.test(ktttHTML(nhieu)));
   window.__in = null; const goc = window.inBlob; window.inBlob = (bl, ten)=>{ window.__in = ten; };
   if(nut) nut.click(); await w(200); window.inBlob = goc;
   ok('bấm nút → In / PDF, tên file có ngày số liệu', /^Tom tat to .+ - so lieu \d\d-\d\d-\d{4}\.html$/.test(window.__in||''), window.__in);
   /* định kỳ (anh "áp cho kiểm tra định kỳ và đột xuất luôn") */
   const t2 = ds.find(y=>y.xa===t.xa && y.ma!==t.ma) || ds.find(y=>y.ma!==t.ma);
   K.che = 'dk'; K.xa = t.xa; KT_DK_CHON = {}; KT_DK_CHON[t.ma] = true; KT_DK_CHON[t2.ma] = true; ktVeThe();
   for(let i=0;i<40 && !document.querySelector('[data-lenh="kttt.dk"]');i++) await w(250);
   const nDK = document.querySelector('[data-lenh="kttt.dk"]'), nDong = document.querySelector('[data-lenh="kttt.in"][data-m="'+t.ma+'"]');
   ok('📅 Định kỳ: mỗi dòng tổ có 📋 + nút "📋 Tóm tắt 2 tổ"', !!nDong && !!nDK && /Tóm tắt 2 tổ/.test(nDK.textContent), nDK && nDK.textContent);
   let kq = null; const goc2 = window.inBlob; window.inBlob = (bl, ten)=>{ kq = {bl, ten}; };
   nDK.click(); for(let i=0;i<20 && !kq;i++) await w(100);
   const hd = kq ? await kq.bl.text() : '', cd = chu(hd);
   ok('bấm → 1 file In / PDF, mỗi tổ 1 trang (2 phần), số liệu đến ngày cuối tháng', !!kq && /^Tom tat to 2 to - so lieu /.test(kq.ten) && (hd.match(/<section class="kttt">/g)||[]).length===2 && /\.kttt\+\.kttt\{break-before:page\}/.test(hd) && cd.indexOf('số liệu đến ngày '+ngayVNsl(tdnCuoiKy(KT_K.ky)))>=0, kq && kq.ten);
   kq = null; nDong.click(); for(let i=0;i<20 && !kq;i++) await w(100);
   ok('📋 ở dòng tổ → tóm tắt riêng tổ đó', !!kq && (await kq.bl.text()).indexOf('mã '+t.ma)>=0 && !/ 2 to /.test(kq.ten), kq && kq.ten);
   window.inBlob = goc2; K.che = 'dx'; KT_DK_CHON = {};
   return {o, h}; }, files);
 R.o.forEach(x=>o.push(x));
 /* 1 mặt A4 với tổ nhiều hộ nhất của bộ giả */
 const q = await b.newPage(); await q.setContent(R.h); const pdf = await q.pdf({format:'A4', preferCSSPageSize:true}); if(process.env.KTTT_ANH){ await q.setViewportSize({width:820, height:1160}); await q.screenshot({path:process.env.KTTT_ANH, fullPage:true}); }
 const so = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)||[]).length;
 o.push((so===1 ? '✓ ' : '✗ ')+'vừa 1 mặt A4 — '+so+' trang');
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
