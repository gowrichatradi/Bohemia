/* ============ Arctic → Alpine ============ */
const $ = id => document.getElementById(id);
const V = $('view');

const TRIP_START = '2026-09-30';
const TRIP_END   = '2026-10-18';

/* ---------- icons ---------- */
const I = {
  car:'<svg viewBox="0 0 24 24"><path d="M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v5h-3M3 13v5h3m-3-5h18M6.5 18a1.4 1.4 0 002.8 0m5.4 0a1.4 1.4 0 002.8 0"/></svg>',
  nocar:'<svg viewBox="0 0 24 24"><path d="M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v5h-3M3 13v5h3m-3-5h18"/><path d="M4 4l16 16"/></svg>',
  fly:'<svg viewBox="0 0 24 24"><path d="M21 15.5v-2l-8-4.5V4a1.5 1.5 0 00-3 0v5L2 13.5v2l8-2.5v4l-2.5 1.8V20L11.5 19l3.5 1v-1.7L12.5 17v-4z"/></svg>',
  rail:'<svg viewBox="0 0 24 24"><path d="M7 3h10a3 3 0 013 3v8a3 3 0 01-3 3H7a3 3 0 01-3-3V6a3 3 0 013-3zM4 9h16M8 21l-2 2M16 21l2 2"/></svg>',
  cam:'<svg viewBox="0 0 24 24"><path d="M3 8h3.5L8 5.5h8L17.5 8H21a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>',
  rise:'<svg viewBox="0 0 24 24"><path d="M12 3v3M5.6 8.6l2.1 2.1M18.4 8.6l-2.1 2.1M3 18h18M8 18a4 4 0 018 0M9 21l3-3 3 3"/></svg>',
  set:'<svg viewBox="0 0 24 24"><path d="M12 6V3M5.6 8.6l2.1 2.1M18.4 8.6l-2.1 2.1M3 18h18M8 18a4 4 0 018 0M9 3l3 3 3-3"/></svg>',
  shop:'<svg viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M9 20v-6h6v6"/></svg>',
  cup:'<svg viewBox="0 0 24 24"><path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h2a2.5 2.5 0 010 5h-2M6 2v2M10 2v2M14 2v2"/></svg>',
  warn:'<svg viewBox="0 0 24 24"><path d="M12 3l9.5 17H2.5L12 3zM12 10v4.5M12 17.4v.2"/></svg>',
  tip:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>',
  copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>'
};

/* ---------- state ---------- */
const S = { view:'today', day:null, seg:0, q:'' };

