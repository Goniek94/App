"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRPlaceholder } from "@/components/QRPlaceholder";

export default function LoginPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F1D38] border-b border-[#1E3455] px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-[0_0_16px_rgba(212,175,55,0.3)]">
          <span className="text-[#0B1426] font-black text-xs">ŚM</span>
        </div>
        <div>
          <span className="text-[#F5F0E8] font-bold text-sm">Św. Michał — Burger Lunch Club</span>
          <p className="text-[#D4AF37] text-[10px] font-semibold tracking-[0.2em] uppercase leading-none">Burger Lunch Club</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          {/* Cream card */}
          <div
            onClick={handleScan}
            className="bg-[#FAF6EE] border border-[#E0D5BE] rounded-2xl shadow-[0_16px_60px_rgba(4,12,30,0.6)] cursor-pointer select-none overflow-hidden group active:scale-[0.99] transition-transform duration-150"
          >
            {/* Gold top strip */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#EDCA3E] to-[#D4AF37]" />

            <div className="p-8 flex flex-col items-center">
              {/* Scanner frame icon */}
              <div className="mb-5 text-[#C8A84B]">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 10V5a1 1 0 011-1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 10V5a1 1 0 00-1-1h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 18v5a1 1 0 001 1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 18v5a1 1 0 01-1 1h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <h1 className="text-[#1A2540] font-black text-xl uppercase tracking-wide text-center mb-1">
                Zeskanuj QR pracownika
              </h1>
              <p className="text-[#8B7A5A] text-sm text-center mb-7">
                Przyłóż identyfikator pracownika do skanera
              </p>

              {/* QR Code */}
              <div className={`transition-all duration-300 ${scanning ? "opacity-50 scale-95" : "group-hover:scale-105"}`}>
                <div className="p-3 bg-white border-2 border-[#E0D5BE] rounded-xl shadow-sm">
                  <QRPlaceholder size={148} seed="employee-login" light />
                </div>
              </div>

              {scanning && (
                <div className="mt-5 flex items-center gap-2 text-[#C8A84B]">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span className="text-sm font-semibold">Weryfikowanie...</span>
                </div>
              )}

              {!scanning && (
                <p className="mt-6 text-[#B8A889] text-xs text-center">
                  Kliknij aby zasymulować skan
                </p>
              )}
            </div>

            <div className="px-6 pb-5 text-center">
              <p className="text-[#C8B89A] text-[11px]">
                System loguje pracownika i zapisuje jego akcje w audycie
              </p>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#EDCA3E] to-[#D4AF37]" />
          </div>
        </div>
      </main>
    </div>
  );
}
