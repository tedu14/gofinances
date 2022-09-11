import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import * as L from "./styled";

export default function Loading() {
  const theme = useTheme();
  return (
    <L.Wrapper>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </L.Wrapper>
  );
}
