import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Transactions() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1e293b",
            marginBottom: 4,
          }}
        >
          Transactions
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          View and manage your transactions
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Grocery Store
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Food & Dining
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>
              Today, 2:30 PM
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ef4444",
            }}
          >
            -$85.50
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Salary Deposit
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Income
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>
              Yesterday, 9:00 AM
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#10b981",
            }}
          >
            +$3,500.00
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Coffee Shop
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Food & Dining
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>
              Yesterday, 8:15 AM
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ef4444",
            }}
          >
            -$4.75
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Gas Station
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Transportation
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>2 days ago</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ef4444",
            }}
          >
            -$45.00
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Online Shopping
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Shopping
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>3 days ago</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ef4444",
            }}
          >
            -$120.00
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
