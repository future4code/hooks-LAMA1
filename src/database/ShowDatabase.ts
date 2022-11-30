import BaseDatabase from "./BaseDatabase";
import { Show } from "../models/Show";
import { ShowRepository } from "../business/ShowRepository";
import { FullSchedule } from "../error/CustomError";

export class ShowDatabase extends BaseDatabase implements ShowRepository {
  public async createShow(show: Show) {
    await BaseDatabase.connection("Lama_shows").insert({
      id: show.id,
      week_day: show.weekDay,
      start_time: show.startTime,
      end_time: show.endTime,
      band_id: show.bandId,
    });
  }

  // método usado no business para verificar se a agenda está completa
  public async findTimelineByDay(day: string, startTime: number, endTime: number) {
    const timeline = await BaseDatabase.connection("Lama_shows")
      .select()
      .where({ week_day: day });

    let status = false

      for (let i = 0; i < timeline.length; i++) {
        if ((timeline[i].week_day === day && timeline[i].start_time === startTime) ||
            (timeline[i].week_day === day && timeline[i].end_time === endTime)) 
        {
          status = true
        }
      }

      return status
  }

  public async getShowsByDay(day: string) {
    const result = await BaseDatabase.connection.raw(`
      SELECT B.name, B.music_genre
      FROM Lama_bands as B
      JOIN Lama_shows as S
      on B.id  =  S.band_id
      WHERE week_day = "${day}"
      ORDER BY S.start_time DESC
  `);
    return result[0];
  }
}
