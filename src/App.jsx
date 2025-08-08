import { useState, useEffect } from "react";
// import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BudgetSettings from "./components/BudgetSettings";
import Reports from "./components/Reports";
import Histogram from "./components/Histogram";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved
      ? JSON.parse(saved)
      : {
          monthly: 0,
          food: 0,
          transport: 0,
          bills: 0,
          entertainment: 0,
          other: 0,
        };
  });
  const [activeTab, setActiveTab] = useState("expenses");

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save budgets to localStorage whenever budgets change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateBudgets = (newBudgets) => {
    setBudgets(newBudgets);
  };

  // Calculate totals
  const today = new Date().toISOString().split("T")[0];
  const currentMonth =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0");

  const todayExpenses = expenses.filter((expense) => expense.date === today);
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(currentMonth)
  );

  const todayTotal = todayExpenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <div className="min-h-screen w-[min(90%,1200px)] mx-auto bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Expenses Tracker
        </h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="expense-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Today's Total
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              €{todayTotal.toFixed(2)}
            </p>
          </div>
          <div className="expense-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Monthly Total
            </h3>
            <p className="text-2xl font-bold text-green-600">
              €{monthlyTotal.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "expenses"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Add Expenses
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            View Expenses
          </button>
          <button
            onClick={() => setActiveTab("budgets")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "budgets"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Budgets
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "reports"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("histogram")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "histogram"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Top Expenses
          </button>
        </div>
        {/* Tab Content */}
        <div className="expense-card">
          {activeTab === "expenses" && (
            <ExpenseForm onAddExpense={addExpense} />
          )}
          {activeTab === "list" && (
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          )}
          {activeTab === "budgets" && (
            <BudgetSettings budgets={budgets} onUpdateBudgets={updateBudgets} />
          )}
          {activeTab === "reports" && <Reports expenses={expenses} />}
          {activeTab === "histogram" && <Histogram expenses={expenses} />}
        </div>
      </div>
    </div>
  );
}

export default App;
