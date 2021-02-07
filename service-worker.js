importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
const {registerRoute, setDefaultHandler, setCatchHandler} = workbox.routing;
const {CacheFirst,NetworkOnly} = workbox.strategies;
const {CacheableResponse,CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;
const {skipWaiting, clientsClaim} = workbox.core;
const {matchPrecache, precacheAndRoute} = workbox.precaching;

const CacheName = 'sWstore';
const maxAgeSeconds = 60 * 60 * 24 * 365;
const FALLBACK_HTML_URL = '/offline/';
self.skipWaiting();
clientsClaim();

precacheAndRoute([
  {url: '/offline/', revision: null },
  {url: '/manifest.json', revision: 210208},
  {url: '/favicon.ico', revision: 210208},
  {url: '/images/logo/icon-192x192.png', revision: 210208},
  {url: '/images/logo/icon-256x256.png', revision: 210208},
  {url: '/images/logo/icon-384x384.png', revision: 210208},
  {url: '/images/logo/icon-512x512.png', revision: 210208},
  {url: '/images/logo/maskable_icon_x512.png', revision: 210208},
]);

setDefaultHandler(new NetworkOnly());

setCatchHandler(async ({ event }) => {
  // Return the precached offline page if a document is being requested
  if (event.request.destination === 'document') {
    return matchPrecache('/offline/');
  }

  return Response.error();
});

registerRoute(
  ({ url }) => url.origin === 'https://cdn.jsdelivr.net' ||
               url.origin === 'https://cdnjs.cloudflare.com',
  new CacheFirst({
    cacheName: CacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds,purgeOnQuotaError: true,
      }),
    ],
  }),
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: CacheName,
    plugins: [
      new CacheableResponsePlugin({statuses: [0, 200]}),
      new ExpirationPlugin({
        maxAgeSeconds,purgeOnQuotaError: true,
      })
    ],
  })
);