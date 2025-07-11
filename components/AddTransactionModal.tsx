import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useCreateTransaction,
  useTransactionCategories,
} from "../hooks/useTransactions";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddTransactionModal({
  visible,
  onClose,
  onSuccess,
}: AddTransactionModalProps) {
  const createTransaction = useCreateTransaction();
  const { data: categories } = useTransactionCategories();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  useEffect(() => {
    if (categories) {
      setCategoryItems(
        categories.map((cat) => ({ label: cat.name, value: cat.id }))
      );
    }
  }, [categories]);

  useEffect(() => {
    if (categories && categories.length > 0 && categoryId === null) {
      const other = categories.find((cat) => cat.name === "Other");
      if (other) setCategoryId(other.id);
    }
  }, [categories, categoryId]);

  const handleAddTransaction = () => {
    if (!amount || !type || !categoryId) return;

    createTransaction.mutate(
      {
        paidOut: type === "expense" ? parseFloat(amount) : 0,
        paidIn: type === "income" ? parseFloat(amount) : 0,
        description: "Manual Entry",
        category: String(categoryId),
        type,
        date: "2025-04-30",
        balance: 0,
      },
      {
        onSuccess: () => {
          setAmount("");
          setType("expense");
          setCategoryId(null);
          onClose();
          onSuccess?.();
        },
      }
    );
  };

  const resetForm = () => {
    setAmount("");
    setType("expense");
    setCategoryId(null);
    setOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isLoading = createTransaction.status === "pending";
  const isFormValid = amount && type && categoryId;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 28,
            width: "100%",
            maxWidth: 340,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <View style={{ marginBottom: 24, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: 4,
              }}
            >
              Add Transaction
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              Record a new income or expense
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Amount
            </Text>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={{
                borderWidth: 2,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                padding: 16,
                fontSize: 18,
                fontWeight: "600",
                backgroundColor: "#f9fafb",
                color: "#1f2937",
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Type
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: type === "expense" ? "#ef4444" : "#f3f4f6",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: type === "expense" ? "#ef4444" : "#e5e7eb",
                }}
                onPress={() => setType("expense")}
              >
                <Text
                  style={{
                    color: type === "expense" ? "#ffffff" : "#6b7280",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: type === "income" ? "#10b981" : "#f3f4f6",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: type === "income" ? "#10b981" : "#e5e7eb",
                }}
                onPress={() => setType("income")}
              >
                <Text
                  style={{
                    color: type === "income" ? "#ffffff" : "#6b7280",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 28 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Category
            </Text>
            <DropDownPicker
              open={open}
              value={categoryId}
              items={categoryItems}
              setOpen={setOpen}
              setValue={(v) => setCategoryId(v)}
              setItems={setCategoryItems}
              searchable={false}
              placeholder="Select category"
              style={{
                borderWidth: 2,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                backgroundColor: "#f9fafb",
                paddingHorizontal: 16,
                paddingVertical: 12,
                minHeight: 48,
              }}
              dropDownContainerStyle={{
                borderWidth: 2,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                backgroundColor: "#ffffff",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}
              textStyle={{
                fontSize: 14,
                color: "#374151",
              }}
              placeholderStyle={{
                color: "#9ca3af",
              }}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "#e5e7eb",
                justifyContent: "center",
              }}
              disabled={isLoading}
            >
              <Text
                style={{
                  color: "#6b7280",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddTransaction}
              style={{
                flex: 1,
                backgroundColor: isFormValid ? "#3b82f6" : "#d1d5db",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 12,
                shadowColor: isFormValid ? "#3b82f6" : "transparent",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
                justifyContent: "center",
              }}
              disabled={!isFormValid || isLoading}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {isLoading ? "Adding..." : "Add Transaction"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
