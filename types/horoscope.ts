export interface UserData {
  phone: string;
  birthdate: string;  // string
  gender: string;
  plan: string; // plan
}

export interface HoroscopeData {
  horo_id: string,
  horoscope: string,
  phone: string,
  status: string
}

export type FrequencyType = 'daily' | 'weekly' | 'monthly';

export interface interfaceShareResult {
  id: string,
  user_id: string,
  content: string,
  created_at: string,
}