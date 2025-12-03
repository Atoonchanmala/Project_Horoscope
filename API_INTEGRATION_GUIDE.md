# 🚀 API Integration Guide - Horoscope App

## 📋 Overview

This document explains how the Horoscope App integrates with the Supabase backend API using Next.js Server Actions and next-safe-action.

---

## 🏗️ Architecture

```
User Input (Client)
      ↓
Client Component (Form)
      ↓
Server Action
      ↓
API Client (ky)
      ↓
Supabase Functions
      ↓
Response Transform
      ↓
Cookie Storage
      ↓
Server Component (Display)
```

---

## 🔌 API Endpoints

### Base URL
```
https://mftxsldrfwznhcdyeuee.supabase.co/functions/v1
```

### 1. Generate Horoscope
**Endpoint:** `POST /horoscope`

**Request:**
```json
{
  "phone": "2058333487",
  "dob": "1990-01-15",
  "gender": "M",
  "package": "DAY"
}
```

**Response:**
```json
{
  "horoscope": [
    {
      "content": "Your financial prospects look bright...",
      "title": "finance"
    },
    {
      "content": "Career opportunities await...",
      "title": "career"
    }
  ]
}
```

### 2. Get Horoscope
**Endpoint:** `GET /horoscope`

**Request Body:**
```json
{
  "phone": "2058333487"
}
```

**Response:**
```json
{
  "horoscope": [
    {
      "content": "...",
      "category": "finance"
    }
  ]
}
```

### 3. Get User
**Endpoint:** `GET /user`

**Request Body:**
```json
{
  "phone": "2058333487"
}
```

**Response:**
```json
{
  "phone": "2058333487",
  "package": "DAY",
  "lastHoroscrope": "2024-01-15"
}
```

---

## 📁 File Structure

```
actions/
  └── horoscope-actions.ts    # Server actions with API calls

lib/
  ├── api-client.ts           # API client configuration
  └── utils.ts                # Utility functions

components/
  ├── UserInfoFormServer.tsx  # User input form
  ├── FrequencySelectorServer.tsx
  ├── WhatsAppConfirmationServer.tsx
  └── ShareResultServer.tsx

app/
  ├── user-info/
  │   └── page.tsx           # Server component
  ├── frequency/
  │   └── page.tsx
  ├── confirmation/
  │   └── page.tsx
  └── share/
      └── page.tsx
```

---

## 🔄 Data Flow

### Step 1: User Info Collection
1. User fills form in `UserInfoFormServer.tsx`
2. Form calls `saveUserInfo()` server action
3. Data validated with Zod
4. Saved to HTTP-only cookies
5. Redirect to `/frequency`

### Step 2: Frequency Selection & API Call
1. User selects frequency in `FrequencySelectorServer.tsx`
2. Calls `saveFrequency()` server action
3. **Retrieves user data from cookies**
4. **Maps data to API format:**
   - `male/female/other` → `M/F`
   - `daily/weekly/monthly` → `DAY/WEEK/MONTH`
5. **Calls Supabase API** via `horoscopeAPI.generate()`
6. **Transforms API response** to UI format
7. Saves to cookies
8. Redirect to `/confirmation`

### Step 3: Confirmation Display
1. Server component reads from cookies
2. Displays horoscope preview
3. User continues to share

### Step 4: Share Result
1. Server component reads from cookies
2. Displays full horoscope
3. Social sharing options
4. Restart clears cookies

---

## 🔐 Data Mapping

### Gender Mapping
```typescript
Frontend → API
--------------
'male'   → 'M'
'female' → 'F'
'other'  → 'M'
```

### Package Mapping
```typescript
Frontend  → API
----------------
'daily'   → 'DAY'
'weekly'  → 'WEEK'
'monthly' → 'MONTH'
```

### Category Mapping
```typescript
API Response → UI Format
-------------------------
'finance'      → finance
'career'       → career
'love'         → love
'health'       → health
'lucky color'  → luckyColor
'unlucky color'→ unluckyColor
'lucky number' → luckyNumber
```

---

## 🛠️ Key Functions

### `horoscopeAPI.generate()`
Located in: `lib/api-client.ts`

Calls the POST /horoscope endpoint to generate a new horoscope.

