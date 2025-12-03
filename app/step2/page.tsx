'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { FrequencySelectorServer } from '@/components/FrequencySelectorServer';
import type { UserData } from '@/types/horoscope';

export default function Step2Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      router.push('/step1');
      return;
    }
    // setUserData(JSON.parse(storedUserData));
    setTimeout(() => {
      setUserData(JSON.parse(storedUserData));
    }, 0);

  }, [router]);

  if (!userData) return null; 

  return (
    <AppLayout>
      <FrequencySelectorServer />
    </AppLayout>
  );
}
