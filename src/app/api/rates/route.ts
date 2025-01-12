import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("data/exchangeRates.json");

// Fetch exchange rates from API
async function fetchExchangeRates() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`);
  }
  return response.json();
}

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));
    return new Response(
      JSON.stringify({ message: "Currency JSON updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Failed to update currency JSON" }),
      {
        status: 500,
      }
    );
  }
}
