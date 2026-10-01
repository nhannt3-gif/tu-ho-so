// đo hộp sửa văn bản khi nhiều tag (dữ liệu giả)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:768}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.addInitScript(()=>{ localStorage.setItem('t89','1');
   const tags=['Tổ TK&VV','Giao dịch xã','Xử lý rủi ro','Huy động vốn','Đổi tên hộ vay','Đổi chữ ký CCCD','HS khoanh','HS quá hạn','HS 3 tháng KHĐ','Sắp xếp tổ','Phân bổ vốn','Kiểm tra nội bộ','Giao ban tháng','Báo cáo tuần','Lãi suất','Ủy thác','Hội Nông dân','Hội Phụ nữ','Đoàn Thanh niên','Cựu chiến binh','Tập huấn','Thi đua khen thưởng','Kiểm soát','Chi phí'];
   localStorage.setItem('tuhoso_v1', JSON.stringify({phienBan:1,cauHinh:{tagTab:{vanBan:tags}},vanBan:[
     {id:'h4336',nhom:'vanBan',loai:'Hướng dẫn',soHieu:'4336/HD-NHCS',ngay:'2026-09-25',tenVB:'Hướng dẫn thực hiện một số nội dung Quy chế hoạt động của Tổ TK&VV',trichYeu:'x',tenMoi:'h.pdf',tenCu:'h.pdf',the:['Tổ TK&VV','Giao dịch xã','Huy động vốn'],ctrinh:['Dùng chung'],mang:'Tín dụng',lienQuan:['q70']},
     {id:'q70',nhom:'vanBan',loai:'Quyết định',soHieu:'70/QĐ-HĐQT',ngay:'2026-08-27',tenVB:'Quy chế',tenMoi:'q.pdf',tenCu:'q.pdf',lienQuan:['h4336']}],duLieu:[],ghiChu:[],cho:[],bieuMau:[],rac:[]})); });
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); doiNgan(1); await w(100); suaCho('h4336'); await w(500);
   const tr=document.querySelector('#hop-in .sua-trai'); const out=['sua-trai scroll '+tr.scrollHeight+'/'+tr.clientHeight];
   [...tr.children].forEach(c=>{ const r=c.getBoundingClientRect(); out.push(c.className.slice(0,30)+' h='+Math.round(r.height)); });
   tr.querySelectorAll('.sg-khoi').forEach(k=>[...k.children].forEach(c=>{ const r=c.getBoundingClientRect(); out.push('   '+(k.dataset.k)+' > '+(c.className||c.tagName).slice(0,30)+' h='+Math.round(r.height)+' '+c.innerText.replace(/\s+/g,' ').slice(0,50)); }));
   return out.join('\n'); });
 console.log(r); console.log('lỗi', loi);
 await p.screenshot({path:__dirname+'/t89.png'}); await b.close(); })();
