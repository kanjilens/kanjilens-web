import type {
  AuthProvider,
  HttpMiddleware,
} from "@features/iam/types";

export class AuthMiddleware implements HttpMiddleware {
  private driver: AuthProvider;

  constructor(driver: AuthProvider) {
    this.driver = driver;
  }

  async onRequest(request: Request) {
    const token = await this.driver.getAccessToken();

    if (!token) return request;

    const headers = new Headers(request.headers);

    headers.set("Authorization", `Bearer ${token}`);

    return new Request(request, {
      headers,
    });
  }
}
