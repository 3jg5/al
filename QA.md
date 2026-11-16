# QA, deployment and rollback: parents' forum invitation

## 1. What was wrong (reproduced on the original build)

| # | Defect | Affected | Evidence |
|---|---|---|---|
| 1 | **Intro screen unusable in landscape.** `#icont` centred a ~520px column in a 320-440px-high viewport with no scrolling. The logo was cut off at the top and "افتح دعوتك" sat 20-100px below the screen. | Every phone in landscape (10 of 10 tested) | Original: `intro logo clipped vertically (-66..94 of 320)`, `"open" button unreachable (338..386 of 320)` |
| 2 | **Logo flicker on open.** `app.innerHTML=...` destroyed the loading shell and its logo, and the new intro logo was painted undecoded for a frame. | All, most visible on slower phones | Code review (timing-dependent, not measurable headless) |
| 3 | **Orbit dot jump.** CSS animation restarted from 0° when GSAP replaced it; the ring-offset rule (`top:3%`) lived in the non-critical CSS so the dot moved after first paint. | All | Code review |
| 4 | **Logos are WebP only.** iOS ≤ 13 (iPhone 5s/6 and un-updated phones) and old WebViews cannot decode WebP, so no logos. The favicon was also overwritten with a WebP. | Old iPhones (and any browser without WebP) | Code review + caniuse |
| 5 | **Modern-only CSS with no fallback.** `padding-block` (section spacing and hero padding lost on iOS < 14.5), `inset:0`, `margin-inline`, `min()/clamp()` (no font sizes), flex `gap` (buttons/icons touching on iOS < 14.5). | Old iPhones | Code review |
| 6 | **Notch / safe-area.** `viewport-fit=cover` was set but the skip button, mute button and side padding ignored `env(safe-area-inset-*)` (hidden behind the notch in landscape). | Notched iPhones, landscape | Code review |
| 7 | Possible logo distortion in Safari: an `<img>` with `height:auto` as a flex item can stretch. | Safari | Hardened with `align-self:center; object-fit:contain` |

## 2. Changes (files to upload to the repo root)

`index.html`, `app.js`, `style.css`, `sw.js`, `DEPLOY.md`, `farooq-logo-light.png`, `moe-logo.png`, `oman-2040.png`, `.vercelignore`.
`config.js`, `admin.html`, `vercel.json`, `voice.mp3` and the WebP files are unchanged. `tests/`, `tools/`, `package.json` and `QA.md` are developer files (ignored by `.vercelignore`).

- **Intro layout:** logo, ring and orb sizes come from two CSS variables (`--lg`, `--orb`) set with plain media queries, so the shell, intro and hero always agree. In short landscape viewports the intro switches to two columns (logo | text), and `#icont` scrolls as a safety net, so the button is always reachable.
- **Loading shell → intro hand-off:** the shell stays until the intro logo is decoded (`img.decode()`, 1.5s timeout), then is removed. No blank frame.
- **Logos:** `<picture>` with WebP and PNG fallback (`pics()` in `app.js`, applied to all markup, and the same in the static shell). The certificate canvas and favicon use PNG.
- **Orbit:** CSS only, paused off-screen, frozen for reduced motion. GSAP/Lenis now load only for desktop smooth-scroll.
- **Compatibility:** fallbacks placed before `clamp()`, `padding-block`/`margin-inline`/`inset` replaced, `.nofg` margin fallbacks (class added by `flexGap()` detection), safe-area insets, wider Arabic font fallback stacks, `picture{display:contents}`.
- **Maintainability:** `tools/build.js` copies the critical part of `style.css` (everything above `/*@critical-end*/`) into the inline `<style>` of `index.html` and refreshes `?v=` hashes, so the two copies can no longer drift. Run `node tools/build.js` after editing `style.css`, `app.js` or an image.
- `sw.js` cache renamed `farooq-v2` so phones drop the old cache on the next visit.

Not changed: the logos are raster (WebP/PNG, 360×438 at most). They are sharp at 2× but slightly soft at 3× (iPhone Pro). **If the designer has the original vector or a ≥ 720×876 PNG, send it and it can be swapped in** (a real SVG would be better than anything derived from these files).

## 3. Test matrix

