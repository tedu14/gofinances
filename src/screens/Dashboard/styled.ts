import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Wrapper = styled.View`
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserContainer = styled.View`
  margin-left: ${RFValue(17)}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(24)}px;
`;

export const UserGreeting = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const UserName = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const UserPhoto = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;
