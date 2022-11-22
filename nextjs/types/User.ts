import { Person } from "./Person";

export type User = {
  id: number;
  email: string;
  photo?: string;
  personId: number;
  person?: Person;
};
