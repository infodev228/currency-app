// app/api/rates/cron-job.ts
import cron from "node-cron";
import fetch from "node-fetch";

// Function to trigger the update of exchange rates
const updateExchangeRates = async () => {
  try {
    const response = await fetch(
      "www.dollartoinr.in/api/rates?action=update", // Change to your deployed URL
      {
        method: "POST",
      }
    );
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const data: any = await response.json();
    console.log(`[Cron Job]: ${data.message}`); // Log success or error messages
  } catch (error) {
    console.error("[Cron Job]: Failed to update exchange rates:", error);
  }
};

// Trigger the update every hour
cron.schedule("0 */6 * * *", () => {
  console.log("[Cron Job]: Running automatic exchange rate update...");
  updateExchangeRates();
});

// This is required for the serverless function to work
export async function GET() {
  return new Response("Cron job setup is running.", { status: 200 });
}
