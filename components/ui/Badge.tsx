type BadgeVariant = "gold" | "green" | "blue" | "red" | "muted";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
};

const variants: Record<BadgeVariant, string> = {
  gold: "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30",
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  red: "bg-red-500/10 text-red-400 border border-red-500/20",
  muted: "bg-[#1E3455] text-[#6B7E9F] border border-[#274264]",
};

const dotColors: Record<BadgeVariant, string> = {
  gold: "bg-[#D4AF37]",
  green: "bg-emerald-400",
  blue: "bg-blue-400",
  red: "bg-red-400",
  muted: "bg-[#6B7E9F]",
};

export function Badge({ variant = "muted", children, dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
