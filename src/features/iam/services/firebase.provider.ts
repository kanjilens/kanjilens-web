import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import type {
  AuthProvider,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from "@features/iam/types";

export class FirebaseAuthProvider implements AuthProvider {
  private auth = getAuth();

  async initialize(): Promise<void> {}

  async login(
    credentials: LoginCredentials,
  ): Promise<void> {
    await signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password,
    );
  }

  async register(data: RegisterData): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password,
    );

    await updateProfile(user, {
      displayName: data.displayName,
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const user = this.auth.currentUser;

    if (!user) return null;

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async getAccessToken(): Promise<string | null> {
    const user = this.auth.currentUser;

    if (!user) return null;

    return await user.getIdToken();
  }

  onAuthStateChanged(
    callback: (user: AuthUser | null) => void,
  ) {
    return onAuthStateChanged(this.auth, (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
    });
  }
}
