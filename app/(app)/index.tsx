import { useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
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
} from "../../hooks/useTransactions";
import { formatTransactionForDashboard } from "../../utils/transactionUtils";

export default function Dashboard() {
  const { data: user } = useProfile();
  const importCSVMutation = useImportTransactionsCSV();
  const queryClient = useQueryClient();
  const {
    data: recentTransactionsData,
    isLoading: isLoadingTransactions,
    refetch: refetchRecentTransactions,
  } = useRecentTransactions(3);

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
          title="Total Balance"
          amount="₾12,450.00"
          subtitle="+₾1,250.00 this month"
        />
        <BalanceCard
          title="Monthly Spending"
          amount="₾3,200.00"
          subtitle="₾800.00 remaining"
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
