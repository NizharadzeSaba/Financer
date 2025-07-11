import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface QuickActionButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const QuickActionButton = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
}: QuickActionButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: "#3b82f6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled || isLoading ? 0.6 : 1,
      }}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 13,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
