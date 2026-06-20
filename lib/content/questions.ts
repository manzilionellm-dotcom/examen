import type { Difficulty, MockQuestion, QuestionType } from "@/lib/domain/types";

// ---------------------------------------------------------------------------
// ORIGINAL QUESTION BANK (spec §5.2)
//
// ⚠️ COMPLIANCE: every item here is ORIGINAL content, authored from the public
// knowledge areas/requirements in our own wording with realistic Swedish taxi
// scenarios. We NEVER copy or closely paraphrase real exam questions, answer
// sets, distractors, or test maps. `isOfficialQuestionCopied` is always false.
//
// This is a SEED bank to exercise the engine. Spec targets: MVP ≥ 600–800,
// production ≥ 1,500, distributed proportionally to the knowledge areas. The
// engine (engine/mockExam.ts) samples by area weight, so growing the bank does
// not require any code change.
// ---------------------------------------------------------------------------

type Seed = {
  delprov: 1 | 2;
  area: string;
  type?: QuestionType;
  diff?: Difficulty;
  sv: string;
  fr: string;
  options: string[];
  correct: number;
  explain: string;
  terms: string[];
};

let counter = 0;
function q(s: Seed): MockQuestion {
  counter += 1;
  return {
    id: `q${String(counter).padStart(4, "0")}`,
    delprov: s.delprov,
    knowledgeArea: s.area,
    questionType: s.type ?? "knowledge",
    swedishText: s.sv,
    frenchGloss: s.fr,
    options: s.options,
    correctAnswer: s.correct,
    frenchExplanation: s.explain,
    swedishKeyTerms: s.terms,
    sourceArea: s.area,
    difficultyLevel: s.diff ?? 2,
    empiricalDifficulty: null,
    isOfficialQuestionCopied: false,
  };
}

