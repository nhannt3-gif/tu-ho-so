// 3.439: tiện ích phép thử Phân bổ KH — dựng file Excel MẪU NHẬP QĐ từ dữ liệu QĐ giả (dạng cũ của bản WPF trong các phép thử) rồi nạp qua nút 📥 Nạp QĐ (Excel mẫu).
//   Dùng: await p.evaluate(require('./pb_gia.js')); rồi trong trang: const bao = await pbNhapGia(wpf, 'moi' | 'de' | 'bo' | '') — trả chữ hộp xem trước.
module.exports = () => {
  window.pbNhapGia = async function(wpf, luu){
    const w = t => new Promise(r => setTimeout(r, t)), qd = {}, ct = [['so_qd','xa','ma_ct','ten_ct','da_giao','tang_giam','den_31_12','ghi_chu']];
    wpf.DanhSachQD.forEach(q => { const so = String(q.SoQD).trim(), ng = String(q.NgayQD).slice(0, 10).split('-').reverse().join('/');
      qd[so] = [so, q.KyHieuVanBan || '', ng, +q.NguonVon===2 ? 'ĐP' : 'TW', q.Loai || 'Điều chỉnh', q.Dot || '', '', ''];
      (q.ChiTiet || []).forEach(c => ct.push([so, q.TenXa, ('0'+(+c.MaChuongTrinh)).slice(-2), c.TenChuongTrinh || '', c.ChiTieuDaGiao, c.GiaoTangGiam, c.ChiTieuDen3112, ''])); });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['so_qd','ky_hieu','ngay_qd','nguon','loai','dot','co_quan','trich_yeu']].concat(Object.values(qd))), 'QD');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ct), 'CHI_TIET');
    const f = new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'QD_gia.xlsx'), inp = document.querySelector('input[data-lenh="pb.nhapXls"]'), dt = new DataTransfer();
    dt.items.add(f); document.getElementById('hop-in').innerHTML = ''; inp.files = dt.files; inp.dispatchEvent(new Event('change', {bubbles:true}));
    for(let i=0;i<60 && !document.querySelector('[data-lenh="pb.xlsLuu"],[data-lenh="pb.xlsDong"]');i++) await w(100);
    const chu = (document.getElementById('hop-in') || {}).textContent || '';
    if(luu){ const b = document.querySelector('[data-lenh="pb.xlsLuu"][data-k="'+luu+'"]') || document.querySelector('[data-lenh="pb.xlsLuu"]'); if(b){ b.click(); await w(200); } }
    return chu;
  };
};
