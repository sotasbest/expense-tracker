import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "bills", label: "Bills" },
    { value: "entertainment", label: "Entertainment" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    const expense = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    onAddExpense(expense);

    // Reset form
    setFormData({
      name: "",
      amount: "",
      category: "food",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="expense-form">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Groceries, Gas, Netflix"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount (€)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input-field"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
