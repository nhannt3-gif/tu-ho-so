// 3.402 (anh 29/10: củng cố, đóng tổ không hoạt động — "ra tổ rác tất cả"): 📉 Diễn biến tổ ở Tra cứu KH (js/80, cắm rút).
//   So tổ đầu tháng ↔ hiện tại theo dải lọc (toàn PGD → xã, xã → điểm, điểm → Hội); tổ đóng + khoảng ngày theo các bản Danh sách tổ; tổ mới; đổi điểm / Hội;
//   tổ rác chưa đóng: dưới 20 TV (QT-18) · không dư nợ · còn dư nợ không có trên Danh sách tổ. Dữ liệu giả + bộ GIẢ tests/gianho31 (Mẫu 31 T7, T8).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-0[78]-2026/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   /* 1. tính trên cây giả */
   const to = (ma, xa, d, dv, tv, dn, them) => Object.assign({ma, ten:'Tổ Trưởng '+ma, xa, tenXa:'Xã '+xa, khoaDiem:d, tenDiemDu:'Điểm '+d, dv, _tv:tv, _dn:dn}, them||{});
   const K0 = {ky:'2026-09', ngay:'2026-09-30', thang:'2026-09', to:{T1:to('T1','X1','D1','11',30,5e7), T2:to('T2','X1','D1','12',25,0), T3:to('T3','X2','D2','13',40,9e7), T4:to('T4','X2','D2','11',22,3e7)}};
   const K1 = {ky:'2026-10-28', ngay:'2026-10-28', thang:'2026-10', to:{T1:to('T1','X1','D1','11',30,5e7), T3:to('T3','X2','D3','14',12,9e7), T4:to('T4','X2','D2','11',22,0, {ngoaiDS:true}),
     T5:to('T5','X1','D1','12',21,1e7), TTX:to('TTX','X1','D1','99',0,1e6, {trucTiep:true})}};
   const giu = KHO.tvChuan; KHO.tvChuan = (t, K) => ({tong:t._tv, ds:[{dn:t._dn}]});
   const giuS = Object.assign({}, tcCH()); Object.assign(tcCH(), {xa:'', diem:'', hoi:'', to:'', ap:''});
   const moc = [{ngay:'2026-09-30', co:{T1:1,T2:1,T3:1,T4:1}, n:4}, {ngay:'2026-10-19', co:{T1:1,T2:1,T3:1,T4:1,T5:1}, n:5}, {ngay:'2026-10-25', co:{T1:1,T3:1,T5:1}, n:3}];
   const D1 = dbtTinh(K0, K1, moc);
   ok('toàn PGD → gom theo xã', D1.cap==='xa' && D1.nhom.length===2, D1.nhom.map(x=>x.ten).join());
   const x1 = D1.nhom.find(x=>x.ten==='Xã X1'), x2 = D1.nhom.find(x=>x.ten==='Xã X2');
   ok('Xã X1: đầu 2 · mới 1 (T5) · đóng 1 (T2) · hiện 2 (bỏ mục vay trực tiếp)', x1.dau===2 && x1.moi===1 && x1.dong===1 && x1.nay===2, JSON.stringify(x1));
   ok('tổ đóng T2: khoảng ngày sau 19/10 – đến 25/10 (bản Danh sách tổ cuối còn / đầu tiên mất)', D1.ds.dong.length===1 && D1.ds.dong[0].t.ma==='T2' && D1.ds.dong[0].tu==='2026-10-19' && D1.ds.dong[0].den==='2026-10-25', JSON.stringify(D1.ds.dong.map(x=>[x.t.ma,x.tu,x.den])));
   const rac = {}; D1.ds.chua.forEach(x=>rac[x.t.ma] = x.ly);
   ok('tổ rác: T3 dưới 20 TV · T4 không dư nợ + không có trên DS tổ · T1, T5 đủ điều kiện', /dưới 20 TV \(12\)/.test(rac.T3) && /không có dư nợ/.test(rac.T4) && /không có trên Danh sách tổ/.test(rac.T4) && !rac.T1 && !rac.T5, JSON.stringify(rac));
   ok('đổi điểm GD + Hội: T3 (D2 → D3, Hội 13 → 14)', D1.ds.doi.length===1 && D1.ds.doi[0].t.ma==='T3' && /Điểm GD: Điểm D2 → Điểm D3/.test(D1.ds.doi[0].chu) && /Hội:/.test(D1.ds.doi[0].chu), JSON.stringify(D1.ds.doi.map(x=>x.chu)));
   ok('đếm cột Xã X2: rác 2 · dưới 20 = 1 · không dư nợ = 1 · không có trên DS = 1', x2.chua===2 && x2.duoi===1 && x2.ko===1 && x2.lech===1, JSON.stringify(x2));
   Object.assign(tcCH(), {xa:'X1'});
   const D2 = dbtTinh(K0, K1, moc);
   ok('chọn xã → gom theo điểm GD, chỉ tổ của xã', D2.cap==='diem' && D2.nhom.length===1 && D2.nhom[0].ten==='Điểm D1' && D2.nhom[0].dau===2, JSON.stringify(D2.nhom));
   Object.assign(tcCH(), {xa:'X1', diem:'D1'});
   const D3 = dbtTinh(K0, K1, moc);
   ok('chọn điểm → gom theo Hội', D3.cap==='hoi' && D3.nhom.length===2, D3.nhom.map(x=>x.ten).join());
   Object.assign(tcCH(), {xa:'', diem:''}); DBT = D1; dbtVe(); await w(200);
   const hop = document.querySelector('.hop-tit') && document.querySelector('.hop-tit').parentNode, ht = hop ? hop.textContent : '';
   ok('màn: bảng tổng có dòng Cộng + 4 danh sách (đã đóng, tổ rác, tổ mới, đổi điểm / Hội)', /Cộng/.test(ht) && /Tổ đã đóng — 1 tổ/.test(ht) && /Tổ rác — chưa đủ điều kiện \/ lệch danh sách, chưa đóng — 2 tổ/.test(ht) && /Tổ mới trong tháng — 1 tổ/.test(ht) && /đổi điểm GD \/ Hội — 1 tổ/.test(ht), ht.slice(0, 300));
   ok('màn: tổ đóng ghi "sau 19/10/2026 – đến 25/10/2026"', /sau 19\/10\/2026 – đến 25\/10\/2026/.test(ht));
   let tep = ''; const giuW = XLSX.writeFile; XLSX.writeFile = (wb, ten) => { tep = ten+'|'+wb.SheetNames.join(','); };
   document.querySelector('[data-lenh="dbt.xls"]').click(); await w(100); XLSX.writeFile = giuW;
   ok('📊 Excel 5 sheet', tep==='Dien_bien_to_20261028.xlsx|Tong hop,Da dong,To rac,To moi,Doi diem Hoi', tep);
   dongHop(); KHO.tvChuan = giu; Object.assign(tcCH(), giuS);
   /* 2. tích hợp: Tra cứu có nút, mở được trên Mẫu 31 T7 → T8 */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; doiNgan(7); slDoiTab('tra'); await tcNap(); await w(500); slDoiTab('tra'); await w(400);
   const nut = document.querySelector('[data-lenh="dbt.mo"]');
   ok('Tra cứu có nút 📉 Diễn biến tổ', !!nut && /Diễn biến tổ/.test(nut.textContent));
   nut.click(); for(let i=0;i<40 && !DBT;i++) await w(250); await w(300);
   const h2 = (document.querySelector('.hop-tit')||{}).textContent || '';
   ok('mở trên số liệu thật giả T7 → T8: tiêu đề + đầu tháng 31/07 → hiện tại 31/08', /Diễn biến tổ/.test(h2) && DBT && DBT.K0.ngay==='2026-07-31' && DBT.K1.ngay==='2026-08-31', DBT && DBT.K0.ngay+' → '+DBT.K1.ngay);
   ok('không có Danh sách tổ: không báo nhầm tổ đóng; số tổ đầu tháng > 0', DBT && DBT.nhom.reduce((a, x)=>a+x.dau, 0)>0, DBT && JSON.stringify(DBT.nhom.slice(0,2)));
   dongHop();
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
