// src/components/portal/ScenarioBuilder.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { HiPlus, HiArrowRight } from 'react-icons/hi2';

export default function ScenarioBuilder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className=" px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 mb-4">
            <span className="text-sm font-semibold text-cyan-700">Scenario Builder</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Own <span className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Custom Scenarios</span>
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Design training scenarios tailored to your specific needs. Choose from healthcare, education, corporate, or public safety templates and customize every detail.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              'Drag-and-drop environment builder',
              'Pre-built scenario templates',
              'Custom avatar interactions',
              'Real-time preview mode',
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                  <HiPlus className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            Start Building
            <HiArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
            <Image
              src="/hero-portal/custom-scenarios.png"
              alt="Scenario Builder"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}