"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, ResponsiveContainer } from "recharts";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions on load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Add new transaction to UI
  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Delete transaction
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTransactions((prev) => prev.filter((tx) => tx._id !== id));
      }
    } catch (err) {
      console.error("Error deleting transaction", err);
    }
  };

  // Group data by month for Bar Chart
  const groupedData = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    const existingMonth = acc.find((item) => item.month === month);

    if (existingMonth) {
      existingMonth.amount += tx.amount;
    } else {
      acc.push({ month, amount: tx.amount });
    }

    return acc;
  }, []);

  // Categories for Pie Chart
  const categories = ["Food", "Travel", "Shopping", "Health", "Bills", "Other"];

  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryData = categories.map((cat) => {
    const total = transactions
      .filter((tx) => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return { category: cat, amount: total };
  });

  const topCategory = categoryData.sort((a, b) => b.amount - a.amount)[0]?.category || "None";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Personal Finance Tracker</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Top Category</h3>
          <p className="text-lg font-semibold">{topCategory}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Transactions</h3>
          <p className="text-lg font-semibold">{transactions.length}</p>
        </div>
      </div>

      {/* Transaction Form */}
      <TransactionForm onAdd={handleAddTransaction} />

      {/* Transaction List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        )}
      </div>

      {/* Monthly Expenses Bar Chart */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Category-wise Pie Chart */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Category-wise Expenses</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

