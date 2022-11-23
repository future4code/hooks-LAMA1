import { response } from "express";
import { bandDatabase } from "../database/BandDatabase";
import { CustomError } from "../error/CustomError";
import { BandDTO } from "../models/Bands";
import { IdGenerator } from "../services/IdGenerator";

const bandDataBase = new bandDatabase();

export class BandBusiness {
  async registerBand(band: BandDTO) {
    try {
      const { name, musicGenre, responsible } = band;

      const id: string = IdGenerator();

      const newBand = {
        id,
        name,
        musicGenre,
        responsible,
      };

      await bandDataBase.registerBand(newBand);
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }
}
