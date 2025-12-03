// app/api/horoscope/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';

const API_BASE_URL = 'http://84.247.151.7:8080/api/v1'; // env
const API_KEY = 'rkZSHioAbolQpLHBNaAI5uVVf/2xRzrc6pntY0b/05k='; // env

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });

    const url = `${API_BASE_URL}/horoscopes/${encodeURIComponent(id)}`;

    const resp = await ky.get(url, {
      headers: {
        'x-api-key': API_KEY,
        accept: 'application/json',
      },
      throwHttpErrors: false,
      timeout: 100000,  
    });

    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: resp.status });
    } catch {
      return NextResponse.json({ raw: text }, { status: resp.status });
    }
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
