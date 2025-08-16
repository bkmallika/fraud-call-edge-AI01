const CACHE_NAME = "fraud-ai-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

// ติดตั้ง Service Worker และ cache ไฟล์
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ดัก fetch request และตอบจาก cache ถ้ามี
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ลบ cache เก่าเวลาอัปเดต SW
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
