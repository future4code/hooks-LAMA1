import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { UserRole } from "../../src/models/User";
import { HashGeneratorMock } from "./mocks/HasGeneratorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMocks";

const idGenerator = new IdGeneratorMock();

const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new HashGeneratorMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste de criar usuário", () => {
  test("Teste 1 : testando se o nome é valido", async () => {
    expect.assertions(2);
    try {
      const mock = {
        name: "",
        email: "fulano@gmail",
        password: "123456",
        role: UserRole.ADMIN,
      };
      await userBusiness.signUp(mock);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Nome inválido");
    }
  });

  test("Teste 2 : testando o tamanho da senha", async () => {
    expect.assertions(2);
    try {
      const mock = {
        name: "Adriane",
        email: "fulano@gmail",
        password: "12345",
        role: UserRole.ADMIN,
      };
      await userBusiness.signUp(mock);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Senha inválida");
    }
  });
});


  
