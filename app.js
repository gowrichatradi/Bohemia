/* ============ Arctic → Alpine ============ */
const $ = (id) => document.getElementById(id);
const V = $("view");

const TRIP_START = "2026-09-27";
const TRIP_END = "2026-10-18";

/* ---------- icons ---------- */
const I = {
  car: '<svg viewBox="0 0 24 24"><path d="M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v5h-3M3 13v5h3m-3-5h18M6.5 18a1.4 1.4 0 002.8 0m5.4 0a1.4 1.4 0 002.8 0"/></svg>',
  nocar:
    '<svg viewBox="0 0 24 24"><path d="M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v5h-3M3 13v5h3m-3-5h18"/><path d="M4 4l16 16"/></svg>',
  fly: '<svg viewBox="0 0 24 24"><path d="M21 15.5v-2l-8-4.5V4a1.5 1.5 0 00-3 0v5L2 13.5v2l8-2.5v4l-2.5 1.8V20L11.5 19l3.5 1v-1.7L12.5 17v-4z"/></svg>',
  rail: '<svg viewBox="0 0 24 24"><path d="M7 3h10a3 3 0 013 3v8a3 3 0 01-3 3H7a3 3 0 01-3-3V6a3 3 0 013-3zM4 9h16M8 21l-2 2M16 21l2 2"/></svg>',
  cam: '<svg viewBox="0 0 24 24"><path d="M3 8h3.5L8 5.5h8L17.5 8H21a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>',
  rise: '<svg viewBox="0 0 24 24"><path d="M12 3v3M5.6 8.6l2.1 2.1M18.4 8.6l-2.1 2.1M3 18h18M8 18a4 4 0 018 0M9 21l3-3 3 3"/></svg>',
  set: '<svg viewBox="0 0 24 24"><path d="M12 6V3M5.6 8.6l2.1 2.1M18.4 8.6l-2.1 2.1M3 18h18M8 18a4 4 0 018 0M9 3l3 3 3-3"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg>',
  shop: '<svg viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M9 20v-6h6v6"/></svg>',
  cup: '<svg viewBox="0 0 24 24"><path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h2a2.5 2.5 0 010 5h-2M6 2v2M10 2v2M14 2v2"/></svg>',
  warn: '<svg viewBox="0 0 24 24"><path d="M12 3l9.5 17H2.5L12 3zM12 10v4.5M12 17.4v.2"/></svg>',
  tip: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>',
  chev: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
  bed: '<svg viewBox="0 0 24 24"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 14h18M3 18v2M21 18v2M6 10V8a1 1 0 011-1h3a1 1 0 011 1v2"/></svg>',
  kite: '<svg viewBox="0 0 24 24"><path d="M12 3.4c2.8 0 4.7 2.2 4.7 5 0 3.4-3 6.2-4.7 6.8-1.7-.6-4.7-3.4-4.7-6.8 0-2.8 1.9-5 4.7-5zM12 15.2v2.4M10.7 21c.2-1.5 2.4-1.5 2.6 0"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7.5-7-12a7 7 0 0114 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
};

/* ---------- legs (groups the 19 days into regions) ---------- */
const LEGS = [
  {
    name: "Copenhagen",
    sub: "Two days to land",
    accent: "var(--dusk)",
    short: "Arrive",
    scene: "harbour",
    from: 0,
  },
  {
    name: "Lofoten",
    sub: "Arctic islands & the light",
    accent: "var(--dawn)",
    short: "Lofoten",
    scene: "lofoten",
    from: 2,
  },
  {
    name: "The fjords",
    sub: "Bergen & the western water",
    accent: "var(--fjord)",
    short: "Fjords",
    scene: "fjord",
    from: 7,
  },
  {
    name: "The Alps",
    sub: "Bavaria & the Salzkammergut",
    accent: "var(--alpine)",
    short: "Alps",
    scene: "alps",
    from: 12,
  },
  {
    name: "Bohemia",
    sub: "Prague, Krumlov & Dresden",
    accent: "var(--gold)",
    short: "Bohemia",
    scene: "bohemia",
    from: 14,
  },
  {
    name: "North & home",
    sub: "Copenhagen, then home",
    accent: "var(--dusk)",
    short: "Home",
    scene: "harbour",
    from: 18,
  },
];
function legOf(i) {
  let L = LEGS[0];
  for (const l of LEGS) {
    if (i >= l.from) L = l;
  }
  return L;
}
function currentLegIndex() {
  const i = currentIndex();
  return i >= 0 ? LEGS.indexOf(legOf(i)) : -1;
}

/* ---------- region scenery: flowing topographic contour lines, tinted with --accent ---------- */
/* each region varies by amplitude / wavelength / density so the terrain "feels" different */
const SCENE_PARAMS = {
  harbour: { amp: 5, freq: 98, lines: 7 }, // calm, low
  lofoten: { amp: 13, freq: 46, lines: 6 }, // dramatic, jagged
  fjord: { amp: 8, freq: 66, lines: 6 }, // deep, layered
  alps: { amp: 11, freq: 56, lines: 6 }, // high, rolling
  bohemia: { amp: 6, freq: 82, lines: 7 }, // gentle, dense
};
function sceneSVG(key, cls) {
  const p = SCENE_PARAMS[key] || SCENE_PARAMS.harbour;
  const W = 400,
    H = 120,
    base = 14,
    sp = (H - base) / p.lines;
  let paths = "";
  for (let i = 0; i < p.lines; i++) {
    const ly = base + i * sp,
      ph = i * 0.9,
      amp = p.amp * (0.4 + i / p.lines); // calmer up top, stronger below
    const pts = [];
    for (let x = -10; x <= W + 10; x += 14)
      pts.push([x, +(ly + Math.sin(x / p.freq + ph) * amp).toFixed(1)]);
    paths += `<path d="${smoothPath(pts)}" fill="none" stroke="currentColor" stroke-width="1.1" opacity="${(0.1 + i * 0.03).toFixed(3)}"/>`;
  }
  return `<svg class="${cls}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>`;
}

/* smooth path through points, horizontal-tangent cubics */
function smoothPath(pts) {
  if (!pts.length) return "";
  let d = "M" + pts[0][0] + " " + pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i],
      cx = (a[0] + b[0]) / 2;
    d +=
      " C" + cx + " " + a[1] + " " + cx + " " + b[1] + " " + b[0] + " " + b[1];
  }
  return d;
}

/* ---------- the journey — vertical route timeline ---------- */
/* Clean, unambiguous. Each leg is a stop; each transition shows mode + duration.
   No map projections; nothing overlapping. */
function journeyMap() {
  const here = currentLegIndex();
  // one-line data per leg: [short name, from-day idx, to-day idx, transport-icon-name]
  // transport icon = how you REACH this leg (from the previous one)
  const STOPS = [
    {
      nm: "Copenhagen",
      from: 0,
      to: 1,
      in: "fly",
      sub: "Arrival · Nyhavn, the zoo",
    },
    {
      nm: "Lofoten",
      from: 2,
      to: 6,
      in: "fly",
      sub: "Arctic islands · Reine, Hamnøy, Henningsvær",
    },
    {
      nm: "Oslo → Bergen",
      from: 7,
      to: 9,
      in: "rail",
      sub: "Fjords · Bergensbanen, Nærøyfjord",
    },
    {
      nm: "Aurland",
      from: 10,
      to: 11,
      in: "car",
      sub: "Nærøyfjord & Stegastein",
    },
    {
      nm: "Bavaria / Alps",
      from: 12,
      to: 13,
      in: "fly",
      sub: "Neuschwanstein · Hallstatt",
    },
    { nm: "Bohemia", from: 14, to: 16, in: "car", sub: "Krumlov · Prague" },
    {
      nm: "Dresden",
      from: 17,
      to: 18,
      in: "car",
      sub: "Elbe skyline · Frauenkirche",
    },
    {
      nm: "Copenhagen",
      from: 19,
      to: 20,
      in: "fly",
      sub: "Rest day · Tivoli · home",
    },
  ];
  // determine which stop the current day belongs to
  const cIdx = currentIndex();
  const curStop =
    cIdx < 0 ? -1 : STOPS.findIndex((s) => cIdx >= s.from && cIdx <= s.to);
  // format date range from-to
  const rangeOf = (s) => {
    const d1 = DATA.days[s.from],
      d2 = DATA.days[s.to];
    const short = (d) => d.date.replace(/^\w+\s/, "");
    return s.from === s.to ? short(d1) : short(d1) + " – " + short(d2);
  };
  // per-stop accent colour from its leg
  const stopAccent = (dayIdx) => (legOf(dayIdx) || LEGS[0]).accent;
  const stops = STOPS.map((s, i) => {
    const done = curStop > i,
      active = curStop === i,
      next = cIdx < 0 && i === 0;
    const cls = done ? "done" : active ? "active" : next ? "next" : "future";
    const nights = s.to - s.from + 1;
    const ac = stopAccent(s.from);
    return `<button class="rstop ${cls}" style="--sa:${ac}" onclick="openDay(${s.from})">
      <div class="rdot"><span class="rd-in"></span>${active || next ? '<span class="rd-ring"></span>' : ""}</div>
      <div class="rline"></div>
      <div class="rbody">
        <div class="rhead">
          <span class="rnm">${esc(s.nm)}</span>
          <span class="rdt">${esc(rangeOf(s))}</span>
        </div>
        <div class="rsub">${esc(s.sub)}</div>
        <div class="rmeta">${nights} night${nights > 1 ? "s" : ""}${i > 0 ? " · " + I[s.in] + " from " + esc(STOPS[i - 1].nm.split(" ")[0]) : ""}</div>
      </div>
    </button>`;
  }).join("");
  return `<div class="card route fade">
    <div class="lab">${I.rail}The journey</div>
    <div class="jmap-real" id="jmap-real"></div>
    <div class="rlist">${stops}</div>
  </div>`;
}

/* Real-earth map using Leaflet + CARTO Dark Matter tiles.
   Runs after each render() when the container is present. */
