#!/bin/bash
# 3.546 B4 (docs/DANH_GIA_CHUYEN_GIA_1511.md đợt 1 — anh 15/11 "code cả 2"): KIỂM TỰ ĐỘNG KHI MỞ PR — chạy trên GitHub (.github/workflows/kiem-pr.yml), chạy tay cũng được.
# Dùng: bash tools/kiem_pr.sh <phần> <số phần> [mốc so]
#   Chọn phép thử như hồi quy theo đổi (tools/hoiquy_pt.py chon) nhưng so với MỐC CỦA NHÁNH ĐÍCH (main) — không tin mốc PR tự ghi.
#   Lấy phần thứ <phần> (0..số phần-1) của danh sách; phép trượt chạy lại 1 lần rồi mới tính trượt (tránh chập chờn). Mã thoát ≠ 0 khi còn phép trượt.
P=${1:-0}; N=${2:-1}; MOC=${3:-}
G=$(git rev-parse --show-toplevel); cd $G
if [ -n "$MOC" ] && [ -f "$MOC" ]; then cp tests/hoiquy_moc.json /tmp/moc_pr.json; cp "$MOC" tests/hoiquy_moc.json; fi
DS=$(python3 tools/hoiquy_pt.py chon)
[ -f /tmp/moc_pr.json ] && cp /tmp/moc_pr.json tests/hoiquy_moc.json
i=0; PHAN=""; for t in $DS; do [ $((i % N)) -eq $P ] && PHAN="$PHAN $t"; i=$((i+1)); done
echo "Phần $P/$N:$PHAN"
mkdir -p /tmp/kiem_pr; TRUOT=""
chay1(){ timeout 900 node tests/$1.js > /tmp/kiem_pr/$1.log 2>&1; local m=$?; local x=$(grep -cE '^\s*✗' /tmp/kiem_pr/$1.log); [ $m -eq 0 ] && [ $x -eq 0 ]; }
for t in $PHAN; do
  if chay1 $t; then echo "✓ $t"
  elif chay1 $t; then echo "✓ $t (lần 2)"
  else echo "✗ $t"; grep -E '^\s*✗|LỖI TRANG' /tmp/kiem_pr/$t.log | head -5 | sed 's/^/    /'; TRUOT="$TRUOT $t"; fi
done
if [ -n "$TRUOT" ]; then echo "TRƯỢT:$TRUOT"; exit 1; fi
echo "Phần $P đạt hết"
