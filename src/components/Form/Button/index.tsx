import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as B from "./styled";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress, ...rest }: Props) {
  return (
    <B.Wrapper onPress={onPress} {...rest}>
      <B.Title>{title}</B.Title>
    </B.Wrapper>
  );
}
