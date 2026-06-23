import {
  AuthProviderType,
  type AuthProvider,
} from "@features/iam/types";

import { FirebaseAuthProvider } from "@features/iam/services/firebase.provider";
import { MockAuthProvider } from "@features/iam/services/mock.provider";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@shared/lib/firebase";

export function createAuthenticationProvider(): AuthProvider {
  const provider = (import.meta.env.VITE_AUTH_PROVIDER ??
    AuthProviderType.FIREBASE) as AuthProviderType;

  switch (provider) {
    // case AuthProviderType.JWT:
    //   return new JwtAuthenticationProvider(api);

    case AuthProviderType.MOCK:
      return new MockAuthProvider();

    case AuthProviderType.FIREBASE:
      initializeApp(firebaseConfig);
      return new FirebaseAuthProvider();
    default:
      return new MockAuthProvider();
  }
}
