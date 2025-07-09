import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { queryClient } from "../api";
import { useAuthState } from "../hooks/useAuth";

export default function RootLayout() {
  const { hasToken } = useAuthState();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={hasToken}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
