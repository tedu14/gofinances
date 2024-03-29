import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { theme } from "./src/global/styles/theme";
import { StatusBar, View } from "react-native";
import AuthProvider from "./src/providers/AuthProvider";
import Routes from "./src/routes";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <View
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </GestureHandlerRootView>
      </View>
    </ThemeProvider>
  );
}
