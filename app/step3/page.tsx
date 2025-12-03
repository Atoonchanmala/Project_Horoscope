'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { AppLayout } from '@/components/AppLayout';
import { WhatsAppConfirmation } from '@/components/WhatsAppConfirmation';
import { HoroscopeData, UserData } from '@/types/horoscope';

export default function Step3Page() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [frequency, setFrequency] = useState<string>('');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
  // const [horoscopeData, setHoroscopeData] = useState<string>('');
  const [loading, setLoading] = useState(true);

  console.log("userData: ", userData);
  console.log("plan: ", frequency);
  console.log("horoscope: ", horoscopeData?.horoscope);
  
  useEffect(() => {
    const loadData = () => {
      try {
        // ===================== Get User info (phone, birthdate, gender) =====================
        const storedUserData = localStorage.getItem('userData');
        const storedFrequency = localStorage.getItem('plan');
        const storedHoroscope = localStorage.getItem('horoscopeData'); // get br dai

        // If any required data missing → restart flow
        if (!storedUserData || !storedFrequency || !storedHoroscope) {
          router.push('/step1');
          return;
        }

        // Parse Data
        setUserData(JSON.parse(storedUserData));
        setFrequency(storedFrequency);
        setHoroscopeData(JSON.parse(storedHoroscope));
      } 
      catch (err) {
        console.error('Error loading confirmation data:', err);
        router.push('/step1');

      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  // ================= LOADING UI =================
  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your horoscope...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!userData || !horoscopeData) {
    return null;
  }

  // function handleContinue
      const handleContinue = () =>{
        if(!horoscopeData?.horo_id){
          console.error("not fount error page 4");
          return;
        }
        router.push(`/step4/${horoscopeData.horo_id}`);
      };

  // function handleBack
  const handleBack = () => router.push('/step2');

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <WhatsAppConfirmation
          frequency={frequency}
          phoneNumber={userData.phone}
          horoscopeData={horoscopeData.horoscope}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      </motion.div>
    </AppLayout>
  );
};
