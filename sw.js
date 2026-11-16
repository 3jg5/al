/* عامل خدمة: يجعل الزيارات المتكررة شبه فورية. index/config: الشبكة أولًا (مهلة 1.5ث ثم النسخة المخزنة)، والباقي: المخزن أولًا مع تحديث بالخلفية */
var C="farooq-v1";
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin||r.headers.has("range")||/\.mp3$|admin\.html$|sw\.js$/.test(u.pathname)) return;
  var fresh=r.mode==="navigate"||/(config\.js|\/)$/.test(u.pathname);
  e.respondWith(caches.open(C).then(function(c){return c.match(r).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});
    if(!hit) return net;
    if(!fresh) return hit;
    return Promise.race([net,new Promise(function(ok){setTimeout(function(){ok(hit)},1500)})]);
  })}));
});