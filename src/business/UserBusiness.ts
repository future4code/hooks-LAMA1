
import {
  CustomError,
  InvalidEmail,
  InvalidLogin,
  InvalidName,
  InvalidPassword,
  InvalidRole,
} from "../error/CustomError";
import { LoginInputDTO, user, UserInputDTO } from "../models/User";
import { IHashManager, IIdGenerator, ITokenGenerator } from "./Port";
import { UserRepository } from "./UserRepository";



export class UserBusiness {
  constructor(
    private userDatabase: UserRepository,
    private hashGenerator: IHashManager,
    private idGenerator:IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ){}
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

      const id: string = this.idGenerator.generate();
      const hashPassword = await this.hashGenerator.hash(password)

      const newUser: user = {
        id,
        name,
        email,
        password: hashPassword,
        role,
      };

      await this.userDatabase.signUp(newUser);
      const token = this.tokenGenerator.generateToken({ id });
 
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

      const idUser = await this.userDatabase.findByEmail(email);
      const isValidPassaword = await this.hashGenerator.compare(
        password,
        idUser.password
      )
      if(!isValidPassaword) {
        throw new InvalidLogin();
      }

        const token = this.tokenGenerator.generateToken({id: idUser.id});
        return token
     
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
