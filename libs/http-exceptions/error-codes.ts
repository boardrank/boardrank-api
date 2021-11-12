export const ErrorCode = {
  /**
   * HttpStatus : 400
   */
  BadRequest: 4000,
  InvalidToken: 4001,
  InvalidParam: 4002,

  /**
   * HttpStatus : 401
   */
  Unauthorized: 4010,

  /**
   * HttpStatus : 403
   */
  Forbidden: 4030,

  /**
   * HttpStatus: 404
   */
  NotFound: 4040,

  /**
   * HttpStatus : 409
   */
  Conflict: 4090,
  AlreadyRegistered: 4091,
  HasReference: 4092,
};
