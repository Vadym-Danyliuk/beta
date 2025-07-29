const CACHE_NAME = 'hero-v1';
const ASSETS = [
  '/img/hero/banner-mob-1.webp',
  '/img/hero/banner-mob-1.jpg',
  '/css/styles.css',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('/img/hero/')) {
    e.respondWith(
      caches.match(e.request).then(response => response || fetch(e.request))
    );
  }
});