/* ---------- helpers ---------- */
const esc = t => String(t).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
function fmt(t){ return esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'); }
function toast(m){ const t=$('toast'); t.textContent=m; t.classList.add('on'); setTimeout(()=>t.classList.remove('on'),1800); }

function dayDate(d){
  const m = d.date.match(/(\d+)\s+(\w+)/);
  const mon = {Sep:8, Oct:9}[m[2]];
  return new Date(2026, mon, +m[1]);
}
function today(){ const n=new Date(); n.setHours(0,0,0,0); return n; }
function currentIndex(){
  const t = today();
  for(let i=0;i<DATA.days.length;i++){
    const d = dayDate(DATA.days[i]);
    if(d.getTime() === t.getTime()) return i;
  }
  return -1;
}
function daysUntil(){
  const start = new Date(2026,8,30);
  return Math.ceil((start - today())/864e5);
}

/* ---------- blocks ---------- */
const BLK = {
  dawn:{cls:'b-dawn', ic:I.cam}, dusk:{cls:'b-dusk', ic:I.cam},
  main:{cls:'b-main'}, aft:{cls:'b-aft'}, eve:{cls:'b-eve'}, also:{cls:'b-also'},
  mkt:{cls:'b-mkt', ic:I.shop}, cafe:{cls:'b-cafe', ic:I.cup},
  tip:{cls:'b-tip', ic:I.tip}, warn:{cls:'b-warn', ic:I.warn}
};
function renderBlock(p){
  const b = BLK[p.k] || BLK.main;
  let h = `<div class="blk ${b.cls}">`;
  if(p.l || b.ic) h += `<div class="l">${b.ic||''}${p.l?`<span>${esc(p.l)}</span>`:''}</div>`;
  if(p.t) h += `<div class="x">${fmt(p.t)}</div>`;
  if(p.p && p.p.length){
    h += '<ul class="picks">' + p.p.map(q =>
      `<li><span class="nm">${esc(q.name)}</span>${q.rate?`<span class="rate r-${q.rate}">${
        {must:'MUST',good:'WORTH IT',if:'IF TIME'}[q.rate]||''}</span>`:''}
       <div class="ds">${fmt(q.desc)}</div></li>`).join('') + '</ul>';
  }
  return h + '</div>';
}

/* ---------- views ---------- */
function vToday(){
  const idx = currentIndex();
  const until = daysUntil();
  let h = '';

  if(idx < 0){
    const pre = until > 0;
    h += `<div class="hero fade">
      <div class="eyebrow">${pre?'Counting down':'Trip complete'}</div>
      ${pre?`<div class="cd">${until}<small> days to go</small></div>
      <h2 style="font-size:20px;margin-top:14px">Lofoten, then the long road south</h2>`
      :`<h2>Eighteen nights, done.</h2>`}
      <div class="chips">
        <span class="chip">${DATA.days.length} days</span>
        <span class="chip">5 countries</span>
        <span class="chip">4 flights</span>
      </div></div>`;
    h += `<div class="card fade"><div class="lab">First up</div>` + dayCardInner(DATA.days[0], true) + `</div>`;
    h += actionsCard();
  } else {
    const d = DATA.days[idx];
    h += heroFor(d);
    h += d.parts.map(renderBlock).join('');
    const nx = DATA.days[idx+1];
    if(nx) h += `<div class="card fade" style="margin-top:14px"><div class="lab">Tomorrow</div>
      <div class="drow" style="border:0;padding:0" onclick="openDay(${idx+1})">
        <div class="dt">${esc(nx.date.replace(/^\w+\s/,''))}</div>
        <div class="bd"><div class="ti">${esc(nx.title)}</div>
        <div class="st">${esc(nx.stay)}</div></div></div></div>`;
  }
  return h;
}
function heroFor(d){
  return `<div class="hero fade">
    <div class="eyebrow">${esc(d.date)}${d.drive?' · '+esc(d.drive):''}</div>
    <h2>${esc(d.title)}</h2>
    <div class="chips">
      <span class="chip ${d.car?'car':'nocar'}">${d.car?I.car:I.nocar}${d.car?'Car':'No car'}</span>
      ${d.rise?`<span class="chip rise">${I.rise}${d.rise}</span>`:''}
      ${d.set?`<span class="chip set">${I.set}${d.set}</span>`:''}
      ${d.transport?`<span class="chip ${d.transport.kind}">${I[d.transport.kind]}${esc(d.transport.text)}</span>`:''}
    </div>
    <div class="tiny" style="margin-top:12px">Tonight · ${esc(d.stay)}</div>
  </div>`;
}
function dayCardInner(d, brief){
  return `<div class="ti" style="font-size:16px;font-weight:600">${esc(d.title)}</div>
   <div class="muted" style="margin-top:4px;font-size:14px">${esc(d.date)} · ${esc(d.stay)}</div>`;
}
function actionsCard(){
  const acts = DATA.actions.filter(a=>a.tag==='Act').slice(0,4);
  if(!acts.length) return '';
  return `<div class="card fade"><div class="lab">${I.warn}Before you go</div>` +
    acts.map(a=>`<div class="bk"><div class="w">${esc(a.when)}</div>
      <div class="b"><div class="n">${esc(a.name)}</div>
      <div class="d">${fmt(a.detail)}</div></div></div>`).join('') + '</div>';
}

function vDays(){
  const idx = currentIndex();
  const q = S.q.toLowerCase();
  const rows = DATA.days.map((d,i)=>({d,i})).filter(({d})=>{
    if(!q) return true;
    return (d.title+d.stay+d.date+JSON.stringify(d.parts)).toLowerCase().includes(q);
  });
  if(!rows.length) return `<div class="empty">Nothing matches “${esc(S.q)}”.</div>`;
  return `<div class="sect fade"><h2>Day by day</h2>
    <p class="intro">${rows.length} of ${DATA.days.length} days${q?' matching':''}. Tap for the full day.</p>
    <div class="daylist">` + rows.map(({d,i})=>{
      const dd = dayDate(d), t = today();
      const cls = i===idx ? 'now' : (dd < t ? 'past' : '');
      return `<button class="drow ${cls}" onclick="openDay(${i})">
        <div class="dt">${esc(d.date.split(' ')[0])}<br>${esc(d.date.split(' ').slice(1).join(' '))}</div>
        <div class="bd"><div class="ti">${esc(d.title)}</div>
          <div class="st">${esc(d.stay)}${d.drive?' · '+esc(d.drive):''}</div></div>
        <div class="ic">${d.transport?I[d.transport.kind]:''}${d.car?I.car:''}</div>
      </button>`;
    }).join('') + '</div></div>';
}

function vDay(i){
  const d = DATA.days[i];
  return `<button class="back" onclick="S.day=null;render()">${I.chev}All days</button>`
    + heroFor(d) + d.parts.map(renderBlock).join('')
    + `<div style="height:8px"></div>`
    + (i>0?`<button class="chip" onclick="openDay(${i-1})" style="margin-right:8px">← ${esc(DATA.days[i-1].date)}</button>`:'')
    + (i<DATA.days.length-1?`<button class="chip" onclick="openDay(${i+1})">${esc(DATA.days[i+1].date)} →</button>`:'');
}

function vBook(){
  const q = S.q.toLowerCase();
  let h = `<div class="sect fade"><h2>Bookings</h2>
    <p class="intro">Tap a reference to copy it.</p>`;
  const groups = [{head:'Needs action', rows:DATA.actions}].concat(DATA.bookings);
  groups.forEach(g=>{
    const rows = g.rows.filter(r=>!q || (r.name+r.detail+r.ref).toLowerCase().includes(q));
    if(!rows.length) return;
    h += `<div class="grph">${esc(g.head)}</div>`;
    rows.forEach(r=>{
      const tg = r.tag==='Booked'?'t-ok':r.tag==='Open'?'t-open':'t-act';
      h += `<div class="bk"><div class="w">${esc(r.when).split('\n').join('<br>')}</div>
        <div class="b"><div class="n">${esc(r.name)}</div>
        ${r.detail?`<div class="d">${fmt(r.detail)}</div>`:''}
        ${r.ref?`<button class="ref" onclick="copyRef('${esc(r.ref.split(' ')[0])}')">${I.copy}${esc(r.ref)}</button>`:''}
        </div>${r.tag?`<span class="tag ${tg}">${esc(r.tag)}</span>`:''}</div>`;
    });
  });
  return h + '</div>';
}

function vInfo(){
  const tabs = ['Light','Food','Shops','Packing','Child'];
  let h = `<div class="sect fade"><h2>Guide</h2><div class="seg">`
    + tabs.map((t,i)=>`<button class="${S.seg===i?'on':''}" onclick="S.seg=${i};render()">${t}</button>`).join('')
    + `</div>`;

  if(S.seg===0){
    h += `<div class="card" style="margin-top:12px"><div class="lab">${I.cam}Sunrise &amp; sunset</div>
      <table class="lt"><tbody>` + DATA.light.map(r=>
      `<tr><td>${esc(r[0])}</td><td class="tm r">${esc(r[1])}</td><td>${esc(r[2])}</td>
       <td class="tm s">${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join('')
      + `</tbody></table></div>`;
  }
  if(S.seg===1) h += groupsHTML(DATA.food);
  if(S.seg===2) h += groupsHTML(DATA.grocery);
  if(S.seg===3) h += DATA.wearGroups && DATA.wearGroups.length ? groupsHTML(DATA.wearGroups)
                   : listHTML(DATA.wear);
  if(S.seg===4) h += listHTML(DATA.kid);
  return h + '</div>';
}
function groupsHTML(groups){
  return groups.map(g=>`<div class="grph">${esc(g.head)}</div>` + g.rows.map(r=>
    `<div class="bk"><div class="w">${esc(r.when).split('\n').join('<br>')}</div>
     <div class="b"><div class="n">${esc(r.name)}</div>
     <div class="d">${fmt(r.detail)}</div></div></div>`).join('')).join('');
}
function listHTML(sec){
  if(!sec) return '';
  let h = sec.intro?`<p class="intro" style="margin-top:12px">${fmt(sec.intro)}</p>`:'';
  h += '<ul class="pl" style="margin-top:8px">';
  sec.items.forEach(it=>{
    if(it.k==='h'){ h += `</ul><div class="grph">${esc(it.t)}</div><ul class="pl">`; }
    else h += `<li>${fmt(it.t)}</li>`;
  });
  return h + '</ul>';
}

/* ---------- actions ---------- */
function openDay(i){ S.day=i; S.view='days'; setTab('days'); render(); window.scrollTo(0,0); }
function copyRef(t){
  navigator.clipboard?.writeText(t).then(()=>toast('Copied '+t)).catch(()=>toast(t));
}
function setTab(v){
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on', b.dataset.v===v));
}

function render(){
  let h='';
  if(S.view==='today') h=vToday();
  else if(S.view==='days') h = S.day!=null ? vDay(S.day) : vDays();
  else if(S.view==='book') h=vBook();
  else h=vInfo();
  V.innerHTML=h;
  const idx=currentIndex();
  $('tSub').textContent = idx>=0 ? DATA.days[idx].date+' · day '+(idx+1)+' of '+DATA.days.length
    : (daysUntil()>0 ? daysUntil()+' days to go' : '30 Sep – 18 Oct 2026');
}

document.querySelectorAll('.tab').forEach(b=>{
  b.onclick=()=>{ S.view=b.dataset.v; S.day=null; setTab(b.dataset.v); render(); window.scrollTo(0,0); };
});
$('btnSearch').onclick=()=>{
  const s=$('srch');
  const showing = s.style.display!=='none';
  s.style.display = showing?'none':'block';
  if(!showing) s.focus(); else { S.q=''; s.value=''; render(); }
};
$('srch').oninput=e=>{ S.q=e.target.value; S.day=null; if(S.view==='today'){S.view='days';setTab('days');} render(); };

render();
setInterval(()=>{ if(S.view==='today'&&S.day==null) render(); }, 60000);
