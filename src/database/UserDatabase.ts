import { user } from "../models/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async signUp(user: user) {
    await BaseDatabase.connection("Lama_users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}