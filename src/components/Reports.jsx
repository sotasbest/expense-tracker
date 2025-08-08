import { useState } from "react";

function Reports({ expenses }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatMonth = (monthString) => {
    const [year, month] = monthString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  // Get expenses for selected date
  const dayExpenses = selectedDate
    ? expenses.filter((expense) => expense.date === selectedDate)
    : [];

  // Get expenses for selected month
  const monthExpenses = selectedMonth
    ? expenses.filter((expense) => expense.date.startsWith(selectedMonth))
    : [];

  // Calculate category totals
  const calculateCategoryTotals = (expenseList) => {
    const totals = {};
    expenseList.forEach((expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;
    });
    return totals;
  };

  const dayCategoryTotals = calculateCategoryTotals(dayExpenses);
  const monthCategoryTotals = calculateCategoryTotals(monthExpenses);

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

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Expense Reports
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Report */}
        <div className="expense-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daily Report
          </h3>

          <div className="mb-4">
            <label
              htmlFor="daySelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Date
            </label>
            <input
              type="date"
              id="daySelect"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
            />
          </div>

          {selectedDate && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">
                Report for {formatDate(selectedDate)}
              </h4>

              {dayExpenses.length === 0 ? (
                <p className="text-gray-500">No expenses for this date.</p>
              ) : (
                <div>
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      Total: €
                      {dayExpenses
                        .reduce((sum, expense) => sum + expense.amount, 0)
                        .toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {dayExpenses.length} expense
                      {dayExpenses.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Category breakdown */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">
                      By Category:
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(dayCategoryTotals).map(
                        ([category, total]) => (
                          <div
                            key={category}
                            className="flex justify-between items-center"
                          >
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                category
                              )}`}
                            >
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </span>
                            <span className="font-medium">
                              €{total.toFixed(2)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Expense list */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">
                      Expenses:
                    </h5>
                    <div className="space-y-2">
                      {dayExpenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>{expense.name}</span>
                          <span className="font-medium">
                            €{expense.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Monthly Report */}
        <div className="expense-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Report
          </h3>

          <div className="mb-4">
            <label
              htmlFor="monthSelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Month
            </label>
            <input
              type="month"
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input-field"
              defaultValue={getCurrentMonth()}
            />
          </div>

          {selectedMonth && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">
                Report for {formatMonth(selectedMonth)}
              </h4>

              {monthExpenses.length === 0 ? (
                <p className="text-gray-500">No expenses for this month.</p>
              ) : (
                <div>
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      Total: €
                      {monthExpenses
                        .reduce((sum, expense) => sum + expense.amount, 0)
                        .toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {monthExpenses.length} expense
                      {monthExpenses.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Category breakdown */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">
                      By Category:
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(monthCategoryTotals).map(
                        ([category, total]) => (
                          <div
                            key={category}
                            className="flex justify-between items-center"
                          >
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                category
                              )}`}
                            >
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </span>
                            <span className="font-medium">
                              €{total.toFixed(2)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Top 5 expenses */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">
                      Top 5 Expenses:
                    </h5>
                    <div className="space-y-2">
                      {monthExpenses
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 5)
                        .map((expense, index) => (
                          <div
                            key={expense.id}
                            className="flex justify-between items-center text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">
                                #{index + 1}
                              </span>
                              <span>{expense.name}</span>
                              <span
                                className={`px-1 py-0.5 rounded text-xs ${getCategoryColor(
                                  expense.category
                                )}`}
                              >
                                {expense.category}
                              </span>
                            </div>
                            <span className="font-medium">
                              €{expense.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
