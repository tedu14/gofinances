import React from "react";
import HighlightCard from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import * as D from "./styled";

export interface ITransactionsList extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: ITransactionsList[] = [
    {
      id: "1",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      type: "positive",
      category: {
        name: "Almoço",
        icon: "dollar-sign",
      },
    },
    {
      id: "2",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      type: "negative",
      category: {
        name: "Almoço",
        icon: "dollar-sign",
      },
    },
    {
      id: "3",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      type: "negative",
      category: {
        name: "Almoço",
        icon: "dollar-sign",
      },
    },
  ];

  return (
    <D.Wrapper>
      <D.Header>
        <D.UserWrapper>
          <D.UserInfo>
            <D.UserPhoto
              source={{
                uri: "https://avatars.githubusercontent.com/u/45318847?v=4",
              }}
            />
            <D.UserContainer>
              <D.UserGreeting>Olá, </D.UserGreeting>
              <D.UserName>Thalison</D.UserName>
            </D.UserContainer>
          </D.UserInfo>
          <D.LogoutButton onPress={() => {}}>
            <D.Icon name="power" />
          </D.LogoutButton>
        </D.UserWrapper>
      </D.Header>
      <D.HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17,000"
          info="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Entradas"
          amount="R$ 17,000"
          info="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Entradas"
          amount="R$ 17,000"
          info="Última entrada dia 13 de abril"
        />
      </D.HighlightCards>
      <D.Transactions>
        <D.Title>Listagem</D.Title>
        <D.TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </D.Transactions>
    </D.Wrapper>
  );
}
