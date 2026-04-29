"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

const MILESTONES: Record<number, { title: string; sub1: string; sub2: string; target: string; rewardText: string }> = {
  1:  { title: "START!",                  sub1: "Masz już 1 lunch",   sub2: "Jeszcze tylko 2 zestawy do napoju za 1 zł",      target: "3/10",  rewardText: "Coca-Cola lub lemoniada za 1 zł" },
  2:  { title: "DOBRY POCZĄTEK",          sub1: "Masz już 2 lunche",  sub2: "Jeszcze tylko 1 zestaw do napoju za 1 zł",        target: "3/10",  rewardText: "Coca-Cola lub lemoniada za 1 zł" },
  3:  { title: "BRAWO!",                  sub1: "Masz już 3 lunche",  sub2: "Jeszcze 3 lunche do nagrody 6/10",                target: "6/10",  rewardText: "Lemoniada marakuja lub Coca-Cola gratis" },
  4:  { title: "JUŻ PRAWIE!",            sub1: "Masz już 4 lunche",  sub2: "Jeszcze 2 lunche do nagrody 6/10",                target: "6/10",  rewardText: "Lemoniada marakuja lub Coca-Cola gratis" },
  5:  { title: "ŚWIETNA ROBOTA!",        sub1: "Masz już 5 lunchy",  sub2: "Jeszcze 1 lunch do nagrody 6/10",                 target: "6/10",  rewardText: "Lemoniada marakuja lub Coca-Cola gratis" },
  6:  { title: "SUPER!",                  sub1: "Masz już 6 lunchy",  sub2: "Jeszcze 4 lunche do nagrody głównej",             target: "10/10", rewardText: "Cały zestaw gratis" },
  7:  { title: "CORAZ BLIŻEJ",           sub1: "Masz już 7 lunchy",  sub2: "Jeszcze 3 lunche do nagrody głównej",             target: "10/10", rewardText: "Cały zestaw gratis" },
  8:  { title: "BLISKO NAGRODY GŁÓWNEJ", sub1: "Masz już 8 lunchy",  sub2: "Jeszcze 2 lunche do nagrody głównej",             target: "10/10", rewardText: "Cały zestaw gratis" },
  9:  { title: "PRAWIE GOTOWE",          sub1: "Masz już 9 lunchy",  sub2: "Jeszcze 1 lunch do nagrody głównej",              target: "10/10", rewardText: "Cały zestaw gratis" },
  10: { title: "NAGRODA ODBLOKOWANA!",   sub1: "GRATULACJE!",        sub2: "Dziękujemy za Twoją lojalność!",                  target: "10/10", rewardText: "Cały zestaw gratis" },
};

