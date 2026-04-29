"use client";

import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { useApp } from "@/lib/store";
import {
  MOCK_EMPLOYEES,
  MOCK_AUTHORIZATIONS,
  MOCK_ALERTS,
  MOCK_STATS,
} from "@/lib/mock-data";

function StatCard({
  label,
  value,
  sub,
  trend,
  color = "gold",
}: {
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  color?: "gold" | "green" | "blue" | "purple";
}) {
  const accents = {
    gold: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };
  const textColors = {
    gold: "text-[#D4AF37]",
    green: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-[#0F1D38] border border-[#1E3455] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[#4A6080] text-xs font-semibold uppercase tracking-widest">{label}</p>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${accents[color]}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className={`text-4xl font-black tracking-tight ${textColors[color]}`}>{value}</p>
        {sub && <p className="text-[#4A6080] text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  if (role === "manager") return <Badge variant="gold">Manager</Badge>;
  if (role === "admin") return <Badge variant="blue">Admin</Badge>;
  return <Badge variant="muted">Kelner</Badge>;
}

export default function AdminPage() {
  const { customers } = useApp();
  const [customerSearch, setCustomerSearch] = useState("");
  const [showQRFor, setShowQRFor] = useState<string | null>(null);

  const filteredCustomers = customerSearch.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          c.phone.includes(customerSearch) ||
          c.cardId.toLowerCase().includes(customerSearch.toLowerCase())
      )
    : customers;

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <TopBar />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#F5F0E8] font-bold text-2xl tracking-tight">Dashboard admina</h1>
            <p className="text-[#4A6080] text-sm mt-1">Przegląd systemu lojalnościowego — 29 kwietnia 2026</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold">System aktywny</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Vouchery dzisiaj" value={MOCK_STATS.vouchersToday} sub="od otwarcia restauracji" trend="+12%" color="gold" />
          <StatCard label="Nagrody dzisiaj" value={MOCK_STATS.rewardsToday} sub="zrealizowanych" trend="+1" color="green" />
          <StatCard label="Aktywne karty" value={MOCK_STATS.activeCards} sub="łącznie klientów" color="blue" />
          <StatCard label="Wizyty (tydz.)" value={MOCK_STATS.visitsThisWeek} sub="vs 142 w poprzednim" trend="+10%" color="purple" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Left — 2 cols */}
          <div className="xl:col-span-2 space-y-5">
            {/* Authorizations table */}
            <Card>
              <CardHeader
                title="Historia autoryzacji"
                subtitle="Operacje wymagające zatwierdzenia managera"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="7" width="10" height="8" rx="1" />
                    <path d="M7 7V5a3 3 0 016 0v2" strokeLinecap="round" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1E3455]">
                      {["Manager", "Akcja", "Klient", "Data", "Status"].map((h) => (
                        <th key={h} className="text-left text-[#2E4267] text-xs font-semibold uppercase tracking-widest px-6 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_AUTHORIZATIONS.map((auth) => (
                      <tr key={auth.id} className="border-b border-[#0F1D38] hover:bg-[#162848]/40 transition-colors">
                        <td className="px-6 py-3.5">
                          <span className="text-[#F5F0E8] text-sm font-medium">{auth.employeeName}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-[#8B9BB4] text-sm">{auth.action}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-[#8B9BB4] text-sm">{auth.customer}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-[#4A6080] text-xs font-mono">{auth.timestamp}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <Badge variant="green" dot>Zatwierdzone</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Employees table */}
            <Card>
              <CardHeader
                title="Pracownicy"
                subtitle="Lista personelu z dostępem do systemu"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="5" r="2.5" />
                    <path d="M1 14c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
                    <path d="M12 7l2 2-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1E3455]">
                      {["Pracownik", "Rola", "Ostatnio aktywny", "QR"].map((h) => (
                        <th key={h} className="text-left text-[#2E4267] text-xs font-semibold uppercase tracking-widest px-6 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_EMPLOYEES.map((emp) => (
                      <tr key={emp.id} className="border-b border-[#0F1D38] hover:bg-[#162848]/40 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#1E3455] border border-[#274264] flex items-center justify-center shrink-0">
                              <span className="text-[#D4AF37] text-xs font-bold">{emp.name.charAt(0)}</span>
                            </div>
                            <span className="text-[#F5F0E8] text-sm font-medium">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <RoleBadge role={emp.role} />
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-[#4A6080] text-xs font-mono">{emp.lastSeen}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <button
                            onClick={() => setShowQRFor(showQRFor === emp.id ? null : emp.id)}
                            className="flex items-center gap-1.5 text-xs text-[#4A6080] hover:text-[#D4AF37] transition-colors font-medium"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="1" y="1" width="4" height="4" rx="0.5" />
                              <rect x="9" y="1" width="4" height="4" rx="0.5" />
                              <rect x="1" y="9" width="4" height="4" rx="0.5" />
                              <rect x="9.5" y="9.5" width="1.5" height="1.5" />
                              <rect x="11.5" y="9.5" width="1.5" height="3" />
                              <rect x="9.5" y="11.5" width="3" height="1.5" />
                            </svg>
                            {showQRFor === emp.id ? "Ukryj" : "Pokaż QR"}
                          </button>
                          {showQRFor === emp.id && (
                            <div className="mt-2 animate-fade-in">
                              <QRPlaceholder size={72} seed={emp.id + emp.name} />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right — 1 col */}
          <div className="space-y-5">
            {/* Customer search */}
            <Card>
              <CardHeader
                title="Wyszukaj klienta"
                subtitle="Po nazwie, telefonie lub ID karty"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6.5" cy="6.5" r="4" />
                    <path d="M11 11l3 3" strokeLinecap="round" />
                  </svg>
                }
              />
              <div className="p-5 space-y-3">
                <Input
                  placeholder="Szukaj..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {filteredCustomers.length === 0 && (
                    <p className="text-[#2E4267] text-xs text-center py-4">Brak wyników</p>
                  )}
                  {filteredCustomers.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-[#070E1F] border border-[#1E3455] rounded-xl hover:border-[#274264] transition-colors">
                      <div className="min-w-0">
                        <p className="text-[#F5F0E8] text-sm font-semibold truncate">{c.name}</p>
                        <p className="text-[#4A6080] text-xs font-mono">{c.phone}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                        <span className={`text-xs font-bold ${c.points >= 10 ? "text-[#D4AF37]" : "text-[#6B7E9F]"}`}>
                          {c.points}/10
                        </span>
                        {c.points >= 10 && (
                          <Badge variant="gold">Nagroda</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader
                title="Alerty systemu"
                subtitle="Zdarzenia wymagające uwagi"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 2l1.5 4h4l-3 2.5 1 4L8 10l-3.5 2.5 1-4L2.5 6h4L8 2z" strokeLinejoin="round" />
                  </svg>
                }
              />
              <div className="p-4 space-y-2">
                {MOCK_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${
                      alert.type === "warning"
                        ? "bg-amber-500/5 border-amber-500/15"
                        : alert.type === "error"
                        ? "bg-red-500/5 border-red-500/15"
                        : "bg-[#D4AF37]/5 border-[#D4AF37]/10"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      alert.type === "warning" ? "bg-amber-400" : alert.type === "error" ? "bg-red-400" : "bg-[#D4AF37]"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F0E8] text-xs font-medium leading-snug">{alert.message}</p>
                      <p className="text-[#4A6080] text-xs mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
