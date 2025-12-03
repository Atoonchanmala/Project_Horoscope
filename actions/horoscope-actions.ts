'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { horoscopeAPI } from '@/lib/api-client';
import type { GenerateHoroscopeRequest } from '@/lib/api-client';

// Validation schemas
const userInfoSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  birthdate: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  plan: z.string().optional(),
});

const frequencySchema = z.enum(['daily', 'weekly', 'monthly']);


// ========= function Save userInfo ============
export async function saveUserInfo(formData: FormData) {  // form userData
  const userData = {
    phone: String(formData.get("phone")),
    birthdate: String(formData.get("birthdate")), 
    gender: String(formData.get("gender")), 
  };

  // Validate userData
  const validation = userInfoSchema.safeParse(userData);
  if (!validation.success) {
    console.error("User info validation failed", validation.error);
    return { error: 'Invalid user data' };
  }

  const cookieStore = await cookies(); // ປ່ຽນດືງ cookie -----> Local ໃນຝັ່ງຂອງ client
  cookieStore.set("userData", JSON.stringify(validation.data), {
    httpOnly: true,
    path: "/",
  });

  redirect("/step2");
}

// ========= function Save frequency ============
export async function saveFrequency(plan: 'daily' | 'weekly' | 'monthly') {
  // Validate plan
  const planValidation = frequencySchema.safeParse(plan);
  if (!planValidation.success) {
    console.error("Frequency validation failed", planValidation.error);
    return { error: 'Invalid frequency' };
  }

  // ປ່ຽນໃຫມ່
  const cookieStore = await cookies();
  const userDataStr = cookieStore.get("userData")?.value;
  if (!userDataStr) return { error: "User data not found" };

  const userData = JSON.parse(userDataStr);

  // เตรียม payload
  const payload: GenerateHoroscopeRequest = {
    birthdate: userData.birthdate,
    gender: userData.gender,
    phone: userData.phone,
    plan: planValidation.data,
  };

  // ✅ Log ข้อมูลที่จะส่งทั้งหมด
  console.log("Payload sent to Horoscope API:", JSON.stringify(payload, null, 2));

  try {
    // เรียก API
    const result = await horoscopeAPI.generate(payload);

    // ✅ Log response จาก API ครบทุก field
    console.log("Horoscope API full response:", JSON.stringify(result, null, 2));

    // Transform response สำหรับ UI
    const transformed = transformHoroscopeResponse(result.horoscope || []);

    // เก็บลง cookie
    cookieStore.set("horoscopeData", JSON.stringify(transformed), {
      httpOnly: true,
      path: "/",
    });

    // Return กลับ client
    return { success: true, apiResponse: result, transformed };
    
  } catch (error) {
    console.error("Error generating horoscope:", error.json());
    return { error: "Failed to generate horoscope" };
  }
}

// Helper function to transform API response to our UI format
function transformHoroscopeResponse(
  horoscope: string | Array<{ content: string; title?: string; category?: string }>
) {
  const categoryMap: Record<string, string> = {
    finance: 'finance',
    career: 'career',
    love: 'love',
    health: 'health',
    'lucky color': 'luckyColor',
    'unlucky color': 'unluckyColor',
    'lucky number': 'luckyNumber',
  };

  const result: Record<string, string> = {
    finance: '💰 Financial opportunities are aligning in your favor.',
    career: '💼 Your professional life is entering a transformative phase.',
    love: '❤️ Venus aligns with your sign, bringing harmony to relationships.',
    health: '🧘 Energy levels are high. Focus on balance between activity and rest.',
    luckyColor: '🌈 Cosmic Purple & Mystic Gold',
    unluckyColor: '🌈 Avoid Dark Red & Burnt Orange',
    luckyNumber: '🎲 7, 14, 21',
  };

  // ถ้าเป็น string ให้ใส่ลงใน category "general" แทน
  if (typeof horoscope === 'string') {
    result['general'] = horoscope;
  } else if (Array.isArray(horoscope)) {
    horoscope.forEach((item) => {
      const category = (item.title || item.category || '').toLowerCase();
      const mappedKey = categoryMap[category];
      if (mappedKey && item.content) {
        result[mappedKey] = item.content;
      }
    });
  }

  return result;
}


// Server action to continue to share
export async function continueToShare() {
  redirect('/share');
}

// Server action to restart
export async function restartHoroscope() {
  const cookieStore = await cookies();
  cookieStore.delete('userData');
  cookieStore.delete('frequency');
  cookieStore.delete('horoscopeData');
  redirect('/step1');
}

// Helper to get data from cookies
export async function getUserData() {
  const cookieStore = await cookies();
  const userData = cookieStore.get('userData')?.value;
  return userData ? JSON.parse(userData) : null;
}

export async function getFrequency() {
  const cookieStore = await cookies();
  return cookieStore.get('frequency')?.value || null;
}

export async function getHoroscopeData() {
  const cookieStore = await cookies();
  const data = cookieStore.get('horoscopeData')?.value;
  return data ? JSON.parse(data) : null;
}
