/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HÔM NAY — câu chữ & ngày này năm xưa · can chi, giờ hoàng đạo · thao tác việc, danh sách, tính ngày · đồng bộ lich.json · tab tháng.
   Chép nguyên từ js/04b-hom-nay.js (không đổi tên hàm); nạp ngay sau phần trước. ===== */
/* ==========================================================
   CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
   Anh bổ sung thêm bằng file Drive: Tủ hồ sơ/_Hệ thống/nguon-cau.json
   Nhóm câu chữ: cadao (ca dao · tục ngữ · thành ngữ) · danhngon (có tác giả) · kienthuc
   ========================================================== */
var CAU_GOI = [
  /* --- ca dao, tục ngữ, thành ngữ --- */
  {c:'Có công mài sắt, có ngày nên kim.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Muốn biết phải hỏi, muốn giỏi phải học.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Ăn cỗ đi trước, lội nước theo sau.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đi một ngày đàng, học một sàng khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nói lời phải giữ lấy lời, đừng như con bướm đậu rồi lại bay.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Tốt gỗ hơn tốt nước sơn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chớ thấy sóng cả mà ngã tay chèo.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Kiến tha lâu cũng đầy tổ.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Giấy rách phải giữ lấy lề.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Của bền tại người.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Việc hôm nay chớ để ngày mai.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thua keo này ta bày keo khác.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Ăn quả nhớ kẻ trồng cây.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Lá lành đùm lá rách.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một miếng khi đói bằng một gói khi no.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nhất nước, nhì phân, tam cần, tứ giống.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tháng bảy kiến bò, chỉ lo lại lụt.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Đói cho sạch, rách cho thơm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Học ăn, học nói, học gói, học mở.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Gần mực thì đen, gần đèn thì rạng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Có chí thì nên.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thất bại là mẹ thành công.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Trăm hay không bằng tay quen.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một lời nói dối, sám hối bảy ngày.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tiền vào nhà khó như gió vào nhà trống.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Khéo ăn thì no, khéo co thì ấm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Buôn tàu bán bè không bằng ăn dè hà tiện.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Làm khi lành để dành khi đau.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Của làm ra để trên gác, của cờ bạc để ngoài sân.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Ăn kỹ no lâu, cày sâu tốt lúa.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Được mùa chớ phụ ngô khoai.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nước chảy đá mòn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Dục tốc bất đạt.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Cẩn tắc vô ưu.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Có thực mới vực được đạo.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một sự nhịn, chín sự lành.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nói phải củ cải cũng nghe.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chim khôn kêu tiếng rảnh rang, người khôn nói tiếng dịu dàng dễ nghe.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Ở hiền gặp lành.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Uống nước nhớ nguồn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thuận vợ thuận chồng, tát biển Đông cũng cạn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Anh em như thể tay chân.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Bán anh em xa, mua láng giềng gần.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tay làm hàm nhai, tay quai miệng trễ.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Cái khó ló cái khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đất lành chim đậu.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Giấy trắng mực đen.', t:'Thành ngữ Việt Nam', n:'cadao'},
  {c:'Nói có sách, mách có chứng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Sai một li đi một dặm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chậm mà chắc.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tích tiểu thành đại.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Đồng tiền đi trước là đồng tiền khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Trăm nghe không bằng một thấy.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đầu xuôi đuôi lọt.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Cần cù bù thông minh.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Việc nhà thì nhác, việc chú bác thì siêng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nhất nghệ tinh, nhất thân vinh.', t:'Thành ngữ Hán Việt', n:'cadao'},

  /* --- danh ngôn có tác giả --- */
  {c:'Không có việc gì khó, chỉ sợ lòng không bền. Đào núi và lấp biển, quyết chí ắt làm nên.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Học để làm việc, làm người, làm cán bộ.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Cần, kiệm, liêm, chính, chí công vô tư.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Một dân tộc dốt là một dân tộc yếu.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Hiền tài là nguyên khí của quốc gia.', t:'Thân Nhân Trung', n:'danhngon'},
  {c:'Việc nhân nghĩa cốt ở yên dân.', t:'Nguyễn Trãi — Bình Ngô đại cáo', n:'danhngon'},
  {c:'Đem đại nghĩa để thắng hung tàn, lấy chí nhân để thay cường bạo.', t:'Nguyễn Trãi', n:'danhngon'},
  {c:'Sông núi nước Nam vua Nam ở.', t:'Nam quốc sơn hà', n:'danhngon'},
  {c:'Ta thà làm quỷ nước Nam, chứ không thèm làm vương đất Bắc.', t:'Trần Bình Trọng', n:'danhngon'},
  {c:'Đầu thần chưa rơi xuống đất, xin bệ hạ đừng lo.', t:'Trần Thủ Độ', n:'danhngon'},
  {c:'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ.', t:'Bà Triệu', n:'danhngon'},
  {c:'Thà một phút huy hoàng rồi chợt tối, còn hơn buồn le lói suốt trăm năm.', t:'Xuân Diệu', n:'danhngon'},
  {c:'Nơi hầm tối là nơi sáng nhất.', t:'Dương Hương Ly', n:'danhngon'},
  {c:'Sống là cho, đâu chỉ nhận riêng mình.', t:'Tố Hữu', n:'danhngon'},
  {c:'Thiên tài là một phần trăm cảm hứng và chín mươi chín phần trăm mồ hôi.', t:'Thomas Edison', n:'danhngon'},
  {c:'Điều quan trọng không phải là đi nhanh, mà là không dừng lại.', t:'Khổng Tử', n:'danhngon'},
  {c:'Học mà không suy nghĩ thì phí công, suy nghĩ mà không học thì nguy hiểm.', t:'Khổng Tử', n:'danhngon'},
  {c:'Người quân tử cầu ở mình, kẻ tiểu nhân cầu ở người.', t:'Khổng Tử', n:'danhngon'},
  {c:'Biết thì nói là biết, không biết thì nói là không biết, ấy là biết vậy.', t:'Khổng Tử', n:'danhngon'},
  {c:'Hành trình vạn dặm bắt đầu từ một bước chân.', t:'Lão Tử', n:'danhngon'},
  {c:'Kẻ thù lớn nhất của đời người là chính mình.', t:'Phật giáo', n:'danhngon'},
  {c:'Đừng đếm những gì bạn đã mất, hãy quý những gì bạn đang có.', t:'Ngạn ngữ', n:'danhngon'},
  {c:'Thành công là đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết.', t:'Winston Churchill', n:'danhngon'},
  {c:'Cách tốt nhất để dự đoán tương lai là tạo ra nó.', t:'Peter Drucker', n:'danhngon'},
  {c:'Cái gì không đo được thì không quản được.', t:'Peter Drucker', n:'danhngon'},
  {c:'Kỷ luật là cầu nối giữa mục tiêu và thành quả.', t:'Jim Rohn', n:'danhngon'},

  /* --- kiến thức lịch sử, địa lý, đời sống --- */
  {c:'Từ ngày 01/7/2025, Việt Nam có 34 tỉnh, thành phố trực thuộc trung ương; tỉnh Tây Ninh mới được hợp nhất từ Tây Ninh và Long An.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Sông Vàm Cỏ Đông chảy qua Tây Ninh, là nguồn nước chính cho sản xuất nông nghiệp của tỉnh.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Núi Bà Đen cao 986 m, là ngọn núi cao nhất Nam Bộ.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Hồ Dầu Tiếng là một trong những hồ nhân tạo lớn nhất Việt Nam, tưới cho Tây Ninh và các tỉnh lân cận.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Việt Nam có đường bờ biển dài khoảng 3.260 km, không kể các đảo.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Đỉnh Fansipan cao 3.147 m, cao nhất Đông Dương.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Đồng bằng sông Cửu Long là vựa lúa lớn nhất nước, chiếm hơn một nửa sản lượng lúa cả nước.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Âm lịch Việt Nam tính theo múi giờ +7, nên đôi khi lệch một ngày so với lịch Trung Quốc.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Tháng âm lịch có 29 hoặc 30 ngày; năm nhuận âm lịch có 13 tháng.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Tiết Thanh minh thường rơi vào khoảng 4–5 tháng 4 dương lịch.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Một năm có 52 tuần lẻ 1 ngày; năm nhuận lẻ 2 ngày, nên ngày trong tuần lùi dần mỗi năm.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Mười hai con giáp bắt đầu từ Tý và kết thúc ở Hợi, lặp lại theo chu kỳ 12 năm.', t:'Văn hóa Việt Nam', n:'kienthuc'},
  {c:'Can Chi ghép 10 thiên can với 12 địa chi, tạo thành chu kỳ 60 năm gọi là một hoa giáp.', t:'Văn hóa Việt Nam', n:'kienthuc'},
  {c:'Trống đồng Đông Sơn là hiện vật tiêu biểu của nền văn minh Việt cổ, cách nay khoảng 2.500 năm.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Văn Miếu – Quốc Tử Giám được coi là trường đại học đầu tiên của Việt Nam.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Chữ Quốc ngữ hình thành từ thế kỷ 17, gắn với công lao của nhiều giáo sĩ và người Việt cộng tác.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Kinh thành Huế được xây dựng dưới triều Nguyễn, nay là Di sản văn hóa thế giới.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Vịnh Hạ Long được UNESCO công nhận là Di sản thiên nhiên thế giới năm 1994.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Phong Nha – Kẻ Bàng có hệ thống hang động lớn bậc nhất thế giới, trong đó có hang Sơn Đoòng.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Cà phê Việt Nam xuất khẩu đứng nhóm đầu thế giới, chủ yếu là cà phê vối (robusta).', t:'Kinh tế Việt Nam', n:'kienthuc'}
];

