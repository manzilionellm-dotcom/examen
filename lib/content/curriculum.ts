import type { CurriculumWeek } from "@/lib/domain/types";

// 56-day, 8-week curriculum scaffold (spec §7). Each week interleaves the
// language layer with the exam spine, which grows every week.

export const CURRICULUM: CurriculumWeek[] = [
  {
    week: 1,
    titleFr: "Suédois de survie pour le taxi",
    languageFocusFr:
      "Salutations, nombres, adresses, heure, directions de base, politesse.",
    examFocusFr:
      "Introduction à la structure des 2 delprov et aux domaines de connaissances.",
  },
  {
    week: 2,
    titleFr: "Prise en charge et destination",
    languageFocusFr:
      "Confirmer la prise en charge et l'itinéraire, langage GPS, vocabulaire urbain.",
    examFocusFr: "Bases de la navigation + premiers exercices de lecture de carte.",
  },
  {
    week: 3,
    titleFr: "Paiement, reçus, taximètre",
    languageFocusFr:
      "Paiement par carte, reçu, taximètre, explication du prix, annulation.",
    examFocusFr: "Lancement de l'entraîneur taximètre / calculs.",
  },
  {
    week: 4,
    titleFr: "Sécurité et soin du passager",
    languageFocusFr:
      "Ceintures, sièges enfant, personnes âgées/handicapées, trajets médicaux.",
    examFocusFr: "Delprov 1 : sécurité, maladies/handicaps, accueil.",
  },
  {
    week: 5,
    titleFr: "Trafic, navigation, problèmes",
    languageFocusFr:
      "Panneaux, retards, embouteillages, accidents, déviations, pannes.",
    examFocusFr: "Entraîneur de panneaux + règles de circulation (Delprov 2).",
  },
  {
    week: 6,
    titleFr: "Droit du taxi et comportement pro",
    languageFocusFr:
      "Législation taxi, règles de circulation, service client, responsabilité.",
    examFocusFr: "Base de connaissances législation (Delprov 2), intensif.",
  },
  {
    week: 7,
    titleFr: "Révision orientée examen",
    languageFocusFr:
      "Compréhension orale, expression sous contrainte de temps, körprov (début).",
    examFocusFr: "Examens blancs complets mixtes, travail des domaines faibles.",
  },
  {
    week: 8,
    titleFr: "Simulation finale intensive",
    languageFocusFr:
      "Simulation körprov, scénarios de sécurité passager, révision logistique.",
    examFocusFr:
      "Examens blancs chronométrés au format complet pour les deux delprov + barrière de préparation.",
  },
];
