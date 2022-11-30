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
} from "../error/CustomError";
import { Show, ShowDTO } from "../models/Show";
import { IIdGenerator, ITokenGenerator } from "./Port";
import { ShowRepository } from "./ShowRepository";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowRepository,
    private idGenerator: IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ) {}

  public async createShow(show: ShowDTO, token: string) {
    try {
      const { weekDay, startTime, endTime, bandId } = show;

      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

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

      const timeline = await this.showDatabase.findTimelineByDay(weekDay, startTime, endTime);

      if (timeline === true) {
        throw new FullSchedule();
      }
   
      const id = this.idGenerator.generate();

      const newShow: Show = {
        id,
        weekDay,
        startTime,
        endTime,
        bandId,
      };

      await this.showDatabase.createShow(newShow);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public async getShowsByDay(day: string, token: string) {
    try {
      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

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

      const result = await this.showDatabase.getShowsByDay(day);
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
