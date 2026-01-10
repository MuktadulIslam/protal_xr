'use client'

import { motion } from "framer-motion"
import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { simulation_id } from '@/utils/constants'
import { useFetchAllSimulations } from '@/hooks/useFetchAllSimulations.hook'
import { useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

interface StepsHeaderProps {
    icon: IconType;
    title: string;
    description: string;
    showSimulationSelector?: boolean;
    onSimulationChange?: (simulationId: string) => void;
}

export default function StepsHeader({
    icon: Icon,
    title,
    description,
    showSimulationSelector = true,
    onSimulationChange
}: StepsHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: simulations, isLoading: isAllSimulationLoading } = useFetchAllSimulations();
    const [currentSelectedId, seCurrentSelectedId] = useState<string>('');

    // Automatically detect simulation ID from URL and set it
    useEffect(() => {
        const urlSimulationId = searchParams.get(simulation_id);
        if (urlSimulationId) {
            seCurrentSelectedId(urlSimulationId);
            if (onSimulationChange) {
                onSimulationChange(urlSimulationId);
            }
        }
    }, [searchParams, onSimulationChange]);

    const handleSimulationChange = (value: string) => {
        seCurrentSelectedId(value);

        if (onSimulationChange) {
            onSimulationChange(value);
        }

        // Update URL with simulation ID
        if (value) {
            const params = new URLSearchParams(searchParams.toString());
            params.set(simulation_id, value);
            router.push(`?${params.toString()}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-600">{description}</p>
                    </div>
                </div>

                {showSimulationSelector && simulations && simulations.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-100 flex gap-2 relative"
                    >
                        <label htmlFor="header_simulation_select" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-1">
                            <span className="w-1.5 h-5 bg-linear-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                            Select Simulation
                        </label>
                        <select
                            id="header_simulation_select"
                            value={currentSelectedId}
                            onChange={(e) => handleSimulationChange(e.target.value)}
                            className="peer flex-1 pl-4 pr-10 py-1.5 border-2 border-gray-300 bg-linear-to-br from-white to-gray-50 rounded-sm hover:border-cyan-200 focus:border-cyan-500 focus:bg-white transition-all duration-200 font-semibold outline-none text-sm shadow-sm appearance-none cursor-pointer"
                        >
                            {isAllSimulationLoading ?
                                <option value="" disabled>Simulations Loading...</option> :
                                <option value="" disabled>Choose simulation...</option>
                            }
                            {simulations.map((sim) => (
                                <option key={sim.simulation_id} value={sim.simulation_id}>
                                    {sim.simulation_name}
                                </option>
                            ))}
                        </select>
                        <FaChevronDown className="absolute right-2 top-[30%] text-gray-700 peer-open:rotate-180 transition-transform duration-300 pointer-events-none" size={15}/>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}