const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const FILE = 'file://'+require('path').resolve(__dirname,'..','index.html');
const kq = []; function ok(ten, dk, ghi){ kq.push((dk?'✓ ':'✗ ')+ten+(ghi?' — '+ghi:'')); }
async function moTrang(b, duLieuCu){
  const ctx = await b.newContext(); const p = await ctx.newPage();
  const loi = []; p.on('pageerror', e=>loi.push(e.message));
  await p.route(/cdnjs|accounts\.google|apis\.google/, r=>r.abort());
  if(duLieuCu) await p.addInitScript(d=>{ if(!localStorage.getItem('tuhoso_v1')) localStorage.setItem('tuhoso_v1', d); }, duLieuCu);
  await p.goto(FILE); await p.waitForTimeout(1000);
  return {p, loi, ctx};
}
(async()=>{
  const b = await chromium.launch();
  for(const kieu of ['máy trắng','máy có dữ liệu cũ']){
    // dữ liệu cũ kiểu 3.29: có tổ, mẫu báo cáo mất cờ, có văn bản
    const cu = kieu==='máy trắng' ? null : JSON.stringify({phienBan:'1.0', cauHinh:{donvi:'PGD thử', thumuc:'Tủ hồ sơ',
      diaBan:[{xa:'Xã Truông Mít',ma:'1',diem:[{ten:'Truông Mít',ma:'2',ngay:'25',ap:[{ten:'Ấp 1',ma:'3',to:[{ma:'001',ten:'TỔ TRƯỞNG THỬ',ut:'11'}]}]}]},
              {xa:'Phường Gia Lộc',ma:'4',diem:[{ten:'Gia Lộc',ma:'5',ap:[]}]}],
      mauBaoCao:[{ten:'Kết quả giao dịch xã',ma:'KQGD',tuKhoa:['kết quả giao dịch'],cap:['xa','diem']},{ten:'Nợ quá hạn',ma:'NQH',tuKhoa:['nợ quá hạn'],cap:[]}],
      maDaBo:['NK']},
      vanBan:[{id:'v1',nhom:'vanBan',tenMoi:'2026-09-01 1/NHCS Thử.pdf',tenCu:'a.pdf',soHieu:'1/NHCS',ngay:'2026-09-01',trichYeu:'Thử',mang:'Tín dụng',ctrinh:['HN'],the:['Tổ TK&VV']}],
      duLieu:[], ghiChu:[], cho:[], ganDay:[], bieuMau:[], rac:[], scan:[]});
    const {p, loi, ctx} = await moTrang(b, cu);
    ok(`[${kieu}] mở app không lỗi`, !loi.length, loi.join('; '));
    let tabs=''; for(const i of [0,1,2,5,4,3]){ tabs += await p.evaluate(async i=>{ try{ doiNgan(i); await new Promise(r=>setTimeout(r,300)); var t=document.getElementById('tr'+i); return i+':'+(t && t.innerHTML.length>50?'ok':'TRỐNG')+' '; }catch(e){ return i+':LỖI '+e.message+' '; } }, i); } await p.evaluate(()=>doiNgan(0));
    ok(`[${kieu}] đi hết 6 tab`, !/TRỐNG|LỖI/.test(tabs), tabs);
    const cd = await p.evaluate(()=>{ var r=[]; ['vanBan','ghiChu','scan','bieuMau','chung','drive','diaban','chimuc','lich','dulieu','hd'].forEach(function(k){ try{ moCaiDat(k); r.push(k+':'+(document.getElementById('cd-noi').innerHTML.length>30?'ok':'TRỐNG')); }catch(e){ r.push(k+':LỖI '+e.message); } }); dongCaiDat(); return r.join(' '); });
    ok(`[${kieu}] mở hết 11 trang Cài đặt (3.144: bỏ trang Dữ liệu tháng)`, !/TRỐNG|LỖI/.test(cd), cd);
    if(cu){
      const db = await p.evaluate(()=>({to:demDiaBan().to, co:JSON.stringify(D.cauHinh.mauBaoCao.find(x=>x.ma==='KQGD')), nk:D.cauHinh.mauBaoCao.some(x=>x.ma==='NK')}));
      ok('máy cũ giữ nguyên tổ đã lưu', db.to===1, 'số tổ '+db.to);
      ok('KQGD được điền lại cờ theoNgay', /theoNgay/.test(db.co), db.co);
      ok('báo cáo đã bỏ (NK) không bị thêm lại', !db.nk);
    }else{
      const t = await p.evaluate(()=>({to:demDiaBan().to, xa:demDiaBan().xa, ap:demDiaBan().ap}));
      ok('máy trắng: có cây xã/ấp, không có tổ nào', t.to===0 && t.xa===5 && t.ap>50, JSON.stringify(t));
    }
    // L2: lưu cài đặt tab Dữ liệu tháng giữ cờ
    const l2 = await p.evaluate(()=>{ var n0=D.cauHinh.mauBaoCao.filter(x=>x.theoNgay||x.thuanXLS||x.coExcel).length; moCaiDat('duLieu'); luuCDTab('duLieu'); dongCaiDat(); return [n0, D.cauHinh.mauBaoCao.filter(x=>x.theoNgay||x.thuanXLS||x.coExcel).length]; });
    ok('Lưu cài đặt tab Dữ liệu tháng giữ cờ mẫu', l2[0]===l2[1] && l2[0]>0, l2.join(' → '));
    // N1: bỏ báo cáo rồi mở lại
    const bb = await p.evaluate(()=>{ window.hoi=function(a,b,c,f){f();}; var co0=D.cauHinh.mauBaoCao.some(x=>x.ma==='NQH'); boBaoCao('NQH'); return JSON.stringify({co0, sau:D.cauHinh.mauBaoCao.some(x=>x.ma==='NQH'), daBo:D.cauHinh.maDaBo, ls:JSON.parse(localStorage.getItem('tuhoso_v1')).cauHinh.maDaBo}); }); console.log('BB', kieu, bb);
    await p.reload(); await p.waitForTimeout(900);
    const nq = await p.evaluate(()=>JSON.stringify({co:D.cauHinh.mauBaoCao.filter(x=>x.ma==='NQH').length, daBo:D.cauHinh.maDaBo}));
    ok('Báo cáo đã bỏ không tự quay lại khi mở lại app', /"co":0/.test(nq), nq);
    // L4/L5 sổ
    const so = await p.evaluate(()=>{ doiNgan(0); ntDatChe('don'); var iso=lcISO(nay()); var n0=dsDong(iso).length;
      document.getElementById('nk-dong-moi').value='Việc A'; document.querySelector('.og-them').click(); var n1=dsDong(iso).length;
      var m=dsDong(iso)[0]; dongPhim({key:'Enter',preventDefault(){}}, m.id, iso); var n2=dsDong(iso).length; return [n0,n1,n2]; });
    ok('Nút Thêm ở sổ thêm được dòng', so[1]===so[0]+1, so.join(','));
    ok('Enter giữa danh sách thêm dòng trống', so[2]===so[1]+1);
    ok('Ô lịch có data-iso', await p.evaluate(()=>document.querySelectorAll('.lc-o[data-iso]').length)===42);
    // L3 thả file
    const th = await p.evaluate(async()=>{ doiNgan(6); var n0=D.cho.length; const dt=new DataTransfer(); dt.items.add(new File(['x'+Math.random()],'thu.docx'));
      document.getElementById('vung-tha').dispatchEvent(new DragEvent('drop',{dataTransfer:dt,bubbles:true,cancelable:true}));
      await new Promise(r=>setTimeout(r,800)); return D.cho.length-n0; });
    ok('Thả 1 file vào ô thả → 1 mục', th===1, 'thêm '+th);
    // A5 (3.144: bỏ tab Tháng) — thả Excel → sang tab Nạp & KT đọc số liệu, không vào khay chờ
    const xl = await p.evaluate(async()=>{ D.cho=[]; window.slDocNhieu=function(){ window._slNhieu=1; }; await gioiThieuFile([new File(['a'+Math.random()],'Sao ke.xlsx')]); await new Promise(r=>setTimeout(r,500));
      return {cho:D.cho.length, nhieu:!!window._slNhieu}; });
    ok('Thả Excel → đọc vào Số liệu (không vào khay chờ tab Tháng)', xl.cho===0 && xl.nhieu, JSON.stringify(xl));
    // ghi chú về đúng tab
    const gc = await p.evaluate(async()=>{ D.cho=[]; doiNgan(6); await gioiThieuFile([new File(['b'+Math.random()],'anh.jpg',{type:'image/jpeg'})]); await new Promise(r=>setTimeout(r,500)); duyet(D.cho[0].id,true); await new Promise(r=>setTimeout(r,300)); return nganHienTai; });
    ok('Duyệt ghi chú về tab Ghi chú (3)', gc===3, 'tab '+gc);
    ok(`[${kieu}] không phát sinh lỗi trong suốt phiên`, !loi.length, loi.join('; '));
    await ctx.close();
  }
  await b.close();
  console.log(kq.join('\n'));
})();
