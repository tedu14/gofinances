import React, { useState } from "react";
import { Modal } from "react-native";
import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import Input from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import * as R from "./styled";

export default function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const handleTransactionTypeSelect = (type: "up" | "down") => () => {
    setTransactionType(type);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
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
          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </R.Fields>
        <Button title="Enviar" />
      </R.Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </R.Wrapper>
  );
}
