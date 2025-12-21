"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type UserAmount = {
  username: string;
  amount: number;
};

export default function LoanversePoolPage() {
  const router = useRouter();

  const [myAmount, setMyAmount] = useState<string>(""); // string to control display
  const [amountLoading, setAmountLoading] = useState(false);
  const [userAmounts, setUserAmounts] = useState<UserAmount[]>([]);
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [cibilScore, setCibilScore] = useState(0);

  const getAmounts = async () => {
    try {
      const res = await fetch("/api/users/totalamounts", {
        method: "GET",
      });

      if (!res.ok) {
        console.log("Failed to fetch amounts");
        return;
      }

      const data = await res.json();

      const mapped: UserAmount[] = data.users.map((u: any) => ({
        username: u.username,
        amount: u.Amount, // capital A to match your model field
      }));

      setUserAmounts(mapped);
    } catch (error: any) {
      console.log("Error fetching amounts:", error.message);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await fetch("/api/users/me");
      if (!res.ok) return;
      const data = await res.json();
      setCurrentUsername(data.user.username);
      setCibilScore(data.user.Cibil); // assumes `Cibil` field on user
    } catch (err) {
      console.log("Error fetching current user");
    }
  };

  useEffect(() => {
    getAmounts();
    getCurrentUser();
  }, []);

  const handlePostAmount = async () => {
    const amountNumber = Number(myAmount);

    // If CIBIL is 0, user cannot request any amount
    if (cibilScore === 0) {
      toast.error("Your CIBIL score is 0, so you cannot request any amount.");
      return;
    }

    if (!amountNumber) return;

    // CIBIL-based limit logic
    let maxAllowed = 0;
    if (cibilScore > 0 && cibilScore < 500) {
      maxAllowed = 50000;
    } else if (cibilScore >= 500 && cibilScore < 900) {
      maxAllowed = 500000;
    }

    if (maxAllowed > 0 && amountNumber > maxAllowed) {
      toast.error(
        `Based on your CIBIL score (${cibilScore}), you can request up to ₹${maxAllowed.toLocaleString()}.`
      );
      return;
    }

    try {
      setAmountLoading(true);
      const userRes = await fetch("/api/users/me");
      const userData = await userRes.json();

      const res = await fetch("/api/users/amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.user._id,
          amount: amountNumber,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Amount posted successfully.");
        await getAmounts();
      } else {
        toast.error(data.message || "Failed to post amount.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setAmountLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Big welcome centered at top */}
      <div className="absolute top-21 left-0 w-full flex justify-center">
        <h1 className="text-4xl md:text-5xl font-black text-emerald-100 drop-shadow-lg text-center">
          Welcome back{currentUsername ? `, ${currentUsername}` : ""}!
        </h1>
      </div>

      {/* Profile + Logout buttons */}
      <button
        className="absolute top-6 right-30 px-4 py-1.5 rounded-full text-xs font-semibold border border-emerald-300/70 text-emerald-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-emerald-50 transition-colors duration-300"
        onClick={() => {
          router.push("/profile");
        }}
      >
        Profile
      </button>
      <button
        className="absolute top-6 right-8 px-4 py-1.5 rounded-full text-xs font-semibold border border-emerald-300/70 text-emerald-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-emerald-50 transition-colors duration-300"
        onClick={async () => {
          await fetch("/api/users/logout", { method: "GET" });
          router.push("/login");
        }}
      >
        Logout
      </button>

      {/* CENTER CARD */}
      <div className="w-full max-w-xl mt-20 backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Subheading under big welcome */}
        <p className="text-sm text-gray-300 mb-2">
          Loanverse Pool – live total of all requested amounts by users.
        </p>
        <p className="text-xs text-emerald-100 mb-6">
          Your CIBIL score:{" "}
          <span className="font-semibold">{cibilScore}</span>
          {cibilScore === 0 && " – you cannot request any amount."}
          {cibilScore > 0 && cibilScore < 500 && " – you can request up to ₹50,000."}
          {cibilScore >= 500 && cibilScore < 900 && " – you can request up to ₹5,00,000."}
        </p>

        {/* List of usernames + amounts */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">
            List of amounts requested
          </p>

          <div className="space-y-2 max-h-60 overflow-y-auto text-sm text-emerald-100">
            {userAmounts.length === 0 ? (
              <p className="text-gray-400 text-xs">No requests yet.</p>
            ) : (
              userAmounts
                .filter((ua) => ua.amount !== 0)
                .map((ua) => (
                  <p
                    key={ua.username}
                    className="bg-white/5 border border-emerald-400/20 rounded-xl px-4 py-2"
                  >
                    User{" "}
                    <span className="text-emerald-300">{ua.username}</span> has
                    requested amount{" "}
                    <span className="text-emerald-300">₹ {ua.amount}</span>
                  </p>
                ))
            )}
          </div>
        </div>

        {/* Input to post amount */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-emerald-100/90">
            Your required amount
          </label>
          <input
            type="number"
            min={0}
            className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
            placeholder="Enter amount in ₹"
            value={myAmount}
            onChange={(e) => {
              const raw = e.target.value;
              const normalized = raw.replace(/^0+(\d)/, "$1");
              setMyAmount(normalized);
            }}
          />
          <button
            type="button"
            onClick={handlePostAmount}
            disabled={amountLoading || !Number(myAmount) || cibilScore === 0}
            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
              amountLoading || !Number(myAmount) || cibilScore === 0
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg"
            }`}
          >
            {amountLoading ? "Posting..." : "Post amount to pool"}
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          This pool helps lenders see total demand in Loanverse in real time.
        </p>
      </div>
    </div>
  );
}
