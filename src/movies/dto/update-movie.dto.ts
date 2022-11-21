import { ApiProperty } from '@nestjs/swagger';
import { MovieDB } from '../movie.entity';

export class UpdateMovieDto {
  @ApiProperty({
    example: 'O Senhor dos Anéis: A Sociedade do Anel',
    description: 'O título do filme.',
  })
  title?: string;
  @ApiProperty({
    example: 'Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.',
    description: 'A sinopse do filme.',
  })
  plot?: string;
  @ApiProperty({
    example: 12,
    description: 'A classificação indicativa do filme.',
  })
  age_group?: number;
  @ApiProperty({
    example: 178,
    description: 'A duração do filme em minutos.',
  })
  duration_in_min?: number;
  @ApiProperty({
    example: '2002-01-01T00:00:00+0000',
    description: 'A data de estreia do filme em ISO8601.',
    format: 'date-time',
  })
  debut?: Date;

  constructor(movie: MovieDB, updateBody: UpdateMovieDto) {
    this.title = updateBody.title || movie.title;
    this.plot = updateBody.plot || movie.plot;
    this.age_group = updateBody.age_group || movie.age_group;
    this.duration_in_min = updateBody.duration_in_min || movie.duration_in_min;
    this.debut = updateBody.debut || movie.debut;
  }
}
