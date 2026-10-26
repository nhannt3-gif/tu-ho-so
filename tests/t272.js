// t272 (TK 3, 3.378 — anh 26/10 "nhận xét, tồn tại, kiến nghị cho chọn 3 phần riêng, tự ghi theo số liệu hay để chấm"; "Bảng II chỉ để trống, không chấm trong ô"; Mẫu 04 chia 2 Nhận xét / Kiến nghị).
//   Dữ liệu GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   const chu = h => String(h||'').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.ktIn; delete D.cauHinh.ktKBLuu;
   const K = ktCH(); K.ky='2026-08'; K.xa=''; K.diem=''; K.hoi=''; K.to=''; K.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99');
   const t = ds.find(t=>{ const g = ktGiaTri16(t, [], {nx:'so'}).nx; return g.tt.length && g.kn.length; }) || ds[0]; ktChonTo(t.ma); await w(500);
   const S = D.cauHinh.ktIn = {};
   /* 1. Mẫu 16: Ưu điểm số liệu · Tồn tại chấm · Kiến nghị số liệu */
   S.dx_m16 = {nxud:'so', nxtt:'', nxkn:'so', b2:'dien'}; let v = ktInV('m16'), g = ktGiaTri16(t, [], v), h = chu(ktHTML16(g));
   ok('Mẫu 16: Tồn tại để chấm, Kiến nghị ghi theo số liệu', !g.nx.tt.length && g.nx.kn.length>0 && /2\. Tồn tại: \.{20,}/.test(h) && h.indexOf('- '+g.nx.kn[0])>=0, g.nx.kn.length);
   const bl = await ktDocx('m16', g), zc = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}), fz = XLSX.CFB.find(zc, 'word/document.xml') || XLSX.CFB.find(zc, '/word/document.xml'), d = chu(new TextDecoder().decode(fz.content));
   ok('Word 16: Tồn tại dòng chấm, Kiến nghị có ý ghi sẵn, hết {{', /2\. Tồn tại/.test(d) && !/Tồn tại ?:? ?-/.test(d) && d.indexOf('- '+g.nx.kn[0])>=0 && d.indexOf('{{')<0, (d.match(/2\. T.{0,60}/)||[''])[0]+' | '+d.indexOf('- '+g.nx.kn[0])+' | '+d.indexOf('{{'));
   ok('Bảng II "Điền đầy đủ" → 2 dòng có số ghi sẵn + 14 ô theo 727', !!g.nx.kq1 && !!g.nx.kq2 && g.b2.length===14, g.nx.kq1);
   S.dx_m16 = {nxud:'', nxtt:'so', nxkn:'', b2:''}; g = ktGiaTri16(t, [], ktInV('m16')); h = chu(ktHTML16(g));
   ok('đảo lại: Ưu điểm + Kiến nghị chấm, Tồn tại ghi; Bảng II để trống → 2 dòng có số trống, không dòng chấm trong ô', !g.nx.ud.length && !g.nx.kn.length && g.nx.tt.length>0 && !g.nx.kq1 && !g.nx.kq2 && !g.b2.length && /1\. Ưu điểm: \.{20,}/.test(h));
   /* 2. dữ liệu cũ */
   S.dx_m16 = {nx:''}; v = ktInV('m16');
   ok('lựa chọn cũ "Chấm ghi tay" (nx:"") → cả 3 phần để chấm', v.nxud==='' && v.nxtt==='' && v.nxkn==='');
   S.dx_m16 = {nx:'so', b2:'cham', b2o:{0:{c:'cham'}}}; v = ktInV('m16'); g = ktGiaTri16(t, [], v);
   ok('lựa chọn cũ "Gợi ý" → cả 3 phần ghi; Bảng II "chấm" cũ → để trống (cả bảng + từng ô)', v.nxud==='so' && v.nxtt==='so' && v.nxkn==='so' && v.b2==='' && v.b2o[0].c==='trong' && g.b2.every(s=>!/\.{5}/.test(s)));
   /* 3. hộp chọn khi in */
   S.dx_m16 = {}; ktInHop(['m16', 'm04'], '', ktHoiCuaTo([t])); await w(150);
   const sel = id => document.getElementById(id);
   ok('hộp: Mẫu 16 có 3 ô Ưu điểm / Tồn tại / Kiến nghị, Mẫu 04 có 2 ô Nhận xét / Kiến nghị; không còn ô chung', ['ki-m16-nxud','ki-m16-nxtt','ki-m16-nxkn','ki-m04-nxto','ki-m04-nxkn'].every(i=>sel(i) && sel(i).value==='so') && !sel('ki-m16-nx') && !sel('ki-m04-nx'));
   ok('Bảng II (cả bảng + từng ô) không còn lựa chọn chấm', ![...sel('ki-m16-b2').options].some(o=>o.value==='cham') && ![...sel('ki-m16-b2o-0').options].some(o=>o.value==='cham'));
   sel('ki-m16-nxtt').value = ''; sel('ki-m16-nxtt').dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   sel('ki-m04-nxkn').value = ''; sel('ki-m04-nxkn').dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   ok('đổi ô → lưu riêng từng phần (bộ đột xuất)', S.dx_m16.nxtt==='' && S.dx_m16.nxud==='so' && D.cauHinh.ktIn.m04.nxkn==='' && D.cauHinh.ktIn.m04.nxto==='so' && sel('ki-m16-nxtt').value==='');
   ok('dòng tóm tắt đột xuất ghi từng phần', /Ưu điểm số liệu, Tồn tại chấm, Kiến nghị số liệu/.test(ktDXTom(t)));
   ktInDayDu(); await w(150);
   ok('✚ Điền đầy đủ → mọi phần ghi theo số liệu, Bảng II điền đầy đủ', S.dx_m16.nxtt==='so' && S.dx_m16.b2==='dien' && D.cauHinh.ktIn.m04.nxkn==='so'); dongHop();
   /* 4. Mẫu 04 */
   const a = ktBC04([{t:t}], '', {nxto:'so', nxkn:'', ng1:'', ng2:''})[0], c = ktBC04([{t:t}], '', {nxto:'', nxkn:'so', ng1:'', ng2:''})[0];
   ok('Mẫu 04: Nhận xét ghi + Kiến nghị chấm, và ngược lại', a.nx.length>0 && !(a.kn.a||[]).length && !(a.kn.b||[]).length && !c.nx.length && ((c.kn.a||[]).length+(c.kn.b||[]).length+(c.kn.c||[]).length)>0);
   const h4 = chu(ktHTML04 ? ktHTML04([a]) : '');
   ok('In 04: Kiến nghị b) để chấm (không ý ghi sẵn), nhận xét có', /b\) Đối với Tổ TK&amp;VV c\)/.test(h4) && h4.indexOf(a.nx[0].replace(/&/g, '&amp;').slice(0, 30))>=0, (h4.match(/b\) Đối với Tổ.{0,60}/)||[h4.slice(0,80)])[0]);
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
