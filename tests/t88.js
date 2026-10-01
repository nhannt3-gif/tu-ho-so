// 3.77 — lọc không sót + trùng số hiệu + gộp (dữ liệu giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:768}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.addInitScript(()=>{ if(localStorage.getItem('t88')) return; localStorage.setItem('t88','1');
   const vb=(id,so,ngay,ten,x)=>Object.assign({id,nhom:'vanBan',loai:'Công văn',soHieu:so,ngay,tenVB:ten,trichYeu:ten,tenMoi:(ngay||'')+' '+so.replace(/\//g,'-')+' '+ten+'.pdf',tenCu:id+'.pdf'},x||{});
   const ds=[ vb('a','70/QĐ-HĐQT','2026-08-27','Quy chế Tổ',{mang:'Tổ TK&VV',ctrinh:[],tag:['Tổ TK&VV'],lienQuan:['c']}),
     vb('b','70/QĐ-HĐQT','2026-08-27','Quy chế Tổ',{mang:'Tổ TK&VV',ctrinh:[],tag:['Quy chế cũ'],lienQuan:['d'],sao:true}),
     vb('c','4336/HD-NHCS','2026-09-01','Hướng dẫn',{mang:'Tín dụng',ctrinh:['Dùng chung'],lienQuan:['a']}),
     vb('d','4339/NHCS-TDNN','2026-09-02','Công văn',{mang:'Mảng lạ ngoài danh mục',ctrinh:['HN'],lienQuan:['b']}),
     vb('e','12/TB-PGD','','Không ngày',{}),
     vb('f','70/QĐ-HĐQT','2015-03-01','QĐ 70 năm khác',{mang:'Tín dụng',ctrinh:['HSSV']}) ];
   localStorage.setItem('tuhoso_v1', JSON.stringify({phienBan:1,cauHinh:{},vanBan:ds,duLieu:[],ghiChu:[],cho:[{id:'n1',nhom:'vanBan',soHieu:'70/QĐ-HĐQT',ngay:'2026-08-27',tenMoi:'moi.pdf',tenCu:'moi.pdf',loai:'Quyết định'}],bieuMau:[],rac:[]})); });
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); const o={}; doiNgan(1); await w(200);
   const ids=()=>BOT_DS.vanBan.map(m=>m.id).sort().join('');
   o.chip=[...document.querySelectorAll('#tr1 .loc-nhanh .the-loc')].map(e=>e.textContent.trim()).join(' | ');
   o.trungChip=[...document.querySelectorAll('#tr1 .tg.trung')].map(e=>e.closest('.d2').getAttribute('onclick').match(/'(\w+)'/)[1]+':'+e.textContent).join(', ');
   const L=locCua('vanBan');
   L.ct='HN'; ve(); await w(50); o.locHN=ids()+' (d HN + c Tất cả CT)';
   L.ct=LOC_TRONG; ve(); await w(50); o.chuaCT=ids();
   L.ct=''; L.nam=LOC_TRONG; ve(); await w(50); o.chuaNgay=ids();
   L.nam=''; L.mang='Mảng lạ ngoài danh mục'; ve(); await w(50); o.mangLa=ids();
   L.mang=''; L.tag='Quy chế cũ'; ve(); await w(50); o.tagLa=ids();
   L.tag=''; L.trung='1'; ve(); await w(50); o.trung=ids();
   boLoc('vanBan'); await w(50);
   // hợp: mỗi văn bản ít nhất lọt vào 1 chip của MỖI nhóm
   const kho=D.vanBan.filter(m=>!m.hetHieuLuc), sot=[];
   nhomLocNhanh('vanBan', D.vanBan).forEach(g=>{ const co=new Set(); g[2].forEach(x=>{ L[g[1]]=x; locChuan('vanBan', kho).forEach(m=>co.add(m.id)); L[g[1]]=''; }); kho.forEach(m=>{ if(!co.has(m.id)) sot.push(g[0]+':'+m.id); }); });
   o.khongSot = sot.length ? 'SÓT '+sot.join(',') : 'mọi văn bản đều lọc ra được ở mọi nhóm';
   // gộp
   moGopTrung('a'); await w(100); o.hopGop=document.querySelectorAll('.gop-dong').length+' bản · mặc định giữ '+GOP_TRUNG.giu;
   GOP_TRUNG.giu='a'; gopTrung(); await w(200);
   const a=timMuc('a'); o.sauGop='b còn? '+!!timMuc('b')+' · rác '+D.rac.map(x=>x.id)+' · a.lq '+a.lienQuan.join(',')+' · d.lq '+timMuc('d').lienQuan.join(',')+' · tag '+a.tag.join('/')+' · sao '+laSao(a);
   tinhTrungSH(); o.conTrung=Object.keys(TRUNG_SH).join(',')||'không';
   // thêm file trùng ở khay chờ
   duyet('n1'); await w(100); o.hoiThem=(document.querySelector('.hop-tit')||{}).textContent+' · nút: '+[...document.querySelectorAll('#hop-in .day-form button')].map(b=>b.textContent).join(' | ');
   return o; });
 for(const k in r) console.log(k.padEnd(9), r[k]); console.log('lỗi', loi);
 await p.screenshot({path:__dirname+'/t88.png'}); await b.close(); })();
