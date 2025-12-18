"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { send } from "process";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

export default function LoginPage() {
    const router = useRouter();

   const [email,setEmail] = React.useState("");

    const [loading,setLoading] = React.useState(false);
    const [buttonDisabled,setButtonDisabled] = React.useState(true);

    useEffect(() => {
        if(email.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }

    }, [email]);

    const resetPassword = async () => {
      try {
          setLoading(true);
          const response = await fetch('/api/users/forgot-password', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({email}),
          });

          const data = await response.json();
          console.log(response.status);

          if (response.status === 200) {
              console.log("Password reset email sent");
              console.log(data);
              toast.success("Password reset email sent successfully. Please check your inbox.");
          } else {
              console.log(data.message);
              alert(data.message);
          }
        } 
        catch (error: any) {
        console.log("An unexpected error occurred:", error);
         toast.error("An unexpected error occurred . Please try again.", error.message);
      } finally {
        setLoading(false);
      }

    }
    
   const forgotPassword = async () => {
       router.push('/forgotpassword');
   };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Forgot Your Password?</h1>
      <div className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={resetPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}