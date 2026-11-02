// 3.452 (anh 02/11 "làm tiếp mẫu 10B theo đúng quy chuẩn 10A") — 10B: chữ 14 / tiêu đề 15 + kẻ, chữ liền in thường / chấm giữ form, địa bàn theo đơn vị hành chính,
//   "Ông (bà): tên" ⇥ "Chức vụ", Hội bỏ xã, Về việc chọn nhiều, tách ô, nút ⚙ Khai báo riêng, Nhập liệu riêng, bảng hộ vay (cột Kết nạp, TT / TP), bầu thay chọn tên trong tổ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const t = TO_K.to[C.to]; hsoChonMau('10b'); await w(500);
   let h = HSO.x.h, tx = h.replace(/<[^>]+>/g, '');
   ok('quy chuẩn: thân 14, BIÊN BẢN HỌP 15, kẻ dưới tiêu đề dài bằng chữ', /om-goc" style="font-size:14pt/.test(h) && /class="s15"[^>]*><b>BIÊN BẢN HỌP/.test(h) && new RegExp('<p class="ke" data-ke="'+omRong('BIÊN BẢN HỌP', 15, true).toFixed(1)+'"').test(h));
   ok('PHÊ DUYỆT UBND in đậm', /<b>PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ<\/b>/.test(h));
   const T = hsoTo(t), cap = HST.capAp(t, T);
   ok('địa bàn theo đơn vị hành chính ('+cap+', '+T.xaDu+') + "Trưởng '+cap+'"', tx.indexOf(T.xaDu)>=0 && new RegExp('Trưởng '+cap+', chứng kiến').test(tx), (tx.match(/Địa điểm:.{0,60}/)||[''])[0]);
   ok('chữ điền liền, in thường', [...new DOMParser().parseFromString(h, 'text/html').querySelectorAll('span.om')].filter(e=>!/om-cham/.test(e.className) && e.getAttribute('data-o')!=='vv' && e.getAttribute('data-o')!=='lyDo').every(e=>/font-weight:normal/.test(e.getAttribute('style')||'') && !/inline-block/.test(e.getAttribute('style')||'')));
   ok('Khối Nhập liệu riêng: Điền hết / Chừa phê duyệt UBND / Tùy chọn', (()=>{ OM_KIEU = 'mau'; const k = omKieuHTML('10b'); OM_KIEU = 'that'; return /Chừa phê duyệt UBND/.test(k) && !/Chừa phê duyệt NH/.test(k); })());
   ok('tách ô: bầu thay 4 ô, UBND 4 ô, chủ trì 3 ô, chữ ký 2 ô', ['bauTT','bauTTCu','bauPho','bauPhoCu','ubAp','ubHoi','ubTT','ubPho','chuTriCv','chuTriHoi','kyTA','kyCT','toAp','toHoi','knSau'].every(k=>OM_MAU['10b'].oK[k]) && !['bau','ub','ky','hoiTo'].some(k=>OM_MAU['10b'].oK[k]));
   ok('nút ⚙ Khai báo riêng cạnh ⚙ Khai báo đơn vị', !!document.querySelector('[data-lenh="omkb.ds"][data-mk="10b"]'));
   /* bảng hộ vay: cột Kết nạp, TT / TP, datalist bầu thay */
   const bg = document.querySelector('#hso-tuy table.hso-tv10a');
   ok('bảng hộ vay có cột Kết nạp, Mã KH, Dư nợ, ghi kỳ số liệu', !!bg && /Kết nạp/.test(bg.querySelector('thead').textContent) && /Mã KH/.test(bg.textContent) && /Hộ vay của tổ — số liệu/.test(document.getElementById('hso-tuy').textContent));
   ok('ô bầu thay chọn được tên trong tổ (datalist)', !!document.getElementById('hso-dl-tv') && document.querySelector('#hso-o-ttMoi').getAttribute('list')==='hso-dl-tv');
   const ds = HST.ds(t), x0 = ds.find(x=>x.vay); const cb = bg.querySelector('input[data-lenh="hst.tich"][data-k="'+x0.kh+'"]'); cb.checked = true; cb.dispatchEvent(new Event('change', {bubbles:true})); await w(500);
   h = HSO.x.h; tx = h.replace(/<[^>]+>/g, '');
   ok('tích Kết nạp → in "- Ông (Bà): tên" (hoa đầu từ) + Về việc tự có "kết nạp tổ viên"', new RegExp('- Ông \\(Bà\\): '+tenHoaDau(x0.ten)).test(tx) && /data-o="vv">Về việc kết nạp tổ viên/.test(h));
   /* bầu thay: tab Chức vụ */
   document.getElementById('hso-o-ttMoi').value = 'NGUYEN VAN MOI GIA'; document.getElementById('hso-o-ttCu').value = 'Tran Van Cu Gia'; hsoDocO(); await w(500);
   h = HSO.x.h; tx = h.replace(/<[^>]+>/g, '');
   ok('bầu thay: "- Ông (Bà): Nguyen Van Moi Gia" ⇥ "Chức vụ: Tổ trưởng", "thay Ông (Bà): …"', /<span class="tab"[^>]*><\/span>Chức vụ: Tổ trưởng/.test(h) && /Nguyen Van Moi Gia/.test(tx) && /thay Ông \(Bà\): Tran Van Cu Gia/.test(tx));
   ok('Về việc chọn nhiều tự theo việc đã làm: "kết nạp tổ viên và bầu thay đổi thành viên Ban quản lý Tổ"', /Về việc kết nạp tổ viên và bầu thay đổi thành viên Ban quản lý Tổ/.test(tx));
   /* chọn tay Về việc: bỏ "kết nạp" */
   const nut = [...document.querySelectorAll('[data-lenh="omc.bat"][data-k="vv"]')]; ok('Chọn nhanh có nút chọn nhiều Về việc', nut.length===2);
   nut[0] && nut[0].click(); await w(400); tx = HSO.x.h.replace(/<[^>]+>/g, '');
   ok('bấm bỏ "kết nạp tổ viên" → Về việc chỉ còn bầu thay', /data-o="vv">Về việc bầu thay đổi thành viên Ban quản lý Tổ</.test(HSO.x.h));
   omDatKB('10b', 'vv', ''); document.getElementById('hso-o-ttMoi').value = ''; document.getElementById('hso-o-ttCu').value = ''; hsoDocO(); HSO.kn = {}; hsoVe(); await w(400);
   /* để chấm → giữ form */
   const C0 = hsoCH(), giu = C0.to; C0.to = ''; hsoVe(); await w(300); tx = HSO.x.h.replace(/<[^>]+>/g, '');
   ok('chưa chọn tổ → giữ form chấm ("Ông (bà) …", "thôn …")', /Thư ký: Ông \(bà\) [.…]+/.test(tx) && /tại thôn [.…]+/.test(tx)); C0.to = giu; hsoVe(); await w(300);
   /* Hội bỏ xã */
   ok('Hội bỏ xã / phường', HST.hoi('Hội Nông dân phường Gia Lộc')==='Hội Nông dân' && HST.hoi('Hội Phụ nữ xã Thạnh Đức')==='Hội Phụ nữ');
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t361 đạt'); await b.close(); process.exit(sai?1:0);
})();
