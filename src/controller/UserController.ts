import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../models/User";


export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ){}
  async signUp(request: Request, response: Response) {
    try {
      const { name, email, password, role } = request.body;

      const newUser: UserInputDTO = {
        name: name,
        email: email,
        password: password,
        role: role,
      };
      const token = await this.userBusiness.signUp(newUser);
      response.status(200).send({ access_token: token });
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const newLogin: LoginInputDTO = {
        email: email,
        password: password,
      };

      const token = await this.userBusiness.login(newLogin);
      response.status(200).send({ access_token: token });
    } catch (error) {
      response.status(400).send(error.message);
    }
  }
}
