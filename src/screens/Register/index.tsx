import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import InputForm from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import * as R from "./styled";
import { useStorage } from "../../hooks/useStorage";
import { useNavigate } from "../../hooks/useNavigate";
import { storageKeys } from "../../config/storagesKey";

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

const defaultCategory = {
  key: "category",
  name: "Categoria",
};

export default function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(defaultCategory);

  const { handleNavigateTo } = useNavigate();
  const { getItem, setItem } = useStorage(storageKeys.transactionKey);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: "negative" | "positive") => () => {
    setTransactionType(type);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleFormRegister = async ({ amount, name }: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria!");

    try {
      const newTransaction = {
        amount,
        name,
        type: transactionType,
        category,
        date: new Date(),
        id: String(uuid.v4()),
      };
      const currentData = await getItem<FormData[]>({ defaultValue: [] });
      const dataFormatted = [...currentData, newTransaction];
      await setItem(dataFormatted);

      reset();
      setTransactionType("");
      setCategory(defaultCategory);
      handleNavigateTo("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
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
                onPress={handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positve"}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
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
