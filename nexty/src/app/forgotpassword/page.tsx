"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const isValidEmail = email.length > 5 && email.includes('@');
        setButtonDisabled(!isValidEmail);
    }, [email]);

    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success("✅ Password reset email sent! Check your inbox (including spam folder).");
                setEmail(""); // Clear input on success
            } else if (response.status === 404) {
                toast.error("❌ Email not found. Please check and try again.");
            } else {
                toast.error(data.message || "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            toast.error("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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

            <div className="w-full max-w-sm z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Loanverse Header */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 via-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white/20">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-3 tracking-tight">
                            Reset Password
                        </h1>
                        <p className="text-emerald-100/80 text-lg font-medium">We'll send you a reset link</p>
                        <p className="text-gray-300 text-sm mt-1">Enter your email to receive instructions</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); resetPassword(); }}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-emerald-100/90 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 5.05c.4.28.94.28 1.34 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email Address
                            </label>
                            <div className="relative group">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="your@loanverse.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 5.05c.4.28.94.28 1.34 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                                    Sending Reset Link...
                                </div>
                            ) : (
                                <span className="relative z-10">Send Reset Link</span>
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
                    <p>🔒 Your email is secure • 📧 Check spam folder if needed</p>
                    <p className="text-emerald-400 font-medium">Loanverse - Trusted by 50K+ users</p>
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
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10b981',
                        },
                        style: {
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#ef4444',
                        },
                        style: {
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                        },
                    },
                }}
            />
        </div>
    );
}
