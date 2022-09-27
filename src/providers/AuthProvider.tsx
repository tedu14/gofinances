import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: JSX.Element | ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const { setItem, getItem, clearStorage } = useStorage(storageKeys.user);

  const handleChangeUserStates = useCallback(
    (signIn: () => Promise<User | void>) => async () => {
      try {
        const userSignIn = await signIn();

        if (userSignIn) {
          setUser(userSignIn);
          await setItem(userSignIn);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
    []
  );

  const signInWithGoogle = handleChangeUserStates(async () => {
    const { clientId, redirectId, responseType, scope, authUrl } = internals;
    console.log(internals);
    const queryParams = `?client_id=${clientId}&redirect_uri=${redirectId}&response_type=${responseType}&scope=${scope}`;
    const url = `${authUrl}${queryParams}`;

    console.log(url);

    const { type, params } = (await AuthSession.startAsync({
      authUrl: url,
    })) as AuthorizationResponse;

    if (type === "success") {
      const response = await fetch(
        `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      );
      const userInfo = await response.json();

      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture,
      };
    }
  });

  const signInWithApple = handleChangeUserStates(async () => {
    const credentials = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credentials) {
      const name = credentials.fullName?.givenName!;
      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

      return {
        id: credentials.user,
        email: credentials.email!,
        name,
        photo,
      };
    }
  });

  const signOut = async () => {
    try {
      setUser({} as User);
      await clearStorage();
    } catch (error) {
      console.warn("Fail to signOut user", error);
    }
  };

  const loadUserStorageData = async () => {
    try {
      const localUser = await getItem<User>();

      if (localUser) setUser(localUser);
    } catch (err) {
      console.warn("Fail to get user in local storage", err);
    } finally {
      setUserStorageLoading(false);
    }
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
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
