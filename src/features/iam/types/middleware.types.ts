export interface HttpMiddleware {
  onRequest?(request: Request): Promise<Request>;

  onResponse?(
    response: Response,
    request: Request,
  ): Promise<Response>;
}
