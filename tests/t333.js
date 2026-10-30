// 3.412.1 (lỗi anh báo 27/10: tên cán bộ Giao dịch xã mất — BAN_GIAO_TK3_2710 mục 8): máy mới mở tab GDX → gdxC() tạo khối gdx mặc định
//   (danhSachCanBo:[]) → khi đồng bộ, máy này bị coi là "đã sửa" → chGop(Drive, máy này) để máy này ưu tiên ở lá → mảng RỖNG đè danh sách trên Drive.
//   Sửa: ở nhánh gộp "máy này ưu tiên", lá RỖNG (mảng / chuỗi trống) của máy này không đè lá CÓ GIÁ TRỊ của Drive (chGopGiu, js/17). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const giu = JSON.parse(JSON.stringify({gdx:D.cauHinh.gdx, chBam:D.cauHinh.chBam}));
   /* máy mới: mở tab GDX → khối mặc định, danh sách rỗng; đã đồng bộ lần trước (chBam có, chưa có khóa gdx) */
   delete D.cauHinh.gdx; D.cauHinh.chBam = {khac:'x'}; gdxC();
   ok('máy mới mở GDX: danh sách cán bộ mặc định rỗng', Array.isArray(D.cauHinh.gdx.danhSachCanBo) && !D.cauHinh.gdx.danhSachCanBo.length);
   const drive = JSON.parse(JSON.stringify(D.cauHinh.gdx)); drive.danhSachCanBo = ['Cán Bộ Giả A', 'Cán Bộ Giả B']; drive.nguoiLap = 'Người Lập Giả';
   chApDrive({gdx:drive});
   ok('nhận bản Drive (Laptop đã khai): danh sách cán bộ KHÔNG bị mảng rỗng của máy này đè', D.cauHinh.gdx.danhSachCanBo.join()==='Cán Bộ Giả A,Cán Bộ Giả B', JSON.stringify(D.cauHinh.gdx.danhSachCanBo));
   ok('ô chữ trống của máy này không đè ô có giá trị trên Drive (người lập)', D.cauHinh.gdx.nguoiLap==='Người Lập Giả', D.cauHinh.gdx.nguoiLap);
   /* máy này đã khai khác (có giá trị) → vẫn ưu tiên máy này như cũ */
   D.cauHinh.gdx.danhSachCanBo = ['Cán Bộ Máy Này']; D.cauHinh.chBam = {khac:'x'};
   chApDrive({gdx:drive});
   ok('máy này đã khai danh sách (có giá trị) → giữ của máy này như cũ', D.cauHinh.gdx.danhSachCanBo.join()==='Cán Bộ Máy Này', JSON.stringify(D.cauHinh.gdx.danhSachCanBo));
   /* máy chưa sửa khóa (dấu khớp) → theo Drive như cũ */
   D.cauHinh.gdx = JSON.parse(JSON.stringify(drive)); D.cauHinh.gdx.danhSachCanBo = []; D.cauHinh.chBam = {gdx:chBamKhoa('gdx')};
   chApDrive({gdx:drive}); ok('máy chưa sửa khóa → theo Drive như cũ', D.cauHinh.gdx.danhSachCanBo.length===2);
   D.cauHinh.gdx = giu.gdx; D.cauHinh.chBam = giu.chBam; if(giu.gdx===undefined) delete D.cauHinh.gdx;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
