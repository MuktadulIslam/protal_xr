'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTrash, HiPencil, HiPlus, HiCheckBadge } from 'react-icons/hi2';
import { FaAngleDown } from "react-icons/fa";
import { Objective, EPA } from '@/types';
import { useFetchEPAs } from '@/hooks/useEPAs.hook';
import { useDeleteObjective } from '@/hooks/useObjectives.hook';
import { useDeleteEPA } from '@/hooks/useEPAs.hook';
import EPACard from './EPACard';

interface ObjectiveCardProps {
    objective: Objective;
    simulationId: string | number;
    onEditObjective: (objective: Objective) => void;
    onAddEPA: (objectiveId: number) => void;
    onEditEPA: (epa: EPA, objectiveId: number) => void;
}

export default function ObjectiveCard({
    objective,
    simulationId,
    onEditObjective,
    onAddEPA,
    onEditEPA
}: ObjectiveCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: epas, isLoading: loadingEPAs } = useFetchEPAs(isExpanded ? objective.objective_id : null);
    const { mutate: deleteObjective, isPending: isDeletingObjective } = useDeleteObjective();
    const { mutate: deleteEPA, isPending: isDeletingEPA } = useDeleteEPA();

    const handleDeleteObjective = () => {
        if (window.confirm('Are you sure you want to delete this objective?')) {
            deleteObjective({
                objectiveId: objective.objective_id,
                simulationId
            });
        }
    };

    const handleDeleteEPA = (epaId: number) => {
        if (window.confirm('Are you sure you want to delete this EPA?')) {
            deleteEPA({
                epaId,
                objectiveId: objective.objective_id
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            {/* Objective Header */}
            <div className="p-3 bg-linear-to-r from-blue-50 via-cyan-50 to-teal-50">
                <div className="flex items-start justify-between gap-4">
                    <div
                        className="flex-1 cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-1 bg-linear-to-r from-blue-500 to-blue-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
                                <FaAngleDown className={`w-6 h-6 text-white ${isExpanded ? 'rotate-180' : ''} transition-all duration-300`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-6 bg-linear-to-b from-cyan-500 to-blue-600 rounded-full"></div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {objective.objective_text}
                                    </h3>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-lg shadow-sm">
                                        <span className="text-xs font-medium text-gray-500">Weight:</span>
                                        <span className="text-sm font-bold text-cyan-700">{objective.weightage}</span>
                                    </div>
                                    {epas && epas.length > 0 && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-lg shadow-sm">
                                            <HiCheckBadge className="w-4 h-4 text-teal-600" />
                                            <span className="text-sm font-medium text-gray-700">{epas.length} EPA{epas.length !== 1 ? 's' : ''}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditObjective(objective);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-white bg-white/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                            title="Edit Objective"
                        >
                            <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteObjective();
                            }}
                            disabled={isDeletingObjective}
                            className="p-1.5 text-red-600 hover:bg-white bg-white/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 cursor-pointer"
                            title="Delete Objective"
                        >
                            <HiTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* EPAs Section */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t-2 border-gray-100 bg-linear-to-b from-gray-50 to-white"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-linear-to-b from-teal-500 to-emerald-500 rounded-full"></div>
                                        EPAs (Sub-objectives)
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1 ml-3">Entrustable Professional Activities</p>
                                </div>
                                <button
                                    onClick={() => onAddEPA(objective.objective_id)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-linear-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                                >
                                    <HiPlus className="w-4 h-4" />
                                    Add EPA
                                </button>
                            </div>

                            {loadingEPAs ? (
                                <div className="text-center py-12">
                                    <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent"></div>
                                    <p className="mt-3 text-sm font-medium text-gray-600">Loading EPAs...</p>
                                </div>
                            ) : epas && epas.length > 0 ? (
                                <div className="space-y-4">
                                    {epas.map((epa, index) => (
                                        <EPACard
                                            key={epa.epa_id}
                                            epa={epa}
                                            index={index}
                                            onEdit={() => onEditEPA(epa, objective.objective_id)}
                                            onDelete={() => handleDeleteEPA(epa.epa_id)}
                                            isDeleting={isDeletingEPA}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-linear-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
                                    <button
                                        onClick={() => onAddEPA(objective.objective_id)}
                                        className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-cyan-100 to-teal-100 hover:from-cyan-300 hover:to-teal-300 transition-all duration-300 hover:scale-105 rounded-full flex items-center justify-center cursor-pointer">
                                        <HiPlus className="w-8 h-8 text-cyan-600" />
                                    </button>
                                    <p className="text-gray-600 text-sm font-medium">No EPAs added yet</p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        Click "Add EPA" to create sub-objectives
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
