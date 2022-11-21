import { MovieDB } from '../movie.entity';

export class GetMovieDto {
  id: string;
  title: string;
  plot: string;
  age_group: number;
  duration_in_min: number;
  debut: Date;
  banner: string;
  category: string[];
  photos: string[];
  director: string[];
  cast: string[];
  writers: string[];

  constructor(movie: MovieDB) {
    this.id = movie.id;
    this.title = movie.title;
    this.plot = movie.plot;
    this.age_group = movie.age_group;
    this.duration_in_min = movie.duration_in_min;
    this.debut = movie.debut;
    this.banner = movie.banner.photoUrl;
    this.category = [...movie.category.map((category) => category.category)];
    this.photos = [...movie.photo.map((photo) => photo.photoUrl)];
    this.director = movie.director.map((director) => director.name);
    this.cast = movie.cast.map((actor) => actor.name);
    this.writers = movie.writers.map((writer) => writer.name);
  }
}
