import { useState } from "react";

function BudgetSettings({ budgets, onUpdateBudgets }) {
  const [localBudgets, setLocalBudgets] = useState(budgets);

  const budgetCategories = [
    {
      key: "monthly",
      label: "Monthly Budget",
      description: "Total budget for the entire month",
    },
    {
      key: "food",
      label: "Food Budget",
      description: "Budget for groceries, restaurants, etc.",
    },
    {
      key: "transport",
      label: "Transport Budget",
      description: "Budget for gas, public transport, etc.",
    },
    {
      key: "bills",
      label: "Bills Budget",
      description: "Budget for utilities, rent, etc.",
    },
    {
      key: "entertainment",
      label: "Entertainment Budget",
      description: "Budget for movies, games, etc.",
    },
    {
      key: "other",
      label: "Other Budget",
      description: "Budget for miscellaneous expenses",
    },
  ];

  const handleBudgetChange = (key, value) => {
    const newBudgets = {
      ...localBudgets,
      [key]: parseFloat(value) || 0,
    };
    setLocalBudgets(newBudgets);
  };

  const handleSave = () => {
    onUpdateBudgets(localBudgets);
    alert("Budgets saved successfully!");
  };

  const handleReset = () => {
    setLocalBudgets(budgets);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Budget Settings
      </h2>

      <div className="space-y-6">
        {budgetCategories.map((category) => (
          <div key={category.key} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{category.label}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">€</span>
                <input
                  type="number"
                  value={localBudgets[category.key]}
                  onChange={(e) =>
                    handleBudgetChange(category.key, e.target.value)
                  }
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={handleSave} className="btn-primary">
          Save Budgets
        </button>
        <button onClick={handleReset} className="btn-secondary">
          Reset Changes
        </button>
      </div>

      {/* Budget Summary */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Budget Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700">
              Monthly Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.monthly.toFixed(2)}
              </span>
            </p>
            <p className="text-blue-700">
              Food Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.food.toFixed(2)}
              </span>
            </p>
            <p className="text-blue-700">
              Transport Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.transport.toFixed(2)}
              </span>
            </p>
          </div>
          <div>
            <p className="text-blue-700">
              Bills Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.bills.toFixed(2)}
              </span>
            </p>
            <p className="text-blue-700">
              Entertainment Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.entertainment.toFixed(2)}
              </span>
            </p>
            <p className="text-blue-700">
              Other Budget:{" "}
              <span className="font-semibold">
                €{localBudgets.other.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSettings;
