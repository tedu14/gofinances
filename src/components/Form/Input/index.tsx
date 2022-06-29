import React from "react";
import { TextInputProps } from "react-native";
import * as I from "./styled";

type Props = TextInputProps;

export default function Input({ ...rest }: Props) {
  return <I.Wrapper {...rest}></I.Wrapper>;
}
