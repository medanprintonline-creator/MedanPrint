const CACHE_NAME = 'medanprint-v2';
const urlsToCache = [
  // Halaman utama
  '/',
  '/index.html',
  '/layanan.html',
  '/cara-order.html',
  '/kontak.html',
  '/blog.html',
  '/testimoni.html',
  '/faq.html',
  
  // Artikel blog
  '/cara-print-pdf-dari-hp.html',
  '/cara-menggabungkan-file-pdf.html',
  '/format-skripsi-yang-benar.html',
  '/keunggulan-print-warna-tahan-air.html',
  '/order-print-via-whatsapp.html',
  '/jenis-jilid-ring-kawat-glue.html',
  '/cetak-pas-foto-medan.html',
  '/cetak-stempel-otomatis.html',
  '/cetak-denah-foto-besar.html',
  
  // CSS & JS
  '/css/style.css',
  '/js/main.js',
  
  // Gambar penting
  '/images/logo.png',
  '/images/favicon.ico',
  '/images/og-image.jpg',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/qris.png',
  
  // Gambar avatar (opsional, bisa di-cache atau tidak)
  '/images/avatar1.jpg',
  '/images/avatar2.jpg',
  '/images/avatar3.jpg',
  '/images/avatar4.jpg',
  '/images/avatar5.jpg',
  '/images/avatar6.jpg',
  
  // Gambar blog
  '/images/blog-print-pdf-hp.jpg',
  '/images/blog-gabung-pdf.jpg',
  '/images/blog-format-skripsi.jpg',
  '/images/blog-print-warna.jpg',
  '/images/blog-order-wa.jpg',
  '/images/blog-jilid.jpg',
  '/images/blog-pas-foto.jpg',
  '/images/blog-stempel.jpg',
  '/images/blog-denah.jpg'
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

// Intercept fetch requests - cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
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
