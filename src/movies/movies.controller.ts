import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiSecurity,
  ApiHeaders,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
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
import { JwtAuthGuard } from './jwt-auth.guard';
import { MovieService } from './movie.service';
@ApiTags('Filmes')
@ApiBearerAuth('Bearer Token')
@Controller('movies')
export class MoviesController {
  constructor(private serv: MovieService) {}

  // Route GET /movies
  // Route used to get movies with pagination
  @ApiParam(takeQuery('Filmes'))
  @ApiParam(skipQuery('Filmes'))
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getPaged(@Query() { take, skip }) {
    const get = await this.serv.getPaged(take, skip);
    return get;
  }

  // Route GET /movies/id/:id
  // Route used to get a movie by id
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  public async searchById(@Param('id') id: string) {
    const searchById = await this.serv.searchById(id);
    if (!searchById) return { error: 'Movie not found' };
    return new GetMovieDto(searchById);
  }

  // Routes that search for movies by title/category
  // Route GET /movies/search/tile
  @ApiParam(takeQuery('Filmes'))
  @ApiParam(skipQuery('Filmes'))
  @ApiParam(titleQuery('Filmes'))
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('search/title')
  public async search(@Query() { take, skip, query }) {
    return await this.serv.searchByTitle(take, skip, query);
  }

  // Route GET /movies/search/title
  @ApiParam(takeQuery('Categoria'))
  @ApiQuery(skipQuery('Categoria'))
  @ApiQuery(titleQuery('Categoria'))
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('search/category')
  public async searchByCategory(@Query() { take, skip, query }) {
    return await this.serv.searchByCategory(take, skip, query);
  }

  // Route POST /movies
  // Route used to create new movie.
  @ApiBody({ type: CreateMovieDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body(ValidationCreateMovie) body: MovieSchema) {
    return await this.serv.createNew(body);
  }

  // Route PUT /movies/:id
  // Route used to update a movie.
  @ApiBody({ type: UpdateMovieDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body(ValidationUpdateMovie) body: UpdateMovieSchema,
  ) {
    const movieObject = await this.serv.searchById(id);
    if (!movieObject) return { error: 'Movie not found' };

    return await this.serv.update(movieObject, body);
  }

  // Route DELETE /movies/:id
  // Route used to delete a movie.
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const movieObject = await this.serv.searchById(id);
    if (!movieObject) return { error: 'Movie not found' };

    return await this.serv.delete(movieObject);
  }
}
