"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/store";
import { Customer } from "@/lib/mock-data";

function ProgressDots({ points, total = 10 }: { points: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
            i < points
              ? "bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              : "bg-transparent border-[#274264]"
          }`}
        >
          {i < points && (
            <svg className="w-2.5 h-2.5 text-[#0B1426]" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function CustomerCard({ customer, onRedeem, onPrintNext }: { customer: Customer; onRedeem: () => void; onPrintNext: () => void }) {
  const isRewardReady = customer.points >= 10;
  const progressColor = customer.points >= 8 ? "text-emerald-400" : customer.points >= 5 ? "text-[#D4AF37]" : "text-[#6B7E9F]";

  return (
    <div className="animate-slide-up mt-4 p-5 bg-[#070E1F] border border-[#1E3455] rounded-xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[#F5F0E8] font-bold text-lg leading-tight">{customer.name}</h3>
          <p className="text-[#4A6080] text-xs mt-1 font-mono">{customer.cardId}</p>
        </div>
        <Badge variant={isRewardReady ? "gold" : "muted"} dot>
          {isRewardReady ? "Nagroda gotowa!" : "Aktywna"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[#4A6080] text-xs uppercase tracking-widest font-medium">Postęp</span>
          <span className={`text-sm font-bold ${progressColor}`}>{customer.points}/10 wizyt</span>
        </div>
        <ProgressDots points={customer.points} />
      </div>

      {isRewardReady && (
        <div className="flex items-center gap-2.5 p-3 bg-[#D4AF37]/8 border border-[#D4AF37]/20 rounded-lg">
          <svg className="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a.5.5 0 01.5.5v.5h2a2 2 0 010 4h-.5V8A2.5 2.5 0 015.5 8V6.5H5a2 2 0 010-4h2.5V2a.5.5 0 01.5-.5z" />
          </svg>
          <p className="text-[#D4AF37] text-xs font-semibold">Aktywna nagroda: Darmowy burger</p>
        </div>
      )}

      <div className="flex gap-2.5 pt-1">
        {isRewardReady && (
          <Button variant="gold" size="sm" className="flex-1" onClick={onRedeem}>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8h12M10 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Zrealizuj nagrodę
          </Button>
        )}
        <Button variant={isRewardReady ? "outline" : "gold"} size="sm" className="flex-1" onClick={onPrintNext}>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6V3h8v3M4 10h8M3 6h10a1 1 0 011 1v5H2V7a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isRewardReady ? "Drukuj nowy voucher" : "Drukuj voucher"}
        </Button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { findByPhone, addCustomer, incrementPoints, setCurrentCustomer, setManagerAuthReason, addToast, customers } = useApp();

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newErrors, setNewErrors] = useState<{ name?: string; phone?: string }>({});
  const [creatingNew, setCreatingNew] = useState(false);

  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState<Customer | null | "not-found">(null);
  const [searching, setSearching] = useState(false);

  const handleCreateNew = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!newName.trim()) errors.name = "Podaj imię i nazwisko";
    if (!newPhone.trim()) errors.phone = "Podaj numer telefonu";
    else if (!/^\d{9}$/.test(newPhone.replace(/\s/g, ""))) errors.phone = "9 cyfr bez spacji";
    if (Object.keys(errors).length) {
      setNewErrors(errors);
      return;
    }
    if (findByPhone(newPhone)) {
      setNewErrors({ phone: "Ten numer jest już zarejestrowany" });
      return;
    }
    setCreatingNew(true);
    setTimeout(() => {
      const customer = addCustomer(newName.trim(), newPhone.trim());
      setCurrentCustomer(customer);
      addToast(`Nowa karta dla ${customer.name} — ${customer.cardId}`, "success");
      router.push("/voucher");
    }, 600);
  };

  const handleSearch = () => {
    if (!searchPhone.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const found = findByPhone(searchPhone);
      setSearchResult(found ?? "not-found");
      setSearching(false);
    }, 500);
  };

  const handlePrintNext = (customer: Customer) => {
    const updated = incrementPoints(customer.id);
    if (updated) {
      setCurrentCustomer(updated);
      addToast(`Voucher dla ${updated.name} — wizyta ${updated.points}/10`, "success");
      router.push("/voucher");
    }
  };

  const handleRedeem = (customer: Customer) => {
    setCurrentCustomer(customer);
    setManagerAuthReason(`Realizacja nagrody dla ${customer.name} (${customer.cardId})`);
    router.push("/manager-auth");
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <TopBar />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-[#F5F0E8] font-bold text-2xl tracking-tight">Panel kelnera</h1>
          <p className="text-[#4A6080] text-sm mt-1">Wtorek, 29 kwietnia 2026 &mdash; obsługa lojalnościowa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT — New customer */}
          <Card>
            <CardHeader
              title="Nowy klient"
              subtitle="Zarejestruj kartę i wydrukuj pierwszy voucher"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                </svg>
              }
            />
            <div className="p-6 space-y-4">
              <Input
                label="Imię i nazwisko"
                placeholder="np. Anna Kowalska"
                value={newName}
                onChange={(e) => { setNewName(e.target.value); setNewErrors((p) => ({ ...p, name: undefined })); }}
                error={newErrors.name}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="5" r="3" strokeLinecap="round" />
                    <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
                  </svg>
                }
              />
              <Input
                label="Numer telefonu"
                placeholder="600 100 200"
                value={newPhone}
                onChange={(e) => { setNewPhone(e.target.value); setNewErrors((p) => ({ ...p, phone: undefined })); }}
                error={newErrors.phone}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 2h3l1.5 3.5-1.75 1.25a8 8 0 004.5 4.5L11.5 9.5 15 11v3a2 2 0 01-2 2A12 12 0 013 4a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <Button
                variant="gold"
                size="lg"
                className="w-full mt-2"
                loading={creatingNew}
                onClick={handleCreateNew}
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6V3h8v3M4 10h8M3 6h10a1 1 0 011 1v5H2V7a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zarejestruj i drukuj voucher
              </Button>
            </div>
          </Card>

          {/* RIGHT — Find customer */}
          <Card>
            <CardHeader
              title="Znajdź klienta"
              subtitle="Wyszukaj kartę po numerze telefonu"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6.5" cy="6.5" r="4" />
                  <path d="M11 11l3 3" strokeLinecap="round" />
                </svg>
              }
            />
            <div className="p-6 space-y-4">
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <Input
                    label="Numer telefonu"
                    placeholder="np. 600 100 200"
                    value={searchPhone}
                    onChange={(e) => { setSearchPhone(e.target.value); setSearchResult(null); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="6.5" cy="6.5" r="4" />
                        <path d="M11 11l3 3" strokeLinecap="round" />
                      </svg>
                    }
                  />
                </div>
                <Button
                  variant="gold"
                  size="md"
                  loading={searching}
                  onClick={handleSearch}
                  className="self-end shrink-0"
                >
                  Szukaj
                </Button>
              </div>

              {/* Quick picks */}
              <div className="space-y-1.5">
                <p className="text-[#2E4267] text-xs uppercase tracking-widest font-medium">Ostatnio szukani</p>
                <div className="flex flex-wrap gap-1.5">
                  {customers.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSearchPhone(c.phone); setTimeout(() => setSearchResult(c), 300); }}
                      className="px-2.5 py-1 bg-[#070E1F] border border-[#1E3455] hover:border-[#D4AF37]/50 rounded-lg text-xs text-[#6B7E9F] hover:text-[#D4AF37] transition-colors font-mono"
                    >
                      {c.phone}
                    </button>
                  ))}
                </div>
              </div>

              {searchResult === "not-found" && (
                <div className="animate-fade-in p-4 bg-red-500/5 border border-red-500/15 rounded-xl text-center">
                  <p className="text-red-400 text-sm font-medium">Nie znaleziono klienta</p>
                  <p className="text-[#4A6080] text-xs mt-1">Sprawdź numer lub zarejestruj nową kartę</p>
                </div>
              )}

              {searchResult && searchResult !== "not-found" && (
                <CustomerCard
                  customer={searchResult}
                  onRedeem={() => handleRedeem(searchResult)}
                  onPrintNext={() => handlePrintNext(searchResult)}
                />
              )}
            </div>
          </Card>
        </div>

        {/* Info banner */}
        <div className="mt-5 flex items-start gap-3 px-5 py-4 bg-[#0F1D38] border border-[#1E3455] rounded-xl">
          <svg className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7.5v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[#4A6080] text-xs leading-relaxed">
            <span className="text-[#6B7E9F] font-semibold">Jak działa system:</span> Klient zbiera 1–10 wizyt (1 punkt = 1 wizyta). Po 10 wizytach generowana jest nagroda — darmowy burger. Realizacja nagrody wymaga autoryzacji managera. Każda wizyta generuje nowy voucher z kodem QR.
          </p>
        </div>
      </main>
    </div>
  );
}
