export enum Language {
  NL = "nl",
}

export enum BUILDING {
  MARKT = "markt",
  WATERTOREN = "watertoren",
  MACHINEZAAL_POMPENZAAL = "machinezaal-pompenzaal",
  TRANSFORMATOREN = "transformatoren",
  KETELHUIS = "ketelhuis",
  WATERBASSIN = "waterbassin",
  HOOGTEPARCOURS = "hoogteparcours",
  DUIKTANK = "duiktank",
  INGANG = "ingang",
  DIRECTEURSWONING = "directeurswoning",
  MECHANIEKERS = "mechaniekers",
  OCTAGON = "octagon",
  PLONG = "plong",
}

export interface IEvent {
  slug: string;
  title: string;
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  extraTime: string;
  tags: string[];
  location: string;
  subLocation?: string;
  heroImage: string;
  content: string;
}
