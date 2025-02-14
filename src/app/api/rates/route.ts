import { connectDB } from "@/utils/mongodb";
import ExchangeRate from "@/utils/ExchangeRate";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request
export async function GET() {
  await connectDB();

  try {
    const rates = await ExchangeRate.findOne().sort({
      time_last_update_unix: -1,
    });
    if (!rates)
      return NextResponse.json(
        { message: "No exchange rate data found" },
        { status: 404 }
      );

    return NextResponse.json(rates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();
    const newRate = await ExchangeRate.create(data);
    await newRate.save();

    return NextResponse.json(
      { message: "Exchange rate data inserted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to insert data", error },
      { status: 500 }
    );
  }
}
