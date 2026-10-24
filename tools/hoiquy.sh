#!/bin/bash
# Dùng: bash tools/hoiquy.sh <tên lượt> [thư mục tạm] [nhóm] [số luồng]
#   nhóm (t260 TK 3, 24/10): tat (mặc định = toàn bộ như cũ) · hoặc tên trong tools/hoiquy_nhom.txt (kt, hs, scan, gdx, so, dt, khung) — chỉ chạy phép thử có chữ khớp nhóm + hoiquy, hoiquy2
#   số luồng: 1 (mặc định, như cũ) · 2–3 chạy song song (nhanh hơn; máy yếu dễ trượt chập chờn → chạy lại phép trượt riêng)
# Chạy TOÀN BỘ phép thử (hoiquy, hoiquy2, t1xx, t2xx — 20/10: thêm t2xx, trước bỏ sót) trên bản sao commit HEAD (git worktree) — không đụng thư mục đang code.
# Kết quả: <thư mục tạm>/hq<tên>/tong.txt, mỗi dòng "tên mã_thoát ✗=số_dòng_sai dòng_cuối"; xong ghi XONG. Log từng phép: <tên>.log
# LƯU Ý: không chạy 2 lượt cùng lúc; không chạy phép thử khác song song (máy nặng → hoiquy dễ trượt chập chờn).
#        Muốn dừng: kill các tiến trình node có đường dẫn wt<tên> (đừng dùng pkill -f "hoiquy.sh" — giết luôn shell đang gọi).
#        Phép thử in "✗" mà mã thoát 0 vẫn là trượt — xem cột ✗=.
B=$1; T=${2:-/tmp/tuhoso_hq}; W=$T/wt$B; H=$T/hq$B; G=$(git rev-parse --show-toplevel)
mkdir -p $T; cd $G; git worktree remove --force $W 2>/dev/null; git worktree add -q $W HEAD
for d in lib gia gia31 gianho gianho31; do ln -sf $G/tests/$d $W/tests/$d; done
mkdir -p $H; rm -f $H/*.log; cd $W
NHOM=${3:-tat}; LUONG=${4:-1}
DS="hoiquy hoiquy2 $(ls tests/t[12][0-9][0-9].js | sed 's#tests/##;s#\.js##' | sort)"
if [ "$NHOM" != tat ]; then MAU=$(grep "^$NHOM:" $G/tools/hoiquy_nhom.txt | cut -d: -f2-); [ -z "$MAU" ] && { echo "Không có nhóm $NHOM trong tools/hoiquy_nhom.txt"; exit 1; }
  DS="hoiquy hoiquy2 $(for t in $DS; do case $t in hoiquy|hoiquy2) ;; *) grep -qE "$MAU" tests/$t.js && echo $t;; esac; done)"; fi
chay(){ for t in $1; do timeout 900 node tests/$t.js > $H/$t.log 2>&1; echo "$t $? ✗=$(grep -c '✗' $H/$t.log) $(tail -1 $H/$t.log | cut -c1-60)"; done; }
if [ "$LUONG" -le 1 ]; then chay "$DS" > $H/tong.txt 2>&1
else i=0; for t in $DS; do echo $t >> $H/phan$((i % LUONG)).txt; i=$((i+1)); done
  for k in $(seq 0 $((LUONG-1))); do chay "$(cat $H/phan$k.txt)" > $H/tong$k.txt 2>&1 & done; wait
  sort -V $H/tong[0-9]*.txt > $H/tong.txt; rm -f $H/phan*.txt $H/tong[0-9]*.txt; fi
echo XONG >> $H/tong.txt
cd $G; git worktree remove --force $W 2>/dev/null
