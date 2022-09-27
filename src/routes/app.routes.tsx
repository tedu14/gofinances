import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import Register from "../screens/Register";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ResumePage from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

const routes = [
  {
    component: Dashboard,
    icon: "format-list-bulleted",
    name: "Listagem",
  },
  {
    component: Register,
    icon: "attach-money",
    name: "Cadastrar",
  },
  {
    component: ResumePage,
    icon: "pie-chart",
    name: "Resumo",
  },
];

export default function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      {routes.map(({ component, icon, name }) => (
        <Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Navigator>
  );
}
