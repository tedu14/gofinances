import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: ${RFValue(19)}px ${RFValue(23)}px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`
  margin-top: ${RFValue(38)}px;
`;

export const Amount = styled.Text`
  font-size: ${RFValue(32)}px;
  line-height: ${RFValue(48)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const Info = styled.Text`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
