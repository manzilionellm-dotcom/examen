"use client";

import { useState } from "react";
import { generateProblem } from "@/lib/engine/calc";
import { Card, PageTitle } from "@/app/components/ui";
import type { CalculationProblem } from "@/lib/domain/types";

export default function CalcTrainer() {
  const [problem, setProblem] = useState<CalculationProblem>(() => generateProblem());
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [streak, setStreak] = useState(0);

  const guess = Number(value.replace(",", "."));
  const correct = checked && Math.abs(guess - problem.correctAnswer) < 0.01;

  function check() {
    if (checked) return;
    setChecked(true);
    setStreak((s) => (Math.abs(guess - problem.correctAnswer) < 0.01 ? s + 1 : 0));
  }
  function next() {
    setProblem(generateProblem());
    setValue("");
    setChecked(false);
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Entraîneur taximètre & calculs"
        subtitle="Problèmes numériques originaux et illimités (tarifs d'entraînement, non officiels)."
      />

      <div className="text-sm text-slate-600">Série correcte : {streak} 🔥</div>

      <Card>
        <p className="font-medium">{problem.promptSwedish}</p>
        <p className="text-sm text-slate-500 italic">{problem.promptFr}</p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="Votre réponse"
            disabled={checked}
            className="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <span className="text-slate-500">{problem.unit}</span>
        </div>

        {!checked ? (
          <button
            onClick={check}
            className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-1.5 text-sm hover:bg-slate-700"
          >
            Vérifier
          </button>
        ) : (
          <div className="mt-3">
            <p className={`font-semibold ${correct ? "text-emerald-700" : "text-rose-700"}`}>
              {correct ? "Correct ✓" : `Réponse : ${problem.correctAnswer} ${problem.unit}`}
            </p>
            <ol className="mt-2 list-decimal list-inside text-sm text-slate-600 space-y-0.5">
              {problem.solutionStepsFr.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <button
              onClick={next}
              className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-1.5 text-sm hover:bg-slate-700"
            >
              Problème suivant
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
