self.addEventListener("install", (e) => {
  //   console.log("installed!!");
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./style.css",
        "./request.js",
        "./index.html",
        "./index.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  //   console.log(`intercepting fetch request for: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
