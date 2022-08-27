import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import Input from "../Input";
import * as I from "./styled";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

export default function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <I.Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <I.Error>{error}</I.Error>}
    </I.Container>
  );
}
