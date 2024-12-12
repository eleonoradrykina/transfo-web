import type { IEvent } from "./types";

const zeroPad = (num: number, places: number) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const getTime = (date: Date) => {
  return `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
};

export const sortDates = (a: IEvent, b: IEvent): number => {
  if (a.startTime && b.startTime && a.endTime && b.endTime) {
    if (Date.now() > a.endTime.getTime() && Date.now() < b.endTime.getTime()) {
      return 1;
    } else if (
      Date.now() < a.endTime.getTime() &&
      Date.now() > b.endTime.getTime()
    ) {
      return -1;
    }
    return a.startTime.getTime() - b.startTime.getTime();
  } else if (a.endTime && Date.now() > a.endTime.getTime() && !b.endTime) {
    return 1;
  } else if (b.endTime && Date.now() > b.endTime.getTime() && !a.endTime) {
    return -1;
  } else if (a.startTime && !b.startTime) {
    return -1;
  } else if (!a.startTime && b.startTime) {
    return 1;
  } else {
    return 0;
  }
};
