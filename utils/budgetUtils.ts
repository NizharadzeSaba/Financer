import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BudgetCategory,
  BudgetData,
  BudgetSettings,
  BudgetSummary,
  CategoryExpense,
  DEFAULT_CATEGORY_LIMITS,
  DEFAULT_MONTHLY_BUDGET,
} from "../types/budget";

const BUDGET_SETTINGS_KEY = "budget_settings";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GEL",
  }).format(amount);
};

export const calculateBudgetSummary = (data: BudgetData): BudgetSummary => {
  const remaining = data.monthlyBudget - data.totalSpent;

  return {
    monthlyBudget: data.monthlyBudget,
    totalSpent: data.totalSpent,
    remaining,
    categories: data.categories,
  };
};

export const calculateCategoryProgress = (category: BudgetCategory): number => {
  return Math.min((category.spent / category.limit) * 100, 100);
};

export const getCategoryColor = (category: BudgetCategory): string => {
  return category.spent > category.limit ? "#ef4444" : "#10b981";
};

export const isCategoryOverBudget = (category: BudgetCategory): boolean => {
  return category.spent > category.limit;
};

export const saveBudgetSettings = async (
  settings: BudgetSettings
): Promise<void> => {
  try {
    await AsyncStorage.setItem(BUDGET_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving budget settings:", error);
  }
};

export const loadBudgetSettings = async (): Promise<BudgetSettings> => {
  try {
    const settings = await AsyncStorage.getItem(BUDGET_SETTINGS_KEY);
    if (settings) {
      return JSON.parse(settings);
    }
  } catch (error) {
    console.error("Error loading budget settings:", error);
  }

  return {
    monthlyBudget: DEFAULT_MONTHLY_BUDGET,
    categoryLimits: { ...DEFAULT_CATEGORY_LIMITS },
  };
};

export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    Groceries: "Groceries",
    Restaurants: "Restaurants",
    Transportation: "Transportation",
    Entertainment: "Entertainment",
    Utilities: "Utilities",
    Pharmacy: "Pharmacy",
    Electronics: "Electronics",
    Other: "Other",
    Uncategorized: "Uncategorized",
  };

  return categoryMap[category] || category;
};

export const convertExpensesToBudgetCategories = (
  expenses: CategoryExpense[],
  budgetSettings: BudgetSettings
): BudgetCategory[] => {
  return expenses.map((expense, index) => {
    const displayName = getCategoryDisplayName(expense.category);
    const limit =
      budgetSettings.categoryLimits[displayName] ||
      DEFAULT_CATEGORY_LIMITS[displayName] ||
      100;

    return {
      id: `category-${index}`,
      name: displayName,
      spent: expense.amount,
      limit: limit,
      color: expense.amount > limit ? "#ef4444" : "#10b981",
    };
  });
};

export const createBudgetDataFromStats = (
  totalExpenses: number,
  expensesByCategory: CategoryExpense[],
  budgetSettings: BudgetSettings
): BudgetData => {
  const categories = convertExpensesToBudgetCategories(
    expensesByCategory,
    budgetSettings
  );

  return {
    monthlyBudget: budgetSettings.monthlyBudget,
    totalSpent: totalExpenses,
    categories,
  };
};
