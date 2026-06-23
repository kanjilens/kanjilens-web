export interface ApiSuccessResponse {
  id: string;
  message: string;
}

export interface ApiSuccessResponseWithData<
  T = object,
> extends ApiSuccessResponse {
  data: T;
}
