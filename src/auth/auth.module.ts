import { CacheInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { CacheModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(configService.getCacheConfig()),
    TypeOrmModule.forFeature([User]),
    JwtModule.register(configService.getJwtConfig()),
  ],
  providers: [AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
  }],
  controllers: [AuthController],
})
export class AuthModule {}
