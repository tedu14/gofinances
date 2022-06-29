import React, { useState } from "react";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import * as R from "./styled";

export default function Register() {
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionTypeSelect = (type: "up" | "down") => () => {
    setTransactionType(type);
  };

  return (
    <R.Wrapper>
      <R.Header>
        <R.Title>Cadastro</R.Title>
      </R.Header>
      <R.Form>
        <R.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <R.TransactionsType>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </R.TransactionsType>
        </R.Fields>
        <Button title="Enviar" />
      </R.Form>
    </R.Wrapper>
  );
}
