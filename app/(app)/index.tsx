import { useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { TransactionsStats } from "../../api";
import {
  BalanceCard,
  DashboardHeader,
  QuickActionButton,
  SectionHeader,
  TransactionsContainer,
} from "../../components";
import { useProfile } from "../../hooks/useAuth";
import {
  useImportTransactionsCSV,
  useRecentTransactions,
  useTransactionsStats,
} from "../../hooks/useTransactions";
import { formatTransactionForDashboard } from "../../utils/transactionUtils";

function getMonthDiff(
  stats: TransactionsStats | undefined,
  type: "income" | "expense"
): number | null {
  if (!stats || !stats.monthlyTrends || stats.monthlyTrends.length < 2)
    return null;
  const trends = stats.monthlyTrends;
  const current = trends[trends.length - 1];
  const prev = trends[trends.length - 2];
  if (!current || !prev) return null;
  const diff =
    type === "income"
      ? current.income - prev.income
      : current.expenses - prev.expenses;
  return diff;
}

function formatCurrency(amount: number | undefined): string {
  if (amount == null) return "0.00";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDiff(diff: number | null): string {
  if (diff == null) return "";
  const sign = diff > 0 ? "+" : diff < 0 ? "−" : "";
  return `${sign}₾${Math.abs(diff).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} this month`;
}

export default function Dashboard() {
  const { data: user } = useProfile();
  const importCSVMutation = useImportTransactionsCSV();
  const queryClient = useQueryClient();
  const {
    data: recentTransactionsData,
    isLoading: isLoadingTransactions,
    refetch: refetchRecentTransactions,
  } = useRecentTransactions(3);
  const { data: stats, isLoading: isLoadingStats } = useTransactionsStats();

  const currentMonth = stats?.monthlyTrends?.[stats.monthlyTrends.length - 1];

  const expenseDiff = getMonthDiff(stats, "expense");
  const incomeDiff = getMonthDiff(stats, "income");

  const handleImportCSV = async (bankCode: "tbc" | "bog") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;
      const file = result.assets[0];
      await importCSVMutation.mutateAsync({ bankCode, file });
      Alert.alert(
        "Success",
        `${bankCode.toUpperCase()} CSV imported successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    } catch (e) {
      Alert.alert(
        "Error",
        e instanceof Error ? e.message : "Failed to import CSV"
      );
    }
  };

  const recentTransactions =
    recentTransactionsData?.map(formatTransactionForDashboard) || [];

  const isImporting = importCSVMutation.status === "pending";

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoadingTransactions}
          onRefresh={refetchRecentTransactions}
        />
      }
      style={{ flex: 1 }}
    >
      <DashboardHeader userName={user?.name} />

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingTop: 20,
          gap: 12,
        }}
      >
        <BalanceCard
          title="Monthly Income"
          amount={
            isLoadingStats ? "..." : `₾${formatCurrency(currentMonth?.income)}`
          }
          subtitle={isLoadingStats ? "" : formatDiff(incomeDiff)}
        />
        <BalanceCard
          title="Monthly Expenses"
          amount={
            isLoadingStats
              ? "..."
              : `₾${formatCurrency(currentMonth?.expenses)}`
          }
          subtitle={isLoadingStats ? "" : formatDiff(expenseDiff)}
        />
      </View>

      <SectionHeader title="Recent Transactions" />
      <TransactionsContainer
        transactions={recentTransactions}
        isLoading={isLoadingTransactions}
      />

      <SectionHeader title="Quick Actions" />
      <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 20 }}>
        <QuickActionButton
          title="Add Transaction"
          onPress={() => {}}
          disabled={isImporting}
        />
        <QuickActionButton
          title="Add TBC Transactions"
          onPress={() => handleImportCSV("tbc")}
          disabled={isImporting}
          isLoading={isImporting}
        />
        <QuickActionButton
          title="Add BOG Transactions"
          onPress={() => handleImportCSV("bog")}
          disabled={isImporting}
          isLoading={isImporting}
        />
      </View>
    </ScrollView>
  );
}
