(function(){
 function rich(e,bl){
  e.textContent='';e.classList.add('nj-rich');
  function runs(par,r){(r||[]).forEach(function(o){var w=document.createTextNode(o.x);
   if(o.m){var c=document.createElement('code');c.appendChild(w);w=c}
   if(o.b){var s=document.createElement('strong');s.appendChild(w);w=s}
   if(o.i){var i=document.createElement('em');i.appendChild(w);w=i}
   if(o.s){var d=document.createElement('s');d.appendChild(w);w=d}
   if(o.u){var u=document.createElement('u');u.appendChild(w);w=u}
   if(o.c&&/^#[0-9a-f]{6}$/i.test(o.c)){var sp=document.createElement('span');sp.style.color=o.c;sp.appendChild(w);w=sp}
   if(o.a&&/^(https?:|mailto:)/i.test(o.a)){var a=document.createElement('a');a.href=o.a;a.target='_blank';a.rel='noopener noreferrer';a.appendChild(w);w=a}
   par.appendChild(w)})}
  function nest(par,x,cls){if(x.c&&x.c.length){var d=document.createElement('div');d.className=cls||'nj-in';R(d,x.c);par.appendChild(d)}}
  function R(par,list){var cur=null,ct='';
  list.forEach(function(x){var t=x.t,el;
   if(t==='li'||t==='ol'||t==='td'){if(ct!==t){cur=document.createElement(t==='ol'?'ol':'ul');if(t==='td')cur.className='nj-td';if(t==='ol'&&x.n)cur.start=x.n;par.appendChild(cur);ct=t}var li=document.createElement('li');if(t==='td')li.appendChild(document.createTextNode((x.c0||x.c===1)?'☑ ':'☐ '));runs(li,x.r);if(t!=='td'||x.c!==1)nest(li,x);cur.appendChild(li);return}
   ct='';
   if(t==='p'){el=document.createElement('p');runs(el,x.r);if(!(x.r&&x.r.length))el.appendChild(document.createElement('br'));par.appendChild(el);nest(par,x);return}
   else if(t==='h1'||t==='h2'||t==='h3'){el=document.createElement(t==='h1'?'h2':t==='h2'?'h3':'h4');runs(el,x.r)}
   else if(t==='q'){el=document.createElement('blockquote');runs(el,x.r);nest(el,x)}
   else if(t==='tg'){el=document.createElement('details');var sm=document.createElement('summary');if(x.h)sm.className='nj-sh'+x.h;runs(sm,x.r);el.appendChild(sm);nest(el,x)}
   else if(t==='co'){el=document.createElement('div');el.className='nj-co';if(x.bg&&/^#[0-9a-f]{6}$/i.test(x.bg))el.style.background=x.bg+'26';if(x.e){var ic=document.createElement('span');ic.className='nj-ic';ic.textContent=x.e;el.appendChild(ic)}var bd=document.createElement('div');bd.className='nj-cb';if(x.r&&x.r.length){var cp=document.createElement('p');runs(cp,x.r);bd.appendChild(cp)}nest(bd,x,'nj-in0');el.appendChild(bd)}
   else if(t==='cols'){el=document.createElement('div');el.className='nj-cols';(x.c||[]).forEach(function(cl){var cd=document.createElement('div');cd.className='nj-col';R(cd,cl.c||[]);el.appendChild(cd)})}
   else if(t==='col'){el=document.createElement('div');R(el,x.c||[])}
   else if(t==='tb'){el=document.createElement('div');el.className='nj-tw';var tb=document.createElement('table');(x.rows||[]).forEach(function(rw,ri){var tr=document.createElement('tr');rw.forEach(function(cell){var c=document.createElement(x.h&&ri===0?'th':'td');runs(c,cell);tr.appendChild(c)});tb.appendChild(tr)});el.appendChild(tb)}
   else if(t==='lk'){if(!/^https?:\/\//i.test(x.u||''))return;el=document.createElement('p');var la=document.createElement('a');la.href=x.u;la.target='_blank';la.rel='noopener noreferrer';la.textContent=x.x||x.u;el.appendChild(la)}
   else if(t==='code'){el=document.createElement('pre');var cd=document.createElement('code');cd.textContent=x.x||'';el.appendChild(cd)}
   else if(t==='hr')el=document.createElement('hr');
   else if(t==='img'){if(!/^(https?:\/\/|data\/img\/|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(x.src||''))return;el=document.createElement('figure');var im=document.createElement('img');im.src=x.src;im.alt=x.a||'';im.loading='lazy';el.appendChild(im);if(x.a){var fc=document.createElement('figcaption');fc.textContent=x.a;el.appendChild(fc)}}
   else return;
   par.appendChild(el)})}
  R(e,bl)}
 (function(){var st=document.createElement('style');st.textContent='.nj-rich{white-space:pre-line!important;overflow-wrap:anywhere}.nj-ld{opacity:0!important}@keyframes njfade{from{opacity:0}to{opacity:1}}.nj-rich{animation:njfade .3s ease}[data-view=profile] .nj-rich>*{margin:0 0 .2em}[data-view=timeline] .nj-rich ul,[data-view=timeline] .nj-rich ol,[data-view=profile] .nj-rich ul,[data-view=profile] .nj-rich ol{list-style-position:inside;padding-left:0}.nj-rich>*:last-child{margin-bottom:0}.nj-rich>*{margin:0 0 .9em}.nj-rich h2,.nj-rich h3,.nj-rich h4{margin:1.4em 0 .5em;line-height:1.35}.nj-rich h2{font-size:1.5em}.nj-rich h3{font-size:1.25em}.nj-rich h4{font-size:1.1em}.nj-rich ul,.nj-rich ol{padding-left:1.4em}.nj-rich ul.nj-td{list-style:none;padding-left:.2em}.nj-rich li{margin:.25em 0}.nj-rich figure{margin:1.2em 0}.nj-rich img{display:block;max-width:100%;height:auto;border-radius:8px}.nj-rich figcaption{font-size:.85em;opacity:.65;margin-top:.4em}.nj-rich blockquote{padding:.2em 1em;border-left:3px solid rgba(128,128,140,.5)}.nj-rich pre{overflow-x:auto;padding:12px 14px;border-radius:8px;background:rgba(128,128,140,.15);font-size:.9em;white-space:pre}.nj-rich code{font-family:ui-monospace,monospace}.nj-rich :not(pre)>code{padding:.1em .35em;border-radius:4px;background:rgba(128,128,140,.2)}.nj-rich hr{border:0;border-top:1px solid rgba(128,128,140,.4);margin:1.4em 0}.nj-rich a{color:inherit;text-decoration:underline}.nj-lock{display:flex;flex-direction:column;gap:10px;max-width:360px;padding:18px 0}.nj-lock p{margin:0}.nj-lock div{display:flex;gap:8px}.nj-lock input{flex:1;min-width:0;font:inherit;padding:8px 12px;border-radius:8px;border:1px solid rgba(128,128,140,.5);background:transparent;color:inherit}.nj-lock button{font:inherit;padding:8px 16px;border-radius:8px;border:0;background:currentColor;cursor:pointer}.nj-lock button{background:rgba(128,128,140,.3);color:inherit;font-weight:700}.nj-lock [role=alert]{color:#d44c47;font-size:.9em}.nj-in{margin-left:1.2em}.nj-in>*,.nj-col>*,.nj-in0>*,.nj-rich details>.nj-in>*{margin:0 0 .7em}.nj-in0{margin-top:.5em}.nj-rich details{padding:.2em 0}.nj-rich summary{cursor:pointer;font-weight:600}.nj-rich summary.nj-sh1{font-size:1.5em}.nj-rich summary.nj-sh2{font-size:1.25em}.nj-rich summary.nj-sh3{font-size:1.1em}.nj-co{display:flex;gap:.7em;padding:14px 16px;border-radius:8px;background:rgba(128,128,140,.15)}.nj-co p{margin:0}.nj-ic{flex:none}.nj-cb{min-width:0;flex:1}.nj-cols{display:flex;gap:1.5em;flex-wrap:wrap;align-items:flex-start}.nj-col{flex:1 1 220px;min-width:0}.nj-tw{overflow-x:auto}.nj-rich table{border-collapse:collapse;width:100%}.nj-rich td,.nj-rich th{border:1px solid rgba(128,128,140,.4);padding:6px 10px;text-align:left;vertical-align:top}.nj-rich th{background:rgba(128,128,140,.15)}';document.head.appendChild(st)})();
 function lock(e,enc){e.textContent='';e.classList.add('nj-lk');
  var f=document.createElement('form'),m=document.createElement('p'),i=document.createElement('input'),bt=document.createElement('button'),er=document.createElement('p');
  m.textContent='🔒 비밀번호가 있는 글이에요.';i.type='password';i.placeholder='비밀번호';i.autocomplete='off';i.setAttribute('aria-label','비밀번호');bt.type='submit';bt.textContent='열기';er.hidden=true;er.setAttribute('role','alert');
  f.className='nj-lock';f.appendChild(m);var rw=document.createElement('div');rw.appendChild(i);rw.appendChild(bt);f.appendChild(rw);f.appendChild(er);e.appendChild(f);
  function b64(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
  f.onsubmit=function(ev){ev.preventDefault();er.hidden=true;
   if(!window.crypto||!crypto.subtle){er.textContent='이 주소(https)에서만 열 수 있어요.';er.hidden=false;return}
   bt.disabled=true;
   crypto.subtle.importKey('raw',new TextEncoder().encode(i.value.trim()),'PBKDF2',false,['deriveKey']).then(function(km){return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(enc.s),iterations:enc.n||150000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt'])})
   .then(function(k){return crypto.subtle.decrypt({name:'AES-GCM',iv:b64(enc.i)},k,b64(enc.d))})
   .then(function(pt){var bl=JSON.parse(new TextDecoder().decode(pt));e.classList.remove('nj-lk');rich(e,bl)})
   .catch(function(){bt.disabled=false;er.textContent='비밀번호가 맞지 않아요.';er.hidden=false;i.select()})}}
window.njRich=rich;window.njLock=lock
})();window.njFold=function(el){
 var m=el.getAttribute('data-fold');if(m!=='c'&&m!=='o')return;
 el.querySelectorAll('.bd-item').forEach(function(li){
  if(li._f)return;var t=li.querySelector('.bd-t'),b=li.querySelector('.bd-b');if(!t||!b)return;li._f=1;
  t.classList.add('bd-tg');t.setAttribute('role','button');t.tabIndex=0;
  var tm;function clr(){b.style.height=b.style.overflow=b.style.opacity=b.style.transition=''}
  function set(o,an){t.setAttribute('aria-expanded',o?'true':'false');li.classList.toggle('bd-open',o);clearTimeout(tm);
   if(!an){clr();b.style.display=o?'':'none';return}
   var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm){clr();b.style.display=o?'':'none';return}
   if(o){b.style.display='';var h=b.scrollHeight;b.style.overflow='hidden';b.style.height='0';b.style.opacity='0';void b.offsetHeight;b.style.transition='height .28s ease,opacity .28s ease';b.style.height=h+'px';b.style.opacity='1';tm=setTimeout(clr,300)}
   else{var h2=b.offsetHeight;b.style.overflow='hidden';b.style.height=h2+'px';void b.offsetHeight;b.style.transition='height .28s ease,opacity .28s ease';b.style.height='0';b.style.opacity='0';tm=setTimeout(function(){b.style.display='none';clr()},300)}}
  function tog(e){if(e.target.closest('a'))return;set(t.getAttribute('aria-expanded')!=='true',1)}
  t.addEventListener('click',tog);t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tog(e)}});
  set(m==='o',0)})
};(function(){
 var C=window.NJ_CONFIG||{};
 function el2(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function sub(s,p,n){var dd=new Date(p.created_at),M={'제목':p.title,'본문':p.body||'','날짜':isNaN(dd)?'':dd.toLocaleDateString('ko-KR'),'번호':n==null?'':n,'카테고리':p.category||''};return s.replace(/\{\{\s*([^}]+?)\s*\}\}/g,function(m,k){return M[k]!=null?M[k]:m})}
 function fsRows(j){return(j||[]).filter(function(x){return x.document}).map(function(x){var f=x.document.fields||{};function s(k){return f[k]&&(f[k].stringValue||f[k].timestampValue)||''}return{id:x.document.name.split('/').pop(),title:s('title'),body:s('body'),image:s('image')||null,category:s('category'),created_at:s('created_at')}}).sort(function(a,b){return a.created_at<b.created_at?1:-1})}
 document.querySelectorAll(window.__BDSEL||'[data-board]').forEach(function(el){
  var ul=el.querySelector('.bd-list'),tp=el.querySelector('template.bd-tpl'),src=el.getAttribute('data-src')||'supabase',view=el.getAttribute('data-view'),lim=parseInt(el.getAttribute('data-limit'),10)||10,bd=el.getAttribute('data-board'),open=view==='cards'||view==='feed'||view==='gallery'||view==='photos'||view==='profile'||view==='timeline'||view==='orbitline';
  var dh=el.getAttribute('data-detail');
  function msg(t){if(!ul)return;ul.textContent='';ul.appendChild(el2('li','bd-msg',t))}
  var curId=new URLSearchParams(location.search).get('id')||'';
  function lnk(li,p,st){if(curId&&String(p.id)===curId){li.classList.add('bd-cur');li.setAttribute('aria-current','true')}if(!dh||p.id==null||p.id==='')return;var a=el2('a',st?'bd-a':'bd-more',st?null:'자세히 보기 →');a.href=dh+'?id='+encodeURIComponent(p.id);if(st)a.setAttribute('aria-label',(p.title||'글')+' 보기');var h=st?li:li.querySelector('.bd-b');if(h)h.appendChild(a)}
  var cm=el.getAttribute('data-cats'),qc=new URLSearchParams(location.search).get('cat')||'',cur=qc;
  var ALL=null;
  document.addEventListener('njcat',function(e){if(!e.detail||e.detail.board!==bd||!ALL)return;qc=e.detail.cat||'';cur=qc;render(ALL)});
  function render(all){
   ALL=all;
   if(!cm){draw(qc?all.filter(function(p){return p.category===qc}):all);return}
   if(!all.length){draw(all);return}
   var names=[];all.forEach(function(p){if(p.category&&names.indexOf(p.category)<0)names.push(p.category)});
   if(!names.length){draw(all);return}
   var nav=el.querySelector('.bd-cats');
   if(!nav){nav=el2('div','bd-cats');nav.setAttribute('role','group');nav.setAttribute('aria-label','카테고리');el.insertBefore(nav,ul)}
   function go(){nav.textContent='';['' ].concat(names).forEach(function(c){var n=c?all.filter(function(p){return p.category===c}).length:all.length,b=el2('button','bd-cb');b.type='button';b.setAttribute('aria-pressed',c===cur?'true':'false');b.appendChild(el2('span',null,c||'전체'));b.appendChild(el2('small',null,n));b.onclick=function(){cur=c;go()};nav.appendChild(b)});draw(cur?all.filter(function(p){return p.category===cur}):all)}
   go()}
  function OT(rows){
   var old=el.querySelector('.ot-st');if(old)old.parentNode.removeChild(old);if(el._otOff)el._otOff();
   var n=rows.length;if(!n)return;
   var NS='http://www.w3.org/2000/svg',STEP=40,R0=110,R1=330,RD=Math.PI/180,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
   function sv(t,a,p){var e=document.createElementNS(NS,t);for(var q in a)e.setAttribute(q,a[q]);if(p)p.appendChild(e);return e}
   function rad(k){return n===1?R0:R0+(R1-R0)*k/(n-1)}
   function pad(x){return x<10?'0'+x:''+x}
   var st=el2('div','ot-st'),svg=sv('svg',{viewBox:'-410 -410 820 820','class':'ot-svg','aria-hidden':'true'},st),cap=el2('div','ot-cap');
   [70,150,230,310,360].forEach(function(r,i){sv('circle',{r:r,'class':'ot-ring'+(i%2?'':' ot-d')},svg)});
   var tk=sv('g',{'class':'ot-tk'},svg),a,rd;
   for(a=0;a<360;a+=5){rd=a*RD;sv('line',{x1:Math.cos(rd)*374,y1:Math.sin(rd)*374,x2:Math.cos(rd)*(a%30===0?398:386),y2:Math.sin(rd)*(a%30===0?398:386)},tk)}
   sv('circle',{r:4,'class':'ot-core'},svg);sv('circle',{r:13,'class':'ot-ring ot-c2'},svg);
   var ld=sv('line',{x1:R0+14,y1:0,x2:410,y2:0,'class':'ot-ld'},svg),g=sv('g',{},svg),d='',k,j,m=14;
   for(k=0;k<n-1;k++)for(j=0;j<=m;j++){var kk=k+j/m,r=rad(kk),an=kk*STEP*RD;d+=(d?'L':'M')+(r*Math.cos(an)).toFixed(1)+' '+(r*Math.sin(an)).toFixed(1)}
   if(d)sv('path',{d:d,'class':'ot-path'},g);
   var halo=sv('circle',{cx:R0,cy:0,r:15,'class':'ot-halo'},svg),dots=[],lbs=[];
   var sp=el.parentNode;while(sp&&sp!==document.body&&sp.nodeType===1){var ov=getComputedStyle(sp).overflowY;if(ov==='auto'||ov==='scroll')break;sp=sp.parentNode}
   var sc=(sp&&sp!==document.body&&sp.nodeType===1)?sp:window;
   function vtop(){return sc===window?0:sc.getBoundingClientRect().top}
   function go(q){var rc=el.getBoundingClientRect(),z=rc.height/(el.offsetHeight||1),tot=el.offsetHeight-st.offsetHeight,dd=(rc.top-vtop())+(n>1?q/(n-1):0)*tot*z;sc.scrollTo({top:(sc===window?window.pageYOffset:sc.scrollTop)+dd,behavior:RM?'auto':'smooth'})}
   rows.forEach(function(p,q){var r=rad(q),an=q*STEP*RD,x=r*Math.cos(an),y=r*Math.sin(an),dt=new Date(p.created_at);
    var c=sv('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:5,'class':'ot-dot',tabindex:0,role:'button','aria-label':p.title||''},g);
    c.addEventListener('click',function(){go(q)});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go(q)}});dots.push(c);
    var l=sv('text',{x:10,y:-10,'class':'ot-lb'},g);l.textContent=isNaN(dt)?'':String(dt.getFullYear()).slice(2)+'.'+pad(dt.getMonth()+1);l._x=x;l._y=y;lbs.push(l)});
   var cn=el2('div','ot-n'),cd=el2('div','ot-dt'),ct=el2('h3','ot-tt'),cb=el2('div','ot-bd'),hn=el2('div','ot-hint',n>1?'SCROLL  ↕   ·   SELECT A STAR':'');
   cap.setAttribute('aria-live','polite');[cn,cd,ct,cb,hn].forEach(function(e){cap.appendChild(e)});st.appendChild(cap);el.appendChild(st);
   el.classList.add('ot-on');el.style.setProperty('--otn',n>1?n-1:0);
   var cur=-1,tF=0,cF=0,raf=0;
   function mark(i){cur=i;dots.forEach(function(c,q){c.setAttribute('class','ot-dot'+(q<i?' past':q===i?' on':''));c.setAttribute('r',q===i?8:5)});var p=rows[i],dt=new Date(p.created_at);
    cn.textContent=pad(i+1)+' / '+pad(n);cd.textContent=isNaN(dt)?'':dt.toLocaleDateString('ko-KR');ct.textContent=(p.lock?'🔒 ':'')+(p.title||'');cb.textContent=p.body||(p.lock?'비밀번호가 있는 글이에요.':'');cap.classList.remove('ot-in');void cap.offsetWidth;cap.classList.add('ot-in')}
   function render(f){var i=Math.max(0,Math.min(n-1,Math.round(f)));g.setAttribute('transform','rotate('+(-f*STEP).toFixed(2)+')');tk.setAttribute('transform','rotate('+(-f*STEP*.5).toFixed(2)+')');
    lbs.forEach(function(l){l.setAttribute('transform','translate('+l._x.toFixed(1)+' '+l._y.toFixed(1)+') rotate('+(f*STEP).toFixed(2)+')')});
    var k0=Math.min(n-1,Math.floor(f)),k1=Math.min(n-1,k0+1),rr=rad(k0)+(rad(k1)-rad(k0))*(f-k0);ld.setAttribute('x1',(rr+14).toFixed(1));halo.setAttribute('cx',rr.toFixed(1));if(i!==cur)mark(i)}
   var JS=sc!==window;if(JS)st.style.position='relative';
   function calc(){var rc=el.getBoundingClientRect(),z=rc.height/(el.offsetHeight||1),tot=el.offsetHeight-st.offsetHeight;if(JS)st.style.transform='translateY('+Math.max(0,Math.min(tot,(vtop()-rc.top)/z)).toFixed(1)+'px)';return tot>0?Math.max(0,Math.min(1,-((rc.top-vtop())/z)/tot))*(n-1):0}
   function tick(){var df=tF-cF;if(RM||Math.abs(df)<.002)cF=tF;else cF+=df*.14;render(cF);raf=cF===tF?0:requestAnimationFrame(tick)}
   function onS(){tF=calc();if(!raf)raf=requestAnimationFrame(tick)}
   sc.addEventListener('scroll',onS,{passive:true});addEventListener('resize',onS);
   el._otOff=function(){sc.removeEventListener('scroll',onS);removeEventListener('resize',onS);if(raf)cancelAnimationFrame(raf)};
   tF=cF=calc();render(cF)}
  var RC={};
  function fetchRich(p){return RC[p.id]||(RC[p.id]=fetch('data/'+encodeURIComponent(bd)+'/'+encodeURIComponent(p.id)+'.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){return j&&j.blocks}).catch(function(){return null}))}
  function richLater(li,b,p,idx){
   var go=function(){if(b._r)return;b._r=1;b.classList.add('nj-ld');
    var tm=setTimeout(function(){b.classList.remove('nj-ld')},4000);
    fetchRich(p).then(function(bl){clearTimeout(tm);
     if(bl&&bl.length){
      if(p.inl){for(var k=0;k<bl.length;k++){if(bl[k].t==='img'){bl=bl.slice(0,k).concat(bl.slice(k+1));break}}}
      if(bl.length)window.njRich(b,bl)}
     b.classList.remove('nj-ld')})};
   var dt=li.querySelector('details');
   if(idx<24)go();
   else if(dt)dt.addEventListener('toggle',function(){if(dt.open)go()});
   else if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go()}},{rootMargin:'300px'});io.observe(li)}
   else go()}
  function openLB(arr,k,from,rc){
   var o=document.getElementById('nj-lb');
   if(!o){
    var st=document.createElement('style');
    st.textContent='#nj-lb{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:rgba(24,16,10,.86);opacity:0;transition:opacity .22s ease;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}#nj-lb[hidden]{display:none}#nj-lb.on{opacity:1}#nj-lb figure{position:relative;margin:0;display:flex;align-items:center;justify-content:center;transform:scale(.96);transition:transform .25s ease}#nj-lb.on figure{transform:none}#nj-lb img{display:block;max-width:64vw;max-height:58vh;width:auto;height:auto;object-fit:contain;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);background:#111}#nj-lb button{position:absolute;border:0;background:rgba(255,255,255,.14);color:#fff;width:44px;height:44px;border-radius:50%;font:300 28px/1 sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:background .15s}#nj-lb button:hover{background:rgba(255,255,255,.28)}#nj-lb .nj-lb-x{top:max(16px,env(safe-area-inset-top));right:16px}#nj-lb .nj-lb-p{left:-60px;top:50%;margin-top:-22px}#nj-lb .nj-lb-n{right:-60px;top:50%;margin-top:-22px}#nj-lb.one .nj-lb-p,#nj-lb.one .nj-lb-n{display:none}@media(max-width:600px){#nj-lb .nj-lb-p,#nj-lb .nj-lb-n{top:100%;bottom:auto;margin:16px 0 0}#nj-lb .nj-lb-p{left:calc(50% - 56px)}#nj-lb .nj-lb-n{right:calc(50% - 56px)}#nj-lb img{max-height:calc((100vh - 150px)*.8)}}@media(prefers-reduced-motion:reduce){#nj-lb,#nj-lb figure{transition:none}}';
    document.head.appendChild(st);
    o=document.createElement('div');o.id='nj-lb';o.hidden=true;o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','사진 크게 보기');
    o.innerHTML='<button type="button" class="nj-lb-x" aria-label="닫기">×</button><figure><img alt=""><button type="button" class="nj-lb-p" aria-label="이전 사진">‹</button><button type="button" class="nj-lb-n" aria-label="다음 사진">›</button></figure>';
    document.body.appendChild(o);
    var im=o.querySelector('img'),x0=null;
    o._show=function(k){var a=o._a,n=a.length;k=(k%n+n)%n;o._k=k;var it=a[k];im.src=it.s;im.alt=it.t||'';o.classList.toggle('one',n<2)};
    o._close=function(){if(o.hidden)return;o.classList.remove('on');if(!o._emb)document.documentElement.style.overflow=o._ov||'';if(o._ro){o._ro.disconnect();o._ro=null}setTimeout(function(){if(!o.classList.contains('on')){o.hidden=true;im.removeAttribute('src')}},230);if(o._f&&o._f.focus)try{o._f.focus({preventScroll:true})}catch(e){}};
    o.addEventListener('click',function(e){var t=e.target;if(t.classList.contains('nj-lb-x')||t===o||t.tagName==='FIGURE')o._close();else if(t.classList.contains('nj-lb-p'))o._show(o._k-1);else if(t.classList.contains('nj-lb-n'))o._show(o._k+1)});
    document.addEventListener('keydown',function(e){if(o.hidden)return;if(e.key==='Escape')o._close();else if(e.key==='ArrowLeft')o._show(o._k-1);else if(e.key==='ArrowRight')o._show(o._k+1)});
    window.addEventListener('resize',function(){if(!o.hidden&&o._fit)o._fit()});
    o.addEventListener('touchstart',function(e){x0=e.touches.length===1?e.touches[0].clientX:null},{passive:true});
    o.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>50)o._show(o._k+(d<0?1:-1))},{passive:true});
   }
   o._a=arr;o._f=from;o._emb=!!rc;var gi=o.querySelector('img');if(o._ro){o._ro.disconnect();o._ro=null}if(rc){o._fit=function(){var r=rc.getBoundingClientRect();o.style.cssText='inset:auto;left:'+Math.round(r.left)+'px;top:'+Math.round(r.top)+'px;width:'+Math.round(r.width)+'px;height:'+Math.round(r.height)+'px';gi.style.maxWidth=Math.round(r.width*.64)+'px';gi.style.maxHeight=Math.round(r.height*.58)+'px'};o._fit();if(window.ResizeObserver){o._ro=new ResizeObserver(function(){o._fit()});o._ro.observe(rc)}}else{o._fit=null;o.style.cssText='';gi.style.maxWidth='';gi.style.maxHeight='';o._ov=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden'}
   o.hidden=false;o._show(k);void o.offsetWidth;o.classList.add('on');
   var cb=o.querySelector('.nj-lb-x');if(cb)cb.focus({preventScroll:true});
  }
  function lbOn(li,arr,p,src){arr.push({s:src,t:p.title||'',b:p.body||''});var k=arr.length-1;li.classList.add('bd-lb');li.tabIndex=0;li.setAttribute('role','button');li.setAttribute('aria-label',(p.title||'사진')+' 크게 보기');li.addEventListener('click',function(){openLB(arr,k,li)});li.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openLB(arr,k,li)}})}
  function draw(rows){
   rows=rows.slice(0,lim);var LB=[];
   if(view==='timeline'||view==='orbitline')rows=rows.slice().reverse();
   if(!rows.length){msg('아직 글이 없어요.');return}
   ul.textContent='';
   rows.forEach(function(p,i){
    if(tp){var lt=el2('li','bd-item'),fr=tp.content.cloneNode(true),dd=new Date(p.created_at),okimg=p.image&&(/^https?:\/\//i.test(p.image)||/^(data\/img|images)\//.test(p.image));
     fr.querySelectorAll('[data-bind]').forEach(function(e){var k=e.getAttribute('data-bind');
      if(k==='title')e.textContent=p.title;else if(k==='body')e.textContent=p.body||'';else if(k==='num')e.textContent=rows.length-i;else if(k==='date')e.textContent=isNaN(dd)?'':dd.toLocaleDateString('ko-KR');
      else if(k==='image'){if(okimg){e.src=p.image;e.alt=p.title||''}else e.hidden=true}
      else if(k==='cat')e.textContent=p.category||'';
      else if(k==='imagebg'&&okimg)e.style.backgroundImage='url("'+p.image.replace(/["\\]/g,'')+'")'});
     fr.querySelectorAll('[data-tx]').forEach(function(e){e.textContent=sub(e.getAttribute('data-tx'),p,rows.length-i)});
     lt.appendChild(fr);lnk(lt,p,1);ul.appendChild(lt);return}
    var li=el2('li','bd-item'),dt=new Date(p.created_at),im=null,no=el2('span','bd-n',rows.length-i),t=el2(open?'h3':'span','bd-t',(p.lock?'🔒 ':'')+p.title),tm=el2('time'),b=el2('div','bd-b',p.body||(p.lock?'비밀번호가 있는 글이에요.':''));
    if(!isNaN(dt)){tm.dateTime=p.created_at;tm.textContent=dt.toLocaleDateString('ko-KR')}
    if(p.image&&(/^https?:\/\//i.test(p.image)||/^(data\/img|images)\//.test(p.image))){im=el2('img','bd-img');im.src=p.image;im.alt=p.title||'';im.loading='lazy';im.decoding='async'}
    if(open){var a=document.createElement('article');if(im)a.appendChild(im);if((cm||view==='profile'||view==='timeline'||view==='orbitline')&&p.category)a.appendChild(el2('span','bd-cat',p.category));a.appendChild(tm);a.appendChild(t);a.appendChild(b);li.appendChild(a)}
    else{var d=document.createElement('details'),s=document.createElement('summary');if(im)b.appendChild(im);s.appendChild(no);s.appendChild(t);s.appendChild(tm);d.appendChild(s);d.appendChild(b);li.appendChild(d)}
    lnk(li,p,open);if(view==='photos'&&im&&!dh)lbOn(li,LB,p,im.src);if(src==='notion'&&view!=='photos'&&!p.lock&&window.njRich)richLater(li,b,p,i);ul.appendChild(li)});
   if(view==='orbitline')OT(rows);
   if(view==='timeline'&&window.njFold)window.njFold(el);
   if((view==='gallery'||el.getAttribute('data-lay')==='scroll')&&!ul._w){ul._w=1;ul.tabIndex=0;ul.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;var max=ul.scrollWidth-ul.clientWidth,l=ul.scrollLeft;if(max<=0||(e.deltaY>0&&l>=max-1)||(e.deltaY<0&&l<=0))return;e.preventDefault();ul.scrollLeft+=e.deltaY},{passive:false})}
  }
  function buildNav(all){
   var names=[],cnt={},b=el.querySelector('.cn-b'),l=el.querySelector('.cn-l'),tg=el.getAttribute('data-target')||location.pathname,fold=el.getAttribute('data-cstyle')!=='drop';
   all.forEach(function(p){if(!p.category)return;if(!cnt[p.category]){cnt[p.category]=0;names.push(p.category)}cnt[p.category]++});
   var pt=el.getAttribute('data-ptab'),pgp=el.getAttribute('data-pgrp'),bd2=el.getAttribute('data-board');
   function pick(c,a){document.querySelectorAll('[data-ck=show]').forEach(function(x){if(x.getAttribute('data-grp')===pgp){x.classList.remove('open');x.setAttribute('aria-selected','false')}});if(pgp)document.querySelectorAll(pgp+'>[data-panel]').forEach(function(q){q.hidden=!q.matches(pt)});document.querySelectorAll('[data-ck=show]').forEach(function(x){if(x.getAttribute('data-to')===pt){x.classList.add('open');x.setAttribute('aria-selected','true')}});l.querySelectorAll('a').forEach(function(x){x.removeAttribute('aria-current')});if(c)a.setAttribute('aria-current','true');else qc='';document.dispatchEvent(new CustomEvent('njcat',{detail:{board:bd2,cat:c}}));try{history.replaceState(null,'',c?'?cat='+encodeURIComponent(c):location.pathname)}catch(x){}if(!fold)set(false)}
   l.textContent='';
   function item(c,n){var li=el2('li'),a=el2('a');a.href=tg+(c?'?cat='+encodeURIComponent(c):'');if(pt)a.onclick=function(e){e.preventDefault();pick(c,a)};a.appendChild(el2('span',null,c||'전체'));a.appendChild(el2('small',null,n));if(c===qc)a.setAttribute('aria-current','true');li.appendChild(a);l.appendChild(li)}
   if(!names.length){l.appendChild(el2('li','bd-msg','카테고리가 없어요.'))}else{item('',all.length);names.forEach(function(c){item(c,cnt[c])})}
   function set(o){l.hidden=!o;b.setAttribute('aria-expanded',o?'true':'false')}
   b.onclick=function(){set(l.hidden)};
   if(fold&&qc)set(true);
   if(!fold){document.addEventListener('click',function(e){if(!el.contains(e.target))set(false)});el.addEventListener('keydown',function(e){if(e.key==='Escape'){set(false);b.focus()}})}
  }
  function ok(r){if(!r.ok)throw 0;return r.json()}
  var p;
  if(el.hasAttribute('data-demo')){p=Promise.resolve([['다시, 여기','조용히 돌아왔다. 별이 많은 밤이었다.','2026-10-20'],['긴 여름','바다를 보러 갔다.','2026-08-15'],['새 노트','작은 노트를 샀다.','2026-06-02'],['이사','낯선 동네의 첫 밤.','2026-04-11'],['시작','타임라인의 첫 기록.','2026-03-14'],['프롤로그','모든 것의 시작 전.','2026-01-03']].map(function(r,i){return{id:i,title:r[0],body:r[1],image:null,category:'',created_at:r[2]+'T10:00:00Z'}}))}
  else if(src==='notion'||src==='static'){var u='data/'+encodeURIComponent(bd)+'.json',FC=window.__njf=window.__njf||{};p=FC[u]||(FC[u]=fetch(u).then(ok))}
  else if(src==='firebase'){
   if(!C.fk||!C.fp){msg('게시판 연결 정보가 아직 없어요.');return}
   p=fetch('https://firestore.googleapis.com/v1/projects/'+encodeURIComponent(C.fp)+'/databases/(default)/documents:runQuery?key='+encodeURIComponent(C.fk),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({structuredQuery:{from:[{collectionId:'posts'}],where:{fieldFilter:{field:{fieldPath:'board'},op:'EQUAL',value:{stringValue:bd}}},limit:200}})}).then(ok).then(fsRows)}
  else{
   if(!C.url||!C.key){msg('게시판 연결 정보가 아직 없어요.');return}
   var h={apikey:C.key};if(/^eyJ/.test(C.key))h.Authorization='Bearer '+C.key;
   p=fetch(C.url.replace(/\/+$/,'')+'/rest/v1/posts?select=id,title,body,image,category,created_at&board=eq.'+encodeURIComponent(bd)+'&order=created_at.desc&limit='+lim,{headers:h}).then(ok)}
  p.then(el.hasAttribute('data-catnav')?buildNav:render).catch(function(){msg('글을 불러오지 못했어요.')})})
})();(function(){
 var C=window.NJ_CONFIG||{},b=document.body,bd=b.getAttribute('data-post'),src=b.getAttribute('data-src')||'supabase',id=new URLSearchParams(location.search).get('id'),base=document.title;
function sub(s,p,n){var dd=new Date(p.created_at),M={'제목':p.title,'본문':p.body||'','날짜':isNaN(dd)?'':dd.toLocaleDateString('ko-KR'),'번호':n==null?'':n,'카테고리':p.category||''};return s.replace(/\{\{\s*([^}]+?)\s*\}\}/g,function(m,k){return M[k]!=null?M[k]:m})}
 function fsRows(j){return(j||[]).filter(function(x){return x.document}).map(function(x){var f=x.document.fields||{};function s(k){return f[k]&&(f[k].stringValue||f[k].timestampValue)||''}return{id:x.document.name.split('/').pop(),title:s('title'),body:s('body'),image:s('image')||null,category:s('category'),created_at:s('created_at')}})}
 function done(){b.classList.add('bd-ready')}
 function bad(t){var f=false;document.querySelectorAll('[data-bind]').forEach(function(e){if(!f&&e.getAttribute('data-bind')==='title'){e.textContent=t;f=true}else e.hidden=true});if(!f){var m=document.createElement('p');m.textContent=t;(document.querySelector('main')||b).appendChild(m)}done()}

  var rich=window.njRich,lock=window.njLock;
 function fill(p){var dd=new Date(p.created_at),okimg=p.image&&(/^https?:\/\//i.test(p.image)||/^(data\/img|images)\//.test(p.image));
  document.querySelectorAll('[data-bind]').forEach(function(e){var k=e.getAttribute('data-bind');
   if(k==='title')e.textContent=p.title;else if(k==='body'){if(p.enc)lock(e,p.enc);else if(p.blocks&&p.blocks.length)rich(e,p.blocks);else e.textContent=p.body||''}else if(k==='date')e.textContent=isNaN(dd)?'':dd.toLocaleDateString('ko-KR');else if(k==='num')e.hidden=true;else if(k==='cat')e.textContent=p.category||'';
   else if(k==='image'){if(okimg&&!(p.inl&&p.blocks&&p.blocks.length)){e.src=p.image;e.alt=p.title||''}else e.hidden=true}
   else if(k==='imagebg'&&okimg)e.style.backgroundImage='url("'+p.image.replace(/["\\]/g,'')+'")'});
  document.querySelectorAll('[data-tx]').forEach(function(e){e.textContent=sub(e.getAttribute('data-tx'),p,null)});
  document.title=p.title?p.title+' | '+base:base;done()}
 function ok(r){if(!r.ok)throw 0;return r.json()}
 if(!id){bad('글을 찾을 수 없어요.');return}
 var pr;
 if(src==='notion')pr=fetch('data/'+encodeURIComponent(bd)+'.json').then(ok).then(function(a){return(a||[]).filter(function(x){return String(x.id)===id})[0]});
 else if(src==='firebase'){
  if(!C.fk||!C.fp){bad('게시판 연결 정보가 아직 없어요.');return}
  pr=fetch('https://firestore.googleapis.com/v1/projects/'+encodeURIComponent(C.fp)+'/databases/(default)/documents/posts/'+encodeURIComponent(id)+'?key='+encodeURIComponent(C.fk)).then(ok).then(function(j){return fsRows([{document:j}])[0]})}
 else{
  if(!C.url||!C.key){bad('게시판 연결 정보가 아직 없어요.');return}
  var h={apikey:C.key};if(/^eyJ/.test(C.key))h.Authorization='Bearer '+C.key;
  pr=fetch(C.url.replace(/\/+$/,'')+'/rest/v1/posts?select=id,title,body,image,category,created_at&board=eq.'+encodeURIComponent(bd)+'&id=eq.'+encodeURIComponent(id)+'&limit=1',{headers:h}).then(ok).then(function(a){return a[0]})}
 pr.then(function(p){if(!p)bad('글을 찾을 수 없어요.');else if(src==='notion')fetch('data/'+encodeURIComponent(bd)+'/'+encodeURIComponent(p.id)+'.json').then(ok).then(function(j){p.blocks=j.blocks;p.enc=j.enc}).catch(function(){}).then(function(){fill(p)});else fill(p)}).catch(function(){bad('글을 불러오지 못했어요.')})
})();document.addEventListener('click',function(e){var t=e.target.closest('[data-ck]');if(!t)return;var a=t.getAttribute('data-ck'),s=t.getAttribute('data-to'),h=t.getAttribute('href');if(!h||h==='#')e.preventDefault();if(a==='show'){var g=t.getAttribute('data-grp');if(!g)return;document.querySelectorAll('[data-ck=show]').forEach(function(x){if(x.getAttribute('data-grp')===g){x.classList.remove('open');x.setAttribute('aria-selected','false')}});t.classList.add('open');t.setAttribute('aria-selected','true');document.querySelectorAll(g+'>[data-panel]').forEach(function(p){p.hidden=!p.matches(s)});return}document.querySelectorAll(s).forEach(function(x){if(a==='open')x.classList.add('open');else if(a==='close')x.classList.remove('open');else x.classList.toggle('open')})});document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-ck]:not(a):not(button)')){e.preventDefault();e.target.click()}});(function(){var els=document.querySelectorAll('[data-lp]');if(!els.length)return;
function vid(v){var m=/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/.exec(v||'')||/^\s*([\w-]{11})\s*$/.exec(v||'');return m?m[1]:''}
function pid(v){var m=/[?&]list=([\w-]+)/.exec(v||'')||/^\s*([\w-]{13,})\s*$/.exec(v||'');return m?m[1]:''}
function loadApi(){if(window.__lpapi)return;window.__lpapi=1;var prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){if(prev)try{prev()}catch(e){}(window.__lpq||[]).forEach(function(f){f()});window.__lpq=[]};var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s)}
els.forEach(function(el){var pl=null,ready=false,tm,vv=70,id=pid(el.getAttribute('data-lp')),vd=id?'':vid(el.getAttribute('data-lp')),ti=el.querySelector('.lp-ti,.mp-t'),au=el.querySelector('.mp-a'),bar=el.querySelector('.mp-bar i'),bw=el.querySelector('.mp-bar'),te=el.querySelector('.mp-e'),tr=el.querySelector('.mp-r'),art=el.querySelector('.mp-art'),ring=el.querySelector('.lp-ring circle'),vr=el.querySelector('.mp-vr'),vol=el.querySelector('.lp-vol'),vk=el.querySelector('.lp-vk'),dr=false;
function setv(v){vv=Math.max(0,Math.min(100,v));if(vk)vk.style.top=((1-vv/100)*88).toFixed(1)+'%';if(vol)vol.setAttribute('aria-valuenow',Math.round(vv));if(vr)vr.value=Math.round(vv);if(ready)try{pl.setVolume(vv)}catch(e){}}
function pos(ev){var r=vol.getBoundingClientRect();setv(100-(ev.clientY-r.top-r.height*.06)/(r.height*.88)*100)}
if(vol){vol.addEventListener('pointerdown',function(ev){dr=true;try{vol.setPointerCapture(ev.pointerId)}catch(e){}pos(ev)});vol.addEventListener('pointermove',function(ev){if(dr)pos(ev)});vol.addEventListener('pointerup',function(){dr=false});vol.addEventListener('keydown',function(ev){if(ev.key==='ArrowUp'||ev.key==='ArrowRight'){ev.preventDefault();setv(vv+5)}else if(ev.key==='ArrowDown'||ev.key==='ArrowLeft'){ev.preventDefault();setv(vv-5)}});}
if(vr)vr.addEventListener('input',function(){setv(+vr.value)});var vb=el.querySelector('.mp-vb'),vp=el.querySelector('.mp-vp');if(vb&&vp){var cl=function(){vp.hidden=true;vb.setAttribute('aria-expanded','false')};vb.addEventListener('click',function(ev){ev.stopPropagation();var o=vp.hidden;vp.hidden=!o;vb.setAttribute('aria-expanded',o?'true':'false')});document.addEventListener('click',function(ev){if(!vp.hidden&&!vp.contains(ev.target))cl()});el.addEventListener('keydown',function(ev){if(ev.key==='Escape'){cl();vb.focus()}})}
var dv=parseInt(el.getAttribute('data-vol'),10);setv(isNaN(dv)?70:dv);
function fm(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function upd(){try{var d=pl.getVideoData(),t=d.title;if(t)ti.textContent=t;if(au&&d.author)au.textContent=d.author;if(d.video_id&&!el.hasAttribute('data-cover')&&(el.querySelector('.lp-rec')||art)){var u='https://i.ytimg.com/vi/'+d.video_id+'/mqdefault.jpg';var im=new Image();im.onload=function(){(el.querySelector('.lp-rec')||art).style.backgroundImage='url('+u+')'};im.src=u}}catch(e){}}
function tick(){try{var du=pl.getDuration(),c=pl.getCurrentTime();if(du>0){var pc=(c/du*100).toFixed(1);if(ring)ring.setAttribute('stroke-dasharray',pc+' 100');if(bar)bar.style.width=pc+'%';if(te)te.textContent=fm(c);if(tr)tr.textContent='-'+fm(du-c)}}catch(e){}}
function auto(){try{pl.playVideo()}catch(e){}setTimeout(function(){var st;try{st=pl.getPlayerState()}catch(e){return}if(st===1||st===3)return;var T=['pointerdown','keydown','touchstart'];function go(ev){T.forEach(function(t){document.removeEventListener(t,go,true)});if(ev.target&&ev.target.closest&&ev.target.closest('.lp-pl,.mp-pl'))return;try{if(pl.getPlayerState()!==1)pl.playVideo()}catch(e){}}T.forEach(function(t){document.addEventListener(t,go,true)})},1500)}
function make(){if(!document.documentElement.contains(el)||pl)return;var d=document.createElement('div');el.querySelector('.lp-yt').appendChild(d);
var pv={controls:0,playsinline:1,rel:0,modestbranding:1,autoplay:1};if(id){pv.listType='playlist';pv.list=id}else{pv.loop=1;pv.playlist=vd}
pl=new YT.Player(d,{width:200,height:200,videoId:id?undefined:vd,playerVars:pv,events:{onReady:function(){ready=true;if(id)try{pl.setLoop(true)}catch(e){}upd();auto();try{pl.setVolume(vv)}catch(e){}},onStateChange:function(e){var on=e.data===1;el.classList.toggle('on',on);if(on){upd();clearInterval(tm);tm=setInterval(tick,500)}else if(e.data===2||e.data===0){clearInterval(tm);tick()}},onError:function(){ti.textContent='재생할 수 없는 영상이에요'}}})}
el.querySelector('.lp-pl,.mp-pl').onclick=function(){if(ready)pl.getPlayerState()===1?pl.pauseVideo():pl.playVideo()};if(bw)bw.onclick=function(ev){if(!ready)return;try{var r=bw.getBoundingClientRect();pl.seekTo(pl.getDuration()*Math.max(0,Math.min(1,(ev.clientX-r.left)/r.width)),true);tick()}catch(e){}};var bp=el.querySelector('.mp-pr'),bn=el.querySelector('.mp-nx');if(bp)bp.onclick=function(){if(ready)pl.previousVideo()};if(bn)bn.onclick=function(){if(ready)pl.nextVideo()};
if(id||vd){if(window.YT&&YT.Player)make();else{(window.__lpq=window.__lpq||[]).push(make);loadApi()}}})})();