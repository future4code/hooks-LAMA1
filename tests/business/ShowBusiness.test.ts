import { ShowBusiness } from "../../src/business/ShowBusiness";
import { CustomError } from "../../src/error/CustomError";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { ShowDatabaseMock } from "./mocks/ShowDatabaseMock";
import { ShowDays } from "../../src/models/Show";

const idGenerator = new IdGeneratorMock();

const showBusiness = new ShowBusiness(
  new ShowDatabaseMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Testes em criar Show", () => {
  const token = "token";

  test("Teste 1: Erro para hora de início inválida", async () => {
    expect.assertions(2);
    try {
      const mock = {
        weekDay: ShowDays.SEXTA,
        startTime: 6,
        endTime: 22,
        bandId: "2",
      };

      await showBusiness.createShow(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe(
        "Horário inválido, digite um horário entre 08h e 23h!"
      );
    }
  });

  test("Teste 2: Erro para hora de termino inválida", async () => {
    expect.assertions(2);
    try {
      const mock = {
        weekDay: ShowDays.SEXTA,
        startTime: 8,
        endTime: 24,
        bandId: "2",
      };

      await showBusiness.createShow(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe(
        "Horário inválido, digite um horário entre 08h e 23h!"
      );
    }
  });

  test("Teste 3: Erro para hora de início já agendada em outra banda", async () => {
    expect.assertions(2);
    try {
      const mock = {
        weekDay: ShowDays.SEXTA,
        startTime: 20,
        endTime: 21,
        bandId: "2",
      };

      await showBusiness.createShow(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Horário já agendado, tente outro horário!");
    }
  });
});
