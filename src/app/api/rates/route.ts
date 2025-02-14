import { sql } from "@vercel/postgres";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Example query: Fetch exchange rates from your database
    const { rows } = await sql`SELECT * FROM exchange_rates`;

    // Convert database rows to object format
    const conversionRates = rows.reduce((acc, row) => {
      acc[row.currency] = row.rate;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      result: "success",
      documentation: "https://www.exchangerate-api.com/docs",
      terms_of_use: "https://www.exchangerate-api.com/terms",
      time_last_update_unix: Math.floor(Date.now() / 1000),
      time_last_update_utc: new Date().toUTCString(),
      time_next_update_unix: Math.floor(Date.now() / 1000) + 86400, // Next day update
      time_next_update_utc: new Date(Date.now() + 86400000).toUTCString(),
      base_code: "USD",
      conversion_rates: conversionRates,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get JSON data from request body

    if (!body.conversion_rates) {
      return NextResponse.json(
        { error: "Invalid input: Missing conversion_rates" },
        { status: 400 }
      );
    }

    // Prepare bulk insert query
    const entries = Object.entries(body.conversion_rates);
    for (const [currency, rate] of entries) {
      await sql`
        INSERT INTO exchange_rates (currency, rate)
        VALUES (${currency}, ${Number(rate)})
        ON CONFLICT (currency) 
        DO UPDATE SET rate = EXCLUDED.rate;
      `;
    }

    return NextResponse.json({
      result: "success",
      message: "Exchange rates inserted/updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to insert exchange rates" },
      { status: 500 }
    );
  }
}
