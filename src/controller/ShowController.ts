import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDTO } from "../models/Show";

const showBusiness = new ShowBusiness();

export class ShowController {
  async createShow(request: Request, response: Response) {
    try {
      const { weekDay, startTime, endTime, bandId } = request.body;

      const newShow: ShowDTO = {
        weekDay,
        startTime,
        endTime,
        bandId,
      };

      await showBusiness.createShow(newShow);
      response.status(200).send({ data: "Show criado com sucesso!" });
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }

  async getShowsByDay(request: Request, response: Response) {
    try {
      const day = request.params.day;

      const result = await showBusiness.getShowsByDay(day);
      response.status(200).send({ data: result });
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }
}
