'use client';

import { motion } from 'framer-motion';
import { HiTrash, HiPencil, HiCheckBadge } from 'react-icons/hi2';
import { EPA } from '@/types';

interface EPACardProps {
    epa: EPA;
    index: number;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
}

export default function EPACard({
    epa,
    index,
    onEdit,
    onDelete,
    isDeleting = false
}: EPACardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
            {/* EPA Header */}
            <div className="p-4 bg-linear-to-r from-teal-50 via-cyan-50 to-blue-50 border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-linear-to-b from-teal-500 to-emerald-600 rounded-full"></div>
                            <h5 className="font-bold text-gray-900 text-base">
                                {epa.epa_name}
                            </h5>
                            {epa.is_mandatory && (
                                <span className="inline-flex items-center gap-1 text-xs bg-linear-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-lg font-semibold shadow-sm">
                                    <HiCheckBadge className="w-3 h-3" />
                                    Mandatory
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed ml-3.5">
                            {epa.epa_description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onEdit}
                            className="p-1.5 text-blue-600 hover:bg-white bg-white/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                            title="Edit EPA"
                        >
                            <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={isDeleting}
                            className="p-1.5 text-red-600 hover:bg-white bg-white/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 cursor-pointer"
                            title="Delete EPA"
                        >
                            <HiTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* EPA Details */}
            <div className="p-4 bg-linear-to-b from-gray-50 to-white">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Proficiency</span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm ml-3">
                            {epa.proficiency_level}
                        </p>
                    </div>
                    <div className="bg-linear-to-br from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-4 bg-linear-to-b from-teal-500 to-emerald-500 rounded-full"></div>
                            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Weightage</span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm ml-3">
                            {epa.weightage}
                        </p>
                    </div>
                </div>

                <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-linear-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                        <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Assessment Criteria</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed ml-3">
                        {epa.assessment_criteria}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
