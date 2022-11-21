import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API Filmes')
      .setDescription(
        'API de Filmes desenvolvida para o teste técnico da MKS Sistemas.',
      )
      .build(),
  );

  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.getPort());
}
bootstrap();