/* Ngày này năm xưa — chỉ giữ những mốc phổ biến, dễ kiểm chứng.
   Ngày nào không có dữ liệu thì app chỉ hiện câu chữ. */
var NGAY_XUA = {
  '01-01':[{y:1959,c:'Cuba: cách mạng thành công, chính quyền Batista sụp đổ',v:0}],
  '03-02':[{y:1930,c:'Thành lập Đảng Cộng sản Việt Nam',v:1}],
  '27-02':[{y:1955,c:'Ngày Thầy thuốc Việt Nam (Bác Hồ gửi thư cho ngành y tế)',v:1}],
  '08-03':[{y:1910,c:'Ngày Quốc tế Phụ nữ được đề xướng',v:0}],
  '26-03':[{y:1931,c:'Thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh',v:1}],
  '30-04':[{y:1975,c:'Giải phóng miền Nam, thống nhất đất nước',v:1}],
  '01-05':[{y:1886,c:'Ngày Quốc tế Lao động bắt nguồn từ cuộc đấu tranh ở Chicago',v:0}],
  '07-05':[{y:1954,c:'Chiến thắng Điện Biên Phủ',v:1}],
  '15-05':[{y:1941,c:'Thành lập Đội Thiếu niên Tiền phong Hồ Chí Minh',v:1}],
  '19-05':[{y:1890,c:'Ngày sinh Chủ tịch Hồ Chí Minh',v:1}],
  '05-06':[{y:1911,c:'Nguyễn Tất Thành ra đi tìm đường cứu nước từ bến Nhà Rồng',v:1}],
  '21-06':[{y:1925,c:'Ngày Báo chí Cách mạng Việt Nam (báo Thanh Niên ra số đầu)',v:1}],
  '20-07':[{y:1969,c:'Con người lần đầu đặt chân lên Mặt Trăng (Apollo 11)',v:0}],
  '27-07':[{y:1947,c:'Ngày Thương binh – Liệt sĩ',v:1}],
  '06-08':[{y:1945,c:'Bom nguyên tử ném xuống Hiroshima',v:0}],
  '19-08':[{y:1945,c:'Cách mạng Tháng Tám thành công ở Hà Nội',v:1}],
  '02-09':[{y:1945,c:'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',v:1}],
  '23-09':[{y:1945,c:'Ngày Nam Bộ kháng chiến',v:1},{y:1846,c:'Phát hiện Hải Vương tinh',v:0}],
  '10-10':[{y:1954,c:'Giải phóng Thủ đô Hà Nội',v:1}],
  '20-10':[{y:1930,c:'Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam',v:1}],
  '04-10':[{y:2002,c:'Thành lập Ngân hàng Chính sách xã hội theo Nghị định 78/2002/NĐ-CP',v:1}],
  '09-11':[{y:1989,c:'Bức tường Berlin sụp đổ',v:0}],
  '20-11':[{y:1982,c:'Ngày Nhà giáo Việt Nam lần đầu được tổ chức',v:1}],
  '23-11':[{y:1940,c:'Khởi nghĩa Nam Kỳ',v:1}],
  '22-12':[{y:1944,c:'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân',v:1}],
  '19-12':[{y:1946,c:'Toàn quốc kháng chiến',v:1}],
  '25-12':[{y:1642,c:'Ngày sinh Isaac Newton (theo lịch Julius)',v:0}],
  '12-04':[{y:1961,c:'Yuri Gagarin bay vào vũ trụ — người đầu tiên',v:0}],
  '18-05':[{y:1980,c:'Núi lửa St. Helens phun trào',v:0}],
  '14-07':[{y:1789,c:'Phá ngục Bastille, mở đầu Cách mạng Pháp',v:0}],
  '24-04':[{y:1990,c:'Kính viễn vọng Hubble được phóng lên quỹ đạo',v:0}],
  '31-10':[{y:1517,c:'Martin Luther công bố 95 luận đề',v:0}],
  '29-11':[{y:1947,c:'Liên Hợp Quốc thông qua kế hoạch phân chia Palestine',v:0}],
  '17-12':[{y:1903,c:'Anh em nhà Wright thực hiện chuyến bay đầu tiên',v:0}],
  '11-02':[{y:1847,c:'Ngày sinh Thomas Edison',v:0}],
  '14-03':[{y:1879,c:'Ngày sinh Albert Einstein',v:0}]
};

/* ==========================================================
   CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
   Cách tính phổ thông, giống các quyển lịch Việt:
   - Can chi ngày tính từ số ngày Julius
   - Ngày hoàng đạo: 12 trực thần khởi theo tháng âm, 6 sao tốt là hoàng đạo
   - Giờ hoàng đạo: tra theo chi của ngày, 6 giờ tốt trong 12 canh giờ
   Chỉ để tham khảo — mỗi sách có thể chép khác nhau đôi chút.
   ========================================================== */
var CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
var GIO_CHI = ['23–1','1–3','3–5','5–7','7–9','9–11','11–13','13–15','15–17','17–19','19–21','21–23'];
/* 12 trực thần theo thứ tự; sao hoàng đạo (tốt) đánh dấu 1 */
var SAO_12 = [
  {t:'Thanh Long', tot:1}, {t:'Minh Đường', tot:1}, {t:'Thiên Hình', tot:0}, {t:'Chu Tước', tot:0},
  {t:'Kim Quỹ', tot:1},    {t:'Bảo Quang', tot:1},  {t:'Bạch Hổ', tot:0},   {t:'Ngọc Đường', tot:1},
  {t:'Thiên Lao', tot:0},  {t:'Nguyên Vũ', tot:0},  {t:'Tư Mệnh', tot:1},   {t:'Câu Trận', tot:0}
];
/* tháng âm 1&7 khởi Thanh Long tại Tý; 2&8 tại Dần; 3&9 Thìn; 4&10 Ngọ; 5&11 Thân; 6&12 Tuất */
var KHOI_SAO = {1:0, 7:0, 2:2, 8:2, 3:4, 9:4, 4:6, 10:6, 5:8, 11:8, 6:10, 12:10};
/* giờ hoàng đạo theo chi NGÀY — chỉ số chi của các giờ tốt */
var GIO_TOT = {
  0:[0,1,3,6,8,9],  6:[0,1,3,6,8,9],      /* ngày Tý, Ngọ */
  1:[2,3,5,8,10,11], 7:[2,3,5,8,10,11],   /* Sửu, Mùi */
  2:[0,1,4,5,7,10],  8:[0,1,4,5,7,10],    /* Dần, Thân */
  3:[0,2,3,6,7,9],   9:[0,2,3,6,7,9],     /* Mão, Dậu */
  4:[2,4,5,8,9,11], 10:[2,4,5,8,9,11],    /* Thìn, Tuất */
  5:[1,4,6,7,10,11],11:[1,4,6,7,10,11]    /* Tỵ, Hợi */
};
function canChiNgay(iso){
  var p = iso.split('-').map(Number), jd = jdTuNgay(p[2], p[1], p[0]);
  var ic = (jd+9) % 10, ich = (jd+1) % 12;
  return {can:CAN[ic], chi:CHI[ich], iChi:ich, ten:CAN[ic]+' '+CHI[ich]};
}
function canChiThangNam(iso){
  var a = lcAm(iso);
  var namC = (a.nam+6) % 10, namCh = (a.nam+8) % 12;
  var thC = ((a.nam*12 + a.thang + 3) % 10 + 10) % 10;
  return {thang:CAN[thC]+' '+CHI[(a.thang+1)%12], nam:CAN[namC]+' '+CHI[namCh]};
}
/* sao trực của ngày + hoàng đạo hay hắc đạo */
function saoNgay(iso){
  var a = lcAm(iso), cc = canChiNgay(iso);
  var khoi = KHOI_SAO[a.thang] === undefined ? 0 : KHOI_SAO[a.thang];
  var i = ((cc.iChi - khoi) % 12 + 12) % 12;
  var s = SAO_12[i];
  return {ten:s.t, hoangDao:!!s.tot};
}
function gioHoangDao(iso){
  var cc = canChiNgay(iso), ds = GIO_TOT[cc.iChi] || [];
  return ds.map(function(i){ return {chi:CHI[i], gio:GIO_CHI[i]}; });
}
/* dòng tóm tắt hiện trong sổ */
function moNgayTot(iso){
  var cc = canChiNgay(iso), s = saoNgay(iso), tn = canChiThangNam(iso), a = lcAm(iso);
  moHop('<div class="hop-tit">'+LC_THU[lcNgay(iso).getDay()]+' '+lcDMY(iso)+'</div>'+
    '<div class="hop-phu">Âm lịch '+lcAmChu(iso)+' · ngày <b>'+cc.ten+'</b> · tháng '+tn.thang+' · năm '+tn.nam+'</div>'+
    '<div class="nhan-nhom">Ngày '+(s.hoangDao?'hoàng đạo':'hắc đạo')+'</div>'+
    '<div class="tot-o'+(s.hoangDao?' hd':'')+'">Trực thần: <b>'+s.ten+'</b> — '+
      (s.hoangDao?'ngày tốt, hợp việc lớn như khai trương, ký kết, khởi công.'
                 :'ngày thường, nên tránh việc trọng đại; việc thường vẫn làm bình thường.')+'</div>'+
    '<div class="nhan-nhom">Giờ hoàng đạo</div><div class="tot-gio">'+
      gioHoangDao(iso).map(function(x){ return '<span><b>'+x.chi+'</b>'+x.gio+'</span>'; }).join('')+'</div>'+
    (nhanNgayAm(iso).length?'<div class="nhan-nhom">Ngày âm</div><div class="tot-o">'+coChuHTML(nhanNgayAm(iso).join(' · '))+'</div>':'')+
    '<div class="huong-dan">Tính theo cách phổ thông của lịch Việt (12 trực thần khởi theo tháng âm, giờ tốt tra theo chi ngày). '+
    'Mỗi sách có thể chép khác đôi chút — chỉ để tham khảo.</div>'+
    '<div class="hang-nut"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>');
}
function tomTatNgayTot(iso){
  var cc = canChiNgay(iso), s = saoNgay(iso);
  return 'Ngày '+cc.ten+' · '+(s.hoangDao?'hoàng đạo':'hắc đạo')+' ('+s.ten+')';
}

