import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, tokenDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: User) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.UserRepository.save(user);
  }

  async findUser(username: string) {
    return this.UserRepository.findOne({ where: { username: username } });
  }

  async updateUser(user: User) {
    return this.UserRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    return this.UserRepository.delete(id);
  }

  async register(user: RegisterDto) {
    const userExists = await this.findUser(user.username);

    if (userExists) {
      return { error: 'Usuário já existe!' };
    } else {
      const newUser = this.UserRepository.create(user);
      await this.createUser(newUser);
      return { message: 'Usuário criado.' };
    }
  }

  async login(user: LoginDto) {
    const userExists = await this.findUser(user.username);

    if (!userExists) {
      return { error: 'Usuário não existe!' };
    } else {
      const match = await bcrypt.compare(user.password, userExists.password);
      const token = this.jwtService.sign(new tokenDto(userExists));

      if (match) {
        return { message: 'Login efetuado com sucesso!', token: token };
      } else {
        return { error: 'Senha incorreta!' };
      }
    }
  }
}
