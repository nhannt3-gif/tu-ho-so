// 3.237 (R4 — KE_HOACH_CHUAN_HOA mục 2.8): nạp TOÀN BỘ code app (đúng thứ tự index.html) vào node, KHÔNG trình duyệt —
// DOM / trình duyệt thay bằng "đồ giả vô hại" (mọi thuộc tính, mọi lời gọi đều trả lại chính nó), hẹn giờ không chạy.
// Chỉ để thử nhanh lớp NGHIỆP VỤ (hàm thuần: tính toán, chuẩn hóa, kiểm tra). Giao diện vẫn thử bằng trình duyệt (tests/t*.js).
const fs = require('fs'), path = require('path'), vm = require('vm');
const GOC = path.join(__dirname, '..', '..');
function giaVoHai(){
  const f = function(){}; let p;
  p = new Proxy(f, {
    get(t, k){ if(k===Symbol.toPrimitive) return ()=>0; if(k===Symbol.iterator) return function*(){}; if(k==='then') return undefined;
      if(k==='length') return 0; if(k in t && k!=='name' && k!=='prototype') return t[k]; return p; },
    set(t, k, v){ t[k] = v; if(k==='textContent') t.innerHTML = String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); return true; },   /* như trình duyệt: textContent → innerHTML đã thoát */
    apply(t, th, a){ return t.__tao ? giaVoHai() : p; }, construct(){ return p; }, has(){ return true; } });
  return p;
}
function nap(){
  const G = giaVoHai(), kho = {};
  const doc = giaVoHai(); const tao = function(){ return giaVoHai(); }; tao.__tao = 1; doc.createElement = tao; doc.createElementNS = tao; doc.createDocumentFragment = tao;   /* mỗi phần tử tạo mới là 1 đồ giả riêng */
  const ctx = {console, Promise, Math, Date, JSON, RegExp, Error, TypeError, Array, Object, String, Number, Boolean, Symbol, Map, Set, WeakMap, Uint8Array, ArrayBuffer, Intl,
    parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, escape, unescape, atob:s=>Buffer.from(s,'base64').toString('binary'), btoa:s=>Buffer.from(s,'binary').toString('base64'),
    TextEncoder, TextDecoder, Blob: typeof Blob!=='undefined' ? Blob : G, URL: G, File: G, FileReader: G, Image: G, Worker: G, XMLHttpRequest: G, FormData: G,
    document: doc, navigator: {userAgent:'node', language:'vi', platform:'node', clipboard:G, serviceWorker:undefined, mediaDevices:G},
    location: {protocol:'file:', search:'', hash:'', href:'file:///index.html', pathname:'/index.html', host:'', replace(){}, reload(){}},
    history: {state:null, pushState(){}, replaceState(){}, back(){}, forward(){}},
    localStorage: {getItem:k=>k in kho ? kho[k] : null, setItem:(k,v)=>{kho[k]=String(v)}, removeItem:k=>{delete kho[k]}, clear:()=>{for(const k in kho) delete kho[k]}},
    sessionStorage: {getItem:()=>null, setItem(){}, removeItem(){}},
    matchMedia: ()=>({matches:false, addListener(){}, addEventListener(){}, removeEventListener(){}}),
    getComputedStyle: ()=>G, requestAnimationFrame: ()=>0, cancelAnimationFrame(){}, alert(){}, confirm:()=>true, prompt:()=>null, open:()=>null, print(){},
    setTimeout: ()=>0, clearTimeout(){}, setInterval: ()=>0, clearInterval(){}, queueMicrotask(){},
    THU_VIEN_DT: [], indexedDB: undefined, fetch: undefined, CompressionStream: undefined, DecompressionStream: undefined, Response: undefined,
    addEventListener(){}, removeEventListener(){}, dispatchEvent(){}, innerWidth: 1440, innerHeight: 900, devicePixelRatio: 1, screen:{width:1440, height:900}};
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx; ctx.top = ctx; ctx.parent = ctx;
  vm.createContext(ctx);
  const html = fs.readFileSync(path.join(GOC, 'index.html'), 'utf8'), loi = [], tep = [];
  html.split('\n').forEach(function(x){ const m = /^<script src="([^"?]+)(?:\?v=[^"]*)?"><\/script>$/.exec(x); if(m) tep.push(m[1]); });
  tep.forEach(function(t){ try { vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), ctx, {filename:t}); } catch(e){ loi.push(t+': '+(e && e.message)); } });
  return {ctx, loi, tep};
}
module.exports = {nap};
if(require.main===module){ const t0 = Date.now(), r = nap(); console.log(r.tep.length+' file · '+(Date.now()-t0)+' ms · lỗi nạp: '+(r.loi.length ? r.loi.join(' | ') : 'không')); }
