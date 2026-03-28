import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  color?: string; // e.g., bg-primary, bg-info
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = "bg-primary" }: StatCardProps) {
  return (
    <div className={`bg-card border-4 border-border p-6 shadow-brutal relative overflow-hidden group hover:-translate-x-1 hover:-translate-y-1 transition-all`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${color} opacity-20 -mr-8 -mt-8 rotate-45 border-l-4 border-border`} />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-1">{title}</p>
          <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2 text-foreground">{value}</h4>
          {subtitle && <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-tighter">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 border-2 border-border flex items-center justify-center ${color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]`}>
          <Icon className="w-6 h-6 text-black" />
        </div>
      </div>

      {trend && (
        <div className="mt-6 flex items-center gap-2">
          <div className={`px-1.5 py-0.5 border-2 border-border text-[10px] font-black uppercase italic ${trend.positive ? "bg-success" : "bg-destructive text-white"}`}>
            {trend.positive ? "+" : ""}{trend.value}%
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase italic">VS LAST MONTH</span>
        </div>
      )}
    </div>
  );
}