/* ---- nguồn thêm của anh trên Drive: Tủ hồ sơ/_Hệ thống/nguon-cau.json ---- */
function nguonCau(){ D.nguonCau = D.nguonCau || {cauChu:[], ngayXua:{}}; return D.nguonCau; }
function dsCauChu(){
  var nhom = D.cauHinh.nhomCau || {cadao:true, danhngon:true, kienthuc:true};
  var tuAnh = (nguonCau().cauChu||[]).map(function(x){
    return (typeof x==='string') ? {c:x, t:'', n:'cadao'} : {c:x.c||x.chu||'', t:x.t||x.tacGia||'', n:x.n||x.nhom||'cadao'};
  });
  return CAU_GOI.concat(tuAnh).filter(function(x){ return x.c && nhom[x.n]!==false; });
}
function dsNgayXua(iso){
  var k = iso.slice(8,10)+'-'+iso.slice(5,7);
  return (NGAY_XUA[k]||[]).concat((nguonCau().ngayXua||{})[k]||[]);
}
/* số thứ tự cố định theo ngày — 2 máy cùng ngày ra cùng câu */
function soTuNgay(iso){
  var n = 0; for(var i=0;i<iso.length;i++) n = (n*31 + iso.charCodeAt(i)) % 100000;
  return n;
}
var CAU_LECH = 0;   /* bấm ⟳ thì cộng thêm */
function cheCau(){ return D.cauHinh.cheCau || 'ngay'; }   /* ngay | moi | bam | tat */
function cauHomNay(iso){
  var ds = dsCauChu(); if(!ds.length) return null;
  var i;
  if(cheCau()==='moi') i = (soTuNgay(iso)+MO_APP_LAN+CAU_LECH) % ds.length;
  else i = (soTuNgay(iso)+CAU_LECH) % ds.length;
  return ds[i];
}
function doiCau(){ CAU_LECH++; veNhatKy(); }
function khoiCauHTML(iso){
  if(cheCau()==='tat') return '';
  var xua = dsNgayXua(iso), cau = cauHomNay(iso);
  if(!xua.length && !cau) return '';
  var h = '<div class="oq">';
  if(xua.length) h += '<div class="oq-d1"><b>Ngày này năm xưa</b> · '+
    xua.slice(0,2).map(function(x){ return x.y+' — '+coChuHTML(x.c); }).join(' <span class="oq-tg">·</span> ')+'</div>';
  if(cau) h += '<div class="oq-d2">“'+coChuHTML(cau.c)+'”'+(cau.t?' <span class="oq-tg">— '+coChuHTML(cau.t)+'</span>':'')+
    ' <span class="oq-nut" onclick="doiCau()" title="Đổi câu khác">⟳</span></div>';
  return h+'</div>';
}
/* tải nguồn của anh từ Drive */
function taiNguonCauTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('nguon-cau.json', idTM); })
  .then(function(f){
    if(!f) return 0;
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media').then(function(r){
      if(!r) return 0;
      D.nguonCau = {cauChu:r.cauChu||r.cau||[], ngayXua:r.ngayXua||r.ngay||{}};
      luu(); veNhatKy();
      return (D.nguonCau.cauChu||[]).length;
    });
  }).catch(function(e){ console.warn('Không tải được nguồn câu', e); return 0; });
}
/* ---- phông chữ cuốn sổ ---- */
var PHONG_SO = {
  constantia:{ten:'Constantia', mota:'Nét thanh, dấu chuẩn — đọc lâu không mỏi',
    css:"Constantia,'Hoefler Text','Palatino Linotype',serif"},
  cambria:{ten:'Cambria', mota:'Kiểu sách, chữ chắc, rõ trên màn nhỏ',
    css:"Cambria,Charter,'Bitstream Charter',serif"},
  times:{ten:'Times New Roman', mota:'Quen thuộc như văn bản hành chính',
    css:"'Times New Roman',Times,serif"},
  georgia:{ten:'Georgia', mota:'Chữ số dáng cổ rất đẹp; chữ có dấu đôi khi bị rời',
    css:"Georgia,'Times New Roman',serif"},
  segoe:{ten:'Segoe UI', mota:'Hiện đại, gọn gàng, không chân',
    css:"'Segoe UI','SF Pro Text',system-ui,sans-serif"},
  candara:{ten:'Candara', mota:'Mềm mại, hơi ngả viết tay, vẫn dễ đọc',
    css:"Candara,Optima,'Gill Sans',sans-serif"},
  viettay:{ten:'Segoe Print', mota:'Viết tay, hợp ghi chú nhanh',
    css:"'Segoe Print','Bradley Hand',Noteworthy,cursive"},
  maychu:{ten:'Consolas', mota:'Máy chữ, đều nét — số liệu tự thẳng cột',
    css:"Consolas,Menlo,'Courier New',monospace"}
};
function phongHienTai(){ return PHONG_SO[D.cauHinh.phongSo] ? D.cauHinh.phongSo : 'constantia'; }
/* 3 kiểu hay dùng nhất, kiểu mới chọn đẩy kiểu ít dùng ra */
function phongNhanh(){
  var ds = (D.cauHinh.phongGanDay||[]).filter(function(k){ return PHONG_SO[k]; });
  ['constantia','georgia','maychu'].forEach(function(k){ if(ds.indexOf(k)<0 && ds.length<3) ds.push(k); });
  var ht = phongHienTai();
  if(ds.indexOf(ht)<0){ ds.unshift(ht); ds = ds.slice(0,3); }
  return ds.slice(0,3);
}
function moDsPhong(){
  var ht = phongHienTai();
  moHop('<div class="hop-tit">Kiểu chữ cuốn sổ</div>'+
    '<div class="hop-phu">Mỗi dòng hiện bằng chính kiểu chữ đó. Kiểu vừa chọn sẽ vào nhóm 3 nút nhanh trên sổ.</div>'+
    '<div class="ds-phong">'+Object.keys(PHONG_SO).map(function(k){
      var p = PHONG_SO[k];
      return '<div class="mot-phong'+(k===ht?' bat':'')+'" onclick="datPhongSo(\''+k+'\');dongHop()" '+
        'style="font-family:'+p.css+'">'+
        '<div class="mp-ten">'+coChuHTML(p.ten)+(k===ht?' <span class="mp-dang">đang dùng</span>':'')+'</div>'+
        '<div class="mp-mota">'+coChuHTML(p.mota)+'</div>'+
        '<div class="mp-thu">25/09/2026 · Gọi tổ trưởng Nguyễn Văn A — 2.237 tổ viên</div></div>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>', true);
}
function apPhongSo(){
  document.documentElement.style.setProperty('--font-so', PHONG_SO[phongHienTai()].css);
}
function datPhongSo(k){
  if(!PHONG_SO[k]) return;
  D.cauHinh.phongSo = k;
  var ds = (D.cauHinh.phongGanDay||[]).filter(function(x){ return x!==k && PHONG_SO[x]; });
  ds.unshift(k); D.cauHinh.phongGanDay = ds.slice(0,3);
  luu(); apPhongSo(); veNhatKy();
}
/* 3 nút thao tác thu nhỏ, nằm cuối dòng "Việc trong ngày" — chỉ hiện khi đã chọn một việc */
function thaoTacViecHTML(c, vsC){
  var co = !!(LICH.viecChon && vsC.some(function(v){ return v.id===LICH.viecChon; }));
  if(!co) return '<span class="nk-goi">bấm một việc để sửa, dời ngày, lưu ý, xóa</span>';
  var v = lcTim(LICH.viecChon);
  return '<span class="thao-tac">'+
    '<button onclick="lcSua()">✎ Sửa</button>'+
    '<button onclick="lcDoi()">Dời ngày</button>'+
    '<button onclick="lcLuuY()">'+(v&&v.luuY?'Bỏ lưu ý':'Lưu ý')+'</button>'+
    '<button class="xau" onclick="lcXoa()">Xóa</button></span>';
}
function veNhatKy(){
  var e = document.getElementById('nhat-ky'); if(!e) return;
  var c = LICH.chon, dc = lcNgay(c), vsC = lcViecNgay(c), L = lcData();
  var nk = (L.nhatKy||{})[c] || {};
  var hn = lcISO(nay());
  var h = '<div class="nk-trang"><div class="nk-dau"><div class="nk-dau-trai">'+
      '<div class="nk-thu">'+LC_THU[dc.getDay()]+(c===hn?' <span class="nk-hn">hôm nay</span>':'')+'</div>'+
      '<div class="nk-ngay">'+lcDMY(c)+'</div>'+
      '<div class="nk-am">Âm lịch '+lcAmChu(c)+' · tuần '+lcTuan(c)+
        (nhanNgayAm(c).length?' · <b class="nk-chay">'+coChuHTML(nhanNgayAm(c).join(' · '))+'</b>':'')+'</div>'+
      '<div class="nk-tot'+(saoNgay(c).hoangDao?' hd':'')+'" onclick="moNgayTot(\''+c+'\')" title="Bấm xem giờ hoàng đạo">'+
        coChuHTML(tomTatNgayTot(c))+' · <span class="nk-gio">giờ tốt: '+
        gioHoangDao(c).slice(0,3).map(function(x){ return x.chi; }).join(', ')+'…</span></div></div>'+
    khoiCauHTML(c)+'</div>'+'<div class="nk-than">'+
    '<div class="nk-muc">SCHEDULE<span class="nk-viet">Việc theo lịch</span>'+thaoTacViecHTML(c, vsC)+'</div>'+
    '<div class="lc-ds nk-ds">'+(vsC.length ? vsC.map(function(v){
      var xg = lcXongNgay(v, c);
      return '<div class="lc-viec'+(v.id===LICH.viecChon?' chon':'')+(xg?' xong':'')+(v.luuY?' luuy':'')+
        '" onclick="lcChonViec(\''+v.id+'\')" ondblclick="LICH.viecChon=\''+v.id+'\';lcSua()">'+
        '<span class="lc-tick" onclick="event.stopPropagation();lcXong(\''+v.id+'\')" title="Đánh dấu xong">'+(xg?'✓':'')+'</span>'+
        '<span class="lc-vten">'+(v.luuY?'⚑ ':'')+coChuHTML(v.ten)+'</span>'+
        (v.lap&&v.lap!=='mot'?'<small>'+LC_LAP[v.lap]+'</small>':'')+'</div>';
    }).join('') : '<div class="sch-gon">Chưa có việc theo lịch — gõ ở ô dưới cùng, cần nhắc lại thì bấm 🕘 đưa lên đây</div>')+'</div>'+
    '';   /* 3.19: bỏ ô nhập của SCHEDULE — gõ ở ô đáy sổ, cần nhắc lại thì bấm 🕘 đưa lên */
  var che = ntCheDo(), chung = ntChung(c), ghim = ntGhim();   /* chung có thể là null khi chưa ghi gì */
  /* 3.55 (anh chốt): nút ↶ Hoàn tác kiểu Word + số việc xong đưa lên cùng dòng tiêu đề — bớt một dòng dưới danh sách */
  var dd0 = che==='don' ? dsDong(c) : [], xong0 = dd0.filter(function(x){ return x.xong; }).length, nHT = soHoanTac();
  var nutHT = '<button class="nk-ht"'+(nHT?'':' disabled')+' onclick="hoanTac()" title="'+(nHT ? 'Hoàn tác (Ctrl+Z) — còn '+nHT+' bước' : 'Chưa có gì để hoàn tác')+'">↶'+(nHT?'<sup>'+nHT+'</sup>':'')+'</button>';
  h += '<div class="nk-muc">'+(che==='don'?'TO-DO LIST<span class="nk-viet">'+(dd0.length ? xong0+'/'+dd0.length+' xong' : 'Ghi chép trong ngày')+'</span>':'GHI CHÉP<span class="nk-viet">Mẩu giấy màu</span>')+nutHT+
    '<span class="nt-doi">'+
      '<button class="nt-che'+(che==='don'?' bat':'')+'" onclick="ntDatChe(\'don\')" title="Danh sách gạch dòng, tick xong">▤ Dòng</button>'+
      '<button class="nt-che'+(che==='note'?' bat':'')+'" onclick="ntDatChe(\'note\')" title="Lưới mẩu giấy màu, ghim được">⬚ Note màu</button>'+
    '</span>'+
    '<span class="nt-doi nt-phong">'+phongNhanh().map(function(k){
      return '<button class="nt-che'+(phongHienTai()===k?' bat':'')+'" onclick="datPhongSo(\''+k+'\')" '+
        'title="'+coChuHTML(PHONG_SO[k].ten+' — '+PHONG_SO[k].mota)+'" style="font-family:'+PHONG_SO[k].css+'">A</button>';
    }).join('')+'<button class="nt-che mui" onclick="moDsPhong()" title="Xem đủ 8 kiểu chữ">▾</button></span>'+
    (che==='don'?'<span class="nk-luu" id="nk-luu">'+(chung&&chung.suaLuc?'đã lưu '+chung.suaLuc.slice(11,16):'')+'</span>':'')+'</div>';
  if(ghim.length) h += '<div class="nt-ghim-hang"><div class="nt-ghim-nhan">📌 Ghim</div><div class="nt-luoi">'+
    ghim.map(function(m){ return ntOHTML(m, true); }).join('')+'</div></div>';
  if(che==='don'){
    if(chung && (chung.nd||'').trim()) tachChungThanhDong(c);   /* ghi chép cũ → tách thành dòng */
    var dd = dsDong(c), xong = dd.filter(function(x){ return x.xong; }).length;
    var hq = dongChuaXongHomQua(c);
    if(hq.length) h += '<div class="nk-nhac"><span>↪ Hôm qua còn <b>'+hq.length+'</b> việc chưa xong</span>'+
      '<button class="nho" onclick="dongChuyenHomQua(\''+c+'\')" title="Chuyển các việc chưa xong hôm qua sang hôm nay">→ Hôm nay</button></div>';
    h += '<div class="dong-ds">'+(dd.length ? dd.map(function(m){
        var chon = DONG_CHON.indexOf(m.id)>=0;
        return '<div class="dong-o nt-'+(m.mau||'trang')+(m.xong?' xong':'')+(chon?' dang-chon':'')+'">'+
          '<span class="dong-tick" onclick="dongXong(\''+m.id+'\')" title="'+(m.xong?'Bỏ đánh dấu xong':'Đánh dấu xong')+'">'+(m.xong?'✓':'')+'</span>'+
          '<textarea rows="1" class="dong-chu" oninput="ntGo(\''+m.id+'\',this);dongCaoTuDong(this)" onfocus="dongCaoTuDong(this)" '+
            'onblur="ntRoiO(\''+m.id+'\');this.style.height=\'\'" onkeydown="dongPhim(event,\''+m.id+'\',\''+c+'\')">'+coChuHTML(m.nd||'')+'</textarea>'+
          '<span class="dong-gio">'+(m.xong ? 'xong '+m.xong.slice(11,16) : (m.taoLuc||'').slice(11,16))+'</span>'+
          '<span class="dong-thaotac">'+
            '<button title="Gắn ảnh / file" onclick="nkMenuDinh(\''+m.id+'\')">📎</button>'+
            '<button title="Đưa lên SCHEDULE" onclick="dongLenLich(\''+m.id+'\')">🕘</button>'+
            '<button title="Lên trên" onclick="dongChuyen(\''+m.id+'\',-1)">↑</button>'+
            '<button title="Xuống dưới" onclick="dongChuyen(\''+m.id+'\',1)">↓</button>'+
            '<button class="xau" title="Xóa dòng (lấy lại được bằng ↶)" onclick="dongXoa(\''+m.id+'\')">✕</button>'+
          '</span>'+
          '<span class="dong-chon'+(chon?' bat':'')+'" onclick="dongChon(\''+m.id+'\')" title="Chọn để xóa nhiều dòng">'+(chon?'✓':'')+'</span>'+
          '<span class="nt-luu" id="nt-luu-'+m.id+'"></span>'+
          /* 3.53: chấm màu chỉ hiện khi chạm / rê vào dòng — các nút khác hiện sẵn */
          '<span class="dong-mau">'+Object.keys(NT_MAU).map(function(k){
              return '<i class="dcham nt-'+k+(m.mau===k?' bat':'')+'" title="'+NT_MAU[k]+'" onmousedown="event.preventDefault()" onclick="dongDoiMau(\''+m.id+'\',\''+k+'\')"></i>';
            }).join('')+'<small>màu dòng</small></span></div>'+nkDinhHTML(m);
      }).join('') : '<div class="lc-rong">Chưa có việc nào — gõ vào ô dưới cùng rồi bấm Enter</div>')+'</div>';
    if(DONG_CHON.length) h += '<div class="dong-nhom">Đã chọn <b>'+DONG_CHON.length+'</b> dòng'+
      '<span class="dn-mau">'+Object.keys(NT_MAU).map(function(k){
        return '<i class="dcham nt-'+k+'" title="Đổi màu '+NT_MAU[k]+'" onclick="dongMauNhieu(\''+k+'\')"></i>'; }).join('')+'</span>'+
      '<button class="nho" onclick="dongChonHet(\''+c+'\')">Chọn hết</button>'+
      '<button class="nho" onclick="dongBoChon()">Bỏ chọn</button>'+
      '<button class="nho xau" onclick="dongXoa(DONG_CHON.slice())">Xóa '+DONG_CHON.length+' dòng</button></div>';
  }else{
    var ds = ntNgay(c).filter(function(x){ return !x.ghim && (!x.chung || (x.nd||'').trim()); });
    h += '<div class="nt-them-hang">'+Object.keys(NT_MAU).map(function(k){
        return '<button class="nt-them nt-'+k+'" onclick="ntThem(\''+k+'\')" title="Thêm mẩu '+NT_MAU[k]+'">+</button>';
      }).join('')+'<button class="nt-them nk-cam-nho" onclick="nkChupNhanh()" title="Chụp ảnh — tự lưu thành một mẩu">📷</button>'+
      '<span class="nt-goi">Thêm mẩu: bấm màu tương ứng — đỏ việc gấp, cam quan trọng, xanh lưu ý</span></div>';
    h += '<div class="nt-luoi" id="nt-luoi">'+(ds.length ? ds.map(function(m){ return ntOHTML(m, false); }).join('')
      : '<div class="lc-rong">Chưa có mẩu nào cho ngày này — bấm một màu ở trên để thêm</div>')+'</div>';
  }
  h += '</div>';   /* đóng .nk-than */
  if(che==='don') h += '<div class="o-go"><button class="og-cam" onclick="nkChupNhanh()" title="Chụp ảnh — tự lưu thành một dòng của ngày này">📷</button>'+
    '<input id="nk-dong-moi" placeholder="Gõ việc rồi bấm Enter…" onkeydown="dongGoThem(this,\''+c+'\',event)">'+
    '<button class="og-them" onclick="dongGoThem(document.getElementById(\'nk-dong-moi\'),\''+c+'\',{key:\'Enter\'})">Thêm</button></div>';
  h += '</div>';   /* đóng .nk-trang */
  e.innerHTML = h;
  nkNapAnhNho();
  canCaoSo();
}
/* 3.53b: máy tính — sổ ghi chú (và cột lịch) kéo dài sát thanh đáy mới (thấp hơn), không chừa khoảng trống */
function canCaoSo(){
  var r = document.documentElement;
  if(window.innerWidth < 900){ r.style.removeProperty('--cao-so'); return; }
  var e = document.querySelector('.blv-nk .nk-trang') || document.querySelector('.blv-trai'); if(!e || !e.offsetParent) return;
  var day = document.querySelector('.day'), cd = day ? day.getBoundingClientRect().height : 30;
  var top = e.getBoundingClientRect().top + (window.scrollY||0);
  r.style.setProperty('--cao-so', Math.max(420, Math.floor(window.innerHeight - top - cd - 10))+'px');
}
window.addEventListener('resize', function(){ clearTimeout(canCaoSo.t); canCaoSo.t = setTimeout(canCaoSo, 150); });
window.addEventListener('load', function(){ setTimeout(canCaoSo, 400); });
var NK_HEN = null;
function chayGanNhat(){
  if((D.cauHinh.cheChay||'thap')==='khong') return '';
  var hn = lcISO(nay());
  for(var i=0;i<=40;i++){
    var iso = lcCong(hn, i);
    if(laNgayChay(iso)) return (i===0?'hôm nay':(i===1?'mai':lcDM(iso)))+' ('+lcAmChu(iso)+' â.l)';
  }
  return '';
}
function lcSapToi(){
  if(!lcData().viec.length) return '<span>chưa có việc nào được ghi</span>';
  var ra = [], hn = lcISO(nay());
  for(var i=1; i<=14 && ra.length<3; i++){
    var iso = lcCong(hn, i);
    lcViecNgay(iso).forEach(function(v){ if(ra.length<3 && !lcXongNgay(v, iso)) ra.push({iso:iso, v:v}); });
  }
  var chay = chayGanNhat();
  var phu = chay ? '<span class="lc-chay-nho">☸ Ngày chay: '+coChuHTML(chay)+'</span>' : '';
  return (ra.length ? ra.map(function(x){
      return '<a onclick="lcChonNgay(\''+x.iso+'\')">'+lcDM(x.iso)+' '+coChuHTML(x.v.ten)+'</a>';
    }).join(' · ') : '<span>14 ngày tới chưa có việc</span>') + phu;
}

/* ---------- thao tác ---------- */
function lcThang(n){
  var d = new Date(LICH.nam, LICH.thang+n, 1); LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); veLich();
}
function lcHomNay(){ LICH.chon = ''; LICH.viecChon = ''; lcDau(); veLich(); }
function lcChonNgay(iso){
  var d = lcNgay(iso); LICH.chon = iso; LICH.viecChon = '';
  LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); veLich();
}
function lcChonViec(id){ LICH.viecChon = (LICH.viecChon===id) ? '' : id; veLich(); }
/* thêm việc theo lịch không cần ô nhập (ô nhập của SCHEDULE đã bỏ ở 3.19) */
function lcTim(id){ return lcData().viec.find(function(v){ return v.id===id; }); }
function lcXong(id){
  var v = lcTim(id); if(!v) return;
  if(v.lap==='mot' || !v.lap) v.xong = !v.xong;
  else { v.xongNgay = v.xongNgay||{}; if(v.xongNgay[LICH.chon]) delete v.xongNgay[LICH.chon]; else v.xongNgay[LICH.chon] = true; }
  v.suaLuc = new Date().toISOString(); lcDoiLich();
}
function lcLuuY(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  v.luuY = !v.luuY; v.suaLuc = new Date().toISOString(); lcDoiLich();
}
function lcDoi(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  var tu = LICH.chon, t2 = lcCong(tu, (8-lcNgay(tu).getDay())%7 || 7);
  moHop('<div class="hop-tit">Dời ngày</div>'+
    '<div class="hop-phu">'+coChuHTML(v.ten)+' — đang ở '+LC_THU[lcNgay(tu).getDay()]+' '+lcDMY(tu)+
      (v.lap&&v.lap!=='mot'?'<br>Việc lặp '+LC_LAP[v.lap].toLowerCase()+': chỉ dời <b>lần ngày này</b>, các lần khác giữ nguyên.':'')+'</div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="lcDoiDen(\''+lcCong(tu,1)+'\')">+1 ngày</button>'+
      '<button class="nho" onclick="lcDoiDen(\''+t2+'\')">Thứ Hai tới</button>'+
      '<button class="nho" onclick="lcDoiDen(\''+lcCong(tu,7)+'\')">+1 tuần</button></div>'+
    '<div class="o"><label>Hoặc chọn ngày</label><input id="lc-doi" inputmode="numeric" placeholder="dd/mm/yyyy" '+
      'value="'+lcDMY(lcCong(tu,1))+'" oninput="gonNgay(this)"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho chinh" onclick="lcDoiDen(ngayISOo(gt(\'lc-doi\')))">Dời</button></div>');
}
function lcDoiDen(iso){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var t = new Date().toISOString(), tu = LICH.chon;
  if(v.lap==='mot' || !v.lap){ v.ngay = iso; v.suaLuc = t; LICH.viecChon = v.id; }
  else {
    v.bo = v.bo||[]; if(v.bo.indexOf(tu)<0) v.bo.push(tu); v.suaLuc = t;
    var moi = {id:idMoi(), ten:v.ten, ngay:iso, lap:'mot', luuY:v.luuY, xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t};
    lcData().viec.push(moi); LICH.viecChon = moi.id;
  }
  dongHop(); var d = lcNgay(iso); LICH.chon = iso; LICH.nam = d.getFullYear(); LICH.thang = d.getMonth();
  lcDoiLich(); bao('Đã dời sang '+LC_THU[d.getDay()]+' '+lcDMY(iso)+'.', 4);
}
function lcXoa(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(v.lap && v.lap!=='mot'){
    moHop('<div class="hop-tit">Xóa việc lặp</div>'+
      '<div class="hop-phu">'+coChuHTML(v.ten)+' — lặp '+LC_LAP[v.lap].toLowerCase()+'.</div>'+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho" onclick="lcXoaMotLan()">Chỉ lần ngày '+lcDM(LICH.chon)+'</button>'+
      '<button class="nho xau" onclick="lcXoaHan()">Xóa cả chuỗi</button></div>');
  } else lcXoaHan();   /* 3.153: không hỏi — vào Thùng rác */
}
function lcXoaMotLan(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  v.bo = v.bo||[]; if(v.bo.indexOf(LICH.chon)<0) v.bo.push(LICH.chon);
  v.suaLuc = new Date().toISOString(); LICH.viecChon = ''; dongHop(); lcDoiLich();
}
function lcXoaHan(){
  var L = lcData(), id = LICH.viecChon, v = lcTim(id);
  if(v) racMucNho('lich', v.ten || '(việc)', 'Hôm nay › Lịch › '+(v.ngay ? lcDMY(v.ngay) : ''), v);   /* 3.153 */
  L.viec = L.viec.filter(function(v){ return v.id!==id; });
  L.daXoa.push({id:id, luc:new Date().toISOString()});
  LICH.viecChon = ''; dongHop(); lcDoiLich();
}

