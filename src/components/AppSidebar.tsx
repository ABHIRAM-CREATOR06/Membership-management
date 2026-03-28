import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  CalendarDays,
  Bell,
  Settings,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/hooks/useData";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks", badge: "4" },
  { to: "/members", icon: Users, label: "Members" },
  { to: "/events", icon: CalendarDays, label: "Events" },
];

const bottomItems = [
  { to: "/notifications", icon: Bell, label: "Notifications", badge: "3" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

import { useTheme } from "next-themes";

export function AppSidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { tasks, members, events } = useData();

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const todoTasks = tasks.filter(t => t.status !== "done").length;

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar border-r-4 border-sidebar-border shrink-0 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_0px_0px_0px_rgba(255,255,255,0.2)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b-4 border-sidebar-border bg-sidebar-primary">
        <div className="w-8 h-8 rounded-none border-2 border-sidebar-border bg-background flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Zap className="w-4 h-4 text-foreground fill-foreground" />
        </div>
        <div>
          <h1 className="font-heading font-black text-sidebar-primary-foreground text-base leading-none italic uppercase">TinkerHub</h1>
          <p className="text-[10px] font-bold text-sidebar-primary-foreground/60 uppercase tracking-tighter mt-0.5">SNGCE Chapter</p>
        </div>
      </div>

      {/* Club info */}
      <div className="mx-4 mt-4 mb-2 p-3 rounded-none bg-accent border-2 border-sidebar-border shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none">
        <p className="text-[10px] text-foreground font-black uppercase tracking-widest mb-1">Active Club</p>
        <p className="text-sm font-heading font-black text-foreground uppercase italic">TinkerHub SNGCE</p>
        <p className="text-[11px] font-bold text-foreground/80">{members.length} MEMBERS · {events.length} EVENTS</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-2 mt-4">
        <p className="text-[10px] text-sidebar-foreground/50 font-black uppercase tracking-widest px-2 py-1">Navigation</p>
        {navItems.map(({ to, icon: Icon, label, badge }) => {
          const dynamicBadge = label === "Tasks" ? todoTasks.toString() : badge;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={() =>
                `flex items-center gap-3 px-3 py-2.5 rounded-none border-2 border-transparent text-sm font-black uppercase italic transition-all group ${isActive(to)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-border shadow-brutal translate-x-[-2px] translate-y-[-2px]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:border-sidebar-border/20"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="flex-1 tracking-tighter">{label}</span>
              {dynamicBadge && (
                <Badge
                  className={`text-[10px] px-1.5 py-0 rounded-none border-2 border-sidebar-border font-black ${isActive(to)
                    ? "bg-background text-foreground"
                    : "bg-sidebar-primary text-sidebar-primary-foreground"
                    }`}
                >
                  {dynamicBadge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 pb-6 space-y-2 border-t-4 border-sidebar-border pt-4">
        {bottomItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={() =>
              `flex items-center gap-3 px-3 py-2.5 rounded-none border-2 border-transparent text-sm font-black uppercase italic transition-all ${isActive(to)
                ? "bg-accent border-sidebar-border shadow-brutal translate-x-[-2px] translate-y-[-2px]"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:border-sidebar-border/20"
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="flex-1 tracking-tighter">{label}</span>
          </NavLink>
        ))}

        {/* Theme Toggle - Positioned as a prominent button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none border-2 border-sidebar-border bg-sidebar-background shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none text-sm font-black uppercase italic mt-4"
        >
          <Zap className={`w-5 h-5 ${theme === "dark" ? "text-primary fill-primary" : "text-sidebar-foreground"}`} />
          <span className="text-sidebar-foreground">Switch Style</span>
        </button>
      </div>
    </aside>
  );
}
