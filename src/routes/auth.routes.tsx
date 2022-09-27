import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInPage from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignInPage} />
    </Navigator>
  );
}
