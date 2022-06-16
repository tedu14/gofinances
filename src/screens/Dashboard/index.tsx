import React from "react";
import HighlightCard from "../../components/HighlightCard";
import * as D from "./styled";

export function Dashboard() {
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
          <D.Icon name="power" />
        </D.UserWrapper>
      </D.Header>
      <D.HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </D.HighlightCards>
    </D.Wrapper>
  );
}