```typescript
const response = await horoscopeAPI.generate({
  phone: '2058333487',
  dob: '1990-01-15',
  gender: 'M',
  package: 'DAY',
});
```

### `saveFrequency()`
Located in: `actions/horoscope-actions.ts`

Server action that:
1. Validates frequency
2. Gets user data from cookies
3. Calls API
4. Transforms response
5. Saves to cookies
6. Redirects

### `transformHoroscopeResponse()`
Located in: `actions/horoscope-actions.ts`

Transforms API response array into UI-friendly object:

```typescript
// API Response
[
  { content: "...", title: "finance" },
  { content: "...", title: "career" }
]

// Transformed
{
  finance: "💰 ...",
  career: "💼 ...",
  love: "❤️ ...",
  // ...
}
```

---

## 🔒 Security Features

### HTTP-Only Cookies
- User data stored in HTTP-only cookies
- Not accessible via JavaScript
- Prevents XSS attacks

### Server-Side Validation
- All data validated with Zod schemas
- Type-safe API calls
- Error handling at every step

### Environment Variables
- API URLs in environment variables
- No hardcoded secrets
- Production-ready configuration

---

## 🚨 Error Handling

### API Errors
```typescript
try {
  const response = await horoscopeAPI.generate(data);
} catch (error) {
  console.error('Error generating horoscope:', error);
  return { error: 'Failed to generate horoscope' };
}
```

### Validation Errors
```typescript
const result = userInfoSchema.safeParse(data);
if (!result.success) {
  return { error: result.error.flatten().fieldErrors };
}
```

### Missing Data
```typescript
if (!userData) {
  // redirect('/user-info');
  redirect('/step1');
}
```

---

## 📊 Response Transformation Example

### API Response:
```json
{
  "horoscope": [
    {
      "content": "Financial opportunities are aligning in your favor.",
      "title": "finance"
    },
    {
      "content": "Your professional life is entering a transformative phase.",
      "title": "career"
    }
  ]
}
```

### Transformed for UI:
```typescript
{
  finance: "💰 Financial opportunities are aligning in your favor.",
  career: "💼 Your professional life is entering a transformative phase.",
  love: "❤️ Venus aligns with your sign...",
  health: "🧘 Energy levels are high...",
  luckyColor: "🌈 Cosmic Purple & Mystic Gold",
  unluckyColor: "🌈 Avoid Dark Red & Burnt Orange",
  luckyNumber: "🎲 7, 14, 21"
}
```

---

## 🧪 Testing

### Test API Call
```typescript
// In server action or API route
const response = await horoscopeAPI.generate({
  phone: '2058333487',
  dob: '1990-01-15',
  gender: 'M',
  package: 'DAY',
});

console.log('API Response:', response);
```

### Test Data Flow
1. Fill user info form
2. Check browser cookies (Application tab)
3. Select frequency
4. Check Network tab for API call
5. Verify horoscope display

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://mftxsldrfwznhcdyeuee.supabase.co/functions/v1
```

### API Client Setup
Located in `lib/api-client.ts`:
- Timeout: 30 seconds
- Automatic error logging
- Request/response hooks
- Type-safe responses

---

## 📝 Next Steps

1. ✅ Install dependencies: `yarn install`
2. ✅ Configure environment variables
3. ✅ Test API endpoints
4. ✅ Verify data transformation
5. ✅ Test full user flow
6. ⏳ Add loading states
7. ⏳ Add error UI components
8. ⏳ Add retry logic

---

## 🎯 Benefits of This Architecture

### Server-Side Rendering
- ✅ Better SEO
- ✅ Faster initial load
- ✅ Secure API calls

### Type Safety
- ✅ TypeScript throughout
- ✅ Zod validation
- ✅ API type definitions

### User Experience
- ✅ Progressive enhancement
- ✅ Smooth animations
- ✅ Error handling

### Security
- ✅ HTTP-only cookies
- ✅ Server-side validation
- ✅ No client-side secrets

---

## 📞 Support

For issues or questions:
1. Check API response in Network tab
2. Check server logs for errors
3. Verify cookie storage
4. Test API endpoints directly

---

**Last Updated:** November 5, 2025
**Version:** 1.0.0
