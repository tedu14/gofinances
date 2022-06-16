import * as H from "./styled";

export default function HighlightCard() {
  return (
    <H.Wrapper>
      <H.Header>
        <H.Title>Entrada</H.Title>
        <H.Icon name="arrow-up-circle" />
      </H.Header>
      <H.Footer>
        <H.Amount>R$ 17.400,00</H.Amount>
        <H.Info>Última entrada dia 13 de abril</H.Info>
      </H.Footer>
    </H.Wrapper>
  );
}
