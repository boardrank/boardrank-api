import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { AppModule } from './app.module';
import { BoardGame } from './board-game/entities/board-game.entity';
import { Genre } from './genre/entities/genre.entity';
import { NestFactory } from '@nestjs/core';
import { SwaggerTags } from 'libs/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Board Rank')
    .setDescription('Board Rank API')
    .setVersion('1.0')
    .setExternalDoc('JSON Specification', '/swagger-ui-json')
    .addBearerAuth()
    .addTag(SwaggerTags.BoardGames)
    .addTag(SwaggerTags.Genre)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [BoardGame, Genre, ApiErrorResponse],
  });
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(3000);
}
bootstrap();
