export class SignUpDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SignInDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
