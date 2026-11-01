/* 醫師回覆 APP：背景推播通知 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
const API = 'https://script.google.com/macros/s/AKfycbw-mtqUpmnx5cebffRXbNnJNhDmYhsfywumMYIDFWaAH0e6lOtjoh-AKtYK3dNBNb2v/exec';
function getKey(){ return new Promise(ok => { try { const r = indexedDB.open('pda', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => { try { const q = r.result.transaction('kv').objectStore('kv').get('key'); q.onsuccess = () => ok(q.result || ''); q.onerror = () => ok('') } catch (e) { ok('') } }; r.onerror = () => ok('') } catch (e) { ok('') } }) }
// 推播不帶內容；收到後向系統取回通知文字（例如「王小明 醫師已回覆」）
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let n = { title: '📩 醫師回覆', body: '請打開 APP 查看' };
    try {
      const key = await getKey();
      if (key) { const r = await fetch(API, { method: 'POST', body: JSON.stringify({ fn: 'appNotice', args: [key] }) }); const j = await r.json(); if (j.result) n = j.result }
    } catch (_) {}
    await self.registration.showNotification(n.title, { body: n.body, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'pdfdoctor-' + Date.now(), data: { url: self.registration.scope } });
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope)) { c.postMessage('refresh'); return c.focus() }
    return self.clients.openWindow(self.registration.scope);
  }));
});
// 每次打開都抓最新版畫面（避免手機用到舊版）
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(() => fetch(e.request)));
});
/* sw 1030-v53 */
