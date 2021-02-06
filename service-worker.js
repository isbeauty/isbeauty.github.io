importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;
const {CacheableResponse,CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;
const {skipWaiting, clientsClaim} = workbox.core;

const cdnCacheName = 'cdnProvider';
const maxAgeSeconds = 60 * 60 * 24 * 365;

self.skipWaiting();
clientsClaim();

registerRoute(
  ({ url }) => url.origin === 'https://cdn.jsdelivr.net',
  new CacheFirst({
    cacheName: cdnCacheName,
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
    plugins: [
      new CacheableResponsePlugin({statuses: [0, 200]})
    ],
  })
);