// 3.406 (anh 29/10): 🗺 Địa bàn (Hôm nay) theo Mẫu 31 + File Tổ trưởng mới nhất (js/82, cắm rút) — không cài cứng bảng gộp điểm;
//   so lệch danh mục ⚙ Cài đặt + ⟳ cập nhật có xem trước / ↶ khôi phục; tổ còn dư nợ không chuẩn địa bàn (toKiemAp q.toLech, Kiểm tra kỳ);
//   so ấp trước 07/2026 ↔ hiện tại theo mã tổ (Gia Lộc đổi tên KP) + 📝 ghi chú riêng từng điểm GD. Bộ GIẢ tests/gianho31 + cây giả.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   /* 1. cây giả: so đổi tên ấp theo mã tổ + tổ không chuẩn */
   const to = (ma, xa, d, td, th, tt, them) => Object.assign({ma, ten:'TT '+ma, xa, tenXa:'Phường Giả', diem:d, tenDiem:td, ngayGD:'23', thon:th, tenThon:tt, dv:'11'}, them||{});
   const K0 = {to:{A:to('A','X1','D1','Gia Lộc','11','Ấp Cũ Một'), B:to('B','X1','D1','Gia Lộc','11','Ấp Cũ Một'), C:to('C','X1','D1','Gia Lộc','12','Ấp Cũ Hai')}};
   const K1 = {to:{A:to('A','X1','D1','Gia Lộc','21','Khu phố 1'), B:to('B','X1','D1','Gia Lộc','21','Khu phố 1'), C:to('C','X1','D1','Gia Lộc','12','Khu phố 2')}};
   const dt = dbslDoiTen(K0, K1);
   ok('so trước 07/2026 theo mã tổ: ấp đổi mã + tên (2 tổ), ấp đổi tên giữ mã (1 tổ)', dt.length===2 && dt.some(x=>x.cu.ten==='Ấp Cũ Một' && x.moi.ten==='Khu phố 1' && x.to.length===2) && dt.some(x=>x.cu.ma==='12' && x.moi.ten==='Khu phố 2'), JSON.stringify(dt.map(x=>[x.cu.ten, x.moi.ten, x.to.length])));
   const cay = dbslCay(K1);
   ok('dbslCay: xã → điểm (ngày GD) → ấp → tổ, cùng dạng danh mục Cài đặt', cay.length===1 && cay[0].diem[0].ten==='Gia Lộc' && cay[0].diem[0].ngay==='23' && cay[0].diem[0].ap.length===2 && cay[0].diem[0].ap.every(a=>Array.isArray(a.to)), JSON.stringify(cay[0].diem[0].ap.map(a=>a.ten)));
   const giu = D.cauHinh.diaBan; D.cauHinh.diaBan = [{xa:'Phường Giả', ma:'X1', diem:[{ten:'Gia Lộc 2', ma:'D7', ap:[{ten:'Khu phố 2', ma:'12'}, {ten:'Ấp Cũ Một', ma:'11'}]}]}];
   const L = dbslLech(cay);
   ok('lệch danh mục: KP2 đổi điểm (Gia Lộc 2 → Gia Lộc) · KP1 mới · Ấp Cũ Một không còn tổ', L.doi.length===1 && L.doi[0][1]==='Khu phố 2' && L.moi.length===1 && L.moi[0][1]==='Khu phố 1' && L.mat.length===1, JSON.stringify(L));
   /* tổ không chuẩn */
   const T = {P:to('P','X1','D1','Gia Lộc','21','Khu phố 1'), Q:to('Q','X1','D1','Gia Lộc','21','Khu phố 1'), R:to('R','X1','D9','Điểm Khác','21','Khu phố 1'), S:to('S','X1','', '', '', '', {diemSuy:''}), U:to('U','X1','D1','Gia Lộc','21','Khu phố 1', {ngoaiDS:true}), V:to('V','X1','D1','Gia Lộc','21','Khu phố 1', {diemSuy:'tổ khác cùng ấp'})};
   const kh = {}; Object.keys(T).forEach(m=>kh[m] = [{ku:'K'+m, kh:'C'+m, dn:m==='Q' ? 0 : 1e7, to:m}]);
   const q = toKiemAp({to:T, kh:kh, hs:[]}), ly = {}; q.toLech.forEach(r=>ly[r[0]] = r[6]);
   ok('tổ còn dư nợ không chuẩn: R ấp thuộc điểm khác · S chưa rõ điểm + ấp · U không có trên DS tổ · V điểm suy; P chuẩn; Q dư nợ 0 bỏ qua', /điểm khác/.test(ly.R) && /chưa rõ điểm GD/.test(ly.S) && /chưa rõ ấp/.test(ly.S) && /không có trên Danh sách tổ/.test(ly.U) && /điểm GD suy/.test(ly.V) && !ly.P && !ly.Q && q.toDuNo===5, JSON.stringify(ly));
   /* 2. tích hợp gianho31: 🗺 Địa bàn dựng theo số liệu */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; DBSL.K = null; DBSL.ky = ''; DBSL.xem = 'sl';
   const box = document.createElement('div'); document.body.appendChild(box); box.innerHTML = ccDiaBanHTML(); for(let i=0;i<60 && !document.getElementById('dbsl-cay');i++) await w(200);
   const ht = box.textContent;
   ok('🗺 Địa bàn: đầu cây ghi nguồn "Theo … Mẫu 31 31/08/2026", số xã / điểm / ấp / tổ', /Theo .*Mẫu 31 31\/08\/2026/.test(ht) && /\d+ xã · \d+ điểm GD · \d+ ấp\/KP · \d+ tổ/.test(ht), ht.slice(0, 200));
   ok('🗺 Địa bàn: chip 📊 Theo số liệu / 📒 Danh mục Cài đặt + mục kiểm tổ còn dư nợ', /Theo số liệu/.test(ht) && /Danh mục Cài đặt/.test(ht) && /tổ còn dư nợ/.test(ht));
   /* ⟳ cập nhật + ↶ khôi phục */
   const dmTruoc = JSON.stringify(D.cauHinh.diaBan); dbslGhi(); await w(200);
   ok('⟳ cập nhật: danh mục = cây số liệu, giữ bản cũ để khôi phục', D.cauHinh.diaBan.length>0 && JSON.stringify(D.cauHinh.diaBanCu.ds)===dmTruoc && JSON.stringify(D.cauHinh.diaBan)===JSON.stringify(dbslCay(DBSL.K)));
   dbslKhoiPhuc(); await w(100);
   ok('↶ khôi phục: về danh mục cũ, bỏ bản sao', JSON.stringify(D.cauHinh.diaBan)===dmTruoc && !D.cauHinh.diaBanCu);
   /* 📝 ghi chú điểm GD */
   const c0 = dbslCay(DBSL.K)[0], k = dbslKhoaDiem(c0, c0.diem[0]);
   dbslGhiChuMo(k); await w(150); const ta = document.getElementById('dbsl-gc');
   ok('📝 ghi chú: mở hộp, gợi ý sẵn danh sách ấp / KP của điểm', !!ta && new RegExp(c0.diem[0].ap.length+' ấp\\/KP').test(ta.value), ta && ta.value.slice(0, 120));
   ta.value = 'Nhớ: 4 KP đổi tên từ 07/2026 (ghi chú giả)'; dbslGhiChuLuu(k); await w(150);
   ok('📝 lưu → hiện trong cây dưới tên điểm, lưu ở D.cauHinh.dbGhi', D.cauHinh.dbGhi[k]==='Nhớ: 4 KP đổi tên từ 07/2026 (ghi chú giả)' && /📝 Nhớ: 4 KP đổi tên/.test(document.getElementById('dbsl-cay').textContent));
   delete D.cauHinh.dbGhi[k]; D.cauHinh.diaBan = giu; box.remove(); try{dongHop()}catch(e){}
   /* Kiểm tra kỳ có mục tổ còn dư nợ không chuẩn */
   const kq = []; slKTAp(await toNap('2026-08'), function(n, ten, okk, chu){ kq.push({n, ten, chu}); });
   ok('Kiểm tra kỳ: mục "Tổ còn dư nợ không chuẩn địa bàn"', kq.some(x=>x.n===6 && /Tổ còn dư nợ không chuẩn địa bàn/.test(x.ten)), JSON.stringify(kq.map(x=>x.ten)));
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
