// 3.85 — đồng bộ Số liệu qua Drive giả: máy A nạp → đẩy; máy B kéo chỉ mục + danh bạ, mở bộ (tải bảng khi cần); thay file → bản cũ vào thùng rác; xóa ô lan sang máy khác
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[];
 const mo = async()=>{ const ctx=await b.newContext({viewport:{width:1366,height:800}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ'; });
   return p; };
 const files = fs.readdirSync(path.join(__dirname,'gianho')).map(n=>({n, b:fs.readFileSync(path.join(__dirname,'gianho',n)).toString('base64')}));
 const A = await mo();
 const ra = await A.evaluate(async(files)=>{ const o={};
   const F = files.map(f=>{ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], f.n); });
   for(const f of F){ const kq = await slDocFile(f); await slGhi(kq); }
   await slDay(); o.choDay = Object.keys(SLM.bang).filter(k=>SLM.bang[k].choDay).length;
   o.goc = Object.keys(SLM.bang).filter(k=>SLM.bang[k].goc && SLM.bang[k].dl).length+'/'+Object.keys(SLM.bang).length;
   const con=[]; for(const k in SLM.bang){ con.push(await docFile('sl_g_'+SLM.bang[k].loai+'_'+SLM.bang[k].ky)); } o.gocTrongMay = con.filter(Boolean).length;
   return o; }, files);
 const tenDrive = Object.values(drive.F).filter(f=>!f.folder && !f.trashed).map(f=>drive.duong(f.id)).sort();
 console.log('A:', JSON.stringify(ra)); console.log('Drive:\n   '+tenDrive.join('\n   '));
 const B = await mo();
 const rb = await B.evaluate(async()=>{ const o={}; await slNap(); const n = await slTaiTuDrive(); o.keo = n+' ô · KH '+SL_TIM.length;
   const c = slTimKH('tran thi')[0]; o.tim = !!c;
   const Bo = await slBo('2026-08'); o.bo = Object.keys(Bo.co).join(',')+' · món '+Object.keys(Bo.mon).length;
   o.dc = slDoiChieu(Bo).map(x=>(x.ok?'✓':'✗')+x.ten).join(' | ');
   return o; });
 console.log('B:', JSON.stringify(rb));
 // A thay file NK (bản khác) → cũ vào thùng rác; xóa ô TT → B mất ô TT sau khi kéo
 const ra2 = await A.evaluate(async(files)=>{ const o={};
   const f = files.find(x=>/Khoanh/.test(x.n)); const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i);
   const kq = await slDocFile(new File([u, new Uint8Array([0])], 'No khoanh 31-08-2026.xlsx')); o.thayLoi = kq.loi||'';
   if(!kq.loi){ const cu = SLM.bang['nk|2026-08'].dl; await slGhi(kq); await slDay(); o.cuDl = cu; }
   const e = SLM.bang['tt|2026-08']; SLM.xoa['tt|2026-08']=new Date().toISOString(); delete SLM.bang['tt|2026-08']; await slLuuMeta(); await slDay();
   return o; }, files);
 console.log('A thay/xóa:', JSON.stringify(ra2), '· file cũ trong thùng rác Drive:', ra2.cuDl ? !!drive.F[ra2.cuDl].trashed : '?');
 const rb2 = await B.evaluate(async()=>{ const n = await slTaiTuDrive(); return 'kéo '+n+' · còn TT? '+!!SLM.bang['tt|2026-08']+' · NK canTai '+!!(SLM.bang['nk|2026-08']||{}).canTai; });
 console.log('B sau:', rb2); console.log('lỗi', loi); await b.close(); })();
