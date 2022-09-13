import React from "react";
import * as H from "./styled";

type Props = {
  color: string;
  amount: string;
  title: string;
};

export default function HistoryCard({ color, amount, title }: Props) {
  return (
    <H.Container color={color}>
      <H.Title>{title}</H.Title>
      <H.Amount>{amount}</H.Amount>
    </H.Container>
  );
}