const MAP_STOPS = [
  { c: [55.68, 12.57], nm: "Copenhagen", dt: "28 Sep · arrival", idx: 0 },
  { c: [67.93, 13.08], nm: "Reine · Lofoten", dt: "30 Sep – 4 Oct", idx: 2 },
  { c: [68.23, 14.57], nm: "Svolvær", dt: "3–4 Oct", idx: 5 },
  { c: [59.91, 10.75], nm: "Oslo", dt: "5 Oct", idx: 7 },
  { c: [60.39, 5.32], nm: "Bergen", dt: "6–7 Oct", idx: 8 },
  { c: [60.9, 7.19], nm: "Aurland", dt: "8 Oct", idx: 10 },
  { c: [47.56, 10.75], nm: "Neuschwanstein", dt: "10 Oct", idx: 12 },
  { c: [47.56, 13.65], nm: "Hallstatt", dt: "11 Oct", idx: 13 },
  { c: [48.81, 14.32], nm: "Český Krumlov", dt: "12 Oct", idx: 14 },
  { c: [50.08, 14.44], nm: "Prague", dt: "13–14 Oct", idx: 15 },
  { c: [51.05, 13.74], nm: "Dresden", dt: "15–16 Oct", idx: 17 },
  { c: [52.36, 13.5], nm: "Berlin BER", dt: "16 Oct · flight out", idx: 18 },
  { c: [55.68, 12.57], nm: "Copenhagen", dt: "17 Oct · rest, home", idx: 19 },
];
function initJourneyMap() {
  if (!window.L) return;
  const el = document.getElementById("jmap-real");
  if (!el || el._tpMap) return;
  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    tap: true,
    worldCopyJump: false,
    attributionControl: true,
    minZoom: 3,
    maxZoom: 9,
  });
  el._tpMap = map;
  // OpenTopoMap — free, no API key. Real topographic map with contours,
  // elevation shading, snow-line and vegetation colour. Shows mountains,
  // fjords and valleys as they are.
  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    subdomains: "abc",
    attribution:
      'Map data: © <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors, SRTM · Style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  }).addTo(map);
  // Route polyline in order — dark solid ink so it reads well against
  // the colourful topographic map. Add a white halo underneath.
  L.polyline(
    MAP_STOPS.map((s) => s.c),
    {
      color: "#ffffff",
      weight: 5,
      opacity: 0.85,
      lineJoin: "round",
    },
  ).addTo(map);
  L.polyline(
    MAP_STOPS.map((s) => s.c),
    {
      color: "#0B0F13",
      weight: 2.5,
      opacity: 0.95,
      lineJoin: "round",
    },
  ).addTo(map);
  // Markers — coloured by which leg the day belongs to
  const cIdx = currentIndex();
  MAP_STOPS.forEach((s) => {
    const active = cIdx >= 0 && cIdx === s.idx;
    const legAccent = (legOf(s.idx) || LEGS[0]).accent;
    const icon = L.divIcon({
      className: "",
      html: `<div class="tp-pin${active ? " active" : ""}" style="--pc:${legAccent}"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(s.c, { icon }).addTo(map).bindPopup(`<b>${s.nm}</b>${s.dt}`);
  });
  // Fit bounds — Northern Europe bounding box on the route
  map.fitBounds(
    MAP_STOPS.map((s) => s.c),
    { padding: [24, 24], maxZoom: 5 },
  );
}

/* ---------- per-day Leaflet map ----------
   Renders a small Leaflet map for one day using data.day.map (center + pins).
   Lazy-init: only fires when the user taps "Show map" — otherwise Leaflet
   never mounts and there is nothing to tear down on re-render. */
function dayMapCard(d, idx) {
  if (!d || !d.map) return "";
  const id = `dmap-${idx}`;
  return `<div class="daymap-card" id="${id}-wrap">
    <button class="daymap-toggle" onclick="toggleDayMap(${idx})">
      <span class="dm-lab">${I.pin}Map · ${esc(d.map.pins ? d.map.pins.length : 0)} stops today</span>
      <span class="dm-chev" id="${id}-chev">▾</span>
    </button>
    <div class="daymap-body" id="${id}"></div>
  </div>`;
}
function toggleDayMap(idx) {
  const el = document.getElementById(`dmap-${idx}`);
  const chev = document.getElementById(`dmap-${idx}-chev`);
  if (!el) return;
  const open = el.classList.toggle("open");
  if (chev) chev.textContent = open ? "▴" : "▾";
  if (open) initDayMap(idx);
}
function initDayMap(idx) {
  if (!window.L) return;
  const d = DATA.days[idx];
  if (!d || !d.map) return;
  const el = document.getElementById(`dmap-${idx}`);
  if (!el || el._map) return;
  const m = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    tap: true,
    minZoom: 3,
    maxZoom: 15,
  }).setView(d.map.center, d.map.zoom || 10);
  el._map = m;
  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    subdomains: "abc",
    attribution:
      'Map data: © <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors, SRTM · Style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  }).addTo(m);
  const legAccent = (legOf(idx) || LEGS[0]).accent;
  const pins = d.map.pins || [];
  // Route line connecting the pins in order (halo + ink)
  if (pins.length >= 2) {
    const coords = pins.map((p) => [p[0], p[1]]);
    L.polyline(coords, { color: "#ffffff", weight: 5, opacity: 0.85, lineJoin: "round" }).addTo(m);
    L.polyline(coords, { color: "#0B0F13", weight: 2.5, opacity: 0.95, lineJoin: "round", dashArray: "4 4" }).addTo(m);
  }
  pins.forEach((p, i) => {
    const icon = L.divIcon({
      className: "",
      html: `<div class="tp-pin" style="--pc:${legAccent}"><span class="tp-pin-num">${i + 1}</span></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    L.marker([p[0], p[1]], { icon }).addTo(m).bindPopup(`<b>${p[2] || ""}</b>`);
  });
  if (pins.length) m.fitBounds(pins.map((p) => [p[0], p[1]]), { padding: [22, 22], maxZoom: 12 });
  // Leaflet needs a nudge after being unhidden
  setTimeout(() => m.invalidateSize(), 220);
}

/* ---------- phases (groups a day's parts by time of day) ---------- */
const PHASE_ORDER = ["dawn", "day", "stops", "kid", "evening", "notes"];
const PHASE = {
  dawn: { name: "First light", ic: I.rise, pc: "var(--dawn)" },
  day: { name: "The day", ic: I.sun, pc: "var(--fjord)" },
  stops: { name: "Along the way", ic: I.cup, pc: "var(--gold)" },
  kid: { name: "For the little one", ic: I.kite, pc: "var(--kid)" },
  evening: { name: "Evening", ic: I.set, pc: "var(--dusk)" },
  notes: { name: "Good to know", ic: I.tip, pc: "var(--ink2)" },
};
const KIND2PHASE = {
  dawn: "dawn",
  main: "day",
  aft: "day",
  cafe: "stops",
  mkt: "stops",
  shop: "stops",
  detour: "stops",
  cheap: "stops",
  kid: "kid",
  dusk: "evening",
  eve: "evening",
  also: "evening",
  tip: "notes",
  warn: "notes",
};
/* default sub-labels for parts that ship without one */
const KIND_LABEL = {
  mkt: "Provisions",
  cafe: "Coffee & a bite",
  shop: "Shop / souvenirs",
  detour: "Detour worth taking",
  cheap: "Cheapest eats",
  also: "Also",
  eve: "Evening",
};
const KIND_ICON = { mkt: I.shop, cafe: I.cup, shop: I.shop, detour: I.pin, cheap: I.cup };

/* ---------- drive-vs-sunset warning ---------- */
/* Parse a drive band like "3h", "1h30", "4h45 + stops", "2h + 1h15" to minutes.
   Sums every hN + Nm pair it finds; ignores prose. Returns 0 if nothing parseable. */
function driveMinutes(txt) {
  if (!txt) return 0;
  let m = 0;
  const re = /(\d+)\s*h(?:\s*(\d+))?/gi;
  let match;
  while ((match = re.exec(txt)) !== null) {
    m += parseInt(match[1], 10) * 60 + (match[2] ? parseInt(match[2], 10) : 0);
  }
  return m;
}
function toMin(hhmm) {
  if (!hhmm) return null;
  const m = /^(\d{1,2}):(\d{2})/.exec(hhmm);
  return m ? +m[1] * 60 + +m[2] : null;
}
/* Return a warning card only when it's actually today AND the day has a drive AND
   remaining daylight is thinner than the drive still needs. */
function daylightWarning(d, idx) {
  if (idx !== currentIndex()) return "";
  const drive = driveMinutes(d.drive);
  if (drive <= 0) return "";
  const set = toMin(d.set);
  const rise = toMin(d.rise);
  if (set == null) return "";
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const untilSet = set - nowMin;
  const buffer = untilSet - drive;
  // Bail if we're already past sunset — different problem
  if (untilSet <= 0) return "";
  let tone, label, msg;
  if (buffer < 0) {
    tone = "warn";
    label = "Behind";
    msg = `Drive ${Math.round(drive/60*10)/10}h · sunset ${d.set} · only ${Math.round(untilSet/60*10)/10}h of daylight left. You'll finish in the dark.`;
  } else if (buffer < 60) {
    tone = "tight";
    label = "Tight";
    msg = `Drive ${Math.round(drive/60*10)/10}h · sunset ${d.set} · ${Math.round(untilSet/60*10)/10}h daylight, ${Math.round(buffer)} min buffer. Skip a stop.`;
  } else {
    // enough buffer — quiet, don't shout
    tone = "ok";
    label = "On time";
    msg = `Drive ${Math.round(drive/60*10)/10}h · sunset ${d.set} · ${Math.round(buffer/60*10)/10}h buffer after driving. Comfortable.`;
  }
  return `<div class="daylight-warn ${tone}">
    <div class="dw-lab">${I.set}${label}</div>
    <div class="dw-msg">${esc(msg)}</div>
  </div>`;
}

/* ---------- day-done state (long-press to toggle) ---------- */
/* Keyed by date string so a day marked done stays done across reloads and
   across data changes. */
function isDayDone(d) {
  try { return localStorage.getItem("done_" + d.date) === "1"; }
  catch (_) { return false; }
}
function toggleDayDone(d) {
  const on = !isDayDone(d);
  try {
    if (on) localStorage.setItem("done_" + d.date, "1");
    else localStorage.removeItem("done_" + d.date);
  } catch (_) {}
  if (navigator.vibrate) navigator.vibrate(on ? [30, 40, 30] : 30);
  toast(on ? "Marked " + d.date + " done ✓" : "Cleared " + d.date);
  render();
}

/* ---------- state ---------- */
const S = {
  view: "today",
  day: null,
  seg: 0,
  bk: 0,
  q: "",
  /* kidMode filters day timelines to just the toddler-relevant parts —
     kid highlights, food stops, afternoon plan and any safety warnings —
     hiding dawn shoots, driving detail, dusk photography and adult tips.
     Persisted in localStorage so the toggle survives reloads. */
  kidMode: (() => {
    try { return localStorage.getItem("kidMode") === "1"; } catch (_) { return false; }
  })(),
};
function setKidMode(on) {
  S.kidMode = !!on;
  try { localStorage.setItem("kidMode", S.kidMode ? "1" : "0"); } catch (_) {}
  render();
}
/* Which part-kinds survive kid mode. */
const KID_KINDS = new Set(["kid", "aft", "cafe", "mkt", "shop", "detour", "cheap", "warn"]);
const TAB_INDEX = { today: 0, days: 1, book: 2, info: 3 };

/* ---------- helpers ---------- */
const esc = (t) =>
  String(t).replace(
    /[<>&]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c],
  );
