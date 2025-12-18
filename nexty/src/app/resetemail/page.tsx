"use client";

import Link from "next/link"
import React, {useEffect, useState} from "react";

export default function ResetEmail() {

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState(false);

    const resetUserPassword = async () => {
        try {
            const response = await fetch("/api/users/resetemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, password })
            });
            console.log("Reset response status:", response.status);
            setResetSuccess(true);
            
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        const tokenFromUrl = window.location.search.split("=")[1] || "";
        setToken(tokenFromUrl);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Reset Your Password</h1>
      {resetSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          Your password has been successfully reset! You can now <Link href="/login" className="text-blue-500 underline">login</Link>.
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          There was an error resetting your password. Please try again.
        </div>
      )}
      {!resetSuccess && !error && (
        <div className="flex flex-col items-center">
          <input
            type="password"
            placeholder="Enter your new password"
            className="border border-gray-300 p-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={resetUserPassword}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}