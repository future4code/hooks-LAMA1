import * as jwt from "jsonwebtoken";
import { ITokenGenerator } from "../business/Port";
import { AuthenticationData } from "../models/User";

export class TokenGenerator implements ITokenGenerator {
  public generateToken = (id: AuthenticationData) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY as string, {
      expiresIn: "1h",
    });

    return token;
  };

  public getData = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return payload.id
  };
}