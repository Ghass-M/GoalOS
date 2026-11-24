/* Goal OS service worker: offline shell + notifications. Bump V when files change. */
const V = 'goalos-v1', FILES = ['./', 'index.html', 'core.js', 'german.js', 'app.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  /* network first so updates arrive, cache when offline */
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
self.addEventListener('push', e => { let d = {}; try { d = e.data.json(); } catch (x) { } e.waitUntil(self.registration.showNotification(d.title || 'Goal OS', { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'goalos' })); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window' }).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow('./'))); });
