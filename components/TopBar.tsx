"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

type TopBarProps = {
  variant?: "waiter" | "admin";
};

export function TopBar({ variant = "waiter" }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { loggedEmployee } = useApp();

  const isAdmin = pathname === "/admin";

  return (
    <header className="bg-[#070E1F] border-b border-[#1E3455] px-6 py-0 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow">
            <span className="text-[#0B1426] font-black text-xs">ŚM</span>
          </div>
          <span className="text-[#F5F0E8] font-semibold text-sm hidden sm:block">
            Burger Lunch Club
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !isAdmin
                ? "bg-[#1E3455] text-[#F5F0E8]"
                : "text-[#4A6080] hover:text-[#F5F0E8] hover:bg-[#162848]"
            }`}
          >
            Panel kelnera
          </Link>
          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isAdmin
                ? "bg-[#1E3455] text-[#F5F0E8]"
                : "text-[#4A6080] hover:text-[#F5F0E8] hover:bg-[#162848]"
            }`}
          >
            Dashboard admina
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1E3455] border border-[#274264] flex items-center justify-center">
            <span className="text-[#D4AF37] text-xs font-bold">
              {loggedEmployee.charAt(0)}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[#F5F0E8] text-xs font-semibold leading-none">{loggedEmployee}</p>
            <p className="text-[#4A6080] text-xs mt-0.5">Kelner</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#4A6080] hover:text-[#F5F0E8] hover:bg-[#162848] text-xs font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 8h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Wyloguj
        </button>
      </div>
    </header>
  );
}
