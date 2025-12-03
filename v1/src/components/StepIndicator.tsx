import { motion } from 'motion/react';
import { User, Calendar, MessageCircle, Share2 } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Your Info', icon: User },
  { number: 2, label: 'Frequency', icon: Calendar },
  { number: 3, label: 'Receive', icon: MessageCircle },
  { number: 4, label: 'Share', icon: Share2 },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Steps Row */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex flex-col items-center relative z-10" style={{ flex: index < steps.length - 1 ? '0 0 auto' : undefined }}>
                <motion.div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#7F5AF0] to-[#BF93F9] border-[#BF93F9] shadow-[0_0_30px_rgba(127,90,240,0.8)]'
                      : isCompleted
                      ? 'bg-gradient-to-br from-[#7F5AF0] to-[#BF93F9] border-[#7F5AF0] shadow-[0_0_20px_rgba(127,90,240,0.5)]'
                      : 'bg-[#1B1B2F]/80 border-[#7F5AF0]/40 shadow-[0_0_10px_rgba(127,90,240,0.2)]'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    boxShadow: isActive 
                      ? [
                          '0 0 30px rgba(127,90,240,0.8)',
                          '0 0 40px rgba(191,147,249,0.9)',
                          '0 0 30px rgba(127,90,240,0.8)',
                        ]
                      : undefined,
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive || isCompleted ? 'text-[#F7EDEA]' : 'text-[#BF93F9]'
                    }`}
                  />
                </motion.div>
                <span
                  className={`mt-3 text-xs font-medium whitespace-nowrap ${
                    isActive 
                      ? 'text-[#BF93F9]' 
                      : isCompleted 
                      ? 'text-[#7F5AF0]' 
                      : 'text-[#7F5AF0]/70'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
          
          {/* Connecting Lines - Absolute positioned behind circles */}
          <div className="absolute top-7 left-0 right-0 flex items-center justify-between px-[28px] -z-0">
            {steps.slice(0, -1).map((step, index) => {
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={`line-${index}`} className="h-1 bg-[#1B1B2F]/60 border border-[#7F5AF0]/20 rounded-full overflow-hidden" style={{ width: 'calc((100% - 0px) / 3)' }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7F5AF0] via-[#BF93F9] to-[#7F5AF0] shadow-[0_0_10px_rgba(127,90,240,0.6)]"
                    initial={{ width: '0%' }}
                    animate={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
