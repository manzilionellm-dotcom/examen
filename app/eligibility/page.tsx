"use client";

import { ELIGIBILITY_CRITERIA } from "@/lib/content/eligibility";
import { MIN_AGE_FOR_LEGITIMATION } from "@/lib/config/examConfig";
import { useProgress } from "@/lib/store/progressStore";
import { Card, PageTitle, VerifyBadge } from "@/app/components/ui";
import type { EligibilityStatus } from "@/lib/domain/types";

const STATUS: { value: EligibilityStatus; label: string; cls: string }[] = [
  { value: "ok", label: "OK", cls: "border-emerald-400 text-emerald-700" },
  { value: "action_needed", label: "À faire", cls: "border-amber-400 text-amber-700" },
  { value: "blocked", label: "Bloquant", cls: "border-rose-400 text-rose-700" },
];

export default function Eligibility() {
  const { state, setEligibility, ready } = useProgress();

  const blockers = ELIGIBILITY_CRITERIA.filter(
    (c) => c.blocking && state.eligibility[c.id] === "blocked",
  );

  return (
    <div className="space-y-4">
      <PageTitle
        title="Vérificateur d'éligibilité"
        subtitle="Auto-évaluation informative (pas un conseil juridique). Repérez tôt ce qui pourrait bloquer la licence."
      />

      {ready && blockers.length > 0 && (
        <Card className="border-rose-300 bg-rose-50 text-sm text-rose-800">
          ⛔ Vous avez {blockers.length} point(s) bloquant(s). Réglez-les avant
          d&apos;investir dans la préparation — ils empêchent l&apos;obtention de la
          légitimation indépendamment de vos révisions.
        </Card>
      )}

      <Card className="bg-slate-50 text-sm text-slate-700">
        Âge minimum pour obtenir la légitimation : {MIN_AGE_FOR_LEGITIMATION.value} ans{" "}
        <VerifyBadge />
      </Card>

      <div className="space-y-3">
        {ELIGIBILITY_CRITERIA.map((c) => {
          const status = state.eligibility[c.id] ?? "unknown";
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">
                  {c.labelFr}{" "}
                  {c.blocking && (
                    <span className="text-[10px] uppercase font-semibold text-rose-600">
                      bloquant
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-1">{c.guidanceFr}</p>
              <div className="mt-2 flex gap-2">
                {STATUS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setEligibility(c.id, s.value)}
                    className={`rounded-lg border px-3 py-1 text-xs ${
                      status === s.value ? `${s.cls} bg-slate-50` : "border-slate-200 text-slate-500"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
