import { UserDatabase } from "../database/UserDatabase";
import {
  CustomError,
  InvalidEmail,
  InvalidName,
  InvalidPassword,
  InvalidRole,
} from "../error/CustomError";
import { user, UserInputDTO, UserRole } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const userDataBase = new UserDatabase();
const tokenGenerator = new TokenGenerator();

export class UserBusiness {
  async signUp(user: UserInputDTO) {
    try {
      const { name, email, password, role } = user;

      if (!name) {
        throw new InvalidName();
      }
      if (!email || !email.includes("@")) {
        throw new InvalidEmail();
      }
      if (password.length < 6) {
        throw new InvalidPassword();
      }

      if (role.toUpperCase() !== "ADMIN" && role.toUpperCase() !== "NORMAL" ) {
        throw new InvalidRole();
      }

      const id: string = IdGenerator();

      const newUser: user = {
        id,
        name,
        email,
        password,
        role,
      };

      await userDataBase.signUp(newUser);
      const token = tokenGenerator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
