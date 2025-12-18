"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function VerifyEmail() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(window.location.search).get("token") || "";
        setToken(tokenFromUrl);
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        } else {
            setError("Invalid verification link");
            setLoading(false);
        }
    }, [token]);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/users/verifyemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success("✅ Email verified successfully! Redirecting to login...");
                setVerified(true);
                setTimeout(() => {
                    router.push("/login");
                }, 2500);
            } else {
                setError(data.message || "Verification failed. The link may be invalid or expired.");
            }
        } catch (error: any) {
            setError("Something went wrong. Please try again or request a new verification email.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Loanverse animated background */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                <div className="w-full max-w-md z-10">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/20 animate-pulse">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
                            Verifying Email
                        </h1>
                        <p className="text-emerald-100/80 text-lg mb-2">Please wait while we verify your email...</p>
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <svg className="animate-spin h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing verification</span>
                        </div>
                    </div>
                </div>

                <Toaster />
            </div>
        );
    }

    if (verified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="w-full max-w-md z-10">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/20">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
                            Email Verified!
                        </h1>
                        <p className="text-emerald-100/90 text-xl mb-8 font-semibold">Your email has been successfully verified!</p>
                        <div className="space-y-4">
                            <Link
                                href="/login"
                                className="block w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Go to Login
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <p className="text-gray-400 text-sm">Redirecting in 3 seconds...</p>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        <p>✅ Welcome to Loanverse - Your P2P lending journey begins!</p>
                    </div>
                </div>

                <Toaster />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-white/20">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth={2} />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} />
                            <path d="M17.657 16.657L13.414 20.9a1.5 1.5 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeWidth={2} />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-rose-400 via-red-400 to-rose-500 bg-clip-text text-transparent mb-6 tracking-tight">
                        Verification Failed
                    </h1>
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-6 rounded-2xl backdrop-blur-sm mb-8">
                        <p className="font-semibold mb-2">{error}</p>
                        <p className="text-sm opacity-90">The verification link may be invalid or expired.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <Link
                            href="/login"
                            className="block w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Return to Login
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/signup"
                            className="block w-full text-center text-emerald-300 hover:text-emerald-100 font-semibold transition-all duration-300 py-3 px-4 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/10"
                        >
                            Resend Verification Email
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    <p>🔒 Loanverse keeps your account secure</p>
                </div>
            </div>

            <Toaster
                position="top-right"
                toastOptions={{
                    className: '!bg-gradient-to-r !from-emerald-600/95 !to-green-600/95 !backdrop-blur-xl',
                    style: {
                        padding: '16px 20px',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    },
                }}
            />
        </div>
    );
}
