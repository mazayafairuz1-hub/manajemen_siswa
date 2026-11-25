'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    ArrowLeft,
    Check,
    Eye,
    EyeOff,
    Key,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

export default function HomePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert("Please accept the terms and conditions.");
            return;
        }

        if (!formData.password || formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        console.log("Registration submitted successfully.");
        router.push("/auth/login");
    };

    const getPasswordStrength = (password: string) => {
        if (password.length >= 12) return { text: "strong", color: "text-green-600" };
        if (password.length >= 8) return { text: "medium", color: "text-yellow-600" };
        if (password.length <= 6) return { text: "weak", color: "text-red-600" };
        return { text: "", color: "" };
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const passwordsMatch =
        formData.confirmPassword.length > 0 &&
        formData.password === formData.confirmPassword;
    const isFormValid =
        acceptedTerms &&
        formData.password.length > 0 &&
        formData.password === formData.confirmPassword;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-3xl" />
                    <div className="relative z-10">
                        <a
                            href="/auth/login"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </a>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <User className="w-15 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-600">
                                Join us today! It takes only a few steps.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Full Name"
                                        autoComplete="name"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-11 pr-12 text-gray-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <Lock className="h-4 w-4" />
                                            Password strength
                                        </span>
                                        <span className={passwordStrength.color}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-11 pr-12 text-gray-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {formData.confirmPassword && (
                                    <p
                                        className={`mt-2 text-sm ${
                                            passwordsMatch ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {passwordsMatch
                                            ? "Passwords match"
                                            : "Passwords do not match"}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Create Account
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/auth/login"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Log in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
