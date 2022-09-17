import React, { useCallback, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();
  const { getItem } = useStorage(storageKeys.transactionKey);

  const handleChangeDate = (action: "next" | "prev") => {
    if (action === "next") {
      const nextDate = addMonths(selectedDate, 1);
      setSelectedDate(nextDate);
      return;
    }
    const prevDate = subMonths(selectedDate, 1);
    setSelectedDate(prevDate);
  };

  const loadingTransactions = async () => {
    setIsLoading(true);
    const currentTransactions = await getItem<ITransactionsList[]>({
      defaultValue: [],
    });

    const expensives = currentTransactions.filter((item) => {
      const date = new Date(item.date);
      const expensiveMonth = date.getMonth();
      const expensiveYear = date.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      return (
        item.type === "negative" &&
        expensiveMonth === selectedMonth &&
        expensiveYear === selectedYear
      );
    });
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
  };

  useFocusEffect(
    useCallback(() => {
      loadingTransactions();
    }, [selectedDate])
  );

  return (
    <R.Container>
      <Header title="Resumo" />
      {isLoading && <Loading />}
      {!isLoading && (
        <R.Content>
          <R.MonthSelect>
            <R.MonthSelectButton onPress={() => handleChangeDate("prev")}>
              <R.SelectIcon name="chevron-left" />
            </R.MonthSelectButton>
            <R.Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </R.Month>
            <R.MonthSelectButton onPress={() => handleChangeDate("next")}>
              <R.SelectIcon name="chevron-right" />
            </R.MonthSelectButton>
          </R.MonthSelect>

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
