import { AppLayout } from "@/components/AppLayout";
import { useData } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { Plus, CalendarDays, MapPin, Users, CheckSquare, ArrowRight, Edit2, Trash2, Calendar, Trophy, Wallet, Coins, AlertCircle } from "lucide-react";
import { EventStatus, Event as EventType } from "@/data/mockData";
import { useState } from "react";
import { EventDialog } from "@/components/EventDialog";

const statusConfig: Record<EventStatus, { label: string; classes: string }> = {
  upcoming: { label: "Upcoming", classes: "bg-info/15 text-info border-info/30" },
  ongoing: { label: "Ongoing", classes: "bg-warning/15 text-warning border-warning/30" },
  completed: { label: "Completed", classes: "bg-success/15 text-success border-success/30" },
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}

export default function Events() {
  const { events, members, tasks, addEvent, updateEvent, deleteEvent } = useData();
  const [filter, setFilter] = useState<EventStatus | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: EventType) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (event: EventType) => {
    if (editingEvent) {
      updateEvent(event.id, event);
    } else {
      addEvent(event);
    }
  };

  return (
    <AppLayout
      title="Events"
      subtitle={`${events.length} total events managed`}
      actions={
        <Button
          size="sm"
          className="bg-primary text-black border-2 border-border rounded-none shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] font-black uppercase italic text-xs hover:bg-primary/90"
          onClick={handleAddEvent}
        >
          <Plus className="w-3.5 h-3.5" />
          New Event
        </Button>
      }
    >
      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        event={editingEvent}
        onSave={handleSaveEvent}
        onDelete={deleteEvent}
        members={members}
      />

      {/* Status filters */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {(["all", "upcoming", "ongoing", "completed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[10px] px-5 py-2.5 rounded-none border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${filter === s
              ? "bg-primary text-black"
              : "bg-card text-foreground hover:bg-secondary"
              }`}
          >
            {s === "all" ? "All Events" : s}
            <span className={`ml-2 bg-background text-foreground px-2 border-2 border-border ${filter === s ? "border-black" : ""}`}>
              {s === "all" ? events.length : events.filter((e) => e.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Events grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {filtered.map((event) => {
            const pct = event.tasksTotal > 0 ? Math.round((event.tasksDone / event.tasksTotal) * 100) : 0;
            const teamMembers = members.filter((m) => event.team.includes(m.id));
            const status = statusConfig[event.status];

            // Calculate contributors for completed events
            const eventTasks = tasks.filter(t => t.event === event.title && t.status === 'done');
            const contributorIds = [...new Set(eventTasks.flatMap(t => t.assignees))];
            const contributors = members.filter(m => contributorIds.includes(m.id));

            return (
              <div
                key={event.id}
                className="bg-card border-4 border-border overflow-hidden hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 shadow-brutal group relative flex flex-col"
              >
                {/* Cover accent */}
                <div
                  className="h-4 w-full border-b-4 border-border"
                  style={{
                    background: `hsl(${event.coverColor} 84% 48%)`,
                  }}
                />

                <div className="p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter leading-none group-hover:underline underline-offset-4">
                        {event.title}
                      </h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-3 line-clamp-2 leading-relaxed">{event.description}</p>
                    </div>
                    <div className={`px-2 py-1 border-2 border-border text-[10px] font-black uppercase italic ${status.classes}`}>
                      {status.label}
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: CalendarDays, text: formatDate(event.date), label: "DATE" },
                      { icon: MapPin, text: event.venue, label: "VENUE" },
                      { icon: CheckSquare, text: `${event.tasksDone}/${event.tasksTotal} TASKS`, label: "PROGRESS" }
                    ].map((item, i) => (
                      <div key={i} className="bg-secondary border-2 border-border p-3 shadow-brutal">
                        <p className="text-[8px] font-black text-muted-foreground/50 mb-1">{item.label}</p>
                        <div className="flex items-center gap-2 text-foreground">
                          <item.icon className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-black uppercase truncate">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Task progress bar (Brutalist style) */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase italic text-foreground">COMPLETION STATUS</span>
                      <span className="bg-foreground text-background px-1 text-[10px] font-black">{pct}%</span>
                    </div>
                    <div className="w-full h-6 bg-background border-4 border-border relative overflow-hidden">
                      <div
                        className="h-full border-r-4 border-border transition-all duration-1000"
                        style={{
                          width: `${pct}%`,
                          background: `hsl(${event.coverColor} 84% 48%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Financial tracking */}
                  <div className="mb-8 p-4 bg-secondary/50 border-2 border-border shadow-brutal">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase italic text-foreground tracking-widest">FINANCIAL TRACKER</span>
                      </div>
                      {((event.expenses ?? 0) > (event.budget ?? 0)) && (
                        <div className="flex items-center gap-1 text-destructive font-black text-[8px] uppercase animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          OVER BUDGET
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 border-2 border-border border-double bg-background">
                        <p className="text-[7px] font-black text-muted-foreground uppercase mb-1">BUDGET</p>
                        <p className="text-xs font-black text-foreground">₹{(event.budget ?? 0).toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 border-2 border-border border-double bg-background">
                        <p className="text-[7px] font-black text-muted-foreground uppercase mb-1">SPENT</p>
                        <p className={`text-xs font-black ${(event.expenses ?? 0) > (event.budget ?? 0) ? "text-destructive" : "text-foreground"}`}>
                          ₹{(event.expenses ?? 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-2 border-2 border-border border-double bg-background">
                        <p className="text-[7px] font-black text-muted-foreground uppercase mb-1">BALANCE</p>
                        <p className={`text-xs font-black (((event.budget ?? 0) - (event.expenses ?? 0)) < 0) ? "text-destructive" : "text-success"}`}>
                          ₹{((event.budget ?? 0) - (event.expenses ?? 0)).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full h-2 bg-background border-2 border-border relative overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${(event.expenses ?? 0) > (event.budget ?? 0) ? "bg-destructive" : "bg-success"}`}
                          style={{
                            width: `${Math.min(100, (((event.expenses ?? 0) / (event.budget ?? 1)) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contributors Section (for completed events) */}
                  {event.status === "completed" && contributors.length > 0 && (
                    <div className="mb-8 p-4 bg-success/5 border-2 border-dashed border-success/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-4 h-4 text-success" />
                        <span className="text-[10px] font-black uppercase italic text-success tracking-widest leading-none">ELITE CONTRIBUTORS</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {contributors.map(m => (
                          <div key={m.id} className="flex items-center gap-2 bg-card border-2 border-border px-2 py-1 shadow-brutal">
                            <div className="w-5 h-5 bg-background border-2 border-border flex items-center justify-center text-[8px] font-black text-foreground">
                              {getInitials(m.name)}
                            </div>
                            <span className="text-[9px] font-black uppercase italic text-foreground">{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team + action */}
                  <div className="flex items-center justify-between pt-6 mt-auto border-t-4 border-border border-dashed">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {teamMembers.slice(0, 4).map((m) => (
                          <div
                            key={m.id}
                            title={m.name}
                            className="w-10 h-10 border-2 border-border bg-background flex items-center justify-center text-[11px] font-black text-foreground shadow-brutal hover:translate-y-[-2px] transition-transform"
                          >
                            {getInitials(m.name)}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase italic text-muted-foreground">
                        {teamMembers.length} ASSIGNED
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="w-10 h-10 border-2 border-border bg-card flex items-center justify-center shadow-brutal hover:bg-primary transition-all active:shadow-none text-foreground"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="w-10 h-10 border-2 border-border bg-card flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(255,100,100,1)] hover:bg-destructive hover:text-white transition-all active:shadow-none text-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Button
                        className="h-10 px-4 border-2 border-border bg-foreground text-background rounded-none font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        onClick={() => handleEditEvent(event)}
                      >
                        EXPLORE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-card/30 border border-dashed border-border rounded-3xl">
          <Calendar className="w-16 h-16 text-muted-foreground/20 mb-6" />
          <h3 className="text-xl font-heading font-bold text-foreground">No events found</h3>
          <p className="text-muted-foreground mt-2 max-w-sm px-6">
            Try changing your filter or create a new event for your club.
          </p>
          <Button
            className="mt-8 gradient-primary text-primary-foreground border-0 font-bold px-8 py-6 h-auto text-lg rounded-2xl shadow-glow"
            onClick={handleAddEvent}
          >
            Create Your First Event
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
