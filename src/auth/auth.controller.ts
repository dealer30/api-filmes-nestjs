import { Body, Controller, Post, ValidationPipe, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthSchema, RegisterSchema } from './auth.schema';
import { AuthService } from './auth.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(202)
    async login(@Body(ValidationPipe) loginDto: AuthSchema) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterSchema) {
        return this.authService.register(registerDto);
    }
}