/* ---------- Danh sách: quá hạn + 60 ngày tới ---------- */
function lcDanhSach(){
  var hn = lcISO(nay()), dong = [];
  for(var i=-30; i<=60; i++){
    var iso = lcCong(hn, i);
    lcViecNgay(iso).forEach(function(v){
      var xg = lcXongNgay(v, iso);
      if(i<0 && xg) return;                 /* quá khứ chỉ hiện việc chưa xong */
      dong.push({iso:iso, v:v, xg:xg, qua:i<0});
    });
  }
  var nhom = {}, thuTu = [];
  dong.forEach(function(x){ if(!nhom[x.iso]){ nhom[x.iso] = []; thuTu.push(x.iso); } nhom[x.iso].push(x); });
  var h = '<div class="hop-tit">Danh sách việc</div>'+
    '<div class="hop-phu">Việc quá hạn chưa xong (30 ngày qua) và việc 60 ngày tới. Bấm một dòng để mở ngày đó.</div>';
  h += thuTu.length ? thuTu.map(function(iso){
    var d = lcNgay(iso);
    return '<div class="lc-dsn'+(iso<hn?' qua':'')+(iso===hn?' nay':'')+'"><div class="lc-dsn-dau">'+
      LC_THU[d.getDay()]+' '+lcDMY(iso)+' · âm '+lcAmChu(iso)+(iso<hn?' · <b>quá hạn</b>':iso===hn?' · <b>hôm nay</b>':'')+'</div>'+
      nhom[iso].map(function(x){
        return '<div class="lc-dsn-v'+(x.xg?' xong':'')+'" onclick="dongHop();lcChonNgay(\''+iso+'\')">'+
          (x.v.luuY?'⚑ ':'')+coChuHTML(x.v.ten)+(x.v.lap&&x.v.lap!=='mot'?' <small>'+LC_LAP[x.v.lap]+'</small>':'')+'</div>';
      }).join('')+'</div>';
  }).join('') : '<div class="lc-rong">Không có việc nào trong khoảng này.</div>';
  h += '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>';
  moHop(h);
}

