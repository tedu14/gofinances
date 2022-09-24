import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

import { internals } from "../config/internals";
import { useStorage } from "../hooks/useStorage";
import { storageKeys } from "../config/storagesKey";

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextProps {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: JSX.Element | ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const { setItem } = useStorage(storageKeys.user);

  const signInWithGoogle = async () => {
    try {
      const { clientId, redirectId, responseType, scope, authUrl } = internals;
      const queryParams = `?client_id=${clientId}&redirect_uri=${redirectId}&response_type=${responseType}&scope=${scope}`;
      const url = `${authUrl}${queryParams}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl: url,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const userGoogle: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };
        setUser(userGoogle);
        await setItem(userGoogle);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const userApple: User = {
          id: credentials.user,
          email: credentials.email!,
          name: credentials.fullName?.givenName!,
        };
        setUser(userApple);
        await setItem(userApple);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth is missing called inside AuthProvider");

  return context;
}
