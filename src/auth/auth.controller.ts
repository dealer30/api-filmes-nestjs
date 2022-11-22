import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  HttpCode,
  Get,
  UseGuards,
  Headers,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/movies/jwt-auth.guard';
import { AuthSchema, RegisterSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Autenticação')
@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @HttpCode(202)
  async login(@Body(ValidationPipe) loginDto: AuthSchema) {
    return this.authService.login(loginDto);
  }

  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterSchema) {
    return this.authService.register(registerDto);
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Headers('Authorization') authorizationHeader: string) {
    const token = authorizationHeader.split(' ')[1];
    return await this.authService.me(token);
  }
}
