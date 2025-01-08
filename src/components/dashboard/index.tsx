"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";

interface DashboardProps {
  token?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [currencyData, setCurrencyData] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Redirect if token is missing or invalid
  useEffect(() => {
    if (token) {
      // fetch data
      const getInitialData = async () => {
        const response = await fetch("/api/rates");
        const data = await response.json();
        setCurrencyData(JSON.stringify(data, null, 2));
      };
      getInitialData();
    }
  }, [token]);

  if (!token) {
    redirect("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrencyData(e.target.value);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(currencyData || "");
      console.log("Valid JSON:", parsedData);

      const response = await fetch("/api/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: currencyData,
      });

      const result = await response.json();
      setMessage(result.message || "Rates updated successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Invalid JSON. Please correct the format and try again.");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="p-4">
          {message && (
            <p
              className={
                message.includes("Invalid")
                  ? "text-red-800 mb-2"
                  : "text-green-600 mb-2 font-bold"
              }
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="form flex flex-col gap-4">
            <textarea
              name="currencyData"
              value={currencyData || ""}
              onChange={handleChange}
              rows={25}
              cols={60}
              className="textarea"
              placeholder="Paste your JSON here..."
            />
            <button type="submit" className="bg-slate-600 h-12 text-white">
              Update Currency
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
