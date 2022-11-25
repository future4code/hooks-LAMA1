import { user } from "../../../src/models/User";
import { UserRole } from "../../../src/models/User";

export const bandMock: user = {
    id: "1",
    name: "",
    email: "max@email.com",
    password: "123456",
    role: UserRole.NORMAL,
}