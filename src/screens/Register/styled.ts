import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFValue(24)}px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0 16px;
`;
