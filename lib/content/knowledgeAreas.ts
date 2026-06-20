import type { KnowledgeArea } from "@/lib/domain/types";

// The official knowledge areas and their mapping to Delprov 1 / Delprov 2.
// ⚠️ The exact list, naming, and delprov mapping MUST be VERIFIED against the
// current Trafikverket provspecifikation (spec §17). Weights are our own
// distribution estimate for question generation and are not official.

export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  // ---- Delprov 1 — Säkerhet och beteende ----
  {
    id: "navigation",
    delprov: 1,
    swedishName: "Navigation och vägval",
    glossFr: "Navigation et choix d'itinéraire",
    weight: 0.14,
  },
  {
    id: "eco_driving",
    delprov: 1,
    swedishName: "Körekonomi och miljö",
    glossFr: "Éco-conduite et environnement",
    weight: 0.12,
  },
  {
    id: "safety",
    delprov: 1,
    swedishName: "Trafiksäkerhet",
    glossFr: "Sécurité routière",
    weight: 0.16,
  },
  {
    id: "customer_service",
    delprov: 1,
    swedishName: "Bemötande och kundservice",
    glossFr: "Accueil et service client",
    weight: 0.14,
  },
  {
    id: "illness_disability",
    delprov: 1,
    swedishName: "Sjukdomar och funktionsnedsättningar",
    glossFr: "Maladies et handicaps",
    weight: 0.12,
  },
  {
    id: "work_environment",
    delprov: 1,
    swedishName: "Arbetsmiljö",
    glossFr: "Environnement de travail",
    weight: 0.1,
  },
  {
    id: "vehicle_knowledge",
    delprov: 1,
    swedishName: "Fordonskännedom",
    glossFr: "Connaissance du véhicule",
    weight: 0.12,
  },
  {
    id: "risk_judgment",
    delprov: 1,
    swedishName: "Riskmedvetenhet och omdöme",
    glossFr: "Conscience du risque et jugement",
    weight: 0.1,
  },

  // ---- Delprov 2 — Lagstiftning ----
  {
    id: "taxi_legislation",
    delprov: 2,
    swedishName: "Taxitrafiklagstiftning",
    glossFr: "Législation du transport en taxi",
    weight: 0.34,
  },
  {
    id: "traffic_legislation",
    delprov: 2,
    swedishName: "Trafiklagstiftning",
    glossFr: "Code de la route",
    weight: 0.34,
  },
  {
    id: "road_signs",
    delprov: 2,
    swedishName: "Vägmärken",
    glossFr: "Panneaux de signalisation",
    weight: 0.32,
  },
];

export const AREAS_BY_DELPROV = (d: 1 | 2): KnowledgeArea[] =>
  KNOWLEDGE_AREAS.filter((a) => a.delprov === d);

export const AREA_BY_ID = (id: string): KnowledgeArea | undefined =>
  KNOWLEDGE_AREAS.find((a) => a.id === id);
