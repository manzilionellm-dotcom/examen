import type { RoadSign } from "@/lib/domain/types";

// Road-signs trainer content (spec §5.5). `signAssetRef` points to ORIGINAL,
// synthetic SVG renderings we generate ourselves (see app/components/SignGlyph)
// — never copied official artwork or test maps (spec §16). Meanings are general
// descriptions; verify exact current sign catalogue with the authorities.

export const ROAD_SIGNS: RoadSign[] = [
  {
    id: "warn_other",
    signAssetRef: "warn_exclaim",
    swedishName: "Varning för annan fara",
    frenchName: "Autres dangers",
    meaningFr:
      "Avertit d'un danger non couvert par d'autres panneaux ; souvent " +
      "complété par un panonceau.",
    category: "Varningsmärken",
  },
  {
    id: "warn_pedestrian",
    signAssetRef: "warn_pedestrian",
    swedishName: "Varning för gående",
    frenchName: "Passage de piétons (danger)",
    meaningFr: "Risque de présence de piétons sur ou près de la chaussée.",
    category: "Varningsmärken",
  },
  {
    id: "prohibit_entry",
    signAssetRef: "prohibit_noentry",
    swedishName: "Förbud mot infart med fordon",
    frenchName: "Sens interdit",
    meaningFr: "Interdit d'engager un véhicule dans cette direction.",
    category: "Förbudsmärken",
  },
  {
    id: "prohibit_stop_park",
    signAssetRef: "prohibit_nostop",
    swedishName: "Förbud att stanna och parkera",
    frenchName: "Arrêt et stationnement interdits",
    meaningFr: "Il est interdit de s'arrêter et de stationner.",
    category: "Förbudsmärken",
  },
  {
    id: "mandatory_straight",
    signAssetRef: "mandatory_straight",
    swedishName: "Påbjuden körriktning",
    frenchName: "Direction obligatoire",
    meaningFr: "Vous devez suivre la direction indiquée par la flèche.",
    category: "Påbudsmärken",
  },
  {
    id: "priority_road",
    signAssetRef: "priority_road",
    swedishName: "Huvudled",
    frenchName: "Route prioritaire",
    meaningFr: "Vous circulez sur une route prioritaire.",
    category: "Anvisningsmärken",
  },
  {
    id: "give_way",
    signAssetRef: "give_way",
    swedishName: "Väjningsplikt",
    frenchName: "Cédez le passage",
    meaningFr: "Vous devez céder le passage aux autres véhicules.",
    category: "Väjningspliktsmärken",
  },
  {
    id: "stop",
    signAssetRef: "stop",
    swedishName: "Stopplikt",
    frenchName: "Stop",
    meaningFr: "Vous devez vous arrêter complètement avant de poursuivre.",
    category: "Väjningspliktsmärken",
  },
];
