import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserInfoForm } from './components/UserInfoForm';
import { FrequencySelector } from './components/FrequencySelector';
import { WhatsAppConfirmation } from './components/WhatsAppConfirmation';
import { ShareResult } from './components/ShareResult';
import { BackOffice } from './components/BackOffice';
import { Button } from './components/ui/button';
import { Settings } from 'lucide-react';
import logoImage from 'figma:asset/bbc7e7be3abb244bf87b69f0d4ce2499833be811.png';

export interface UserData {
  phoneNumber: string;
  dateOfBirth: Date | undefined;
  gender: string;
  maritalStatus: string;
}

export interface HoroscopeData {
  finance: string;
  career: string;
  love: string;
  health: string;
  luckyColor: string;
  unluckyColor: string;
  luckyNumber: string;
}

export default function App() {
  const [isBackOffice, setIsBackOffice] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    phoneNumber: '',
    dateOfBirth: undefined,
    gender: '',
    maritalStatus: '',
  });
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | ''>('');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);

  // If back office mode is active, show back office
  if (isBackOffice) {
    return <BackOffice onExit={() => setIsBackOffice(false)} />;
  }

  const handleUserInfoSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handleFrequencySelect = (freq: 'daily' | 'weekly' | 'monthly') => {
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
      phoneNumber: '',
      dateOfBirth: undefined,
      gender: '',
      maritalStatus: '',
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
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
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

      {/* Admin Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-4 z-20"
      >
        <Button
          onClick={() => setIsBackOffice(true)}
          variant="outline"
          className="bg-[#1B1B2F]/80 backdrop-blur-sm border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9]"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </motion.div>

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
            <motion.img
              src={logoImage}
              alt="Galactic Star Astrology AI Logo"
              className="w-full max-w-md mx-auto h-auto"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
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
          <h1 className="text-[#F7EDEA] mb-2">Galactic Star Astrology</h1>
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
              <UserInfoForm onSubmit={handleUserInfoSubmit} initialData={userData} />
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
                phoneNumber={userData.phoneNumber}
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
