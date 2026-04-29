"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV = [
  {
    label: "Dashboard", href: "/admin",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>,
  },
  {
    label: "Pracownicy", href: "/admin/pracownicy",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>,
  },
  {
    label: "Karty", href: "/admin/karty",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/></svg>,
  },
  {
    label: "Nagrody", href: "/admin/nagrody",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
  },
  {
    label: "Raporty", href: "/admin/raporty",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  },
  {
    label: "SMS Win-back", href: "/admin/sms-winback",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>,
  },
  {
    label: "Losowania", href: "/admin/losowania",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg>,
  },
  {
    label: "Ustawienia", href: "/admin/ustawienia",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex font-sans bg-[#F8F5F0]">

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <aside className="w-52 bg-[#0C1B2E] flex flex-col shrink-0 fixed top-0 left-0 h-full z-10">

        {/* Logo area */}
        <div className="flex flex-col items-center pt-6 pb-5 border-b border-[#1A2E45]">
          <div className="w-28 h-32 relative flex flex-col items-center justify-center mb-2">
            <div className="absolute top-0 w-10 h-10 rounded-full border-2 border-[#C4952A] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C4952A]">
                <path d="M12 2l2 4 4.5.7-3.25 3.15.77 4.48L12 12.25l-4.02 2.1.77-4.48L5.5 6.7 10 6z" fill="currentColor"/>
              </svg>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-14 h-20 relative">
                <div className="absolute -left-5 top-3 w-5 h-12 bg-gradient-to-r from-transparent to-[#C4952A]/30 rounded-l-full" />
                <div className="absolute -right-5 top-3 w-5 h-12 bg-gradient-to-l from-transparent to-[#C4952A]/30 rounded-r-full" />
                <div className="w-full h-full border-2 border-[#C4952A]/60 rounded-t-full flex items-center justify-center bg-[#0F2238]">
                  <span className="text-[#C4952A] font-serif font-black text-2xl">ŚM</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#C4952A] font-bold text-sm tracking-widest uppercase">ŚW. MICHAŁ</p>
          <p className="text-[#6B7E9F] text-[9px] tracking-[0.2em] uppercase mt-0.5">Burger &amp; More</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors text-left ${
                  isActive
                    ? "bg-[#C4952A]/20 text-[#C4952A] font-bold border-l-4 border-[#C4952A]"
                    : "text-[#6B7E9F] hover:text-white hover:bg-[#162840] border-l-4 border-transparent font-medium"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom burger */}
        <div className="p-4 border-t border-[#1A2E45]">
          <div className="bg-[#0F2238] rounded-xl p-4 flex flex-col items-center gap-1">
            <div className="text-5xl">🍔</div>
            <div className="w-full border-t border-[#C4952A]/30 mt-2 pt-2 text-center">
              <p className="text-[#C4952A]/70 text-[8px] tracking-widest uppercase font-semibold">Burger Lunch Club</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════ MAIN ══════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 ml-52">

        {/* Top header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#C4952A]">
              <path d="M3 17l3-8 4 5 4-9 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h1 className="text-[#0B1A2C] font-bold text-2xl tracking-tight">
              Św. Michał — Burger Lunch Club
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="border border-[#C4952A] text-[#C4952A] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#C4952A] hover:text-white transition-colors"
            >
              ← Panel kelnera
            </button>
            <div className="flex items-center gap-2 text-[#6B7E9F] text-sm font-medium">
              Panel Managera
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#C4952A]">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
