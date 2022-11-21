import { Entity, Column, OneToMany, PrimaryColumn, OneToOne } from 'typeorm';
import { PhotoDB, BannerDB } from './services/photos/photo.entity';
import { Director, Actor, Writer } from './services/people/people.entity';
import { Category } from 'src/movies/services/categories/categories.entity';

@Entity()
export class MovieDB {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  plot: string;

  @Column()
  age_group: number;

  @Column()
  duration_in_min: number;

  @Column()
  debut: Date;

  @OneToOne(() => BannerDB, (banner) => banner.movie)
  banner: BannerDB;

  @OneToMany(() => Category, (category) => category.movie)
  category: Category[];

  @OneToMany(() => PhotoDB, (photo) => photo.movie)
  photo: PhotoDB[];

  @OneToMany(() => Director, (director) => director.movie)
  director: Director[];

  @OneToMany(() => Actor, (actor) => actor.movie)
  cast: Actor[];

  @OneToMany(() => Writer, (writer) => writer.movie)
  writers: Writer[];
}