/* ---------- Tính ngày ---------- */
function lcTinhNgay(){
  var c = lcDMY(LICH.chon||lcISO(nay()));
  moHop('<div class="hop-tit">Tính ngày</div>'+
    '<div class="nhan-nhom">Cộng / trừ ngày</div>'+
    '<div class="lc-tn"><input id="tn-tu" inputmode="numeric" value="'+c+'" oninput="gonNgay(this);lcTinh()">'+
      '<select id="tn-dau" onchange="lcTinh()"><option value="1">cộng</option><option value="-1">trừ</option></select>'+
      '<input id="tn-n" type="number" min="0" value="15" oninput="lcTinh()" style="width:80px">'+
      '<select id="tn-kieu" onchange="lcTinh()"><option value="n">ngày</option><option value="lv">ngày làm việc</option></select></div>'+
    '<div class="lc-kq" id="tn-kq1"></div>'+
    '<div class="nhan-nhom">Khoảng cách giữa 2 ngày</div>'+
    '<div class="lc-tn"><input id="tn-a" inputmode="numeric" value="'+c+'" oninput="gonNgay(this);lcTinh()">'+
      '<span>đến</span><input id="tn-b" inputmode="numeric" value="'+lcDMY(lcCong(ngayISOo(c)||lcISO(nay()),30))+'" oninput="gonNgay(this);lcTinh()"></div>'+
    '<div class="lc-kq" id="tn-kq2"></div>'+
    '<div class="huong-dan">Ngày làm việc = trừ Thứ Bảy, Chủ nhật (chưa trừ ngày lễ).</div>'+
    '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>');
  lcTinh();
}
function lcLamViec(iso){ var t = lcNgay(iso).getDay(); return t!==0 && t!==6; }
function lcCongLV(iso, n, dau){
  var d = iso, dem = 0;
  while(dem < n){ d = lcCong(d, dau); if(lcLamViec(d)) dem++; }
  return d;
}
function lcTinh(){
  var tu = ngayISOo(gt('tn-tu')), n = Math.max(0, parseInt(gt('tn-n'),10)||0), dau = +gt('tn-dau')||1;
  var e1 = document.getElementById('tn-kq1'), e2 = document.getElementById('tn-kq2');
  if(e1){
    if(!tu) e1.textContent = 'Gõ ngày dạng dd/mm/yyyy';
    else {
      var kq = gt('tn-kieu')==='lv' ? lcCongLV(tu, n, dau) : lcCong(tu, dau*n);
      e1.innerHTML = '→ <b>'+LC_THU[lcNgay(kq).getDay()]+' '+lcDMY(kq)+'</b> · âm '+lcAmChu(kq)+' · tuần '+lcTuan(kq);
    }
  }
  var a = ngayISOo(gt('tn-a')), b = ngayISOo(gt('tn-b'));
  if(e2){
    if(!a || !b) e2.textContent = 'Gõ đủ 2 ngày dạng dd/mm/yyyy';
    else {
      var x = a<b?a:b, y = a<b?b:a, so = Math.round((lcNgay(y)-lcNgay(x))/864e5), lv = 0;
      for(var d = x; d < y; d = lcCong(d,1)) if(lcLamViec(lcCong(d,1))) lv++;
      e2.innerHTML = '→ <b>'+so+' ngày</b> ('+lv+' ngày làm việc)';
    }
  }
}

