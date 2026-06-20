"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildMock, scoreMock, type MockExam } from "@/lib/engine/mockExam";
import { AREA_BY_ID } from "@/lib/content/knowledgeAreas";
import { useProgress } from "@/lib/store/progressStore";
import { Card, Meter, VerifyBadge } from "@/app/components/ui";
import type { Delprov, MockAttempt } from "@/lib/domain/types";

export function MockRunner({ delprov, short }: { delprov: Delprov; short: boolean }) {
  const { state, recordAttempt, reviewItem, updateProfile } = useProgress();
  const [mock] = useState<MockExam>(() => buildMock(delprov, { full: !short }));
  const [startedAt] = useState(() => new Date().toISOString());
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [idx, setIdx] = useState(0);
  const [gloss, setGloss] = useState(state.profile.glossEnabled);
  const [secondsLeft, setSecondsLeft] = useState(mock.timeLimitMinutes * 60);
  const [result, setResult] = useState<MockAttempt | null>(null);

  const submit = useCallback(() => {
    setResult((prev) => {
      if (prev) return prev;
      const attempt = scoreMock(mock, answers, startedAt);
      recordAttempt(attempt);
      // Exam-weighted review (spec §6.8): wrong items get high priority.
      for (const q of mock.questions) {
        const correct = answers[q.id] === q.correctAnswer;
        reviewItem("question", q.id, correct ? 5 : 1);
      }
      return attempt;
    });
  }, [mock, answers, startedAt, recordAttempt, reviewItem]);

  // Countdown timer (only while taking the test).
  useEffect(() => {
    if (result) return;
    if (secondsLeft <= 0) {
      // Auto-submit when the official time limit elapses.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      submit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, result, submit]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers],
  );

  if (mock.questions.length === 0) {
    return (
      <Card>
        <p>Aucune question disponible pour ce delprov pour le moment.</p>
        <Link href="/exam" className="underline">Retour</Link>
      </Card>
    );
  }

  if (result) {
    return <Results mock={mock} result={result} answers={answers} gloss={gloss} delprov={delprov} />;
  }

  const q = mock.questions[idx];
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Delprov {delprov} · Question {idx + 1}/{mock.questions.length}
          {!mock.fullFormat && " · entraînement rapide"}
        </div>
        <div
          className={`font-mono text-sm font-semibold ${
            secondsLeft < 60 ? "text-rose-600" : "text-slate-700"
          }`}
        >
          ⏱ {mm}:{ss}
        </div>
      </div>

      <Meter value={answeredCount / mock.questions.length} />

      <Card>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-slate-400">
            {AREA_BY_ID(q.knowledgeArea)?.glossFr}
          </span>
          <label className="text-xs flex items-center gap-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={gloss}
              onChange={(e) => {
                setGloss(e.target.checked);
                updateProfile({ glossEnabled: e.target.checked });
              }}
            />
            Aide FR
          </label>
        </div>

        <p className="mt-2 font-medium text-lg">{q.swedishText}</p>
        {gloss && <p className="text-sm text-slate-500 italic">{q.frenchGloss}</p>}

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <button
                key={i}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                className={`w-full text-left rounded-lg border px-3 py-2 text-sm transition ${
                  selected
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Précédent
        </button>
        {idx < mock.questions.length - 1 ? (
          <button
            onClick={() => setIdx((i) => i + 1)}
            className="rounded-lg bg-slate-900 text-white px-4 py-1.5 text-sm hover:bg-slate-700"
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={submit}
            className="rounded-lg bg-emerald-600 text-white px-4 py-1.5 text-sm hover:bg-emerald-500"
          >
            Terminer ({answeredCount}/{mock.questions.length})
          </button>
        )}
      </div>
    </div>
  );
}

function Results({
  mock,
  result,
  answers,
  gloss,
  delprov,
}: {
  mock: MockExam;
  result: MockAttempt;
  answers: Record<string, number | undefined>;
  gloss: boolean;
  delprov: Delprov;
}) {
  return (
    <div className="space-y-4">
      <Card className={result.passed ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}>
        <div className="text-sm text-slate-600">Résultat — Delprov {delprov}</div>
        <div className="text-3xl font-bold mt-1">
          {result.score} / {result.scored}
        </div>
        <div className={`mt-1 font-semibold ${result.passed ? "text-emerald-700" : "text-rose-700"}`}>
          {result.passed ? "Seuil atteint ✓" : "Sous le seuil — continuez"}
        </div>
        {!mock.fullFormat && (
          <p className="text-xs text-slate-500 mt-1">
            Entraînement rapide (la préparation se valide sur des examens au format complet).
          </p>
        )}
        {mock.unverified && (
          <p className="text-xs mt-2">
            <VerifyBadge /> Les seuils et le format sont des valeurs de référence à confirmer.
          </p>
        )}
      </Card>

      <Card>
        <h3 className="font-semibold mb-2">Par domaine</h3>
        <ul className="space-y-2">
          {Object.entries(result.perArea).map(([areaId, [c, t]]) => (
            <li key={areaId}>
              <div className="flex justify-between text-sm">
                <span>{AREA_BY_ID(areaId)?.glossFr ?? areaId}</span>
                <span className="text-slate-500">{c}/{t}</span>
              </div>
              <Meter value={t ? c / t : 0} />
            </li>
          ))}
        </ul>
      </Card>

      <details>
        <summary className="cursor-pointer font-semibold">Corrigé détaillé</summary>
        <div className="mt-3 space-y-3">
          {mock.questions.map((q) => {
            const chosen = answers[q.id];
            const ok = chosen === q.correctAnswer;
            return (
              <Card key={q.id} className={ok ? "" : "border-rose-200"}>
                <p className="font-medium">{q.swedishText}</p>
                {gloss && <p className="text-sm text-slate-500 italic">{q.frenchGloss}</p>}
                <p className="text-sm mt-2">
                  <span className={ok ? "text-emerald-700" : "text-rose-700"}>
                    {ok ? "✓" : "✗"}
                  </span>{" "}
                  Bonne réponse : <strong>{q.options[q.correctAnswer]}</strong>
                </p>
                <p className="text-sm text-slate-600 mt-1">{q.frenchExplanation}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Termes clés : {q.swedishKeyTerms.join(", ")}
                </p>
              </Card>
            );
          })}
        </div>
      </details>

      <div className="flex gap-2">
        <Link href={`/exam/mock/${delprov}`} className="rounded-lg bg-slate-900 text-white px-4 py-1.5 text-sm hover:bg-slate-700">
          Recommencer
        </Link>
        <Link href="/exam" className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm hover:bg-slate-50">
          Retour au hub
        </Link>
      </div>
    </div>
  );
}
