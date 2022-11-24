import { UserDatabase } from "../database/UserDatabase";
import {
  CustomError,
  InvalidEmail,
  InvalidLogin,
  InvalidName,
  InvalidPassword,
  InvalidRole,
} from "../error/CustomError";
import { LoginInputDTO, user, UserInputDTO, UserRole } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const userDataBase = new UserDatabase();
const tokenGenerator = new TokenGenerator();
const hashManager = new HashManager();

const idGenerator = new IdGenerator();

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

      const id: string = idGenerator.generate();
      const hashPassword = await hashManager.hash(password)

      const newUser: user = {
        id,
        name,
        email,
        password: hashPassword,
        role,
      };

      await userDataBase.signUp(newUser);
      const token = tokenGenerator.generateToken({ id });
 
      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async login(LoginInputDTO: LoginInputDTO) {
    try {
      const {email, password} = LoginInputDTO

      if (!email || !email.includes("@")) {
        throw new InvalidEmail();
      }
      if (password.length < 6) {
        throw new InvalidPassword();
      }

      const idUser = await userDataBase.login(email);
      const isValidPassaword = await hashManager.compare(
        password,
        idUser.password
      )
      if(!isValidPassaword) {
        throw new InvalidLogin();
      }

        const token = tokenGenerator.generateToken({id: idUser});
        return token
     
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
