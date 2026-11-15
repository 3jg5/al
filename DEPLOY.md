# ملخص التغييرات والنشر

## ما تغيّر
| البند | التنفيذ |
|---|---|
| الموعد | الخميس 19/11/2026، 10:30 ص – 1:00 م بتوقيت مسقط (UTC+4) في config.js، ويظهر في الصفحة والعد التنازلي وmeta وJSON-LD (schema.org/Event) وملف التقويم (.ics، مع SEQUENCE:2 وUID ثابت ليتحدث الحدث لمن أضافه سابقًا) وتقويم جوجل |
| قسم البرنامج | حُذف بالكامل من الصفحة وconfig.js والأدمن وCSS، ولا بيانات يتيمة (الأدمن يمسح المفتاح القديم من المسودات) |
| الصوت | voice.mp3 (64kbps، 34 ثانية، 272KB من WAV أصلي 3.2MB). `preload="metadata"`، `<source type="audio/mpeg">`، أزرار تشغيل/كتم/سرعة بأسماء مقروءة، شريط تقدم بلوحة المفاتيح، رسالة بديلة + رابط تحميل عند الفشل، لا تشغيل تلقائي أبدًا |
| الدائرة والتوهج | توهج يدور حول دائرة الشعار (GSAP، مع بديل CSS إن تعذّر تحميله)، يتوقف خارج الشاشة، ويثبت مع تقليل الحركة. رُفعت الدائرة لتلامس اسم المدرسة في الافتتاحية والصفحة الرئيسية |
| الأداء | شعارات WebP (≈107KB بدل ≈210KB PNG)، CSS الحرج مضمَّن، باقي CSS والخطوط بلا حجب للعرض، كل السكربتات defer، أبعاد صريحة للصور، lazy للصور السفلية، خطوط 400/500/700 فقط، بصمة ?v= للملفات، vercel.json لرؤوس التخزين المؤقت والأمان (CDN وHTTP/2/3 وbrotli يوفرها Vercel تلقائيًا) |
| الجوال | clamp() للخطوط، لا تمرير أفقي من 320 إلى 1440px، أهداف لمس ≥ 44px، ورُفع إصلاح تمرير أفقي كان سببه حقل الحماية المخفي في RTL |
| الإتاحة | رابط تخطّي، landmark `main`، Esc لتخطي الافتتاحية، حوار modal، aria للمنزلق والحالة، تباين عالٍ، focus ظاهر |
| تأكيد الحضور | تحقق (2–80 حرفًا، رفض <>، حقل مصيدة، مهلة، تحديد معدل) ← حفظ في Supabase (يظهر في الأدمن + CSV) ← نسخة بريد عبر Formspree إن ضُبط `rsvp.emailEndpoint` ← أحداث تحليلات |
| التحليلات | `rsvp_start / rsvp_submit / rsvp_success / rsvp_error / view_invite / audio_play / audio_complete / add_to_calendar / share` تُدفع إلى dataLayer وgtag وPlausible إن وُجدت |

## النشر
1. ارفعوا كل الملفات في جذر المستودع (استبدال القديمة): index.html, app.js, config.js, style.css, admin.html, vercel.json, voice.mp3, farooq-logo.webp, farooq-logo-light.webp, moe-logo.webp, oman-2040.webp, farooq-logo.png, og.png.
2. Vercel يعيد النشر تلقائيًا. كل فرع/Pull Request يحصل على رابط معاينة (Preview) = الـ staging.
3. بعد معرفة الرابط: غيّروا og:image في index.html إلى رابط كامل.

## البريد
Formspree: أنشئوا نموذجًا مجانيًا بريد الإدارة، وضعوا رابطه في `rsvp.emailEndpoint` من الأدمن (القسم ٦). بديل: Supabase Database Webhook + Edge Function.

## التراجع
- من Vercel: Deployments ← اختاروا النشر السابق ← Promote to Production (فوري).
- أو من GitHub: افتحوا آخر Commit ← Revert.
- config.js بالذات: History على GitHub ← استرجاع النسخة السابقة.

## ملاحظات
- إن غيّرتم التاريخ من الأدمن، حدّث تلقائيًا: الصفحة وJSON-LD وmeta عند التشغيل. أما وسوم meta الثابتة في index.html (التي يقرؤها واتساب) فتحتاج تعديلًا يدويًا في سطري description وog:description.
- أضيفوا نص الكلمة الصوتية في `audio.transcript` لإتاحتها لضعاف السمع.
