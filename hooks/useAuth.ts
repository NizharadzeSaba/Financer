import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authAPI, queryKeys, SignInRequest, SignUpRequest } from "../api";

// ============================================================================
// AUTH STATE HOOK
// ============================================================================

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  // Check for token on mount
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      setHasToken(!!token);
    } catch (error) {
      console.error("Error checking token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hasToken, setHasToken };
};

// ============================================================================
// AUTH HOOKS
// ============================================================================

export const useProfile = (options?: {
  enabled?: boolean;
  retry?: boolean;
}) => {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: authAPI.getProfile,
    retry: options?.retry ?? false,
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInRequest) => authAPI.signIn(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
      queryClient.setQueryData(queryKeys.auth.profile(), data.user);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignUpRequest) => authAPI.signUp(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
      queryClient.setQueryData(queryKeys.auth.profile(), data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      queryClient.clear();
    },
  });
};
