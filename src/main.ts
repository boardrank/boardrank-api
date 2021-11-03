import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiAuthResponse } from './auth/entities/api-auth-response';
import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { AppModule } from './app.module';
import { BoardGame } from './board-game/entities/board-game.entity';
import { BoardGameReply } from './board-game-reply/entities/board-game-reply.entity';
import { BoardGameScore } from './board-game-score/entities/board-game-score.entity';
import { Genre } from './genre/entities/genre.entity';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { SwaggerTag } from 'libs/constants';
import { User } from './user/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const documentBuilder = new DocumentBuilder()
    .setTitle('Board Rank')
    .setDescription('Board Rank API')
    .setVersion('1.0')
    .setExternalDoc('JSON Specification', '/swagger-ui-json')
    .addBearerAuth();

  Object.values(SwaggerTag).forEach((value) => documentBuilder.addTag(value));

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      BoardGame,
      Genre,
      User,
      BoardGameScore,
      BoardGameReply,
      ApiErrorResponse,
      ApiAuthResponse,
    ],
  });
  SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
