import { parse, parseJSON, parseISO } from "date-fns";
export const dateStringToDate = (value: string): Date => {
  switch (value.length) {
    case 10:
      return parse(value, "yyyy-MM-dd", new Date());
    case 19:
      return parse(value, "yyyy-MM-dd HH:mm:ss", new Date());
    case 24:
      return parseJSON(value);
    default:
      return parseISO(value);
  }
};