export const QUESTIONS: MockQuestion[] = [
  // ===================== DELPROV 1 =====================
  q({
    delprov: 1,
    area: "safety",
    type: "scenario",
    sv: "En passagerare vill inte använda bilbältet under resan. Vad gäller?",
    fr: "Un passager refuse de mettre sa ceinture pendant le trajet. Que faire ?",
    options: [
      "Passageraren ansvarar själv och måste använda bältet om det finns",
      "Det är valfritt i taxi och inget behöver sägas",
      "Endast föraren behöver bälte i en taxi",
      "Bältet behövs bara på motorväg",
    ],
    correct: 0,
    explain:
      "En passagerare som har fyllt 15 år ansvarar själv för att använda " +
      "bilbälte när det finns. Som förare bör du ändå uppmana till det av " +
      "säkerhetsskäl.",
    terms: ["bilbälte", "passagerare", "ansvar"],
  }),
  q({
    delprov: 1,
    area: "safety",
    sv: "Hur påverkar trötthet din körförmåga som taxiförare?",
    fr: "Comment la fatigue affecte-t-elle votre conduite ?",
    options: [
      "Reaktionstiden förlängs och uppmärksamheten försämras",
      "Endast synen påverkas, inte reaktionen",
      "Trötthet påverkar inte erfarna förare",
      "Bara nattetid finns det någon risk",
    ],
    correct: 0,
    explain:
      "Trötthet förlänger reaktionstiden och försämrar uppmärksamhet och " +
      "omdöme. Planera raster; mikrosömn är livsfarligt i yrkestrafik.",
    terms: ["trötthet", "reaktionstid", "rast"],
  }),
  q({
    delprov: 1,
    area: "illness_disability",
    type: "scenario",
    sv: "Du hämtar en passagerare som använder rullstol. Vad är lämpligast?",
    fr: "Vous prenez un passager en fauteuil roulant. Quelle est la bonne attitude ?",
    options: [
      "Fråga hur personen vill ha hjälp och säkra rullstolen ordentligt",
      "Lyft personen utan att fråga för att spara tid",
      "Be personen ta en annan transport",
      "Lämna rullstolen olåst i bagageutrymmet",
    ],
    correct: 0,
    explain:
      "Fråga alltid hur passageraren vill ha hjälp och respektera " +
      "integriteten. Hjälpmedel ska säkras så att de inte rör sig under färd.",
    terms: ["rullstol", "hjälpmedel", "bemötande"],
  }),
  q({
    delprov: 1,
    area: "customer_service",
    type: "scenario",
    sv: "En kund klagar högljutt på priset i slutet av resan. Hur agerar du?",
    fr: "Un client se plaint bruyamment du prix en fin de course. Comment réagir ?",
    options: [
      "Förklara lugnt prisuppgifterna och visa kvittot",
      "Höj rösten tillbaka för att markera",
      "Vägra lämna kvitto",
      "Kör vidare utan att svara",
    ],
    correct: 0,
    explain:
      "Ett professionellt bemötande innebär att du håller dig lugn, förklarar " +
      "prissättningen och alltid erbjuder ett kvitto.",
    terms: ["bemötande", "kvitto", "prisinformation"],
  }),
  q({
    delprov: 1,
    area: "eco_driving",
    sv: "Vilket körsätt sänker bränsleförbrukningen mest?",
    fr: "Quelle conduite réduit le plus la consommation de carburant ?",
    options: [
      "Mjuk acceleration och att planera för jämnt flyt i trafiken",
      "Kraftig acceleration och sen inbromsning",
      "Att låta motorn gå på tomgång vid längre stopp",
      "Att alltid köra på högsta tillåtna växel oavsett hastighet",
    ],
    correct: 0,
    explain:
      "Sparsam körning (körekonomi) bygger på mjuk acceleration, framförhållning " +
      "och att undvika onödig tomgång och inbromsning.",
    terms: ["körekonomi", "bränsleförbrukning", "tomgång"],
  }),
  q({
    delprov: 1,
    area: "navigation",
    type: "map",
    sv: "Skillnaden mellan 'kortaste' och 'snabbaste' väg är främst att:",
    fr: "La différence entre l'itinéraire 'le plus court' et 'le plus rapide' est surtout que :",
    options: [
      "Snabbaste vägen tar hänsyn till hastighet och trafik, inte bara distans",
      "Kortaste vägen alltid är snabbast",
      "Snabbaste vägen alltid har lägst distans",
      "De är alltid identiska i en stad",
    ],
    correct: 0,
    explain:
      "Snabbaste vägen väger in hastighetsgränser, trafikflöde och stopp, " +
      "medan kortaste vägen bara minimerar sträckan.",
    terms: ["kortaste väg", "snabbaste väg", "vägval"],
  }),
  q({
    delprov: 1,
    area: "vehicle_knowledge",
    sv: "Vad bör du kontrollera innan första passageraren stiger in?",
    fr: "Que devez-vous vérifier avant de prendre votre premier passager ?",
    options: [
      "Att däck, bromsar, belysning och bälten fungerar",
      "Endast att tanken är full",
      "Inget, det räcker med årlig besiktning",
      "Endast taxiskylten",
    ],
    correct: 0,
    explain:
      "En daglig tillsyn av däck, bromsar, belysning och bilbälten är " +
      "grundläggande för säkerheten i yrkestrafik.",
    terms: ["tillsyn", "bromsar", "däck"],
  }),
  q({
    delprov: 1,
    area: "work_environment",
    sv: "Vad är ett bra sätt att minska belastningsskador vid många arbetspass?",
    fr: "Comment réduire les troubles musculo-squelettiques sur de longues journées ?",
    options: [
      "Ställa in stol och ratt ergonomiskt och ta regelbundna pauser",
      "Sitta så långt från ratten som möjligt",
      "Aldrig justera stolen mellan pass",
      "Hoppa över pauser för att tjäna tid",
    ],
    correct: 0,
    explain:
      "Ergonomisk inställning av förarplatsen och regelbundna pauser minskar " +
      "risken för belastningsbesvär i arbetsmiljön.",
    terms: ["arbetsmiljö", "ergonomi", "belastning"],
  }),
  q({
    delprov: 1,
    area: "risk_judgment",
    type: "scenario",
    sv: "Det är halt väglag och sikten är dålig. Hur anpassar du körningen?",
    fr: "Route verglacée et faible visibilité. Comment adapter votre conduite ?",
    options: [
      "Sänk hastigheten och öka avståndet till framförvarande",
      "Håll samma hastighet men kör närmare bilen framför",
      "Kör fortare för att snabbt lämna området",
      "Stäng av strålkastarna för att se bättre",
    ],
    correct: 0,
    explain:
      "Vid halka och dålig sikt ökar bromssträckan. Sänk hastigheten och håll " +
      "större avstånd för att ha säkerhetsmarginal.",
    terms: ["halka", "bromssträcka", "avstånd"],
  }),
  q({
    delprov: 1,
    area: "customer_service",
    sv: "En passagerare lämnar kvar en plånbok i bilen. Vad är rätt hantering?",
    fr: "Un passager oublie son portefeuille. Quelle est la bonne procédure ?",
    options: [
      "Ta hand om upphittat och försök återlämna via beställningscentralen",
      "Behåll innehållet som dricks",
      "Slänga plånboken",
      "Ge plånboken till nästa kund",
    ],
    correct: 0,
    explain:
      "Upphittade ägodelar ska tas om hand och återlämnas, normalt via " +
      "beställningscentralen eller enligt företagets rutiner.",
    terms: ["upphittat", "beställningscentral", "ansvar"],
  }),

  // ===================== DELPROV 2 =====================
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad krävs för att få yrkesmässigt köra taxi i Sverige?",
    fr: "Que faut-il pour conduire un taxi à titre professionnel en Suède ?",
    options: [
      "Giltig taxiförarlegitimation",
      "Endast vanligt B-körkort",
      "Ett internationellt körkort",
      "Endast registrering hos beställningscentral",
    ],
    correct: 0,
    explain:
      "För att köra taxi yrkesmässigt krävs en giltig taxiförarlegitimation " +
      "utöver körkortet.",
    terms: ["taxiförarlegitimation", "yrkestrafik"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Hur ska priset för en taxiresa göras tillgängligt för kunden?",
    fr: "Comment le prix d'une course doit-il être rendu accessible au client ?",
    options: [
      "Genom tydlig prisinformation, t.ex. jämförpris, innan resan",
      "Priset behöver aldrig anges i förväg",
      "Endast muntligt efter resan",
      "Endast om kunden uttryckligen frågar",
    ],
    correct: 0,
    explain:
      "Det finns krav på tydlig prisinformation så att kunden kan bedöma " +
      "kostnaden i förväg, bl.a. genom jämförpris.",
    terms: ["prisinformation", "jämförpris"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad gäller normalt för kvitto efter en taxiresa?",
    fr: "Que prévoit normalement la règle concernant le reçu après une course ?",
    options: [
      "Kunden ska erbjudas ett kvitto från taxametern",
      "Kvitto ges bara vid kortbetalning",
      "Kvitto är aldrig nödvändigt",
      "Endast företagskunder har rätt till kvitto",
    ],
    correct: 0,
    explain:
      "Taxametern registrerar uppgifterna och kunden ska kunna få ett kvitto " +
      "för resan.",
    terms: ["taxameter", "kvitto"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vad innebär en heldragen linje i mitten av vägen?",
    fr: "Que signifie une ligne continue au milieu de la chaussée ?",
    options: [
      "Du får inte korsa eller köra över linjen",
      "Du får köra om fritt",
      "Linjen är endast dekorativ",
      "Du måste alltid byta körfält",
    ],
    correct: 0,
    explain:
      "En heldragen linje får inte korsas. Den används där omkörning eller " +
      "filbyte skulle vara farligt.",
    terms: ["heldragen linje", "körfält", "omkörning"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    type: "scenario",
    sv: "Du närmar dig en obevakad övergångsställe där en fotgängare väntar. Vad gäller?",
    fr: "Vous approchez d'un passage piéton non régulé où un piéton attend. Que devez-vous faire ?",
    options: [
      "Lämna fotgängaren tillfälle att passera",
      "Tuta och köra vidare",
      "Öka hastigheten för att hinna före",
      "Du har alltid företräde framför fotgängare",
    ],
    correct: 0,
    explain:
      "Vid ett obevakat övergångsställe ska du lämna gående som gått ut på " +
      "eller just ska gå ut på övergångsstället tillfälle att passera.",
    terms: ["övergångsställe", "fotgängare", "väjningsplikt"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vad betyder väjningsplikt?",
    fr: "Que signifie l'obligation de céder le passage ?",
    options: [
      "Du ska lämna företräde och vid behov stanna",
      "Du har alltid förkörsrätt",
      "Du måste alltid stanna helt",
      "Det gäller endast i rondeller",
    ],
    correct: 0,
    explain:
      "Väjningsplikt innebär att du i god tid ska visa att du tänker väja och " +
      "lämna företräde, samt stanna om det behövs.",
    terms: ["väjningsplikt", "företräde"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "En röd triangel med spetsen uppåt och ett utropstecken betyder:",
    fr: "Un triangle rouge pointe en haut avec un point d'exclamation signifie :",
    options: [
      "Varning för annan fara",
      "Förbud mot infart",
      "Påbjuden körriktning",
      "Slut på huvudled",
    ],
    correct: 0,
    explain:
      "Triangulära märken med röd ram är varningsmärken. Utropstecknet är " +
      "'varning för annan fara' och kompletteras ofta med en tilläggstavla.",
    terms: ["varningsmärke", "tilläggstavla"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett runt märke med röd ram och blått fält med rött kryss betyder:",
    fr: "Un panneau rond à bordure rouge, fond bleu et croix rouge signifie :",
    options: [
      "Förbud att stanna och parkera",
      "Parkering tillåten",
      "Slut på förbud",
      "Rekommenderad hastighet",
    ],
    correct: 0,
    explain:
      "Det är förbudsmärket 'förbud att stanna och parkera'. Runda märken med " +
      "röd ram anger förbud.",
    terms: ["förbudsmärke", "stannande", "parkering"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett blått runt märke med vit pil rakt fram är ett:",
    fr: "Un panneau rond bleu avec une flèche blanche tout droit est un :",
    options: [
      "Påbudsmärke som anger körriktning",
      "Varningsmärke",
      "Förbudsmärke",
      "Upplysningsmärke om parkering",
    ],
    correct: 0,
    explain:
      "Runda blå märken med vit symbol är påbudsmärken; pilen anger påbjuden " +
      "körriktning.",
    terms: ["påbudsmärke", "körriktning"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vem utfärdar taxiförarlegitimationen i Sverige?",
    fr: "Qui délivre la carte de conducteur de taxi en Suède ?",
    options: [
      "Transportstyrelsen",
      "Polisen",
      "Den lokala kommunen",
      "Beställningscentralen",
    ],
    correct: 0,
    explain:
      "Transportstyrelsen prövar och utfärdar taxiförarlegitimationen. " +
      "(Verifiera alltid aktuell handläggning hos myndigheten.)",
    terms: ["Transportstyrelsen", "taxiförarlegitimation"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vad gäller generellt för stannande och parkering vid en busshållplats?",
    fr: "Que prévoit la règle pour l'arrêt et le stationnement à un arrêt de bus ?",
    options: [
      "Särskilda begränsningar gäller; oftast får du inte parkera där",
      "Du får alltid parkera vid hållplatser",
      "Endast bussar berörs av reglerna",
      "Taxi är undantagen alla regler vid hållplatser",
    ],
    correct: 0,
    explain:
      "Vid hållplatser gäller särskilda regler för stannande och parkering. " +
      "Kontrollera vägmärken och markeringar på platsen.",
    terms: ["hållplats", "parkering", "stannande"],
  }),
];

export const QUESTIONS_BY_DELPROV = (d: 1 | 2): MockQuestion[] =>
  QUESTIONS.filter((x) => x.delprov === d);
