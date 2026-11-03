// t366 (3.461, anh 03/11): BIÊN BẢN LÀM VIỆC (BBLV) + bảng chọn món nợ chung HSN (js/mau/0hsn.js) + 06A sửa trình bày / khai báo đủ / in nhiều phiếu.
//   Luật lãi tồn cao: lãi tồn > N tháng lãi, 1 tháng lãi = dư nợ × lãi suất (%/năm) ÷ 100 ÷ 12. Mỗi hộ 1 biên bản trọn 1 trang A4; 1 món → dòng, nhiều món → bảng.
//   Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   slDoiTab('hsv'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hsv-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300);
   pvChon('hsv','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300);
   const tos = pvLuaChon(TO_K.to, C, 'to', true).map(x=>x.k); let to0 = tos.find(k=>HSN.ds(TO_K.to[k]).length>=3) || tos[0];
   pvChon('hsv','to', to0); await w(800);
   const t = KHO.to(hsoCH().to), ds = HSN.ds(t);
   /* luật lãi tồn cao */
   const mGia = {dn:12000000, ls:7.2, ltTH:300000, ltQH:0};   /* 1 tháng lãi = 12tr × 7,2% ÷ 12 = 72.000 → 300.000 ≈ 4,17 tháng */
   ok('lãi tồn cao: 1 tháng lãi = dư nợ × lãi suất năm ÷ 12; > 3 tháng có, > 6 tháng không', Math.abs(HSN.thangLai(mGia)-300000/72000)<1e-9 && HSN.vao(HSN.co(mGia, {}), 'l3') && !HSN.vao(HSN.co(mGia, {}), 'l6') && HSN.vao(HSN.co(mGia, {}), 'qt'));
   ok('lãi suất 0 → không tính số tháng (không vào nhóm lãi tồn cao)', HSN.thangLai({dn:1e7, ls:0, ltTH:5e5})===0);
   /* BBLV */
   hsoChonMau('bblv'); await w(600);
   ok('chip BBLV ở Hồ sơ vay + bảng chọn món + nút nhóm nợ', !!document.querySelector('.hsn-bang') && /Nợ quá hạn/.test(document.getElementById('hso-tuy').textContent) && /⭐ Nợ cần quan tâm/.test(document.getElementById('hso-tuy').textContent), ds.length+' hộ');
   const xem = async()=>{ hsoXem(); await w(2500); const f = document.getElementById('hso-xem-khung'), d = f && f.contentDocument; const tr = d ? [...d.querySelectorAll('.tr-tg')] : []; try{ dongHop(); }catch(e){} await w(300);
     return tr.map(x=>/BIÊN BẢN LÀM VIỆC/.test(x.textContent) ? 'B' : /Trang trắng/.test(x.textContent) ? '_' : '-').join(''); };
   OM_KIEU = 'trang'; let r = hsoLapBblv(t), tg = await xem(); OM_KIEU = 'that';
   ok('bản trắng: 1 trang, mục 1 dạng dòng chấm, 4 dòng thành phần chấm, tỉnh in sẵn', tg==='B' && /Tên chương trình vay: …/.test(r.h) && (r.h.match(/Ông \(bà\) <span class="om om-cham"/g)||[]).length===4 && /tỉnh /.test(r.h), tg);
   HSN.datMot('bblv', ds[0].mon[0].m.ku); HSO.vay.kh = ds[0].k.kh; r = hsoLapBblv(t); tg = await xem();
   ok('1 món: dạng dòng có số liệu, "Dư nợ đến ngày …: gốc … đồng; lãi … đồng.", 1 trang', tg==='B' && /Dư nợ đến ngày <span[^>]*>\d\d\/\d\d\/\d{4}<\/span>: gốc <span[^>]*>[\d.]+<\/span> đồng; lãi/.test(r.h) && !/CT · Số KU/.test(r.h), tg);
   ok('thành phần + chỗ ký mặc định để trống (không tự điền tổ trưởng / khách)', !new RegExp('Ông \\(bà\\): '+tenHoaDau(ds[0].k.ten)).test(r.h) && (r.h.match(/Ông \(bà\) <span class="om om-cham"/g)||[]).length===4);
   ok('tại = địa chỉ khách (ấp, xã, tỉnh), ngày số liệu dd/mm/yyyy liền', /, tại <span[^>]*>[^<]+tỉnh [^<]+<\/span>\./.test(r.h));
   const h2 = ds.find(h=>h.mon.length>=2);
   if(h2){ HSN.datMot('bblv', ''); h2.mon.forEach(x=>HSN.sel('bblv')[x.m.ku] = true); HSO.vay.kh = h2.k.kh; r = hsoLapBblv(t); tg = await xem();
     ok('nhiều món 1 hộ: bảng (CT · Số KU, Mục đích, Cộng), ngày ở tiêu đề mục 1, vẫn 1 trang', tg==='B' && /CT · Số KU/.test(r.h) && /Mục đích/.test(r.h) && />Cộng</.test(r.h) && /số liệu đến ngày <span/.test(r.h), h2.mon.length+' món · '+tg+' · L '+r.L+' lh '+r.lh); }
   HSN.datMot('bblv', ''); ds.forEach(h=>h.mon.forEach(x=>HSN.sel('bblv')[x.m.ku] = true)); r = hsoLapBblv(t); tg = await xem();
   ok('nhiều hộ: mỗi hộ 1 biên bản (1 trang, trang trắng chèn để in 2 mặt)', (r.ds||[]).length===ds.length && tg.replace(/_/g, '')===('B').repeat(ds.length), tg);
   const cbHai = document.querySelector('#hso-tuy input[data-lenh="hsn.hai"]'); cbHai.checked = false; cbHai.dispatchEvent(new Event('change', {bubbles:true})); await w(200); tg = await xem();
   ok('bỏ tích "In 2 mặt" (máy in 1 mặt) → không chèn trang trắng giữa các biên bản', D.cauHinh.ktHaiMat===0 && tg===('B').repeat(ds.length), tg);
   delete D.cauHinh.ktHaiMat; hsoVe(); await w(300);
   omDatCach('bblv', 'kienNghi', 'kb'); omChonDat('bblv', 'kienNghi', 'Đôn đốc khách hàng trả lãi hằng tháng qua Tổ TK&VV'); HSN.datMot('bblv', ds[0].mon[0].m.ku); r = hsoLapBblv(t);
   ok('mục 5 chọn câu gợi ý → in câu + vẫn còn dòng chấm ghi thêm; mặc định mục 2–4 chấm', /5\. Kiến nghị biện pháp xử lý nợ:<\/b> <span class="om om-kb" data-o="kienNghi">Đôn đốc khách hàng trả lãi hằng tháng qua Tổ TK&amp;VV\.<\/span>/.test(r.h) && /2\. Nguyên nhân không trả được nợ:<\/b> <span class="om om-cham"/.test(r.h));
   omDatCach('bblv', 'kienNghi', 'cham');
   /* 06A */
   hsoChonMau('06a'); await w(500);
   ok('06A: khai báo đủ mọi dòng (đoàn kiểm tra, thực tế, sử dụng vốn, ý kiến, ký tên)', ['doan1Ten', 'doan2Cv', 'ttTn', 'ttT105CL', 'dungViec', 'hoaDon', 'saiTien', 'hieuQua', 'traNo', 'ykCB', 'ykKH', 'kyKH', 'kyCB'].every(k=>OM_MAU['06a'].oK[k]) && OM_MAU['06a'].o.length>=39, OM_MAU['06a'].o.length+' ô');
   HSN.datMot('06a', ds[0].mon[0].m.ku); let r6 = hsoLap06a(t);
   ok('06A: "Ông (bà): Tên", Hội không lặp chữ "Hội", ngày đối chiếu dd/mm/yyyy liền, "đồng" liền sau số, khoảng trắng sau ":"', /Ông \(bà\): <span/.test(r6.h) && !/HộiHội|Hội <span[^>]*>Hội/.test(r6.h) && /đến ngày<\/b> <span[^>]*>\d\d\/\d\d\/\d{4}<\/span>:/.test(r6.h) && /Số tiền giải ngân: <span[^>]*>[\d.]+<\/span> đồng\./.test(r6.h));
   ok('06A: tại = địa chỉ khách', /, tại <span[^>]*>[^<]*tỉnh [^<]+<\/span>, chúng tôi gồm/.test(r6.h));
   HSN.datMot('06a', ''); ds[0].mon.concat(ds[1].mon).forEach(x=>HSN.sel('06a')[x.m.ku] = true); r6 = hsoLap06a(t); tg = await xem();
   ok('06A: tích nhiều món → mỗi món 1 phiếu (2 trang / phiếu)', (r6.ds||[]).length===ds[0].mon.length+ds[1].mon.length && tg.replace(/_/g, '').length===2*(r6.ds||[]).length, (r6.ds||[]).length+' phiếu · '+tg.length+' trang');
   hso06aMo(t.ma, ds[1].k.kh, ds[1].mon[0].m.ku); await w(800);
   ok('06A mở từ KTGS (📄 06A): tích sẵn đúng món đó', Object.keys(HSN.sel('06a')).filter(k=>HSN.sel('06a')[k]).join()===ds[1].mon[0].m.ku);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t366 đạt'); await b.close(); process.exit(sai?1:0);
})();
