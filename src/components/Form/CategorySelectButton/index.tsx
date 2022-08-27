import React from "react";
import * as C from "./styled";

type Props = {
  title: string;
  onPress: () => void;
};

export default function CategorySelectButton({ title, onPress }: Props) {
  return (
    <C.Wrapper onPress={onPress}>
      <C.Category>{title}</C.Category>
      <C.Icon name="arrow-down" />
    </C.Wrapper>
  );
}