function fmt(t) {
  return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
function toast(m) {
  const t = $("toast");
  t.textContent = m;
  t.classList.add("on");
  setTimeout(() => t.classList.remove("on"), 1800);
}

function dayDate(d) {
  const m = d.date.match(/(\d+)\s+(\w+)/);
  const mon = { Sep: 8, Oct: 9 }[m[2]];
  return new Date(2026, mon, +m[1]);
}
function today() {
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return n;
}
function currentIndex() {
  const t = today();
  for (let i = 0; i < DATA.days.length; i++) {
    if (dayDate(DATA.days[i]).getTime() === t.getTime()) return i;
  }
  return -1;
}
function daysUntil() {
  return Math.ceil((new Date(2026, 8, 27) - today()) / 864e5);
}
/* fraction of the trip elapsed, 0..1 */
function tripProgress() {
  const s = new Date(2026, 8, 27),
    e = new Date(2026, 9, 19),
    n = today();
  return Math.max(0, Math.min(1, (n - s) / (e - s)));
}
function dateShort(d) {
  return esc(d.date.replace(/^\w+\s/, ""));
}

/* ---------- day timeline ---------- */
/* phases that anchor time — an "also" block inherits the last one it followed */
const ANCHOR = { dawn: 1, day: 1, evening: 1 };
function groupParts(parts) {
  /* In kid mode, drop dawn shoots, driving narrative, dusk photography
     and adult tips. Keep an "also" block only if the anchor it inherits
     from is one we're also keeping — otherwise it loses context. */
  const src = S.kidMode
    ? parts.filter((p) => {
        if (p.k === "also") {
          // walk backwards to the anchor and check it survives
          const idx = parts.indexOf(p);
          for (let j = idx - 1; j >= 0; j--) {
            if (ANCHOR[KIND2PHASE[parts[j].k]]) return KID_KINDS.has(parts[j].k);
          }
          return false;
        }
        return KID_KINDS.has(p.k);
      })
    : parts;
  const g = {};
  let last = "day";
  src.forEach((p) => {
    const ph = p.k === "also" ? last : KIND2PHASE[p.k] || "day";
    if (p.k !== "also" && ANCHOR[ph]) last = ph;
    (g[ph] = g[ph] || []).push(p);
  });
  return g;
}
function renderPart(p) {
  const ph = KIND2PHASE[p.k];
  const soft = ph === "stops" || ph === "kid";
  const isNote = ph === "notes";
  const label = p.l || KIND_LABEL[p.k] || "";
  const icon = KIND_ICON[p.k] || "";
  let cls = "blk";
  if (soft) cls += " soft";
  if (isNote) cls += " note" + (p.k === "warn" ? " warn" : "");

  let h = `<div class="${cls}">`;
  if (label || icon)
    h += `<div class="l">${icon}${label ? `<span>${esc(label)}</span>` : ""}</div>`;
  if (p.t) h += `<div class="x">${fmt(p.t)}</div>`;
  if (p.p && p.p.length) {
    h +=
      '<ul class="picks">' +
      p.p
        .map(
          (q) =>
            `<li><div class="nm">${esc(q.name)}${
              q.rate
                ? `<span class="rate r-${q.rate}">${
                    { must: "MUST", good: "WORTH IT", if: "IF TIME" }[q.rate] ||
                    ""
                  }</span>`
                : ""
            }</div>
       <div class="ds">${fmt(q.desc)}</div></li>`,
        )
        .join("") +
      "</ul>";
  }
  return h + "</div>";
}
function timeline(d) {
  const g = groupParts(d.parts);
  let n = 0,
    h = "";
  if (S.kidMode) {
    h += `<div class="kid-banner" onclick="setKidMode(false)" title="Turn kid mode off">
      <span class="kid-dot"></span>Kid mode on · tap to show the full day
    </div>`;
  }
  h += '<div class="tl">';
  PHASE_ORDER.forEach((ph) => {
    const parts = g[ph];
    if (!parts || !parts.length) return;
    const meta = PHASE[ph];
    let gh = ""; // golden-hour shooting marker
    if (ph === "dawn" && d.rise)
      gh = `<span class="gh gh-rise">${I.rise}${esc(d.rise)}</span>`;
    if (ph === "evening" && d.set)
      gh = `<span class="gh gh-set">${I.set}${esc(d.set)}</span>`;
    h += `<div class="node stagger" style="--pc:${meta.pc};--i:${n++}">
      <span class="knob"><i></i></span>
      <div class="ph">${meta.ic}<span>${meta.name}</span>${gh}</div>
      ${parts.map(renderPart).join("")}
    </div>`;
  });
  return h + "</div>";
}

/* ---------- hero ---------- */
/* includeSun renders a compact inline sun-bar (rise · arc · set · daylight) */
function heroFor(d, idx, includeSun) {
  const leg = legOf(idx);
  const dl = includeSun ? daylightBetween(d.rise, d.set) : null;
  let sunBar = "";
  if (includeSun) {
    // sun-dot position along the bar — live if this is today, else midday
    const cIdx = currentIndex();
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    const live =
      cIdx === idx && dl && nowMin > dl.riseMin && nowMin < dl.setMin;
    const frac = live ? (nowMin - dl.riseMin) / (dl.setMin - dl.riseMin) : 0.5;
    sunBar = `<div class="sunline">
      <span class="sun-t rise"><span class="sun-i">${I.rise}</span>${esc(d.rise || "—")}</span>
      <span class="sun-track"><span class="sun-dot" style="left:${(frac * 100).toFixed(1)}%"></span></span>
      <span class="sun-t set">${esc(d.set || "—")}<span class="sun-i">${I.set}</span></span>
      ${dl ? `<span class="sun-dur">${dl.h}h&nbsp;${dl.m.toString().padStart(2, "0")}m</span>` : ""}
    </div>`;
    // #6 moon phase + rise/set for the night of this day
    const dd = dayDate(d);
    const mp = moonPhase(dd);
    const loc = WX_LOCATIONS[idx] || [55.7, 12.6];
    const mt = moonTimes(dd, loc[0], loc[1]);
    let mtHtml = "";
    if (mt) {
      if (mt.note) mtHtml = `<span class="pct">· ${esc(mt.note)}</span>`;
      else
        mtHtml = `<span class="pct">· <span title="Moon rise">↑${esc(mt.rise || "—")}</span>&nbsp;·&nbsp;<span title="Moon set">↓${esc(mt.set || "—")}</span></span>`;
    }
    sunBar += `<div class="moon-pill">${moonSVG(mp)}
      <b>${esc(mp.name)}</b> <span class="pct">${mp.illum}%</span> ${mtHtml}
    </div>`;
  }
  // #1 cover photo (Wikimedia Commons) — key is day number (idx+1)
  const cover =
    typeof COVER_PHOTOS !== "undefined" ? COVER_PHOTOS[idx + 1] : null;
  const coverCls = cover ? " has-cover" : "";
  const coverEl = cover
    ? `<div class="hero-cover" style="background-image:url('${cover.replace(/'/g, "%27")}')"></div>`
    : "";
  return `<div class="hero fade${coverCls}" style="--accent:${leg.accent}">
    ${coverEl}
    <div class="eyebrow"><span>${esc(d.date)}</span><span class="dot"></span>
      <span class="leg-tag">${esc(leg.name)}</span></div>
    <h2>${esc(d.title)}</h2>
    <div class="chips">
      <span class="chip ${d.car ? "car" : "nocar"}">${d.car ? I.car : I.nocar}${d.car ? "Car" : "No car"}</span>
      ${d.drive ? `<span class="chip drive">${d.drive} drive</span>` : ""}
      ${d.transport ? `<span class="chip ${d.transport.kind}">${I[d.transport.kind]}${esc(d.transport.text)}</span>` : ""}
    </div>
    ${sunBar}
    <div class="stay">${I.bed}<span>Tonight · <b>${esc(d.stay)}</b></span></div>
    ${sceneSVG(leg.scene, "scene")}
  </div>`;
}

/* ---------- views ---------- */
function vToday() {
  const idx = currentIndex();
  const until = daysUntil();
  let h = "";

  if (idx < 0) {
    const pre = until > 0;
    // Magazine-cover hero — full viewport, kinetic countdown, aurora shimmer, Ken-Burns pan
    // Signature hero photo: Aurora Borealis over Reine, Lofoten (high-res, ~1000 KB)
    const coverImg = "./images/hero.jpg";
    const numStr = pre ? String(until) : "0";
    // Format the trip window date once, so the eyebrow tells you *when* not "Issue No. 01"
    const d0 = DATA.days[0],
      dN = DATA.days[DATA.days.length - 1];
    const eyebrowStr = pre
      ? "For the trip · 27 Sep – 19 Oct 2026"
      : "Trip complete";
    h += `<div class="mag-cover">
      ${
        coverImg
          ? `<div class="mag-poster">
        <img class="mag-photo${window.heroLoadedOnce ? " ready" : ""}" src="${coverImg}" alt=""
          decoding="async" fetchpriority="high"
          onload="this.classList.add('ready');window.heroLoadedOnce=true">
      </div>`
          : ""
      }
      <div class="mag-inner-wrap"><div class="mag-inner">
        <div class="mag-eyebrow"><span>${esc(eyebrowStr)}</span></div>
        <div class="mag-mid">
          <div class="mag-cd">
            <span class="mag-cd-num" id="magCdNum" data-target="${numStr}">${numStr}</span>
            <span class="mag-cd-suffix">days<br><span class="mag-cd-suffix-sub">${pre ? "to go" : "done"}</span></span>
          </div>
          <div class="mag-band">
            <h1 class="mag-title">Arctic → Alpine</h1>
            <p class="mag-sub">Copenhagen · Lofoten · Bergen · Bavaria · Bohemia · Home. Twenty nights across the top of Europe.</p>
            <div class="mag-meta">
              <span>${DATA.days.length} days</span>
              <span class="dot"></span>
              <span>5 countries</span>
              <span class="dot"></span>
              <span>4 flights</span>
            </div>
          </div>
        </div>
      </div></div>
    </div>`;
    h += `<div class="reveal">${journeyMap()}</div>`;
    // "First up" card removed at user request (redundant with the journey timeline)
    h += `<div class="reveal">${actionsCard()}</div>`;
  } else {
    const d = DATA.days[idx];
    // include sun chip in hero here — no glance strip on this view
    h += heroFor(d, idx, true);
    h += journeyMap();
    h += timeline(d);
    const nx = DATA.days[idx + 1];
    if (nx)
      h += `<div class="card fade" style="margin-top:14px"><div class="lab">Tomorrow</div>
      <div class="drow" style="border:0;padding:0" onclick="openDay(${idx + 1})">
        <div class="dt">${esc(nx.date.split(" ")[0])}<b>${esc(nx.date.split(" ")[1])}</b></div>
        <div class="bd"><div class="ti">${esc(nx.title)}</div>
        <div class="st">${esc(nx.stay)}</div></div>
        <div class="go">${I.chev}</div></div></div>`;
  }
  return h;
}
/* ---------- #6 moon phase (astronomical, no API needed) ---------- */
/* Age of the moon in days, 0..29.53, where 0 = new moon, ~14.77 = full */
function moonAge(date) {
  const known = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)); // known new moon
  const synodic = 29.530588853;
  const days = (date.getTime() - known.getTime()) / 86400000;
  let a = days % synodic;
  if (a < 0) a += synodic;
  return a;
}
function moonPhase(date) {
  const age = moonAge(date);
  const frac = age / 29.530588853;
  const illum = Math.round(50 * (1 - Math.cos(frac * 2 * Math.PI)));
  const names = [
    "New moon",
    "Waxing crescent",
    "First quarter",
    "Waxing gibbous",
    "Full moon",
    "Waning gibbous",
    "Last quarter",
    "Waning crescent",
  ];
  const idx = Math.floor((frac + 1 / 16) * 8) % 8;
  return { age, illum, name: names[idx], idx, frac };
}
/* SVG moon icon — draws the illuminated portion via SVG arcs.
   phase 0=new (dark), 0.5=full (bright), 1=new again.
   Uses one bright disc + one dark disc + an illuminated-region path. */
function moonSVG(mp) {
  const cx = 8,
    cy = 8,
    r = 6;
  const phase = mp.frac;
  const illum = 0.5 * (1 - Math.cos(phase * 2 * Math.PI)); // 0..1
  // near-new: empty disc
  if (illum < 0.02) {
    return `<svg class="moon-svg" viewBox="0 0 16 16">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg)" stroke="var(--ink3)" stroke-width=".7"/>
    </svg>`;
  }
  // near-full: solid bright disc
  if (illum > 0.98) {
    return `<svg class="moon-svg" viewBox="0 0 16 16">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--ink)"/>
    </svg>`;
  }
  const waxing = phase < 0.5;
  const rx = r * Math.abs(1 - 2 * illum);
  const outerSweep = waxing ? 1 : 0;
  const termSweep = waxing
    ? illum < 0.5
      ? 0
      : 1 // waxing: crescent=0, gibbous=1
    : illum < 0.5
      ? 1
      : 0; // waning: crescent=1, gibbous=0
  const path = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx.toFixed(2)} ${r} 0 0 ${termSweep} ${cx} ${cy - r} Z`;
  return `<svg class="moon-svg" viewBox="0 0 16 16">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg)" stroke="var(--ink3)" stroke-width=".5"/>
    <path d="${path}" fill="var(--ink)"/>
  </svg>`;
}

/* Moon rise / set for a given date + location via SunCalc.
   Returns { rise: 'HH:MM', set: 'HH:MM', note?: 'up all night' } */
function moonTimes(date, lat, lon) {
  if (typeof SunCalc === "undefined") return null;
  const t = SunCalc.getMoonTimes(date, lat, lon, true);
  const fmt = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return null;
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  if (t.alwaysUp) return { note: "Moon up all night" };
  if (t.alwaysDown) return { note: "Moon below horizon" };
  return { rise: fmt(t.rise), set: fmt(t.set) };
}

/* ---------- #4 sky colour by hour (device local time) ---------- */
function updateSky() {
  const h = new Date().getHours();
  let a, b, c;
  if (h >= 5 && h < 8) {
    a = "rgba(232,168,96,.14)";
    b = "rgba(107,182,206,.09)";
    c = "rgba(217,164,65,.07)";
  } // dawn — warm gold
  else if (h >= 8 && h < 17) {
    a = "rgba(107,182,206,.11)";
    b = "rgba(159,216,210,.08)";
    c = "rgba(255,255,255,.02)";
  } // day — cool sky
  else if (h >= 17 && h < 20) {
    a = "rgba(232,168,96,.14)";
    b = "rgba(232,115,90,.09)";
    c = "rgba(217,164,65,.06)";
  } // dusk — warm
  else {
    a = "rgba(79,214,156,.14)";
    b = "rgba(107,182,206,.10)";
    c = "rgba(183,154,230,.05)";
  } // night — aurora
  const s = document.body.style;
  s.setProperty("--sky-a", a);
  s.setProperty("--sky-b", b);
  s.setProperty("--sky-c", c);
}

/* ---------- #3 Open-Meteo weather forecast (no API key) ----------
   Fetches once per session for each destination we ask for; caches. */
const WX_CACHE = {};
const WX_LOCATIONS = {
  // day-index -> [lat,lon]
  0: [55.68, 12.57],
  1: [55.68, 12.57],
  2: [67.93, 13.08],
  3: [67.93, 13.08],
  4: [67.93, 13.08],
  5: [68.23, 14.57],
  6: [68.23, 14.57],
  7: [59.91, 10.75],
  8: [60.39, 5.32],
  9: [60.39, 5.32],
  10: [60.9, 7.19],
  11: [60.39, 5.32],
  12: [47.6, 10.75],
  13: [47.56, 13.65],
  14: [48.81, 14.32],
  15: [50.08, 14.44],
  16: [50.08, 14.44],
  17: [50.08, 14.44],
  18: [51.05, 13.74],
  19: [55.68, 12.57],
  20: [55.68, 12.57],
};
async function loadWeather() {
  // fetch by unique lat/lon
  const seen = {};
  const promises = [];
  Object.values(WX_LOCATIONS).forEach(([la, lo]) => {
    const key = `${la},${lo}`;
    if (seen[key] || WX_CACHE[key]) return;
    seen[key] = true;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=16`;
    promises.push(
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          if (j) WX_CACHE[key] = j.daily;
        })
        .catch(() => {}),
    );
  });
  await Promise.all(promises);
  if (Object.keys(WX_CACHE).length) render();
}
function wxFor(dayIdx) {
  const loc = WX_LOCATIONS[dayIdx];
  if (!loc) return null;
  const cache = WX_CACHE[`${loc[0]},${loc[1]}`];
  if (!cache) return null;
  const d = DATA.days[dayIdx];
  const [_, dd, mon] = d.date.match(/(\d+)\s+(\w+)/);
  const m = { Sep: "09", Oct: "10" }[mon];
  const key = `2026-${m}-${String(dd).padStart(2, "0")}`;
  const i = cache.time.indexOf(key);
  if (i < 0) return null;
  return {
    hi: Math.round(cache.temperature_2m_max[i]),
    lo: Math.round(cache.temperature_2m_min[i]),
    code: cache.weather_code[i],
  };
}
/* Map WMO weather codes to a compact icon + label */
function wxIcon(code) {
  // 0 clear, 1-3 mainly-clear/partly, 45/48 fog, 51-67 drizzle/rain,
  // 71-77 snow, 80-82 showers, 95-99 thunderstorm
  const sun =
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"/></svg>';
  const cloud =
    '<svg viewBox="0 0 24 24"><path d="M7 18h11a4 4 0 000-8 6 6 0 00-11-2 4 4 0 000 10z"/></svg>';
  const rain =
    '<svg viewBox="0 0 24 24"><path d="M7 15h11a4 4 0 000-8 6 6 0 00-11-2 4 4 0 000 10zM8 18l-1 3M12 18l-1 3M16 18l-1 3"/></svg>';
  const snow =
    '<svg viewBox="0 0 24 24"><path d="M7 15h11a4 4 0 000-8 6 6 0 00-11-2 4 4 0 000 10zM9 19h.01M13 20h.01M17 19h.01"/></svg>';
  const storm =
    '<svg viewBox="0 0 24 24"><path d="M7 15h11a4 4 0 000-8 6 6 0 00-11-2 4 4 0 000 10zM13 17l-3 4h3l-2 3"/></svg>';
  if (code === 0) return sun;
  if (code <= 3) return cloud;
  if (code >= 45 && code <= 48) return cloud;
  if (code >= 51 && code <= 67) return rain;
  if (code >= 71 && code <= 77) return snow;
  if (code >= 80 && code <= 82) return rain;
  if (code >= 95) return storm;
  return cloud;
}
function wxTempClass(hi) {
  if (hi >= 18) return "warm";
  if (hi <= 2) return "freeze";
  return "cold";
}

