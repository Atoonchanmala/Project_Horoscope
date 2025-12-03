// app/api/horoscope/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';

const API_BASE_URL = 'http://84.247.151.7:8080/api/v1'; //env
const API_KEY = 'rkZSHioAbolQpLHBNaAI5uVVf/2xRzrc6pntY0b/05k='; //env

// ============== function POST horoscope ==============
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    console.log("payload:", payload);

    const response = await ky
      .post(`${API_BASE_URL}/subscription`, {
        json: payload,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "Accept": "application/json",
        },
        timeout: 100000,  // timeout call API 30000
        throwHttpErrors: false,   
      });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          serverResponse: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (err: unknown) {
    console.error("Unexpected error:", err);

    const message =
      err instanceof Error ? err.message : "Unknown server error";

    return NextResponse.json(
      { error: "API request failed", message },
      { status: 500 }
    );
  }
}

