import { BandRepository } from "../business/BandRepository";
import { Band } from "../models/Bands";
import BaseDatabase from "./BaseDatabase";

// Método para registrar banda
export class BandDatabase extends BaseDatabase implements BandRepository {
  public async registerBand(band: Band) {
    await BaseDatabase.connection("Lama_bands").insert({
      id: band.id,
      name: band.name,
      music_genre: band.musicGenre,
      responsible: band.responsible,
    });
  }

  // Método para checar se já existe uma banda com o nome sendo registrado
  public async checkDuplicateBands() {
    const result = await BaseDatabase.connection("Lama_bands").select();
    return result;
  }

  // Método para checar se o usuário tentando tentando registrar uma banda é ADMIN
  public async checkUserRole(responsible: string) {
    const result = await BaseDatabase.connection("Lama_users")
      .select()
      .where({ name: responsible });
    return result[0];
  }

  // Método para retornar a banda escolhida
  public async getBand(name: string) {
    const result = await BaseDatabase.connection("Lama_bands")
      .select("name", "music_genre", "responsible")
      .where({ name });
    return result[0];
  }
}
