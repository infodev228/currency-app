// app/api/cronJob/route.ts

export const config = {
  runtime: "edge", // Required for scheduled functions
};

export default async function handler(req: Request) {
  try {
    // Example: You can fetch and update exchange rates or perform any task here.
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    console.log("Cron Job executed:", data);

    return new Response("Cron job executed successfully.", { status: 200 });
  } catch (error) {
    console.error("Error executing cron job:", error);
    return new Response("Failed to execute cron job.", { status: 500 });
  }
}