function DotsRow({ points, total = 10 }: { points: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full border-2 ${
            i < points ? "bg-black border-black" : "bg-white border-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

export default function VoucherPage() {
  const router = useRouter();
  const { currentCustomer, incrementPoints, setCurrentCustomer } = useApp();

  // Fallback dla podglądu bez kontekstu
  const name = currentCustomer?.name ?? "Klient";
  const cardId = currentCustomer?.cardId ?? "SM-BL-0000";
  const [points, setPoints] = useState(currentCustomer?.points ?? 1);

  const data = MILESTONES[Math.min(Math.max(points, 1), 10)];
  const validUntil = "31.12.2026";

  const handleNextVisit = () => {
    if (!currentCustomer || points >= 10) return;
    const updated = incrementPoints(currentCustomer.id);
    if (updated) {
      setCurrentCustomer(updated);
      setPoints(updated.points);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center py-10 font-sans">

      {/* Panel testowy */}
      <div className="bg-white p-4 rounded-xl mb-8 shadow-lg max-w-4xl w-full text-center print:hidden">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
          >
            ← Powrót
          </button>
          <h2 className="text-lg font-bold text-black">Podgląd vouchera — {name}</h2>
          <div />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[1,2,3,4,5,6,7,8,9,10].map((p) => (
            <button
              key={p}
              onClick={() => setPoints(p)}
              className={`px-3 py-1.5 rounded font-bold border-2 text-sm ${
                points === p ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {p}/10
            </button>
          ))}
        </div>
        {currentCustomer && points < 10 && (
          <button
            onClick={handleNextVisit}
            className="mt-3 px-4 py-2 bg-[#BE9135] text-white text-sm font-bold rounded hover:bg-[#a87d2a] transition-colors"
          >
            Symuluj kolejną wizytę (+1)
          </button>
        )}
      </div>

      {/* VOUCHER DO DRUKU */}
      <div className="bg-white text-black w-full max-w-[780px] border-[4px] border-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="border-b-2 border-black">

          {/* Główna sekcja */}
          <div className="flex">
            {/* LEWA KOLUMNA */}
            <div className="w-[200px] border-r-2 border-black p-4 flex flex-col">
              {/* Logo placeholder */}
              <div className="w-full aspect-square bg-black text-white flex flex-col items-center justify-center mb-4 rounded-sm">
                <span className="font-serif text-4xl font-black">ŚM</span>
                <div className="w-8 border-t border-white/40 my-1" />
                <span className="text-[8px] tracking-widest uppercase font-bold">Burger &amp; More</span>
              </div>

              <div className="space-y-3 mt-auto">
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Posiadacz:</p>
                  <p className="font-serif text-2xl font-black leading-tight mt-0.5">{name}</p>
                </div>

                <div className="w-6 border-b-2 border-black" />

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 border border-black rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px]">👤</div>
                  <div>
                    <p className="text-[8px] font-bold uppercase">Karta Imienna</p>
                    <p className="text-[7px] text-gray-500">Tylko dla właściciela</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-b border-gray-200 py-1">
                  <div className="w-4 h-4 border border-black flex items-center justify-center flex-shrink-0 text-[8px]">🏷</div>
                  <p className="text-[8px] font-bold uppercase">Nr karty: {cardId}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-black flex items-center justify-center flex-shrink-0 text-[8px]">📅</div>
                  <p className="text-[8px] font-bold uppercase">Ważna do: {validUntil}</p>
                </div>
              </div>
            </div>

            {/* ŚRODKOWA KOLUMNA */}
            <div className="flex-1 p-6 flex flex-col items-center text-center">
              <h1 className="font-serif text-5xl font-black tracking-tight leading-none">Św Michał</h1>
              <p className="text-[10px] font-bold tracking-[0.25em] mt-1 mb-1">• BURGER LUNCH CLUB •</p>
              <p className="text-[8px] border-t border-b border-gray-300 py-1 px-4 mb-5 text-gray-600">
                Zawsze w zestawie: Burger • Smash Potato • Surówka Coleslaw
              </p>

              {/* Liczba */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-serif text-[90px] font-black leading-none">{points}</span>
                <span className="font-serif text-3xl font-bold text-gray-400">/10</span>
              </div>

              {/* Progress dots */}
              <div className="mb-4">
                <DotsRow points={points} />
              </div>

              {/* Milestone title */}
              <p className="font-serif text-2xl font-black uppercase tracking-wide mb-1">{data.title}</p>
              <p className="text-sm font-bold text-gray-700 mb-0.5">{data.sub1}</p>
              <p className="text-xs text-gray-500">{data.sub2}</p>

              {/* Tagline */}
              <div className="mt-auto pt-4 border-t border-gray-200 w-full">
                <p className="text-[8px] font-bold tracking-widest uppercase text-gray-500">
                  Dziękujemy, że wybierasz Św. Michała!
                </p>
                <p className="text-[7px] text-gray-400 tracking-widest uppercase">
                  Zbieraj zestawy • Odblokowuj nagrody • Ciesz się smakiem
                </p>
              </div>
            </div>

            {/* PRAWA KOLUMNA */}
            <div className="w-[160px] border-l-2 border-black p-4 flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-500 mb-1">Najbliższa nagroda</p>
                <p className="text-[9px] font-black uppercase">{data.target}</p>
              </div>

              {/* Reward icon */}
              <div className="w-14 h-14 border-2 border-black rounded-full flex items-center justify-center text-2xl">
                {points >= 6 ? "🍔" : "🥤"}
              </div>

              <p className="text-[8px] font-bold text-center leading-snug">{data.rewardText}</p>

              <div className="mt-auto w-full">
                {/* QR placeholder */}
                <div className="border border-gray-300 rounded p-1 bg-white">
                  <svg viewBox="0 0 100 100" className="w-full text-black">
                    <path fill="currentColor" d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v5H40zM40 15h20v5H40zM40 40h5v20H40zM55 40h5v20H55zM40 65h20v5H40zM40 80h20v5H40zM65 65h5v10H65zM75 65h5v10H75zM65 80h5v10H65zM80 75h10v5H80zM85 65h5v10H85z"/>
                    <path fill="currentColor" d="M30 30h10v10H30zM60 30h10v10H60zM30 60h10v10H30zM60 60h10v5H60zM20 50h5v10H20zM75 50h5v5H75z"/>
                  </svg>
                </div>
                <p className="text-[7px] text-center text-gray-400 mt-1">Zeskanuj menu</p>
              </div>
            </div>
          </div>
        </div>

        {/* STOPKA */}
        <div className="bg-black text-white py-2 px-6 text-center">
          <p className="text-[8px] font-bold tracking-[0.3em] uppercase">
            Dziękujemy, że wybierasz Św. Michała! • Zbieraj zestawy • Odblokowuj nagrody • Ciesz się smakiem
          </p>
        </div>
      </div>

      {/* Przycisk drukowania */}
      <div className="mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-[#BE9135] text-white font-bold px-10 py-3 rounded-xl text-lg hover:bg-[#a87d2a] transition-colors shadow-lg"
        >
          Drukuj voucher
        </button>
      </div>
    </div>
  );
}
