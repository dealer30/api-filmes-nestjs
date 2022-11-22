import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use ValidationPipe to validate all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Creating Document for Swagger
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API Filmes')
      .setDescription(
        'API de Filmes desenvolvida para o teste técnico da MKS Sistemas.',
      )
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'Bearer Token',
      )
      .build(),
  );

  // Creating Swagger
  SwaggerModule.setup('docs', app, document);

  // Starting the server
  await app.listen(configService.getPort() || 3000);
}
bootstrap();
