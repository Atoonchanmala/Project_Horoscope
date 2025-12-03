'use client';

import { motion } from 'motion/react';
import { AppLayout } from '@/components/AppLayout';
import { UserInfoForm } from '@/components/UserInfoForm';
import { UserData } from '@/types/horoscope';

export default function Step1Page() {
  const initialData: UserData = {
    phone: '',
    birthdate: '',
    gender: '',
    plan: '',
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <UserInfoForm initialData={initialData} />
      </motion.div>
    </AppLayout>
  );
}
