import type { CalculationProblem } from "@/lib/domain/types";

// Taximeter / calculation trainer (spec §5.4). Procedurally generates UNLIMITED
// original numeric problems with step-by-step explanations. The tariff numbers
// below are illustrative TRAINING values, not any official or company tariff.

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

let counter = 0;
function id(): string {
  counter += 1;
  return `calc_${Date.now().toString(36)}_${counter}`;
}

/** Fare = framkörning + (distance * per-km) + (minutes * per-min). */
export function generateFareProblem(): CalculationProblem {
  const base = randInt(40, 75); // framkörningsavgift
  const perKm = randInt(10, 18);
  const perMin = randInt(4, 9);
  const km = randInt(3, 25);
  const min = randInt(5, 40);

  const distancePart = km * perKm;
  const timePart = min * perMin;
  const total = base + distancePart + timePart;

  return {
    id: id(),
    template: "fare",
    promptSwedish:
      `En resa har en framkörningsavgift på ${base} kr, ${perKm} kr/km och ` +
      `${perMin} kr/min. Resan är ${km} km och tar ${min} minuter. ` +
      `Vad blir priset?`,
    promptFr:
      `Une course a une prise en charge de ${base} kr, ${perKm} kr/km et ` +
      `${perMin} kr/min. La course fait ${km} km et dure ${min} minutes. ` +
      `Quel est le prix ?`,
    correctAnswer: total,
    unit: "kr",
    solutionStepsFr: [
      `Distance : ${km} km × ${perKm} kr = ${distancePart} kr`,
      `Temps : ${min} min × ${perMin} kr = ${timePart} kr`,
      `Prise en charge : ${base} kr`,
      `Total : ${base} + ${distancePart} + ${timePart} = ${total} kr`,
    ],
  };
}

/** Change to return from a payment. */
export function generateChangeProblem(): CalculationProblem {
  const price = randInt(83, 487);
  const paid = Math.ceil(price / 50) * 50 + randInt(0, 2) * 50;
  const change = paid - price;
  return {
    id: id(),
    template: "change",
    promptSwedish:
      `Priset är ${price} kr. Kunden betalar med ${paid} kr kontant. ` +
      `Hur mycket växel ska du ge tillbaka?`,
    promptFr:
      `Le prix est de ${price} kr. Le client paie ${paid} kr en espèces. ` +
      `Combien devez-vous rendre ?`,
    correctAnswer: change,
    unit: "kr",
    solutionStepsFr: [`Rendu : ${paid} − ${price} = ${change} kr`],
  };
}

/** Apply a percentage surcharge (e.g. night/holiday tariff). */
export function generateSurchargeProblem(): CalculationProblem {
  const baseFare = randInt(120, 360);
  const pct = [10, 15, 20, 25][randInt(0, 3)];
  const total = round2(baseFare * (1 + pct / 100));
  return {
    id: id(),
    template: "surcharge",
    promptSwedish:
      `Grundpriset är ${baseFare} kr. Ett nattillägg på ${pct} % tillkommer. ` +
      `Vad blir totalpriset?`,
    promptFr:
      `Le tarif de base est de ${baseFare} kr. Un supplément de nuit de ` +
      `${pct} % s'applique. Quel est le prix total ?`,
    correctAnswer: total,
    unit: "kr",
    solutionStepsFr: [
      `Supplément : ${baseFare} × ${pct} % = ${round2((baseFare * pct) / 100)} kr`,
      `Total : ${baseFare} + ${round2((baseFare * pct) / 100)} = ${total} kr`,
    ],
  };
}

const GENERATORS = [
  generateFareProblem,
  generateChangeProblem,
  generateSurchargeProblem,
];

export function generateProblem(): CalculationProblem {
  return GENERATORS[randInt(0, GENERATORS.length - 1)]();
}
