// Drive giả dùng chung cho nhiều trang (2 máy) — đủ các lệnh app dùng
module.exports = function(){
  const F = {}; let n = 0, t0 = Date.now();
  const tg = ()=> new Date(t0 + (++n)*1000).toISOString();
  F.root = {id:'root', name:'root', parents:[], folder:true};
  const tim = q => Object.values(F).filter(f => {
    if(f.trashed) return false;
    const mn = q.match(/name='((?:[^'\\]|\\.)*)'/); if(mn && f.name!==mn[1].replace(/\\'/g,"'")) return false;
    const mp = q.match(/'([^']+)' in parents/); if(mp && !(f.parents||[]).includes(mp[1])) return false;
    if(/mimeType='application\/vnd.google-apps.folder'/.test(q) && !f.folder) return false;
    return true; });
  const multipart = (buf, ct) => {
    const s = buf.toString('latin1'); const b = s.slice(0, s.indexOf('\r\n'));
    const parts = s.split(b).slice(1,-1).map(p => p.replace(/^\r\n/,'').replace(/\r\n$/,''));
    const tach = p => { const i = p.indexOf('\r\n\r\n'); return p.slice(i+4); };
    const meta = JSON.parse(Buffer.from(tach(parts[0]),'latin1').toString('utf8')||'{}');
    const body = Buffer.from(tach(parts[1]),'latin1');
    return {meta, body};
  };
  const xuLy = async (route) => {
    const r = route.request(), u = new URL(r.url()), m = r.method(), p = u.pathname, q = u.searchParams;
    const tra = o => route.fulfill({status:200, contentType:'application/json', body:JSON.stringify(o)});
    const hdr = r.headers()['content-type']||'';
    let mId = p.match(/\/files\/([^/]+)$/);
    if(p.endsWith('/drive/v3/files') && m==='GET'){ return tra({files: tim(q.get('q')||'').map(f=>({id:f.id,name:f.name,modifiedTime:f.mt,parents:f.parents,mimeType:f.folder?'application/vnd.google-apps.folder':(f.mime||'application/octet-stream'),...(f.folder?{}:{size:String((f.body||'').length),md5Checksum:require('crypto').createHash('md5').update(f.body||'').digest('hex')})}))}); }
    if(!p.includes('/upload/') && p.endsWith('/drive/v3/files') && m==='POST'){ const o = JSON.parse(r.postData()||'{}'); const id='f'+(++n); F[id]={id, name:o.name, parents:o.parents||['root'], folder:/folder/.test(o.mimeType||''), mt:tg()}; return tra({id}); }
    if(p.endsWith('/upload/drive/v3/files') && m==='POST'){ const {meta, body} = multipart(r.postDataBuffer(), hdr); const id='f'+(++n); F[id]={id, name:meta.name, parents:meta.parents||['root'], body, mt:tg()}; return tra({id, modifiedTime:F[id].mt, parents:F[id].parents}); }
    if(mId && F[mId[1]]){
      const f = F[mId[1]];
      if(m==='GET' && q.get('alt')==='media'){ return route.fulfill({status:200, body:f.body||Buffer.from(''), contentType: /\.json$/.test(f.name)?'application/json':'application/octet-stream'}); }
      if(m==='GET'){ return tra({id:f.id, name:f.name, size:String((f.body||'').length), trashed:!!f.trashed, modifiedTime:f.mt}); }
      if(m==='PATCH'){
        if((r.postDataBuffer()||Buffer.from('')).slice(0,2).toString()==='--'){ const {meta, body} = multipart(r.postDataBuffer(), hdr); if(meta.name) f.name=meta.name; f.body=body; f.nhanNoiDung=(f.nhanNoiDung||0)+1; }
        else { const o = JSON.parse(r.postData()||'{}'); if(o.name) f.name=o.name; if(o.trashed!==undefined) f.trashed=!!o.trashed; }
        if(q.get('addParents')){ f.parents = (f.parents||[]).filter(x=>x!==q.get('removeParents')).concat([q.get('addParents')]); }
        f.mt = tg(); return tra({id:f.id, parents:f.parents, modifiedTime:f.mt});
      }
    }
    return route.fulfill({status:404, body:'{}'});
  };
  return {F, xuLy, duong:(id)=>{ const d=[]; let f=F[id]; while(f && f.id!=='root'){ d.unshift(f.name); f=F[(f.parents||[])[0]]; } return d.join('/'); }};
};