/* ---------- đồng bộ _Hệ thống/lich.json ---------- */
var LICH_HEN = null;
function henDongBoLich(){
  if(!coTheNoiDrive() || !DR.sanSang) return;
  clearTimeout(LICH_HEN); LICH_HEN = setTimeout(dayLichLenDrive, 5000);
}
function dayLichLenDrive(){
  var L = lcData(), duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){
    return timFileTrong('lich.json', idTM).then(function(cu){
      var han = Date.now()-60*864e5;
      L.daXoa = L.daXoa.filter(function(x){ return new Date(x.luc).getTime()>han; });
      L.noteXoa = (L.noteXoa||[]).filter(function(x){ return Date.now()-new Date(x.luc).getTime() < 366*864e5; });
      return ghiJSONLenDrive('lich.json', idTM, {xuatLuc:new Date().toISOString(), may:maMayCua(), viec:L.viec,
        daXoa:L.daXoa, nhatKy:L.nhatKy||{}, note:L.note||[], noteXoa:L.noteXoa}, cu);
    });
  }).catch(function(e){ console.warn('Không đẩy được lịch', e); });
}
/* gộp: mỗi việc lấy bản sửa sau (suaLuc); việc đã xóa (daXoa) thì bỏ nếu xóa sau lần sửa cuối */
function gopLich(r){
  var L = lcData(), doi = 0, xoa = {};
  L.daXoa.concat(r.daXoa||[]).forEach(function(x){ if(!xoa[x.id] || x.luc>xoa[x.id]) xoa[x.id] = x.luc; });
  var theoId = {}; L.viec.forEach(function(v){ theoId[v.id] = v; });
  (r.viec||[]).forEach(function(v){
    var co = theoId[v.id];
    if(!co){ theoId[v.id] = v; doi++; }
    else if((v.suaLuc||'') > (co.suaLuc||'')){ theoId[v.id] = v; doi++; }
  });
  var ds = Object.keys(theoId).map(function(k){ return theoId[k]; }).filter(function(v){
    if(xoa[v.id] && xoa[v.id] >= (v.suaLuc||'')){ if(L.viec.some(function(x){ return x.id===v.id; })) doi++; return false; }
    return true;
  });
  L.viec = ds;
  L.daXoa = Object.keys(xoa).map(function(k){ return {id:k, luc:xoa[k]}; });
  /* mẩu ghi chú: bản sửa sau thắng; mẩu đã xóa thì bỏ ở mọi máy */
  L.note = L.note || []; L.noteXoa = L.noteXoa || [];
  var xoaN = {};
  L.noteXoa.concat(r.noteXoa||[]).forEach(function(x){ if(!xoaN[x.id] || x.luc>xoaN[x.id]) xoaN[x.id] = x.luc; });
  L.noteXoa = Object.keys(xoaN).map(function(k){ return {id:k, luc:xoaN[k]}; });
  var theoN = {}; L.note.forEach(function(m){ theoN[m.id] = m; });
  (r.note||[]).forEach(function(m){
    var co = theoN[m.id];
    if(!co || (m.suaLuc||'') > (co.suaLuc||'')){ theoN[m.id] = m; doi++; }
  });
  L.note = Object.keys(theoN).map(function(k){ return theoN[k]; })
    .filter(function(m){ return !(xoaN[m.id] && xoaN[m.id] >= (m.suaLuc||'')); });
  L.nhatKy = L.nhatKy || {};
  Object.keys(r.nhatKy||{}).forEach(function(ng){
    var a = L.nhatKy[ng], b = r.nhatKy[ng];
    if(!a || (b.suaLuc||'') > (a.suaLuc||'')){ L.nhatKy[ng] = b; doi++; }
  });
  return doi;
}
function taiLichTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('lich.json', idTM); })
  .then(function(f){
    if(!f){ if(lcData().viec.length) henDongBoLich(); return null; }
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media');
  }).then(function(r){
    if(!r) return 0;
    var n = gopLich(r); luu(); veLich();
    henDongBoLich();     /* đẩy lại bản đã gộp (có thể có việc chỉ máy này có) */
    return n;
  }).catch(function(e){ console.warn('Không tải được lịch', e); return 0; });
}

