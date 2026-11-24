# Goal OS

Your Notion "Goal Operating System" as an installable app: one tap per goal, rules applied automatically, a 5-minute Sunday review, German exercises built in. Plain HTML/JS, no build step.

## 1 · Put it online and install it (10 min)

The app must be served over HTTPS to install and work offline. Easiest free routes:

- **GitHub Pages**: create a repository, upload the contents of this folder, then Settings → Pages → Deploy from branch → `main` / root.
- **Netlify Drop**: drag this folder onto https://app.netlify.com/drop.

Then open the link:
- **Windows (Chrome/Edge)**: address bar → install icon ("Install Goal OS"). It gets its own window, Start-menu entry and taskbar icon.
- **Android (Chrome)**: menu → "Add to Home screen" / "Install app".
- **iPhone (Safari)**: Share → "Add to Home Screen".

To try it locally first: `python -m http.server 8000` in this folder, then open http://localhost:8000.

Without step 2 the app already works fully on one device (data stays in that browser; Settings → Export backup).

## 2 · Sync between PC and phone (10 min, once)

1. Create a free project at https://supabase.com.
2. SQL editor → paste `supabase/schema.sql` → Run.
3. Authentication → Sign In / Providers → Email: turn **off** "Confirm email" (simplest for a single-user project).
4. Project Settings → API: copy the **Project URL** and the **anon / publishable key**.
5. In the app: ⚙️ → paste both, enter an email and password → **Create account** (first device) / **Sign in** (other devices).

The app then syncs on every change and every time it is opened. Changes merge per day and per goal, so ticking on the phone and editing on the PC do not overwrite each other.

## 3 · Alerts

- ⚙️ → **Turn on notifications**. While the app is open or installed and running, you get the evening nudge (default 20:30, listing what is still open) and the Sunday 18:00 review reminder. Everything else (lapse, milestone at ~75%, relevance note, audit, reallocation) appears in the 🔔 inbox and on the Today banner.
- **Alerts while the app is closed (optional)** need a push sender. One is included but has not been run against a live project yet:
  1. `npx web-push generate-vapid-keys`
  2. `supabase functions deploy nudge --no-verify-jwt` and set secrets `VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT=mailto:you@example.com`
  3. Schedule it with the commented block at the end of `schema.sql`.
  4. Paste the VAPID **public** key in ⚙️ on each device and turn notifications on again.

## Updating

Edit files, bump `V` in `sw.js`, redeploy. Goals, cues, levels, rotations, plans and links are all editable in the app (Goals tab); new goals can be added there.

## Files

`core.js` rules (day mode, weekly review, alerts, German scheduling, sync merge) · `german.js` 42 units / 460 exercise items · `app.js` interface · `sw.js` offline + notifications · `test/core.test.js` (`node test/core.test.js`).
