#!/bin/bash
# Dùng: bash tools/hoiquy.sh <tên lượt> [thư mục tạm] [nhóm] [số luồng]
#   chế độ: tat = hồi quy đủ (định kỳ 3–4 bản / trước bản lớn) · doi = chỉ phép chưa chốt / file phụ thuộc đổi (mỗi bản). 3.387 bỏ chế độ nhóm chữ (tools/hoiquy_nhom.txt).
#   nhóm doi (3.384, anh 26/10 "chức năng đã chốt ổn thì không cần chạy lại"): chỉ chạy phép thử CHƯA CHỐT hoặc có file phụ thuộc đã đổi (tools/hoiquy_pt.py · mốc tests/hoiquy_moc.json).
#   Mọi lượt xong tự ghi mốc: phép đạt → đã chốt (dấu vân tay file phụ thuộc), phép trượt → bỏ chốt. Bảng đã chốt: python3 tools/hoiquy_pt.py bang → docs/DA_CHOT.md
#   số luồng: 1 (mặc định, như cũ) · 2–3 chạy song song (nhanh hơn; máy yếu dễ trượt chập chờn → chạy lại phép trượt riêng)
# Chạy TOÀN BỘ phép thử (hoiquy, hoiquy2, t1xx, t2xx, t3xx — 20/10: thêm t2xx; 25/10 (3.361): thêm t3xx — dải TK 2 t300–t349, trước bỏ sót) trên bản sao commit HEAD (git worktree) — không đụng thư mục đang code.
# Kết quả: <thư mục tạm>/hq<tên>/tong.txt, mỗi dòng "tên mã_thoát ✗=số_dòng_sai dòng_cuối"; xong ghi XONG. Log từng phép: <tên>.log
# LƯU Ý: không chạy 2 lượt cùng lúc; không chạy phép thử khác song song (máy nặng → hoiquy dễ trượt chập chờn).
#        Muốn dừng: kill các tiến trình node có đường dẫn wt<tên> (đừng dùng pkill -f "hoiquy.sh" — giết luôn shell đang gọi).
#        Phép thử in dòng bắt đầu bằng "✗" mà mã thoát 0 vẫn là trượt — xem cột ✗= (3.384: chỉ đếm dòng BẮT ĐẦU bằng ✗ — ✗ nằm trong câu mô tả của ý đạt không tính).
B=$1; T=${2:-/tmp/tuhoso_hq}; W=$T/wt$B; H=$T/hq$B; G=$(git rev-parse --show-toplevel)
mkdir -p $T; cd $G; git worktree remove --force $W 2>/dev/null; git worktree add -q $W HEAD
for d in lib gia31 gianho31; do ln -sf $G/tests/$d $W/tests/$d; done
mkdir -p $H; rm -f $H/*.log; cd $W
NHOM=${3:-tat}; LUONG=${4:-1}
DS="hoiquy hoiquy2 $(ls tests/t[1-3][0-9][0-9].js | sed 's#tests/##;s#\.js##' | sort)"
if [ "$NHOM" = doi ]; then DS="$(python3 $G/tools/hoiquy_pt.py chon --goc $W 2>$H/chon.txt)"; cat $H/chon.txt
elif [ "$NHOM" != tat ]; then echo "Chỉ còn 2 chế độ: doi (mỗi bản) · tat (hồi quy đủ) — 3.387 bỏ nhóm chữ tools/hoiquy_nhom.txt"; exit 1; fi
chay(){ for t in $1; do timeout 900 node tests/$t.js > $H/$t.log 2>&1; echo "$t $? ✗=$(grep -cE '^\s*✗' $H/$t.log) $(tail -1 $H/$t.log | cut -c1-60)"; done; }
if [ "$LUONG" -le 1 ]; then chay "$DS" > $H/tong.txt 2>&1
else i=0; for t in $DS; do echo $t >> $H/phan$((i % LUONG)).txt; i=$((i+1)); done
  for k in $(seq 0 $((LUONG-1))); do chay "$(cat $H/phan$k.txt)" > $H/tong$k.txt 2>&1 & done; wait
  sort -V $H/tong[0-9]*.txt > $H/tong.txt; rm -f $H/phan*.txt $H/tong[0-9]*.txt; fi
python3 $G/tools/hoiquy_pt.py ghi $H/tong.txt --goc $W > $H/moc.txt 2>&1; cat $H/moc.txt >> $H/tong.txt   # 3.384: ghi mốc đã chốt
echo XONG >> $H/tong.txt
cd $G; git worktree remove --force $W 2>/dev/null
