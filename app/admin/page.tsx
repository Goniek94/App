"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

/* ─────────────────────────── SIDEBAR ─────────────────────────── */
const NAV = [
  { label: "Dashboard",    active: true,  icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
  { label: "Pracownicy",   active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg> },
  { label: "Karty",        active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/></svg> },
  { label: "Nagrody",      active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> },
  { label: "Raporty",      active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg> },
  { label: "SMS Win-back", active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg> },
  { label: "Losowania",    active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg> },
  { label: "Ustawienia",   active: false, icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg> },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
function SectionHeader({ icon, label, iconBg = "bg-blue-50", iconColor = "text-blue-500" }: { icon: React.ReactNode; label: string; iconBg?: string; iconColor?: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
      <div className={`w-8 h-8 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="font-bold text-[#0B1A2C] text-sm">{label}</h3>
    </div>
  );
}

function ViewAll({ label = "Zobacz wszystkie" }: { label?: string }) {
  return (
    <div className="px-5 py-3 border-t border-gray-50">
      <button className="text-[#C4952A] text-xs font-semibold hover:underline flex items-center gap-1">
        {label} <span className="text-base leading-none">›</span>
      </button>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function AdminPage() {
  const router = useRouter();
  const { customers } = useApp();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [customerSearch, setCustomerSearch] = useState("");
  const [searchResult, setSearchResult] = useState<typeof customers[0] | null>(null);
  const [lotteryDone, setLotteryDone] = useState(false);
  const [lotteryWinner, setLotteryWinner] = useState("");

  const defaultCustomer = customers.find((c) => c.phone === "530000000");

  const handleCustomerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = customerSearch.replace(/\s/g, "").toLowerCase();
    const found = customers.find(
      (c) => c.phone.includes(q) || c.name.toLowerCase().includes(q) || c.cardId.toLowerCase().includes(q)
    );
    setSearchResult(found ?? null);
  };

  const handleLottery = () => {
    const names = ["Marek Nowak", "Anna Kowalska", "Zofia Wiśniewska"];
    setLotteryWinner(names[Math.floor(Math.random() * names.length)]);
    setLotteryDone(true);
  };

  const displayedCustomer = searchResult ?? defaultCustomer ?? null;

  return (
    <div className="min-h-screen flex font-sans bg-[#F8F5F0]">

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <aside className="w-52 bg-[#0C1B2E] flex flex-col shrink-0">

        {/* Logo area */}
        <div className="flex flex-col items-center pt-6 pb-5 border-b border-[#1A2E45]">
          {/* Angel illustration placeholder */}
          <div className="w-28 h-32 relative flex flex-col items-center justify-center mb-2">
            {/* Decorative halo */}
            <div className="absolute top-0 w-10 h-10 rounded-full border-2 border-[#C4952A] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C4952A]">
                <path d="M12 2l2 4 4.5.7-3.25 3.15.77 4.48L12 12.25l-4.02 2.1.77-4.48L5.5 6.7 10 6z" fill="currentColor"/>
              </svg>
            </div>
            {/* Figure */}
            <div className="mt-8 flex flex-col items-center">
              <div className="w-14 h-20 relative">
                {/* Wings */}
                <div className="absolute -left-5 top-3 w-5 h-12 bg-gradient-to-r from-transparent to-[#C4952A]/30 rounded-l-full" />
                <div className="absolute -right-5 top-3 w-5 h-12 bg-gradient-to-l from-transparent to-[#C4952A]/30 rounded-r-full" />
                {/* Body */}
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
        <nav className="flex-1 py-3">
          {NAV.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
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

        {/* Bottom burger illustration */}
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
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Crown icon */}
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

          {/* ── STATS ROW ── */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#6B7E9F]"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/></svg>, label: "Wydane dziś", value: 34, trend: "+12%", sub: "vs wczoraj" },
              { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#6B7E9F]"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>, label: "Dobicia dziś", value: 21, trend: "+8%", sub: "vs wczoraj" },
              { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#6B7E9F]"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>, label: "Nagrody dziś", value: 6, trend: "+20%", sub: "vs wczoraj" },
              { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#6B7E9F]"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>, label: "SMS 30 dni", value: 18, trend: "+15%", sub: "vs poprzedni 30 dni" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F5F0E8] rounded-xl flex items-center justify-center shrink-0">{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#9BA8BB] text-xs font-medium">{s.label}</p>
                  <p className="text-[#0B1A2C] text-3xl font-black leading-tight">{s.value}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-green-500 text-xs font-bold flex items-center gap-0.5 justify-end">
                    <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3"><path d="M6 2l4 5H2z"/></svg>
                    {s.trend}
                  </p>
                  <p className="text-[#9BA8BB] text-[10px]">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── TWO COLUMNS ── */}
          <div className="grid grid-cols-2 gap-5">

            {/* LEFT */}
            <div className="space-y-5">

              {/* Autoryzacje managera */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>}
                  label="Autoryzacje managera"
                  iconBg="bg-blue-50" iconColor="text-blue-500"
                />
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{["Godzina","Kelnerka","Karta","Powód"].map(h=><th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-gray-400">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {[{t:"12:35",n:"Kasia",k:"SM-BL-0047",p:"3/10"},{t:"14:10",n:"Ola",k:"SM-BL-0182",p:"zgubiona karta"}].map((r,i)=>(
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-xs font-mono text-gray-400">{r.t}</td>
                        <td className="px-5 py-3 font-semibold text-[#0B1A2C]">{r.n}</td>
                        <td className="px-5 py-3 text-xs font-mono text-gray-500">{r.k}</td>
                        <td className="px-5 py-3 text-gray-600 text-xs">{r.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ViewAll />
              </div>

              {/* Historia kart klienta */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>}
                  label="Historia kart klienta"
                  iconBg="bg-blue-50" iconColor="text-blue-500"
                />
                <div className="px-5 py-4 space-y-4">
                  <form onSubmit={handleCustomerSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Wyszukaj po telefonie"
                      value={customerSearch}
                      onChange={e => setCustomerSearch(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#C4952A] bg-gray-50"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C4952A]">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
                    </button>
                  </form>

                  {displayedCustomer && (
                    <div className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0B1A2C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {displayedCustomer.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#0B1A2C] text-sm">{displayedCustomer.name}</p>
                          <p className="text-gray-400 text-xs">tel. {displayedCustomer.phone}</p>
                          <div className="flex items-center gap-4 mt-1.5">
                            <div>
                              <p className="text-gray-400 text-[10px] uppercase font-medium">Karta</p>
                              <p className="text-xs font-semibold text-[#0B1A2C]">{displayedCustomer.cardId}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-[10px] uppercase font-medium">Status</p>
                              <p className="text-sm font-black text-[#C4952A]">{displayedCustomer.points}/10</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-[10px] uppercase font-medium">Ostatnia wizyta</p>
                              <p className="text-xs font-semibold text-[#0B1A2C]">{displayedCustomer.lastVisit}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-[#0B1A2C] hover:bg-gray-50 transition-colors">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 8h6M8 5v6" strokeLinecap="round"/></svg>
                          Duplikat karty
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-[#0B1A2C] hover:bg-gray-50 transition-colors">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2" strokeLinecap="round"/></svg>
                          Historia
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <ViewAll label="Zobacz wszystkie karty" />
              </div>

              {/* Losowanie tygodnia */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a1 1 0 011 1v3a4 4 0 01-4 4H6a4 4 0 01-4-4V5a1 1 0 011-1h2V3zm2 1h6V3H7v1zm8 3H5v2a3 3 0 003 3h4a3 3 0 003-3V7z"/></svg>}
                  label="Losowanie tygodnia"
                  iconBg="bg-yellow-50" iconColor="text-yellow-500"
                />
                <div className="p-5">
                  {lotteryDone ? (
                    <div className="text-center py-2">
                      <p className="text-3xl mb-2">🎉</p>
                      <p className="font-black text-lg text-[#0B1A2C]">{lotteryWinner}</p>
                      <p className="text-gray-400 text-xs mt-1">Lunch gratis — gratulacje!</p>
                      <button onClick={() => { setLotteryDone(false); setLotteryWinner(""); }} className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline">Resetuj</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-[#C4952A] flex items-center justify-center shrink-0 shadow-lg shadow-[#C4952A]/30">
                        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M20 7H4a2 2 0 00-2 2v4a2 2 0 002 2h2l2 4h8l2-4h2a2 2 0 002-2V9a2 2 0 00-2-2z"/><circle cx="12" cy="11" r="2" fill="#C4952A"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm">Uczestnicy: <span className="font-black text-[#0B1A2C] text-xl">128</span></p>
                        <p className="text-gray-500 text-sm mt-0.5">Nagroda: <span className="font-bold text-[#0B1A2C]">Lunch gratis</span></p>
                      </div>
                    </div>
                  )}
                  {!lotteryDone && (
                    <button
                      onClick={handleLottery}
                      className="w-full mt-4 bg-[#C4952A] hover:bg-[#a87d2a] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"/></svg>
                      Losuj zwycięzcę
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5">

              {/* Pracownicy */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                    </div>
                    <h3 className="font-bold text-[#0B1A2C] text-sm">Pracownicy</h3>
                  </div>
                  <button className="bg-[#C4952A] hover:bg-[#a87d2a] text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors">
                    + Dodaj pracownika
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{["Imię","Rola","Status","QR"].map(h=><th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-gray-400">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {[{n:"Kasia",r:"Kelnerka"},{n:"Ola",r:"Kelnerka"},{n:"Arek",r:"Manager"}].map((e,i)=>(
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-semibold text-[#0B1A2C]">{e.n}</td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{e.r}</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"/>
                            Aktywna
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button className="text-gray-300 hover:text-[#C4952A] transition-colors">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ViewAll label="Zobacz wszystkich pracowników" />
              </div>

              {/* SMS Win-back */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>}
                  label="SMS Win-back"
                  iconBg="bg-gray-100" iconColor="text-gray-500"
                />
                <div className="p-5 space-y-4">
                  <div className="bg-[#F8F5F0] rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                    Hej, dawno Cię nie było w Św. Michale. Mamy nową lemoniadę marakuja i zależy nam na Twojej opinii.
                    Wpadnij — czeka na Ciebie lemoniada gratis.
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-medium shrink-0">Nagroda:</span>
                    <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C4952A] bg-white">
                      <option>Lemoniada gratis</option>
                      <option>Coca-Cola gratis</option>
                      <option>Cały zestaw gratis</option>
                    </select>
                    <button className="bg-[#C4952A] hover:bg-[#a87d2a] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 whitespace-nowrap">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
                      Wyślij kampanię
                    </button>
                  </div>
                </div>
              </div>

              {/* Alerty antynadużyciowe */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>}
                  label="Alerty antynadużyciowe"
                  iconBg="bg-red-50" iconColor="text-red-500"
                />
                <div className="p-5 space-y-2">
                  {["Dużo kart bez telefonu — Kasia","2 próby użycia starego QR","Częste autoryzacje — Ola"].map((a,i)=>(
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500 shrink-0"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      <p className="text-sm text-gray-700">{a}</p>
                    </div>
                  ))}
                </div>
                <ViewAll label="Zobacz wszystkie alerty" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
