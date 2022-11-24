import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDTO } from "../models/Bands";

const bandBusiness = new BandBusiness();

export class BandController {
  async registerBand(request: Request, response: Response) {
    try {
      const { name, musicGenre, responsible } = request.body;

      const newBand: BandDTO = {
        name,
        musicGenre,
        responsible,
      };

      await bandBusiness.registerBand(newBand);
      response.status(200).send("banda registrada.");
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async getBand(request: Request, response: Response) {
    try {
      const bandName = request.body;

      const result = await bandBusiness.getBand(bandName);
      response.status(200).send({data: result});
    } catch (error) {
      response.status(200).send(error.message);
    }
  }
}
