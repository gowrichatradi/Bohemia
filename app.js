/* ============ Arctic → Alpine ============ */
const $ = id => document.getElementById(id);
const V = $('view');

const TRIP_START = '2026-09-28';
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
  sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg>',
  shop:'<svg viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M9 20v-6h6v6"/></svg>',
  cup:'<svg viewBox="0 0 24 24"><path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h2a2.5 2.5 0 010 5h-2M6 2v2M10 2v2M14 2v2"/></svg>',
  warn:'<svg viewBox="0 0 24 24"><path d="M12 3l9.5 17H2.5L12 3zM12 10v4.5M12 17.4v.2"/></svg>',
  tip:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>',
  copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
  bed:'<svg viewBox="0 0 24 24"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 14h18M3 18v2M21 18v2M6 10V8a1 1 0 011-1h3a1 1 0 011 1v2"/></svg>',
  kite:'<svg viewBox="0 0 24 24"><path d="M12 3.4c2.8 0 4.7 2.2 4.7 5 0 3.4-3 6.2-4.7 6.8-1.7-.6-4.7-3.4-4.7-6.8 0-2.8 1.9-5 4.7-5zM12 15.2v2.4M10.7 21c.2-1.5 2.4-1.5 2.6 0"/></svg>'
};

/* ---------- legs (groups the 19 days into regions) ---------- */
const LEGS = [
  {name:'Copenhagen',   sub:'Two days to land',            accent:'var(--dusk)',   from:0},
  {name:'Lofoten',      sub:'Arctic islands & the light',  accent:'var(--dawn)',   from:2},
  {name:'The fjords',   sub:'Bergen & the western water',  accent:'var(--fjord)',  from:7},
  {name:'The Alps',     sub:'Bavaria & the Salzkammergut',  accent:'var(--alpine)', from:12},
  {name:'Bohemia',      sub:'Prague, Krumlov & Dresden',    accent:'var(--gold)',   from:14},
  {name:'North & home', sub:'Copenhagen, then home',        accent:'var(--dusk)',   from:18},
];
function legOf(i){ let L = LEGS[0]; for(const l of LEGS){ if(i >= l.from) L = l; } return L; }

/* ---------- phases (groups a day's parts by time of day) ---------- */
const PHASE_ORDER = ['dawn','day','stops','kid','evening','notes'];
const PHASE = {
  dawn:    {name:'First light',      ic:I.rise, pc:'var(--dawn)'},
  day:     {name:'The day',          ic:I.sun,  pc:'var(--fjord)'},
  stops:   {name:'Along the way',    ic:I.cup,  pc:'var(--gold)'},
  kid:     {name:'For the little one',ic:I.kite, pc:'var(--kid)'},
  evening: {name:'Evening',          ic:I.set,  pc:'var(--dusk)'},
  notes:   {name:'Good to know',     ic:I.tip,  pc:'var(--ink2)'},
};
const KIND2PHASE = {dawn:'dawn', main:'day', aft:'day', cafe:'stops', mkt:'stops',
                    kid:'kid', dusk:'evening', eve:'evening', also:'evening', tip:'notes', warn:'notes'};
/* default sub-labels for parts that ship without one */
const KIND_LABEL = {mkt:'Provisions', cafe:'Coffee & a bite', also:'Also', eve:'Evening'};
const KIND_ICON  = {mkt:I.shop, cafe:I.cup};

/* ---------- state ---------- */
const S = { view:'today', day:null, seg:0, q:'' };
const TAB_INDEX = {today:0, days:1, book:2, info:3};

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
    if(dayDate(DATA.days[i]).getTime() === t.getTime()) return i;
  }
  return -1;
}
function daysUntil(){ return Math.ceil((new Date(2026,8,28) - today())/864e5); }
/* fraction of the trip elapsed, 0..1 */
function tripProgress(){
  const s = new Date(2026,8,28), e = new Date(2026,9,18), n = today();
  return Math.max(0, Math.min(1, (n - s)/(e - s)));
}
function dateShort(d){ return esc(d.date.replace(/^\w+\s/,'')); }

