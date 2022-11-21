import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import {
  MovieSchema,
  UpdateMovieSchema,
  ValidationCreateMovie,
  ValidationUpdateMovie,
} from 'src/movies/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMovieDto } from './dto/get-movie.dto';
import { skipQuery, takeQuery, titleQuery } from './dto/search-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';
@ApiTags('Filmes')
@ApiSecurity('bearer')
@Controller('movies')
export class MoviesController {
  constructor(private serv: MovieService) {}

  @Get()
  public async getPaged(@Query() { take, skip }) {
    const get = await this.serv.getPaged(take, skip);
    return get;
  }

  @Get('id/:id')
  public async searchById(@Param('id') id: string) {
    const searchById = await this.serv.searchById(id);
    if (!searchById) return { error: 'Movie not found' };
    return new GetMovieDto(searchById);
  }

  @ApiParam(takeQuery('Filmes'))
  @ApiParam(skipQuery('Filmes'))
  @ApiParam(titleQuery('Filmes'))
  @Get('search/title')
  public async search(@Query() { take, skip, query }) {
    return await this.serv.searchByTitle(take, skip, query);
  }

  @ApiParam(takeQuery('Categoria'))
  @ApiQuery(skipQuery('Categoria'))
  @ApiQuery(titleQuery('Categoria'))
  @Get('search/category')
  public async searchByCategory(@Query() { take, skip, query }) {
    return await this.serv.searchByCategory(take, skip, query);
  }

  @ApiBody({ type: CreateMovieDto})
  @Post()
  public async create(@Body(ValidationCreateMovie) body: MovieSchema) {
    return await this.serv.createNew(body);
  }

  @ApiBody({ type: UpdateMovieDto})
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body(ValidationUpdateMovie) body: UpdateMovieSchema,
  ) {
    const movieObject = await this.serv.searchById(id);
    if (!movieObject) return { error: 'Movie not found' };

    return await this.serv.update(movieObject, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const movieObject = await this.serv.searchById(id);
    if (!movieObject) return { error: 'Movie not found' };

    return await this.serv.delete(movieObject);
  }
}
