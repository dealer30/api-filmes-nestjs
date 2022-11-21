import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovieDB } from '../movies/movie.entity';

@Entity()
export class PhotoDB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MovieDB, (movie) => movie.photo)
  movie: string;

  @Column()
  photoUrl: string;
}

@Entity()
export class BannerDB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MovieDB, (movie) => movie.banner)
  movie: string;

  @Column()
  photoUrl: string;
}