/* ---------- day timeline ---------- */
/* phases that anchor time — an "also" block inherits the last one it followed */
const ANCHOR = {dawn:1, day:1, evening:1};
function groupParts(parts){
  const g = {}; let last = 'day';
  parts.forEach(p=>{
    const ph = p.k==='also' ? last : (KIND2PHASE[p.k] || 'day');
    if(p.k!=='also' && ANCHOR[ph]) last = ph;
    (g[ph] = g[ph] || []).push(p);
  });
  return g;
}
function renderPart(p){
  const ph      = KIND2PHASE[p.k];
  const soft    = ph === 'stops' || ph === 'kid';
  const isNote  = ph === 'notes';
  const label   = p.l || KIND_LABEL[p.k] || '';
  const icon    = KIND_ICON[p.k] || '';
  let cls = 'blk';
  if(soft)   cls += ' soft';
  if(isNote) cls += ' note' + (p.k==='warn' ? ' warn' : '');

  let h = `<div class="${cls}">`;
  if(label || icon) h += `<div class="l">${icon}${label?`<span>${esc(label)}</span>`:''}</div>`;
  if(p.t) h += `<div class="x">${fmt(p.t)}</div>`;
  if(p.p && p.p.length){
    h += '<ul class="picks">' + p.p.map(q =>
      `<li><div class="nm">${esc(q.name)}${q.rate?`<span class="rate r-${q.rate}">${
        {must:'MUST',good:'WORTH IT',if:'IF TIME'}[q.rate]||''}</span>`:''}</div>
       <div class="ds">${fmt(q.desc)}</div></li>`).join('') + '</ul>';
  }
  return h + '</div>';
}
function timeline(d){
  const g = groupParts(d.parts);
  let n = 0, h = '<div class="tl">';
  PHASE_ORDER.forEach(ph=>{
    const parts = g[ph]; if(!parts || !parts.length) return;
    const meta = PHASE[ph];
    let gh = '';                                   // golden-hour shooting marker
    if(ph==='dawn'    && d.rise) gh = `<span class="gh gh-rise">${I.rise}${esc(d.rise)}</span>`;
    if(ph==='evening' && d.set)  gh = `<span class="gh gh-set">${I.set}${esc(d.set)}</span>`;
    h += `<div class="node stagger" style="--pc:${meta.pc};--i:${n++}">
      <span class="knob"><i></i></span>
      <div class="ph">${meta.ic}<span>${meta.name}</span>${gh}</div>
      ${parts.map(renderPart).join('')}
    </div>`;
  });
  return h + '</div>';
}

/* ---------- hero ---------- */
function heroFor(d, idx){
  const leg = legOf(idx);
  return `<div class="hero fade" style="--accent:${leg.accent}">
    <div class="eyebrow"><span>${esc(d.date)}</span><span class="dot"></span>
      <span class="leg-tag">${esc(leg.name)}</span></div>
    <h2>${esc(d.title)}</h2>
    <div class="chips">
      <span class="chip ${d.car?'car':'nocar'}">${d.car?I.car:I.nocar}${d.car?'Car':'No car'}</span>
      ${d.drive?`<span class="chip drive">${d.drive} drive</span>`:''}
      ${d.transport?`<span class="chip ${d.transport.kind}">${I[d.transport.kind]}${esc(d.transport.text)}</span>`:''}
      ${d.rise?`<span class="chip rise">${I.rise}${esc(d.rise)}</span>`:''}
      ${d.set?`<span class="chip set">${I.set}${esc(d.set)}</span>`:''}
    </div>
    <div class="stay">${I.bed}<span>Tonight · <b>${esc(d.stay)}</b></span></div>
  </div>`;
}

