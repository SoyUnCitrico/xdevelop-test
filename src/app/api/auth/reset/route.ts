import { NextResponse } from "next/server";
import Cookies
 from "js-cookie";
export async function POST() {
    Cookies.remove("accessToken");
    const response = NextResponse.json({ success: true, message: "Sesión reseteada" });    
    response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
    response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });

    return response;
}
