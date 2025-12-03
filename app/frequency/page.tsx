import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { FrequencySelectorServer } from '@/components/FrequencySelectorServer';
import { getUserData } from '@/actions/horoscope-actions';

// ****** ບໍ່ໄດ້ໃຊ້
export default async function FrequencyPage() {
  // Check if user data exists, redirect if not
  const userData = await getUserData();
  
  // if (!userData) {
  //   // redirect('/user-info');
  //   redirect('/step1');
  // }

  return (
    <AppLayout>
      <FrequencySelectorServer />
    </AppLayout>
  );
}
