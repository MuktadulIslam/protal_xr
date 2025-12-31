import { motion } from "framer-motion";
import Lottie from 'lottie-react';
import { HiSparkles } from 'react-icons/hi2';
import virtualRealityAnimation from '../../../../public/animations/virtualReality.json';
import Image from 'next/image';

export default function PortalBranding() {
    return (
        <div className="hidden lg:flex lg:flex-1 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
            {/* Animated background blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-15"
            />

            <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 pb-5 pt-12">
                {/* Main Animation Container */}
                <div className="w-full max-h-200 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-xl mx-auto relative h-full flex items-center justify-center"
                    >
                        {/* Central VR Animation */}
                        <div className="relative w-full">
                            <Lottie
                                animationData={virtualRealityAnimation}
                                loop={true}
                                className="w-full h-auto max-h-200"
                                style={{ transform: 'scale(1.2)' }}
                            />
                        </div>

                        {/* Floating Feature Cards */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-emerald-200/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                                    <HiSparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">AI Powered</p>
                                    <p className="text-xs text-gray-600">Smart Scenarios</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute -bottom-4 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-cyan-200/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">Fast & Easy</p>
                                    <p className="text-xs text-gray-600">No-Code Builder</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute top-1/2 -left-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-purple-200/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">Reliable</p>
                                    <p className="text-xs text-gray-600">99.9% Uptime</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Tagline with particles effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center relative w-full max-w-md"
                >
                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.4
                            }}
                            className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: -20,
                            }}
                        />
                    ))}

                    <h2 className="text-4xl font-bold flex items-center justify-center gap-2 text-gray-900 mb-4">
                        <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Welcome to
                        </span>
                        <Image
                            src="/logo/craftxr-ryan.png"
                            alt="CraftXR"
                            width={220}
                            height={66}
                            className="h-14 w-auto mt-2"
                        />
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">
                        Build immersive VR training experiences without writing a single line of code
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">10+</p>
                            <p className="text-xs text-gray-600">Scenarios</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">200+</p>
                            <p className="text-xs text-gray-600">Users</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">95%</p>
                            <p className="text-xs text-gray-600">Satisfaction</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}