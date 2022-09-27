import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useAuth } from "../providers/AuthProvider";

export default function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user?.id ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
}