/* tìm trong mẩu ghi chú và việc trong lịch (3.13) — hiện ở tab Hôm nay */
function timGhiChu(q){
  if(!q || q.length<2) return [];
  var qq = boDau(q), ra = [];
  ntData().note.forEach(function(m){
    if(boDau(m.nd||'').indexOf(qq)>=0 && (m.nd||'').trim())
      ra.push({loai:'Ghi chú', ngay:m.ngay, chu:m.nd, mau:m.mau||'vang'});
  });
  lcData().viec.forEach(function(v){
    if(boDau(v.ten||'').indexOf(qq)>=0) ra.push({loai:'Việc', ngay:v.ngay, chu:v.ten, mau:'trang'});
  });
  return ra.sort(function(a,b){ return (b.ngay||'').localeCompare(a.ngay||''); }).slice(0,10);
}
function veTimGhiChu(){
  var e = document.getElementById('tim-ghichu'); if(!e) return;
  var o = document.getElementById('otim');
  var ds = timGhiChu(o ? o.value.trim() : '');
  if(!ds.length){ e.innerHTML = ''; return; }
  e.innerHTML = '<div class="nhan-nhom">Tìm thấy trong ghi chú &amp; lịch ('+ds.length+')</div>'+
    ds.map(function(x){
      return '<div class="tgc-dong nt-'+x.mau+'" onclick="lcChonNgay(\''+x.ngay+'\')">'+
        '<span class="tgc-ngay">'+lcDM(x.ngay)+'</span>'+
        '<span class="tgc-chu">'+coChuHTML((x.chu||'').slice(0,110))+'</span>'+
        '<small>'+x.loai+'</small></div>';
    }).join('');
}
function datGon(k){ D.cauHinh[k] = !D.cauHinh[k]; luu(); veHomNay(); }
function veHomNay(){
  /* 3.29: tab Hôm nay là BÀN LÀM VIỆC — bỏ hẳn hàng nút thêm file, nhường chỗ cho sổ.
     Thêm file: sang tab Văn bản · Thùng rác: nút 🗑 trên thanh trên cùng · Chờ khai: thẻ trong Cần xử lý */
  var dth = document.getElementById('dau-homnay');
  if(dth) dth.innerHTML = '';
  veTimGhiChu();
  var v = [];
  var nCK = demChoKhai();
  if(nCK){
    var gCK = dsChoKhai();
    v.push({so:nCK, tit:'File chờ khai thông tin', ngan:'📥 '+nCK+' chờ khai',
      p:Object.keys(gCK).filter(function(k){ return gCK[k].length; }).map(function(k){ return CK_TEN[k].split(' — ')[0]+' '+gCK[k].length; }).join(' · '),
      gap:true, fn:'moChoKhai()'});
  }
  var thieu = [];   /* 3.144: bỏ tab Tháng → không nhắc "thiếu báo cáo tháng" nữa (kyThieu() giữ mã cho đợt dọn) */
  var gbCon = ngayToiGiaoBan();
  if(thieu.length && gbCon>=0){
    v.push({so:gbCon, tit:(gbCon===0?'Hôm nay giao ban':'Còn '+gbCon+' ngày tới giao ban')+', thiếu '+thieu.length+' báo cáo',
      ngan:'📊 Thiếu '+thieu.length+' BC · '+(gbCon===0?'giao ban hôm nay':'còn '+gbCon+' ngày GB'),
      p:chuoiThieu(thieuTheoKy(kyGanNhat())), gap:true, fn:'datKyBang(\''+kyGanNhat()+'\');doiNgan(2)'});
  }else if(thieu.length){
    var kg = kyGanNhat();
    v.push({so:thieu.length, tit:kyVN(kg)+' còn thiếu báo cáo', ngan:'📊 '+kyVN(kg)+' thiếu '+thieu.length+' BC',
      p:chuoiThieu(thieuTheoKy(kg)), gap:true, fn:'datKyBang(\''+kg+'\');doiNgan(2)'});
  }
  var canXL = D.ghiChu.filter(function(g){ return (g.the||[]).indexOf('Cần xử lý')>=0; });
  if(canXL.length){
    v.push({so:canXL.length, tit:'Ghi chú đánh dấu cần xử lý', ngan:'🖼 '+canXL.length+' ghi chú cần xử lý',
      p:'Cũ nhất từ '+ngayVN(canXL[canXL.length-1].ngay), gap:false, di:3});
  }
  var h = '';
  if(v.length){
    /* 3.53 (anh chốt): gom thành MỘT dòng — bấm chip đi thẳng tới việc, bấm ▾ mở thẻ đầy đủ, ▴ thu lại */
    var moCXL = !!D.cauHinh.moCXL;
    h += '<div class="gon-dong'+(moCXL?' mo':'')+'" onclick="datGon(\'moCXL\')"><b>⚠ Cần xử lý</b><span class="gon-ds">'+
      v.map(function(x){ return '<span class="gon-chip'+(x.gap?' gap':'')+'" onclick="event.stopPropagation();'+(x.fn||('doiNgan('+x.di+')'))+'">'+coChuHTML(x.ngan||x.tit)+'</span>'; }).join('')+
      '</span><span class="gon-mui">'+(moCXL?'▴':'▾')+'</span></div>';
    if(moCXL) v.forEach(function(x){
      h += '<div class="viec'+(x.gap?' gap':'')+'" onclick="'+(x.fn||('doiNgan('+x.di+')'))+'">'+
           '<div class="so">'+x.so+'</div><div class="nd"><div class="tit">'+x.tit+
           '</div><div class="p">'+coChuHTML(x.p)+'</div></div><div class="mui">›</div></div>';
    });
  }else{
    /* 3.18: trống thì chỉ một dòng mảnh, nhường chỗ cho "Vừa xem gần đây" */
    h += '<div class="cxl-gon">✓ Không có việc nào đang chờ</div>';
  }
  document.getElementById('ds-viec').innerHTML = h;

  var g = D.ganDay.map(timMuc).filter(Boolean).slice(0,5);
  /* 3.53 (anh chốt): thu gọn 1 dòng, bấm để mở */
  var moGD = !!D.cauHinh.moGanDay && g.length;
  var gd = document.getElementById('gan-dau');
  if(gd) gd.innerHTML = '<div class="gon-dong'+(moGD?' mo':'')+(g.length?'':' tat')+'"'+(g.length?' onclick="datGon(\'moGanDay\')"':'')+'>'+
    '<b>🕘 Vừa xem gần đây</b><span class="gon-ds">'+(g.length ? '<span class="gon-phu">'+g.length+' mục</span>' : '<span class="gon-phu">chưa xem mục nào</span>')+'</span>'+
    (g.length ? '<span class="gon-mui">'+(moGD?'▴':'▾')+'</span>' : '')+'</div>';
  document.getElementById('ds-ganday').innerHTML = moGD ? g.map(function(m){ return dongHTML(m,''); }).join('') : '';
  veLich();
}

