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
  test("Teste 1: Erro para hora de início inválida", async () => {
    expect.assertions(2);
    try {
      const mock = {
        weekDay: ShowDays.SEXTA,
        startTime: 6,
        endTime: 22,
        bandId: "2",
      };

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6eyJpZCI6ImNjOTFlMTY4LWFkYTctNGY3Mi04NjcxLWQxM2I5MTQ3MzM5ZiIsIm5hbWUiOiJqb3JnZVRlc3RlIiwiZW1haWwiOiJqb3JnZVRlc3RlQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkcjlqbW1RLi5UT0t4TjV5em1sL0ZxT2pwN2lvODFJUGV5dXVkOXhpc2h3UXRReTdvZUhqRnkiLCJyb2xlIjoiQURNSU4ifX0sImlhdCI6MTY2OTI0MjkzMiwiZXhwIjoxNjY5MjQ2NTMyfQ.dJqwDY9M8e0_rAGBbLkwQ4KhXrHDAEHyfCMnTGcad4w";

      await showBusiness.createShow(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Horário inválido, digite um horário entre 08h e 23h!");
    }
  });

  test("Teste 2: Erro para hora de início já agendada em outra banda", async () => {
    expect.assertions(2);
    try {
      const mock = {
        weekDay: ShowDays.SEXTA,
        startTime: 20,
        endTime: 21,
        bandId: "2",
      };

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6eyJpZCI6ImNjOTFlMTY4LWFkYTctNGY3Mi04NjcxLWQxM2I5MTQ3MzM5ZiIsIm5hbWUiOiJqb3JnZVRlc3RlIiwiZW1haWwiOiJqb3JnZVRlc3RlQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkcjlqbW1RLi5UT0t4TjV5em1sL0ZxT2pwN2lvODFJUGV5dXVkOXhpc2h3UXRReTdvZUhqRnkiLCJyb2xlIjoiQURNSU4ifX0sImlhdCI6MTY2OTI0OTkwNCwiZXhwIjoxNjY5MjUzNTA0fQ.6WVGqo8updBzPR4Q_ZDBn18a7Zq7FESpIjlqfZ9mCrY";

      await showBusiness.createShow(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Horário já agendado, tente outro horário!");
    }
  });
});
