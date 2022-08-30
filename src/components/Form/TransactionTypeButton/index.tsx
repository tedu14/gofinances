import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as T from "./styled";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export interface Props extends RectButtonProps {
  title: string;
  type: keyof typeof icons;
  isActive: boolean;
}

export default function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <T.Wrapper type={type} isActive={isActive}>
      <T.Button {...rest}>
        <T.Icon name={icons[type]} type={type} />
        <T.Title>{title}</T.Title>
      </T.Button>
    </T.Wrapper>
  );
}
