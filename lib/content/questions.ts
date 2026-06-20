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

  // ===================== EXPANDED BANK (Delprov 1) =====================
  q({
    delprov: 1,
    area: "safety",
    sv: "Vad är syftet med 'tresekundersregeln' i trafik?",
    fr: "Quel est le but de la « règle des trois secondes » ?",
    options: [
      "Att hålla ett tillräckligt avstånd till fordonet framför",
      "Att bestämma hur länge man får stå stilla",
      "Att mäta hur snabbt man får accelerera",
      "Att ange hur ofta man ska byta körfält",
    ],
    correct: 0,
    explain:
      "Tresekundersregeln hjälper dig hålla ett säkert avstånd: välj en fast " +
      "punkt och kontrollera att minst tre sekunder passerar innan du når den. " +
      "Öka marginalen vid halt väglag.",
    terms: ["avstånd", "säkerhetsmarginal"],
  }),
  q({
    delprov: 1,
    area: "safety",
    type: "scenario",
    sv: "Ett litet barn ska åka med i taxin. Vad gäller för skydd?",
    fr: "Un jeune enfant monte dans le taxi. Que prévoit la règle de protection ?",
    options: [
      "Barn ska normalt använda en skyddsanordning anpassad efter längd och ålder",
      "Barn behöver aldrig särskilt skydd i taxi",
      "Det räcker att en vuxen håller barnet i knät",
      "Barn får alltid sitta i framsätet utan skydd",
    ],
    correct: 0,
    explain:
      "Barn ska som regel använda en skyddsanordning (bilbarnstol/bälteskudde) " +
      "anpassad efter längd och ålder. Vissa undantag finns för tillfälliga " +
      "taxiresor – barnets säkerhet går först, kontrollera aktuella regler.",
    terms: ["bilbarnstol", "skyddsanordning", "barn"],
  }),
  q({
    delprov: 1,
    area: "safety",
    sv: "Vad gäller för att hålla mobiltelefon i handen under körning?",
    fr: "Que prévoit la règle pour tenir un téléphone en main en conduisant ?",
    options: [
      "Det är inte tillåtet att hålla mobilen i handen under körning",
      "Det är alltid tillåtet att hålla mobilen",
      "Det är endast tillåtet i tätort",
      "Det är endast förbjudet på motorväg",
    ],
    correct: 0,
    explain:
      "Du får inte hålla mobiltelefon eller annan kommunikationsutrustning i " +
      "handen under körning. Använd handsfree och hantera tekniken så att den " +
      "inte stör körningen.",
    terms: ["mobiltelefon", "handsfree"],
  }),
  q({
    delprov: 1,
    area: "vehicle_knowledge",
    sv: "När ska vinterdäck normalt användas i Sverige?",
    fr: "Quand les pneus hiver doivent-ils normalement être utilisés en Suède ?",
    options: [
      "Vid vinterväglag, normalt 1 december–31 mars",
      "Aldrig, sommardäck räcker hela året",
      "Endast i juli",
      "Endast på motorväg",
    ],
    correct: 0,
    explain:
      "Vid vinterväglag ska vinterdäck användas, normalt mellan 1 december och " +
      "31 mars. Vinterdäck ska ha minst 3 mm mönsterdjup vid vinterväglag.",
    terms: ["vinterdäck", "mönsterdjup", "vinterväglag"],
  }),
  q({
    delprov: 1,
    area: "vehicle_knowledge",
    type: "scenario",
    sv: "Under körning tänds en gul/orange varningslampa för motorn. Vad gör du?",
    fr: "Un témoin moteur jaune/orange s'allume en roulant. Que faites-vous ?",
    options: [
      "Var uppmärksam, anpassa körningen och låt kontrollera fordonet snarast",
      "Ignorerar den helt, den släcks alltid själv",
      "Ökar hastigheten för att 'rensa' motorn",
      "Stänger av all belysning",
    ],
    correct: 0,
    explain:
      "En gul/orange lampa signalerar ett fel som bör kontrolleras snart. En " +
      "röd lampa är allvarligare och kan kräva att du stannar. Följ " +
      "instruktionsboken.",
    terms: ["varningslampa", "instruktionsbok"],
  }),
  q({
    delprov: 1,
    area: "vehicle_knowledge",
    sv: "Vad gör ett ABS-bromssystem?",
    fr: "À quoi sert le système de freinage ABS ?",
    options: [
      "Förhindrar att hjulen låser sig vid kraftig inbromsning så att du kan styra",
      "Gör att bilen alltid stannar på halva sträckan",
      "Ersätter behovet av att hålla avstånd",
      "Stänger av motorn vid inbromsning",
    ],
    correct: 0,
    explain:
      "ABS hindrar hjulen från att låsa sig vid hård inbromsning, så att du " +
      "behåller styrförmågan. Det förkortar inte alltid bromssträckan, särskilt " +
      "inte på lös is eller grus.",
    terms: ["ABS", "bromssträcka", "styrförmåga"],
  }),
  q({
    delprov: 1,
    area: "eco_driving",
    sv: "Hur påverkar en motorvärmare miljö och ekonomi vid kallstart?",
    fr: "Comment un chauffe-moteur agit-il sur l'environnement et l'économie au démarrage à froid ?",
    options: [
      "Den minskar bränsleförbrukning, slitage och utsläpp vid kallstart",
      "Den ökar alltid förbrukningen",
      "Den har ingen effekt",
      "Den behövs bara på sommaren",
    ],
    correct: 0,
    explain:
      "En motorvärmare ger en varmare motor vid start, vilket minskar " +
      "bränsleförbrukning, slitage och utsläpp – särskilt vid kyla.",
    terms: ["motorvärmare", "kallstart", "utsläpp"],
  }),
  q({
    delprov: 1,
    area: "eco_driving",
    sv: "Hur påverkar för lågt däcktryck körningen?",
    fr: "Quel est l'effet d'une pression de pneus trop basse ?",
    options: [
      "Ökad bränsleförbrukning och sämre köregenskaper",
      "Lägre förbrukning och bättre grepp",
      "Ingen påverkan alls",
      "Bara påverkan på ljudet",
    ],
    correct: 0,
    explain:
      "För lågt däcktryck ökar rullmotståndet och därmed bränsleförbrukningen, " +
      "ger ökat slitage och kan försämra köregenskaperna.",
    terms: ["däcktryck", "rullmotstånd"],
  }),
  q({
    delprov: 1,
    area: "eco_driving",
    sv: "Vad gäller generellt för onödig tomgångskörning vid stillastående?",
    fr: "Que prévoit en général la règle sur le ralenti inutile à l'arrêt ?",
    options: [
      "Den bör undvikas; många kommuner begränsar tomgång till en kort tid",
      "Den är alltid tillåten hur länge som helst",
      "Den minskar utsläppen",
      "Den krävs alltid innan körning",
    ],
    correct: 0,
    explain:
      "Onödig tomgång slösar bränsle och ger utsläpp. I många kommuner är " +
      "tomgångskörning begränsad (ofta omkring en minut) – kontrollera lokala " +
      "regler.",
    terms: ["tomgång", "miljö"],
  }),
  q({
    delprov: 1,
    area: "navigation",
    type: "map",
    sv: "Du kör norrut och svänger höger. Åt vilket väderstreck kör du nu?",
    fr: "Vous roulez vers le nord et tournez à droite. Vers quel point cardinal allez-vous ?",
    options: ["Öster", "Väster", "Söder", "Norr"],
    correct: 0,
    explain: "Med norr framåt är höger = öster. En högersväng från nordlig riktning leder österut.",
    terms: ["väderstreck", "öster"],
  }),
  q({
    delprov: 1,
    area: "navigation",
    type: "map",
    sv: "På en karta i skala 1:10 000 motsvarar 1 cm på kartan:",
    fr: "Sur une carte à l'échelle 1:10 000, 1 cm sur la carte correspond à :",
    options: [
      "100 meter i verkligheten",
      "10 meter i verkligheten",
      "1 kilometer i verkligheten",
      "10 kilometer i verkligheten",
    ],
    correct: 0,
    explain: "1:10 000 betyder att 1 cm på kartan = 10 000 cm = 100 m i verkligheten.",
    terms: ["skala", "karta"],
  }),
  q({
    delprov: 1,
    area: "navigation",
    type: "scenario",
    sv: "Trafikinformation visar en olycka på din planerade väg. Vad är lämpligast?",
    fr: "L'info-trafic signale un accident sur votre itinéraire. Quelle est la meilleure réaction ?",
    options: [
      "Välj en alternativ väg för att undvika köer och förseningar",
      "Kör ändå rakt in i kön",
      "Stanna och vänta i timmar",
      "Strunta i informationen",
    ],
    correct: 0,
    explain:
      "Effektivt vägval innebär att använda aktuell trafikinformation och välja " +
      "en alternativ rutt när det behövs, för kundens och tidens skull.",
    terms: ["trafikinformation", "alternativ väg"],
  }),
  q({
    delprov: 1,
    area: "customer_service",
    type: "scenario",
    sv: "En passagerare berättar känslig information under resan. Hur bör du hantera det?",
    fr: "Un passager confie une information sensible. Comment devez-vous la traiter ?",
    options: [
      "Behandla den med diskretion och respektera passagerarens integritet",
      "Berätta vidare till nästa kund",
      "Lägga ut det på sociala medier",
      "Skämta om det med kollegor",
    ],
    correct: 0,
    explain: "Ett professionellt bemötande innebär diskretion och respekt för passagerarens integritet.",
    terms: ["integritet", "diskretion"],
  }),
  q({
    delprov: 1,
    area: "customer_service",
    type: "scenario",
    sv: "Du och kunden talar inte samma språk. Vad är ett bra första steg?",
    fr: "Vous et le client ne parlez pas la même langue. Quelle est une bonne première étape ?",
    options: [
      "Använda adress, karta eller appen för att bekräfta destinationen",
      "Höja rösten tills kunden förstår",
      "Köra iväg utan att veta vart",
      "Be kunden gå ur",
    ],
    correct: 0,
    explain:
      "Bekräfta destinationen visuellt med adress, karta eller GPS. Tydlighet " +
      "och tålamod ger ett gott bemötande.",
    terms: ["kommunikation", "adress"],
  }),
  q({
    delprov: 1,
    area: "illness_disability",
    type: "scenario",
    sv: "En synskadad passagerare har en ledarhund. Vad gäller?",
    fr: "Un passager malvoyant a un chien-guide. Que prévoit la règle ?",
    options: [
      "Ledarhunden får normalt följa med i taxin",
      "Hundar är aldrig tillåtna i taxi",
      "Endast om kunden betalar extra för hunden",
      "Endast om hunden åker i bagageutrymmet",
    ],
    correct: 0,
    explain:
      "En ledar-/assistanshund får normalt följa med. Underlätta för " +
      "passageraren; en ledarhund nekas inte på grund av t.ex. pälsallergi.",
    terms: ["ledarhund", "assistanshund", "tillgänglighet"],
  }),
  q({
    delprov: 1,
    area: "illness_disability",
    type: "scenario",
    sv: "En passagerare får ett krampanfall under resan. Vad är lämpligast?",
    fr: "Un passager fait une crise convulsive pendant le trajet. Quelle est la bonne attitude ?",
    options: [
      "Stanna säkert, skydda personen utan att hålla fast hårt och larma 112 vid behov",
      "Fortsätta köra fort och ignorera",
      "Ge personen vatten direkt i munnen",
      "Lämna personen ensam vid vägkanten",
    ],
    correct: 0,
    explain:
      "Stanna på en säker plats, skydda personen från skador utan att hålla " +
      "fast hårt, och larma 112 om anfallet är långvarigt eller upprepas. " +
      "Stoppa aldrig något i munnen.",
    terms: ["krampanfall", "112", "första hjälpen"],
  }),
  q({
    delprov: 1,
    area: "illness_disability",
    type: "scenario",
    sv: "En äldre passagerare med rollator behöver hjälp in i bilen. Vad gör du?",
    fr: "Un passager âgé avec déambulateur a besoin d'aide pour monter. Que faites-vous ?",
    options: [
      "Frågar hur du kan hjälpa, ger tid och stuvar rollatorn säkert",
      "Stressar personen att skynda sig",
      "Kör iväg utan rollatorn",
      "Vägrar att hjälpa till",
    ],
    correct: 0,
    explain:
      "Ge tid, fråga hur du kan hjälpa till och säkra hjälpmedlet i bilen. " +
      "Tålamod och respekt är centralt i bemötandet.",
    terms: ["rollator", "hjälpmedel", "bemötande"],
  }),
  q({
    delprov: 1,
    area: "work_environment",
    type: "scenario",
    sv: "Du känner dig hotad av en passagerare. Vad är lämpligast ur arbetsmiljösynpunkt?",
    fr: "Vous vous sentez menacé par un passager. Quelle est la bonne réaction (santé au travail) ?",
    options: [
      "Prioritera din säkerhet, sök en trygg plats och larma vid behov",
      "Provocera tillbaka",
      "Köra ännu fortare",
      "Strunta i hotet",
    ],
    correct: 0,
    explain:
      "Din säkerhet går först. Försök lugna situationen, kör mot en trygg och " +
      "befolkad plats och larma 112 vid behov. Många bilar har överfallslarm.",
    terms: ["hot", "överfallslarm", "arbetsmiljö"],
  }),
  q({
    delprov: 1,
    area: "work_environment",
    sv: "Varför är raster viktiga under långa arbetspass?",
    fr: "Pourquoi les pauses sont-elles importantes lors de longues journées ?",
    options: [
      "De minskar trötthet och bibehåller uppmärksamhet och säkerhet",
      "De ökar olycksrisken",
      "De är förbjudna i yrkestrafik",
      "De saknar betydelse",
    ],
    correct: 0,
    explain:
      "Regelbundna raster motverkar trötthet och bibehåller koncentration, " +
      "vilket är avgörande för trafiksäkerheten.",
    terms: ["rast", "trötthet", "arbetsmiljö"],
  }),
  q({
    delprov: 1,
    area: "work_environment",
    sv: "Hur lyfter du tunga väskor på ett ergonomiskt sätt?",
    fr: "Comment soulever des bagages lourds de façon ergonomique ?",
    options: [
      "Böj i knäna, håll ryggen rak och bördan nära kroppen",
      "Böj ryggen och håll bördan långt ut",
      "Lyft snabbt med raka ben",
      "Vrid kroppen samtidigt som du lyfter",
    ],
    correct: 0,
    explain:
      "Lyft med benen, rak rygg och bördan nära kroppen för att skydda ryggen " +
      "mot belastningsskador.",
    terms: ["lyftteknik", "ergonomi", "belastning"],
  }),
  q({
    delprov: 1,
    area: "risk_judgment",
    sv: "Var är omkörning särskilt riskfylld och ofta olämplig?",
    fr: "Où le dépassement est-il particulièrement risqué et souvent inapproprié ?",
    options: [
      "Strax före kurvor, backkrön och korsningar med skymd sikt",
      "På långa raksträckor med fri sikt",
      "Där det finns ett särskilt omkörningsfält",
      "När du har god sikt och marginal",
    ],
    correct: 0,
    explain:
      "Omkörning kräver fri sikt och tillräcklig marginal. Vid backkrön, kurvor " +
      "och korsningar är sikten ofta skymd – avstå.",
    terms: ["omkörning", "sikt", "risk"],
  }),
  q({
    delprov: 1,
    area: "risk_judgment",
    sv: "Hur anpassar du körningen vid mörkerkörning på landsväg?",
    fr: "Comment adapter votre conduite de nuit sur route de campagne ?",
    options: [
      "Anpassa hastigheten så att du kan stanna inom den sträcka du ser",
      "Kör alltid med helljus mot mötande",
      "Öka hastigheten eftersom det är mindre trafik",
      "Släck lyset för att vänja ögonen",
    ],
    correct: 0,
    explain:
      "Kör inte fortare än att du kan stanna inom den belysta sträckan. Växla " +
      "till halvljus vid möte och var uppmärksam på vilt.",
    terms: ["mörkerkörning", "helljus", "vilt"],
  }),
  q({
    delprov: 1,
    area: "risk_judgment",
    type: "scenario",
    sv: "Ett rådjur springer ut på vägen precis framför dig. Vad är oftast säkrast?",
    fr: "Un chevreuil surgit juste devant vous. Quelle réaction est souvent la plus sûre ?",
    options: [
      "Bromsa kraftigt och försök behålla kontrollen i ditt körfält",
      "Tvärväja in i mötande trafik",
      "Gasa för att hinna förbi",
      "Blunda och hoppas",
    ],
    correct: 0,
    explain:
      "Vid viltrisk: bromsa hårt och håll bilen i körfältet snarare än att " +
      "tvärväja, vilket kan leda till frontalkrock eller dikeskörning. Anmäl " +
      "påkört vilt till polisen.",
    terms: ["vilt", "väjning", "kontroll"],
  }),

  // ===================== EXPANDED BANK (Delprov 2) =====================
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad krävs för att bedriva taxiverksamhet (för företaget)?",
    fr: "Que faut-il pour exploiter une activité de taxi (l'entreprise) ?",
    options: [
      "Taxitrafiktillstånd",
      "Endast en vanlig firmaregistrering",
      "Endast förarens körkort",
      "Inget tillstånd alls",
    ],
    correct: 0,
    explain:
      "För att bedriva yrkesmässig taxitrafik krävs taxitrafiktillstånd för " +
      "verksamheten, utöver att föraren har taxiförarlegitimation.",
    terms: ["taxitrafiktillstånd", "yrkesmässig trafik"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad signalerar en tänd taxiskylt (taklykta) oftast?",
    fr: "Que signale généralement une enseigne lumineuse de taxi allumée ?",
    options: [
      "Att taxin är ledig",
      "Att taxin är upptagen",
      "Att bilen är trasig",
      "Att föraren har rast",
    ],
    correct: 0,
    explain:
      "En tänd taklykta indikerar normalt att taxin är ledig och kan anlitas. " +
      "(Detaljer kan variera mellan företag och utrustning.)",
    terms: ["taklykta", "ledig"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad gäller för särskild prisinformation vid högre taxipriser?",
    fr: "Que prévoit la règle d'information de prix pour les tarifs élevés ?",
    options: [
      "När jämförpriset överstiger en viss nivå ska prisinformation visas tydligt för kunden",
      "Priser är alltid hemliga",
      "Prisinformation krävs endast för företagskunder",
      "Prisinformation behöver bara ges efter resan",
    ],
    correct: 0,
    explain:
      "Det finns krav på tydlig prisinformation; bl.a. ska jämförpris visas, " +
      "och särskild prisinformation krävs när priset överstiger en viss nivå. " +
      "Kontrollera aktuella gränsvärden hos myndigheten.",
    terms: ["jämförpris", "prisinformation"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vilken utrustning ska normalt registrera uppgifter om taxiresan?",
    fr: "Quel équipement doit normalement enregistrer les données de la course ?",
    options: [
      "En godkänd taxameter",
      "Endast förarens mobiltelefon",
      "Ingen särskild utrustning",
      "En vanlig parkeringsautomat",
    ],
    correct: 0,
    explain:
      "Taxifordon ska som regel ha en godkänd taxameter (i vissa fall annan " +
      "särskild utrustning) som registrerar uppgifter om resan och underlag för " +
      "kvitto.",
    terms: ["taxameter", "kvitto"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Vad kan hända med taxiförarlegitimationen vid allvarlig brottslighet eller olämplighet?",
    fr: "Que peut-il arriver à la légitimation en cas d'infraction grave ou d'inaptitude ?",
    options: [
      "Den kan återkallas av Transportstyrelsen",
      "Ingenting, den gäller alltid livet ut",
      "Den blir automatiskt dubbelt så lång",
      "Den övergår till polisen",
    ],
    correct: 0,
    explain:
      "Legitimationen bygger på lämplighet (laglydnad m.m.). Vid allvarliga " +
      "brott eller olämplighet kan Transportstyrelsen återkalla den.",
    terms: ["återkallelse", "lämplighet", "Transportstyrelsen"],
  }),
  q({
    delprov: 2,
    area: "taxi_legislation",
    sv: "Hur ska taxiförarlegitimationen normalt vara tillgänglig under arbete?",
    fr: "Comment la légitimation doit-elle normalement être disponible au travail ?",
    options: [
      "Föraren ska ha den med sig och den ska normalt vara synlig i fordonet",
      "Inlåst i bagageutrymmet",
      "Hemma hos föraren",
      "Den får inte visas alls",
    ],
    correct: 0,
    explain:
      "Föraren ska ha med sig legitimationen, och den ska normalt vara placerad " +
      "så att passageraren kan se den (förartavla/ID).",
    terms: ["förartavla", "legitimation"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Var går gränsen för rattfylleri (alkohol) i Sverige?",
    fr: "Quel est le seuil de l'alcool au volant (rattfylleri) en Suède ?",
    options: [
      "0,2 promille i blodet",
      "0,5 promille i blodet",
      "0,8 promille i blodet",
      "1,0 promille i blodet",
    ],
    correct: 0,
    explain:
      "Gränsen för rattfylleri i Sverige är 0,2 promille. Vid 1,0 promille " +
      "eller mer räknas det som grovt rattfylleri. Som yrkesförare ska du aldrig " +
      "köra alkoholpåverkad.",
    terms: ["rattfylleri", "promille"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vilken är den generella högsta hastigheten inom tättbebyggt område om inget annat anges?",
    fr: "Quelle est la vitesse maximale générale en agglomération sauf indication contraire ?",
    options: ["50 km/h", "30 km/h", "70 km/h", "90 km/h"],
    correct: 0,
    explain:
      "Inom tättbebyggt område är grundregeln 50 km/h om inget annat anges. " +
      "Lokalt förekommer ofta 30 eller 40 km/h, t.ex. nära skolor.",
    terms: ["tättbebyggt område", "hastighet"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vad innebär högerregeln i en korsning utan skyltar eller signaler?",
    fr: "Que signifie la priorité à droite à une intersection sans panneaux ?",
    options: [
      "Du har väjningsplikt mot fordon som kommer från höger",
      "Du har alltid företräde",
      "Den som kör snabbast har företräde",
      "Vänstertrafik gäller",
    ],
    correct: 0,
    explain:
      "I korsningar utan reglering gäller högerregeln: du ska lämna företräde " +
      "åt fordon som närmar sig från höger.",
    terms: ["högerregeln", "väjningsplikt"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Hur nära en korsning får du normalt inte stanna eller parkera?",
    fr: "À quelle distance d'une intersection est-il normalement interdit de s'arrêter/stationner ?",
    options: [
      "Inom 10 meter från korsande körbanas närmaste kant",
      "Inom 1 meter",
      "Inom 3 meter",
      "Det finns ingen sådan regel",
    ],
    correct: 0,
    explain:
      "Du får inte stanna eller parkera inom 10 meter före eller efter en " +
      "korsning, räknat från den korsande körbanans närmaste kant.",
    terms: ["korsning", "parkering", "10 meter"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    type: "scenario",
    sv: "Ett utryckningsfordon med påslagna larm närmar sig bakifrån. Vad gör du?",
    fr: "Un véhicule d'urgence avec sirène approche par derrière. Que faites-vous ?",
    options: [
      "Lämna fri väg, kör åt sidan och stanna vid behov på ett säkert sätt",
      "Ökar farten för att hålla undan",
      "Tvärbromsar mitt i körfältet",
      "Ignorerar fordonet",
    ],
    correct: 0,
    explain:
      "Du ska lämna fri väg åt utryckningsfordon. Kör lugnt åt sidan, blockera " +
      "inte korsningar och stanna vid behov utan att skapa fara.",
    terms: ["utryckningsfordon", "fri väg"],
  }),
  q({
    delprov: 2,
    area: "traffic_legislation",
    sv: "Vad gäller vid omkörning av en cyklist?",
    fr: "Que prévoit la règle lors du dépassement d'un cycliste ?",
    options: [
      "Håll ett betryggande sidoavstånd och anpassa hastigheten",
      "Kör så nära som möjligt för att spara tid",
      "Tuta och tvinga cyklisten åt sidan",
      "Omkörning av cyklister är förbjuden",
    ],
    correct: 0,
    explain:
      "Vid omkörning av cyklister ska du hålla ett betryggande avstånd i sidled " +
      "och anpassa farten, eftersom cyklister är oskyddade trafikanter.",
    terms: ["omkörning", "cyklist", "sidoavstånd"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett runt märke med röd ram och siffran 50 anger:",
    fr: "Un panneau rond à bordure rouge avec le chiffre 50 indique :",
    options: [
      "Förbud mot högre hastighet än 50 km/h",
      "Rekommenderad hastighet 50 km/h",
      "Minsta hastighet 50 km/h",
      "Avstånd 50 meter till en fara",
    ],
    correct: 0,
    explain:
      "Det är förbudsmärket 'hastighetsbegränsning'. Du får inte köra fortare " +
      "än angivet värde, här 50 km/h.",
    terms: ["hastighetsbegränsning", "förbudsmärke"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett hastighetsmärke med grå siffra och ett snedstreck över betyder:",
    fr: "Un panneau de vitesse barré d'un trait oblique signifie :",
    options: [
      "Tidigare hastighetsbegränsning upphör",
      "Hastigheten fördubblas",
      "Stopp omedelbart",
      "Parkering förbjuden",
    ],
    correct: 0,
    explain:
      "Märket anger att en tidigare hastighetsbegränsning upphör. Därefter " +
      "gäller bashastigheten för vägtypen tills annat anges.",
    terms: ["hastighetsbegränsning upphör", "bashastighet"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett runt märke med två bilar sida vid sida (den ena röd) anger:",
    fr: "Un panneau rond avec deux voitures côte à côte (l'une en rouge) indique :",
    options: [
      "Förbud mot omkörning med motordrivet fordon",
      "Påbjuden omkörning",
      "Mötesplats",
      "Parkering för två bilar",
    ],
    correct: 0,
    explain:
      "Det är förbudsmärket 'förbud mot omkörning'. Du får inte köra om andra " +
      "motordrivna fordon på sträckan.",
    terms: ["omkörningsförbud", "förbudsmärke"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Ett fyrkantigt blått märke med en vit bokstav 'P' anger:",
    fr: "Un panneau carré bleu avec un « P » blanc indique :",
    options: [
      "Tillåten parkering (parkeringsplats)",
      "Parkering förbjuden",
      "Polisstation",
      "Påbjuden körriktning",
    ],
    correct: 0,
    explain:
      "Blå fyrkantiga märken är anvisnings-/upplysningsmärken. 'P' anger en " +
      "parkeringsplats; tilläggstavlor kan ange villkor.",
    terms: ["parkering", "anvisningsmärke", "tilläggstavla"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "scenario",
    sv: "Vilket beteende krävs i ett gångfartsområde?",
    fr: "Quel comportement est exigé dans une zone de rencontre (gångfartsområde) ?",
    options: [
      "Kör i gångfart och lämna företräde åt gående",
      "Kör som vanligt i 50 km/h",
      "Gående är förbjudna",
      "Omkörning är obligatorisk",
    ],
    correct: 0,
    explain:
      "I ett gångfartsområde får du köra högst i gångfart och måste lämna " +
      "företräde åt gående. Parkering får endast ske på markerade platser.",
    terms: ["gångfartsområde", "gångfart", "företräde"],
  }),
  q({
    delprov: 2,
    area: "road_signs",
    type: "sign",
    sv: "Vad innebär ett åttkantigt rött märke med texten STOP?",
    fr: "Que signifie un panneau octogonal rouge marqué STOP ?",
    options: [
      "Stopplikt – du måste stanna helt innan du kör vidare",
      "Du får sakta ner men behöver inte stanna",
      "Endast bussar måste stanna",
      "Parkering tillåten",
    ],
    correct: 0,
    explain:
      "Märket anger stopplikt: du måste stanna helt vid stopplinjen (eller " +
      "innan korsningen) och får köra vidare först när det är fritt.",
    terms: ["stopplikt", "stopplinje"],
  }),
];

export const QUESTIONS_BY_DELPROV = (d: 1 | 2): MockQuestion[] =>
  QUESTIONS.filter((x) => x.delprov === d);
