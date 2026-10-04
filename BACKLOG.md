# BACKLOG — fatlind-azemi-portfolio

Stand: Review vom 2026-10-04 (Live-HTML, Header, Quellcode).
Alles hier wird in `~/work/fatlind-azemi-portfolio` umgesetzt, nie in `~/sites/...`.
Nach Abnahme: `~/work/bin/promote.sh fatlind-azemi-portfolio --yes`.

Legende: P1 = großer Hebel, P2 = wichtig, P3 = Feinschliff.

## Status — Branch `task/b1-b2-prerender-i18n` (wartet auf Abnahme)

- [x] **B1** Prerender: `dist/index.html` (de) + `dist/en/index.html` (en) mit echtem
      SSR-Markup; Crawler sehen Inhalte ohne JS. Neue Dateien: `src/entry-server.tsx`,
      `scripts/prerender.mjs`; Build-Schritt in `package.json`.
- [x] **B2** Sprachen: `/` = Deutsch (kanonisch), `/en/` = Englisch, `hreflang`
      (de/en/x-default) + `canonical` + `og:locale` je Seite; Sitemap mit Alternates.
      **Verhaltensänderung:** Sprachumschalter ist jetzt ein Link (Seitenwechsel),
      Sprache kommt aus der URL — keine Browser-Automatik/`localStorage`-Vorwahl mehr.
- [x] **B5** CSP als `<meta http-equiv="Content-Security-Policy">` (self-only,
      `style-src 'unsafe-inline'` wegen Framer-Motion-Inline-Styles). Der frühere
      Inline-Sprach-Script ist entfernt → `script-src 'self'` ohne `unsafe-inline`.
- [x] **B7** `og:locale` jetzt `de_DE` / Alternativ `en_US` (erledigt mit B2).
- [ ] **B3** reines CV — im Code kein Handlungsbedarf; Prüfen, dass nirgends etwas
      verlinkt ist (aktuell korrekt).
- [ ] **B4** Zahlen — offen (Freigabe/Konkretisierung durch Nutzer).
- [ ] **B6** Sitemap `lastmod` dynamisch setzen.
- [ ] **B8** LCP erneut messen.

**Noch nicht verifiziert:** Hydration im echten Browser (hier kein laufender Chromium);
B1/B2 sind bislang per HTTP/Build geprüft, nicht visuell.

---

## P1 — SEO & Auffindbarkeit

### B1 — Seite prerendern (CSR → statisches HTML)
**Problem:** nginx liefert nur `<div id="root">` + JS-Bundle. Crawler und
Vorschau-Dienste sehen **keinen Inhalt**; Ranking und Social-Snippets hängen am JS.
**Ziel:** Inhalt beim ersten HTML-Response vorhanden (SSG/Prerender).
**Optionen:** (a) `vite-plugin-ssr`/`vike`, (b) Umzug auf Astro, (c) minimal:
`vite-plugin-prerender`/`ssg` für die eine Seite + Legal-Seiten.
**Akzeptanz:** `curl -s https://…/` enthält H1/Projekttexte ohne JS.

### B2 — Sprache sauber ausliefern
**Problem:** statisch `lang="en"`, per Inline-JS auf DE geschaltet; **eine** URL für
DE+EN → Google indexiert nur eine Sprache. Zielgruppe ist DE.
**Ziel:** `lang="de"` als Default, getrennte URLs `/de` + `/en` (oder `/`=de, `/en`),
`hreflang`-Tags, `x-default`.
**Akzeptanz:** beide Sprachversionen indexierbar, `hreflang` valide.

### B3 — Positionierung & Verlinkung
**Entscheidung (2026-10-04, korrigiert):** Portfolio ist ein **reines Lebenslauf-Projekt**.
**Keine** Erwähnung von und **keine Links zu** `azemi-digital.de` oder `nexko.de` — auch
nicht im Kleingedruckten, Footer oder in den Cases.

**Akzeptanz:** Auftritt bleibt vollständig auf Person/Enterprise-Data-Engineering fokussiert,
ohne firmen- oder produktbezogene Querverweise.

---

## P2 — Vertrauen & Technik

### B4 — Metriken prüfen (NDA!) und konkretisieren
**Problem:** „Tausende Objekte", „rund ein Drittel", „über 99 %" — vage und potenziell
Arbeitgeber-/Kundendaten. Veröffentlichung vorher freigeben lassen.
**Ziel:** Entweder echte, freigegebene Zahlen oder neutralere Formulierung.

### B5 — Content-Security-Policy ergänzen
**Freigabe (2026-10-04):** erlaubt.
**Umsetzung ohne Serverzugriff:** CSP als `<meta http-equiv="Content-Security-Policy">` in
`index.html` — die Seite ist vollständig self-hosted (Fonts/Bilder), daher streng möglich:
`default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'`.
Der Inline-Sprach-Script wird nach extern (`/lang-init.js`) verschoben, damit `script-src 'self'`
ohne `unsafe-inline` gilt. (Optional zusätzlich als nginx-Header — braucht sudo, nicht nötig.)

### B6 — Sitemap & robots pflegen
**Problem:** `lastmod` fix auf 2026-09-17; neue Inhalte werden nicht signalisiert.
**Ziel:** `lastmod` beim Build setzen (oder bei Release aktualisieren).

---

## P3 — Feinschliff

### B7 — OG-Locale drehen
`og:locale` ist `en` mit `de_DE` als alternativ — bei DE-Fokus umgekehrt.

### B8 — Performance-Check (LCP)
Fonts + Portrait sind schon preloadet; nach B1 erneut messen (Ziel LCP < 2 s mobil).

---

## Offene Fragen an den Nutzer
- B3: Portfolio-Rolle (CV vs. Firmen-Vertrauensseite)?
- B4: Welche Zahlen sind freigegeben?
- B5: nginx-Header-Änderung erlaubt (einmalig, betrifft Produktionsserver)?
