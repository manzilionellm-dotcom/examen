import { DELPROV_CONFIG } from "@/lib/config/examConfig";
import { AREAS_BY_DELPROV } from "@/lib/content/knowledgeAreas";
import { QUESTIONS_BY_DELPROV } from "@/lib/content/questions";
import type { Delprov, MockAttempt, MockQuestion } from "@/lib/domain/types";

// Mock-exam engine (spec §5.1): reproduces the official delprov format —
// correct question count, per-area weighting, per-delprov timer and threshold.

export interface MockExam {
  delprov: Delprov;
  questions: MockQuestion[];
  scoredCount: number;
  passThreshold: number;
  timeLimitMinutes: number;
  fullFormat: boolean;
  /** True when the live exam numbers are still unverified placeholders. */
  unverified: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a mock for a delprov. Samples questions proportionally to each area's
 * weight so a full mock mirrors the real weighting. If the seed bank is too
 * small to fill the official count, `fullFormat` is false and we use what we
 * have (the engine scales automatically as the bank grows — spec §5.2).
 */
export function buildMock(delprov: Delprov, opts?: { full?: boolean }): MockExam {
  const cfg = DELPROV_CONFIG[delprov];
  const pool = QUESTIONS_BY_DELPROV(delprov);
  const target = opts?.full === false ? Math.min(10, pool.length) : cfg.totalQuestions;

  const areas = AREAS_BY_DELPROV(delprov);
  const byArea = new Map<string, MockQuestion[]>();
  for (const a of areas) byArea.set(a.id, shuffle(pool.filter((q) => q.knowledgeArea === a.id)));

  const picked: MockQuestion[] = [];
  // Proportional allocation by area weight.
  for (const a of areas) {
    const want = Math.round(target * a.weight);
    const fromArea = byArea.get(a.id) ?? [];
    picked.push(...fromArea.slice(0, want));
  }
  // Top up (or trim) to hit the target as closely as the bank allows.
  if (picked.length < target) {
    const remaining = shuffle(pool.filter((q) => !picked.includes(q)));
    picked.push(...remaining.slice(0, target - picked.length));
  }
  const questions = shuffle(picked).slice(0, Math.min(target, pool.length));

  return {
    delprov,
    questions,
    scoredCount: questions.length,
    passThreshold: cfg.passThreshold,
    timeLimitMinutes: cfg.timeLimitMinutes,
    fullFormat: questions.length >= cfg.totalQuestions,
    unverified: !cfg.verified,
  };
}

/** Score answers (answer index per question id) into a MockAttempt. */
export function scoreMock(
  mock: MockExam,
  answers: Record<string, number | undefined>,
  startedAt: string,
): MockAttempt {
  const cfg = DELPROV_CONFIG[mock.delprov];
  const perArea: Record<string, [number, number]> = {};
  let correct = 0;

  for (const qn of mock.questions) {
    const [c, t] = perArea[qn.knowledgeArea] ?? [0, 0];
    const ok = answers[qn.id] === qn.correctAnswer;
    perArea[qn.knowledgeArea] = [c + (ok ? 1 : 0), t + 1];
    if (ok) correct += 1;
  }

  // Pass threshold scales with how full the format is (placeholder-safe).
  const scaledThreshold = mock.fullFormat
    ? cfg.passThreshold
    : Math.ceil((cfg.passThreshold / cfg.scoredQuestions) * mock.questions.length);

  return {
    id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    delprov: mock.delprov,
    startedAt,
    score: correct,
    scored: mock.questions.length,
    passed: correct >= scaledThreshold,
    perArea,
    fullFormat: mock.fullFormat,
  };
}
