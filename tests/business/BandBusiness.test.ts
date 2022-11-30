import { BandBusiness } from "../../src/business/BandBusiness";
import { CustomError } from "../../src/error/CustomError";
import { BandDataBaseMock } from "./mocks/BandDatabaseMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";

const idGenerator = new IdGeneratorMock();

const bandBusiness = new BandBusiness(
  new BandDataBaseMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste 1: teste de criar banda", () => {
  const token = "token";
  test("Teste para nome vazio", async () => {
    expect.assertions(2);
    try {
      const mock = {
        name: "",
        musicGenre: "Baião",
        responsible: "Doguinho",
      };

      await bandBusiness.registerBand(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Nome inválido");
    }
  });
});

describe("Teste 2: teste para retornar banda", () => {
  const token = "token";
  test("Teste para nome vazio", async () => {
    expect.assertions(2);
    try {
      

      await bandBusiness.getBand("", token);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Nome inválido");
    }
  });
});
