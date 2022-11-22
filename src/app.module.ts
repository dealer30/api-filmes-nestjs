import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { PeopleModule } from './movies/services/people/people.module';
import { PhotosModule } from './movies/services/photos/photo.module';
import { CategoriesModule } from './movies/services/categories/categories.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
