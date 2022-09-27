import React, { useCallback, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert, Platform } from "react-native";

import * as S from "./styled";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSingIn = useCallback(
    (signIn: () => Promise<void>, account: string) => async () => {
      try {
        setIsLoading(true);
        return await signIn();
      } catch (err: any) {
        console.log(err);
        Alert.alert(`Não foi possível conectar com a conta ${account}`);
        setIsLoading(false);
      }
    },
    []
  );

  const handleSignInWithGoogle = handleSingIn(signInWithGoogle, "Google");

  const handleSignInWithApple = handleSingIn(signInWithApple, "Apple");

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <S.Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </S.Title>
        </S.TitleWrapper>
        <S.SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.SignInContentButtons>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </S.SignInContentButtons>
        {isLoading && <Loading color="shape" />}
      </S.Footer>
    </S.Container>
  );
}
