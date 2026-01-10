'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiSparkles, HiXMark } from 'react-icons/hi2';
import { CreateEPARequest, EPA, UpdateEPARequest } from '@/types';
import { useCreateEPA, useUpdateEPA } from '@/hooks/useEPAs.hook';

interface CreateEPAFormProps {
    objectiveId: number;
    onClose: () => void;
    editingEPA?: EPA | null;
}

export default function CreateEPAForm({
    objectiveId,
    onClose,
    editingEPA
}: CreateEPAFormProps) {
    const { mutate: createEPA, isPending: isCreating } = useCreateEPA();
    const { mutate: updateEPA, isPending: isUpdating } = useUpdateEPA();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateEPARequest>({
        defaultValues: editingEPA ? {
            epa_name: editingEPA.epa_name,
            epa_description: editingEPA.epa_description,
            proficiency_level: editingEPA.proficiency_level,
            assessment_criteria: editingEPA.assessment_criteria,
            weightage: editingEPA.weightage,
            is_mandatory: editingEPA.is_mandatory
        } : {
            epa_name: '',
            epa_description: '',
            proficiency_level: '',
            assessment_criteria: '',
            weightage: 1,
            is_mandatory: false
        }
    });

    const onSubmit = (data: CreateEPARequest) => {
        if (editingEPA) {
            updateEPA({
                epaId: editingEPA.epa_id,
                objectiveId,
                data: data as UpdateEPARequest
            }, {
                onSuccess: () => onClose()
            });
        } else {
            createEPA({
                objectiveId,
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
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="relative bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-600/10 py-3 px-5  text-black">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold">
                                    {editingEPA ? 'Edit EPA' : 'Create New EPA'}
                                </h3>
                            </div>
                            <p className="text-sm">
                                {editingEPA ? 'Update EPA details' : 'Define an Entrustable Professional Activity'}
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 overflow-y-auto flex-1">
                    {/* EPA Name */}
                    <div>
                        <label htmlFor="epa_name" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                            EPA Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="epa_name"
                            {...register('epa_name', {
                                required: 'EPA name is required'
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 transition-all duration-200 outline-none font-medium ${errors.epa_name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                }`}
                            placeholder="e.g., Patient History Taking"
                        />
                        {errors.epa_name && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                            >
                                {errors.epa_name.message}
                            </motion.p>
                        )}
                    </div>

                    {/* EPA Description */}
                    <div>
                        <label htmlFor="epa_description" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                            EPA Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="epa_description"
                            rows={3}
                            {...register('epa_description', {
                                required: 'EPA description is required'
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 transition-all duration-200 outline-none resize-none font-medium ${errors.epa_description ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                }`}
                            placeholder="Describe what this EPA entails..."
                        />
                        {errors.epa_description && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                            >
                                {errors.epa_description.message}
                            </motion.p>
                        )}
                    </div>

                    {/* Row: Proficiency Level & Weightage */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Proficiency Level */}
                        <div>
                            <label htmlFor="proficiency_level" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                                Proficiency Level <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="proficiency_level"
                                {...register('proficiency_level', {
                                    required: 'Proficiency level is required'
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 transition-all duration-200 outline-none font-medium ${errors.proficiency_level ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                    }`}
                                placeholder="e.g., Intermediate"
                            />
                            {errors.proficiency_level && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                >
                                    {errors.proficiency_level.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Weightage */}
                        <div>
                            <label htmlFor="weightage" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                                Weightage <span className="text-red-500">*</span>
                            </label>
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
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 transition-all duration-200 outline-none font-medium ${errors.weightage ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                    }`}
                                placeholder="1.0"
                            />
                            {errors.weightage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                >
                                    {errors.weightage.message}
                                </motion.p>
                            )}
                        </div>
                    </div>

                    {/* Assessment Criteria */}
                    <div>
                        <label htmlFor="assessment_criteria" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                            Assessment Criteria <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="assessment_criteria"
                            rows={4}
                            {...register('assessment_criteria', {
                                required: 'Assessment criteria is required'
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 transition-all duration-200 outline-none resize-none font-medium ${errors.assessment_criteria ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'
                                }`}
                            placeholder="Define how this EPA will be assessed..."
                        />
                        {errors.assessment_criteria && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                            >
                                {errors.assessment_criteria.message}
                            </motion.p>
                        )}
                    </div>

                    {/* Is Mandatory */}
                    <div>
                        <label htmlFor="is_mandatory" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                            <span className="w-1.5 h-5 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                            Mandatory EPA
                        </label>
                        <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-200 bg-gray-50 hover:bg-white rounded-lg transition-all duration-200">
                            <input
                                type="checkbox"
                                id="is_mandatory"
                                {...register('is_mandatory')}
                                className="w-5 h-5 text-blue-600 bg-white border-2 border-blue-500 rounded outline-none cursor-pointer transition-all duration-200"
                            />
                            <label htmlFor="is_mandatory" className="text-sm text-gray-700 cursor-pointer select-none font-medium">
                                Mark this EPA as required for successful completion in avatar animations
                            </label>
                        </div>
                    </div>
                </form>

                {/* Actions - Fixed at bottom */}
                <div className="p-6 border-t-2 border-gray-100 bg-gray-50 shrink-0">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all duration-200 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isCreating || isUpdating}
                            className="flex-1 px-5 py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isCreating || isUpdating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {editingEPA ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <HiCheckCircle className="w-5 h-5" />
                                    {editingEPA ? 'Update EPA' : 'Create EPA'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
