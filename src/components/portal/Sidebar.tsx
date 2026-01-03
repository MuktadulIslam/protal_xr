// src/components/portal/Sidebar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiHome,
  HiCube,
  HiSparkles,
  HiCog,
  HiQuestionMarkCircle,
  HiRectangleStack,
  HiBuildingLibrary,
  HiCalendarDays,
} from 'react-icons/hi2';
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const topMenuItems = [
  { icon: HiHome, label: 'Dashboard', href: '/' },
  { icon: HiCalendarDays, label: 'Programs', href: '/' },
  { icon: HiCube, label: 'Simulations', href: '/' },
  { icon: HiSparkles, label: 'Evaluation', href: '/' },
  { icon: HiRectangleStack, label: 'Assets', href: '/' },
  { icon: HiBuildingLibrary, label: 'Institutes', href: '/' },
];
// const topMenuItems = [
//   { icon: HiHome, label: 'Dashboard', href: '/portal' },
//   { icon: HiCube, label: 'Scenarios', href: '/portal/scenarios' },
//   { icon: FaRobot, label: 'AI Models', href: '/portal/models' },
//   { icon: HiSparkles, label: 'Templates', href: '/portal/templates' },
//   { icon: HiDocumentText, label: 'Projects', href: '/portal/projects' },
// ];

const bottomMenuItems = [
  { icon: HiCog, label: 'Settings', href: '/', show: true },
  { icon: HiQuestionMarkCircle, label: 'Help', href: '/', show: true },
  { icon: MdPersonAddAlt1, label: 'Add New User', href: '/', show: false },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock user data - replace with actual user data
  const user = {
    name: 'Hamza Afzaal',
    email: 'hamza.afzaal@craftxr.io',
    image: '/images/profiles/profile1.png',
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 230 : 55 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen sticky top-0 bg-white border-r border-gray-200 shadow-sm flex flex-col"
    >
      {/* Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between pl-3 pr-1 shrink-0">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.a
              href='/'
              key="full-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo/craftxr-ryan.png"
                alt="CraftXR"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </motion.a>
          ) : (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <motion.div
                key="mini-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
              >
                XR
              </motion.div>
            </button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdKeyboardDoubleArrowLeft className="w-8 h-8 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Top Menu Items */}
      <nav className="flex-1 pt-1 pb-4 overflow-y-auto">
        <ul className="px-1">
          {topMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-linear-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 shrink-0 transition-colors" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium text-gray-700 group-hover:text-cyan-700 whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-1 px-1">
        {/* Settings & Help */}
        {bottomMenuItems.map((item, index) => (
          item.show ?
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-linear-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 shrink-0 transition-colors" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium text-gray-700 group-hover:text-cyan-700 whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            : <div key={index}></div>
        ))}

        {/* User Profile */}
        <div className="border-t border-gray-200">
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
              <Image
                src="/logo/profile1.png"
                alt={user.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 whitespace-nowrap truncate max-full-w">
                    {user.email}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}