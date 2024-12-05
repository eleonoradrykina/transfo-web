export enum Language {
  NL = "nl",
}

export interface IEvent {
  title: string;
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  startTime2: Date | null;
  endTime2: Date | null;
  tags: string[];
  location: string;
  subLocation?: string;
  heroImage: string;
  content: any;
}
