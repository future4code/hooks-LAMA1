import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDTO } from "../models/Bands";

// const bandBusiness = new BandBusiness();

export class BandController {
  constructor(private bandBusiness: BandBusiness) {}
  async registerBand(request: Request, response: Response) {
    try {
      const { name, musicGenre, responsible } = request.body;

      const token = request.headers.authorization as string;

      const newBand: BandDTO = {
        name,
        musicGenre,
        responsible,
      };

      await this.bandBusiness.registerBand(newBand, token);
      response.status(200).send("banda registrada.");
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async getBand(request: Request, response: Response) {
    try {
      const bandName = request.body.name;

      const token = request.headers.authorization as string;

      const result = await this.bandBusiness.getBand(bandName, token);
      response.status(200).send({ data: result });
    } catch (error) {
      response.status(200).send(error.message);
    }
  }
}
