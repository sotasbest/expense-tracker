import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Histogram({ expenses }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const formatMonth = (monthString) => {
    const [year, month] = monthString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  // Get expenses for selected month
  const monthExpenses = selectedMonth
    ? expenses.filter((expense) => expense.date.startsWith(selectedMonth))
    : [];

  // Get top 5 expenses for the month
  const topExpenses = monthExpenses
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Prepare chart data
  const chartData = {
    labels: topExpenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Amount (€)",
        data: topExpenses.map((expense) => expense.amount),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          "rgba(16, 185, 129, 0.8)", // green
          "rgba(245, 158, 11, 0.8)", // yellow
          "rgba(239, 68, 68, 0.8)", // red
          "rgba(139, 92, 246, 0.8)", // purple
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Top 5 Expenses - ${
          selectedMonth ? formatMonth(selectedMonth) : "Select a month"
        }`,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `€${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "€" + value.toFixed(2);
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Top 5 Expenses Histogram
      </h2>

      <div className="mb-6">
        <label
          htmlFor="histogramMonthSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Month
        </label>
        <input
          type="month"
          id="histogramMonthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="input-field"
          defaultValue={getCurrentMonth()}
        />
      </div>

      {selectedMonth && (
        <div>
          {monthExpenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No expenses for {formatMonth(selectedMonth)}.
            </div>
          ) : topExpenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No expenses found for {formatMonth(selectedMonth)}.
            </div>
          ) : (
            <div>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Showing top 5 expenses for {formatMonth(selectedMonth)}
                </p>
                <p className="text-lg font-semibold text-blue-900 mt-1">
                  Total: €
                  {monthExpenses
                    .reduce((sum, expense) => sum + expense.amount, 0)
                    .toFixed(2)}
                </p>
              </div>

              {/* Chart Container */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div style={{ height: "400px" }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Expense Details */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">
                  Expense Details:
                </h3>
                <div className="space-y-2">
                  {topExpenses.map((expense, index) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-500">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {expense.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          €{expense.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {expense.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!selectedMonth && (
        <div className="text-center py-8 text-gray-500">
          Please select a month to view the top 5 expenses histogram.
        </div>
      )}
    </div>
  );
}

export default Histogram;
