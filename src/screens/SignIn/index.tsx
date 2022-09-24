import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert } from "react-native";

import * as S from "./styled";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../providers/AuthProvider";

export default function SignInPage() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível conectar com a conta Google");
    }
  };

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível conectar com a conta Apple");
    }
  };

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
          <SignInSocialButton
            onPress={handleSignInWithApple}
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </S.SignInContentButtons>
      </S.Footer>
    </S.Container>
  );
}
