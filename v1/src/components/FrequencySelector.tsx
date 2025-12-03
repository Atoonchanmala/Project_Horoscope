import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sun, Calendar, CalendarRange, Sparkles, ArrowLeft } from 'lucide-react';

interface FrequencySelectorProps {
  onSelect: (frequency: 'daily' | 'weekly' | 'monthly') => void;
  onBack: () => void;
}

const frequencies = [
  {
    id: 'daily' as const,
    title: 'Daily Reading',
    description: 'Receive cosmic guidance every day',
    icon: Sun,
    color: 'from-[#FFCB6B] to-[#F7EDEA]',
    glow: 'rgba(255, 203, 107, 0.4)',
  },
  {
    id: 'weekly' as const,
    title: 'Weekly Reading',
    description: 'Weekly insights for your journey',
    icon: Calendar,
    color: 'from-[#7F5AF0] to-[#BF93F9]',
    glow: 'rgba(127, 90, 240, 0.4)',
  },
  {
    id: 'monthly' as const,
    title: 'Monthly Reading',
    description: 'Deep monthly astrological analysis',
    icon: CalendarRange,
    color: 'from-[#BF93F9] to-[#7F5AF0]',
    glow: 'rgba(191, 147, 249, 0.4)',
  },
];

export function FrequencySelector({ onSelect, onBack }: FrequencySelectorProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<
    'daily' | 'weekly' | 'monthly' | null
  >(null);

  const handleSelect = () => {
    if (selectedFrequency) {
      onSelect(selectedFrequency);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-[#FFCB6B]" />
          <h2 className="text-[#F7EDEA]">Choose Your Reading Frequency</h2>
        </div>
        <p className="text-[#E0E0E0]">
          Select how often you'd like to receive cosmic wisdom
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {frequencies.map((frequency, index) => {
          const Icon = frequency.icon;
          const isSelected = selectedFrequency === frequency.id;

          return (
            <motion.div
              key={frequency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                onClick={() => setSelectedFrequency(frequency.id)}
                className={`relative p-6 cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'bg-[#1B1B2F]/80 border-[#7F5AF0] shadow-[0_0_30px_' +
                      frequency.glow +
                      ']'
                    : 'bg-[#1B1B2F]/40 border-[#7F5AF0]/30 hover:border-[#7F5AF0]/60'
                } backdrop-blur-sm`}
              >
                {/* Tarot-style corner decoration */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#FFCB6B] opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#FFCB6B] opacity-50"></div>

                {/* Icon with gradient */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${frequency.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-[#0D0D12]" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-[#F7EDEA]">{frequency.title}</h3>
                  <p className="text-[#E0E0E0] text-sm">
                    {frequency.description}
                  </p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(127,90,240,0.8)]"
                  >
                    <span className="text-[#F7EDEA]">✓</span>
                  </motion.div>
                )}

                {/* Mystical symbols */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                  <motion.div
                    className="absolute top-4 right-4 text-[#FFCB6B] opacity-20 text-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    ✦
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 text-[#BF93F9] opacity-20 text-xl"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  >
                    ✧
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Back Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Get Horoscope Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedFrequency ? 1 : 0.5 }}
        >
          <motion.div
            whileHover={selectedFrequency ? { scale: 1.05 } : {}}
            whileTap={selectedFrequency ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={handleSelect}
              disabled={!selectedFrequency}
              className="px-12 py-6 bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_25px_rgba(127,90,240,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="mr-2" />
              Get Your Horoscope
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
