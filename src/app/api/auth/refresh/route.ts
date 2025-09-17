import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const refreshToken = (await req.headers.get("cookie"))
    ?.split("; ")
    .find((c) => c.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  // 🔄 Simulamos un nuevo accessToken
  const newAccessToken = "new-fake-access-token-" + Date.now();

  const response = NextResponse.json({ accessToken: newAccessToken });

  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 minutos
  });

  return response;
}
