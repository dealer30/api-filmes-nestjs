import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDB } from 'src/movies/movie.entity';
import { ILike, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { PeopleService } from 'src/movies/services/people/people.service';
import { PhotoService } from 'src/movies/services/photos/photo.service';
import { CategoryService } from 'src/movies/services/categories/categories.service';
import { Actor, Director, Writer } from 'src/movies/services/people/people.entity';
import { GetMovieDto } from './dto/get-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieDB)
    private readonly movies_repo: Repository<MovieDB>,
    private readonly people_service: PeopleService,
    private readonly photo_service: PhotoService,
    private readonly category_service: CategoryService,
  ) {}

  public async getPaged(take = 10, skip = 0): Promise<GetMovieDto[]> {
    const movies = await this.movies_repo.find({
      relations: ['cast', 'director', 'writers', 'photo', 'banner', 'category'],
      take,
      skip,
    });

    const result = [];

    movies.map((movie) => {
      result.push(new GetMovieDto(movie));
    });

    return result;
  }

  public async searchByTitle(
    take = 10,
    skip = 0,
    query: string,
  ): Promise<GetMovieDto[]> {
    const movies = await this.movies_repo.find({
      relations: ['cast', 'director', 'writers', 'photo', 'banner', 'category'],
      where: {
        title: ILike(`%${query}%`),
      },
      take,
      skip,
    });

    const result = [];

    movies.map((movie) => {
      result.push(new GetMovieDto(movie));
    });

    return result;
  }

  public async searchById(id: string): Promise<MovieDB> {
    const search = await this.movies_repo.findOne({
      relations: ['cast', 'director', 'writers', 'photo', 'banner', 'category'],
      where: {
        id: id,
      },
    });

    return search;
  }

  public async searchByCategory(
    take = 10,
    skip = 0,
    category: string,
  ): Promise<GetMovieDto[]> {
    const movies = await this.movies_repo.find({
      relations: ['cast', 'director', 'writers', 'photo', 'banner', 'category'],
      where: {
        category: {
          category: ILike(`%${category}%`),
        },
      },
      take,
      skip,
    });
    const result = [];

    movies.map((movie) => {
      result.push(new GetMovieDto(movie));
    });

    return result;
  }

  public async createNew(movie: CreateMovieDto): Promise<GetMovieDto> {
    const movieId = v4();
    const actors = movie.cast;
    const directors = movie.director;
    const writers = movie.writers;
    const categories = movie.category;
    const banner = movie.photos.banner;
    const photos = movie.photos.others;

    // create actors
    const actorsDB = await this.people_service.createPeople(
      actors,
      movieId,
      Actor,
    );
    // create directors
    const directorsDB = await this.people_service.createPeople(
      directors,
      movieId,
      Director,
    );
    // create writers
    const writersDB = await this.people_service.createPeople(
      writers,
      movieId,
      Writer,
    );

    // create banner
    const bannerDB = await this.photo_service.createBanner(banner, movieId);

    // create photos
    const photosDB = await this.photo_service.createPhotos(photos, movieId);

    // create category
    const categoriesDB = await this.category_service.createCategories(
      categories,
      movieId,
    );

    // create new movie
    const newMovie = new MovieDB();
    newMovie.id = movieId;
    newMovie.title = movie.title;
    newMovie.plot = movie.plot;
    newMovie.age_group = movie.age_group;
    newMovie.duration_in_min = movie.duration_in_min;
    newMovie.debut = movie.debut;
    newMovie.cast = actorsDB;
    newMovie.director = directorsDB;
    newMovie.writers = writersDB;
    newMovie.photo = photosDB;
    newMovie.banner = bannerDB;
    newMovie.category = categoriesDB;

    await this.movies_repo.save(newMovie);
    await this.people_service.savePeople(actorsDB, Actor);
    await this.people_service.savePeople(directorsDB, Director);
    await this.people_service.savePeople(writersDB, Writer);
    await this.photo_service.savePhotos(photosDB);
    await this.photo_service.savePhotos(bannerDB);
    await this.category_service.saveCategories(categoriesDB);

    return new GetMovieDto(newMovie);
  }

  public async update(
    movie: MovieDB,
    updateBody: UpdateMovieDto,
  ): Promise<GetMovieDto> {
    for (const [key, value] of Object.entries(updateBody)) {
      movie[key] = value;
    }

    const savedMovie = await this.movies_repo.save(movie);

    return new GetMovieDto(savedMovie);
  }

  public async delete(movie: MovieDB): Promise<MovieDB> {
    await this.people_service.deletePeople(movie.cast, Actor);
    await this.people_service.deletePeople(movie.director, Director);
    await this.people_service.deletePeople(movie.writers, Writer);

    await this.photo_service.deletePhotos(movie.photo);
    await this.photo_service.deletePhotos(movie.banner);

    return this.movies_repo.remove(movie);
  }
}
