type Photos = {
  banner: string;
  others: string[];
};

export class CreateMovieDto {
  title: string;
  plot: string;
  age_group: number;
  duration_in_min: number;
  debut: Date;
  photos: Photos;
  category: string[];
  director: string[];
  cast: string[];
  writers: string[];
}
