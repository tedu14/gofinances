import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import InputForm from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import * as R from "./styled";

type FormData = {
  name: string;
  amount: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Valor é obrigatório"),
});

export default function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  const handleFormRegister = (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <R.Wrapper>
        <R.Header>
          <R.Title>Cadastro</R.Title>
        </R.Header>
        <R.Form>
          <R.Fields>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              name="name"
              control={control}
              placeholder="Nome"
              error={errors.name && (errors.name.message as string)}
            />
            <InputForm
              keyboardType="numeric"
              name="amount"
              control={control}
              placeholder="Preço"
              error={errors.amount && (errors.amount.message as string)}
            />
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
          <Button onPress={handleSubmit(handleFormRegister)} title="Enviar" />
        </R.Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </R.Wrapper>
    </TouchableWithoutFeedback>
  );
}
