// t263 (TK 3, 3.343 — KE_HOACH_DIEN_THOAI_2 bước Đ1; anh 24/10 "tra cứu KH của TK 2 đang làm rất ổn, em dựa vào đó làm bản cho điện thoại"):
//   trang Khách điện thoại: Tìm theo (Tự nhận · Tên · Vợ/chồng · CCCD · Mã KH · SĐT · Khế ước · Tổ trưởng, nhớ lựa chọn), danh sách tên + tình trạng chữ nhỏ,
//   thẻ khách (5 ô số có lãi tồn, đến hạn tô màu đỏ / cam / vàng + GH, gọi / Zalo), thẻ tổ (thành viên, có / không dư nợ, tổ trưởng + mã KH TT), Vừa xem. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const g = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); return gxLapTu(await KHO.nap(gxKyMoi())); }, files);
 /* gói có trường mới: lãi tồn món [9], cờ gia hạn [10], mã KH tổ trưởng */
 const mon0 = g.kh.find(k=>k[10].length)[10][0];
 ok('gói xem có lãi tồn món + cờ GH (nối cuối) + mã KH tổ trưởng', mon0.length===11 && typeof mon0[9]==='number' && Object.values(g.to).some(t=>'ttKH' in t), JSON.stringify(mon0));
 /* chỉnh hạn 3 món của 1 khách để thấy màu: quá hạn / 10 ngày / 60 ngày (+ 1 món GH) */
 const kx = g.kh.find(k=>k[10].filter(m=>m[4]>0).length>=1), ngay = d=>{ const x = new Date(); x.setDate(x.getDate()+d); return x.toISOString().slice(0, 10); };
 const ds0 = kx[10].filter(m=>m[4]>0); ds0[0][7] = ngay(-5); if(ds0[1]){ ds0[1][7] = ngay(10); ds0[1][10] = 1; } kx[10].push(['XX', '9990001', '2026-01-01', 1e6, 1e6, 0, 0, ngay(60), '', 12345, 0]);
 await p.close();
 const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
 const d = await ctx.newPage(); d.on('pageerror', e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 const w = t=>d.waitForTimeout(t);
 await d.goto('file://'+G+'/dt.html'); await w(2500); await d.evaluate(()=>{ try{ DTG.app().dialog.close(); }catch(e){} });
 await d.evaluate(g=>DT.napGoi(g), g); await w(800);
 const chip = () => d.$$eval('.page-current .dt-chip', x=>x.map(e=>e.textContent+(e.classList.contains('bat') ? '*' : '')));
 ok('8 chip Tìm theo, mặc định Tự nhận', (await chip()).join('|')==='Tự nhận*|Tên KH|Vợ/chồng|CCCD|Mã KH|SĐT|Khế ước|Tổ trưởng', (await chip()).join('|'));
 const go = async (t, v)=>{ if(t) await d.click('.page-current .dt-chip[data-t="'+t+'"]'); await w(300); await d.fill('#dt-tim', v); await w(500); return d.$$eval('#dt-kq li', x=>x.map(e=>e.textContent.replace(/\s+/g, ' ').trim())); };
 const kvc = g.kh.find(k=>k[8] && k[8]!==k[1]);
 let r = await go('vc', kvc[8].split(' ').pop().toLowerCase());
 ok('Tìm theo Vợ/chồng → ra khách có vợ/chồng tên đó', r.some(x=>x.indexOf(kvc[1])>=0), r.length+' dòng');
 const kten = g.kh.find(k=>k[10].some(m=>m[4]>0)); r = await go('ten', kten[1]);
 ok('Tìm theo Tên KH → ra khách, có tình trạng chữ nhỏ sau tên (vay n món / quá hạn / tất nợ)', r.some(x=>x.indexOf(kten[1])>=0) && r.every(x=>/vay \d+ món|quá hạn|tất nợ|chỉ gửi TK/.test(x)), r[0]);
 r = await go('cccd', String(kten[3]).slice(-6));
 ok('Tìm theo CCCD (6 số cuối) → đúng khách', r.some(x=>x.indexOf(kten[1])>=0), r.length+' dòng');
 r = await go('ku', String(kx[10][0][1]).slice(-5));
 ok('Tìm theo Khế ước (5 số cuối) → khách có món đó', r.some(x=>x.indexOf(kx[1])>=0), r.length+' dòng');
 await d.reload(); await w(2500); await d.evaluate(g=>{ try{ DTG.app().dialog.close(); }catch(e){} return DT.napGoi(g); }, g); await w(600);
 ok('nhớ lựa chọn Tìm theo sau khi mở lại (Khế ước)', (await chip()).indexOf('Khế ước*')>=0, (await chip()).join('|'));
 /* thẻ khách */
 r = await go('ma', kx[0]); await d.click('#dt-kq li a'); await w(900);
 const the = await d.textContent('.page-current');
 ok('thẻ khách: 5 ô số (Dư nợ · Món còn nợ · Quá hạn · Khoanh · Lãi tồn)', (await d.$$('.page-current .dt-oso>div')).length===5 && /Lãi tồn/.test(the));
 const han = await d.$$eval('.page-current .dt-han', x=>x.map(e=>e.className+'|'+e.textContent));
 ok('đến hạn tô màu: quá hạn đỏ · ≤ 30 ngày cam (GH) · ≤ 90 ngày vàng', han.some(x=>/dt-han-do\|.*quá 5 ngày/.test(x)) && (!ds0[1] || han.some(x=>/dt-han-cam\|.*GH.*còn 10 ngày/.test(x))) && han.some(x=>/dt-han-vang\|.*còn 60 ngày/.test(x)), han.join(' ; '));
 ok('món có lãi tồn ghi "Lãi tồn"; mã KH / khế ước bấm để chép', /Lãi tồn 12\.345 đ/.test(the) && (await d.$$('.page-current .dt-chep')).length>=2);
 ok('Tổ & địa bàn: có lối sang thẻ tổ', !!(await d.$('.page-current a[href^="/to/"]')));
 await d.click('.page-current a[href^="/to/"]'); await w(900);
 const tto = await d.textContent('.page-current'), tg = g.to[kx[7]], nTV = g.kh.filter(k=>k[7]===kx[7]).length;
 ok('thẻ tổ: 5 ô số (Thành viên = số khách của tổ, Có / Không dư nợ, Tổng dư nợ, Quá hạn) + tổ trưởng, mã KH TT', (await d.$$('.page-current .dt-oso>div')).length===5 && new RegExp(nTV+'\\s*Thành viên').test(tto) && /Mã KH TT|Tổ trưởng/.test(tto), nTV+' TV');
 ok('thẻ tổ: danh sách thành viên bấm mở khách', (await d.$$('.page-current a[href^="/kh/"]')).length===nTV);
 /* tìm tổ trưởng */
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/', {reloadAll:true})); await w(700);
 r = await go('tt', String(tg.tt || tg.ten).split(' ').pop().toLowerCase());
 ok('Tìm theo Tổ trưởng → danh sách tổ (tên TT · mã tổ · số TV)', r.some(x=>x.indexOf(tg.tt || tg.ten)>=0 && /TV/.test(x)), r[0]);
 r = await go('tt', kx[7]); ok('Tổ trưởng theo mã tổ (số) → đúng tổ', r.length>=1 && r[0].indexOf(kx[7])>=0, r[0]);
 await go('tt', ''); r = await d.$$eval('#dt-kq li', x=>x.length);
 ok('Tổ trưởng để trống → hiện các tổ', r>10, r+' tổ');
 /* tự nhận: gợi ý sang tổ + Vừa xem */
 await d.click('.page-current .dt-chip[data-t="tu"]'); await w(300); await d.fill('#dt-tim', ''); await w(400);
 ok('ô tìm trống → "Vừa xem" có khách vừa mở', /Vừa xem/.test(await d.textContent('#dt-kq')) && (await d.textContent('#dt-kq')).indexOf(kx[1])>=0);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
