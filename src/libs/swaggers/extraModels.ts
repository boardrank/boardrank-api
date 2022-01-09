import { ApiAlreadyRegisteredErrorResponse } from 'src/libs/http-exceptions/api-has-reference-error-response';
import { ApiAuthResponse } from 'src/auth/entities/api-auth-response';
import { ApiBadRequestErrorResponse } from 'src/libs/http-exceptions/api-bad-request-error-response';
import { ApiBlockStatusErrorResponse } from 'src/libs/http-exceptions/api-block-status-error-response';
import { ApiConflictErrorResponse } from 'src/libs/http-exceptions/api-conflict-error-response';
import { ApiDeleteAdminBoardGameIdResData } from 'src/admin-board-game/schemas/api-delete-admin-board-game-id-res-data.schema';
import { ApiDeleteAdminGenreIdResData } from 'src/admin-board-game/schemas/api-delete-admin-genre-id-res-data.schema';
import { ApiDeleteAdminUserIdResData } from 'src/admin-user/schemas/api-delete-admin-user-id-res-data.schema';
import { ApiDeleteBoardGameReplyIdResData } from 'src/board-game-reply/vo/api-delete-board-game-reply-id-res-data.schema';
import { ApiDormantStatusErrorResponse } from 'src/libs/http-exceptions/api-dormant-status-error-response';
import { ApiErrorResponse } from 'src/libs/http-exceptions/api-error-response';
import { ApiForbiddenErrorResponse } from 'src/libs/http-exceptions/api-forbidden-error-response';
import { ApiGetAdminBoardGameIdResData } from 'src/admin-board-game/schemas/api-get-admin-board-game-id-res-data.schema';
import { ApiGetAdminBoardGameListResData } from 'src/admin-board-game/schemas/api-get-admin-board-game-list-res-data.schema';
import { ApiGetAdminGenreListResData } from 'src/admin-genre/schemas/api-get-admin-genre-list-res-data.schema';
import { ApiGetAdminUserListResData } from 'src/admin-user/schemas/api-get-admin-user-list-res-data.schema';
import { ApiGetBoardGameIdResData } from 'src/board-game/schemas/api-get-board-game-id-res-data.schema';
import { ApiGetBoardGameListGenreIdResData } from 'src/board-game/schemas/api-get-board-game-list-genre-id-res-data.schema';
import { ApiGetBoardGameListResData } from 'src/board-game/schemas/api-get-board-game-list-res-data.schema';
import { ApiGetGenreListResData } from 'src/genre/schemas/api-get-genre-list-res-data.schema';
import { ApiGetUserIdResData } from 'src/user/schemas/api-get-user-id-res-data.schema';
import { ApiGetUserResData } from 'src/user/schemas/api-get-user-res-data.schema';
import { ApiHasReferenceErrorResponse } from 'src/libs/http-exceptions/api-already-registered-error-response';
import { ApiInvalidParamErrorResponse } from 'src/libs/http-exceptions/api-invalid-param-error-response';
import { ApiInvalidTokenErrorResponse } from 'src/libs/http-exceptions/api-invalid-token-error-response';
import { ApiNoPermissionErrorResponse } from 'src/libs/http-exceptions/api-no-permission-error-response';
import { ApiNotFoundErrorResponse } from 'src/libs/http-exceptions/api-not-found-error-response';
import { ApiPatchAdminBoardGameIdReqBody } from 'src/admin-board-game/schemas/api-patch-admin-board-game-id-req-body.schema';
import { ApiPatchAdminBoardGameIdResData } from 'src/admin-board-game/schemas/api-patch-admin-board-game-id-res-data.schema';
import { ApiPatchAdminGenreIdResData } from 'src/admin-genre/schemas/api-patch-admin-genre-id-res-data.schema';
import { ApiPatchAdminGenreRearrangeIdResData } from 'src/admin-genre/schemas/api-patch-admin-genre-rearrange-id-res-data.schema';
import { ApiPatchAdminUserIdResData } from 'src/admin-user/schemas/api-patch-admin-user-id-res-data.schema';
import { ApiPatchBoardGameReplyResData } from 'src/board-game-reply/vo/api-patch-board-game-reply-id-res-data.schema';
import { ApiPatchUserResData } from 'src/user/schemas/api-patch-user-res-data.schema';
import { ApiPostAdminBoardGameReqBody } from 'src/admin-board-game/schemas/api-post-admin-board-game-req-body.schema';
import { ApiPostAdminBoardGameResData } from 'src/admin-board-game/schemas/api-post-admin-board-game-res-data.schema';
import { ApiPostAdminGenreResData } from 'src/admin-genre/schemas/api-post-admin-genre-res-data.schema';
import { ApiPostAuthRefreshResData } from 'src/auth/schemas/api-post-auth-refresh-res-data.schema';
import { ApiPostAuthSignInResData } from 'src/auth/schemas/api-post-auth-sign-in-res-data.schema';
import { ApiPostAuthSignUpResData } from 'src/auth/schemas/api-post-auth-sign-up-res-data.schema';
import { ApiPostBoardGameReplyResData } from 'src/board-game-reply/vo/api-post-board-game-reply-res-data.schema';
import { ApiPostBoardGameScoreResData } from 'src/board-game-score/schemas/api-post-board-game-score-res-data.schema';
import { ApiUnauthorizedErrorResponse } from 'src/libs/http-exceptions/api-unauthorized-error-response';
import { ApiPatchUserReqBody } from 'src/user/schemas/api-patch-user-req-body.schema';
import { ApiExpiredTokenErrorResponse } from '../http-exceptions/api-expired-token-error-response';

