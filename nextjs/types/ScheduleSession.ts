import { Schedule } from "./Schedule";

export type ScheduleSession = {
  scheduleAt?: string;
  timeOptionId?: number;
  services?: number[];
  billingAddressId?: number;
  installments?: number;
  cardToken?: string;
  cardFirstSixDigits?: string;
  cardLastFourDigits?: string;
  paymentTypeId?: string;
  data?: Schedule;
};