/* ==========================================================
   TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
   Ngày số liệu đọc trong NỘI DUNG (không phải ngày trong tên file):
     = ngày cuối tháng  → bản cuối tháng → lưu
     < ngày cuối tháng  → dữ liệu phụ    → không lưu (vẫn có nút "Vẫn lưu")
     đọc không ra       → KHÔNG đoán, đưa vào nhóm cần xem
   ========================================================== */
function ngayCuoiThang(nam, thang){ return new Date(nam, thang, 0).getDate(); }  /* tháng 2 tự đúng năm nhuận */
/* đọc ngày số liệu trong chữ của file — bắt nhiều cách viết */
function docNgaySoLieu(chu){
  if(!chu) return null;
  var t = ' '+chu.replace(/\s+/g,' ')+' ';
  var mau = [
    /(?:đến|den|tính đến|tinh den|tới|toi)\s*(?:hết\s*)?(?:ngày|ngay)?\s*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/i,
    /(?:đến|den|tính đến|tinh den)\s*(?:ngày|ngay)\s*(\d{1,2})\s*tháng\s*(\d{1,2})\s*năm\s*(\d{4})/i,
    /(?:số liệu|so lieu|thời điểm|thoi diem)[^0-9]{0,20}(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/i,
    /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})\b/
  ];
  for(var i=0;i<mau.length;i++){
    var m = t.match(mau[i]);
    if(m){
      var d = +m[1], th = +m[2], y = +m[3];
      if(d>=1 && d<=31 && th>=1 && th<=12 && y>=2000 && y<=2100)
        return {ngay:d, thang:th, nam:y, iso:y+'-'+('0'+th).slice(-2)+'-'+('0'+d).slice(-2)};
    }
  }
  return null;
}
/* xếp loại một file dữ liệu tháng: cuoi | phu | chuaro */
/* đọc phạm vi: tên xã/phường hoặc tên điểm giao dịch có trong chữ hoặc tên file */
function docPhamVi(chu, tenFile){
  var t = boDau((chu||'')+' '+(tenFile||''));
  var diem = dsDonVi('diem'), xa = dsDonVi('xa');
  var tim = function(ds){
    var ra = null;
    ds.forEach(function(x){ if(!ra && boDau(x) && t.indexOf(boDau(x))>=0) ra = x; });
    return ra;
  };
  return tim(diem) || tim(xa) || (/toan pgd|toan don vi|toan huyen/.test(t) ? 'Toàn PGD' : '');
}
function loaiBanThang(nsl, ma){
  /* 3.27: loại theo ngày giao dịch (KQGD) — mỗi phiên là bản chính thức, không có "giữa tháng" */
  if(ma && mauTheoNgay(ma) && nsl)
    return {loai:'cuoi', ky:nsl.nam+'-'+('0'+nsl.thang).slice(-2), ngay:nsl, theoNgay:true};
  if(!nsl) return {loai:'chuaro'};
  var cuoi = ngayCuoiThang(nsl.nam, nsl.thang);
  var ky = nsl.nam+'-'+('0'+nsl.thang).slice(-2);
  return (nsl.ngay===cuoi)
    ? {loai:'cuoi', ky:ky, ngay:nsl, cuoi:cuoi}
    : {loai:'phu',  ky:ky, ngay:nsl, cuoi:cuoi};
}
/* ---- cấp và phạm vi ---- */
function dsCap(){ return [['pgd','Toàn PGD'],['xa','Xã, phường'],['diem','Điểm giao dịch']]; }
function dsDonVi(cap){
  var db = D.cauHinh.diaBan||[];
  if(cap==='pgd') return ['Toàn PGD'];
  if(cap==='xa')  return db.map(function(x){ return x.xa; });
  var ra = [];
  db.forEach(function(x){ (x.diem||[]).forEach(function(d){ if(ra.indexOf(d.ten)<0) ra.push(d.ten); }); });
  return ra;
}
function capCuaPhamVi(pv){
  if(!pv || /toàn pgd|toan pgd/i.test(pv)) return 'pgd';
  return (dsDonVi('xa').indexOf(pv)>=0) ? 'xa' : (dsDonVi('diem').indexOf(pv)>=0 ? 'diem' : 'pgd');
}
/* loại báo cáo áp dụng cho cấp nào — khai trong Cài đặt, để trống = mọi cấp */
/* 3.27: chu kỳ báo cáo — thang (mặc định) · quy · sau · nam · ngay */
function chuKy(m){ return m.chuKy || (m.theoNgay ? 'ngay' : 'thang'); }
function toiKy(m, ky){
  var t = +String(ky).slice(5,7), ck = chuKy(m);
  if(ck==='quy') return [3,6,9,12].indexOf(t)>=0;
  if(ck==='sau') return [6,12].indexOf(t)>=0;
  if(ck==='nam') return t===12;
  return true;
}
function laThuanXLS(m){ return !!m.thuanXLS; }
function khoiMo(k){ var x = D.cauHinh.khoiMo || {}; return x[k]!==false; }
function batKhoi(k){
  D.cauHinh.khoiMo = D.cauHinh.khoiMo || {};
  D.cauHinh.khoiMo[k] = !khoiMo(k); luu(); veThang();
}
function mauApCap(m, cap){
  var c = m.cap;
  if(!c || !c.length) return m.thuanXLS ? cap==='pgd' : true;   /* 3.43: sao kê thuần Excel chưa khai cấp → chỉ tính Toàn PGD */
  return c.indexOf(cap)>=0;
}
/* ---- bảng đối chiếu: trạng thái từng ô ---- */
/* 3.24: cột XÃ cộng dồn các điểm giao dịch bên trong —
   file lưu ở cấp điểm (KQGD của Gia Lộc 2) thì cột xã hiện "1/2", không còn báo thiếu oan */
function demDiemCua(ky, maLoai, xa){
  var dm = diemCuaXa(xa), co = 0;
  dm.forEach(function(d){ if(oDoiChieu(ky, maLoai, d, true).tt!=='thieu') co++; });
  return {co:co, tong:dm.length};
}
function oDoiChieuXa(ky, maLoai, xa){
  var dm = diemCuaXa(xa);
  if(!dm.length) return null;
  var co = 0, coPhu = 0, ds = [];
  dm.forEach(function(d){
    var o = oDoiChieu(ky, maLoai, d, true);
    if(o.tt==='du'){ co++; ds = ds.concat(o.ds); }
    else if(o.tt==='phu'){ coPhu++; ds = ds.concat(o.ds); }
  });
  if(!co && !coPhu) return null;
  if(co===dm.length) return {tt:'du', ds:ds, chu:'✓'};
  return {tt:'mot-phan', ds:ds, chu:co+'/'+dm.length, so:co, tong:dm.length};
}
function laExcel(m){ return /\.(xlsx|xls|csv)$/i.test(m.tenMoi||m.tenCu||''); }
function oDoiChieu(ky, maLoai, donVi, khongGop, chiExcel){
  var ds = D.duLieu.filter(function(x){
    if(chiExcel===true && !laExcel(x)) return false;
    if(chiExcel===false && laExcel(x)) return false;
    return x.ky===ky && (x.maLoai||'KHAC')===maLoai &&
      ((donVi==='Toàn PGD') ? capCuaPhamVi(x.phamVi)==='pgd' : x.phamVi===donVi);
  });
  var cuoi = ds.filter(function(x){ return !x.banPhu; });
  if(cuoi.length) return {tt:'du', ds:cuoi};
  if(ds.length)   return {tt:'phu', ds:ds};
  /* chưa có file gắn thẳng cho đơn vị này — nếu là XÃ thì cộng dồn các điểm bên trong */
  if(!khongGop && dsDonVi('xa').indexOf(donVi)>=0){
    var gop = oDoiChieuXa(ky, maLoai, donVi);
    if(gop) return gop;
  }
  return {tt:'thieu', ds:[]};
}
/* kỳ gần nhất có dữ liệu còn thiếu gì — 3.31: dùng chung quy tắc với ma trận (cấp áp dụng, chu kỳ, xã quản lý) */
function kyGanNhat(){
  var ky = D.duLieu.map(function(x){ return x.ky; }).filter(Boolean).sort();
  return ky[ky.length-1] || '';
}
function kyThieu(){
  var mau = D.cauHinh.mauBaoCao||[];
  if(!mau.length || !D.duLieu.length) return [];
  return thieuTheoKy(kyGanNhat()).map(function(x){ return x.dv+': '+x.bc+(x.ghi?' ('+x.ghi+')':''); });
}
