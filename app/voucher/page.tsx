"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { Button } from "@/components/ui/Button";

function ProgressDots({ points, total = 10 }: { points: number; total?: number }) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            i < points
              ? "bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              : "bg-transparent border-[#C8B89A]"
          }`}
        >
          {i < points && (
            <svg className="w-3.5 h-3.5 text-[#3A2800]" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function VoucherPage() {
  const router = useRouter();
  const { currentCustomer, incrementPoints, setCurrentCustomer, addToast } = useApp();
  const [printing, setPrinting] = useState(false);
  const [localPoints, setLocalPoints] = useState(currentCustomer?.points ?? 0);

  useEffect(() => {
    if (!currentCustomer) router.replace("/dashboard");
    else setLocalPoints(currentCustomer.points);
  }, [currentCustomer, router]);

  if (!currentCustomer) return null;

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      addToast(`Voucher dla ${currentCustomer.name} został wysłany do drukarki`, "success");
    }, 1000);
  };

  const handleNextVisit = () => {
    if (localPoints >= 10) {
      addToast("Karta jest pełna — zrealizuj nagrodę najpierw", "info");
      return;
    }
    const updated = incrementPoints(currentCustomer.id);
    if (updated) {
      setCurrentCustomer(updated);
      setLocalPoints(updated.points);
      addToast(`Wizyta ${updated.points}/10 dodana`, "info");
    }
  };

  const today = new Date().toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const isRewardReady = localPoints >= 10;

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Back */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-[#4A6080] hover:text-[#F5F0E8] text-sm font-medium transition-colors mb-6"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Powrót do panelu
        </button>

        {/* Voucher card — looks printed */}
        <div className="bg-[#FAF6EE] rounded-2xl shadow-[0_16px_60px_rgba(4,12,30,0.7)] overflow-hidden relative">
          {/* Top decorative strip */}
          <div className="h-2 bg-gradient-to-r from-[#D4AF37] via-[#EDCA3E] to-[#D4AF37]" />

          {/* Scissor line */}
          <div className="flex items-center gap-2 px-6 py-2 border-b border-dashed border-[#D4C9A8]">
            <svg className="w-4 h-4 text-[#B8A070] shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="4" cy="5" r="1.5" />
              <circle cx="4" cy="11" r="1.5" />
              <path d="M5.2 5.5L14 8M5.2 10.5L14 8" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <div className="flex-1 border-t border-dashed border-[#D4C9A8]" />
            <span className="text-[#B8A070] text-[10px] font-medium tracking-widest uppercase">voucher lojalnościowy</span>
            <div className="flex-1 border-t border-dashed border-[#D4C9A8]" />
          </div>

          {/* Main content */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-6">
              {/* Left side */}
              <div className="flex-1 min-w-0">
                {/* Restaurant name */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-md">
                    <span className="text-[#FAF6EE] font-black text-xs">ŚM</span>
                  </div>
                  <div>
                    <p className="text-[#1A2F52] font-black text-sm tracking-tight uppercase">Św. Michał</p>
                    <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase">Burger Lunch Club</p>
                  </div>
                </div>

                {/* Customer name */}
                <div className="mb-1">
                  <p className="text-[#6B5E3A] text-xs uppercase tracking-widest font-semibold">Klient</p>
                  <h1 className="text-[#1A2F52] font-black text-3xl tracking-tight leading-none mt-1">
                    {currentCustomer.name}
                  </h1>
                </div>

                {/* Card ID */}
                <p className="font-mono text-[#9B8B6A] text-xs mt-2 mb-6">#{currentCustomer.cardId}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#6B5E3A] text-xs font-semibold uppercase tracking-widest">Postęp</span>
                    <span className={`text-sm font-black ${isRewardReady ? "text-[#D4AF37]" : "text-[#1A2F52]"}`}>
                      {localPoints} / 10 wizyt
                    </span>
                  </div>
                  <ProgressDots points={localPoints} />
                </div>

                {/* Reward info */}
                <div className={`mt-4 p-3 rounded-xl border ${isRewardReady ? "bg-[#D4AF37]/15 border-[#D4AF37]/40" : "bg-[#F0EAD8] border-[#DDD0B0]"}`}>
                  {isRewardReady ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎁</span>
                      <div>
                        <p className="text-[#1A2F52] font-black text-sm">Nagroda odblokowana!</p>
                        <p className="text-[#6B5E3A] text-xs">Darmowy burger — do realizacji przy kasie</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-base">🍔</span>
                      <div>
                        <p className="text-[#1A2F52] font-semibold text-xs">Nagroda za 10 wizyt:</p>
                        <p className="text-[#6B5E3A] text-xs">Darmowy burger — jeszcze {10 - localPoints} {10 - localPoints === 1 ? "wizyta" : "wizyty"}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side — QR */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <QRPlaceholder size={140} seed={currentCustomer.cardId} light />
                <div className="text-center">
                  <p className="text-[#9B8B6A] text-[9px] uppercase tracking-widest font-semibold">Zeskanuj przy wejściu</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-dashed border-[#D4C9A8] flex items-center justify-between">
              <div>
                <p className="text-[#9B8B6A] text-[10px]">Wydrukowano: {today}</p>
                <p className="text-[#B8A070] text-[10px] mt-0.5">Voucher ważny do następnej wizyty</p>
              </div>
              <div className="text-right">
                <p className="text-[#9B8B6A] text-[10px]">ul. Przykładowa 1, Warszawa</p>
                <p className="text-[#B8A070] text-[10px] mt-0.5">swmichal-burger.pl</p>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="h-2 bg-gradient-to-r from-[#D4AF37] via-[#EDCA3E] to-[#D4AF37]" />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button variant="gold" size="lg" className="flex-1" loading={printing} onClick={handlePrint}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 7V3h10v4M5 13h10M4 7h12a1 1 0 011 1v6H3V8a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Drukuj voucher
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleNextVisit}
            disabled={localPoints >= 10}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="7" />
              <path d="M10 7v3l2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Symuluj kolejną wizytę
          </Button>
        </div>

        <p className="text-center text-[#1E3455] text-xs mt-4">
          Kliknij &quot;Symuluj kolejną wizytę&quot; aby zobaczyć jak zmienia się postęp
        </p>
      </div>
    </div>
  );
}
