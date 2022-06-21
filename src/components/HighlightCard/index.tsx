import * as H from "./styled";

type Props = {
  title: string;
  amount: string;
  info: string;
  type: keyof H.ITypeIcon;
};

const getIcon: H.ITypeIcon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export default function HighlightCard({ amount, info, title, type }: Props) {
  return (
    <H.Wrapper type={type}>
      <H.Header>
        <H.Title type={type}>{title}</H.Title>
        <H.Icon name={getIcon[type]} type={type} />
      </H.Header>
      <H.Footer>
        <H.Amount type={type}>{amount}</H.Amount>
        <H.Info type={type}>{info}</H.Info>
      </H.Footer>
    </H.Wrapper>
  );
}
