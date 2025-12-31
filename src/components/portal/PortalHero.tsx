// src/components/portal/PortalHero.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiPlay, HiSparkles } from 'react-icons/hi2';

export default function PortalHero() {
  return (
    <section className="relative px-12 py-8 overflow-hidden rounded-3xl shadow-lg">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20" />

      <div className="w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-200 mb-6"
            >
              <HiSparkles className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold text-gray-700">
                No-Code VR Development Platform
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your VR Training{' '}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Scenarios
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create immersive VR training experiences without writing a single line of code.
              Generate AI-powered models, design custom scenarios, and deploy in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/"
                className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Start Building
                <span className="text-2xl">→</span>
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 flex items-center gap-2">
                <HiPlay className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Right - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="/hero-portal/our_expertise.png"
                alt="VR Development Platform"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-emerald-700/10 to-transparent" />
            </div>

            {/* Floating stats cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: 1, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">5+</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Scenarios Created</p>
                  <p className="text-sm font-semibold text-gray-900">This Month</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">98%</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Success Rate</p>
                  <p className="text-sm font-semibold text-gray-900">User Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}