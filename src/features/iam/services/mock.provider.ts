import type {
  AuthProvider,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from "@features/iam/types";

export class MockAuthProvider implements AuthProvider {
  private user: AuthUser | null = null;

  private listeners = new Set<
    (user: AuthUser | null) => void
  >();

  async initialize(): Promise<void> {
    const saved = localStorage.getItem("mock-user");

    if (saved) {
      this.user = JSON.parse(saved);
    }
  }

  async login(
    credentials: LoginCredentials,
  ): Promise<void> {
    await this.delay();

    this.user = {
      uid: crypto.randomUUID(),
      email: credentials.email,
      displayName: "Mock User",
    };

    localStorage.setItem(
      "mock-user",
      JSON.stringify(this.user),
    );

    this.notify();
  }

  async register(data: RegisterData): Promise<void> {
    await this.delay();

    this.user = {
      uid: crypto.randomUUID(),
      email: data.email,
      displayName: data.displayName,
    };

    localStorage.setItem(
      "mock-user",
      JSON.stringify(this.user),
    );

    this.notify();
  }

  async logout(): Promise<void> {
    await this.delay();

    this.user = null;

    localStorage.removeItem("mock-user");

    this.notify();
  }

  async resetPassword(email: string): Promise<void> {
    console.log(`Mock reset password for ${email}`);

    await this.delay();
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return this.user;
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.user) return null;

    return "mock-access-token";
  }

  onAuthStateChanged(
    callback: (user: AuthUser | null) => void,
  ) {
    this.listeners.add(callback);

    callback(this.user);

    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((listener) =>
      listener(this.user),
    );
  }

  private delay(ms = 500) {
    return new Promise<void>((resolve) =>
      setTimeout(resolve, ms),
    );
  }
}
