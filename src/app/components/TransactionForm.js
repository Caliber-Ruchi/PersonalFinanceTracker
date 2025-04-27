"use client";

import { useState } from "react";

const categories = ["Food", "Travel", "Shopping", "Health", "Bills", "Other"];

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date || !category) {
      alert("Please fill all fields!");
      return;
    }

    const newTransaction = { description, amount, date, category };

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    const data = await res.json();
    onAdd(data);

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input
        type="text"
        className="w-full border p-2 rounded-md"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        className="w-full border p-2 rounded-md"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full border p-2 rounded-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="w-full border p-2 rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
        Add Transaction
      </button>
    </form>
  );
}
