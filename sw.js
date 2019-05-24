let currentCache = 'service-worker-v2';
let cacheItems = [
    'index.html',
    'restaurant.html',
    '/css',
    '/data/',
    '/img',
    '/js',
    'sw-init.js',
    'sw.js'
];

self.addEventListener('install', function(e) {
    
        caches.open(currentCache).then((cache) => {
            return cache.addAll(cacheItems);
        })
    

});

self.addEventListener('activate', function(e) {
    if(currentCache.match(e.request)){
        e.waitUntill(
            caches.keys().then((allCaches) => {
                return Promise.all(
                    allCaches.filter((cache) => {
                        return cache !== currentCache;
                    })
                    .map((cache) => {
                        return caches.delete(cache);
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            })
    
        );
    }

});

self.addEventListener('fetch', function(e) {
    e.respondWith(//takes reponse object return response obj
        caches.open(currentCache).then(
            function(cache) {
                return cache.match(e.request).then((res) => {
                    return res || fetch(e.request).then((res) => {
                        // adding new request to the cache.
                        cache.put(e.request, res.clone());
                        return res;
                    })
                })
            }
        )
    )
});