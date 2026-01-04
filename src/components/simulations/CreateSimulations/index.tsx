'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/simulations/CreateSimulations/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

import SimulationInformationForm from './steps/SimulationInformationForm';
import CreateObjectives from './steps/CreateObjectives';
import SelectAvatar from './steps/SelectAvatar';
import CreateState from './steps/CreateState';
import CreateScene from './steps/CreateScene';
import AddObjectAnimations from './steps/AddObjectAnimations';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import FullscreenWrapper from '@/components/common/FullscreenWrapper';

const createSimulationsSteps = [
    {
        stepname: 'info',
        label: 'Info',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: false,
        component: SimulationInformationForm
    },
    {
        stepname: 'objectives',
        label: 'Objectives',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: false,
        component: CreateObjectives
    },
    {
        stepname: 'avatar',
        label: 'Avatar',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: false,
        component: SelectAvatar
    },
    {
        stepname: 'state',
        label: 'State',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: true,
        component: CreateState
    },
    {
        stepname: 'scene',
        label: 'Scene',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: true,
        component: CreateScene
    },
    {
        stepname: 'animations',
        label: 'Animations',
        icon: MdKeyboardDoubleArrowLeft,
        fullScreenShowable: true,
        component: AddObjectAnimations
    },
];

export default function CreateSimulationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0); // -1 for previous, 1 for next

    const TOTAL_STEPS = createSimulationsSteps.length;

    // Initialize step from URL on mount
    useEffect(() => {
        const stepNameFromUrl = searchParams.get('step');

        if (stepNameFromUrl) {
            // Find step index by stepname
            const stepIndex = createSimulationsSteps.findIndex(
                step => step.stepname === stepNameFromUrl
            );

            if (stepIndex !== -1) {
                setCurrentStep(stepIndex + 1);
            } else {
                // If invalid stepname, redirect to first step
                router.push(`/simulations/create?step=${createSimulationsSteps[0].stepname}`, { scroll: false });
            }
        } else {
            // If no step in URL, redirect to first step
            router.push(`/simulations/create?step=${createSimulationsSteps[0].stepname}`, { scroll: false });
        }
    }, [searchParams, router]);

    // Update URL when step changes
    const updateStep = (newStep: number, dir: number) => {
        if (newStep >= 1 && newStep <= TOTAL_STEPS) {
            setDirection(dir);
            setCurrentStep(newStep);
            const stepName = createSimulationsSteps[newStep - 1].stepname;
            router.push(`/simulations/create?step=${stepName}`, { scroll: false });
        }
    };

    const handleNext = () => {
        if (currentStep < TOTAL_STEPS) {
            updateStep(currentStep + 1, 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            updateStep(currentStep - 1, -1);
        }
    };

    const handleStepClick = (step: number) => {
        const dir = step > currentStep ? 1 : -1;
        updateStep(step, dir);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 p-1">
            <div className="mx-auto flex flex-col">
                {/* Progress Bar Section */}
                <div className="w-full px-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-5 pt-2 pb-6 mb-1">
                        <div className="flex items-center gap-4">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className={`p-2 translate-y-2 rounded-lg transition-all duration-200 ${currentStep === 1
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-cyan-600'
                                    }`}
                                aria-label="Previous step"
                            >
                                <HiArrowLeft className="w-6 h-6" style={{ strokeWidth: 1.5 }} />
                            </button>

                            {/* Progress Bar */}
                            <div className="flex-1">
                                <ProgressBar
                                    currentStep={currentStep}
                                    steps={createSimulationsSteps}
                                    onStepClick={handleStepClick}
                                />
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                disabled={currentStep === TOTAL_STEPS}
                                className={`p-2 translate-y-2 rounded-lg transition-all duration-200 ${currentStep === TOTAL_STEPS
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-cyan-600'
                                    }`}
                                aria-label="Next step"
                            >
                                <HiArrowRight className="w-6 h-6" style={{ strokeWidth: 1.5 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                        transition={{ duration: 0.3 }}
                        className='w-full flex-1'
                    >
                        <FullscreenWrapper showIcon={createSimulationsSteps[currentStep - 1].fullScreenShowable} fullScreenByKey={false}>
                            {(() => {
                                const StepComponent = createSimulationsSteps[currentStep - 1].component;
                                return <StepComponent />;
                            })()}
                        </FullscreenWrapper>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}