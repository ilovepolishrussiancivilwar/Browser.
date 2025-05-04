self.addEventListener("install", e => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", e => {
  // You could add caching here
});
