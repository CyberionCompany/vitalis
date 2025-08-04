// Define um nome e uma versão para o cache
const CACHE_NAME = 'vitalis-cache-v1';

// Lista de ficheiros essenciais para o app funcionar offline
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/main.js',
  '/logo-192.png',
  '/logo-192.png',
  '/logo-512.png'
];

// Evento de Instalação: guarda os ficheiros em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: serve os ficheiros do cache primeiro
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o ficheiro estiver no cache, retorna-o
        if (response) {
          return response;
        }
        // Se não, vai buscá-lo à rede
        return fetch(event.request);
      }
    )
  );
});