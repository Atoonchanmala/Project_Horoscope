'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserInfoForm } from './UserInfoForm';
import { FrequencySelector } from './FrequencySelector';
import { WhatsAppConfirmation } from './WhatsAppConfirmation';
import { ShareResult } from './ShareResult';
import { BackOffice } from './BackOffice';
import { UserData, HoroscopeData, FrequencyType } from '@/types/horoscope';

// ບໍ່ໄດ້ເອີ້ນໃຊ້ງານ
export function HoroscopeApp() {
  // Generate stable star positions using useMemo
  const stars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: (i * 7) % 100,
      top: (i * 13) % 100,
      duration: 2 + (i % 3),
      delay: (i % 5) * 0.4,
    })),
    []
  );
  const [isBackOffice, setIsBackOffice] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    phone: '',
    birthdate: '',
    gender: '',
    plan: '',
  });
  const [frequency, setFrequency] = useState<FrequencyType | ''>('');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);

  // If back office mode is active, show back office
  if (isBackOffice) {
    return <BackOffice onExit={() => setIsBackOffice(false)} />;
  }

  const handleUserInfoSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handleFrequencySelect = (freq: FrequencyType) => {
    setFrequency(freq);
    // Generate mock horoscope data
    const mockHoroscope: HoroscopeData = {
      finance: '💰 Financial opportunities are aligning in your favor. Expect unexpected gains through collaborative ventures.',
      career: '💼 Your professional life is entering a transformative phase. Trust your intuition when making important decisions.',
      love: '❤️ Venus aligns with your sign, bringing harmony to relationships. Open communication strengthens bonds.',
      health: '🧘 Energy levels are high. Focus on balance between activity and rest. Meditation brings clarity.',
      luckyColor: '🌈 Cosmic Purple & Mystic Gold',
      unluckyColor: '🌈 Avoid Dark Red & Burnt Orange',
      luckyNumber: '🎲 7, 14, 21',
    };
    setHoroscopeData(mockHoroscope);
    setCurrentStep(3);
  };

  const handleWhatsAppSent = () => {
    setCurrentStep(4);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setUserData({
      phone: '',
      birthdate: '',
      gender: '',
      plan: '',
    });
    setFrequency('');
    setHoroscopeData(null);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#7F5AF0]/20 via-[#1B1B2F]/40 to-[#0D0D12]"></div>
        
        {/* Animated stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
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
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full max-w-md mx-auto"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-6xl mb-4">✨</div>
            </motion.div>
          </motion.div>
          
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
            <div className="text-4xl">✨</div>
          </motion.div>
          <h1 className="text-[#F7EDEA] text-4xl font-bold mb-2">Galactic Star Astrology</h1>
          <p className="text-[#E0E0E0]">Unlock the wisdom of the cosmos</p>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserInfoForm  initialData={userData} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FrequencySelector onSelect={handleFrequencySelect} onBack={handleBack} />
            </motion.div>
          )}

          {currentStep === 3 && horoscopeData && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WhatsAppConfirmation
                frequency={frequency as string}
                phoneNumber={userData.phone}
                horoscopeData={horoscopeData}
                onContinue={handleWhatsAppSent}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {currentStep === 4 && horoscopeData && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShareResult
                frequency={frequency as string}
                horoscopeData={horoscopeData}
                onRestart={handleRestart}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
