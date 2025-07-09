import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionRequest, Transaction, queryKeys } from "../api";

// ============================================================================
// TRANSACTIONS API (Example)
// ============================================================================

const transactionsAPI = {
  getTransactions: async (): Promise<Transaction[]> => {
    // Simulate API call - replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: "1",
        amount: 1000,
        description: "Salary",
        category: "Income",
        date: new Date().toISOString(),
        type: "income",
      },
      {
        id: "2",
        amount: 50,
        description: "Grocery shopping",
        category: "Food",
        date: new Date().toISOString(),
        type: "expense",
      },
    ];
  },

  createTransaction: async (
    data: CreateTransactionRequest
  ): Promise<Transaction> => {
    // Simulate API call - replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Date.now().toString(),
      ...data,
      date: new Date().toISOString(),
    };
  },
};

// ============================================================================
// TRANSACTIONS HOOKS
// ============================================================================

export const useTransactions = () => {
  return useQuery({
    queryKey: queryKeys.transactions.lists(),
    queryFn: transactionsAPI.getTransactions,
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
        (oldData: Transaction[] | undefined) => {
          return oldData ? [newTransaction, ...oldData] : [newTransaction];
        }
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.lists(),
      });
    },
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: async () => {
      const transactions = await transactionsAPI.getTransactions();
      return transactions.find((t) => t.id === id);
    },
    enabled: !!id,
  });
};
