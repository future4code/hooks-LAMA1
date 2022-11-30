import {
  CustomError,
  DuplicatedBand,
  InvalidAuthenticatorData,
  InvalidGenre,
  InvalidName,
  InvalidResponsible,
  InvalidToken,
  NotAdmin,
} from "../error/CustomError";
import { BandDTO } from "../models/Bands";
import { BandRepository } from "./BandRepository";
import { IIdGenerator, ITokenGenerator } from "./Port";


export class BandBusiness {
  constructor(
    private bandDatabase: BandRepository,
    private idGenerator: IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ) {}

  async registerBand(band: BandDTO, token: string) {
    try {
      const { name, musicGenre, responsible } = band;

      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

      if (!name) {
        throw new InvalidName();
      }
      if (!musicGenre) {
        throw new InvalidGenre();
      }
      if (!responsible) {
        throw new InvalidResponsible();
      }

      const bandas = await this.bandDatabase.checkDuplicateBands();

      for (let i = 0; i < bandas.length; i++) {
        if (bandas[i].name === name) {
          throw new DuplicatedBand();
        }
      }

      const user = await this.bandDatabase.checkUserRole(responsible);

      if (user.role !== "ADMIN") {
        throw new NotAdmin();
      }

      const id: string = this.idGenerator.generate();

      const newBand = {
        id,
        name,
        musicGenre,
        responsible,
      };

      await this.bandDatabase.registerBand(newBand);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getBand(name: string, token: string) {
    try {
      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

      if (!name) {
        throw new InvalidName();
      }

      const result = await this.bandDatabase.getBand(name);

      console.log(result)
      console.log(name)
      return result;
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }
}
