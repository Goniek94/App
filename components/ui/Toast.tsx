"use client";

import { useApp } from "@/lib/store";

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-slide-up flex items-start gap-3 min-w-[300px] max-w-sm bg-[#0F1D38] border border-[#1E3455] rounded-xl px-4 py-3.5 shadow-card"
          onClick={() => removeToast(toast.id)}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && (
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#D4AF37]" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
            {toast.type === "error" && (
              <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-400" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F5F0E8] text-sm font-medium leading-snug">{toast.message}</p>
          </div>
          <button
            className="text-[#4A6080] hover:text-[#F5F0E8] transition-colors shrink-0"
            onClick={() => removeToast(toast.id)}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
