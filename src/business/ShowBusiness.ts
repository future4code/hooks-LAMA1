import { ShowDatabase } from "../database/ShowDatabase";
import {
  CustomError,
  FullSchedule,
  InvalidDay,
  InvalidEndTime,
  InvalidInfos,
  InvalidStartTime,
  InvalidTime,
} from "../error/CustomError";
import { Show, ShowDTO } from "../models/Show";
import { IdGenerator } from "../services/IdGenerator";

const showDatabase = new ShowDatabase();

export class ShowBusiness {
  async createShow(show: ShowDTO) {
    try {
      const { weekDay, startTime, endTime, bandId } = show;

      if (!weekDay || !startTime || !endTime || !bandId) {
        throw new InvalidInfos();
      }

      const weekUpper = weekDay.toUpperCase();

      if (
        weekUpper !== "SEXTA" &&
        weekUpper !== "SÁBADO" &&
        weekUpper !== "DOMINGO"
      ) {
        throw new InvalidDay();
      }

      if (startTime < 8 || startTime > 23 || startTime > endTime) {
        throw new InvalidStartTime();
      }

      if (endTime < 9 || endTime > 23 || endTime < startTime) {
        throw new InvalidEndTime();
      }

      if (!Number.isInteger(startTime) || !Number.isInteger(endTime)) {
        throw new InvalidTime();
      }

      const timeline = await showDatabase.findTimelineByDay(weekDay);

      for (let i = 0; i < timeline.length; i++) {
        if ((timeline[i].week_day === weekDay && timeline[i].start_time === startTime) ||
          (timeline[i].week_day === weekDay && timeline[i].end_time === endTime)) {
          throw new FullSchedule();
        }
      }

      const id = IdGenerator();

      const newShow: Show = {
        id,
        weekDay,
        startTime,
        endTime,
        bandId,
      };

      await showDatabase.createShow(newShow);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getShowsByDay(day: string) {
    try {
      const weekUpper = day.toUpperCase();

      if (
        weekUpper !== "SEXTA" &&
        weekUpper !== "SÁBADO" &&
        weekUpper !== "DOMINGO"
      ) {
        throw new InvalidDay();
      }

      const result = await showDatabase.getShowsByDay(day);
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