/* ---------- #5 NOAA aurora Kp forecast (no key) ---------- */
let KP_LATEST = null;
async function loadKp() {
  try {
    const res = await fetch(
      "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
    );
    if (!res.ok) return;
    const rows = await res.json();
    // rows[0] = headers, rest = [timestamp, kp, ...]
    const last = rows[rows.length - 1];
    KP_LATEST = { time: last[0], kp: parseFloat(last[1]) };
    render();
  } catch (_) {}
}
function kpLevelClass(kp) {
  if (kp >= 5) return "kp-storm";
  if (kp >= 4) return "kp-high";
  if (kp >= 3) return "kp-mid";
  return "kp-low";
}
function kpLabel(kp) {
  if (kp >= 6) return "Strong storm — visible far south";
  if (kp >= 5) return "Storm — bright, active display likely";
  if (kp >= 4) return "Active — good chance of aurora";
  if (kp >= 3) return "Enough for Lofoten latitude";
  return "Quiet — needs a clear low horizon";
}

/* ---------- daylight helpers ---------- */
function toMin(hm) {
  if (!hm) return null;
  const m = hm.match(/^(\d{1,2}):(\d{2})$/);
  return m ? +m[1] * 60 + +m[2] : null;
}
function daylightBetween(rise, set) {
  const r = toMin(rise),
    s = toMin(set);
  if (r == null || s == null || s <= r) return null;
  const t = s - r;
  return { h: Math.floor(t / 60), m: t % 60, riseMin: r, setMin: s };
}
function sunArc(rise, set, dl) {
  // sun position: current time if today, else midway
  const idx = currentIndex();
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const dayIdx = DATA.days.findIndex((dy) => dy.date === DATA.days[idx]?.date);
  const useCurrent =
    idx >= 0 && dl && nowMin > dl.riseMin && nowMin < dl.setMin;
  const frac = useCurrent
    ? (nowMin - dl.riseMin) / (dl.setMin - dl.riseMin)
    : 0.5; // midday if no current time
  // arc from (30,60) to (270,60) with apex at (150,4)
  const t = frac;
  // quadratic bezier P0(30,60) P1(150,-30) P2(270,60)
  const sx = (1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 150 + t * t * 270;
  const sy = (1 - t) * (1 - t) * 60 + 2 * (1 - t) * t * -30 + t * t * 60;
  return `<div class="sun-arc">
    <svg viewBox="0 0 300 70" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="sarc-${idx}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="var(--dawn)" stop-opacity=".55"/>
          <stop offset=".5" stop-color="var(--gold)" stop-opacity=".8"/>
          <stop offset="1" stop-color="var(--dusk)" stop-opacity=".55"/>
        </linearGradient>
        <radialGradient id="sun-${idx}" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#FFEBB3"/>
          <stop offset=".7" stop-color="var(--gold)"/>
          <stop offset="1" stop-color="var(--gold)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="18" y1="60" x2="282" y2="60" stroke="var(--line)" stroke-width=".5" stroke-dasharray="2 4"/>
      <path d="M30 60 Q150 -30 270 60" stroke="url(#sarc-${idx})" stroke-width="1.6" fill="none"/>
      <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="8" fill="url(#sun-${idx})"/>
      <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="3.5" fill="#FFEBB3"/>
      <text x="30" y="70" fill="var(--ink3)" font-family="var(--mono)" font-size="9" text-anchor="middle">${esc(rise)}</text>
      <text x="270" y="70" fill="var(--ink3)" font-family="var(--mono)" font-size="9" text-anchor="middle">${esc(set)}</text>
    </svg>
    <div class="daylight"><span>${dl.h}<b>h</b> ${dl.m.toString().padStart(2, "0")}<b>m</b></span> of daylight${useCurrent ? " · sun is up now" : ""}</div>
  </div>`;
}

/* Aurora viewing teaser — shown on Lofoten days.
   Static advice + live NOAA Kp when available. */
function auroraCard(d) {
  const mp = moonPhase(dayDate(d));
  const moonLine =
    mp.illum > 60
      ? `<span class="pct" style="color:var(--dusk)">Bright moon (${mp.illum}%) — will wash faint auroras</span>`
      : mp.illum < 25
        ? `<span class="pct" style="color:var(--dawn)">Dark night (${mp.illum}% moon) — ideal for aurora</span>`
        : `<span class="pct">Half moon (${mp.illum}%) — bright bands still show</span>`;
  const liveKp = KP_LATEST
    ? `<div class="kp-live ${kpLevelClass(KP_LATEST.kp)}">
         <span class="kp-dot"></span>Live Kp <b>${KP_LATEST.kp.toFixed(1)}</b> · ${esc(kpLabel(KP_LATEST.kp))}
       </div>`
    : `<div class="kp-live"><span class="kp-dot"></span>Live Kp loading…</div>`;
  return `<div class="aurora-card fade">
    <div class="lab">${I.sun}Aurora watch · ${esc(d.set || "sunset")} to dawn</div>
    <h3>Tonight in Lofoten</h3>
    <p>You're at 68°N, under the auroral oval most clear October nights. Aurora is a cloud problem more than a Kp problem — watch the sky from sunset (${esc(d.set || "~18:30")}) through about 02:00, peak often 22:00–midnight.</p>
    <p style="color:var(--ink3);font-size:12.5px">Best local spots: <b style="color:var(--ink2)">Hamnøy bridge</b>, <b style="color:var(--ink2)">Skagsanden beach</b>, <b style="color:var(--ink2)">Gimsøysand</b> — all face north with no light pollution.</p>
    ${liveKp}
    <div class="moon-pill" style="margin-top:8px">${moonSVG(mp)}<b>${esc(mp.name)}</b> · ${moonLine}${(function () {
      const dIdx = DATA.days.indexOf(d);
      const loc = WX_LOCATIONS[dIdx] || [67.9, 13.1];
      const mt = moonTimes(dayDate(d), loc[0], loc[1]);
      if (!mt) return "";
      if (mt.note) return ` <span class="pct">· ${esc(mt.note)}</span>`;
      return ` <span class="pct">· ↑${esc(mt.rise || "—")} ↓${esc(mt.set || "—")}</span>`;
    })()}</div>
  </div>`;
}
function actionsCard() {
  const acts = DATA.actions.filter((a) => a.tag === "Act").slice(0, 4);
  if (!acts.length) return "";
  return (
    `<div class="card fade"><div class="lab">${I.warn}Before you go</div>` +
    acts
      .map(
        (a) => `<div class="bk"><div class="w">${esc(a.when)}</div>
      <div class="b"><div class="n">${esc(a.name)}</div>
      <div class="d">${fmt(a.detail)}</div></div></div>`,
      )
      .join("") +
    "</div>"
  );
}

function vDays() {
  const idx = currentIndex();
  const q = S.q.toLowerCase();
  const rows = DATA.days
    .map((d, i) => ({ d, i }))
    .filter(({ d }) => {
      if (!q) return true;
      return (d.title + d.stay + d.date + JSON.stringify(d.parts))
        .toLowerCase()
        .includes(q);
    });
  if (!rows.length)
    return `<div class="empty">Nothing matches “${esc(S.q)}”.</div>`;

  let h = `<div class="sect fade"><h2>Day by day</h2>
    <p class="intro">${rows.length} of ${DATA.days.length} days${q ? " matching" : ", in six legs"}. Tap for the full day.</p></div>`;

  let curLeg = null,
    si = 0;
  rows.forEach(({ d, i }, r) => {
    const leg = legOf(i);
    if (leg !== curLeg) {
      if (curLeg) h += `</div>`; // close the previous leg
      curLeg = leg;
      si = 0; // restart the stagger per leg

      const members = rows.filter((x) => legOf(x.i) === leg);
      const range = members.length
        ? dateShort(members[0].d) +
          "–" +
          dateShort(members[members.length - 1].d)
        : "";
      h += `<div class="leg fade" style="--accent:${leg.accent}">
        <div class="legband">${sceneSVG(leg.scene, "scene")}
          <div class="legband-t"><span class="nm">${esc(leg.name)}</span><span class="rg">${range}</span></div>
          <div class="legband-s">${esc(leg.sub)}</div></div>`;
    }
    const cls = [
      i === idx ? "now" : dayDate(d) < today() ? "past" : "",
      isDayDone(d) ? "done" : "",
    ].filter(Boolean).join(" ");
    const dp = d.date.split(" ");
    const wx = wxFor(i);
    const wxHtml = wx
      ? `<span class="wchip ${wxTempClass(wx.hi)}">${wxIcon(wx.code)}${wx.hi}°/${wx.lo}°</span>`
      : "";
    h += `<button class="drow ${cls} stagger" style="--i:${si++}" data-day-idx="${i}">
        ${i === idx ? '<span class="pulse"></span>' : ""}
        <div class="dt">${esc(dp[0])}<b>${esc(dp[1])} ${esc(dp[2] || "")}</b></div>
        <div class="bd"><div class="ti">${esc(d.title)}</div>
          <div class="st">${esc(d.stay)}${d.drive ? " · " + esc(d.drive) : ""}${wxHtml}</div></div>
        <div class="ic">${d.transport ? I[d.transport.kind] : ""}${d.car ? I.car : ""}</div>
        <div class="go">${isDayDone(d) ? '<span class="done-check">✓</span>' : I.chev}</div>
      </button>`;
    if (r === rows.length - 1) h += `</div>`; // close the final leg
  });
  return h;
}

function vDay(i) {
  const d = DATA.days[i];
  const prev = DATA.days[i - 1],
    next = DATA.days[i + 1];
  const dayNum = String(i + 1).padStart(2, "0");
  // Inline spotlights — three teaser cards, each linking to its deep-dive page.
  // Each pulls two bullets from d.spot (background / shop / stories).
  const sp = d.spot || { hist: [], shop: [], story: [] };
  const SC_ICON = {
    hist: '<svg viewBox="0 0 24 24"><path d="M4 4h10l4 4v12H4z"/><path d="M14 4v4h4"/><path d="M8 12h6M8 15h6M8 18h4"/></svg>',
    shop: '<svg viewBox="0 0 24 24"><path d="M4 8h16l-1.5 11a2 2 0 01-2 1.7H7.5a2 2 0 01-2-1.7L4 8z"/><path d="M8 8V6a4 4 0 018 0v2"/></svg>',
    story: '<svg viewBox="0 0 24 24"><path d="M4 5.5c3-1.2 6-1.2 8 0 2-1.2 5-1.2 8 0V19c-3-1.2-6-1.2-8 0-2-1.2-5-1.2-8 0z"/><path d="M12 5.5V19"/></svg>',
  };
  function spotCard(kind, label, href, bullets) {
    const items = (bullets && bullets.length)
      ? '<ul>' + bullets.map((b) => `<li>${esc(b)}</li>`).join('') + '</ul>'
      : '';
    return `<a class="spotcard" data-kind="${kind}" href="${href}">
      <div class="sc-lab">${SC_ICON[kind] || ''}<span>${label}</span></div>
      ${items}
      <div class="sc-more">Read more <span aria-hidden="true">↗</span></div>
    </a>`;
  }
  const spotlights = `<div class="spotlights">
    ${spotCard('hist', 'Background', `history/day-${dayNum}.html`, sp.hist)}
    ${spotCard('shop', 'Shop &amp; souvenirs', `shop/day-${dayNum}.html`, sp.shop)}
    ${spotCard('story', 'Stories &amp; legends', `stories/day-${dayNum}.html`, sp.story)}
  </div>`;
  // aurora teaser on Lofoten leg days (index 2..6 → Reine and Svolvær)
  const isLofoten = i >= 2 && i <= 6;
  const aurora = isLofoten ? auroraCard(d) : "";
  // sun info is now inline in the hero itself (includeSun=true)
  const daylightWarn = daylightWarning(d, i);
  const dmap = dayMapCard(d, i);
  const spendChip = daySpendChip(d);
  let h =
    `<button class="back" onclick="backToDays()">${I.chev}All days</button>` +
    heroFor(d, i, true) +
    daylightWarn +
    spendChip +
    dmap +
    spotlights +
    aurora +
    timeline(d);
  h +=
    `<div class="daynav">` +
    (prev
      ? `<button onclick="navigateDay(-1)"><div class="k">← Previous</div><div class="v">${esc(prev.title)}</div></button>`
      : `<button style="visibility:hidden"></button>`) +
    (next
      ? `<button class="nx" onclick="navigateDay(1)"><div class="k">Next →</div><div class="v">${esc(next.title)}</div></button>`
      : `<button class="nx" style="visibility:hidden"></button>`) +
    `</div>`;
  return h;
}

const TAG_CLASS = {
  Booked: "t-ok",
  Open: "t-open",
  Act: "t-act",
  Cancel: "t-act",
  Seats: "t-open",
};
function bookingRows(rows) {
  return rows
    .map((r) => {
      const tg = TAG_CLASS[r.tag] || "t-act";
      const addrBtn = r.addr
        ? `<button class="ref addr" onclick="copyAddr(${JSON.stringify(r.addr).replace(/"/g, "&quot;")})">${I.pin || I.copy}${esc(r.addr)}</button>`
        : "";
      return `<div class="bk"><div class="w">${esc(r.when || "")
        .split("\n")
        .join("<br>")}</div>
      <div class="b"><div class="n">${esc(r.name)}</div>
      ${r.detail ? `<div class="d">${fmt(r.detail)}</div>` : ""}
      ${r.ref ? `<button class="ref" onclick="copyRef('${esc(r.ref.split(" ")[0])}')">${I.copy}${esc(r.ref)}</button>` : ""}
      ${addrBtn}
      </div>${r.tag ? `<span class="tag ${tg}">${esc(r.tag)}</span>` : ""}</div>`;
    })
    .join("");
}
function copyAddr(addr) {
  navigator.clipboard
    ?.writeText(addr)
    .then(() => toast("Address copied"))
    .catch(() => toast(addr));
}
function bookGroup(head) {
  return DATA.bookings.find(
    (g) => g.head === head || (head instanceof RegExp && head.test(g.head)),
  );
}

function vBook() {
  const q = S.q.toLowerCase();
  let h = `<div class="sect fade"><h2>Bookings</h2>`;

  // searching: flatten across everything so a reference is found from any tab
  if (q) {
    h += `<p class="intro">Matches for “${esc(S.q)}”.</p>`;
    const all = [{ head: "Needs action", rows: DATA.actions }].concat(
      DATA.bookings,
    );
    let any = false;
    all.forEach((g) => {
      const rows = g.rows.filter((r) =>
        ((r.name || "") + (r.detail || "") + (r.ref || ""))
          .toLowerCase()
          .includes(q),
      );
      if (!rows.length) return;
      any = true;
      h += `<div class="grph">${esc(g.head)}</div>` + bookingRows(rows);
    });
    if (!any) h += `<div class="empty">Nothing matches “${esc(S.q)}”.</div>`;
    return h + "</div>";
  }

  // tabbed view
  const TABS = [
    { name: "To do", groups: [{ head: "Needs action", rows: DATA.actions }] },
    {
      name: "Flights",
      groups: [bookGroup("Flights"), bookGroup("Rail")].filter(Boolean),
    },
    { name: "Cars", groups: [bookGroup(/^Cars/)].filter(Boolean) },
    { name: "Stays", groups: [bookGroup("Where you sleep")].filter(Boolean) },
    { name: "Budget", budget: true },
    { name: "Live", live: true },
  ];
  const bk = Math.min(S.bk || 0, TABS.length - 1);
  h +=
    `<div class="seg"><div class="thumb" style="--n:${bk};width:calc((100% - 6px)/${TABS.length})"></div>` +
    TABS.map(
      (t, i) =>
        `<button class="${bk === i ? "on" : ""}" onclick="S.bk=${i};render()">${t.name}</button>`,
    ).join("") +
    `</div>`;

  if (TABS[bk].budget) {
    h += vBudget();
  } else if (TABS[bk].live) {
    h += vLive();
    // Auto-sync on Live tab open — throttled to once per minute per visit
    maybeAutoSync();
  } else {
    h += `<p class="intro">Tap a reference to copy it.</p>`;
    TABS[bk].groups.forEach((g) => {
      if (TABS[bk].groups.length > 1)
        h += `<div class="grph">${esc(g.head)}</div>`; // sub-headers only when >1 group
      h += bookingRows(g.rows);
    });
  }
  return h + "</div>";
}

/* ---------- budget view ---------- */
function fmtMoney(n, ccy) {
  if (n === null || n === undefined) return `<span class="bg-q">?</span>`;
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(Math.round(n));
  return `<span class="bg-n">${sign}${ccy || "$"}${abs.toLocaleString("en-AU")}</span>`;
}
/* Shared totals — reused by vBudget and the Live vs-plan comparison. */
function computeBudgetTotals() {
  const B = DATA.budget || { currency: "AUD", categories: [] };
  let grand = 0, unknown = 0, cashback = 0, pending = 0;
  const catTotals = [];
  B.categories.forEach((c) => {
    if (c.head === "Contingency") return;
    let sub = 0, qs = 0, cb = 0, ps = 0;
    c.rows.forEach((r) => {
      if (typeof r.cash === "number") {
        sub += r.cash;
        if (typeof r.cashback === "number") cb += r.cash * r.cashback;
      } else if (r.cash === null) qs += 1;
      if (typeof r.pendingSaving === "number") ps += r.pendingSaving;
    });
    catTotals.push({ head: c.head, sub, qs, cb, ps });
    grand += sub; unknown += qs; cashback += cb; pending += ps;
  });
  cashback = Math.round(cashback);
  const contingency = Math.round(grand * 0.1);
  const netAfterCashback = grand - cashback - pending;
  return { B, grand, unknown, cashback, pending, contingency, netAfterCashback, catTotals };
}

function vBudget() {
  const { B, grand, unknown, cashback, pending, contingency, catTotals } = computeBudgetTotals();
  const ccy = "$";

  // Glance card at the top: committed, cashback earning, pending savings, net.
  let h = `<div class="bg-glance">
    <div class="bg-g-row"><span>Committed so far</span><b>${fmtMoney(grand, ccy)}</b></div>
    <div class="bg-g-row bg-g-cb"><span>Cashback earning</span><b class="bg-cb-total">−${fmtMoney(cashback, ccy).replace('bg-n', 'bg-n bg-cb-num')}</b></div>
    ${pending ? `<div class="bg-g-row bg-g-ps"><span>Pending savings · Super Cover decline</span><b class="bg-ps-total">−${fmtMoney(pending, ccy).replace('bg-n', 'bg-n bg-ps-num')}</b></div>` : ""}
    <div class="bg-g-row bg-g-net"><span>Net after cashback${pending ? " + savings" : ""}</span><b>${fmtMoney(grand - cashback - pending, ccy)}</b></div>
  </div>`;
  h += `<p class="intro">${esc(B.note || "")}</p>`;

  B.categories.forEach((c) => {
    const ct = catTotals.find((x) => x.head === c.head);
    const isContingency = c.head === "Contingency";
    h += `<div class="bg-cat"><div class="bg-h">${esc(c.head)}</div>`;
    if (c.note) h += `<div class="bg-note">${fmt(c.note)}</div>`;
    c.rows.forEach((r) => {
      const cash =
        r.cash === "auto"
          ? fmtMoney(contingency, ccy)
          : fmtMoney(r.cash, ccy);
      const cbAmt =
        typeof r.cash === "number" && typeof r.cashback === "number"
          ? Math.round(r.cash * r.cashback)
          : 0;
      const cbBadge = cbAmt
        ? `<span class="bg-cb">${Math.round(r.cashback * 100)}% back · ${ccy}${cbAmt.toLocaleString("en-AU")}</span>`
        : "";
      const psBadge =
        typeof r.pendingSaving === "number" && r.pendingSaving > 0
          ? `<span class="bg-ps">Save ${ccy}${r.pendingSaving.toLocaleString("en-AU")} · decline Super Cover at desk</span>`
          : "";
      h += `<div class="bg-row">
        <div class="bg-l">
          <div class="bg-nm">${esc(r.name || "")}</div>
          ${r.detail ? `<div class="bg-d">${fmt(r.detail)}</div>` : ""}
          <div class="bg-meta">
            ${r.when ? `<span class="bg-w">${esc(r.when)}</span>` : ""}
            ${r.ref ? `<button class="ref bg-ref" onclick="copyRef('${esc(String(r.ref).split(" ")[0])}')">${I.copy}${esc(r.ref)}</button>` : ""}
            ${r.tag ? `<span class="tag t-open">${esc(r.tag)}</span>` : ""}
            ${cbBadge}
            ${psBadge}
          </div>
        </div>
        <div class="bg-r">${cash}</div>
      </div>`;
    });
    if (!isContingency) {
      const cbLine = ct.cb
        ? ` <span class="bg-sub-cb">− ${ccy}${Math.round(ct.cb).toLocaleString("en-AU")} back</span>`
        : "";
      const psLine = ct.ps
        ? ` <span class="bg-sub-ps">− ${ccy}${ct.ps.toLocaleString("en-AU")} pending</span>`
        : "";
      h += `<div class="bg-sub"><span>Subtotal${ct.qs ? ` · ${ct.qs} unknown` : ""}${cbLine}${psLine}</span><b>${fmtMoney(ct.sub, ccy).replace('bg-n', 'bg-n bg-strong')}</b></div>`;
    }
    h += `</div>`;
  });

  if (unknown) {
    h += `<div class="bg-total"><div class="bg-note">${unknown} ${unknown === 1 ? "line is" : "lines are"} marked ? — fill in from a receipt and the glance-card totals update.</div></div>`;
  }
  return h;
}

/* ---------- live expense log (device-local) ---------- */
// Rates match the Budget view — NOK/EUR from data.js note, DKK/CZK added.
const FX = { AUD: 1, NOK: 0.139, EUR: 1.654, DKK: 0.222, CZK: 0.067, SGD: 1.14, USD: 1.55 };
const LIVE_KEY = "bohemia-live-spend-v1";
const LIVE_CATS = ["Food", "Transport", "Fuel", "Groceries", "Tickets", "Shopping", "Misc"];

function liveRead() {
  try { return JSON.parse(localStorage.getItem(LIVE_KEY) || "[]"); }
  catch (e) { console.warn("liveRead failed:", e); return []; }
}
/* Write + read-back verification. Returns true on confirmed persistence,
   false when the browser is refusing storage (private mode / ITP quota). */
function liveWrite(list) {
  const payload = JSON.stringify(list);
  try {
    localStorage.setItem(LIVE_KEY, payload);
    // Verify by reading back — Safari private mode SILENTLY drops writes.
    const check = localStorage.getItem(LIVE_KEY);
    if (check !== payload) throw new Error("write verification failed");
    return true;
  } catch (e) {
    console.error("liveWrite failed:", e);
    return false;
  }
}
function liveAdd() {
  const g = (id) => document.getElementById(id);
  const amt = parseFloat(g("lv-amt").value);
  const ccy = g("lv-ccy").value;
  const cat = g("lv-cat").value;
  const note = g("lv-note").value.trim();
  const date = g("lv-date").value || todayLocal();
  if (!amt || amt <= 0) {
    g("lv-amt").focus();
    return;
  }
  const list = liveRead();
  list.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    date, amt, ccy, cat, note,
  });
  const ok = liveWrite(list);
  if (ok) {
    toast(`Added ${ccy} ${amt}`);
  } else {
    toast("⚠️ Not saved — storage refused (open from home-screen icon)");
  }
  render();
}
/* Storage probe — returns 'ok', 'refused', or 'unavailable'. Used to render
   a diagnostic line at the bottom of the Live tab so silent failures aren't. */
