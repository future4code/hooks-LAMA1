import { Band } from "../models/Bands";
import BaseDatabase from "./BaseDatabase";

export class bandDatabase extends BaseDatabase {
  public async registerBand(band: Band) {
    await BaseDatabase.connection("Lama_bands").insert({
      id: band.id,
      name: band.name,
      music_genre: band.musicGenre,
      responsible: band.responsible,
    });
  }

  public async checkDuplicateBands() {
    const result = await BaseDatabase.connection("Lama_bands")
      .select()
      return result
  }

  public async checkUserRole(responsible: string) {
    const result = await BaseDatabase.connection("Lama_users")
      .select()
      .where({name: responsible})
      return result[0]
  }
}
