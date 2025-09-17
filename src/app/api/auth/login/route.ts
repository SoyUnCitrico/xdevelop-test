import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();
  console.log(API_CONFIG)
  // Autenticación contra ReqRes
  const res = await fetch(`${API_CONFIG.REQRES}/login`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        'x-api-key': 'reqres-free-v1',
    },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  if (!res.ok || !data.token) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Crea respuesta con cookies
  const response = NextResponse.json({ token: data.token });

  response.cookies.set("accessToken", data.token, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 min
  });

  // refreshToken simulado como HttpOnly 
  response.cookies.set("refreshToken", "fake-refresh-token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 1, // 7 días
  });

  response.cookies.set("role", role, {
    httpOnly: false, // accesible en JS
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
