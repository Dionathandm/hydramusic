const CACHE_NAME = "hydramusic-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png"
];

// Instala e salva no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativa e limpa cache antigo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Responde offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
