import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { ApiAuthResponse } from 'src/auth/entities/api-auth-response';
import { ApiBadRequestErrorResponse } from 'libs/http-exceptions/api-bad-request-error-response';
import { ApiConflictErrorResponse } from 'libs/http-exceptions/api-conflict-error-response';
import { ApiDeleteGenreIdResData } from 'src/genre/schemas/api-delete-genre-id-res-data.schema';
import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ApiForbiddenErrorResponse } from 'libs/http-exceptions/api-forbidden-error-response';
import { ApiGetGenreListResData } from 'src/genre/schemas/api-get-genre-list-res-data.schema';
import { ApiHasReferenceErrorResponse } from 'libs/http-exceptions/api-already-registered-error-response';
import { ApiInvalidParamErrorResponse } from 'libs/http-exceptions/api-invalid-param-error-response';
import { ApiInvalidTokenErrorResponse } from 'libs/http-exceptions/api-invalid-token-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { ApiPatchGenreIdResData } from 'src/genre/schemas/api-patch-genre-id-res-data.schema';
import { ApiPostAuthRefreshResData } from 'src/auth/schemas/api-post-auth-refresh-res-data.schema';
import { ApiPostAuthSignInResData } from 'src/auth/schemas/api-post-auth-sign-in-res-data.schema';
import { ApiPostAuthSignUpResData } from 'src/auth/schemas/api-post-auth-sign-up-res-data.schema';
import { ApiPostBoardGameScoreResData } from 'src/board-game-score/schemas/api-post-board-game-score-res-data.schema';
import { ApiPostGenreResData } from 'src/genre/schemas/api-post-genre-res-data.schema';
import { ApiUnauthorizedErrorResponse } from 'libs/http-exceptions/api-unauthorized-error-response';
import { BoardGame } from 'src/board-game/entities/board-game.entity';
import { BoardGameReply } from 'src/board-game-reply/entities/board-game-reply.entity';
import { BoardGameScore } from 'src/board-game-score/vo/board-game-score.vo';
import { User } from 'src/user/entities/user.entity';

export default [
  // Auth
  ApiPostAuthSignUpResData,
  ApiPostAuthSignInResData,
  ApiPostAuthRefreshResData,
  // BoardGameScore
  ApiPostBoardGameScoreResData,
  // Genre
  ApiPostGenreResData,
  ApiGetGenreListResData,
  ApiPatchGenreIdResData,
  ApiDeleteGenreIdResData,
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
];
