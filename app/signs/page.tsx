"use client";

import { useMemo, useState } from "react";
import { ROAD_SIGNS } from "@/lib/content/roadSigns";
import { SignGlyph } from "@/app/components/SignGlyph";
import { useProgress } from "@/lib/store/progressStore";
import { Card, PageTitle } from "@/app/components/ui";
import type { RoadSign } from "@/lib/domain/types";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export default function SignsTrainer() {
  const { reviewItem } = useProgress();
  const [order, setOrder] = useState(() => shuffle(ROAD_SIGNS));
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const current = order[pos];
  const options = useMemo<RoadSign[]>(() => {
    const others = shuffle(ROAD_SIGNS.filter((s) => s.id !== current.id)).slice(0, 3);
    return shuffle([current, ...others]);
  }, [current]);

  function answer(id: string) {
    if (picked) return;
    setPicked(id);
    reviewItem("sign", current.id, id === current.id ? 5 : 2);
  }

  function next() {
    setPicked(null);
    if (pos + 1 >= order.length) {
      setOrder(shuffle(ROAD_SIGNS));
      setPos(0);
    } else {
      setPos((p) => p + 1);
    }
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Entraîneur de panneaux (vägmärken)"
        subtitle="Reconnaissance des panneaux suédois avec révision espacée. Visuels originaux."
      />

      <Card className="flex flex-col items-center">
        <div className="text-xs text-slate-400 self-start">{current.category}</div>
        <div className="my-3">
          <SignGlyph refId={current.signAssetRef} size={120} />
        </div>
        <p className="font-medium">Que signifie ce panneau ?</p>

        <div className="mt-3 grid grid-cols-1 gap-2 w-full">
          {options.map((o) => {
            const isCorrect = o.id === current.id;
            const show = picked != null;
            const cls = !show
              ? "border-slate-200 hover:border-slate-300"
              : isCorrect
                ? "border-emerald-500 bg-emerald-50"
                : o.id === picked
                  ? "border-rose-500 bg-rose-50"
                  : "border-slate-200 opacity-60";
            return (
              <button
                key={o.id}
                onClick={() => answer(o.id)}
                className={`rounded-lg border px-3 py-2 text-sm text-left transition ${cls}`}
              >
                {o.frenchName}{" "}
                <span className="text-slate-400">({o.swedishName})</span>
              </button>
            );
          })}
        </div>

        {picked && (
          <div className="mt-3 w-full">
            <p className="text-sm text-slate-600">{current.meaningFr}</p>
            <button
              onClick={next}
              className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-1.5 text-sm hover:bg-slate-700"
            >
              Suivant
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
