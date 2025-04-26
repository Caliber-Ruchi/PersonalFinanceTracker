import connectMongo from "@/app/lib/dbConnect";
import Transaction from "@/app/models/Transaction";

export async function DELETE(request, { params }) {
  await connectMongo();
  
  const { id } = params;

  try {
    await Transaction.findByIdAndDelete(id);
    return Response.json({ message: "Transaction deleted" });
  } catch (error) {
    return Response.json({ error: "Transaction not found" }, { status: 404 });
  }
}
