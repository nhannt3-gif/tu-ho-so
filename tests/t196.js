// 3.234 (R2 chuẩn hóa — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): bộ nhận lệnh data-lenh · mảnh giao diện (ô rộng theo loại) · bộ nút xuất chuẩn (mờ không ẩn, Ctrl+P)
//   · điều hướng DH (lùi / tiến tab, ◀ đóng hộp, ⬅ ➡ đầu trang) · hộp con giữ hộp cha · Sổ hộ vay theo data-lenh · hộp Khai báo không tràn ở 390 px. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const w = t=>p.waitForTimeout(t), ev = f=>p.evaluate(f);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; }, files);
 /* 1. bộ nhận lệnh + mảnh */
 let r = await ev(()=>{ let goi = ''; GD.dangKy('thu', {bam:function(el){ goi = el.getAttribute('data-x'); }}); const d = document.createElement('div'); d.innerHTML = GD.nut({chu:'Thử', lenh:'thu.bam', du:{x:'42'}})+GD.o({loai:'ngay'})+GD.o({loai:'tim'}); document.body.appendChild(d);
   d.querySelector('button').click(); const r = {goi:goi, ngay:Math.round(d.querySelectorAll('input')[0].getBoundingClientRect().width), tim:Math.round(d.querySelectorAll('input')[1].getBoundingClientRect().width), nutRong:Math.round(d.querySelector('button').getBoundingClientRect().width)}; d.remove(); return r; });
 ok('data-lenh: bấm nút → chạy lệnh đã đăng ký, nhận data-*', r.goi==='42');
 ok('mảnh giao diện: ô ngày 112 px, ô tìm 300 px, nút vừa chữ', r.ngay===112 && r.tim===300 && r.nutRong<120, JSON.stringify(r));
 /* 2. bộ nút xuất */
 await ev(async()=>{ slDoiTab('th'); doiNgan(7); for(let i=0;i<60 && !TH_K;i++) await new Promise(r=>setTimeout(r,250)); thXem(); for(let i=0;i<40 && !document.getElementById('th-khung');i++) await new Promise(r=>setTimeout(r,250)); });
 await w(800);
 r = await ev(()=>({nut:[...document.querySelectorAll('#hop-in .xuat-hang button')].map(x=>(x.disabled ? '(mờ)' : '')+x.textContent.trim()).join('|')}));
 ok('bộ nút chuẩn: Đóng · In · PDF · Word (mờ) · Excel · Gửi — thứ tự cố định', r.nut==='Đóng (Esc)|🖨 In|📄 PDF|(mờ)📝 Word|📊 Excel|📤 Gửi', r.nut);
 r = await ev(()=>{ let da = 0; const g = window.xuatIn; window.xuatIn = ()=>{ da++; }; document.querySelector('#hop-in .xuat-in').setAttribute('onclick', 'xuatIn()'); document.dispatchEvent(new KeyboardEvent('keydown', {key:'p', ctrlKey:true, bubbles:true})); window.xuatIn = g; return da; });
 ok('Ctrl+P = 🖨 In ở khung có bộ nút xuất', r===1);
 r = await ev(()=>{ XUAT = {}; const h = xuatHang({ten:'x', html:()=>'<p>x</p>', vaoApp:'void 0'}), d = document.createElement('div'); d.innerHTML = h; return [...d.querySelectorAll('button')].map(x=>x.textContent.trim()).join('|'); });
 ok('chỗ có lưu kho: thêm 💾 Lưu vào app ngay sau In', /🖨 In\|💾 Lưu vào app\|📄 PDF/.test(r), r);
 /* 3. điều hướng */
 await ev(()=>dongHop()); await w(300); await ev(()=>doiNgan(1)); await w(300); await ev(()=>doiNgan(4)); await w(300);
 await ev(()=>history.back()); await w(600); const n1 = await ev(()=>nganHienTai);
 await ev(()=>history.forward()); await w(600); const n2 = await ev(()=>nganHienTai);
 ok('◀ / Alt+← lùi về tab trước, ➡ tiến lại', n1===1 && n2===4, n1+' → '+n2);
 await p.click('.dh-nut [data-lenh="dh.lui"]'); await w(600); ok('nút ⬅ đầu trang = lùi', await ev(()=>nganHienTai)===1);
 await ev(()=>{ slDoiTab('hsv'); doiNgan(7); }); await w(1500); await ev(()=>hsoChonMau('01td')); await w(500); await ev(()=>hsoChonMau('sohv')); await w(500);
 await ev(()=>history.back()); await w(800); ok('lùi đổi mẫu Hồ sơ vay (📒 Sổ hộ vay → 01/TD)', await ev(()=>hsoMau().k)==='01td', await ev(()=>hsoMau().k));
 await ev(()=>hsoChonMau('sohv')); await w(500);
 /* 4. hộp: ◀ đóng hộp · hộp con */
 await ev(()=>hmMo()); await w(300); await ev(()=>history.back()); await w(600);
 ok('◀ khi đang mở hộp → đóng hộp, ở lại trang', !(await ev(()=>document.getElementById('hop').classList.contains('hien'))) && await ev(()=>hsoMau().k)==='sohv');
 await ev(()=>hmMo()); await w(300); await p.fill('#hop-in [data-hm="0:ten"]', 'Người Đang Gõ Dở'); await w(100);
 await p.click('#hop-in [data-lenh="kh.luat"]'); await w(500);
 ok('form hộ → ⚙ khai báo luật mở chồng (hộp con)', /Kiểm tra hộ vay — luật/.test(await ev(()=>document.getElementById('hop-in').textContent)) && await ev(()=>GD.so())===1);
 await ev(()=>dongHop()); await w(500);
 ok('đóng hộp con → về form hộ, chữ đang gõ còn nguyên', await ev(()=>{ const e = document.querySelector('#hop-in [data-hm="0:ten"]'); return !!e && e.value==='Người Đang Gõ Dở' && document.getElementById('hop').classList.contains('hien'); }));
 await p.click('#hop-in [data-lenh="kh.luat"]'); await w(400); await ev(()=>history.back()); await w(600);
 ok('◀ khi hộp con mở → về hộp cha (không đóng hết)', await ev(()=>!!document.querySelector('#hop-in [data-hm="0:ten"]') && document.getElementById('hop').classList.contains('hien')));
 await ev(()=>dongHop()); await w(400);
 /* 5. Sổ hộ vay theo data-lenh */
 await ev(()=>{ hmDs().push({id:'hmx', tao:new Date().toISOString(), kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:[{ten:'Hộ Thử Lệnh'}], dung:0, sv:[]}); hsoVe(); }); await w(400);
 await p.click('.hm-so-chip[data-k="moi"]'); await w(300); const l1 = await ev(()=>HM_SO.loai);
 await p.click('.hm-so-chip[data-k="thang"]'); await w(300); const l2 = await ev(()=>!!HM_SO.tu);
 await p.fill('#hm-so-tim', 'lenh'); await w(400); const l3 = await ev(()=>document.querySelectorAll('#hm-so-bang tr[data-id]').length);
 ok('Sổ hộ vay: chip loại, chip tháng, ô tìm chạy qua data-lenh', l1==='moi' && l2 && l3===1, l1+' · '+l2+' · '+l3);
 ok('Sổ hộ vay không còn onclick ở thanh lọc', await ev(()=>!document.querySelector('.hm-so-loc [onclick], .hm-so-loc [onchange], .hm-so-loc [oninput]')));
 /* 5b. hộ nhập bản cũ (chưa tổ, chưa xã) vẫn hiện khi chọn địa bàn · bảng trống ghi lọc + ✕ Bỏ lọc · tiêu đề bảng theo chế độ tối */
 await ev(()=>{ HM_SO.q = ''; HM_SO.tu = ''; HM_SO.den = ''; HM_SO.loai = ''; hmDs().push({id:'hmcu', tao:'2025-03-02T08:00:00.000Z', kh:'', to:'', tv:[{ten:'Hộ Nhập Bản Cũ'}], dung:0, sv:[]}); const C = hsoCH(), x = pvLuaChon(TO_K.to, C, 'xa', true)[0].k; pvChon('hsv', 'xa', x); hsoVe(); }); await w(400);
 ok('hộ nhập bản cũ (chưa tổ, chưa xã) vẫn hiện khi đang chọn Xã', await ev(()=>[...document.querySelectorAll('#hm-so-bang input[data-so="ten"]')].some(x=>x.value==='Hộ Nhập Bản Cũ')));
 await ev(()=>{ HM_SO.loai = 'cu'; hsoVe(); }); await w(300);
 r = await ev(()=>({chu:(document.querySelector('#hm-so-bang .hm-so-trong')||{}).textContent||'', nut:!!document.querySelector('#hm-so-bang [data-lenh="so.boLoc"]')}));
 ok('bảng trống: ghi số hộ trong sổ + bộ lọc đang bật + nút ✕ Bỏ lọc', /hộ trong sổ/.test(r.chu) && /hộ cũ/.test(r.chu) && r.nut, r.chu);
 await p.click('#hm-so-bang [data-lenh="so.boLoc"]'); await w(300);
 ok('✕ Bỏ lọc → hiện lại hộ', await ev(()=>!HM_SO.loai && document.querySelectorAll('#hm-so-bang tr[data-id]').length>0));
 r = await ev(()=>{ document.documentElement.setAttribute('data-theme', 'dark'); document.body.classList.add('toi'); const th = document.querySelector('#hm-so-bang th'); const c = getComputedStyle(th).backgroundColor.match(/\d+/g).map(Number); return c.slice(0, 3); });
 await ev(()=>{ document.documentElement.removeAttribute('data-theme'); document.body.classList.remove('toi'); });
 ok('chế độ tối: tiêu đề bảng Sổ hộ vay nền tối (không còn dòng trắng)', r[0]+r[1]+r[2] < 200, JSON.stringify(r));
 /* 6. hộp Khai báo ở 390 px */
 await p.setViewportSize({width:390, height:820}); await ev(()=>hsoKBHop('pgd')); await w(600);
 r = await ev(()=>({tran:document.documentElement.scrollWidth>innerWidth+1, gian:[...document.querySelectorAll('#hop-in .hso-kbt')].filter(b=>b.getBoundingClientRect().width>innerWidth*0.6).length}));
 ok('hộp ⚙ Khai báo ở điện thoại 390 px: nút tab vừa chữ (không kéo dài)', r.gian===0, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
