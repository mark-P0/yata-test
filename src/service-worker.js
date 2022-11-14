/*  Largely based from the following:
 *  https://www.youtube.com/watch?v=sFsRylCQblw
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.NetworkFirst()
);
