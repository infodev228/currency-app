"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "admin123") {
      document.cookie = `authToken=secureToken; path=/; max-age=3600`; // Store token in cookies
      router.push("/dashboard");
    } else {
      alert("Invalid password");
    }
  };
  return (
    <div className="flex justify-center m-12 ">
      <div className="bg-slate-300 w-96 p-4 rounded shadow-3xl">
        <h1 className="text-center py-4 font-bold">Adming Panel</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="password"
            className="w-full h-10 rounded p-3"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-3 mt-3 bg-slate-600 rounded text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
