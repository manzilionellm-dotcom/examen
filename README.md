# TaxiSvenska Français

Unofficial, French-language preparation app for the **Swedish taxi-driver
knowledge test** (kunskapsprov för taxiförarlegitimation) and related steps,
built as a **Next.js 16 web app** (offline-first, installable-friendly).

> ⚠️ **Disclaimer.** This app provides *unofficial* preparation. It is **not**
> affiliated with Transportstyrelsen, Trafikverket, or any official Swedish
> authority, and makes **no guarantee of passing**. All practice content is
> **original** — no official exam questions or test maps are copied. Always
> verify current requirements with the official authorities.

## What it does

The product spine is the **exam engine**: original, exam-format practice in
Swedish across both **delprov**, with French glosses for learning and a
Swedish-only mode that simulates the real test.

| Area | Route | Notes |
|------|-------|-------|
| Home dashboard | `/` | Streak, per-delprov readiness meters, current week |
| Exam hub | `/exam` | Delprov structure, knowledge areas, mock launchers |
| Mock exam | `/exam/mock/[delprov]` | Timed, per-delprov threshold, FR-gloss toggle, corrigé |
| Road signs | `/signs` | Recognition drills with spaced repetition (original SVG art) |
| Taximeter / calc | `/calc` | Procedurally generated fare / change / surcharge problems |
| Phrase bank | `/phrases` | Functional taxi Swedish + TTS + self-rated SRS |
| Eligibility | `/eligibility` | Informational self-check of blocking criteria |
| Démarches | `/booking` | Booking, fees, tolk, validity windows, official sources |

## Architecture

- **`lib/domain`** — TypeScript data model (questions, signs, phrases, progress…).
- **`lib/config`** — exam-fidelity config. **All official numbers are reference
  placeholders flagged `verified: false`** and surfaced in the UI with an
  "À vérifier" badge. Never hardcode legal/exam facts in business logic.
- **`lib/content`** — data-driven content (question bank, signs, phrases,
  eligibility, logistics, official-source metadata, 56-day curriculum).
- **`lib/engine`** — pure logic: SM-2 spaced repetition, mock builder
  (samples by knowledge-area weight), readiness gating, calculation generator.
- **`lib/store`** — offline-first progress persistence via `localStorage`.
- **`app/`** — App Router pages + presentational components.

The gloss language is a profile parameter (`nativeLanguage`) so the same Swedish
exam engine can later serve other native languages.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Status / next steps

This is an MVP slice that demonstrates the full vertical: data-driven content →
engine → screens. To productionize: grow the question bank toward the spec
targets (≥600 MVP, ≥1500 production), **verify every `verified: false` figure**
against current Trafikverket/Transportstyrelsen sources, and add the map-reading
and körprov modules. See `AGENTS.md` for project conventions.
