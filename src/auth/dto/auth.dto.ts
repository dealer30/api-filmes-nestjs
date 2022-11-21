import { User } from '../auth.entity';

export class LoginDto {
  username: string;
  password: string;
}

export class RegisterDto {
  name: string;
  username: string;
  password: string;
}

export class tokenDto {
  id: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
