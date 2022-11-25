import { UserRepository } from "../business/UserRepository";
import {user} from "../models/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
  public async signUp(user: user) {
    await BaseDatabase.connection("Lama_users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }

  public async findByEmail(email: string) {
    const result = await BaseDatabase.connection("Lama_users")
    .select() 
    .where({email});
    return result[0]
  }
}
