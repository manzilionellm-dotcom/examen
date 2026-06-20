"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store/progressStore";
import { computeReadiness } from "@/lib/engine/readiness";
import { DELPROV_CONFIG } from "@/lib/config/examConfig";
import { CURRICULUM } from "@/lib/content/curriculum";
import { ELIGIBILITY_CRITERIA } from "@/lib/content/eligibility";
import { Card, Meter, PageTitle, TileLink, VerifyBadge } from "@/app/components/ui";
import type { Delprov } from "@/lib/domain/types";

export default function Home() {
  const { state, ready } = useProgress();
  if (!ready) return <p className="text-slate-500">Chargement…</p>;

  const currentWeek =
    CURRICULUM[Math.min(Math.floor((state.profile.currentDay - 1) / 7), 7)] ??
    CURRICULUM[0];

  const blockers = ELIGIBILITY_CRITERIA.filter(
    (c) => c.blocking && state.eligibility[c.id] === "blocked",
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Préparez votre taxiförarlegitimation"
        subtitle="Préparation efficace et honnête à l'examen suédois, en français."
      />

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="text-3xl font-bold">{state.profile.streakCount}</div>
          <div className="text-sm text-slate-600">jours d&apos;affilée 🔥</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold">{state.attempts.length}</div>
          <div className="text-sm text-slate-600">examens blancs réalisés</div>
        </Card>
      </div>

      {blockers.length > 0 && (
        <Card className="border-rose-300 bg-rose-50">
          <p className="text-sm text-rose-800">
            ⛔ {blockers.length} point(s) d&apos;éligibilité bloquant(s) détecté(s).{" "}
            <Link href="/eligibility" className="underline font-medium">
              Vérifier
            </Link>
          </p>
        </Card>
      )}

      <section>
        <h2 className="font-semibold mb-2">Préparation à l&apos;examen (votre objectif)</h2>
        <div className="space-y-3">
          {([1, 2] as Delprov[]).map((d) => {
            const r = computeReadiness(d, state.attempts);
            const cfg = DELPROV_CONFIG[d];
            return (
              <Card key={d}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    Delprov {d} — {cfg.glossFr}{" "}
                    {!cfg.verified && <VerifyBadge />}
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                      r.isReady
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {r.isReady ? "Prêt ✓" : "En cours"}
                  </span>
                </div>
                <div className="mt-2">
                  <Meter value={r.rollingScore} />
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  {r.isReady
                    ? "Vous dépassez le seuil de façon constante au format complet."
                    : r.reasonsFr[0] ?? "Commencez un examen blanc."}
                </p>
                <Link
                  href={`/exam/mock/${d}`}
                  className="mt-3 inline-block rounded-lg bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
                >
                  Lancer un examen blanc
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="bg-amber-50 border-amber-200">
        <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold">
          Semaine {currentWeek.week} / 8 — programme 56 jours
        </div>
        <div className="mt-1 font-semibold">{currentWeek.titleFr}</div>
        <p className="text-sm text-slate-700 mt-1">{currentWeek.examFocusFr}</p>
      </Card>

      <section>
        <h2 className="font-semibold mb-2">Entraîneurs</h2>
        <div className="grid grid-cols-2 gap-3">
          <TileLink href="/exam" emoji="📝" title="Hub examen" desc="Domaines, théorie, examens blancs" />
          <TileLink href="/lexique" emoji="📚" title="Lexique" desc="Tout le vocabulaire suédois de l'examen" />
          <TileLink href="/signs" emoji="🚸" title="Panneaux" desc="Reconnaissance + révision espacée" />
          <TileLink href="/calc" emoji="🧮" title="Taximètre" desc="Calculs de prix et de monnaie" />
          <TileLink href="/phrases" emoji="💬" title="Phrases" desc="Suédois fonctionnel du taxi" />
          <TileLink href="/eligibility" emoji="✅" title="Éligibilité" desc="Vérifiez les conditions" />
          <TileLink href="/booking" emoji="🗂️" title="Démarches" desc="Réservation, frais, tolk" />
        </div>
      </section>
    </div>
  );
}
