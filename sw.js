const CACHE = 'arctic-alpine-v28';
const ASSETS = ['./','./index.html','./app.js','./data.js','./covers.js','./manifest.webmanifest',
                './icon-180.png','./icon-192.png','./icon-512.png',
                './history/style.css',
                './history/day-01.html','./history/day-02.html','./history/day-03.html',
                './history/day-04.html','./history/day-05.html','./history/day-06.html',
                './history/day-07.html','./history/day-08.html','./history/day-09.html',
                './history/day-10.html','./history/day-11.html','./history/day-12.html',
                './history/day-13.html','./history/day-14.html','./history/day-15.html',
                './history/day-16.html','./history/day-17.html','./history/day-18.html',
                './history/day-19.html','./history/day-20.html','./history/day-21.html',
                './images/day-01.jpg','./images/day-02.jpg','./images/day-03.jpg',
                './images/day-04.jpg','./images/day-05.jpg','./images/day-06.jpg',
                './images/day-07.jpg','./images/day-08.jpg','./images/day-09.jpg',
                './images/day-10.jpg','./images/day-11.jpg','./images/day-12.jpg',
                './images/day-13.jpg','./images/day-14.jpg','./images/day-15.jpg',
                './images/day-16.jpg','./images/day-17.jpg','./images/day-18.jpg',
                './images/day-19.jpg','./images/day-20.jpg','./images/day-21.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Don't intercept cross-origin requests (map tiles, Wikimedia images,
  // Google Fonts) — let the browser handle its own caching.
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      // Only cache successful same-origin responses
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
