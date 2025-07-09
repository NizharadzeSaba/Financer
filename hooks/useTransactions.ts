import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionRequest, queryKeys, transactionsAPI } from "../api";

// ============================================================================
// TRANSACTIONS HOOKS
// ============================================================================

export const useTransactions = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.transactions.lists(),
    queryFn: () => transactionsAPI.getTransactions(page),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      transactionsAPI.createTransaction(data),
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(
        queryKeys.transactions.lists(),
        (oldData: any) => {
          if (!oldData)
            return {
              transactions: [newTransaction],
              total: 1,
              page: 1,
              totalPages: 1,
            };
          return {
            ...oldData,
            transactions: [newTransaction, ...oldData.transactions],
            total: oldData.total + 1,
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.lists(),
      });
    },
  });
};

export const useTransaction = (id: number) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id.toString()),
    queryFn: () => transactionsAPI.getTransaction(id),
    enabled: !!id,
  });
};
