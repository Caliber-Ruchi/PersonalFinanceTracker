export default function TransactionList({ transactions, onDelete }) {
    return (
      <div className="mt-6 space-y-4">
        {transactions.length === 0 && (
          <p className="text-center text-gray-500">No transactions yet.</p>
        )}
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold">{transaction.description}</p>
              <p className="text-sm text-gray-500">{new Date(transaction.date).toDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-green-600">₹{transaction.amount}</p>
              <button
                onClick={() => onDelete(transaction._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  