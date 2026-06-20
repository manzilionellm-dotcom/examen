"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store/progressStore";
import { computeReadiness } from "@/lib/engine/readiness";
import { DELPROV_CONFIG, NO_CROSS_AREA_COMPENSATION, DELPROV_VALIDITY_WINDOW_MONTHS } from "@/lib/config/examConfig";
import { AREAS_BY_DELPROV } from "@/lib/content/knowledgeAreas";
import { QUESTIONS_BY_DELPROV } from "@/lib/content/questions";
import { Card, Meter, PageTitle, VerifyBadge } from "@/app/components/ui";
import type { Delprov } from "@/lib/domain/types";

export default function ExamHub() {
  const { state, ready } = useProgress();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Hub examen — kunskapsprov"
        subtitle="Le test officiel se passe en suédois. Entraînez-vous au format réel, avec ou sans aide française."
      />

      <Card className="bg-slate-50 text-sm text-slate-700">
        <p>
          Le <strong>kunskapsprov</strong> comporte deux <strong>delprov</strong>.
          {NO_CROSS_AREA_COMPENSATION &&
            " Chaque delprov se réussit séparément : un bon score dans un domaine ne compense pas un domaine faible."}{" "}
          Les deux doivent être réussis dans un délai de{" "}
          {DELPROV_VALIDITY_WINDOW_MONTHS.value} mois <VerifyBadge /> après le premier réussi.
        </p>
      </Card>

      {([1, 2] as Delprov[]).map((d) => {
        const cfg = DELPROV_CONFIG[d];
        const r = ready ? computeReadiness(d, state.attempts) : null;
        const bankSize = QUESTIONS_BY_DELPROV(d).length;
        return (
          <Card key={d}>
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold text-lg">
                Delprov {d} — {cfg.swedishName}
              </h2>
              {!cfg.verified && <VerifyBadge />}
            </div>
            <p className="text-sm text-slate-600">{cfg.glossFr}</p>

            <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="Questions" value={`${cfg.totalQuestions}`} />
              <Stat label="Seuil" value={`≥ ${cfg.passThreshold}`} />
              <Stat label="Temps" value={`${cfg.timeLimitMinutes} min`} />
            </dl>

            {r && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Préparation</span>
                  <span>{r.isReady ? "Prêt ✓" : "En cours"}</span>
                </div>
                <Meter value={r.rollingScore} />
              </div>
            )}

            <div className="mt-3 text-xs text-slate-500">
              Banque de questions originales disponibles : {bankSize}
            </div>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/exam/mock/${d}`}
                className="rounded-lg bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
              >
                Examen blanc (format complet)
              </Link>
              <Link
                href={`/exam/mock/${d}?mode=short`}
                className="rounded-lg border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
              >
                Entraînement rapide
              </Link>
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">
                Domaines de connaissances
              </summary>
              <ul className="mt-2 space-y-1 text-sm">
                {AREAS_BY_DELPROV(d).map((a) => {
                  const ar = r?.perArea.find((x) => x.areaId === a.id);
                  return (
                    <li key={a.id} className="flex justify-between gap-2">
                      <span>
                        {a.glossFr}{" "}
                        <span className="text-slate-400">({a.swedishName})</span>
                      </span>
                      <span className="text-slate-500">
                        {ar?.share != null ? `${Math.round(ar.share * 100)}%` : "—"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          </Card>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-100 py-2">
      <div className="font-bold">{value}</div>
      <div className="text-slate-500">{label}</div>
    </div>
  );
}
