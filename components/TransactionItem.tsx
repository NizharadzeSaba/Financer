import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../api";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const formatAmount = (
    paidOut: string,
    paidIn: string,
    type: "income" | "expense"
  ) => {
    const amount = type === "income" ? parseFloat(paidIn) : parseFloat(paidOut);
    const sign = type === "income" ? "+" : "-";
    return `${sign}₾${Math.abs(amount).toFixed(2)}`;
  };

  const desc = transaction.description;
  const firstSemicolonIdx = desc.indexOf(";");
  const descAfterFirstSemicolon =
    firstSemicolonIdx !== -1 ? desc.slice(firstSemicolonIdx + 1).trim() : desc;

  const descLines = descAfterFirstSemicolon.split("\n");
  const collapsedDescription = descLines[0] || "";
  const expandedDescription = descAfterFirstSemicolon;
  const displayDescription = expanded
    ? expandedDescription
    : collapsedDescription;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setExpanded((prev) => !prev)}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginHorizontal: 16,
        borderRadius: 12,
        marginVertical: 8,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#1e293b",
            marginBottom: 4,
          }}
          numberOfLines={expanded ? undefined : 1}
          ellipsizeMode={expanded ? undefined : "tail"}
        >
          {displayDescription}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#6b7280",
            marginBottom: 4,
          }}
        >
          {transaction.category?.name ||
            transaction.detectedCategory ||
            "Uncategorized"}
        </Text>
        <Text style={{ fontSize: 12, color: "#9ca3af" }}>
          {formatDate(transaction.date)}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: transaction.type === "income" ? "#10b981" : "#ef4444",
        }}
      >
        {formatAmount(
          transaction.paidOut,
          transaction.paidIn,
          transaction.type
        )}
      </Text>
    </TouchableOpacity>
  );
};
