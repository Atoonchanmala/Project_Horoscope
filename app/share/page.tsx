import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { ShareResultServer } from '@/components/ShareResultServer'
import { getFrequency, getHoroscopeData } from '@/actions/horoscope-actions';

export default async function SharePage() {
  // Get data from cookies
  const frequency = await getFrequency();
  const horoscopeData = await getHoroscopeData();

  // Redirect if data is missing
  if (!frequency || !horoscopeData) {
    // redirect('/user-info');
    redirect('/step1');
  }

  return (
    <AppLayout>
      <ShareResultServer
        frequency={frequency}
        horoscopeData={horoscopeData}
      />
    </AppLayout>
  );
}
