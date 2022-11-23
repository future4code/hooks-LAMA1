import { Show } from "../../models/Show";

export interface ShowRepository {
  createShow(show: Show): Promise<void>;
  findTimelineByDay(weekDay : string): Promise<[]>;
  getShowsByDay(day: string): Promise<[]>;
}
