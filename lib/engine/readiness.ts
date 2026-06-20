import { READINESS } from "@/lib/config/examConfig";
import { AREAS_BY_DELPROV } from "@/lib/content/knowledgeAreas";
import type { Delprov, MockAttempt } from "@/lib/domain/types";

// Readiness gating (spec §5.10). We never declare the learner "ready" until
// they CONSISTENTLY clear the threshold on full-format attempts, with no
// knowledge area below the floor. Transparent per-delprov / per-area output.

export interface AreaReadiness {
  areaId: string;
  swedishName: string;
  glossFr: string;
  /** Rolling share correct (0..1) across counted attempts, or null. */
  share: number | null;
  aboveFloor: boolean;
}

export interface DelprovReadiness {
  delprov: Delprov;
  attemptsCounted: number;
  recentPasses: number;
  /** Rolling pass-rate style score (0..1) for the meter. */
  rollingScore: number;
  perArea: AreaReadiness[];
  isReady: boolean;
  /** Why not ready, in the learner's language (empty when ready). */
  reasonsFr: string[];
}

export function computeReadiness(
  delprov: Delprov,
  attempts: MockAttempt[],
): DelprovReadiness {
  const all = attempts
    .filter((a) => a.delprov === delprov)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  // Readiness is judged on full-format attempts only.
  const full = all.filter((a) => a.fullFormat);
  const recent = full.slice(0, READINESS.consecutivePassesRequired);
  const recentPasses = recent.filter((a) => a.passed).length;

  // Aggregate per-area share across recent full-format attempts.
  const areas = AREAS_BY_DELPROV(delprov);
  const agg: Record<string, [number, number]> = {};
  for (const a of recent) {
    for (const [areaId, [c, t]] of Object.entries(a.perArea)) {
      const [pc, pt] = agg[areaId] ?? [0, 0];
      agg[areaId] = [pc + c, pt + t];
    }
  }

  const perArea: AreaReadiness[] = areas.map((area) => {
    const [c, t] = agg[area.id] ?? [0, 0];
    const share = t > 0 ? c / t : null;
    return {
      areaId: area.id,
      swedishName: area.swedishName,
      glossFr: area.glossFr,
      share,
      aboveFloor: share === null ? false : share >= READINESS.perAreaFloor,
    };
  });

  const rollingScore =
    recent.length > 0
      ? recent.reduce((s, a) => s + (a.scored ? a.score / a.scored : 0), 0) /
        recent.length
      : 0;

  const reasonsFr: string[] = [];
  if (full.length < READINESS.consecutivePassesRequired) {
    reasonsFr.push(
      `Passez ${READINESS.consecutivePassesRequired} examens blancs au format ` +
        `complet (vous en avez fait ${full.length}).`,
    );
  }
  if (recentPasses < recent.length || recent.length === 0) {
    reasonsFr.push(
      "Réussissez systématiquement le seuil sur vos derniers examens blancs.",
    );
  }
  const weakAreas = perArea.filter((p) => p.share !== null && !p.aboveFloor);
  if (weakAreas.length > 0) {
    reasonsFr.push(
      "Renforcez les domaines faibles : " +
        weakAreas.map((w) => w.glossFr).join(", ") +
        ".",
    );
  }

  const isReady =
    full.length >= READINESS.consecutivePassesRequired &&
    recentPasses === recent.length &&
    perArea.every((p) => p.aboveFloor);

  return {
    delprov,
    attemptsCounted: recent.length,
    recentPasses,
    rollingScore,
    perArea,
    isReady,
    reasonsFr,
  };
}
