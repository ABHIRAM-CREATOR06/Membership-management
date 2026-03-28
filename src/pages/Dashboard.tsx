import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { useData } from "@/hooks/useData";
import {
  CheckSquare,
  Users,
  CalendarDays,
  TrendingUp,
  ArrowRight,
  Activity,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getInitials, calculateMemberEfficiency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const { tasks, members, events, updateTask } = useData();

  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const completionRate = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;

  const activeTasks = tasks.filter((t) => t.status !== "done").slice(0, 3);

  const nextEvent = upcomingEvents.length > 0
    ? upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
    : null;

  return (
    <AppLayout
      title="DASHBOARD"
      subtitle={`WELCOME BACK, COMMANDER. ${inProgressTasks} OBJECTIVES REQUIRE ATTENTION.`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <motion.div variants={item}>
            <StatCard
              title="TOTAL OBJECTIVES"
              value={tasks.length}
              subtitle={`${inProgressTasks} ACTIVE`}
              icon={CheckSquare}
              color="bg-primary"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="MISSION SUCCESS"
              value={`${completionRate}%`}
              subtitle={`${doneTasks} SECURED`}
              icon={TrendingUp}
              color="bg-success"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="OPERATIVE COUNT"
              value={members.length}
              subtitle={`ACROSS ${new Set(members.map(m => m.team)).size} SECTORS`}
              icon={Users}
              color="bg-info"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="UPCOMING EVENTS"
              value={upcomingEvents.length}
              subtitle={nextEvent ? `${nextEvent.title.toUpperCase()}` : "NONE SCHEDULED"}
              icon={CalendarDays}
              color="bg-warning"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b-4 border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter leading-none">HIGH PRIORITY OBJECTIVES</h3>
              </div>
              <Link to="/tasks">
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-card text-foreground font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all">
                  VIEW KANBAN <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>

            <motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeTasks.length > 0 ? (
                activeTasks.map((task) => (
                  <motion.div key={task.id} variants={item}>
                    <TaskCard
                      task={task}
                      members={members}
                      onEdit={() => { }}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 border-4 border-border border-dashed flex flex-col items-center justify-center opacity-20 italic font-black uppercase text-center text-foreground">
                  <CheckSquare className="w-12 h-12 mb-4" />
                  <p className="text-sm tracking-widest leading-relaxed">ALL SECTORS SECURED. NO ACTIVE OBJECTIVES.</p>
                </div>
              )}
            </motion.div>

            {/* Event Tracking */}
            <div className="pt-8">
              <div className="flex items-center justify-between border-b-4 border-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                    <Activity className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter leading-none">OPERATIONAL THEATERS</h3>
                </div>
                <Link to="/events">
                  <button className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-card text-foreground font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all">
                    FULL SCHEDULE <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.filter((e) => e.status !== "completed").slice(0, 2).map((event) => {
                  const pct = event.tasksTotal > 0 ? Math.round((event.tasksDone / event.tasksTotal) * 100) : 0;
                  return (
                    <motion.div
                      key={event.id}
                      variants={item}
                      className="bg-card border-4 border-border p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-brutal group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-black text-foreground uppercase italic tracking-tighter truncate leading-none mb-2">{event.title}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">{event.venue}</p>
                        </div>
                        <span className="text-[10px] font-black bg-foreground text-background px-2 py-0.5">{pct}% COMPLETED</span>
                      </div>
                      <div className="w-full h-4 bg-background border-2 border-border mb-4 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary border-r-2 border-border"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase italic text-foreground">{event.tasksDone}/{event.tasksTotal} TASKS SECURED</p>
                        <div className={`px-2 py-0.5 border-2 border-border text-[8px] font-black uppercase italic ${event.status === 'upcoming' ? 'bg-info' : 'bg-warning'} text-black`}>
                          {event.status}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-8">
            {/* Top Performers */}
            <motion.div
              variants={item}
              className="bg-card border-4 border-border p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] h-full"
            >
              <h3 className="font-heading font-black text-2xl text-foreground mb-10 uppercase italic flex items-center gap-3 border-b-4 border-border pb-4">
                <Users className="w-8 h-8 text-info" />
                ELITE OPERATIVES
              </h3>
              <div className="space-y-8">
                {members.length > 0 ? (
                  [...members]
                    .map(m => {
                      const rate = calculateMemberEfficiency(m.id, tasks);
                      const completed = tasks.filter(t => t.status === "done" && (t.involvedIds || []).includes(m.id)).length;
                      return { ...m, completed, rate };
                    })
                    .sort((a, b) => b.rate - a.rate || b.completed - a.completed)
                    .slice(0, 6)
                    .map((m, i) => (
                      <div key={m.id} className="flex items-center gap-5 group">
                        <div className="relative">
                          <div className="w-14 h-14 border-4 border-border bg-background flex items-center justify-center text-lg font-black italic shadow-brutal group-hover:bg-primary transition-colors text-foreground">
                            {getInitials(m.name)}
                          </div>
                          {i < 3 && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-card border-2 border-border flex items-center justify-center text-xs font-black italic shadow-brutal text-foreground">
                              {i + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black uppercase italic truncate leading-none mb-2 text-foreground">{m.name}</p>
                          <div className="w-full h-2 bg-secondary/30 border-2 border-border rounded-none overflow-hidden">
                            <div
                              className={`h-full border-r-2 border-border ${m.rate >= 80 ? "bg-success" : m.rate >= 50 ? "bg-warning" : "bg-primary"}`}
                              style={{ width: `${m.rate}%` }}
                            />
                          </div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 italic">{m.completed} SECURED</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-black italic ${m.rate >= 80 ? "text-success" : m.rate >= 50 ? "text-warning" : "text-foreground"}`}>
                            {m.rate}%
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground italic text-center py-8">NO OPERATIVE DATA RECOVERED</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
