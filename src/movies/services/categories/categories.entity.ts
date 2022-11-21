import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovieDB } from '../../movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MovieDB, (movie) => movie.category)
  movie: string;

  @Column()
  category: string;
}
