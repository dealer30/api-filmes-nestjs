import { ValidationPipe } from '@nestjs/common';
import { IsString } from 'class-validator';

export class AuthSchema {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class ValidationAuth extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }
}

export class RegisterSchema {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class ValidationRegister extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }
}
