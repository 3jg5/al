const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const crypto = require('crypto');
initializeApp(); const db = getFirestore();
// فعّلوا enforceAppCheck:true بعد إعداد App Check (reCAPTCHA v3) لمنع السكربتات
const OPT = { region: 'europe-west1', maxInstances: 5, enforceAppCheck: false };
const SECTIONS = { 10: 7, 11: 11, 12: 12 };

// توحيد النص: إزالة التشكيل والتطويل، توحيد الألف/الياء/التاء المربوطة، ومعالجة (لا/ال) و(الله)
const norm = s => String(s || '').replace(/[\u064B-\u065F\u0670\u0640]/g, '')
  .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
  .replace(/هللا/g, 'الله').replace(/لا/g, 'ال').replace(/\s+/g, ' ').trim();

let cache = null, at = 0;
async function students() {
  if (cache && Date.now() - at < 6e5) return cache;
  const snap = await db.collection('students').get();
  cache = snap.docs.map(d => { const x = d.data(); return { sid: d.id, n: x.name, k: norm(x.name), g: x.grade, s: x.section }; });
  at = Date.now(); return cache;
}
const pub = ({ sid, n, g, s }) => ({ sid, n, g, s });

// تحديد معدل بسيط لكل IP (لكل نسخة من الدالة)؛ الحماية الأقوى: App Check
const hits = new Map();
const ipHash = req => crypto.createHash('sha256')
  .update(String(req.rawRequest.headers['x-forwarded-for'] || req.rawRequest.ip || '').split(',')[0] + 'forum').digest('hex').slice(0, 16);
function limit(req, max) {
  const h = ipHash(req), now = Date.now(), r = hits.get(h);
  if (!r || now > r.t) hits.set(h, { c: 1, t: now + 6e4 });
  else if (++r.c > max) throw new HttpsError('resource-exhausted', 'محاولات كثيرة، حاولوا بعد دقيقة.');
  return h;
}

exports.searchStudents = onCall(OPT, async req => {
  limit(req, 40);
  const q = norm(req.data?.q); if (q.length < 2) return [];
  const t = q.split(' ');
  const all = await students();
  const hit = all.filter(x => t.every(w => x.k.includes(w)));
  hit.sort((a, b) => (b.k.startsWith(q) ? 1 : 0) - (a.k.startsWith(q) ? 1 : 0));
  return hit.slice(0, 10).map(pub);
});

exports.listSection = onCall(OPT, async req => {
  limit(req, 30);
  const g = +req.data?.g, s = +req.data?.s;
  if (!SECTIONS[g] || !(s >= 1 && s <= SECTIONS[g])) throw new HttpsError('invalid-argument', 'صف أو شعبة غير صحيحة');
  return (await students()).filter(x => x.g === g && x.s === s).map(pub);
});

exports.submitRegistration = onCall(OPT, async req => {
  const ip = limit(req, 8), d = req.data || {};
  if (d.website) throw new HttpsError('invalid-argument', 'طلب مرفوض'); // honeypot
  if (!/^\d{8,12}$/.test(d.sid || '')) throw new HttpsError('invalid-argument', 'الطالب غير محدد');
  const parentName = String(d.parentName || '').trim().replace(/\s+/g, ' ');
  if (parentName.length < 3 || parentName.length > 80) throw new HttpsError('invalid-argument', 'اسم ولي الأمر غير صحيح');
  let ph = String(d.phone || '').replace(/\D/g, '').replace(/^(00)?968/, '');
  if (!/^[79]\d{7}$/.test(ph)) throw new HttpsError('invalid-argument', 'رقم الهاتف غير صحيح (8 أرقام تبدأ بـ 7 أو 9)');
  if (typeof d.attending !== 'boolean') throw new HttpsError('invalid-argument', 'اختاروا الحضور أو الاعتذار');
  const st = await db.doc('students/' + d.sid).get();
  if (!st.exists) throw new HttpsError('not-found', 'الطالب غير موجود');
  const ref = db.doc('registrations/' + d.sid), prev = await ref.get(), x = st.data();
  await ref.set({
    sid: d.sid, studentName: x.name, grade: x.grade, section: x.section,
    parentName, phone: '968' + ph, attending: d.attending, updatedAt: FieldValue.serverTimestamp(),
    ...(prev.exists ? {} : { createdAt: FieldValue.serverTimestamp() })
  }, { merge: true });
  await db.collection('audit').add({ action: prev.exists ? 'update' : 'create', sid: d.sid, ip, ts: FieldValue.serverTimestamp() });
  return { ok: true, updated: prev.exists };
});