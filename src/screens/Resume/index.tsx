import React, { useCallback, useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

import * as R from "./styled";
import Header from "../../components/Header";
import HistoryCard from "../../components/HistoryCard";
import { storageKeys } from "../../config/storagesKey";
import { useStorage } from "../../hooks/useStorage";
import { ITransactionsList } from "../Dashboard";
import { categories } from "../../utils/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import Loading from "../../components/Loading";

type CategoryData = {
  category: string;
  amount: string;
  color: string;
  key: string;
  total: number;
  percent: string;
};

export default function ResumePage() {
  const [historyTransaction, setHistoryTransaction] = useState<CategoryData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { getItem } = useStorage(storageKeys.transactionKey);

  const loadingTransactions = useCallback(async () => {
    setIsLoading(true);
    const currentTransactions = await getItem<ITransactionsList[]>({
      defaultValue: [],
    });

    const expensives = currentTransactions.filter(
      (item) => item.type === "negative"
    );
    const expensivesTotal = expensives.reduce(
      (total, item) => total + Number(item.amount),
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      const categorySum = expensives.reduce((total, item) => {
        if (item.category.key === category.key) {
          return total + Number(item.amount);
        }
        return total;
      }, 0);

      if (categorySum > 0) {
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;
        totalByCategory.push({
          category: category.name,
          amount: formatCurrency(categorySum),
          color: category.color,
          key: category.key,
          total: categorySum,
          percent,
        });
      }
    });

    setHistoryTransaction(totalByCategory);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadingTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadingTransactions();
    }, [])
  );

  return (
    <R.Container>
      <Header title="Resumo" />
      {isLoading && <Loading />}
      {!isLoading && (
        <R.Content>
          <R.ChartContainer>
            <VictoryPie
              colorScale={historyTransaction.map((item) => item.color)}
              data={historyTransaction}
              x="percent"
              y="total"
              labelRadius={50}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
            />
          </R.ChartContainer>
          {historyTransaction.map((item) => (
            <HistoryCard
              key={item.key}
              amount={item.amount}
              title={item.category}
              color={item.color}
            />
          ))}
        </R.Content>
      )}
    </R.Container>
  );
}
