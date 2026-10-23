// 3.333 (anh chốt 23–24/10) — QT-18 thành viên chuẩn (KHO.tvChuan) · Tra cứu KH khung cố định + khối Tổ & địa bàn (mã tổ, tổ trưởng + mã KH chép được, số TV)
//   · bảng tổ của điểm GD theo Hội (cộng Hội / điểm, ngưỡng QĐ 70: 20–100) · 👪 kết nạp gọi form Hộ vay có sẵn · chip 7 màu. Bộ GIẢ tests/gianho31 (+ Mẫu 01/TV giả dựng trong trang).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); dhSL('tra'); for(let i=0;i<60 && !TC_K;i++) await w(200); await w(800);
   /* 1. QT-18 không có 01/TV = đúng tổ viên Mẫu 31 */
   const t = Object.values(TC_K.to).find(t=>!t.trucTiep && !toLaTT(t) && t.khoaDiem), giu = TO_K; TO_K = TC_K; const tv = toTV(t); TO_K = giu;
   let r = KHO.tvChuan(t.ma, TC_K);
   ok('QT-18 chưa có 01/TV: Tổng TV = tổ viên Mẫu 31, có + không dư nợ = tổng', r && r.tong===tv.length && r.coNo+r.khongNo===r.tong && !r.kyTW && r.bs===0, r && (r.tong+' · '+r.coNo+'/'+r.khongNo));
   ok('QT-18: có dư nợ = dư nợ GỐC > 0', r.coNo===tv.filter(k=>(k.dn||0)>0).length);
   /* 2. có Mẫu 01/TV cùng tháng: bù người TƯ còn giữ mà Mẫu 31 không có */
   const B = TC_K.B; const tw0 = B.co.tv01, ng0 = B.nguon && B.nguon.tv01;
   B.co.tv01 = tv.map(k=>({kh:k.kh, to:t.ma, ten:k.ten, dn:k.dn, t105:k.t105})).concat([{kh:'9999999901', to:t.ma, ten:'Người TƯ còn giữ', dn:0, t105:0}, {kh:'9999999902', to:t.ma, ten:'Có dư nợ khác', dn:5000000, t105:0}]);
   B.nguon = B.nguon || {}; B.nguon.tv01 = '2026-08';
   r = KHO.tvChuan(t.ma, TC_K);
   ok('QT-18 có 01/TV cùng tháng: bù người TƯ còn giữ (dư nợ 0), không bù người TƯ ghi còn dư nợ', r.tong===tv.length+1 && r.bs===1 && r.ds.some(x=>x.kh==='9999999901' && x.loai==='ra' && x.nguon==='tv01') && !r.ds.some(x=>x.kh==='9999999902'), r.tong+' · bù '+r.bs);
   ok('QT-18: nhóm cần cho ra (dư nợ 0, tiền gửi 0) đếm riêng', r.choRa>=1);
   B.co.tv01 = tw0; if(ng0) B.nguon.tv01 = ng0; else delete B.nguon.tv01;
   /* 2b. tab Tổ dùng cùng cách đếm (3.334) */
   { const TT = TO_K; TO_K = TC_K; const B2 = TC_K.B, g0 = B2.co.tv01, n0 = B2.nguon && B2.nguon.tv01;
     B2.co.tv01 = tv.map(k=>({kh:k.kh, to:t.ma, ten:k.ten, dn:k.dn, t105:k.t105})).concat([{kh:'9999999901', to:t.ma, ten:'Người TƯ còn giữ', dn:0, t105:0}]); B2.nguon = B2.nguon || {}; B2.nguon.tv01 = '2026-08';
     const h = toTheHTML(t, tv); ok('3.334 tab Tổ: thẻ tổ đếm theo QT-18 (gồm người 01/TV), mặc định ngưỡng 100', new RegExp('<b>'+(tv.length+1)+'</b> tổ viên').test(h) && /gồm 1 theo 01\/TV/.test(h) && /tối đa 100/.test(h));
     B2.co.tv01 = g0; if(n0) B2.nguon.tv01 = n0; else delete B2.nguon.tv01; TO_K = TT; }
   /* 3. khung khách cố định + khối tổ */
   const ks = Object.keys(SL_DB.kh).filter(k=>SL_DB.kh[k].to), c1 = ks[0], c2 = ks.find(k=>(SL_DB.kh[k].to!==SL_DB.kh[c1].to));
   tcMoKH(c1); await w(1500); const k1 = document.querySelector('#tc-ct .tc-khung'), b1 = k1 && k1.querySelector('.tc-nut').getBoundingClientRect().top, m1 = k1 && k1.querySelector('.tc-nhom-mon').getBoundingClientRect().top;
   const to1 = document.querySelector('#tc-ct .tc-to-khoi');
   ok('khung khách có khối "Tổ & địa bàn": mã tổ chép được, Tổ trưởng, Thành viên, Hội · Điểm GD', !!to1 && /Mã tổ/.test(to1.textContent) && /Tổ trưởng/.test(to1.textContent) && /Thành viên/.test(to1.textContent) && !!to1.querySelector('.tc-chep[data-ten="mã tổ"]'));
   ok('khối tổ: số TV + chip có / không dư nợ + nút 🏘 Tổ của điểm GD', /TV/.test(to1.textContent) && !!to1.querySelector('.nh.nh-lam') && !!to1.querySelector('.tc-bang-nut'));
   tcMoKH(c2); await w(1500); const k2 = document.querySelector('#tc-ct .tc-khung');
   ok('khung cố định: đổi khách → nút dưới đáy + khối Món vay giữ nguyên vị trí', Math.abs(k2.querySelector('.tc-nut').getBoundingClientRect().top-b1)<2 && Math.abs(k2.querySelector('.tc-nhom-mon').getBoundingClientRect().top-m1)<2, Math.round(b1)+' / '+Math.round(k2.querySelector('.tc-nut').getBoundingClientRect().top));
   /* 4. bảng tổ của điểm GD theo Hội */
   tcBangDiem(t.khoaDiem, '', {ten:'Nguyễn Văn Thử', cccd:'072000000001'}); await w(500);
   const dsTo = Object.values(TC_K.to).filter(x=>x.khoaDiem===t.khoaDiem && !x.trucTiep && !toLaTT(x));
   const dong = [...document.querySelectorAll('.tc-bt tr.tc-bt-dong')];
   ok('bảng tổ: đủ tổ của điểm GD, có dòng Hội + Cộng Hội + Cộng điểm', dong.length===dsTo.length && document.querySelectorAll('.tc-bt tr.hoi').length>=1 && !!document.querySelector('.tc-bt tr.tong'), dong.length+'/'+dsTo.length);
   const tongTV = dong.reduce((s, tr)=>s+(+tr.children[5].textContent), 0), cong = +document.querySelector('.tc-bt tr.tong').children[1].textContent;
   ok('Cộng điểm = tổng các tổ (Tổng TV)', tongTV===cong, tongTV+' = '+cong);
   ok('ngưỡng QĐ 70 (mặc định 20–100): tổ dưới 20 TV có chip vàng', dong.every(tr=>+tr.children[5].textContent>=20 || !!tr.querySelector('.nh-vang')));
   ok('mã tổ / tổ trưởng / ☎ bấm để chép', !!dong[0].querySelector('.tc-chep[data-ten="mã tổ"]') && !!dong[0].querySelector('.tc-chep[data-ten="tên tổ trưởng"]'));
   ok('chưa chọn tổ → nút kết nạp khóa', document.getElementById('tc-bt-ket').disabled);
   tcBangChon(dong[0]); await w(100);
   ok('chọn tổ → nút mở', !document.getElementById('tc-bt-ket').disabled && /Đã chọn tổ/.test(document.getElementById('tc-bt-chon').textContent));
   tcKetNap(); await w(600);
   ok('👪 kết nạp: mở form Hộ vay có sẵn, điền sẵn tổ + tên / CCCD vừa tra', HM && HM.to===dsTo.find(x=>x.ma===dong[0].getAttribute('data-to')).ma && HM.tv[0].ten==='Nguyễn Văn Thử' && HM.tv[0].cccd==='072000000001' && !!document.querySelector('.hm-dc'));
   dongHop(); await w(200);
   D.cauHinh.toNguong = {min:1, max:3}; ok('ngưỡng theo ô ⚙ Ngưỡng tab Tổ: đủ 3 → chip đỏ', /nh-do/.test(tcNguongChip(3)) && /nh-vang/.test(tcNguongChip(0))); delete D.cauHinh.toNguong;
   /* 5. kiểm trùng chưa vay → nút chọn tổ kết nạp */
   ok('kiểm trùng "chưa vay" có nút 🏘 Chọn tổ kết nạp', /tc-ket-nut/.test(tcKiemTrung2('079999999999', 'Người Chưa Vay Ai')));
   /* 6. chip 7 màu */
   const cs = getComputedStyle(document.documentElement), mau = ['--do','--cam','--vang','--luc','--xanh','--tim','--xam'].map(v=>cs.getPropertyValue(v).trim());
   ok('bảng 7 màu chip có đủ biến màu', mau.every(Boolean), mau.join(' '));
   const sp = document.createElement('span'); sp.className = 'tc-nh cam'; document.body.appendChild(sp); const sp2 = document.createElement('span'); sp2.className = 'nh nh-cam'; document.body.appendChild(sp2);
   ok('chip cũ và chip chung cùng màu (cam)', getComputedStyle(sp).color===getComputedStyle(sp2).color); sp.remove(); sp2.remove();
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t244 đạt'); await b.close(); process.exit(sai?1:0);
})();
