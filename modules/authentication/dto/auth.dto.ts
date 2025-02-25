export class SignUpDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password: string;
  phone?: string;
  role?: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class SignInDto {
  email?: string;
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
