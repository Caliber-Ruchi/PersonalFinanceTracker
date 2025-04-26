"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!amount || !description || !date) {
      setError("All fields are required!");
      return;
    }

    const newTransaction = { amount: Number(amount), description, date };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      const data = await res.json();
      onAdd(data); // notify parent
      setAmount("");
      setDescription("");
      setDate("");
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
}
