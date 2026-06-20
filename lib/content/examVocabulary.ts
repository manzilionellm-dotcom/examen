import type { ExamTerm } from "@/lib/domain/types";

// ---------------------------------------------------------------------------
// EXAM VOCABULARY — one consolidated Swedish→French glossary.
//
// The official exam is taken in Swedish. This is the single list of the
// key Swedish terms that appear across the knowledge areas, with their French
// translation, to be memorized. It is functional terminology compiled from the
// public knowledge areas — NOT copied exam questions (spec §13).
//
// `domain` is only a short tag for optional filtering; in the UI everything is
// presented as ONE category to memorize. Verify spellings/usage as you study.
// ---------------------------------------------------------------------------

type Row = [swedish: string, french: string, domain: string];

const ROWS: Row[] = [
  // ---- Examen / prov ----
  ["kunskapsprov", "examen théorique (de connaissances)", "Examen"],
  ["delprov", "épreuve partielle", "Examen"],
  ["körprov", "examen pratique de conduite", "Examen"],
  ["taxiförarlegitimation", "carte / licence de conducteur de taxi", "Examen"],
  ["prov", "examen / épreuve", "Examen"],
  ["godkänd", "réussi / admis", "Examen"],
  ["underkänd", "échoué / recalé", "Examen"],
  ["fråga", "question", "Examen"],
  ["svar", "réponse", "Examen"],
  ["rätt svar", "bonne réponse", "Examen"],
  ["tolk", "interprète", "Examen"],
  ["ansökan", "demande / candidature", "Examen"],
  ["giltig", "valable / valide", "Examen"],
  ["krav", "exigence", "Examen"],

  // ---- Circulation / trafik ----
  ["trafik", "circulation / trafic", "Circulation"],
  ["väjningsplikt", "obligation de céder le passage", "Circulation"],
  ["väja", "céder le passage", "Circulation"],
  ["företräde", "priorité", "Circulation"],
  ["förkörsrätt", "priorité de passage", "Circulation"],
  ["högerregeln", "priorité à droite", "Circulation"],
  ["stopplikt", "obligation de s'arrêter (stop)", "Circulation"],
  ["omkörning", "dépassement", "Circulation"],
  ["korsning", "intersection / carrefour", "Circulation"],
  ["övergångsställe", "passage piéton", "Circulation"],
  ["rondell", "rond-point", "Circulation"],
  ["körfält", "voie de circulation", "Circulation"],
  ["heldragen linje", "ligne continue", "Circulation"],
  ["spärrlinje", "ligne d'interdiction (continue)", "Circulation"],
  ["hastighet", "vitesse", "Circulation"],
  ["hastighetsbegränsning", "limitation de vitesse", "Circulation"],
  ["tättbebyggt område", "agglomération", "Circulation"],
  ["landsväg", "route de campagne", "Circulation"],
  ["motorväg", "autoroute", "Circulation"],
  ["fordon", "véhicule", "Circulation"],
  ["fotgängare", "piéton", "Circulation"],
  ["cyklist", "cycliste", "Circulation"],
  ["gångfartsområde", "zone de rencontre", "Circulation"],
  ["utryckningsfordon", "véhicule d'urgence", "Circulation"],
  ["stanna", "s'arrêter", "Circulation"],
  ["parkera", "stationner / se garer", "Circulation"],
  ["parkering", "stationnement", "Circulation"],
  ["hållplats", "arrêt (de bus)", "Circulation"],
  ["vägren", "bas-côté / accotement", "Circulation"],
  ["körriktning", "sens de circulation", "Circulation"],
  ["trafiksignal", "feu de circulation", "Circulation"],
  ["rödljus", "feu rouge", "Circulation"],

  // ---- Panneaux / vägmärken ----
  ["vägmärke", "panneau de signalisation", "Panneaux"],
  ["varningsmärke", "panneau de danger", "Panneaux"],
  ["förbudsmärke", "panneau d'interdiction", "Panneaux"],
  ["påbudsmärke", "panneau d'obligation", "Panneaux"],
  ["anvisningsmärke", "panneau d'indication", "Panneaux"],
  ["tilläggstavla", "panonceau (additionnel)", "Panneaux"],
  ["huvudled", "route prioritaire", "Panneaux"],
  ["återvändsgata", "voie sans issue", "Panneaux"],
  ["enkelriktat", "sens unique", "Panneaux"],

  // ---- Véhicule / fordon ----
  ["broms", "frein", "Véhicule"],
  ["bromssträcka", "distance de freinage", "Véhicule"],
  ["däck", "pneu", "Véhicule"],
  ["vinterdäck", "pneu hiver", "Véhicule"],
  ["sommardäck", "pneu été", "Véhicule"],
  ["mönsterdjup", "profondeur de sculpture (pneu)", "Véhicule"],
  ["däcktryck", "pression des pneus", "Véhicule"],
  ["bilbälte", "ceinture de sécurité", "Véhicule"],
  ["bilbarnstol", "siège auto enfant", "Véhicule"],
  ["strålkastare", "phare", "Véhicule"],
  ["halvljus", "feux de croisement", "Véhicule"],
  ["helljus", "feux de route", "Véhicule"],
  ["varningsblinkers", "feux de détresse", "Véhicule"],
  ["blinkers", "clignotant", "Véhicule"],
  ["motorvärmare", "chauffe-moteur", "Véhicule"],
  ["taxameter", "taximètre", "Véhicule"],
  ["taklykta", "enseigne lumineuse de toit (taxi)", "Véhicule"],
  ["varningslampa", "témoin d'alerte", "Véhicule"],
  ["instruktionsbok", "manuel d'utilisation", "Véhicule"],
  ["motor", "moteur", "Véhicule"],
  ["bagageutrymme", "coffre", "Véhicule"],
  ["ratt", "volant", "Véhicule"],

  // ---- Sécurité / säkerhet ----
  ["trafiksäkerhet", "sécurité routière", "Sécurité"],
  ["reaktionstid", "temps de réaction", "Sécurité"],
  ["säkerhetsavstånd", "distance de sécurité", "Sécurité"],
  ["trötthet", "fatigue", "Sécurité"],
  ["halka", "verglas / glissance", "Sécurité"],
  ["vinterväglag", "conditions hivernales (chaussée)", "Sécurité"],
  ["rattfylleri", "conduite en état d'ivresse", "Sécurité"],
  ["promille", "pour mille (alcoolémie)", "Sécurité"],
  ["alkohol", "alcool", "Sécurité"],
  ["olycka", "accident", "Sécurité"],
  ["risk", "risque", "Sécurité"],
  ["sikt", "visibilité", "Sécurité"],
  ["mörkerkörning", "conduite de nuit", "Sécurité"],
  ["vilt", "gibier (animal sauvage)", "Sécurité"],
  ["första hjälpen", "premiers secours", "Sécurité"],
  ["nödstopp", "arrêt d'urgence", "Sécurité"],

  // ---- Service client / bemötande ----
  ["bemötande", "accueil / manière de traiter le client", "Service client"],
  ["kund", "client", "Service client"],
  ["passagerare", "passager", "Service client"],
  ["kvitto", "reçu", "Service client"],
  ["betalning", "paiement", "Service client"],
  ["kontant", "espèces", "Service client"],
  ["kort", "carte (bancaire)", "Service client"],
  ["växel", "monnaie (à rendre)", "Service client"],
  ["dricks", "pourboire", "Service client"],
  ["pris", "prix", "Service client"],
  ["jämförpris", "prix comparatif", "Service client"],
  ["tystnadsplikt", "obligation de confidentialité", "Service client"],
  ["integritet", "vie privée / intégrité", "Service client"],
  ["upphittat", "objet trouvé", "Service client"],
  ["klagomål", "réclamation / plainte", "Service client"],
  ["bagage", "bagages", "Service client"],

  // ---- Handicap / funktionsnedsättning ----
  ["funktionsnedsättning", "handicap", "Handicap"],
  ["rullstol", "fauteuil roulant", "Handicap"],
  ["rollator", "déambulateur", "Handicap"],
  ["ledarhund", "chien-guide", "Handicap"],
  ["assistanshund", "chien d'assistance", "Handicap"],
  ["hjälpmedel", "aide technique / matériel d'assistance", "Handicap"],
  ["synskadad", "malvoyant", "Handicap"],
  ["hörselskadad", "malentendant", "Handicap"],
  ["äldre", "personne âgée", "Handicap"],
  ["krampanfall", "crise convulsive", "Handicap"],

  // ---- Législation / lag ----
  ["taxitrafiklagstiftning", "législation du transport en taxi", "Législation"],
  ["taxitrafiktillstånd", "autorisation d'exploiter un taxi", "Législation"],
  ["lag", "loi", "Législation"],
  ["bestämmelse", "disposition / règle", "Législation"],
  ["prisinformation", "information sur les prix", "Législation"],
  ["Transportstyrelsen", "Agence suédoise des transports", "Législation"],
  ["Trafikverket", "Administration suédoise des routes", "Législation"],
  ["återkallelse", "retrait (de la licence)", "Législation"],
  ["lämplighet", "aptitude", "Législation"],
  ["laglydnad", "respect de la loi / probité", "Législation"],
  ["läkarintyg", "certificat médical", "Législation"],
  ["personnummer", "numéro personnel d'identité", "Législation"],
  ["körkort", "permis de conduire", "Législation"],
  ["belastningsregister", "casier judiciaire", "Législation"],
  ["förartavla", "plaque d'identification du conducteur", "Législation"],

  // ---- Navigation ----
  ["vägval", "choix d'itinéraire", "Navigation"],
  ["kortaste vägen", "l'itinéraire le plus court", "Navigation"],
  ["snabbaste vägen", "l'itinéraire le plus rapide", "Navigation"],
  ["karta", "carte", "Navigation"],
  ["skala", "échelle", "Navigation"],
  ["väderstreck", "point cardinal", "Navigation"],
  ["norr", "nord", "Navigation"],
  ["söder", "sud", "Navigation"],
  ["öster", "est", "Navigation"],
  ["väster", "ouest", "Navigation"],
  ["avfart", "sortie (bretelle)", "Navigation"],
  ["destination", "destination", "Navigation"],
  ["adress", "adresse", "Navigation"],
  ["gata", "rue", "Navigation"],
  ["väg", "route", "Navigation"],

  // ---- Environnement / miljö ----
  ["körekonomi", "éco-conduite", "Environnement"],
  ["bränsleförbrukning", "consommation de carburant", "Environnement"],
  ["utsläpp", "émissions", "Environnement"],
  ["tomgång", "ralenti (moteur)", "Environnement"],
  ["miljö", "environnement", "Environnement"],

  // ---- Travail / arbetsmiljö ----
  ["arbetsmiljö", "environnement de travail", "Travail"],
  ["ergonomi", "ergonomie", "Travail"],
  ["belastningsskada", "trouble musculo-squelettique", "Travail"],
  ["rast", "pause", "Travail"],
  ["hot", "menace", "Travail"],
  ["våld", "violence", "Travail"],
  ["överfallslarm", "alarme anti-agression", "Travail"],
  ["stress", "stress", "Travail"],

  // ---- Mots de base utiles ----
  ["höger", "droite", "Base"],
  ["vänster", "gauche", "Base"],
  ["rakt fram", "tout droit", "Base"],
  ["sväng", "tourner / virage", "Base"],
  ["åka", "aller / se déplacer", "Base"],
  ["köra", "conduire", "Base"],
  ["hämta", "aller chercher / prendre en charge", "Base"],
  ["lämna", "déposer / laisser", "Base"],
  ["vänta", "attendre", "Base"],
  ["snabb", "rapide", "Base"],
  ["långsam", "lent", "Base"],
  ["nu", "maintenant", "Base"],
];

export const EXAM_VOCABULARY: ExamTerm[] = ROWS.map(([swedish, french, domain], i) => ({
  id: `voc${String(i + 1).padStart(3, "0")}`,
  swedish,
  french,
  domain,
}));

export const VOCAB_DOMAINS: string[] = Array.from(
  new Set(EXAM_VOCABULARY.map((t) => t.domain)),
);
