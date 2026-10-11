#!/bin/bash
# Dùng: bash tools/hoiquy.sh <tên lượt> [thư mục tạm]
# Chạy TOÀN BỘ phép thử (hoiquy, hoiquy2, t1xx) trên bản sao commit HEAD (git worktree) — không đụng thư mục đang code.
# Kết quả: <thư mục tạm>/hq<tên>/tong.txt, mỗi dòng "tên mã_thoát ✗=số_dòng_sai dòng_cuối"; xong ghi XONG. Log từng phép: <tên>.log
# LƯU Ý: không chạy 2 lượt cùng lúc; không chạy phép thử khác song song (máy nặng → hoiquy dễ trượt chập chờn).
#        Muốn dừng: kill các tiến trình node có đường dẫn wt<tên> (đừng dùng pkill -f "hoiquy.sh" — giết luôn shell đang gọi).
#        Phép thử in "✗" mà mã thoát 0 vẫn là trượt — xem cột ✗=.
B=$1; T=${2:-/tmp/tuhoso_hq}; W=$T/wt$B; H=$T/hq$B; G=$(git rev-parse --show-toplevel)
mkdir -p $T; cd $G; git worktree remove --force $W 2>/dev/null; git worktree add -q $W HEAD
for d in lib gia gia31 gianho gianho31; do ln -sf $G/tests/$d $W/tests/$d; done
mkdir -p $H; rm -f $H/*.log; cd $W
for t in hoiquy hoiquy2 $(ls tests/t1[0-9][0-9].js | sed 's#tests/##;s#\.js##' | sort); do timeout 900 node tests/$t.js > $H/$t.log 2>&1; echo "$t $? ✗=$(grep -c '✗' $H/$t.log) $(tail -1 $H/$t.log | cut -c1-60)"; done > $H/tong.txt 2>&1
echo XONG >> $H/tong.txt
cd $G; git worktree remove --force $W 2>/dev/null
