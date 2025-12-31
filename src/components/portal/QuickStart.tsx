// src/components/portal/QuickStart.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiDocumentText, HiVideoCamera, HiAcademicCap } from 'react-icons/hi2';

const quickStartItems = [
  {
    icon: HiDocumentText,
    title: 'Documentation',
    description: 'Step-by-step guides to get started',
    color: 'from-cyan-500 to-blue-500',
    href: '/portal/docs',
  },
  {
    icon: HiVideoCamera,
    title: 'Video Tutorials',
    description: 'Watch how to build your first scenario',
    color: 'from-blue-500 to-purple-500',
    href: '/portal/tutorials',
  },
  {
    icon: HiAcademicCap,
    title: 'Learning Path',
    description: 'Structured course for beginners',
    color: 'from-purple-500 to-pink-500',
    href: '/portal/learning',
  },
];

export default function QuickStart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-1">
          Quick Start Resources
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to master the platform and create amazing VR experiences
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {quickStartItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl flex items-center gap-2 p-4 border border-gray-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300"
          >
            <div className={`inline-flex p-4 rounded-xl bg-linear-to-r ${item.color}`}>
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center justify-between">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}