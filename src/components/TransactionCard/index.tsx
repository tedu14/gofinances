import React from "react";
import * as T from "./styled";

type Category = {
  icon: string;
  name: string;
};

export type TransactionCardProps = {
  name: string;
  amount: string;
  category: Category;
  date: string;
  type: T.IAmountProps["type"];
};

type Props = {
  data: TransactionCardProps;
};

export function TransactionCard({
  data: { amount, category, date, name, type },
}: Props) {
  return (
    <T.Wrapper>
      <T.Title>{name}</T.Title>
      <T.Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </T.Amount>
      <T.Footer>
        <T.Category>
          <T.Icon name={category.icon} />
          <T.CategoryName>{category.name}</T.CategoryName>
        </T.Category>
        <T.Date>{date}</T.Date>
      </T.Footer>
    </T.Wrapper>
  );
}
