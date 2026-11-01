// 3.430 (anh chốt 01/11) — Mẫu 06A/TD (727) trong kho mẫu: mỗi món 1 phiếu, số tự điền từ Mẫu 31 GIẢ (tests/gianho31), lãi = lãi tồn tất cả;
//   gọi từ KTGS Mẫu 06 (nút 📄 06A từng món) → tab Hồ sơ vay chọn sẵn người vay + món; chữ mẫu đúng file gốc (so_do.json 06a).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const doan = JSON.parse(fs.readFileSync(path.join(__dirname,'mau_goc','so_do.json'),'utf8'))['06a'].doan;
 const R = await p.evaluate(async([files, doan])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const thang = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort();
   kyChungDoi(thang[thang.length-1]); slDoiTab('hsv'); doiNgan(7); await w(1500);
   ok('kho mẫu có 06A/TD (tab Hồ sơ vay)', !!hsoMauK('06a') && OM_MAU['06a'] && HSO_MAU.hsv.some(m=>m.k==='06a'));
   /* tổ + khách có 2 món còn dư nợ (nếu có) */
   let t=null, k=null; for(const ma of Object.keys(TO_K.to)){ const tt = KHO.to(ma); if(!tt || toLaTT(tt)) continue; const ds = hsoTVTo(tt).filter(x=>x.mon.filter(m=>(m.dn||0)>0).length>0); const k2 = ds.find(x=>x.mon.filter(m=>(m.dn||0)>0).length>1) || ds[0]; if(k2){ t=tt; k=k2; if(k2.mon.filter(m=>(m.dn||0)>0).length>1) break; } }
   ok('bộ giả có tổ + người vay còn dư nợ', !!t && !!k, t && t.ma);
   const mon = k.mon.filter(m=>(m.dn||0)>0), m = mon[mon.length-1];
   hso06aMo(t.ma, k.kh, m.ku); await w(400);
   ok('hso06aMo → tab Hồ sơ vay, mẫu 06A, chọn sẵn người vay + món', nganHienTai===7 && D.cauHinh.slTab==='hsv' && hsoMau().k==='06a' && HSO.vay.kh===k.kh && HSO.vay.ku===m.ku, [nganHienTai, D.cauHinh.slTab, hsoMau().k, HSO.vay.kh===k.kh, HSO.vay.ku===m.ku].join(' '));
   const x = hsoLap(), chu = x.h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   ok('phiếu: tên mẫu + tiêu đề', /Mẫu số: 06A\/TD/.test(chu) && /PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY/.test(chu));
   ok('tự điền: tên, mã KH, số khế ước (món đã chọn, không phải món đầu)', chu.indexOf(k.ten)>=0 && chu.indexOf(k.kh)>=0 && chu.indexOf(m.ku)>=0 && (mon.length<2 || chu.indexOf(mon[0].ku)<0), mon.length+' món');
   ok('tự điền: dư nợ gốc, giải ngân, lãi tồn tất cả (TH+QH), TK 105', chu.indexOf(tdnTien(m.dn))>=0 && (!m.gn || chu.indexOf(tdnTien(m.gn))>=0) && chu.indexOf(tdnTien(laiTon(m)))>=0 && chu.indexOf(k.t105 ? tdnTien(k.t105) : '0')>=0,
     [tdnTien(m.dn), m.gn, tdnTien(laiTon(m)), k.t105].join(' · '));
   ok('mỗi món 1 phiếu: chỉ 1 dòng "Mã món vay"', (chu.match(/Mã món vay/g)||[]).length===1 && x.ds.length===1);
   const nhan = s => s.replace(/[.…]+/g, '·').replace(/\s+/g, ' ').replace(/ ?([:;,)]) ?/g, '$1').trim(), cn = nhan(chu);
   const thieu = doan.filter(d=>{ const a = nhan(d).split('·').map(s=>s.trim()).filter(s=>s.length>3); return a.some(s=>cn.indexOf(s)<0); });
   ok('chữ mẫu đúng file gốc (so_do.json 06a — mọi đoạn)', thieu.length===0, thieu.slice(0, 3).join(' | '));
   ok('lề theo file gốc 20/20/18/27,5', JSON.stringify(hsoMauK('06a').mg)===JSON.stringify(omMg([20, 20, 18, 27.5])));
   { let bl = null; try { bl = await hsoDocx(x); } catch(e){ bl = e.message; } ok('xuất Word được (hsoDocx)', bl && bl.size>3000, bl && (bl.size || bl)); }
   /* món chọn không còn trong kỳ → để chấm, không lấy nhầm món khác */
   HSO.vay.ku = '9999999999'; const y = hsoLap().h; ok('món không còn dư nợ ở kỳ đang mở → ô số để chấm', y.indexOf(m.ku)<0 && y.indexOf(tdnTien(m.dn))<0 || m.dn===0);
   /* nút từ KTGS Mẫu 06 */
   window.KT_GN = {khoa:'gia', thang:['2026-09'], thieu:[], ds:{'2026-09':{[t.ma]:{t:{ma:t.ma, ten:t.ten, xa:t.xa, dv:t.dv}, mon:[Object.assign({}, m, {gnT:1e6, ngn:'2026-09-02'})]}}}, ngay:{}, kh:{}};
   const C = ktCH(), giu = C.to; window.ktGNTrongPV = () => true; C.to = t.ma; const h = ktGNDsHTML(); C.to = giu;
   ok('KTGS Mẫu 06 (chọn đến tổ): mỗi món có nút 📄 06A đúng tổ / khách / món', new RegExp('data-lenh="ktgn.m06a" data-to="'+t.ma+'" data-kh="'+k.kh+'" data-ku="'+m.ku+'"').test(h));
   return o; }, [files, doan]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t349 đạt'); await b.close(); process.exit(sai?1:0);
})();
