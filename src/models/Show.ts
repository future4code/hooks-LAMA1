export enum ShowDays {
  SEXTA = "SEXTA",
  SABADO = "SÁBADO",
  DOMINGO = "DOMINGO",
}

export type Show = {
  id: string;
  weekDay: ShowDays;
  startTime: number;
  endTime: number;
  bandId: string;
};

export interface ShowDTO {
  weekDay: ShowDays;
  startTime: number;
  endTime: number;
  bandId: string;
}
