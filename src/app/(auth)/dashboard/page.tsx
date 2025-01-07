import Dashboard from "@/components/dashboard";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;

  return <Dashboard token={token} />;
}
