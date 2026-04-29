"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function ManagerAuthPage() {
  const router = useRouter();
  const { managerAuthReason, currentCustomer, redeemReward } = useApp();
  const [scanning, setScanning] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    if (scanning || approved) return;
    setScanning(true);
    setTimeout(() => {
      if (currentCustomer) redeemReward(currentCustomer.id);
      setApproved(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    }, 900);
  };

  const points = currentCustomer?.points ?? 0;
  const rewardLabel =
    points >= 10
      ? "Cały zestaw gratis"
      : points >= 6
      ? "Lemoniada marakuja lub Coca-Cola gratis"
      : "Coca-Cola lub lemoniada za 1 zł";

  const reason = managerAuthReason || "Realizacja nagrody — autoryzacja managera";

  return (
    <div className="min-h-screen bg-[#F4F0E6] font-sans text-[#0B192C] flex flex-col">

      {/* TOP BAR */}
      <div className="bg-[#0B192C] text-white flex justify-between items-center px-10 py-5 border-b-[6px] border-[#BE9135]">
        <div className="flex items-center gap-6">
          <div className="border border-[#BE9135] rounded-lg px-3 py-2 flex items-center justify-center">
            <span className="text-[#BE9135] font-serif text-3xl font-bold leading-none">ŚM</span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-wide">
            Św. Michał <span className="mx-2">—</span> Burger Lunch Club
          </h1>
        </div>
        <div className="text-gray-300 text-sm font-medium pr-4">
          Autoryzacja managera
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-[#BE9135] px-14 py-12 max-w-lg w-full shadow-sm text-center">

          {approved ? (
            <div className="py-6">
              <div className="text-6xl mb-5">✅</div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wider mb-3">
                Zatwierdzone!
              </h2>
              <p className="text-gray-500 text-sm">Wracam do panelu kelnerki...</p>
            </div>
          ) : (
            <>
              <h2 className="text-[#0B192C] font-serif text-2xl font-bold uppercase tracking-wider mb-6">
                Wymagana autoryzacja managera
              </h2>

              <p className="text-[#0B192C] text-base mb-2 font-medium">
                {reason}
              </p>

              <p className="text-[#2B7A38] font-bold text-base mb-8">
                Nagroda: {rewardLabel}
              </p>

              {/* QR klikalny */}
              <div className="flex justify-center mb-7">
                <button
                  onClick={handleApprove}
                  disabled={scanning}
                  className="w-44 h-44 p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer disabled:cursor-wait group"
                  title="Kliknij aby zasymulować skan QR managera"
                >
                  {scanning ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <svg className="animate-spin h-10 w-10 text-[#BE9135]" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Weryfikowanie...</span>
                    </div>
                  ) : (
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-[#0B192C] group-hover:scale-105 transition-transform duration-200"
                    >
                      <path fill="currentColor" d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v5H40zM40 15h20v5H40zM40 40h5v20H40zM55 40h5v20H55zM40 65h20v5H40zM40 80h20v5H40zM65 65h5v10H65zM75 65h5v10H75zM65 80h5v10H65zM80 75h10v5H80zM85 65h5v10H85z"/>
                      <path fill="currentColor" d="M30 30h10v10H30zM60 30h10v10H60zM30 60h10v10H30zM60 60h10v5H60zM20 50h5v10H20zM75 50h5v5H75z"/>
                    </svg>
                  )}
                </button>
              </div>

              <h3 className="text-[#0B192C] font-bold text-lg mb-2">
                Zeskanuj osobisty QR managera
              </h3>
              <p className="text-gray-500 text-xs mb-6">
                Po skanie system zapisze zgodę w audycie i wydrukuje voucher.
              </p>

              <button
                onClick={() => router.push("/dashboard")}
                className="text-sm text-gray-400 hover:text-gray-700 underline transition-colors"
              >
                Anuluj i wróć
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
