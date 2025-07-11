import { Transaction } from "../api";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  return date.toLocaleDateString();
}

export function formatAmount(
  paidOut: string,
  paidIn: string,
  type: "income" | "expense"
) {
  const amount = type === "income" ? parseFloat(paidIn) : parseFloat(paidOut);
  const sign = type === "income" ? "+" : "-";
  return `${sign}₾${Math.abs(amount).toFixed(2)}`;
}

export const formatTransactionForDashboard = (transaction: Transaction) => {
  return {
    description: transaction.description,
    time: formatDate(transaction.date),
    amount: formatAmount(
      transaction.paidOut,
      transaction.paidIn,
      transaction.type
    ),
  };
};
