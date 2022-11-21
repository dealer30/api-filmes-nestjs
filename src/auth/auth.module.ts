import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(configService.getJwtConfig()),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
