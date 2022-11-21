import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieDB } from './movie.entity';
import { PagerMiddleware } from 'src/middlewares/pager/pager.middleware';
import { PhotoService } from 'src/photos/photo.service';
import { PeopleService } from 'src/people/people.service';
import { BannerDB, PhotoDB } from 'src/photos/photo.entity';
import { Actor, Director, Writer } from 'src/people/people.entity';
import { Category } from 'src/categories/categories.entity';
import { CategoryService } from 'src/categories/categories.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieDB,
      PhotoDB,
      BannerDB,
      Actor,
      Writer,
      Director,
      Category,
    ]),
  ],
  controllers: [MoviesController],
  providers: [MovieService, PhotoService, PeopleService, CategoryService],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ path: 'movies/paged', method: RequestMethod.GET });
  }
}
