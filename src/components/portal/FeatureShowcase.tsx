// src/components/portal/FeatureShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import virtualRealityAnimation from '../../../public/animations/virtualReality.json';
import codingAnimation from '../../../public/animations/coding.json';
import technicalSkillsAnimation from '../../../public/animations/technicalSkills.json';
import { HiCube, HiSparkles } from 'react-icons/hi2';

const features = [
  {
    icon: HiCube,
    title: 'Immersive VR Environments',
    description: 'Design realistic 3D training scenarios that simulate real-world situations',
    animation: virtualRealityAnimation,
    gradient: 'from-cyan-500 to-blue-500',
    scale: 0.8
  },
  {
    icon: HiCube,
    title: 'No-Code Builder',
    description: 'Create complex scenarios using our intuitive drag-and-drop interface',
    animation: codingAnimation,
    gradient: 'from-blue-500 to-purple-500',
    scale: 1
  },
  {
    icon: HiSparkles,
    title: 'AI-Powered Evaluation',
    description: 'Get objective insights on non-technical skills with our AI evaluator',
    animation: technicalSkillsAnimation,
    gradient: 'from-purple-500 to-pink-500',
    scale: 0.8
  },
];

export default function FeatureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-1">
          Everything You Need to Build VR Training
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful tools to create, deploy, and analyze immersive training experiences
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 px-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300">
              {/* Animation */}
              <div className="mb-3 h-48 bg-linear-to-br from-gray-50 to-blue-50 rounded-xl flex items-center justify-center overflow-hidden">
                <Lottie
                  animationData={feature.animation}
                  loop={true}
                  style={{ transform: `scale(${feature.scale})` }}
                  className="w-full h-full scale-125"
                />
              </div>
              <div className="w-full h-10 flex items-center gap-1.5">
                {/* Icon */}
                <div className={`p-1.5 rounded-sm bg-linear-to-r ${feature.gradient}`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-5">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}