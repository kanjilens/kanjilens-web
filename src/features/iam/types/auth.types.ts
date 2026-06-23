export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  roles?: string[] | null;
}

export interface AuthProvider {
  initialize(): Promise<void>;
  register(data: RegisterData): Promise<void>;
  resetPassword(email: string): Promise<void>;
  login(
    credentials: LoginCredentials,
  ): Promise<void | boolean>;

  logout(): Promise<void>;

  getCurrentUser(): Promise<AuthUser | null>;

  getAccessToken(): Promise<string | null>;

  onAuthStateChanged(
    callback: (user: AuthUser | null) => void,
  ): () => void;
}

export const AuthProviderType = {
  FIREBASE: "firebase",
  JWT: "jwt",
  MOCK: "mock",
} as const;

export type AuthProviderType =
  (typeof AuthProviderType)[keyof typeof AuthProviderType];

export type AuthPageRoutes = "login" | "register";
