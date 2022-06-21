import React from "react";
import * as T from "./styled";

export function TransactionCard() {
  return (
    <T.Wrapper>
      <T.Title>Desenvolvimento de site</T.Title>
      <T.Amount>R$ 12.000,00</T.Amount>
      <T.Footer>
        <T.Category>
          <T.Icon name="dollar-sign" />
          <T.CategoryName>Vendas</T.CategoryName>
        </T.Category>
        <T.Date>13/04/2020</T.Date>
      </T.Footer>
    </T.Wrapper>
  );
}
