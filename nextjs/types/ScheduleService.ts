import { Service } from "./Service";

export type ScheduleService = {
  scheduleId: number;
  serviceId: number;
  service?: Service;
};
