'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import Logo from './ui/logo';
import la from '@/i18n/lo';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D0D12] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#7F5AF0]/20 via-[#1B1B2F]/40 to-[#0D0D12]"></div>

        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#7F5AF0]/30 blur-[100px]"
          style={{ top: '10%', left: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#BF93F9]/20 blur-[100px]"
          style={{ bottom: '20%', right: '10%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* logo */}
          <Logo className="!max-w-none" />

          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
          </motion.div>
          <motion.div className='-mt-24'>
            <motion.div className="text-3xl ml-[480px] mb-5"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}>✨</motion.div>
            <h1 className="text-[#F7EDEA] text-xl font-bold mb-2">
              {/* Galactic Star Astrology */}
              {la.HeaderTitle}
            </h1>
            <p className="text-[#E0E0E0] text-sm">Unlock the wisdom of the cosmos</p>
          </motion.div>
        </motion.div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