function liveStorageProbe() {
  try {
    const k = "__probe_" + Date.now();
    localStorage.setItem(k, "1");
    const r = localStorage.getItem(k);
    localStorage.removeItem(k);
    return r === "1" ? "ok" : "refused";
  } catch (_) { return "unavailable"; }
}
/* Import JSON — user can paste a file back in if they had to reinstall. */
function liveImport() {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "application/json,.json";
  inp.onchange = () => {
    const f = inp.files && inp.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const arr = JSON.parse(r.result);
        if (!Array.isArray(arr)) throw new Error("not an array");
        const cur = liveRead();
        const seen = new Set(cur.map((e) => e.id));
        const merged = cur.concat(arr.filter((e) => e && e.id && !seen.has(e.id)));
        const ok = liveWrite(merged);
        toast(ok ? `Imported ${merged.length - cur.length} new entries` : "Import: storage refused");
        render();
      } catch (e) { toast("Import failed — bad JSON"); }
    };
    r.readAsText(f);
  };
  inp.click();
}
/* ---------- Sync via JSONBin.io (shared blob for two devices) ----------
   Deletes are handled via a tombstone list so a device that removed an entry
   doesn't have it re-injected by the other device on the next sync. */
const SYNC_CFG_KEY = "bohemia-sync-cfg-v1";
const SYNC_TOMB_KEY = "bohemia-tomb-v1";
const SYNC_META_KEY = "bohemia-sync-meta-v1";
const SYNC_URL = (binId) => `https://api.jsonbin.io/v3/b/${encodeURIComponent(binId)}`;

