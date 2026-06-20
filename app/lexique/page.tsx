"use client";

import { useMemo, useState } from "react";
import { EXAM_VOCABULARY, VOCAB_DOMAINS } from "@/lib/content/examVocabulary";
import { useProgress } from "@/lib/store/progressStore";
import { Card, Meter, PageTitle } from "@/app/components/ui";
import type { ExamTerm } from "@/lib/domain/types";

// Speak Swedish via the Web Speech API where available.
function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sv-SE";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function Lexique() {
  const { state, reviewItem } = useProgress();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("Tous");
  const [hideFr, setHideFr] = useState(false);
  const [queue, setQueue] = useState<ExamTerm[] | null>(null); // review mode

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXAM_VOCABULARY.filter((t) => {
      if (domain !== "Tous" && t.domain !== domain) return false;
      if (!q) return true;
      return t.swedish.toLowerCase().includes(q) || t.french.toLowerCase().includes(q);
    });
  }, [query, domain]);

  // How many terms the learner has reviewed at least once successfully.
  const learned = useMemo(
    () =>
      EXAM_VOCABULARY.filter((t) => {
        const r = state.reviewItems[`vocab:${t.id}`];
        return r && r.successCount > 0;
      }).length,
    [state.reviewItems],
  );

  function startReview() {
    // Order by SRS due date (unseen first), so weak/new terms come up first.
    const ordered = [...filtered].sort((a, b) => {
      const ra = state.reviewItems[`vocab:${a.id}`];
      const rb = state.reviewItems[`vocab:${b.id}`];
      const da = ra ? new Date(ra.dueDate).getTime() : 0;
      const db = rb ? new Date(rb.dueDate).getTime() : 0;
      return da - db;
    });
    setQueue(ordered);
  }

  if (queue) {
    return <ReviewMode queue={queue} onGrade={reviewItem} onExit={() => setQueue(null)} />;
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Lexique d'examen — suédois → français"
        subtitle="Tous les mots-clés suédois de l'examen, dans une seule liste à mémoriser. L'examen se passe en suédois : ce vocabulaire est la base."
      />

      <Card className="bg-amber-50 border-amber-200">
        <div className="flex justify-between text-sm mb-1">
          <span>Progression de mémorisation</span>
          <span className="font-medium">
            {learned} / {EXAM_VOCABULARY.length}
          </span>
        </div>
        <Meter value={EXAM_VOCABULARY.length ? learned / EXAM_VOCABULARY.length : 0} />
      </Card>

      <div className="flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher (suédois ou français)…"
          className="flex-1 min-w-[180px] rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="rounded-lg border border-slate-300 px-2 py-2 text-sm bg-white"
        >
          <option value="Tous">Tous les domaines</option>
          {VOCAB_DOMAINS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={hideFr} onChange={(e) => setHideFr(e.target.checked)} />
          Masquer les traductions (auto-test)
        </label>
        <button
          onClick={startReview}
          className="rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-700"
        >
          Mode révision ({filtered.length})
        </button>
      </div>

      <div className="text-xs text-slate-500">{filtered.length} mot(s)</div>

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {filtered.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-3 px-3 py-2">
            <div className="min-w-0">
              <div className="font-medium flex items-center gap-2">
                <button
                  onClick={() => speak(t.swedish)}
                  className="shrink-0 rounded-full bg-amber-300 px-1.5 text-xs"
                  aria-label="Écouter"
                  title="Écouter"
                >
                  🔊
                </button>
                <span>{t.swedish}</span>
              </div>
              <div className={`text-sm ${hideFr ? "text-transparent select-none" : "text-slate-600"}`}>
                {t.french}
              </div>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-slate-400">
              {t.domain}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewMode({
  queue,
  onGrade,
  onExit,
}: {
  queue: ExamTerm[];
  onGrade: (type: "vocab", id: string, quality: number) => void;
  onExit: () => void;
}) {
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const term = queue[pos];

  function grade(quality: number) {
    onGrade("vocab", term.id, quality);
    setDone((d) => d + 1);
    setRevealed(false);
    setPos((p) => (p + 1) % queue.length);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Révision du lexique" />
        <button onClick={onExit} className="text-sm text-slate-500 underline">
          Quitter
        </button>
      </div>

      <div className="text-xs text-slate-500">
        {done} révisé(s) · {queue.length} dans la file
      </div>

      <Card className="flex flex-col items-center text-center py-8">
        <button
          onClick={() => speak(term.swedish)}
          className="mb-2 rounded-full bg-amber-300 px-2 py-1 text-sm"
          aria-label="Écouter"
        >
          🔊
        </button>
        <div className="text-2xl font-bold">{term.swedish}</div>
        <div className="text-[10px] uppercase tracking-wide text-slate-400 mt-1">
          {term.domain}
        </div>

        {revealed ? (
          <>
            <div className="mt-4 text-lg text-slate-700">{term.french}</div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => grade(2)}
                className="rounded-lg border border-rose-300 text-rose-700 px-4 py-1.5 text-sm"
              >
                À revoir
              </button>
              <button
                onClick={() => grade(5)}
                className="rounded-lg border border-emerald-300 text-emerald-700 px-4 py-1.5 text-sm"
              >
                Su ✓
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="mt-5 rounded-lg bg-slate-900 text-white px-5 py-1.5 text-sm hover:bg-slate-700"
          >
            Afficher la traduction
          </button>
        )}
      </Card>
    </div>
  );
}
