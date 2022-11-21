import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { PeopleModule } from './people/people.module';
import { PhotosModule } from './photos/photo.module';
import { CategoriesModule } from './categories/categories.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(configService.getCacheConfig()),
    MoviesModule,
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PeopleModule,
    PhotosModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
