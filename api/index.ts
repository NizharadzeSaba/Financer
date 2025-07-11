import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import type { DocumentPickerAsset } from "expo-document-picker";

// ============================================================================
// TYPES
// ============================================================================

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  additionalInformation: string | null;
  paidOut: string;
  paidIn: string;
  balance: string;
  type: "income" | "expense";
  documentDate: string | null;
  documentNumber: string | null;
  partnersAccount: string | null;
  partnersName: string | null;
  partnersTaxCode: string | null;
  partnersBankCode: string | null;
  intermediaryBankCode: string | null;
  chargeDetails: string | null;
  taxpayerCode: string | null;
  taxpayerName: string | null;
  treasuryCode: string | null;
  opCode: string | null;
  additionalDescription: string | null;
  transactionId: string | null;
  detectedCategory: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
}

// ============================================================================
// API CONFIGURATION
// ============================================================================
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// ============================================================================
// API UTILITIES
// ============================================================================

const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing auth token:", error);
  }
};

const handleTokenInvalidation = async () => {
  console.log("Token invalid, clearing auth data...");
  await removeAuthToken();

  queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });

  queryClient.clear();
};

const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = await getAuthToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Handle token invalidation for auth endpoints
      if (response.status === 401 || response.status === 403) {
        await handleTokenInvalidation();
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// ============================================================================
// AUTH API
// ============================================================================

export const authAPI = {
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiFetch<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    await setAuthToken(response.access_token);
    return response;
  },

  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await apiFetch<AuthResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
    await setAuthToken(response.access_token);
    return response;
  },

  getProfile: async (): Promise<User> => {
    return await apiFetch<User>("/auth/profile");
  },

  logout: async (): Promise<void> => {
    await removeAuthToken();
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
    queryClient.clear();
  },
};

// ============================================================================
// TRANSACTIONS API
// ============================================================================

export const transactionsAPI = {
  getTransactions: async (page: number = 1): Promise<TransactionsResponse> => {
    return await apiFetch<TransactionsResponse>(`/transactions?page=${page}`);
  },

  getTransaction: async (id: number): Promise<Transaction> => {
    return await apiFetch<Transaction>(`/transactions/${id}`);
  },

  createTransaction: async (
    data: CreateTransactionRequest
  ): Promise<Transaction> => {
    return await apiFetch<Transaction>("/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  importTransactionsCSV: async (
    bankCode: "tbc" | "bog",
    file: DocumentPickerAsset
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "text/csv",
    } as any);
    const token = await AsyncStorage.getItem("authToken");
    const response = await fetch(
      `${API_BASE_URL}/transactions/import/csv/${bankCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to import CSV for ${bankCode}`
      );
    }
  },
};

// ============================================================================
// QUERY KEYS
// ============================================================================

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
  },
  transactions: {
    all: ["transactions"] as const,
    lists: () => [...queryKeys.transactions.all, "list"] as const,
    details: () => [...queryKeys.transactions.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.transactions.details(), id] as const,
  },
};
