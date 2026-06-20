import type { LogisticsItem, OfficialSource } from "@/lib/domain/types";

// Official-source metadata + verification workflow (spec §8 output, §13).
// `retrievedAt: null` marks an entry that has NOT yet been verified against the
// live source. The UI surfaces "last verified" and flags overdue reviews.

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: "src_transportstyrelsen_taxi",
    authorityName: "Transportstyrelsen",
    title: "Taxiförarlegitimation – krav och ansökan",
    url: "https://www.transportstyrelsen.se/",
    retrievedAt: null,
    summary:
      "Exigences, aptitude, certificat médical, et délivrance de la " +
      "légitimation de conducteur de taxi.",
    contentArea: "eligibility,legislation,logistics",
    reviewDueDate: "2026-09-01",
  },
  {
    id: "src_trafikverket_prov",
    authorityName: "Trafikverket",
    title: "Kunskapsprov och körprov för taxiförarlegitimation",
    url: "https://www.trafikverket.se/",
    retrievedAt: null,
    summary:
      "Structure des delprov, nombre de questions, seuils, durées, frais, " +
      "réservation, et interprète (tolk).",
    contentArea: "exam,logistics",
    reviewDueDate: "2026-09-01",
  },
];

export const SOURCE_BY_ID = (id: string): OfficialSource | undefined =>
  OFFICIAL_SOURCES.find((s) => s.id === id);

// Booking & logistics guide (spec §5.9) — display only, links to authorities.
export const LOGISTICS: LogisticsItem[] = [
  {
    id: "log_booking",
    titleFr: "Réserver l'examen",
    bodyFr:
      "Les examens théoriques (kunskapsprov) et pratiques (körprov) se " +
      "réservent auprès de Trafikverket. Préparez votre identification.",
    sourceId: "src_trafikverket_prov",
  },
  {
    id: "log_fees",
    titleFr: "Frais (valeurs de référence)",
    bodyFr:
      "À titre indicatif : environ 420 kr par delprov, körprov environ " +
      "1 800 kr, demande de légitimation environ 700 kr.",
    referenceValue: "≈ 420 kr / delprov — À VÉRIFIER",
    sourceId: "src_trafikverket_prov",
  },
  {
    id: "log_tolk",
    titleFr: "Interprète (tolk)",
    bodyFr:
      "L'examen théorique peut être passé avec un interprète, à réserver à " +
      "l'avance via Trafikverket, généralement aux frais du candidat.",
    sourceId: "src_trafikverket_prov",
  },
  {
    id: "log_validity",
    titleFr: "Fenêtres de validité",
    bodyFr:
      "Les deux delprov doivent être réussis dans un certain délai (référence : " +
      "6 mois après le premier réussi). Le körprov a aussi une validité. À vérifier.",
    sourceId: "src_trafikverket_prov",
  },
  {
    id: "log_application",
    titleFr: "Demande finale",
    bodyFr:
      "Après avoir réussi les examens, la légitimation se demande auprès de " +
      "Transportstyrelsen.",
    sourceId: "src_transportstyrelsen_taxi",
  },
];
