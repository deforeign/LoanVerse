"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  async function logout() {
    try {
      const res = await fetch("/api/users/logout");
      const data = await res.json();
      console.log(data.message);
      router.push("/signup");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  }

  async function fetchProfileData() {
    try {
      const res = await fetch("/api/users/me");
      const data = await res.json();

      if (data.error) {
        router.push("/login");
        return;
      }

      setUsername(data.user.username);
      setEmail(data.user.email);
      console.log(data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">
        Hi {username}. This is your profile page. Your email is {email}.
      </h1>

      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
