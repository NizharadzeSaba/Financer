import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Budget() {
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
          Budget
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          Track your spending and set limits
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            Monthly Budget
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: 8,
            }}
          >
            $4,000.00
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#6b7280",
              marginBottom: 12,
            }}
          >
            $3,200.00 spent
          </Text>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#10b981",
                borderRadius: 4,
                width: "80%",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "#10b981",
              fontWeight: "600",
            }}
          >
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
          Budget Categories
        </Text>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              Food & Dining
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              $850 / $1,000
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#10b981",
                borderRadius: 4,
                width: "85%",
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              Transportation
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              $300 / $400
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#10b981",
                borderRadius: 4,
                width: "75%",
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              Shopping
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              $600 / $500
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#ef4444",
                borderRadius: 4,
                width: "120%",
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              Entertainment
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              $200 / $300
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#10b981",
                borderRadius: 4,
                width: "67%",
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#1e293b",
              }}
            >
              Utilities
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              $250 / $250
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#f3f4f6",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "#10b981",
                borderRadius: 4,
                width: "100%",
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
