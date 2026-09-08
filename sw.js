const CACHE = "arctic-alpine-v54";
// App-shell filenames: always try network first so code/data updates
// land as soon as you're online. Everything else stays cache-first.
const SHELL = /\/(index\.html|app\.js|data\.js|covers\.js|manifest\.webmanifest)?$/;
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./data.js",
  "./covers.js",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./history/style.css",
  "./history/day-01.html",
  "./history/day-02.html",
  "./history/day-03.html",
  "./history/day-04.html",
  "./history/day-05.html",
  "./history/day-06.html",
  "./history/day-07.html",
  "./history/day-08.html",
  "./history/day-09.html",
  "./history/day-10.html",
  "./history/day-11.html",
  "./history/day-12.html",
  "./history/day-13.html",
  "./history/day-14.html",
  "./history/day-15.html",
  "./history/day-16.html",
  "./history/day-17.html",
  "./history/day-18.html",
  "./history/day-19.html",
  "./history/day-20.html",
  "./history/day-21.html",
  "./images/day-01.jpg",
  "./images/day-02.jpg",
  "./images/day-03.jpg",
  "./images/day-04.jpg",
  "./images/day-05.jpg",
  "./images/day-06.jpg",
  "./images/day-07.jpg",
  "./images/day-08.jpg",
  "./images/day-09.jpg",
  "./images/day-10.jpg",
  "./images/day-11.jpg",
  "./images/day-12.jpg",
  "./images/day-13.jpg",
  "./images/day-14.jpg",
  "./images/day-15.jpg",
  "./images/day-16.jpg",
  "./images/day-17.jpg",
  "./images/day-18.jpg",
  "./images/day-19.jpg",
  "./images/day-20.jpg",
  "./images/day-21.jpg",
  "./images/hero.jpg",
  "./shop/day-01.html",
  "./shop/day-02.html",
  "./shop/day-03.html",
  "./shop/day-04.html",
  "./shop/day-05.html",
  "./shop/day-06.html",
  "./shop/day-07.html",
  "./shop/day-08.html",
  "./shop/day-09.html",
  "./shop/day-10.html",
  "./shop/day-11.html",
  "./shop/day-12.html",
  "./shop/day-13.html",
  "./shop/day-14.html",
  "./shop/day-15.html",
  "./shop/day-16.html",
  "./shop/day-17.html",
  "./shop/day-18.html",
  "./shop/day-19.html",
  "./shop/day-20.html",
  "./shop/day-21.html",
  "./stories/day-01.html",
  "./stories/day-02.html",
  "./stories/day-03.html",
  "./stories/day-04.html",
  "./stories/day-05.html",
  "./stories/day-06.html",
  "./stories/day-07.html",
  "./stories/day-08.html",
  "./stories/day-09.html",
  "./stories/day-10.html",
  "./stories/day-11.html",
  "./stories/day-12.html",
  "./stories/day-13.html",
  "./stories/day-14.html",
  "./stories/day-15.html",
  "./stories/day-16.html",
  "./stories/day-17.html",
  "./stories/day-18.html",
  "./stories/day-19.html",
  "./stories/day-20.html",
  "./stories/day-21.html",
];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) =>
        Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Don't intercept cross-origin requests (map tiles, Wikimedia images,
  // Google Fonts) — let the browser handle its own caching.
  if (url.origin !== self.location.origin) return;

  const isShell = e.request.mode === "navigate" || SHELL.test(url.pathname);
  if (isShell) {
    // Network-first: fresh code/data whenever online, cache as fallback.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(e.request)
            .then((hit) => hit || caches.match("./index.html")),
        ),
    );
    return;
  }
  // Cache-first for everything else (day pages, icons, images).
  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
            }
            return res;
          })
          .catch(() => caches.match("./index.html")),
    ),
  );
});
