import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

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

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: "income" | "expense";
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
