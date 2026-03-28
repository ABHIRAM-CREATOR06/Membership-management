import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AppLayout({ children, title, subtitle, actions }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-8 py-4 border-b-4 border-border bg-background shrink-0">
          <div className="flex-1">
            <h2 className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter">{title}</h2>
            {subtitle && <p className="text-xs font-bold text-muted-foreground uppercase mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground" />
              <Input
                placeholder="SEARCH..."
                className="pl-9 w-56 h-10 bg-background border-2 border-border rounded-none shadow-brutal focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all font-bold placeholder:text-muted-foreground"
              />
            </div>
            <button className="relative w-10 h-10 rounded-none bg-background border-2 border-border flex items-center justify-center hover:bg-primary transition-all shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
              <Bell className="w-5 h-5 text-foreground" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-accent border-2 border-border font-black text-foreground">
                3
              </Badge>
            </button>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto scrollbar-thin bg-main-bg pattern-cross">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
