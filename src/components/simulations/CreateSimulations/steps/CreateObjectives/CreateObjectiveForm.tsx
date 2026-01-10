'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiXMark, HiCheckCircle } from 'react-icons/hi2';
import { CreateObjectiveRequest, Objective, UpdateObjectiveRequest } from '@/types';
import { useCreateObjective, useUpdateObjective } from '@/hooks/useObjectives.hook';

interface CreateObjectiveFormProps {
    simulationId: string | number;
    onClose: () => void;
    editingObjective?: Objective | null;
}

export default function CreateObjectiveForm({
    simulationId,
    onClose,
    editingObjective
}: CreateObjectiveFormProps) {
    const { mutate: createObjective, isPending: isCreating } = useCreateObjective();
    const { mutate: updateObjective, isPending: isUpdating } = useUpdateObjective();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateObjectiveRequest>({
        defaultValues: editingObjective ? {
            objective_text: editingObjective.objective_text,
            weightage: editingObjective.weightage
        } : {
            objective_text: '',
            weightage: 1
        }
    });

    const onSubmit = (data: CreateObjectiveRequest) => {
        if (editingObjective) {
            updateObjective({
                objectiveId: editingObjective.objective_id,
                simulationId,
                data: data as UpdateObjectiveRequest
            }, {
                onSuccess: () => onClose()
            });
        } else {
            createObjective({
                simulationId,
                data
            }, {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
            >
                {/* Header */}
                <div className="relative bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-600/10 py-3 px-5  text-black">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold">
                                {editingObjective ? 'Edit Objective' : 'Create New Objective'}
                            </h3>
                            <p className="text-sm">
                                {editingObjective ? 'Update objective details' : 'Define a learning objective for your simulation'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group"
                        >
                            <HiXMark className="w-7 h-7 group-hover:rotate-180 transition-all duration-500" />
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Objective Text */}
                    <div>
                        <label htmlFor="objective_text" className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                            Objective Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="objective_text"
                            {...register('objective_text', {
                                required: 'Objective name is required'
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:border-cyan-500 outline-none font-medium ${errors.objective_text ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                }`}
                            placeholder="e.g., Master patient communication skills"
                        />
                        {errors.objective_text && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                            >
                                {errors.objective_text.message}
                            </motion.p>
                        )}
                    </div>

                    {/* Weightage */}
                    <div>
                        <label htmlFor="weightage" className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                            Weightage <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="weightage"
                                step="1"
                                min="-1"
                                max="2"
                                {...register('weightage', {
                                    required: 'Weightage is required',
                                    min: { value: -1, message: 'Weightage must be at least -1' },
                                    max: { value: 2, message: 'Weightage must not exceed 2' },
                                    valueAsNumber: true
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-cyan-500 outline-none font-medium ${errors.weightage ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                    }`}
                                placeholder="1.0"
                            />
                        </div>
                        {errors.weightage && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                            >
                                {errors.weightage.message}
                            </motion.p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                            Set the importance level of this objective (higher values = more important)
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="flex-1 px-5 py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isCreating || isUpdating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {editingObjective ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <HiCheckCircle className="w-5 h-5" />
                                    {editingObjective ? 'Update Objective' : 'Create Objective'}
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
