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
  