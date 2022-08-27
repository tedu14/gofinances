import React from "react";
import { FlatList } from "react-native";
import Button from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import * as C from "./styled";

type Category = {
  key: string;
  name: string;
};

type Props = {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

export default function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props) {
  const handleCategorySelect = (item: Category) => {
    setCategory(item);
  };

  return (
    <C.Container>
      <C.Header>
        <C.Title>Categoria</C.Title>
      </C.Header>
      <FlatList
        data={categories}
        style={{
          flex: 1,
          width: "100%",
        }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <C.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <C.Icon name={item.icon} />
            <C.Name>{item.name}</C.Name>
          </C.Category>
        )}
        ItemSeparatorComponent={() => <C.Separator />}
      />

      <C.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </C.Footer>
    </C.Container>
  );
}
