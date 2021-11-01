export interface RestApiResponse<T> {
  errCode: number;
  errMsg: string;
  data: T;
}
