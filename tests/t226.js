// 3.304 — chữ ký gắn cùng CCCD (anh 21/10): bảng Scan cột "Ck" cạnh Loại giấy tờ (khách có chữ ký hiện ✍), nút 💾 cuối dòng bản CCCD
// → hộp Xuất file: CCCD 2 mặt ghép 1 JPG ≤ 200 KB + Chữ ký, tên chuẩn, ghi vào thư mục đã chọn (giả lập showDirectoryPicker);
// khung xem tab Scan gọn mặc định. Dữ liệu GIẢ (mã KH, tên, ảnh nhiễu tự vẽ).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* ảnh nhiễu (nén khó) để thử giới hạn 200 KB */
   const anh = (w_, h_, mau) => { const c = document.createElement('canvas'); c.width = w_; c.height = h_; const g = c.getContext('2d'), d = g.createImageData(w_, h_);
     for(let i=0;i<d.data.length;i+=4){ d.data[i] = Math.random()*255; d.data[i+1] = mau; d.data[i+2] = Math.random()*255; d.data[i+3] = 255; } g.putImageData(d, 0, 0); return new Promise(r=>c.toBlob(r, 'image/jpeg', 0.95)); };
   const bay = new Date().toISOString();
   const s1 = {id:'t226a', che:'the', ten:'Nguyễn Văn Giả', maKH:'9990002261', tag:['CCCD'], matTruoc:true, ngay:bay.slice(0,10), taoLuc:bay};
   const s2 = {id:'t226b', che:'the', ten:'Trần Thị Không Ký', maKH:'9990002262', tag:['CCCD'], ngay:bay.slice(0,10), taoLuc:bay};
   const s3 = {id:'t226c', che:'the', ten:'Lê Chưa Có Mã', maKH:'', tag:['CCCD'], ngay:bay.slice(0,10), taoLuc:bay};
   const s4 = {id:'t226d', che:'tailieu', ten:'Nguyễn Văn Giả', maKH:'9990002261', tag:['Giấy xác nhận'], ngay:bay.slice(0,10), taoLuc:bay};
   await luuAnhHS('t226a_matTruoc', await anh(1600, 1010, 80)); await luuAnhHS('t226a_matSau', await anh(1600, 1010, 160));
   const ky = {id:'kat226a', loai:'ky', khach:'Nguyễn Văn Giả', maKH:'9990002261', ten:'9990002261 - Nguyễn Văn Giả - Chữ ký.jpg', ngay:bay.slice(0,10), luc:bay};
   const ky3 = {id:'kat226c', loai:'ky', khach:'Lê Chưa Có Mã', ten:'ck-Le Chua Co Ma.jpg', ngay:bay.slice(0,10), luc:bay};
   await luuAnhHS(ky.id, await anh(500, 200, 250));
   D.scan.push(s1, s2, s3, s4); D.kyAnh = (D.kyAnh||[]).concat([ky, ky3]); HS.ds = D.scan;
   doiNgan(4); await w(200); datKX('scan', 'bang'); await w(300);
   const th = Array.prototype.map.call(document.querySelectorAll('#tr4 .bang-tab thead th'), x=>x.textContent.trim()), ci = th.indexOf('Ck');
   ok('bảng Scan có cột "Ck" ngay sau "Loại giấy tờ"', ci>0 && /^Loại giấy tờ/.test(th[ci-1]), JSON.stringify(th));
   const dong = id => document.querySelector('#tr4 .bang-tab tbody tr[data-id="'+id+'"]');
   const o_ = id => dong(id).children[ci].textContent.trim();
   ok('khách có chữ ký (cùng mã KH / chưa mã thì cùng tên) hiện ✍; khách chưa ký trống; dòng tài liệu không hiện', o_('t226a')==='✍' && o_('t226c')==='✍' && o_('t226b')==='' && o_('t226d')==='', JSON.stringify([o_('t226a'), o_('t226b'), o_('t226c'), o_('t226d')]));
   ok('nút 💾 Xuất chỉ ở dòng CCCD (không ở dòng tài liệu)', !!dong('t226a').querySelector('[data-lenh="xk.mo"]') && !dong('t226d').querySelector('[data-lenh="xk.mo"]'));
   ok('khung xem tab Scan gọn mặc định (tỉ lệ danh sách / khung xem = 3)', tiLeCot('scan')===3 && tiLeCot('vanBan')===1.5, tiLeCot('scan'));
   /* thư mục giả */
   const ghi = {}, tm = {name:'Xuat KH Gia', queryPermission:async()=>'granted', requestPermission:async()=>'granted',
     getFileHandle:async(ten)=>({createWritable:async()=>({write:async(bl)=>{ ghi[ten] = bl; }, close:async()=>{}})})};
   let hoi = 0; window.showDirectoryPicker = async()=>{ hoi++; return tm; };
   const kho = {}, docCu = docFile, luuCu = luuFile;
   window.docFile = k => /^ln_tm_/.test(k) ? Promise.resolve(kho[k]||null) : docCu(k); window.luuFile = (k, v) => /^ln_tm_/.test(k) ? (kho[k] = v, Promise.resolve()) : luuCu(k, v);
   dong('t226a').querySelector('[data-lenh="xk.mo"]').click(); await w(200);
   const hop = document.querySelector('#hop.hien');
   ok('bấm 💾 → hộp Xuất file: CCCD + Chữ ký tích sẵn, Ảnh khách chưa có thì mờ', !!hop && /Xuất file/.test(hop.textContent) && hop.querySelector('[data-xk="cccd"]').checked && hop.querySelector('[data-xk="ky"]').checked && hop.querySelector('[data-xk="anh"]').disabled);
   hop.querySelector('[data-lenh="xk.xuat"]').click();
   for(let i=0;i<60 && Object.keys(ghi).length<2;i++) await w(100);
   const tenC = '9990002261 - Nguyễn Văn Giả - CCCD.jpg', tenK = '9990002261 - Nguyễn Văn Giả - Chữ ký.jpg';
   ok('xuất 2 file tên chuẩn vào thư mục đã chọn (hỏi chọn thư mục 1 lần)', !!ghi[tenC] && !!ghi[tenK] && hoi===1, JSON.stringify(Object.keys(ghi))+' hỏi '+hoi);
   const im = ghi[tenC] && await anhTuBlob(ghi[tenC]);
   ok('CCCD: 2 mặt ghép 1 ảnh JPG (cao > rộng), nhẹ ≤ 200 KB', !!im && ghi[tenC].size<=200*1024 && ghi[tenC].type==='image/jpeg' && (im.naturalHeight||im.height) > (im.naturalWidth||im.width), ghi[tenC] && Math.round(ghi[tenC].size/1024)+' KB '+(im&&(im.naturalWidth+'×'+im.naturalHeight)));
   /* lần 2: nhớ thư mục, không hỏi lại; chỉ tích Chữ ký */
   Object.keys(ghi).forEach(k=>delete ghi[k]); xkMo('t226a'); await w(100);
   document.querySelector('#hop [data-xk="cccd"]').checked = false; document.querySelector('#hop [data-lenh="xk.xuat"]').click();
   for(let i=0;i<30 && !Object.keys(ghi).length;i++) await w(100);
   ok('lần sau nhớ thư mục (không hỏi lại); bỏ tích CCCD → chỉ xuất Chữ ký', hoi===1 && Object.keys(ghi).length===1 && !!ghi[tenK], JSON.stringify(Object.keys(ghi)));
   /* bản không có ảnh mặt thẻ → báo, không treo */
   let baoL = ''; const blCu = bao; window.bao = function(m){ baoL += ' '+m; return blCu.apply(this, arguments); };
   xkMo('t226b'); await w(100); document.querySelector('#hop [data-lenh="xk.xuat"]').click(); await w(800);
   ok('bản chưa có ảnh 2 mặt thẻ → báo lý do, không ghi file', !Object.keys(ghi).filter(k=>/Không Ký/.test(k)).length && /chưa có ảnh 2 mặt/.test(baoL), baoL);
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
