const CACHE = 'arctic-alpine-v16';
const ASSETS = ['./','./index.html','./app.js','./data.js','./manifest.webmanifest',
                './icon-180.png','./icon-192.png','./icon-512.png',
                './history/style.css',
                './history/day-01.html','./history/day-02.html','./history/day-03.html',
                './history/day-04.html','./history/day-05.html','./history/day-06.html',
                './history/day-07.html','./history/day-08.html','./history/day-09.html',
                './history/day-10.html','./history/day-11.html','./history/day-12.html',
                './history/day-13.html','./history/day-14.html','./history/day-15.html',
                './history/day-16.html','./history/day-17.html','./history/day-18.html',
                './history/day-19.html','./history/day-20.html','./history/day-21.html'];
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
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
