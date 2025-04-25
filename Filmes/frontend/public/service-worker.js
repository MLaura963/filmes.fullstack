const cacheName = 'Filmes PWA';
const assets = [
  '/',
  '/index.html',
  '/filmes.html',
  '/css/index.css',
  '/css/filmes.css',
  '/js/index.js',
  '/js/filmes.js'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request))
  );
});