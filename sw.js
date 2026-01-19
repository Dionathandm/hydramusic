const CACHE_NAME = 'hydramusic-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  'https://dionathandm.github.io/hydramusic/musicas/A Firma Segue Lucrando_spotdown.org.mp3',
  'https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png'
  // adicione todas as músicas e imagens aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
