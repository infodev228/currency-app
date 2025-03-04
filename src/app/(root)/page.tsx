"use client";

import { currency_list } from "../../utils/currencyCodes";
import { JSX, useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface CurrencyOption {
  code: string;
  name: string;
}

export default function Exchange() {
  const [currencyOptions] = useState<CurrencyOption[]>(
    currency_list.map(([code, name]) => ({ code, name }))
  );
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<JSX.Element | string>("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleConversion = async () => {
    if (amount < 1 || isNaN(amount)) {
      setResult("Error: Only numeric values greater than 0 are allowed.");
      return;
    }
    const response = await fetch("/api/rates");

    const data = await response.json();
    console.log("resposne", data?.conversion_rates);
    const fromRate = data?.conversion_rates[fromCurrency];
    const toRate = data.conversion_rates[toCurrency];

    const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);

    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    setStatus(
      <>
        <Image
          src={`https://flagsapi.com/${fromCurrency.substring(
            0,
            2
          )}/flat/64.png`}
          alt={`${fromCurrency} flag`}
          className="inline-block h-6 w-6 mr-2"
          width={24}
          height={24}
        />
        1 {fromCurrency} = {(toRate / fromRate).toFixed(2)} {toCurrency}
        <Image
          src={`https://flagsapi.com/${toCurrency.substring(0, 2)}/flat/64.png`}
          alt={`${toCurrency} flag`}
          className="inline-block h-6 w-6 ml-2"
          width={24}
          height={24}
        />
        <div className="mt-2">
          1 {toCurrency} = {(fromRate / toRate).toFixed(4)} {fromCurrency}
        </div>
      </>
    );
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row">
      {/* Left Sidebar */}
      {/* <div className="w-full sm:w-64 bg-gray-800 text-white p-5 sm:block hidden">
        <h2 className="text-xl font-semibold mb-5">Currency Converter</h2>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 items-center justify-items-center font-[family-name:var(--font-geist-sans)] flex flex-col sm:mt-12 overflow-x-hidden">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start box-border p-3 w-full sm:w-[36rem] border-3 bg-white shadow-lg shadow-cyan-500/50 rounded">
          <h1 className="sm:text-5xl text-3xl font-serif border-b border-black py-5 text-center">
            Realtime Currency Converter
          </h1>

          <input
            type="number"
            className="block min-w-0 w-full border rounded border-black py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
            placeholder="Amount"
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full">
            <select
              name=""
              className="w-full sm:w-1/2 border border-gray-300 p-2 rounded"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencyOptions.map((option: any) => (
                <option key={option.code} value={option.code}>
                  {option.code} - {option.name}
                </option>
              ))}
            </select>
            <button
              onClick={swapCurrencies}
              className="mx-auto p-0 flex justify-center items-center"
            >
              <ArrowPathRoundedSquareIcon className="h-6 w-6 text-cyan-800" />
            </button>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full sm:w-1/2 border border-gray-300 p-2 rounded"
            >
              {currencyOptions.map((option: any) => (
                <option key={option.code} value={option.code}>
                  {option.code} - {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full justify-center">
            <p className="text-center font-mono font-semibold text-gray-400">
              {status}
            </p>
          </div>

          {result && (
            <div className="flex items-center flex-col sm:flex-row w-full mb-1">
              <p className="bg-slate-500 w-full h-12 p-2 text-center text-white flex items-center justify-center rounded font-semibold font-mono ">
                {result}
              </p>
            </div>
          )}
          <div className="flex items-center flex-col sm:flex-row w-full">
            <button
              type="button"
              className="w-full bg-cyan-900 rounded text-white h-12 font-semibold font-mono transform transition duration-300 ease-in-out hover:bg-cyan-700 hover:scale-105"
              onClick={handleConversion}
            >
              Convert
            </button>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      {/* <div className="w-full sm:w-64 bg-gray-800 text-white p-5 sm:block hidden">
        <h2 className="text-xl font-semibold mb-5">Helpful Links</h2>
      </div> */}
    </div>
  );
}
