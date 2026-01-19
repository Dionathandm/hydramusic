self.addEventListener('install', (event) => {
  self.skipWaiting(); // força nova versão
});

self.addEventListener('activate', (event) => {
  clients.claim(); // assume controle imediatamente
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
