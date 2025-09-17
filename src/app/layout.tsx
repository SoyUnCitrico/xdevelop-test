"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const hydrateFromCookies = useAuthStore((s) => s.hydrateFromCookies);

  useEffect(() => {
    hydrateFromCookies(); // sincroniza cookies a store
  }, [hydrateFromCookies]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
