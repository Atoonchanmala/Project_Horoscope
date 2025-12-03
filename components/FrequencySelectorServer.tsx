'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sun, Calendar, CalendarRange, Sparkles, ArrowLeft } from 'lucide-react';
import { BsCheckCircleFill } from "react-icons/bs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import la from '@/i18n/lo';

// =================== mock card data ====================
const frequencies = [
  {
    id: 'daily' as const,
    title: `${la.openDay}`,
    description: `${la.descriptionDay}`, // Receive cosmic guidance every day
    icon: Sun,
    color: 'from-[#FFCB6B] to-[#F7EDEA]',
    glow: 'rgba(255, 203, 107, 0.4)',
  },
  {
    id: 'weekly' as const,
    title: `${la.openWeekly}`,
    description: `${la.descriptionWeekly}`, // Weekly insights for your journey
    icon: Calendar,
    color: 'from-[#7F5AF0] to-[#BF93F9]',
    glow: 'rgba(127, 90, 240, 0.4)',
  },
  {
    id: 'monthly' as const,
    title: `${la.openMonthly}`,
    description: `${la.descriptionMonth}`, // Deep monthly astrological analysis
    icon: CalendarRange,
    color: 'from-[#BF93F9] to-[#7F5AF0]',
    glow: 'rgba(191, 147, 249, 0.4)',
  },
];

export function FrequencySelectorServer() {
  const router = useRouter();
  const [selectedFrequency, setSelectedFrequency] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = async () => {
    if (!selectedFrequency) return;
    setIsSubmitting(true);

    localStorage.setItem("plan", selectedFrequency);

    try {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        router.push("/step1");
        return;
      }

      const userData = JSON.parse(storedUser);

      const payload = {
        phone: userData.phone,
        birthdate: userData.birthdate,
        gender: userData.gender,
        plan: selectedFrequency,
      };

      const res = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("response data: ", data);

      if (!res.ok) throw new Error("API request failed");

      localStorage.setItem("horoscopeData", JSON.stringify(data));

      router.push('/step3');

    } catch (err) {
      console.error('Error generating horoscope:', err);
      setIsSubmitting(false);
    }
  };

  // =========== function auto plugin =============== 
   const autoplayPlugin = useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-[#FFCB6B]" />
          <h2 className="text-[#F7EDEA] text-sm font-normal">
            {/* Choose Your Reading Frequency */}
            {la.choose}
          </h2>
        </div>
          <h3 className="text-[#F7EDEA] text-sm font-normal">
            {/* Select how often you like to receive cosmic wisdom */}
            {la.SelectHoroscope}
          </h3>
      </motion.div>

      {/* Categories Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1B1B2F]/40 border border-[#7F5AF0]/30 backdrop-blur-sm rounded-lg p-6"
      >
        <div className="text-center mb-6">
          <h3 className="text-[#F7EDEA] flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#FFCB6B]" />
            <span>
              {/* Your Horoscope Categories */}
              {la.horoScopeCategory}
            </span>
          </h3>
          <p className="text-[#E0E0E0]/70 text-sm">
            Personalized insights delivered to you
          </p>
        </div>

        <Carousel
          plugins={[autoplayPlugin.current]}
          opts={{
            align: "start",
            loop: true,
            duration: 50, // Ultra-smooth 60fps animation (50 frames for smooth transition)
            skipSnaps: false,
            dragFree: false,
            slidesToScroll: 1,
          }}
          className="w-full max-w-5xl mx-auto"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="-ml-2 md:-ml-4" style={{ 
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform'
          }}>
            {/* Finance */}
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center transition-all duration-300 h-full"
              >
                <div className="text-3xl mb-2">💰</div>
                <div className="text-[#F7EDEA] text-sm">
                  {/* Finance */}
                  {la.finance}
                </div>
              </motion.div>
            </CarouselItem>

            {/* Career */}
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center transition-all duration-300 h-full"
              >
                <div className="text-3xl mb-2">💼</div>
                <div className="text-[#F7EDEA] text-sm">
                  {/* Career */}
                  {la.carer}
                </div>
              </motion.div>
            </CarouselItem>

            {/* Love */}
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center transition-all duration-300 h-full"
              >
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-[#F7EDEA] text-sm">
                  {/* Love */}
                  {la.lovely}
                </div>
              </motion.div>
            </CarouselItem>

            {/* Health */}
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center transition-all duration-300 h-full"
              >
                <div className="text-3xl mb-2">🧘</div>
                <div className="text-[#F7EDEA] text-sm">
                  {/* Health */}
                  {la.health}
                </div>
              </motion.div>
            </CarouselItem>

            {/* Lucky Color */}
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center transition-all duration-300 h-full"
              >
                <div className="text-3xl mb-2">🌈</div>
                <div className="text-[#F7EDEA] text-sm">
                  {/* Lucky Color */}
                  {la.LuckyColor}
                </div>
              </motion.div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </motion.div>

      {/* Frequency Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-5">
        {frequencies.map((frequency) => {
          const Icon = frequency.icon;
          const isSelected = selectedFrequency === frequency.id;
          return (
            <motion.div
              key={frequency.id}
              onClick={() => setSelectedFrequency(frequency.id)}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: `0 10px 25px ${frequency.glow}`,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className={`relative cursor-pointer p-6 border-2 rounded-xl
                ${isSelected ? 'border-[#7F5AF0]' : 'border-[#7F5AF0]/30'}
              `}
            >

              {/* ✓ Check icon when selected */}
              {isSelected && (
                <div className="absolute bottom-42 left-60">
                  <BsCheckCircleFill className="w-8 h-8 text-[#7F5AF0] "/>
                </div>
              )}

              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${frequency.color} flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 text-black" />
                </div>
              </div>

              <h3 className="text-center text-white text-lg">{frequency.title}</h3>
              <p className="text-center text-gray-300 text-sm">
                {frequency.description}
              </p>
            </motion.div>

          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={() => router.push('/step1')} variant="outline">
          <ArrowLeft className="mr-2" /> 
          {/* Back */}
          {la.back}
        </Button>

        <Button
          onClick={handleSelect}
          disabled={!selectedFrequency || isSubmitting}
          className=" bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300"
        >
          {isSubmitting ? "ກຳລັງທຳນາຍດວງສະຕາ..." : `${la.buttonHoroScope}`}
        </Button>

      </div>
    </div>
  );
}
