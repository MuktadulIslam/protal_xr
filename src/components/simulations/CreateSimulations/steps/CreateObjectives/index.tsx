'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiAcademicCap, HiLightBulb } from 'react-icons/hi2';
import { simulation_id } from '@/utils/constants';
import { useFetchObjectives } from '@/hooks/useObjectives.hook';
import { Objective, EPA } from '@/types';
import ObjectiveCard from './ObjectiveCard';
import CreateObjectiveForm from './CreateObjectiveForm';
import CreateEPAForm from './CreateEPAForm';
import StepsHeader from '../StepsHeader';
import StepInfoBox from '../StepInfoBox';

export default function CreateObjectives() {
    const searchParams = useSearchParams();
    const urlSimulationId = searchParams.get(simulation_id);

    const [selectedSimulationId, setSelectedSimulationId] = useState<string | number | null>(urlSimulationId);
    const [showObjectiveForm, setShowObjectiveForm] = useState(false);
    const [showEPAForm, setShowEPAForm] = useState(false);
    const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
    const [editingEPA, setEditingEPA] = useState<EPA | null>(null);
    const [selectedObjectiveForEPA, setSelectedObjectiveForEPA] = useState<number | null>(null);
    const { data: objectives, isLoading: loadingObjectives } = useFetchObjectives(selectedSimulationId);

    useEffect(() => {
        if (urlSimulationId) {
            setSelectedSimulationId(urlSimulationId);
        }
    }, [urlSimulationId]);

    const handleAddObjective = () => {
        setEditingObjective(null);
        setShowObjectiveForm(true);
    };

    const handleEditObjective = (objective: Objective) => {
        setEditingObjective(objective);
        setShowObjectiveForm(true);
    };

    const handleAddEPA = (objectiveId: number) => {
        setSelectedObjectiveForEPA(objectiveId);
        setEditingEPA(null);
        setShowEPAForm(true);
    };

    const handleEditEPA = (epa: EPA, objectiveId: number) => {
        setSelectedObjectiveForEPA(objectiveId);
        setEditingEPA(epa);
        setShowEPAForm(true);
    };

    return (
        <div className="w-full h-full px-6 py-6 relative bg-linear-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <StepsHeader
                    title=' Learning Objectives'
                    description='Define objectives and EPAs for your simulation'
                    icon={HiAcademicCap}
                    onSimulationChange={setSelectedSimulationId}
                />

                {/* Content Area */}
                {!selectedSimulationId ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-20 bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-dashed border-gray-300 shadow-sm"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <HiAcademicCap className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-700 text-xl font-bold mb-2">
                            Select a Simulation
                        </p>
                        <p className="text-gray-500 text-sm">
                            Choose a simulation from the dropdown above to manage objectives
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Add Objective Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-3"
                        >
                            <button
                                onClick={handleAddObjective}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-cyan-600 rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-600 hover:bg-cyan-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg cursor-pointer"
                            >
                                <HiPlus className="w-5 h-5" />
                                Add New Objective
                            </button>
                        </motion.div>

                        {/* Objectives List */}
                        {loadingObjectives ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                                <div className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent"></div>
                                <p className="mt-4 text-gray-600 font-medium">Loading objectives...</p>
                            </div>
                        ) : objectives && objectives.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-3"
                            >
                                {objectives.map((objective, index) => (
                                    <motion.div
                                        key={objective.objective_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <ObjectiveCard
                                            objective={objective}
                                            simulationId={selectedSimulationId}
                                            onEditObjective={handleEditObjective}
                                            onAddEPA={handleAddEPA}
                                            onEditEPA={handleEditEPA}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-center py-20 bg-linear-to-br from-white to-blue-50 rounded-2xl border-2 border-dashed border-blue-200 shadow-sm"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                                    <HiAcademicCap className="w-14 h-14 text-cyan-600" />
                                </div>
                                <p className="text-gray-700 text-xl font-bold mb-2">
                                    No Objectives Yet
                                </p>
                                <p className="text-gray-500 text-sm mb-6">
                                    Start by adding your first learning objective
                                </p>
                                <button
                                    onClick={handleAddObjective}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                                >
                                    <HiPlus className="w-5 h-5" />
                                    Add First Objective
                                </button>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Info Box */}
                <StepInfoBox
                    icon={HiLightBulb}
                    heading="About Objectives and EPAs"
                    instructions={[
                        'Objectives define the main learning goals for your simulation',
                        'EPAs (Entrustable Professional Activities) are sub-objectives that break down each objective into specific, measurable outcomes',
                        'Click on an objective to expand and view or add its EPAs',
                        'Each objective and EPA can have its own weightage for assessment'
                    ]}
                    delay={0.4}
                />
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showObjectiveForm && selectedSimulationId && (
                    <CreateObjectiveForm
                        simulationId={selectedSimulationId}
                        onClose={() => {
                            setShowObjectiveForm(false);
                            setEditingObjective(null);
                        }}
                        editingObjective={editingObjective}
                    />
                )}

                {showEPAForm && selectedObjectiveForEPA && (
                    <CreateEPAForm
                        objectiveId={selectedObjectiveForEPA}
                        onClose={() => {
                            setShowEPAForm(false);
                            setEditingEPA(null);
                            setSelectedObjectiveForEPA(null);
                        }}
                        editingEPA={editingEPA}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
