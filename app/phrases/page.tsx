"use client";

import { useState } from "react";
import { PHRASES } from "@/lib/content/phrases";
import { useProgress } from "@/lib/store/progressStore";
import { Card, PageTitle } from "@/app/components/ui";

// Speak Swedish via the Web Speech API where available (spec §10: Android TTS
// equivalent on the web). Falls back silently when unsupported.
function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sv-SE";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function Phrases() {
  const { reviewItem } = useProgress();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const categories = Array.from(new Set(PHRASES.map((p) => p.category)));

  return (
    <div className="space-y-4">
      <PageTitle
        title="Banque de phrases — suédois du taxi"
        subtitle="Le suédois fonctionnel que vous utiliserez au travail. Écoutez, répétez, auto-évaluez."
      />

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="font-semibold mb-2">{cat}</h2>
          <div className="space-y-3">
            {PHRASES.filter((p) => p.category === cat).map((p) => {
              const open = revealed[p.id];
              return (
                <Card key={p.id}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{p.swedishText}</p>
                    <button
                      onClick={() => speak(p.swedishText)}
                      className="shrink-0 rounded-full bg-amber-300 px-2 py-1 text-sm"
                      aria-label="Écouter"
                      title="Écouter (TTS)"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">/{p.pronunciationHint}/</p>

                  {open ? (
                    <div className="mt-2 text-sm text-slate-700">
                      <p>{p.frenchTranslation}</p>
                      <p className="text-xs text-slate-500 mt-1">{p.contextFr}</p>
                      {p.politeVariant && (
                        <p className="text-xs text-slate-500 mt-1">
                          Variante polie : {p.politeVariant}
                        </p>
                      )}
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => reviewItem("phrase", p.id, 2)}
                          className="rounded-lg border border-rose-300 text-rose-700 px-3 py-1 text-xs"
                        >
                          À revoir
                        </button>
                        <button
                          onClick={() => reviewItem("phrase", p.id, 5)}
                          className="rounded-lg border border-emerald-300 text-emerald-700 px-3 py-1 text-xs"
                        >
                          Maîtrisée
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevealed((r) => ({ ...r, [p.id]: true }))}
                      className="mt-2 text-sm text-slate-500 underline"
                    >
                      Afficher la traduction
                    </button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