function syncCfg() {
  try { return JSON.parse(localStorage.getItem(SYNC_CFG_KEY) || "null"); }
  catch { return null; }
}
function syncCfgSave(cfg) {
  try { localStorage.setItem(SYNC_CFG_KEY, JSON.stringify(cfg)); return true; }
  catch { return false; }
}
function syncCfgClear() {
  try { localStorage.removeItem(SYNC_CFG_KEY); } catch {}
}
function tombRead() {
  try { return JSON.parse(localStorage.getItem(SYNC_TOMB_KEY) || "[]"); }
  catch { return []; }
}
function tombWrite(arr) {
  try { localStorage.setItem(SYNC_TOMB_KEY, JSON.stringify(arr)); } catch {}
}
function tombAdd(id) {
  const t = tombRead();
  if (!t.includes(id)) { t.push(id); tombWrite(t); }
}
function syncMeta() {
  try { return JSON.parse(localStorage.getItem(SYNC_META_KEY) || "{}"); }
  catch { return {}; }
}
function syncMetaSave(m) {
  try { localStorage.setItem(SYNC_META_KEY, JSON.stringify(m)); } catch {}
}

async function syncNow() {
  const cfg = syncCfg();
  if (!cfg || !cfg.binId || !cfg.key) {
    toast("Set up sync first");
    return;
  }
  const btn = document.getElementById("sync-btn");
  if (btn) { btn.disabled = true; btn.textContent = "Syncing…"; }
  try {
    // 1. Fetch remote
    const r = await fetch(SYNC_URL(cfg.binId) + "/latest", {
      headers: { "X-Master-Key": cfg.key },
    });
    if (!r.ok) throw new Error("Fetch failed: HTTP " + r.status);
    const remote = await r.json();
    const remoteRec = (remote && remote.record) || {};
    const remoteExpenses = Array.isArray(remoteRec.expenses) ? remoteRec.expenses : [];
    const remoteTombs = Array.isArray(remoteRec.tombstones) ? remoteRec.tombstones : [];

    // 2. Local state
    const localExpenses = liveRead();
    const localTombs = tombRead();

    // 3. Merge tombstones (union), then filter both sides
    const mergedTombs = Array.from(new Set([...localTombs, ...remoteTombs]));
    const tombSet = new Set(mergedTombs);

    // 4. Merge expenses by id — local wins on duplicate (edits stay local until synced)
    const byId = new Map();
    for (const e of remoteExpenses) if (!tombSet.has(e.id)) byId.set(e.id, e);
    for (const e of localExpenses) if (!tombSet.has(e.id)) byId.set(e.id, e);
    const merged = Array.from(byId.values()).sort((a, b) => (a.date + a.id).localeCompare(b.date + b.id));

    // 5. Write merged locally
    liveWrite(merged);
    tombWrite(mergedTombs);

    // 6. Push merged upstream (single PUT — small payload, atomic)
    const payload = {
      expenses: merged,
      tombstones: mergedTombs,
      updatedAt: Date.now(),
      device: (cfg.label || "unknown"),
    };
    const p = await fetch(SYNC_URL(cfg.binId), {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Master-Key": cfg.key },
      body: JSON.stringify(payload),
    });
    if (!p.ok) throw new Error("Push failed: HTTP " + p.status);

    syncMetaSave({ lastSyncAt: Date.now(), count: merged.length });
    toast(`Synced · ${merged.length} entries`);
    render();
  } catch (e) {
    console.error("sync failed:", e);
    toast("⚠️ Sync failed: " + (e.message || "network"));
    if (btn) { btn.disabled = false; btn.textContent = "Sync now"; }
  }
}

function syncSetup() {
  const cur = syncCfg() || {};
  const binId = prompt("JSONBin.io bin ID (from your bin's URL):", cur.binId || "");
  if (binId === null) return;
  const key = prompt("JSONBin.io Master Key (from your account):", cur.key || "");
  if (key === null) return;
  const label = prompt("Label for this device (e.g. 'Gowri iPhone'):", cur.label || "");
  if (label === null) return;
  const trimmed = { binId: binId.trim(), key: key.trim(), label: (label || "").trim() };
  if (!trimmed.binId || !trimmed.key) {
    toast("Sync setup cancelled — bin ID + key required");
    return;
  }
  const ok = syncCfgSave(trimmed);
  toast(ok ? "Sync configured · run Sync now" : "Could not save sync config");
  render();
}
function syncDisconnect() {
  if (!confirm("Disconnect sync? Local expenses stay put.")) return;
  syncCfgClear();
  toast("Sync disconnected");
  render();
}
/* Generate a pairing link containing the sync config in the URL fragment
   (hashes are client-side only, never sent to any server). AirDrop or
   iMessage it to the other device — one tap and they're paired. */
