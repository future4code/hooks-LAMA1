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
}
