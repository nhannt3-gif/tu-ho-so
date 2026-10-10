// 3.142: mã nguồn app đã ghép (index.html + css/ + js/, như tests/ghep.py) — cho phép thử dò chữ trong mã
// (trước 3.142 dùng document.documentElement.innerHTML; nay mã nằm ở file riêng nên trang không còn chứa).
const fs = require('fs'), path = require('path'), GOC = path.join(__dirname, '..');
module.exports = function(){
  return fs.readFileSync(path.join(GOC, 'index.html'), 'utf8').split('\n').map(x => {
    const m = x.match(/^<link rel="stylesheet" href="([^"?]+)(?:\?v=[^"]*)?">$/) || x.match(/^<script src="([^"?]+)(?:\?v=[^"]*)?"><\/script>$/);
    if(!m) return x;
    const the = x[1]==='l' ? 'style' : 'script';
    return '<'+the+'>\n'+fs.readFileSync(path.join(GOC, m[1]), 'utf8')+'</'+the+'>';
  }).join('\n');
};
