import { response } from "express";
import { bandDatabase } from "../database/BandDatabase";
import {
  CustomError,
  DuplicatedBand,
  InvalidGenre,
  InvalidName,
  InvalidResponsible,
  NotAdmin,
} from "../error/CustomError";
import { BandDTO } from "../models/Bands";
import { IdGenerator } from "../services/IdGenerator";

const bandDataBase = new bandDatabase();

export class BandBusiness {
  async registerBand(band: BandDTO) {
    try {
      const { name, musicGenre, responsible } = band;

      if (!name) {
        throw new InvalidName();
      }
      if (!musicGenre) {
        throw new InvalidGenre();
      }
      if (!responsible) {
        throw new InvalidResponsible();
      }

      const bandas = await bandDataBase.checkDuplicateBands();

      for (let i = 0; i < bandas.length; i++) {
        if (bandas[i].name === name) {
          throw new DuplicatedBand();
        }
      }

      const user = await bandDataBase.checkUserRole(responsible);

      if (user.role !== "ADMIN") {
        throw new NotAdmin();
      }

      const id: string = IdGenerator();

      const newBand = {
        id,
        name,
        musicGenre,
        responsible,
      };

      await bandDataBase.registerBand(newBand);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getBand(name: string) {
    try {
      const result = await bandDataBase.getBand(name);

      if (!name) {
        throw new InvalidName();
      }

      return result;
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }
}
