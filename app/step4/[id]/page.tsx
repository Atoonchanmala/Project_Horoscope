'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { AppLayout } from '@/components/AppLayout';
import { ShareResult } from '@/components/ShareResult';
import { HoroscopeData } from '@/types/horoscope';

export default function Step4Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [frequency, setFrequency] = useState<string>('');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(true);

  const isSharedView = searchParams.get('shared') === 'true';

  useEffect(() => {
    const loadData = () => {
      try {
        const storedFrequency = localStorage.getItem('plan');
        const storedHoroscope = localStorage.getItem('horoscopeData');

        if (!storedFrequency || !storedHoroscope) {
          router.push('/step1');
          return;
        }

        setFrequency(storedFrequency);
        setHoroscopeData(JSON.parse(storedHoroscope));
      } catch (err) {
        console.error('Error loading confirmation data:', err);
        router.push('/step1');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleRestart = () => {
    sessionStorage.clear();
    router.push('/step1');
  };

  const handleBack = () => {
    router.push('/step3');
  };

  if (!horoscopeData) return null;

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <ShareResult
          frequency={frequency}
          horoscopeData={horoscopeData.horoscope}
          horoscopeId={horoscopeData.horo_id}
          onRestart={handleRestart}
          onBack={handleBack}
          // hideShareButtons={isSharedView} // ซ่อนปุ่ม share ถ้าเป็น shared view
        />
      </motion.div>
    </AppLayout>
  );
}
