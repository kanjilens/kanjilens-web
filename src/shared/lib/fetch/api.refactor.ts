import type { HttpMiddleware } from "@features/iam/types/middleware.types";

export class ApiClient {
  private baseURL: string;
  private middlewares: HttpMiddleware[];

  constructor(
    baseURL: string,
    middlewares: HttpMiddleware[] = [],
  ) {
    this.baseURL = baseURL;
    this.middlewares = middlewares;
  }

  async request(
    url: string,

    init: RequestInit = {},
  ): Promise<Response> {
    let request = new Request(
      this.baseURL + url,

      init,
    );

    for (const middleware of this.middlewares) {
      if (middleware.onRequest) {
        request = await middleware.onRequest(request);
      }
    }

    let response = await fetch(request);

    for (const middleware of [
      ...this.middlewares,
    ].reverse()) {
      if (middleware.onResponse) {
        response = await middleware.onResponse(
          response,
          request,
        );
      }
    }

    return response;
  }

  get(url: string) {
    return this.request(url, {
      method: "GET",
    });
  }

  post(
    url: string,

    body?: unknown,
  ) {
    return this.request(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });
  }
}
