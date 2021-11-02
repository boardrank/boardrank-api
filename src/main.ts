import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiAuthResponse } from './auth/entities/api-auth-response';
import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { AppModule } from './app.module';
import { BoardGame } from './board-game/entities/board-game.entity';
import { Genre } from './genre/entities/genre.entity';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { SwaggerTag } from 'libs/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Board Rank')
    .setDescription('Board Rank API')
    .setVersion('1.0')
    .setExternalDoc('JSON Specification', '/swagger-ui-json')
    .addBearerAuth()
    .addTag(SwaggerTag.Authentication)
    .addTag(SwaggerTag.BoardGames)
    .addTag(SwaggerTag.Genre)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [BoardGame, Genre, ApiErrorResponse, ApiAuthResponse],
  });
  SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