export default [
  // Auth
  ApiPostAuthSignUpResData,
  ApiPostAuthSignInResData,
  ApiPostAuthRefreshResData,
  // BoardGame
  ApiGetBoardGameListResData,
  ApiGetBoardGameListGenreIdResData,
  ApiGetBoardGameIdResData,
  // BoardGameReply
  ApiPostBoardGameReplyResData,
  ApiPatchBoardGameReplyResData,
  ApiDeleteBoardGameReplyIdResData,
  // BoardGameScore
  ApiPostBoardGameScoreResData,
  // Genre
  ApiGetGenreListResData,
  // User
  ApiGetUserResData,
  ApiPatchUserReqBody,
  ApiPatchUserResData,
  ApiPatchUserReqBody,
  ApiGetUserIdResData,
  // AdminUser
  ApiGetAdminUserListResData,
  ApiPatchAdminUserIdResData,
  ApiDeleteAdminUserIdResData,
  // AdminBoardGame
  ApiPostAdminBoardGameReqBody,
  ApiPostAdminBoardGameResData,
  ApiGetAdminBoardGameListResData,
  ApiGetAdminBoardGameIdResData,
  ApiPatchAdminBoardGameIdReqBody,
  ApiPatchAdminBoardGameIdResData,
  ApiDeleteAdminBoardGameIdResData,
  // AdminGenre
  ApiPostAdminGenreResData,
  ApiGetAdminGenreListResData,
  ApiPatchAdminGenreIdResData,
  ApiDeleteAdminGenreIdResData,
  ApiPatchAdminGenreRearrangeIdResData,
  // Error
  ApiErrorResponse,
  ApiAuthResponse,
  ApiBadRequestErrorResponse,
  ApiInvalidTokenErrorResponse,
  ApiInvalidParamErrorResponse,
  ApiUnauthorizedErrorResponse,
  ApiExpiredTokenErrorResponse,
  ApiForbiddenErrorResponse,
  ApiNoPermissionErrorResponse,
  ApiBlockStatusErrorResponse,
  ApiDormantStatusErrorResponse,
  ApiNotFoundErrorResponse,
  ApiConflictErrorResponse,
  ApiAlreadyRegisteredErrorResponse,
  ApiHasReferenceErrorResponse,
];
