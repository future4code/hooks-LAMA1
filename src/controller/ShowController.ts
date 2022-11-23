import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness/ShowBusiness";
import { ShowDTO } from "../models/Show";

const showBusiness = new ShowBusiness();

export class ShowController {
  async createShow(request: Request, response: Response) {
    try {
      const { weekDay, startTime, endTime, bandId } = request.body;
      const token = request.headers.authorization as string;

      const newShow: ShowDTO = {
        weekDay,
        startTime,
        endTime,
        bandId,
      };

      await showBusiness.createShow(newShow, token);
      response.status(200).send({ data: "Show criado com sucesso!" });
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }

  async getShowsByDay(request: Request, response: Response) {
    try {
      const day = request.params.day;
      const token = request.headers.authorization as string;

      const result = await showBusiness.getShowsByDay(day, token);
      response.status(200).send({ data: result });
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }
}
