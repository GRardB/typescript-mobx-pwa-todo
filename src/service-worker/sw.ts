const VERSION = 1;
const CACHE_NAME = `typescript-todo-pwa-v${VERSION}`;
const URLS_TO_CACHE = [
    '/',
    '/app.js',
];

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
      self.caches.open(CACHE_NAME)
        .then((cache: Cache) => {
          return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        self.caches.match(event.request).then(response => (
            response ? response : self.fetch(event.request)
        ))
    );
});
