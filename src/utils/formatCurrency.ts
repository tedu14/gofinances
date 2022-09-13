export const formatCurrency = (amount: string | number) =>
  Number(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
