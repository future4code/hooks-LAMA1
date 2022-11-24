import { Show } from "../models/Show";

export interface ShowRepository {
  createShow(show: Show): Promise<void>;
  findTimelineByDay(weekDay : string, startTime: number, endTime : number): Promise<boolean>;
  getShowsByDay(day: string): Promise<Show[]>;
}
