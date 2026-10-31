/* 醫師回覆 APP：背景推播通知 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {} } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || '📩 有新的表單需要回覆', {
    body: d.body || '請打開「醫師回覆」APP 填寫並簽章', icon: 'icon-192.png', badge: 'icon-192.png', tag: 'pdfdoctor', renotify: true, data: { url: self.registration.scope }
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope)) { c.postMessage('refresh'); return c.focus() }
    return self.clients.openWindow(self.registration.scope);
  }));
});
self.addEventListener('fetch', () => {});
