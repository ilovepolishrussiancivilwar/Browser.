// Name of the cache and list of core files to cache
const CACHE_NAME = 'browser-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  // Pre-cache core assets
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // (Optional) Clean up old caches if cache name changed
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  // Try cache first, then network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
