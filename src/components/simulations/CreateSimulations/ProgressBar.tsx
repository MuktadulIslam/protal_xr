'use client';

import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi2';

interface Step {
    stepname: string;
    label: string;
    icon: any;
    component: any;
}

interface ProgressBarProps {
    currentStep: number;
    steps: Step[];
    onStepClick: (step: number) => void;
}

export default function ProgressBar({
    currentStep,
    steps,
    onStepClick,
}: ProgressBarProps) {
    const totalSteps = steps.length;
    // Calculate progress percentage
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Progress Bar Container */}
            <div className="absolute left-0 right-0 top-5 flex items-center px-5">
                {/* Background Bar */}
                <div className="w-full h-1 bg-gray-300 rounded-full"></div>

                {/* Animated Progress Fill */}
                <motion.div
                    initial={false}
                    animate={{
                        width: `${progressPercentage}%`,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}
                    className="absolute left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
            </div>

            {/* Step Circles */}
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;
                    const StepIcon = step.icon;

                    return (
                        <div key={step.stepname} className="relative flex flex-col items-center">
                            <button
                                onClick={() => onStepClick(stepNumber)}
                                className="relative z-20 focus:outline-none group"
                                aria-label={`Go to ${step.label}`}
                            >
                                {/* Step Circle */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isCompleted
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                                            : isActive
                                                ? 'bg-white border-4 border-cyan-500 text-cyan-600 shadow-lg'
                                                : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-gray-400'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <HiCheck className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <StepIcon className="w-5 h-5" />
                                    )}
                                </motion.div>

                                {/* Active Step Pulse Effect */}
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeOut',
                                        }}
                                        className="absolute inset-0 rounded-full bg-cyan-400 -z-10"
                                    />
                                )}
                            </button>

                            {/* Step Label - Positioned absolutely to not affect circle placement */}
                            <div className="absolute top-full mt-0.5 left-1/2 -translate-x-1/2">
                                <p
                                    className={`text-xs font-medium transition-colors duration-300 whitespace-nowrap text-center ${isActive
                                            ? 'text-cyan-600'
                                            : isCompleted
                                                ? 'text-gray-700'
                                                : 'text-gray-400'
                                        }`}
                                >
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}