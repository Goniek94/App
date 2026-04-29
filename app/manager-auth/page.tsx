"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { Button } from "@/components/ui/Button";

export default function ManagerAuthPage() {
  const router = useRouter();
  const { managerAuthReason, currentCustomer, redeemReward, addToast } = useApp();
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!managerAuthReason) router.replace("/dashboard");
  }, [managerAuthReason, router]);

  if (!managerAuthReason) return null;

  const handleApprove = () => {
    setApproving(true);
    setTimeout(() => {
      setApproved(true);
      if (currentCustomer) {
        redeemReward(currentCustomer.id);
        addToast(`Nagroda zrealizowana dla ${currentCustomer.name} ✓`, "success");
      }
      setTimeout(() => router.push("/dashboard"), 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#1E3455_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Warning indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/25 rounded-full">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Wymagana autoryzacja</span>
          </div>
        </div>

        <div className="bg-[#0F1D38] border border-[#1E3455] rounded-2xl shadow-card overflow-hidden">
          {/* Header strip */}
          <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#EDCA3E] to-[#D4AF37]" />

          <div className="p-8 flex flex-col items-center text-center">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${
              approved
                ? "bg-emerald-500/20 border border-emerald-500/30"
                : "bg-[#D4AF37]/10 border border-[#D4AF37]/20"
            }`}>
              {approved ? (
                <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
                </svg>
              )}
            </div>

            <h1 className="text-[#F5F0E8] font-bold text-xl tracking-tight mb-2">
              {approved ? "Autoryzacja zatwierdzona" : "Autoryzacja managera"}
            </h1>

            <p className="text-[#4A6080] text-sm leading-relaxed mb-6 max-w-xs">
              {approved
                ? "Nagroda została zrealizowana. Przekierowuję do panelu..."
                : "Ta czynność wymaga potwierdzenia przez managera. Poproś managera o zeskanowanie kodu QR."}
            </p>

            {/* Reason box */}
            {!approved && (
              <div className="w-full p-4 bg-[#070E1F] border border-[#1E3455] rounded-xl mb-6 text-left">
                <p className="text-[#4A6080] text-xs uppercase tracking-widest font-semibold mb-1.5">Powód</p>
                <p className="text-[#F5F0E8] text-sm font-medium">{managerAuthReason}</p>
              </div>
            )}

            {/* QR Code */}
            {!approved && (
              <div className="mb-6 flex flex-col items-center gap-3">
                <div className="p-4 bg-[#070E1F] border border-[#1E3455] rounded-2xl">
                  <QRPlaceholder size={160} seed="manager-auth-2026" />
                </div>
                <p className="text-[#2E4267] text-xs">Kod QR managera</p>
              </div>
            )}

            {/* Approve button */}
            {!approved && (
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                loading={approving}
                onClick={handleApprove}
              >
                {!approving && (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 10l4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                Zatwierdź autoryzację
              </Button>
            )}

            {/* Cancel */}
            {!approved && (
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-3 text-[#2E4267] hover:text-[#F5F0E8] text-sm transition-colors py-2"
              >
                Anuluj
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[#1E3455] text-xs mt-5">
          Tylko manager może zatwierdzić tę operację
        </p>
      </div>
    </div>
  );
}
