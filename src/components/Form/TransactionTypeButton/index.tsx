import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as T from "./styled";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export type Props = TouchableOpacityProps & {
  title: string;
  type: keyof typeof icons;
  isActive: boolean;
};

export default function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <T.Wrapper {...rest} type={type} isActive={isActive}>
      <T.Icon name={icons[type]} type={type} />

      <T.Title>{title}</T.Title>
    </T.Wrapper>
  );
}
