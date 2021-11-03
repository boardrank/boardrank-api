export enum ErrorCode {
  /**
   * HttpStatus : 400
   */
  BadRequest = 4000,
  InvalidToken,
  InvalidParam,

  /**
   * HttpStatus : 401
   */
  Unauthorized = 4010,

  /**
   * HttpStatus : 403
   */
  Forbidden = 4030,

  /**
   * HttpStatus: 404
   */
  NotFound = 4040,

  /**
   * HttpStatus : 409
   */
  Conflict = 4090,
  AlreadyRegistered,
  HasReference,
}
