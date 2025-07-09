import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { queryClient } from "../api";
import { useAuthState, useProfile } from "../hooks/useAuth";

function RootLayoutNav() {
  const { isLoading, hasToken } = useAuthState();
  const { data: user, error: profileError } = useProfile({
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (hasToken && profileError) {
        router.replace("/auth/login");
      } else {
        router.replace(user ? "/(app)" : "/auth/login");
      }
    }
  }, [isLoading, hasToken, user, profileError]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 16, color: "#64748b" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}
