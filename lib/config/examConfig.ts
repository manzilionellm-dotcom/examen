import type { Delprov } from "@/lib/domain/types";

// ---------------------------------------------------------------------------
// EXAM-FIDELITY CONFIGURATION (spec §5)
//
// ⚠️  ALL NUMERIC VALUES BELOW ARE REFERENCE PLACEHOLDERS and MUST be verified
// against the CURRENT official sources before launch:
//   - Trafikverket provspecifikation (kunskapsprov för taxiförarlegitimation)
//   - Transportstyrelsen (taxiförarlegitimation requirements)
//
// They are intentionally kept here as DATA (never hardcoded inside business
// logic) so they can be corrected without touching the exam engine, and shipped
// as over-the-air content updates (spec §10). Each field carries a `verified`
// flag; the UI surfaces "VERIFY against current Trafikverket provspecifikation"
// wherever `verified === false`.
// ---------------------------------------------------------------------------

export interface DelprovConfig {
  delprov: Delprov;
  swedishName: string;
  glossFr: string;
  /** Total questions presented (scored + unscored test questions). */
  totalQuestions: number;
  /** Scored questions (the rest are unscored "test questions"). */
  scoredQuestions: number;
  /** Minimum correct scored answers to pass. */
  passThreshold: number;
  /** Time limit in minutes. */
  timeLimitMinutes: number;
  /** Whether these figures have been verified against the live source. */
  verified: boolean;
}

export const DELPROV_CONFIG: Record<Delprov, DelprovConfig> = {
  1: {
    delprov: 1,
    swedishName: "Säkerhet och beteende",
    glossFr: "Sécurité et comportement",
    totalQuestions: 70,
    scoredQuestions: 65,
    passThreshold: 48,
    timeLimitMinutes: 50,
    verified: false, // VERIFY against current Trafikverket provspecifikation
  },
  2: {
    delprov: 2,
    swedishName: "Lagstiftning",
    glossFr: "Législation",
    totalQuestions: 50,
    scoredQuestions: 46,
    passThreshold: 34,
    timeLimitMinutes: 50,
    verified: false, // VERIFY against current Trafikverket provspecifikation
  },
};

/** Both delprov must be passed within this window from the first pass. */
export const DELPROV_VALIDITY_WINDOW_MONTHS = {
  value: 6,
  verified: false, // VERIFY
};

/** Each delprov is passed on its own — no cross-area compensation (spec §5.1). */
export const NO_CROSS_AREA_COMPENSATION = true;

/** Minimum age to be *granted* the legitimation (spec §5.8). */
export const MIN_AGE_FOR_LEGITIMATION = { value: 21, verified: false };

/** Readiness gating (spec §5.10): the learner is only told they are ready when
 * they consistently clear the threshold on full-format timed mocks, with no
 * knowledge area below the floor. */
export const READINESS = {
  /** Number of recent full-format attempts that must all pass. */
  consecutivePassesRequired: 3,
  /** Per-area floor: share correct that no area may fall below. */
  perAreaFloor: 0.6,
};

/** Reference fees (SEK) — display only, VERIFY with the authorities (spec §5.9). */
export const REFERENCE_FEES = {
  perDelprov: { value: 420, currency: "SEK", verified: false },
  korprov: { value: 1800, currency: "SEK", verified: false },
  application: { value: 700, currency: "SEK", verified: false },
};

export const PERSISTENT_DISCLAIMER_FR =
  "Cette application propose une préparation non officielle. Elle n'est " +
  "affiliée ni à Transportstyrelsen, ni à Trafikverket, ni à aucune autorité " +
  "suédoise officielle. Vérifiez toujours les exigences actuelles auprès des " +
  "autorités officielles.";
