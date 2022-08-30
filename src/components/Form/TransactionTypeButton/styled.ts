import styled, { css } from "styled-components/native";
import Feather from "react-native-vector-icons/Feather";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import { Props } from ".";

type ColorType = {
  type: Props["type"];
};

type WrapperProps = ColorType & {
  isActive: boolean;
};

export const Wrapper = styled.View<WrapperProps>`
  width: 48%;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ theme: { colors }, isActive, type }) =>
    isActive &&
    css`
      border: none;
      background-color: ${type === "down"
        ? colors.attention_light
        : colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<ColorType>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  ${({ theme: { colors }, type }) =>
    type &&
    css`
      color: ${type === "down" ? colors.attention : colors.success};
    `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
