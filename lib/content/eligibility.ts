import type { EligibilityCriterion } from "@/lib/domain/types";

// Eligibility checker (spec §5.8). INFORMATIONAL self-check, NOT legal advice.
// Surfaces things that would block licensing regardless of study, so ineligible
// users are stopped early. Every detail must be VERIFIED with the authorities.

export const ELIGIBILITY_CRITERIA: EligibilityCriterion[] = [
  {
    id: "b_licence",
    labelFr: "Permis B valide détenu depuis assez longtemps",
    guidanceFr:
      "Un permis de conduire B suédois ou EES, détenu depuis la durée requise, " +
      "est nécessaire. Vérifiez la durée exacte auprès de Transportstyrelsen.",
    blocking: true,
  },
  {
    id: "personnummer",
    labelFr: "Numéro personnel suédois (personnummer)",
    guidanceFr:
      "Généralement requis pour la réservation et l'identification. Vérifiez " +
      "les alternatives auprès des autorités si vous n'en avez pas encore.",
    blocking: true,
  },
  {
    id: "age21",
    labelFr: "Âge minimum (21 ans) pour obtenir la légitimation",
    guidanceFr:
      "La légitimation de conducteur de taxi est généralement accordée à " +
      "partir de 21 ans. À vérifier.",
    blocking: true,
  },
  {
    id: "medical",
    labelFr: "Certificat médical (läkarintyg)",
    guidanceFr:
      "Un certificat médical attestant l'aptitude est exigé. Renseignez-vous " +
      "sur le formulaire et le délai de validité.",
    blocking: true,
  },
  {
    id: "suitability",
    labelFr: "Aptitude / casier (laglydnad)",
    guidanceFr:
      "Un contrôle d'aptitude incluant le casier judiciaire est effectué. Si " +
      "vous résidez en Suède depuis moins de 5 ans, un extrait équivalent du " +
      "pays d'origine peut être demandé.",
    blocking: true,
  },
  {
    id: "photo_signature",
    labelFr: "Photo + signature chez Trafikverket avant le premier examen",
    guidanceFr:
      "Une photo et une signature doivent généralement être enregistrées chez " +
      "Trafikverket avant de passer le premier examen.",
    blocking: false,
  },
];
