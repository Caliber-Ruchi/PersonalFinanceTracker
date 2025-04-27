import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Health", "Bills", "Other"],
    default: "Other",
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;

