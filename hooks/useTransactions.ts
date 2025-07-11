import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateTransactionRequest,
  queryKeys,
  transactionsAPI,
  TransactionsResponse,
  TransactionsStats,
} from "../api";

export const useTransactions = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.transactions.lists(),
    queryFn: () => transactionsAPI.getTransactions(page),
    staleTime: 2 * 60 * 1000,
  });
};

export const useRecentTransactions = (limit: number = 4) => {
  return useQuery({
    queryKey: [...queryKeys.transactions.lists(), "recent", limit],
    queryFn: () => transactionsAPI.getRecentTransactions(limit),
    staleTime: 2 * 60 * 1000,
  });
};

export const useInfiniteTransactions = () => {
  return useInfiniteQuery<TransactionsResponse, Error>({
    queryKey: queryKeys.transactions.lists(),
    queryFn: ({ pageParam }) =>
      transactionsAPI.getTransactions(Number(pageParam) || 1),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = Number(lastPage.page);
      const totalPages = Number(lastPage.totalPages);
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      transactionsAPI.createTransaction(data),
  });
};

export const useImportTransactionsCSV = () => {
  return useMutation({
    mutationFn: async ({
      bankCode,
      file,
    }: {
      bankCode: "tbc" | "bog";
      file: import("expo-document-picker").DocumentPickerAsset;
    }) => {
      return transactionsAPI.importTransactionsCSV(bankCode, file);
    },
  });
};

export const useTransactionsStats = () => {
  return useQuery<TransactionsStats, Error>({
    queryKey: ["transactions", "stats"],
    queryFn: () => transactionsAPI.getStats(),
    staleTime: 2 * 60 * 1000,
  });
};

export const useTransaction = (id: number) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id.toString()),
    queryFn: () => transactionsAPI.getTransaction(id),
    enabled: !!id,
  });
};

export const useTransactionCategories = () => {
  return useQuery({
    queryKey: ["transactions", "categories"],
    queryFn: () => transactionsAPI.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
};
