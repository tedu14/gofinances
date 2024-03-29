import React, { useCallback } from "react";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import HighlightCard, {
  HighlightCardProps,
} from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import * as D from "./styled";
import Loading from "../../components/Loading";
import { formatCurrency } from "../../utils/formatCurrency";
import { useAuth } from "../../providers/AuthProvider";
import { useStorageTransactions } from "../../hooks/useStorageTransactions";

const faultHighlightData: HighlightCardProps[] = [
  {
    amount: "R$ 0,00",
    info: "Última entrada {date}",
    title: "Entradas",
    type: "up",
  },
  {
    amount: "R$ 0,00",
    info: "Última saída {date}",
    title: "Saídas",
    type: "down",
  },
  {
    amount: "R$ 0,00",
    info: "",
    title: "Total",
    type: "total",
  },
];

export interface ITransactionsList extends TransactionCardProps {
  id: string;
  category: {
    icon: string;
    name: string;
    key: string;
  };
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<ITransactionsList[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, signOut } = useAuth();
  const { getItem } = useStorageTransactions();

  const formattedDate = (date: string | number) =>
    Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(date));

  const handleHighlightData = useCallback(
    (currentTransactions: ITransactionsList[]) => {
      const getTotal = (type: ITransactionsList["type"]) =>
        currentTransactions.reduce((total, item) => {
          if (item.type === type) {
            return total + Number(item.amount);
          }
          return total;
        }, 0);

      const getLastDate = (type: ITransactionsList["type"], info: string) => {
        const lastTransactionDate = new Date(
          Math.max.apply(
            Math,
            currentTransactions
              .filter((item) => item.type === type)
              .map((item) => new Date(item.date).getTime())
          )
        );

        return info.replace(
          "{date}",
          `dia ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString(
            "pt-BR",
            { month: "long" }
          )}`
        );
      };

      const getLastTotalRangeTransaction = () => {
        const transactionsDate = currentTransactions.map((item) =>
          new Date(item.date).getTime()
        );
        const lastTransaction = new Date(
          Math.max.apply(Math, transactionsDate)
        );
        const firstTransaction = new Date(
          Math.min.apply(Math, transactionsDate)
        );
        return `${firstTransaction.getDate()} a ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
          "pt-BR",
          { month: "long" }
        )}`;
      };

      setHighlightData(
        faultHighlightData.map((item) => {
          const entries = getTotal("positive");
          const expensives = getTotal("negative");

          let amount = item.amount;
          let info = getLastTotalRangeTransaction();

          switch (item.type) {
            case "total":
              amount = formatCurrency(entries - expensives);
              break;
            case "up":
              amount = formatCurrency(entries);
              info = getLastDate("positive", item.info);
              break;
            default:
              amount = formatCurrency(expensives);
              info = getLastDate("negative", item.info);
          }

          return {
            ...item,
            amount,
            info,
          };
        })
      );
      setIsLoading(false);
    },
    []
  );

  const loadTransaction = useCallback(async () => {
    const currentTransactions = await getItem<ITransactionsList[]>({
      defaultValue: [],
    });

    const transactionsFormatted = currentTransactions
      .sort((firstItem, secondItem) => {
        const firstDate = new Date(firstItem.date);
        const secondDate = new Date(secondItem.date);
        return secondDate.getTime() - firstDate.getTime();
      })
      .map(({ amount, date, ...rest }) => ({
        amount: formatCurrency(amount),
        date: formattedDate(date),
        ...rest,
      }));

    setTransactions(transactionsFormatted);
    handleHighlightData(currentTransactions);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <D.Wrapper>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <D.Header>
            <D.UserWrapper>
              <D.UserInfo>
                <D.UserPhoto
                  source={{
                    uri: user.photo,
                  }}
                />
                <D.UserContainer>
                  <D.UserGreeting>Olá, </D.UserGreeting>
                  <D.UserName>{user.name}</D.UserName>
                </D.UserContainer>
              </D.UserInfo>
              <D.LogoutButton onPress={signOut}>
                <D.Icon name="power" />
              </D.LogoutButton>
            </D.UserWrapper>
          </D.Header>
          <D.HighlightCards>
            {highlightData.map((item) => (
              <HighlightCard
                key={item.type}
                type={item.type}
                title={item.title}
                amount={item.amount}
                info={item.info}
              />
            ))}
          </D.HighlightCards>
          <D.Transactions>
            <D.Title>Listagem</D.Title>
            <D.TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </D.Transactions>
        </>
      )}
    </D.Wrapper>
  );
}
