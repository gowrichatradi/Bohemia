# Arctic → Alpine

An offline-first trip app for the Norway → Bavaria → Bohemia itinerary, 30 September to 18 October 2026. Built to live on the iPhone home screen and work with no signal.

---

## Put it on GitHub Pages

**1 · Make the repo.** On github.com click **New repository**. Name it `trip` (or anything). Set it **Public** — Pages needs public on the free plan. Don't add a README.

**2 · Upload.** On the empty repo page click **uploading an existing file**, then drag in every file from this folder:

```
index.html   app.js   data.js   sw.js
manifest.webmanifest
icon-180.png   icon-192.png   icon-512.png
```

Commit.

**3 · Turn Pages on.** Repo → **Settings** → **Pages** in the left sidebar → under *Source* pick **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.

**4 · Wait ~60 seconds.** The URL appears at the top of that same Pages screen:

```
https://YOURNAME.github.io/trip/
```

---

## Put it on the iPhone

Open that URL **in Safari** — not Chrome, Safari is the only browser on iOS that can install a web app.

Tap **Share** (the square with the arrow) → scroll down → **Add to Home Screen** → **Add**.

You now have an icon. Open it once while online so the service worker caches everything; after that it works in flight mode, in a Lofoten valley, anywhere.

---

## What it does

**Today** — knows the date. Before the trip it counts down and shows the action list. During the trip it shows that day in full: dawn shoot, morning, afternoon, dusk, markets, cafés, and the practical notes.

**Days** — all 19, with the current day highlighted and past days dimmed. Tap any for the full detail, then swipe between neighbours.

**Bookings** — every reference number. Tap one to copy it to the clipboard.

**Guide** — five tabs: the sunrise/sunset table, what to eat, groceries and Indian shops, packing, and the child list.

**Search** — the magnifier top right searches every day, place, café and booking at once.

---

## Editing it later

All the content lives in **`data.js`** as one JSON object. Edit it on github.com directly (click the file → pencil icon → commit) and the site updates in about a minute.

If you change anything, **bump the cache version** in `sw.js` — change `arctic-alpine-v1` to `v2`. Otherwise phones that have already cached the old version won't see your edit.

---

## Notes

**Offline.** The service worker caches everything on first load and serves cache-first afterwards, so it never needs data again.

**No tracking, no accounts, no network calls.** Nothing leaves the phone.

**Fonts** are the iOS system stack — SF Pro for text, New York for headings — so nothing is downloaded and it looks native.

**Dark only.** It's a photography trip; the app is built for reading at dawn without wrecking your night vision.
