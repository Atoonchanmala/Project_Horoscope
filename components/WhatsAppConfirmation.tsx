'use client';

import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';
import la from '@/i18n/lo';

// =================== Modal WhatsApp Confirmation Props ====================
interface WhatsAppConfirmationProps {
  frequency: string;
  phoneNumber: string;
  // horoscopeData: HoroscopeData;
  horoscopeData: string;
  onContinue: () => void;
  onBack: () => void;
}

export function WhatsAppConfirmation({
  frequency,
  phoneNumber,
  horoscopeData,
  onContinue,
  onBack,
}: WhatsAppConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-[#1B1B2F]/60 border-[#7F5AF0]/30 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(127,90,240,0.3)]">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#7F5AF0] to-[#BF93F9] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(127,90,240,0.6)]">
              <CheckCircle className="w-10 h-10 text-[#F7EDEA]" />
            </div>
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#7F5AF0]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        {/* Message */}
        <div className="text-center mb-8">
          <h2 className="text-[#F7EDEA] text-xl font-semibold mb-3">
            ✨ ຄຳທຳນາຍດວງແບບ {frequency} ຂອງເຈົ້າພ້ອມໃຫ້ອ່ານແລ້ວ!
            {/* ມາຄິດໃຫມ່ມມມມ */}
            
          </h2>
          <p className="text-[#E0E0E0] text-md">
            Your personalized cosmic reading has been prepared and will be sent to{' '}
            <span className="text-[#FFCB6B]">{phoneNumber}</span> via WhatsApp
          </p>
        </div>

        {/* WhatsApp Preview Card */}
        <div className="bg-[#0D0D12]/80 border border-[#7F5AF0]/40 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#7F5AF0]/20">
            <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[#F7EDEA] text-sm">
                {/* Galactic Star Astrology */}
                {la.horoscope}
              </p>
              <p className="text-[#E0E0E0] text-sm">
                {/* Cosmic Guidance */}
                {la.horoscopeTitle}
              </p>
            </div>
          </div>

          {/* Horoscope Preview */}
          <div className="space-y-3 text-sm text-[#E0E0E0] leading-relaxed">
            <div className="bg-[#1F1F2E] p-4 rounded-xl shadow-md border border-[#7F5AF0]/20 whitespace-pre-line">
              {horoscopeData}
            </div>
          </div>

          {/* Mystical Footer */}
          <div className="mt-6 pt-4 border-t border-[#7F5AF0]/20 text-center">
            <p className="text-[#BF93F9] text-sm italic">
              {/* &quot;May the stars guide your journey&quot; ✨ */}
              &quot;{la.slogan}&quot; ✨
            </p>
          </div>
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#7F5AF0]/10 border border-[#7F5AF0]/30 rounded-lg p-4 mb-6"
        >
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-[#FFCB6B] flex-shrink-0 mt-0.5" />
            <div className="flex text-[#E0E0E0]" style={{fontSize:"13px"}}>
              <strong className="text-[#F7EDEA]">{la.note}:</strong> 
              <p className='px-1'>{la.noteScript}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300"
            >
              <ArrowLeft className="mr-2" />
              {la.back}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300"
            >
              {la.shareHoroscope}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
