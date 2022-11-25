import { userInfo } from "os";
import { UserRepository } from "../../../src/business/UserRepository";
import { user, UserInputDTO } from "../../../src/models/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock implements UserRepository{

    public async signUp(user: UserInputDTO): Promise<any>{}
  
    public async findByEmail(email: string): Promise<user>{
        return email === "email" ? userMock : undefined
    }

}