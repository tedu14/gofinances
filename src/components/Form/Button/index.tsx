import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as B from "./styled";

type Props = TouchableOpacityProps & {
  title: string;
};

export default function Button({ title, ...rest }: Props) {
  return (
    <B.Wrapper {...rest}>
      <B.Title>{title}</B.Title>
    </B.Wrapper>
  );
}
