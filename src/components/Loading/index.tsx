import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { DefaultTheme, useTheme } from "styled-components";
import * as L from "./styled";

type LoadingProps = {
  color?: keyof DefaultTheme["colors"];
  size?: ActivityIndicatorProps["size"];
};

export default function Loading({
  color = "primary",
  size = "large",
}: LoadingProps) {
  const theme = useTheme();
  return (
    <L.Wrapper>
      <ActivityIndicator color={theme.colors[color]} size={size} />
    </L.Wrapper>
  );
}
