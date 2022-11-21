import { MovieDB } from '../movie.entity';

export class UpdateMovieDto {
  title?: string;
  plot?: string;
  age_group?: number;
  duration_in_min?: number;
  debut?: Date;

  constructor(movie: MovieDB, updateBody: UpdateMovieDto) {
    this.title = updateBody.title || movie.title;
    this.plot = updateBody.plot || movie.plot;
    this.age_group = updateBody.age_group || movie.age_group;
    this.duration_in_min = updateBody.duration_in_min || movie.duration_in_min;
    this.debut = updateBody.debut || movie.debut;
  }
}
