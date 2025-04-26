"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList"; // <-- new import

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

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Personal Finance Tracker</h1>

      <TransactionForm onAdd={handleAddTransaction} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
