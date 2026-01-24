const CACHE_NAME = "hydramusic-v1";

// Arquivos que fazem o app abrir offline
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png"
];

// Instala e salva arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Ativa e limpa cache antigo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições
self.addEventListener("fetch", event => {
  // Não faz cache das músicas (pra não pesar)
  if (event.request.url.includes("/musicas/")) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
