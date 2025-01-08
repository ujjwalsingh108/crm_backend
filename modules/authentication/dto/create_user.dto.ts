export class CreateUserDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password: string | Buffer<ArrayBufferLike>;
  phone?: string;
  role?: string;

  constructor(password: string | Buffer<ArrayBufferLike>) {
    this.password = password;
  }
}