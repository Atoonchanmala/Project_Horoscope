'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Facebook, Instagram, Twitter, Share2, RefreshCw, ArrowLeft } from 'lucide-react';
import la from '@/i18n/lo';
import Toast from './ui/toast';

interface ShareResultProps {
  frequency: string;
  horoscopeData: string;
  horoscopeId: string;
  onRestart: () => void;
  onBack: () => void;
}

const socialPlatforms = [
  {
    name: `${la.itemFacebook}`,
    icon: Facebook,
    color: 'from-[#1877F2] to-[#0C63D4]',
    hoverShadow: 'rgba(24, 119, 242, 0.5)',
  },
  {
    name: `${la.itemTwitter}`,
    icon: Twitter,
    color: 'from-[#1DA1F2] to-[#0C85D0]',
    hoverShadow: 'rgba(29, 161, 242, 0.5)',
  },
  {
    name: `${la.itemIG}`,
    icon: Instagram,
    color: 'from-[#E4405F] via-[#F77737] to-[#FCAF45]',
    hoverShadow: 'rgba(228, 64, 95, 0.5)',
  },
  {
    name: `${la.itemTikTok}`,
    icon: Share2,
    color: 'from-[#FF0050] to-[#00F2EA]',
    hoverShadow: 'rgba(255, 0, 80, 0.5)',
  },
];

export function ShareResult({
  frequency,
  horoscopeData,
  horoscopeId,
  onRestart,
  onBack,
}: ShareResultProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const parseHoroscope = (text: string) => {
    const get = (label: string) => {
      const regex = new RegExp(`${label}:[\\s\\S]*?(?=\\n\\n|$)`, "g");
      const match = text.match(regex);
      return match ? match[0].replace(`${label}:`, "").trim() : "";
    };

    return {
      overall: get("✨ ດວງລວມ"),
      workStudy: get("📚 ການງານ/ການສຶກສາ"),
      health: get("💪 ສຸຂະພາບ"),
      money: get("💰 ການເງິນ"),
      love: get("❤️ ຄວາມຮັກ"),
      blessing: get("🍀 ສິ່ງມຸງຄຸນ"),  
      advice: get("💡 ຄຳແນະນຳ"),
    };
  };

  const sections = parseHoroscope(horoscopeData);

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/share/${horoscopeId}`;

    if (platform === "Facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    } else if (platform === "Twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    } else if (platform === "Instagram" || platform === "TikTok") {
      navigator.clipboard.writeText(shareUrl);
      // alert("Link copied to clipboard!");

      setToastMessage('copy link url success');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Share Card - Preview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gradient-to-br from-[#1B1B2F] via-[#1B1B2F] to-[#7F5AF0]/20 border border-[#7F5AF0]/30 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(127,90,240,0.4)] relative rounded-xl p-8">
          
          {/* Decorative stars */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#F7EDEA] rounded-full"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="inline-block text-5xl mb-4">✨</motion.div>
            <h2 className="text-[#F7EDEA] text-2xl font-semibold mb-2">ຄຳທຳນາຍແບບ {frequency} ຂອງເຈົ້າ</h2>
            <p className="text-[#FFCB6B]">Galactic Star Astrology</p>

            {/* Horoscope Sections */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 font-lao">
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">✨ {la.AllHoroscope}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.overall}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">📚 {la.WorkOrStudent}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.workStudy}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">💪 {la.health}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.health}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">💰 {la.finance}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.money}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">🍀 {la.LuckyColor}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.blessing}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">❤️ {la.lovely}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.love}</p>
              </div>
              <div className="bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line md:col-span-2">
                <h3 className="text-[#FFCB6B] font-semibold mb-2">💡 {la.advice}</h3>
                <p className="text-[#E0E0E0] text-sm leading-relaxed">{sections.advice}</p>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-[#7F5AF0]/20">
              <p className="text-[#BF93F9] text-sm italic">
                The cosmos reveals its secrets to those who listen 🌙
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Instructions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <h3 className="text-[#F7EDEA] text-xl font-semibold mb-2">
          {/* Share Your Cosmic Wisdom */}
          {la.shareMessage}
        </h3>
        <p className="text-[#E0E0E0]">
          {/* Inspire others with your astrological insights */}
          {la.inspireMessage}
        </p>
      </motion.div>

      {/* Social Share Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <motion.div key={platform.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleShare(platform.name)}
                className={`w-full h-24 bg-gradient-to-br ${platform.color} hover:shadow-[0_0_25px_${platform.hoverShadow}] text-white transition-all duration-300 flex flex-col items-center justify-center gap-2`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm">{platform.name}</span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onBack} variant="outline" className="px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300">
            <ArrowLeft className="mr-2" /> Back
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onRestart} variant="outline" className="px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0] text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300">
            <RefreshCw className="mr-2" /> Get Another Reading
          </Button>
        </motion.div>
      </motion.div>

      {/* Thank You Message */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center pt-8 border-t border-[#7F5AF0]/20">
        <p className="text-[#E0E0E0] text-sm">Thank you for trusting the cosmos with your journey 🌟</p>
        <p className="text-[#7F5AF0] text-xs mt-2">May the stars forever be in your favor</p>
      </motion.div>

      {/* toast message */}
      {
        toastMessage &&(
          <div>
            <Toast message={toastMessage} type='success'/>
          </div>
        )
      }
    </div>
  );
}
