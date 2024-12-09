const zeroPad = (num: number, places: number) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const getTime = (date: Date) => {
  return `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
};
