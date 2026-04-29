"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Symulacja zeskanowania kodu QR przez pracownika (np. kelnerkę)
  const handleSimulateScan = () => {
    // Tutaj w przyszłości podepniemy logikę ze store.tsx, np. login("ID_PRACOWNIKA")
    // Na ten moment kliknięcie w QR od razu wpuszcza nas do panelu kelnerki
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] font-sans text-[#0B192C] flex flex-col">
      {/* TOP BAR */}
      <div className="bg-[#0B192C] text-white flex items-center px-10 py-5 border-b-[6px] border-[#BE9135]">
        <div className="flex items-center gap-6">
          <div className="border border-[#BE9135] rounded-lg px-3 py-2 flex items-center justify-center">
            <span className="text-[#BE9135] font-serif text-3xl font-bold leading-none">
              ŚM
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-serif font-bold tracking-wide">
              Św. Michał <span className="mx-2">—</span> Burger Lunch Club
            </h1>
            <span className="text-[#BE9135] text-xs uppercase tracking-widest mt-1 font-bold">
              Burger Lunch Club
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-[#BE9135] p-12 max-w-2xl w-full shadow-sm text-center">
          {/* Ozdobna ikonka na górze z makiety */}
          <div className="flex justify-center mb-6 text-[#BE9135]">
            <svg
              width="32"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>

          <h2 className="text-[#0B192C] font-serif text-3xl font-bold uppercase tracking-wider mb-4">
            ZESKANUJ QR PRACOWNIKA
          </h2>

          <p className="text-[#0B192C] text-lg mb-10 font-medium">
            Przyłóż identyfikator pracownika do skanera
          </p>

          {/* QR PLACEHOLDER - Klikalny do symulacji skanera */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleSimulateScan}
              className="w-64 h-64 p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-[#BE9135] cursor-pointer shadow-sm group"
              title="Kliknij, aby zasymulować zeskanowanie karty pracownika"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#0B192C] group-hover:scale-105 transition-transform duration-300"
              >
                <path
                  fill="currentColor"
                  d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v20H40zM40 40h20v20H40zM40 80h20v20H40zM0 40h20v20H0zM80 40h20v20H80zM70 70h30v10H70zM70 90h10v10H70zM90 90h10v10H90z"
                />
                <path
                  fill="currentColor"
                  d="M30 30h10v10H30zM60 30h10v10H60zM30 60h10v10H30zM60 60h10v10H60zM20 50h10v10H20zM70 50h10v10H70zM50 20h10v10H50zM50 70h10v10H50zM20 40h10v10H20zM30 10h10v10H30zM60 80h10v10H60z"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            System loguje pracownika i zapisuje jego akcje w audycie
          </p>
        </div>
      </div>
    </div>
  );
}
