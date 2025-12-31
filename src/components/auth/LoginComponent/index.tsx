// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiLockClosed, HiUser } from 'react-icons/hi2';
import PortalBranding from './PortalBranding';

export default function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your login logic here
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen flex overflow-hidden">
            {/* Left Side - Branding & Animation */}
            <PortalBranding />

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-175 flex items-center justify-center p-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Image
                            src="/logo/craftxr-ryan.png"
                            alt="CraftXR"
                            width={180}
                            height={54}
                            className="h-12 w-auto mx-auto"
                        />
                    </div>

                    {/* Form Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            Sign in to your account
                        </h1>
                        <p className="text-gray-600">
                            Enter your credentials to access the platform
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 px-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </motion.button>

                        {/* Terms & Privacy */}
                        <p className="text-xs text-gray-500 text-center">
                            By continuing, you agree to CraftXR's{' '}
                            <Link href="/terms" className="text-cyan-600 hover:text-cyan-700 font-medium underline">
                                Consumer Terms
                            </Link>{' '}
                            and{' '}
                            <Link href="/usage-policy" className="text-cyan-600 hover:text-cyan-700 font-medium underline">
                                Usage Policy
                            </Link>
                            , and acknowledge their{' '}
                            <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700 font-medium underline">
                                Privacy Policy
                            </Link>
                            .
                        </p>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                            </div>
                        </div>

                        {/* SSO Button */}
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 px-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            Continue with SSO
                        </motion.button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 font-semibold">
                                Contact With Admin
                            </Link>
                        </p>
                    </form>

                    {/* Security Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-500"
                    >
                        <HiLockClosed className="w-4 h-4" />
                        <span>Secured by CraftXR. Your data is safe with us.</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}