Automated (`npm i` once for `playwright`, then `npm test`): Chromium with each device's viewport, pixel ratio, touch and user-agent, in portrait and landscape.

| Group | Devices | Checks |
|---|---|---|
| iPhone | SE (320×568), 8, 11, 13 mini, 15, 17 Pro Max | intro + hero + open flow |
| Android | Pixel 7, Galaxy S8 (360×740), S24, Z Fold 7 cover (narrow) | same |
| Tablet | iPad Mini | same |
| Desktop | 1366×768, 1920×1080, 1440×900 @2× | same |

Each configuration asserts: no horizontal scroll; every logo loaded, aspect ratio within 1.5% of the file, inside the viewport; logos do not overlap; orb is circular; "open" button reachable and ≥ 44px; hero buttons separated; title fits; opening the invitation removes the intro with no console errors or failed requests; screenshot differs from `tests/baseline` by < 0.2% of pixels.

**Result:** original build 15/25 passed (all 10 landscape phones failed). Patched build 25/25.

Manual matrix (real devices; Chromium cannot reproduce WebKit or Firefox rendering, so this step is required before announcing):

| OS / browser | Why |
|---|---|
| iPhone SE or 6s-7 on iOS 15, Safari | Smallest screen, oldest realistic iOS |
| iPhone 12-15 on iOS 17/18, Safari **and** in-app browser from a WhatsApp link | Most parents open the link from WhatsApp |
| iPhone with notch, landscape | Safe areas, intro fit |
| Android 8-9 low-end phone, Chrome | Low-RAM path (`LOW` mode) |
| Android 13-15 Pixel/Samsung, Chrome and Samsung Internet | Main Android population |
| Android, Firefox | Gecko engine |
| Windows Chrome/Edge/Firefox, macOS Safari/Chrome | Desktop |

Steps per device (the invitation flow):
1. Open the link in the browser (and from WhatsApp). Wait for the intro: logo inside the gold ring, text, name box, gold button all visible **without scrolling**.
2. Rotate to landscape and back. The logo and button stay fully visible.
3. Type a name, tap "افتح دعوتك". No flicker of the logo, doors open, hero appears with 3 logos (ministry, school, vision 2040) undistorted.
4. Scroll the whole page: no sideways scroll; sections spaced evenly; buttons not touching.
5. Tap the speaker button (audio plays only on tap/after opening), play/pause, speed.
6. Tap "أكّد حضورك", send an RSVP, check it arrives.
7. "أضِف إلى تقويم جوجل" and "تحميل ملف التقويم" (date shows 19 Nov 2026, 10:30-13:00).
8. Turn on reduced motion / low-power mode: no orbit motion, page still complete.

Screenshots: `node tests/run.js` writes every screenshot to `tests/out/<device>-<intro|hero>.png`; attach them to the release PR. To refresh baselines after an intentional design change: `npm run test:update` and commit `tests/baseline`. Baselines are generated with blocked web fonts (system fallback), so regenerate them in the same environment (same OS) that runs CI. Use `--engine webkit` or `--engine firefox` on a machine where those Playwright browsers are installed.

## 4. Deployment

1. Create a branch (not `main`), upload the files listed in section 2 (replace old ones). Vercel builds a **Preview URL** for the branch.
2. Open the Preview URL on at least one iPhone and one Android phone and run the manual steps above (also in landscape).
3. Merge to `main`. Vercel promotes automatically.
4. Hard-refresh once (or open in a private tab). Existing visitors pick up the new version on their second visit (service worker `farooq-v2`).
5. Set `og:image` in `index.html` to the full URL (see DEPLOY.md) so the logo shows in WhatsApp previews.

## 5. Rollback

- Fastest: Vercel dashboard → Deployments → previous deployment → **Promote to Production** (instant, no code change).
- Or GitHub: open the merge commit → **Revert** → merge.
- Single-file rollback (e.g. only `style.css`): GitHub → file → History → restore the earlier version, then run/replicate `node tools/build.js` effects (the inline critical CSS in `index.html` must match `style.css`; simplest is to revert both files together).
- After a rollback visitors on `farooq-v2` keep working: assets are versioned by `?v=`, so there is no mixed old/new state.
