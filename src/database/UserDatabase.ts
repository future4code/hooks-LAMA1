import { LoginInputDTO, user } from "../models/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async signUp(user: user) {
    await BaseDatabase.connection("Lama_users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }

  public async login(email: string) {
    const result = await BaseDatabase.connection("Lama_users")
    .select() 
    .where({email});
    return result[0]
  }
}
