import { user } from "../../../src/models/User";
import { UserRole } from "../../../src/models/User";

export const userMock: user = {
    id:" 1",
    name: "Adriane",
    email: "adriane@gmail.com",
    password: "123456",
    role: UserRole.ADMIN
}