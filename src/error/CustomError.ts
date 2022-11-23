export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidInfos extends CustomError {
  constructor() {
    super(400, "Um ou mais dados inválidos!");
  }
}

export class InvalidName extends CustomError {
  constructor() {
    super(400, "Nome inválido");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(400, "Email inválido");
  }
}
export class InvalidPassword extends CustomError {
  constructor() {
    super(400, "Senha inválida");
  }
}

export class InvalidRole extends CustomError {
  constructor() {
    super(400, "Tipo de usuário inválido, escolha entre'NORMAL' e 'ADMIN' ");
  }
}

export class InvalidDay extends CustomError {
  constructor() {
    super(400, "Dia inválido, disponível apenas SEXTA / SÁBADO / DOMINGO");
  }
}

export class InvalidStartTime extends CustomError {
  constructor() {
    super(400, "Horário inválido, digite um horário entre 08h e 23h!");
  }
}

export class InvalidEndTime extends CustomError {
  constructor() {
    super(400, "Horário inválido, digite um horário entre 08h e 23h!");
  }
}
export class InvalidTime extends CustomError {
  constructor() {
    super(400, "Horário inválido, deve ser em horário redondo!");
  }
}

export class FullSchedule extends CustomError {
  constructor() {
    super(400, "Horário já agendado, tente outro horário!");
  }
}

export class InvalidToken extends CustomError {
  constructor() {
    super(400, "Token inválido!");
  }
}

export class InvalidAuthenticatorData extends CustomError {
  constructor() {
    super(400, "Autenticador inválido!");
  }
}




