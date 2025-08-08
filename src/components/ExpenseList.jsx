import { useState } from "react";

function ExpenseList({ expenses, onDeleteExpense }) {
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    { value: "", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "bills", label: "Bills" },
    { value: "entertainment", label: "Entertainment" },
    { value: "other", label: "Other" },
  ];

  // Filter expenses based on date and category
  const filteredExpenses = expenses.filter((expense) => {
    const matchesDate = !filterDate || expense.date === filterDate;
    const matchesCategory =
      !filterCategory || expense.category === filterCategory;
    return matchesDate && matchesCategory;
  });

  // Sort expenses by date (newest first)
  const sortedExpenses = filteredExpenses.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getCategoryColor = (category) => {
    const colors = {
      food: "bg-green-100 text-green-800",
      transport: "bg-blue-100 text-blue-800",
      bills: "bg-red-100 text-red-800",
      entertainment: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.other;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense List</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="filterDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Date
          </label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="filterCategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Category
          </label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear filters button */}
      {(filterDate || filterCategory) && (
        <button
          onClick={() => {
            setFilterDate("");
            setFilterCategory("");
          }}
          className="btn-secondary mb-4"
        >
          Clear Filters
        </button>
      )}

      {/* Expenses List */}
      {sortedExpenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {filterDate || filterCategory
            ? "No expenses match your filters."
            : "No expenses yet. Add your first expense!"}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900">{expense.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      expense.category
                    )}`}
                  >
                    {expense.category.charAt(0).toUpperCase() +
                      expense.category.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(expense.date)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-900">
                  €{expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {sortedExpenses.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Showing {sortedExpenses.length} expense
            {sortedExpenses.length !== 1 ? "s" : ""}
            {filterDate && ` for ${formatDate(filterDate)}`}
            {filterCategory &&
              ` in ${
                categories.find((c) => c.value === filterCategory)?.label
              }`}
          </p>
          <p className="text-lg font-semibold text-blue-900 mt-1">
            Total: €
            {sortedExpenses
              .reduce((sum, expense) => sum + expense.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
