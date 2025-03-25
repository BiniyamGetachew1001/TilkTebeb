// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope)
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error)
      })
  })
}

const CACHE_NAME = "telktibeb-cache-v2"
const OFFLINE_URL = "/offline.html"

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/offline-library",
]

// Install event - precache key assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Helper function to determine if a request is for a book or business plan
const isBookOrBusinessPlan = (url) => {
  const urlObj = new URL(url)
  return urlObj.pathname.startsWith("/books/") || urlObj.pathname.startsWith("/business-plans/")
}

// Helper function to determine if a request is for an API
const isApiRequest = (url) => {
  const urlObj = new URL(url)
  return urlObj.pathname.startsWith("/api/")
}

// Fetch event - enhanced caching strategy
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // For API requests, use network-only strategy
  if (isApiRequest(event.request.url)) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: "You are offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        })
      }),
    )
    return
  }

  // For book and business plan content, use cache-first strategy
  if (isBookOrBusinessPlan(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached response immediately
          return cachedResponse
        }

        // If not in cache, fetch from network and cache
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone()

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })

            return response
          })
          .catch(() => {
            // If fetch fails, return offline page for navigation requests
            if (event.request.mode === "navigate") {
              return caches.match(OFFLINE_URL)
            }

            return new Response("Network error", {
              status: 408,
              headers: { "Content-Type": "text/plain" },
            })
          })
      }),
    )
  } else {
    // For other requests, use network-first strategy
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // If not in cache and it's a navigation request, show offline page
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL)
          }

          // For image requests, return a fallback image
          if (event.request.destination === "image") {
            return caches.match("/placeholder.svg")
          }

          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
    )
  }
})

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-reading-progress") {
    event.waitUntil(syncReadingProgress())
  }
})

// Function to sync reading progress when back online
async function syncReadingProgress() {
  // In a real implementation, this would retrieve pending updates from IndexedDB
  // and send them to the server
  console.log("Syncing reading progress in the background")
}

