export interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  limit: number;
  color: string;
}

export interface BudgetData {
  monthlyBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
}

export interface BudgetSummary {
  monthlyBudget: number;
  totalSpent: number;
  remaining: number;
  categories: BudgetCategory[];
}

export interface BudgetSettings {
  monthlyBudget: number;
  categoryLimits: Record<string, number>;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
}

export const DEFAULT_CATEGORY_LIMITS: Record<string, number> = {
  "Food & Dining": 800,
  Groceries: 600,
  Restaurants: 400,
  Transportation: 300,
  Entertainment: 200,
  Utilities: 150,
  Pharmacy: 100,
  Electronics: 200,
  Other: 500,
  Uncategorized: 100,
};

export const DEFAULT_MONTHLY_BUDGET = 3000;
