import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTransactions } from "../../hooks/useTransactions";

export default function Transactions() {
  const { data: transactions, isLoading, error, refetch } = useTransactions();

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

  const formatAmount = (amount: number, type: "income" | "expense") => {
    const sign = type === "income" ? "+" : "-";
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8fafc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 16, color: "#64748b" }}>
          Loading transactions...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8fafc",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "#ef4444", marginBottom: 16 }}>
          Error loading transactions
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            backgroundColor: "#3b82f6",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#ffffff" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1e293b",
            marginBottom: 4,
          }}
        >
          Transactions
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          View and manage your transactions
        </Text>

        {/* Refresh button */}
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            alignSelf: "flex-start",
            marginTop: 8,
            backgroundColor: "#f3f4f6",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#3b82f6", fontSize: 12 }}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ffffff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
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
                >
                  {transaction.description}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  {transaction.category}
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
                {formatAmount(transaction.amount, transaction.type)}
              </Text>
            </View>
          ))
        ) : (
          <View
            style={{
              alignItems: "center",
              padding: 40,
              backgroundColor: "#ffffff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            <Text style={{ color: "#64748b", marginBottom: 8 }}>
              No transactions found
            </Text>
            <Text
              style={{ color: "#9ca3af", fontSize: 12, textAlign: "center" }}
            >
              Your transactions will appear here once you add some
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
