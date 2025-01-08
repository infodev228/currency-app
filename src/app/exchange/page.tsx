"use client";
import Footer from "@/components/footer";
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

  // useEffect(() => {
  //   // Populate currency options from the list
  //   const options: CurrencyOption[] = currency_list.map(([code, name]) => ({
  //     code,
  //     name,
  //   }));
  //   setCurrencyOptions(options);
  //   setIsLoading(false);
  // }, []);

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
    const response = await fetch(
      // `https://v6.exchangerate-api.com/v6/${api}/latest/USD`
      "/api/rates"
    );
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const data = await response.json();
    const fromRate = data.rates[fromCurrency];
    const toRate = data.rates[toCurrency];

    const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);

    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    //     setStatus(
    //  1 ${fromCurrency} = ${(toRate / fromRate).toFixed(2)} ${toCurrency}`
    //     );
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
        1 = {(toRate / fromRate).toFixed(2)}
        <Image
          src={`https://flagsapi.com/${toCurrency.substring(0, 2)}/flat/64.png`}
          alt={`${toCurrency} flag`}
          className="inline-block h-6 w-6 ml-2"
          width={24}
          height={24}
        />
      </>
    );
    // Fetch conversion for AUD to INR
    // const audInrRate =
    //   data.conversion_rates["AUD"] / data.conversion_rates["INR"];
    // const audToInrConversion = (amount * audInrRate).toFixed(2);
    // setAudToInr(`${amount} AUD = ${audToInrConversion} INR`);
  };

  return (
    <div className="items-center justify-items-center min-h-screen sm:pt-16 font-[family-name:var(--font-geist-sans)] flex flex-col max-sm:mt-12">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start box-border p-3 w-96 border-3 bg-white shadow-lg shadow-cyan-500/50 rounded">
        <h1 className="text-3xl font-serif border-b border-black py-5 text-center">
          Realtime Currency Converter
        </h1>

        <input
          type="text"
          className="block min-w-0 w-full border rounded border-black grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          placeholder="$"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
        />
        <div className="flex space-x-4">
          <select
            name=""
            className="w-1/2 border border-gray-300 p-2 rounded"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyOptions.map((option: any) => (
              <option key={option.code} value={option.code}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
          <button onClick={swapCurrencies} className="gap-0">
            <ArrowPathRoundedSquareIcon className="h-6 w-6 text-cyan-800" />
          </button>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-1/2 border border-gray-300 p-2 rounded"
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
        <div className="flex items-center flex-col sm:flex-row w-full">
          <button
            className="w-full bg-cyan-900 rounded text-white h-12 font-semibold font-mono"
            onClick={handleConversion}
          >
            Convert
          </button>
        </div>
        {result && (
          <div className="flex items-center flex-col sm:flex-row w-full mb-1">
            <p className="bg-slate-500 w-full h-12 p-2 text-center text-white flex items-center justify-center rounded font-semibold font-mono ">
              {result}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
