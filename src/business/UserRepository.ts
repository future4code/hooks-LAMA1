import { user, UserInputDTO } from "../models/User"

export interface UserRepository {
  signUp(user: UserInputDTO): Promise<any>;

  findByEmail(email: string): Promise<user | undefined>;
}