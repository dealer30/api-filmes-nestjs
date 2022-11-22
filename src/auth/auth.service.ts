import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import * as bcrypt from 'bcrypt';
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

  async decodeToken(token: string){
    return this.jwtService.decode(token);
  }

  async createUser(user: User) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.UserRepository.save(user);
  }

  async findUser(username: string) {
    return this.UserRepository.findOne({ where: { username: username } });
  }

  async updateUser(user: User) {
    return this.UserRepository.save(user);
  }

  async deleteUser(user: User) {
    return this.UserRepository.remove(user);
  }

  async register(user: RegisterDto): Promise<any> {
    const userExists = await this.findUser(user.username);

    if (userExists) {
      throw new UnauthorizedException('Usuário já existe!');
    } else {
      const newUser = this.UserRepository.create(user);
      await this.createUser(newUser);
      return { message: 'Usuário criado.' };
    }
  }

  async login(user: LoginDto): Promise<any> {
    const userExists = await this.findUser(user.username);

    if (!userExists) {
      throw new UnauthorizedException('Usuário não existe!');
    } else {
      const match = await bcrypt.compare(user.password, userExists.password);
      const payload = new tokenDto(userExists);
      const token = this.jwtService.sign(payload.object);

      if (match) {
        return { message: 'Login efetuado com sucesso!', token: token };
      } else {
        throw new UnauthorizedException('Senha incorreta!');
      }
    }
  }

  async me(token: string): Promise<User> {
    const payload = await this.decodeToken(token);
    const user = await this.UserRepository.findOne({ where: { id: payload['id'] } });
    delete user.password;
    return user;
  }
}
