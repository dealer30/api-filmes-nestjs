import { ApiProperty } from "@nestjs/swagger";

type Photos = {
  banner: string;
  others: string[];
};

export class CreateMovieDto {
  @ApiProperty({
    example: 'O Senhor dos Anéis: A Sociedade do Anel',
    description: 'O título do filme.'
  })
  title: string;
  @ApiProperty({
    example: 'Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.',
    description: 'A sinopse do filme.'
  })
  plot: string;
  @ApiProperty({
    example: 12,
    description: 'A classificação indicativa do filme.'
  })
  age_group: number;
  @ApiProperty({
    example: 178,
    description: 'A duração do filme em minutos.'
  })
  duration_in_min: number;
  @ApiProperty({
    example: '2002-01-01T00:00:00+0000',
    description: 'A data de estreia do filme em ISO8601.',
    format: 'date-time'
  })
  debut: Date;
  @ApiProperty({
    example: { banner: 'https://...', others: ['https://...', 'https://...'] },
    description: 'As fotos do filme.'
  })
  photos: Photos;
  @ApiProperty({
    example: ['Aventura', 'Fantasia'],
    description: 'As categorias do filme.'
  })
  category: string[];
  @ApiProperty({
    example: ['Peter Jackson'],
    description: 'Os diretores do filme.'
  })
  director: string[];
  @ApiProperty({
    example: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler'],
    description: 'O elenco do filme.'
  })
  cast: string[];
  @ApiProperty({
    example: ['J.R.R. Tolkien', 'Peter Jackson'],
    description: 'Os roteiristas do filme.'
  })
  writers: string[];
}
