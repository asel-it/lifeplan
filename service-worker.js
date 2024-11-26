const CACHE_NAME = "lifeplan-cache-v2"; // Увеличьте версию кэша
const urlsToCache = [
  ".", // Добавляем корневую страницу
  "index.html",
  "css/index.css",
  "js/index.js",
  "images/icons/icon-192x192.png",
  "images/icons/icon-512x512.png",
  "images/image1.png", // Убедитесь, что пути к изображениям правильные
  "images/image2.png",
  "images/image3.png"
];

// Установка и кэширование файлов
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация и удаление старого кэша
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Обработка запросов
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если файл есть в кэше, возвращаем его
      if (response) {
        return response;
      }

      // Если файла нет в кэше, загружаем его с сервера и добавляем в кэш
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
    })
  );
});