/* ---------- views ---------- */
function vToday(){
  const idx = currentIndex();
  const until = daysUntil();
  let h = '';

  if(idx < 0){
    const pre = until > 0;
    const leg = legOf(0);
    h += `<div class="hero fade" style="--accent:${leg.accent}">
      <div class="eyebrow">${pre?'Counting down':'Trip complete'}</div>
      ${pre?`<div class="cd">${until}<small> days to go</small></div>
      <h2 style="font-size:21px;margin-top:12px">Copenhagen first, then Lofoten and the long road south</h2>`
      :`<h2>Twenty nights, done.</h2>`}
      <div class="chips">
        <span class="chip">${DATA.days.length} days</span>
        <span class="chip">5 countries</span>
        <span class="chip">4 flights</span>
      </div></div>`;
    h += `<div class="card fade"><div class="lab">${I.chev}First up</div>`
       + `<div class="ti" style="font-size:16px;font-weight:600">${esc(DATA.days[0].title)}</div>`
       + `<div class="muted" style="margin-top:4px;font-size:14px">${esc(DATA.days[0].date)} · ${esc(DATA.days[0].stay)}</div>`
       + `<button class="chip" style="margin-top:12px" onclick="openDay(0)">Open the day ${I.chev}</button></div>`;
    h += actionsCard();
  } else {
    const d = DATA.days[idx];
    h += heroFor(d, idx);
    h += timeline(d);
    const nx = DATA.days[idx+1];
    if(nx) h += `<div class="card fade" style="margin-top:14px"><div class="lab">Tomorrow</div>
      <div class="drow" style="border:0;padding:0" onclick="openDay(${idx+1})">
        <div class="dt">${esc(nx.date.split(' ')[0])}<b>${esc(nx.date.split(' ')[1])}</b></div>
        <div class="bd"><div class="ti">${esc(nx.title)}</div>
        <div class="st">${esc(nx.stay)}</div></div>
        <div class="go">${I.chev}</div></div></div>`;
  }
  return h;
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

  let h = `<div class="sect fade"><h2>Day by day</h2>
    <p class="intro">${rows.length} of ${DATA.days.length} days${q?' matching':', in five legs'}. Tap for the full day.</p></div>`;

  let curLeg = null, si = 0;
  rows.forEach(({d,i}, r)=>{
    const leg = legOf(i);
    if(leg !== curLeg){
      if(curLeg) h += `</div>`;              // close the previous leg
      curLeg = leg;
      const members = rows.filter(x=>legOf(x.i)===leg);
      const range = members.length ? dateShort(members[0].d)+'–'+dateShort(members[members.length-1].d) : '';
      h += `<div class="leg fade" style="--accent:${leg.accent}">
        <div class="leghd"><span class="bar"></span>
          <span class="nm">${esc(leg.name)}</span>
          <span class="sb">${esc(leg.sub)}</span>
          <span class="rg">${range}</span></div>`;
    }
    const cls = i===idx ? 'now' : (dayDate(d) < today() ? 'past' : '');
    const dp = d.date.split(' ');
    h += `<button class="drow ${cls} stagger" style="--i:${si++}" onclick="openDay(${i})">
        ${i===idx?'<span class="pulse"></span>':''}
        <div class="dt">${esc(dp[0])}<b>${esc(dp[1])} ${esc(dp[2]||'')}</b></div>
        <div class="bd"><div class="ti">${esc(d.title)}</div>
          <div class="st">${esc(d.stay)}${d.drive?' · '+esc(d.drive):''}</div></div>
        <div class="ic">${d.transport?I[d.transport.kind]:''}${d.car?I.car:''}</div>
        <div class="go">${I.chev}</div>
      </button>`;
    if(r === rows.length-1) h += `</div>`;    // close the final leg
  });
  return h;
}

function vDay(i){
  const d = DATA.days[i];
  const prev = DATA.days[i-1], next = DATA.days[i+1];
  let h = `<button class="back" onclick="S.day=null;render()">${I.chev}All days</button>`
    + heroFor(d, i) + timeline(d);
  h += `<div class="daynav">`
    + (prev?`<button onclick="openDay(${i-1})"><div class="k">← Previous</div><div class="v">${esc(prev.title)}</div></button>`:`<button style="visibility:hidden"></button>`)
    + (next?`<button class="nx" onclick="openDay(${i+1})"><div class="k">Next →</div><div class="v">${esc(next.title)}</div></button>`:`<button class="nx" style="visibility:hidden"></button>`)
    + `</div>`;
  return h;
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
  let h = `<div class="sect fade"><h2>Guide</h2>
    <div class="seg"><div class="thumb" style="--n:${S.seg};width:calc((100% - 6px)/${tabs.length})"></div>`
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
  $('tabInd').style.setProperty('--tab-i', TAB_INDEX[v] ?? 0);
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
    : (daysUntil()>0 ? daysUntil()+' days to go' : '28 Sep – 18 Oct 2026');
  $('progBar').style.width = (tripProgress()*100).toFixed(1)+'%';
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
