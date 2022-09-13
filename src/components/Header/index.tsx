import React from "react";
import * as H from "./styled";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <H.Header>
      <H.Title>{title}</H.Title>
    </H.Header>
  );
}
