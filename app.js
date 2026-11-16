var IMG = { school: "farooq-logo.webp?v=71ccd726", light: "farooq-logo-light.webp?v=035bde14", moe: "moe-logo.webp?v=01707d7c", vision: "oman-2040.webp?v=fa9ae8fa" };
var DIM = { light: [360,438], moe: [160,160], vision: [224,140] };
(function(){
"use strict";
var C = CONFIG, $ = function(s,r){return (r||document).querySelector(s)}, $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var qs = new URLSearchParams(location.search);
var CONN = navigator.connection || {};
var LOW = !!(CONN.saveData || /(^|-)2g$/.test(CONN.effectiveType||"") || (navigator.deviceMemory && navigator.deviceMemory<=2));
function later(f){ if("requestIdleCallback" in window) requestIdleCallback(f,{timeout:2500}); else setTimeout(f,1200) }
function loadScript(src,cb){var s=document.createElement("script");s.src=src;s.async=true;s.onload=function(){cb&&cb()};s.onerror=function(){};document.head.appendChild(s)}
var guestName = (qs.get("n") || "").replace(/[<>]/g,"").slice(0,40);
var AR = new Intl.NumberFormat(["ar-OM-u-nu-arab","ar-u-nu-arab","ar"], {useGrouping:false});
var nA = function(n){return AR.format(n)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function pass(a){return !!a}
/* تحليلات: dataLayer (GTM) + gtag + Plausible + حدث مخصص؛ لا شيء يُرسل إن لم تكن هذه الأدوات موجودة */
function track(n,p){ if(C.analytics===false) return; p=p||{}; try{ (window.dataLayer=window.dataLayer||[]).push(Object.assign({event:n},p)); if(window.gtag) window.gtag("event",n,p); if(window.plausible) window.plausible(n,{props:p}); window.dispatchEvent(new CustomEvent("forum:analytics",{detail:{name:n,params:p}})) }catch(e){} }
var MIME={mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",aac:"audio/aac",ogg:"audio/ogg",oga:"audio/ogg",webm:"audio/webm"};
function mimeOf(f){var m=String(f).split("?")[0].split(".").pop().toLowerCase();return MIME[m]||"audio/mpeg"}
var ICONS = {
 handshake:'<path d="M3 11l4-4 4 2 3-3 7 7-4 4-3-1-2 2a2 2 0 01-3 0l-5-5z"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
 chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
 heart:'<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z"/>',
 people:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M17 14c2.5 0 4.5 2 4.5 4.5"/>',
 vol:'<path d="M4 9v6h4l5 4V5L8 9zM16.500 8.500a5 5 0 010 7M19 6a8.500 8.500 0 010 12"/>',
 mute:'<path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 play:'<path d="M7 4.5v15l13-7.500z" fill="currentColor"/>',
 pause:'<path d="M7 4h4v16H7zM13 4h4v16h-4z" fill="currentColor"/>',
 down:'<path d="M6 9l6 6 6-6"/>',
 check:'<path d="M5 12.5l4.500 4.500L19 7.500"/>',
 wa:'<path d="M20 12a8 8 0 01-11.700 7L4 20l1.100-4.200A8 8 0 1120 12z"/>',
 copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
 share:'<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.300 10.800l7.400-3.600M8.300 13.200l7.400 3.600"/>',
 back:'<path d="M12 5l-7 7 7 7M5 12h14"/>',
 dl:'<path d="M12 4v11m-4-4l4 4 4-4M5 20h14"/>'
};
function ic(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||24)+'" height="'+(s||24)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[n]||ICONS.star)+'</svg>'}

/* ───── التاريخ (توقيت مسقط UTC+4 ثابت) ───── */
function parseEv(){
  var e=C.event; if(!/^\d{4}-\d{2}-\d{2}$/.test(e.date||"")) return null;
  var d=e.date.split("-").map(Number), t=/^\d{1,2}:\d{2}$/.test(e.startTime||"")?e.startTime.split(":").map(Number):[0,0];
  var s=Date.UTC(d[0],d[1]-1,d[2],t[0]-4,t[1]), en=null;
  if(/^\d{1,2}:\d{2}$/.test(e.endTime||"")){var u=e.endTime.split(":").map(Number); en=Date.UTC(d[0],d[1]-1,d[2],u[0]-4,u[1]); if(en<=s) en+=864e5}
  return {start:s,end:en||(s+36e5*2),hasTime:!!e.startTime,d:d};
}
var EV=parseEv();
function fmtDate(ms){return new Intl.DateTimeFormat(["ar-OM-u-nu-arab-ca-gregory","ar-u-nu-arab-ca-gregory","ar"],{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Muscat"}).format(new Date(ms))}
function fmtTime(ms){return new Intl.DateTimeFormat(["ar-OM-u-nu-arab","ar-u-nu-arab","ar"],{hour:"numeric",minute:"2-digit",hour12:true,timeZone:"Asia/Muscat"}).format(new Date(ms))}
function ended(){return EV && Date.now()>EV.end || qs.get("after")==="1"}

/* ───── بناء الصفحة ───── */
var app=$("#app");
function logosHtml(){
  var o='<img class="l1" src="'+IMG.light+'" width="'+DIM.light[0]+'" height="'+DIM.light[1]+'" alt="شعار المدرسة" loading="lazy" decoding="async">';
  if(C.showMinistryLogo) o+='<img class="l2" src="'+IMG.moe+'" width="'+DIM.moe[0]+'" height="'+DIM.moe[1]+'" alt="شعار وزارة التربية والتعليم" loading="lazy" decoding="async">';
  if(C.showVisionLogo) o+='<img class="l3" src="'+IMG.vision+'" width="'+DIM.vision[0]+'" height="'+DIM.vision[1]+'" alt="رؤية عُمان ٢٠٤٠" loading="lazy" decoding="async">';
  return '<div class="logos">'+o+'</div>';
}
function heroLogos(){
  function side(on,k,alt){return '<div class="side">'+(on?'<img src="'+IMG[k]+'" width="'+DIM[k][0]+'" height="'+DIM[k][1]+'" alt="'+alt+'" decoding="async">':'')+'</div>'}
  return '<div class="hl">'+side(C.showMinistryLogo,"moe","شعار وزارة التربية والتعليم")+
  '<div class="orb"><img src="'+IMG.light+'" width="'+DIM.light[0]+'" height="'+DIM.light[1]+'" alt="شعار المدرسة" fetchpriority="high" decoding="async"><span class="orbit css" aria-hidden="true"><i></i></span></div>'+
  side(C.showVisionLogo,"vision","رؤية عُمان ٢٠٤٠")+'</div>';
}
function head(eyebrow,title,lead){return '<div class="head rv"><span class="eyebrow">'+esc(eyebrow)+'</span><h2>'+esc(title)+'</h2>'+(lead?'<p class="lead">'+esc(lead)+'</p>':'')+'</div>'}
function words(t){return String(t).split(/\s+/).filter(Boolean).map(function(w,i){return '<span class="sw" style="--i:'+i+'"><span>'+esc(w)+'</span></span>'}).join(" ")}

function sHero(){
  var info=[];
  if(EV){info.push(["cal","التاريخ",fmtDate(EV.start)]); if(EV.hasTime) info.push(["clock","الوقت",fmtTime(EV.start)+(C.event.endTime?" – "+fmtTime(EV.end):"")]);}
  else info.push(["cal","الموعد","يُعلن قريبًا"]);
  info.push(["pin","المكان",C.location.name]);
  return '<header id="hero"><div class="bgl"><div class="aurora"></div><div class="bg-geo" style="position:absolute;inset:0;opacity:.8"></div><canvas class="pt" id="hp"></canvas></div>'+
  '<div class="wrap in-w">'+heroLogos()+
  (guestName?'<p class="gold rv" style="font-size:1.3rem;margin-bottom:.5rem">أهلاً بكم، '+esc(guestName)+'</p>':'')+
  '<p class="rv" style="color:rgb(var(--ink)/.85);font-size:1.1rem;padding-top:.9rem">'+esc(C.school)+'</p>'+
  '<h1 class="shiny">'+words(C.forumTitle)+'</h1>'+
  (C.academicYear?'<span class="chip rv">'+esc(C.academicYear)+'</span>':'')+
  '<p class="tag rv">'+esc(C.tagline)+'</p>'+
  '<p class="rv" style="max-width:36rem;margin-top:1rem;color:rgb(var(--ink)/.72)">'+esc(C.welcome)+'</p>'+
  '<div class="acts rv"><a class="btn b-gold" href="#'+(ended()?"after":"rsvp")+'">'+(ended()?"شاهد الشكر":"أكّد حضورك")+'</a><a class="btn b-ghost" href="#event">تفاصيل الملتقى</a></div>'+
  '<ul class="info">'+info.map(function(i){return '<li class="card rv"><span class="ic">'+ic(i[0],22)+'</span><span><small>'+i[1]+'</small><b>'+esc(i[2])+'</b></span></li>'}).join("")+'</ul></div>'+
  '<button class="hint" aria-label="انتقل للأسفل" onclick="document.getElementById(\'letter\')&&document.getElementById(\'letter\').scrollIntoView({behavior:\'smooth\'})">'+ic("down",28)+'</button></header>';
}
function sAudio(){
  var a=C.audio; if(!a.enabled||!a.file) return "";
  return '<section class="s" id="audio" aria-labelledby="audt"><div class="wrap"><div class="audio card rv"><div class="dir"><span class="av"><img src="'+IMG.light+'" width="'+DIM.light[0]+'" height="'+DIM.light[1]+'" alt="" loading="lazy" decoding="async"></span><div><p class="gold" style="font-weight:700;font-size:.9rem">رسالة صوتية</p><h2 id="audt" class="disp" style="font-size:1.6rem;line-height:1.4">'+esc(a.title)+'</h2>'+(C.directorName?'<p style="color:rgb(var(--ink)/.7)">'+esc(C.directorName)+' · '+esc(C.directorTitle)+'</p>':'')+'</div></div>'+
  '<div class="pl" id="pl"><button class="btn b-gold pb" id="pbtn" aria-label="تشغيل الكلمة الصوتية">'+ic("play",26)+'</button><div style="flex:1;min-width:0"><div class="wave" id="wave" role="slider" aria-label="موضع التشغيل" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">'+Array.apply(null,Array(36)).map(function(_,i){return '<i style="height:'+(30+Math.abs(Math.sin(i*1.7))*70)+'%;--k:'+i+'"></i>'}).join("")+'</div><div class="tm"><span id="tc">٠:٠٠</span><span id="td">٠:٠٠</span></div></div>'+
  '<button class="btn-i" id="mut" aria-label="كتم الصوت" aria-pressed="false">'+ic("vol",20)+'</button><button class="btn-i" id="spd" aria-label="سرعة التشغيل: ١×">١×</button></div>'+
  '<p class="small" id="ast" role="status" aria-live="polite" style="margin-top:.75rem"></p>'+
  '<audio id="au" preload="none"><source src="'+esc(a.file)+'" type="'+mimeOf(a.file)+'"></audio>'+
  (a.transcript?'<details class="tx"><summary>اقرأ نص الكلمة</summary><p>'+esc(a.transcript)+'</p></details>':'')+'</div></div></section>';
}
function sVoices(){
  var v=C.voices; if(!v.items.length) return "";
  return '<section class="s" id="voices"><div class="wrap">'+head("أصوات الطلبة",v.title,v.intro)+'<ul class="grid g2">'+v.items.map(function(i){return '<li class="card vc rv"><b>'+esc(i.name)+'</b><audio controls preload="none" src="'+esc(i.file)+'"></audio></li>'}).join("")+'</ul></div></section>';
}
function sLetter(){
  var paras=C.letter.split(/\n\s*\n/).map(function(p){return '<p>'+esc(p.trim())+'</p>'}).join("");
  return '<section class="s" id="letter"><div class="wrap">'+head("من إدارة المدرسة",C.letterTitle)+'<article class="letter card rv bg-geo">'+paras+
  '<div class="sig" style="display:flex;align-items:center;gap:1rem"><img src="'+IMG.light+'" alt="" style="height:3.5rem;width:auto"><div><b>'+esc(C.directorName||"إدارة المدرسة")+'</b><div style="color:rgb(var(--ink)/.7)">'+esc(C.directorName?C.directorTitle:C.school)+'</div></div></div></article></div></section>';
}
function sGoals(){
  return '<section class="s" id="goals" style="background:rgb(var(--bg2)/.5)"><div class="wrap">'+head("لماذا نلتقي؟","أهداف الملتقى")+'<ul class="grid g2 g3">'+C.goals.map(function(g,i){return '<li class="card goal rv" style="--d:'+(i%3)*.08+'s"><div class="top"><span class="ic">'+ic(g.icon,26)+'</span><span class="n">'+nA(i+1)+'</span></div><h3>'+esc(g.title)+'</h3><p>'+esc(g.text)+'</p></li>'}).join("")+'</ul></div></section>';
}
function sEvent(){
  var body;
  if(!EV) body='<div class="card ev rv"><div style="padding:3rem 1.5rem;text-align:center"><div class="big">سيُعلن موعد الملتقى قريبًا</div><p style="margin-top:.75rem;color:rgb(var(--ink)/.7)">تابعوا الدعوة لمعرفة التفاصيل.</p></div></div>';
  else {
    var dm=new Intl.DateTimeFormat(["ar-OM-u-nu-arab-ca-gregory","ar-u-nu-arab-ca-gregory","ar"],{day:"numeric",timeZone:"Asia/Muscat"}).format(new Date(EV.start));
    var mo=new Intl.DateTimeFormat(["ar-OM-u-nu-arab-ca-gregory","ar-u-nu-arab-ca-gregory","ar"],{month:"long",year:"numeric",timeZone:"Asia/Muscat"}).format(new Date(EV.start));
    body='<div class="card ev rv"><div class="evd"><div class="dbox"><div><div class="dn">'+dm+'</div><b>'+mo+'</b></div></div><div class="dinf"><div><small>اليوم والتاريخ</small><b>'+fmtDate(EV.start)+'</b></div>'+(EV.hasTime?'<div><small>الوقت</small><b>'+fmtTime(EV.start)+(C.event.endTime?" – "+fmtTime(EV.end):"")+'</b></div>':'')+'<div><small>المكان</small><b>'+esc(C.location.name)+'</b></div></div></div>'+
    (C.event.countdown?'<div class="cdw" id="cdw"><p style="text-align:center;margin-bottom:1rem;color:rgb(var(--ink)/.7)" id="cdt">المتبقي على الملتقى</p><div class="cd" id="cd"><div><b id="c-d">٠</b><span>يوم</span></div><div><b id="c-h">٠</b><span>ساعة</span></div><div><b id="c-m">٠</b><span>دقيقة</span></div><div><b id="c-s">٠</b><span>ثانية</span></div></div></div>':'')+
    '<div class="evb"><a class="btn b-gold" id="gcal" target="_blank" rel="noopener">'+ic("cal",20)+' أضِف إلى تقويم جوجل</a><button class="btn b-ghost" id="ics">'+ic("dl",20)+' تحميل ملف التقويم (iPhone)</button></div></div>';
  }
  return '<section class="s" id="event">'+'<div class="wrap">'+head("الموعد","موعد الملتقى")+body+'</div></section>';
}
function sLocation(){
  var L=C.location, ok=L.lat&&L.lng, ll=ok?L.lat+","+L.lng:"";
  var src=ok?'https://maps.google.com/maps?q='+encodeURIComponent(ll)+'&z=16&output=embed&hl=ar':'';
  var open=L.mapsUrl||(ok?'https://www.google.com/maps/search/?api=1&query='+ll:'');
  var dir=ok?'https://www.google.com/maps/dir/?api=1&destination='+ll:open;
  return '<section class="s" id="location"><div class="wrap">'+head("كيف تصلون إلينا","موقع الملتقى")+'<div class="card loc rv">'+(L.embed&&src?'<div class="map"><iframe title="خريطة موقع المدرسة" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+src+'"></iframe></div>':'')+
  '<div class="locb"><h3 class="disp" style="font-size:1.5rem">'+esc(L.name)+'</h3><p style="color:rgb(var(--ink)/.75)">'+esc([L.address,L.wilayat&&("ولاية "+L.wilayat),L.governorate&&("محافظة "+L.governorate)].filter(pass).join("، "))+'</p>'+
  (L.tips.length?'<ul class="tips">'+L.tips.map(function(t){return '<li>'+esc(t)+'</li>'}).join("")+'</ul>':'')+
  '<div class="row">'+(open?'<a class="btn b-gold" target="_blank" rel="noopener" href="'+esc(open)+'">'+ic("pin",20)+' افتح في خرائط جوجل</a>':'')+(dir?'<a class="btn b-ghost" target="_blank" rel="noopener" href="'+esc(dir)+'">الاتجاهات</a>':'')+'</div></div></div></div></section>';
}
function sRsvp(){
  var r=C.rsvp; if(!r.enabled) return "";
  var guests=r.collectCount?'<div id="gwrap"><label class="l" for="gc">عدد الحضور</label><select class="field" id="gc">'+Array.apply(null,Array(r.maxGuests)).map(function(_,i){return '<option value="'+(i+1)+'">'+nA(i+1)+'</option>'}).join("")+'</select></div>':'';
  return '<section class="s" id="rsvp" style="background:rgb(var(--bg2)/.5)"><div class="wrap">'+head("نتشرف بحضوركم",r.title,r.description)+
  '<form class="card form rv" id="rf" novalidate><div><label class="l" for="rn">الاسم الكريم</label><input class="field" id="rn" maxlength="80" autocomplete="name" required value="'+esc(guestName)+'"></div>'+
  '<fieldset><legend>هل ستحضرون؟</legend><div class="opts"><label class="opt"><input type="radio" name="st" value="attending" checked><span>سأحضر بإذن الله</span></label><label class="opt"><input type="radio" name="st" value="declined"><span>أعتذر عن الحضور</span></label></div></fieldset>'+guests+
  '<div class="sr" aria-hidden="true"><input id="hp" tabindex="-1" autocomplete="off"></div>'+
  '<div class="err" id="re" role="alert" hidden></div><button class="btn b-gold" type="submit" id="rb">إرسال</button><p class="small">'+(r.supabase.url?"يُحفظ ردكم لدى إدارة المدرسة فقط.":(r.whatsapp?"سيفتح واتساب برسالة جاهزة لإرسالها إلى إدارة المدرسة.":""))+'</p></form></div></section>';
}
function sTeachers(){
  var t=C.teachers; if(!t.items.length) return "";
  return '<section class="s" id="teachers"><div class="wrap">'+head("نلتقي بكم",t.title,t.intro)+'<ul class="grid g2 g3">'+t.items.map(function(i){return '<li class="card tc rv"><div class="ph">'+(i.photo?'<img loading="lazy" alt="" src="'+esc(i.photo)+'">':esc((i.name||"").replace(/^(أ\.|د\.)\s*/,"").charAt(0)))+'</div><h3>'+esc(i.name)+'</h3><div class="r">'+esc(i.role)+'</div>'+(i.text?'<p>'+esc(i.text)+'</p>':'')+'</li>'}).join("")+'</ul></div></section>';
}
function sGallery(){
  var g=C.gallery; if(!g.photos.length) return "";
  var li=g.photos.map(function(p){return '<li><img loading="lazy" alt="'+esc(p.caption||"")+'" src="'+esc(p.file)+'">'+(p.caption?'<figcaption>'+esc(p.caption)+'</figcaption>':'')+'</li>'}).join("");
  return '<section class="s" id="gallery"><div class="wrap">'+head("لمحات",g.title)+'<div class="strip"><ul>'+li+li+'</ul></div></div></section>';
}
function sQuote(){
  if(!C.quotes.length) return "";
  var d=Math.floor(Date.now()/864e5), q=C.quotes[d%C.quotes.length];
  return '<section class="quote"><div class="wrap rv"><span class="eyebrow">عبارة اليوم</span><blockquote>«'+esc(q)+'»</blockquote></div></section>';
}
function sShare(){
  var s=C.share; if(!s.enabled) return "";
  return '<section class="s" id="share"><div class="wrap"><div class="head rv"><span class="eyebrow">شاركوا الفرحة</span><h2>'+esc(s.title)+'</h2></div><div class="acts rv" style="margin-inline:auto;justify-content:center"><a class="btn b-gold" id="shwa" target="_blank" rel="noopener">'+ic("wa",20)+' مشاركة عبر واتساب</a><button class="btn b-ghost" id="shcp">'+ic("copy",20)+' نسخ الرابط</button><button class="btn b-ghost" id="shnv" hidden>'+ic("share",20)+' مشاركة</button></div></div></section>';
}
function sAfter(){
  var a=C.after;
  return '<section class="s" id="after"><div class="wrap">'+head("شكرًا لكم",a.title,a.message)+
  (a.recommendations.length?'<div class="card letter rv" style="padding:1.5rem"><h3 class="gold disp" style="font-size:1.4rem;margin-bottom:.75rem">'+esc(a.recTitle)+'</h3><ul style="padding-right:1.25rem">'+a.recommendations.map(function(x){return '<li style="margin-bottom:.5rem">'+esc(x)+'</li>'}).join("")+'</ul></div>':'')+
  '<div class="acts rv" style="margin:1.5rem auto 0;justify-content:center">'+(a.surveyUrl?'<a class="btn b-gold" target="_blank" rel="noopener" href="'+esc(a.surveyUrl)+'">شاركونا رأيكم</a>':'')+'</div>'+
  (a.certificate?'<div class="card form rv" style="margin-top:1.5rem"><h3 class="disp gold" style="font-size:1.5rem;text-align:center">'+esc(a.certTitle)+'</h3><div><label class="l" for="cn">اكتبوا اسمكم لتحصلوا على الشهادة</label><input class="field" id="cn" maxlength="60" value="'+esc(guestName)+'"></div><canvas id="cc" width="1600" height="1130" style="width:100%;height:auto;border-radius:1rem;display:none"></canvas><button class="btn b-gold" id="cb">إنشاء الشهادة</button><a class="btn b-ghost" id="cdl" download="شهادة-شكر.png" hidden>تحميل الشهادة</a></div>':'')+
  '</div></section>';
}
function sFooter(){
  return '<footer><div class="wrap">'+logosHtml()+'<p class="disp" style="font-size:1.3rem">'+esc(C.school)+'</p><p style="color:rgb(var(--ink)/.6)">'+esc(C.tagline)+'</p>'+(C.footerNote?'<p class="small" style="margin-top:.5rem">'+esc(C.footerNote)+'</p>':'')+'<button class="lnk" id="replay">إعادة عرض الافتتاحية</button></div></footer>';
}
function sIntro(){
  return '<div id="intro" role="dialog" aria-modal="true" aria-label="افتتاحية الدعوة"><div class="door" id="dl"></div><div class="door" id="dr"></div><div id="iglow"></div><canvas class="pt" id="ip" aria-hidden="true"></canvas><div id="seam"></div>'+
  '<div id="icont"><button id="skip">تخطّي ›</button><div class="lg" id="ilg"><svg viewBox="0 0 200 200" aria-hidden="true"><circle id="ring" cx="100" cy="100" r="94" fill="none" stroke="rgb(222,196,98)" stroke-width="1.5" stroke-dasharray="590" stroke-dashoffset="590"/></svg><span class="orbit css" aria-hidden="true"><i></i></span><img src="'+IMG.light+'" width="'+DIM.light[0]+'" height="'+DIM.light[1]+'" alt="شعار المدرسة" fetchpriority="high"></div>'+
  '<p class="gold" id="isc" style="font-weight:700;opacity:0">'+esc(C.school)+'</p><h1 id="ititle" class="shiny" style="opacity:0">'+esc(C.forumTitle)+'</h1><p id="iline" style="margin-top:1rem;max-width:30rem;color:rgb(var(--ink)/.8);opacity:0">'+esc(C.introLine)+'</p>'+
  (C.effects.askName?'<div id="inm" style="margin-top:1.5rem;width:100%;max-width:20rem;opacity:0"><label for="inp" class="sr">الاسم</label><input class="field" id="inp" maxlength="40" placeholder="اكتبوا اسمكم (اختياري)" value="'+esc(guestName)+'" style="text-align:center"></div>':'')+
  '<button class="btn b-gold pulse" id="open" style="margin-top:1.5rem;opacity:0">افتح دعوتك</button></div></div>';
}
/* ───── أدوات ───── */
function particles(cv,n,col){
  if(!cv||reduce||LOW) return; if(innerWidth<640) n=Math.round(n*.5);
  var x=cv.getContext("2d"),W,H,P=[],vis=true;
  function rs(){var r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=cv.width=r.width*d;H=cv.height=r.height*d;}
  rs(); addEventListener("resize",rs);
  if("IntersectionObserver" in window) new IntersectionObserver(function(en){vis=en[0].isIntersecting}).observe(cv);
  for(var i=0;i<n;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*2+.6,v:Math.random()*.0004+.00012,a:Math.random()*.5+.15,p:Math.random()*6});
  (function f(t){ if(!cv.isConnected) return; if(vis&&!document.hidden){ x.clearRect(0,0,W,H);
    P.forEach(function(p){p.y-=p.v*16; if(p.y<-.02){p.y=1.02;p.x=Math.random()} var o=p.a*(.6+.4*Math.sin(t/900+p.p));
      x.beginPath();x.arc(p.x*W+Math.sin(t/1500+p.p)*12,p.y*H,p.r*(devicePixelRatio||1),0,7);x.fillStyle="rgba("+col+","+o+")";x.fill()}) }
    requestAnimationFrame(f)})(0);
}
function chime(){ if(!C.effects.chime) return; try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)();
  [523.25,659.25,783.99,1046.5].forEach(function(f,i){var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+i*.13;
    o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.08,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+1.4);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+1.5)})}catch(e){} }
function copyText(t){ if(navigator.clipboard&&navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
  return new Promise(function(res,rej){try{var a=document.createElement("textarea");a.value=t;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();res()}catch(e){rej(e)}})}
function siteLink(){return location.origin+location.pathname}

/* ───── التفاعل ───── */
var lenis=null;
function setupScroll(){
  if(!window.gsap||reduce||!C.effects.smoothScroll||!window.Lenis) return;
  try{ if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    lenis=new Lenis({duration:1.15,smoothWheel:true}); 
    if(window.ScrollTrigger) lenis.on("scroll",ScrollTrigger.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000)}); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var t=$(a.getAttribute("href"));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-10})}})});
  }catch(e){lenis=null}
}
function setupParallax(){
  if(!window.gsap||!window.ScrollTrigger||reduce) return;
  try{ gsap.to("#hero .bgl",{yPercent:18,ease:"none",scrollTrigger:{trigger:"#hero",start:"top top",end:"bottom top",scrub:true}});
       gsap.to("#hero .logos",{yPercent:-12,ease:"none",scrollTrigger:{trigger:"#hero",start:"top top",end:"bottom top",scrub:true}}); }catch(e){}
}
function setupReveal(){
  var els=$$(".rv"); if(!("IntersectionObserver" in window)||reduce){els.forEach(function(e){e.classList.add("in")});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(e){io.observe(e)});
  // عناوين hero المتحركة
  $$("#hero h1").forEach(function(h){h.classList.add("in")});
}
function setupSpot(){ $$(".goal").forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})}) }
function setupRipple(){ document.addEventListener("pointerdown",function(e){var b=e.target.closest&&e.target.closest(".btn"); if(!b||reduce) return; var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=document.createElement("span");d.className="ripple";d.style.cssText="width:"+s+"px;height:"+s+"px;left:"+(e.clientX-r.left-s/2)+"px;top:"+(e.clientY-r.top-s/2)+"px";b.appendChild(d);setTimeout(function(){d.remove()},700)}) }

