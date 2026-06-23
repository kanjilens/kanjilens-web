const baseURL = import.meta.env.VITE_API_URL as string;

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: RequestInit;
}

export interface ApiError {
  response?: {
    data: unknown;
    status: number;
    statusText: string;
    headers: Headers;
  };
  message: string;
}

class ApiClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    url: string,
    config: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(config.headers);

    if (config.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      ...config,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        response: {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        },
        message: `Request failed with status ${response.status}`,
      };
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config,
    };
  }

  get<T>(url: string, config?: RequestInit) {
    return this.request<T>(url, {
      ...config,
      method: "GET",
    });
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ) {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ) {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ) {
    return this.request<T>(url, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(url: string, config?: RequestInit) {
    return this.request<T>(url, {
      ...config,
      method: "DELETE",
    });
  }
}

export function requestConfig(
  authenticated = true,
): RequestInit {
  const headers = new Headers();

  if (authenticated) {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return {
    headers,
  };
}

export const api = new ApiClient(baseURL);
