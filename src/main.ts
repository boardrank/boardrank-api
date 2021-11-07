import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { ApiAuthResponse } from './auth/entities/api-auth-response';
import { ApiBadRequestErrorResponse } from 'libs/http-exceptions/api-bad-request-error-response';
import { ApiConflictErrorResponse } from 'libs/http-exceptions/api-conflict-error-response';
import { ApiDeleteGenreIdResData } from './genre/schemas/api-delete-genre-id-res-data.schema';
import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ApiForbiddenErrorResponse } from 'libs/http-exceptions/api-forbidden-error-response';
import { ApiGetGenreListResData } from './genre/schemas/api-get-genre-list-res-data.schema';
import { ApiHasReferenceErrorResponse } from 'libs/http-exceptions/api-already-registered-error-response';
import { ApiInvalidParamErrorResponse } from 'libs/http-exceptions/api-invalid-param-error-response';
import { ApiInvalidTokenErrorResponse } from 'libs/http-exceptions/api-invalid-token-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { ApiPatchGenreIdReqBody } from './genre/schemas/api-patch-genre-id-req-body.schema';
import { ApiPatchGenreIdResData } from './genre/schemas/api-patch-genre-id-res-data.schema';
import { ApiPostBoardGameScoreResData } from './board-game-score/schemas/api-post-board-game-score-res-data.schema';
import { ApiPostGenreReqBody } from './genre/schemas/api-post-genre-req-body.schema';
import { ApiPostGenreResData } from './genre/schemas/api-post-genre-res-data.schema';
import { ApiUnauthorizedErrorResponse } from 'libs/http-exceptions/api-unauthorized-error-response';
import { AppModule } from './app.module';
import { BoardGame } from './board-game/entities/board-game.entity';
import { BoardGameReply } from './board-game-reply/entities/board-game-reply.entity';
import { BoardGameScore } from './board-game-score/entities/board-game-score.entity';
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
      // Genre
      ApiPostGenreReqBody,
      ApiPostGenreResData,
      ApiGetGenreListResData,
      ApiPatchGenreIdReqBody,
      ApiPatchGenreIdResData,
      ApiDeleteGenreIdResData,
      // BoardGameScore
      ApiPostBoardGameScoreResData,
      // VO
      BoardGame,
      User,
      BoardGameScore,
      BoardGameReply,
      // Error
      ApiErrorResponse,
      ApiAuthResponse,
      ApiBadRequestErrorResponse,
      ApiInvalidTokenErrorResponse,
      ApiInvalidParamErrorResponse,
      ApiUnauthorizedErrorResponse,
      ApiForbiddenErrorResponse,
      ApiNotFoundErrorResponse,
      ApiConflictErrorResponse,
      ApiAlreadyRegisteredErrorResponse,
      ApiHasReferenceErrorResponse,
    ],
  });
  SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
