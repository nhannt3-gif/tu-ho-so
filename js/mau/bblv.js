/* ===== 3.461 (anh 03/11/2026) — BIÊN BẢN LÀM VIỆC: xác minh, đánh giá khoản nợ của hộ vay (nợ quá hạn, nợ khoanh, lãi tồn cao, 3 tháng KHĐ) — nền ô =====
   Dựng theo mẫu trắng anh gửi (tests/mau_goc/bblv.doc). Anh chốt 03/11:
   - MỖI HỘ 1 BIÊN BẢN; chọn 1 món → mục 1 dạng dòng như mẫu gốc; chọn nhiều món → dạng bảng (CT viết tắt · số KU, mục đích theo món, Cộng), không dòng chú thích.
   - "Tổng số nợ phải trả … đến ngày" → dạng dòng: "Dư nợ đến ngày …: gốc … đồng; lãi … đồng."; dạng bảng: ngày ghi ở tiêu đề mục 1, tổng ở dòng Cộng.
   - 4 dòng thành phần + chỗ ký: để trống (ai có mặt tự ghi tên) — vẫn bật 🤖 được ở ⚙ Khai báo riêng.
   - Mục 2–5 mặc định ✍ chấm ghi tay; câu gợi ý chỉ là tùy chọn (chọn nhiều, ➕ thêm).
   - TRỌN 1 TRANG A4: giãn dòng + thêm dòng chấm khi ngắn; dài thì bớt dòng chấm (tối thiểu 1 / mục) rồi thu giãn dòng; vẫn không vừa → ⚠ báo, không thu chữ.
   - Bản trắng: dạng dòng 1 món (⚙ chọn được bảng 3–6 dòng trống).
   Chọn hộ / món: HSN (js/mau/0hsn.js). Bỏ file → mất chip BBLV (gắn qua hsoMauGan — 3.462), app chạy như trước. ES5. */
