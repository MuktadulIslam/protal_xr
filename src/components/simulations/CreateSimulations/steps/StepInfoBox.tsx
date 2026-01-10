'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface StepInfoBoxProps {
  icon: IconType;
  heading: string;
  instructions: string[];
  delay?: number;
}

export default function StepInfoBox({
  icon: Icon,
  heading,
  instructions,
  delay = 0.4
}: StepInfoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="mt-6 bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-sm text-blue-900 flex-1">
          <p className="font-bold mb-3 text-base">{heading}</p>
          <ul className="space-y-2 text-blue-800">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>
                  {instruction}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