function setupAudio(){
  var au=$("#au"); if(!au) return; var btn=$("#pbtn"),wave=$("#wave"),bars=$$("i",wave),tc=$("#tc"),td=$("#td"),sp=$("#spd"),mu=$("#mut"),st=$("#ast"),box=$("#pl"),rates=[1,1.25,1.5,.75],ri=0,fired=false;
  function f(s){s=Math.max(0,Math.floor(s||0));return nA(Math.floor(s/60))+":"+nA(s%60).padStart(2,"٠")}
  function upd(){var p=au.duration?au.currentTime/au.duration:0;bars.forEach(function(b,i){b.classList.toggle("on",i/bars.length<p)});tc.textContent=f(au.currentTime);if(au.duration)td.textContent=f(au.duration);wave.setAttribute("aria-valuenow",Math.round(p*100))}
  function warm(){ if(au.preload!=="metadata"){au.preload="metadata";try{au.load()}catch(e){}} }
  if("IntersectionObserver" in window) new IntersectionObserver(function(en,ob){if(en[0].isIntersecting){warm();ob.disconnect()}},{rootMargin:"900px 0px"}).observe(box); else warm();
  btn.addEventListener("click",function(){ warm(); if(au.paused){ var pr=au.play(); if(pr&&pr.catch) pr.catch(function(){st.textContent="تعذّر التشغيل التلقائي؛ اضغطوا زر التشغيل مرة أخرى."}) } else au.pause()});
  au.addEventListener("play",function(){btn.innerHTML=ic("pause",26);btn.setAttribute("aria-label","إيقاف مؤقت");box.classList.add("playing");st.textContent="";if(!fired){fired=true;track("audio_play")}});
  au.addEventListener("pause",function(){btn.innerHTML=ic("play",26);btn.setAttribute("aria-label","تشغيل الكلمة الصوتية");box.classList.remove("playing")});
  au.addEventListener("ended",function(){box.classList.remove("playing");track("audio_complete")});
  au.addEventListener("error",function(){st.innerHTML='تعذّر تحميل الملف الصوتي. <a class="gold" href="'+esc(C.audio.file)+'" download>حمّلوه من هنا</a>.';btn.disabled=true});
  au.addEventListener("timeupdate",upd);au.addEventListener("loadedmetadata",upd);
  function seek(e){var r=wave.getBoundingClientRect();var p=1-(e.clientX-r.left)/r.width; if(au.duration) au.currentTime=Math.min(1,Math.max(0,p))*au.duration}
  wave.addEventListener("click",seek);
  wave.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){au.currentTime=Math.min(au.duration||0,au.currentTime+5);e.preventDefault()}if(e.key==="ArrowRight"){au.currentTime=Math.max(0,au.currentTime-5);e.preventDefault()}});
  sp.addEventListener("click",function(){ri=(ri+1)%rates.length;au.playbackRate=rates[ri];sp.textContent=nA(rates[ri])+"×";sp.setAttribute("aria-label","سرعة التشغيل: "+nA(rates[ri])+"×")});
  mu.addEventListener("click",function(){au.muted=!au.muted;mu.setAttribute("aria-pressed",String(au.muted));mu.setAttribute("aria-label",au.muted?"إلغاء كتم الصوت":"كتم الصوت");mu.innerHTML=ic(au.muted?"mute":"vol",20)});
}
function setupCountdown(){
  if(!EV||!C.event.countdown||!$("#cd")) return;
  var d=$("#c-d"),h=$("#c-h"),m=$("#c-m"),s=$("#c-s"),t=$("#cdt");
  function z(n){return nA(n)}
  function tick(){var diff=EV.start-Date.now();
    if(diff<=0){ t.textContent=Date.now()<EV.end?"الملتقى يُقام الآن — أهلاً بكم":(C.event.thanks||"سعدنا بلقائكم"); d.textContent=h.textContent=m.textContent=s.textContent="٠"; return}
    var x=Math.floor(diff/1000);d.textContent=z(Math.floor(x/86400));h.textContent=z(Math.floor(x%86400/3600));m.textContent=z(Math.floor(x%3600/60));s.textContent=z(x%60)}
  tick(); setInterval(tick,1000);
}
function setupCalendar(){
  if(!EV) return; var g=$("#gcal"),i=$("#ics"); if(!g) return;
  function u(ms){return new Date(ms).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}
  var title=C.forumTitle+" – "+C.school, det=C.welcome+(C.location.mapsUrl?"\n"+C.location.mapsUrl:""), loc=C.location.name+(C.location.wilayat?"، "+C.location.wilayat:"");
  g.addEventListener("click",function(){track("add_to_calendar",{type:"google"})});
  g.href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(title)+"&dates="+u(EV.start)+"/"+u(EV.end)+"&details="+encodeURIComponent(det)+"&location="+encodeURIComponent(loc)+"&ctz=Asia/Muscat";
  i.addEventListener("click",function(){
    function al(t,d){return "BEGIN:VALARM\r\nACTION:DISPLAY\r\nDESCRIPTION:"+title+"\r\nTRIGGER:"+t+"\r\nEND:VALARM\r\n"}
    function ee(s){return s.replace(/\\/g,"\\\\").replace(/;/g,"\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}
    var ics="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Farooq School//Forum//AR\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-TIMEZONE:Asia/Muscat\r\nBEGIN:VEVENT\r\nUID:parents-forum@farooq-school\r\nSEQUENCE:2\r\nSTATUS:CONFIRMED\r\nDTSTAMP:"+u(Date.now())+"\r\nDTSTART:"+u(EV.start)+"\r\nDTEND:"+u(EV.end)+"\r\nSUMMARY:"+ee(title)+"\r\nDESCRIPTION:"+ee(det)+"\r\nLOCATION:"+ee(loc)+"\r\n"+al("-P1D")+al("-PT2H")+al("-PT1H")+"END:VEVENT\r\nEND:VCALENDAR\r\n";
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));a.download="forum.ics";document.body.appendChild(a);a.click();a.remove();track("add_to_calendar",{type:"ics"});
  });
}
function setupRsvp(){
  var f=$("#rf"); if(!f) return; var r=C.rsvp,err=$("#re"),btn=$("#rb"),nm=$("#rn"),sb=r.supabase||{};
  if(EV && Date.now()>EV.end){ f.outerHTML='<div class="card form"><p style="text-align:center">'+esc(r.closedMessage)+'</p></div>'; return }
  var t0=Date.now(), last=0, seen=false; try{last=+localStorage.getItem("rsvp_t")||0}catch(e){}
  f.addEventListener("focusin",function(){if(!seen){seen=true;track("rsvp_start")}});
  function show(m,focus){err.textContent=m;err.hidden=false;if(focus){focus.setAttribute("aria-invalid","true");focus.focus()}}
  nm.addEventListener("input",function(){nm.removeAttribute("aria-invalid");err.hidden=true});
  f.addEventListener("submit",function(e){
    e.preventDefault(); err.hidden=true;
    var name=nm.value.replace(/\s+/g," ").trim(), st=$('input[name=st]:checked',f).value, gc=$("#gc")?+$("#gc").value:1;
    if($("#hp").value) return;
    if(name.length<2||name.length>80) return show("يرجى كتابة الاسم (بين حرفين و٨٠ حرفًا).",nm);
    if(/[<>]/.test(name)) return show("يرجى كتابة الاسم بدون رموز خاصة.",nm);
    if(Date.now()-t0<2500) return show("لحظة من فضلكم ثم أعيدوا المحاولة.");
    if(Date.now()-last<8000) return show("تم الإرسال للتو، انتظروا قليلًا.");
    var guests=st==="attending"?(r.collectCount?gc:1):0, hasDb=!!(sb.url&&sb.anonKey), hasMail=!!r.emailEndpoint, hasWa=!!r.whatsapp;
    if(!hasDb&&!hasMail&&!hasWa) return show("خدمة تأكيد الحضور لم تُفعَّل بعد.");
    function done(ch){ try{localStorage.setItem("rsvp_t",String(Date.now()))}catch(e){}
      track("rsvp_success",{status:st,guests:guests,channel:ch});
      f.outerHTML='<div class="card form" role="status"><div class="ok"><div class="tick">'+ic("check",32)+'</div><h3 class="disp" style="font-size:1.6rem">'+esc(name)+'</h3><p style="margin-top:.5rem">'+esc(st==="attending"?r.successAttending:r.successDeclined)+'</p></div></div>'; }
    var msg="السلام عليكم، أنا "+name+"، "+(st==="attending"?"أؤكد حضوري":"أعتذر عن الحضور")+" لـ"+C.forumTitle+" في "+C.school+(r.collectCount&&st==="attending"?"، عدد الحضور: "+gc:"")+".";
    track("rsvp_submit",{status:st,guests:guests});
    if(!hasDb&&!hasMail){ window.open("https://wa.me/"+String(r.whatsapp).replace(/\D/g,"")+"?text="+encodeURIComponent(msg),"_blank","noopener"); return done("whatsapp") }
    btn.disabled=true;btn.textContent="جارٍ الإرسال…";
    var jobs=[];
    if(hasDb) jobs.push(fetch(sb.url.trim().replace(/\/+$/,"").replace(/\/rest\/v1$/,"")+"/rest/v1/rsvps",{method:"POST",headers:(function(){var h={"Content-Type":"application/json",apikey:sb.anonKey,Prefer:"return=minimal"};if(sb.anonKey.indexOf("sb_")!==0)h.Authorization="Bearer "+sb.anonKey;return h})(),body:JSON.stringify({name:name,status:st,guests:guests})}).then(function(x){if(!x.ok){x.text().then(function(t){console.warn("RSVP database error",x.status,t)})}return x.ok}).catch(function(e){console.warn("RSVP network error",e);return false}));
    if(hasMail) jobs.push(fetch(r.emailEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:name,status:st==="attending"?"سيحضر":"معتذر",guests:guests,message:msg,event:C.forumTitle,_subject:"تأكيد حضور جديد: "+name})}).then(function(x){return x.ok}).catch(function(){return false}));
    Promise.all(jobs).then(function(res){ if(res.some(Boolean)) done(hasDb?"database":"email"); else {btn.disabled=false;btn.textContent="إرسال";track("rsvp_error");show("تعذّر الإرسال حاليًا. حاولوا لاحقًا.")} });
  });
}
function jsonLd(){
  if(!EV) return; var L=C.location,iso=function(ms){return new Date(ms+4*36e5).toISOString().slice(0,19)+"+04:00"};
  var o={"@context":"https://schema.org","@type":"Event","name":C.forumTitle+" – "+C.school,"description":C.welcome,"startDate":iso(EV.start),"endDate":iso(EV.end),
    "eventStatus":"https://schema.org/EventScheduled","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","inLanguage":"ar","isAccessibleForFree":true,
    "url":siteLink(),"image":[new URL("og.png",siteLink()).href],
    "location":{"@type":"Place","name":L.name,"address":{"@type":"PostalAddress","addressLocality":L.wilayat,"addressRegion":L.governorate,"addressCountry":"OM"}},
    "organizer":{"@type":"EducationalOrganization","name":C.school,"url":siteLink()}};
  if(L.lat&&L.lng) o.location.geo={"@type":"GeoCoordinates","latitude":+L.lat,"longitude":+L.lng};
  var s=document.getElementById("ld")||document.createElement("script"); s.type="application/ld+json"; s.id="ld"; s.textContent=JSON.stringify(o); document.head.appendChild(s);
  var when=fmtDate(EV.start)+(EV.hasTime?" · "+fmtTime(EV.start)+(C.event.endTime?" – "+fmtTime(EV.end):""):"");
  [["meta[name=description]",C.forumTitle+" – "+C.school+" | "+when],["meta[property='og:description']",C.forumTitle+" – "+when]].forEach(function(x){var m=$(x[0]);if(m)m.setAttribute("content",x[1])});
}
/* توهج يدور حول دائرة الشعار: GSAP، ويتوقف خارج الشاشة، ويثبت مع تقليل الحركة */
function setupOrbit(root){
  if(reduce){ $$(".orbit",root).forEach(function(o){o.classList.remove("css");o.style.animation="none"}); return }
  if(!window.gsap) return;
  $$(".orbit.css",root).forEach(function(o){
    o.classList.remove("css");
    var t=gsap.to(o,{rotation:360,duration:9,ease:"none",repeat:-1,transformOrigin:"50% 50%"});
    var p=gsap.to($("i",o),{scale:1.35,duration:1.1,ease:"sine.inOut",yoyo:true,repeat:-1});
    if("IntersectionObserver" in window) new IntersectionObserver(function(en){var on=en[0].isIntersecting;on?(t.resume(),p.resume()):(t.pause(),p.pause())}).observe(o.parentNode);
  });
}
/* المكتبات الثقيلة تُحمَّل بعد ظهور الصفحة: GSAP للتوهج، وLenis وScrollTrigger للحاسوب فقط */
function loadLibs(){
  if(reduce||LOW) return;
  var desk=window.matchMedia&&matchMedia("(pointer:fine) and (min-width:900px)").matches;
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",function(){
    setupOrbit(document); if(!desk||!C.effects.smoothScroll) return;
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",function(){
      loadScript("https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js",function(){ setupScroll(); setupParallax() }) }) });
}
function setupShare(){
  var wa=$("#shwa"); if(!wa) return; var txt=C.share.text+"\n"+siteLink();
  wa.href="https://wa.me/?text="+encodeURIComponent(txt);wa.addEventListener("click",function(){track("share",{via:"whatsapp"})});
  $("#shcp").addEventListener("click",function(){var b=this;track("share",{via:"copy"});copyText(siteLink()).then(function(){b.lastChild.textContent=" تم النسخ ✓";setTimeout(function(){b.lastChild.textContent=" نسخ الرابط"},1800)})});
  if(navigator.share){var n=$("#shnv");n.hidden=false;n.addEventListener("click",function(){navigator.share({title:C.forumTitle,text:C.share.text,url:siteLink()}).catch(function(){})})}
}
function setupCert(){
  var b=$("#cb"); if(!b) return;
  b.addEventListener("click",function(){
    var name=($("#cn").value||"").trim(); if(name.length<2){$("#cn").focus();return}
    var cv=$("#cc"),x=cv.getContext("2d"),W=1600,H=1130; cv.style.display="block";
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#073b2f");g.addColorStop(1,"#052f25");x.fillStyle=g;x.fillRect(0,0,W,H);
    x.strokeStyle="#dec462";x.lineWidth=6;x.strokeRect(40,40,W-80,H-80);x.lineWidth=2;x.strokeRect(62,62,W-124,H-124);
    var im=new Image();im.onload=function(){var h=170,w=im.width/im.height*h;x.drawImage(im,(W-w)/2,110,w,h);
      x.direction="rtl";x.textAlign="center";x.fillStyle="#dec462";x.font="700 84px Amiri, serif";x.fillText(C.after.certTitle,W/2,400);
      x.fillStyle="#f4f1e6";x.font="400 40px Tajawal, sans-serif";x.fillText("تُمنح هذه الشهادة إلى",W/2,500);
      x.fillStyle="#fffbe6";x.font="700 100px Amiri, serif";x.fillText(name,W/2,640);
      x.fillStyle="#f4f1e6";x.font="400 38px Tajawal, sans-serif";
      var words=C.after.certText.split(" "),line="",y=760;words.forEach(function(w){var t=line?line+" "+w:w;if(x.measureText(t).width>1100&&line){x.fillText(line,W/2,y);y+=64;line=w}else line=t});x.fillText(line,W/2,y);
      x.fillStyle="#dec462";x.font="700 40px Amiri, serif";x.fillText(C.school,W/2,H-150);
      var a=$("#cdl");a.href=cv.toDataURL("image/png");a.hidden=false};
    im.src=IMG.light;
  });
}
function an(el,kf,o){ if(!el) return null; if(!el.animate){ var l=kf[kf.length-1]; for(var k in l) if(k!=="offset") el.style[k]=l[k]; return null } return el.animate(kf,Object.assign({fill:"forwards"},o)) }
function done(a,f){ if(a&&a.finished) a.finished.then(f,f); else f() }
function runIntro(){
  var I=$("#intro"); if(!I) return; document.documentElement.classList.add("lock");
  var started=false,closed=false,E="cubic-bezier(.2,.8,.2,1)";
  function close(){ if(closed) return; closed=true; I.remove(); document.documentElement.classList.remove("lock"); if(lenis) lenis.resize(); if(window.ScrollTrigger) ScrollTrigger.refresh(); window.scrollTo(0,0); $$("#hero .rv").forEach(function(e,i){e.style.setProperty("--rvb",i*.07+"s")}) }
  var nm=$("#inp"); function saveName(){ if(nm&&nm.value.trim()){guestName=nm.value.trim().slice(0,40); var rn=$("#rn"); if(rn&&!rn.value) rn.value=guestName; var cn=$("#cn"); if(cn&&!cn.value) cn.value=guestName; } }
  particles($("#ip"),50,"222,196,98"); setupOrbit(I);
  var op=$("#open"); if(op) setTimeout(function(){try{op.focus({preventScroll:true})}catch(e){}},1700);
  document.addEventListener("keydown",function esc(e){if(e.key==="Escape"&&document.getElementById("intro")){document.removeEventListener("keydown",esc);saveName();started=true;close()}});
  if(reduce){ ["isc","ititle","iline","inm","open"].forEach(function(id){var e=$("#"+id);if(e)e.style.opacity=1}); $("#ring").style.strokeDashoffset=0 }
  else {
    an($("#ring"),[{strokeDashoffset:590},{strokeDashoffset:0}],{duration:1300,easing:"cubic-bezier(.65,0,.35,1)"});
    [["isc",500],["ititle",750],["iline",1000],["inm",1200],["open",1300]].forEach(function(x){
      an($("#"+x[0]),[{opacity:0,transform:"translateY(16px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,delay:x[1],easing:E}) });
  }
  function openDoors(){
    if(started) return; started=true; saveName(); chime();
    if(reduce){ I.style.opacity=0; setTimeout(close,50); return }
    var D="cubic-bezier(.76,0,.24,1)";
    an($("#icont"),[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(.92)"}],{duration:450,easing:"ease-in"});
    an($("#seam"),[{opacity:0},{opacity:1}],{duration:250,delay:350});
    an($("#iglow"),[{opacity:0},{opacity:1}],{duration:600,delay:400});
    an($("#dl"),[{transform:"translateX(0)"},{transform:"translateX(100%)"}],{duration:1400,delay:550,easing:D});
    an($("#dr"),[{transform:"translateX(0)"},{transform:"translateX(-100%)"}],{duration:1400,delay:550,easing:D});
    an($("#seam"),[{opacity:1},{opacity:0}],{duration:500,delay:900});
    done(an(I,[{opacity:1},{opacity:0}],{duration:450,delay:1750}),close);
  }
  $("#open").addEventListener("click",openDoors);
  $("#skip").addEventListener("click",function(){saveName();started=true;close()});
  if(nm) nm.addEventListener("keydown",function(e){if(e.key==="Enter")openDoors()});
}
/* ───── التشغيل ───── */
function boot(){
  document.title=C.forumTitle+" | "+C.school;
  var fav=$('link[rel=icon]'); if(fav) fav.href=IMG.school;
  if(C.maintenance){ app.innerHTML='<div class="maint"><div>'+logosHtml()+'<h1 class="disp">'+esc(C.maintenanceMessage)+'</h1></div></div>'; return }
  var after=ended(), order;
  var S={audio:sAudio,voices:sVoices,letter:sLetter,goals:sGoals,event:sEvent,location:sLocation,rsvp:sRsvp,teachers:sTeachers,gallery:sGallery,share:sShare,after:sAfter};
  order=["audio","voices","letter","goals","event","location","rsvp","teachers","gallery","share"];
  if(after){ order=order.filter(function(k){return k!=="rsvp"}); order.unshift("after"); } else order.push("after");
  var html='<a class="skip" href="#main">تخطّي إلى المحتوى</a>'+sHero()+'<main id="main" tabindex="-1">'+order.filter(function(k){return k!=="after"||after}).map(function(k,i){ return (k==="goals"?sQuote():"")+S[k]() }).join("")+'</main>'+sFooter();
  app.innerHTML=html+(C.effects.intro&&!qs.get("skip")?sIntro():"");
  jsonLd();track("view_invite");setupAudio();setupCountdown();setupCalendar();setupRsvp();setupShare();setupCert();setupSpot();setupRipple();
  if(C.effects.particles) particles($("#hp"),45,"222,196,98");
  setupReveal();setupOrbit(document);
  if(document.readyState==="complete") later(loadLibs); else addEventListener("load",function(){later(loadLibs)});
  if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost")) addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
  var rp=$("#replay"); if(rp) rp.addEventListener("click",function(){ app.insertAdjacentHTML("beforeend",sIntro()); runIntro(); });
  if(C.effects.intro&&!qs.get("skip")) runIntro(); 
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot); else boot();
})();