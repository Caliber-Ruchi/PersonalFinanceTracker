import connectMongo from "@/app/lib/dbConnect";
import Transaction from "@/app/models/Transaction";

export async function GET() {
  await connectMongo();
  const transactions = await Transaction.find();
  return Response.json(transactions);
}

export async function POST(request) {
  await connectMongo();
  const body = await request.json();
  const transaction = await Transaction.create(body);
  return Response.json(transaction);
}



