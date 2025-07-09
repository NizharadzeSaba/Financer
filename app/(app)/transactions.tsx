import { FlashList } from "@shopify/flash-list";
import React from "react";
import { RefreshControl } from "react-native";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  TransactionItem,
  TransactionsHeader,
} from "../../components";
import { useTransactions } from "../../hooks/useTransactions";

export default function Transactions() {
  const {
    data: transactionsData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useTransactions();

  if (isLoading) {
    return <LoadingState message="Loading transactions..." />;
  }

  if (error) {
    return (
      <ErrorState message="Error loading transactions" onRetry={refetch} />
    );
  }

  const transactions = transactionsData?.transactions || [];

  return (
    <FlashList
      data={transactions}
      renderItem={({ item }) => <TransactionItem transaction={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <EmptyState
          title="No transactions found"
          message="Your transactions will appear here once you add some"
        />
      }
      estimatedItemSize={80}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<TransactionsHeader />}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    />
  );
}
