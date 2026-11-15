// t368 (3.463, anh 04/11 "làm Mẫu 11 mới theo chuẩn 10A", "đúng mẫu từng chữ, ko được bỏ hay sửa", "tổ trưởng lấy theo danh sách tổ mới nhất",
//   "khi cần in bổ sung lại tổ cũ thì chọn dữ liệu cũ", "làm luôn mẫu 11 cũ song song", "nhớ chuyển qua mẫu chung"):
//   ① chữ in sẵn 11/TD mới, cũ = file gốc tests/mau_goc/11_moi.docx, 11_cu.docx (không thiếu chữ nào của gốc)
//   ② chuẩn 10A trên phần chung HST: chữ liền in thường, tên hoa đầu từ, tách ô, Nhập liệu riêng, gắn qua hsoMauGan
//   ③ tổ trưởng theo Danh sách tổ mới nhất · chọn bản cũ · Mẫu 31 · nhớ theo tổ · ↺ về mới nhất. Bộ GIẢ tests/gianho31 + Danh sách tổ giả.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 /* ① so chữ với file gốc: mọi chữ của gốc phải có trong bản trắng app (đếm từng chữ); ngoại lệ = dữ liệu giả điền sẵn trong file gốc 11 cũ, dấu = + trong ô công thức */
 const trang = await p.evaluate(async()=>{ await xongTV; OM_KIEU = 'trang'; const r = {};
   for(const k of ['11', '11cu']){ const d = document.createElement('div'); d.innerHTML = hsoMauK(k).lap(null).h; r[k] = d.innerHTML.replace(/<\/?(p|div|td|tr|br|table)[^>]*>/g, '\n').replace(/<[^>]+>/g, ''); }
   OM_KIEU = 'that'; return r; });
 const tm = fs.mkdtempSync(path.join(os.tmpdir(), 't368-')); fs.writeFileSync(path.join(tm, '11.txt'), trang['11']); fs.writeFileSync(path.join(tm, '11cu.txt'), trang['11cu']);
 const so = JSON.parse(cp.execFileSync('python3', ['-I', '-c', `
import zipfile, re, html, json, sys, collections
def chu(s):
    s = html.unescape(s).replace('\\u00a0', ' '); s = re.sub(r'[.…_]{2,}', ' ', s)
    return re.findall(r'[^\\s.…]+', s)
kq = {}
for k, f in [('11', '11_moi'), ('11cu', '11_cu')]:
    x = zipfile.ZipFile(sys.argv[1]+'/'+f+'.docx').read('word/document.xml').decode()
    x = re.sub(r'<mc:Fallback>.*?</mc:Fallback>', '', x, flags=re.S)   # hộp chữ Word lưu 2 bản (bản dự phòng) — chỉ đếm 1
    goc = chu('\\n'.join(''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', q)) for q in re.findall(r'<w:p[ >].*?</w:p>', x, re.S)))
    app = chu(open(sys.argv[2]+'/'+k+'.txt', encoding='utf-8').read())
    thieu = collections.Counter(goc) - collections.Counter(app)
    kq[k] = {'goc': len(goc), 'thieu': {w: n for w, n in thieu.items()}}
print(json.dumps(kq, ensure_ascii=False))`, path.join(__dirname, 'mau_goc'), tm]).toString());
 fs.rmSync(tm, {recursive:true, force:true});
 const NGOAI = {'11':/^[),]$/,   /* 11 mới: số chú thích ¹ ² dính ')' ; dấu ',' sau tên PGD đã điền (gốc có khoảng trắng trước) */
   '11cu':/^(Nguyễn|Văn|Giả|Giám|đốc|Số|09|Đường|Khu|phố|Phường|Gò|Dầu|tỉnh|Tây|Ninh|0900000000|==|\+\+)$/};   /* file gốc 11 cũ có điền sẵn Bên A giả; dấu công thức nằm trong ô bảng */
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const t = KHO.dsTo().find(t=>!toLaTT(t) && t.ten), C = hsoCH(); C.xa = t.xa; C.diem = t.khoaDiem; C.to = t.ma;
   /* Danh sách tổ GIẢ: bản mới 15/10 (tổ trưởng mới), bản cũ 31/07 (tổ trưởng cũ), bản 30/06 không có tổ này */
   const dsGia = [{ky:'2026-10-15', rows:[{to:t.ma, ttKH:'9990001', toTen:'NGUYỄN THỊ MỚI', cccd:'079000000001', ncap:'2024-08-01'}]},
     {ky:'2026-07-31', rows:[{to:t.ma, ttKH:'9990002', toTen:'TRẦN VĂN CŨ', cccd:'079000000002', ncap:'2021-05-02'}]}, {ky:'2026-06-30', rows:[{to:'0000001', toTen:'TỔ KHÁC'}]}];
   const dsB = KHO.dsBang; KHO.dsBang = function(l){ return l==='dsto' ? dsGia.map(x=>({ky:x.ky, luc:1})) : dsB.apply(this, arguments); };
   window.dsTTDs = () => Promise.resolve(dsGia);
   /* cổng gắn mẫu */
   const ks = HSO_MAU.hst.map(m=>m.k).join(',');
   ok('11 mới, 11 cũ gắn qua cổng hsoMauGan, thứ tự chip như cũ (… 10D · 11 mới · 11 cũ · 01/BG …)', /10d,11,11cu,01bg/.test(ks) && !!hsoMauK('11').lap && !!hsoMauK('11cu').trai, ks);
   for(const mk of ['11', '11cu']){ const ten = mk==='11' ? '11 mới' : '11 cũ';
     delete (hsoLuu().ttNguon || {})[t.ma]; hsoChonMau(mk); await w(600); hsoVe(); await w(500);
     let h = HSO.x.h, tx = h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
     const trai = document.getElementById('hso-tuy');
     ok(ten+': cột trái "👑 Tổ trưởng ký hợp đồng" — mặc định Danh sách tổ mới nhất', /Tổ trưởng ký hợp đồng/.test(trai.textContent) && /Danh sách tổ mới nhất \(/.test(trai.textContent) && /Nguyễn Thị Mới/.test(trai.textContent), trai.textContent.slice(trai.textContent.indexOf('Tổ trưởng ký'), trai.textContent.indexOf('Tổ trưởng ký')+200));
     ok(ten+': tổ trưởng theo Danh sách tổ mới nhất — tên hoa đầu từ, CCCD, ngày cấp', /Nguyễn Thị Mới/.test(tx) && !/NGUYỄN THỊ MỚI/.test(tx) && /079000000001/.test(tx) && /01\s*\/\s*08\s*\/\s*2024/.test(tx), (tx.match(/Đại diện [oô]ng \(b[aà]\):.{0,40}/i)||[''])[0]);
     ok(ten+': chữ điền liền, in thường (không đậm, không khung chấm)', /<span style="font-weight:normal" class="om om-tu" data-o="ttTen">Nguyễn Thị Mới<\/span>/.test(h));
     ok(ten+': tách ô — Bên A chức vụ, ngày cấp, nơi cấp, xã, chữ ký Bên A riêng', ['daiDienCv', 'cccdNgay', 'cccdNoi', 'diaXa', 'kyA', 'ttTen'].every(k=>OM_MAU[mk].oK[k]));
     ok(ten+': Nhập liệu riêng Điền hết / Tùy chọn', (()=>{ OM_KIEU = 'mau'; const k = omKieuHTML(mk); OM_KIEU = 'that'; return /Điền hết/.test(k) && /Tùy chọn/.test(k) && !/Chừa phê duyệt/.test(k); })());
     /* chọn bản cũ → tổ trưởng cũ; nhớ theo tổ; về mới nhất */
     const sel = trai.querySelector('select[data-lenh="hstt.chon"]'); sel.value = '2026-07-31'; sel.dispatchEvent(new Event('change', {bubbles:true})); await w(600);
     h = HSO.x.h; tx = h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
     ok(ten+': in bổ sung tổ cũ — chọn Danh sách tổ 31/07 → tổ trưởng cũ, nhớ theo tổ, có ↺ Về mới nhất', /Trần Văn Cũ/.test(tx) && /079000000002/.test(tx) && hsoLuu().ttNguon[t.ma]==='2026-07-31' && !!document.querySelector('[data-lenh="hstt.ve"]'));
     const sel2 = document.querySelector('select[data-lenh="hstt.chon"]'); sel2.value = '2026-06-30'; sel2.dispatchEvent(new Event('change', {bubbles:true})); await w(600);
     ok(ten+': bản đã chọn không có tổ → báo, lấy bản gần nhất có tổ', /không có tổ này/.test(document.getElementById('hso-tuy').textContent) && /Nguyễn Thị Mới/.test(HSO.x.h));
     const sel3 = document.querySelector('select[data-lenh="hstt.chon"]'); sel3.value = 'm31'; sel3.dispatchEvent(new Event('change', {bubbles:true})); await w(600);
     ok(ten+': chọn Mẫu 31 kỳ đang chọn → tên tổ theo Mẫu 31', !/Nguyễn Thị Mới|Trần Văn Cũ/.test(HSO.x.h) && new RegExp(tenHoaDau(t.ten).split(' ').pop()).test(HSO.x.h));
     document.querySelector('[data-lenh="hstt.ve"]').click(); await w(600);
     ok(ten+': ↺ Về mới nhất', !(hsoLuu().ttNguon || {})[t.ma] && /Nguyễn Thị Mới/.test(HSO.x.h));
   }
   /* 11 mới: chữ in sẵn sửa đúng gốc */
   hsoChonMau('11'); await w(500); const h11 = HSO.x.h.replace(/<[^>]+>/g, '');
   ok('11 mới: "để trình cấp có thẩm quyền" (gốc), "(Ký tên, đóng dấu)"', /bị rủi ro để trình cấp có thẩm quyền/.test(h11) && !/gửi cấp có thẩm quyền/.test(h11) && /\(Ký tên, đóng dấu\)/.test(h11));
   ok('11 mới: tên PGD không dính chữ "xã hội"', /Phòng giao dịch Ngân hàng Chính sách xã hội[\s.…]/.test(h11.replace(/&nbsp;/g, ' ')), (h11.match(/Phòng giao dịch Ngân hàng Chính sách xã hội.{0,12}/)||[''])[0]);
   KHO.dsBang = dsB; return o; }, files);
 const o = R.slice();
 for(const k of ['11', '11cu']){ const th = Object.keys(so[k].thieu).filter(x=>!(NGOAI[k] && (NGOAI[k].test(x) || NGOAI[k].test(x.replace(/[,;:]$/, '')))));
   o.unshift((th.length ? '✗ ' : '✓ ')+'chữ in sẵn '+(k==='11' ? '11/TD mới' : '11/TD cũ')+' đúng file gốc — '+so[k].goc+' chữ, thiếu / sai: '+(th.length ? th.map(x=>x+'×'+so[k].thieu[x]).join(', ') : 'không')); }
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t368 SAI '+sai : '✓ t368 đạt'); await b.close(); process.exit(sai?1:0); })();