(function(){
  var MK = 'bblv', CO = 13, MG = [15, 15, 15, 25];
  hsoMauGan('hsv', {k:'bblv', ma:'BBLV',   ten:'Biên bản làm việc — xác minh, đánh giá khoản nợ của hộ (nợ quá hạn, khoanh, lãi tồn cao, 3 tháng KHĐ); mỗi hộ 1 biên bản, trọn 1 trang A4', mg:[15, 15, 15, 25], sau:'06a'});   /* 3.462: tự gắn chip (cổng js/25) */
  var GOI = {
    ngNhan:['Thiên tai, hạn hán, lũ lụt làm thiệt hại sản xuất', 'Dịch bệnh trên vật nuôi, cây trồng làm thiệt hại vốn đầu tư', 'Giá sản phẩm giảm, tiêu thụ khó khăn, thu nhập không đủ trả nợ',
      'Bản thân / người trong gia đình ốm đau, bệnh nặng phải điều trị dài ngày', 'Lao động chính trong gia đình chết / mất sức lao động', 'Mất việc làm, thu nhập không ổn định',
      'Sử dụng vốn vay không đúng mục đích, không tạo ra thu nhập', 'Làm ăn thua lỗ do thiếu kinh nghiệm, kỹ thuật sản xuất', 'Ý thức trả nợ chưa cao, chưa chủ động trả nợ, lãi',
      'Chi tiêu gia đình chưa hợp lý, ưu tiên khoản khác trước khi trả nợ', 'Người vay đi làm ăn xa, ít về địa phương, không thường xuyên giao dịch với Tổ',
      'Món vay đến hạn nhưng chưa thu hoạch / chưa đến kỳ có thu nhập', 'Hộ còn vay nhiều món, nhiều nguồn, khả năng trả nợ hạn chế'],
    thucTrang:['Kinh tế gia đình khó khăn, thu nhập không ổn định', 'Kinh tế gia đình ổn định, có khả năng trả nợ', 'Có khả năng trả nợ một phần, cần thêm thời gian', 'Không còn khả năng trả nợ'],
    camKet:['Cam kết trả lãi hằng tháng đầy đủ qua Tổ TK&VV tại điểm giao dịch xã', 'Cam kết trả đủ số lãi tồn trong thời gian sớm nhất', 'Cam kết trả nợ gốc quá hạn theo kế hoạch đã thống nhất',
      'Cam kết bổ sung hồ sơ đề nghị gia hạn nợ / điều chỉnh kỳ hạn nợ theo quy định', 'Cam kết sử dụng vốn vay đúng mục đích theo phương án đã đăng ký',
      'Cam kết thường xuyên liên hệ với Tổ trưởng; khi đi làm ăn xa thông báo địa chỉ, số điện thoại liên lạc', 'Cam kết tham gia đầy đủ các buổi sinh hoạt Tổ, chấp hành quy ước hoạt động của Tổ'],
    kienNghi:['Đôn đốc khách hàng trả lãi hằng tháng qua Tổ TK&VV', 'Đôn đốc khách hàng trả nợ gốc quá hạn theo cam kết', 'Lập hồ sơ gia hạn nợ / điều chỉnh kỳ hạn nợ theo quy định',
      'Tổ TK&VV, Hội đoàn thể phối hợp theo dõi, đôn đốc thu hồi nợ', 'Đề nghị UBND cấp xã hỗ trợ đôn đốc thu hồi nợ', 'Lập hồ sơ đề nghị xử lý nợ bị rủi ro theo quy định']};
  var TRANG = ['Dạng dòng (1 món)', 'Bảng 3 dòng', 'Bảng 4 dòng', 'Bảng 5 dòng', 'Bảng 6 dòng'];
  /* 3.461.5 (anh 03/11 "khi chọn bản mẫu anh muốn các gợi ý này hiện ra tương ứng từng mục 2-3-4-5"; "cho chọn tình huống mẫu: KH bỏ địa phương hay còn gọi đi làm ăn xa,
     khách hàng còn địa phương nhưng khó khăn, nhóm KH có điều kiện nhưng chây ỳ") — 📝 Bản mẫu in bộ câu của tình huống chọn; các câu cũng vào gợi ý của bản thật */
  var CA3 = 'Tất cả tình huống (tờ hướng dẫn)', BBLV_MAU = null;   /* 3.461.6 (anh 03/11 "cho chọn 3 tình huống ngay chỗ này luôn, hiện cả 3 t/h luôn để in ra làm mẫu") */
  var MAU = [   /* 3.461.8 (anh 04/11 "đây là hướng dẫn nên em hướng dẫn kỹ các tình huống, câu văn sát thực tế nhất") — câu do TK 3 soạn theo cách ghi thường gặp, anh sửa thì báo */
    {ten:'① Bỏ địa phương / đi làm ăn xa',
      dau:'món vay không có giao dịch từ 3 tháng, lãi tồn tăng dần; Tổ trưởng đến nhà nhiều lần không gặp khách hàng.',
      moi:'người thân đang ở nhà (vợ / chồng / cha / mẹ / con); Trưởng ấp hoặc Công an viên để xác nhận khách hàng vắng mặt tại địa phương.',
      ngNhan:'Ông (bà) … đã đi làm ăn xa tại … từ khoảng tháng …/…, đến nay không về địa phương; số điện thoại … không liên lạc được; từ tháng …/… không nộp lãi, không giao dịch với Tổ TK&VV',
      thucTrang:'Tại địa phương còn ông (bà) … là … của khách hàng, làm nghề …, thu nhập khoảng … đồng/tháng; nhà, đất tại … do ông (bà) … đang quản lý, sử dụng. Người thân cho biết khách hàng đang làm … tại …, thu nhập không ổn định',
      camKet:'Ông (bà) … (người thân) cam kết liên lạc, đề nghị khách hàng về làm việc với Tổ TK&VV và Ngân hàng trước ngày …/…/…; trong thời gian chờ, nộp lãi hằng tháng qua Tổ TK&VV mỗi tháng … đồng; trả nợ thay số tiền … đồng trước ngày …/…/…',
      kienNghi:'Tổ TK&VV, Hội … tiếp tục liên lạc với người thân, theo dõi việc nộp lãi hằng tháng; đề nghị UBND cấp xã, Trưởng ấp xác nhận tình trạng vắng mặt của khách hàng; đến ngày …/…/… khách hàng không về làm việc và gia đình không trả nợ thay thì lập hồ sơ đề nghị xử lý nợ theo quy định'},
    {ten:'② Còn ở địa phương nhưng khó khăn',
      dau:'có lãi tồn hoặc nợ quá hạn nhưng khách hàng vẫn ở nhà, hợp tác, có nộp một phần khi có tiền.',
      moi:'khách hàng (hoặc người cùng vay); Tổ trưởng; đại diện Hội nhận ủy thác.',
      ngNhan:'Năm …, gia đình gặp khó khăn: … (chồng / vợ bệnh … phải điều trị dài ngày; vật nuôi bị dịch … chết … con; cây trồng mất mùa; mất việc làm…), chi phí lớn, thu nhập giảm nên không đủ tiền trả nợ, lãi đúng hạn',
      thucTrang:'Hiện gia đình có … nhân khẩu, … lao động; thu nhập chính từ … khoảng … đồng/tháng; vốn vay đang sử dụng vào … (còn … con bò / … sào mì / …); có khả năng nộp lãi hằng tháng và trả dần nợ gốc',
      camKet:'Khách hàng cam kết nộp lãi hằng tháng đầy đủ qua Tổ TK&VV từ tháng …/…; trả dần nợ gốc mỗi tháng (mỗi quý) … đồng; trả dứt điểm số nợ quá hạn … đồng trước ngày …/…/…',
      kienNghi:'Tổ TK&VV, Hội … theo dõi, đôn đốc khách hàng thực hiện đúng cam kết; hướng dẫn khách hàng lập hồ sơ đề nghị gia hạn nợ / điều chỉnh kỳ hạn trả nợ nếu đủ điều kiện; trường hợp gặp rủi ro do nguyên nhân khách quan thì lập hồ sơ đề nghị xử lý rủi ro theo quy định'},
    {ten:'③ Có điều kiện nhưng chây ỳ',
      dau:'kinh tế gia đình khá (buôn bán, nhà cửa, phương tiện), đã được nhắc nhiều lần, hẹn trả nhưng không thực hiện.',
      moi:'Trưởng ấp; đại diện UBND cấp xã hoặc Hội cấp xã; Tổ trưởng.',
      ngNhan:'Khách hàng có điều kiện trả nợ (… kinh doanh / nhà / phương tiện …) nhưng chưa chấp hành nghĩa vụ trả nợ; Tổ TK&VV đã nhắc … lần (ngày …/…, ngày …/…), khách hàng hẹn trả nhưng không thực hiện',
      thucTrang:'Kinh tế gia đình ổn định, thu nhập từ … khoảng … đồng/tháng; tài sản gồm …; khách hàng có đủ khả năng trả nợ',
      camKet:'Khách hàng cam kết trả toàn bộ lãi tồn … đồng và nợ gốc quá hạn … đồng trước ngày …/…/…; nếu không thực hiện đúng cam kết, khách hàng chịu trách nhiệm và đồng ý để Ngân hàng phối hợp chính quyền địa phương xử lý theo quy định',
      kienNghi:'Đề nghị UBND cấp xã, Hội … cấp xã phối hợp Tổ TK&VV đôn đốc khách hàng trả nợ theo cam kết; quá thời hạn cam kết không trả, Ngân hàng báo cáo UBND cấp xã và áp dụng các biện pháp thu hồi nợ theo quy định'},
    /* 3.461.9 (anh 04/11 "nghĩ thêm có tình huống nào nữa ngoài 3 t/h trên"; "em soạn tiếp các tình huống còn lại luôn") */
    {ten:'④ Khách chết / mất tích / mất năng lực hành vi',
      dau:'Tổ trưởng hoặc gia đình báo khách hàng đã chết (mất tích, mất năng lực hành vi dân sự); món vay còn dư nợ, lãi tồn.',
      moi:'người thừa kế (vợ / chồng / con) hoặc người giám hộ; Trưởng ấp; đại diện UBND cấp xã.',
      ngNhan:'Khách hàng ông (bà) … đã chết ngày …/…/… (theo Giấy chứng tử số … do UBND … cấp ngày …/…/…) / mất tích từ tháng …/… / mất năng lực hành vi dân sự; từ đó gia đình không tiếp tục trả nợ, lãi',
      thucTrang:'Gia đình hiện còn … người; người thừa kế là ông (bà) … (quan hệ: …), làm nghề …, thu nhập khoảng … đồng/tháng; tài sản khách hàng để lại gồm …; vốn vay đã sử dụng vào … (còn / không còn)',
      camKet:'Người thừa kế ông (bà) … cam kết nhận trả nợ thay số tiền … đồng, trả dần mỗi tháng … đồng, dứt điểm trước ngày …/…/… (trường hợp không có khả năng trả nợ thay thì ghi rõ lý do)',
      kienNghi:'Tổ TK&VV, Hội … hướng dẫn gia đình bổ sung giấy tờ (giấy chứng tử / quyết định tuyên bố mất tích / xác nhận của UBND cấp xã); trường hợp người thừa kế không có khả năng trả nợ thay thì lập hồ sơ đề nghị xử lý nợ bị rủi ro theo quy định'},
    {ten:'⑤ Rủi ro khách quan (thiên tai, dịch bệnh)',
      dau:'nhiều hộ trong ấp, xã cùng bị thiệt hại; địa phương có công bố thiên tai, dịch bệnh; vốn vay mất một phần hoặc toàn bộ.',
      moi:'khách hàng; Tổ trưởng; đại diện Hội; đại diện UBND cấp xã (xác nhận thiệt hại).',
      ngNhan:'Ngày …/…/…, … (bão / lũ / hạn mặn / dịch … trên vật nuôi, cây trồng) làm thiệt hại … (… con … chết / … m² … mất trắng / chuồng trại, nhà cửa hư hỏng), ước thiệt hại khoảng … đồng, tương đương …% vốn vay',
      thucTrang:'Sau thiệt hại, gia đình còn … (… con … / … m² …); thu nhập hiện nay từ … khoảng … đồng/tháng; khách hàng có / không có khả năng trả nợ đúng hạn',
      camKet:'Khách hàng cam kết khôi phục sản xuất, nộp lãi hằng tháng qua Tổ TK&VV trong khả năng; trả nợ gốc khi có thu nhập trở lại (dự kiến tháng …/…)',
      kienNghi:'Đề nghị UBND cấp xã xác nhận thiệt hại; Tổ TK&VV, Hội hướng dẫn khách hàng lập hồ sơ đề nghị gia hạn nợ / khoanh nợ / xử lý nợ bị rủi ro do nguyên nhân khách quan theo quy định'},
    {ten:'⑥ Sử dụng vốn sai mục đích / vay hộ',
      dau:'kiểm tra sử dụng vốn (Mẫu 06A) phát hiện không đầu tư như phương án; người thực sử dụng vốn không phải người đứng tên vay.',
      moi:'khách hàng đứng tên vay; người thực sử dụng vốn (nếu có); Tổ trưởng; đại diện Hội.',
      ngNhan:'Khách hàng sử dụng vốn vay sai mục đích: số tiền … đồng dùng vào … (thay vì … theo phương án) / cho ông (bà) … mượn sử dụng (vay hộ) từ ngày …/…/…; người sử dụng vốn không trả nợ, lãi đúng hạn',
      thucTrang:'Số vốn sử dụng đúng mục đích: … đồng; sai mục đích: … đồng; người thực sử dụng vốn là ông (bà) …, địa chỉ …, khả năng trả nợ: …',
      camKet:'Khách hàng (và người sử dụng vốn ông (bà) …) cam kết trả số tiền sử dụng sai mục đích … đồng trước ngày …/…/…; số còn lại sử dụng đúng mục đích theo phương án',
      kienNghi:'Đề nghị thu hồi nợ trước hạn số tiền sử dụng sai mục đích theo quy định; Tổ TK&VV, Hội tăng cường kiểm tra, không để tái diễn tình trạng vay hộ, cho mượn tên'},
    {ten:'⑦ Đã nộp cho Tổ trưởng nhưng Ngân hàng chưa nhận',
      dau:'khách hàng xuất trình sổ vay vốn / biên lai đã nộp tiền cho Tổ trưởng, nhưng số liệu Ngân hàng vẫn còn lãi tồn, nợ chưa giảm.',
      moi:'khách hàng; Tổ trưởng (người nhận tiền); đại diện Hội; cán bộ Ngân hàng.',
      ngNhan:'Khách hàng cho biết đã nộp cho ông (bà) … (Tổ trưởng) số tiền … đồng (lãi … đồng, gốc … đồng) vào ngày …/…/… (có / không có biên lai; sổ vay vốn ghi …); số tiền này chưa được nộp vào Ngân hàng',
      thucTrang:'Chứng từ khách hàng xuất trình: … (biên lai số …, ngày …/…/…; sổ vay vốn trang …); Tổ trưởng ông (bà) … xác nhận đã nhận / không thừa nhận số tiền trên',
      camKet:'Tổ trưởng ông (bà) … cam kết nộp đủ số tiền … đồng đã thu của khách hàng vào Ngân hàng trước ngày …/…/…; khách hàng cam kết tiếp tục trả nợ, lãi theo quy định',
      kienNghi:'Đề nghị Ngân hàng, Hội … xác minh số tiền Tổ trưởng đã thu chưa nộp của các tổ viên khác; yêu cầu Tổ trưởng nộp trả đủ; xử lý Tổ trưởng theo quy định và kiện toàn Ban quản lý Tổ nếu cần'},
    {ten:'⑧ Đang chấp hành án / tạm giam',
      dau:'gia đình hoặc Công an xã báo khách hàng đang chấp hành án phạt tù / bị tạm giam.',
      moi:'người thân (vợ / chồng / con); Trưởng ấp hoặc Công an viên.',
      ngNhan:'Khách hàng ông (bà) … đang chấp hành án phạt tù (bị tạm giam) tại … từ ngày …/…/…, thời hạn … năm; trong thời gian này không có thu nhập, gia đình chưa thu xếp trả nợ, lãi',
      thucTrang:'Tại địa phương còn ông (bà) … (quan hệ: …) đang sinh sống, làm nghề …, thu nhập khoảng … đồng/tháng; vốn vay đã sử dụng vào …; tài sản hiện có: …',
      camKet:'Ông (bà) … (người thân) cam kết nộp lãi hằng tháng qua Tổ TK&VV mỗi tháng … đồng / trả nợ thay số tiền … đồng trước ngày …/…/…',
      kienNghi:'Tổ TK&VV, Hội theo dõi, đôn đốc người thân trả nợ, lãi; khi khách hàng chấp hành xong án phạt tù, làm việc lại để xác định kế hoạch trả nợ; trường hợp đủ điều kiện thì lập hồ sơ xử lý theo quy định'}];
  var HD_CHUNG = ['Lập tại nhà khách hàng (hoặc trụ sở UBND cấp xã / điểm giao dịch xã); ghi đúng ngày, nơi làm việc.',
    'Thành phần tối thiểu: cán bộ Ngân hàng hoặc cán bộ Hội nhận ủy thác, Tổ trưởng Tổ TK&VV, khách hàng (hoặc người thân). Nợ khó thu nên mời thêm Trưởng ấp / đại diện UBND cấp xã.',
    'Mục 1 app in sẵn theo sổ sách Ngân hàng đến ngày số liệu — đối chiếu với sổ vay vốn, biên lai của khách hàng; có chênh lệch thì ghi rõ ở mục 3.',
    'Mục 2 – 5 ghi cụ thể: thời gian, số tiền, tên người, việc làm; không ghi chung chung "khó khăn", "chưa có tiền". Hộ có nhiều nguyên nhân thì ghép câu của nhiều tình huống.',
    'Cam kết (mục 4) phải có số tiền và ngày cụ thể; do khách hàng hoặc người trả nợ thay tự nói, cán bộ ghi lại.',
    'Đọc lại cho các bên nghe, ký đủ; ai không ký thì ghi rõ lý do.'];
  ['ngNhan', 'thucTrang', 'camKet', 'kienNghi'].forEach(function(k){ MAU.forEach(function(t){ if(GOI[k].indexOf(t[k])<0) GOI[k].push(t[k]); }); });   /* câu tình huống vào gợi ý bản thật */
  var ND = [['ngNhan', '2. Nguyên nhân không trả được nợ'], ['thucTrang', '3. Thực trạng tình hình kinh tế và khả năng trả nợ của khách hàng'], ['camKet', '4. Cam kết của khách hàng (hoặc người trả nợ thay)'], ['kienNghi', '5. Kiến nghị biện pháp xử lý nợ']];
  omDangKy({k:MK, ma:'BBLV', phan:['ky', 'tp', 'kh', 'nd', 'kyt'], co:CO,
    dien:[['het', 'Điền hết'], ['tuy', 'Tùy chọn']],
    phanTen:{ky:'Ngày, nơi làm việc', tp:'Thành phần (4 người)', kh:'Khách hàng, thông tin món vay', nd:'Nội dung 2–5 (ghi tay / câu gợi ý)', kyt:'Họ tên dưới chữ ký'},
    o:[{k:'ngay', n:'Hôm nay, ngày', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noi', n:'Tại (địa chỉ khách: ấp, xã, tỉnh)', p:'ky', l:'tukb', md:'tu', ng:'người vay — M31 (ấp, xã) + ⚙ Khai báo đơn vị (tỉnh)', nhanh:1},
      {k:'tp1Ten', n:'1. Ông (bà)', p:'tp', l:'kb', md:'cham'}, {k:'tp1Dd', n:'1. Đại diện', p:'tp', l:'kb', md:'cham'},
      {k:'tp2Ten', n:'2. Ông (bà)', p:'tp', l:'kb', md:'cham'}, {k:'tp2Dd', n:'2. Đại diện', p:'tp', l:'kb', md:'cham'},
      {k:'tp3Ten', n:'3. Ông (bà) — Đại diện Tổ TK&VV', p:'tp', l:'tu', md:'cham', ng:'tổ trưởng — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'tp4Ten', n:'4. Ông (bà) — Đại diện Khách hàng vay vốn', p:'tp', l:'tu', md:'cham', ng:'người vay — M31'},
      {k:'tinhHuong', n:'Khoản nợ xác minh (tình huống)', p:'kh', l:'tu', md:'tu', ng:'các món đã chọn — M31 (QH, khoanh, lãi tồn, KHĐ)'},
      {k:'ten', n:'Của ông (bà) — họ tên khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'maKH', n:'Mã khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'diaChi', n:'Địa chỉ', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'tt', n:'Là thành viên Tổ do Ông (bà) … làm Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'hoi', n:'Thuộc tổ chức Hội … quản lý', p:'kh', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'ngaySL', n:'Dư nợ đến ngày (ngày số liệu)', p:'kh', l:'tu', md:'tu', ng:'ngày số liệu Mẫu 31 đang mở'},
      {k:'mon', n:'1. Thông tin về món vay (1 món: dòng · nhiều món: bảng)', p:'kh', l:'tu', md:'tu', ng:'các món đã chọn — M31'},
      {k:'tinhMau', n:'📝 Bản mẫu — tình huống mẫu (mục 2–5)', p:'nd', l:'chon', md:'kb', chon:[CA3].concat(MAU.map(function(t){ return t.ten; })), chonMD:1, khongBao:1},   /* 3.461.6: chọn ngay ở khung Bản mẫu (mauThem) */
      {k:'monTrang', n:'Bản trắng — mục 1', p:'kh', l:'chon', md:'kb', chon:TRANG, chonMD:1, khongBao:1},   /* ô cài đặt — không báo "chưa có số liệu" */
      {k:'ngNhan', n:'2. Nguyên nhân không trả được nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.ngNhan},
      {k:'thucTrang', n:'3. Thực trạng kinh tế, khả năng trả nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.thucTrang},
      {k:'camKet', n:'4. Cam kết của khách hàng', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.camKet},
      {k:'kienNghi', n:'5. Kiến nghị biện pháp xử lý nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.kienNghi},
      {k:'kyKH', n:'Ký — KH vay vốn (họ tên)', p:'kyt', l:'tu', md:'cham', ng:'người vay — M31'},
      {k:'kyTo', n:'Ký — Tổ TK&VV (họ tên)', p:'kyt', l:'tu', md:'cham', ng:'tổ trưởng — File Tổ trưởng / M31'},
      {k:'kyDd1', n:'Ký — Đại diện (cột 3)', p:'kyt', l:'kb', md:'cham'}, {k:'kyDd2', n:'Ký — Đại diện (cột 4)', p:'kyt', l:'kb', md:'cham'}],
    V:function(t){
      var ho = bblvHo(t), T = t ? hsoTo(t) : {}, k = ho ? ho.k : null, ns = KHO.coKy() ? (KHO.ky().ngay || '') : '';
      var c = k && t && typeof hsoKhach==='function' ? hsoKhach(k.kh, t) : null;
      var dc = k && typeof hsoDiaChi==='function' ? hsoDiaChi(c && c.ten ? c : {ap:k.ap}, t) : '';
      return {ngay:HSO.o && HSO.o.ngay || '', noi:dc, tp3Ten:T.tt ? tenHoaDau(T.tt) : '', tp4Ten:k ? tenHoaDau(k.ten||'') : '', tinhHuong:ho ? HSN.tinhHuong(ho.mon) : '',
        ten:k ? tenHoaDau(k.ten||'') : '', maKH:k ? k.kh : '', diaChi:dc, tt:T.tt ? tenHoaDau(T.tt) : '', hoi:T.hoi || '', ngaySL:ns, mon:ho ? ho.mon : [], kyKH:k ? tenHoaDau(k.ten||'') : '', kyTo:T.tt ? tenHoaDau(T.tt) : ''};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, CO), o = function(k, ch){ return G.o(k, ch, {lien:1}); }, e = coChuHTML;
      var nd = function(d){ if(OM_KIEU==='mau'){ var t = MAU[BBLV_MAU!=null ? BBLV_MAU : bblvMauI()] || MAU[0]; return t[d[0]]+'.'; }   /* 📝 Bản mẫu: bộ câu của tình huống chọn */
        var v = G.gt(d[0]); return v ? v.split('|').filter(Boolean).join('; ')+'.' : ''; };
      var ngay = function(k){ var g = hsoNg(G.gt(k)); return g ? G.o(k, '', {gt:g.d+'/'+g.m+'/'+g.y, lien:1}) : G.o(k, '……/……/………'); };   /* có ngày → dd/mm/yyyy liền (QUY_CHUAN 9.7) */
      var dong = function(L, lh){
        var P = function(noi, s){ return '<p style="margin:0;line-height:'+lh+';'+(s||'')+'">'+noi+'</p>'; }, T = 'text-indent:10mm;', J = 'text-align:justify;', W = 'white-space:nowrap;overflow:hidden;';
        var CH = '………………………………………………………………………………………………………………………………………………………………';
        var Ch = function(n){ var h = ''; for(var i=0;i<n;i++) h += P(CH, W); return h; };
        var ong = function(kT, kD, dd){ var v = G.gt(kT); return 'Ông (bà)'+(v ? ': '+o(kT, '')+'&nbsp;&nbsp; ' : ' '+G.o(kT, '…………………………………………')+' ')+'Đại diện: '+(dd || (G.gt(kD) ? o(kD, '') : G.o(kD, '……………………………'))); };
        if(OM_KIEU==='mau' && BBLV_MAU==null && bblvMauI()<0){   /* 3.461.7 (anh 04/11 "in 3 tình huống trong 1 bản, cho gọn; bỏ bớt các phần không cần, thêm dòng hướng dẫn ghi mẫu"): tờ mẫu chỉ còn tiêu đề + hướng dẫn + mục 2–5 (① ② ③) */
          var muc = function(k){ return (ND.filter(function(d){ return d[0]===k; })[0] || [k, k])[1]; };
          return '<div class="om-goc" style="font-size:'+CO+'pt">'+P('<b>HƯỚNG DẪN GHI BIÊN BẢN LÀM VIỆC</b>', 'text-align:center;font-size:15pt;margin:0 0 2pt')+
            P('<i>(xác minh, đánh giá khoản nợ của hộ vay — mẫu câu ghi mục 2 – 5 theo '+MAU.length+' tình huống thường gặp)</i>', 'text-align:center;margin:0 0 6pt')+
            '<div style="border:1px solid #000;padding:4pt 6pt;margin:0 0 6pt">'+P('<b>Lưu ý chung</b>', '')+HD_CHUNG.map(function(x){ return P('- '+e(x), J+'margin-top:1pt'); }).join('')+'</div>'+
            MAU.map(function(x){ return '<div style="break-inside:avoid;page-break-inside:avoid;margin-top:6pt">'+P('<b>'+e(x.ten)+'</b>', 'margin:0 0 2pt;border-bottom:1px solid #000')+
              P('<i>Dấu hiệu:</i> '+e(x.dau), T+J)+P('<i>Nên mời:</i> '+e(x.moi), T+J)+
              ['ngNhan', 'thucTrang', 'camKet', 'kienNghi'].map(function(k){ return P('<b>'+e(muc(k))+':</b> <span class="om om-mau" data-o="'+k+'">'+e(x[k])+'.</span>', T+J+'margin-top:2pt'); }).join('')+'</div>'; }).join('')+'</div>'; }
        var noi = G.gt('noi'), ten = G.gt('ten'), th = G.gt('tinhHuong');
        var h = P('<b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center')+P('<b>Độc lập – Tự do – Hạnh phúc</b>', 'text-align:center')+P('--------------------------------', 'text-align:center;line-height:1')+
          P('<b>BIÊN BẢN LÀM VIỆC</b>', 'text-align:center;font-size:15pt;margin:6pt 0 4pt')+
          P('Hôm nay, ngày '+ngay('ngay')+', tại '+(noi ? o('noi', '')+'.' : G.o('noi', '…………………………………')+' tỉnh '+e(hsoPGD('tinh') || 'Tây Ninh')+'.'), T+(noi ? J : W))+   /* 3.461.4 (anh 03/11 "mất chữ Tây Ninh"): có địa chỉ → tự xuống dòng; trống → giữ 1 dòng chấm */
          P('Chúng tôi gồm:', T)+
          P('1. '+ong('tp1Ten', 'tp1Dd'), T+W)+P('2. '+ong('tp2Ten', 'tp2Dd'), T+W)+
          P('3. '+ong('tp3Ten', '', 'Tổ TK&amp;VV'), T+W)+P('4. '+ong('tp4Ten', '', 'Khách hàng vay vốn'), T+W)+
          (ten ? P('Đã tiến hành xác minh và đánh giá khoản '+(th ? o('tinhHuong', '') : 'nợ')+' của ông (bà): '+o('ten', '')+' – Mã khách hàng: '+o('maKH', '')+'.', T+J)
               : P('Đã tiến hành xác minh và đánh giá khoản nợ của ông (bà): '+G.o('ten', '………………………………………'), T+W)+P('Mã khách hàng: '+G.o('maKH', '…………………………'), T+W))+
          P('Địa chỉ: '+(G.gt('diaChi') ? o('diaChi', '')+'.' : G.o('diaChi', '……………………………………………………………………………………………………')), T+(G.gt('diaChi') ? J : W))+
          (G.gt('tt') || G.gt('hoi') ? P('Là thành viên Tổ TK&amp;VV do '+(G.gt('tt') ? 'Ông (bà): '+o('tt', '') : 'Ông (bà) '+G.o('tt', '…………………………………'))+' làm Tổ trưởng, thuộc tổ chức '+(/^Hội\b/i.test(G.gt('hoi')) ? o('hoi', '') : 'Hội '+(G.gt('hoi') ? o('hoi', '') : G.o('hoi', '…………………………')))+' quản lý.', T+J)
            : P('Là thành viên Tổ TK&amp;VV do Ông (bà) '+G.o('tt', '…………………………………')+' làm Tổ trưởng, thuộc tổ chức Hội '+G.o('hoi', '…………………………')+' quản lý.', T+W));   /* 3.461.4 (anh 03/11 "ghi thêm là thành viên tổ … cho đồng nhất với 06A") */
        h += bblvMon(G, V, P, T, W, lh);
        ND.forEach(function(d){
          var v = nd(d), n = Math.max(0, v ? L-1 : L);
          h += P('<b>'+d[1]+':</b> '+(v ? '<span class="om om-kb" data-o="'+d[0]+'">'+e(v)+'</span>' : G.o(d[0], '……………………………')), T+(v ? J : W))+Ch(n); });
        h += P('Buổi làm việc kết thúc cùng ngày, đã được đọc lại cho những người có tên nghe, thống nhất với các nội dung trong Biên bản và cùng ký tên dưới đây.', T+J+'margin-top:2pt');
        var ky = function(k){ var v = G.gt(k); return v ? o(k, '') : ''; };
        h += '<table style="width:100%;border-collapse:collapse;margin-top:4pt;break-inside:avoid;page-break-inside:avoid"><tr>'+
          ['KH vay vốn', 'Tổ TK&amp;VV', 'Đại diện ………', 'Đại diện ………'].map(function(x){ return '<td style="width:25%;text-align:center;font-weight:bold;vertical-align:top">'+x+'</td>'; }).join('')+'</tr>'+
          '<tr><td style="height:'+(lh>1.3 ? 26 : 20)+'mm"></td><td></td><td></td><td></td></tr><tr>'+
          ['kyKH', 'kyTo', 'kyDd1', 'kyDd2'].map(function(k){ return '<td style="text-align:center">'+ky(k)+'</td>'; }).join('')+'</tr></table>';
        return '<div class="om-goc" style="font-size:'+CO+'pt">'+h+'</div>'; };
      /* trọn 1 trang A4: nhiều dòng chấm nhất, rồi giãn dòng nhiều nhất còn vừa */
      var H = 297-MG[0]-MG[2]-5, Wm = 210-MG[1]-MG[3], chon = null;
      for(var L=4; L>=1 && !chon; L--){ if(bblvCao(dong(L, 1.15), Wm) <= H){ var lh = 1.15; while(lh < 1.5 && bblvCao(dong(L, lh+0.02), Wm) <= H) lh += 0.02; chon = [L, Math.round(lh*100)/100]; } }
      if(!chon){ chon = [1, 1.15]; OM_DAI.push({mk:MK, k:'mon', n:'Biên bản dài hơn 1 trang', v:'bớt món đã chọn hoặc in 2 trang', gian:1}); }
      return {ma:'BBLV', h:dong(chon[0], chon[1]), L:chon[0], lh:chon[1]};
    }});
  /* mục 1 — dạng dòng (1 món / bản trắng) hoặc bảng (nhiều món / bản trắng chọn bảng) */
  /* 3.480 (anh 05/11 "tình trạng không cần diễn giải số tháng"): nhãn ngắn RIÊNG cho bảng BBLV — HSN.nhan (dùng chung) giữ nguyên */
  function bblvTT(f){ return [f.qh && 'Nợ quá hạn', f.kn && 'Nợ khoanh', f.khd && '3 tháng KHĐ', f.lai>3 && 'Lãi tồn'].filter(Boolean).join(' · '); }
  function bblvMon(G, V, P, T, W, lh){ var e = coChuHTML, c = omCach(MK, 'mon'), ds = c==='cham' ? [] : (V.mon || []), ns = G.gt('ngaySL'), g = hsoNg(ns), nsC = g ? g.d+'/'+g.m+'/'+g.y : '';
    var tr = omKB(MK, 'monTrang') || TRANG[0], nB = ds.length>1 ? 0 : (parseInt((/(\d) dòng/.exec(tr) || [])[1], 10) || 0);
    var nt = function(v){ return v ? ngayVNsl(v) : ''; }, md = function(m){ return typeof ktCoNganh==='function' && ktCoNganh(m) ? ktNganh(m) : ''; };
    if(ds.length>1 || nB){
      var th = 'border:1px solid #000;padding:1pt 2.5pt;vertical-align:middle;', tdS = th+'text-align:right;white-space:nowrap;', nho = 'font-size:9pt;', thD = 'text-align:center;font-weight:bold;';   /* 3.480 (anh 05/11 "tiêu đề canh giữa đều"): tiêu đề giữa cả 2 chiều, KHÔNG tô nền (anh 05/11 "in ra hơi rối"); ô giữa theo chiều dọc */
      var hang = ds.length>1 ? ds.map(function(x, i){ var m = x.m;
        return '<tr><td style="'+th+'text-align:center">'+(i+1)+'</td><td style="'+th+'">'+e(ctNgan(m.ct, m))+'<br><span style="'+nho+'white-space:nowrap">'+e(m.ku)+'</span></td>'+   /* 3.480: gọn — KU chữ nhỏ không bẻ dòng */
          '<td style="'+th+nho+'">'+e(md(m))+'</td><td style="'+tdS+'">'+(m.gn ? tdnTien(m.gn) : '')+'</td>'+
          '<td style="'+th+nho+'white-space:nowrap;text-align:center">'+nt(m.nv)+'<br>'+nt(skHL(m))+'<br><i>'+(nt(m.ngdg) || '—')+'</i></td><td style="'+tdS+'">'+tdnTien(m.dn||0)+'</td><td style="'+tdS+'">'+tdnTien(laiTon(m))+'</td><td style="'+th+'">'+e(bblvTT(x.f))+'</td></tr>'; }).join('')
        : Array.apply(null, {length:nB}).map(function(_, i){ var r = '<td style="'+th+'text-align:center;height:9mm">'+(i+1)+'</td>'; for(var j=0;j<7;j++) r += '<td style="'+th+'"></td>'; return '<tr>'+r+'</tr>'; }).join('');
      var cg = ds.reduce(function(a, x){ return a+(x.m.dn||0); }, 0), cl = ds.reduce(function(a, x){ return a+laiTon(x.m); }, 0);
      return P('<b>1. Thông tin về món vay</b> (số liệu đến ngày '+(nsC && ds.length ? '<span class="om om-tu" data-o="ngaySL">'+nsC+'</span>' : '……/……/………')+'; đơn vị: đồng)', T)+   /* 3.480 (anh 05/11 "số tiền vay hiện đơn vị đồng") */
        '<table data-o="mon" style="border-collapse:collapse;width:100%;table-layout:fixed;font-size:10.5pt;line-height:1.15;margin:2pt 0"><colgroup><col style="width:7mm"><col style="width:28mm"><col style="width:24mm"><col style="width:22mm"><col style="width:18mm"><col style="width:22mm"><col style="width:17mm"><col></colgroup>'+
        '<tr>'+['TT', 'CT · Số KU', 'Mục đích', 'Số tiền vay', 'Ngày vay<br>Đến hạn<br><i>GD cuối</i>', 'Nợ gốc', 'Nợ lãi', 'Tình trạng'].map(function(x){ return '<th style="'+th+thD+'">'+x+'</th>'; }).join('')+'</tr>'+hang+
        '<tr><td style="'+th+'"></td><td colspan="4" style="'+th+'font-weight:bold;text-align:center">Cộng</td><td style="'+tdS+'font-weight:bold">'+(ds.length ? tdnTien(cg) : '')+'</td><td style="'+tdS+'font-weight:bold">'+(ds.length ? tdnTien(cl) : '')+'</td><td style="'+th+'"></td></tr></table>';
    }
    var x = ds[0], m = x ? x.m : null, sp = function(v){ return '<span class="om om-tu" data-o="mon">'+e(v)+'</span>'; }, f = x ? x.f : {};
    var hop = function(co, chu){ return (co ? '☒' : '☐')+' '+chu; };
    return P('<b>1. Thông tin về món vay</b>', T)+
      (m ? (omRong('- Tên chương trình vay: '+HSN.ctTen(m)+' – Số tiền vay: '+(m.gn ? tdnTien(m.gn) : '')+' đồng;', 13) > 150   /* 3.461.4: tên dài → Số tiền vay xuống dòng */
          ? P('- Tên chương trình vay: '+sp(HSN.ctTen(m))+';', T)+P('- Số tiền vay: '+sp(m.gn ? tdnTien(m.gn) : '')+' đồng;', T+W)
          : P('- Tên chương trình vay: '+sp(HSN.ctTen(m))+' – Số tiền vay: '+sp(m.gn ? tdnTien(m.gn) : '')+' đồng;', T+W))+P('- Mục đích sử dụng vốn vay: '+(md(m) ? sp(md(m))+'.' : '…………………………………………………………………………'), md(m) ? T : T+W)+
          P('- Ngày vay '+sp(nt(m.nv) || '……/……/………')+' – Ngày đến hạn '+sp(nt(skHL(m)) || '……/……/………'), T+W)+
          P('- Giao dịch lần cuối: '+(m.ngdg ? sp(nt(m.ngdg))+'.' : '……/……/………'), T+W)+   /* 3.461.2 (anh 03/11 "ghi thêm giao dịch lần cuối") — Ngày GDXA gần nhất của món (Mẫu 31) */
          P('- Dư nợ đến ngày '+sp(nsC || '……/……/………')+': gốc '+sp(tdnTien(m.dn||0))+' đồng; lãi '+sp(tdnTien(laiTon(m)))+' đồng.', T+W)+
          P('- Tình trạng: '+hop(f.qh, 'Nợ quá hạn')+' &nbsp;'+hop(f.kn, 'Nợ khoanh')+' &nbsp;'+hop(f.khd, '3 tháng KHĐ')+' &nbsp;'+hop(f.lai>3, 'Lãi tồn'), T+W)   /* 3.480 (anh 05/11 "bỏ số tháng nợ trên các biên bản, quá cụ thể"): nhãn như bảng nhiều món */
        : P('- Tên chương trình vay: ……………………… – Số tiền vay: ………………… đồng;', T+W)+P('- Mục đích sử dụng vốn vay: ……………………………………………………………………', T+W)+
          P('- Ngày vay ……/……/……… &nbsp;&nbsp;&nbsp;&nbsp; – Ngày đến hạn ……/……/………', T+W)+P('- Giao dịch lần cuối: ……/……/………', T+W)+P('- Dư nợ đến ngày ……/……/………: gốc ……………… đồng; lãi …………… đồng.', T+W)+
          P('- Tình trạng: ☐ Nợ quá hạn &nbsp;☐ Nợ khoanh &nbsp;☐ 3 tháng KHĐ &nbsp;☐ Lãi tồn', T+W)); }
  /* chiều cao (mm) khi in — dựng đúng trang in (hsoTrang: cùng CSS, phông) trong khung ẩn rộng bằng vùng in, ghi đồng bộ (about:blank) rồi đo; không có DOM → ước 6 mm / đoạn */
  function bblvCao(h, Wm){ if(typeof document==='undefined' || !document.body) return (h.match(/<p /g) || []).length*6;
    var f = bblvCao.f; if(!f){ f = bblvCao.f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:absolute;left:-10000px;top:0;height:400mm;border:0;visibility:hidden'; document.body.appendChild(f); }
    f.style.width = Wm+'mm'; var d = f.contentDocument, M = hsoMauK(MK) || {mg:MG};
    d.open(); d.write(typeof hsoTrang==='function' ? hsoTrang([{M:M, h:h}]) : '<body style="margin:0;font-family:Times New Roman">'+h+'</body>'); d.close();
    var e = d.querySelector('.kt-to') || d.body; return e.getBoundingClientRect().height*25.4/96; }
  /* hộ đang lập: trong vòng in nhiều hộ → BBLV_HO; không thì hộ đầu tiên đang chọn; chưa chọn → người vay đang xem (HSO.vay) với các món có vấn đề (không có thì mọi món còn nợ) */
  function bblvHo(t){ if(BBLV_HO) return BBLV_HO; if(!t || typeof HSN==='undefined') return null;
    var d = HSN.dsChon(MK, t), kh = HSO.vay && HSO.vay.kh; if(kh){ var c = d.find(function(h){ return h.k.kh===kh; }); if(c) return c; }
    if(d.length) return d[0]; if(!kh) return null;
    var h = HSN.ds(t).find(function(z){ return z.k.kh===kh; }); if(!h) return null; var vd = h.mon.filter(function(x){ return HSN.nhan(x.m, x.f); });
    return {k:h.k, mon:vd.length ? vd : h.mon}; }
  var BBLV_HO = null;
  /* lập: mỗi hộ đang chọn 1 biên bản (1 trang) — chưa chọn hộ → 1 biên bản (người vay đang xem / bản trắng) */
  function bblvMauI(){ var tm = omKB(MK, 'tinhMau'); for(var i=0;i<MAU.length;i++) if(MAU[i].ten===tm) return i; return -1; }   /* -1 = Cả 3 (mặc định) */
  OM_MAU[MK].mauThem = function(){ var i0 = bblvMauI();   /* 3.461.9 (anh 04/11 "khi in bản mẫu sẽ sổ ra các tùy chọn tình huống"): danh sách sổ xuống */
    return '<div class="om-muc">Tình huống mẫu (mục 2–5): <select data-lenh="mbblv.omChonDat" data-su="change" data-a1="'+MK+'" data-a2="tinhMau" title="Tất cả = tờ hướng dẫn ghi (lưu ý chung + từng tình huống); chọn 1 tình huống = biên bản mẫu đầy đủ">'+
      [CA3].concat(MAU.map(function(x){ return x.ten; })).map(function(ten, j){ return '<option'+((j ? i0===j-1 : i0<0) ? ' selected' : '')+'>'+coChuHTML(ten)+'</option>'; }).join('')+'</select></div>'; };
  window.hsoLapBblv = function(t){ if(OM_KIEU==='mau') return omLap(MK, t); var d = t && typeof HSN!=='undefined' ? HSN.dsChon(MK, t) : [];
    if(d.length<2){ var r = omLap(MK, t); return r; }
    var ds = d.map(function(ho){ BBLV_HO = ho; try { return {M:hsoMauK(MK), h:omLap(MK, t).h, ten:ho.k.ten}; } finally { BBLV_HO = null; } });
    return {ma:'BBLV', h:ds[0].h, ds:ds}; };
  hsoMauGan('hsv', {k:MK, mg:omMg(MG), lap:function(t){ return hsoLapBblv(t); }, haiMat:function(){ return HSN.haiMat(MK); },   /* 3.480: mặc định in 1 mặt */
    ai:function(x, t){ return x.ds && x.ds.length>1 ? '' : ((x.ds && x.ds[0] && x.ds[0].ten) || (hsoKhachChon(t)||{}).ten || ''); },   /* nhiều hộ → tên file theo tổ */
    trai:function(t){ return typeof HSN==='undefined' ? '' : HSN.trai(t, MK, {tieu:'Hộ cần làm việc', ghi:'mỗi hộ 1 biên bản (1 trang); 1 món → dạng dòng, nhiều món → bảng'},
      'Lãi tồn cao = lãi tồn > 3 / 6 / 12 tháng lãi (dư nợ × lãi suất năm ÷ 12). Thành phần, chỗ ký, mục 2–5 mặc định để chấm ghi tay. Chưa tích món nào → in theo hộ đang xem (bấm tên hộ), hoặc bản trắng.'); }});
})();

/* ---------- 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="mbblv.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng hàm cũ, tham số ở data-a1…, data-dong="1" = đóng hộp trước ---------- */
gdDangKy('mbblv', gdLenh({
  omChonDat:function(el, ev){ omChonDat(gdA(el, 1), gdA(el, 2), el.value); }
}));
