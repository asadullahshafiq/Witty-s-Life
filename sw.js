const CACHE='wl-v3';
const ASSETS=['/','./index.html','./manifest.json','./icon-192.svg','./icon-512.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>{if(c)return c;return fetch(e.request).then(r=>{if(r&&r.status===200){const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));}return r;}).catch(()=>c||new Response('Offline',{status:503}))}))});
