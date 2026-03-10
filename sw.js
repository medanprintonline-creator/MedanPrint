const CACHE_NAME = 'medanprint-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/layanan.html',
  '/cara-order.html',
  '/kontak.html',
  '/css/style.css',
  '/js/main.js',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// Install service worker dan cache file
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Hapus cache lama saat aktivasi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
