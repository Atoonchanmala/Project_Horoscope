//================= API Client call =================
import ky from 'ky';

// ================================ config API =================================
const API_BASE_URL = 'http://84.247.151.7:8080/api/v1';
const API_KEY = 'rkZSHioAbolQpLHBNaAI5uVVf/2xRzrc6pntY0b/05k=';

export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 300000, // timeout
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
  hooks: {
    beforeRequest: [
      (request) => console.log('API Request:', request.url)
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const error = await response.text();
          console.error('API Error:', error);
        }
        console.log("response data: ",response);

        return response;
      }
    ],
  },
});

// ========================== API Types =========================
export interface GenerateHoroscopeRequest {
  phone: string;
  birthdate: string; // YYYY-MM-DD
  gender: 'male' | 'female';
  plan: 'daily' | 'weekly' | 'monthly';
}

export interface HoroscopeItem {
  content: string;
  title?: string;
  category?: string;
}

export interface GenerateHoroscopeResponse {
  horoscope: HoroscopeItem[];
}

//=========================== API Functions =======================
export const horoscopeAPI = {
  async generate(data: GenerateHoroscopeRequest): Promise<GenerateHoroscopeResponse> {
    try {
      const response = await apiClient.post('subscription', { json: data }).json<GenerateHoroscopeResponse>();
      console.log('API response:', response);

      return response;
    } catch (error) {
      console.error('Error generating horoscope:', error);
      throw new Error('Failed to generate horoscope');
    }
  }
};