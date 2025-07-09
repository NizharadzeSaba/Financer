import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useProfile } from "../../hooks/useAuth";

export default function Dashboard() {
  const { data: user } = useProfile();

  return (
    <ScrollView style={{ flex: 1 }}>
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
          Welcome back, {user?.name}!
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          Here&apos;s your financial overview
        </Text>
      </View>

      <View style={{ flexDirection: "row", padding: 20, gap: 12 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 4,
            }}
          >
            Total Balance
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: 4,
            }}
          >
            $12,450.00
          </Text>
          <Text style={{ fontSize: 12, color: "#10b981" }}>
            +$1,250.00 this month
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 4,
            }}
          >
            Monthly Spending
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: 4,
            }}
          >
            $3,200.00
          </Text>
          <Text style={{ fontSize: 12, color: "#10b981" }}>
            $800.00 remaining
          </Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          Recent Transactions
        </Text>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#f3f4f6",
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
              <Text style={{ fontSize: 14, color: "#6b7280" }}>
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
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#f3f4f6",
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
              <Text style={{ fontSize: 14, color: "#6b7280" }}>
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
              padding: 16,
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
              <Text style={{ fontSize: 14, color: "#6b7280" }}>
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
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          Quick Actions
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              padding: 12,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Add Transaction
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              padding: 12,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Set Budget
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              padding: 12,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              View Reports
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
