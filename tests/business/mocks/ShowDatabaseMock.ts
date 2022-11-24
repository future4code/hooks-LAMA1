import { ShowRepository } from "../../../src/business/ShowRepository";
import { Show } from "../../../src/models/Show";
import { timeline } from "./ShowMock";

export class ShowDatabaseMock implements ShowRepository {
  public async createShow(show: Show): Promise<void> {}

  public async findTimelineByDay(weekDay: string, startTime: number, endTime: number): Promise<any> {
    let status = false;

    for (let i = 0; i < timeline.length; i++) {
      if ( weekDay === timeline[i].weekDay && startTime === timeline[i].startTime && endTime === timeline[i].endTime) {
        status = true;
      }
    }

    return status;
  }

  public async getShowsByDay(day: string): Promise<Show[]> {
    return [];
  }
}
