"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function DashboardPage() {
  const router = useRouter();
  const {
    addCustomer,
    findByPhone,
    incrementPoints,
    setCurrentCustomer,
    setManagerAuthReason,
    loggedEmployee,
    customers,
  } = useApp();

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [foundId, setFoundId] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const foundCustomer = foundId ? customers.find((c) => c.id === foundId) ?? null : null;

  // Następna nagroda do zdobycia (cel)
  const nextReward = foundCustomer
    ? foundCustomer.points < 3
      ? { label: "Coca-Cola lub lemoniada za 1 zł", target: "3/10" }
      : foundCustomer.points < 6
      ? { label: "Lemoniada marakuja lub Coca-Cola gratis", target: "6/10" }
      : foundCustomer.points < 10
      ? { label: "Cały zestaw gratis", target: "10/10" }
      : null
    : null;

  // Nagroda do odebrania — tylko gdy klient jest DOKŁADNIE na milestone
  const MILESTONES = [3, 6, 10];
  const isAtMilestone = foundCustomer ? MILESTONES.includes(foundCustomer.points) : false;
  const milestoneReward =
    foundCustomer?.points === 10 ? "Cały zestaw gratis" :
    foundCustomer?.points === 6  ? "Lemoniada marakuja lub Coca-Cola gratis" :
    foundCustomer?.points === 3  ? "Coca-Cola lub lemoniada za 1 zł" : "";

  const handlePrintFirst = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    const customer = addCustomer(newName.trim(), newPhone.trim());
    setCurrentCustomer(customer);
    router.push("/voucher");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchPhone.replace(/\s/g, "");
    const c = findByPhone(clean);
    if (c) {
      setFoundId(c.id);
      setNotFound(false);
    } else {
      setFoundId(null);
      setNotFound(true);
    }
  };

  const handleDrukujKarte = () => {
    if (!foundCustomer) return;
    const newPoints = foundCustomer.points + 1;
    const updated = incrementPoints(foundCustomer.id);
    setCurrentCustomer(updated ?? foundCustomer);
    // Przy 3/10, 6/10, 10/10 — wymagana autoryzacja managera
    if ([3, 6, 10].includes(newPoints)) {
      const reward =
        newPoints === 10 ? "Cały zestaw gratis" :
        newPoints === 6  ? "Lemoniada marakuja lub Coca-Cola gratis" :
                           "Coca-Cola lub lemoniada za 1 zł";
      setManagerAuthReason(
        `Dobicie do ${newPoints}/10 — odblokowanie nagrody dla ${foundCustomer.name} (${foundCustomer.cardId}). Nagroda: ${reward}`
      );
      router.push("/manager-auth");
    } else {
      router.push("/voucher");
    }
  };

  const handleOdbierzNagrode = () => {
    if (!foundCustomer) return;
    setCurrentCustomer(foundCustomer);
    setManagerAuthReason(
      `Realizacja nagrody dla ${foundCustomer.name} (${foundCustomer.cardId}). Nagroda: ${milestoneReward}`
    );
    router.push("/manager-auth");
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] font-sans text-[#0B192C]">

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
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 bg-[#BE9135] text-[#0B192C] font-bold text-sm px-4 py-2 rounded hover:bg-[#a87d2a] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Panel admina
          </button>
          <span className="text-gray-300">
            Zalogowano: <span className="text-white font-medium">{loggedEmployee}</span>
          </span>
          <button
            onClick={() => router.push("/")}
            className="border border-[#BE9135] text-[#BE9135] px-6 py-2 rounded font-medium hover:bg-[#BE9135] hover:text-[#0B192C] transition-colors"
          >
            Wyloguj
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto p-10 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">

          {/* LEFT — Wydaj pierwszy voucher */}
          <div className="bg-white rounded-2xl border border-[#BE9135] p-10 shadow-sm">
            <div className="text-center mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-[#0B192C] font-serif text-2xl font-bold uppercase tracking-wider">
                Wydaj Pierwszy Voucher
              </h2>
            </div>

            <form onSubmit={handlePrintFirst} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#0B192C] mb-2">
                  Imię klienta
                </label>
                <input
                  type="text"
                  placeholder="np. Marek"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-[#BE9135] rounded-lg p-3 text-lg text-[#0B192C] font-bold focus:outline-none focus:ring-2 focus:ring-[#BE9135]/40 bg-[#FFFDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B192C] mb-2">
                  Nr telefonu
                </label>
                <input
                  type="text"
                  placeholder="530 000 000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full border border-[#BE9135] rounded-lg p-3 text-lg text-[#0B192C] font-bold focus:outline-none focus:ring-2 focus:ring-[#BE9135]/40 bg-[#FFFDF8]"
                />
              </div>

              <p className="text-xs text-gray-500 leading-relaxed pt-1">
                Podając telefon klient bierze udział w losowaniu. Bez telefonu
                nie odzyskamy karty po zgubieniu.
              </p>

              <button
                type="submit"
                disabled={!newName.trim() || !newPhone.trim()}
                className="w-full bg-[#BE9135] text-[#0B192C] font-bold text-xl py-4 rounded-lg hover:bg-[#a87d2a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                DRUKUJ VOUCHER
              </button>
            </form>
          </div>

          {/* RIGHT — Wyszukaj kartę */}
          <div className="bg-white rounded-2xl border border-[#BE9135] p-10 shadow-sm flex flex-col">
            <div className="text-center mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-[#0B192C] font-serif text-2xl font-bold uppercase tracking-wider">
                Wyszukaj Kartę / Nagrodę
              </h2>
            </div>

            <form onSubmit={handleSearch} className="flex-grow flex flex-col">
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#0B192C] mb-2">
                  Nr telefonu
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="530 000 000"
                    value={searchPhone}
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                      setFoundId(null);
                      setNotFound(false);
                    }}
                    className="flex-1 border border-[#BE9135] rounded-lg p-3 text-lg text-[#0B192C] font-bold focus:outline-none focus:ring-2 focus:ring-[#BE9135]/40 bg-[#FFFDF8]"
                  />
                  <button
                    type="submit"
                    disabled={!searchPhone.trim()}
                    className="bg-[#BE9135] text-[#0B192C] font-bold px-5 rounded-lg hover:bg-[#a87d2a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                    </svg>
                    Szukaj
                  </button>
                </div>
              </div>

              {/* Nie znaleziono */}
              {notFound && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-4">
                  <p className="text-red-600 font-semibold">Nie znaleziono klienta</p>
                  <p className="text-red-400 text-xs mt-1">Sprawdź numer lub wydaj pierwszy voucher</p>
                </div>
              )}

              {/* Wynik wyszukiwania */}
              {foundCustomer && (
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-6">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                    Znaleziono klienta
                  </p>
                  <p className="text-[#0B192C] text-base font-bold mb-3">
                    {foundCustomer.name}
                    <span className="mx-2 font-normal text-gray-400">•</span>
                    {foundCustomer.cardId}
                    <span className="mx-2 font-normal text-gray-400">•</span>
                    Status: {foundCustomer.points}/10
                  </p>

                  {/* Nagroda do odebrania (dokładnie na milestone) */}
                  {isAtMilestone && (
                    <p className="text-[#2B7A38] font-bold uppercase tracking-wide text-sm mb-5">
                      🎁 Nagroda odblokowana: {milestoneReward}
                    </p>
                  )}

                  {/* Następna nagroda (cel do zdobycia) */}
                  {!isAtMilestone && nextReward && (
                    <p className="text-gray-500 text-sm mb-5">
                      Następna nagroda ({nextReward.target}): <span className="font-semibold text-[#0B192C]">{nextReward.label}</span>
                    </p>
                  )}

                  <div className="flex gap-3">
                    {isAtMilestone && (
                      <button
                        type="button"
                        onClick={handleOdbierzNagrode}
                        className="flex-1 bg-[#BE9135] text-[#0B192C] font-bold py-3 rounded-lg hover:bg-[#a87d2a] transition-colors uppercase text-sm tracking-wide"
                      >
                        Odbierz Nagrodę
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleDrukujKarte}
                      className="flex-1 border border-[#BE9135] text-[#0B192C] bg-white font-bold py-3 rounded-lg hover:bg-[#f9f3e8] transition-colors uppercase text-sm tracking-wide"
                    >
                      Drukuj Kartę
                    </button>
                  </div>
                </div>
              )}

              {/* Hint gdy nic nie wpisano */}
              {!foundCustomer && !notFound && !searchPhone && (
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-gray-300 text-sm text-center">
                    Wpisz numer i naciśnij Enter
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-auto pt-6 text-center">
                Duplikat zgubionej karty wymaga QR managera
              </p>
            </form>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="bg-[#F4F0E6] border border-[#BE9135] rounded-full py-4 px-8 text-center">
          <p className="text-sm text-[#0B192C]">
            Powracający klient z kartą: kelnerka skanuje QR vouchera, a system automatycznie drukuje
            następny voucher, jeśli nie ma blokady lub progu managera.
          </p>
        </div>
      </div>
    </div>
  );
}
