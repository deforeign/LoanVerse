"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function ResetEmail() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(window.location.search).get("token") || "";
        setToken(tokenFromUrl);
    }, []);

    useEffect(() => {
        const isValid = password.length >= 6 && password === confirmPassword;
        setButtonDisabled(!isValid || loading);
    }, [password, confirmPassword, loading]);

    const resetUserPassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await fetch("/api/users/resetemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success("✅ Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                toast.error(data.message || "Invalid or expired reset token.");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (resetSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* ... same background elements ... */}
                <div className="w-full max-w-md z-10">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/20">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                            Success!
                        </h1>
                        <p className="text-emerald-100/90 text-lg mb-8">Your password has been reset successfully!</p>
                        <Link
                            href="/login"
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                        >
                            Go to Login
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <Toaster />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Loanverse animated background */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Floating money elements */}
            <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-400/30 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute bottom-32 right-20 w-20 h-20 bg-green-400/30 rounded-full blur-xl animate-bounce delay-1000"></div>

            <div className="w-full max-w-md z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Loanverse Header */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 via-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white/20">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-3 tracking-tight">
                            New Password
                        </h1>
                        <p className="text-emerald-100/80 text-lg font-medium">Create a secure password</p>
                        <p className="text-gray-300 text-sm mt-1">Minimum 6 characters required</p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); resetUserPassword(); }}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-emerald-100/90 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="Enter new password (min 6 chars)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-emerald-100/90 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={buttonDisabled || loading}
                            className={`group w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden ${
                                buttonDisabled || loading
                                    ? 'bg-gray-700/50 cursor-not-allowed text-gray-400 border border-gray-600'
                                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-2xl hover:scale-[1.02] shadow-lg border border-emerald-400/50 text-white'
                            } focus:outline-none focus:ring-4 focus:ring-emerald-500/30`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {loading ? (
                                <div className="flex items-center justify-center relative z-10">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Resetting Password...
                                </div>
                            ) : (
                                <span className="relative z-10">Reset Password</span>
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-100 font-semibold transition-all duration-300 hover:underline group"
                        >
                            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
                    <p>🔒 Your reset link expires in 1 hour • Passwords are encrypted</p>
                    <p className="text-emerald-400 font-medium">Loanverse - Secure P2P Lending</p>
                </div>
            </div>

            {/* Custom Loanverse Toaster */}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={12}
                containerClassName="mt-16"
                toastOptions={{
                    className: '!bg-gradient-to-r !from-emerald-600/95 !to-green-600/95 !backdrop-blur-xl !border !border-white/20',
                    style: {
                        padding: '16px 20px',
                        color: 'white',
                        fontWeight: '600',
                        minHeight: '64px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        borderRadius: '20px',
                        fontSize: '15px',
                        maxWidth: '420px',
                    },
                    duration: 4500,
                    success: {
                        duration: 4500,
                        iconTheme: { primary: '#fff', secondary: '#10b981' },
                        style: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: { primary: '#fff', secondary: '#ef4444' },
                        style: { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
                    },
                }}
            />
        </div>
    );
}
