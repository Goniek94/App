import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  glass?: boolean;
};

export function Card({ children, className = "", glass }: CardProps) {
  return (
    <div
      className={`bg-[#0F1D38] border border-[#1E3455] rounded-2xl shadow-card ${
        glass ? "backdrop-blur-sm bg-[#0F1D38]/80" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#1E3455]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-[#F5F0E8] font-semibold text-base leading-snug">{title}</h2>
          {subtitle && <p className="text-[#4A6080] text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
