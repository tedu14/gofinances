import styled, { css, DefaultTheme } from "styled-components/native";
import IconVector from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedStyledProps } from "styled-components";

export interface ITypeIcon {
  up: string;
  down: string;
  total: string;
}

type TypeProps = {
  type: keyof ITypeIcon;
};

const getIconColor = ({
  colors: { success, attention, shape },
}: DefaultTheme): ITypeIcon => ({
  down: attention,
  up: success,
  total: shape,
});

type TypographyTypes = {
  title: string;
  text: string;
};

const getTypographyColor = (
  type: TypeProps["type"],
  { colors: { title, text, shape } }: DefaultTheme
): TypographyTypes => {
  function getColor(color: string) {
    return type === "total" ? shape : color;
  }
  return {
    title: getColor(title),
    text: getColor(text),
  };
};

const setTypographyColor =
  (typography: keyof TypographyTypes) =>
  ({ theme, type }: ThemedStyledProps<TypeProps, DefaultTheme>) =>
    type &&
    css`
      color: ${getTypographyColor(type, theme)[typography]};
    `;

export const Header = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`;

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  ${setTypographyColor("title")}
`;

export const Icon = styled(IconVector)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ theme, type }) =>
    type &&
    css`
      color: ${getIconColor(theme)[type]};
    `};
`;

export const Footer = styled.View`
  margin-top: ${RFValue(38)}px;
`;

export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(32)}px;
  line-height: ${RFValue(48)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  ${setTypographyColor("title")}
`;

export const Info = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  ${setTypographyColor("text")}
`;

export const Wrapper = styled.View<TypeProps>`
  background-color: ${({ theme: { colors }, type }) =>
    type === "total" ? colors.secondary : colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: ${RFValue(19)}px ${RFValue(23)}px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;
