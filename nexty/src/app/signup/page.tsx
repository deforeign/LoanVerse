"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success("Welcome to Loanverse! Account created successfully!");
                router.push('/login');
            } else if (response.status === 400) {
                // User already exists
                toast.error(data.message || "User already exists. Please login or use different credentials.");
            } else if (response.status === 400) {
                // Validation errors
                toast.error(data.message || "Please check your input and try again.");
            } else {
                toast.error(data.message || "Signup failed. Please try again.");
            }
        } catch (error: any) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const isComplete = user.username.length > 2 && 
                          user.email.length > 5 && 
                          user.password.length >= 6;
        setButtonDisabled(!isComplete);
        
        // Password strength indicator
        if (user.password.length >= 6) {
            setPasswordStrength("strong");
        } else if (user.password.length > 0) {
            setPasswordStrength("weak");
        } else {
            setPasswordStrength("");
        }
    }, [user]);

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
                        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 via-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/20">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-blue-500 bg-clip-text text-transparent mb-3 tracking-tight">
                            Loanverse
                        </h1>
                        <p className="text-emerald-100/80 text-lg font-medium">Join the P2P lending revolution</p>
                        <p className="text-gray-300 text-sm mt-1">Connect borrowers & lenders seamlessly</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSignup(); }}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-emerald-100/90 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Username (min 3 chars)
                            </label>
                            <div className="relative group">
                                <input
                                    id="username"
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="Choose your Loanverse username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

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
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="your@email.com"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 5.05c.4.28.94.28 1.34 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-emerald-100/90 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Password
                            </label>
                            <p className="text-xs text-gray-400 mb-3">Minimum 6 characters required</p>
                            <div className="relative group">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:border-emerald-400/50"
                                    placeholder="Create a secure password (min 6 chars)"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Password strength indicator */}
                            {passwordStrength && (
                                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-300 ${
                                            passwordStrength === 'strong' 
                                                ? 'bg-emerald-500 w-full' 
                                                : 'bg-orange-500 w-1/2'
                                        }`}
                                    />
                                </div>
                            )}
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
                                    Creating Account...
                                </div>
                            ) : (
                                <span className="relative z-10">Join Loanverse Now</span>
                            )}
                        </button>
                    </form>

                    {/* Login link */}
                    <div className="mt-10 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-400 text-sm mb-4">Already registered on Loanverse?</p>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-100 font-semibold transition-all duration-300 hover:underline group"
                        >
                            Sign in to your account
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-6 text-center text-xs text-gray-400 space-y-2">
                    <p>🔒 SSL Secured • 💳 PCI Compliant • 📱 Mobile Ready</p>
                    <p className="text-emerald-400 font-medium">Join 50K+ lenders & borrowers</p>
                </div>
            </div>
        </div>
    );
}
