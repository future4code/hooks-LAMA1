import BaseDatabase from "./BaseDatabase";
import { Show } from "../models/Show";

export class ShowDatabase extends BaseDatabase {
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
  public async findTimelineByDay(day: string) {
    const result = await BaseDatabase.connection("Lama_shows")
      .select()
      .where({ week_day: day });

    return result;
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
