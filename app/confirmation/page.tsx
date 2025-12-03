import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { WhatsAppConfirmationServer } from '@/components/WhatsAppConfirmationServer';
import { getUserData, getFrequency, getHoroscopeData } from '@/actions/horoscope-actions';

export default async function ConfirmationPage() {
  const phone = await getUserData();
  const frequency = await getFrequency();
  const horoscopeData = await getHoroscopeData(); // call form API back-end

  console.log("phone: ", phone);
  console.log("frequency: ", frequency);
  console.log("horoscopeData", horoscopeData);
  
  // Redirect if data is missing
  if (!phone || !frequency || !horoscopeData) { 
    // ====> get local response // frequency ===> plan , horoScopeData ====> get response API , phone ===> phone
    redirect('/step1');
  }

  return (
    <AppLayout>
      <WhatsAppConfirmationServer  // children props
        frequency={frequency}
        phoneNumber={phone}
        horoscopeData={horoscopeData}
      />
    </AppLayout>
  );
}
