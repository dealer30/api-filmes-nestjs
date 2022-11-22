import { ApiProperty } from '@nestjs/swagger';
import { User } from '../auth.entity';

export class LoginDto {
  @ApiProperty({ example: 'lucasreis', description: 'Nome de usuário' })
  username: string;
  @ApiProperty({ example: 'lucasreis', description: 'Senha do usuário' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Lucas Reis', description: 'Nome identificador do usuário' })
  name: string;
  @ApiProperty({ example: 'lucasreis', description: 'Nome de usuário' })
  username: string;
  @ApiProperty({ example: 'lucasreis', description: 'Senha do usuário' })
  password: string;
}

export class tokenDto {
  id: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }

  get object(){
    return {
      id: this.id,
      name: this.name
    }
  }
}
