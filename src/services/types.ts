export enum Language {
  NL = "nl",
}

export interface Event {
  title: string;
  name: string;
  paragraph1: string;
  paragraph2?: string;
  paragraph3?: string;
  links?: { text: string; url: string }[];
  startTime?: Date;
  endTime?: Date;
  startTime2?: Date;
  endTime2?: Date;
  tags: string[];
  location: string;
  subLocation?: string;
  image: string;
}