async function syncPairLink() {
  const cfg = syncCfg();
  if (!cfg) { toast("Set up sync first"); return; }
  // Only the binId + key travel — the label is device-specific.
  const packet = { binId: cfg.binId, key: cfg.key };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(packet))));
  const base = location.href.replace(/#.*$/, "").replace(/\?.*$/, "");
  const url = `${base}#pair=${encoded}`;
  const title = "Arctic → Alpine — pair sync";
  const text = "Tap to pair this device with our expense log.";
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }
  } catch (_) { /* user cancelled — fall through */ }
  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    toast("Pair link copied · paste in iMessage/AirDrop");
  } catch (_) {
    prompt("Copy this link and send it to the other phone:", url);
  }
}
/* Called from applyLocationHash() when the URL contains #pair=... */
function syncApplyPairing(encoded) {
  let packet;
  try {
    packet = JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch (_) { toast("Pair link is invalid"); return; }
  if (!packet || !packet.binId || !packet.key) { toast("Pair link is invalid"); return; }
  const cur = syncCfg();
  if (cur && cur.binId === packet.binId && cur.key === packet.key) {
    toast("Already paired · syncing");
    // Jump to Live tab and sync
    S.view = "book"; S.bk = 5; S.day = null; setTab("book");
    render();
    setTimeout(() => syncNow(), 250);
    return;
  }
  const label = prompt("Pairing detected. Label this device (e.g. 'Wife iPhone'):", "");
  if (label === null) { toast("Pairing cancelled"); return; }
  const cfg = { binId: packet.binId, key: packet.key, label: (label || "").trim() || "this device" };
  const ok = syncCfgSave(cfg);
  if (!ok) { toast("⚠️ Could not save — storage refused"); return; }
  // Clear the fragment so a reload doesn't re-prompt
  if (history.replaceState) history.replaceState(null, "", location.pathname);
  toast(`Paired as "${cfg.label}" · syncing`);
  S.view = "book"; S.bk = 5; S.day = null; setTab("book");
  render();
  setTimeout(() => syncNow(), 250);
}
/* Auto-sync on Live tab open — throttled so bouncing tabs doesn't hammer the bin.
   Runs at most every 60 seconds; silent on failure (the manual button gives a
   toast). Requires sync configured and the browser reporting online. */
let _lastAutoSync = 0;
function maybeAutoSync() {
  const cfg = syncCfg();
  if (!cfg || !navigator.onLine) return;
  const now = Date.now();
  if (now - _lastAutoSync < 60_000) return;
  _lastAutoSync = now;
  setTimeout(() => { syncNow().catch(() => {}); }, 300);
}
function relativeTimeShort(ts) {
  if (!ts) return "never";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

/* JSON export — more useful than CSV for re-import; keeps ids intact. */
function liveExportJSON() {
  const list = liveRead();
  if (!list.length) return toast("Nothing to export yet");
  const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bohemia-expenses-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function liveDelete(id) {
  const list = liveRead().filter((e) => e.id !== id);
  liveWrite(list);
  tombAdd(id); // remember the delete so sync doesn't re-inject from the other device
  render();
}
function liveExport() {
  const list = liveRead();
  if (!list.length) return toast("Nothing to export yet");
  const rows = [["date", "amount", "currency", "category", "note", "aud"]]
    .concat(list.map((e) => [e.date, e.amt, e.ccy, e.cat, e.note.replace(/[\r\n,]/g, " "), (e.amt * (FX[e.ccy] || 1)).toFixed(2)]))
    .map((r) => r.join(",")).join("\n");
  const blob = new Blob([rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bohemia-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function todayLocal() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
/* Compact spend chip on the day view — shows what you've logged today,
   quick-adds a common band, or jumps to Bookings → Live. */
function daySpendChip(d) {
  const iso = dayIsoFor(d);
  if (!iso) return "";
  const spent = liveSpendForDay(iso);
  const items = liveRead().filter((e) => e.date === iso);
  const chip = spent > 0
    ? `<b>$${Math.round(spent).toLocaleString("en-AU")}</b> · ${items.length} entr${items.length === 1 ? "y" : "ies"}`
    : `<b>$0</b> logged`;
  return `<button class="day-spend" onclick="goLive('${iso}')">
    <span class="ds-lab">${I.copy}Spend today</span>
    <span class="ds-val">${chip}</span>
    <span class="ds-more">Log →</span>
  </button>`;
}
/* Jump straight to Bookings → Live and prefill the date. */
function goLive(iso) {
  S.view = "book";
  S.bk = 5; // Live tab
  S.day = null;
  setTab("book");
  render();
  window.scrollTo(0, 0);
  setTimeout(() => {
    const dt = document.getElementById("lv-date");
    if (dt) { dt.value = iso; document.getElementById("lv-amt").focus(); }
  }, 60);
}
/* Total live spend in AUD for a specific YYYY-MM-DD (used by the day-view chip). */
function liveSpendForDay(iso) {
  return liveRead()
    .filter((e) => e.date === iso)
    .reduce((s, e) => s + e.amt * (FX[e.ccy] || 1), 0);
}
/* Convert a data.js day.date ("Wed 30 Sep") to ISO for the current trip year. */
function dayIsoFor(d) {
  const m = d.date.match(/(\d+)\s+(\w+)/);
  if (!m) return null;
  const mon = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }[m[2]];
  if (!mon) return null;
  return `2026-${String(mon).padStart(2, "0")}-${String(+m[1]).padStart(2, "0")}`;
}
/* Live sub-view — kept in state so a re-render preserves what the user chose. */
if (typeof S.lv === "undefined") S.lv = "cat";  // "cat" | "day" | "plan"
function setLiveView(v) { S.lv = v; render(); }

function vLive() {
  const list = liveRead().slice().sort((a, b) => (b.date + b.id).localeCompare(a.date + a.id));
  const today = todayLocal();
  const catTotals = {};
  const dayTotals = {};
  let grandAUD = 0;
  list.forEach((e) => {
    const aud = e.amt * (FX[e.ccy] || 1);
    catTotals[e.cat] = (catTotals[e.cat] || 0) + aud;
    dayTotals[e.date] = (dayTotals[e.date] || 0) + aud;
    grandAUD += aud;
  });

  // Sync card — always shown at the top so setup / status is one tap away
  const cfg = syncCfg();
  const meta = syncMeta();
  const online = typeof navigator !== "undefined" ? navigator.onLine : true;
  let h = "";
  if (cfg) {
    h += `<div class="lv-sync lv-sync-on">
      <div class="lv-sync-row">
        <div class="lv-sync-lab">
          <span class="lv-sync-dot ${online ? "on" : "off"}"></span>
          Sync · <b>${esc(cfg.label || "this device")}</b>
        </div>
        <button class="lv-sync-btn" id="sync-btn" onclick="syncNow()"${online ? "" : " disabled"}>Sync now</button>
      </div>
      <div class="lv-sync-meta">Last synced ${relativeTimeShort(meta.lastSyncAt)}${meta.count != null ? ` · ${meta.count} entries pooled` : ""} · <button class="lv-sync-link" onclick="syncPairLink()">pair another device</button> · <button class="lv-sync-link" onclick="syncDisconnect()">disconnect</button></div>
    </div>`;
  } else {
    h += `<div class="lv-sync lv-sync-off">
      <div class="lv-sync-row">
        <div class="lv-sync-lab">Sync with another device</div>
        <button class="lv-sync-btn" onclick="syncSetup()">Set up</button>
      </div>
      <div class="lv-sync-meta">Two-tap merge via a private JSONBin.io blob. Free tier, works offline (queues until online).</div>
    </div>`;
  }

  // Quick-add form
  h += `<div class="lv-form">
    <div class="lv-row">
      <input id="lv-amt" class="lv-in lv-amt" type="number" inputmode="decimal" step="0.01" placeholder="0.00">
      <select id="lv-ccy" class="lv-in lv-ccy">
        ${Object.keys(FX).map((c) => `<option value="${c}"${c === "NOK" ? " selected" : ""}>${c}</option>`).join("")}
      </select>
      <select id="lv-cat" class="lv-in lv-cat">
        ${LIVE_CATS.map((c) => `<option>${c}</option>`).join("")}
      </select>
    </div>
    <div class="lv-row">
      <input id="lv-date" class="lv-in lv-date" type="date" value="${today}">
      <input id="lv-note" class="lv-in lv-note" placeholder="Note (optional)">
    </div>
    <button class="lv-add" onclick="liveAdd()">Add expense</button>
  </div>`;

  if (!list.length) {
    h += `<div class="lv-empty">No expenses yet. Add one above and it'll show up here — saved on this device only.</div>`;
    return h;
  }

  // Sub-view segmented control (By category · By day · Vs plan)
  const modes = [
    ["cat", "By category"],
    ["day", "By day"],
    ["plan", "Vs plan"],
  ];
  h += `<div class="lv-seg">` +
    modes.map(([id, label]) =>
      `<button class="${S.lv === id ? "on" : ""}" onclick="setLiveView('${id}')">${label}</button>`
    ).join("") +
    `</div>`;

  // Always-on total pill
  h += `<div class="lv-glance">
    <div class="lv-g-row lv-g-net"><span>Live spend so far</span><b>$${Math.round(grandAUD).toLocaleString("en-AU")}</b></div>`;

  if (S.lv === "cat") {
    // Category totals
    h += Object.entries(catTotals).sort((a, b) => b[1] - a[1]).map(([k, v]) =>
      `<div class="lv-g-row"><span>${esc(k)}</span><b>$${Math.round(v).toLocaleString("en-AU")}</b></div>`
    ).join("");
    h += `</div>`;
  } else if (S.lv === "day") {
    // Day totals — descending date
    h += Object.entries(dayTotals).sort((a, b) => b[0].localeCompare(a[0])).map(([k, v]) =>
      `<div class="lv-g-row"><span>${esc(k)}</span><b>$${Math.round(v).toLocaleString("en-AU")}</b></div>`
    ).join("");
    h += `</div>`;
  } else {
    // Vs plan — pull totals from DATA.budget and compare
    const { grand: planned, netAfterCashback } = computeBudgetTotals();
    const pct = planned ? Math.round((grandAUD / netAfterCashback) * 100) : 0;
    const remaining = netAfterCashback - grandAUD;
    const overBar = pct > 100;
    h += `<div class="lv-g-row"><span>Planned (net after cashback)</span><b>$${Math.round(netAfterCashback).toLocaleString("en-AU")}</b></div>
      <div class="lv-g-row"><span>Committed already</span><b>$${Math.round(planned).toLocaleString("en-AU")}</b></div>
      <div class="lv-g-row"><span>${remaining >= 0 ? "Left on the plan" : "Over the plan"}</span>
        <b class="${remaining < 0 ? "lv-over" : ""}">${remaining >= 0 ? "" : "−"}$${Math.abs(Math.round(remaining)).toLocaleString("en-AU")}</b></div>
    </div>
    <div class="lv-bar"><div class="lv-bar-fill ${overBar ? "over" : ""}" style="width:${Math.min(pct, 100)}%"></div></div>
    <div class="lv-bar-lab">${pct}% of the planned budget spent live · commitments already booked are separate</div>`;
  }

  // Item list — full detail regardless of segment
  h += `<div class="lv-list">` +
    list.map((e) => {
      const aud = Math.round(e.amt * (FX[e.ccy] || 1));
      return `<div class="lv-item">
        <div class="lv-item-l">
          <div class="lv-item-top">
            <span class="lv-item-cat">${esc(e.cat)}</span>
            <span class="lv-item-date">${esc(e.date)}</span>
          </div>
          ${e.note ? `<div class="lv-item-note">${esc(e.note)}</div>` : ""}
        </div>
        <div class="lv-item-r">
          <div class="lv-item-amt">${esc(e.ccy)} ${e.amt.toLocaleString("en-AU", { maximumFractionDigits: 2 })}</div>
          <div class="lv-item-aud">$${aud.toLocaleString("en-AU")}</div>
        </div>
        <button class="lv-item-x" onclick="liveDelete('${e.id}')" aria-label="Delete">×</button>
      </div>`;
    }).join("") +
    `</div>`;
  // Storage status + backup tools
  const probe = liveStorageProbe();
  const statusMsg = probe === "ok"
    ? `Storage OK · ${list.length} ${list.length === 1 ? "entry" : "entries"} saved on this device`
    : probe === "refused"
      ? "⚠️ Storage refused — you're probably in Safari private mode or the site was cleared by ITP. Add the app to your Home Screen to fix this."
      : "⚠️ localStorage unavailable — nothing is being persisted this session.";
  h += `<div class="lv-tools">
    <button class="lv-tool" onclick="liveExport()">Export CSV</button>
    <button class="lv-tool" onclick="liveExportJSON()">Export JSON (backup)</button>
    <button class="lv-tool" onclick="liveImport()">Import JSON</button>
  </div>
  <div class="lv-status lv-status-${probe}">${statusMsg}</div>`;
  return h;
}

/* ---------- regional food dictionary ---------- */
const DISHES = [
  {
    c: "Denmark 🇩🇰",
    accent: "var(--fjord)",
    notes:
      "Rye bread as a plate; pork; open sandwiches; strong coffee; cinnamon buns everywhere.",
    items: [
      {
        n: "Smørrebrød",
        g: "open sandwich",
        p: "80–140 DKK · $17–29",
        d: "Rye bread piled with pickled herring, roast beef with remoulade, or shrimp with lemon. Torvehallerne's Hallernes stall does the traditional versions.",
      },
      {
        n: "Frikadeller",
        g: "pork meatballs",
        p: "90–140 DKK",
        d: "Pan-fried pork or veal meatballs with brown gravy and potatoes. Every canteen and every home makes them.",
        avoid: "pork",
      },
      {
        n: "Stegt flæsk",
        g: "crispy pork with parsley sauce",
        p: "150–200 DKK",
        d: "Officially voted Denmark's national dish in 2014. Slabs of crackling pork with new potatoes and a creamy parsley sauce.",
        avoid: "pork",
      },
      {
        n: "Kanelsnegle",
        g: "cinnamon snail",
        p: "25–40 DKK",
        d: "The Danish cardamom-and-cinnamon roll. Sonny on Rådhusstræde does one of the best. Better than what you know as a cinnamon bun.",
      },
      {
        n: "Wienerbrød",
        g: '"Danish pastry"',
        p: "25–45 DKK",
        d: 'The pastry the world knows as Danish — but here it\'s called "Viennese bread" because the recipe came from Austria in the 1840s.',
      },
      {
        n: "Æbleskiver",
        g: "ball pancakes",
        p: "50–80 DKK",
        d: "Round Danish pancakes dusted with icing sugar and jam, cooked in a special cast-iron pan. Christmas market food, but Tivoli sells them year-round.",
      },
    ],
  },
  {
    c: "Norway 🇳🇴",
    accent: "var(--dawn)",
    notes:
      "Fish, lamb, brown cheese, and everything smoked. Expensive — expect 30–50% above home.",
    items: [
      {
        n: "Skrei",
        g: "winter cod",
        p: "250–400 NOK · $35–55",
        d: "The Lofoten winter cod. In October you'll find frozen skrei on most menus in Lofoten and Bergen — poached with parsley butter, served with potatoes.",
      },
      {
        n: "Fårikål",
        g: "lamb and cabbage",
        p: "220–320 NOK",
        d: "Norway's national dish. Lamb slow-cooked with cabbage and peppercorns for hours. October is peak Norwegian lamb season.",
      },
      {
        n: "Brunost / Geitost",
        g: "brown goat cheese",
        p: "30–60 NOK a slice",
        d: "Caramelised whey cheese — sweet, dense, unlike anything else. Undredal's hand-made version on Day 11 is the real thing. Slice thin.",
      },
      {
        n: "Rakfisk",
        g: "fermented trout",
        p: "260–400 NOK",
        d: "Not for the tentative. Freshwater trout salt-fermented for 2–3 months. Served raw with flatbread and sour cream. Peak season is autumn — you're in it.",
      },
      {
        n: "Krumkake",
        g: "cone waffle",
        p: "20–40 NOK",
        d: "Thin embossed waffle rolled into a cone, filled with whipped cream. Traditional Norwegian coffee-table pastry.",
      },
      {
        n: "Reker",
        g: "North Sea shrimp",
        p: "150–220 NOK",
        d: "Small sweet cold-water prawns eaten with mayonnaise on white bread. Bergen fish market at lunch.",
      },
    ],
  },
  {
    c: "Germany (Bavaria) 🇩🇪",
    accent: "var(--gold)",
    notes:
      "Pork, beer, pretzels, and one universal dumpling shape. Sunday closures — plan lunch.",
    items: [
      {
        n: "Schweinshaxe",
        g: "roast pork knuckle",
        p: "€18–26",
        d: "Whole pork knuckle roasted until the skin blisters into crackling. A single portion feeds two. Order with dumplings and sauerkraut.",
        avoid: "pork",
      },
      {
        n: "Weißwurst",
        g: "white sausage",
        p: "€3–5 each",
        d: "Bavarian veal-and-pork sausage eaten only before noon — traditionally with sweet mustard, a pretzel and a wheat beer. Peel the skin before eating.",
        avoid: "veal + pork",
      },
      {
        n: "Kaiserschmarrn",
        g: '"emperor\'s mess"',
        p: "€8–14",
        d: "Torn-up fluffy pancake with icing sugar, raisins and stewed plum compote. Named for Emperor Franz Joseph, who apparently loved it. Alpine hut classic.",
      },
      {
        n: "Käsespätzle",
        g: "cheese noodles",
        p: "€10–14",
        d: "Hand-cut egg noodles baked with alpine cheese and topped with fried onions. Southern Germany's mac-and-cheese, and gluten-heavy — order for two.",
      },
      {
        n: "Brezel",
        g: "soft pretzel",
        p: "€1.50–3",
        d: "Bavarian breakfast, snack and beer pairing all in one. Look for a bakery that makes them fresh; supermarket ones are inferior.",
      },
      {
        n: "Apfelstrudel",
        g: "apple strudel",
        p: "€5–8",
        d: "Rolled apple pastry with warm vanilla sauce. Every alpine café worth stopping at.",
      },
    ],
  },
  {
    c: "Austria 🇦🇹",
    accent: "var(--dusk)",
    notes: "Café-house culture invented here. Cake is not optional.",
    items: [
      {
        n: "Wiener Schnitzel",
        g: "veal cutlet",
        p: "€18–28",
        d: "Real Wiener Schnitzel is veal (not pork). Thin, breaded, fried. The pork version is called Schnitzel Wiener Art — legally required to be labelled differently. Chicken (Hühnerschnitzel / Backhendl) is on most menus as a swap.",
        avoid: "veal",
      },
      {
        n: "Zaunerstollen",
        g: "Bad Ischl nougat log",
        p: "€12–20 (small)",
        d: "Konditorei Zauner's signature pastry, made in Bad Ischl since 1832. Almond, nougat and wafer. Buy one for the drive to Prague.",
      },
      {
        n: "Sachertorte",
        g: "chocolate cake",
        p: "€5–9 slice",
        d: "Dense chocolate cake with apricot glaze under dark-chocolate icing. The original Sacher recipe is at Hotel Sacher, Vienna — copies are everywhere.",
      },
      {
        n: "Tafelspitz",
        g: "boiled beef",
        p: "€22–34",
        d: "Boiled beef with root vegetables, apple-horseradish sauce, and chive potatoes. Franz Joseph ate it almost every day for 60 years.",
        avoid: "beef",
      },
      {
        n: "Kaiserschmarrn",
        g: "emperor's mess",
        p: "€8–14",
        d: "Also Austrian. Any Salzkammergut Alpine hut serves it.",
      },
      {
        n: "Melange",
        g: "coffee",
        p: "€4–6",
        d: 'Vienna\'s cappuccino equivalent — espresso with steamed milk and foam. Order it "kleiner Brauner" for a small dark version, "großer Melange" for milky.',
      },
    ],
  },
  {
    c: "Czechia 🇨🇿",
    accent: "var(--bohemia)",
    notes: "Cheap. Meat-and-dumpling heavy. Beer is often cheaper than water.",
    items: [
      {
        n: "Svíčková",
        g: "beef in cream sauce",
        p: "220–320 CZK · $14–20",
        d: "Beef sirloin in a creamy root-vegetable sauce with cranberry jam and bread dumplings. The national dish.",
        avoid: "beef",
      },
      {
        n: "Vepřo knedlo zelo",
        g: "pork, dumplings, cabbage",
        p: "180–280 CZK",
        d: "The other national dish. Roast pork with houskový knedlík (bread dumplings) and stewed sauerkraut. Every pub.",
        avoid: "pork",
      },
      {
        n: "Trdelník",
        g: "chimney cake",
        p: "80–150 CZK",
        d: "Actually not traditionally Czech — Slovak/Hungarian import that took over Prague in the 2000s. Tourists love it. Locals shrug.",
      },
      {
        n: "Chlebíčky",
        g: "open sandwiches",
        p: "25–60 CZK each",
        d: "Bread rounds topped with ham, egg, potato salad. Cafeteria staple. Sisters of the Danish smørrebrød.",
      },
      {
        n: "Pilsner Urquell",
        g: "the original pilsner",
        p: "40–70 CZK",
        d: 'The city of Plzeň invented the pilsner in 1842. In Prague, the real thing on tap costs less than a bottle of water. Ask for "unfiltered" (nefiltrovaný) if you see it.',
      },
      {
        n: "Palačinky",
        g: "crêpes",
        p: "80–150 CZK",
        d: "Czech crêpes filled with jam, quark or Nutella. Universal children's dessert.",
      },
    ],
  },
];
function vDishes() {
  const legend = `<p class="intro" style="margin:0 0 14px;color:var(--ink2);font-size:13px">
    <span class="avoid-chip">🚫 not for us</span> marks dishes with beef, pork or veal —
    kept in so you know what you're being offered.
  </p>`;
  return legend + DISHES.map(
    (country) =>
      `
    <div class="grph" style="color:${country.accent}">${esc(country.c)}</div>
    <p class="intro" style="margin-top:0">${esc(country.notes)}</p>
    <div class="dishes">` +
      country.items
        .map(
          (it) => `<div class="dish${it.avoid ? " dish-avoid" : ""}">
      <div class="dn">${esc(it.n)}<span class="dg">${esc(it.g)}</span>${
        it.avoid ? `<span class="avoid-chip">🚫 ${esc(it.avoid)}</span>` : ""
      }</div>
      <div class="dp">${esc(it.p)}</div>
      <div class="dd">${fmt(it.d)}</div>
    </div>`,
        )
        .join("") +
      `</div>`,
  ).join("");
}

function vInfo() {
  const tabs = ["Light", "Food", "Dishes", "Shops", "Packing", "Child"];
  let h =
    `<div class="sect fade"><h2>Guide</h2>
    <div class="seg"><div class="thumb" style="--n:${S.seg};width:calc((100% - 6px)/${tabs.length})"></div>` +
    tabs
      .map(
        (t, i) =>
          `<button class="${S.seg === i ? "on" : ""}" onclick="S.seg=${i};render()">${t}</button>`,
      )
      .join("") +
    `</div>`;

  if (S.seg === 0) {
    h +=
      `<div class="card" style="margin-top:12px"><div class="lab">${I.cam}Sunrise &amp; sunset</div>
      <table class="lt"><tbody>` +
      DATA.light
        .map(
          (r) =>
            `<tr><td>${esc(r[0])}</td><td class="tm r">${esc(r[1])}</td><td>${esc(r[2])}</td>
       <td class="tm s">${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`,
        )
        .join("") +
      `</tbody></table></div>`;
  }
  if (S.seg === 1) h += groupsHTML(DATA.food);
  if (S.seg === 2) h += vDishes();
  if (S.seg === 3) h += groupsHTML(DATA.grocery);
  if (S.seg === 4)
    h +=
      DATA.wearGroups && DATA.wearGroups.length
        ? groupsHTML(DATA.wearGroups)
        : listHTML(DATA.wear);
  if (S.seg === 5) {
    // Kid-mode toggle sits at the top of the Child tab.
    const on = S.kidMode;
    h += `<div class="card fade" style="margin-top:12px">
      <div class="lab">${I.kite || ""}Kid mode</div>
      <div class="muted" style="font-size:13.5px;margin-bottom:12px">
        Filter every day down to the parts that matter for the toddler —
        highlights she'll remember, food stops, afternoons and any safety warnings.
        Dawn shoots, drive detail and adult tips are hidden.
      </div>
      <button class="chip kid-toggle ${on ? "on" : ""}"
        onclick="setKidMode(${on ? "false" : "true"})">
        ${on ? "✓ Kid mode on — tap to turn off" : "Turn kid mode on"}
      </button>
    </div>`;
    h += listHTML(DATA.kid);
  }
  // Force-refresh utility — sits at the bottom of every Guide tab.
  h += `<div class="card fade" style="margin-top:24px"><div class="lab">${I.warn}App cache</div>
    <div class="muted" style="font-size:13.5px;margin-bottom:12px">
      If the app is behaving oddly or you know an update was pushed but you're not seeing it,
      force-refresh — this clears the local cache and reloads fresh.
    </div>
    <button class="chip" style="background:rgba(232,115,90,.14);color:var(--warn);border:.5px solid rgba(232,115,90,.3)"
      onclick="forceRefresh()">${I.warn}Force refresh</button>
    <div class="tiny" id="cacheVer" style="margin-top:10px">cache: loading…</div>
  </div>`;
  return h + "</div>";
}

/* ---------- magazine-cover animations ---------- */
/* magCountedOnce keeps the count-up from re-triggering on every
   render() (the 60-s tick, tab switch, resume). We animate exactly
   once per session; subsequent renders just show the final number. */
let magCountedOnce = true; /* skip count-up — was flickering */
/* heroLoadedOnce — after first successful load, subsequent renders skip
   the fade-in so the cover no longer flickers on tab switches. Kept on
   window so the inline onload handler can flip it. */
if (typeof window.heroLoadedOnce === "undefined") window.heroLoadedOnce = false;
function magAnimate() {
  const el = document.getElementById("magCdNum");
  if (!el) return;
  const target = parseInt(el.dataset.target || "0", 10);
  if (magCountedOnce) {
    el.textContent = String(target);
    // reveal below-fold sections instantly on re-renders (no flicker)
    document.querySelectorAll(".reveal").forEach((x) => x.classList.add("on"));
    return;
  }
  magCountedOnce = true;
  const dur = 1400;
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(ease(t) * target);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = String(target);
  }
  requestAnimationFrame(step);
  // IntersectionObserver for the first-time reveal-on-scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal:not(.on)").forEach((x) => io.observe(x));
}

/* Clear the service-worker cache and hard-reload.
   Handy on phones where clearing site data is buried in system Settings. */
async function forceRefresh() {
  if (!confirm("This will clear the app cache and reload. Proceed?")) return;
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch (_) {}
  // add a query-string cachebuster and reload
  const url = new URL(location.href);
  url.searchParams.set("nc", Date.now().toString(36));
  location.replace(url.toString());
}
/* Show the current cache version — helpful for debugging staleness */
async function updateCacheVer() {
  const el = document.getElementById("cacheVer");
  if (!el) return;
  try {
    const keys = "caches" in window ? await caches.keys() : [];
    el.textContent = keys.length
      ? "cache: " + keys.join(", ")
      : "cache: (none)";
  } catch (_) {
    el.textContent = "cache: (unavailable)";
  }
}
function groupsHTML(groups) {
  return groups
    .map(
      (g) =>
        `<div class="grph">${esc(g.head)}</div>` +
        g.rows
          .map(
            (r) =>
              `<div class="bk"><div class="w">${esc(r.when).split("\n").join("<br>")}</div>
     <div class="b"><div class="n">${esc(r.name)}</div>
     <div class="d">${fmt(r.detail)}</div></div></div>`,
          )
          .join(""),
    )
    .join("");
}
function listHTML(sec) {
  if (!sec) return "";
  let h = sec.intro
    ? `<p class="intro" style="margin-top:12px">${fmt(sec.intro)}</p>`
    : "";
  h += '<ul class="pl" style="margin-top:8px">';
  sec.items.forEach((it) => {
    if (it.k === "h") {
      h += `</ul><div class="grph">${esc(it.t)}</div><ul class="pl">`;
    } else h += `<li>${fmt(it.t)}</li>`;
  });
  return h + "</ul>";
}

/* ---------- actions & motion ---------- */
let nextAnim = "anim-pop"; // transition to play on next render
function openDay(i) {
  nextAnim = "anim-l";
  S.day = i;
  S.view = "days";
  setTab("days");
  render();
  window.scrollTo(0, 0);
}
function navigateDay(delta) {
  const t = S.day + delta;
  if (t < 0 || t >= DATA.days.length) return;
  nextAnim = delta > 0 ? "anim-l" : "anim-r";
  S.day = t;
  render();
  window.scrollTo(0, 0);
}
function backToDays() {
  nextAnim = "anim-r";
  S.day = null;
  render();
  window.scrollTo(0, 0);
}
function copyRef(t) {
  navigator.clipboard
    ?.writeText(t)
    .then(() => toast("Copied " + t))
    .catch(() => toast(t));
}
function setTab(v) {
  document
    .querySelectorAll(".tab")
    .forEach((b) => b.classList.toggle("on", b.dataset.v === v));
  $("tabInd").style.setProperty("--tab-i", TAB_INDEX[v] ?? 0);
}

function render() {
  let h = "";
  if (S.view === "today") h = vToday();
  else if (S.view === "days") h = S.day != null ? vDay(S.day) : vDays();
  else if (S.view === "book") h = vBook();
  else h = vInfo();
  V.innerHTML = h;
  V.classList.remove("anim-l", "anim-r", "anim-pop");
  void V.offsetWidth;
  V.classList.add(nextAnim);
  nextAnim = "anim-pop";
  const idx = currentIndex();
  $("tSub").textContent =
    idx >= 0
      ? DATA.days[idx].date + " · day " + (idx + 1) + " of " + DATA.days.length
      : daysUntil() > 0
        ? daysUntil() + " days to go"
        : "27 Sep – 19 Oct 2026";
  $("progBar").style.width = (tripProgress() * 100).toFixed(1) + "%";
  // real-earth map — init or re-init as needed
  if (document.getElementById("jmap-real")) {
    // small delay so the container has laid out
    requestAnimationFrame(() => initJourneyMap());
  }
  // show cache version in the guide tab
  if (document.getElementById("cacheVer")) updateCacheVer();
  // magazine cover animations — count-up numeral + reveal-on-scroll
  if (document.getElementById("magCdNum")) requestAnimationFrame(magAnimate);
  // top-bar progress ring
  const p = tripProgress();
  const pr = $("pringFg");
  if (pr) pr.style.strokeDashoffset = (1 - p).toFixed(3);
  const pt = $("pringTxt");
  if (pt) {
    const until = daysUntil();
    if (idx < 0 && until > 0) pt.textContent = "T-" + until;
    else if (p >= 1) pt.textContent = "✓";
    else pt.textContent = Math.round(p * 100) + "%";
  }
}

/* ---------- long-press to mark a day done, tap to open ---------- */
/* Delegated to #app so it survives every re-render — .drow rows have
   data-day-idx and we pick up the event as it bubbles. */
(() => {
  let pressTimer = null;
  let pressTarget = null;
  let longFired = false;
  const HOLD_MS = 500;

  const cancelPress = () => {
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
    if (pressTarget) pressTarget.classList.remove("pressing");
    pressTarget = null;
  };

  const app = $("app");
  app.addEventListener("pointerdown", (e) => {
    const row = e.target.closest(".drow[data-day-idx]");
    if (!row) return;
    longFired = false;
    pressTarget = row;
    row.classList.add("pressing");
    pressTimer = setTimeout(() => {
      longFired = true;
      const idx = parseInt(row.dataset.dayIdx, 10);
      const d = DATA.days[idx];
      if (d) toggleDayDone(d);
      cancelPress();
    }, HOLD_MS);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((evt) =>
    app.addEventListener(evt, cancelPress),
  );
  app.addEventListener("click", (e) => {
    const row = e.target.closest(".drow[data-day-idx]");
    if (!row) return;
    if (longFired) { longFired = false; e.preventDefault(); e.stopPropagation(); return; }
    const idx = parseInt(row.dataset.dayIdx, 10);
    if (!isNaN(idx)) openDay(idx);
  });
  /* also allow scrolling to cancel */
  app.addEventListener("touchmove", cancelPress, { passive: true });
})();

document.querySelectorAll(".tab").forEach((b) => {
  b.onclick = () => {
    S.view = b.dataset.v;
    S.day = null;
    setTab(b.dataset.v);
    render();
    window.scrollTo(0, 0);
    if (history.replaceState) history.replaceState(null, "", "#" + b.dataset.v);
  };
});

/* Home-screen shortcut deep links — #today / #days / #book / #search
   Also handles #pair=<base64> hand-off from the primary device. */
function applyLocationHash() {
  const h = (location.hash || "").replace(/^#/, "");
  if (h.startsWith("pair=")) {
    syncApplyPairing(h.slice(5));
    return;
  }
  if (h === "search") {
    S.view = "days";
    setTab("days");
    render();
    const s = $("srch");
    s.style.display = "block";
    s.focus();
    return;
  }
  if (["today", "days", "book", "info"].includes(h)) {
    S.view = h;
    S.day = null;
    setTab(h);
    render();
    window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", applyLocationHash);
applyLocationHash();
$("btnSearch").onclick = () => {
  const s = $("srch");
  const showing = s.style.display !== "none";
  s.style.display = showing ? "none" : "block";
  if (!showing) s.focus();
  else {
    S.q = "";
    s.value = "";
    render();
  }
};
$("srch").oninput = (e) => {
  S.q = e.target.value;
  S.day = null;
  if (S.view === "today") {
    S.view = "days";
    setTab("days");
  }
  render();
};

/* ---------- swipe between days ---------- */
let tsx = 0,
  tsy = 0,
  tst = 0;
addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    tsx = t.clientX;
    tsy = t.clientY;
    tst = Date.now();
  },
  { passive: true },
);
addEventListener(
  "touchend",
  (e) => {
    if (!(S.view === "days" && S.day != null)) return;
    const t = e.changedTouches[0],
      dx = t.clientX - tsx,
      dy = t.clientY - tsy;
    if (Date.now() - tst > 600) return; // too slow to be a flick
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.7) return; // not a clean horizontal swipe
    navigateDay(dx < 0 ? 1 : -1);
  },
  { passive: true },
);

render();
/* Only re-render on the 60-s tick if we're actually IN the trip
   (the current-day chip needs to keep the sun-bar honest). Pre-trip,
   the countdown is stable within a session and re-rendering just
   restarts every animation. */
setInterval(() => {
  if (S.view === "today" && S.day == null && currentIndex() >= 0) render();
}, 60000);

/* #4 sky-colour: pick colors now, re-check every 10 minutes */
updateSky();
setInterval(updateSky, 10 * 60 * 1000);

/* #3 weather + #5 aurora live fetch — non-blocking, re-render on arrival */
loadWeather();
loadKp();
setInterval(loadKp, 30 * 60 * 1000); // Kp refreshes every 30 min at NOAA
