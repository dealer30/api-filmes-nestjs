import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovieDB } from '../../movie.entity';

@Entity()
class PeopleBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

@Entity()
export class Actor extends PeopleBaseEntity {
  @ManyToOne(() => MovieDB, (movie) => movie.cast)
  movie: string;
}

@Entity()
export class Writer extends PeopleBaseEntity {
  @ManyToOne(() => MovieDB, (movie) => movie.writers)
  movie: string;
}

@Entity()
export class Director extends PeopleBaseEntity {
  @ManyToOne(() => MovieDB, (movie) => movie.director)
  movie: string;
}
