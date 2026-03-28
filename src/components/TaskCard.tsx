import { Task, Member } from "@/data/mockData";
import { MessageSquare, Calendar, Edit2, Zap } from "lucide-react";
import { getInitials } from "@/lib/utils";

const priorityColors = {
  high: "bg-destructive text-white",
  medium: "bg-warning text-black",
  low: "bg-success text-black",
};

function getDaysLeft(deadline: string) {
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  return diff;
}

interface TaskCardProps {
  task: Task;
  members: Member[];
  onEdit?: () => void;
}

export function TaskCard({ task, members, onEdit }: TaskCardProps) {
  const assignees = members.filter((m) => task.assignees.includes(m.id));
  const daysLeft = getDaysLeft(task.deadline);

  return (
    <div
      className="bg-card border-4 border-border p-5 transition-all hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 cursor-pointer"
      onClick={() => onEdit?.()}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <div className={`self-start px-2 py-0.5 border-2 border-border text-[9px] font-black uppercase italic ${priorityColors[task.priority]}`}>
            {task.priority} PRIORITY
          </div>
          <h4 className="font-heading font-black text-foreground text-sm uppercase italic tracking-tighter leading-tight truncate">{task.title}</h4>
        </div>
        <div className="text-muted-foreground hover:text-foreground shrink-0 ml-2">
          <Edit2 className="w-3.5 h-3.5" />
        </div>
      </div>

      <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-tighter line-clamp-2 mb-6 border-l-2 border-border pl-2 leading-relaxed h-[30px]">
        {task.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col gap-2">
          <div className="flex -space-x-3">
            {assignees.map((m, i) => {
              const failed = task.status === "done" && !(task.involvedIds || []).includes(m.id);
              return (
                <div
                  key={m.id}
                  title={failed ? `FAILED: ${m.name}` : `ASSIGNED: ${m.name}`}
                  className={`w-8 h-8 rounded-none border-2 border-border flex items-center justify-center text-[10px] font-black italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all ${failed ? "bg-destructive text-white translate-y-1 shadow-none" : "bg-card hover:bg-primary hover:-translate-y-1"
                    }`}
                  style={{ zIndex: 20 - i }}
                >
                  {getInitials(m.name)}
                  {failed && <div className="absolute -bottom-4 bg-destructive text-white text-[6px] px-1 font-black">FAILED</div>}
                </div>
              );
            })}
            {assignees.length === 0 && (
              <div title="UNASSIGNED" className="w-8 h-8 bg-secondary/30 border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] dashed-border">
                <Zap className="w-3 h-3 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {task.status === "done" && (task.involvedIds?.length ?? 0) > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[7px] font-black text-success uppercase italic bg-success/10 px-1">INVOLVED:</span>
              <div className="flex -space-x-2">
                {members.filter(m => task.involvedIds?.includes(m.id)).map((m, i) => (
                  <div
                    key={m.id}
                    title={`INVOLVED: ${m.name}`}
                    className="w-6 h-6 rounded-none border-[1px] border-border flex items-center justify-center text-[8px] font-black italic bg-success text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    style={{ zIndex: 10 - i }}
                  >
                    {getInitials(m.name)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.status === "done" ? (
            <div className="flex items-center gap-1 text-[9px] font-black uppercase italic bg-success text-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-border">
              COMPLETED
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[9px] font-black uppercase italic bg-foreground text-background px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
              <Calendar className="w-3 h-3" />
              {task.deadline}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-border border-dashed flex items-center justify-between">
        <div className="text-[9px] font-black uppercase italic truncate max-w-[140px] text-foreground">
          SECTOR: <span className="bg-primary text-black px-1">{task.event}</span>
        </div>
        <div className={`w-3 h-3 border-2 border-border ${task.status === "done" ? "bg-success" : task.status === "in-progress" ? "bg-info" : task.status === "review" ? "bg-warning" : "bg-card"}`} />
      </div>
    </div>
  );
}
