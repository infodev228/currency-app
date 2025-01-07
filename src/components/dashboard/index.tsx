"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
const filePath = path.resolve("data/exchangeRates.json");
interface DashboardProps {
  token?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [currencyData, setCurrencyData] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Redirect if token is missing or invalid
  if (!token) {
    redirect("/login");
    return null; // Ensure no content is rendered while redirecting
  }

  useEffect(() => {
    // const initialData = {
    //   result: "success",
    //   documentation: "https://www.exchangerate-api.com/docs",
    //   terms_of_use: "https://www.exchangerate-api.com/terms",
    //   time_last_update_unix: 1736121602,
    //   time_last_update_utc: "Mon, 06 Jan 2025 00:00:02 +0000",
    //   time_next_update_unix: 1736208002,
    //   time_next_update_utc: "Tue, 07 Jan 2025 00:00:02 +0000",
    //   base_code: "USD",
    //   conversion_rates: {
    //     USD: 1,
    //     AED: 3.6725,
    //     AFN: 70.5958,
    //     ALL: 94.53,
    //     AMD: 396.8285,
    //     ANG: 1.79,
    //     AOA: 919.1376,
    //     ARS: 1034.75,
    //     AUD: 1.6073,
    //     AWG: 1.79,
    //     AZN: 1.7001,
    //     BAM: 1.8984,
    //     BBD: 2.0,
    //     BDT: 121.2685,
    //     BGN: 1.8984,
    //     BHD: 0.376,
    //     BIF: 2965.5641,
    //     BMD: 1.0,
    //     BND: 1.3706,
    //     BOB: 6.9237,
    //     BRL: 6.1605,
    //     BSD: 1.0,
    //     BTN: 85.9247,
    //     BWP: 13.9365,
    //     BYN: 3.3051,
    //     BZD: 2.0,
    //     CAD: 1.4439,
    //     CDF: 2852.5153,
    //     CHF: 0.9092,
    //     CLP: 1010.3271,
    //     CNY: 7.3507,
    //     COP: 4363.4688,
    //     CRC: 509.3955,
    //     CUP: 24.0,
    //     CVE: 107.0278,
    //     CZK: 24.4113,
    //     DJF: 177.721,
    //     DKK: 7.2403,
    //     DOP: 61.1906,
    //     DZD: 135.8461,
    //     EGP: 50.7303,
    //     ERN: 15.0,
    //     ETB: 126.3639,
    //     EUR: 0.9706,
    //     FJD: 2.3262,
    //     FKP: 0.8048,
    //     FOK: 7.2415,
    //     GBP: 0.8047,
    //     GEL: 2.8151,
    //     GGP: 0.8048,
    //     GHS: 14.7608,
    //     GIP: 0.8048,
    //     GMD: 72.5495,
    //     GNF: 8582.5587,
    //     GTQ: 7.7127,
    //     GYD: 209.2613,
    //     HKD: 7.7786,
    //     HNL: 25.4072,
    //     HRK: 7.3133,
    //     HTG: 130.6356,
    //     HUF: 402.9962,
    //     IDR: 16216.735,
    //     ILS: 3.6517,
    //     IMP: 0.8048,
    //     INR: 85.8725,
    //     IQD: 1312.4805,
    //     IRR: 41987.0361,
    //     ISK: 139.8008,
    //     JEP: 0.8048,
    //     JMD: 156.055,
    //     JOD: 0.709,
    //     JPY: 157.3548,
    //     KES: 129.27,
    //     KGS: 87.0229,
    //     KHR: 4057.1278,
    //     KID: 1.6085,
    //     KMF: 477.5244,
    //     KRW: 1468.1079,
    //     KWD: 0.3084,
    //     KYD: 0.8333,
    //     KZT: 525.1827,
    //     LAK: 21931.0611,
    //     LBP: 89500.0,
    //     LKR: 293.3505,
    //     LRD: 184.8178,
    //     LSL: 18.7629,
    //     LYD: 4.9148,
    //     MAD: 10.0785,
    //     MDL: 18.4356,
    //     MGA: 4677.9488,
    //     MKD: 59.6479,
    //     MMK: 2097.9317,
    //     MNT: 3420.9628,
    //     MOP: 8.0121,
    //     MRU: 40.006,
    //     MUR: 47.4448,
    //     MVR: 15.4454,
    //     MWK: 1735.6581,
    //     MXN: 20.6398,
    //     MYR: 4.4994,
    //     MZN: 63.686,
    //     NAD: 18.7629,
    //     NGN: 1534.5253,
    //     NIO: 36.7836,
    //     NOK: 11.3647,
    //     NPR: 137.4795,
    //     NZD: 1.7812,
    //     OMR: 0.3845,
    //     PAB: 1.0,
    //     PEN: 3.761,
    //     PGK: 4.0151,
    //     PHP: 58.1357,
    //     PKR: 278.5181,
    //     PLN: 4.1407,
    //     PYG: 7865.2511,
    //     QAR: 3.64,
    //     RON: 4.8303,
    //     RSD: 113.6517,
    //     RUB: 110.5632,
    //     RWF: 1413.6227,
    //     SAR: 3.75,
    //     SBD: 8.5293,
    //     SCR: 14.3062,
    //     SDG: 454.2623,
    //     SEK: 11.1143,
    //     SGD: 1.3706,
    //     SHP: 0.8048,
    //     SLE: 22.9188,
    //     SLL: 22918.8259,
    //     SOS: 571.238,
    //     SRD: 35.1721,
    //     SSP: 3898.3893,
    //     STN: 23.7807,
    //     SYP: 12921.3827,
    //     SZL: 18.7629,
    //     THB: 34.448,
    //     TJS: 10.9303,
    //     TMT: 3.5001,
    //     TND: 3.2094,
    //     TOP: 2.3872,
    //     TRY: 35.3761,
    //     TTD: 6.7764,
    //     TVD: 1.6085,
    //     TWD: 32.9476,
    //     TZS: 2451.2217,
    //     UAH: 42.1389,
    //     UGX: 3673.0531,
    //     UYU: 44.0723,
    //     UZS: 12915.887,
    //     VES: 53.012,
    //     VND: 25438.2748,
    //     VUV: 118.8198,
    //     WST: 2.819,
    //     XAF: 636.6992,
    //     XCD: 2.7,
    //     XDR: 0.7708,
    //     XOF: 636.6992,
    //     XPF: 115.8286,
    //     YER: 249.5414,
    //     ZAR: 18.7643,
    //     ZMW: 27.9546,
    //     ZWL: 25.8226,
    //   },
    // };
    const getIntialData = async () => {
      const response = await fetch("/api/rates");
      const data = await response.json();
      setCurrencyData(JSON.stringify(data, null, 2));
    };

    getIntialData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrencyData(JSON.stringify(e.target.value, null, 2));
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
