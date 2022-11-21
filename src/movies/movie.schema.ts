import { ValidationPipe } from '@nestjs/common';
import {
  IsString,
  IsDateString,
  IsInt,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';
export class ValidationCreateMovie extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }
}

export class MovieSchema {
  @IsString()
  title: string;

  @IsString()
  plot: string;

  @IsInt()
  age_group: number;

  @IsInt()
  duration_in_min: number;

  @IsDateString()
  debut: Date;

  @IsArray()
  category: string[];

  @IsObject()
  photos: {
    banner: string;
    others: string[];
  };

  @IsArray()
  director: string[];

  @IsArray()
  cast: string[];

  @IsArray()
  writers: string[];
}

export class ValidationUpdateMovie extends ValidationCreateMovie {}

export class UpdateMovieSchema {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  plot?: string;

  @IsOptional()
  @IsInt()
  age_group?: number;

  @IsOptional()
  @IsInt()
  duration_in_min?: number;

  @IsOptional()
  @IsDateString()
  debut?: Date;
}
