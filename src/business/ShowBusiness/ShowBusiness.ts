import { ShowDatabase } from "../../database/ShowDatabase";
import {
  CustomError,
  FullSchedule,
  InvalidAuthenticatorData,
  InvalidDay,
  InvalidEndTime,
  InvalidInfos,
  InvalidStartTime,
  InvalidTime,
  InvalidToken,
} from "../../error/CustomError";
import { Show, ShowDTO } from "../../models/Show";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/TokenGenerator";

const showDatabase = new ShowDatabase();
const tokenGenerator = new TokenGenerator();

export class ShowBusiness {
  public async createShow(show: ShowDTO, token: string) {
    try {
      const { weekDay, startTime, endTime, bandId } = show;

      if (!token) {
        throw new InvalidToken();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

      if (!weekDay || !startTime || !endTime || !bandId) {
        throw new InvalidInfos();
      }

      const weekUpper = weekDay.toUpperCase();

      if (
        weekUpper !== "SEXTA" &&
        weekUpper !== "SABADO" &&
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
        if (
          (timeline[i].week_day === weekDay &&
            timeline[i].start_time === startTime) ||
          (timeline[i].week_day === weekDay && timeline[i].end_time === endTime)
        ) {
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

  public async getShowsByDay(day: string, token: string) {
    try {
      if (!token) {
        throw new InvalidToken();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

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
