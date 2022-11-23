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
}
