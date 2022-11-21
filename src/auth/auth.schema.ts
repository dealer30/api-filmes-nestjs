import { IsString } from 'class-validator';

export class AuthSchema {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterSchema {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
