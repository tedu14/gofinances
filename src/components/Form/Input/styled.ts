import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Wrapper = styled(TextInput)`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(18)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  margin-bottom: 8px;
`;
